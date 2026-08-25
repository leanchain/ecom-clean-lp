import Link from "next/link";

import { ArrowRight } from "lucide-react";

import { Reveal } from "@/components/beseam/reveal";
import { BENCHMARK_RUN, CATEGORY_BENCHMARKS } from "@/data/category-benchmarks";

const SCORED_BENCHMARKS = CATEGORY_BENCHMARKS.map((benchmark) => ({
  ...benchmark,
  singleEngineBrands: benchmark.brands.filter(
    (brand) => brand.namedBy.length === 1,
  ).length,
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

// Round-robin across categories so the shortlist never shows six questions from
// the same shelf, then order what survives by share so the bars descend and the
// column can be read as a ranking rather than six unrelated numbers.
const HIGHLIGHTS = Array.from(
  { length: Math.max(...BY_CATEGORY.map((benchmarks) => benchmarks.length)) },
  (_, index) =>
    BY_CATEGORY.map((benchmarks) => benchmarks[index]).filter(Boolean),
)
  .flat()
  .slice(0, 6)
  .map((benchmark) => ({
    ...benchmark,
    soloShare: benchmark.singleEngineBrands / benchmark.brands.length,
  }))
  .sort((a, b) => b.soloShare - a.soloShare);

const SOLO_SHARE = Math.round(
  (BENCHMARK_RUN.singleEngineOnly / BENCHMARK_RUN.namings) * 100,
);

export default function CategoryBenchmarksSection() {
  if (CATEGORY_BENCHMARKS.length === 0) return null;

  return (
    <section
      id="benchmarks"
      className="scroll-mt-24 border-t border-black/14 bg-white"
    >
      <div className="mx-auto max-w-[92rem] px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        <Reveal>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
            <div>
              <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.14em] text-signal-ink">
                Discovery benchmark
              </p>
              <h2 className="mt-6 max-w-[18ch] text-balance font-display text-[clamp(2.2rem,3.6vw,3.6rem)] font-normal leading-[1.04] tracking-[-0.02em] text-ink-deep">
                How do you compare?
              </h2>
              <p className="mt-6 max-w-[52ch] text-[16px] leading-[1.7] text-black/64">
                We ask the same buying questions every quarter and publish what
                comes back. In the last run,{" "}
                <strong className="font-semibold text-ink-deep">
                  {SOLO_SHARE}% of brand namings appeared on only one assistant
                </strong>
                {" — "}
                so where a shopper asks decides which brands they ever see.
              </p>
              <p className="mt-4 max-w-[52ch] text-[14px] leading-[1.7] text-black/52">
                {BENCHMARK_RUN.questions} shopper questions across{" "}
                {BENCHMARK_RUN.engines.join(", ")}.{" "}
                {BENCHMARK_RUN.answersCompleted} answers completed,{" "}
                {BENCHMARK_RUN.namings} brand namings, of which only{" "}
                {BENCHMARK_RUN.everyEngine} appeared on every engine that
                answered.
              </p>
              <Link
                href="/benchmarks"
                className="mt-7 inline-flex min-h-11 items-center gap-2 text-[14px] font-semibold text-ink-deep underline decoration-black/25 underline-offset-6 hover:decoration-signal-ink"
              >
                See the benchmark and method
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>

            {/* A ledger, not a list: one row per question, the share carried by
                a bar so six numbers can be compared at a glance instead of
                read one at a time. */}
            <div>
              <div className="hidden grid-cols-[10.5rem_minmax(0,1fr)_9rem] gap-x-6 border-b-2 border-ink-deep pb-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-black/54 xl:grid">
                <span>Category</span>
                <span>Buying question</span>
                <span className="text-right">Named on one only</span>
              </div>

              {/* Below xl the category drops to its own line, but the question
                  keeps the share on the same row: a bar parked under the
                  question reads as a separate item rather than its measure. */}
              <ul className="border-t-2 border-ink-deep xl:border-t-0">
                {HIGHLIGHTS.map((benchmark) => (
                  <li key={benchmark.slug} className="border-b border-black/16">
                    <Link
                      href={`/benchmarks#${benchmark.slug}`}
                      className="group grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-5 gap-y-1.5 py-4 transition-colors hover:bg-black/[0.035] xl:grid-cols-[10.5rem_minmax(0,1fr)_9rem] xl:gap-x-6 xl:gap-y-0 xl:px-2"
                    >
                      <span className="col-span-2 font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-signal-ink xl:col-span-1">
                        {benchmark.category}
                      </span>
                      <span className="max-w-[46ch] text-[15px] leading-snug text-ink-deep underline decoration-transparent underline-offset-4 transition-colors group-hover:decoration-black/30">
                        &ldquo;{benchmark.question}&rdquo;
                      </span>
                      <span className="flex items-center justify-end gap-3">
                        <span className="shrink-0 font-mono text-[12px] tabular-nums text-black/70">
                          {benchmark.singleEngineBrands}
                          <span className="text-black/40">
                            /{benchmark.brands.length}
                          </span>
                          <span className="sr-only">
                            {" "}
                            brands named on only one assistant
                          </span>
                        </span>
                        <span
                          aria-hidden="true"
                          className="h-1.5 w-14 shrink-0 bg-black/12 sm:w-16"
                        >
                          <span
                            className="block h-full bg-signal-ink"
                            style={{
                              width: `${Math.round(benchmark.soloShare * 100)}%`,
                            }}
                          />
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
