import Link from "next/link";

import {
  ArrowRight,
  Check,
  Search,
  ShoppingBag,
  Sparkles,
  X,
} from "lucide-react";

import { ActionsScreen, ImpactScreen } from "@/components/beseam/app-screens";
import { Reveal } from "@/components/beseam/reveal";
import { BENCHMARK_RUN } from "@/data/category-benchmarks";

const BENCHMARK_SOLO_SHARE = Math.round(
  (BENCHMARK_RUN.singleEngineOnly / BENCHMARK_RUN.namings) * 100,
);

const PRODUCT_SURFACES = [
  "AI discovery",
  "Search",
  "Product pages",
  "Sizing & fit",
  "Shopper behavior",
  "Checkout",
  "Actions",
  "Impact",
] as const;

const CHOICE_EVIDENCE = [
  ["Suitable for daily commuting?", "Not answered", false],
  ["Waterproof rating?", "20,000 mm", true],
  ["Fit over layers?", "Not answered", false],
  ["Returns?", "30 days", true],
] as const;

const EXPLANATIONS = [
  {
    title: "The wrong product was surfaced",
    detail: "The jacket matched the same commuting query in store search.",
    state: "Ruled out",
    active: false,
  },
  {
    title: "The useful size was unavailable",
    detail: "The common sizes were available during the observed session.",
    state: "Ruled out",
    active: false,
  },
  {
    title: "The deciding information was missing",
    detail:
      "The product page did not answer commuting suitability or fit over layers, the two questions still open at the decision point.",
    state: "Strongest evidence",
    active: true,
  },
] as const;

function StepHeader({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-signal-ink">
        {number} · {title}
      </p>
      <div className="mt-4 max-w-[42ch] text-[15px] leading-[1.7] text-black/64">
        {children}
      </div>
    </div>
  );
}

export default function BuyingDecisionStory() {
  return (
    <section
      id="decision-story"
      className="scroll-mt-24 border-y border-black/16 bg-white"
    >
      <div className="mx-auto max-w-[92rem] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
        <Reveal>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(22rem,0.72fr)] lg:items-end lg:gap-20">
            <div>
              <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.14em] text-signal-ink">
                One buying decision
              </p>
              <h2 className="mt-6 max-w-[18ch] text-balance font-display text-[clamp(2.4rem,4vw,4rem)] font-normal leading-[1.03] tracking-[-0.02em] text-ink-deep">
                See Beseam follow one decision from question to result.
              </h2>
            </div>
            <div>
              <p className="max-w-[52ch] text-[17px] leading-[1.7] text-black/66">
                The same shopper question stays attached as Beseam checks where
                the product appeared, what the shopper still needed to know,
                what may explain the loss, what should change, and what happened
                afterward.
              </p>
              <Link
                href="/benchmarks"
                className="mt-6 block border-l-2 border-signal-ink pl-4 text-[13px] leading-[1.6] text-black/62 transition-colors hover:text-ink-deep"
              >
                <strong className="font-semibold text-ink-deep">
                  {BENCHMARK_SOLO_SHARE}% of brand namings
                </strong>{" "}
                in our latest AI shopping benchmark appeared on only one
                assistant. Same buying question, different consideration set.
                <span className="ml-2 inline-flex items-center gap-1 font-semibold text-signal-ink">
                  See the benchmark
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
              </Link>
            </div>
          </div>
        </Reveal>

        <div className="mt-16 border-t-2 border-ink-deep lg:mt-20">
          <Reveal delay={0.04}>
            <article className="grid gap-8 border-b border-black/14 py-10 lg:grid-cols-[minmax(14rem,0.42fr)_minmax(0,1fr)] lg:gap-16 lg:py-14">
              <StepHeader number="01" title="Find">
                <p>
                  Start with the exact question the shopper is trying to answer,
                  then see which products make it into consideration across each
                  discovery surface.
                </p>
              </StepHeader>

              <div className="border border-black/16 bg-ground">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-black/12 bg-white px-5 py-4">
                  <div className="flex items-center gap-3">
                    <Search className="h-4 w-4 text-signal-ink" aria-hidden="true" />
                    <div>
                      <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-black/44">
                        Shopper question · illustrative example
                      </p>
                      <p className="mt-1 text-[15px] font-semibold text-ink-deep">
                        Which waterproof jacket works for commuting?
                      </p>
                    </div>
                  </div>
                </div>
                <div className="grid sm:grid-cols-3">
                  <div className="border-b border-black/12 p-5 sm:border-b-0 sm:border-r">
                    <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-black/44">
                      AI shopping
                    </p>
                    <p className="mt-4 text-[14px] font-semibold text-ink-deep">
                      RidgeNorth · Norra · Westpeak
                    </p>
                    <p className="mt-2 flex items-center gap-2 text-[12px] text-black/58">
                      <X className="h-3.5 w-3.5 text-signal-ink" aria-hidden="true" />
                      Urban Shell was not named
                    </p>
                  </div>
                  <div className="border-b border-black/12 p-5 sm:border-b-0 sm:border-r">
                    <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-black/44">
                      Google
                    </p>
                    <p className="mt-4 text-[14px] font-semibold text-ink-deep">
                      Urban Shell appears
                    </p>
                    <p className="mt-2 flex items-center gap-2 text-[12px] text-black/58">
                      <Check className="h-3.5 w-3.5 text-[#1a6b43]" aria-hidden="true" />
                      Product page is discoverable
                    </p>
                  </div>
                  <div className="p-5">
                    <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-black/44">
                      Store search
                    </p>
                    <p className="mt-4 text-[14px] font-semibold text-ink-deep">
                      Urban Shell · position 4
                    </p>
                    <p className="mt-2 text-[12px] text-black/58">
                      Relevant, but behind three alternatives
                    </p>
                  </div>
                </div>
              </div>
            </article>
          </Reveal>

          <Reveal delay={0.04}>
            <article className="grid gap-8 border-b border-black/14 py-10 lg:grid-cols-[minmax(14rem,0.42fr)_minmax(0,1fr)] lg:gap-16 lg:py-14">
              <StepHeader number="02" title="Choose">
                <p>
                  Once the product is seen, Beseam checks the questions and
                  evidence around the product page instead of assuming discovery
                  was the whole problem.
                </p>
              </StepHeader>

              <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(16rem,0.65fr)]">
                <div className="border border-black/16 bg-white">
                  <div className="flex items-center justify-between gap-4 border-b border-black/12 px-5 py-4">
                    <div>
                      <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-black/44">
                        Product page · illustrative example
                      </p>
                      <p className="mt-1 text-[16px] font-semibold text-ink-deep">
                        Urban Shell Jacket
                      </p>
                    </div>
                    <span className="border border-black/16 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.08em] text-black/48">
                      In stock
                    </span>
                  </div>
                  <div className="grid sm:grid-cols-2">
                    {CHOICE_EVIDENCE.map(([question, answer, present], index) => (
                      <div
                        key={question}
                        className={`p-5 ${index % 2 === 0 ? "sm:border-r" : ""} ${index < 2 ? "border-b border-black/12" : ""}`}
                      >
                        <p className="text-[13px] leading-[1.5] text-black/60">
                          {question}
                        </p>
                        <p
                          className={`mt-2 flex items-center gap-2 text-[14px] font-semibold ${present ? "text-ink-deep" : "text-signal-ink"}`}
                        >
                          {present ? (
                            <Check className="h-3.5 w-3.5" aria-hidden="true" />
                          ) : (
                            <X className="h-3.5 w-3.5" aria-hidden="true" />
                          )}
                          {answer}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="border border-black/16 bg-[#faf1eb] p-6">
                  <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-black/44">
                    Observed next
                  </p>
                  <p className="mt-4 text-[17px] font-semibold leading-snug text-ink-deep">
                    Opened the size guide, then left without adding to cart.
                  </p>
                  <p className="mt-4 text-[13px] leading-[1.65] text-black/58">
                    That tells us what happened. It does not prove why it
                    happened.
                  </p>
                </div>
              </div>
            </article>
          </Reveal>

          <Reveal delay={0.04}>
            <article className="grid gap-8 border-b border-black/14 py-10 lg:grid-cols-[minmax(14rem,0.42fr)_minmax(0,1fr)] lg:gap-16 lg:py-14">
              <StepHeader number="03" title="Understand">
                <p>
                  Beseam checks competing explanations and keeps hypotheses
                  separate from observed facts. The goal is not to manufacture
                  certainty. It is to narrow what is worth acting on.
                </p>
              </StepHeader>

              <div className="grid gap-px border border-black/14 bg-black/14 sm:grid-cols-3">
                {EXPLANATIONS.map((item) => (
                  <article
                    key={item.title}
                    className={item.active ? "bg-[#fff4ee] p-6" : "bg-white p-6"}
                  >
                    <p
                      className={`font-mono text-[10px] font-semibold uppercase tracking-[0.1em] ${item.active ? "text-signal-ink" : "text-black/42"}`}
                    >
                      {item.state}
                    </p>
                    <h3 className="mt-4 text-[16px] font-semibold leading-snug text-ink-deep">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-[13px] leading-[1.65] text-black/58">
                      {item.detail}
                    </p>
                  </article>
                ))}
              </div>
            </article>
          </Reveal>

          <Reveal delay={0.04}>
            <article className="grid gap-8 border-b border-black/14 py-10 lg:grid-cols-[minmax(14rem,0.42fr)_minmax(0,1fr)] lg:gap-16 lg:py-14">
              <StepHeader number="04" title="Decide">
                <p>
                  The evidence becomes a specific next move with the reason,
                  affected scope, effort, and owner still attached.
                </p>
              </StepHeader>
              <ActionsScreen />
            </article>
          </Reveal>

          <Reveal delay={0.04}>
            <article className="grid gap-8 border-b border-black/14 py-10 lg:grid-cols-[minmax(14rem,0.42fr)_minmax(0,1fr)] lg:gap-16 lg:py-14">
              <StepHeader number="05" title="Act">
                <p>
                  Supported changes move through the merchant&apos;s approval rules.
                  The proposed change and previous state remain visible before
                  anything customer facing goes live.
                </p>
              </StepHeader>

              <div className="border border-black/16 bg-white">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-black/12 bg-ground px-5 py-4">
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="h-4 w-4 text-signal-ink" aria-hidden="true" />
                    <p className="text-[15px] font-semibold text-ink-deep">
                      Shopify changes prepared
                    </p>
                  </div>
                  <span className="border border-signal-ink/30 bg-signal-ink/[0.07] px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.09em] text-signal-ink">
                    Awaiting approval
                  </span>
                </div>
                <div className="grid gap-px bg-black/12 sm:grid-cols-2">
                  <div className="bg-white p-6">
                    <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-black/44">
                      Product copy
                    </p>
                    <p className="mt-3 text-[15px] font-semibold text-ink-deep">
                      Add the commuting use case and waterproof context.
                    </p>
                    <p className="mt-2 text-[12px] leading-[1.6] text-black/56">
                      Urban Shell Jacket · product page
                    </p>
                  </div>
                  <div className="bg-white p-6">
                    <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-black/44">
                      Fit guidance
                    </p>
                    <p className="mt-3 text-[15px] font-semibold text-ink-deep">
                      Explain how the jacket fits over everyday layers.
                    </p>
                    <p className="mt-2 text-[12px] leading-[1.6] text-black/56">
                      Previous value retained for review and rollback
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-3 border-t border-black/12 px-5 py-4">
                  <p className="flex items-center gap-2 text-[12px] text-black/58">
                    <Sparkles className="h-3.5 w-3.5 text-signal-ink" aria-hidden="true" />
                    No customer-facing change goes live before approval.
                  </p>
                  <span className="bg-signal-ink px-4 py-2 text-[12px] font-semibold text-white">
                    Review changes
                  </span>
                </div>
              </div>
            </article>
          </Reveal>

          <Reveal delay={0.04}>
            <article className="grid gap-8 py-10 lg:grid-cols-[minmax(14rem,0.42fr)_minmax(0,1fr)] lg:gap-16 lg:py-14">
              <StepHeader number="06" title="Learn">
                <p>
                  After the approved change, Beseam checks the relevant signals
                  again and keeps the before and after evidence attached to the
                  same decision.
                </p>
              </StepHeader>
              <div className="bg-ink-deep p-1">
                <ImpactScreen />
              </div>
            </article>
          </Reveal>
        </div>

        <Reveal delay={0.06}>
          <div className="mt-12 border-y border-black/14 py-8 sm:mt-16">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.11em] text-signal-ink">
                  Across the platform
                </p>
                <p className="mt-2 max-w-[48ch] text-[15px] leading-[1.65] text-black/62">
                  These are not separate stories. They are the surfaces Beseam
                  connects around the buying decision.
                </p>
              </div>
              <div className="flex flex-wrap gap-x-5 gap-y-2 lg:max-w-[44rem] lg:justify-end">
                {PRODUCT_SURFACES.map((surface) => (
                  <span key={surface} className="text-[13px] font-semibold text-ink-deep">
                    {surface}
                  </span>
                ))}
              </div>
            </div>
            <Link
              href="/platform"
              className="mt-6 inline-flex min-h-10 items-center gap-2 text-[14px] font-semibold text-ink-deep underline decoration-black/25 underline-offset-6 hover:decoration-signal-ink"
            >
              Explore the platform
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
