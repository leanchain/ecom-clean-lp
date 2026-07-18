import Link from "next/link";

import { ArrowRight, CircleCheck, Database, Radar, Route } from "lucide-react";

const SOURCE_GROUPS = [
  "Shopify catalog",
  "Search Console",
  "Crawl + PDP verification",
  "Storefront events",
  "Friction incidents",
];

const ISSUE_FIELDS = [
  "Domain and severity",
  "Affected product, page or stage",
  "Source and observation time",
  "Evidence and confidence",
];

const HANDOFF_FIELDS = [
  "Recommended owner",
  "Investigation path",
  "Deep link to the source",
  "Verification after the fix",
];

const LIMITS = [
  "Missing data becomes unknown—not healthy.",
  "A likely cause remains a hypothesis until the evidence confirms it.",
  "Real-user storefront signals are not synthetic browser reproduction.",
];

const COVERAGE_SOURCES = [
  {
    name: "Shopify catalog",
    domain: "Discoverability",
    state: "Fresh",
    tone: "bg-emerald-500",
    detail: "Recent product snapshot available",
  },
  {
    name: "Storefront tracker",
    domain: "Purchase",
    state: "Fresh",
    tone: "bg-emerald-500",
    detail: "Recent observed event available",
  },
  {
    name: "Completed crawl",
    domain: "Discoverability",
    state: "Fresh",
    tone: "bg-emerald-500",
    detail: "Recent completed crawl round",
  },
  {
    name: "Search Console",
    domain: "Discoverability",
    state: "Stale",
    tone: "bg-amber-500",
    detail: "Last successful sync is outside its freshness window",
  },
  {
    name: "PDP verification",
    domain: "Discoverability",
    state: "Not configured",
    tone: "border border-white/55",
    detail: "No current verification run is available",
  },
];

const FRESHNESS_STATES = [
  ["Not configured", "No trustworthy record or data has arrived yet."],
  [
    "Disconnected or failed",
    "The connection cannot currently support a health answer.",
  ],
  [
    "Stale",
    "Data exists, but it is older than the source-specific freshness window.",
  ],
  [
    "Fresh",
    "Recent data is available; issues still determine the domain state.",
  ],
];

export default function StoreHealthModelSection() {
  return (
    <section
      id="product"
      className="scroll-mt-20 border-t border-technical-rule bg-technical text-white"
    >
      <div className="section-pad-tight mx-auto max-w-6xl px-6">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:items-end lg:gap-16">
          <div>
            <p className="text-[14px] font-semibold text-brand">
              The Beseam trust model
            </p>
            <h2 className="editorial-heading mt-4 text-white">
              Follow the evidence from source to action.
            </h2>
          </div>
          <p className="max-w-2xl text-[17px] leading-relaxed text-white/72">
            Beseam does not collapse every signal into a reassuring score. It
            keeps the source, freshness and affected scope visible while it
            turns observations into a prioritized issue.
          </p>
        </div>

        <div className="mt-12 grid border-y border-technical-rule lg:grid-cols-[minmax(0,1.05fr)_3rem_minmax(0,0.78fr)_3rem_minmax(0,1fr)_3rem_minmax(0,0.9fr)]">
          <div className="py-8 lg:pr-8">
            <Database className="h-5 w-5 text-brand" strokeWidth={1.6} />
            <p className="mt-5 text-[12px] font-semibold uppercase tracking-[0.08em] text-white/48">
              01 · Detect — signals in
            </p>
            <ul className="mt-4 space-y-3">
              {SOURCE_GROUPS.map((source) => (
                <li
                  key={source}
                  className="border-b border-technical-rule pb-3 text-[14px] font-medium text-white/88 last:border-b-0"
                >
                  {source}
                </li>
              ))}
            </ul>
          </div>

          <div className="hidden items-center justify-center border-x border-technical-rule lg:flex">
            <ArrowRight className="h-4 w-4 text-brand" />
          </div>

          <div className="border-t border-technical-rule py-8 lg:border-t-0 lg:px-8">
            <Radar className="h-5 w-5 text-brand" strokeWidth={1.6} />
            <p className="mt-5 text-[12px] font-semibold uppercase tracking-[0.08em] text-white/48">
              02 · Verify — trust check
            </p>
            <p className="mt-4 text-[20px] font-semibold leading-snug">
              Is the source fresh enough to support the answer?
            </p>
            <p className="mt-4 text-[14px] leading-relaxed text-white/62">
              Fresh, stale, disconnected, failed and not configured remain
              distinct states.
            </p>
          </div>

          <div className="hidden items-center justify-center border-x border-technical-rule lg:flex">
            <ArrowRight className="h-4 w-4 text-brand" />
          </div>

          <div className="border-t border-technical-rule py-8 lg:border-t-0 lg:px-8">
            <CircleCheck className="h-5 w-5 text-brand" strokeWidth={1.6} />
            <p className="mt-5 text-[12px] font-semibold uppercase tracking-[0.08em] text-white/48">
              03 · Explain — issue formed
            </p>
            <ul className="mt-4 space-y-3 text-[14px] text-white/78">
              {ISSUE_FIELDS.map((field) => (
                <li key={field} className="flex gap-3">
                  <span
                    aria-hidden
                    className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand"
                  />
                  {field}
                </li>
              ))}
            </ul>
          </div>

          <div className="hidden items-center justify-center border-x border-technical-rule lg:flex">
            <ArrowRight className="h-4 w-4 text-brand" />
          </div>

          <div className="border-t border-technical-rule py-8 lg:border-t-0 lg:pl-8">
            <Route className="h-5 w-5 text-brand" strokeWidth={1.6} />
            <p className="mt-5 text-[12px] font-semibold uppercase tracking-[0.08em] text-white/48">
              04 · Assign and resolve — handoff
            </p>
            <ul className="mt-4 space-y-3 text-[14px] text-white/78">
              {HANDOFF_FIELDS.map((field) => (
                <li key={field} className="flex gap-3">
                  <span
                    aria-hidden
                    className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand"
                  />
                  {field}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          id="how-it-works"
          className="mt-16 grid scroll-mt-24 gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16"
        >
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-white/48">
              Monitoring coverage
            </p>
            <h3 className="mt-4 text-[clamp(1.5rem,2.2vw,2.125rem)] font-semibold leading-tight tracking-[-0.02em] text-white">
              No data is not the same as healthy.
            </h3>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-white/62">
              Every source has its own freshness semantics. A connection must be
              configured, working and recent enough before it can support a
              Store Health answer.
            </p>
            <dl className="mt-6 grid gap-px border border-technical-rule bg-technical-rule sm:grid-cols-2">
              {FRESHNESS_STATES.map(([term, description]) => (
                <div key={term} className="bg-technical-panel px-4 py-4">
                  <dt className="text-[14px] font-semibold text-white">
                    {term}
                  </dt>
                  <dd className="mt-1.5 text-[13px] leading-relaxed text-white/62">
                    {description}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="overflow-hidden border border-technical-rule">
            <div className="border-b border-technical-rule px-5 py-4">
              <p className="text-[13px] font-semibold text-white/52">
                Example Store Health workspace · source coverage
              </p>
            </div>
            <ul>
              {COVERAGE_SOURCES.map((source) => (
                <li
                  key={source.name}
                  className="grid gap-3 border-b border-technical-rule px-5 py-4 last:border-b-0 sm:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)_auto] sm:items-center"
                >
                  <div>
                    <p className="text-[15px] font-semibold text-white">
                      {source.name}
                    </p>
                    <p className="mt-1 text-[12px] text-white/48">
                      {source.domain}
                    </p>
                  </div>
                  <p className="text-[13px] leading-relaxed text-white/62">
                    {source.detail}
                  </p>
                  <span className="flex w-fit items-center gap-2 rounded-full border border-technical-rule bg-technical-panel px-3 py-1.5 text-[12px] font-semibold text-white/82">
                    <span
                      aria-hidden
                      className={"h-2 w-2 rounded-full " + source.tone}
                    />
                    {source.state}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)] lg:items-start">
          <div>
            <p className="text-[15px] font-semibold text-white">
              The boundary is part of the product.
            </p>
            <p className="mt-2 max-w-lg text-[14px] leading-relaxed text-white/62">
              Store Health is useful because it shows where the answer is
              supported—and where more verification is required.
            </p>
          </div>
          <ul className="grid gap-px bg-technical-rule sm:grid-cols-3">
            {LIMITS.map((limit) => (
              <li
                key={limit}
                className="bg-technical-panel px-5 py-4 text-[13px] leading-relaxed text-white/72"
              >
                {limit}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-[14px] font-semibold">
          <Link
            href="/shopify-store-health"
            className="text-brand underline-offset-4 hover:underline"
          >
            Explore Store Health →
          </Link>
          <Link
            href="/monitoring-coverage"
            className="text-white/76 underline-offset-4 hover:text-white hover:underline"
          >
            Understand monitoring coverage →
          </Link>
        </div>
      </div>
    </section>
  );
}
