import Image from "next/image";
import Link from "next/link";

import AiVisibilityPreview from "@/components/beseam/ai-visibility-preview";

const EXAMPLES = [
  {
    kind: "visibility",
    domain: "AI visibility example",
    title:
      "A competitor outranks your product for a high-intent buying question.",
    body: "The run keeps the prompt, answer, channel, product-card and citation positions, competing result, and reason evidence together. The percentage never loses its source.",
    image: null,
    alt: "",
    owner: "SEO + merchandising",
    source: "AI query run",
    observed: "Latest monitored answer",
    scope: "Product + answer engine",
    href: "/ai-visibility-monitoring",
    linkLabel: "How AI visibility evidence works",
  },
  {
    kind: "purchase",
    domain: "Store Health example",
    title:
      "A cluster of mobile Safari sessions could not add the item to cart.",
    body: "Observed storefront signals show the funnel stage, affected sessions, JavaScript errors, and rage clicks. A recent theme change remains an investigation path - not a confirmed cause.",
    image: "/images/store-health/issue-detail.png",
    alt: "Example purchase issue showing mobile Safari add-to-cart friction, evidence, affected sessions, and recommended investigation",
    owner: "Development",
    source: "Friction incident",
    observed: "14 July 2026",
    scope: "27 sessions · /products/*",
    href: "/purchase-health",
    linkLabel: "How Purchase Health evidence works",
  },
] as const;

export default function EvidenceSection() {
  return (
    <section className="border-t border-rule bg-surface">
      <div className="section-pad-tight mx-auto max-w-6xl px-6">
        <div className="max-w-4xl">
          <p className="text-[14px] font-semibold text-primary">
            One example from each workspace
          </p>
          <h2 className="editorial-heading mt-4 text-ink">
            Evidence should survive the handoff.
          </h2>
          <p className="mt-5 max-w-3xl text-[17px] leading-relaxed text-foreground">
            Whether the issue begins in an AI answer or the purchase journey,
            Beseam preserves what was observed, where it happened, and what the
            team should investigate next.
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
                    ["Observed in", example.observed],
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
                  "overflow-hidden border border-rule bg-panel " +
                  (index === 1 ? "lg:order-1" : "")
                }
              >
                <div className="flex items-center justify-between gap-4 border-b border-rule px-4 py-3 text-[13px] font-medium text-muted-foreground">
                  <span>Example Beseam workspace</span>
                  <span className="text-primary">
                    {example.kind === "visibility"
                      ? "Illustrative data"
                      : "Impact not calculated"}
                  </span>
                </div>
                {example.kind === "visibility" ? (
                  <AiVisibilityPreview compact />
                ) : (
                  <Image
                    src={example.image}
                    alt={example.alt}
                    width={996}
                    height={875}
                    sizes="(min-width: 1024px) 62vw, 94vw"
                    className="h-auto w-full"
                  />
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
