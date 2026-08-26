import Link from "next/link";

import { ArrowRight } from "lucide-react";

import { Reveal } from "@/components/beseam/reveal";

const STEPS = [
  ["01", "Observe", "See what actually happened."],
  ["02", "Understand", "Check what may explain it."],
  ["03", "Decide", "Choose what deserves action."],
  ["04", "Act", "Make a supported change under your approval."],
  ["05", "Learn", "Measure what happened afterward."],
] as const;

/**
 * The canonical Beseam operating model, deliberately introduced only after the
 * visitor has already seen the merchant problem and a connected-evidence trace.
 * It is identity and method, not the elevator pitch.
 */
export default function OperatingLoop() {
  return (
    <section id="how-it-works" className="scroll-mt-24 border-t border-black/14 bg-ground">
      <div className="mx-auto max-w-[92rem] px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        <Reveal>
          <div className="grid gap-7 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-end lg:gap-16">
            <div>
              <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.14em] text-signal-ink">
                How Beseam works
              </p>
              <h2 className="mt-5 max-w-[19ch] text-balance font-display text-[clamp(2rem,3.2vw,3.2rem)] font-normal leading-[1.04] tracking-[-0.02em] text-ink-deep">
                One loop, from the first signal to what happened next.
              </h2>
            </div>
            <p className="max-w-[54ch] text-[16px] leading-[1.7] text-black/64">
              You do not need five separate tools or workflows. These five words describe the work Beseam keeps connected underneath the recommendation you see.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <ol className="mt-10 grid border-t-2 border-ink-deep sm:grid-cols-5 lg:mt-12">
            {STEPS.map(([number, title, body], index) => (
              <li
                key={title}
                className={`border-b border-black/14 py-5 sm:border-b-0 sm:px-4 sm:py-6 ${index > 0 ? "sm:border-l" : "sm:pl-0"}`}
              >
                <span className="font-mono text-[10px] font-semibold tabular-nums text-signal-ink">{number}</span>
                <h3 className="mt-2 text-[15px] font-semibold text-ink-deep">{title}</h3>
                <p className="mt-1.5 text-[13px] leading-[1.55] text-black/58">{body}</p>
              </li>
            ))}
          </ol>
        </Reveal>

        <Reveal delay={0.08}>
          <Link
            href="/platform"
            className="group mt-7 inline-flex min-h-10 items-center gap-2 text-[14px] font-semibold text-ink-deep underline decoration-black/25 underline-offset-6 hover:decoration-signal-ink"
          >
            See how the platform keeps the loop connected
            <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
