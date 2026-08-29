import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  MousePointer2,
  Radar,
  RefreshCw,
  Send,
  ShoppingBag,
  WandSparkles,
  X,
} from "lucide-react";

import { ChannelIcon } from "@/components/beseam/channel-icon";
import ProductArt from "@/components/beseam/product-art";
import { Reveal } from "@/components/beseam/reveal";

const DOMAINS = [
  {
    title: "Get considered",
    scope: "AI · search · feeds",
    detail: "You can’t be chosen if you’re never considered.",
    Icon: Radar,
  },
  {
    title: "Understand the decision",
    scope: "PDP · search · shopper behavior",
    detail: "See the unanswered question getting in the way of the decision.",
    Icon: MousePointer2,
  },
  {
    title: "Help shoppers choose",
    scope: "Adaptive discovery · personalization",
    detail: "Add the missing context that helps the shopper choose.",
    Icon: ShoppingBag,
  },
  {
    title: "Measure & learn",
    scope: "Conversion · orders · revenue",
    detail: "Remeasure the same journey, learn what worked, and improve again.",
    Icon: BarChart3,
  },
] as const;

function DiscoveryVignette() {
  return (
    <div
      aria-hidden="true"
      className="flex h-[7.25rem] flex-col bg-white p-3 ring-1 ring-black/10"
    >
      <div className="flex items-center gap-2 border-b border-black/10 pb-2">
        <span className="shrink-0 font-mono text-[7.5px] font-semibold uppercase tracking-[0.08em] text-black/38">
          Buying question
        </span>
        <span className="min-w-0 truncate text-[9px] font-medium text-ink-deep">
          best waterproof jacket for commuting
        </span>
      </div>

      <div className="flex flex-1 flex-col justify-center gap-2">
        {(
          [
            ["openai", "ChatGPT", true],
            ["gemini", "Gemini", true],
            ["perplexity", "Perplexity", false],
          ] as const
        ).map(([brand, name, named]) => (
          <div key={brand} className="flex items-center gap-2">
            <ChannelIcon
              brand={brand}
              className={`h-4 w-4 ${named ? "text-ink-deep/70" : "text-black/30"}`}
            />
            <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.06em] text-black/52">
              {name}
            </span>
            <span className="h-px min-w-3 flex-1 bg-black/10" />
            <span
              className={`font-mono text-[9px] font-semibold uppercase tracking-[0.06em] ${
                named ? "text-[#1a6b43]" : "text-signal-ink"
              }`}
            >
              {named ? "Named" : "Not named"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function StoreVignette() {
  return (
    <div
      aria-hidden="true"
      className="flex h-[7.25rem] overflow-hidden bg-white ring-1 ring-black/10"
    >
      <div className="flex w-[38%] min-w-0 flex-col items-center justify-center bg-ground/60 px-2">
        <ProductArt kind="shell" className="h-12 w-12" />
        <span className="mt-1 text-[9px] font-semibold text-ink-deep">City Shell</span>
        <span className="mt-0.5 font-mono text-[7px] text-black/42">20,000 mm</span>
      </div>

      <div className="flex min-w-0 flex-1 flex-col justify-center border-l border-black/10 px-3">
        <span className="font-mono text-[7.5px] font-semibold uppercase tracking-[0.08em] text-black/38">
          What blocks the choice
        </span>
        <p className="mt-2 text-[10px] font-semibold leading-tight text-ink-deep">
          Breathable enough for commuting?
        </p>
        <div className="mt-1.5 flex items-center gap-1.5 text-signal-ink">
          <X className="h-3 w-3 shrink-0" />
          <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.06em]">
            No answer
          </span>
        </div>
        <p className="mt-2 font-mono text-[7px] leading-[1.35] text-black/38">
          Same question · missing decision evidence
        </p>
      </div>
    </div>
  );
}

function PersonalizationVignette() {
  return (
    <div
      aria-hidden="true"
      className="flex h-[7.25rem] flex-col bg-white p-3 ring-1 ring-black/10"
    >
      <div className="flex items-center gap-2">
        <span className="shrink-0 font-mono text-[8px] font-semibold uppercase tracking-[0.09em] text-black/38">
          Likely intent
        </span>
        <span className="h-px min-w-3 flex-1 bg-black/10" />
        <span className="shrink-0 bg-ground px-1.5 py-0.5 font-mono text-[8px] text-black/58 ring-1 ring-black/8">
          waterproof
        </span>
        <span className="shrink-0 bg-signal-ink/[0.06] px-1.5 py-0.5 font-mono text-[8px] font-semibold text-signal-ink ring-1 ring-signal-ink/18">
          commuting
        </span>
      </div>

      <div className="mt-2 flex min-h-0 flex-1 overflow-hidden ring-1 ring-black/10">
        <div className="flex w-[42%] min-w-0 items-center gap-2.5 bg-ground/65 px-2.5">
          <ProductArt kind="shell" className="h-10 w-10 shrink-0" />
          <div className="min-w-0">
            <p className="font-mono text-[7.5px] uppercase tracking-[0.08em] text-black/38">
              You’re viewing
            </p>
            <p className="mt-0.5 truncate text-[10.5px] font-semibold text-ink-deep">
              City Shell
            </p>
          </div>
        </div>

        <div className="flex min-w-0 flex-1 flex-col justify-center border-l border-black/10 bg-signal-ink/[0.045] px-3">
          <div className="flex items-center gap-1.5">
            <WandSparkles className="h-3 w-3 shrink-0 text-signal-ink" />
            <span className="font-mono text-[7.5px] font-semibold uppercase tracking-[0.08em] text-signal-ink">
              Helpful context
            </span>
          </div>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            <span className="bg-white px-1.5 py-0.5 font-mono text-[7.5px] text-black/58 ring-1 ring-black/8">
              20,000 mm waterproof
            </span>
            <span className="bg-white px-1.5 py-0.5 font-mono text-[7.5px] font-semibold text-ink-deep ring-1 ring-signal-ink/16">
              Breathable shell
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function RevenueVignette() {
  return (
    <div
      aria-hidden="true"
      className="flex h-[7.25rem] flex-col bg-white p-3 ring-1 ring-black/10"
    >
      <div className="flex items-center justify-between gap-2 border-b border-black/10 pb-2">
        <span className="font-mono text-[7.5px] font-semibold uppercase tracking-[0.08em] text-black/38">
          After the approved change
        </span>
        <span className="font-mono text-[7px] text-black/34">
          same question · same segment
        </span>
      </div>

      <div className="flex flex-1 flex-col justify-center gap-2">
        {(
          [
            ["AI consideration", "9 → 23%", "+14 pts"],
            ["Product visits", "46 → 57%", "+11 pts"],
            ["Add to cart", "2.4 → 2.9%", "+0.5 pts"],
          ] as const
        ).map(([label, range, delta]) => (
          <div key={label} className="flex items-center gap-2">
            <span className="truncate font-mono text-[8px] uppercase tracking-[0.05em] text-black/46">
              {label}
            </span>
            <span className="h-px min-w-2 flex-1 bg-black/10" />
            <span className="shrink-0 font-mono text-[9px] tabular-nums text-black/54">
              {range}
            </span>
            <span className="w-12 shrink-0 text-right font-mono text-[9px] font-semibold tabular-nums text-signal-ink">
              {delta}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

const VIGNETTES = [
  DiscoveryVignette,
  StoreVignette,
  PersonalizationVignette,
  RevenueVignette,
] as const;

const LOOP = [
  { label: "Find the opportunity", Icon: Radar },
  { label: "Propose the fix", Icon: WandSparkles },
  { label: "You approve", Icon: CheckCircle2 },
  { label: "Beseam applies it", Icon: Send },
  { label: "Measure and repeat", Icon: RefreshCw },
] as const;

export default function WhatBeseamDoes() {
  return (
    <section id="one-system" className="scroll-mt-24 bg-ground">
      <div className="mx-auto max-w-[92rem] px-5 py-16 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
        <Reveal>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-end lg:gap-16">
            <div>
              <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.14em] text-signal-ink">
                From being considered to being chosen
              </p>
              <h2 className="mt-7 max-w-[18ch] text-balance font-display text-[clamp(2.3rem,3.8vw,3.9rem)] font-normal leading-[1.03] tracking-[-0.02em] text-ink-deep">
                Getting considered is only the start.
              </h2>
            </div>
            <p className="max-w-[50ch] text-[16px] leading-[1.7] text-black/64">
              Beseam follows the same shopper decision end to end: see whether you are considered, find what blocks the choice, add useful context, then remeasure the outcome and learn.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="mt-12 grid border-t-2 border-ink-deep sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
            {DOMAINS.map((domain, index) => {
              const Vignette = VIGNETTES[index];
              return (
                <article
                  key={domain.title}
                  className={`relative border-b border-black/14 py-5 sm:px-5 sm:py-6 lg:border-b-0 ${
                    [
                      "sm:pl-0",
                      "sm:border-l",
                      "sm:pl-0 lg:border-l lg:pl-5",
                      "sm:border-l",
                    ][index]
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center bg-signal-ink text-white">
                      <domain.Icon aria-hidden="true" className="h-4 w-4" strokeWidth={1.8} />
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-[16px] font-semibold leading-[1.25] text-ink-deep">
                        {domain.title}
                      </h3>
                      <p className="mt-1.5 font-mono text-[9.5px] font-semibold uppercase leading-[1.35] tracking-[0.07em] text-black/42">
                        {domain.scope}
                      </p>
                    </div>
                    {index < DOMAINS.length - 1 ? (
                      <ArrowRight
                        aria-hidden="true"
                        className="hidden h-3.5 w-3.5 shrink-0 text-signal-ink lg:absolute lg:-right-2 lg:top-7 lg:z-10 lg:block lg:bg-ground"
                      />
                    ) : null}
                  </div>
                  <div className="mt-4">
                    <Vignette />
                  </div>
                  <p className="mt-3.5 max-w-[31ch] text-[13.5px] leading-[1.5] text-black/64">
                    {domain.detail}
                  </p>
                </article>
              );
            })}
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mt-5 border-y border-white/10 bg-ink-deep px-5 py-3.5 text-white sm:px-6 lg:px-8">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:gap-8">
              <p className="shrink-0 font-mono text-[9.5px] font-semibold uppercase tracking-[0.12em] text-signal">
                Continuous loop
              </p>
              <ol className="relative grid flex-1 gap-y-3 sm:grid-cols-5 sm:gap-0 before:absolute before:left-5 before:right-5 before:top-3.5 before:hidden before:h-px before:bg-white/16 sm:before:block">
                {LOOP.map(({ label, Icon }, index) => (
                  <li
                    key={label}
                    className="relative z-10 flex items-center gap-2.5 sm:flex-col sm:items-start sm:gap-2 sm:px-3"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center bg-ink-deep text-signal ring-1 ring-white/18">
                      <Icon className="h-3.5 w-3.5" strokeWidth={1.8} aria-hidden="true" />
                    </span>
                    <span className="text-[11px] font-semibold leading-[1.3] text-white/82">
                      {label}
                    </span>
                    {index < LOOP.length - 1 ? (
                      <ArrowRight className="ml-auto h-3.5 w-3.5 text-signal sm:hidden" aria-hidden="true" />
                    ) : null}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
