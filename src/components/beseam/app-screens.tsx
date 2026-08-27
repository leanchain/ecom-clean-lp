import { ArrowRight, Check, TrendingUp } from "lucide-react";

/**
 * The product, rebuilt in HTML rather than screenshotted.
 *
 * Everything else drawn on this page is the shopper's world: an assistant
 * answer, a collection page, a cart. None of it shows what a merchant would
 * actually log into, which is the one thing a visitor cannot picture. These
 * two screens are Beseam's own: the actions queue and the impact ledger.
 *
 * Rebuilt, not captured, because a screenshot goes stale silently and blurs on
 * a retina display. Structure, column order, and row anatomy follow the real
 * screens; the accent is the landing signal rather than the app's own primary,
 * because a second brand colour in this page would read as a third-party
 * screenshot rather than as our product.
 *
 * Fidelity has one deliberate limit. The real actions queue is twelve columns
 * wide, and reproducing all twelve here would argue the opposite of what this
 * section claims. It is cropped to the three a merchant acts on, and the crop
 * is stated rather than hidden.
 *
 * The impact figures are illustrative and stamped as such in the frame. Money
 * is deliberately absent: a percentage under an “Example figures” stamp reads
 * as an illustration, whereas a revenue number reads as a case study however
 * it is labelled, and a fabricated result is the one thing this product must
 * never show.
 */

const QUEUE_ROWS = [
  {
    title: "Add the commuting use case to the Urban Shell product page.",
    why: "The shopper asked for a commuting jacket, and the product page never answers whether this one fits that use case.",
    effort: "Quick",
    step: "Review",
    lead: true,
  },
  {
    title: "Explain how Urban Shell fits over everyday layers.",
    why: "The shopper opened the size guide, and fit over layers is still unanswered at the decision point.",
    effort: "Quick",
    step: "Review",
    lead: false,
  },
  {
    title: "Recheck commuter queries after the product-page change.",
    why: "The same buying question should be observed again before claiming that the change helped discovery.",
    effort: "Quick",
    step: "Queue",
    lead: false,
  },
] as const;

const EFFORT_TONE: Record<string, string> = {
  Quick: "border-[#1f7a4d]/35 bg-[#1f7a4d]/[0.08] text-[#1a6b43]",
  Hard: "border-black/20 bg-black/[0.04] text-black/62",
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
export function ActionsScreen() {
  return (
    <div className="border border-black/16 bg-white">
      <ScreenChrome title="Actions" meta="Illustrative product view" />

      <div className="relative">
        <div className="grid grid-cols-[minmax(0,1fr)_4.5rem_4.5rem] gap-3 border-b border-black/12 px-4 py-2 sm:px-5">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-black/50">
            Decision and exact fix
          </p>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-black/50">
            Effort
          </p>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-black/50">
            Next step
          </p>
        </div>

        {QUEUE_ROWS.map((row) => (
          <div
            key={row.title}
            className={`grid grid-cols-[minmax(0,1fr)_4.5rem_4.5rem] items-start gap-3 border-b border-black/10 px-4 py-3.5 last:border-b-0 sm:px-5 ${
              row.lead ? "bg-signal-ink/[0.06]" : ""
            }`}
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
              className={`inline-flex shrink-0 items-center rounded-md border px-1.5 py-0.5 text-[11px] font-medium ${
                EFFORT_TONE[row.effort] ?? EFFORT_TONE.Hard
              }`}
            >
              {row.effort}
            </span>

            <span
              className={`inline-flex shrink-0 items-center gap-1 rounded-md px-2 py-1 text-[11px] font-semibold ${
                row.lead
                  ? "bg-signal-ink text-white"
                  : "border border-black/20 text-black/70"
              }`}
            >
              {row.step}
              <ArrowRight aria-hidden="true" className="h-3 w-3" />
            </span>
          </div>
        ))}
      </div>

      <p className="border-t border-black/12 bg-ground px-4 py-2.5 text-[11px] leading-[1.5] text-black/54 sm:px-5">
        Nine more columns cover owner, confidence, source, and where it was
        measured. They are a click away, and none are needed to start.
      </p>
    </div>
  );
}

/**
 * Figures are illustrative and the frame says so. This follows the same standard as the
 * specimens in ShopperLoss, which carry invented brand names under an
 * “Example” stamp. A percentage with no stamp would read as a case study.
 *
 * Every metric here is phrased so that up is the win. An earlier draft had a
 * row reading “Decreased · search exits · −23%”, which is a genuine
 * improvement and still scans as damage: a visitor reads the minus sign, not
 * the metric name. Where a fix reduces something, name the thing that grew
 * instead.
 *
 * The assistant row leads. Being named in an AI answer is the thing this
 * product exists for, and an earlier draft parked it on “No change”, which
 * argued against the entire page from inside the product screenshot.
 */
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

/** /impact, the outcome ledger with example figures. */
export function ImpactScreen() {
  return (
    <div className="border border-white/16 bg-white/[0.02]">
      <ScreenChrome title="Impact" meta="Example figures" tone="dark" />

      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-b border-white/12 px-4 py-3 sm:px-5">
        <span className="inline-flex items-center gap-2 text-[12px] text-white/70">
          <Check aria-hidden="true" className="h-3.5 w-3.5 text-signal" />
          Verified fixes
          <span className="font-semibold tabular-nums text-white">3</span>
        </span>
        <span className="text-[12px] text-white/70">
          Measured window{" "}
          <span className="font-semibold text-white">28 days</span>
        </span>
      </div>

      {LEDGER_ROWS.map((row) => (
        <div
          key={row.metric}
          className="flex items-center gap-3 border-b border-white/10 px-4 py-2.5 last:border-b-0 sm:px-5"
        >
          <TrendingUp
            aria-hidden="true"
            className="h-3.5 w-3.5 shrink-0 text-signal"
          />
          <span className="min-w-0 flex-1 truncate text-[13px] text-white/72">
            {row.metric}
          </span>
          <span className="shrink-0 whitespace-nowrap text-[13px] tabular-nums text-white/50">
            {row.before} →{" "}
            <span className="font-semibold text-white/88">{row.after}</span>
          </span>
          <span className="w-[4.75rem] shrink-0 whitespace-nowrap text-right text-[13px] font-semibold tabular-nums text-signal">
            {row.delta}
          </span>
        </div>
      ))}

      <p className="border-t border-white/12 px-4 py-2.5 text-[11px] leading-[1.5] text-white/50 sm:px-5">
        Example figures, not a customer&apos;s. The layout is the product, and the
        first numbers published here will be a real store&apos;s.
      </p>
    </div>
  );
}
