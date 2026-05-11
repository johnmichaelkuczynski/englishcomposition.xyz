/**
 * Compute the suspicious-activity report for a finished submission from
 * the captured keystroke + score-history streams.
 *
 * Event shapes (compact for storage). Both legacy and new shapes accepted:
 *
 *   Legacy:
 *     keystroke:  { t: ms, k: 'i'|'d'|'m'|'p_blocked'|'p_allowed'|'h_off'|'h_on', d?: string, p?: number }
 *
 *   New (rich, with caret + length info):
 *     keystroke:  { t: ms, type: 'insert'|'delete'|'caretJump'|'focus'|'blur',
 *                   k?: string, d?: string, len?: number, charCount?: number,
 *                   pos?: number, caretBefore?: number, caretAfter?: number }
 *
 *   scoreSample:  { t: ms, score: number, cls: string }
 *
 * The diachronic process-forensics flags from lib/processForensics.ts are
 * folded INTO this report (rather than stored as a duplicate structure), so
 * instructors see one unified report.
 */

export interface ActivityReport {
  /** Cumulative ms the bar spent in the red bucket. */
  redMs: number;
  /** Sustained red >2 minutes total */
  sustainedRed: boolean;
  /** Max words-per-minute in any 30s sliding window. */
  peakWpm30s: number;
  /** Sustained typing >120 WPM for 30s+. */
  burstTyping: boolean;
  /** Number of (long-pause >60s) → (long-burst) transitions. */
  pasteishBursts: number;
  /** Count of paste-from-outside attempts (blocked). */
  pastesBlocked: number;
  /** Times the bar transitioned green→red. */
  greenToRedTransitions: number;
  /** Did the student turn highlighting off while bar was yellow/red? */
  highlightingOffWhileFlagged: boolean;
  /** Total typing duration in ms (first to last event). */
  totalDurationMs: number;
  /** Total characters added (insert events; uses len when present). */
  totalInserts: number;
  /** Total characters deleted (uses len when present). */
  totalDeletes: number;
  /** Findings from diachronic writing-process forensics (folded in). */
  processFlags: string[];
}

type Event = {
  t: number;
  k?: string;
  type?: string;
  d?: string;
  p?: number;
  len?: number;
  charCount?: number;
};
type Score = { t: number; score: number; cls?: string };

function bucketOf(score: number): "green" | "yellow" | "red" {
  if (score >= 0.7) return "red";
  if (score >= 0.3) return "yellow";
  return "green";
}

function isInsert(e: Event): boolean {
  return e.type === "insert" || e.k === "i";
}
function isDelete(e: Event): boolean {
  return e.type === "delete" || e.k === "d";
}
function lenOf(e: Event): number {
  if (typeof e.len === "number") return e.len;
  if (typeof e.charCount === "number") return e.charCount;
  if (isInsert(e) && typeof e.d === "string") return e.d.length;
  if (isDelete(e) && typeof e.d === "string") {
    const n = Number(e.d);
    return Number.isFinite(n) && n > 0 ? n : 1;
  }
  return 1;
}

export function computeActivityReport(
  keystrokes: unknown,
  scoreHistory: unknown,
  processFlags: string[] = [],
): ActivityReport {
  const ks: Event[] = Array.isArray(keystrokes)
    ? (keystrokes as Event[]).filter((e) => e && typeof e.t === "number")
    : [];
  const ss: Score[] = Array.isArray(scoreHistory)
    ? (scoreHistory as Score[]).filter(
        (s) => s && typeof s.t === "number" && typeof s.score === "number",
      )
    : [];
  ks.sort((a, b) => a.t - b.t);
  ss.sort((a, b) => a.t - b.t);

  // --- Red time + green→red transitions ---
  let redMs = 0;
  let greenToRedTransitions = 0;
  let lastBucket: "green" | "yellow" | "red" | null = null;
  for (let i = 0; i < ss.length; i++) {
    const cur = ss[i];
    const next = ss[i + 1];
    const dt = next ? Math.max(0, next.t - cur.t) : 0;
    const b = bucketOf(cur.score);
    if (b === "red") redMs += dt;
    if (lastBucket && lastBucket !== "red" && b === "red")
      greenToRedTransitions++;
    lastBucket = b;
  }

  // --- WPM windows (30s, slide by 5s) over insert events ---
  // Use chars (len) per insert, not events, since coalesced inserts can be multi-char.
  const inserts = ks.filter(isInsert).map((e) => ({ t: e.t, n: lenOf(e) }));
  let peakWpm30s = 0;
  if (inserts.length > 1) {
    const maxT = inserts[inserts.length - 1].t;
    for (let start = 0; start <= maxT; start += 5_000) {
      const end = start + 30_000;
      const charsInWindow = inserts
        .filter((e) => e.t >= start && e.t < end)
        .reduce((a, b) => a + b.n, 0);
      const wpm = (charsInWindow / 5) / (30 / 60); // 5 chars≈1 word
      if (wpm > peakWpm30s) peakWpm30s = wpm;
    }
  }

  // --- Long-pause→burst pattern ---
  let pasteishBursts = 0;
  for (let i = 1; i < inserts.length; i++) {
    const gap = inserts[i].t - inserts[i - 1].t;
    if (gap >= 60_000) {
      const burstStart = inserts[i].t;
      const burstChars = inserts
        .filter((e) => e.t >= burstStart && e.t < burstStart + 30_000)
        .reduce((a, b) => a + b.n, 0);
      if (burstChars >= 200) pasteishBursts++;
    }
  }

  // --- Highlighting hidden while bar was yellow/red ---
  let highlightingHidWhileFlagged = false;
  const offIntervals: Array<[number, number]> = [];
  let offStart: number | null = null;
  const finalT = ks.length > 0 ? ks[ks.length - 1].t : 0;
  for (const e of ks) {
    if (e.k === "h_off" && offStart === null) {
      offStart = e.t;
    } else if (e.k === "h_on" && offStart !== null) {
      offIntervals.push([offStart, e.t]);
      offStart = null;
    }
  }
  if (offStart !== null) offIntervals.push([offStart, finalT]);
  if (offIntervals.length > 0) {
    for (let i = 0; i < ss.length && !highlightingHidWhileFlagged; i++) {
      const cur = ss[i];
      const next = ss[i + 1];
      const sStart = cur.t;
      const sEnd = next ? next.t : finalT;
      const flagged = bucketOf(cur.score) !== "green";
      if (!flagged) continue;
      for (const [a, b] of offIntervals) {
        if (a < sEnd && b > sStart) {
          highlightingHidWhileFlagged = true;
          break;
        }
      }
    }
  }

  const pastesBlocked = ks.filter((e) => e.k === "p_blocked").length;
  const totalInserts = inserts.reduce((a, b) => a + b.n, 0);
  const totalDeletes = ks.filter(isDelete).reduce((a, e) => a + lenOf(e), 0);
  const totalDurationMs =
    ks.length > 0 ? Math.max(0, ks[ks.length - 1].t - ks[0].t) : 0;

  return {
    redMs,
    sustainedRed: redMs >= 120_000,
    peakWpm30s: Math.round(peakWpm30s),
    burstTyping: peakWpm30s >= 120,
    pasteishBursts,
    pastesBlocked,
    greenToRedTransitions,
    highlightingOffWhileFlagged: highlightingHidWhileFlagged,
    totalDurationMs,
    totalInserts,
    totalDeletes,
    processFlags,
  };
}
