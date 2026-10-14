import { useState, type FormEvent } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Activity, AlertTriangle, CheckCircle2, Loader2, XCircle } from "lucide-react";
import { runSiteAudit, type AuditResult } from "@/lib/site-audit.functions";
import { Cta, Eyebrow, Reveal } from "./ui";
import { CALENDLY_URL } from "./CalendlyEmbed";
import { cn } from "@/lib/utils";

export function HealthCheckSection() {
  const audit = useServerFn(runSiteAudit);
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<AuditResult | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!url.trim()) return;
    setLoading(true); setError(""); setResult(null);
    try {
      setResult(await audit({ data: { url } }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const issues = result?.findings.filter((f) => f.status !== "pass").sort((a, b) => (a.status === "fail" ? -1 : 1) - (b.status === "fail" ? -1 : 1)) ?? [];
  const passes = result?.findings.filter((f) => f.status === "pass") ?? [];

  return (
    <section id="health-check" className="bg-ink py-16 text-ink-foreground md:py-20">
      <div className="container-site">
        <Reveal className="mx-auto max-w-3xl text-center">
          <Eyebrow className="justify-center text-ink-muted">Free Analysis Tool</Eyebrow>
          <h2 className="mt-5 text-4xl font-semibold md:text-6xl">Website Health Check</h2>
          <p className="mt-6 text-lg text-ink-muted">
            Get a comprehensive analysis of your eCommerce store, SEO, marketing, design, and conversion insights, with the revenue you are leaving on the table.
          </p>
          <form onSubmit={onSubmit} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <label htmlFor="audit-url" className="sr-only">Your store URL</label>
            <input
              id="audit-url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="yourstore.com"
              className="h-14 flex-1 rounded-full border border-ink-border bg-transparent px-6 text-base text-ink-foreground placeholder:text-ink-muted focus:border-primary focus:outline-none"
            />
            <button type="submit" disabled={loading} className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-primary px-8 font-semibold text-primary-foreground transition hover:opacity-90 disabled:opacity-60">
              {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Activity className="h-5 w-5" />}
              {loading ? "Analyzing…" : "Analyze"}
            </button>
          </form>
          <p className="mt-4 text-sm text-ink-muted">
            Works for any website. Public pages only, and every figure is traced back to what was measured live on your site.
          </p>
          {error && <p role="alert" className="mt-4 text-sm text-destructive">{error}</p>}
        </Reveal>

        {result && (
          <div className="mx-auto mt-12 max-w-5xl">
            <div className="grid gap-6 rounded-2xl border border-ink-border p-6 md:grid-cols-[auto_1fr] md:items-center md:p-8">
              <div className="text-center md:pr-8">
                <p className={cn("font-display text-7xl font-semibold", scoreColor(result.score))}>{result.score}</p>
                <p className="text-sm text-ink-muted">Overall health score / 100</p>
              </div>
              <div>
                <p className="break-all font-mono text-sm text-ink-muted">{result.finalUrl}</p>
                <p className="mt-1 text-sm text-ink-muted">Platform: {result.platform} · Response: {result.responseMs} ms · HTML: {result.htmlKb} KB</p>
                <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {result.categories.map((c) => (
                    <div key={c.name} className="rounded-xl border border-ink-border p-3">
                      <p className="text-xs text-ink-muted">{c.name}</p>
                      <p className={cn("font-display text-2xl font-semibold", scoreColor(c.score))}>{c.score}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <h3 className="mt-10 text-2xl font-semibold">Issues costing you sales ({issues.length})</h3>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {issues.map((f) => (
                <div key={f.title} className="rounded-2xl border border-ink-border p-5">
                  <div className="flex items-start gap-3">
                    {f.status === "fail" ? <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-destructive" /> : <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-primary" />}
                    <div>
                      <p className="text-xs uppercase tracking-wider text-ink-muted">{f.category} · {f.impact} revenue impact</p>
                      <p className="mt-1 font-semibold">{f.title}</p>
                      <p className="mt-1 text-sm text-ink-muted">Measured: {f.measured}</p>
                      {f.suggestion && <p className="mt-3 text-sm"><span className="font-semibold text-primary">Fix: </span>{f.suggestion}</p>}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {passes.length > 0 && (
              <>
                <h3 className="mt-10 text-2xl font-semibold">What’s working ({passes.length})</h3>
                <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {passes.map((f) => (
                    <li key={f.title} className="flex items-start gap-2 text-sm"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" /><span>{f.title} <span className="text-ink-muted">— {f.measured}</span></span></li>
                  ))}
                </ul>
              </>
            )}

            <div className="mt-10 flex flex-col items-center gap-4 rounded-2xl border border-primary/40 p-8 text-center">
              <p className="text-xl font-semibold">Want these issues fixed and turned into sales?</p>
              <div className="flex flex-wrap justify-center gap-3">
                <Cta href={CALENDLY_URL}>Book a Session with Us</Cta>
                <Cta to="/contact" variant="outlineInk">Get Your Store Fixed</Cta>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function scoreColor(s: number) {
  return s >= 80 ? "text-primary" : s >= 50 ? "text-ink-foreground" : "text-destructive";
}
