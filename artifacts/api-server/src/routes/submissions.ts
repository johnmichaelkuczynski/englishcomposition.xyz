import { Router, type IRouter, type Request, type Response } from "express";
import { and, desc, eq } from "drizzle-orm";
import { db, submissionsTable, studentsTable } from "@workspace/db";
import {
  ListSubmissionsResponseItem as SubmissionZ,
  GetSubmissionForModuleResponse as SubmissionOrNullZ,
} from "@workspace/api-zod";
import { attachSession, requireStudent } from "../middlewares/session";
import { moduleById, modules } from "../lib/curriculum";
import { checkWithGPTZero } from "../lib/gptzero";
import { computeActivityReport } from "../lib/activityReport";
import {
  analyzeProcessWithBaseline,
  foldIntoBaseline,
  type ProcessBaseline,
} from "../lib/processForensics";
import { logger } from "../lib/logger";

const router: IRouter = Router();
router.use(attachSession);

router.get(
  "/submissions",
  requireStudent,
  async (req: Request, res: Response) => {
    const studentId = req.studentId as number;
    const rows = await db
      .select()
      .from(submissionsTable)
      .where(eq(submissionsTable.studentId, studentId))
      .orderBy(desc(submissionsTable.createdAt));
    res.json(rows.map((r) => SubmissionZ.parse(r)));
  },
);

router.post(
  "/submissions",
  requireStudent,
  async (req: Request, res: Response) => {
    const body = req.body as {
      moduleId?: unknown;
      content?: unknown;
      keystrokes?: unknown;
      scoreHistory?: unknown;
      finalAiScore?: unknown;
      finalAiClass?: unknown;
      flaggedOnSubmit?: unknown;
    };
    const moduleId = String(body.moduleId ?? "");
    const content = String(body.content ?? "");
    if (!moduleId) {
      res.status(400).json({ error: "Invalid body" });
      return;
    }
    const targetModule = moduleById(moduleId);
    if (!targetModule) {
      res.status(400).json({ error: "Unknown module" });
      return;
    }
    if (!content.trim()) {
      res.status(400).json({ error: "Content cannot be empty" });
      return;
    }
    const studentId = req.studentId as number;

    // Server-side sequential gating
    const targetIdx = modules.findIndex((m) => m.id === targetModule.id);
    if (targetIdx > 0) {
      const priorIds = modules.slice(0, targetIdx).map((m) => m.id);
      const priorSubs = await db
        .select({ moduleId: submissionsTable.moduleId })
        .from(submissionsTable)
        .where(eq(submissionsTable.studentId, studentId));
      const submitted = new Set(priorSubs.map((s) => s.moduleId));
      const missing = priorIds.filter((id) => !submitted.has(id));
      if (missing.length > 0) {
        res.status(403).json({
          error: `Module ${targetModule.number} is locked. Submit prior modules first: ${missing.join(", ")}`,
        });
        return;
      }
    }

    const keystrokes = Array.isArray(body.keystrokes) ? body.keystrokes : null;
    const scoreHistory = Array.isArray(body.scoreHistory)
      ? body.scoreHistory
      : null;
    // `flaggedOnSubmit` is advisory only — what the live client believed at
    // submit time. The server always re-runs GPTZero and is the source of
    // truth for the persisted aiScore/aiClass/aiStatus.
    const flaggedOnSubmit = !!body.flaggedOnSubmit;

    // ---- Diachronic AI-detection (writing-process forensics) -----------
    // Fetch the student's running baseline so we can score this submission
    // both absolutely AND relative to how this student normally writes.
    const studentRow = await db
      .select({ baseline: studentsTable.processBaseline })
      .from(studentsTable)
      .where(eq(studentsTable.id, studentId))
      .limit(1);
    const baseline =
      (studentRow[0]?.baseline as ProcessBaseline | null) ?? null;

    // Guardrail: avoid false-positive likelyAI scores on extremely sparse
    // telemetry (very short submissions or tiny event streams).
    // analyzeProcess() can otherwise interpret "no data" as "no human-like
    // signals present", which is wrong.
    const ksArr = Array.isArray(keystrokes) ? keystrokes : [];
    const processAnalysis =
      ksArr.length >= 20 && content.length >= 80
        ? analyzeProcessWithBaseline(ksArr, content, baseline)
        : null;

    const activityReport =
      keystrokes && scoreHistory
        ? computeActivityReport(
            keystrokes,
            scoreHistory,
            processAnalysis?.flags ?? [],
          )
        : null;

    const inserted = await db
      .insert(submissionsTable)
      .values({
        studentId,
        moduleId,
        content,
        aiScore: null,
        aiClass: null,
        aiCheckedAt: null,
        aiStatus: "pending",
        keystrokes: keystrokes ?? undefined,
        scoreHistory: scoreHistory ?? undefined,
        activityReport: activityReport ?? undefined,
        flaggedOnSubmit,
        processScore: processAnalysis?.processScore ?? null,
        processClass: processAnalysis?.processClass ?? null,
        // Stash baseline-adjusted score, deviation, and the baseline
        // snapshot used at submission time INTO the processFeatures jsonb
        // (under double-underscore keys ignored by the feature-table
        // renderer). Avoids a second migration while still persisting
        // everything the admin panel needs to show value-vs-baseline.
        processFeatures: processAnalysis
          ? {
              ...processAnalysis.features,
              __baselineAdjustedScore:
                processAnalysis.baselineAdjustedScore ?? null,
              __baselineDeviation:
                processAnalysis.baselineDeviation ?? null,
              __baselineSnapshot: baseline?.features ?? null,
              __baselineN: baseline?.n ?? 0,
            }
          : undefined,
        processFlags: processAnalysis?.flags ?? undefined,
      })
      .returning();

    // ---- Update per-student baseline (first 2 submissions) -------------
    // Baselines are built from the first two submissions for each student.
    // From the third onward, we KEEP the baseline frozen and only USE it
    // to compute deviation. This prevents a student who started cheating
    // from "training" the baseline to look more AI-like over time.
    if (processAnalysis) {
      const priorN = baseline?.n ?? 0;
      if (priorN < 2) {
        const next = foldIntoBaseline(baseline, processAnalysis.features);
        await db
          .update(studentsTable)
          .set({ processBaseline: next })
          .where(eq(studentsTable.id, studentId))
          .catch((err) => {
            logger.warn({ err, studentId }, "Failed to update process baseline");
          });
      }
    }

    const row = inserted[0];
    res.status(201).json(SubmissionZ.parse(row));

    // Authoritative server-side AI check, regardless of any client-side
    // pre-scoring. Runs in the background so the POST returns immediately.
    void runAICheck(row.id, content);
  },
);

router.get(
  "/submissions/module/:moduleId",
  requireStudent,
  async (req: Request<{ moduleId: string }>, res: Response) => {
    const studentId = req.studentId as number;
    const rows = await db
      .select()
      .from(submissionsTable)
      .where(
        and(
          eq(submissionsTable.studentId, studentId),
          eq(submissionsTable.moduleId, req.params.moduleId),
        ),
      )
      .orderBy(desc(submissionsTable.createdAt))
      .limit(1);
    res.json(SubmissionOrNullZ.parse({ submission: rows[0] ?? null }));
  },
);

async function runAICheck(submissionId: number, content: string): Promise<void> {
  try {
    const result = await checkWithGPTZero(content);
    if (result) {
      await db
        .update(submissionsTable)
        .set({
          aiScore: result.aiScore,
          aiClass: result.aiClass,
          aiCheckedAt: new Date(),
          aiStatus: "completed",
        })
        .where(eq(submissionsTable.id, submissionId));
    } else {
      await db
        .update(submissionsTable)
        .set({ aiCheckedAt: new Date(), aiStatus: "failed" })
        .where(eq(submissionsTable.id, submissionId));
    }
  } catch (err) {
    logger.error({ err, submissionId }, "Background AI check crashed");
    await db
      .update(submissionsTable)
      .set({ aiCheckedAt: new Date(), aiStatus: "failed" })
      .where(eq(submissionsTable.id, submissionId))
      .catch(() => {});
  }
}

export default router;
