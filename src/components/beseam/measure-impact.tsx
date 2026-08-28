import { ImpactScreen } from "@/components/beseam/app-screens";
import { Reveal } from "@/components/beseam/reveal";

/**
 * The Impact ledger promoted to its own beat. Until real customer results
 * are publishable, the measurement mechanism itself is the proof — the
 * screen carries its own "Example figures" stamp.
 */
export default function MeasureImpact() {
  return (
    <section id="impact" className="scroll-mt-24 border-y border-black/18 bg-ink-deep text-white">
      <div className="mx-auto max-w-[92rem] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
        <Reveal>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-center lg:gap-14">
            <div>
              <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.14em] text-signal">
                Proof
              </p>
              <h2 className="mt-7 max-w-[16ch] text-balance font-display text-[clamp(2.25rem,3.4vw,3.5rem)] font-normal leading-[1.05] tracking-[-0.02em]">
                Every fix has to earn its place.
              </h2>
              <p className="mt-6 max-w-[46ch] text-[16px] leading-[1.75] text-white/70">
                Beseam rechecks the original shopper signal and measures
                downstream behavior, conversion, orders, and revenue.
                Correlation stays labeled; the before-and-after stays attached
                to the fix.
              </p>
            </div>
            <ImpactScreen />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
