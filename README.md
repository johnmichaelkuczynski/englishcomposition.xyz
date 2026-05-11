# 📚 ENGLISH COMPOSITION 101

**Self-Contained AI-Powered Writing Course with Two-Layer AI-Detection and Per-Student Process Forensics**

---

## 🧩 Overview

English Composition 101 is a self-contained, AI-powered writing course built for instructors who need to teach composition in an environment where students have unrestricted access to large language models. The course delivers a full 14-module curriculum (eight discussions, five essays, and a term paper, totaling 850 points), with an integrated AI tutor, a structured drafting workflow, and a live writing canvas.

What sets this course apart from every other LMS module is its integrity layer. Most platforms detect AI-generated text *after* it is submitted and stop there. This course assumes that motivated students will paraphrase AI output sentence-by-sentence and transcribe it into the assignment to defeat text-only detection. To catch that, the course runs **two independent AI-detection pipelines on every submission**: one that scores the *output* (GPTZero), and one that scores the *shape of the writing session itself* — keystroke timing, deletion patterns, caret movement, burst structure, abandoned-and-restarted starts. The second layer is judged against the student's own established writing baseline, not a population average, so each student is held to their own normal behavior.

Every monitoring decision is invisible to the student by design. The disclosure modal says "your work is monitored" and nothing more. The names of the signals being watched are never exposed in the UI, the API, or the toast messages.

---

## 👥 Who It's For

- **Instructors and writing-program directors** -- need a turnkey composition course that holds up in the era of generative AI without banning it
- **Departments running large gateway courses** -- need scalable per-student integrity monitoring without manual essay-by-essay review
- **Academic-integrity offices** -- need replayable, evidence-grade submission records (full keystroke log, timeline, baseline-vs-submission comparison) for any case that escalates
- **Disability and accessibility coordinators** -- need a first-class accommodation path that disables live monitoring UI without disabling the underlying course
- **Students** -- need a structured drafting environment, an integrated AI tutor for support, and clear feedback on their own writing

---

## ⚙️ Core Capabilities

- **14-Module Curriculum** -- Eight discussions, five essays, and a term paper, totaling 850 points. Sequentially numbered, programmatically validated, and surfaced through a Canvas-style module browser.

- **Integrity Canvas** -- A paste-blocked, contentEditable writing surface with a live traffic-light bar, sentence-level AI-score highlighting, autosave every 5 seconds, and a 30-second cumulative-red warning. Submitting on red opens a confirm dialog. Every submission ships with the full keystroke log, score history, final AI score, and a server-computed activity report.

- **Two-Layer AI-Detection** -- *Layer 1 (synchronic)*: GPTZero scores the final text in a fire-and-forget background task, with the client polling every 2–2.5 seconds. *Layer 2 (diachronic)*: a custom process-forensics analyzer scores the writing session itself across 11 features. A submission can pass Layer 1 and still be flagged by Layer 2 when the writing process looks like transcription.

- **Per-Student Baseline Memory** -- Each student's first two submissions establish a personal baseline (running mean over 11 process features, stored as jsonb on the student row). The baseline is **frozen after submission #2** by design — slow-drift attacks against the baseline are explicitly defended against. Every subsequent submission is scored both absolutely and against this student's own baseline, so a student whose normal `burstUniformity` is 12 ms is not flagged for being fast.

- **Live Process Score** -- A second traffic-light bar in the writing canvas, throttled to one call per 60 seconds, shows the student's current process-forensics class. The endpoint deliberately returns *only* `score` and `class` — never the underlying features — to prevent giving sophisticated cheaters a tuning oracle.

- **Sparse-Data Guardrail** -- Sessions with fewer than 20 events or under 80 characters are not analyzed. Empty telemetry is never misclassified as "robotic."

- **Draft Workshop** -- A single-shot AI feedback box in five sections (thesis, structure, evidence, voice, mechanics). Once feedback is fetched, the draft is locked, preventing students from iteratively re-prompting until the AI writes the essay for them.

- **General Tutor** -- An always-available conversational tutor backed by Anthropic for course concepts, with persistent module-aware context.

- **Admin Dashboard** -- Full submission browser at `/admin/submissions` with replay, sparkline, server-side activity report, and the new `ProcessForensicsView` panel: score badge, class badge, baseline-adjusted score badge with sample size, findings list, a four-column feature table (*Feature / This Submission / Student Baseline / Notes*), and a chars-per-burst timeline chart.

- **Accommodation Mode** -- Per-student admin toggle replaces the contentEditable canvas with a plain textarea, suppresses the live traffic-light UI, and skips the live process-score endpoint. Underlying event logging still runs in the background so post-hoc inspection remains possible if needed.

- **One-Time Integrity Disclosure** -- A consent gate on first module load, deliberately generic in content. Acknowledgment is timestamped on the student row.

- **Admin Bootstrap** -- The first authenticated user can claim admin via a one-shot endpoint. After that, admin status is granted only by an existing admin.

- **System Diagnostic** -- One-click self-check at `/diagnostic` that verifies environment variables, database connectivity, table reachability, curriculum integrity (14 modules / 850 pts / sequential numbering), the Anthropic AI roundtrip, and runs two synthetic process-forensics tests — a transcription stream that must score `≥ 70` and a composition stream that must score `< 35`. Color-coded pass / warn / fail output.

---

## 🚀 What Makes It Different

- **It assumes the student has GPT open in another tab** -- The entire integrity design starts from the threat model that a motivated student will paraphrase and transcribe AI output. Text-only detection is treated as necessary but insufficient. Every other course on the market stops at GPTZero.

- **It judges each student against themselves, not a population** -- A fast typist isn't penalized for being fast. A heavy reviser isn't penalized for revising. The per-student baseline is the unit of measurement, and it freezes after two submissions so it cannot be slowly trained toward a cheating profile.

- **It separates output from process** -- A submission can pass GPTZero (final text reads human) and still be flagged by process forensics (the writing session looks like transcription). Conversely, a submission with high deletion ratio, varied bursts, structural edits, and abandoned-and-restarted starts is treated as human even when GPTZero is borderline.

- **It does not tell students what it is watching** -- The disclosure modal is intentionally generic. Feature names never appear in the student UI, the live endpoint, or any toast. Naming the signals creates a curriculum for evading them.

- **The live signal is information-starved on purpose** -- The live process-score endpoint returns only a score and a class, never the feature breakdown. A student watching their bar tick up cannot reverse-engineer which behavior is triggering it.

- **It has a real accommodation path** -- Accommodated students get a textarea, no live traffic-light bar, and no live process-score endpoint calls — without losing access to the course. The accommodation toggle is a first-class admin control, not an opt-out hidden in settings.

- **The admin panel is evidence-grade** -- Every submission carries the full keystroke log for replay, a per-burst timeline chart, a side-by-side feature-vs-baseline table with the baseline sample size, and an explicit list of which signals fired. If a case escalates to academic integrity, the record is already there.

- **One-click self-test of the entire integrity pipeline** -- The diagnostic page runs synthetic transcription and synthetic composition cases through the live analyzer on every check. Tuning the weights without breaking the calibration is a 30-second loop, not a multi-hour validation effort.

- **Each student's baseline is a named, persisted asset** -- `students.processBaseline` is jsonb on the student row with a sample size and a feature-mean dictionary. It is loaded on every submission, snapshotted into that submission's record at the time of analysis, and visible in the admin panel as the second column of the feature table.

- **Legacy submissions still work** -- Pre-existing submissions without keystroke telemetry continue to load in the admin UI. The analyzer accepts both the new rich event shape and the legacy shape, so back-compat is preserved by construction.

---

## 🛠️ Tech Stack

- **Monorepo** -- pnpm workspaces, Node 24, TypeScript 5.9
- **API** -- Express 5, Drizzle ORM, PostgreSQL, Zod (`zod/v4`)
- **Frontend** -- React + Vite, TanStack Query, Tailwind, shadcn/ui
- **AI** -- GPTZero (text detection), Anthropic (tutor + draft feedback)
- **Codegen** -- Orval from OpenAPI spec
- **Build** -- esbuild

---

## 📁 Project Structure

- `artifacts/api-server` -- Express API: sessions, submissions, canvas, admin, diagnostic, process forensics analyzer.
- `artifacts/phil-101` -- Student and admin web app: integrity canvas, draft workshop, tutor, admin submission detail with `ProcessForensicsView`.
- `artifacts/mockup-sandbox` -- Vite preview server for design iteration on individual components.
- `lib/db` -- Drizzle schema and migrations.
- `lib/api-spec`, `lib/api-zod`, `lib/api-client-react` -- OpenAPI spec, generated Zod schemas, generated React Query hooks.
- `replit.md` -- Architecture blueprint: detection layers, baseline behavior, conventions, gotchas.

---

## ⚡ Quick Start

```bash
pnpm install
pnpm --filter @workspace/db run push          # apply schema
pnpm --filter @workspace/api-server run dev   # start API
pnpm --filter @workspace/phil-101 run dev     # start web app
```

Required environment variables: `DATABASE_URL`, `SESSION_SECRET`, `GPTZERO_API_KEY`. The Anthropic integration is configured through Replit's integrations layer.

To verify a deployment is healthy end-to-end, hit `/diagnostic` in the web app or `POST /api/diagnostic/run` against the API. All 19 checks must pass; the two synthetic process-forensics tests are part of that suite.

---

## 🔒 Conventions That Must Be Preserved

- **Never expose the process-forensics feature list to students.** Disclosure modal stays generic. Live endpoint returns only score and class. Toasts and error messages must not name features.
- **The baseline freezes after submission #2.** Do not relax this without a written threat-model review.
- **The sparse-data guardrail (≥ 20 events, ≥ 80 chars) must remain.** Without it, empty telemetry scores as `likelyAI`.
- **Class thresholds (`< 35` / `35–65` / `≥ 65`) and feature weights live at the top of `processForensics.ts`.** They are tunable, but the two synthetic diagnostic tests must continue to pass after any change.
- **Both legacy `{t, k, d}` events and the new rich event shape must keep working** in the analyzer and the admin replay UI.
