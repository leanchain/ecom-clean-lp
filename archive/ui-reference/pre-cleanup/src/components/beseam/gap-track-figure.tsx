import { CircleAlert } from "lucide-react";

/**
 * Fig. 1: the engine gap track. One hairline track per AI engine carrying two
 * dots: the merchant (filled, emerald) and their closest competitor (hollow,
 * slate). The segment between them is tinted by sign: emerald where the
 * merchant leads, rose where they trail.
 *
 * Register note: this component is a quotation from the product, not part of
 * the editorial chrome: it uses the app's data palette (emerald/slate/rose),
 * tabular numerals, and a stated denominator. Terracotta never appears here.
 *
 * Numbers are a real 30-day window from a live merchant workspace (rival
 * names withheld). Update them from that workspace: never invent values.
 */
const ROWS = [
  { engine: "ChatGPT", you: 81, rival: 19 },
  { engine: "Gemini", you: 77, rival: 17 },
  { engine: "Google AI Mode", you: 70, rival: 21 },
  {
    engine: "Claude",
    you: 6,
    rival: 8,
    note: "Fewer than half of Claude's answers named any brand at all: an answer-data gap, not a competitor win. The fix is product data, not marketing.",
  },
] as const;

const YOU = "#059669"; // emerald: the merchant, always
const RIVAL = "#64748b"; // slate: competitors, never a saturated hue
const LEAD = "#10b981";
const TRAIL = "#f43f5e";

function GapRow({
  engine,
  you,
  rival,
  note,
}: {
  engine: string;
  you: number;
  rival: number;
  note?: string;
}) {
  const delta = you - rival;
  const leading = delta >= 0;
  const left = Math.min(you, rival);
  const width = Math.abs(you - rival);

  return (
    <div className="border-b border-black/12 py-4 last:border-b-0">
      <div className="grid grid-cols-[minmax(6rem,8.5rem)_1fr] items-center gap-3 sm:grid-cols-[8.5rem_1fr_11.5rem] sm:gap-6">
        <span className="font-mono text-[12px] font-semibold uppercase tracking-[0.08em] text-black/70">
          {engine}
        </span>

        <div className="relative h-6" aria-hidden="true">
          <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-black/14" />
          <div
            className="absolute top-1/2 h-[3px] -translate-y-1/2"
            style={{
              left: `${left}%`,
              width: `${width}%`,
              backgroundColor: leading ? LEAD : TRAIL,
            }}
          />
          <span
            className="absolute top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 bg-white"
            style={{ left: `${rival}%`, borderColor: RIVAL }}
          />
          <span
            className="absolute top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{ left: `${you}%`, backgroundColor: YOU }}
          />
        </div>

        <p className="col-span-2 text-[13px] tabular-nums text-black/70 sm:col-span-1 sm:text-right">
          you <span className="font-semibold text-[#111318]">{you}%</span>
          <span className="text-black/45"> · </span>
          rival {rival}%
          <span
            className="ml-2 font-semibold"
            style={{ color: leading ? "#047857" : "#be123c" }}
          >
            {leading ? "+" : "−"}
            {Math.abs(delta)}
          </span>
        </p>
      </div>

      {note ? (
        <p className="mt-2 flex items-start gap-2 text-[13px] leading-relaxed text-black/62 sm:ml-[calc(8.5rem+1.5rem)]">
          <CircleAlert
            className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#d97706]"
            aria-hidden="true"
          />
          {note}
        </p>
      ) : null}
    </div>
  );
}

export default function GapTrackFigure() {
  return (
    <figure>
      <div className="border border-black/18 bg-white px-4 py-5 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-black/12 pb-3">
          <span className="font-mono text-[12px] font-semibold uppercase tracking-[0.12em] text-black/62">
            Share of answers naming the brand
          </span>
          <span className="flex items-center gap-4 text-[12px] text-black/62">
            <span className="flex items-center gap-1.5">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: YOU }}
                aria-hidden="true"
              />
              you
            </span>
            <span className="flex items-center gap-1.5">
              <span
                className="h-2.5 w-2.5 rounded-full border-2 bg-white"
                style={{ borderColor: RIVAL }}
                aria-hidden="true"
              />
              closest competitor
            </span>
          </span>
        </div>

        <div>
          {ROWS.map((row) => (
            <GapRow key={row.engine} {...row} />
          ))}
        </div>

        <p className="mt-1 border-t border-black/12 pt-3 text-[13px] leading-relaxed text-black/62">
          <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-black/55">
            Not measured
          </span>{" "}
          Microsoft Copilot: no completed checks in this window. Shown as
          absent, never as 0%.
        </p>
      </div>

      <figcaption className="grid gap-2 border-x border-b border-black/18 bg-white px-4 py-3 sm:grid-cols-[9rem_1fr] sm:px-5">
        <span className="font-mono text-[12px] font-semibold uppercase tracking-[0.12em] text-black/62">
          Fig. 1: engine gaps
        </span>
        <span className="text-[13px] leading-relaxed text-black/62">
          One dancewear merchant, 30 days of real shopper prompts. Each
          percentage is the share of that engine&rsquo;s completed answers that
          named the brand. Competitor names withheld.
        </span>
      </figcaption>
    </figure>
  );
}
