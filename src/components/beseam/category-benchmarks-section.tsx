import Link from "next/link";

import { CATEGORY_BENCHMARKS } from "@/data/category-benchmarks";

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

  return (
    <section
      id="benchmarks"
      className="scroll-mt-24 border-y border-black/14 bg-[#f5e9e2]"
    >
      <div className="overflow-hidden py-3">
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
                  <span className="mr-2 font-mono font-semibold uppercase tracking-[0.08em] text-[#b8441d] transition-colors group-hover:text-[#111318]">
                    {benchmark.category}
                  </span>
                  <span className="mr-2 text-black/76 underline decoration-transparent underline-offset-4 transition-colors group-hover:decoration-black/30">
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
