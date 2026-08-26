import type { Metadata } from "next";

import LiveAnswerCheck from "@/components/beseam/answer-check";
import { BookReviewCta } from "@/components/beseam/book-review-cta";
import { buildPublicMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPublicMetadata({
  title: "Free Store Scan | Beseam",
  description:
    "Enter your domain and Beseam reads your public storefront: where shoppers may be getting lost, what is worth investigating, and your first suggested actions. No login, no store access.",
  path: "/scan",
});

export default function ScanPage() {
  return (
    <section className="min-h-screen bg-[#faf1eb] text-ink-deep">
      <div className="mx-auto max-w-[92rem] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-[72rem] text-center">
          <h1 className="mx-auto max-w-[22ch] text-balance font-display text-[clamp(2.8rem,5vw,4.8rem)] font-normal leading-[1] tracking-[-0.025em]">
            See where shoppers are getting lost.
          </h1>
          <p className="mx-auto mt-7 max-w-[52ch] text-[17px] leading-[1.7] text-black/64">
            Enter your domain. We read your public storefront and hand back what
            is worth looking at — in plain words, with the evidence attached.
          </p>
        </div>

        {/* The promise renders above the field, not beside the headline: a cold
            visitor has to be able to answer “what will I get if I enter my URL?”
            before they type anything. */}
        <div className="mx-auto mt-12 max-w-[76rem]">
          <LiveAnswerCheck placement="ai_discovery_scan" showPromise />
        </div>

        {/* The highest-intent page on the site has the same managed path as the
            homepage and scan result, so there is one sales CTA vocabulary. */}
        <div
          data-print-hide
          className="mx-auto mt-20 max-w-[76rem] bg-ink-deep px-6 py-12 text-white sm:px-10 sm:py-14"
        >
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
            <div>
              <h2 className="max-w-[25ch] font-display text-[clamp(1.9rem,3.2vw,3rem)] font-normal leading-[1.04] tracking-[-0.025em]">
                Not sure a scan is the right place to start?
              </h2>
              <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-white/66">
                Bring the commercial problem instead — orders flat, a category
                that never converts, products nobody finds. Twenty minutes, your
                store on screen, and an honest answer about whether we can help.
              </p>
            </div>
            <BookReviewCta
              location="scan_page"
              label="Plan my first improvement"
              className="bg-white text-ink-deep hover:bg-signal hover:text-white"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
