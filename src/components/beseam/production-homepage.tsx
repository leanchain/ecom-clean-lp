import { Check } from "lucide-react";

import LiveAnswerCheck from "@/components/beseam/answer-check";
import CategoryBenchmarksSection from "@/components/beseam/category-benchmarks-section";
import ConnectedEvidence from "@/components/beseam/connected-evidence";
import CredibilityRail from "@/components/beseam/credibility-rail";
import EvidenceToWork from "@/components/beseam/evidence-to-work";
import FirstMonthPromise from "@/components/beseam/first-month-promise";
import HeroSurfaceShift from "@/components/beseam/hero-surface-shift";
import MeasureImpact from "@/components/beseam/measure-impact";
import { Reveal } from "@/components/beseam/reveal";
import WhatBeseamDoes from "@/components/beseam/what-beseam-does";

/**
 * Section order is the argument:
 *
 * claim → credibility → signature evidence trace → breadth → proposed work →
 * truthful measurement mechanism → published research → ways to start
 *
 * The most ownable proof now arrives before the capability catalogue. The hero
 * and scan contract remain unchanged.
 */
const SCAN_RETURNS = [
  "Where shoppers may lose you",
  "What to improve first",
  "Evidence behind every finding",
] as const;

export default function ProductionHomepage() {
  return (
    <div className="bg-ground text-[#151515]">
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
              <h1 className="pointer-events-auto mx-auto max-w-[18ch] text-balance font-display text-[clamp(3rem,5.6vw,5rem)] font-normal leading-[0.98] tracking-[-0.025em] text-ink-deep">
                Get more shoppers to{" "}
                <span className="text-signal-ink">choose you</span>.
              </h1>
              <p className="pointer-events-auto mx-auto mt-6 max-w-[64ch] text-[17px] leading-[1.7] text-black/64 sm:text-[18px]">
                Beseam continuously watches AI discovery, your store, shopper
                behavior, and revenue to find what is worth improving, make
                approved changes, and measure what changed.
              </p>
              <div className="pointer-events-auto mx-auto mt-9 w-full">
                <LiveAnswerCheck
                  placement="homepage_hero"
                  handOffTo="/scan"
                  formNote={
                    <div className="mx-auto mt-2 flex flex-col items-center text-center">
                      {/* One line, read left to right, is the whole arc: what
                          it costs to begin, what kind of check it is, and what
                          it is for -- her complaint was a next step that named
                          nothing. */}
                      <p className="text-[12.5px] leading-snug text-black/54">
                        Start free &middot; SEO, GEO and technical &middot; Sell
                        more with the app
                      </p>
                      <ul className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
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
                    </div>
                  }
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <CredibilityRail />
      <CategoryBenchmarksSection />
      <ConnectedEvidence />
      <WhatBeseamDoes />
      <EvidenceToWork />
      <MeasureImpact />
      <FirstMonthPromise />
    </div>
  );
}
