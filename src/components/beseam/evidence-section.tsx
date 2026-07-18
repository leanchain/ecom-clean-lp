import Image from "next/image";
import Link from "next/link";

const EXAMPLES = [
  {
    domain: "Discoverability example",
    title: "A missing GTIN blocks Google Shopping eligibility for one product.",
    body: "The issue carries the affected product, missing field, channel, source record and a recommended Shopify action. It does not invent a ranking or revenue outcome.",
    image: "/images/store-health/discoverability-issue.png",
    alt: "Example discoverability issue showing a missing GTIN for Google Shopping, evidence, affected product, owner and recommended action",
    owner: "Content",
    source: "Channel gap",
    firstSeen: "16 July 2026",
    scope: "Product #812",
    href: "/discoverability-health",
    linkLabel: "How discoverability evidence works",
  },
  {
    domain: "Purchase example",
    title:
      "A cluster of mobile Safari sessions could not add the item to cart.",
    body: "Observed storefront signals show the funnel stage, affected sessions, JavaScript errors and rage clicks. A recent theme change remains an investigation path—not a confirmed cause.",
    image: "/images/store-health/issue-detail.png",
    alt: "Example purchase issue showing mobile Safari add-to-cart friction, evidence, affected sessions and recommended investigation",
    owner: "Development",
    source: "Friction incident",
    firstSeen: "14 July 2026",
    scope: "27 sessions · /products/*",
    href: "/purchase-health",
    linkLabel: "How Purchase Health works",
  },
];

export default function EvidenceSection() {
  return (
    <section className="border-t border-rule bg-surface">
      <div className="section-pad-tight mx-auto max-w-6xl px-6">
        <div className="max-w-4xl">
          <p className="text-[14px] font-semibold text-primary">
            Two real product examples
          </p>
          <h2 className="editorial-heading mt-4 text-ink">
            An issue is useful when the evidence survives the handoff.
          </h2>
          <p className="mt-5 max-w-3xl text-[17px] leading-relaxed text-foreground">
            These are seeded examples from the real Store Health interface. They
            demonstrate product behavior, not customer outcomes. Financial
            impact is deliberately left uncalculated.
          </p>
        </div>

        <div className="mt-12 space-y-16 md:space-y-20">
          {EXAMPLES.map((example, index) => (
            <article
              key={example.title}
              className="grid items-center gap-8 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-14"
            >
              <div className={index === 1 ? "lg:order-2" : ""}>
                <p className="text-[13px] font-semibold text-primary">
                  {example.domain}
                </p>
                <h3 className="editorial-subheading mt-3 text-ink">
                  {example.title}
                </h3>
                <p className="mt-4 text-[16px] leading-relaxed text-foreground">
                  {example.body}
                </p>
                <dl className="mt-7 border-y border-rule text-[14px]">
                  {[
                    ["Evidence source", example.source],
                    ["Affected scope", example.scope],
                    ["First observed", example.firstSeen],
                    ["Recommended owner", example.owner],
                  ].map(([term, value]) => (
                    <div
                      key={term}
                      className="grid grid-cols-[8rem_1fr] gap-4 border-b border-rule py-3 last:border-b-0"
                    >
                      <dt className="text-muted-foreground">{term}</dt>
                      <dd className="font-semibold text-ink">{value}</dd>
                    </div>
                  ))}
                </dl>
                <Link
                  href={example.href}
                  className="mt-5 inline-flex min-h-11 items-center font-semibold text-ink underline-offset-4 hover:text-primary hover:underline"
                >
                  {example.linkLabel} →
                </Link>
              </div>

              <div
                className={
                  "overflow-hidden border border-rule bg-panel shadow-[0_1px_2px_rgba(23,23,27,0.04),0_16px_40px_-20px_rgba(23,23,27,0.22)] " +
                  (index === 1 ? "lg:order-1" : "")
                }
              >
                <div className="flex items-center justify-between gap-4 border-b border-rule px-4 py-3 text-[13px] font-medium text-muted-foreground">
                  <span>Example Store Health workspace</span>
                  <span className="text-primary">Impact not calculated</span>
                </div>
                <Image
                  src={example.image}
                  alt={example.alt}
                  width={1000}
                  height={879}
                  sizes="(min-width: 1024px) 62vw, 94vw"
                  className="h-auto w-full"
                />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
