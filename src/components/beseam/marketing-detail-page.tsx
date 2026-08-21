import Link from "next/link";

import { ArrowRight } from "lucide-react";

import { BookReviewCta } from "@/components/beseam/book-review-cta";
import type { MarketingPageData } from "@/lib/marketing-pages";

const PIPELINE = [
  [
    "01",
    "Connect the source",
    "Use the store, search or storefront evidence already in scope.",
  ],
  [
    "02",
    "Check freshness",
    "Confirm the source is configured, working and recent enough.",
  ],
  [
    "03",
    "Keep provenance",
    "Attach the source record, affected scope and observation time.",
  ],
  [
    "04",
    "Route the issue",
    "Give the right owner an investigation path and next action.",
  ],
];

export default function MarketingDetailPage({
  page,
}: {
  page: MarketingPageData;
}) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://beseam.com";
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": baseUrl + "/" + page.slug + "#webpage",
        url: baseUrl + "/" + page.slug,
        name: page.metaTitle,
        description: page.description,
        isPartOf: { "@id": baseUrl + "/#website" },
        about: { "@id": baseUrl + "/#beseam" },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Beseam",
            item: baseUrl,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: page.eyebrow,
            item: baseUrl + "/" + page.slug,
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: page.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="border-b border-rule bg-ground">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <nav
            aria-label="Breadcrumb"
            className="text-[13px] text-muted-foreground"
          >
            <Link href="/" className="hover:text-signal-ink">
              Beseam
            </Link>
            <span aria-hidden className="mx-2">
              /
            </span>
            <span>{page.eyebrow}</span>
          </nav>

          <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1.12fr)_minmax(18rem,0.68fr)] lg:items-end lg:gap-16">
            <div>
              <p className="text-[14px] font-semibold text-signal-ink">
                {page.eyebrow}
              </p>
              <h1 className="mt-4 max-w-[17ch] text-balance text-[clamp(2.6rem,5.4vw,4.5rem)] font-semibold leading-[1.02] tracking-[-0.02em] text-ink">
                {page.headline}
              </h1>
            </div>
            <div>
              <p className="text-[18px] leading-relaxed text-foreground">
                {page.intro}
              </p>
              <div className="mt-7">
                <BookReviewCta location={page.slug + "_hero"} />
              </div>
            </div>
          </div>

          <p className="mt-12 max-w-[68ch] border-t border-rule pt-6 text-[14px] font-medium leading-relaxed text-ink">
            {page.proofLine}
          </p>
        </div>
      </section>

      <section className="border-b border-rule bg-panel-white">
        <div className="section-pad-tight mx-auto max-w-6xl px-6">
          <div className="grid gap-10 lg:grid-cols-[minmax(14rem,0.45fr)_minmax(0,1fr)] lg:gap-16">
            <div>
              <h2 className="editorial-subheading text-ink">
                {page.observationsHeading ?? "What Beseam uses"}
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-foreground">
                {page.observationsIntro ??
                  "Concrete evidence contributing to this Beseam workspace."}
              </p>
            </div>
            <div className="border-t border-rule">
              {page.observations.map((observation, index) => {
                const Icon = observation.icon;
                return (
                  <article
                    key={observation.title}
                    className="grid gap-3 border-b border-rule py-6 sm:grid-cols-[2.25rem_minmax(0,0.65fr)_minmax(0,1fr)] sm:gap-6"
                  >
                    <span className="flex flex-col items-start gap-1.5 text-[12px] font-semibold tabular-nums text-signal-ink">
                      {Icon ? (
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      ) : null}
                      0{index + 1}
                    </span>
                    <h3 className="text-[17px] font-semibold text-ink">
                      {observation.title}
                    </h3>
                    <p className="text-[14px] leading-relaxed text-foreground">
                      {observation.detail}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-technical-rule bg-ink-deep text-white">
        <div className="section-pad-tight mx-auto max-w-6xl px-6">
          <div className="max-w-4xl">
            <p className="text-[14px] font-semibold text-signal">
              The evidence path
            </p>
            <h2 className="mt-4 max-w-[20ch] text-[clamp(2.1rem,3.6vw,3.5rem)] font-semibold leading-[1.06] tracking-[-0.02em] text-white">
              One evidence path from observation to action.
            </h2>
          </div>
          <ol className="mt-10 grid border-y border-technical-rule md:grid-cols-4">
            {PIPELINE.map(([number, title, body], index) => (
              <li
                key={number}
                className={
                  "relative border-b border-technical-rule py-7 md:border-b-0 md:px-6 " +
                  (index === 0 ? "md:pl-0" : "md:border-l")
                }
              >
                <span className="text-[12px] font-semibold tabular-nums text-signal">
                  {number}
                </span>
                <h3 className="mt-4 text-[18px] font-semibold text-white">
                  {title}
                </h3>
                <p className="mt-3 text-[13px] leading-relaxed text-white/72">
                  {body}
                </p>
                {index < PIPELINE.length - 1 ? (
                  <ArrowRight className="absolute -right-2.5 top-7 z-10 hidden h-5 w-5 bg-ink-deep text-signal md:block" />
                ) : null}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-ground">
        <div className="section-pad-tight mx-auto max-w-6xl px-6">
          <div className="space-y-16">
            {page.sections.map((section, index) => {
              const SectionIcon = section.icon;
              return (
                <article
                  key={section.title}
                  className="grid gap-8 border-t border-rule pt-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20"
                >
                  <div>
                    <div className="flex items-center gap-3">
                      <p className="text-[12px] font-semibold tabular-nums text-signal-ink">
                        0{index + 1}
                      </p>
                      {SectionIcon ? (
                        <SectionIcon
                          className="h-5 w-5 text-signal-ink"
                          aria-hidden="true"
                        />
                      ) : null}
                    </div>
                    <h2 className="editorial-subheading mt-3 text-ink">
                      {section.title}
                    </h2>
                    <p className="mt-4 text-[15px] leading-relaxed text-foreground">
                      {section.body}
                    </p>
                  </div>
                  <ul className="border-t border-rule">
                    {section.points.map((point) => (
                      <li
                        key={point}
                        className="flex gap-3 border-b border-rule py-5 text-[15px] leading-relaxed text-foreground"
                      >
                        <span
                          aria-hidden
                          className="mt-[0.55rem] h-1.5 w-1.5 shrink-0 bg-signal-ink"
                        />
                        {point}
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-y border-rule bg-panel-white">
        <div className="section-pad-tight mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:gap-20">
          <div>
            <p className="text-[14px] font-semibold text-signal-ink">
              Current product boundary
            </p>
            <h2 className="editorial-subheading mt-4 text-ink">
              What Beseam does not claim
            </h2>
          </div>
          <ul className="grid gap-px border border-rule bg-rule sm:grid-cols-2">
            {page.limits.map((limit) => (
              <li
                key={limit}
                className="bg-panel-white px-5 py-5 text-[14px] leading-relaxed text-foreground"
              >
                {limit}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-b border-rule bg-ground">
        <div className="section-pad-tight mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-[minmax(0,0.65fr)_minmax(0,1.35fr)] lg:gap-20">
          <div>
            <h2 className="editorial-subheading text-ink">
              Questions about {page.eyebrow.toLowerCase()}
            </h2>
          </div>
          <div className="border-t border-rule">
            {page.faqs.map((faq) => (
              <details
                key={faq.question}
                className="group border-b border-rule"
              >
                <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-5 py-5 text-[16px] font-semibold text-ink marker:content-none focus-visible:ring-2 focus-visible:ring-signal-ink">
                  {faq.question}
                  <span
                    aria-hidden
                    className="flex h-7 w-7 shrink-0 items-center justify-center border border-rule text-[18px] font-normal text-signal-ink transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="max-w-[68ch] pb-6 pr-10 text-[15px] leading-relaxed text-foreground">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-rule bg-ground-2">
        <div className="mx-auto max-w-6xl px-6 py-10">
          <p className="text-[13px] font-semibold text-black/62">
            Continue exploring Beseam
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            {page.related.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="inline-flex min-h-11 items-center border border-rule px-5 text-[14px] font-semibold text-ink transition-colors hover:border-signal-ink hover:text-signal-ink"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-pigment text-white">
        <div className="section-pad mx-auto max-w-6xl px-6">
          <h2 className="max-w-[20ch] text-[clamp(2.1rem,3.6vw,3.5rem)] font-semibold leading-[1.06] tracking-[-0.02em]">
            Start with one store and one question worth answering.
          </h2>
          <p className="mt-5 max-w-[68ch] text-[18px] leading-relaxed">
            Bring the products that matter and the buying questions you care
            about. We will start from the evidence Beseam can actually observe.
          </p>
          <div className="mt-8">
            <BookReviewCta
              location={page.slug + "_footer"}
              className="bg-ink-deep text-white hover:bg-technical-panel"
            />
          </div>
        </div>
      </section>
    </>
  );
}
