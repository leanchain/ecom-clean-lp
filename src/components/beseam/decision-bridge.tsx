import ConnectedSystemMap from "@/components/beseam/connected-system-map";
import { Reveal } from "@/components/beseam/reveal";

/**
 * The shortest complete statement of what Beseam is. Instead of four isolated
 * feature cards, the product is shown as one connected system: discovery,
 * product/store, behavior, and revenue signals feed the same buying decision —
 * served live as personalization, and reviewed after as evidence, action, and
 * impact.
 */
export default function DecisionBridge() {
  return (
    <section id="one-system" className="scroll-mt-24 bg-ground">
      <div className="mx-auto max-w-[92rem] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
        <Reveal>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-end lg:gap-16">
            <div>
              <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.14em] text-signal-ink">
                Shopping is moving from finding products to choosing products
              </p>
              <h2 className="mt-7 max-w-[18ch] text-balance font-display text-[clamp(2.3rem,3.8vw,3.9rem)] font-normal leading-[1.03] tracking-[-0.02em] text-ink-deep">
                One system for the buying decision.
              </h2>
            </div>
            <p className="max-w-[52ch] text-[16px] leading-[1.75] text-black/64">
              Discovery, product evidence, shopper behavior, and revenue should
              not live in separate dashboards. Beseam connects them around the
              same decision so the team can see what happened, understand what
              may explain it, decide what deserves action, and learn from what
              changes. The same connection is what decides which products a
              shopper is shown next.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="mt-12 lg:mt-16">
            <ConnectedSystemMap />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
