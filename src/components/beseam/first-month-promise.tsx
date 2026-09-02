import {
  ArrowRight,
  CheckCircle2,
  Radar,
  RefreshCw,
  Store,
  WandSparkles,
} from "lucide-react";

import { BookReviewCta } from "@/components/beseam/book-review-cta";
import { Reveal } from "@/components/beseam/reveal";
import TrackedLink from "@/components/beseam/tracked-link";

const SCAN_STEPS = ["AI discovery", "Product pages", "Store issues"] as const;
const GROWTH_STEPS = [
  { label: "Find", Icon: Radar },
  { label: "Prepare", Icon: WandSparkles },
  { label: "Approve", Icon: CheckCircle2 },
  { label: "Apply", Icon: Store },
  { label: "Measure", Icon: RefreshCw },
] as const;

export default function FirstMonthPromise({
  showManifestoLink = true,
}: {
  showManifestoLink?: boolean;
}) {
  void showManifestoLink;

  return (
    <section id="promise" className="scroll-mt-24 bg-[#faf1eb]">
      <div className="mx-auto max-w-[92rem] px-5 py-16 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
        <Reveal>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:items-end lg:gap-16">
            <div>
              <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.14em] text-signal-ink">
                30 days free
              </p>
              <h2 className="mt-6 max-w-[15ch] text-balance font-display text-[clamp(2.3rem,3.8vw,3.9rem)] font-normal leading-[1.03] tracking-[-0.02em] text-ink-deep">
                Start free. Pay when Beseam proves its value.
              </h2>
            </div>
            <p className="max-w-[46ch] text-[15.5px] leading-[1.7] text-black/62">
              Use Beseam free for 30 days. See what it finds, approve the changes
              that need your judgment, watch them get applied, and see what moved
              before you pay.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.06}>
          <div className="mt-12 grid border-y-2 border-ink-deep lg:mt-16 lg:grid-cols-2">
            <article className="py-8 lg:pr-12 lg:py-10">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center bg-white text-signal-ink ring-1 ring-black/12">
                  <Radar className="h-4 w-4" aria-hidden="true" />
                </span>
                <div>
                  <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-black/48">
                    01 · Free scan
                  </p>
                  <p className="mt-0.5 text-[14px] font-semibold text-ink-deep">
                    See where shoppers may lose you
                  </p>
                </div>
              </div>

              <div className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-2">
                {SCAN_STEPS.map((step, index) => (
                  <div
                    key={step}
                    className="flex items-center gap-2 text-[11px] font-semibold text-black/60"
                  >
                    <span className="font-mono text-[9px] text-signal-ink">
                      0{index + 1}
                    </span>
                    <span>{step}</span>
                    {index < SCAN_STEPS.length - 1 ? (
                      <ArrowRight
                        className="h-3 w-3 text-black/24"
                        aria-hidden="true"
                      />
                    ) : null}
                  </div>
                ))}
              </div>

              <TrackedLink
                href="/scan"
                eventName="marketing_primary_cta_clicked"
                eventCategory="conversion"
                placement="first_month_promise"
                preserveUtm
                className="mt-7 inline-flex min-h-12 items-center justify-center gap-2 border border-black/40 bg-transparent px-6 text-[15px] font-semibold text-[#151515] transition-colors hover:border-signal-ink hover:text-signal-ink"
              >
                Scan my store
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </TrackedLink>
            </article>

            <article className="border-t border-black/16 py-8 lg:border-l lg:border-t-0 lg:border-black/16 lg:bg-white/35 lg:px-12 lg:py-10">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center bg-ink-deep text-signal">
                  <Store className="h-4 w-4" aria-hidden="true" />
                </span>
                <div>
                  <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-signal-ink">
                    02 · Beseam Growth
                  </p>
                  <p className="mt-0.5 text-[14px] font-semibold text-ink-deep">
                    Continuous improvement with your approval
                  </p>
                </div>
              </div>

              <ol className="relative mt-7 grid grid-cols-5 gap-2 before:absolute before:left-4 before:right-4 before:top-3.5 before:h-px before:bg-black/12">
                {GROWTH_STEPS.map(({ label, Icon }) => (
                  <li key={label} className="relative z-10 min-w-0">
                    <span className="flex h-7 w-7 items-center justify-center bg-[#faf1eb] text-signal-ink ring-1 ring-black/12">
                      <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                    </span>
                    <span className="mt-2 block text-[11px] font-semibold text-black/62">
                      {label}
                    </span>
                  </li>
                ))}
              </ol>

              <BookReviewCta
                variant="primary"
                location="first_month_promise"
                label="Start my free 30 days"
                className="mt-7 min-h-12 gap-2 px-6 py-0 text-[15px] font-semibold"
              />
            </article>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
