import type { CategoryBenchmark } from "@/data/category-benchmarks";

/**
 * One published category benchmark: a real shopper question, and which brands
 * each assistant named in reply.
 *
 * The figure is built around the finding, not around a rank: a brand is either
 * in an answer or it is not, and the engines mostly disagree about who is in.
 * Each brand row carries one pip per engine — filled where that engine named
 * the brand — so agreement and disagreement are readable at a glance.
 *
 * Register note: like `gap-track-figure.tsx`, this is a quotation from the
 * product rather than editorial chrome — data palette, tabular numerals, a
 * stated denominator, method printed under the figure. Terracotta never
 * appears inside the frame.
 */

const NAMED = "#334155"; // slate — an engine that named the brand
const ABSENT = "#cbd5e1"; // pale slate — an engine that did not
const CONSENSUS = "#047857"; // emerald — named by every engine that answered

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
  const soloCount = brands.filter((b) => b.engines === 1).length;

  return (
    <figure>
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

        <div className="mt-4 border-t border-black/12">
          {shown.map((row) => {
            const consensus = row.engines === engineCount;
            return (
              <div
                key={row.brand}
                className="grid grid-cols-[1fr_auto] items-center gap-4 border-b border-black/12 py-2.5 last:border-b-0"
              >
                <span className="truncate text-[14px] text-black/82">
                  {row.brand}
                </span>
                <span
                  className="flex items-center gap-1.5"
                  title={`Named by ${row.engines} of ${engineCount} engines`}
                >
                  {engines.map((engine, pip) => (
                    <span
                      key={engine}
                      className="h-2.5 w-2.5 rounded-full"
                      style={{
                        backgroundColor:
                          pip < row.engines
                            ? consensus
                              ? CONSENSUS
                              : NAMED
                            : ABSENT,
                      }}
                      aria-hidden="true"
                    />
                  ))}
                  <span className="sr-only">
                    Named by {row.engines} of {engineCount} engines
                  </span>
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
          Fig. {index + 1} — {category.toLowerCase()}
        </span>
        <span className="text-[13px] leading-relaxed text-black/62">
          Asked verbatim on {engines.join(", ")}, {formatBenchmarkDate(askedOn)}
          . One pip per engine, filled where that engine named the brand; green
          where every engine did. Public brands, observed — no customer data,
          and no ranking is implied.
        </span>
      </figcaption>
    </figure>
  );
}
