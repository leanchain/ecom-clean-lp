import { ArrowRight } from "lucide-react";

import LiveAnswerCheck from "@/components/beseam/answer-check";
import CategoryBenchmarksSection from "@/components/beseam/category-benchmarks-section";
import FirstMonthPromise from "@/components/beseam/first-month-promise";
import HeroSurfaceShift from "@/components/beseam/hero-surface-shift";
import { Reveal } from "@/components/beseam/reveal";
import TrackedLink from "@/components/beseam/tracked-link";
import WhyBeseam from "@/components/beseam/why-beseam";
import { APP_REGISTER_URL } from "@/lib/app-urls";

const COMMERCE_PATH = [
  { title: "Discovery", detail: "AI · Search · Feeds" },
  { title: "Store", detail: "Search · PDPs · Recommendations" },
  { title: "Behavior", detail: "Journeys · Friction · Checkout" },
  { title: "Revenue", detail: "Orders · Attribution · Impact" },
] as const;

const OPERATING_LOOP = [
  {
    title: "Observe",
    lead: "See what is happening.",
    detail:
      "Connect discovery, store, shopper behavior, conversion, orders, and revenue around the same commercial question.",
  },
  {
    title: "Understand",
    lead: "See what may be driving it.",
    detail:
      "Join product and brand truth with shopper journeys, friction, competitor context, and attribution without overstating causality.",
  },
  {
    title: "Decide",
    lead: "Choose what should happen next.",
    detail:
      "Compare evidence, affected scope, urgency, and commercial value to choose what deserves action.",
  },
  {
    title: "Act",
    lead: "Put the decision into action.",
    detail:
      "Change supported product data, content, merchandising, creative, campaigns, or store experience under merchant approval.",
  },
  {
    title: "Learn",
    lead: "Measure and improve.",
    detail:
      "Measure the relevant discovery, behavior, conversion, order, and revenue signals after the action and feed the result into the next decision.",
  },
] as const;

export default function ProductionHomepage() {
  return (
    <div className="bg-[#fafafa] text-[#151515]">
      {/* The scan is the page's only real conversion, so it lives in the first
          viewport rather than behind a jump link. The graph is pinned to the
          opening screen so a rendered result can grow the section without
          stretching the artwork down the page. */}
      <section id="home-hero" className="relative isolate overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[80svh]">
          <HeroSurfaceShift />
        </div>
        <div
          id="ai-check"
          className="pointer-events-none relative z-10 mx-auto flex min-h-[80svh] max-w-[92rem] scroll-mt-24 items-center justify-center px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-24"
        >
          <Reveal className="w-full">
            <div className="mx-auto w-full max-w-[76rem] text-center">
              <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.14em] text-[#b8441d]">
                Commerce discovery + conversion
              </p>
              <h1 className="mx-auto mt-6 max-w-[18ch] text-balance font-display text-[clamp(3rem,5.6vw,5rem)] font-normal leading-[0.98] tracking-[-0.025em] text-[#111318]">
                Make your products easier to find, choose, and buy.
              </h1>
              <p className="mx-auto mt-6 max-w-[54ch] text-[17px] leading-[1.7] text-black/64 sm:text-[18px]">
                Enter your store to see what surfaces, what gets in the way, and
                where Beseam would look next.
              </p>

              <div className="pointer-events-auto mx-auto mt-9 w-full">
                <LiveAnswerCheck
                  placement="homepage_hero"
                  formNote={
                    <p className="mx-auto mt-6 flex flex-col items-center justify-center gap-x-3 gap-y-2 text-[13px] text-black/56 sm:flex-row">
                      <span>
                        Free and anonymous. Public storefront pages only.
                      </span>
                      <TrackedLink
                        href={APP_REGISTER_URL}
                        eventName="marketing_primary_cta_clicked"
                        eventCategory="conversion"
                        placement="homepage_hero"
                        preserveUtm
                        className="group inline-flex min-h-9 items-center gap-1.5 font-semibold text-[#111318] underline decoration-black/30 underline-offset-6 hover:decoration-[#b8441d]"
                      >
                        Or start for free
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                      </TrackedLink>
                    </p>
                  }
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <CategoryBenchmarksSection />

      <WhyBeseam />

      <section
        id="proof"
        className="scroll-mt-24 border-t border-black/18 bg-white"
      >
        <div className="mx-auto max-w-[92rem] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
          <Reveal>
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)] lg:items-end lg:gap-10">
              <div>
                <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.14em] text-[#b8441d]">
                  How Beseam works
                </p>
                <h2 className="mt-7 max-w-[28ch] text-balance font-display text-[clamp(2.4rem,3.8vw,4rem)] font-normal leading-[1.02] tracking-[-0.02em] text-[#111318]">
                  Observe. Understand. Decide. Act. Learn.
                </h2>
              </div>
              <p className="max-w-[52ch] text-[17px] leading-[1.65] text-black/64">
                One loop turns connected commerce signals into better decisions,
                actions, and learning.
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
                      <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.12em] text-[#111318]">
                        {stage.title}
                      </p>
                      {index < COMMERCE_PATH.length - 1 ? (
                        <ArrowRight
                          className="h-3.5 w-3.5 shrink-0 text-black/28 sm:absolute sm:-right-2 sm:top-0.5"
                          aria-hidden="true"
                        />
                      ) : null}
                    </div>
                    <p className="mt-2 text-[12px] leading-relaxed text-black/48">
                      {stage.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <ol className="mt-12 grid border-t-2 border-[#111318] sm:grid-cols-2 lg:grid-cols-5">
              {OPERATING_LOOP.map((step, index) => (
                <li
                  key={step.title}
                  className="relative flex flex-col gap-3 border-b border-black/14 py-7 sm:px-7 lg:border-b-0 lg:border-l lg:border-black/14 lg:px-6 lg:first:border-l-0 lg:first:pl-0 lg:last:pr-0"
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
