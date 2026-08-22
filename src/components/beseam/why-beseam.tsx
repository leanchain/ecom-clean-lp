import Link from "next/link";

import { ArrowRight } from "lucide-react";

import { Reveal } from "@/components/beseam/reveal";

const CONNECTED_PROBLEMS = [
  {
    signal: "Before the click",
    title: "Your product disappears from discovery.",
    detail:
      "The problem may sit in missing product facts, weak category evidence, inconsistent availability, or stronger competitor representation. Beseam brings those signals together before deciding what is worth changing.",
    evidence: "Product facts · availability · category evidence · competitors",
  },
  {
    signal: "On your store",
    title: "Shoppers cannot find the right product.",
    detail:
      "The problem may sit in catalog data, onsite ranking, merchandising, filters, recommendations, or the language shoppers use. Beseam connects the behavior to the product and store context around it.",
    evidence: "Catalog · onsite search · merchandising · behavior",
  },
  {
    signal: "At the decision",
    title: "A product gets attention but does not convert.",
    detail:
      "The problem may be missing decision evidence, unclear shipping, weak creative, trust gaps, price context, or checkout friction. Beseam helps narrow the problem before proposing a supported change.",
    evidence: "PDP evidence · creative · trust · checkout · conversion",
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
            <p className="max-w-[60ch] text-[16px] leading-[1.75] text-white/72">
              A weak result is rarely isolated. What looks like an AI visibility
              problem, a search problem, or a conversion problem can be connected
              to product data, merchandising, content, creative, behavior, or
              something further downstream.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mt-14 grid border-t border-white/24 lg:grid-cols-3">
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
                <p className="mt-5 font-mono text-[11px] leading-relaxed text-white/44">
                  {problem.evidence}
                </p>
              </article>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="mt-10 flex flex-col gap-5 border-t border-white/16 pt-8 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
            <p className="max-w-[72ch] text-[13px] leading-[1.7] text-white/52">
              Beseam grew out of seeing ecommerce teams diagnose a problem in one
              system, make a change in another, and lose the evidence in between.
              The goal is to keep the problem, the approved change, and the
              measured result connected.
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
