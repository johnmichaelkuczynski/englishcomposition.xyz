/**
 * Diachronic AI-detection: analyze the SHAPE of the writing process
 * (keystroke timing, deletions, caret movement) rather than the final text.
 *
 * Catches the failure mode GPTZero misses: student gets AI to write the
 * paper, paraphrases it sentence-by-sentence, transcribes it into the
 * canvas. Final text scores low on text-based detection, but the typing
 * process looks like transcription, not composition.
 *
 * Pure function. No I/O. Tunable weights at the top of the file.
 *
 * Accepted event shapes (back-compat):
 *
 *   New (rich):
 *     { t, type: "insert"|"delete"|"caretJump"|"focus"|"blur",
 *       pos, len, charCount, caretBefore, caretAfter, d?, k? }
 *
 *   Legacy:
 *     { t, k: "i"|"d"|"m"|"p_blocked"|"p_allowed"|"h_off"|"h_on", d?, p? }
 *
 *   Caret-related features degrade gracefully on legacy events.
 */

// ---------------------------------------------------------------------------
// TUNABLES — adjust these to recalibrate the score.
// ---------------------------------------------------------------------------

export const WEIGHTS = {
  burstUniformity: 1.5,
  pauseBeforeNewSentence: 1.5,
  pauseBeforeNewParagraph: 1.0,
  deletionRatio: 2.0,
  structuralEditCount: 1.5,
  caretBacktrackCount: 1.0,
  abandonedStartCount: 1.0,
  burstLengthCV: 1.5,
  frontToBackLinearity: 1.5,
} as const;

/** A "burst" is a run of inserts with no inter-event gap larger than this. */
const BURST_GAP_MS = 2_000;
/** Deletions of more than this many chars count as "structural." */
const STRUCTURAL_DELETE_LEN = 50;
/** Deletions further than this from end-of-doc count as "structural." */
const STRUCTURAL_DELETE_BACKDIST = 200;
/** Caret jumps backward by more than this followed by edits. */
const CARET_BACKTRACK_DIST = 100;

/** Score band thresholds. */
const CLASS_HUMAN_MAX = 35;
const CLASS_MIXED_MAX = 65;

// ---------------------------------------------------------------------------
// TYPES
// ---------------------------------------------------------------------------

export interface ProcessFeatures {
  /** Stdev (ms) of inter-keystroke intervals within typing bursts. */
  burstUniformity: number;
  /** Median ms before the first non-whitespace char after . ? ! */
  pauseBeforeNewSentence: number;
  /** Median ms before the first non-whitespace char after \n\n */
  pauseBeforeNewParagraph: number;
  /** total deleted chars / total inserted chars */
  deletionRatio: number;
  /** Count of large or far-back deletions. */
  structuralEditCount: number;
  /** Backward caret jumps >100 chars followed by edits. */
  caretBacktrackCount: number;
  /** Sentences begun, deleted, restarted at the same position. */
  abandonedStartCount: number;
  /** Coefficient of variation of burst lengths (chars per burst). */
  burstLengthCV: number;
  /** Fraction of inserts at the current end-of-document. */
  frontToBackLinearity: number;
  /** Active seconds (excluding idle gaps >30s). */
  totalActiveSeconds: number;
  /** Final document length (chars). */
  finalCharCount: number;
  /** finalCharCount / totalActiveSeconds */
  charsPerSecond: number;
  /** Series of (chars-per-burst). For visualization. */
  burstLengths: number[];
}

export type ProcessClass = "human" | "mixed" | "likelyAI";

export interface ProcessAnalysis {
  processScore: number; // 0..100, higher = more AI-like
  processClass: ProcessClass;
  features: ProcessFeatures;
  flags: string[];
  /** Optional: deviation from the student's own baseline (z-ish, signed). */
  baselineDeviation?: Record<string, number>;
  /**
   * Optional: a second score computed against the student's own baseline.
   * Higher = more deviant from how this student usually writes.
   */
  baselineAdjustedScore?: number;
}

// ---------------------------------------------------------------------------
// EVENT NORMALIZATION
// ---------------------------------------------------------------------------

interface NormEvent {
  t: number;
  type: "insert" | "delete" | "caretJump" | "focus" | "blur" | "other";
  len: number;
  pos: number | null;
  caretBefore: number | null;
  caretAfter: number | null;
  text: string | null;
}

function normalize(raw: unknown): NormEvent | null {
  if (!raw || typeof raw !== "object") return null;
  const e = raw as Record<string, unknown>;
  const t = typeof e.t === "number" ? e.t : null;
  if (t == null) return null;

  // Determine type.
  let type: NormEvent["type"];
  if (typeof e.type === "string") {
    if (
      e.type === "insert" ||
      e.type === "delete" ||
      e.type === "caretJump" ||
      e.type === "focus" ||
      e.type === "blur"
    ) {
      type = e.type;
    } else {
      type = "other";
    }
  } else if (e.k === "i") {
    type = "insert";
  } else if (e.k === "d") {
    type = "delete";
  } else if (e.k === "focus") {
    type = "focus";
  } else if (e.k === "blur") {
    type = "blur";
  } else {
    type = "other";
  }

  // Length.
  let len = typeof e.len === "number" ? e.len : 0;
  if (!len) {
    if (type === "insert" && typeof e.d === "string") len = e.d.length;
    else if (type === "delete" && typeof e.d === "string") {
      const n = Number(e.d);
      len = Number.isFinite(n) && n > 0 ? n : 1;
    } else if (type === "delete") len = 1;
  }

  const pos = typeof e.pos === "number" ? e.pos : null;
  const caretBefore =
    typeof e.caretBefore === "number" ? e.caretBefore : null;
  const caretAfter =
    typeof e.caretAfter === "number" ? e.caretAfter : null;
  const text = typeof e.d === "string" && type === "insert" ? e.d : null;

  return { t, type, len, pos, caretBefore, caretAfter, text };
}

// ---------------------------------------------------------------------------
// FEATURE EXTRACTION
// ---------------------------------------------------------------------------

function median(xs: number[]): number {
  if (xs.length === 0) return 0;
  const s = [...xs].sort((a, b) => a - b);
  const mid = Math.floor(s.length / 2);
  return s.length % 2 ? s[mid] : (s[mid - 1] + s[mid]) / 2;
}

function stdev(xs: number[]): number {
  if (xs.length < 2) return 0;
  const m = xs.reduce((a, b) => a + b, 0) / xs.length;
  const v = xs.reduce((a, b) => a + (b - m) ** 2, 0) / xs.length;
  return Math.sqrt(v);
}

function coefficientOfVariation(xs: number[]): number {
  if (xs.length < 2) return 0;
  const m = xs.reduce((a, b) => a + b, 0) / xs.length;
  if (m === 0) return 0;
  return stdev(xs) / m;
}

function clamp01(x: number): number {
  if (!Number.isFinite(x)) return 0;
  if (x < 0) return 0;
  if (x > 1) return 1;
  return x;
}

export function extractFeatures(
  rawKeystrokes: unknown,
  finalContent: string,
): ProcessFeatures {
  const events = (Array.isArray(rawKeystrokes) ? rawKeystrokes : [])
    .map(normalize)
    .filter((e): e is NormEvent => e !== null)
    .sort((a, b) => a.t - b.t);

  const inserts = events.filter((e) => e.type === "insert");
  const deletes = events.filter((e) => e.type === "delete");

  // ---- Bursts -----------------------------------------------------------
  const burstLengths: number[] = [];
  const intraBurstIntervals: number[] = [];
  let currentBurstChars = 0;
  let lastInsertT: number | null = null;

  for (const ev of inserts) {
    if (lastInsertT == null) {
      currentBurstChars = ev.len;
    } else {
      const gap = ev.t - lastInsertT;
      if (gap > BURST_GAP_MS) {
        if (currentBurstChars > 0) burstLengths.push(currentBurstChars);
        currentBurstChars = ev.len;
      } else {
        intraBurstIntervals.push(gap);
        currentBurstChars += ev.len;
      }
    }
    lastInsertT = ev.t;
  }
  if (currentBurstChars > 0) burstLengths.push(currentBurstChars);

  const burstUniformity = stdev(intraBurstIntervals);
  const burstLengthCV = coefficientOfVariation(burstLengths);

  // ---- Sentence / paragraph pauses --------------------------------------
  // Build a per-char timestamp series by concatenating inserts (deletes are
  // intentionally ignored — we want to measure how long the student paused
  // *before* committing the next visible char, even if they later deleted).
  // Then walk the text and, for each non-whitespace char whose nearest prior
  // non-whitespace char ended a sentence (or was separated by \n\n),
  // record the gap. This implements the spec literally: "pause before the
  // first non-whitespace char after . ? ! / paragraph break".
  let composedText = "";
  const charTs: number[] = [];
  for (const ev of inserts) {
    if (ev.text) {
      composedText += ev.text;
      for (let i = 0; i < ev.text.length; i++) charTs.push(ev.t);
    } else if (ev.len > 0) {
      composedText += "?".repeat(ev.len);
      for (let i = 0; i < ev.len; i++) charTs.push(ev.t);
    }
  }
  const sentencePauses: number[] = [];
  const paragraphPauses: number[] = [];
  for (let i = 1; i < composedText.length; i++) {
    if (/\s/.test(composedText[i])) continue;
    // Find nearest prior non-whitespace char.
    let j = i - 1;
    while (j >= 0 && /\s/.test(composedText[j])) j--;
    if (j < 0) continue;
    const between = composedText.slice(j + 1, i);
    const newlines = (between.match(/\n/g) ?? []).length;
    const gap = charTs[i] - charTs[j];
    if (newlines >= 2) {
      paragraphPauses.push(gap);
    } else if (/[.!?]/.test(composedText[j])) {
      sentencePauses.push(gap);
    }
  }

  const pauseBeforeNewSentence = median(sentencePauses);
  const pauseBeforeNewParagraph = median(paragraphPauses);

  // ---- Deletion ratio ---------------------------------------------------
  const totalInsertChars = inserts.reduce((a, b) => a + b.len, 0);
  const totalDeleteChars = deletes.reduce((a, b) => a + b.len, 0);
  const deletionRatio =
    totalInsertChars > 0 ? totalDeleteChars / totalInsertChars : 0;

  // ---- Structural edits -------------------------------------------------
  // Need running end-of-doc length to know "how far back" a delete was.
  // Replay events to get end-of-doc length over time.
  let docLen = 0;
  let structuralEditCount = 0;
  for (const ev of events) {
    if (ev.type === "insert") {
      docLen += ev.len;
    } else if (ev.type === "delete") {
      const distFromEnd =
        ev.caretBefore != null ? docLen - ev.caretBefore : 0;
      if (ev.len >= STRUCTURAL_DELETE_LEN) {
        structuralEditCount++;
      } else if (distFromEnd >= STRUCTURAL_DELETE_BACKDIST) {
        structuralEditCount++;
      }
      docLen = Math.max(0, docLen - ev.len);
    }
  }

  // ---- Caret backtracks -------------------------------------------------
  let caretBacktrackCount = 0;
  for (let i = 0; i < events.length - 1; i++) {
    const ev = events[i];
    if (ev.type !== "caretJump") continue;
    if (
      ev.caretBefore != null &&
      ev.caretAfter != null &&
      ev.caretBefore - ev.caretAfter >= CARET_BACKTRACK_DIST
    ) {
      // Confirm an edit follows in the next 30s.
      const followedByEdit = events
        .slice(i + 1)
        .find((n) => n.t - ev.t <= 30_000 && (n.type === "insert" || n.type === "delete"));
      if (followedByEdit) caretBacktrackCount++;
    }
  }

  // ---- Abandoned starts -------------------------------------------------
  // Heuristic: an insert burst of 30+ chars that gets ≥80% deleted within
  // 60s, where the next insert begins within 10 chars of the original
  // burst's starting caret.
  let abandonedStartCount = 0;
  for (let i = 0; i < inserts.length; i++) {
    const start = inserts[i];
    // Need caret info on this candidate; skip rather than abort the loop —
    // legacy/mixed streams can have some events without caret data.
    if (start.caretBefore == null) continue;
    let burstChars = 0;
    let j = i;
    let burstEndT = start.t;
    while (j < inserts.length) {
      const nx = inserts[j];
      if (j > i && nx.t - inserts[j - 1].t > BURST_GAP_MS) break;
      burstChars += nx.len;
      burstEndT = nx.t;
      j++;
    }
    if (burstChars < 30) {
      i = j - 1;
      continue;
    }
    // Look for matching deletion within 60s.
    let deletedAfter = 0;
    for (const d of deletes) {
      if (d.t < burstEndT) continue;
      if (d.t - burstEndT > 60_000) break;
      deletedAfter += d.len;
    }
    if (deletedAfter < burstChars * 0.8) {
      i = j - 1;
      continue;
    }
    // Did a new insert start near the original caret?
    const restart = inserts.find(
      (ins) =>
        ins.t > burstEndT &&
        ins.t - burstEndT <= 90_000 &&
        ins.caretBefore != null &&
        Math.abs(ins.caretBefore - (start.caretBefore as number)) <= 10,
    );
    if (restart) abandonedStartCount++;
    i = j - 1;
  }

  // ---- Front-to-back linearity ------------------------------------------
  // Replay inserts in order; for each, check if caretBefore == doc length
  // at that moment (i.e., appended to end).
  let endAppends = 0;
  let totalConsidered = 0;
  let docLen2 = 0;
  for (const ev of events) {
    if (ev.type === "insert") {
      if (ev.caretBefore != null) {
        totalConsidered++;
        if (ev.caretBefore >= docLen2 - 1) endAppends++;
      }
      docLen2 += ev.len;
    } else if (ev.type === "delete") {
      docLen2 = Math.max(0, docLen2 - ev.len);
    }
  }
  const frontToBackLinearity =
    totalConsidered > 0 ? endAppends / totalConsidered : 0;

  // ---- Totals -----------------------------------------------------------
  // totalActiveSeconds = total session minus idle gaps >30s
  let totalActiveMs = 0;
  for (let i = 1; i < events.length; i++) {
    const gap = events[i].t - events[i - 1].t;
    if (gap <= 30_000) totalActiveMs += gap;
  }
  const totalActiveSeconds = totalActiveMs / 1000;
  const finalCharCount = finalContent.length;
  const charsPerSecond =
    totalActiveSeconds > 0 ? finalCharCount / totalActiveSeconds : 0;

  return {
    burstUniformity,
    pauseBeforeNewSentence,
    pauseBeforeNewParagraph,
    deletionRatio,
    structuralEditCount,
    caretBacktrackCount,
    abandonedStartCount,
    burstLengthCV,
    frontToBackLinearity,
    totalActiveSeconds,
    finalCharCount,
    charsPerSecond,
    burstLengths,
  };
}

// ---------------------------------------------------------------------------
// SCORING (each sub-score: 0..1 where 1 = most AI-like)
// ---------------------------------------------------------------------------

function subScores(f: ProcessFeatures) {
  const s = {
    // Low intra-burst stdev = transcription-like. <40ms very suspicious.
    burstUniformity: clamp01((100 - f.burstUniformity) / 80),
    // Low pause after sentence = transcription. <300ms suspicious.
    pauseBeforeNewSentence: clamp01((1500 - f.pauseBeforeNewSentence) / 1500),
    // Low pause after paragraph = transcription. <500ms suspicious.
    pauseBeforeNewParagraph: clamp01(
      (3000 - f.pauseBeforeNewParagraph) / 3000,
    ),
    // Low deletion ratio = transcription. <0.05 suspicious.
    deletionRatio: clamp01((0.15 - f.deletionRatio) / 0.15),
    // No structural edits = transcription.
    structuralEditCount: clamp01((2 - f.structuralEditCount) / 2),
    // No backtracking = transcription.
    caretBacktrackCount: clamp01((2 - f.caretBacktrackCount) / 2),
    // No abandoned starts = transcription.
    abandonedStartCount: clamp01((1 - f.abandonedStartCount) / 1),
    // Uniform burst lengths = transcription.
    burstLengthCV: clamp01((0.4 - f.burstLengthCV) / 0.4),
    // High linearity = transcription.
    frontToBackLinearity: clamp01((f.frontToBackLinearity - 0.7) / 0.3),
  };
  return s;
}

// Return only flags whose sub-score is solidly into the "AI-like" zone.
function flagsFromSubScores(
  ss: ReturnType<typeof subScores>,
  f: ProcessFeatures,
): string[] {
  const out: string[] = [];
  if (ss.burstUniformity >= 0.7)
    out.push(
      `Inter-keystroke timing is highly uniform within bursts (stdev ${f.burstUniformity.toFixed(0)}ms)`,
    );
  if (ss.pauseBeforeNewSentence >= 0.7)
    out.push(
      `Almost no pause before new sentences (median ${f.pauseBeforeNewSentence.toFixed(0)}ms)`,
    );
  if (ss.pauseBeforeNewParagraph >= 0.7)
    out.push(
      `Almost no pause before new paragraphs (median ${f.pauseBeforeNewParagraph.toFixed(0)}ms)`,
    );
  if (ss.deletionRatio >= 0.7)
    out.push(
      `Very low deletion ratio (${(f.deletionRatio * 100).toFixed(1)}%) — typical of transcription`,
    );
  if (ss.structuralEditCount >= 0.9)
    out.push("No large structural edits observed");
  if (ss.caretBacktrackCount >= 0.9)
    out.push("Almost no caret backtracking — text grew strictly forward");
  if (ss.abandonedStartCount >= 0.9)
    out.push("No abandoned-and-restarted sentences");
  if (ss.burstLengthCV >= 0.7)
    out.push(
      `Burst lengths are uniform (CV ${f.burstLengthCV.toFixed(2)}) — typical of transcription`,
    );
  if (ss.frontToBackLinearity >= 0.7)
    out.push(
      `Inserts occur almost entirely at end-of-document (${(f.frontToBackLinearity * 100).toFixed(0)}%)`,
    );
  return out;
}

function scoreFromSubScores(ss: ReturnType<typeof subScores>): number {
  let weightedSum = 0;
  let totalWeight = 0;
  for (const key of Object.keys(WEIGHTS) as Array<keyof typeof WEIGHTS>) {
    const w = WEIGHTS[key];
    weightedSum += (ss[key] ?? 0) * w;
    totalWeight += w;
  }
  return Math.round((weightedSum / totalWeight) * 100);
}

function classifyScore(score: number): ProcessClass {
  if (score < CLASS_HUMAN_MAX) return "human";
  if (score < CLASS_MIXED_MAX) return "mixed";
  return "likelyAI";
}

// ---------------------------------------------------------------------------
// PUBLIC ENTRY POINTS
// ---------------------------------------------------------------------------

export function analyzeProcess(
  keystrokes: unknown,
  finalContent: string,
): ProcessAnalysis {
  const features = extractFeatures(keystrokes, finalContent);
  const ss = subScores(features);
  const processScore = scoreFromSubScores(ss);
  const flags = flagsFromSubScores(ss, features);
  return {
    processScore,
    processClass: classifyScore(processScore),
    features,
    flags,
  };
}

// ---------------------------------------------------------------------------
// BASELINE
// ---------------------------------------------------------------------------

/**
 * Baseline = per-feature mean across the student's first N submissions.
 * Stored on students.processBaseline (jsonb).
 */
export interface ProcessBaseline {
  /** How many submissions contributed to the baseline. */
  n: number;
  features: Partial<Record<keyof ProcessFeatures, number>>;
}

const BASELINE_FEATURE_KEYS: Array<keyof ProcessFeatures> = [
  "burstUniformity",
  "pauseBeforeNewSentence",
  "pauseBeforeNewParagraph",
  "deletionRatio",
  "structuralEditCount",
  "caretBacktrackCount",
  "abandonedStartCount",
  "burstLengthCV",
  "frontToBackLinearity",
  "charsPerSecond",
];

/**
 * Update an existing baseline by averaging in a new submission's features.
 * Returns the new baseline.
 */
export function foldIntoBaseline(
  prior: ProcessBaseline | null,
  features: ProcessFeatures,
): ProcessBaseline {
  const priorN = prior?.n ?? 0;
  const newN = priorN + 1;
  const out: ProcessBaseline = { n: newN, features: {} };
  for (const k of BASELINE_FEATURE_KEYS) {
    const oldVal = prior?.features?.[k] ?? 0;
    const newVal = (features[k] as number) ?? 0;
    out.features[k] = (oldVal * priorN + newVal) / newN;
  }
  return out;
}

/**
 * Compare a submission's features to the student's baseline.
 * Each value is signed: positive = more AI-like than baseline, negative = less.
 * Returns deltas + a 0..100 baselineAdjustedScore.
 */
export function compareToBaseline(
  features: ProcessFeatures,
  baseline: ProcessBaseline,
): { deltas: Record<string, number>; adjustedScore: number } {
  const deltas: Record<string, number> = {};
  // For each feature, compute (this - baseline) normalized by a per-feature
  // tolerance, then signed so positive = more AI-like.
  const tolerances: Partial<Record<keyof ProcessFeatures, number>> = {
    burstUniformity: 80,
    pauseBeforeNewSentence: 1000,
    pauseBeforeNewParagraph: 2000,
    deletionRatio: 0.1,
    structuralEditCount: 1,
    caretBacktrackCount: 1,
    abandonedStartCount: 1,
    burstLengthCV: 0.2,
    frontToBackLinearity: 0.15,
    charsPerSecond: 1,
  };
  // Direction: lower = more AI for most; higher = more AI for linearity & cps.
  const directionAIIfLower: Partial<Record<keyof ProcessFeatures, boolean>> = {
    burstUniformity: true,
    pauseBeforeNewSentence: true,
    pauseBeforeNewParagraph: true,
    deletionRatio: true,
    structuralEditCount: true,
    caretBacktrackCount: true,
    abandonedStartCount: true,
    burstLengthCV: true,
    frontToBackLinearity: false,
    charsPerSecond: false,
  };

  let aiLike = 0;
  let total = 0;
  for (const k of BASELINE_FEATURE_KEYS) {
    const cur = (features[k] as number) ?? 0;
    const base = baseline.features?.[k] ?? 0;
    const tol = tolerances[k] ?? 1;
    const rawDelta = cur - base;
    const signed = directionAIIfLower[k] ? -rawDelta / tol : rawDelta / tol;
    deltas[k] = Math.round(signed * 100) / 100;
    aiLike += clamp01(signed);
    total += 1;
  }
  return {
    deltas,
    adjustedScore: Math.round((aiLike / total) * 100),
  };
}

export function analyzeProcessWithBaseline(
  keystrokes: unknown,
  finalContent: string,
  baseline: ProcessBaseline | null,
): ProcessAnalysis {
  const out = analyzeProcess(keystrokes, finalContent);
  if (!baseline || baseline.n < 2) return out;
  const cmp = compareToBaseline(out.features, baseline);
  out.baselineDeviation = cmp.deltas;
  out.baselineAdjustedScore = cmp.adjustedScore;
  return out;
}
