import { CheckCircle2, FileSearch2, ShieldCheck, WandSparkles } from "lucide-react";

import { ActionsScreen } from "@/components/beseam/app-screens";
import { Reveal } from "@/components/beseam/reveal";

const SIGNALS = [
  { label: "Evidence attached", Icon: FileSearch2 },
  { label: "Fix prepared", Icon: WandSparkles },
  { label: "Your approval", Icon: ShieldCheck },
  { label: "Proof planned", Icon: CheckCircle2 },
] as const;

/**
 * Product-first proof that the evidence becomes an approvable change rather
 * than another report. The operating loop already appears above, so this beat
 * gives most of its space to the merchant-facing Growth plan itself.
 */
export default function EvidenceToWork() {
  return (
    <section
      id="actions"
      className="scroll-mt-24 border-t border-black/14 bg-white"
    >
      <div className="mx-auto max-w-[92rem] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
        <Reveal>
          <div className="grid gap-10 lg:grid-cols-[minmax(15rem,0.42fr)_minmax(0,1.58fr)] lg:items-start lg:gap-14">
            <div className="lg:sticky lg:top-24">
              <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.14em] text-signal-ink">
                From evidence to action
              </p>
              <h2 className="mt-6 max-w-[12ch] text-balance font-display text-[clamp(2.2rem,3.3vw,3.4rem)] font-normal leading-[1.04] tracking-[-0.02em] text-ink-deep">
                Beseam finds what to improve next.
              </h2>
              <p className="mt-5 max-w-[30ch] text-[15px] leading-[1.7] text-black/62">
                The strongest opportunity becomes a supported change for your approval, with the evidence and proof plan still attached.
              </p>

              <div className="mt-7 grid grid-cols-2 gap-px border border-black/14 bg-black/12 lg:grid-cols-1">
                {SIGNALS.map(({ label, Icon }) => (
                  <div key={label} className="flex min-h-12 items-center gap-2.5 bg-ground px-3 py-2.5">
                    <Icon className="h-3.5 w-3.5 shrink-0 text-signal-ink" strokeWidth={1.8} aria-hidden="true" />
                    <span className="text-[11px] font-semibold text-black/64">{label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative min-w-0">
              <div className="pointer-events-none absolute -left-5 top-8 hidden h-[calc(100%-4rem)] w-px bg-black/12 lg:block" aria-hidden="true" />
              <div className="border-t-2 border-ink-deep pt-4">
                <div className="mb-4 flex items-center justify-between gap-4">
                  <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.11em] text-black/44">
                    Merchant view
                  </p>
                  <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-signal-ink">
                    Opportunity → approval → verification
                  </p>
                </div>
                <div className="sm:hidden">
                  <ActionsScreen compact />
                </div>
                <div className="hidden sm:block">
                  <ActionsScreen />
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
