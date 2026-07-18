import Image from "next/image";

import { BookReviewCta } from "@/components/beseam/book-review-cta";
import { Reveal } from "@/components/beseam/reveal";

const WORKSPACE_CALLOUTS = [
  {
    number: "01",
    title: "Overall state",
    body: "Health only reads as healthy when the evidence supports it.",
  },
  {
    number: "02",
    title: "Two domains",
    body: "Discoverability and purchasing remain distinct but connected.",
  },
  {
    number: "03",
    title: "Coverage",
    body: "Stale and missing sources stay visible in the answer.",
  },
];

export default function HeroSection() {
  return (
    <section className="overflow-hidden bg-surface">
      <div className="mx-auto max-w-6xl px-6 pb-12 pt-16 md:pb-16 md:pt-24">
        <Reveal>
          <p className="editorial-eyebrow text-primary">
            Store health for Shopify
          </p>
          <h1 className="mt-5 max-w-[16ch] text-balance text-[clamp(2.75rem,6vw,5.25rem)] font-semibold leading-[0.98] tracking-[-0.035em] text-ink">
            Know when changes hurt visibility or the purchase experience.
          </h1>
          <div className="mt-7 grid gap-7 lg:grid-cols-[minmax(0,1.1fr)_minmax(18rem,0.7fr)] lg:items-end">
            <p className="editorial-body max-w-3xl text-foreground">
              Beseam brings technical discoverability, product health,
              storefront signals and monitoring coverage into one
              evidence-backed workspace. See what changed, what needs attention
              and who should fix it.
            </p>
            <p className="max-w-md text-[14px] leading-relaxed text-muted-foreground lg:justify-self-end">
              Built for Shopify teams working across SEO, content, ecommerce and
              development.
            </p>
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <BookReviewCta location="hero" className="w-full sm:w-auto" />
            <BookReviewCta
              variant="secondary"
              location="hero"
              className="w-full sm:w-auto"
            />
          </div>
        </Reveal>
      </div>

      <Reveal
        delay={0.08}
        y={20}
        className="mx-auto max-w-[88rem] px-3 pb-16 sm:px-6 md:pb-24"
      >
        <figure>
          <figcaption className="mb-3 flex items-center justify-between gap-3 px-1 text-[12px] font-medium text-muted-foreground">
            <span>Example Store Health workspace</span>
            <span className="hidden sm:inline">
              Seeded product data · no customer outcomes or revenue shown
            </span>
          </figcaption>

          <div className="bg-panel">
            <div className="relative hidden aspect-[1800/740] overflow-hidden bg-[#f8fafc] lg:block">
              <Image
                src="/images/store-health/overview-desktop.png"
                alt="Store Health overall status, trusted daily pulse and the discoverability and purchase health domains"
                fill
                priority
                sizes="(min-width: 1536px) 1408px, 96vw"
                className="object-cover object-top"
              />
            </div>

            <div className="bg-[#f8fafc] lg:hidden">
              <div className="relative aspect-[796/1220] overflow-hidden bg-[#f8fafc]">
                <Image
                  src="/images/store-health/overview-mobile.png"
                  alt="Mobile Store Health summary showing the overall status, coverage gaps and fresh purchase metrics"
                  fill
                  priority
                  sizes="94vw"
                  className="object-cover object-top"
                />
              </div>
            </div>

            <ol className="grid grid-cols-3 border border-rule bg-surface">
              {WORKSPACE_CALLOUTS.map((callout, index) => (
                <li
                  key={callout.number}
                  className={
                    "px-3 py-4 sm:px-5 sm:py-5 " +
                    (index === 0 ? "" : "border-l border-rule")
                  }
                >
                  <span className="text-[11px] font-semibold tabular-nums text-primary sm:text-[12px]">
                    {callout.number}
                  </span>
                  <p className="mt-2 text-[12px] font-semibold leading-tight text-ink sm:text-[14px]">
                    {callout.title}
                  </p>
                  <p className="mt-1 hidden text-[12px] leading-relaxed text-muted-foreground sm:block">
                    {callout.body}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </figure>
      </Reveal>
    </section>
  );
}
