import Link from "next/link";

import { ArrowRight, Check } from "lucide-react";

import { Reveal } from "@/components/beseam/reveal";

const PRIORITY_SIGNALS = [
  "How many shoppers the problem touches",
  "How strong the supporting evidence is",
  "How practical the change is to make",
] as const;

export default function WhyBeseam() {
  return (
    <section
      id="why"
      className="scroll-mt-24 border-t border-black/14 bg-[#f5e9e2]"
    >
      <div className="mx-auto max-w-[92rem] px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        <Reveal>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-end lg:gap-16">
            <div>
              <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.14em] text-signal-ink">
                Why Beseam
              </p>
              <h2 className="mt-5 max-w-[20ch] text-balance font-display text-[clamp(2rem,3.2vw,3.2rem)] font-normal leading-[1.04] tracking-[-0.02em] text-ink-deep">
                You don&rsquo;t need another dashboard. You need to know what to do next.
              </h2>
            </div>
            <p className="max-w-[52ch] text-[16px] leading-[1.7] text-black/64">
              The buying-decision trace gives you the evidence. Beseam keeps the
              next move and the working relationship just as clear.
            </p>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-px border border-black/14 bg-black/14 lg:grid-cols-2">
          <Reveal delay={0.04}>
            <article className="h-full bg-white p-7 sm:p-8">
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.11em] text-signal-ink">
                Prioritize
              </p>
              <h3 className="mt-4 max-w-[18ch] font-display text-[clamp(1.6rem,2.4vw,2.2rem)] font-normal leading-[1.1] tracking-[-0.02em] text-ink-deep">
                A list of findings is not a plan.
              </h3>
              <p className="mt-4 max-w-[52ch] text-[15px] leading-[1.7] text-black/64">
                Beseam keeps the recommendation attached to why it matters, so
                the team can choose what deserves action instead of sorting a
                wall of alerts by hand.
              </p>
              <ul className="mt-6 border-t border-black/14">
                {PRIORITY_SIGNALS.map((signal) => (
                  <li
                    key={signal}
                    className="flex items-center gap-3 border-b border-black/12 py-3 text-[13px] text-black/66 last:border-b-0"
                  >
                    <Check className="h-3.5 w-3.5 shrink-0 text-signal-ink" aria-hidden="true" />
                    {signal}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>

          <Reveal delay={0.06}>
            <article className="h-full bg-[#fff8f4] p-7 sm:p-8">
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.11em] text-signal-ink">
                Work together
              </p>
              <h3 className="mt-4 max-w-[18ch] font-display text-[clamp(1.6rem,2.4vw,2.2rem)] font-normal leading-[1.1] tracking-[-0.02em] text-ink-deep">
                You do not have to run it alone.
              </h3>
              <p className="mt-4 max-w-[52ch] text-[15px] leading-[1.7] text-black/64">
                Use Beseam with your own team, or have us stay in the work with
                you through the investigation, decision, supported change, and
                measurement afterward.
              </p>
              <Link
                href="/how-we-work"
                className="group mt-6 inline-flex min-h-11 items-center gap-2 text-[14px] font-semibold text-ink-deep underline decoration-black/30 underline-offset-6 hover:decoration-signal-ink"
              >
                See how we work with brands
                <ArrowRight
                  aria-hidden="true"
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                />
              </Link>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
