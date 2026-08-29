import {
  ArrowRight,
  BarChart3,
  Check,
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

/**
 * The bridge the page was missing: after the hero scan, this is the shortest
 * complete statement of what Beseam is, before any methodology or evidence
 * arrives. The columns speak the shopper's world — finding, choosing, buying,
 * and what it was worth — while the numbered operating loop that follows is
 * Beseam's method for improving it, so this row uses arrows, not numbers.
 *
 * Each stage carries a drawn vignette rather than a paragraph: the same
 * rebuilt-in-HTML grammar as the app screens, aria-hidden, with no counts —
 * hairlines stand in for copy and the bars carry no axis or figure, so
 * nothing here can be misread as a measurement.
 */
const DOMAINS = [
  {
    title: "Get discovered",
    scope: "AI · search · feeds",
    detail: "You can’t be chosen if you’re never considered.",
    Icon: Radar,
  },
  {
    title: "Help shoppers choose",
    scope: "PDP · search · recommendations · personalization",
    detail: "They see it and pick something else — often over an unanswered question.",
    Icon: ShoppingBag,
  },
  {
    title: "Understand behavior",
    scope: "Sessions · journeys · cart · checkout",
    detail: "See where interest turns into hesitation, action, or abandonment.",
    Icon: MousePointer2,
  },
  {
    title: "Measure what worked",
    scope: "Conversion · orders · revenue",
    detail: "See what the decision — and the approved fix — was worth.",
    Icon: BarChart3,
  },
] as const;

/** Three assistant shortlists: named on two, missed on one. */
function DiscoveryVignette() {
  return (
    <div
      aria-hidden="true"
      className="relative flex h-[5.75rem] flex-col justify-center gap-2 border border-black/14 bg-white px-3.5"
    >
      <span className="absolute right-2 top-1 font-mono text-[8px] uppercase tracking-[0.08em] text-black/38">
        Example
      </span>
      {(
        [
          ["openai", "ChatGPT", 68],
          ["gemini", "Gemini", 61],
          ["perplexity", "Perplexity", 0],
        ] as const
      ).map(([brand, name, share]) => (
        <div key={brand} className="flex items-center gap-2">
          <ChannelIcon
            brand={brand}
            className={`h-3.5 w-3.5 ${share > 0 ? "text-ink-deep/70" : "text-black/30"}`}
          />
          <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.08em] text-black/56">
            {name}
          </span>
          <span className="h-px min-w-4 flex-1 bg-black/10" />
          <span
            className={`shrink-0 font-mono text-[9px] font-semibold tabular-nums ${
              share > 0 ? "text-[#1a6b43]" : "text-signal-ink"
            }`}
          >
            {share > 0 ? `Named · ${share}%` : "Not named · 0%"}
          </span>
        </div>
      ))}
    </div>
  );
}

/** A product specimen with one deciding answer missing from its page. */
function StoreVignette() {
  return (
    <div
      aria-hidden="true"
      className="flex h-[5.75rem] items-center gap-3.5 border border-black/14 bg-white px-3.5"
    >
      <ProductArt kind="shell" className="h-14 w-14 shrink-0" />
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        {(
          [
            ["Waterproof", "20,000 mm", true],
            ["Returns", "30 days", true],
            ["Fits over layers?", "No answer", false],
          ] as const
        ).map(([question, answer, ok]) => (
          <div
            key={question}
            className="flex items-center justify-between gap-2"
          >
            <span className="truncate font-mono text-[9px] uppercase tracking-[0.06em] text-black/48">
              {question}
            </span>
            <span
              className={`flex shrink-0 items-center gap-1 font-mono text-[9px] font-semibold ${
                ok ? "text-black/64" : "text-signal-ink"
              }`}
            >
              {ok ? (
                <Check className="h-2.5 w-2.5" />
              ) : (
                <X className="h-2.5 w-2.5" />
              )}
              {answer}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/** A search refined, then abandoned. */
function BehaviorVignette() {
  return (
    <div
      aria-hidden="true"
      className="flex h-[5.75rem] flex-col justify-center gap-2.5 border border-black/14 bg-white px-3.5"
    >
      <div className="flex min-w-0 items-center gap-1.5">
        <span className="truncate border border-black/16 bg-ground px-1.5 py-0.5 font-mono text-[9px] text-black/62">
          waterproof jacket
        </span>
        <ArrowRight className="h-3 w-3 shrink-0 text-black/35" />
        <span className="truncate border border-signal-ink/40 bg-signal-ink/[0.06] px-1.5 py-0.5 font-mono text-[9px] text-signal-ink">
          + for commuting
        </span>
      </div>
      <div className="flex items-center gap-2">
        <span className="font-mono text-[9px] uppercase tracking-[0.08em] text-black/40">
          then
        </span>
        <span className="h-px flex-1 bg-black/12" />
        <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.08em] text-signal-ink">
          left without opening one
        </span>
      </div>
    </div>
  );
}

/**
 * Point improvements rather than bars: the figures mirror the ImpactScreen
 * example ledger further down the page and carry the same “Example” stamp.
 */
function RevenueVignette() {
  return (
    <div
      aria-hidden="true"
      className="relative flex h-[5.75rem] flex-col justify-center gap-2 border border-black/14 bg-white px-3.5"
    >
      <span className="absolute right-2 top-1 font-mono text-[8px] uppercase tracking-[0.08em] text-black/38">
        Example
      </span>
      {(
        [
          ["Named by AI", "9 → 23%", "+14 pts"],
          ["Search → page", "46 → 57%", "+11 pts"],
          ["Add to cart", "2.4 → 2.9%", "+0.5 pts"],
        ] as const
      ).map(([label, range, delta]) => (
        <div key={label} className="flex items-center gap-2">
          <span className="truncate font-mono text-[9px] uppercase tracking-[0.06em] text-black/48">
            {label}
          </span>
          <span className="h-px min-w-3 flex-1 bg-black/10" />
          <span className="shrink-0 font-mono text-[9px] tabular-nums text-black/56">
            {range}
          </span>
          <span className="w-12 shrink-0 text-right font-mono text-[9px] font-semibold tabular-nums text-signal-ink">
            {delta}
          </span>
        </div>
      ))}
    </div>
  );
}

const VIGNETTES = [
  DiscoveryVignette,
  StoreVignette,
  BehaviorVignette,
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
      <div className="mx-auto max-w-[92rem] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
        <Reveal>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-end lg:gap-16">
            <div>
              <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.14em] text-signal-ink">
                What Beseam actually does
              </p>
              <h2 className="mt-7 max-w-[18ch] text-balance font-display text-[clamp(2.3rem,3.8vw,3.9rem)] font-normal leading-[1.03] tracking-[-0.02em] text-ink-deep">
                One system across the path from discovery to purchase.
              </h2>
            </div>
            <p className="max-w-[52ch] text-[16px] leading-[1.75] text-black/64">
              AI visibility, product pages, search, personalization, shopper behavior,
              conversion, and revenue stay connected in one continuous loop.
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
                      <domain.Icon
                        aria-hidden="true"
                        className="h-4 w-4"
                        strokeWidth={1.8}
                      />
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-[16px] font-semibold leading-[1.25] text-ink-deep">
                        {domain.title}
                      </h3>
                      <p className="mt-1 font-mono text-[8.5px] font-semibold uppercase tracking-[0.08em] text-black/40">
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
                  <p className="mt-3 max-w-[34ch] text-[13.5px] leading-[1.55] text-black/62">
                    {domain.detail}
                  </p>
                </article>
              );
            })}
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mt-6 bg-ink-deep px-5 py-5 text-white sm:px-6 lg:px-8">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-8">
              <p className="shrink-0 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-signal">
                Beseam keeps going
              </p>
              <ol className="grid flex-1 gap-px bg-white/12 sm:grid-cols-5">
                {LOOP.map(({ label, Icon }, index) => (
                  <li
                    key={label}
                    className="relative flex min-h-14 items-center gap-2.5 bg-ink-deep px-3 py-3"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center border border-white/18 text-signal">
                      <Icon className="h-3.5 w-3.5" strokeWidth={1.8} aria-hidden="true" />
                    </span>
                    <span className="text-[11px] font-semibold leading-[1.3] text-white/86">
                      {label}
                    </span>
                    {index < LOOP.length - 1 ? (
                      <ArrowRight
                        className="absolute -right-2 top-1/2 z-10 hidden h-4 w-4 -translate-y-1/2 bg-ink-deep text-signal sm:block"
                        aria-hidden="true"
                      />
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
