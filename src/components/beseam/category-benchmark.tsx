import type { CategoryBenchmark } from "@/data/category-benchmarks";

/**
 * One published category benchmark: a real shopper question, and which brands
 * each assistant named in reply.
 *
 * The figure is a presence matrix, not a rank: one column per engine, one row
 * per brand, a mark where that engine named it. The engine is named at the top
 * of its column and carries its own tally for this question, so a reader can
 * see both who agreed and how differently each engine answers.
 *
 * Register note: like `gap-track-figure.tsx`, this is a quotation from the
 * product rather than editorial chrome: data palette, tabular numerals, a
 * stated denominator, method printed under the figure. Terracotta never
 * appears inside the frame.
 */

/** Shared data ink, reused by the run-level figures on /benchmarks. */
export const BENCHMARK_INK = {
  /** An engine that named the brand. */
  named: "#334155",
  /** An engine that answered and did not name it. */
  absent: "#cbd5e1",
  /** Named by every engine that answered. */
  consensus: "#047857",
} as const;

/** Column headings stay short so three engines fit a phone width. */
const SHORT_ENGINE: Record<string, string> = {
  "Google AI Mode": "AI Mode",
};

export function engineLabel(engine: string) {
  return SHORT_ENGINE[engine] ?? engine;
}

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export function formatBenchmarkDate(iso: string) {
  const [year, month, day] = iso.split("-");
  const index = Number(month) - 1;
  if (!year || !day || Number.isNaN(index) || !MONTHS[index]) return iso;
  return `${Number(day)} ${MONTHS[index]} ${year}`;
}

function listEngines(engines: string[]) {
  if (engines.length <= 1) return engines[0] ?? "";
  return `${engines.slice(0, -1).join(", ")} and ${engines[engines.length - 1]}`;
}

export default function CategoryBenchmarkFigure({
  benchmark,
  index,
  maxBrands,
}: {
  benchmark: CategoryBenchmark;
  index: number;
  maxBrands?: number;
}) {
  const { category, question, askedOn, engines, brands } = benchmark;

  const engineCount = engines.length;
  const shown = maxBrands ? brands.slice(0, maxBrands) : brands;
  const hidden = brands.length - shown.length;
  const soloCount = brands.filter((b) => b.namedBy.length === 1).length;
  const perEngine = engines.map((engine) => ({
    engine,
    named: brands.filter((b) => b.namedBy.includes(engine)).length,
  }));

  // Identical templates on every row keep the columns aligned while each row
  // stays its own hover target.
  const columns = {
    gridTemplateColumns: `minmax(0,1fr) repeat(${engineCount}, minmax(3.5rem,4.5rem))`,
  };

  return (
    <figure id={benchmark.slug} className="scroll-mt-24">
      <div className="border border-black/18 bg-white px-4 py-5 sm:px-6">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 border-b border-black/12 pb-3">
          <span className="font-mono text-[12px] font-semibold uppercase tracking-[0.12em] text-black/62">
            {category}
          </span>
          <span className="font-mono text-[12px] tabular-nums text-black/55">
            {engineCount} engines · {formatBenchmarkDate(askedOn)}
          </span>
        </div>

        <p className="mt-5 max-w-[42ch] text-[17px] font-semibold leading-[1.4] text-[#111318]">
          &ldquo;{question}&rdquo;
        </p>

        <p className="mt-4 text-[13px] leading-relaxed text-black/62">
          <span className="font-semibold tabular-nums text-[#111318]">
            {brands.length}
          </span>{" "}
          brands named in total.{" "}
          <span className="font-semibold tabular-nums text-[#111318]">
            {soloCount}
          </span>{" "}
          of them by only one engine.
        </p>

        <div
          className="mt-5 grid items-end gap-x-2 border-b border-black/20 pb-2"
          style={columns}
          aria-hidden="true"
        >
          <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-black/50">
            Brand
          </span>
          {perEngine.map(({ engine, named }) => (
            <span key={engine} className="flex flex-col items-center gap-1">
              <span
                className="font-mono text-[11px] font-semibold uppercase tracking-[0.06em] text-black/62"
                title={engine}
              >
                {engineLabel(engine)}
              </span>
              <span className="font-mono text-[12px] tabular-nums text-[#111318]">
                {named}
              </span>
            </span>
          ))}
        </div>

        <div>
          {shown.map((row) => {
            const consensus = row.namedBy.length === engineCount;
            return (
              <div
                key={row.brand}
                className="grid items-center gap-x-2 border-b border-black/10 py-2 transition-colors last:border-b-0 hover:bg-black/[0.03]"
                style={columns}
              >
                <span
                  className={`truncate text-[14px] ${
                    consensus ? "font-semibold text-[#111318]" : "text-black/82"
                  }`}
                  title={row.brand}
                >
                  {row.brand}
                </span>
                {engines.map((engine) => {
                  const named = row.namedBy.includes(engine);
                  return (
                    <span
                      key={engine}
                      className="flex justify-center"
                      aria-hidden="true"
                    >
                      <span
                        className={
                          named ? "h-2.5 w-2.5 rounded-[2px]" : "h-px w-2.5"
                        }
                        style={{
                          backgroundColor: named
                            ? consensus
                              ? BENCHMARK_INK.consensus
                              : BENCHMARK_INK.named
                            : BENCHMARK_INK.absent,
                        }}
                      />
                    </span>
                  );
                })}
                <span className="sr-only">
                  {row.brand}: named by {listEngines(row.namedBy)}
                </span>
              </div>
            );
          })}
        </div>

        {hidden > 0 ? (
          <p className="mt-3 text-[13px] text-black/55">
            + {hidden} more brands, each named by a single engine.
          </p>
        ) : null}
      </div>

      <figcaption className="grid gap-2 border-x border-b border-black/18 bg-white px-4 py-3 sm:grid-cols-[9rem_1fr] sm:px-5">
        <span className="font-mono text-[12px] font-semibold uppercase tracking-[0.12em] text-black/62">
          Fig. {index + 1}: {category.toLowerCase()}
        </span>
        <span className="text-[13px] leading-relaxed text-black/62">
          Asked verbatim on {engines.join(", ")}, {formatBenchmarkDate(askedOn)}
          . One column per engine, marked where that engine named the brand;
          green where every engine did, a rule where it did not. Public brands,
          observed: no customer data, and no ranking is implied.
        </span>
      </figcaption>
    </figure>
  );
}
