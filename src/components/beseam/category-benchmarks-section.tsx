import Link from "next/link";

import { ArrowRight } from "lucide-react";

import CategoryBenchmarkFigure from "@/components/beseam/category-benchmark";
import { Reveal } from "@/components/beseam/reveal";
import { BENCHMARK_RUN, CATEGORY_BENCHMARKS } from "@/data/category-benchmarks";

const BRANDS_PER_FIGURE = 6;

/**
 * The homepage shows two questions, chosen for the two halves of the finding
 * rather than by position in the data:
 *
 *   1. The widest disagreement — the most brands named with no brand named by
 *      every engine. "The engines cannot agree who belongs in this answer."
 *   2. The strongest consensus — the most brands named by every engine.
 *      "They can agree, and you are not on the list."
 *
 * Derived, not hand-picked, so a re-run cannot silently leave a stale example
 * on the page.
 */
function pickHomepageBenchmarks(all: typeof CATEGORY_BENCHMARKS) {
  const unanimous = (b: (typeof CATEGORY_BENCHMARKS)[number]) =>
    b.brands.filter((brand) => brand.engines === b.engines.length).length;

  const widestDisagreement = [...all].sort(
    (a, b) => unanimous(a) - unanimous(b) || b.brands.length - a.brands.length,
  )[0];

  const strongestConsensus = [...all]
    .filter((b) => b.slug !== widestDisagreement?.slug)
    .sort(
      (a, b) =>
        unanimous(b) - unanimous(a) || b.brands.length - a.brands.length,
    )[0];

  return [widestDisagreement, strongestConsensus].filter(Boolean);
}

/**
 * Homepage cut of the published category benchmarks. Renders nothing while
 * none have been published — an empty proof section is worse than no proof
 * section, and the site never ships a placeholder figure.
 */
export default function CategoryBenchmarksSection() {
  if (CATEGORY_BENCHMARKS.length === 0) return null;

  const shown = pickHomepageBenchmarks(CATEGORY_BENCHMARKS);
  const soloShare = Math.round(
    (BENCHMARK_RUN.singleEngineOnly / BENCHMARK_RUN.namings) * 100,
  );
  const everyShare = Math.round(
    (BENCHMARK_RUN.everyEngine / BENCHMARK_RUN.namings) * 100,
  );

  return (
    <section id="benchmarks" className="scroll-mt-24 bg-[#f6f6f6]">
      <div className="mx-auto max-w-[92rem] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:items-start lg:gap-20">
          <Reveal>
            <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.14em] text-[#b8441d]">
              Category benchmarks
            </p>
            <h2 className="mt-7 max-w-[17ch] text-balance font-display text-[clamp(2.4rem,3.8vw,4rem)] font-normal leading-[1.02] tracking-[-0.02em] text-[#111318]">
              Winning one assistant tells you nothing about the rest.
            </h2>
            <p className="mt-7 max-w-xl text-[16px] leading-[1.7] text-black/64">
              We asked {BENCHMARK_RUN.questions} real shopper questions across
              electronics, supplements, apparel, and food on{" "}
              {BENCHMARK_RUN.engines.join(", ")} —{" "}
              {BENCHMARK_RUN.answersCompleted} completed answers. Of the{" "}
              {BENCHMARK_RUN.namings} brand namings that came back,{" "}
              <strong className="font-semibold text-[#111318]">
                {soloShare}% appeared on exactly one engine
              </strong>{" "}
              and only {everyShare}% on all three.
            </p>
            <p className="mt-5 max-w-xl text-[16px] leading-[1.7] text-black/64">
              There is no position four in an answer. A brand is named or it is
              absent — and being named by ChatGPT is not evidence that Gemini or
              AI Mode will name you at all. Below: the question the engines
              disagreed on most, and the one where they agreed hardest.
            </p>
            <Link
              href="/benchmarks"
              className="mt-8 inline-flex min-h-11 items-center gap-2 text-[15px] font-semibold text-[#151515] underline decoration-black/30 underline-offset-8 transition-colors hover:decoration-[#b8441d]"
            >
              See all {CATEGORY_BENCHMARKS.length} questions and the method
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Reveal>

          <Reveal delay={0.08} className="grid gap-10">
            {shown.map((benchmark, index) => (
              <CategoryBenchmarkFigure
                key={benchmark.slug}
                benchmark={benchmark}
                index={index}
                maxBrands={BRANDS_PER_FIGURE}
              />
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
