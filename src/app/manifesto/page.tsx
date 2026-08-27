import Image from "next/image";
import Link from "next/link";

import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";

import FirstMonthPromise from "@/components/beseam/first-month-promise";
import { Reveal } from "@/components/beseam/reveal";

const MANIFESTO_URL = "https://beseam.com/manifesto";
const MANIFESTO_IMAGE = "https://beseam.com/images/social/manifesto.png";
const MANIFESTO_MODIFIED = "2026-08-27";

export const metadata: Metadata = {
  title: {
    absolute: "Beseam Manifesto | Shopping is moving from finding to choosing",
  },
  description:
    "Shopping is moving from finding products to choosing products. Beseam is built to help commerce teams understand and improve the buying decisions between discovery and purchase.",
  alternates: { canonical: "/manifesto" },
  authors: [{ name: "Pankaj Kumar", url: "/about" }],
  creator: "Pankaj Kumar",
  publisher: "Beseam",
  category: "Ecommerce",
  openGraph: {
    title: "Beseam Manifesto | Shopping is moving from finding to choosing",
    description:
      "Being visible is no longer enough. Beseam is built around understanding the buying decision between being considered and being chosen.",
    url: "/manifesto",
    siteName: "Beseam",
    type: "article",
    modifiedTime: MANIFESTO_MODIFIED,
    authors: ["https://beseam.com/about"],
    section: "Company",
    tags: [
      "decision making",
      "ecommerce",
      "buying decisions",
      "conversion",
      "revenue measurement",
    ],
    images: [
      {
        url: MANIFESTO_IMAGE,
        width: 1200,
        height: 630,
        alt: "The Beseam Manifesto",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Beseam Manifesto | Shopping is moving from finding to choosing",
    description:
      "Being visible is no longer enough. The important question is whether shoppers choose you.",
    images: [MANIFESTO_IMAGE],
  },
};

const PROBLEM = [
  [
    "Finding, choosing, and buying live in different systems",
    "AI and search, onsite discovery, product pages, behavior, checkout, and revenue are usually measured separately even when they describe the same buying decision.",
  ],
  [
    "A symptom is not a cause",
    "A drop in discovery, search exits, or conversion is observable. Why it happened may still be a hypothesis until the supporting evidence is strong enough.",
  ],
  [
    "A finding is not a decision",
    "A long list of issues is not useful by itself. Teams need to know which problem or opportunity is worth acting on first and why.",
  ],
  [
    "A change is not proof",
    "Before-and-after evidence can show what moved after an action. It should not be stretched into an exact causal claim the data cannot support.",
  ],
] as const;

const PRINCIPLES = [
  {
    title: "Keep the source evidence",
    body: "A conclusion should stay connected to the observation, source, affected scope, and time that support it instead of collapsing into one opaque score.",
  },
  {
    title: "Separate evidence from inference",
    body: "A missing attribute, failed event, or changed conversion rate can be a fact. The explanation around it should remain a hypothesis until the evidence supports more.",
  },
  {
    title: "Decide what deserves attention",
    body: "Beseam should help a team decide what deserves attention now, not reward the product for producing the longest list of findings.",
  },
  {
    title: "Keep people in control",
    body: "Supported customer-facing actions stay behind the approval rules agreed for the store, with the previous state retained when the workflow supports it.",
  },
  {
    title: "Measure after the action",
    body: "Beseam compares the relevant discovery, behavior, conversion, or revenue signals before and after a change and keeps uncertainty explicit.",
  },
] as const;

const SCOPE_STANCE = [
  [
    "What we observe",
    "External discovery, onsite discovery, product and store evidence, shopper behavior, conversion, orders, and revenue when those signals are available.",
  ],
  [
    "What we act on",
    "Supported product data, content, merchandising, creative, campaigns, and store experiences that the merchant can review and control.",
  ],
  [
    "What we will not promise",
    "An exact cause when the evidence only supports a hypothesis, or a guaranteed revenue outcome from one observed before-and-after change.",
  ],
] as const;

const NEVER = [
  "Hide the supporting evidence behind one confident composite score.",
  "Present a likely cause as if it were a confirmed fact.",
  "Optimize one surface while ignoring the rest of the commerce path.",
  "Publish a material customer-facing change without the agreed approval.",
  "Call an action successful before the relevant signals have been measured again.",
  "Turn a favorable before-and-after result into a guarantee of future traffic, conversion, or revenue.",
] as const;

const NOT_FOR = [
  [
    "Stores the admin still answers",
    "If a few checks in your admin still tell you what deserves attention, buy the tool when the problem outgrows the spreadsheet. Not before.",
  ],
  [
    "Teams who want an unsupervised agent",
    "Budget and customer-facing changes stay behind a person. If you want software that spends and publishes on its own, we are the wrong choice.",
  ],
  [
    "Teams shopping for a replacement stack",
    "Your commerce platform, analytics, and ad accounts stay in place and stay authoritative. Beseam works across them or not at all.",
  ],
  [
    "Anyone who wants a revenue number in the contract",
    "We commit to the evidence, the decision, the approval path, and the measurement. Nobody honest can commit to the lift.",
  ],
] as const;

export default function ManifestoPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${MANIFESTO_URL}#article`,
        headline: "Shopping is moving from finding products to choosing products.",
        description:
          "Beseam is built to help commerce teams understand the buying decision between being considered and being chosen, while keeping each conclusion connected to its evidence.",
        image: {
          "@type": "ImageObject",
          url: MANIFESTO_IMAGE,
          width: 1200,
          height: 630,
        },
        author: { "@id": "https://beseam.com/about#pankaj-kumar" },
        publisher: { "@id": "https://beseam.com/#organization" },
        mainEntityOfPage: { "@id": MANIFESTO_URL },
        dateModified: MANIFESTO_MODIFIED,
        inLanguage: "en",
        isAccessibleForFree: true,
        keywords: [
          "decision making",
          "ecommerce",
          "buying decisions",
          "onsite commerce",
          "shopper behavior",
          "conversion",
          "revenue measurement",
        ],
        about: [
          { "@type": "Thing", name: "Buying decisions" },
          { "@type": "Thing", name: "Ecommerce" },
          { "@type": "Thing", name: "Buying decisions" },
          { "@type": "Thing", name: "Conversion optimization" },
        ],
      },
      {
        "@type": "WebPage",
        "@id": MANIFESTO_URL,
        url: MANIFESTO_URL,
        name: "Beseam Manifesto | Shopping is moving from finding to choosing",
        about: { "@id": "https://beseam.com/#organization" },
        primaryImageOfPage: { "@id": `${MANIFESTO_URL}#primaryimage` },
        dateModified: MANIFESTO_MODIFIED,
        inLanguage: "en",
      },
      {
        "@type": "ImageObject",
        "@id": `${MANIFESTO_URL}#primaryimage`,
        url: MANIFESTO_IMAGE,
        contentUrl: MANIFESTO_IMAGE,
        width: 1200,
        height: 630,
        caption: "The Beseam Manifesto",
      },
      {
        "@type": "Person",
        "@id": "https://beseam.com/about#pankaj-kumar",
        name: "Pankaj Kumar",
        url: "https://beseam.com/about",
        jobTitle: "Founder",
        worksFor: { "@id": "https://beseam.com/#organization" },
        sameAs: ["https://linkedin.com/in/pankaj4u4m"],
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${MANIFESTO_URL}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://beseam.com/",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Manifesto",
            item: MANIFESTO_URL,
          },
        ],
      },
    ],
  };

  return (
    <article className="bg-ground text-[#151515]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <section className="border-b border-black/18">
        <div className="mx-auto max-w-[92rem] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-32">
          <Reveal className="grid gap-12 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:items-end lg:gap-20">
            <div>
              <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.14em] text-signal-ink">
                The Beseam manifesto
              </p>
              <h1 className="mt-7 max-w-[18ch] font-serif text-[clamp(2.8rem,6.1vw,4.5rem)] font-normal leading-[1] tracking-[-0.02em] text-ink-deep">
                Shopping is moving from finding products to choosing products.
              </h1>
            </div>
            <div className="max-w-2xl self-end">
              <p className="text-[20px] leading-[1.65] text-black/68">
                For years, ecommerce was built around helping shoppers find
                products. AI assistants, search, recommendations, product pages,
                reviews, fit, price, and delivery increasingly do something more
                important: help shoppers decide what to buy.
              </p>
              <p className="mt-5 text-[17px] leading-[1.7] text-black/62">
                Being visible is no longer enough. The important question is
                whether the shopper has enough reason and confidence to choose
                you — and what your team can change when they do not.
              </p>
              <p className="mt-6 font-mono text-[12px] uppercase tracking-[0.1em] text-black/62">
                By Pankaj Kumar · Founder, Beseam · Updated{" "}
                <time dateTime={MANIFESTO_MODIFIED}>27 August 2026</time>
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-b border-black/18 bg-ground-2">
        <div className="mx-auto max-w-[92rem] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
          <Reveal className="grid gap-12 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-20">
            <div>
              <h2 className="max-w-[18ch] font-serif text-[clamp(2.2rem,4.4vw,3.5rem)] font-normal leading-[1.04] tracking-[-0.02em]">
                Technology should multiply the team you have.
              </h2>
            </div>
            <div>
              <p className="max-w-2xl text-[18px] leading-[1.72] text-black/68">
                You should not need the organization of a global retailer to
                operate like one. And if you are a global retailer, you should not
                need more organizational complexity to move faster.
              </p>
              <div className="mt-10 border-t border-black/22">
                {[
                  [
                    "For teams running lean",
                    "A smaller team should have access to the intelligence, automation, and operating discipline that once required specialist teams and large technology budgets.",
                  ],
                  [
                    "For large organizations",
                    "More people and systems should not mean more handoffs before a useful decision can be made. Beseam should help existing teams move with less coordination overhead.",
                  ],
                  [
                    "The same standard for both",
                    "Connect the evidence, decide with context, act with control, and learn from what changed. The operating model should scale with the business rather than define the size of business it can serve.",
                  ],
                ].map(([title, body], index) => (
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

      <section className="border-b border-black/18">
        <div className="mx-auto max-w-[92rem] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
          <Reveal className="grid gap-12 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-20">
            <div>
              <h2 className="max-w-[18ch] font-serif text-[clamp(2.2rem,4.4vw,3.5rem)] font-normal leading-[1.04] tracking-[-0.02em]">
                The useful unit is the buying decision.
              </h2>
              <p className="mt-7 max-w-md text-[16px] leading-[1.7] text-black/62">
                More capability only matters if it helps a team understand why a
                shopper considered one product, chose another, or stopped before
                purchase without hiding how that conclusion was reached.
              </p>
            </div>
            <div>
              <p className="max-w-2xl text-[17px] leading-[1.7] text-black/66">
                For every important buying decision, the questions are simple:
                what did the shopper want, which choices did they see, what
                questions remained, what did they choose or where did they stop,
                what may explain it, what could the merchant change, and what
                happened afterward. The evidence should stay attached all the
                way through.
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

      <section className="border-b border-black/18 bg-ink-deep text-white">
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
                  Founder, Beseam
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
              The important gap is between being considered and being chosen.
            </h2>
            <div className="mt-8 max-w-[68ch] space-y-6 text-[17px] leading-[1.75] text-white/72">
              <p>
                For the past year, I have worked closely with ecommerce founders
                and operators on real stores across the path from finding, to
                choosing, to buying — and the systems teams use to understand each
                part.
              </p>
              <p>
                The repeated problem was not a lack of dashboards. It was the
                weak connection between a shopper signal, the evidence affecting
                the choice, the decision a team made, and what happened after the
                action.
              </p>
              <p>
                Before Beseam, I worked on measurement, reliability, and
                large-scale data systems at Google and Amazon. The scale is
                different, but the discipline is the same. A system can look
                healthy in one view while the customer is already encountering
                failure somewhere else.
              </p>
              <p>
                That is why I am building Beseam: to keep what teams observe,
                what they understand, what they decide, what they act on, and
                what they learn connected to the evidence behind each step.
              </p>
            </div>
            <Link
              href="/about"
              className="mt-8 inline-flex items-center gap-2 text-[14px] font-semibold text-signal underline decoration-white/20 underline-offset-7 hover:decoration-signal"
            >
              More about the founder and advisors
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
                Evidence first. Approval before change. Measurement after.
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

      <section className="border-b border-black/18 bg-ground-2">
        <div className="mx-auto max-w-[92rem] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
          <Reveal className="grid gap-12 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-20">
            <div>
              <h2 className="max-w-[18ch] font-serif text-[clamp(2.2rem,4.4vw,3.5rem)] font-normal leading-[1.04] tracking-[-0.02em]">
                Do not optimize one commerce surface in isolation.
              </h2>
            </div>
            <div>
              <p className="max-w-2xl text-[17px] leading-[1.7] text-black/66">
                A product can lose ground before the visit, in onsite search, on
                the product page, at checkout, or after a change that never gets
                measured. The practical response is to connect the evidence that
                matters to the same commercial question and act on what the
                merchant can actually control.
              </p>
              <dl className="mt-10 border-t border-black/22">
                {SCOPE_STANCE.map(([term, detail]) => (
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
                connected evidence, uncertain explanations, and customer-facing
                changes.
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

      <section className="border-b border-black/18 bg-ink-deep text-white">
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
    </article>
  );
}
