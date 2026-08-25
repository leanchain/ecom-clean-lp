import { ArrowRight, Check } from "lucide-react";

import LiveAnswerCheck from "@/components/beseam/answer-check";
import CategoryBenchmarksSection from "@/components/beseam/category-benchmarks-section";
import { BookReviewCta } from "@/components/beseam/book-review-cta";
import ConnectedEvidence from "@/components/beseam/connected-evidence";
import FirstMonthPromise from "@/components/beseam/first-month-promise";
import HeroSurfaceShift from "@/components/beseam/hero-surface-shift";
import MarketsSection from "@/components/beseam/markets-section";
import { Reveal } from "@/components/beseam/reveal";
import ShopperLoss from "@/components/beseam/shopper-loss";
import WhyBeseam from "@/components/beseam/why-beseam";
import WorkingModes from "@/components/beseam/working-modes";

/**
 * Section order is the argument, and it is deliberate:
 *
 *   problem → why us → proof we do not guess → how to work with us →
 *   the operating loop → markets → how you compare → what the first month is
 *
 * Benchmarks used to sit second. They answer “how do I compare”, which is a
 * question a visitor only has once they know what the product is, so they now
 * sit late. Nothing above the operating loop asks the reader to learn a term.
 */

/** Three concrete returns, so “free scan” is not an unpriced promise. */
const SCAN_RETURNS = [
  "Where shoppers can’t find you",
  "What your product pages leave out",
  "What to change first",
] as const;

const COMMERCE_PATH = [
  { title: "Discovery", detail: "Where shoppers start looking" },
  { title: "Store", detail: "What your store shows them" },
  { title: "Behavior", detail: "What they do next" },
  { title: "Revenue", detail: "What it was worth" },
] as const;

const OPERATING_LOOP = [
  {
    title: "Observe",
    lead: "See what is happening.",
    detail:
      "How shoppers look for you, what your store shows them, what they do next, and what it earned.",
  },
  {
    title: "Understand",
    lead: "See what may be behind it.",
    detail:
      "Beseam checks the explanations that could account for it, and rules out the ones the evidence does not support.",
  },
  {
    title: "Decide",
    lead: "Know what to do first.",
    detail:
      "A short list, in order of what it is worth and how hard it is, with the reason attached to each one.",
  },
  {
    title: "Act",
    lead: "Make the change.",
    detail:
      "With your approval, Beseam helps make the change to your products, content, merchandising, or store — or hands your team something ready to apply.",
  },
  {
    title: "Learn",
    lead: "See whether it worked.",
    detail:
      "The same questions, asked again afterwards, so you can see what moved and what did not.",
  },
] as const;

export default function ProductionHomepage() {
  return (
    <div className="bg-ground text-[#151515]">
      {/* The scan is the page's only real conversion, so it lives in the first
          viewport rather than behind a jump link. The graph is pinned to the
          opening screen so a rendered result can grow the section without
          stretching the artwork down the page. */}
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
              <p className="pointer-events-auto font-mono text-[12px] font-semibold uppercase tracking-[0.14em] text-signal-ink">
                For ecommerce teams
              </p>
              <h1 className="pointer-events-auto mx-auto mt-6 max-w-[18ch] text-balance font-display text-[clamp(3rem,5.6vw,5rem)] font-normal leading-[0.98] tracking-[-0.025em] text-ink-deep">
                Turn product <span className="text-signal-ink">discovery</span>{" "}
                into buying{" "}
                <span style={{ color: "var(--secondary)" }}>decisions</span>.
              </h1>
              <p className="pointer-events-auto mx-auto mt-6 max-w-[58ch] text-[17px] leading-[1.7] text-black/64 sm:text-[18px]">
                Beseam finds where shoppers get lost, shows what is worth
                improving, helps you make the change, and measures what happened
                after.
              </p>

              <div className="pointer-events-auto mx-auto mt-9 w-full">
                <LiveAnswerCheck
                  placement="homepage_hero"
                  formNote={
                    <div className="mx-auto mt-2 flex flex-col items-center text-center">
                      <ul className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
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

                      <div className="mt-6 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 border-t border-black/12 pt-5 text-[14px] text-black/62">
                        <span>Want us to run the loop with you?</span>
                        <BookReviewCta
                          variant="primary"
                          location="homepage_hero_managed"
                          label="Plan my first improvement"
                          className="min-h-9 gap-1.5 bg-transparent px-0 py-0 text-[14px] font-semibold text-ink-deep underline decoration-black/30 underline-offset-6 hover:bg-transparent hover:text-signal-ink hover:decoration-signal-ink"
                        />
                      </div>
                    </div>
                  }
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section >

      <ShopperLoss />

      <WhyBeseam />

      <ConnectedEvidence />

      <WorkingModes />

      <section
        id="proof"
        className="scroll-mt-24 border-t border-black/18 bg-white"
      >
        <div className="mx-auto max-w-[92rem] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
          <Reveal>
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)] lg:items-end lg:gap-10">
              <div>
                <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.14em] text-signal-ink">
                  How Beseam works
                </p>
                <h2 className="mt-7 max-w-[28ch] text-balance font-display text-[clamp(2.4rem,3.8vw,4rem)] font-normal leading-[1.02] tracking-[-0.02em] text-ink-deep">
                  Observe. Understand. Decide. Act. Learn.
                </h2>
              </div>
              <p className="max-w-[52ch] text-[17px] leading-[1.65] text-black/64">
                The loop underneath everything above. Five steps, run on your
                store again and again — each pass starting from what the last
                one proved.
              </p>
            </div>
          </Reveal>

          {/* The four domains the loop runs across. Kept as one line here
              instead of a section of its own: it is the same claim as the loop
              below, at a different altitude. */}
          <Reveal delay={0.06}>
            <div className="mt-12 border-y border-black/14 py-5">
              <div className="grid gap-5 sm:grid-cols-4 sm:gap-0">
                {COMMERCE_PATH.map((stage, index) => (
                  <div
                    key={stage.title}
                    className="relative pr-8 sm:px-6 sm:first:pl-0 sm:last:pr-0"
                  >
                    <div className="flex items-center gap-3">
                      <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.12em] text-ink-deep">
                        {stage.title}
                      </p>
                      {index < COMMERCE_PATH.length - 1 ? (
                        <ArrowRight
                          className="h-3.5 w-3.5 shrink-0 text-black/28 sm:absolute sm:-right-2 sm:top-0.5"
                          aria-hidden="true"
                        />
                      ) : null}
                    </div>
                    <p className="mt-2 text-[12px] leading-relaxed text-black/58">
                      {stage.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <ol className="mt-12 grid border-t-2 border-ink-deep sm:grid-cols-2 lg:grid-cols-5">
              {OPERATING_LOOP.map((step, index) => (
                <li
                  key={step.title}
                  className="relative flex flex-col gap-3 border-b border-black/14 py-7 sm:px-7 lg:border-b-0 lg:border-l lg:border-black/14 lg:px-6 lg:first:border-l-0 lg:first:pl-0 lg:last:pr-0"
                >
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-[12px] font-semibold tabular-nums text-signal-ink">
                      0{index + 1}
                    </span>
                    <h3 className="font-mono text-[12px] font-semibold uppercase tracking-[0.12em] text-black/62">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-balance text-[19px] font-medium leading-[1.25] tracking-[-0.01em] text-ink-deep">
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

      <MarketsSection />

      <CategoryBenchmarksSection />

      <FirstMonthPromise />
    </div >
  );
}
