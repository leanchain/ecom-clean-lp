import Link from "next/link";

import { ArrowRight } from "lucide-react";

import LiveAnswerCheck from "@/components/beseam/answer-check";
import CategoryBenchmarksSection from "@/components/beseam/category-benchmarks-section";
import FirstMonthPromise from "@/components/beseam/first-month-promise";
import { Reveal } from "@/components/beseam/reveal";
import TrackedLink from "@/components/beseam/tracked-link";
import WhyBeseam from "@/components/beseam/why-beseam";

const APP_REGISTER_URL = "https://app.beseam.com/register";

const COMMERCE_SCOPE = [
  {
    eyebrow: "Find",
    title: "Get found before the visit.",
    detail:
      "See where products appear, disappear, or lose across AI assistants, AI search, search engines, feeds, and other discovery surfaces.",
    signals: "AI discovery · search · feeds · competitors · reachability",
  },
  {
    eyebrow: "Choose",
    title: "Help shoppers find and choose the right product.",
    detail:
      "See where onsite search, recommendations, merchandising, product pages, or product information make the right item harder to find or compare.",
    signals: "Onsite search · recommendations · merchandising · PDPs",
  },
  {
    eyebrow: "Buy",
    title: "Remove what stops the purchase.",
    detail:
      "See where shoppers hesitate, abandon, or fail to convert, then connect approved changes to behavior, conversion, orders, and revenue.",
    signals: "Behavior · conversion · checkout · orders · revenue",
  },
] as const;

const STEPS = [
  {
    title: "Find",
    lead: "Find the problem worth fixing.",
    detail:
      "Bring together external discovery, product and store evidence, onsite behavior, and conversion signals so the problem is visible in one place.",
  },
  {
    title: "Prioritize",
    lead: "Know what matters commercially.",
    detail:
      "Tie the issue to the products, shoppers, demand, and business outcome it affects. Not every gap deserves the same attention.",
  },
  {
    title: "Fix",
    lead: "Make the change, not another report.",
    detail:
      "Beseam prepares supported changes to product data, content, merchandising, and supported store experiences. You approve customer-facing work before it ships.",
  },
  {
    title: "Prove",
    lead: "Measure what changed.",
    detail:
      "Re-check the relevant discovery or onsite signal and measure behavior, conversion, orders, or revenue separately, with the evidence behind the result.",
  },
] as const;

export default function ProductionHomepage() {
  return (
    <div className="bg-[#fafafa] text-[#151515]">
      <section id="home-hero">
        <div className="mx-auto max-w-[92rem] px-5 pb-20 pt-20 sm:px-8 sm:pb-24 sm:pt-28 lg:px-10 lg:pb-28 lg:pt-32">
          <Reveal>
            <div className="mx-auto max-w-[76rem] text-center">
              <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.14em] text-[#b8441d]">
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
              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
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
                  One commerce system
                </p>
                <h2 className="mt-7 max-w-[18ch] text-balance font-display text-[clamp(2.4rem,3.8vw,4rem)] font-normal leading-[1.02] tracking-[-0.02em] text-[#111318]">
                  See what&rsquo;s getting in the way. Fix it. Prove it worked.
                </h2>
              </div>
              <p className="max-w-[62ch] text-[17px] leading-[1.7] text-black/64">
                Beseam looks across the path from discovery to purchase, finds
                the problems most worth changing, turns them into approved work,
                and measures the relevant result afterward. The output is not
                another score. It is the next fix worth making.
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

      <section id="ai-check" className="scroll-mt-24 bg-[#faf1eb]">
        <div className="mx-auto max-w-[92rem] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
          <Reveal>
            <div className="mx-auto max-w-[72rem] text-center">
              <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.14em] text-[#b8441d]">
                One external-discovery signal
              </p>
              <h2 className="mx-auto mt-7 max-w-[18ch] text-balance font-display text-[clamp(2.6rem,4.4vw,4.8rem)] font-normal leading-[1] tracking-[-0.025em] text-[#111318]">
                See why AI picked someone else.
              </h2>
              <p className="mx-auto mt-7 max-w-[68ch] text-[17px] leading-[1.7] text-black/64">
                A buying question can reveal where your product disappears and
                which competitors get put in front of the shopper instead. Run
                the live check below. Inside Beseam, this signal joins product,
                store, onsite search, behavior, and conversion evidence.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.08} y={18}>
            <div className="mx-auto mt-12 max-w-[76rem]">
              <LiveAnswerCheck placement="homepage_ai_check" />
              <div className="mt-6 flex justify-center text-center">
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

      <section id="proof" className="scroll-mt-24 bg-white">
        <div className="mx-auto max-w-[92rem] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
          <Reveal>
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:items-end lg:gap-16">
              <h2 className="max-w-[15ch] text-balance font-display text-[clamp(2.4rem,3.8vw,4rem)] font-normal leading-[1.02] tracking-[-0.02em] text-[#111318]">
                From problem to measured change.
              </h2>
              <p className="max-w-[56ch] text-[17px] leading-[1.65] text-black/64">
                The useful product is not another dashboard. It is knowing where
                commerce is being lost, which change deserves attention, getting
                that work shipped safely, and measuring the relevant signal
                again afterward.
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
