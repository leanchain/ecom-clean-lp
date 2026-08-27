import Link from "next/link";

import { ArrowRight } from "lucide-react";

import { BookReviewCta } from "@/components/beseam/book-review-cta";
import { Reveal } from "@/components/beseam/reveal";
import TrackedLink from "@/components/beseam/tracked-link";
import { APP_REGISTER_URL } from "@/lib/app-urls";

/**
 * Three ways in, in the order a visitor meets them. The anonymous public scan,
 * the self-serve product, and the first thirty days working together are
 * deliberately separate offers.
 *
 * The third column is the emphasised one. It is a commercial engagement around
 * one meaningful problem, not a trial that simply lapses. Beseam commits to the
 * investigation, supported change, and measurement — not a guaranteed lift.
 */
const ENTRY_POINTS = [
  {
    when: "Right now",
    title: "The free scan",
    body: "Enter your domain. Beseam reads your public storefront and shows where shoppers may be overlooking your products or struggling to choose.",
    rows: [
      ["Who does the work", "Nobody. Beseam reads what is already public."],
      [
        "What you get",
        "Where you get overlooked, what makes products harder to choose, and what to improve first.",
      ],
      [
        "What it costs",
        "Nothing: no account, no access to your store, nothing to install.",
      ],
    ],
    lead: false,
  },
  {
    when: "Whenever you like",
    title: "Beseam, run by your team",
    body: "Create an account and work the loop yourself: go through what Beseam found, decide what deserves action, and make the change with your own people.",
    rows: [
      ["Who does the work", "Your team, at your pace."],
      [
        "What you get",
        "Findings in order of what they are worth, with the reason attached to each one.",
      ],
      ["Suits you if", "You want your own team to operate Beseam directly."],
    ],
    lead: false,
  },
  {
    when: "Your first 30 days",
    title: "One improvement, with us",
    body: "Bring one place shoppers overlook you, choose something else, or stop before purchase. We stay in it with you from the first signal through the supported change and the measurement afterwards.",
    rows: [
      ["Who does the work", "Beseam, alongside your team and under your approval."],
      [
        "What you get",
        "The investigation, the recommendation, help making the change, and measurement of what happens afterwards.",
      ],
      [
        "Suits you if",
        "You want Beseam to work the problem end to end alongside your team.",
      ],
    ],
    lead: true,
  },
] as const;

export default function FirstMonthPromise({
  showManifestoLink = true,
}: {
  showManifestoLink?: boolean;
}) {
  void showManifestoLink;

  return (
    <section
      id="promise"
      className="scroll-mt-24 border-t border-black/14 bg-[#faf1eb]"
    >
      <div className="mx-auto max-w-[92rem] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
        <Reveal>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end lg:gap-20">
            <div>
              <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.14em] text-signal-ink">
                Your first 30 days
              </p>
              <h2 className="mt-6 max-w-[18ch] text-balance font-display text-[clamp(2.3rem,3.8vw,3.9rem)] font-normal leading-[1.03] tracking-[-0.02em] text-ink-deep">
                Your first improvement, with us.
              </h2>
            </div>

            <p className="max-w-[54ch] text-[17px] leading-[1.7] text-black/66">
              Three ways in, depending on how closely you want us involved. The
              third follows one place the buying decision breaks from evidence
              through a supported change, then measures what happens afterward.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.06}>
          <div className="mt-12 grid border-t-2 border-ink-deep lg:mt-16 lg:grid-cols-3">
            {ENTRY_POINTS.map((entry) => (
              <article
                key={entry.title}
                className={`flex flex-col border-b border-black/16 py-7 last:border-b-0 lg:border-b-0 lg:border-l lg:border-black/16 lg:px-8 lg:py-9 lg:first:border-l-0 lg:first:pl-0 lg:last:pr-0 ${
                  entry.lead ? "lg:bg-white/55" : ""
                }`}
              >
                <p
                  className={`font-mono text-[11px] font-semibold uppercase tracking-[0.12em] ${
                    entry.lead ? "text-signal-ink" : "text-black/58"
                  }`}
                >
                  {entry.when}
                </p>
                <h3 className="mt-4 max-w-[20ch] text-balance font-display text-[clamp(1.5rem,2.1vw,1.95rem)] font-normal leading-[1.12] tracking-[-0.02em] text-ink-deep">
                  {entry.title}
                </h3>
                <p className="mt-4 max-w-[46ch] text-[15px] leading-[1.7] text-black/66">
                  {entry.body}
                </p>

                <dl className="mt-6 border-t border-black/16">
                  {entry.rows.map(([term, detail]) => (
                    <div
                      key={term}
                      className="border-b border-black/12 py-3 last:border-b-0"
                    >
                      <dt className="font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-black/58">
                        {term}
                      </dt>
                      <dd className="mt-1.5 max-w-[44ch] text-[14px] leading-[1.6] text-black/72">
                        {detail}
                      </dd>
                    </div>
                  ))}
                </dl>
              </article>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mt-10 flex flex-col items-start gap-4 border-t border-black/16 pt-8 sm:flex-row sm:flex-wrap sm:items-center sm:gap-6">
            <BookReviewCta
              variant="primary"
              location="first_month_promise"
              label="Work with Beseam"
              className="min-h-12 gap-2 px-6 py-0 text-[15px] font-semibold"
            />
            <TrackedLink
              href={APP_REGISTER_URL}
              eventName="free_pilot_clicked"
              eventCategory="conversion"
              placement="first_month_promise"
              preserveUtm
              className="inline-flex min-h-12 items-center justify-center border border-black/40 bg-transparent px-6 text-[15px] font-semibold text-[#151515] transition-colors hover:border-signal-ink hover:text-signal-ink"
            >
              Start free yourself
            </TrackedLink>
            <Link
              href="/#ai-check"
              className="group inline-flex min-h-12 items-center gap-2 text-[15px] font-semibold text-ink-deep underline decoration-black/30 underline-offset-6 hover:decoration-signal-ink"
            >
              Or scan your store first
              <ArrowRight
                aria-hidden="true"
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
              />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
