# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

The product is **English Composition 101** — a writing course that ships with a two-layered AI-detection pipeline:

1. **Synchronic detection (text)** — GPTZero scores the *output*.
2. **Diachronic detection (process)** — a custom forensics analyzer scores the *shape of the writing session* (keystroke timing, deletions, caret movement, burst structure) so paraphrase-and-transcribe attacks against GPTZero are caught too.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally
- `curl -sS -X POST http://localhost:8080/api/diagnostic/run` — run the in-process diagnostic suite (includes the two synthetic process-forensics tests)

## Required env vars

- `DATABASE_URL` — Postgres
- `SESSION_SECRET` — express-session
- `GPTZERO_API_KEY` — AI-detection scoring on every student submission. If absent, submissions still succeed; their `aiStatus` is recorded as `failed`.

## Artifacts

- `artifacts/api-server` — Express API (sessions, submissions, canvas, admin, diagnostic).
- `artifacts/phil-101` — student/admin web app.
- `artifacts/mockup-sandbox` — Vite preview server for design iteration.

## Architecture decisions

### AI-detection layer 1 — text (GPTZero, synchronic)

GPTZero runs **after** insert in a fire-and-forget background task in `routes/submissions.ts`; the POST returns immediately with `aiStatus: "pending"`. The web client polls `GET /submissions/module/:id` (and the assessments list) every 2–2.5 s while any submission is still pending. If a submission carries `finalAiScore` from the live canvas, the background check is skipped. See `artifacts/api-server/src/lib/gptzero.ts` and `artifacts/phil-101/src/components/ai-score-badge.tsx`.

### AI-detection layer 2 — process forensics (diachronic)

This is the new layer. It treats the keystroke log as the primary signal and is designed to flag paraphrase-and-transcribe attacks that defeat text-only detectors.

**Analyzer** — `artifacts/api-server/src/lib/processForensics.ts` (pure, no I/O).
- Accepts both the legacy event shape `{t, k, d}` and the rich shape `{t, type, pos, len, charCount, caretBefore, caretAfter}`.
- `extractFeatures(events, finalText)` produces 11 features:
  - `burstUniformity` — stdev of inter-keystroke gaps inside bursts. Low = robotic / transcription-like.
  - `pauseBeforeNewSentence` / `pauseBeforeNewParagraph` — median ms from the previous non-whitespace char to the *first* non-whitespace char after a `.`/`?`/`!` or paragraph break. (Not "the next event" — whitespace alone doesn't count.)
  - `deletionRatio` — total deleted chars / total inserted chars. Healthy human range ~15–40 %.
  - `structuralEditCount` — large or far-back deletions.
  - `caretBacktrackCount` — backward caret jumps > 100 chars.
  - `abandonedStartCount` — burst of ≥30 chars that gets ≥80 % deleted within 60 s and is restarted within 10 chars of the original caret.
  - `burstLengthCV` — coefficient of variation of burst lengths.
  - `frontToBackLinearity` — fraction of inserts that landed at end-of-doc.
  - `totalActiveSeconds`, `charsPerSecond`.
- `analyzeProcess()` collapses features into a 0–100 `processScore` and a class: `human` (<35), `mixed` (35–65), `likelyAI` (≥65). Weights are tunable at the top of the file.
- `analyzeProcessWithBaseline(events, text, baseline)` additionally returns `baselineAdjustedScore` and per-feature `baselineDeviation`.

**Per-student "memory" — the baseline**
- Stored in `students.processBaseline` (jsonb): `{n, features: {…running means…}}`.
- Updated by `foldIntoBaseline()` only on the student's **first 2 submissions**, then frozen — so future cheating cannot quietly drift the baseline toward the cheating profile.
- Used at submission time to compare *this* session against the student's own established habits (e.g. a student whose typical `burstUniformity` is 90 ms suddenly producing 12 ms bursts is flagged independently of population norms).
- Snapshotted onto each submission (`processFeatures.__baselineSnapshot`, `__baselineN`, `__baselineAdjustedScore`, `__baselineDeviation`) so the admin panel can show "this submission vs this student's baseline at the time" without re-fetching.

**Submission pipeline** — `routes/submissions.ts`
- Loads the student's baseline, runs `analyzeProcessWithBaseline`, persists `processScore`, `processClass`, `processFeatures` (with the baseline snapshot folded in), and `processFlags` onto the submission row.
- Then folds the new features into the baseline iff `baseline.n < 2`.
- Guard: skips analysis on streams with `< 20` events or content `< 80` chars to avoid false-positive `likelyAI` on sparse telemetry.
- The student-facing `GET /submissions` zod schema strips the new columns; only the admin endpoint returns them.

**Live signal** — `routes/canvas.ts`
- `POST /canvas/:moduleId/processScore` returns *only* `score` + `class`, never the feature breakdown or the flag list. This is deliberate — leaking the feature names would give cheaters a tuning oracle.
- Skips entirely for accommodated students.
- Requires `≥ 20` events and `≥ 80` chars before responding.

**Diagnostic** — `routes/diagnostic.ts`
Two synthetic tests baked into `POST /api/diagnostic/run`:
- *Synthetic transcription* — uniform-burst, near-zero-deletion stream → expects `processScore ≥ 70`. Currently 100.
- *Synthetic composition* — varied bursts, abandoned-and-restarted starts, caret backtracks, structural edits → expects `processScore < 35`. Currently 9.

### Integrity Canvas (per assignment)

Two-box workflow on `/modules/:id`. Box 1 (`draft-workshop.tsx`) — single-shot AI feedback in 5 sections; once feedback is fetched the draft is locked (`assignment_drafts` table). Box 2 (`integrity-canvas.tsx`) — paste-blocked contentEditable+overlay editor, real-time GPTZero scoring (debounced ≥30 chars / 200-char bursts) with sentence-level highlighting, autosave every 5 s to `canvas_sessions`, full keystroke log, traffic-light bar, and a 30-s cumulative-red warning. Submit on red prompts a confirm dialog; submission ships with `keystrokes`, `scoreHistory`, `finalAiScore`, `flaggedOnSubmit`. The server computes an `activityReport` (`lib/activityReport.ts`) on insert. Accommodated students (admin toggle) get a plain textarea and skip monitoring.

**New in this canvas (process-forensics wiring):**
- Every keystroke event now carries the rich shape `{type, pos, len, charCount, caretBefore, caretAfter}` while *also* preserving the legacy `k` field so older replays keep working.
- Single-char inserts within 200 ms are coalesced before being logged.
- Caret position is tracked via `getCaretOffset(window.getSelection)`, plus explicit `focus`/`blur`/`caretJump` events.
- A second traffic-light bar is bound to `integrityApi.processScore()`, throttled to one call per 60 s.
- The accommodated textarea path also emits rich events (so accommodation removes the live UI but not the underlying data, in case the admin needs to inspect later).

### One-time integrity disclosure

Shown via `IntegrityDisclosureGate` modal on first module page load. `students.integrityAckAt` defaults to epoch 0; gate treats epoch as "not acked". Acknowledgment via `POST /api/integrity/ack`.

**Deliberately generic.** `integrity-disclosure.tsx` is *not* updated to mention process forensics, baseline tracking, or any feature names. Per spec, students see "your work is monitored" but never the list of signals being watched. Do not change this without explicit product approval.

### Admin dashboard

`/admin/submissions` and `/admin/submissions/:id`: list / replay / sparkline / activity-report; accommodation toggle per student. First authenticated user can claim admin via `POST /api/admin/bootstrap`; subsequent admin status is granted only by an existing admin. `requireAdmin` middleware in `artifacts/api-server/src/middleware/requireAdmin.ts`.

**`ProcessForensicsView`** (in `admin-submission-detail.tsx`) shows:
- Score badge (color-coded by class), class badge, baseline-adjusted score badge with the `n` of the snapshot, and a "no baseline yet" badge for first submissions.
- Findings / flags bullet list.
- A 4-column feature table: **Feature / This submission / Student baseline / Notes**. The student-baseline column makes per-student deviation legible at a glance.
- `BurstChart` — chars-per-burst timeline.

## Database schema (relevant additions)

- `students.processBaseline` jsonb — see "memory" above.
- `submissions.processScore` int (nullable).
- `submissions.processClass` text (nullable, one of `human` | `mixed` | `likelyAI`).
- `submissions.processFeatures` jsonb — features + baseline snapshot (`__baselineSnapshot`, `__baselineN`, `__baselineAdjustedScore`, `__baselineDeviation`).
- `submissions.processFlags` jsonb (string array).

Migrate with `pnpm --filter @workspace/db run push`.

## Conventions / gotchas

- Don't expose the process-forensics feature list to students — that includes the disclosure modal, error toasts, and the live canvas UI. Only the admin route returns features and flags.
- The live `/processScore` endpoint must keep returning *only* score+class. If you add fields, check whether they would help a sophisticated cheater optimize.
- Class thresholds (`< 35` / `35–65` / `≥ 65`) and feature weights live at the top of `processForensics.ts`. They are tunable — re-run `POST /api/diagnostic/run` after any change; both synthetic tests must continue to pass.
- The baseline freezes after submission #2 by design. Don't relax this without thinking through the slow-drift attack.
- Legacy keystroke streams (pre-rich-shape) must continue to score correctly. Don't remove the `lenOf()` helper in `lib/activityReport.ts` or the `caretBefore == null` skip in the abandoned-start loop.

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.

## User preferences

(None recorded yet.)
