import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { ArrowRight } from "lucide-react";

import FirstMonthPromise from "@/components/beseam/first-month-promise";
import Reveal from "@/components/beseam/reveal";

export const metadata: Metadata = {
  title: { absolute: "The Beseam Manifesto | Revenue leaks live in the seams" },
  description:
    "Why Pankaj Kumar is building Beseam: your platform reports one number, your ad accounts another, your analytics a third—and the revenue problems that cross them belong to no one.",
  alternates: { canonical: "/manifesto" },
  openGraph: {
    title: "The Beseam Manifesto | Revenue leaks live in the seams",
    description:
      "Why Beseam exists, what an autonomous revenue agent should and should not do, and who this is not for.",
    url: "/manifesto",
    type: "article",
  },
};

const PROBLEM = [
  [
    "Three systems, three numbers",
    "Your commerce platform knows orders and catalog state. Analytics sees events. Each ad account counts its own channel. Assistants describe your brand to buyers you never see. Every one of them is right inside its own boundary.",
  ],
  [
    "No system owns the gap",
    "A broken feed, a thin product page, a wrong answer in an assistant, a campaign pointed at the wrong page, or a checkout failure can cross four tools without ever becoming one owned issue.",
  ],
  [
    "The team becomes the integration",
    "Operators reconcile exports, screenshots, and opinions, then still have to argue about which problem deserves this week.",
  ],
  [
    "Margin pays for the delay",
    "When acquisition costs more and contribution margin is thinner, a leak that survives a quarter is not an annoyance. It is the quarter.",
  ],
] as const;

const PRINCIPLES = [
  {
    title: "Observe from the outside",
    body: "A store can look healthy in every internal dashboard while discovery, product data, campaign readiness, or checkout is already failing for the customer.",
  },
  {
    title: "Attach evidence to an object",
    body: "A finding is only useful when it names the product, page, query, journey, campaign, or order it came from—and keeps them attached to the same issue.",
  },
  {
    title: "Rank by money, not by volume",
    body: "The team should see the issue most likely to cost or make revenue first, not another feed of alerts sorted by time.",
  },
  {
    title: "Propose the change, name the owner",
    body: "A diagnosis is unfinished until it says which commerce object to change, who changes it, and what approval that change requires.",
  },
  {
    title: "Recheck our own work",
    body: "After the team acts, Beseam rechecks the original signal, keeps booked fact separate from attribution and modeling, and carries the result into the next decision.",
  },
] as const;

const AI_STANCE = [
  [
    "What we watch",
    "Which questions surface your brand, what assistants claim about your products, which sources they cite, and which competitor appears in your place.",
  ],
  [
    "What we change",
    "The objects you actually control: the product record, the page, the feed, the structured data an assistant reads before it answers.",
  ],
  [
    "What we will not promise",
    "Placement inside an answer no vendor controls, or a funnel rebuilt around an interface that is still changing every quarter.",
  ],
] as const;

const NEVER = [
  "Hide stale, missing, failed, or uncertain evidence behind a confident score.",
  "Merge booked, observed, attributed, and modeled revenue into one convenient number.",
  "Spend budget or publish a material customer-facing change without a named approver.",
  "Replace the commerce, analytics, or advertising systems that remain your record.",
  "Call a recommendation finished before the original signal has been checked again.",
  "Make your own data difficult to leave with.",
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
    headline: "Revenue leaks live in the seams",
    description:
      "Why Beseam exists and what autonomous revenue intelligence for commerce should become.",
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
                Revenue leaks live in the seams.
              </h1>
            </div>
            <div className="max-w-2xl self-end">
              <p className="text-[20px] leading-[1.65] text-black/68">
                Your commerce platform reports one number. Your ad accounts
                report another. Your analytics reports a third. None of them is
                lying, and none of them can tell you which problem to fix on
                Monday.
              </p>
              <p className="mt-5 text-[17px] leading-[1.7] text-black/62">
                The expensive problems cross the storefront, catalog, customer
                journey, discovery channel, campaign, and order ledger—so they
                belong to no single tool, and usually to no single person.
              </p>
              <p className="mt-6 font-mono text-[12px] uppercase tracking-[0.1em] text-black/62">
                By Pankaj Kumar · Founder, Beseam
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-b border-black/18 bg-[#f2f2f2]">
        <div className="mx-auto max-w-[92rem] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
          <Reveal className="grid gap-12 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-20">
            <div>
              <h2 className="max-w-[18ch] font-serif text-[clamp(2.2rem,4.4vw,3.5rem)] font-normal leading-[1.04] tracking-[-0.02em]">
                Commerce teams do not need another place to look.
              </h2>
            </div>
            <div>
              <p className="max-w-2xl text-[17px] leading-[1.7] text-black/66">
                They need evidence from different systems to converge on one
                decision: what is wrong, what it is costing, what should change,
                who approves it, and whether the original signal improved
                afterward. A dashboard describes. A decision has an owner.
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
                  Founder, Beseam - Automating Revenue
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
              The gap between knowing and fixing is where revenue disappears.
            </h2>
            <div className="mt-8 max-w-[68ch] space-y-6 text-[17px] leading-[1.75] text-white/72">
              <p>
                For the past year, I have worked closely with ecommerce founders
                and operators on real stores. We traced visibility gaps, product
                and feed problems, tracking drift, campaign readiness, purchase
                friction, and the question that follows every dashboard: what
                should we do first?
              </p>
              <p>
                My first instinct was to add more monitoring. That was wrong.
                The teams I worked with were not short of signals. They were
                short of a defensible answer to what to fix first, and any proof
                that the last fix worked.
              </p>
              <p>
                Before Beseam, I worked on measurement, reliability, and
                large-scale data systems at Google and Amazon. The scale is
                different, but the discipline is the same. A system can look
                healthy in one view while the customer is already encountering
                failure somewhere else.
              </p>
              <p>
                Margins are thinner and acquisition is more expensive than when
                most of these tools were designed. That is why I am building
                Beseam: a team should be able to follow one issue from outside
                evidence to a proposed fix, an accountable owner, an approved
                change, and a verified result—without rebuilding the
                investigation every week.
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
                Autonomous where evidence is strong. Human where impact is
                material.
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

      <section className="border-b border-black/18 bg-[#f2f2f2]">
        <div className="mx-auto max-w-[92rem] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
          <Reveal className="grid gap-12 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-20">
            <div>
              <h2 className="max-w-[18ch] font-serif text-[clamp(2.2rem,4.4vw,3.5rem)] font-normal leading-[1.04] tracking-[-0.02em]">
                Let buyers find you in AI. Let them buy on your store.
              </h2>
            </div>
            <div>
              <p className="max-w-2xl text-[17px] leading-[1.7] text-black/66">
                Assistants now answer product questions before anyone reaches
                your storefront, using your product data, your pages, and
                sources you do not control. That deserves watching closely. It
                is not a reason to rebuild your funnel around an interface that
                keeps changing, or to chase every new checkout protocol. Fix the
                product data the assistant reads; keep the purchase where you
                can measure it.
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
                Most software calling itself an agent is a report with a chat
                box. These are the lines we hold, and the ones you should hold
                us to.
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
