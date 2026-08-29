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

const HIGHLIGHTS = Array.from(
  { length: Math.max(...BY_CATEGORY.map((benchmarks) => benchmarks.length)) },
  (_, index) =>
    BY_CATEGORY.map((benchmarks) => benchmarks[index]).filter(Boolean),
)
  .flat()
  .slice(0, 3)
  .map((benchmark) => ({
    ...benchmark,
    soloShare: benchmark.singleEngineBrands / benchmark.brands.length,
  }))
  .sort((a, b) => b.soloShare - a.soloShare);

const SOLO_SHARE = Math.round(
  (BENCHMARK_RUN.singleEngineOnly / BENCHMARK_RUN.namings) * 100,
);

const AGREEMENT_BANDS = [
  {
    label: "One assistant only",
    value: BENCHMARK_RUN.singleEngineOnly,
    className: "bg-signal-ink",
  },
  {
    label: "Two assistants",
    value: BENCHMARK_RUN.twoEngines,
    className: "bg-ink-deep/55",
  },
  {
    label: "Every assistant",
    value: BENCHMARK_RUN.everyEngine,
    className: "bg-ink-deep/18",
  },
] as const;

export default function CategoryBenchmarksSection() {
  if (CATEGORY_BENCHMARKS.length === 0) return null;

  return (
    <section
      id="benchmarks"
      className="scroll-mt-24 border-t border-black/14 bg-[var(--ground-2)]"
    >
      <div className="mx-auto max-w-[92rem] px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        <Reveal>
          <div className="grid gap-10 lg:grid-cols-[minmax(17rem,0.72fr)_minmax(0,1.28fr)] lg:items-start lg:gap-16">
            <div>
              <h2 className="max-w-[17ch] text-balance font-display text-[clamp(2.2rem,3.5vw,3.5rem)] font-normal leading-[1.04] tracking-[-0.02em] text-ink-deep">
                Where shoppers ask determines who gets considered.
              </h2>
              <p className="mt-6 max-w-[45ch] text-[16px] leading-[1.7] text-black/64">
                We ask the same buying questions across AI assistants and
                record what comes back. In the latest run,{" "}
                <strong className="font-semibold text-ink-deep">
                  {SOLO_SHARE}% of brand appearances occurred on only one
                  assistant.
                </strong>
              </p>
              <Link
                href="/benchmarks"
                className="mt-7 inline-flex min-h-11 items-center gap-2 text-[14px] font-semibold text-ink-deep underline decoration-black/25 underline-offset-6 hover:decoration-signal-ink"
              >
                See the report and method
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <p className="mt-7 max-w-[38ch] border-l-2 border-signal-ink pl-4 text-[13.5px] font-medium leading-[1.55] text-black/68">
                Consideration is fragmented. Beseam follows what happens next.
              </p>
            </div>

            <div className="border-y-2 border-ink-deep">
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-b border-black/14 py-3 font-mono text-[11px] uppercase tracking-[0.07em] text-black/58">
                <time dateTime={BENCHMARK_RUN.askedOn}>
                  Observed {BENCHMARK_RUN.askedOn}
                </time>
                <span>{BENCHMARK_RUN.questions} questions</span>
                <span>{BENCHMARK_RUN.answersCompleted} completed answers</span>
                <span>{BENCHMARK_RUN.engines.length} assistants</span>
              </div>

              <div className="py-5">
                <div
                  className="flex h-3 overflow-hidden"
                  aria-label={`${BENCHMARK_RUN.singleEngineOnly} of ${BENCHMARK_RUN.namings} brand appearances occurred on only one assistant`}
                >
                  {AGREEMENT_BANDS.map((band) => (
                    <span
                      key={band.label}
                      className={band.className}
                      style={{ flexGrow: band.value }}
                    />
                  ))}
                </div>
                <dl className="mt-3 grid gap-2 sm:grid-cols-3 sm:gap-5">
                  {AGREEMENT_BANDS.map((band) => (
                    <div key={band.label} className="flex items-baseline gap-2">
                      <dt className="text-[12px] leading-snug text-black/60">
                        {band.label}
                      </dt>
                      <dd className="font-mono text-[12px] font-semibold tabular-nums text-ink-deep">
                        {band.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              <ol className="border-t border-black/14">
                {HIGHLIGHTS.map((benchmark) => (
                  <li key={benchmark.slug} className="border-b border-black/12 last:border-b-0">
                    <Link
                      href={`/benchmarks#${benchmark.slug}`}
                      className="group grid min-w-0 grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 gap-y-1.5 py-4 transition-colors hover:bg-black/[0.035] sm:px-2"
                    >
                      <span className="col-span-2 font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-signal-ink">
                        {benchmark.category}
                      </span>
                      <span className="min-w-0 text-[14.5px] leading-snug text-ink-deep underline decoration-transparent underline-offset-4 transition-colors group-hover:decoration-black/30">
                        &ldquo;{benchmark.question}&rdquo;
                      </span>
                      <span className="flex shrink-0 items-center gap-3">
                        <span className="font-mono text-[12px] tabular-nums text-black/70">
                          {benchmark.singleEngineBrands}
                          <span className="text-black/40">
                            /{benchmark.brands.length}
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
              </ol>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
