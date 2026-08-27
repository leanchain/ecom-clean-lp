import { Check } from "lucide-react";

import LiveAnswerCheck from "@/components/beseam/answer-check";
import { BookReviewCta } from "@/components/beseam/book-review-cta";
import CategoryBenchmarksSection from "@/components/beseam/category-benchmarks-section";
import ConnectedEvidence from "@/components/beseam/connected-evidence";
import FirstMonthPromise from "@/components/beseam/first-month-promise";
import HeroSurfaceShift from "@/components/beseam/hero-surface-shift";
import MarketsSection from "@/components/beseam/markets-section";
import OperatingLoop from "@/components/beseam/operating-loop";
import { Reveal } from "@/components/beseam/reveal";
import ShopperLoss from "@/components/beseam/shopper-loss";
import WhyBeseam from "@/components/beseam/why-beseam";

/**
 * Section order is the argument, and it is deliberate:
 *
 * problem → why us → proof we do not guess → operating model → markets →
 * how you compare → what you actually get
 *
 * Benchmarks answer “how do I compare”, so they sit after a visitor already
 * understands what Beseam does. The canonical Observe → Understand → Decide →
 * Act → Learn loop stays on the homepage, but only after a concrete trace has
 * made those words easy to understand.
 */
const SCAN_RETURNS = [
  "Where you get overlooked",
  "What makes products harder to choose",
  "What to improve first",
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
              <p className="pointer-events-auto mx-auto mt-6 max-w-[62ch] text-[17px] leading-[1.7] text-black/64 sm:text-[18px]">
                Shopping is moving from finding products to choosing products.
                See where shoppers overlook you, choose something else, or stop
                before buying — then understand what to improve and measure what
                happens next.
              </p>

              <div className="pointer-events-auto mx-auto mt-9 w-full">
                <LiveAnswerCheck
                  placement="homepage_hero"
                  handOffTo="/scan"
                  formNote={
                    <div className="mx-auto mt-2 flex flex-col items-center text-center">
                      <p className="text-[12.5px] leading-snug text-black/54">
                        Free and anonymous. Public storefront pages only.
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
      <OperatingLoop />
      <MarketsSection />
      <CategoryBenchmarksSection />
      <FirstMonthPromise />
    </div>
  );
}
