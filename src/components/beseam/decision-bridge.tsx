import ConnectedSystemMap from "@/components/beseam/connected-system-map";
import { Reveal } from "@/components/beseam/reveal";

type DecisionBridgeProps = {
  eyebrow?: string;
  heading?: string;
  body?: string;
  exploreHref?: string | null;
  exploreLabel?: string;
};

/**
 * The shortest complete statement of what Beseam is. Instead of isolated
 * feature cards, the product is shown as one connected system: discovery,
 * product/store, behavior, and revenue signals feed the same buying decision.
 * The copy is configurable so the same visual can introduce the architecture
 * on /platform without linking back to itself.
 */
export default function DecisionBridge({
  eyebrow = "Shopping is moving from finding products to choosing products",
  heading = "One system for the buying decision.",
  body =
    "Discovery, product evidence, shopper behavior, and revenue should not live in separate dashboards. Beseam connects them around the same decision, follows the strongest opportunity into a supported change, and rechecks what changed. Your team steps in where judgment is needed.",
  exploreHref = "/platform",
  exploreLabel = "Explore the platform",
}: DecisionBridgeProps) {
  return (
    <section id="one-system" className="scroll-mt-24 bg-ground">
      <div className="mx-auto max-w-[92rem] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
        <Reveal>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-end lg:gap-16">
            <div>
              <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.14em] text-signal-ink">
                {eyebrow}
              </p>
              <h2 className="mt-7 max-w-[18ch] text-balance font-display text-[clamp(2.3rem,3.8vw,3.9rem)] font-normal leading-[1.03] tracking-[-0.02em] text-ink-deep">
                {heading}
              </h2>
            </div>
            <p className="max-w-[52ch] text-[16px] leading-[1.75] text-black/64">
              {body}
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="mt-12 lg:mt-16">
            <ConnectedSystemMap
              exploreHref={exploreHref}
              exploreLabel={exploreLabel}
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
