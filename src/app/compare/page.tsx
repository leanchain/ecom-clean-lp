import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import BookReviewCta from "@/components/beseam/book-review-cta";
import { COMPARISONS } from "@/lib/comparisons";

export const metadata: Metadata = {
  title: "Compare Beseam with analytics and optimization platforms",
  description:
    "Evidence-led comparisons between Beseam and Google Analytics, Hotjar, Contentsquare, Amplitude, VWO, and Triple Whale.",
  alternates: { canonical: "/compare" },
  openGraph: {
    title: "Compare Beseam with analytics and optimization platforms",
    description:
      "See where each platform is stronger, where Beseam differs, and when the tools belong in the same commerce stack.",
    url: "/compare",
    type: "website",
  },
};

export default function ComparePage() {
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Beseam platform comparisons",
    numberOfItems: COMPARISONS.length,
    itemListElement: COMPARISONS.map((comparison, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: `Beseam vs ${comparison.name}`,
      url: `https://beseam.com/compare/${comparison.slug}`,
    })),
  };

  return (
    <div className="bg-[#f4f1e9] text-[#111318]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />

      <section className="border-b border-black/18">
        <div className="mx-auto max-w-[92rem] px-5 pb-20 pt-16 sm:px-8 sm:pb-24 sm:pt-20 lg:px-10 lg:pb-28 lg:pt-24">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.88fr)_minmax(22rem,0.62fr)] lg:items-end lg:gap-20">
            <div>
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-[#3154ff]">
                Compare Beseam
              </p>
              <h1 className="mt-7 max-w-[15ch] font-serif text-[clamp(3.2rem,6vw,6.3rem)] font-normal leading-[0.96] tracking-[-0.052em]">
                Know what each tool is built to do.
              </h1>
            </div>
            <div className="border-t border-black/24 pt-6 lg:pb-2">
              <p className="max-w-xl text-[18px] leading-[1.65] text-black/66">
                Beseam is not a drop-in replacement for every platform below. These comparisons show where the other product is stronger, where Beseam differs, and when both belong in the same stack.
              </p>
              <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.11em] text-black/42">
                Official product sources · reviewed 25 July 2026
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-black/18 bg-[#ebe8df]">
        <div className="mx-auto max-w-[92rem] px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-[18rem_minmax(0,1fr)] lg:gap-16">
            <div>
              <h2 className="font-serif text-[34px] leading-[1.02] tracking-[-0.035em]">
                Six high-intent comparisons.
              </h2>
              <p className="mt-5 text-[14px] leading-relaxed text-black/58">
                Analytics, behavior, experience, experimentation, and commerce measurement each solve a different part of the problem.
              </p>
            </div>

            <div className="border-t border-black/24">
              {COMPARISONS.map((comparison, index) => (
                <Link
                  key={comparison.slug}
                  href={`/compare/${comparison.slug}`}
                  className="group grid gap-5 border-b border-black/18 py-7 transition-colors hover:bg-black/[0.025] sm:grid-cols-[3rem_12rem_minmax(0,1fr)_auto] sm:items-start sm:px-3"
                >
                  <span className="font-mono text-[10px] text-black/34">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-[17px] font-semibold text-black/84">
                      {comparison.name}
                    </h3>
                    <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.09em] text-[#3154ff]">
                      {comparison.category}
                    </p>
                  </div>
                  <p className="max-w-2xl text-[14px] leading-relaxed text-black/60">
                    {comparison.headline}
                  </p>
                  <span className="inline-flex items-center gap-2 text-[12px] font-semibold text-[#3154ff]">
                    Compare
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-black/18">
        <div className="mx-auto max-w-[92rem] px-5 py-20 sm:px-8 sm:py-24 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:gap-20">
            <div>
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-[#3154ff]">
                The useful distinction
              </p>
              <h2 className="mt-6 max-w-[11ch] font-serif text-[clamp(2.8rem,4.6vw,4.8rem)] font-normal leading-[1] tracking-[-0.045em]">
                Reporting, evidence, experimentation, and action are different jobs.
              </h2>
            </div>

            <div className="grid border-y border-black/24 md:grid-cols-3">
              {[
                [
                  "Systems of record",
                  "Analytics and commerce platforms preserve events, attribution, orders, and operational truth.",
                ],
                [
                  "Specialist evidence",
                  "Behavior and experience platforms reveal what visitors did and where the digital journey broke down.",
                ],
                [
                  "Beseam's job",
                  "Connect the evidence, rank the revenue issue, assign the change, and verify the original signal.",
                ],
              ].map(([title, detail]) => (
                <div
                  key={title}
                  className="border-b border-black/18 py-7 md:border-b-0 md:border-r md:px-6 md:first:pl-0 md:last:border-r-0 md:last:pr-0"
                >
                  <h3 className="text-[17px] font-semibold">{title}</h3>
                  <p className="mt-4 text-[14px] leading-relaxed text-black/58">{detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-black/18 bg-[#111318] text-white">
        <div className="mx-auto grid max-w-[92rem] gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-center lg:gap-20 lg:px-10">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-white/42">
              Real product evidence
            </p>
            <h2 className="mt-6 max-w-[11ch] font-serif text-[clamp(2.6rem,4.2vw,4.3rem)] font-normal leading-[1] tracking-[-0.042em]">
              Compare the operating model, not a feature checklist.
            </h2>
            <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-white/58">
              Every comparison includes the other platform's strengths, Beseam's boundaries, a practical workflow, and a real Beseam product screen.
            </p>
          </div>
          <div className="border border-white/20 bg-white/5 p-2">
            <Image
              src="/images/product-live/revenue-overview.webp"
              alt="Real Beseam revenue overview for Dancing Queens"
              width={1600}
              height={1000}
              className="h-auto w-full"
              priority
            />
          </div>
        </div>
      </section>

      <section className="border-b border-black/18">
        <div className="mx-auto max-w-[92rem] px-5 py-20 sm:px-8 sm:py-24 lg:px-10">
          <div className="grid border-y border-black/24 lg:grid-cols-[minmax(0,1fr)_19rem]">
            <div className="py-10 pr-0 lg:py-14 lg:pr-16">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#3154ff]">
                Bring your current stack
              </p>
              <h2 className="mt-5 max-w-[17ch] font-serif text-[clamp(2.6rem,4.2vw,4.3rem)] font-normal leading-[1.02] tracking-[-0.04em]">
                We will tell you what Beseam should add—and what it should leave alone.
              </h2>
            </div>
            <div className="border-t border-black/24 py-8 lg:border-l lg:border-t-0 lg:py-0 lg:pl-8">
              <div className="flex h-full flex-col justify-center">
                <p className="text-[14px] leading-relaxed text-black/58">
                  A 20-minute review covers one store, the systems already in place, and the first revenue issue worth investigating.
                </p>
                <BookReviewCta
                  location="comparison_hub"
                  label="Book a 20-minute commerce review"
                  className="mt-7 w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
