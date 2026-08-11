import Image from "next/image";
import Link from "next/link";

import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";

import FirstMonthPromise from "@/components/beseam/first-month-promise";
import Reveal from "@/components/beseam/reveal";

export const metadata: Metadata = {
  title: {
    absolute: "The Beseam Manifesto | Test the answer, then test the change",
  },
  description:
    "Why Beseam is built around real buying questions, observed AI recommendations, product evidence merchants control, and the same-question re-check after a change.",
  alternates: { canonical: "/manifesto" },
  openGraph: {
    title: "The Beseam Manifesto | Test the answer, then test the change",
    description:
      "The principles behind Beseam: observe the actual answer, separate evidence from inference, change only what the merchant controls, and test again.",
    url: "/manifesto",
    type: "article",
  },
};

const PROBLEM = [
  [
    "Distribution is not the answer",
    "A product can be present in a catalog and still be absent from the answer a shopper receives. Eligibility, indexing, and recommendation are different things.",
  ],
  [
    "The answer is observable",
    "You can ask the buying question, record what the assistant said, and keep the products and competitors it named. That is more useful than starting from a generic visibility score.",
  ],
  [
    "The model is not explainable on demand",
    "No merchant tool can read a model's hidden ranking logic. The honest job is to separate the observed answer from the product evidence and hypotheses around it.",
  ],
  [
    "The merchant still controls the evidence",
    "Titles, descriptions, attributes, availability, structured data, feeds, and product pages remain changeable. Those are the levers worth testing.",
  ],
] as const;

const PRINCIPLES = [
  {
    title: "Keep the exact question",
    body: "The prompt matters. Beseam keeps the buying question with the observed answer instead of collapsing many different decisions into one score.",
  },
  {
    title: "Keep the products that won",
    body: "A miss is more useful when the competing products, merchants, citations, and exposed evidence stay attached to the same answer.",
  },
  {
    title: "Separate evidence from inference",
    body: "A missing attribute is a fact. Saying it caused a model to rank another product is a hypothesis unless the evidence supports more. Beseam keeps those categories separate.",
  },
  {
    title: "Change only what you control",
    body: "Proposed actions should point to merchant-owned product evidence and remain behind an approval boundary before anything customer-facing changes.",
  },
  {
    title: "Ask the same question again",
    body: "After a change, Beseam re-runs the original buying question and records the new answer. A changed result is evidence to compare, not a promise of future placement.",
  },
] as const;

const AI_STANCE = [
  [
    "What we test",
    "Real buying questions, the answers assistants return, the products they name, and the competitors that appear when your product does not.",
  ],
  [
    "What we change",
    "Merchant-owned product evidence: the product record, page content, structured data, feed fields, and other approved product information.",
  ],
  [
    "What we will not promise",
    "A guaranteed recommendation, a hidden-model explanation we cannot observe, or a revenue number that one changed answer cannot prove.",
  ],
] as const;

const NEVER = [
  "Hide the actual question and answer behind a confident visibility score.",
  "Present a likely cause as if we could see an assistant's hidden ranking logic.",
  "Publish a material customer-facing product change without the agreed approval.",
  "Replace Shopify or the commerce systems that remain the merchant's source of truth.",
  "Call a product-data change successful before the same buying question has been checked again.",
  "Turn one favorable re-check into a guarantee of future recommendation, traffic, or revenue.",
] as const;

const NOT_FOR = [
  [
    "Stores the admin still answers",
    "If a post-purchase survey and an afternoon in your admin still tell you what to fix, buy the tool when the problem outgrows the spreadsheet. Not before.",
  ],
  [
    "Teams who want an unsupervised agent",
    "Budget and customer-facing changes stay behind a person. If you want software that spends and publishes on its own, we are the wrong choice.",
  ],
  [
    "Teams shopping for a replacement stack",
    "Your commerce platform, analytics, and ad accounts stay in place and stay authoritative. Beseam works above them or not at all.",
  ],
  [
    "Anyone who wants a revenue number in the contract",
    "We commit to the diagnosis, the proposed fix, the approval path, and the recheck. Nobody honest can commit to the lift.",
  ],
] as const;

export default function ManifestoPage() {
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Test the answer, then test the change",
    description:
      "Why Beseam is built around observed AI product recommendations, merchant-controlled product evidence, and same-question re-checks.",
    author: { "@type": "Person", name: "Pankaj Kumar" },
    publisher: { "@type": "Organization", name: "Beseam" },
    mainEntityOfPage: "https://beseam.com/manifesto",
  };

  return (
    <div className="bg-[#fafafa] text-[#151515]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <section className="border-b border-black/18">
        <div className="mx-auto max-w-[92rem] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-32">
          <Reveal className="grid gap-12 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:items-end lg:gap-20">
            <div>
              <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.14em] text-[#b8441d]">
                The Beseam manifesto
              </p>
              <h1 className="mt-7 max-w-[18ch] font-serif text-[clamp(2.8rem,6.1vw,4.5rem)] font-normal leading-[1] tracking-[-0.02em] text-[#111318]">
                If AI recommends someone else, start with the answer.
              </h1>
            </div>
            <div className="max-w-2xl self-end">
              <p className="text-[20px] leading-[1.65] text-black/68">
                Shopify can tell you that a product is in the catalog. An AI
                assistant can still recommend another product when a shopper
                asks what to buy. Beseam starts with that observed answer.
              </p>
              <p className="mt-5 text-[17px] leading-[1.7] text-black/62">
                Keep the question, the products that were named, and the
                evidence you can actually change. Then make the approved change
                and ask the same question again.
              </p>
              <p className="mt-6 font-mono text-[12px] uppercase tracking-[0.1em] text-black/62">
                By Pankaj Kumar · Founder, Beseam
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-b border-black/18 bg-[#f6f6f6]">
        <div className="mx-auto max-w-[92rem] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
          <Reveal className="grid gap-12 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-20">
            <div>
              <h2 className="max-w-[18ch] font-serif text-[clamp(2.2rem,4.4vw,3.5rem)] font-normal leading-[1.04] tracking-[-0.02em]">
                Commerce teams do not need another AI score.
              </h2>
            </div>
            <div>
              <p className="max-w-2xl text-[17px] leading-[1.7] text-black/66">
                They need to know what happened on a buying question, which
                products won, what product evidence differs, what the merchant
                can change, and what the same question returns afterward.
              </p>
              <div className="mt-10 border-t border-black/22">
                {PROBLEM.map(([title, body], index) => (
                  <article
                    key={title}
                    className="grid gap-3 border-b border-black/18 py-6 sm:grid-cols-[3rem_13rem_1fr] sm:gap-6"
                  >
                    <span className="font-mono text-[12px] text-black/62">
                      0{index + 1}
                    </span>
                    <h3 className="text-[16px] font-semibold text-black/82">
                      {title}
                    </h3>
                    <p className="text-[14px] leading-relaxed text-black/62">
                      {body}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-b border-black/18 bg-[#111318] text-white">
        <div className="mx-auto grid max-w-[92rem] gap-14 px-5 py-20 sm:px-8 sm:py-24 lg:grid-cols-[20rem_minmax(0,1fr)] lg:items-start lg:gap-20 lg:px-10 lg:py-28">
          <Reveal>
            <figure>
              <div className="relative aspect-[4/5] overflow-hidden border border-white/18 bg-white/5">
                <Image
                  src="/images/about/pankaj-kumar.jpg"
                  alt="Pankaj Kumar, founder of Beseam"
                  fill
                  sizes="(min-width: 1024px) 20rem, 80vw"
                  className="object-cover object-center"
                  priority
                />
              </div>
              <figcaption className="border-x border-b border-white/18 px-4 py-4">
                <p className="text-[14px] font-semibold text-white">
                  Pankaj Kumar
                </p>
                <p className="mt-1 font-mono text-[12px] uppercase tracking-[0.09em] text-white/72">
                  Founder, Beseam - AI recommendation testing
                </p>
                <p className="mt-1 font-mono text-[12px] uppercase tracking-[0.09em] text-white/72">
                  Ex-Google - 10 Years
                </p>
                <p className="mt-1 font-mono text-[12px] uppercase tracking-[0.09em] text-white/72">
                  Ex-Amazon - 3 Years
                </p>
              </figcaption>
            </figure>
          </Reveal>

          <Reveal delay={0.06}>
            <h2 className="max-w-[18ch] font-serif text-[clamp(2.2rem,4.6vw,3.5rem)] font-normal leading-[1.04] tracking-[-0.02em]">
              The useful gap is between the answer you observed and the evidence
              you can change.
            </h2>
            <div className="mt-8 max-w-[68ch] space-y-6 text-[17px] leading-[1.75] text-white/72">
              <p>
                For the past year, I have worked closely with ecommerce founders
                and operators on real stores. One problem kept getting sharper:
                a merchant could have complete product data in its own admin and
                still have no clear record of what an AI assistant told a buyer.
              </p>
              <p>
                My first instinct was to turn that into another visibility
                dashboard. That was wrong. The useful unit is the buying
                question itself: the observed answer, the competing products,
                the evidence you can change, and the re-check after the change.
              </p>
              <p>
                Before Beseam, I worked on measurement, reliability, and
                large-scale data systems at Google and Amazon. The scale is
                different, but the discipline is the same. A system can look
                healthy in one view while the customer is already encountering
                failure somewhere else.
              </p>
              <p>
                That is why I am building Beseam: a team should be able to
                follow one product from a real buying question to the observed
                answer, the product evidence worth changing, the approved
                update, and a same-question re-check without pretending we
                control the model.
              </p>
            </div>
            <Link
              href="/about"
              className="mt-8 inline-flex items-center gap-2 text-[14px] font-semibold text-[#e8653a] underline decoration-white/20 underline-offset-7 hover:decoration-[#e8653a]"
            >
              More about the founder and advisors{" "}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="border-b border-black/18">
        <div className="mx-auto max-w-[92rem] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
          <Reveal className="grid gap-12 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-20">
            <div>
              <h2 className="max-w-[18ch] font-serif text-[clamp(2.2rem,4.4vw,3.5rem)] font-normal leading-[1.04] tracking-[-0.02em]">
                Evidence first. Approval before change. Same question after.
              </h2>
            </div>
            <div className="border-t border-black/22">
              {PRINCIPLES.map((principle, index) => (
                <article
                  key={principle.title}
                  className="grid gap-3 border-b border-black/18 py-6 sm:grid-cols-[3rem_13rem_1fr] sm:gap-6"
                >
                  <span className="font-mono text-[12px] text-black/62">
                    0{index + 1}
                  </span>
                  <h3 className="text-[16px] font-semibold text-black/82">
                    {principle.title}
                  </h3>
                  <p className="text-[14px] leading-relaxed text-black/62">
                    {principle.body}
                  </p>
                </article>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-b border-black/18 bg-[#f6f6f6]">
        <div className="mx-auto max-w-[92rem] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
          <Reveal className="grid gap-12 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-20">
            <div>
              <h2 className="max-w-[18ch] font-serif text-[clamp(2.2rem,4.4vw,3.5rem)] font-normal leading-[1.04] tracking-[-0.02em]">
                Do not optimize for AI in the abstract. Test the buying
                question.
              </h2>
            </div>
            <div>
              <p className="max-w-2xl text-[17px] leading-[1.7] text-black/66">
                Assistants now answer product questions before many shoppers
                reach a storefront. The practical response is not to chase every
                new AI acronym. Ask the buying question, keep the observed
                answer, compare the products that were named, and work on
                product evidence the merchant actually controls.
              </p>
              <dl className="mt-10 border-t border-black/22">
                {AI_STANCE.map(([term, detail]) => (
                  <div
                    key={term}
                    className="grid gap-2 border-b border-black/18 py-6 sm:grid-cols-[16rem_1fr] sm:gap-6"
                  >
                    <dt className="font-mono text-[12px] font-semibold uppercase tracking-[0.1em] text-black/62">
                      {term}
                    </dt>
                    <dd className="text-[14px] leading-relaxed text-black/62">
                      {detail}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-b border-black/18">
        <div className="mx-auto max-w-[92rem] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
          <Reveal className="grid gap-12 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-20">
            <div>
              <h2 className="max-w-[18ch] font-serif text-[clamp(2.2rem,4.4vw,3.5rem)] font-normal leading-[1.04] tracking-[-0.02em]">
                What Beseam should never become.
              </h2>
              <p className="mt-7 max-w-md text-[16px] leading-[1.7] text-black/62">
                These are the lines we hold when the product is dealing with
                probabilistic answers and customer-facing product changes.
              </p>
            </div>
            <ol className="border-t border-black/22">
              {NEVER.map((item, index) => (
                <li
                  key={item}
                  className="grid gap-3 border-b border-black/18 py-6 sm:grid-cols-[3rem_1fr] sm:gap-6"
                >
                  <span className="font-mono text-[12px] text-black/62">
                    0{index + 1}
                  </span>
                  <p className="text-[16px] leading-relaxed text-black/68">
                    {item}
                  </p>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      <section className="border-b border-black/18 bg-[#111318] text-white">
        <div className="mx-auto max-w-[92rem] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
          <Reveal className="grid gap-12 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-20">
            <div>
              <h2 className="max-w-[18ch] font-serif text-[clamp(2.2rem,4.4vw,3.5rem)] font-normal leading-[1.04] tracking-[-0.02em]">
                Who Beseam is not for.
              </h2>
              <p className="mt-7 max-w-md text-[16px] leading-[1.7] text-white/72">
                Saying this early costs us calls and saves you a quarter.
              </p>
            </div>
            <div className="border-t border-white/22">
              {NOT_FOR.map(([title, body], index) => (
                <article
                  key={title}
                  className="grid gap-3 border-b border-white/18 py-6 sm:grid-cols-[3rem_15rem_1fr] sm:gap-6"
                >
                  <span className="font-mono text-[12px] text-white/72">
                    0{index + 1}
                  </span>
                  <h3 className="text-[16px] font-semibold text-white/88">
                    {title}
                  </h3>
                  <p className="text-[14px] leading-relaxed text-white/72">
                    {body}
                  </p>
                </article>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <FirstMonthPromise showManifestoLink={false} />
    </div>
  );
}
