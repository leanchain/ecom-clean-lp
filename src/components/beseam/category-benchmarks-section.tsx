import Link from "next/link";

import { ArrowRight } from "lucide-react";

import { BENCHMARK_RUN, CATEGORY_BENCHMARKS } from "@/data/category-benchmarks";

const SCORED_BENCHMARKS = CATEGORY_BENCHMARKS.map((benchmark) => ({
  ...benchmark,
  singleEngineBrands: benchmark.brands.filter((brand) => brand.engines === 1)
    .length,
}));

const CATEGORIES = Array.from(
  new Set(SCORED_BENCHMARKS.map((benchmark) => benchmark.category)),
);

const BY_CATEGORY = CATEGORIES.map((category) =>
  SCORED_BENCHMARKS.filter((benchmark) => benchmark.category === category).sort(
    (a, b) =>
      b.singleEngineBrands - a.singleEngineBrands ||
      b.brands.length - a.brands.length,
  ),
);

const HIGHLIGHTS = Array.from(
  { length: Math.max(...BY_CATEGORY.map((benchmarks) => benchmarks.length)) },
  (_, index) =>
    BY_CATEGORY.map((benchmarks) => benchmarks[index]).filter(Boolean),
).flat();

export default function CategoryBenchmarksSection() {
  if (CATEGORY_BENCHMARKS.length === 0) return null;

  const soloShare = Math.round(
    (BENCHMARK_RUN.singleEngineOnly / BENCHMARK_RUN.namings) * 100,
  );

  return (
    <section
      id="benchmarks"
      className="scroll-mt-24 border-y border-black/16 bg-[#f6f6f6]"
    >
      <div className="mx-auto max-w-[92rem] px-5 py-5 sm:px-8 lg:px-10">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
          <p className="text-[13px] leading-relaxed text-black/64">
            <span className="mr-3 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-[#b8441d]">
              Discovery benchmark
            </span>
            Across {BENCHMARK_RUN.questions} shopper questions,{" "}
            <strong className="font-semibold text-[#111318]">
              {soloShare}% of brand namings appeared on only one assistant.
            </strong>
          </p>
          <Link
            href="/benchmarks"
            className="inline-flex min-h-9 shrink-0 items-center gap-2 text-[12px] font-semibold text-[#111318] underline decoration-black/25 underline-offset-5 hover:decoration-[#b8441d]"
          >
            See all {CATEGORY_BENCHMARKS.length} questions and method
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>
      </div>

      <div className="overflow-hidden border-t border-black/12 py-3">
        <div className="benchmark-marquee flex w-max items-center motion-reduce:animate-none">
          {[0, 1].map((copyIndex) => (
            <div
              key={copyIndex}
              aria-hidden={copyIndex === 1 ? "true" : undefined}
              className="flex shrink-0 items-center"
            >
              {HIGHLIGHTS.map((benchmark) => (
                <Link
                  key={`${copyIndex}-${benchmark.slug}`}
                  href={`/benchmarks#${benchmark.slug}`}
                  tabIndex={copyIndex === 1 ? -1 : undefined}
                  className="group flex shrink-0 items-center whitespace-nowrap pr-12 text-[12px] text-black/58 transition-colors hover:text-[#111318]"
                >
                  <span className="mr-2 font-mono font-semibold uppercase tracking-[0.08em] text-black/44 transition-colors group-hover:text-[#b8441d]">
                    {benchmark.category}
                  </span>
                  <span className="mr-2 text-black/72 underline decoration-transparent underline-offset-4 transition-colors group-hover:decoration-black/30">
                    “{benchmark.question}”
                  </span>
                  <span>
                    {benchmark.singleEngineBrands} of {benchmark.brands.length}{" "}
                    brands appeared on one assistant
                  </span>
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes beseam-benchmark-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .benchmark-marquee {
          animation: beseam-benchmark-marquee 200s linear infinite;
        }
        .benchmark-marquee:hover {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .benchmark-marquee {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
