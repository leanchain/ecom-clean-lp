import Link from "next/link";

import { ArrowRight, Check } from "lucide-react";

import { ChannelIcon } from "@/components/beseam/channel-icon";
import { BENCHMARK_RUN } from "@/data/category-benchmarks";

/**
 * The proof layer directly under the hero, split into its two honest
 * registers: what is true about the product today, and what the published
 * research actually measured. No count appears here that did not come from a
 * real benchmark run; the product side carries factual claims, not scale
 * claims, until real usage figures exist.
 */
const PRODUCT_FACTS = [
  "Works with Shopify",
  "Live with a real merchant pilot",
  "Every change approved, with rollback",
] as const;

const SOLO_SHARE = Math.round(
  (BENCHMARK_RUN.singleEngineOnly / BENCHMARK_RUN.namings) * 100,
);

const RESEARCH_FACTS = [
  `${BENCHMARK_RUN.questions} shopper questions`,
  `${BENCHMARK_RUN.engines.length} AI engines`,
  `${BENCHMARK_RUN.answersCompleted} completed answers`,
  `${SOLO_SHARE}% of appearances unique to one engine`,
] as const;

export default function CredibilityRail() {
  return (
    <section aria-label="Why trust Beseam" className="border-y border-black/14 bg-white">
      <div className="mx-auto grid max-w-[92rem] px-5 sm:px-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:px-10">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-b border-black/12 py-5 lg:border-b-0 lg:border-r lg:pr-10">
          <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-signal-ink">
            Product
          </span>
          {PRODUCT_FACTS.map((fact, index) => (
            <span
              key={fact}
              className="flex items-center gap-2 text-[13px] font-medium text-black/66"
            >
              {index === 0 ? (
                <ChannelIcon brand="shopify" className="h-3.5 w-3.5 text-ink-deep/80" />
              ) : (
                <Check aria-hidden="true" className="h-3.5 w-3.5 shrink-0 text-signal-ink" />
              )}
              {fact}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 py-5 lg:pl-10">
          <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-black/50">
            Research
          </span>
          {RESEARCH_FACTS.map((fact) => (
            <span
              key={fact}
              className="font-mono text-[11px] font-semibold uppercase tracking-[0.09em] text-black/58"
            >
              {fact}
            </span>
          ))}
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
      </div>
    </section>
  );
}
