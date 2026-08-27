import Link from "next/link";

import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";

import { BookReviewCta } from "@/components/beseam/book-review-cta";
import FirstMonthPromise from "@/components/beseam/first-month-promise";
import { Reveal } from "@/components/beseam/reveal";
import { buildPublicMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPublicMetadata({
  title: "How We Work With Ecommerce Brands | Beseam",
  description:
    "Use Beseam with your own team or have us run the loop alongside you, from evidence through a supported change and measurement afterward.",
  path: "/how-we-work",
});

const LOOP = [
  ["01", "Observe", "Start with one buying decision worth understanding and connect the evidence around it."],
  ["02", "Understand", "Investigate possible explanations without turning correlation into certainty."],
  ["03", "Decide", "Work with your team to choose what deserves action and why."],
  ["04", "Act", "Prepare and help make supported changes under your approval rules."],
  ["05", "Learn", "Measure the relevant signals afterward and carry the result into the next decision."],
] as const;

const RESPONSIBILITIES = [
  {
    yours: "Business context and priorities",
    ours: "Connect the evidence around where shoppers find, choose, and buy."
  },
  {
    yours: "Brand judgment and constraints",
    ours: "Investigate what may explain the problem and separate evidence from hypotheses.",
  },
  {
    yours: "Approval for meaningful changes",
    ours: "Recommend, prepare, and help execute supported changes where permitted.",
  },
  {
    yours: "The final commercial decision",
    ours: "Measure what happened afterward and keep the learning attached to the decision.",
  },
] as const;

export default function HowWeWorkPage() {
  return (
    <>
      <section className="border-b border-black/14 bg-ground">
        <div className="mx-auto max-w-[92rem] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
          <Reveal>
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(20rem,0.75fr)] lg:items-end lg:gap-20">
              <div>
                <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.14em] text-signal-ink">
                  How we work with brands
                </p>
                <h1 className="mt-6 max-w-[14ch] text-balance font-display text-[clamp(3rem,5.8vw,5rem)] font-normal leading-[0.98] tracking-[-0.025em] text-ink-deep">
                  An extension of your commerce team.
                </h1>
              </div>
              <div>
                <p className="max-w-[52ch] text-[18px] leading-[1.7] text-black/66">
                  Use Beseam yourself, or have us run the loop alongside your
                  team. In both cases, start with one place shoppers overlook
                  you, choose something else, or stop before purchase, then
                  follow the evidence through the change and measured result.
                </p>
                <div className="mt-7 flex flex-wrap items-center gap-4">
                  <BookReviewCta
                    variant="primary"
                    location="how_we_work_hero"
                    label="Plan my first improvement"
                  />
                  <Link
                    href="/platform"
                    className="group inline-flex min-h-12 items-center gap-2 px-1 text-[15px] font-semibold text-ink-deep underline decoration-black/25 underline-offset-6 hover:decoration-signal-ink"
                  >
                    See the platform
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-b border-white/12 bg-ink-deep text-white">
        <div className="mx-auto max-w-[92rem] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
          <Reveal>
            <div className="grid gap-10 lg:grid-cols-[minmax(14rem,0.55fr)_minmax(0,1.45fr)] lg:gap-20">
              <div>
                <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.14em] text-signal">
                  Not another dashboard to manage
                </p>
                <h2 className="mt-5 max-w-[13ch] font-display text-[clamp(2.2rem,3.8vw,3.8rem)] font-normal leading-[1.04] tracking-[-0.02em]">
                  We can run the loop with you.
                </h2>
              </div>
              <div>
                <p className="max-w-[64ch] text-[17px] leading-[1.75] text-white/68">
                  Your team can use Beseam directly, but you do not have to turn
                  every new signal into another investigation to manage. We can
                  work through the evidence with you, bring the next decision,
                  help move an approved change forward, and stay involved through
                  measurement.
                </p>
                <ol className="mt-10 grid border-t border-white/16 md:grid-cols-5">
                  {LOOP.map(([number, title, body], index) => (
                    <li
                      key={number}
                      className={`border-b border-white/14 py-6 md:border-b-0 md:px-5 ${index > 0 ? "md:border-l" : "md:pl-0"}`}
                    >
                      <span className="font-mono text-[11px] font-semibold text-signal">
                        {number}
                      </span>
                      <h3 className="mt-3 text-[17px] font-semibold text-white">
                        {title}
                      </h3>
                      <p className="mt-2 text-[13px] leading-[1.6] text-white/56">
                        {body}
                      </p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-b border-black/14 bg-white">
        <div className="mx-auto max-w-[92rem] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
          <Reveal>
            <div className="grid gap-10 lg:grid-cols-[minmax(14rem,0.5fr)_minmax(0,1.5fr)] lg:gap-20">
              <div>
                <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.14em] text-signal-ink">
                  Working relationship
                </p>
                <h2 className="mt-5 max-w-[14ch] font-display text-[clamp(2.2rem,3.6vw,3.5rem)] font-normal leading-[1.05] tracking-[-0.02em] text-ink-deep">
                  Your judgment stays in the loop.
                </h2>
              </div>
              <div className="border-t-2 border-ink-deep">
                <div className="hidden grid-cols-2 gap-8 border-b border-black/14 py-4 text-[12px] font-semibold uppercase tracking-[0.1em] text-black/42 sm:grid">
                  <span>Your team</span>
                  <span>Beseam</span>
                </div>
                {RESPONSIBILITIES.map((row) => (
                  <div
                    key={row.yours}
                    className="grid gap-3 border-b border-black/14 py-6 sm:grid-cols-2 sm:gap-8"
                  >
                    <div>
                      <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-black/38 sm:hidden">
                        Your team
                      </span>
                      <p className="mt-1 text-[15px] font-semibold text-ink-deep sm:mt-0">
                        {row.yours}
                      </p>
                    </div>
                    <div>
                      <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-black/38 sm:hidden">
                        Beseam
                      </span>
                      <p className="mt-1 text-[15px] leading-[1.6] text-black/64 sm:mt-0">
                        {row.ours}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-b border-black/14 bg-ground">
        <div className="mx-auto max-w-[92rem] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
          <Reveal>
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
              <article className="border-t-2 border-ink-deep pt-6">
                <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-signal-ink">
                  Use Beseam directly
                </p>
                <h2 className="mt-4 text-[25px] font-semibold tracking-[-0.02em] text-ink-deep">
                  Your team operates the platform.
                </h2>
                <p className="mt-4 max-w-[52ch] text-[15px] leading-[1.7] text-black/62">
                  Investigate evidence, make decisions, approve supported actions,
                  and measure the result inside Beseam.
                </p>
                <Link
                  href="/platform"
                  className="mt-6 inline-flex min-h-10 items-center gap-2 text-[14px] font-semibold text-ink-deep underline decoration-black/25 underline-offset-6 hover:decoration-signal-ink"
                >
                  Explore the platform
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </article>

              <article className="border-t-2 border-signal-ink pt-6">
                <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-signal-ink">
                  Work the loop with us
                </p>
                <h2 className="mt-4 text-[25px] font-semibold tracking-[-0.02em] text-ink-deep">
                  We operate alongside your team.
                </h2>
                <p className="mt-4 max-w-[52ch] text-[15px] leading-[1.7] text-black/62">
                  The same product powers the work. The difference is that Beseam
                  stays involved in the investigation, decision, supported change,
                  and measurement instead of leaving the workflow with you.
                </p>
                <div className="mt-6">
                  <BookReviewCta
                    variant="primary"
                    location="how_we_work_modes"
                    label="Plan my first improvement"
                    className="min-h-10 px-5 py-0 text-[14px]"
                  />
                </div>
              </article>
            </div>
          </Reveal>
        </div>
      </section>

      <FirstMonthPromise />
    </>
  );
}
