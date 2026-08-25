import { Check } from "lucide-react";

import LiveAnswerCheck from "@/components/beseam/answer-check";
import { BookReviewCta } from "@/components/beseam/book-review-cta";
import CategoryBenchmarksSection from "@/components/beseam/category-benchmarks-section";
import ConnectedEvidence from "@/components/beseam/connected-evidence";
import FirstMonthPromise from "@/components/beseam/first-month-promise";
import HeroSurfaceShift from "@/components/beseam/hero-surface-shift";
import MarketsSection from "@/components/beseam/markets-section";
import { Reveal } from "@/components/beseam/reveal";
import ShopperLoss from "@/components/beseam/shopper-loss";
import WhyBeseam from "@/components/beseam/why-beseam";

/**
 * Section order is the argument, and it is deliberate:
 *
 *   problem → why us → proof we do not guess → markets → how you compare →
 *   what you actually get
 *
 * Benchmarks used to sit second. They answer “how do I compare”, which is a
 * question a visitor only has once they know what the product is, so they now
 * sit late.
 *
 * Four sections used to make the same argument. “Observe / Understand / Decide
 * / Act / Learn” asked a non-technical buyer to learn five words for something
 * ConnectedEvidence already shows happening, and WorkingModes said what the
 * last section’s columns say with deliverables attached. Both are gone: the
 * page argues each point once, in the place where it can be shown rather than
 * asserted.
 */

/** Three concrete returns, so “free scan” is not an unpriced promise. */
const SCAN_RETURNS = [
  "Where shoppers can’t find you",
  "What your product pages leave out",
  "What to change first",
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
                {/* The hero starts the scan and hands off to /scan, which is
                    built to hold a result. Rendering it here grew a ~2,000px
                    card inside a centred 80svh composition and left the scan
                    with no URL to share, reload, or come back to. */}
                <LiveAnswerCheck
                  placement="homepage_hero"
                  handOffTo="/scan"
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
      </section>

      <ShopperLoss />

      <WhyBeseam />

      <ConnectedEvidence />

      <MarketsSection />

      <CategoryBenchmarksSection />

      <FirstMonthPromise />
    </div>
  );
}
