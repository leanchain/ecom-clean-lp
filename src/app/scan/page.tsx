import type { Metadata } from "next";

import LiveAnswerCheck from "@/components/beseam/answer-check";
import { BookReviewCta } from "@/components/beseam/book-review-cta";
import { buildPublicMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPublicMetadata({
  title: "See What Is Holding Your Store Back | Beseam",
  description:
    "See what’s stopping your products from being found. Observe the gaps, understand what is driving them, and decide what to change.",
  path: "/scan",
});

export default function ScanPage() {
  return (
    <section className="min-h-screen bg-[#faf1eb] text-[#111318]">
      <div className="mx-auto max-w-[92rem] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-[72rem] text-center">
          <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.14em] text-[#b8441d]">
            Start with Observe
          </p>
          <h1 className="mx-auto mt-7 max-w-[24ch] text-balance font-display text-[clamp(2.8rem,5vw,4.8rem)] font-normal leading-[1] tracking-[-0.025em]">
            What’s stopping your products from being found?
          </h1>
          <p className="mx-auto mt-7 max-w-[50ch] text-[17px] leading-[1.7] text-black/64">
            See the gaps. Then understand what is driving them and what to
            change.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-[76rem]">
          <LiveAnswerCheck placement="ai_discovery_scan" />
        </div>

        {/* The highest-intent page on the site had no way to talk to us. */}
        <div
          data-print-hide
          className="mx-auto mt-20 max-w-[76rem] bg-[#111318] px-6 py-12 text-white sm:px-10 sm:py-14"
        >
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
            <div>
              <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.1em] text-white/58">
                Owner review
              </p>
              <h2 className="mt-4 max-w-[25ch] font-display text-[clamp(1.9rem,3.2vw,3rem)] font-normal leading-[1.04] tracking-[-0.025em]">
                Turn this scan into the first three reversible fixes.
              </h2>
              <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-white/66">
                In 20 minutes we walk through the fields behind the misses, show
                what would change on the store, and agree on the questions that
                prove whether the work paid off.
              </p>
            </div>
            <BookReviewCta
              location="scan_page"
              label="Book a 20-minute store review"
              className="bg-white text-[#111318] hover:bg-[#e8653a] hover:text-white"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
