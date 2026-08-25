import type { ReactNode } from "react";

import Link from "next/link";

import { ArrowRight } from "lucide-react";

import { Reveal } from "@/components/beseam/reveal";

/**
 * The "why not another analytics tool" answer, and the only section on the
 * page whose job is comparison rather than description.
 *
 * Three claims, each with a small specimen instead of an icon: the connected
 * path against four disconnected tools, a ranked list of what to do instead of
 * a wall of findings, and the working relationship. Deliberately not a
 * three-column feature grid — the claims are arguments, and arguments need
 * room to be shown, not summarised.
 *
 * The ranked actions are an illustration, labelled as one. No counts or shares.
 */

const DISCONNECTED = [
  "Search tool",
  "Site analytics",
  "Session replay",
  "A spreadsheet",
] as const;

const CONNECTED = [
  "Finding it",
  "Choosing it",
  "Buying it",
  "What it was worth",
] as const;

const RANKED_ACTIONS = [
  {
    rank: "Start here",
    action: "Say how the sizing runs on the hoodies that don’t say.",
    why: "It is the question most shoppers on that collection are asking, and your team can do it today.",
    lead: true,
  },
  {
    rank: "Then",
    action: "Put battery life on every earbud page.",
    why: "It is what assistants quote when they name somebody else.",
    lead: false,
  },
  {
    rank: "Later",
    action: "Show delivery cost before the address step.",
    why: "Probably the bigger win, but it needs a developer.",
    lead: false,
  },
] as const;

function SpecimenChrome({ children }: { children: ReactNode }) {
  return (
    <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-black/58">
      {children}
    </span>
  );
}

function ConnectedSpecimen() {
  return (
    <div className="border border-black/16 bg-white">
      <div className="border-b border-black/12 px-5 py-5 sm:px-6">
        <SpecimenChrome>Most tools</SpecimenChrome>
        <div className="mt-3.5 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {DISCONNECTED.map((tool) => (
            <div
              key={tool}
              className="border border-dashed border-black/25 px-2 py-3 text-center text-[11px] leading-tight text-black/60"
            >
              {tool}
            </div>
          ))}
        </div>
        <p className="mt-4 text-[13px] leading-[1.6] text-black/56">
          Four answers, none of them the whole story, and none of them talking
          to each other.
        </p>
      </div>

      <div className="px-5 py-5 sm:px-6">
        <SpecimenChrome>
          <span className="text-signal-ink">Beseam</span>
        </SpecimenChrome>
        <ol className="relative mt-5 grid grid-cols-4 gap-1.5">
          <span
            aria-hidden="true"
            className="absolute left-[12.5%] right-[12.5%] top-[5px] h-px bg-signal-ink"
          />
          {CONNECTED.map((stage) => (
            <li
              key={stage}
              className="relative flex flex-col items-center gap-3 text-center"
            >
              <span
                aria-hidden="true"
                className="h-2.5 w-2.5 rounded-full bg-signal-ink"
              />
              <span className="text-[11px] leading-tight text-ink-deep">
                {stage}
              </span>
            </li>
          ))}
        </ol>
        <p className="mt-5 text-[13px] leading-[1.6] text-black/64">
          One shopper, followed from the first question to the order — and what
          it was worth.
        </p>
      </div>
    </div>
  );
}

function RankedSpecimen() {
  return (
    <div className="border border-black/16 bg-white">
      <div className="flex items-center justify-between gap-3 border-b border-black/12 bg-ground px-4 py-2.5 sm:px-5">
        <SpecimenChrome>What to do next</SpecimenChrome>
        <span className="shrink-0 bg-black/[0.06] px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-black/58">
          Example
        </span>
      </div>
      <ol>
        {RANKED_ACTIONS.map((item) => (
          <li
            key={item.rank}
            className={`border-b border-black/12 px-4 py-4 last:border-b-0 sm:px-6 ${
              item.lead ? "bg-signal-ink/[0.06]" : ""
            }`}
          >
            <span
              className={`inline-block px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-[0.1em] ${
                item.lead
                  ? "bg-signal-ink text-white"
                  : "bg-black/[0.06] text-black/58"
              }`}
            >
              {item.rank}
            </span>
            <p
              className={`mt-2.5 leading-[1.45] ${
                item.lead
                  ? "text-[17px] font-semibold text-ink-deep"
                  : "text-[15px] text-black/72"
              }`}
            >
              {item.action}
            </p>
            <p className="mt-1.5 max-w-[46ch] text-[13px] leading-[1.6] text-black/56">
              {item.why}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}

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
    heading: "Most tools show one part of the problem.",
    body: "Search sits in one tool, the store in another, behaviour in a third, and revenue in a report nobody opens. Beseam follows the same shopper across all of it, so what you find in one place still means something in the next.",
    Specimen: ConnectedSpecimen,
  },
  {
    heading: "A list of findings is not a plan.",
    body: "Beseam weighs what it found against how many shoppers it touches, what it is likely worth, and how hard it is to change — then tells you what to start with and why. You are never handed a screen of numbers and asked to work it out.",
    Specimen: RankedSpecimen,
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
              Three things separate Beseam from the tools already open in your
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
