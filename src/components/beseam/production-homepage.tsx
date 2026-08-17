import Image from "next/image";
import Link from "next/link";

import { ArrowRight, CircleAlert } from "lucide-react";

import LiveAnswerCheck from "@/components/beseam/answer-check";
import { BookReviewCta } from "@/components/beseam/book-review-cta";
import FirstMonthPromise from "@/components/beseam/first-month-promise";
import GapTrackFigure from "@/components/beseam/gap-track-figure";
import LeadCaptureForm from "@/components/beseam/lead-capture-form";
import { Reveal } from "@/components/beseam/reveal";

const STEPS = [
  {
    title: "Check",
    detail:
      "Run the buying question against the configured AI surface. Keep the observed answer, products named, and how the answer was obtained.",
  },
  {
    title: "Understand",
    detail:
      "See who appeared instead and compare the product, page, source, and storefront evidence you can actually verify.",
  },
  {
    title: "Fix",
    detail:
      "Review the supported change, approve it, and keep the previous value so a customer-facing update can be reverted safely.",
  },
  {
    title: "Check again",
    detail:
      "Run the same buying question after the change and compare the new observed answer with the old one instead of guessing whether it worked.",
  },
] as const;

function EvidenceFigure({
  src,
  alt,
  label,
  caption,
  className = "",
  unoptimized = false,
}: {
  src: string;
  alt: string;
  label: string;
  caption: string;
  className?: string;
  unoptimized?: boolean;
}) {
  return (
    <figure className={className}>
      <div className="relative aspect-[16/10] overflow-hidden border border-black/18 bg-white">
        <Image
          src={src}
          alt={alt}
          fill
          unoptimized={unoptimized}
          sizes="(max-width: 1024px) 100vw, 58vw"
          className="object-cover object-top"
        />
      </div>
      <figcaption className="grid gap-2 border-x border-b border-black/18 bg-white px-4 py-3 sm:grid-cols-[9rem_1fr] sm:px-5">
        <span className="font-mono text-[12px] font-semibold uppercase tracking-[0.12em] text-black/62">
          {label}
        </span>
        <span className="text-[13px] leading-relaxed text-black/62">
          {caption}
        </span>
      </figcaption>
    </figure>
  );
}

export default function ProductionHomepage() {
  return (
    <div className="bg-[#fafafa] text-[#151515]">
      <section id="home-hero">
        <div className="mx-auto max-w-[92rem] px-5 pb-20 pt-20 sm:px-8 sm:pb-24 sm:pt-28 lg:px-10 lg:pb-28 lg:pt-32">
          <Reveal>
            <div className="mx-auto max-w-[62rem] text-center">
              <h1 className="mx-auto max-w-[20ch] text-balance font-display text-[clamp(3rem,5.2vw,5.25rem)] font-normal leading-[0.98] tracking-[-0.025em] text-[#111318]">
                Be the Product AI Recommends.
              </h1>
              <p className="mx-auto mt-8 max-w-[62ch] text-[18px] leading-[1.65] text-black/68 sm:text-[19px]">
                Millions of shoppers ask ChatGPT, Gemini, and Perplexity
                before they buy — make sure it’s your product they hear about.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.08} y={18}>
            <div className="mx-auto mt-12 max-w-[76rem]">
              <LiveAnswerCheck placement="homepage_hero" />
              <div className="mt-6 text-center">
                <Link
                  href="#proof"
                  className="inline-flex min-h-11 items-center gap-2 text-[15px] font-semibold text-[#151515] underline decoration-black/30 underline-offset-8 transition-colors hover:decoration-[#b8441d]"
                >
                  See what happens after the check
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="proof" className="scroll-mt-24 bg-[#f6f6f6]">
        <div className="mx-auto max-w-[92rem] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:items-start lg:gap-20">
            <Reveal>
              <h2 className="max-w-[15ch] text-balance font-display text-[clamp(2.4rem,3.8vw,4rem)] font-normal leading-[1.02] tracking-[-0.02em] text-[#111318]">
                One question. One change. Test it again.
              </h2>
              <p className="mt-7 max-w-xl text-[16px] leading-[1.7] text-black/64">
                The useful part is not knowing that you are “visible.” It is
                knowing what happened on a specific question and what you can do
                next.
              </p>

              <div className="mt-10 border-t border-black/14">
                {STEPS.map((step, index) => (
                  <article
                    key={step.title}
                    className="grid gap-3 border-b border-black/14 py-5 sm:grid-cols-[2.75rem_9rem_1fr] sm:gap-5"
                  >
                    <span className="font-mono text-[12px] font-semibold text-[#b8441d]">
                      0{index + 1}
                    </span>
                    <h3 className="text-[14px] font-semibold text-black/82">
                      {step.title}
                    </h3>
                    <p className="text-[13px] leading-relaxed text-black/62">
                      {step.detail}
                    </p>
                  </article>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <EvidenceFigure
                src="/images/product-live/product-workflow.gif"
                alt="A Beseam product workflow moving from answer evidence to a proposed product change and re-check"
                label="Product workflow"
                caption="The answer, proposed change, approval, previous value, and re-check stay attached to the same product."
                unoptimized
              />
            </Reveal>
          </div>
        </div>
      </section>

      <section id="engine-gaps" className="scroll-mt-24 bg-white">
        <div className="mx-auto max-w-[92rem] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:items-center lg:gap-20">
            <Reveal>
              <h2 className="max-w-[16ch] text-balance font-display text-[clamp(2.4rem,3.8vw,4rem)] font-normal leading-[1.02] tracking-[-0.02em] text-[#111318]">
                Same question. Different answers.
              </h2>
              <p className="mt-7 max-w-xl text-[16px] leading-[1.7] text-black/64">
                A product can appear in one assistant and disappear in another.
                Beseam keeps each answer separate so you can see where the
                product actually lost, instead of hiding the difference inside
                one score.
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <GapTrackFigure />
            </Reveal>
          </div>
        </div>
      </section>

      <FirstMonthPromise />

      <section id="start" className="scroll-mt-24 bg-white">
        <div className="mx-auto max-w-[92rem] px-5 py-20 sm:px-8 lg:px-10 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.76fr)_minmax(0,1.24fr)] lg:items-center lg:gap-16">
            <div>
              <h2 className="max-w-[18ch] text-balance font-display text-[clamp(2.25rem,3.4vw,3.5rem)] font-normal leading-[1.05] tracking-[-0.02em] text-[#111318]">
                See the answers your products are getting now.
              </h2>
              <p className="mt-6 max-w-xl text-[16px] leading-[1.7] text-black/64">
                Enter your store domain. We scan the live catalog and show the
                first product-level findings we can support with evidence.
              </p>
            </div>

            <div>
              <LeadCaptureForm
                mode="store-domain"
                source="ai_visibility_scan"
                placement="homepage_final"
                storeLabel="Store domain"
                storePlaceholder="yourstore.myshopify.com"
                buttonLabel="Scan my store free"
                helpText="Free scan of your live catalog. No store access needed for the first findings."
                storeFieldId="final-store-domain"
              />

              <div className="mt-8 flex flex-col gap-3 border-t border-black/14 pt-6 sm:flex-row sm:items-center sm:justify-between">
                <span className="text-[14px] text-black/62">
                  Want to look at the findings together?
                </span>
                <BookReviewCta
                  location="homepage_final"
                  label="Book a 20-minute review"
                />
              </div>

              <div className="mt-5 flex items-start gap-3 text-[13px] leading-relaxed text-black/62">
                <CircleAlert
                  className="mt-0.5 h-4 w-4 shrink-0 text-black/70"
                  aria-hidden="true"
                />
                The free scan reads public pages only. Store access is only
                needed if you choose to publish an approved change.
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
