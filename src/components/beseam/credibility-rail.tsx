import Link from "next/link";

import { ArrowRight, Check } from "lucide-react";

import { BENCHMARK_RUN } from "@/data/category-benchmarks";

/**
 * The proof layer directly under the hero, split into its two honest
 * registers: what is true about the product today, and what the published
 * research actually measured. No count appears here that did not come from a
 * real benchmark run; the product side carries factual claims, not scale
 * claims, until real usage figures exist.
 */
const PRODUCT_FACTS = [
  "Live with a real merchant pilot",
  "Every change approved, with rollback",
] as const;

const SOLO_SHARE = Math.round(
  (BENCHMARK_RUN.singleEngineOnly / BENCHMARK_RUN.namings) * 100,
);

const RESEARCH_STATS = [
  [`${BENCHMARK_RUN.questions}`, "shopper questions"],
  [`${BENCHMARK_RUN.engines.length}`, "AI engines"],
  [`${BENCHMARK_RUN.answersCompleted}`, "completed answers"],
  [`${SOLO_SHARE}%`, "of appearances unique to one engine"],
] as const;

export default function CredibilityRail() {
  return (
    <section aria-label="Why trust Beseam" className="border-y border-black/14 bg-white">
      <div className="mx-auto grid max-w-[92rem] px-5 sm:px-8 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:px-10">
        <div className="border-b border-black/12 py-6 lg:border-b-0 lg:border-r lg:pr-12">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-signal-ink">
            Product
          </p>
          <ul className="mt-3.5 space-y-2">
            {PRODUCT_FACTS.map((fact) => (
              <li
                key={fact}
                className="flex items-center gap-2.5 text-[14px] font-medium text-black/70"
              >
                <Check
                  aria-hidden="true"
                  className="h-3.5 w-3.5 shrink-0 text-signal-ink"
                />
                {fact}
              </li>
            ))}
          </ul>
        </div>
        <div className="py-6 lg:pl-16">
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-black/50">
              Research
            </p>
            <Link
              href="/benchmarks"
              className="group inline-flex items-center gap-1.5 text-[13px] font-semibold text-ink-deep underline decoration-black/25 underline-offset-4 hover:decoration-signal-ink"
            >
              See the report &amp; method
              <ArrowRight
                aria-hidden="true"
                className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
              />
            </Link>
          </div>
          <div className="mt-3.5 grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-4">
            {RESEARCH_STATS.map(([value, label]) => (
              <div key={label}>
                <p className="font-display text-[26px] leading-none tracking-[-0.01em] text-ink-deep tabular-nums">
                  {value}
                </p>
                <p className="mt-1.5 max-w-[16ch] text-[11.5px] leading-[1.4] text-black/56">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
