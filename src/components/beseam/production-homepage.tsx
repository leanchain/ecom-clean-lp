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
    title: "Know how demand reaches your products.",
    detail:
      "See how AI answers, search, feeds, competitors, and other discovery surfaces shape whether shoppers find your products before they visit.",
    signals: "AI answers · search · feeds · competitors · reachability",
  },
  {
    eyebrow: "On your store",
    title: "See where shoppers lose the thread.",
    detail:
      "Connect onsite search, recommendations, merchandising, product pages, product information, and shopper behavior so friction is visible in context.",
    signals:
      "Onsite search · recommendations · merchandising · PDPs · behavior",
  },
  {
    eyebrow: "After the change",
    title: "Know whether the fix mattered.",
    detail:
      "Re-check the relevant signal and connect approved changes to behavior, conversion, orders, revenue, or incrementality where the evidence supports it.",
    signals: "Conversion · orders · revenue · attribution · impact",
  },
const OPERATING_LOOP = [
  {
    title: "Observe",
    lead: "See what is happening across commerce.",
    detail:
      "Watch AI and search discovery, onsite search, recommendations, product pages, campaigns, shopper behavior, checkout, competitors, and revenue in one connected picture.",
  },
  {
    title: "Understand",
    lead: "Connect the signals around the outcome.",
    detail:
      "Bring catalog and brand truth together with shopper journeys, search intent, friction, attribution, and product evidence to understand what may be driving the result.",
  },
  {
    title: "Decide",
    lead: "Choose what should happen next.",
    detail:
      "Prioritize opportunities, predict likely shopper needs, improve ranking and recommendations, choose merchandising or personalization, and decide what is worth testing.",
  },
  {
    title: "Act",
    lead: "Turn the decision into approved work.",
    detail:
      "Change product data, content, merchandising, recommendations, creative, campaigns, and supported store experiences, with approval where customer-facing work is involved.",
  },
  {
    title: "Learn",
    lead: "Measure the result and feed it back in.",
    detail:
      "Measure discovery, behavior, conversion, orders, revenue, incrementality, and impact where supported, then use what happened to improve the next decision.",
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
              <p className="mx-auto mt-8 max-w-[76ch] text-[18px] leading-[1.65] text-black/68 sm:text-[19px]">
                Beseam shows where your products lose shoppers across AI,
                search, onsite discovery, product pages, and conversion: then
                shows you what to fix, helps you make the change, and measures
                what happened next.
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
            <div className="grid gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-end lg:gap-16">
              <div>
                <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.14em] text-[#b8441d]">
                  One connected commerce system
                </p>
                <h2 className="mt-7 max-w-[18ch] text-balance font-display text-[clamp(2.4rem,3.8vw,4rem)] font-normal leading-[1.02] tracking-[-0.02em] text-[#111318]">
                  See the whole path from discovery to revenue.
                </h2>
              </div>
              <p className="max-w-[62ch] text-[17px] leading-[1.7] text-black/64">
                Beseam connects what shoppers see before they reach your store
                with what happens once they arrive, what you change, and what
                happens afterward. The output is not another isolated score. It
                is a clearer view of where commerce is being lost and what is
                worth fixing next.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="mt-14 grid border-t-2 border-[#111318] lg:grid-cols-3">
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
                  <p className="mt-5 font-mono text-[11px] leading-relaxed text-black/52">
                    {item.signals}
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
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:items-end lg:gap-16">
              <div>
                <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.14em] text-[#b8441d]">
                  How Beseam works
                </p>
                <h2 className="mt-7 max-w-[15ch] text-balance font-display text-[clamp(2.4rem,3.8vw,4rem)] font-normal leading-[1.02] tracking-[-0.02em] text-[#111318]">
                  Observe. Understand. Decide. Act. Learn.
                </h2>
              </div>
              <p className="max-w-[58ch] text-[17px] leading-[1.65] text-black/64">
                Beseam is a continuous commerce intelligence loop. It watches how
                shoppers discover and move through your business, connects the
                evidence, decides what should happen next, helps put that decision
                into action, and learns from the result.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <ol className="mt-14 grid border-t-2 border-[#111318] sm:grid-cols-2 lg:grid-cols-5">
              {OPERATING_LOOP.map((step, index) => (
                <li
                  key={step.title}
                  className="relative flex flex-col gap-3 border-b border-black/14 py-7 sm:px-7 sm:[&:nth-child(odd)]:pl-0 lg:border-b-0 lg:border-l lg:border-black/14 lg:px-6 lg:first:border-l-0 lg:first:pl-0 lg:last:pr-0"
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
                Try one signal
              </p>
              <h2 className="mx-auto mt-7 max-w-[18ch] text-balance font-display text-[clamp(2.6rem,4.4vw,4.8rem)] font-normal leading-[1] tracking-[-0.025em] text-[#111318]">
                See why AI picked someone else.
              </h2>
              <p className="mx-auto mt-7 max-w-[62ch] text-[17px] leading-[1.7] text-black/64">
                Ask a buying question your customer might ask. See whether your
                products appear, who gets recommended instead, and what Beseam
                can investigate next.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.08} y={18}>
            <div className="mx-auto mt-12 max-w-[76rem]">
              <LiveAnswerCheck placement="homepage_ai_check" />
              <p className="mx-auto mt-6 max-w-[64ch] text-center text-[13px] leading-[1.7] text-black/52">
                AI visibility is one signal Beseam connects with product, store,
                behavior, conversion, and commercial evidence.
              </p>
              <div className="mt-4 flex justify-center text-center">
                <Link
                  href="#benchmarks"
                  className="inline-flex min-h-11 items-center gap-2 text-[15px] font-semibold text-[#151515] underline decoration-black/30 underline-offset-8 transition-colors hover:decoration-[#b8441d]"
                >
                  See the AI benchmark
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
