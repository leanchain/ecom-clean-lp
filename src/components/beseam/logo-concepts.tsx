/**
 * Logo mark explorations — three directions drawn from the brand story, shown
 * against the current mark on /playbook. Each must survive 16px single-color,
 * sharp corners, ink + terracotta duotone max. Not used in production.
 */

const SIGNAL = "#e8653a";

/** 1 · The seam: two panels joined by a stitched seam, forming a B. */
export function SeamB({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={className}>
      <path d="M5 2h9v28H5z" fill="currentColor" />
      <path d="M18 2h7l3 3v6l-2 2 2 2v10l-3 3h-7V2z" fill="currentColor" />
      <path
        d="M16 1v30"
        stroke={SIGNAL}
        strokeWidth="1.6"
        strokeDasharray="3 2.4"
        fill="none"
      />
    </svg>
  );
}

/** 2 · The chosen node: three candidates, one gets the ring. */
export function ChosenNode({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={className}>
      <path
        d="M8 24 16 8l6 11"
        stroke="currentColor"
        strokeOpacity="0.3"
        strokeWidth="1.4"
        fill="none"
      />
      <circle cx="8" cy="24" r="3" fill="currentColor" />
      <circle cx="16" cy="8" r="3" fill="currentColor" />
      <circle cx="23" cy="21" r="3.2" fill={SIGNAL} />
      <circle
        cx="23"
        cy="21"
        r="7.2"
        stroke={SIGNAL}
        strokeWidth="2"
        fill="none"
      />
    </svg>
  );
}

/** 3 · The resolved fork: branches ruled out, one path continues. */
export function ResolvedFork({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={className}>
      <path
        d="M3 16h10"
        stroke="currentColor"
        strokeWidth="2.6"
        fill="none"
      />
      <path
        d="M13 16 21 7M13 16l8 9"
        stroke="currentColor"
        strokeOpacity="0.35"
        strokeWidth="2"
        strokeDasharray="3 2.6"
        fill="none"
      />
      <path d="M20 4.5h4v4h-4z" fill="currentColor" fillOpacity="0.35" />
      <path d="M20 23.5h4v4h-4z" fill="currentColor" fillOpacity="0.35" />
      <path d="M13 16h12" stroke={SIGNAL} strokeWidth="2.6" fill="none" />
      <path d="M25 12.8h6.4v6.4H25z" fill={SIGNAL} />
    </svg>
  );
}

const CONCEPTS = [
  {
    name: "The seam",
    idea: "Be + seam, literally: two panels stitched into a B. The dash echoes the ruled-out lines in the evidence traces.",
    Mark: SeamB,
  },
  {
    name: "The chosen node",
    idea: "Three candidates from the evidence graph; one gets the ring. The mark is the promise: get chosen.",
    Mark: ChosenNode,
  },
  {
    name: "The resolved fork",
    idea: "The trace condensed: branches checked and ruled out, one path holds and continues to the decision.",
    Mark: ResolvedFork,
  },
] as const;

export default function LogoConcepts() {
  return (
    <div className="mx-auto max-w-[64rem] px-5 py-12 sm:px-8 lg:px-10">
      <div className="grid gap-px border border-black/14 bg-black/14 lg:grid-cols-3">
        {CONCEPTS.map(({ name, idea, Mark }) => (
          <article key={name} className="bg-white p-6">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-signal-ink">
              {name}
            </p>
            <p className="mt-2 min-h-[3.9em] text-[12.5px] leading-[1.55] text-black/58">
              {idea}
            </p>

            <div className="mt-5 flex items-end justify-between gap-4 border-t border-black/10 pt-5">
              <Mark className="h-12 w-12 text-[#2b2f36]" />
              <div className="flex items-center gap-2 text-[21px] font-semibold tracking-[-0.05em] text-ink-deep">
                <Mark className="h-[0.9em] w-[0.9em]" />
                Beseam
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-black/10 pt-4">
              <span className="flex items-center gap-3">
                <Mark className="h-4 w-4 text-[#2b2f36]" />
                <span className="font-mono text-[9px] uppercase tracking-[0.08em] text-black/40">
                  16px
                </span>
              </span>
              <span className="bg-ink-deep p-2.5">
                <Mark className="h-6 w-6 text-white" />
              </span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
