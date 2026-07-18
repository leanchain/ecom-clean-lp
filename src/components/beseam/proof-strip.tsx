import Link from "next/link";

const SOURCES = [
  {
    name: "Shopify",
    detail: "Catalog, products, variants and purchase events",
    href: "/integrations/shopify",
  },
  {
    name: "Search Console",
    detail: "Connection and search-data freshness",
    href: "/integrations/google-search-console",
  },
  {
    name: "Crawl + verification",
    detail: "Completed crawls and rendered product-page evidence",
    href: "/discoverability-health",
  },
  {
    name: "Storefront signals",
    detail: "Commerce events, errors, friction and performance",
    href: "/purchase-health",
  },
];

export default function ProofStrip() {
  return (
    <section
      aria-labelledby="evidence-sources-title"
      className="border-y border-rule bg-panel"
    >
      <div className="mx-auto max-w-[88rem] px-6 py-8">
        <div className="grid gap-7 lg:grid-cols-[minmax(14rem,0.55fr)_minmax(0,1.45fr)] lg:items-start">
          <div>
            <h2
              id="evidence-sources-title"
              className="text-[15px] font-semibold text-ink"
            >
              Evidence from systems already around your store.
            </h2>
            <p className="mt-2 max-w-sm text-[13px] leading-relaxed text-muted-foreground">
              Each source contributes a different part of the answer. Beseam
              keeps its freshness visible.
            </p>
          </div>
          <ul className="grid gap-px border border-rule bg-rule sm:grid-cols-2 xl:grid-cols-4">
            {SOURCES.map((source) => (
              <li key={source.name} className="bg-panel">
                <Link
                  href={source.href}
                  className="group block min-h-full px-5 py-4 focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <span className="flex items-center justify-between gap-3 text-[13px] font-semibold text-ink">
                    {source.name}
                    <span
                      aria-hidden
                      className="text-primary transition-transform group-hover:translate-x-0.5"
                    >
                      →
                    </span>
                  </span>
                  <span className="mt-2 block text-[12px] leading-relaxed text-muted-foreground">
                    {source.detail}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
