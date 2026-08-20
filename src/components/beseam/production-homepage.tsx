import Link from "next/link";

import { ArrowRight } from "lucide-react";

import LiveAnswerCheck from "@/components/beseam/answer-check";
import { formatBenchmarkDate } from "@/components/beseam/category-benchmark";
import CategoryBenchmarksSection from "@/components/beseam/category-benchmarks-section";
import FirstMonthPromise from "@/components/beseam/first-month-promise";
import { Reveal } from "@/components/beseam/reveal";
import WhyBeseam from "@/components/beseam/why-beseam";
import { BENCHMARK_RUN } from "@/data/category-benchmarks";

const STEPS = [
  {
    title: "Check",
    lead: "Ask what your buyer asks.",
    detail:
      "The question goes to ChatGPT, Gemini, and Google AI Mode. We keep the answer exactly as it came back — every product named, and how we got it.",
  },
  {
    title: "Understand",
    lead: "See who got named instead.",
    detail:
      "The competing products, and the page, feed, and product data behind them — lined up against yours, field by field.",
  },
  {
    title: "Approved fix",
    lead: "Change the field that lost it.",
    detail:
      "You approve the change before anything reaches a customer. The previous value is kept, so any update can be put back.",
  },
  {
    title: "Check again",
    lead: "Ask the same question again.",
    detail:
      "New answer against old, same question. The only honest way to know whether the change did anything.",
  },
] as const;

export default function ProductionHomepage() {
  const heroSoloShare = Math.round(
    (BENCHMARK_RUN.singleEngineOnly / BENCHMARK_RUN.namings) * 100,
  );

  return (
    <div className="bg-[#fafafa] text-[#151515]">
      <section id="home-hero">
        <div className="mx-auto max-w-[92rem] px-5 pb-20 pt-20 sm:px-8 sm:pb-24 sm:pt-28 lg:px-10 lg:pb-28 lg:pt-32">
          <Reveal>
            <div className="mx-auto max-w-[62rem] text-center">
              {/* Canonical hero line from the positioning doc and the page's
                  own metadata title. Deliberately not "Be the product AI
                  recommends" — that promises placement inside an answer no
                  vendor controls, which the guarantee section further down
                  explicitly refuses to claim. */}
              <h1 className="mx-auto max-w-[18ch] text-balance font-display text-[clamp(3.5rem,7vw,6rem)] font-normal leading-[0.96] tracking-[-0.025em] text-[#111318]">
                See why AI picked someone else.
              </h1>
              <p className="mx-auto mt-8 max-w-[62ch] text-[18px] leading-[1.65] text-black/68 sm:text-[19px]">
                Shoppers now ask ChatGPT, Gemini, and Perplexity before they
                buy. Right now those answers name someone — and if it is not
                your product, you never see the visit, the cart, or the reason.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.08} y={18}>
            <div className="mx-auto mt-12 max-w-[76rem]">
              <LiveAnswerCheck placement="homepage_hero" />
              {/* Earns the domain field above it: one sourced number before we
                  ask for anything. Figures come from the published run, never
                  hardcoded. */}
              <div className="mt-8 flex flex-col items-center gap-3 text-center">
                <p className="max-w-[58ch] text-[15px] leading-[1.6] text-black/64">
                  We asked {BENCHMARK_RUN.questions} shopper questions on{" "}
                  {BENCHMARK_RUN.engines.length} assistants on{" "}
                  {formatBenchmarkDate(BENCHMARK_RUN.askedOn)}.{" "}
                  <strong className="font-semibold text-[#111318]">
                    {heroSoloShare}% of the brands they named appeared on only
                    one of them.
                  </strong>
                </p>
                <Link
                  href="#benchmarks"
                  className="inline-flex min-h-11 items-center gap-2 text-[15px] font-semibold text-[#151515] underline decoration-black/30 underline-offset-8 transition-colors hover:decoration-[#b8441d]"
                >
                  See what the assistants answered
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <WhyBeseam />

      <CategoryBenchmarksSection />

      <section id="proof" className="scroll-mt-24 bg-white">
        <div className="mx-auto max-w-[92rem] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
          <Reveal>
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:items-end lg:gap-16">
              <h2 className="max-w-[15ch] text-balance font-display text-[clamp(2.4rem,3.8vw,4rem)] font-normal leading-[1.02] tracking-[-0.02em] text-[#111318]">
                A discovery loop that runs on autopilot.
              </h2>
              <p className="max-w-[52ch] text-[17px] leading-[1.65] text-black/64">
                The useful part is not knowing that you are
                &ldquo;visible.&rdquo; It is knowing what happened on one
                specific question &mdash; checked again automatically, every
                time{" "}
                <strong className="font-semibold text-[#111318]">
                  you approve a fix
                </strong>
                .
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <ol className="mt-14 grid border-t-2 border-[#111318] sm:grid-cols-2 lg:grid-cols-4">
              {STEPS.map((step, index) => (
                <li
                  key={step.title}
                  className="relative flex flex-col gap-3 border-b border-black/14 py-7 sm:border-b-0 sm:px-7 sm:first:pl-0 sm:last:pr-0 lg:border-l lg:border-black/14 lg:first:border-l-0"
                >
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-[12px] font-semibold tabular-nums text-[#b8441d]">
                      0{index + 1}
                    </span>
                    <h3 className="font-mono text-[12px] font-semibold uppercase tracking-[0.12em] text-black/62">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-balance text-[19px] font-medium leading-[1.25] tracking-[-0.01em] text-[#111318]">
                    {step.lead}
                  </p>
                  <p className="text-[14px] leading-relaxed text-black/62">
                    {step.detail}
                  </p>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      <FirstMonthPromise />
    </div>
  );
}
