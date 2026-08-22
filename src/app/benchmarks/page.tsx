import Link from "next/link";

import { ArrowRight, CircleAlert } from "lucide-react";
import type { Metadata } from "next";

import CategoryBenchmarkFigure, {
  formatBenchmarkDate,
} from "@/components/beseam/category-benchmark";
import { Reveal } from "@/components/beseam/reveal";
import { BENCHMARK_RUN, CATEGORY_BENCHMARKS } from "@/data/category-benchmarks";
import { SITE_URL, buildPublicMetadata } from "@/lib/seo";

const hasBenchmarks = CATEGORY_BENCHMARKS.length > 0;

export const metadata: Metadata = buildPublicMetadata({
  title: "Product Discovery Benchmarks | Beseam",
  description:
    "Public shopper questions across AI assistants show how variable one part of product discovery can be. See observed answers, category figures, dates, and methodology.",
  path: "/benchmarks",
  noIndex: !hasBenchmarks,
});

const METHOD = [
  [
    "The question",
    "A question a real shopper would type, asked verbatim on every engine. Published exactly as it was asked: never rewritten afterwards to fit the result.",
  ],
  [
    "The engines",
    "Each assistant is asked the same question and kept separate. An engine that returned no completed answer is excluded from the figure rather than shown as zero.",
  ],
  [
    "The denominator",
    "Every count is out of the engines that actually answered, and that number is printed on the figure. Nothing is averaged across questions or categories.",
  ],
  [
    "The date",
    "Answers move. Each figure carries the date it was run and is never quietly refreshed underneath the same numbers.",
  ],
  [
    "Whose data this is",
    "Public brands, observed from the outside. No customer store, no private catalog, and no claim about why any brand was or was not named.",
  ],
  [
    "What is not claimed",
    "Being named is not a ranking and not an endorsement, and a brand that went unnamed is not judged here: only recorded as absent from that answer.",
  ],
] as const;

export default function BenchmarksPage() {
  const soloShare = Math.round(
    (BENCHMARK_RUN.singleEngineOnly / BENCHMARK_RUN.namings) * 100,
  );
  const everyShare = Math.round(
    (BENCHMARK_RUN.everyEngine / BENCHMARK_RUN.namings) * 100,
  );

  const categories = Array.from(
    new Set(CATEGORY_BENCHMARKS.map((b) => b.category)),
  );
  const datasetJsonLd = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    "@id": `${SITE_URL}/benchmarks#dataset`,
    name: "Beseam product discovery benchmark",
    description:
      "Observed brand namings from public shopper questions asked across configured AI shopping and answer surfaces, with the exact questions, dates, engines, and denominators published.",
    url: `${SITE_URL}/benchmarks`,
    creator: { "@id": `${SITE_URL}/#organization` },
    publisher: { "@id": `${SITE_URL}/#organization` },
    dateModified: BENCHMARK_RUN.askedOn,
    temporalCoverage: BENCHMARK_RUN.askedOn,
    isAccessibleForFree: true,
    inLanguage: "en",
    keywords: [
      "product discovery benchmark",
      "AI shopping",
      "ecommerce",
      ...categories,
    ],
    measurementTechnique:
      "The same public shopper question is asked across the configured engines. Only completed answers are counted, and each published figure states its denominator.",
    variableMeasured: [
      "Brand namings by shopper question",
      "Number of engines naming each brand",
      "Completed answer count",
    ],
  };

  return (
    <div className="bg-[#fafafa] text-[#151515]">
      {hasBenchmarks ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetJsonLd) }}
        />
      ) : null}
      <section>
        <div className="mx-auto max-w-[92rem] px-5 pb-16 pt-20 sm:px-8 sm:pt-28 lg:px-10">
          <Reveal>
            <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.14em] text-[#b8441d]">
              Category benchmarks · {formatBenchmarkDate(BENCHMARK_RUN.askedOn)}
            </p>
            <h1 className="mt-7 max-w-[20ch] text-balance font-display text-[clamp(2.6rem,5vw,4.5rem)] font-normal leading-[1.02] tracking-[-0.02em] text-[#111318]">
              AI shopping answers often disagree on which brands belong.
            </h1>
            <p className="mt-8 max-w-[68ch] text-[17px] leading-[1.7] text-black/68">
              This benchmark looks at one part of product discovery: the brands
              named in AI shopping answers. We asked {BENCHMARK_RUN.questions}{" "}
              real shopper questions across{" "}
              {categories.join(", ").toLowerCase()} on{" "}
              {BENCHMARK_RUN.engines.join(", ")}, kept every completed answer,
              and found that the engines often disagree on which brands belong.
            </p>
          </Reveal>

          <Reveal delay={0.06}>
            <dl className="mt-12 grid gap-px border border-black/18 bg-black/12 sm:grid-cols-3">
              {[
                [
                  `${BENCHMARK_RUN.answersCompleted}`,
                  "completed answers behind this page",
                ],
                [
                  `${soloShare}%`,
                  `of the ${BENCHMARK_RUN.namings} brand namings appeared on exactly one engine`,
                ],
                [
                  `${everyShare}%`,
                  "were named by all three engines that answered",
                ],
              ].map(([figure, label]) => (
                <div key={label} className="bg-white px-5 py-7">
                  <dt className="font-display text-[clamp(2.2rem,4vw,3.2rem)] leading-none tabular-nums text-[#111318]">
                    {figure}
                  </dt>
                  <dd className="mt-3 text-[14px] leading-relaxed text-black/64">
                    {label}
                  </dd>
                </div>
              ))}
            </dl>

            <p className="mt-6 flex max-w-[74ch] items-start gap-2.5 text-[13px] leading-relaxed text-black/62">
              <CircleAlert
                className="mt-0.5 h-4 w-4 shrink-0 text-[#d97706]"
                aria-hidden="true"
              />
              {BENCHMARK_RUN.notMeasured}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-[#f6f6f6]">
        <div className="mx-auto grid max-w-[92rem] gap-12 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-2 lg:gap-14 lg:px-10">
          {CATEGORY_BENCHMARKS.map((benchmark, index) => (
            <Reveal key={benchmark.slug} delay={(index % 2) * 0.05}>
              <CategoryBenchmarkFigure benchmark={benchmark} index={index} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-[92rem] px-5 py-20 sm:px-8 sm:py-24 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-20">
            <Reveal>
              <h2 className="max-w-[16ch] text-balance font-display text-[clamp(2rem,3.1vw,3rem)] font-normal leading-[1.05] tracking-[-0.02em] text-[#111318]">
                How every figure on this page is produced.
              </h2>
              <p className="mt-7 max-w-md text-[16px] leading-[1.7] text-black/64">
                The same discovery check shown on the Beseam homepage, pointed
                at a public category instead of a customer store. The date and
                denominator stay attached so the result can be interpreted in
                context.
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <dl className="border-t border-black/14">
                {METHOD.map(([term, detail]) => (
                  <div
                    key={term}
                    className="grid gap-2 border-b border-black/14 py-5 sm:grid-cols-[11rem_1fr] sm:gap-8"
                  >
                    <dt className="font-mono text-[12px] font-semibold uppercase tracking-[0.1em] text-black/62">
                      {term}
                    </dt>
                    <dd className="text-[14px] leading-relaxed text-black/64">
                      {detail}
                    </dd>
                  </div>
                ))}
              </dl>

              <Link
                href="/#ai-check"
                className="mt-9 inline-flex min-h-11 items-center gap-2 text-[15px] font-semibold text-[#151515] underline decoration-black/30 underline-offset-8 transition-colors hover:decoration-[#b8441d]"
              >
                Check my store
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
