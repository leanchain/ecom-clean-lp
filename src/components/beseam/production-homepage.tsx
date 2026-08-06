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
import GapTrackFigure from "@/components/beseam/gap-track-figure";
import { BookReviewCta } from "@/components/beseam/book-review-cta";
import { ChannelIcon } from "@/components/beseam/channel-icon";
import FirstMonthPromise from "@/components/beseam/first-month-promise";
import LeadCaptureForm from "@/components/beseam/lead-capture-form";
import { Reveal } from "@/components/beseam/reveal";
import WhyBeseam from "@/components/beseam/why-beseam";

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
    title: "Check",
    detail:
      "Beseam runs the buying questions your customers actually ask against the assistants they use, and records what each answer says about your products.",
  },
  {
    number: "02",
    title: "Diagnose",
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
    title: "Check again",
    detail:
      "The same question is run again after the change, and the result is recorded against the product, so you can see whether the answer moved.",
  },
] as const;

// The same loop as STEPS, stated as a record of what is kept per product.
// Deliberately unnumbered: the page carries exactly one 01-04 sequence.
const RECORD_STAGES = [
  ["Checked", "Record the answer and whether the product was named."],
  [
    "Diagnosed",
    "Name the product field that caused the miss, and the revenue behind it.",
  ],
  [
    "Published",
    "Write the approved change to the store, keeping the old value.",
  ],
  [
    "Checked again",
    "Re-run the same question and record whether the answer moved.",
  ],
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
        {/* Animated GIF stays a GIF on purpose: it autoplays, where a <video>
            would need an explicit press to show the loop running. */}
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
      <figcaption className="grid gap-2 border-x border-b border-black/18 bg-[#ffffff] px-4 py-3 sm:grid-cols-[9rem_1fr] sm:px-5">
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
      <section id="home-hero" className="border-b border-black/18">
        <div className="mx-auto max-w-[92rem] px-5 pb-16 pt-16 sm:px-8 sm:pb-20 sm:pt-20 lg:px-10 lg:pb-24 lg:pt-24">
          <Reveal>
            <div className="mx-auto max-w-[58rem] text-center">
              <div className="flex flex-col items-center gap-2 sm:flex-row sm:justify-center sm:gap-3">
                <span
                  className="h-2 w-2 shrink-0 bg-[#b8441d]"
                  aria-hidden="true"
                />
                <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.12em] text-black/62 sm:tracking-[0.14em]">
                  <span className="block sm:inline">Answer visibility,</span>{" "}
                  <span className="block sm:inline">
                    fixed at the product level
                  </span>
                </p>
              </div>
              <h1 className="mx-auto mt-8 max-w-[19ch] font-display text-[clamp(2.75rem,4.4vw,4.5rem)] font-normal leading-[1.02] tracking-[-0.02em] text-[#111318]">
                When a shopper asks what to buy, your product should be the
                answer.
              </h1>
              <p className="mx-auto mt-8 max-w-[64ch] text-[18px] leading-[1.65] text-black/68">
                Beseam runs those questions against ChatGPT, Copilot,
                Perplexity, and Google AI Overviews, names the product field
                that left you out, publishes the fix to your store with
                one-click revert, then checks again to confirm the answer
                changed.
              </p>

              <dl className="mx-auto mt-12 grid max-w-4xl grid-cols-1 border-y border-black/18 sm:grid-cols-3">
                {[
                  ["Check", "The assistants your buyers use"],
                  ["Fix", "Published to your store, revertible"],
                  ["Check again", "Same question, run again"],
                ].map(([term, value]) => (
                  <div
                    key={term}
                    className="border-b border-black/18 px-3 py-4 last:border-b-0 sm:border-b-0 sm:border-r sm:px-5 sm:py-5 sm:last:border-r-0"
                  >
                    <dt className="font-mono text-[12px] uppercase tracking-[0.12em] text-black/62">
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
                  className="inline-flex min-h-11 items-center gap-2 text-[15px] font-semibold text-[#151515] underline decoration-black/30 underline-offset-8 transition-colors hover:decoration-[#b8441d]"
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
        className="border-b border-black/18 bg-[#f6f6f6]"
      >
        <div className="mx-auto grid max-w-[92rem] gap-4 px-5 py-6 sm:px-8 lg:grid-cols-[16rem_1fr] lg:items-center lg:px-10">
          <p className="font-mono text-[12px] font-semibold tracking-[0.02em] text-black/62">
            Questions are asked against
          </p>
          <ul className="flex flex-wrap items-center gap-2">
            {SURFACES.map(({ label, channel }) => (
              <li
                key={label}
                className="inline-flex items-center gap-2 border border-black/16 bg-[#ffffff] px-3 py-1.5"
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

      <WhyBeseam />

      <section
        id="engine-gaps"
        className="scroll-mt-24 border-b border-black/18 bg-[#fafafa]"
      >
        <div className="mx-auto max-w-[92rem] px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-20">
            <Reveal>
              <h2 className="max-w-[16ch] font-display text-[clamp(2.25rem,3.4vw,3.5rem)] font-normal leading-[1.05] tracking-[-0.02em] text-[#111318]">
                The same product, engine by engine.
              </h2>
              <p className="mt-7 max-w-xl text-[16px] leading-[1.7] text-black/64">
                Visibility is not one number. The same catalog can win ChatGPT
                and lose Claude on the same day, for different reasons — and the
                reason decides the fix. This is a real merchant&rsquo;s window,
                exactly as the product shows it.
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <GapTrackFigure />
            </Reveal>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="scroll-mt-24 bg-[#fafafa]">
        <div className="mx-auto max-w-[92rem] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
          <Reveal className="grid gap-10 border-b border-black/22 pb-14 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-20">
            <div>
              <h2 className="max-w-[18ch] font-display text-[clamp(2.25rem,3.4vw,3.5rem)] font-normal leading-[1.05] tracking-[-0.02em] text-[#111318]">
                Check. Diagnose. Fix. Check again.
              </h2>
            </div>
            <p className="max-w-[64ch] self-end text-[17px] leading-[1.65] text-black/66">
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
                <span className="block font-display text-[clamp(2.5rem,3.2vw,3.25rem)] leading-[0.85] tracking-[-0.02em] text-[#b8441d]">
                  {step.number}
                </span>
                <h3 className="mt-6 text-[21px] font-semibold leading-snug text-[#111318]">
                  {step.title}
                </h3>
                <p className="mt-4 max-w-sm text-[14px] leading-relaxed text-black/62">
                  {step.detail}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-12 flex items-start gap-3 border-t border-black/18 pt-6 text-[13px] leading-relaxed text-black/62">
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

      <section id="answer-check" className="scroll-mt-24 bg-[#f6f6f6]">
        <div className="mx-auto max-w-[92rem] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-20">
            <Reveal>
              <h2 className="max-w-[20ch] font-display text-[clamp(2.25rem,3.4vw,3.5rem)] font-normal leading-[1.05] tracking-[-0.02em] text-[#111318]">
                From a missed answer to a published fix.
              </h2>
              <p className="mt-7 max-w-xl text-[16px] leading-[1.7] text-black/64">
                One buying question, one product, one field. The evidence, the
                proposed change, the approval, and the re-check stay attached to
                the same product record.
              </p>

              <dl className="mt-9 border-y border-black/22">
                {RECORD_STAGES.map(([term, detail]) => (
                  <div
                    key={term}
                    className="grid gap-2 border-b border-black/16 py-5 last:border-b-0 sm:grid-cols-[10rem_1fr] sm:items-start sm:gap-6"
                  >
                    <dt className="text-[14px] font-semibold text-black/78">
                      {term}
                    </dt>
                    <dd className="text-[13px] leading-relaxed text-black/62">
                      {detail}
                    </dd>
                  </div>
                ))}
              </dl>
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

      <section id="what-breaks" className="scroll-mt-24 bg-[#3d1a10]">
        <div className="mx-auto max-w-[92rem] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
          <Reveal className="grid gap-10 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-20">
            <div>
              <h2 className="max-w-[22ch] font-display text-[clamp(2.25rem,3.4vw,3.5rem)] font-normal leading-[1.05] tracking-[-0.02em] text-white">
                If AI can&rsquo;t find the answer, it names someone else.
              </h2>
            </div>
            <div className="self-end">
              <p className="max-w-[64ch] text-[17px] leading-[1.65] text-white/78">
                A product stays active in your store while disappearing from the
                places customers actually decide. The cause is usually one
                field: a missing spec, a price that disagrees with itself, a
                variant marked out of stock. Beseam names the field.
              </p>
            </div>
          </Reveal>

          <div className="mt-16 grid border-b border-t-2 border-b-white/20 border-t-[#e8653a] md:grid-cols-2 lg:grid-cols-4">
            {WHAT_BREAKS.map((item) => {
              const Icon = item.icon;
              return (
                <article
                  key={item.title}
                  className="border-b border-white/20 py-7 md:border-r md:px-6 lg:border-b-0 lg:first:pl-0 lg:last:border-r-0 lg:last:pr-0"
                >
                  <Icon
                    className="h-5 w-5 text-white/80"
                    strokeWidth={1.7}
                    aria-hidden="true"
                  />
                  <h3 className="mt-8 text-[18px] font-semibold leading-snug text-white">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-[14px] leading-relaxed text-white/72">
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
              <h2 className="max-w-[20ch] font-display text-[clamp(2.25rem,3.4vw,3.5rem)] font-normal leading-[1.05] tracking-[-0.02em]">
                Fix the products that cost you the most.
              </h2>
              <p className="mt-7 max-w-xl text-[16px] leading-[1.7] text-white/72">
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

      <section
        id="compared"
        className="scroll-mt-24 border-b border-black/18 bg-[#f6f6f6]"
      >
        <div className="mx-auto max-w-[92rem] px-5 py-20 sm:px-8 sm:py-24 lg:px-10">
          <Reveal>
            <h2 className="max-w-[20ch] font-display text-[clamp(2.25rem,3.4vw,3.5rem)] font-normal leading-[1.05] tracking-[-0.02em] text-[#111318]">
              The loop, compared.
            </h2>
            <p className="mt-6 max-w-[64ch] text-[16px] leading-[1.7] text-black/64">
              A score tells you where you stand. It does not name the field that
              cost you the answer, it does not ship the change, and it never
              checks whether the change worked.
            </p>
          </Reveal>

          <div className="mt-12">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[40rem] border-collapse text-left">
                <thead>
                  <tr className="border-b-2 border-black/30">
                    <th className="py-3 pr-4 font-mono text-[12px] font-semibold uppercase tracking-[0.12em] text-black/62">
                      Step
                    </th>
                    <th className="py-3 pr-4 text-[14px] font-semibold text-black/78">
                      Reporting tools
                    </th>
                    <th className="py-3 pr-4 text-[14px] font-semibold text-black/78">
                      An agency retainer
                    </th>
                    <th className="border-l border-black/18 py-3 pl-4 text-[14px] font-semibold text-[#111318]">
                      Beseam
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    [
                      "Check",
                      "A score, refreshed on a schedule",
                      "A quarterly audit",
                      "Continuous, per prompt, per engine",
                    ],
                    [
                      "Diagnose",
                      "To a list of cited domains",
                      "To a slide deck",
                      "To the product field behind the miss",
                    ],
                    [
                      "Fix",
                      "—",
                      "A ticket for your team",
                      "Published to your store, revertible",
                    ],
                    [
                      "Check again",
                      "—",
                      "Next quarter’s report",
                      "The same question, run again",
                    ],
                  ].map(([step, reporting, agency, beseam]) => (
                    <tr key={step} className="border-b border-black/14">
                      <td className="py-4 pr-4 font-mono text-[12px] font-semibold uppercase tracking-[0.12em] text-black/62">
                        {step}
                      </td>
                      <td className="py-4 pr-4 text-[14px] leading-relaxed text-black/62">
                        {reporting}
                      </td>
                      <td className="py-4 pr-4 text-[14px] leading-relaxed text-black/62">
                        {agency}
                      </td>
                      <td className="border-l border-black/18 py-4 pl-4 text-[14px] font-semibold leading-relaxed text-[#111318]">
                        {beseam}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <Link
              href="/resources/start-here/how-we-count"
              className="mt-8 inline-flex min-h-11 items-center gap-2 text-[14px] font-semibold text-[#151515] underline decoration-black/30 underline-offset-7 transition-colors hover:decoration-[#b8441d]"
            >
              How we count: unmeasured is never zero{" "}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <FirstMonthPromise />

      <section className="bg-[#fafafa]">
        <div className="mx-auto max-w-[92rem] px-5 pb-12 pt-20 sm:px-8 sm:pb-14 sm:pt-24 lg:px-10">
          <div className="grid gap-10 border-y border-black/24 py-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:items-center lg:gap-16 lg:py-14">
            <div>
              <h2 className="max-w-[20ch] font-display text-[clamp(2.25rem,3.4vw,3.5rem)] font-normal leading-[1.05] tracking-[-0.02em] text-[#111318]">
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
                <span className="text-[14px] text-black/62">
                  Want the publishing and monitoring loop set up on your store?
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
                The scan reads public pages only. Beseam does not publish
                customer-facing changes without the agreed store access and your
                approval.
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
