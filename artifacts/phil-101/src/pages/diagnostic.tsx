import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, MinusCircle, Loader2 } from "lucide-react";

interface CheckResult {
  name: string;
  group: "system" | "functional";
  status: "pass" | "fail" | "skip";
  ms: number;
  info?: string;
  error?: string;
}

interface DiagnosticResponse {
  ok: boolean;
  runAt: string;
  totals: { pass: number; fail: number; skip: number };
  checks: CheckResult[];
}

export default function DiagnosticPage() {
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState<DiagnosticResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function runDiagnostic() {
    setRunning(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch(
        `${import.meta.env.BASE_URL}api/diagnostic/run`,
        { method: "POST" },
      );
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = (await res.json()) as DiagnosticResponse;
      setResult(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setRunning(false);
    }
  }

  const systemChecks = result?.checks.filter((c) => c.group === "system") ?? [];
  const functionalChecks =
    result?.checks.filter((c) => c.group === "functional") ?? [];

  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      {/* Page header */}
      <h1 className="font-serif text-4xl font-semibold tracking-tight text-stone-900">
        Diagnostic
      </h1>
      <p className="mt-3 max-w-3xl text-stone-700">
        Run a self-test of the application — verifies that all backend services,
        the database, the AI integration, and the core user flows are
        functioning. This does not evaluate the quality of any answers, grades,
        or content; it only verifies that the formal mechanics of the app work.
      </p>

      <hr className="my-8 border-stone-200" />

      {/* Run card */}
      <section className="rounded-lg border border-stone-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div className="flex-1">
            <div className="text-stone-900">
              Press the button to run a full system + functional self-check.
              Results appear below. Total runtime: roughly 5–15 seconds.
            </div>
            <div className="mt-1 text-sm text-stone-500">
              The functional test creates a temporary &ldquo;Diagnostic
              Bot&rdquo; user and deletes it when finished. No real student
              data is touched.
            </div>
          </div>
          <Button
            onClick={runDiagnostic}
            disabled={running}
            size="lg"
            className="min-w-[150px]"
            data-testid="button-run-diagnostic"
          >
            {running ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Running…
              </>
            ) : (
              "Run diagnostic"
            )}
          </Button>
        </div>
      </section>

      {/* Running indicator */}
      {running && (
        <section className="mt-5 rounded-lg border border-stone-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3 text-stone-800">
            <Loader2 className="h-5 w-5 animate-spin text-stone-500" />
            <span className="font-medium">Running diagnostic…</span>
          </div>
        </section>
      )}

      {/* Error */}
      {error && (
        <div
          className="mt-5 rounded-md border border-red-300 bg-red-50 p-3 text-sm text-red-800"
          data-testid="diagnostic-error"
        >
          Diagnostic request failed: {error}
        </div>
      )}

      {/* Summary banner */}
      {result && !running && (
        <div
          className={`mt-5 rounded-md border p-4 text-sm ${
            result.ok
              ? "border-green-300 bg-green-50 text-green-900"
              : "border-red-300 bg-red-50 text-red-900"
          }`}
          data-testid="diagnostic-summary"
        >
          <div className="font-medium">
            {result.ok ? "All checks passed." : "One or more checks FAILED."}
          </div>
          <div className="mt-1 text-xs opacity-80">
            {result.totals.pass} passed · {result.totals.fail} failed ·{" "}
            {result.totals.skip} skipped · run at{" "}
            {new Date(result.runAt).toLocaleTimeString()}
          </div>
        </div>
      )}

      {/* Sections */}
      {result && !running && (
        <>
          <ChecksSection
            number={1}
            title="System Check"
            description="Verifies environment variables, database connectivity, AI integration roundtrip, and that the curriculum is fully loaded."
            checks={systemChecks}
            testid="section-system"
          />
          <ChecksSection
            number={2}
            title="Functional Check"
            description="End-to-end round-trip of the student flow with a temporary Diagnostic Bot user (cleaned up automatically)."
            checks={functionalChecks}
            testid="section-functional"
          />
        </>
      )}
    </main>
  );
}

function ChecksSection({
  number,
  title,
  description,
  checks,
  testid,
}: {
  number: number;
  title: string;
  description: string;
  checks: CheckResult[];
  testid: string;
}) {
  return (
    <section
      className="mt-5 rounded-lg border border-stone-200 bg-white p-6 shadow-sm"
      data-testid={testid}
    >
      <h2 className="font-serif text-xl font-semibold tracking-tight text-stone-900">
        {number}. {title}
      </h2>
      <p className="mt-1 text-sm text-stone-600">{description}</p>

      <ul className="mt-4 divide-y divide-stone-200">
        {checks.map((c, i) => (
          <li
            key={`${c.name}-${i}`}
            className="flex items-start gap-3 py-3"
            data-testid={`check-${c.status}`}
          >
            <StatusIcon status={c.status} />
            <div className="flex-1">
              <div className="flex items-baseline justify-between gap-3">
                <span className="text-[15px] font-semibold text-stone-900">
                  {c.name}
                </span>
                <span className="shrink-0 text-xs tabular-nums text-stone-500">
                  {c.ms}ms
                </span>
              </div>
              {c.info && (
                <div className="mt-0.5 text-xs text-stone-500">{c.info}</div>
              )}
              {c.error && (
                <div className="mt-0.5 text-xs text-red-700">{c.error}</div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

function StatusIcon({ status }: { status: CheckResult["status"] }) {
  if (status === "pass")
    return (
      <CheckCircle2
        className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600"
        strokeWidth={2}
      />
    );
  if (status === "fail")
    return <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />;
  return <MinusCircle className="mt-0.5 h-5 w-5 shrink-0 text-stone-400" />;
}
