import Link from "next/link";

import { ArrowRight } from "lucide-react";

import BookReviewCta from "@/components/beseam/book-review-cta";
import Reveal from "@/components/beseam/reveal";

const DESTINATIONS = [
  [
    "How Beseam works",
    "Observe, decide, act, and verify across the systems you already run.",
    "/#platform",
  ],
  [
    "Platform audits",
    "What your commerce platform emits about your products, and where it stops.",
    "/audit/shopify",
  ],
  [
    "Compare the operating model",
    "Where Beseam sits next to analytics, replay, experimentation, and attribution tools.",
    "/compare",
  ],
  [
    "The manifesto",
    "Why revenue leaks live between systems, and what we will never build.",
    "/manifesto",
  ],
] as const;

export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-4.5rem)] flex-col bg-[#f4f1e9] text-[#151515]">
      <section className="border-b border-black/18">
        <div className="mx-auto max-w-[92rem] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
          <Reveal className="grid gap-12 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:items-end lg:gap-20">
            <div>
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-[#3154ff]">
                Error 404
              </p>
              <h1 className="mt-7 max-w-[11ch] font-serif text-[clamp(3rem,5.4vw,5.4rem)] font-normal leading-[0.98] tracking-[-0.05em] text-[#111318]">
                This page is not here.
              </h1>
            </div>
            <div className="max-w-2xl self-end">
              <p className="text-[19px] leading-[1.65] text-black/68">
                The address may have changed, or the page may never have
                existed. Nothing is broken on your side.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                <BookReviewCta
                  location="not_found"
                  label="Book a 20-minute commerce review"
                  className="w-full sm:w-auto"
                />
                <Link
                  href="/"
                  className="inline-flex min-h-11 items-center justify-center gap-2 text-[14px] font-semibold text-[#151515] underline decoration-black/25 underline-offset-7 hover:decoration-[#3154ff] sm:justify-start"
                >
                  Back to the homepage{" "}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="flex-1 bg-[#ebe8df]">
        <div className="mx-auto max-w-[92rem] px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-[#3154ff]">
            Try one of these
          </p>
          <div className="mt-8 border-t border-black/22">
            {DESTINATIONS.map(([title, detail, href], index) => (
              <Link
                key={href}
                href={href}
                className="group grid gap-3 border-b border-black/18 py-6 sm:grid-cols-[3rem_18rem_minmax(0,1fr)_auto] sm:items-baseline sm:gap-6"
              >
                <span className="font-mono text-[10px] text-black/38">
                  0{index + 1}
                </span>
                <span className="text-[16px] font-semibold text-black/82">
                  {title}
                </span>
                <span className="text-[14px] leading-relaxed text-black/60">
                  {detail}
                </span>
                <ArrowRight
                  aria-hidden="true"
                  className="h-4 w-4 text-[#3154ff] transition-transform group-hover:translate-x-0.5"
                />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
