import Image from "next/image";

import { BookReviewCta } from "@/components/beseam/book-review-cta";
import { Reveal } from "@/components/beseam/reveal";

export default function HeroSection() {
  return (
    <section className="overflow-hidden bg-surface">
      <div className="mx-auto max-w-6xl px-6 pb-12 pt-16 md:pb-16 md:pt-24">
        <Reveal>
          <p className="editorial-eyebrow text-primary">
            Store health for Shopify
          </p>
          <h1 className="mt-5 max-w-[20ch] text-balance text-[clamp(2.75rem,6vw,5.25rem)] font-semibold leading-[0.98] tracking-[-0.035em] text-ink">
            Know when changes to your Shopify store hurt visibility or
            purchasing.
          </h1>
          <p className="editorial-body mt-7 max-w-3xl text-foreground">
            Beseam combines search, catalog, storefront and commerce signals to
            show what changed, what degraded and what your team should fix
            first.
          </p>
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
        className="mx-auto max-w-7xl px-6 pb-16 md:pb-24"
      >
        <figure>
          <figcaption className="mb-3 flex items-center justify-between gap-3 px-1 text-[13px] font-medium text-muted-foreground">
            <span>Example Store Health workspace</span>
            <span className="hidden sm:inline">
              Seeded product data · no customer outcomes or revenue shown
            </span>
          </figcaption>

          <div className="border border-rule bg-panel p-2 shadow-[0_1px_2px_rgba(23,23,27,0.04),0_16px_40px_-20px_rgba(23,23,27,0.22)] sm:p-3">
            <div className="relative hidden aspect-[1800/1141] overflow-hidden bg-[#f8fafc] lg:block">
              <Image
                src="/images/store-health/overview-desktop.png"
                alt="Store Health overall status, trusted daily pulse and the discoverability and purchase health domains"
                fill
                priority
                sizes="(min-width: 1280px) 1232px, 96vw"
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
          </div>
        </figure>
      </Reveal>
    </section>
  );
}
