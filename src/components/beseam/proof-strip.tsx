import Link from "next/link";

const SOURCES = [
  { name: "Shopify", href: "/integrations/shopify" },
  {
    name: "Google Search Console",
    href: "/integrations/google-search-console",
  },
  { name: "Storefront events", href: "/purchase-health" },
  { name: "Crawl + page verification", href: "/discoverability-health" },
  { name: "AI answer engines", href: "/ai-visibility-monitoring" },
];

export default function ProofStrip() {
  return (
    <section
      aria-labelledby="evidence-sources-title"
      className="border-y border-rule bg-surface"
    >
      <div className="mx-auto grid max-w-6xl gap-x-8 gap-y-4 px-6 py-7 sm:grid-cols-[minmax(0,19rem)_1fr] sm:items-baseline">
        <h2
          id="evidence-sources-title"
          className="text-[13px] font-semibold uppercase tracking-[0.08em] text-muted-foreground"
        >
          Store and answer-engine evidence
        </h2>
        <ul className="flex flex-wrap items-baseline gap-y-1 text-[15px] font-semibold text-ink">
          {SOURCES.map((source, index) => (
            <li key={source.name} className="flex items-baseline">
              {index > 0 ? (
                <span aria-hidden className="mx-3 text-muted-foreground/60">
                  ·
                </span>
              ) : null}
              <Link
                href={source.href}
                className="text-ink underline-offset-4 hover:text-primary hover:underline focus-visible:ring-2 focus-visible:ring-primary"
              >
                {source.name}
              </Link>
            </li>
          ))}
        </ul>
        <p className="text-[13px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
          Designed for
        </p>
        <p className="text-[15px] font-medium text-foreground">
          Ecommerce · SEO + GEO · Content · Development
        </p>
      </div>
    </section>
  );
}
