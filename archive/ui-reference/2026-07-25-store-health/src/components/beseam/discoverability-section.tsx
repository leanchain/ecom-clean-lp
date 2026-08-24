import Link from "next/link";

const EVIDENCE_LAYERS = [
  {
    label: "Store state",
    title: "Shopify catalog and product identity",
    body: "Current product records, variants and identifiers provide the starting point for every technical check.",
  },
  {
    label: "Page state",
    title: "Completed crawls and product-page verification",
    body: "Coverage and rendered-page evidence show whether Beseam has a recent technical view of the storefront.",
  },
  {
    label: "Channel state",
    title: "Structured product and channel gaps",
    body: "Current high-priority gaps - such as a missing GTIN - stay attached to the affected product and source record.",
  },
  {
    label: "Search source",
    title: "Search Console connection and freshness",
    body: "A stale or disconnected Search Console source remains a coverage problem instead of becoming a healthy search status.",
  },
];

export default function DiscoverabilitySection() {
  return (
    <section
      id="discoverability-health"
      className="scroll-mt-20 border-t border-rule bg-surface"
    >
      <div className="section-pad-tight mx-auto max-w-6xl px-6">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(18rem,0.65fr)] lg:items-end lg:gap-20">
          <div>
            <p className="text-[14px] font-semibold text-primary">
              Discoverability Health
            </p>
            <h2 className="editorial-heading mt-4 text-ink">
              Know whether Beseam has enough current evidence to assess how
              products are found.
            </h2>
          </div>
          <div>
            <p className="text-[16px] leading-relaxed text-foreground">
              Discoverability is not one score. It begins with catalog truth,
              recent technical coverage and the specific product or page
              evidence behind an issue.
            </p>
            <Link
              href="/discoverability-health"
              className="mt-5 inline-flex min-h-11 items-center font-semibold text-primary underline-offset-4 hover:underline"
            >
              Explore Discoverability Health →
            </Link>
          </div>
        </div>

        <div className="mt-12 border-y border-rule">
          {EVIDENCE_LAYERS.map((layer, index) => (
            <article
              key={layer.title}
              className="grid gap-4 border-b border-rule py-7 last:border-b-0 md:grid-cols-[6rem_minmax(0,0.85fr)_minmax(0,1fr)] md:gap-10"
            >
              <div className="flex items-start gap-3">
                <span className="text-[12px] font-semibold tabular-nums text-primary">
                  0{index + 1}
                </span>
                <span className="text-[11px] font-semibold uppercase tracking-[0.07em] text-muted-foreground">
                  {layer.label}
                </span>
              </div>
              <h3 className="text-[19px] font-semibold leading-snug tracking-[-0.015em] text-ink">
                {layer.title}
              </h3>
              <p className="max-w-xl text-[15px] leading-relaxed text-foreground">
                {layer.body}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-8 border border-rule bg-panel px-6 py-5 md:flex md:items-center md:justify-between md:gap-10">
          <p className="max-w-3xl text-[14px] leading-relaxed text-foreground">
            Current Store Health normalizes channel-readiness gaps and
            product-page verification findings. It also reports crawl and Search
            Console freshness. It does not currently claim complete Search
            Console indexing-issue ingestion or synthetic crawl reproduction.
          </p>
          <p className="mt-4 shrink-0 text-[12px] font-semibold text-primary md:mt-0">
            Product boundary · July 2026
          </p>
        </div>
      </div>
    </section>
  );
}
