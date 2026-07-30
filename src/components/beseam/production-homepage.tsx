import Image from "next/image";
import Link from "next/link";

import {
  ArrowRight,
  BellRing,
  Check,
  CircleAlert,
  RotateCcw,
  Search,
  ShoppingBag,
  Tags,
} from "lucide-react";

import LiveAnswerCheck from "@/components/beseam/answer-check";
import { BookReviewCta } from "@/components/beseam/book-review-cta";
import { ChannelIcon } from "@/components/beseam/channel-icon";
import FirstMonthPromise from "@/components/beseam/first-month-promise";
import LeadCaptureForm from "@/components/beseam/lead-capture-form";
import { Reveal } from "@/components/beseam/reveal";

// Every surface we probe today, in the order a merchant recognises them.
const SURFACES = [
  { label: "ChatGPT", channel: "openai_web_search_probe" },
  { label: "Google AI Mode", channel: "google_ai_mode_readiness" },
  { label: "Google Shopping", channel: "google_structured_data" },
  { label: "Gemini", channel: "gemini_grounded_probe" },
  { label: "Microsoft Copilot", channel: "copilot_consumer_observation" },
  { label: "Perplexity", channel: "perplexity_search_probe" },
  { label: "Claude", channel: "claude_web_search_probe" },
  { label: "Alexa Shopping", channel: "alexa_shopping_agent" },
  { label: "Shopify catalog", channel: "shopify_storefront_mcp" },
  { label: "Your product pages and feeds", channel: "product_pages" },
] as const;

const WHAT_BREAKS = [
  {
    title: "The answer names a competitor",
    detail:
      "A buying question that used to return your product now returns someone else's, or nothing useful.",
    icon: BellRing,
  },
  {
    title: "Your price disagrees with itself",
    detail:
      "The feed says one price, the product page says another. Channels and assistants drop the product rather than guess.",
    icon: Tags,
  },
  {
    title: "The spec buyers ask for is missing",
    detail:
      "Size, fit, material, compatibility. If the field is not in your product data, the product cannot match the question.",
    icon: Search,
  },
  {
    title: "The product left a shopping feed",
    detail:
      "Still active in your store, gone from a channel your customers use, with no notification anywhere.",
    icon: ShoppingBag,
  },
] as const;

const STEPS = [
  {
    number: "01",
    title: "Ask",
    detail:
      "Beseam runs the buying questions your customers actually ask against the assistants they use, and records what each answer says about your products.",
  },
  {
    number: "02",
    title: "Trace",
    detail:
      "Each miss is traced to the product data behind it: an absent spec, a price that disagrees with your feed, a variant out of stock. Ranked by sessions and revenue at risk, not by score.",
  },
  {
    number: "03",
    title: "Fix",
    detail:
      "Beseam proposes the exact field change. With your approval and store access, it publishes to your store and keeps a snapshot, so one click puts the old value back.",
  },
  {
    number: "04",
    title: "Verify",
    detail:
      "The same question is asked again after the change, and the result is recorded against the product, so you can see whether the answer moved.",
  },
] as const;

function EvidenceFigure({
  src,
  alt,
  label,
  caption,
  priority = false,
  className = "",
  unoptimized = false,
}: {
  src: string;
  alt: string;
  label: string;
  caption: string;
  priority?: boolean;
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
          priority={priority}
          unoptimized={unoptimized}
          sizes="(max-width: 1024px) 100vw, 58vw"
          className="object-cover object-top"
        />
      </div>
      <figcaption className="grid gap-2 border-x border-b border-black/18 bg-[#f7f5ee] px-4 py-3 sm:grid-cols-[9rem_1fr] sm:px-5">
        <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-black/58">
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
    <div className="bg-[#f4f1e9] text-[#151515]">
      <section id="home-hero" className="border-b border-black/18">
        <div className="mx-auto max-w-[92rem] px-5 pb-16 pt-16 sm:px-8 sm:pb-20 sm:pt-20 lg:px-10 lg:pb-24 lg:pt-24">
          <Reveal>
            <div className="mx-auto max-w-[58rem] text-center">
              <div className="flex items-center justify-center gap-3 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-black/55">
                <span className="h-2 w-2 bg-[#e8653a]" aria-hidden="true" />
                Answer visibility, fixed at the product level
              </div>
              <h1 className="mx-auto mt-8 max-w-[19ch] font-serif text-[clamp(3rem,5vw,5rem)] font-normal leading-[1] tracking-[-0.045em] text-[#111318]">
                When a shopper asks what to buy, your product should be the
                answer.
              </h1>
              <p className="mx-auto mt-8 max-w-2xl text-[18px] leading-[1.65] text-black/68">
                Beseam runs those questions against ChatGPT, Copilot,
                Perplexity, and Google AI Overviews, names the product field
                that left you out, publishes the fix to your store with
                one-click revert, then asks again to confirm the answer changed.
              </p>

              <dl className="mx-auto mt-12 grid max-w-4xl grid-cols-3 border-y border-black/18">
                {[
                  ["Ask", "The assistants your buyers use"],
                  ["Fix", "Published to your store, revertible"],
                  ["Verify", "Same question, asked again"],
                ].map(([term, value]) => (
                  <div
                    key={term}
                    className="border-r border-black/18 px-3 py-4 last:border-r-0 sm:px-5 sm:py-5"
                  >
                    <dt className="font-mono text-[10px] uppercase tracking-[0.12em] text-black/45">
                      {term}
                    </dt>
                    <dd className="mt-2 text-[13px] font-semibold leading-snug text-black/78 sm:text-[14px]">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>

          <Reveal delay={0.08} y={18}>
            <div className="mt-10">
              <LiveAnswerCheck placement="homepage_hero" />
              <div className="mt-6 text-center">
                <Link
                  href="#how-it-works"
                  className="inline-flex min-h-11 items-center gap-2 text-[15px] font-semibold text-[#151515] underline decoration-black/30 underline-offset-8 transition-colors hover:decoration-[#e8653a]"
                >
                  How the loop works <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section
        aria-label="Coverage"
        className="border-b border-black/18 bg-[#ebe8df]"
      >
        <div className="mx-auto grid max-w-[92rem] gap-4 px-5 py-6 sm:px-8 lg:grid-cols-[16rem_1fr] lg:items-center lg:px-10">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-black/48">
            Questions are asked against
          </p>
          <ul className="flex flex-wrap items-center gap-2">
            {SURFACES.map(({ label, channel }) => (
              <li
                key={label}
                className="inline-flex items-center gap-2 border border-black/16 bg-[#f7f5ee] px-3 py-1.5"
              >
                <ChannelIcon
                  channel={channel}
                  className="h-3.5 w-3.5 text-black/70"
                />
                <span className="text-[13px] font-semibold text-black/70">
                  {label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        id="how-it-works"
        className="scroll-mt-24 bg-[image:linear-gradient(to_bottom,#f4f1e9_0%,#f4f1e9_74%,#eeeade_100%)]"
      >
        <div className="mx-auto max-w-[92rem] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
          <Reveal className="grid gap-10 border-b border-black/22 pb-14 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-20">
            <div>
              <p className="flex items-center gap-3 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-black/58">
                <span className="h-[3px] w-6 bg-[#e8653a]" aria-hidden="true" />
                How it works
              </p>
              <h2 className="mt-6 max-w-[12ch] font-serif text-[clamp(2.7rem,4.2vw,4.2rem)] font-normal leading-[1.02] tracking-[-0.04em]">
                Ask. Trace. Fix. Ask again.
              </h2>
            </div>
            <p className="max-w-2xl self-end text-[17px] leading-[1.65] text-black/66">
              Reporting tools stop after the first step and hand you a score.
              Beseam carries the same question through to a published change and
              a re-check, so you find out whether the fix worked.
            </p>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step) => (
              <article
                key={step.number}
                className="border-b border-black/18 py-9 md:border-r md:px-7 lg:border-b-0 lg:first:pl-0 lg:last:border-r-0 lg:last:pr-0"
              >
                <span className="block font-serif text-[clamp(3rem,4vw,4.2rem)] leading-[0.85] tracking-[-0.04em] text-[#e8653a]">
                  {step.number}
                </span>
                <h3 className="mt-6 text-[21px] font-semibold leading-snug text-[#111318]">
                  {step.title}
                </h3>
                <p className="mt-4 max-w-sm text-[14px] leading-relaxed text-black/60">
                  {step.detail}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-12 flex items-start gap-3 border-t border-black/18 pt-6 text-[13px] leading-relaxed text-black/52">
            <RotateCcw
              className="mt-0.5 h-4 w-4 shrink-0 text-black/70"
              aria-hidden="true"
            />
            Nothing customer-facing is published without your access and your
            approval. Every published change keeps the previous value, so it can
            be reverted in one click.
          </div>
        </div>
      </section>

      <section
        id="answer-check"
        className="scroll-mt-24 bg-[image:linear-gradient(to_bottom,#eeeade_0%,#eeeade_72%,#e7e2d2_100%)]"
      >
        <div className="mx-auto max-w-[92rem] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-20">
            <Reveal>
              <p className="flex items-center gap-3 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-black/58">
                <span className="h-[3px] w-6 bg-[#e8653a]" aria-hidden="true" />
                One product, followed through
              </p>
              <h2 className="mt-6 max-w-[12ch] font-serif text-[clamp(2.7rem,4.2vw,4.2rem)] font-normal leading-[1.02] tracking-[-0.04em]">
                From a missed answer to a published fix.
              </h2>
              <p className="mt-7 max-w-xl text-[16px] leading-[1.7] text-black/64">
                One buying question, one product, one field. The evidence, the
                proposed change, the approval, and the re-check stay attached to
                the same product record.
              </p>

              <div className="mt-9 grid gap-0 border-y border-black/22">
                {[
                  [
                    "01",
                    "Asked",
                    "Record the answer and whether the product was named.",
                  ],
                  [
                    "02",
                    "Traced",
                    "Name the product field that caused the miss, and the revenue behind it.",
                  ],
                  [
                    "03",
                    "Published",
                    "Write the approved change to the store, keeping the old value.",
                  ],
                  [
                    "04",
                    "Asked again",
                    "Re-run the same question and record whether the answer moved.",
                  ],
                ].map(([number, title, detail]) => (
                  <div
                    key={number}
                    className="grid gap-3 border-b border-black/16 py-5 last:border-b-0 sm:grid-cols-[3rem_8rem_1fr] sm:items-start"
                  >
                    <span className="font-mono text-[10px] font-semibold text-[#c04e26]">
                      {number}
                    </span>
                    <span className="text-[14px] font-semibold text-black/78">
                      {title}
                    </span>
                    <span className="text-[13px] leading-relaxed text-black/56">
                      {detail}
                    </span>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <EvidenceFigure
                src="/images/product-live/product-workflow.gif"
                alt="A Beseam product workflow moving from evidence to a proposed change and verification"
                label="Product workflow"
                caption="The finding, proposed change, approval, and verification stay attached to one product."
                unoptimized
              />
            </Reveal>
          </div>
        </div>
      </section>

      <section
        id="what-breaks"
        className="scroll-mt-24 border-b border-black/18 bg-[image:linear-gradient(to_bottom,#e7e2d2_0%,#e7e2d2_74%,#ded8c6_100%)]"
      >
        <div className="mx-auto max-w-[92rem] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
          <Reveal className="grid gap-10 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-20">
            <div>
              <p className="flex items-center gap-3 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-black/58">
                <span className="h-[3px] w-6 bg-[#e8653a]" aria-hidden="true" />
                What actually leaves you out
              </p>
              <h2 className="mt-6 max-w-[11ch] font-serif text-[clamp(2.7rem,4.2vw,4.2rem)] font-normal leading-[1.02] tracking-[-0.04em]">
                It is almost never the writing.
              </h2>
            </div>
            <div className="self-end">
              <p className="max-w-2xl text-[17px] leading-[1.65] text-black/66">
                A product stays active in your store while disappearing from the
                places customers actually decide. The cause is usually one
                field: a missing spec, a price that disagrees with itself, a
                variant marked out of stock. Beseam names the field.
              </p>
            </div>
          </Reveal>

          <div className="mt-16 grid border-y border-black/22 md:grid-cols-2 lg:grid-cols-4">
            {WHAT_BREAKS.map((item) => {
              const Icon = item.icon;
              return (
                <article
                  key={item.title}
                  className="border-b border-black/18 py-7 md:border-r md:px-6 lg:border-b-0 lg:first:pl-0 lg:last:border-r-0 lg:last:pr-0"
                >
                  <Icon
                    className="h-5 w-5 text-black/70"
                    strokeWidth={1.7}
                    aria-hidden="true"
                  />
                  <h3 className="mt-8 text-[18px] font-semibold leading-snug text-[#111318]">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-[14px] leading-relaxed text-black/60">
                    {item.detail}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section
        id="product-record"
        className="scroll-mt-24 border-b border-black/18 bg-[#111318] text-white"
      >
        <div className="mx-auto max-w-[92rem] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
          <div className="grid gap-14 lg:grid-cols-[minmax(0,0.76fr)_minmax(0,1.24fr)] lg:items-center lg:gap-20">
            <Reveal>
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-[#e8653a]">
                Ranked by money, not by score
              </p>
              <h2 className="mt-6 max-w-[13ch] font-serif text-[clamp(2.8rem,4.4vw,4.4rem)] font-normal leading-[1.02] tracking-[-0.04em]">
                You fix the products that pay for the fix.
              </h2>
              <p className="mt-7 max-w-xl text-[16px] leading-[1.7] text-white/62">
                Beseam also runs the sessions on your storefront, so a finding
                carries the traffic and revenue behind it. The work queue is
                ordered by what the miss costs you, not by a severity label.
              </p>
              <ul className="mt-9 border-y border-white/18">
                {[
                  "Sessions, funnels, and replay on the same products",
                  "Answer history: where the product appeared before and now",
                  "Revenue at risk, kept separate from modelled numbers",
                  "Owner, proposed field change, approval, and re-check",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 border-b border-white/14 py-4 text-[14px] text-white/72 last:border-b-0"
                  >
                    <Check
                      className="mt-0.5 h-4 w-4 shrink-0 text-[#e8653a]"
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.08}>
              <EvidenceFigure
                src="/images/product-live/product-intelligence.webp"
                alt="Beseam product record showing catalog, visibility, and commercial information"
                label="Persistent product record"
                caption="Catalog details, answer evidence, sessions, and open work stay attached to the same product."
              />
            </Reveal>
          </div>
        </div>
      </section>

      <FirstMonthPromise />

      <section className="bg-[#f4f1e9]">
        <div className="mx-auto max-w-[92rem] px-5 py-20 sm:px-8 sm:py-24 lg:px-10">
          <div className="grid gap-10 border-y border-black/24 py-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:items-center lg:gap-16 lg:py-14">
            <div>
              <p className="flex items-center gap-3 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-black/58">
                <span className="h-[3px] w-6 bg-[#e8653a]" aria-hidden="true" />
                Start with your own catalog
              </p>
              <h2 className="mt-5 max-w-[20ch] font-serif text-[clamp(2.6rem,4.2vw,4.3rem)] font-normal leading-[1.02] tracking-[-0.04em] text-[#111318]">
                Find out what the assistants say about your products.
              </h2>
              <p className="mt-6 max-w-xl text-[16px] leading-[1.7] text-black/64">
                Enter your store domain. We ask the buying questions for your
                category and send you the products that were left out, with the
                field behind each miss.
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
                helpText="Free scan of your live catalog. No store access needed to see the first findings."
                storeFieldId="final-store-domain"
              />

              <div className="mt-8 flex flex-col gap-3 border-t border-black/14 pt-6 sm:flex-row sm:items-center sm:justify-between">
                <span className="text-[14px] text-black/52">
                  Want the publishing and monitoring loop set up on your store?
                </span>
                <BookReviewCta
                  location="homepage_final"
                  label="Book a 20-minute review"
                />
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-start gap-3 text-[13px] leading-relaxed text-black/52">
            <CircleAlert
              className="mt-0.5 h-4 w-4 shrink-0 text-black/70"
              aria-hidden="true"
            />
            The scan reads public pages only. Beseam does not publish
            customer-facing changes without the agreed store access and your
            approval.
          </div>
        </div>
      </section>
    </div>
  );
}
