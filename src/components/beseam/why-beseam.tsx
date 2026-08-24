import type { ReactNode } from "react";

import Link from "next/link";

import { ArrowRight, X } from "lucide-react";

import { Reveal } from "@/components/beseam/reveal";

/**
 * The trace forks on purpose. A single-file chain shows a story any tool could
 * tell; showing the two explanations that were checked and ruled out is the
 * part a merchant cannot get anywhere else, and it is what separates an
 * observation from an assertion.
 *
 * Drawn as a graph, not a table. The two searches enter from the top and
 * converge on what the shopper did next; that node forks into the three
 * explanations. Only the node that survives gets a plate, so the eye lands on
 * it first.
 *
 * The accent runs the whole live path — query, query, what happened next, the
 * explanation that held, the change, the proof — so the circuit reads as one
 * continuous thing. The two branches that failed are dashed, grey, and end on a
 * cross.
 *
 * The three branches must stay independent explanations of the same signal. An
 * earlier draft asked whether search returned nothing for the added word, which
 * is not an alternative at all — it is what the confirmed cause produces, so it
 * could never be ruled out. If this example is ever reworded, check that each
 * branch could be true while the other two are false.
 *
 * Everything below is schematic and labelled as such. It carries no counts,
 * percentages, or store names: a fabricated figure would read as a case study,
 * and manufactured evidence is the one thing this product must never show.
 * Replace with a real scan when one is cleared for publication.
 */
const QUERIES = [
  { label: "Searched", value: "“waterproof jacket”" },
  { label: "Then added", value: "... “commuting”" },
] as const;

const SIGNAL = "Got the same jackets back — then left without opening one.";

const CANDIDATES = [
  {
    domain: "Onsite search",
    claim: "The refinement returned nothing at all.",
    cause: false,
    why: "It still returns the waterproof jackets.",
  },
  {
    domain: "Product pages",
    claim: "None of those jackets mention commuting.",
    cause: true,
    why: "Not in the titles, the descriptions, or the tags.",
  },
  {
    domain: "Availability",
    claim: "The jackets it returned are out of stock.",
    cause: false,
    why: "Almost all are in stock in the shopper’s market.",
  },
] as const;

const OUTCOME = [
  {
    label: "The change",
    value:
      "Say who the fit is for on those jackets, and surface the strongest matches for the refined query.",
  },
  {
    label: "What proves it",
    value:
      "Search exits, product visits, and conversion — and the same query, rerun.",
  },
] as const;

/**
 * Edges land on the centre of each node. Two columns with a 1.5rem gap put the
 * first centre at (100% - 1.5rem) / 4; three columns with a 3.5rem gap put it
 * at (100% - 7rem) / 6. Change a gap and this has to change with it.
 */
const QUERY_EDGE = "calc((100% - 1.5rem) / 4)";
const BRANCH_EDGE = "calc((100% - 7rem) / 6)";
const ACCENT = "#e8653a";

function StepLabel({ children }: { children: ReactNode }) {
  return (
    <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-white/56">
      {children}
    </p>
  );
}

function NodeDot({
  tone = "live",
}: {
  /** live = on the path, cause = the node that held, dead = ruled out */
  tone?: "live" | "cause" | "dead";
}) {
  const style =
    tone === "cause"
      ? "bg-[#e8653a] ring-4 ring-[#e8653a]/20"
      : tone === "live"
        ? "bg-[#e8653a]"
        : "border border-white/40 bg-[#111318]";
  return (
    <span
      aria-hidden="true"
      className={`block h-2.5 w-2.5 rounded-full ${style}`}
    />
  );
}

/** The two searches drop and converge on what happened next. */
function Converge() {
  return (
    <div aria-hidden="true" className="relative hidden h-14 lg:block">
      <span
        className="absolute bottom-6 top-0 rounded-bl-2xl border-b border-l"
        style={{ left: QUERY_EDGE, right: "50%", borderColor: ACCENT }}
      />
      <span
        className="absolute bottom-6 top-0 rounded-br-2xl border-b border-r"
        style={{ left: "50%", right: QUERY_EDGE, borderColor: ACCENT }}
      />
      <span
        className="absolute bottom-0 left-1/2 top-8 w-px"
        style={{ background: ACCENT }}
      />
    </div>
  );
}

/** One node in, three explanations out. */
function Fork() {
  return (
    <div aria-hidden="true" className="relative hidden h-16 lg:block">
      <span
        className="absolute left-1/2 top-0 h-7 w-px"
        style={{ background: ACCENT }}
      />
      <span
        className="absolute bottom-0 top-7 rounded-tl-2xl border-l border-t border-dashed border-white/28"
        style={{ left: BRANCH_EDGE, right: "50%" }}
      />
      <span
        className="absolute bottom-0 top-7 rounded-tr-2xl border-r border-t border-dashed border-white/28"
        style={{ left: "50%", right: BRANCH_EDGE }}
      />
      <span
        className="absolute bottom-0 left-1/2 top-7 w-px"
        style={{ background: ACCENT }}
      />
    </div>
  );
}

/** Two branches stop at a cap. Only the observed one carries on. */
function Tails() {
  return (
    <div aria-hidden="true" className="relative hidden h-14 lg:block">
      <span
        className="absolute top-0 h-6 border-l border-dashed border-white/28"
        style={{ left: BRANCH_EDGE }}
      />
      <X
        aria-hidden="true"
        className="absolute top-6 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 text-white/40"
        style={{ left: BRANCH_EDGE }}
      />
      <span
        className="absolute top-0 h-6 border-l border-dashed border-white/28"
        style={{ right: BRANCH_EDGE }}
      />
      <X
        aria-hidden="true"
        className="absolute top-6 h-3.5 w-3.5 translate-x-1/2 -translate-y-1/2 text-white/40"
        style={{ right: BRANCH_EDGE }}
      />
      <span
        className="absolute inset-y-0 left-1/2 w-px"
        style={{ background: ACCENT }}
      />
    </div>
  );
}

export default function WhyBeseam() {
  return (
    <section
      id="why"
      className="scroll-mt-24 border-b border-black/18 bg-[#111318] text-white"
    >
      <div className="mx-auto max-w-[92rem] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
        <Reveal>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-end lg:gap-16">
            <div>
              <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.14em] text-[#e8653a]">
                Connected evidence
              </p>
              <h2 className="mt-7 max-w-[16ch] font-display text-[clamp(2.25rem,3.4vw,3.5rem)] font-normal leading-[1.05] tracking-[-0.02em]">
                See what&rsquo;s behind the problem.
              </h2>
            </div>
            <p className="max-w-[50ch] text-[16px] leading-[1.75] text-white/72">
              Three things could explain it. Beseam checks all three, and shows
              you the two that turned out not to be the cause.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.06}>
          <div className="mt-12 border border-white/16 bg-white/[0.02]">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/12 px-5 py-3 sm:px-6">
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-[#e8653a]">
                Example trace
              </p>
              <p className="text-[12px] text-white/56">
                Onsite discovery &middot; schematic
              </p>
            </div>

            {/* Mobile keeps one spine down the left so the same graph reads as
                branches rather than as a stack of unrelated blocks. */}
            <div className="relative px-5 pb-10 pt-9 sm:px-7 lg:px-10">
              <span
                aria-hidden="true"
                className="absolute bottom-[13.5rem] left-[1.55rem] top-[3.6rem] w-px bg-white/16 sm:left-[2.05rem] lg:hidden"
              />

              <div className="grid gap-6 pl-7 lg:grid-cols-2 lg:gap-6 lg:pl-0">
                {QUERIES.map((query) => (
                  <div key={query.value} className="relative lg:text-center">
                    <span className="absolute -left-7 top-1 lg:hidden">
                      <NodeDot />
                    </span>
                    <span className="mb-3 hidden justify-center lg:flex">
                      <NodeDot />
                    </span>
                    <StepLabel>{query.label}</StepLabel>
                    <p className="mt-2 text-[17px] leading-[1.4] text-white/88">
                      {query.value}
                    </p>
                  </div>
                ))}
              </div>

              <Converge />

              <div className="relative mt-6 pl-7 lg:mt-0 lg:pl-0 lg:text-center">
                <span className="absolute -left-7 top-1 lg:hidden">
                  <NodeDot />
                </span>
                <span className="mb-3 hidden justify-center lg:flex">
                  <NodeDot />
                </span>
                <StepLabel>What happened next</StepLabel>
                <p className="mt-2 text-[clamp(1.1rem,1.7vw,1.4rem)] leading-[1.4] text-white/92">
                  {SIGNAL}
                </p>
              </div>

              <Fork />

              <p className="mt-7 pl-7 lg:hidden">
                <StepLabel>What could explain it</StepLabel>
              </p>

              <div className="mt-5 grid gap-8 pl-7 lg:mt-0 lg:grid-cols-3 lg:items-stretch lg:gap-14 lg:pl-0">
                {CANDIDATES.map((item) => (
                  <div key={item.domain} className="flex flex-col">
                    <span className="mb-4 hidden justify-center lg:flex">
                      <NodeDot tone={item.cause ? "cause" : "dead"} />
                    </span>
                    <article
                      className={
                        item.cause
                          ? "relative flex flex-1 flex-col gap-3.5 border border-[#e8653a]/70 bg-[#e8653a]/[0.08] px-5 py-5"
                          : "relative flex flex-1 flex-col gap-3 border border-dashed border-white/25 px-5 py-5"
                      }
                    >
                      <span
                        className="absolute top-1.5 lg:hidden"
                        style={{ left: "-2.25rem" }}
                      >
                        <NodeDot tone={item.cause ? "cause" : "dead"} />
                      </span>
                      <p
                        className={`font-mono text-[11px] font-semibold uppercase tracking-[0.1em] ${
                          item.cause ? "text-white/64" : "text-white/44"
                        }`}
                      >
                        {item.domain}
                      </p>
                      <p
                        className={
                          item.cause
                            ? "text-[17px] font-medium leading-[1.4] text-white"
                            : "text-[15px] leading-[1.5] text-white/54 line-through decoration-white/28"
                        }
                      >
                        {item.claim}
                      </p>
                      <p
                        className={`self-start px-2 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.1em] ${
                          item.cause
                            ? "bg-[#e8653a] text-[#16110e]"
                            : "bg-white/[0.07] text-white/60"
                        }`}
                      >
                        {item.cause ? "Observed" : "Ruled out"}
                      </p>
                      {/* A strikethrough with no reason under it is
                          decoration. The reason is what makes it credible. */}
                      <p
                        className={`mt-auto pt-1 text-[13px] leading-[1.6] ${
                          item.cause ? "text-white/78" : "text-white/50"
                        }`}
                      >
                        {item.why}
                      </p>
                    </article>
                  </div>
                ))}
              </div>

              <Tails />

              <div
                aria-hidden="true"
                className="mx-auto h-7 w-px lg:hidden"
                style={{ background: ACCENT }}
              />

              <div className="grid border border-[#e8653a]/45 bg-[#e8653a]/[0.05] lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
                {OUTCOME.map((item) => (
                  <div
                    key={item.label}
                    className="border-t border-white/14 px-5 py-5 first:border-t-0 sm:px-6 lg:border-l lg:border-t-0 lg:first:border-l-0"
                  >
                    <StepLabel>{item.label}</StepLabel>
                    <p className="mt-2.5 text-[16px] leading-[1.5] text-white/92">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-9 flex flex-col gap-5 border-t border-white/14 pt-7 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
                <p className="max-w-[62ch] text-[13px] leading-[1.7] text-white/62">
                  Two of the three were wrong. Beseam keeps the signal, what was
                  checked, what was changed, and the measured result connected.
                </p>
                <Link
                  href="/manifesto"
                  className="inline-flex min-h-10 shrink-0 items-center gap-2 text-[13px] font-semibold text-[#e8653a] underline decoration-white/20 underline-offset-6 hover:decoration-[#e8653a]"
                >
                  Why I built Beseam
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
