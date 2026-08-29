import { ArrowRight, Check, TrendingUp } from "lucide-react";

/**
 * The product, rebuilt in HTML rather than screenshotted.
 *
 * Everything else drawn on this page is the shopper's world: an assistant
 * answer, a collection page, a cart. None of it shows what a merchant would
 * actually log into, which is the one thing a visitor cannot picture. These
 * two screens are Beseam's own: the Growth plan and the Results ledger.
 *
 * Rebuilt, not captured, because a screenshot goes stale silently and blurs on
 * a retina display. Structure, column order, and row anatomy follow the real
 * screens; the accent is the landing signal rather than the app's own primary.
 *
 * The real queue is wider. This marketing view keeps only the columns needed to
 * understand the decision: opportunity, priority, effort, estimated impact,
 * and next step.
 *
 * All figures in these reconstructed product views are illustrative. Growth plan
 * impact uses relative $ / $$ / $$$ tiers rather than invented revenue amounts.
 * Results keeps its own example stamp for the same reason.
 */

const QUEUE_ROWS = [
  {
    title: "Add the commuting use case to the Urban Shell product page.",
    why: "The shopper asked for a commuting jacket, and the product page never answers whether this one fits that use case.",
    priority: "High",
    effort: "Quick",
    impact: "$$$$$",
    step: "Review",
    lead: true,
  },
  {
    title: "Explain how Urban Shell fits over everyday layers.",
    why: "The shopper opened the size guide, and fit over layers is still unanswered at the decision point.",
    priority: "Medium",
    effort: "Quick",
    impact: "$$$",
    step: "Review",
    lead: false,
  },
  {
    title: "Recheck commuter queries after the product-page change.",
    why: "The same buying question should be observed again before claiming that the change helped discovery.",
    priority: "Low",
    effort: "Quick",
    impact: "$",
    step: "Queue",
    lead: false,
  },
] as const;

const EFFORT_TONE: Record<string, string> = {
  Quick: "border-[#1f7a4d]/35 bg-[#1f7a4d]/[0.08] text-[#1a6b43]",
  Hard: "border-black/20 bg-black/[0.04] text-black/62",
};

const PRIORITY_TONE: Record<string, string> = {
  High: "border-signal-ink/30 bg-signal-ink/[0.07] text-signal-ink",
  Medium: "border-black/20 bg-black/[0.05] text-[#3f3f3f]",
  Low: "border-black/14 bg-black/[0.02] text-black/52",
};

function ScreenChrome({
  title,
  meta,
  tone = "light",
}: {
  title: string;
  meta: string;
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  return (
    <div
      className={`flex items-baseline justify-between gap-4 border-b px-4 py-3 sm:px-5 ${
        dark ? "border-white/12 bg-white/[0.03]" : "border-black/12 bg-ground"
      }`}
    >
      <p
        className={`text-[15px] font-semibold tracking-[-0.01em] ${
          dark ? "text-white" : "text-ink-deep"
        }`}
      >
        {title}
      </p>
      <p
        className={`font-mono text-[10px] uppercase tracking-[0.1em] ${
          dark ? "text-white/50" : "text-black/50"
        }`}
      >
        {meta}
      </p>
    </div>
  );
}

/** /actions, cropped to the columns a merchant acts on. */
export function ActionsScreen({ compact = false }: { compact?: boolean } = {}) {
  if (compact) {
    return (
      <div className="min-w-0 overflow-hidden border border-black/16 bg-white">
        <div className="flex items-center justify-between gap-4 border-b border-black/12 bg-ground px-4 py-3">
          <p className="text-[14px] font-semibold text-ink-deep">Growth plan</p>
          <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-black/52">
            3 opportunities
          </p>
        </div>

        <div className="divide-y divide-black/10">
          {QUEUE_ROWS.map((row) => (
            <article
              key={row.title}
              className={`min-w-0 px-4 py-4 ${
                row.lead ? "bg-signal-ink/[0.055]" : "bg-white"
              }`}
            >
              <div className="flex min-w-0 items-start justify-between gap-3">
                <p className="min-w-0 text-[14px] font-semibold leading-[1.35] text-ink-deep">
                  {row.title}
                </p>
                {row.lead ? (
                  <span className="shrink-0 bg-ink-deep px-2 py-1 text-[11px] font-semibold text-white">
                    Next to review
                  </span>
                ) : null}
              </div>

              <p className="mt-2 text-[12.5px] leading-[1.5] text-black/62">
                {row.why}
              </p>

              <dl className="mt-3 grid grid-cols-3 gap-3 border-t border-black/10 pt-3">
                <div>
                  <dt className="font-mono text-[11px] font-semibold uppercase tracking-[0.07em] text-black/48">
                    Priority
                  </dt>
                  <dd className="mt-1.5">
                    <span
                      className={`inline-flex rounded-md border px-2 py-0.5 text-[11.5px] font-semibold ${PRIORITY_TONE[row.priority]}`}
                    >
                      {row.priority}
                    </span>
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-[11px] font-semibold uppercase tracking-[0.07em] text-black/48">
                    Effort
                  </dt>
                  <dd className="mt-1.5">
                    <span className="inline-flex rounded-md border border-[#1f7a4d]/35 bg-[#1f7a4d]/[0.08] px-2 py-0.5 text-[11.5px] font-semibold text-[#1a6b43]">
                      {row.effort}
                    </span>
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-[11px] font-semibold uppercase tracking-[0.07em] text-black/48">
                    Next
                  </dt>
                  <dd className="mt-1.5">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 text-[11.5px] font-semibold ${
                        row.lead
                          ? "bg-[var(--secondary)] text-[var(--secondary-foreground)]"
                          : "border border-black/18 text-black/68"
                      }`}
                    >
                      {row.step}
                      <ArrowRight aria-hidden="true" className="h-3 w-3" />
                    </span>
                  </dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="border border-black/16 bg-white">
      <ScreenChrome title="Growth plan" meta="Illustrative · 3 opportunities" />

      <div className="relative overflow-x-auto">
        <div className="min-w-[58rem]">
          <div
            className="grid gap-4 border-b border-black/12 px-4 py-2 sm:px-5"
            style={{
              gridTemplateColumns:
                "minmax(0,1fr) 4rem 4.5rem 6rem 5.5rem",
            }}
          >
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-black/50">
              Opportunity and prepared fix
            </p>
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-black/50">
              Priority
            </p>
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-black/50">
              Effort
            </p>
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-black/50">
              Impact
            </p>
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-black/50">
              Next step
            </p>
          </div>

          {QUEUE_ROWS.map((row) => (
            <div
              key={row.title}
              className={`grid items-center gap-4 border-b border-black/10 px-4 py-3.5 last:border-b-0 sm:px-5 ${
                row.lead ? "bg-signal-ink/[0.06]" : ""
              }`}
              style={{
                gridTemplateColumns:
                  "minmax(0,1fr) 4rem 4.5rem 6rem 5.5rem",
              }}
            >
              <div>
                <p
                  className={`leading-[1.4] ${
                    row.lead
                      ? "text-[15px] font-semibold text-ink-deep"
                      : "text-[14px] text-black/78"
                  }`}
                >
                  {row.title}
                </p>
                <p className="mt-1 max-w-[46ch] text-[12px] leading-[1.55] text-black/54">
                  {row.why}
                </p>
              </div>

              <span
                className={`inline-flex shrink-0 items-center rounded-md border px-1.5 py-0.5 text-[11px] font-medium ${PRIORITY_TONE[row.priority]}`}
              >
                {row.priority}
              </span>

              <span
                className={`inline-flex shrink-0 items-center rounded-md border px-1.5 py-0.5 text-[11px] font-medium ${
                  EFFORT_TONE[row.effort] ?? EFFORT_TONE.Hard
                }`}
              >
                {row.effort}
              </span>

              <span className="font-mono text-[11px] font-semibold tabular-nums text-ink-deep">
                {row.impact}
              </span>

              <span
                className={`inline-flex shrink-0 items-center gap-1 rounded-md px-2 py-1 text-[11px] font-semibold ${
                  row.lead
                    ? "bg-[var(--secondary)] text-[var(--secondary-foreground)]"
                    : "border border-black/20 text-black/70"
                }`}
              >
                {row.step}
                <ArrowRight aria-hidden="true" className="h-3 w-3" />
              </span>
            </div>
          ))}
        </div>
      </div>

      <p className="border-t border-black/12 bg-ground px-4 py-2.5 text-[11px] leading-[1.5] text-black/54 sm:px-5">
        Every opportunity keeps its evidence, owner, approval state, commercial
        impact tier, and proof plan attached.
      </p>
    </div>
  );
}
const LEDGER_ROWS = [
  {
    metric: "Commuter answers naming Urban Shell",
    before: "9%",
    after: "23%",
    delta: "+2.6×",
  },
  {
    metric: "Store search → Urban Shell page",
    before: "46%",
    after: "57%",
    delta: "+24%",
  },
  {
    metric: "Urban Shell page → add to cart",
    before: "2.4%",
    after: "2.9%",
    delta: "+21%",
  },
] as const;

/** /impact, rendered as a measured before/after result ledger. */
export function ImpactScreen() {
  return (
    <div className="min-w-0 overflow-hidden border border-white/16 bg-white/[0.025]">
      <ScreenChrome title="Results" meta="Illustrative · measured rerun" tone="dark" />

      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-b border-white/12 px-4 py-3 sm:px-5">
        <span className="inline-flex items-center gap-2 text-[12px] text-white/70">
          <Check aria-hidden="true" className="h-3.5 w-3.5 text-signal" />
          Approved change verified
        </span>
        <span className="text-[12px] text-white/70">
          Measured window <span className="font-semibold text-white">28 days</span>
        </span>
        <span className="text-[12px] text-white/50">Same question · same segment</span>
      </div>

      {LEDGER_ROWS.map((row) => (
        <div
          key={row.metric}
          className="flex items-center gap-3 border-b border-white/10 px-4 py-3 last:border-b-0 sm:px-5"
        >
          <TrendingUp
            aria-hidden="true"
            className="h-3.5 w-3.5 shrink-0 text-signal"
          />
          <span className="min-w-0 flex-1 text-[13px] leading-[1.35] text-white/72">
            {row.metric}
          </span>
          <span className="shrink-0 whitespace-nowrap text-[13px] tabular-nums text-white/50">
            {row.before} → <span className="font-semibold text-white/88">{row.after}</span>
          </span>
          <span className="w-[4.75rem] shrink-0 whitespace-nowrap text-right text-[13px] font-semibold tabular-nums text-signal">
            {row.delta}
          </span>
        </div>
      ))}

      <p className="border-t border-white/12 px-4 py-2.5 text-[11px] leading-[1.5] text-white/50 sm:px-5">
        Illustrative figures, not a customer claim. Beseam only shows a result after the original signal is measured again.
      </p>
    </div>
  );
}
