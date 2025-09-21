"use client";

import { useEffect, useMemo, useState } from "react";
import type { FormEvent } from "react";
import { clsx } from "clsx";
import type {
  AnalysisRequest,
  AnalysisResult,
  PrimaryGoal,
  ScorecardEntry
} from "@/lib/analysis";
import { analyzeSite } from "@/lib/analysis";

const focusAreaOptions = [
  { value: "technical", label: "Technical SEO" },
  { value: "content", label: "Content depth" },
  { value: "authority", label: "Authority & backlinks" },
  { value: "conversion", label: "Conversion science" },
  { value: "analytics", label: "Analytics & insight" },
  { value: "brand", label: "Brand storytelling" }
];

const goalOptions: { value: PrimaryGoal; label: string; description: string }[] = [
  {
    value: "increase-organic-traffic",
    label: "Grow organic traffic",
    description: "Capture more top-of-funnel demand with topic authority"
  },
  {
    value: "generate-qualified-leads",
    label: "Generate qualified pipeline",
    description: "Match problem-aware visitors with conversion pathways"
  },
  {
    value: "drive-ecommerce-revenue",
    label: "Drive ecommerce revenue",
    description: "Turn product discovery into revenue and repeat orders"
  },
  {
    value: "improve-brand-authority",
    label: "Improve brand authority",
    description: "Own the narrative with thought leadership and PR"
  }
];

const formatOptions = [
  "Deep-dive guide",
  "Playbook or checklist",
  "Interactive tool",
  "Customer story",
  "Video script",
  "Email nurture sequence"
];

const toneOptions = [
  { label: "Balanced", value: "balanced" },
  { label: "Authoritative", value: "authoritative" },
  { label: "Friendly", value: "friendly" },
  { label: "Bold", value: "bold" }
] as const;

const HISTORY_KEY = "seo-intelligence-history";

const defaultRequest: AnalysisRequest = {
  domain: "",
  competitors: ["competitor-one.com", "competitor-two.com"],
  primaryGoal: "increase-organic-traffic",
  focusAreas: ["technical", "content", "authority"],
  audience: "growth and marketing leaders",
  location: "",
  tone: "balanced",
  contentFormats: ["Deep-dive guide", "Customer story"],
  notes: ""
};

interface HistoryEntry {
  request: AnalysisRequest;
  result: AnalysisResult;
}

function parseCompetitors(raw: string): string[] {
  return raw
    .split(/[\n,]+/g)
    .map((entry) => entry.trim())
    .filter(Boolean);
}

function ScorePill({ score, status }: { score: number; status: ScorecardEntry["status"] }) {
  const palette: Record<ScorecardEntry["status"], string> = {
    "on-track": "bg-mint/20 text-mint",
    monitor: "bg-amber/20 text-amber",
    priority: "bg-red-500/20 text-red-400"
  };
  return (
    <span className={clsx("rounded-full px-3 py-1 text-xs font-semibold", palette[status])}>
      {score}/100
    </span>
  );
}

export default function ClientPage() {
  const [form, setForm] = useState<AnalysisRequest>(defaultRequest);
  const [competitorInput, setCompetitorInput] = useState<string>(
    defaultRequest.competitors.join("\n")
  );
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(HISTORY_KEY);
      if (stored) {
        setHistory(JSON.parse(stored) as HistoryEntry[]);
      }
    } catch (error) {
      console.error("Unable to read stored analyses", error);
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(HISTORY_KEY, JSON.stringify(history.slice(0, 5)));
    } catch (error) {
      console.error("Unable to persist history", error);
    }
  }, [history]);

  const competitorCount = useMemo(() => parseCompetitors(competitorInput).length, [competitorInput]);

  function updateFocusAreas(area: string) {
    setForm((prev) => {
      const exists = prev.focusAreas.includes(area);
      return {
        ...prev,
        focusAreas: exists
          ? prev.focusAreas.filter((value) => value !== area)
          : [...prev.focusAreas, area]
      };
    });
  }

  const canSubmit = form.domain.trim().length > 0 && !loading;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSubmit) return;
    setLoading(true);
    const payload: AnalysisRequest = {
      ...form,
      competitors: parseCompetitors(competitorInput)
    };
    setTimeout(() => {
      const result = analyzeSite(payload);
      setAnalysis(result);
      setHistory((prev) => [{ request: payload, result }, ...prev].slice(0, 5));
      setLoading(false);
    }, 280);
  }

  function handlePrefill(entry: HistoryEntry) {
    setForm(entry.request);
    setCompetitorInput(entry.request.competitors.join("\n"));
    setAnalysis(entry.result);
  }

  function resetForm() {
    setForm(defaultRequest);
    setCompetitorInput(defaultRequest.competitors.join("\n"));
    setAnalysis(null);
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,360px),1fr]">
      <section className="section-card space-y-8">
        <header className="space-y-2">
          <h2 className="text-2xl font-semibold text-white">Analysis blueprint</h2>
          <p className="text-sm text-white/70">
            Define your competitive landscape and the platform crafts a prioritized roadmap across
            technical, content, and authority plays.
          </p>
        </header>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-3">
            <label className="flex flex-col gap-2">
              <span className="text-sm font-medium text-white/80">Primary domain</span>
              <input
                value={form.domain}
                onChange={(event) => setForm((prev) => ({ ...prev, domain: event.target.value }))
                }
                placeholder="example.com"
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/40"
                required
              />
            </label>
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="flex flex-col gap-2">
                <span className="text-sm font-medium text-white/80">Primary audience</span>
                <input
                  value={form.audience ?? ""}
                  onChange={(event) => setForm((prev) => ({ ...prev, audience: event.target.value }))}
                  placeholder="e.g. revenue operations leaders"
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/40"
                />
              </label>
              <label className="flex flex-col gap-2">
                <span className="text-sm font-medium text-white/80">Priority region</span>
                <input
                  value={form.location ?? ""}
                  onChange={(event) => setForm((prev) => ({ ...prev, location: event.target.value }))}
                  placeholder="e.g. North America"
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/40"
                />
              </label>
            </div>
          </div>

          <fieldset className="space-y-3">
            <legend className="text-sm font-medium text-white/80">Primary goal</legend>
            <div className="space-y-3">
              {goalOptions.map((goal) => (
                <label
                  key={goal.value}
                  className={clsx(
                    "flex cursor-pointer items-start gap-3 rounded-2xl border px-4 py-3 transition",
                    form.primaryGoal === goal.value
                      ? "border-brand/60 bg-brand/10"
                      : "border-white/10 bg-white/5 hover:border-white/20"
                  )}
                >
                  <input
                    type="radio"
                    name="primaryGoal"
                    value={goal.value}
                    checked={form.primaryGoal === goal.value}
                    onChange={() => setForm((prev) => ({ ...prev, primaryGoal: goal.value }))}
                    className="mt-1"
                  />
                  <span>
                    <span className="text-sm font-semibold text-white">{goal.label}</span>
                    <p className="text-xs text-white/60">{goal.description}</p>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset className="space-y-3">
            <legend className="text-sm font-medium text-white/80">
              Critical focus areas
              <span className="ml-2 rounded-full bg-white/10 px-2 py-0.5 text-xs text-white/60">
                choose at least two
              </span>
            </legend>
            <div className="grid grid-cols-2 gap-2">
              {focusAreaOptions.map((option) => (
                <label
                  key={option.value}
                  className={clsx(
                    "flex cursor-pointer items-center gap-2 rounded-2xl border px-3 py-2 text-xs font-medium transition",
                    form.focusAreas.includes(option.value)
                      ? "border-brand/60 bg-brand/10 text-brand-light"
                      : "border-white/10 bg-white/5 text-white/70 hover:border-white/20"
                  )}
                >
                  <input
                    type="checkbox"
                    checked={form.focusAreas.includes(option.value)}
                    onChange={() => updateFocusAreas(option.value)}
                  />
                  {option.label}
                </label>
              ))}
            </div>
          </fieldset>

          <div className="space-y-3">
            <label className="flex flex-col gap-2">
              <span className="text-sm font-medium text-white/80">Competitors</span>
              <textarea
                value={competitorInput}
                onChange={(event) => setCompetitorInput(event.target.value)}
                rows={4}
                placeholder="One per line or separate with commas"
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/40"
              />
              <span className="text-xs text-white/50">Tracking {competitorCount} competitors</span>
            </label>
          </div>

          <div className="space-y-3">
            <span className="text-sm font-medium text-white/80">Signature content formats</span>
            <div className="grid grid-cols-2 gap-2">
              {formatOptions.map((format) => {
                const isActive = form.contentFormats.includes(format);
                return (
                  <button
                    type="button"
                    key={format}
                    onClick={() =>
                      setForm((prev) => ({
                        ...prev,
                        contentFormats: isActive
                          ? prev.contentFormats.filter((item) => item !== format)
                          : [...prev.contentFormats, format]
                      }))
                    }
                    className={clsx(
                      "rounded-2xl border px-3 py-2 text-xs font-medium transition",
                      isActive
                        ? "border-brand/60 bg-brand/10 text-brand-light"
                        : "border-white/10 bg-white/5 text-white/70 hover:border-white/20"
                    )}
                  >
                    {format}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <label className="flex flex-col gap-2">
              <span className="text-sm font-medium text-white/80">Brand voice</span>
              <select
                value={form.tone}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, tone: event.target.value as AnalysisRequest["tone"] }))
                }
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/40"
              >
                {toneOptions.map((tone) => (
                  <option key={tone.value} value={tone.value} className="bg-slate-900 text-white">
                    {tone.label}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex flex-col gap-2">
              <span className="text-sm font-medium text-white/80">Additional notes</span>
              <input
                value={form.notes ?? ""}
                onChange={(event) => setForm((prev) => ({ ...prev, notes: event.target.value }))}
                placeholder="Upcoming launches, brand guardrails, etc."
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/40"
              />
            </label>
          </div>

          <div className="flex items-center justify-between gap-3">
            <button
              type="submit"
              disabled={!canSubmit}
              className={clsx(
                "flex-1 rounded-2xl bg-brand px-5 py-3 text-sm font-semibold text-white shadow-lg transition",
                !canSubmit && "cursor-not-allowed opacity-60"
              )}
            >
              {loading ? "Generating playbook..." : "Run analysis"}
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="rounded-2xl border border-white/10 px-4 py-3 text-sm text-white/60 transition hover:border-white/30 hover:text-white"
            >
              Reset
            </button>
          </div>
        </form>

        {history.length > 0 && (
          <div className="border-t border-white/5 pt-6">
            <h3 className="text-sm font-semibold text-white">Recent playbooks</h3>
            <p className="text-xs text-white/60">
              Re-open a previous run to compare recommendations and progress.
            </p>
            <ul className="mt-4 space-y-3 text-sm">
              {history.map((entry) => (
                <li key={entry.result.id}>
                  <button
                    type="button"
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-left text-white/80 transition hover:border-brand/60 hover:bg-brand/10"
                    onClick={() => handlePrefill(entry)}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-white">
                        {entry.result.domain}
                      </span>
                      <span className="text-xs text-white/50">
                        {new Date(entry.result.generatedAt).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-xs text-white/60">
                      {entry.result.headline}
                    </p>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      <section className="section-card space-y-8">
        {analysis ? (
          <div className="space-y-8">
            <header className="rounded-3xl border border-brand/40 bg-brand/10 p-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="badge bg-brand/30 text-xs text-white/80">{analysis.category}</span>
                  <h2 className="mt-2 text-2xl font-semibold text-white">
                    {analysis.headline}
                  </h2>
                  <p className="mt-2 text-sm text-white/70">{analysis.summary}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-center">
                  <div className="text-xs uppercase tracking-wide text-white/60">Baseline strength</div>
                  <div className="text-2xl font-semibold text-white">{analysis.baselineScore}</div>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {analysis.highlights.map((highlight) => (
                  <span key={highlight} className="tag-chip">
                    {highlight}
                  </span>
                ))}
              </div>
            </header>

            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="section-title">Key metrics</h3>
                <span className="text-xs text-white/50">Tracked monthly</span>
              </div>
              <div className="grid gap-3 md:grid-cols-3">
                {analysis.keyMetrics.map((metric) => (
                  <div key={metric.label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-white/60">
                      {metric.label}
                    </p>
                    <p className="mt-2 text-lg font-semibold text-white">{metric.current}</p>
                    <p className="text-xs text-white/50">Target: {metric.target}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-4">
              <h3 className="section-title">Performance scorecard</h3>
              <div className="grid gap-3 md:grid-cols-2">
                {analysis.scorecard.map((entry) => (
                  <div key={entry.area} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-white">{entry.area}</p>
                      <ScorePill score={entry.score} status={entry.status} />
                    </div>
                    <p className="mt-2 text-xs text-white/60">{entry.insight}</p>
                    <ul className="mt-3 space-y-1 text-xs text-white/60">
                      {entry.nextMoves.map((move) => (
                        <li key={move} className="flex gap-2">
                          <span className="mt-1 h-1.5 w-1.5 rounded-full bg-brand/70" />
                          <span>{move}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="section-title">Competitor intelligence</h3>
                <span className="text-xs text-white/50">{analysis.competitorBreakdown.length} tracked</span>
              </div>
              <div className="space-y-3">
                {analysis.competitorBreakdown.map((competitor) => (
                  <div key={competitor.name} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-white">{competitor.name}</p>
                        <p className="text-xs text-white/60">{competitor.notes}</p>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-white/70">
                        <span>DA {competitor.domainAuthority}</span>
                        <span>{competitor.organicTraffic}k est. monthly visits</span>
                        <span>{competitor.velocity}</span>
                      </div>
                    </div>
                    <div className="mt-3 grid gap-2 md:grid-cols-2">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-white/50">
                          Top keywords
                        </p>
                        <ul className="mt-1 space-y-1 text-xs text-white/70">
                          {competitor.topKeywords.map((keyword) => (
                            <li key={keyword}>• {keyword}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-white/50">
                          Signature asset
                        </p>
                        <p className="mt-1 text-xs text-white/70">{competitor.standoutContent}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-4">
              <h3 className="section-title">Keyword opportunity map</h3>
              <div className="grid gap-3 md:grid-cols-2">
                {analysis.keywordClusters.map((cluster) => (
                  <div key={cluster.cluster} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-semibold text-white">{cluster.cluster}</p>
                        <p className="text-xs text-white/60">{cluster.intent} • {cluster.funnelStage}</p>
                      </div>
                      <div className="text-right text-xs text-white/60">
                        <p>Difficulty: {cluster.difficulty}</p>
                        <p>Opportunity: {cluster.opportunityScore}</p>
                      </div>
                    </div>
                    <ul className="mt-2 space-y-1 text-xs text-white/70">
                      {cluster.keywords.map((keyword) => (
                        <li key={keyword}>• {keyword}</li>
                      ))}
                    </ul>
                    <p className="mt-2 text-xs text-white/60">{cluster.contentAngle}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-4">
              <h3 className="section-title">Content production sprints</h3>
              <div className="space-y-3">
                {analysis.contentPlan.map((idea) => (
                  <div key={idea.title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-white">{idea.title}</p>
                        <p className="text-xs text-white/60">
                          {idea.format} • Persona: {idea.persona}
                        </p>
                      </div>
                      <span className="tag-chip">Target: {idea.targetKeyword}</span>
                    </div>
                    <div className="mt-3 grid gap-3 md:grid-cols-2">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-white/50">
                          Outline
                        </p>
                        <ul className="mt-1 space-y-1 text-xs text-white/70">
                          {idea.outline.map((item) => (
                            <li key={item}>• {item}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-white/50">
                          Optimization focus
                        </p>
                        <ul className="mt-1 space-y-1 text-xs text-white/70">
                          {idea.optimizationTips.map((tip) => (
                            <li key={tip}>• {tip}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-4">
              <h3 className="section-title">Backlink & authority plays</h3>
              <div className="grid gap-3 md:grid-cols-2">
                {analysis.backlinkProspects.map((prospect) => (
                  <div key={prospect.name} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-sm font-semibold text-white">{prospect.name}</p>
                    <p className="text-xs text-white/60">{prospect.type}</p>
                    <p className="mt-2 text-xs text-white/70">{prospect.reason}</p>
                    <p className="mt-2 text-xs text-white/50">
                      Asset: {prospect.suggestedAsset}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-4">
              <h3 className="section-title">Technical SEO diagnostics</h3>
              <div className="space-y-3">
                {analysis.technicalChecklist.map((item) => (
                  <div key={item.item} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <p className="text-sm font-semibold text-white">{item.item}</p>
                      <span
                        className={clsx(
                          "rounded-full px-3 py-1 text-xs font-semibold",
                          item.status === "pass" && "bg-mint/20 text-mint",
                          item.status === "warning" && "bg-amber/20 text-amber",
                          item.status === "fail" && "bg-red-500/20 text-red-400"
                        )}
                      >
                        {item.priority} priority
                      </span>
                    </div>
                    <p className="mt-2 text-xs text-white/70">{item.detail}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-4">
              <h3 className="section-title">SERP feature capture</h3>
              <div className="grid gap-3 md:grid-cols-3">
                {analysis.serpOpportunities.map((opportunity) => (
                  <div key={opportunity.feature} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-sm font-semibold text-white">{opportunity.feature}</p>
                    <p className="text-xs text-white/60">Status: {opportunity.status}</p>
                    <p className="mt-2 text-xs text-white/70">{opportunity.recommendation}</p>
                    <ul className="mt-2 space-y-1 text-xs text-white/60">
                      {opportunity.supportingActions.map((action) => (
                        <li key={action}>• {action}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-4">
              <h3 className="section-title">Roadmap</h3>
              <div className="grid gap-3 lg:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-sm font-semibold text-white">Quick wins</p>
                  <ul className="mt-2 space-y-2 text-xs text-white/70">
                    {analysis.roadmap.quickWins.map((item) => (
                      <li key={item.name}>
                        <p className="font-semibold text-white/80">{item.name}</p>
                        <p>{item.description}</p>
                        <p className="text-white/50">Success: {item.successMetric}</p>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-sm font-semibold text-white">30-60 day focus</p>
                  <ul className="mt-2 space-y-2 text-xs text-white/70">
                    {analysis.roadmap.mediumTerm.map((item) => (
                      <li key={item.name}>
                        <p className="font-semibold text-white/80">{item.name}</p>
                        <p>{item.description}</p>
                        <p className="text-white/50">Success: {item.successMetric}</p>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-sm font-semibold text-white">Strategic bets</p>
                  <ul className="mt-2 space-y-2 text-xs text-white/70">
                    {analysis.roadmap.strategicBets.map((item) => (
                      <li key={item.name}>
                        <p className="font-semibold text-white/80">{item.name}</p>
                        <p>{item.description}</p>
                        <p className="text-white/50">Success: {item.successMetric}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            <section className="grid gap-4 lg:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <h3 className="text-sm font-semibold text-white">Automation & enablement</h3>
                <ul className="mt-2 space-y-2 text-xs text-white/70">
                  {analysis.automationTips.map((tip) => (
                    <li key={tip}>• {tip}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <h3 className="text-sm font-semibold text-white">Experiment backlog</h3>
                <ul className="mt-2 space-y-2 text-xs text-white/70">
                  {analysis.experiments.map((experiment) => (
                    <li key={experiment.name}>
                      <p className="font-semibold text-white/80">{experiment.name}</p>
                      <p>{experiment.hypothesis}</p>
                      <p className="text-white/50">Metric: {experiment.metric}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            <section className="space-y-4">
              <h3 className="section-title">Reporting cadence</h3>
              <div className="grid gap-3 md:grid-cols-3">
                {analysis.reporting.dashboards.map((dashboard) => (
                  <div key={dashboard.title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-sm font-semibold text-white">{dashboard.title}</p>
                    <p className="text-xs text-white/60">{dashboard.frequency}</p>
                    <ul className="mt-2 space-y-1 text-xs text-white/70">
                      {dashboard.metrics.map((metric) => (
                        <li key={metric}>• {metric}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <p className="text-xs text-white/60">{analysis.reporting.notes}</p>
            </section>

            <section className="space-y-4">
              <h3 className="section-title">Shareable talking points</h3>
              <ul className="space-y-2 text-sm text-white/70">
                {analysis.shareableInsights.map((insight) => (
                  <li key={insight} className="callout">{insight}</li>
                ))}
              </ul>
            </section>
          </div>
        ) : (
          <div className="flex h-full min-h-[480px] flex-col items-center justify-center space-y-6 text-center text-white/60">
            <div className="rounded-full border border-dashed border-white/10 p-8">
              <span className="text-4xl">🔍</span>
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold text-white">Your competitive SEO lab</h2>
              <p className="max-w-md text-sm text-white/60">
                Feed in your domain, competitors, and focus areas. We will blueprint the technical
                fixes, content sprints, link plays, and measurement cadences you need to surpass them.
              </p>
            </div>
            <ul className="grid gap-3 text-left text-sm text-white/60 sm:grid-cols-3">
              <li className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="font-semibold text-white">Competitor battlecards</p>
                <p className="text-xs text-white/50">
                  Domain strength, keyword edge, and content that fuels their rankings.
                </p>
              </li>
              <li className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="font-semibold text-white">Keyword & content orchestration</p>
                <p className="text-xs text-white/50">
                  Prioritized clusters with briefs, CTAs, and optimization punch lists.
                </p>
              </li>
              <li className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="font-semibold text-white">Authority acceleration</p>
                <p className="text-xs text-white/50">
                  Digital PR, partnerships, and automation cues to earn coverage faster.
                </p>
              </li>
            </ul>
          </div>
        )}
      </section>
    </div>
  );
}
