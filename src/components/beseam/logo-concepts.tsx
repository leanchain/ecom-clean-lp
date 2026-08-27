/**
 * Logo mark explorations — typographic direction: custom-cut B letterforms,
 * no diagrams. Slab geometry from the site's table/hairline language. Each
 * must survive 16px single-color, sharp corners, ink + terracotta duotone
 * max. Not used in production.
 */

const SIGNAL = "#e8653a";

/** 1 · Cut B: one decisive slice through a slab B, halves offset. */
export function CutB({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={className}>
      <g transform="translate(-0.5 0)">
        <path
          d="M5 2h22v11.46L5 16.85zM11 6h10v4.5H11z"
          fill="currentColor"
          fillRule="evenodd"
        />
      </g>
      <g transform="translate(0.5 0)">
        <path
          d="M5 18.25 29 14.55V30H5zM11 18.5h12v7H11z"
          fill="currentColor"
          fillRule="evenodd"
        />
      </g>
    </svg>
  );
}

/** 2 · Decision counter: slab B, top counter open, bottom counter filled. */
export function DecisionCounterB({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={className}>
      <path
        d="M5 2h22v12h2v16H5zM11 6h10v4.5H11zM11 18.5h12v7H11z"
        fill="currentColor"
        fillRule="evenodd"
      />
      <path d="M11 18.5h12v7H11z" fill={SIGNAL} />
    </svg>
  );
}

/** 3 · Open B: bowls released from the stem, joined only by alignment. */
export function OpenB({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={className}>
      <path d="M5 2h5v28H5z" fill="currentColor" />
      <path
        d="M12.5 2h8.5l5 4v4l-5 4h-8.5v-3.5h7.5l2-1.6V7.1l-2-1.6h-7.5z"
        fill="currentColor"
      />
      <path
        d="M12.5 16h10l5 4.5v5l-5 4.5h-10v-3.5h9l2.2-1.8v-2.4l-2.2-1.8h-9z"
        fill="currentColor"
      />
    </svg>
  );
}

const CONCEPTS = [
  {
    name: "Cut B",
    idea: "A slab B with one decisive slice — the seam — and the halves set slightly apart. The cut is the brand move.",
    Mark: CutB,
  },
  {
    name: "Decision counter",
    idea: "Pure letterform with one move: the top counter stays open, the bottom counter is filled terracotta. Discovery open, decision made.",
    Mark: DecisionCounterB,
  },
  {
    name: "Open B",
    idea: "The bowls release from the stem — three strokes held together only by alignment. Quietest of the three; pure craft.",
    Mark: OpenB,
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
