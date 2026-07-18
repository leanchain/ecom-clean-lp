import Link from "next/link";

const STAGES = [
  "Product page",
  "Variant",
  "Add to cart",
  "Cart",
  "Checkout",
  "Purchase",
];

const LAYERS = [
  { label: "Store state", title: "Shopify catalog and product identity" },
  {
    label: "Page state",
    title: "Completed crawls and product-page verification",
  },
  { label: "Channel state", title: "Structured product and channel gaps" },
  { label: "Search source", title: "Search Console connection and freshness" },
];

export default function HealthDomainsSection() {
  return (
    <section
      id="store-health-domains"
      className="scroll-mt-20 border-t border-rule bg-surface"
    >
      <div className="section-pad-tight mx-auto max-w-6xl px-6">
        <div className="max-w-4xl">
          <p className="editorial-eyebrow text-primary">Store Health</p>
          <h2 className="editorial-heading mt-4 text-ink">
            One store, two forms of health.
          </h2>
          <p className="mt-6 max-w-3xl text-[17px] leading-relaxed text-foreground">
            Purchasing and discoverability degrade in different ways, so Beseam
            observes them separately—then connects them in one workspace with
            the evidence kept visible.
          </p>
        </div>

        <div className="mt-12 grid gap-px border border-rule bg-rule lg:grid-cols-2">
          <div
            id="purchase-health"
            className="scroll-mt-24 bg-panel p-7 shadow-[0_1px_2px_rgba(23,23,27,0.04),0_8px_24px_-16px_rgba(23,23,27,0.18)] md:p-9"
          >
            <p className="text-[14px] font-semibold text-primary">
              Purchase Health
            </p>
            <h3 className="editorial-subheading mt-3 text-ink">
              Where the buying journey starts to degrade.
            </h3>
            <p className="mt-4 text-[15px] leading-relaxed text-foreground">
              Observed storefront and Shopify commerce signals identify narrow
              purchase problems an uptime check misses—scoped to the stage and
              sessions where they were seen.
            </p>
            <ol className="mt-7 flex flex-wrap items-center gap-y-2 border-y border-rule py-4 text-[14px] font-medium text-ink">
              {STAGES.map((stage, index) => (
                <li key={stage} className="flex items-center">
                  {index > 0 ? (
                    <span aria-hidden className="mx-2.5 text-primary">
                      →
                    </span>
                  ) : null}
                  {stage}
                </li>
              ))}
            </ol>
            <p className="mt-4 text-[13px] leading-relaxed text-muted-foreground">
              Commerce events, JavaScript and form errors, rage clicks and
              abandonment—with session, device and funnel context.
            </p>
            <Link
              href="/purchase-health"
              className="mt-6 inline-flex min-h-11 items-center font-semibold text-ink underline-offset-4 hover:text-primary hover:underline"
            >
              Explore Purchase Health →
            </Link>
          </div>

          <div
            id="discoverability-health"
            className="scroll-mt-24 bg-panel p-7 shadow-[0_1px_2px_rgba(23,23,27,0.04),0_8px_24px_-16px_rgba(23,23,27,0.18)] md:p-9"
          >
            <p className="text-[14px] font-semibold text-primary">
              Discoverability Health
            </p>
            <h3 className="editorial-subheading mt-3 text-ink">
              Whether products can still be found.
            </h3>
            <p className="mt-4 text-[15px] leading-relaxed text-foreground">
              Discoverability is not one score. It starts with catalog truth,
              recent technical coverage and the specific product or page
              evidence behind an issue.
            </p>
            <ul className="mt-7 border-t border-rule">
              {LAYERS.map((layer) => (
                <li
                  key={layer.title}
                  className="grid grid-cols-[6.5rem_1fr] gap-4 border-b border-rule py-3"
                >
                  <span className="pt-0.5 text-[11px] font-semibold uppercase tracking-[0.07em] text-muted-foreground">
                    {layer.label}
                  </span>
                  <span className="text-[14px] font-medium text-ink">
                    {layer.title}
                  </span>
                </li>
              ))}
            </ul>
            <Link
              href="/discoverability-health"
              className="mt-6 inline-flex min-h-11 items-center font-semibold text-ink underline-offset-4 hover:text-primary hover:underline"
            >
              Explore Discoverability Health →
            </Link>
          </div>
        </div>

        <p className="mt-6 max-w-4xl text-[13px] leading-relaxed text-muted-foreground">
          Where a conversion monitor is configured, Beseam checks hourly against
          an earlier baseline window. A correlated change stays an investigation
          path—not a confirmed cause. Product boundary · July 2026.
        </p>
      </div>
    </section>
  );
}
