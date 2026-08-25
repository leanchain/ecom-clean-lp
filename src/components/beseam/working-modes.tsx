import Link from "next/link";

import { ArrowRight } from "lucide-react";

import { BookReviewCta } from "@/components/beseam/book-review-cta";
import { Reveal } from "@/components/beseam/reveal";

/**
 * A genuine binary, so it stays two columns — not a feature grid. The right
 * column is the emphasised one because it is the path a first-time visitor is
 * least likely to know exists.
 *
 * "Extension of your commerce team" is the sanctioned framing. Beseam is not an
 * agency and this section must never read as one: the same product powers both
 * columns, and the only variable is who does the work.
 */

const MODES = [
  {
    eyebrow: "Run it yourself",
    heading: "Your team operates Beseam.",
    body: "Work through what Beseam found, decide what deserves action, make the change, and watch what moves — all inside the product.",
    rows: [
      ["Who does the work", "Your team, at your pace."],
      [
        "What you get",
        "Findings in order of what they are worth, with the reason attached.",
      ],
      ["Suits you if", "You already have people who can make store changes."],
    ],
    lead: false,
  },
  {
    eyebrow: "Run it with us",
    heading: "We work alongside your team.",
    body: "An extension of your commerce team. Bring one commercial problem and we stay in it with you — from the first signal through the change to the measured result.",
    rows: [
      ["Who does the work", "Beseam, with your team, under your approval."],
      [
        "What you get",
        "The investigation, the recommendation, help making the change, and the proof afterwards.",
      ],
      [
        "Suits you if",
        "You have the problem and nobody free to chase it down.",
      ],
    ],
    lead: true,
  },
] as const;

export default function WorkingModes() {
  return (
    <section
      id="working-modes"
      className="scroll-mt-24 border-t border-black/14 bg-ground"
    >
      <div className="mx-auto max-w-[92rem] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
        <Reveal>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-end lg:gap-16">
            <div>
              <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.14em] text-signal-ink">
                Working with Beseam
              </p>
              <h2 className="mt-7 max-w-[20ch] text-balance font-display text-[clamp(2.3rem,3.8vw,3.9rem)] font-normal leading-[1.03] tracking-[-0.02em] text-ink-deep">
                Run it yourself, or run it with us.
              </h2>
            </div>
            <p className="max-w-[48ch] text-[17px] leading-[1.7] text-black/64">
              The same product either way. The only thing that changes is who
              does the work — and you can move between the two whenever it
              suits.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.06}>
          <div className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-2 lg:gap-14 xl:gap-20">
            {MODES.map((mode) => (
              <article
                key={mode.eyebrow}
                className={`pt-6 ${
                  mode.lead
                    ? "border-t-2 border-signal-ink"
                    : "border-t-2 border-ink-deep"
                }`}
              >
                <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-signal-ink">
                  {mode.eyebrow}
                </p>
                <h3 className="mt-4 max-w-[20ch] text-balance font-display text-[clamp(1.6rem,2.3vw,2.15rem)] font-normal leading-[1.1] tracking-[-0.02em] text-ink-deep">
                  {mode.heading}
                </h3>
                <p className="mt-4 max-w-[50ch] text-[16px] leading-[1.7] text-black/66">
                  {mode.body}
                </p>

                <dl className="mt-7 border-t border-black/16">
                  {mode.rows.map(([term, detail]) => (
                    <div
                      key={term}
                      className="grid gap-1 border-b border-black/12 py-3.5 sm:grid-cols-[9.5rem_minmax(0,1fr)] sm:gap-6"
                    >
                      <dt className="font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-black/58">
                        {term}
                      </dt>
                      <dd className="max-w-[48ch] text-[15px] leading-[1.6] text-black/72">
                        {detail}
                      </dd>
                    </div>
                  ))}
                </dl>

                <div className="mt-7">
                  {mode.lead ? (
                    <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-5">
                      <BookReviewCta
                        variant="primary"
                        location="homepage_working_modes"
                        label="Plan my first improvement"
                        className="min-h-11 gap-2 px-5 py-0 text-[14px] font-semibold"
                      />
                      <Link
                        href="/how-we-work"
                        className="group inline-flex min-h-11 items-center gap-2 text-[14px] font-semibold text-ink-deep underline decoration-black/30 underline-offset-6 hover:decoration-signal-ink"
                      >
                        How we work
                        <ArrowRight
                          aria-hidden="true"
                          className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                        />
                      </Link>
                    </div>
                  ) : (
                    <Link
                      href="/platform"
                      className="group inline-flex min-h-11 items-center gap-2 text-[14px] font-semibold text-ink-deep underline decoration-black/30 underline-offset-6 hover:decoration-signal-ink"
                    >
                      Explore the platform
                      <ArrowRight
                        aria-hidden="true"
                        className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                      />
                    </Link>
                  )}
                </div>
              </article>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
