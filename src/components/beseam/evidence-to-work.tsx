import { ActionsScreen } from "@/components/beseam/app-screens";
import { Reveal } from "@/components/beseam/reveal";

const WORKFLOW = [
  ["Ranked", "What deserves attention first"],
  ["Prepared", "Supported change ready"],
  ["Approved", "Judgment stays with you"],
  ["Verified", "Checked after it ships"],
] as const;

/**
 * The Actions queue promoted to its own beat. This is the differentiation
 * argument: Beseam is not another visibility chart — the evidence ends as a
 * prioritized, approvable queue of work.
 */
export default function EvidenceToWork() {
  return (
    <section
      id="actions"
      className="scroll-mt-24 border-t border-black/14 bg-white"
    >
      <div className="mx-auto max-w-[92rem] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
        <Reveal>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-end lg:gap-16">
            <div>
              <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.14em] text-signal-ink">
                Your growth plan
              </p>
              <h2 className="mt-7 max-w-[24ch] font-display text-[clamp(2.25rem,3.4vw,3.5rem)] font-normal leading-[1.05] tracking-[-0.02em] text-ink-deep">
                <span className="lg:block lg:whitespace-nowrap">Beseam turns</span>{" "}
                <span className="lg:block lg:whitespace-nowrap">opportunities into work.</span>
              </h2>
            </div>
            <p className="max-w-[50ch] text-[16px] leading-[1.75] text-black/64">
              Beseam continuously ranks what the evidence says deserves
              attention, prepares supported fixes, executes within your approval
              rules, and keeps judgment-heavy changes ready for review.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="mt-12 w-full lg:mt-16">
            <ol className="grid border-y-2 border-ink-deep sm:grid-cols-4">
              {WORKFLOW.map(([title, detail], index) => (
                <li
                  key={title}
                  className={`py-3.5 sm:px-4 ${index > 0 ? "border-t border-black/14 sm:border-l sm:border-t-0" : ""}`}
                >
                  <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-signal-ink">
                    {title}
                  </p>
                  <p className="mt-1 text-[12px] leading-[1.45] text-black/58">
                    {detail}
                  </p>
                </li>
              ))}
            </ol>
            <div className="mt-6">
              <ActionsScreen />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
