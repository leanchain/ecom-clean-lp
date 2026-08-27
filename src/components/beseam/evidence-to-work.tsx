import { ActionsScreen } from "@/components/beseam/app-screens";
import { Reveal } from "@/components/beseam/reveal";

/**
 * The Actions queue promoted to its own beat. This is the differentiation
 * argument: Beseam is not another visibility chart — the evidence ends as a
 * prioritized, approvable queue of work.
 */
export default function EvidenceToWork() {
  return (
    <section id="actions" className="scroll-mt-24 border-t border-black/14 bg-white">
      <div className="mx-auto max-w-[92rem] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
        <Reveal>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-end lg:gap-16">
            <div>
              <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.14em] text-signal-ink">
                From evidence to work
              </p>
              <h2 className="mt-7 max-w-[16ch] text-balance font-display text-[clamp(2.25rem,3.4vw,3.5rem)] font-normal leading-[1.05] tracking-[-0.02em] text-ink-deep">
                Beseam gives the team work to do.
              </h2>
            </div>
            <p className="max-w-[50ch] text-[16px] leading-[1.75] text-black/64">
              Not another analytics chart. What the evidence supports arrives
              as a queue of prioritized tasks — what to change, the effort it
              takes, and the next step — each reviewed and approved before
              anything ships.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="mx-auto mt-12 max-w-[68rem] lg:mt-16">
            <ActionsScreen />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
