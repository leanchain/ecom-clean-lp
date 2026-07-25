import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { ArrowRight } from "lucide-react";

import FirstMonthPromise from "@/components/beseam/first-month-promise";
import Reveal from "@/components/beseam/reveal";

export const metadata: Metadata = {
  title: { absolute: "The Beseam Manifesto | Revenue leaks live in the seams" },
  description:
    "Why Pankaj Kumar is building Beseam: commerce teams have more data than ever, but the revenue problems that cross systems still belong to no one.",
  alternates: { canonical: "/manifesto" },
  openGraph: {
    title: "The Beseam Manifesto | Revenue leaks live in the seams",
    description:
      "Why Beseam exists, what autonomous revenue intelligence should do, and the promise behind the first month.",
    url: "/manifesto",
    type: "article",
  },
};

const PRINCIPLES = [
  {
    title: "Observe from the outside",
    body: "A storefront can look healthy inside one dashboard while discovery, product data, campaign readiness, or the purchase journey quietly fails somewhere else.",
  },
  {
    title: "Connect the evidence",
    body: "The query, product, page, journey, campaign, order, owner, and verification should stay attached to the same commercial issue.",
  },
  {
    title: "Rank what matters",
    body: "The team should see the issue most likely to affect revenue first, not another unprioritized stream of alerts and charts.",
  },
  {
    title: "Propose the change",
    body: "A diagnosis is unfinished until it names the commerce object to change, the evidence, the owner, and the approval required.",
  },
  {
    title: "Learn from the result",
    body: "After the team acts, Beseam should recheck the original signal, separate fact from attribution or modeling, and improve the next decision.",
  },
] as const;

const NEVER = [
  "Hide stale, missing, failed, or uncertain evidence behind a confident score.",
  "Merge booked, observed, attributed, and modeled revenue into one convenient number.",
  "Publish spend or material customer-facing changes without explicit approval.",
  "Replace the commerce, analytics, or advertising systems that remain the source of record.",
  "Call a recommendation finished before the original signal has been checked again.",
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
    <div className="bg-[#f4f1e9] text-[#151515]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />

      <section className="border-b border-black/18">
        <div className="mx-auto max-w-[92rem] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-32">
          <Reveal className="grid gap-12 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:items-end lg:gap-20">
            <div>
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-[#3154ff]">
                The Beseam manifesto
              </p>
              <h1 className="mt-7 max-w-[10ch] font-serif text-[clamp(3.4rem,6.1vw,6.4rem)] font-normal leading-[0.96] tracking-[-0.05em] text-[#111318]">
                Revenue leaks live in the seams.
              </h1>
            </div>
            <div className="max-w-2xl self-end">
              <p className="text-[20px] leading-[1.65] text-black/68">
                Every commerce system can explain its own slice. The expensive problems are the ones that cross the storefront, catalog, customer journey, discovery channel, campaign, and order ledger—and belong to no single tool.
              </p>
              <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.1em] text-black/42">
                By Pankaj Kumar · Founder, Beseam
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-b border-black/18 bg-[#ebe8df]">
        <div className="mx-auto max-w-[92rem] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
          <Reveal className="grid gap-12 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-20">
            <div>
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-[#3154ff]">The problem</p>
              <h2 className="mt-6 max-w-[11ch] font-serif text-[clamp(2.8rem,4.4vw,4.4rem)] font-normal leading-[1.02] tracking-[-0.04em]">
                Commerce teams do not need another place to look.
              </h2>
            </div>
            <div>
              <p className="max-w-2xl text-[17px] leading-[1.7] text-black/66">
                They need evidence from different systems to converge on one decision: what is wrong, what it may be costing, what should change, who must approve it, and whether the original signal improved afterward.
              </p>
              <div className="mt-10 border-t border-black/22">
                {[
                  ["Every system sees a slice", "Commerce platforms know orders and catalog state. Analytics sees events. Advertising platforms see their own channels. AI assistants expose a new discovery surface."],
                  ["No system owns the gap", "A broken feed, weak product page, misleading AI answer, campaign mismatch, or checkout problem can cross several tools without becoming one owned issue."],
                  ["The team becomes the integration", "Operators reconcile screenshots, spreadsheets, dashboards, tickets, and opinions—then still have to decide which problem deserves attention first."],
                ].map(([title, body], index) => (
                  <article key={title} className="grid gap-3 border-b border-black/18 py-6 sm:grid-cols-[3rem_13rem_1fr] sm:gap-6">
                    <span className="font-mono text-[10px] text-black/38">0{index + 1}</span>
                    <h3 className="text-[16px] font-semibold text-black/82">{title}</h3>
                    <p className="text-[14px] leading-relaxed text-black/60">{body}</p>
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
                <p className="text-[14px] font-semibold text-white">Pankaj Kumar</p>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.09em] text-white/42">Founder, Beseam</p>
              </figcaption>
            </figure>
          </Reveal>

          <Reveal delay={0.06}>
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8ea2ff]">Why I am doing this</p>
            <h2 className="mt-6 max-w-[12ch] font-serif text-[clamp(2.9rem,4.6vw,4.7rem)] font-normal leading-[1.02] tracking-[-0.04em]">
              The gap between knowing and fixing is where revenue disappears.
            </h2>
            <div className="mt-8 max-w-3xl space-y-6 text-[17px] leading-[1.75] text-white/66">
              <p>
                For the past year, I have worked closely with ecommerce founders and operators on real stores. We traced visibility gaps, product and feed problems, tracking drift, campaign readiness, purchase friction, and the question that follows every dashboard: what should we do first?
              </p>
              <p>
                Before Beseam, I worked on measurement, reliability, and large-scale data systems at Google and Amazon. The scale is different, but the discipline is the same. A system can look healthy in one view while the customer is already encountering failure somewhere else.
              </p>
              <p>
                I am building Beseam because commerce teams deserve more than another report. They should be able to follow one issue from external evidence to a proposed fix, an accountable owner, an approved change, and a verified result.
              </p>
            </div>
            <Link href="/about" className="mt-8 inline-flex items-center gap-2 text-[14px] font-semibold text-[#8ea2ff] underline decoration-white/20 underline-offset-7 hover:decoration-[#8ea2ff]">
              More about the founder and advisors <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="border-b border-black/18">
        <div className="mx-auto max-w-[92rem] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
          <Reveal className="grid gap-12 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-20">
            <div>
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-[#3154ff]">The product thesis</p>
              <h2 className="mt-6 max-w-[10ch] font-serif text-[clamp(2.8rem,4.4vw,4.4rem)] font-normal leading-[1.02] tracking-[-0.04em]">
                Autonomous where evidence is strong. Human where impact is material.
              </h2>
            </div>
            <div className="border-t border-black/22">
              {PRINCIPLES.map((principle, index) => (
                <article key={principle.title} className="grid gap-3 border-b border-black/18 py-6 sm:grid-cols-[3rem_13rem_1fr] sm:gap-6">
                  <span className="font-mono text-[10px] text-black/38">0{index + 1}</span>
                  <h3 className="text-[16px] font-semibold text-black/82">{principle.title}</h3>
                  <p className="text-[14px] leading-relaxed text-black/60">{principle.body}</p>
                </article>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-b border-black/18 bg-[#ebe8df]">
        <div className="mx-auto max-w-[92rem] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
          <Reveal className="grid gap-12 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-20">
            <div>
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-[#3154ff]">The boundaries</p>
              <h2 className="mt-6 max-w-[10ch] font-serif text-[clamp(2.8rem,4.4vw,4.4rem)] font-normal leading-[1.02] tracking-[-0.04em]">
                What Beseam should never become.
              </h2>
            </div>
            <ol className="border-t border-black/22">
              {NEVER.map((item, index) => (
                <li key={item} className="grid gap-3 border-b border-black/18 py-6 sm:grid-cols-[3rem_1fr] sm:gap-6">
                  <span className="font-mono text-[10px] text-black/38">0{index + 1}</span>
                  <p className="text-[16px] leading-relaxed text-black/68">{item}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      <FirstMonthPromise showManifestoLink={false} />
    </div>
  );
}
