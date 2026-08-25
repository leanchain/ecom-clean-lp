import Link from "next/link";

import { ArrowRight } from "lucide-react";

import { ActionsScreen } from "@/components/beseam/app-screens";
import { Reveal } from "@/components/beseam/reveal";

/**
 * The "why not another analytics tool" answer, and the only section on the
 * page whose job is comparison rather than description.
 *
 * Two claims, each with a small specimen instead of an icon: a ranked list of
 * what to do instead of a wall of findings, and the working relationship.
 * Deliberately not a feature grid — the claims are arguments, and arguments
 * need room to be shown, not summarised.
 *
 * The “connected across all four domains” claim used to live here as a third
 * argument with a schematic of its own. It now belongs to ConnectedEvidence,
 * which proves the same thing with a real trace instead of asserting it.
 *
 * The first claim is now carried by the actions screen itself rather than by a
 * drawing of one: the argument is “you get a decision, not a wall of numbers”,
 * and the product is the strongest available evidence for it.
 */
function TeamSpecimen() {
  return (
    <div className="border border-signal-ink/40 bg-signal-ink/[0.06] px-6 py-8 sm:px-8 sm:py-10">
      <p className="max-w-[18ch] font-display text-[clamp(1.6rem,2.6vw,2.3rem)] leading-[1.12] tracking-[-0.02em] text-ink-deep">
        An extension of your commerce team.
      </p>
      <p className="mt-5 max-w-[46ch] text-[15px] leading-[1.7] text-black/68">
        Same product, same evidence. The difference is that we stay in the work
        with you — through the investigation, the decision, the change, and the
        measurement afterwards.
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
    </div>
  );
}

const CLAIMS = [
  {
    heading: "A list of findings is not a plan.",
    body: "Beseam weighs what it found against how many shoppers it touches, what it is likely worth, and how hard it is to change — then tells you what to start with and why. You are never handed a screen of numbers and asked to work it out.",
    Specimen: ActionsScreen,
  },
  {
    heading: "You do not have to run it alone.",
    body: "Plenty of teams have the evidence and no one free to act on it. Beseam can work the loop with you instead of leaving another workflow on your desk.",
    Specimen: TeamSpecimen,
  },
] as const;

export default function WhyBeseam() {
  return (
    <section
      id="why"
      className="scroll-mt-24 border-t border-black/14 bg-[#f5e9e2]"
    >
      <div className="mx-auto max-w-[92rem] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
        <Reveal>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:items-end lg:gap-16">
            <div>
              <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.14em] text-signal-ink">
                Why Beseam
              </p>
              <h2 className="mt-7 max-w-[20ch] text-balance font-display text-[clamp(2.3rem,3.8vw,3.9rem)] font-normal leading-[1.03] tracking-[-0.02em] text-ink-deep">
                You don&rsquo;t need another dashboard. You need to know what to
                do next.
              </h2>
            </div>
            <p className="max-w-[48ch] text-[17px] leading-[1.7] text-black/64">
              Two things separate Beseam from the tools already open in your
              other tabs.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 sm:mt-16 lg:mt-20">
          {CLAIMS.map(({ Specimen, ...claim }, index) => (
            <Reveal key={claim.heading} delay={0.04}>
              <article
                className={`grid gap-9 border-black/16 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-center lg:gap-14 xl:gap-20 ${
                  index > 0
                    ? "mt-14 border-t pt-14 sm:mt-16 sm:pt-16 lg:mt-20 lg:pt-20"
                    : ""
                }`}
              >
                <div>
                  <h3 className="max-w-[19ch] text-balance font-display text-[clamp(1.7rem,2.5vw,2.4rem)] font-normal leading-[1.1] tracking-[-0.02em] text-ink-deep">
                    {claim.heading}
                  </h3>
                  <p className="mt-5 max-w-[52ch] text-[16px] leading-[1.72] text-black/66">
                    {claim.body}
                  </p>
                </div>
                <div>
                  <Specimen />
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
