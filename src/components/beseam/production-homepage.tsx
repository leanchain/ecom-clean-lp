import Link from "next/link";

import { ArrowRight } from "lucide-react";

import LiveAnswerCheck from "@/components/beseam/answer-check";
import CategoryBenchmarksSection from "@/components/beseam/category-benchmarks-section";
import FirstMonthPromise from "@/components/beseam/first-month-promise";
import HeroSurfaceShift from "@/components/beseam/hero-surface-shift";
import { Reveal } from "@/components/beseam/reveal";
import TrackedLink from "@/components/beseam/tracked-link";
import WhyBeseam from "@/components/beseam/why-beseam";

const APP_REGISTER_URL = "https://app.beseam.com/register";

const COMMERCE_SCOPE = [
  {
    eyebrow: "Before the click",
    title: "Know how shoppers find you.",
    detail:
      "See where products appear, disappear, or lose ground before the visit.",
  },
  {
    eyebrow: "On your store",
    title: "See where shoppers get stuck.",
    detail: "Connect search, recommendations, product pages, and behavior.",
  },
  {
    eyebrow: "After the change",
    title: "Know whether it worked.",
    detail:
      "Measure what changed in behavior, conversion, orders, and revenue.",
  },
] as const;

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
    detail: "Connect discovery, store, behavior, competitors, and revenue.",
  },
  {
    title: "Understand",
    lead: "See what may be driving it.",
    detail:
      "Join product and brand truth with journeys, intent, friction, and attribution.",
  },
  {
    title: "Decide",
    lead: "Choose what should happen next.",
    detail:
      "Prioritize opportunities, predict needs, rank, recommend, personalize, or test.",
  },
  {
    title: "Act",
    lead: "Put the decision into action.",
    detail:
      "Change product data, content, merchandising, creative, campaigns, or store experience.",
  },
  {
    title: "Learn",
    lead: "Measure and improve.",
    detail:
      "Feed discovery, behavior, conversion, and revenue outcomes into the next decision.",
  },
] as const;

export default function ProductionHomepage() {
  return (
    <div className="bg-[#fafafa] text-[#151515]">
      <section
        id="home-hero"
        className="relative isolate min-h-[94svh] overflow-hidden"
      >
        <HeroSurfaceShift />
        <div className="pointer-events-none relative z-10 mx-auto flex min-h-[94svh] max-w-[92rem] items-center justify-center px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
          <Reveal className="w-full">
            <div className="mx-auto w-full max-w-[76rem] text-center">
              <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.14em] text-[#b8441d] lg:-translate-y-4">
                Commerce discovery + conversion
              </p>
              <h1 className="mx-auto mt-7 max-w-[18ch] text-balance font-display text-[clamp(3.5rem,7vw,6rem)] font-normal leading-[0.96] tracking-[-0.025em] text-[#111318]">
                Make your products easier to find, choose, and buy.
              </h1>
              <p className="mx-auto mt-8 max-w-[68ch] text-[18px] leading-[1.65] text-black/68 sm:text-[19px]">
                Beseam connects discovery, store, behavior, and revenue signals
                to show where products lose ground, what to do next, and what
                changed after you act.
              </p>
              <div className="pointer-events-auto mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <TrackedLink
                  href={APP_REGISTER_URL}
                  eventName="marketing_primary_cta_clicked"
                  eventCategory="conversion"
                  placement="homepage_hero"
                  preserveUtm
                  className="group inline-flex min-h-12 w-full items-center justify-center gap-2 bg-[#111318] px-6 text-[15px] font-semibold text-white transition-colors hover:bg-[#b8441d] sm:w-auto"
                >
                  Start for free
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </TrackedLink>
                <TrackedLink
                  href="/#ai-check"
                  eventName="hero_ai_check_clicked"
                  eventCategory="conversion"
                  placement="homepage_hero"
                  className="inline-flex min-h-12 w-full items-center justify-center px-5 text-[15px] font-semibold text-[#111318] underline decoration-black/30 underline-offset-7 hover:decoration-[#b8441d] sm:w-auto"
                >
                  Run a free AI check
                </TrackedLink>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section
        id="scope"
        className="scroll-mt-24 border-y border-black/18 bg-white"
      >
        <div className="mx-auto max-w-[92rem] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
          <Reveal>
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)] lg:items-end lg:gap-10">
              <div>
                <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.14em] text-[#b8441d]">
                  One connected commerce system
                </p>
                <h2 className="mt-7 max-w-[28ch] text-balance font-display text-[clamp(2.4rem,3.8vw,4rem)] font-normal leading-[1.02] tracking-[-0.02em] text-[#111318]">
                  See the whole path from discovery to revenue.
                </h2>
              </div>
              <p className="max-w-[54ch] text-[17px] leading-[1.7] text-black/64">
                Beseam connects what happens before the visit, on your store,
                and after you make a change.
              </p>
            </div>
          </Reveal>

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

          <Reveal delay={0.1}>
            <div className="mt-10 grid border-t-2 border-[#111318] lg:grid-cols-3">
              {COMMERCE_SCOPE.map((item, index) => (
                <article
                  key={item.title}
                  className="border-b border-black/18 py-7 lg:border-b-0 lg:border-l lg:px-8 lg:first:border-l-0 lg:first:pl-0 lg:last:pr-0"
                >
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-[12px] font-semibold tabular-nums text-[#b8441d]">
                      0{index + 1}
                    </span>
                    <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.12em] text-black/62">
                      {item.eyebrow}
                    </p>
                  </div>
                  <h3 className="mt-5 text-balance text-[22px] font-semibold leading-[1.15] tracking-[-0.015em] text-[#111318]">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-[15px] leading-[1.7] text-black/64">
                    {item.detail}
                  </p>
                </article>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <WhyBeseam />

      <section id="proof" className="scroll-mt-24 bg-white">
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

          <Reveal delay={0.08}>
            <ol className="mt-14 grid border-t-2 border-[#111318] sm:grid-cols-2 lg:grid-cols-5">
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
      <section id="ai-check" className="scroll-mt-24 bg-[#faf1eb]">
        <div className="mx-auto max-w-[92rem] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
          <Reveal>
            <div className="mx-auto max-w-[72rem] text-center">
              <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.14em] text-[#b8441d]">
                Live commerce check
              </p>
              <h2 className="mx-auto mt-7 max-w-[18ch] text-balance font-display text-[clamp(2.6rem,4.4vw,4.8rem)] font-normal leading-[1] tracking-[-0.025em] text-[#111318]">
                See where your products lose ground.
              </h2>
              <p className="mx-auto mt-7 max-w-[54ch] text-[17px] leading-[1.7] text-black/64">
                Enter your store to see what surfaces, what gets in the way, and
                where Beseam would look next.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.08} y={18}>
            <div className="mx-auto mt-12 max-w-[76rem]">
              <LiveAnswerCheck placement="homepage_ai_check" />
              <div className="mt-4 flex justify-center text-center">
                <Link
                  href="#benchmarks"
                  className="inline-flex min-h-11 items-center gap-2 text-[15px] font-semibold text-[#151515] underline decoration-black/30 underline-offset-8 transition-colors hover:decoration-[#b8441d]"
                >
                  See a discovery benchmark
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <CategoryBenchmarksSection />

      <FirstMonthPromise />
    </div>
  );
}
