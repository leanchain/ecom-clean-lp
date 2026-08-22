import Link from "next/link";

import { ArrowRight } from "lucide-react";

import { Reveal } from "@/components/beseam/reveal";

const CONNECTED_PROBLEMS = [
  {
    signal: "Before the click",
    title: "Your product disappears from discovery.",
    detail:
      "Missing product facts, availability, or stronger competitor evidence may be behind it.",
  },
  {
    signal: "On your store",
    title: "Shoppers cannot find the right product.",
    detail:
      "Catalog data, ranking, merchandising, or shopper language may be getting in the way.",
  },
  {
    signal: "At the decision",
    title: "Attention does not turn into a sale.",
    detail:
      "Trust, shipping, creative, price context, or checkout friction may be holding it back.",
  },
] as const;

const EVIDENCE_TRACE = [
  {
    label: "Shopper signal",
    value: "Search: “waterproof jacket” → “commuting”",
  },
  {
    label: "Store evidence",
    value: "Commuter-ready attributes are missing or buried.",
  },
  {
    label: "Opportunity",
    value: "Make commuter fit explicit and surface the strongest matches.",
  },
  {
    label: "Measure",
    value: "Compare search exits, product visits, and conversion.",
  },
] as const;

export default function WhyBeseam() {
  return (
    <section
      id="why"
      className="scroll-mt-24 border-b border-black/18 bg-[#111318] text-white"
    >
      <div className="mx-auto max-w-[92rem] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
        <Reveal>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-end lg:gap-16">
            <div>
              <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.14em] text-[#e8653a]">
                Connected evidence
              </p>
              <h2 className="mt-7 max-w-[16ch] font-display text-[clamp(2.25rem,3.4vw,3.5rem)] font-normal leading-[1.05] tracking-[-0.02em]">
                See what&rsquo;s behind the problem.
              </h2>
            </div>
            <p className="max-w-[50ch] text-[16px] leading-[1.75] text-white/72">
              The symptom and the thing worth changing often live in different
              parts of commerce.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.06}>
          <div className="mt-12 border border-white/18 bg-white/[0.025]">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/14 px-5 py-3 sm:px-6">
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-[#e8653a]">
                Example trace
              </p>
              <p className="text-[12px] text-white/46">Onsite discovery</p>
            </div>
            <div className="grid lg:grid-cols-4">
              {EVIDENCE_TRACE.map((item, index) => (
                <div
                  key={item.label}
                  className="relative border-b border-white/14 px-5 py-5 last:border-b-0 sm:px-6 lg:min-h-32 lg:border-b-0 lg:border-r lg:last:border-r-0"
                >
                  <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-white/46">
                    {item.label}
                  </p>
                  <p className="mt-3 max-w-[28ch] text-[15px] font-medium leading-[1.45] text-white/88">
                    {item.value}
                  </p>
                  {index < EVIDENCE_TRACE.length - 1 ? (
                    <span className="absolute -right-3 top-1/2 z-10 hidden h-6 w-6 -translate-y-1/2 items-center justify-center bg-[#111318] text-[#e8653a] lg:flex">
                      <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </span>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-12 grid border-t border-white/24 lg:grid-cols-3">
            {CONNECTED_PROBLEMS.map((problem, index) => (
              <article
                key={problem.title}
                className="border-b border-white/18 py-7 lg:border-b-0 lg:border-l lg:px-8 lg:first:border-l-0 lg:first:pl-0 lg:last:pr-0"
              >
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-[12px] text-[#e8653a]">
                    0{index + 1}
                  </span>
                  <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-white/54">
                    {problem.signal}
                  </p>
                </div>
                <h3 className="mt-5 max-w-[20ch] text-balance text-[20px] font-semibold leading-[1.25] text-white/92">
                  {problem.title}
                </h3>
                <p className="mt-4 text-[14px] leading-[1.75] text-white/68">
                  {problem.detail}
                </p>
              </article>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.14}>
          <div className="mt-10 flex flex-col gap-5 border-t border-white/16 pt-8 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
            <p className="max-w-[62ch] text-[13px] leading-[1.7] text-white/52">
              Beseam keeps the signal, evidence, action, and measured result
              connected.
            </p>
            <Link
              href="/manifesto"
              className="inline-flex min-h-10 shrink-0 items-center gap-2 text-[13px] font-semibold text-[#e8653a] underline decoration-white/20 underline-offset-6 hover:decoration-[#e8653a]"
            >
              Why I&rsquo;m building Beseam
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
