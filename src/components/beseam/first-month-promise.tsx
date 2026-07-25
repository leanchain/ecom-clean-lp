import Link from "next/link";

import { ArrowRight } from "lucide-react";

import BookReviewCta from "@/components/beseam/book-review-cta";
import Reveal from "@/components/beseam/reveal";

export default function FirstMonthPromise({
  showManifestoLink = true,
}: {
  showManifestoLink?: boolean;
}) {
  return (
    <section id="promise" className="scroll-mt-24 border-b border-black/18 bg-[#ebe8df]">
      <div className="mx-auto max-w-[92rem] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
        <Reveal className="grid gap-12 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-20">
          <div>
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-[#3154ff]">
              The first-month promise
            </p>
            <h2 className="mt-6 max-w-[11ch] font-serif text-[clamp(2.8rem,4.4vw,4.4rem)] font-normal leading-[1.02] tracking-[-0.04em] text-[#111318]">
              If we cannot find and propose a fix in 30 days, you pay nothing.
            </h2>
          </div>

          <div className="self-end">
            <p className="max-w-2xl text-[17px] leading-[1.7] text-black/66">
              During an agreed pilot, Beseam must identify at least one material revenue leak, show the evidence behind it, and propose a specific fix your team can approve or reject. If we cannot, you owe us nothing and we end the engagement.
            </p>

            <dl className="mt-10 border-y border-black/22">
              {[
                ["You receive", "An evidence-backed issue and a specific proposed fix"],
                ["You do not assume", "A long contract while we search for a useful problem"],
                ["The boundary", "We promise the diagnosis and proposal, not a guaranteed revenue result"],
                ["What we need", "The agreed store and data access available during the pilot"],
              ].map(([term, detail]) => (
                <div key={term} className="grid gap-2 border-b border-black/18 py-5 last:border-b-0 sm:grid-cols-[10rem_1fr] sm:gap-8">
                  <dt className="font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-black/46">{term}</dt>
                  <dd className="text-[14px] leading-relaxed text-black/64">{detail}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <BookReviewCta location="first_month_promise" label="Start with a 20-minute commerce review" className="w-full sm:w-auto" />
              {showManifestoLink && (
                <Link
                  href="/manifesto"
                  className="inline-flex min-h-11 items-center justify-center gap-2 text-[14px] font-semibold text-[#151515] underline decoration-black/25 underline-offset-7 hover:decoration-[#3154ff] sm:justify-start"
                >
                  Why I am building Beseam <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
