import { Router, type IRouter, type Request, type Response } from "express";
import { sql, eq, and } from "drizzle-orm";
import {
  db,
  studentsTable,
  submissionsTable,
  assignmentDraftsTable,
  canvasSessionsTable,
} from "@workspace/db";
import { anthropic } from "@workspace/integrations-anthropic-ai";
import { modules, moduleById } from "../lib/curriculum";
import { checkWithGPTZero } from "../lib/gptzero";
import { analyzeProcess } from "../lib/processForensics";

const router: IRouter = Router();

interface CheckResult {
  name: string;
  group: "system" | "functional";
  status: "pass" | "fail" | "skip";
  ms: number;
  info?: string;
  error?: string;
}

async function run(
  name: string,
  group: "system" | "functional",
  fn: () => Promise<string | void>,
): Promise<CheckResult> {
  const t0 = Date.now();
  try {
    const info = await fn();
    return {
      name,
      group,
      status: "pass",
      ms: Date.now() - t0,
      info: info ?? undefined,
    };
  } catch (err) {
    return {
      name,
      group,
      status: "fail",
      ms: Date.now() - t0,
      error: err instanceof Error ? err.message : String(err),
    };
  }
}

function skip(name: string, group: "system" | "functional", info: string): CheckResult {
  return { name, group, status: "skip", ms: 0, info };
}

router.post("/diagnostic/run", async (req: Request, res: Response) => {
  const checks: CheckResult[] = [];

  // ----- 1. SYSTEM CHECKS -------------------------------------------------
  checks.push(
    await run("Environment: SESSION_SECRET present", "system", async () => {
      if (!process.env.SESSION_SECRET) throw new Error("SESSION_SECRET is not set");
    }),
    await run("Environment: DATABASE_URL present", "system", async () => {
      if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is not set");
    }),
    await run("Database: connectivity (SELECT 1)", "system", async () => {
      const r = await db.execute(sql`SELECT 1 as ok`);
      const rows = (r as unknown as { rows?: unknown[] }).rows ?? (r as unknown as unknown[]);
      if (!Array.isArray(rows) || rows.length === 0) throw new Error("No rows returned");
      return "ok";
    }),
    await run("Database: tables reachable", "system", async () => {
      // Ensure each core table is queryable.
      await db.select({ id: studentsTable.id }).from(studentsTable).limit(1);
      await db.select({ id: submissionsTable.id }).from(submissionsTable).limit(1);
      await db.select({ id: assignmentDraftsTable.id }).from(assignmentDraftsTable).limit(1);
      await db.select({ id: canvasSessionsTable.id }).from(canvasSessionsTable).limit(1);
      return "students, submissions, drafts, canvas_sessions all queryable";
    }),
    await run("Curriculum: 14 modules loaded, 850 points total", "system", async () => {
      if (modules.length !== 14)
        throw new Error(`expected 14 modules, got ${modules.length}`);
      const total = modules.reduce((s, m) => s + m.points, 0);
      if (total !== 850)
        throw new Error(`expected 850 total points, got ${total}`);
      // Sequential numbering 1..14
      for (let i = 0; i < modules.length; i++) {
        if (modules[i].number !== i + 1)
          throw new Error(`module ${i} has number ${modules[i].number}`);
      }
      return `${modules.length} modules, ${total} pts`;
    }),
    await run("Curriculum: lookup by id works", "system", async () => {
      const m = moduleById("d1");
      if (!m || m.number !== 1) throw new Error("moduleById('d1') failed");
    }),
    // ---- Diachronic AI-detection: synthetic transcription -------------
    // Perfectly uniform 4-char bursts at 180ms intervals with no
    // deletions and pure end-appends should score >= 70 (likelyAI).
    await run(
      "ProcessForensics: synthetic transcription scores >= 70",
      "system",
      async () => {
        const text =
          "The Republic argues that justice is harmony among the parts of the soul. " +
          "Plato distinguishes appetite, spirit, and reason. " +
          "Each must perform its proper function for the soul to flourish. " +
          "When reason rules, the person is just; when appetite rules, the person is unjust.";
        const events: Array<Record<string, unknown>> = [];
        let t = 0;
        let caret = 0;
        const tokens = text.match(/.{1,4}/g) ?? [];
        for (const tok of tokens) {
          events.push({
            t,
            type: "insert",
            k: "i",
            d: tok,
            len: tok.length,
            charCount: tok.length,
            caretBefore: caret,
            caretAfter: caret + tok.length,
          });
          caret += tok.length;
          t += 180;
        }
        const r = analyzeProcess(events, text);
        if (r.processScore < 70) {
          throw new Error(
            `expected >= 70 for synthetic transcription, got ${r.processScore} (class=${r.processClass})`,
          );
        }
        return `score=${r.processScore} class=${r.processClass} flags=${r.flags.length}`;
      },
    ),
    // ---- Diachronic AI-detection: synthetic composition ---------------
    // Variable bursts, ~20% deletions, paragraph pauses, structural
    // edits should score < 35 (human).
    await run(
      "ProcessForensics: synthetic composition scores < 35",
      "system",
      async () => {
        const events: Array<Record<string, unknown>> = [];
        let t = 1000;
        let caret = 0;
        let docLen = 0;
        const insert = (s: string) => {
          events.push({
            t,
            type: "insert",
            k: "i",
            d: s,
            len: s.length,
            charCount: s.length,
            caretBefore: caret,
            caretAfter: caret + s.length,
          });
          caret += s.length;
          docLen += s.length;
          // Variable inter-burst interval (deterministic for repeatability)
          t += 400 + ((s.length * 37) % 800);
        };
        const del = (n: number) => {
          events.push({
            t,
            type: "delete",
            k: "d",
            d: String(n),
            len: n,
            caretBefore: caret,
            caretAfter: caret - n,
          });
          caret = Math.max(0, caret - n);
          docLen = Math.max(0, docLen - n);
          t += 300;
        };
        const longPause = (ms: number) => {
          t += ms;
        };
        const caretJump = (newPos: number) => {
          events.push({
            t,
            type: "caretJump",
            k: "m",
            caretBefore: caret,
            caretAfter: newPos,
          });
          caret = newPos;
          t += 200;
        };

        insert("Plato's Republic argues that justice is");
        del(8);
        insert("a kind of harmony in the soul.");
        longPause(4500);
        // Abandoned-and-restarted start: write 60 chars, delete 55, retry.
        const restartCaret = caret;
        insert(" The three parts of the soul must each fulfill their function");
        longPause(1200);
        del(55);
        longPause(800);
        insert(" The three parts—appetite, spirit, reason—must each");
        del(5);
        insert(" perform their proper function.");
        longPause(800);
        insert(" When reason rules, the soul is well-ordered.");
        longPause(5200);
        insert("\n\nThis view raises a question: what about pleasure?");
        longPause(2000);
        // Backward caret jump >100 chars + structural delete
        caretJump(20);
        del(80);
        caretJump(docLen);
        // Second caret backtrack pattern
        caretJump(Math.max(0, docLen - 200));
        insert(" (revised) ");
        caretJump(docLen);
        insert("\n\nAristotle responds in the Nicomachean Ethics:");
        longPause(900);
        insert(" virtue is a disposition, not a structural feature of the soul. ");
        del(20);
        insert("a habit cultivated through practice. ");
        longPause(1500);
        // Second structural edit
        caretJump(Math.floor(docLen / 2));
        del(60);
        caretJump(docLen);
        insert("This shifts the metaphor from architecture to gardening.");
        // Reference restartCaret to avoid unused warning
        if (restartCaret < 0) throw new Error("unreachable");

        const finalText = "x".repeat(Math.max(docLen, 1));
        const r = analyzeProcess(events, finalText);
        if (r.processScore >= 35) {
          throw new Error(
            `expected < 35 for synthetic composition, got ${r.processScore} (class=${r.processClass})`,
          );
        }
        return `score=${r.processScore} class=${r.processClass}`;
      },
    ),
  );

  // ----- 2. EXTERNAL API CHECKS -------------------------------------------
  checks.push(
    process.env.GPTZERO_API_KEY
      ? await run("GPTZero API: live ping", "system", async () => {
          const r = await checkWithGPTZero(
            "This is a short diagnostic ping. Please disregard.",
          );
          if (!r) throw new Error("GPTZero returned no result");
          return `aiScore=${r.aiScore.toFixed(3)} class=${r.aiClass}`;
        })
      : skip(
          "GPTZero API: live ping",
          "system",
          "GPTZERO_API_KEY not set — AI scoring will be unavailable",
        ),
    await run("Anthropic API (grader/feedback): live ping", "system", async () => {
      const result = await anthropic.messages.create({
        model: "claude-sonnet-4-5",
        max_tokens: 16,
        messages: [{ role: "user", content: "Reply with the single word: pong" }],
      });
      const text = result.content
        .filter((b) => b.type === "text")
        .map((b) => (b as { text: string }).text)
        .join("")
        .trim();
      if (!text) throw new Error("empty response");
      return `model=claude-sonnet-4-5 reply="${text.slice(0, 40)}"`;
    }),
  );

  // ----- 3. FUNCTIONAL CHECKS (round-trip a synthetic student) ------------
  // Use a unique, throwaway student. Cascades clean up drafts/canvas/subs.
  const testEmail = `diag-${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 8)}@diagnostic.local`;
  let testStudentId: number | null = null;

  try {
    checks.push(
      await run("Functional: create synthetic student", "functional", async () => {
        const [row] = await db
          .insert(studentsTable)
          .values({ email: testEmail, name: "Diagnostic Test User" })
          .returning();
        if (!row?.id) throw new Error("insert returned no id");
        testStudentId = row.id;
        return `id=${row.id}`;
      }),
    );

    if (testStudentId == null) {
      checks.push(
        skip(
          "Functional: remaining flow checks",
          "functional",
          "Skipped because synthetic student could not be created.",
        ),
      );
    } else {
      const sid = testStudentId;

      checks.push(
        await run("Functional: integrity acknowledgment writes", "functional", async () => {
          await db
            .update(studentsTable)
            .set({ integrityAckAt: new Date() })
            .where(eq(studentsTable.id, sid));
          const r = await db
            .select({ a: studentsTable.integrityAckAt })
            .from(studentsTable)
            .where(eq(studentsTable.id, sid));
          if (!r[0]?.a) throw new Error("ack timestamp not persisted");
        }),
        await run("Functional: draft round-trip + lock", "functional", async () => {
          await db.insert(assignmentDraftsTable).values({
            studentId: sid,
            moduleId: "d1",
            content: "diagnostic draft body",
            feedback: "diagnostic feedback body",
            feedbackAt: new Date(),
            locked: true,
          });
          const rows = await db
            .select()
            .from(assignmentDraftsTable)
            .where(
              and(
                eq(assignmentDraftsTable.studentId, sid),
                eq(assignmentDraftsTable.moduleId, "d1"),
              ),
            );
          if (!rows[0] || !rows[0].locked)
            throw new Error("draft did not persist or did not lock");
          return `id=${rows[0].id}`;
        }),
        await run("Functional: canvas autosave round-trip", "functional", async () => {
          await db.insert(canvasSessionsTable).values({
            studentId: sid,
            moduleId: "d1",
            content: "diagnostic canvas v1",
            keystrokes: [{ t: 0, k: "i", d: "x" }],
            scoreHistory: [],
          });
          await db
            .update(canvasSessionsTable)
            .set({ content: "diagnostic canvas v2", updatedAt: new Date() })
            .where(
              and(
                eq(canvasSessionsTable.studentId, sid),
                eq(canvasSessionsTable.moduleId, "d1"),
              ),
            );
          const rows = await db
            .select()
            .from(canvasSessionsTable)
            .where(
              and(
                eq(canvasSessionsTable.studentId, sid),
                eq(canvasSessionsTable.moduleId, "d1"),
              ),
            );
          if (rows[0]?.content !== "diagnostic canvas v2")
            throw new Error("autosave update did not persist");
        }),
        await run("Functional: submit module 1", "functional", async () => {
          const [row] = await db
            .insert(submissionsTable)
            .values({
              studentId: sid,
              moduleId: "d1",
              content: "diagnostic submission for module 1",
              aiStatus: "pending",
            })
            .returning();
          if (!row?.id) throw new Error("submission insert returned nothing");
          const back = await db
            .select()
            .from(submissionsTable)
            .where(eq(submissionsTable.id, row.id));
          if (back[0]?.content !== "diagnostic submission for module 1")
            throw new Error("submission did not round-trip");
          return `id=${row.id}`;
        }),
        await run(
          "Functional: sequential gating allows next module after prior submitted",
          "functional",
          async () => {
            // Same logic the POST /submissions handler uses:
            const targetIdx = 1; // module 2 = e1
            const priorIds = modules.slice(0, targetIdx).map((m) => m.id);
            const priorSubs = await db
              .select({ moduleId: submissionsTable.moduleId })
              .from(submissionsTable)
              .where(eq(submissionsTable.studentId, sid));
            const submitted = new Set(priorSubs.map((s) => s.moduleId));
            const missing = priorIds.filter((id) => !submitted.has(id));
            if (missing.length > 0)
              throw new Error(
                `gating still blocks module 2 — missing: ${missing.join(",")}`,
              );
            // Now actually insert module 2 to confirm the chain works:
            await db.insert(submissionsTable).values({
              studentId: sid,
              moduleId: "e1",
              content: "diagnostic submission for module 2",
              aiStatus: "pending",
            });
          },
        ),
        await run(
          "Functional: sequential gating blocks skipping ahead",
          "functional",
          async () => {
            // Try to "submit" module 4 (e2, idx 3) when only d1+e1 are submitted.
            const targetIdx = 3;
            const priorIds = modules.slice(0, targetIdx).map((m) => m.id);
            const priorSubs = await db
              .select({ moduleId: submissionsTable.moduleId })
              .from(submissionsTable)
              .where(eq(submissionsTable.studentId, sid));
            const submitted = new Set(priorSubs.map((s) => s.moduleId));
            const missing = priorIds.filter((id) => !submitted.has(id));
            if (missing.length === 0)
              throw new Error(
                "gating did NOT block skipping ahead — every prior module appears submitted",
              );
            return `correctly blocked; missing: ${missing.join(",")}`;
          },
        ),
        await run(
          "Functional: list submissions for student returns inserted rows",
          "functional",
          async () => {
            const rows = await db
              .select()
              .from(submissionsTable)
              .where(eq(submissionsTable.studentId, sid));
            if (rows.length < 2)
              throw new Error(`expected 2+ submissions, got ${rows.length}`);
            return `${rows.length} submissions`;
          },
        ),
        await run(
          "Functional: admin accommodation toggle persists",
          "functional",
          async () => {
            await db
              .update(studentsTable)
              .set({ accommodated: true })
              .where(eq(studentsTable.id, sid));
            const r = await db
              .select({ a: studentsTable.accommodated })
              .from(studentsTable)
              .where(eq(studentsTable.id, sid));
            if (!r[0]?.a) throw new Error("accommodation flag did not persist");
          },
        ),
      );
    }
  } finally {
    // Cleanup — cascade deletes drafts/canvas/submissions.
    if (testStudentId != null) {
      checks.push(
        await run("Cleanup: delete synthetic student (cascade)", "functional", async () => {
          await db
            .delete(studentsTable)
            .where(eq(studentsTable.id, testStudentId as number));
          const r = await db
            .select({ id: studentsTable.id })
            .from(studentsTable)
            .where(eq(studentsTable.id, testStudentId as number));
          if (r.length !== 0) throw new Error("synthetic student still present after delete");
        }),
      );
    }
  }

  const totals = checks.reduce(
    (acc, c) => {
      acc[c.status]++;
      return acc;
    },
    { pass: 0, fail: 0, skip: 0 } as Record<string, number>,
  );
  const ok = totals.fail === 0;

  req.log.info({ totals }, "Diagnostic completed");
  res.json({
    ok,
    runAt: new Date().toISOString(),
    totals,
    checks,
  });
});

export default router;
