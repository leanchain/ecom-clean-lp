import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";

import BookReviewCta from "@/components/beseam/book-review-cta";
import { COMPARISONS, getComparison } from "@/lib/comparisons";

export const dynamicParams = false;

export function generateStaticParams() {
  return COMPARISONS.map((comparison) => ({ slug: comparison.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const comparison = getComparison(slug);

  if (!comparison) return {};

  return {
    title: comparison.metaTitle,
    description: comparison.metaDescription,
    alternates: { canonical: `/compare/${comparison.slug}` },
    openGraph: {
      title: comparison.metaTitle,
      description: comparison.metaDescription,
      url: `/compare/${comparison.slug}`,
      type: "article",
      images: [
        {
          url: comparison.evidence.src,
          alt: comparison.evidence.alt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: comparison.metaTitle,
      description: comparison.metaDescription,
      images: [comparison.evidence.src],
    },
  };
}

export default async function ComparisonPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const comparison = getComparison(slug);

  if (!comparison) notFound();

  const related = COMPARISONS.filter((item) => item.slug !== comparison.slug).slice(0, 3);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: comparison.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Beseam",
        item: "https://beseam.com/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Comparisons",
        item: "https://beseam.com/compare",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `Beseam vs ${comparison.name}`,
        item: `https://beseam.com/compare/${comparison.slug}`,
      },
    ],
  };

  return (
    <article className="bg-[#f4f1e9] text-[#111318]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <header className="border-b border-black/18">
        <div className="mx-auto max-w-[92rem] px-5 pb-18 pt-10 sm:px-8 sm:pb-24 sm:pt-14 lg:px-10 lg:pb-28">
          <Link
            href="/compare"
            className="inline-flex items-center gap-2 text-[12px] font-semibold text-black/52 transition-colors hover:text-[#3154ff]"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            All comparisons
          </Link>

          <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,0.92fr)_minmax(22rem,0.58fr)] lg:items-end lg:gap-20">
            <div>
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-[#3154ff]">
                Beseam vs {comparison.name}
              </p>
              <h1 className="mt-7 max-w-[15ch] font-serif text-[clamp(3rem,5.7vw,6rem)] font-normal leading-[0.97] tracking-[-0.052em]">
                {comparison.headline}
              </h1>
            </div>
            <div className="border-t border-black/24 pt-6 lg:pb-2">
              <p className="text-[17px] leading-[1.68] text-black/66">{comparison.intro}</p>
              <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.1em] text-black/40">
                {comparison.category} · reviewed {formatReviewDate(comparison.lastReviewed)}
              </p>
            </div>
          </div>
        </div>
      </header>

      <section className="border-b border-black/18 bg-[#ebe8df]">
        <div className="mx-auto max-w-[92rem] px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
          <div className="grid border-y border-black/24 lg:grid-cols-3">
            {[
              [`Choose ${comparison.name} when`, comparison.competitorSummary],
              ["Choose Beseam when", comparison.beseamSummary],
              ["Use both when", comparison.useTogetherSummary],
            ].map(([title, detail], index) => (
              <div
                key={title}
                className="border-b border-black/18 py-7 lg:border-b-0 lg:border-r lg:px-7 lg:first:pl-0 lg:last:border-r-0 lg:last:pr-0"
              >
                <span className="font-mono text-[10px] text-black/34">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h2 className="mt-5 font-serif text-[27px] leading-[1.05] tracking-[-0.03em]">
                  {title}
                </h2>
                <p className="mt-5 text-[14px] leading-relaxed text-black/60">{detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-black/18">
        <div className="mx-auto max-w-[92rem] px-5 py-20 sm:px-8 sm:py-24 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-[19rem_minmax(0,1fr)] lg:gap-16">
            <div>
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-[#3154ff]">
                Buyer fit
              </p>
              <h2 className="mt-6 font-serif text-[38px] leading-[1] tracking-[-0.038em]">
                Different tools for different decisions.
              </h2>
            </div>

            <div className="grid gap-0 border-y border-black/24 md:grid-cols-2">
              <div className="border-b border-black/18 py-7 md:border-b-0 md:border-r md:pr-8">
                <h3 className="text-[17px] font-semibold">Choose {comparison.name} when</h3>
                <ul className="mt-5 space-y-4">
                  {comparison.chooseCompetitorWhen.map((item) => (
                    <li key={item} className="grid grid-cols-[1rem_1fr] gap-3 text-[14px] leading-relaxed text-black/60">
                      <span className="mt-[0.65rem] h-px bg-black/35" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="py-7 md:pl-8">
                <h3 className="text-[17px] font-semibold">Choose Beseam when</h3>
                <ul className="mt-5 space-y-4">
                  {comparison.chooseBeseamWhen.map((item) => (
                    <li key={item} className="grid grid-cols-[1rem_1fr] gap-3 text-[14px] leading-relaxed text-black/60">
                      <span className="mt-[0.65rem] h-px bg-[#3154ff]" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-black/18 bg-[#111318] text-white">
        <div className="mx-auto max-w-[92rem] px-5 py-20 sm:px-8 sm:py-24 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-[18rem_minmax(0,1fr)] lg:gap-16">
            <div>
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8ea2ff]">
                Direct comparison
              </p>
              <h2 className="mt-6 font-serif text-[38px] leading-[1] tracking-[-0.038em]">
                Compare the operating model.
              </h2>
            </div>

            <div className="border-t border-white/22">
              <div className="hidden grid-cols-[0.72fr_1fr_1fr] border-b border-white/22 py-3 font-mono text-[9px] uppercase tracking-[0.13em] text-white/40 md:grid">
                <span>Decision</span>
                <span>{comparison.name}</span>
                <span>Beseam</span>
              </div>
              {comparison.rows.map((row) => (
                <div
                  key={row.criterion}
                  className="grid gap-4 border-b border-white/16 py-6 md:grid-cols-[0.72fr_1fr_1fr] md:gap-8"
                >
                  <h3 className="text-[14px] font-semibold text-white/86">{row.criterion}</h3>
                  <div>
                    <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-white/34 md:hidden">
                      {comparison.name}
                    </span>
                    <p className="mt-1 text-[13px] leading-relaxed text-white/54 md:mt-0">{row.competitor}</p>
                  </div>
                  <div>
                    <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-[#8ea2ff] md:hidden">
                      Beseam
                    </span>
                    <p className="mt-1 text-[13px] leading-relaxed text-white/70 md:mt-0">{row.beseam}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-black/18">
        <div className="mx-auto max-w-[92rem] px-5 py-20 sm:px-8 sm:py-24 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-20">
            <div>
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-[#3154ff]">
                Practical workflow
              </p>
              <h2 className="mt-6 max-w-[10ch] font-serif text-[clamp(2.8rem,4.7vw,4.8rem)] font-normal leading-[1] tracking-[-0.045em]">
                What happens after the signal appears?
              </h2>
            </div>

            <div className="border-t border-black/24">
              {comparison.workflow.map((item, index) => (
                <div key={item.step} className="grid gap-5 border-b border-black/18 py-7 md:grid-cols-[3rem_12rem_1fr_1fr] md:gap-7">
                  <span className="font-mono text-[10px] text-black/34">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-[15px] font-semibold">{item.step}</h3>
                  <p className="text-[13px] leading-relaxed text-black/52">{item.competitor}</p>
                  <p className="text-[13px] leading-relaxed text-black/68">{item.beseam}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-black/18 bg-[#ebe8df]">
        <div className="mx-auto max-w-[92rem] px-5 py-20 sm:px-8 sm:py-24 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-[18rem_minmax(0,1fr)] lg:gap-16">
            <div>
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-[#3154ff]">
                Real Beseam evidence
              </p>
              <p className="mt-6 text-[14px] leading-relaxed text-black/58">{comparison.evidence.caption}</p>
            </div>
            <figure className="border border-black/22 bg-[#111318] p-2">
              <Image
                src={comparison.evidence.src}
                alt={comparison.evidence.alt}
                width={1600}
                height={1000}
                className="h-auto w-full"
              />
            </figure>
          </div>
        </div>
      </section>

      <section className="border-b border-black/18">
        <div className="mx-auto max-w-[92rem] px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
          <div className="grid gap-10 border-y border-black/24 py-8 lg:grid-cols-[18rem_minmax(0,1fr)] lg:gap-16">
            <h2 className="font-serif text-[34px] leading-[1.02] tracking-[-0.035em]">
              What Beseam does not replace
            </h2>
            <p className="max-w-3xl text-[16px] leading-[1.72] text-black/64">{comparison.notAReplacementFor}</p>
          </div>
        </div>
      </section>

      <section className="border-b border-black/18 bg-[#ebe8df]">
        <div className="mx-auto max-w-[92rem] px-5 py-20 sm:px-8 sm:py-24 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-[18rem_minmax(0,1fr)] lg:gap-16">
            <div>
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-[#3154ff]">
                Questions buyers ask
              </p>
              <h2 className="mt-6 font-serif text-[38px] leading-[1] tracking-[-0.038em]">
                Before you change the stack.
              </h2>
            </div>
            <div className="border-t border-black/24">
              {comparison.faqs.map((faq) => (
                <details key={faq.question} className="group border-b border-black/18 py-6">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-[16px] font-semibold">
                    {faq.question}
                    <span className="font-mono text-[15px] text-[#3154ff] group-open:rotate-45">+</span>
                  </summary>
                  <p className="max-w-3xl pt-4 text-[14px] leading-relaxed text-black/60">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-black/18">
        <div className="mx-auto max-w-[92rem] px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-[18rem_minmax(0,1fr)] lg:gap-16">
            <div>
              <h2 className="font-serif text-[31px] leading-[1.04] tracking-[-0.035em]">Sources reviewed</h2>
              <p className="mt-4 font-mono text-[9px] uppercase tracking-[0.1em] text-black/40">
                Official product sources · {formatReviewDate(comparison.lastReviewed)}
              </p>
            </div>
            <ul className="border-t border-black/24">
              {comparison.sources.map((source) => (
                <li key={source.url} className="border-b border-black/18 py-5">
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-start gap-3 text-[14px] font-semibold text-black/66 transition-colors hover:text-[#3154ff]"
                  >
                    {source.label}
                    <ExternalLink className="mt-0.5 h-3.5 w-3.5 shrink-0 transition-transform group-hover:translate-x-0.5" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="border-b border-black/18 bg-[#111318] text-white">
        <div className="mx-auto max-w-[92rem] px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-[18rem_minmax(0,1fr)] lg:gap-16">
            <div>
              <h2 className="font-serif text-[31px] leading-[1.04] tracking-[-0.035em]">Related comparisons</h2>
            </div>
            <div className="border-t border-white/22">
              {related.map((item) => (
                <Link
                  key={item.slug}
                  href={`/compare/${item.slug}`}
                  className="group grid gap-3 border-b border-white/16 py-5 sm:grid-cols-[12rem_minmax(0,1fr)_auto] sm:items-start"
                >
                  <span className="text-[14px] font-semibold text-white/88">Beseam vs {item.name}</span>
                  <span className="text-[13px] leading-relaxed text-white/48">{item.headline}</span>
                  <ArrowRight className="h-4 w-4 text-[#8ea2ff] transition-transform group-hover:translate-x-0.5" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-black/18">
        <div className="mx-auto max-w-[92rem] px-5 py-20 sm:px-8 sm:py-24 lg:px-10">
          <div className="grid border-y border-black/24 lg:grid-cols-[minmax(0,1fr)_19rem]">
            <div className="py-10 pr-0 lg:py-14 lg:pr-16">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#3154ff]">
                Bring your existing stack
              </p>
              <h2 className="mt-5 max-w-[16ch] font-serif text-[clamp(2.6rem,4.2vw,4.3rem)] font-normal leading-[1.02] tracking-[-0.04em]">
                Keep the systems that work. Add the decision layer that is missing.
              </h2>
            </div>
            <div className="border-t border-black/24 py-8 lg:border-l lg:border-t-0 lg:py-0 lg:pl-8">
              <div className="flex h-full flex-col justify-center">
                <p className="text-[14px] leading-relaxed text-black/58">
                  Review one store, the tools already in place, and the first revenue issue worth investigating.
                </p>
                <BookReviewCta
                  location={`comparison_${comparison.slug}`}
                  label="Book a 20-minute commerce review"
                  className="mt-7 w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}

function formatReviewDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${value}T00:00:00Z`));
}
