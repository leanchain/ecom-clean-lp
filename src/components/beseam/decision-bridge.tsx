import { ArrowRight, Check, TrendingUp, X } from "lucide-react";

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
    title: "Finding it",
    detail: "You can’t be chosen if you’re never considered.",
  },
  {
    title: "Choosing it",
    detail: "They see it and pick something else — often over an unanswered question.",
  },
  {
    title: "Buying it",
    detail: "They choose you — then the purchase breaks.",
  },
  {
    title: "What it was worth",
    detail: "Orders, conversion, and what the fix changed.",
  },
] as const;

/** Three assistant shortlists: named on two, missed on one. */
function DiscoveryVignette() {
  return (
    <div
      aria-hidden="true"
      className="flex h-[5.75rem] flex-col justify-center gap-2.5 border border-black/14 bg-white px-3.5"
    >
      {(
        [
          ["openai", true],
          ["gemini", true],
          ["perplexity", false],
        ] as const
      ).map(([brand, named]) => (
        <div key={brand} className="flex items-center gap-2.5">
          <ChannelIcon
            brand={brand}
            className={`h-3.5 w-3.5 ${named ? "text-ink-deep/70" : "text-black/30"}`}
          />
          <span className="h-px flex-1 bg-black/14" />
          {named ? (
            <Check className="h-3 w-3 shrink-0 text-[#1a6b43]" />
          ) : (
            <X className="h-3 w-3 shrink-0 text-signal-ink" />
          )}
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
      <div className="flex min-w-0 flex-1 flex-col gap-2.5">
        <div className="flex items-center gap-2">
          <Check className="h-3 w-3 shrink-0 text-[#1a6b43]" />
          <span className="h-px w-full bg-black/14" />
        </div>
        <div className="flex items-center gap-2">
          <Check className="h-3 w-3 shrink-0 text-[#1a6b43]" />
          <span className="h-px w-3/4 bg-black/14" />
        </div>
        <div className="flex items-center gap-2">
          <X className="h-3 w-3 shrink-0 text-signal-ink" />
          <span className="w-full border-t border-dashed border-black/28" />
        </div>
      </div>
    </div>
  );
}

/** The last steps of the purchase, with one of them broken. */
function BuyingVignette() {
  return (
    <div
      aria-hidden="true"
      className="flex h-[5.75rem] flex-col justify-center gap-2.5 border border-black/14 bg-white px-3.5"
    >
      {(
        [
          ["Cart", true],
          ["Delivery", true],
          ["Payment", false],
        ] as const
      ).map(([step, ok]) => (
        <div key={step} className="flex items-center gap-2.5">
          <span className="w-14 shrink-0 font-mono text-[9px] font-semibold uppercase tracking-[0.08em] text-black/46">
            {step}
          </span>
          <span
            className={
              ok
                ? "h-px flex-1 bg-black/14"
                : "flex-1 border-t border-dashed border-black/28"
            }
          />
          {ok ? (
            <Check className="h-3 w-3 shrink-0 text-[#1a6b43]" />
          ) : (
            <X className="h-3 w-3 shrink-0 text-signal-ink" />
          )}
        </div>
      ))}
    </div>
  );
}

/** Before/after pairs with no axis and no figures. */
function RevenueVignette() {
  return (
    <div
      aria-hidden="true"
      className="flex h-[5.75rem] items-stretch gap-3 border border-black/14 bg-white px-4 py-3"
    >
      <div className="flex flex-1 items-end justify-around gap-3 border-b border-black/20">
        {(
          [
            ["38%", "62%"],
            ["30%", "74%"],
            ["46%", "58%"],
          ] as const
        ).map(([before, after], index) => (
          <span key={index} className="flex items-end gap-1">
            <span className="w-3 bg-black/16" style={{ height: `calc(${before} * 0.62)` }} />
            <span className="w-3 bg-signal-ink" style={{ height: `calc(${after} * 0.62)` }} />
          </span>
        ))}
      </div>
      <TrendingUp className="h-4 w-4 shrink-0 self-start text-signal-ink" />
    </div>
  );
}

const VIGNETTES = [
  DiscoveryVignette,
  StoreVignette,
  BuyingVignette,
  RevenueVignette,
] as const;

export default function DecisionBridge() {
  return (
    <section id="one-system" className="scroll-mt-24 bg-ground">
      <div className="mx-auto max-w-[92rem] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
        <Reveal>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-end lg:gap-16">
            <div>
              <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.14em] text-signal-ink">
                Shopping is moving from finding products to choosing products
              </p>
              <h2 className="mt-7 max-w-[18ch] text-balance font-display text-[clamp(2.3rem,3.8vw,3.9rem)] font-normal leading-[1.03] tracking-[-0.02em] text-ink-deep">
                One system for the buying decision.
              </h2>
            </div>
            <p className="max-w-[52ch] text-[16px] leading-[1.75] text-black/64">
              Beseam connects the whole journey so you can see what happened,
              understand what may explain it, act on the strongest evidence,
              and learn from what changes.
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
                  <div className="flex items-center gap-3">
                    <h3 className="text-[16px] font-semibold text-ink-deep">
                      {domain.title}
                    </h3>
                    {index < DOMAINS.length - 1 ? (
                      <ArrowRight
                        aria-hidden="true"
                        className="hidden h-3.5 w-3.5 shrink-0 text-signal-ink lg:absolute lg:-right-2 lg:top-6 lg:z-10 lg:block lg:bg-ground"
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
      </div>
    </section>
  );
}
