import Link from "next/link";

const SOURCES = [
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

const TRUST_RULES = [
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

export default function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="scroll-mt-20 border-t border-rule bg-surface"
    >
      <div className="section-pad-tight mx-auto max-w-6xl px-6">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
          <div>
            <p className="text-[14px] font-semibold text-primary">
              Monitoring coverage
            </p>
            <h2 className="editorial-heading mt-4 text-ink">
              No data is not the same as healthy.
            </h2>
            <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-foreground">
              Every source has its own freshness semantics. Beseam checks
              whether a connection is configured, working and recent enough
              before it allows that source to support a Store Health answer.
            </p>
            <Link
              href="/monitoring-coverage"
              className="mt-7 inline-flex min-h-11 items-center font-semibold text-primary underline-offset-4 hover:underline"
            >
              See how coverage works →
            </Link>
          </div>

          <div className="overflow-hidden border border-rule bg-technical text-white">
            <div className="border-b border-technical-rule px-5 py-4">
              <p className="text-[12px] font-semibold text-white/52">
                Example Store Health workspace · source coverage
              </p>
            </div>
            <ul>
              {SOURCES.map((source) => (
                <li
                  key={source.name}
                  className="grid gap-3 border-b border-technical-rule px-5 py-4 last:border-b-0 sm:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)_auto] sm:items-center"
                >
                  <div>
                    <p className="text-[14px] font-semibold text-white">
                      {source.name}
                    </p>
                    <p className="mt-1 text-[11px] text-white/48">
                      {source.domain}
                    </p>
                  </div>
                  <p className="text-[12px] leading-relaxed text-white/62">
                    {source.detail}
                  </p>
                  <span className="flex w-fit items-center gap-2 rounded-full border border-technical-rule bg-technical-panel px-3 py-1.5 text-[11px] font-semibold text-white/82">
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

        <dl className="mt-10 grid gap-px border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-4">
          {TRUST_RULES.map(([term, description]) => (
            <div key={term} className="bg-panel px-5 py-5">
              <dt className="text-[14px] font-semibold text-ink">{term}</dt>
              <dd className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
                {description}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
