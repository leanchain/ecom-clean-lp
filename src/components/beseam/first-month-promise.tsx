import { ArrowRight, CheckCircle2, Radar, RefreshCw, Store, WandSparkles } from "lucide-react";

import { BookReviewCta } from "@/components/beseam/book-review-cta";
import { Reveal } from "@/components/beseam/reveal";
import TrackedLink from "@/components/beseam/tracked-link";

const SCAN_STEPS = ["AI discovery", "Product evidence", "Store experience"] as const;
const GROWTH_STEPS = [
  { label: "Find", Icon: Radar },
  { label: "Prepare", Icon: WandSparkles },
  { label: "Approve", Icon: CheckCircle2 },
  { label: "Repeat", Icon: RefreshCw },
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
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:items-end lg:gap-16">
            <div>
              <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.14em] text-signal-ink">
                Put Beseam to work
              </p>
              <h2 className="mt-6 max-w-[15ch] text-balance font-display text-[clamp(2.3rem,3.8vw,3.9rem)] font-normal leading-[1.03] tracking-[-0.02em] text-ink-deep">
                Start with your store. Keep the loop moving.
              </h2>
            </div>
            <p className="max-w-[48ch] text-[16px] leading-[1.7] text-black/64">
              See the first opportunities without a login. Connect the store when you want Beseam to keep finding, preparing, and measuring improvements.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.06}>
          <div className="relative mt-12 grid border-y-2 border-ink-deep lg:mt-16 lg:grid-cols-2">
            <article className="relative border-b border-black/16 py-8 lg:border-b-0 lg:pr-12 lg:py-10">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center bg-white text-signal-ink ring-1 ring-black/12">
                  <Radar className="h-4 w-4" aria-hidden="true" />
                </span>
                <div>
                  <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-black/48">01 · Free scan</p>
                  <p className="mt-0.5 text-[14px] font-semibold text-ink-deep">See where shoppers may lose you</p>
                </div>
              </div>

              <div className="mt-7 grid gap-px border border-black/12 bg-black/10 sm:grid-cols-3">
                {SCAN_STEPS.map((step, index) => (
                  <div key={step} className="bg-white px-3 py-3">
                    <p className="font-mono text-[9px] font-semibold tabular-nums text-signal-ink">0{index + 1}</p>
                    <p className="mt-1 text-[11px] font-semibold text-black/64">{step}</p>
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

            <div className="pointer-events-none absolute left-1/2 top-1/2 z-10 hidden h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center bg-ink-deep text-signal lg:flex" aria-hidden="true">
              <ArrowRight className="h-4 w-4" />
            </div>

            <article className="relative bg-white/55 py-8 lg:border-l lg:border-black/16 lg:px-12 lg:py-10">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center bg-ink-deep text-signal">
                  <Store className="h-4 w-4" aria-hidden="true" />
                </span>
                <div>
                  <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-signal-ink">02 · Beseam Growth</p>
                  <p className="mt-0.5 text-[14px] font-semibold text-ink-deep">Continuous improvement with your approval</p>
                </div>
              </div>

              <ol className="mt-7 grid grid-cols-2 gap-px border border-black/12 bg-black/10 sm:grid-cols-4">
                {GROWTH_STEPS.map(({ label, Icon }) => (
                  <li key={label} className="flex min-h-16 flex-col justify-center bg-ground px-3 py-3">
                    <Icon className="h-3.5 w-3.5 text-signal-ink" aria-hidden="true" />
                    <span className="mt-2 text-[11px] font-semibold text-black/64">{label}</span>
                  </li>
                ))}
              </ol>

              <BookReviewCta
                variant="primary"
                location="first_month_promise"
                label="Put Beseam to work"
                className="mt-7 min-h-12 gap-2 px-6 py-0 text-[15px] font-semibold"
              />
            </article>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
