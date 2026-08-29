import { ShieldCheck } from "lucide-react";

import { ActionsScreen } from "@/components/beseam/app-screens";
import { Reveal } from "@/components/beseam/reveal";

/**
 * Product-first proof that evidence becomes an approvable change rather than
 * another report. The operating loop already appears above, so this beat gives
 * almost all of its space to the merchant-facing Growth plan.
 */
export default function EvidenceToWork() {
  return (
    <section id="actions" className="scroll-mt-24 bg-white">
      <div className="mx-auto max-w-[92rem] px-5 py-16 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
        <Reveal>
          <div className="grid gap-10 lg:grid-cols-[minmax(14rem,0.32fr)_minmax(0,1.68fr)] lg:items-start lg:gap-12">
            <div className="lg:sticky lg:top-24">
              <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.14em] text-signal-ink">
                From evidence to action
              </p>
              <h2 className="mt-6 max-w-[11ch] text-balance font-display text-[clamp(2.2rem,3.3vw,3.4rem)] font-normal leading-[1.04] tracking-[-0.02em] text-ink-deep">
                Beseam finds what to improve next.
              </h2>
              <p className="mt-5 max-w-[29ch] text-[15px] leading-[1.7] text-black/62">
                The strongest evidence becomes a supported change with its proof plan still attached.
              </p>

              <div className="mt-7 flex gap-3 border-l-2 border-signal-ink pl-4">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-signal-ink" strokeWidth={1.8} aria-hidden="true" />
                <div>
                  <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.1em] text-signal-ink">
                    Approval gate
                  </p>
                  <p className="mt-1.5 max-w-[25ch] text-[12.5px] font-medium leading-[1.5] text-black/68">
                    Nothing customer-facing changes until you approve it.
                  </p>
                </div>
              </div>
            </div>

            <div className="min-w-0 border-t-2 border-ink-deep pt-4">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.11em] text-black/44">
                  Merchant view
                </p>
                <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-signal-ink">
                  Evidence → approval → verification
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
        </Reveal>
      </div>
    </section>
  );
}
