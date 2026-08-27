import Link from "next/link";

import { ArrowRight, Check } from "lucide-react";

import LiveAnswerCheck from "@/components/beseam/answer-check";
import ConnectedEvidence from "@/components/beseam/connected-evidence";
import FirstMonthPromise from "@/components/beseam/first-month-promise";
import HeroSurfaceShift from "@/components/beseam/hero-surface-shift";
import OperatingLoop from "@/components/beseam/operating-loop";
import { Reveal } from "@/components/beseam/reveal";
import { BENCHMARK_RUN } from "@/data/category-benchmarks";

/**
 * Section order is the argument, and it is deliberate:
 *
 * AI shopping wedge → one buying decision end to end → ways to start
 *
 * The homepage sells one sharp entry point. The broader buying-decision system
 * lives on /platform.
 */
const SCAN_RETURNS = [
  "Where AI overlooks you",
  "Which competitors get named instead",
  "What to improve first",
] as const;

const BENCHMARK_SOLO_SHARE = Math.round(
  (BENCHMARK_RUN.singleEngineOnly / BENCHMARK_RUN.namings) * 100,
);

export default function ProductionHomepage() {
  return (
    <div className="bg-ground text-[#151515]">
      <section id="home-hero" className="relative isolate overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[80svh]">
          <HeroSurfaceShift />
        </div>
        <div
          id="ai-check"
          className="pointer-events-none relative z-10 mx-auto flex min-h-[80svh] max-w-[92rem] scroll-mt-24 items-center justify-center px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-24"
        >
          <Reveal className="w-full">
            <div className="mx-auto w-full max-w-[76rem] text-center">
              <h1 className="pointer-events-auto mx-auto max-w-[18ch] text-balance font-display text-[clamp(3rem,5.6vw,5rem)] font-normal leading-[0.98] tracking-[-0.025em] text-ink-deep">
                Get more shoppers to{" "}
                <span className="text-signal-ink">choose you</span>.
              </h1>
              <p className="pointer-events-auto mx-auto mt-6 max-w-[62ch] text-[17px] leading-[1.7] text-black/64 sm:text-[18px]">
                Shopping is moving from finding products to choosing products. AI is increasingly deciding which products make the shortlist. Beseam shows where yours gets missed, what may explain it, and what to change.
              </p>

              <div className="pointer-events-auto mx-auto mt-9 w-full">
                <LiveAnswerCheck
                  placement="homepage_hero"
                  handOffTo="/scan"
                  formNote={
                    <div className="mx-auto mt-2 flex flex-col items-center text-center">
                      <p className="text-[12.5px] leading-snug text-black/54">
                        Free. No login required.
                      </p>
                      <ul className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
                        {SCAN_RETURNS.map((item) => (
                          <li
                            key={item}
                            className="flex items-center gap-2 text-[13px] leading-snug text-black/62"
                          >
                            <Check
                              aria-hidden="true"
                              className="h-3.5 w-3.5 shrink-0 text-signal-ink"
                            />
                            {item}
                          </li>
                        ))}
                      </ul>

                    </div>
                  }
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-black/14 bg-white">
        <div className="mx-auto flex max-w-[92rem] flex-col gap-4 px-5 py-5 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-10">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[11px] font-semibold uppercase tracking-[0.09em] text-black/58">
            <span>{BENCHMARK_RUN.questions} shopper questions</span>
            <span>{BENCHMARK_RUN.engines.length} AI engines</span>
            <span>{BENCHMARK_RUN.answersCompleted} completed answers</span>
            <span className="text-signal-ink">{BENCHMARK_SOLO_SHARE}% of brand appearances were unique to one engine</span>
          </div>
          <Link
            href="/benchmarks"
            className="group inline-flex shrink-0 items-center gap-2 text-[13px] font-semibold text-ink-deep underline decoration-black/25 underline-offset-5 hover:decoration-signal-ink"
          >
            See the report
            <ArrowRight aria-hidden="true" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </section>

      <OperatingLoop />
      <ConnectedEvidence />
      <FirstMonthPromise />
    </div>
  );
}
