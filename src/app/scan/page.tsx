import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";

import LiveAnswerCheck from "@/components/beseam/answer-check";
import { BookReviewCta } from "@/components/beseam/book-review-cta";
import TrackedLink from "@/components/beseam/tracked-link";
import { APP_REGISTER_URL } from "@/lib/app-urls";
import { buildPublicMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPublicMetadata({
  title: "Free Store Scan | Beseam",
  description:
    "A technical discoverability read of your public storefront: what search engines and AI assistants can see in your product pages, catalog data and site signals, and what to improve first. No login, no store access. Not a keyword report.",
  path: "/scan",
});

export default function ScanPage() {
  return (
    <section className="min-h-screen bg-[#faf1eb] text-ink-deep">
      <div className="mx-auto max-w-[92rem] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-[72rem] text-center">
          <h1 className="mx-auto max-w-[22ch] text-balance font-display text-[clamp(2.8rem,5vw,4.8rem)] font-normal leading-[1] tracking-[-0.025em]">
            See what may stop shoppers from buying.
          </h1>
          {/* Name the assessment before anyone types. A merchant who arrives
              expecting keyword analysis should read what this is, and what it
              is not, here — not work it out from the findings afterwards. */}
          <p className="mx-auto mt-7 max-w-[58ch] text-[17px] leading-[1.7] text-black/64">
            Enter your domain. This is a technical discoverability read of your
            public storefront: what search engines and AI assistants can see in
            your product pages, catalog data and site signals, and what is worth
            improving first. It is not a keyword report — search demand is not
            measured here, and shopper questions come after this scan, not in
            it.
          </p>
        </div>

        {/* The promise renders above the field, not beside the headline: a cold
            visitor has to be able to answer “what will I get if I enter my URL?”
            before they type anything. The boundary line sits with it, so the
            one-off nature of the scan is known before a domain is typed rather
            than discovered at the end of it. */}
        <div className="mx-auto mt-12 max-w-[76rem]">
          <p className="mx-auto mb-5 max-w-3xl text-left text-[14.5px] font-semibold leading-[1.55] tracking-[-0.01em] text-ink-deep">
            This scan reads your store once. Beseam keeps checking, and proves
            what changed.
          </p>
          <LiveAnswerCheck placement="ai_discovery_scan" showPromise />
        </div>

        {/* Two doors, ranked. The upgrade the scan cannot give you — questions
            asked on a schedule, kept answers, a recheck — is the primary path;
            the product review stays as the assisted one. */}
        <div
          data-print-hide
          className="mx-auto mt-20 max-w-[76rem] bg-ink-deep px-6 py-12 text-white sm:px-10 sm:py-14"
        >
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
            <div>
              <h2 className="max-w-[25ch] font-display text-[clamp(1.9rem,3.2vw,3rem)] font-normal leading-[1.04] tracking-[-0.025em]">
                Questions on a schedule, and a recheck after the fix.
              </h2>
              <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-white/66">
                In Beseam you read and edit the shopper questions before any of
                them run, the answers are kept as evidence, fixes are ordered by
                what is worth doing first, and the same questions are asked
                again after a change so you can see what moved.
              </p>
              <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-white/54">
                Or bring your store to a twenty-minute review, and we will use
                one real finding to show what Beseam found, what it would
                change, and what it checks again afterward.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-stretch">
              <TrackedLink
                href={APP_REGISTER_URL}
                eventName="scan_continue_clicked"
                eventCategory="conversion"
                placement="scan_page"
                preserveUtm
                className="group inline-flex min-h-12 items-center justify-center gap-2 bg-white px-6 text-[15px] font-semibold text-ink-deep transition-colors hover:bg-signal hover:text-ink-deep"
              >
                Start ongoing checks
                <ArrowRight
                  aria-hidden="true"
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                />
              </TrackedLink>
              <BookReviewCta
                location="scan_page"
                label="See Beseam on my store"
                className="border border-white/45 bg-transparent text-white hover:bg-white hover:text-ink-deep"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
