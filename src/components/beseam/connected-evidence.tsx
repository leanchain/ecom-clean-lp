import type { ReactNode } from "react";

import Link from "next/link";

import { ArrowRight, X } from "lucide-react";

import { ImpactScreen } from "@/components/beseam/app-screens";
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
/**
 * The four domains the loop runs across. Lives here rather than in its own
 * band on the homepage: “connected” is a claim, and this is the shortest
 * statement of what it is connecting.
 */
const DOMAINS = [
  { title: "Discovery", detail: "Where shoppers start looking" },
  { title: "Store", detail: "What your store shows them" },
  { title: "Behaviour", detail: "What they do next" },
  { title: "Revenue", detail: "What it was worth" },
] as const;

const QUERIES = [
  { label: "Searched", value: "“waterproof jacket”" },
  { label: "Then added", value: "... “commuting”" },
] as const;

const SIGNAL = "Got the same jackets back, then left without opening one.";

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

const MOBILE_FINDINGS = [
  {
    domain: "Onsite search",
    finding: "Search works.",
    detail: "The refined query still returns the waterproof jackets.",
    issue: false,
  },
  {
    domain: "Product pages",
    finding: "Commuting language is missing.",
    detail: "Not in the titles, descriptions, or tags.",
    issue: true,
  },
  {
    domain: "Availability",
    finding: "Stock is available.",
    detail: "Almost all returned jackets are in stock in the shopper’s market.",
    issue: false,
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
      "Search exits, product visits, and conversion. And the same query, rerun.",
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
      ? "bg-signal ring-4 ring-signal/20"
      : tone === "live"
        ? "bg-signal"
        : "border border-white/40 bg-ink-deep";
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

function MobileTrace() {
  return (
    <div className="lg:hidden">
      {/* Mobile shows the result of each diagnostic check directly. Unlike the
          desktop hypothesis graph, the reader never has to negate a failed
          hypothesis in their head to understand what Beseam found. */}
      <div className="border-b border-white/14 pb-6">
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-[10px] font-semibold tabular-nums text-signal">
            01
          </span>
          <StepLabel>Shopper signal</StepLabel>
        </div>
        <p className="mt-3 text-[16px] leading-[1.5] text-white/92">
          Shopper searched {QUERIES[0].value}, added {QUERIES[1].value}, saw the
          same jackets, then left without opening one.
        </p>
      </div>

      <div className="border-b border-white/14 py-6">
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-[10px] font-semibold tabular-nums text-signal">
            02
          </span>
          <StepLabel>What Beseam found</StepLabel>
        </div>
        <p className="mt-2 text-[13px] leading-[1.55] text-white/52">
          Beseam checks possible explanations and follows where the evidence
          points.
        </p>

        <div className="mt-4 border-y border-white/12">
          {MOBILE_FINDINGS.map((item, index) => (
            <article
              key={item.domain}
              className={`py-4 ${index > 0 ? "border-t border-white/10" : ""} ${
                item.issue
                  ? "-mx-3 border-l-2 border-l-signal bg-signal/[0.07] px-3"
                  : ""
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <p
                  className={`font-mono text-[10px] font-semibold uppercase tracking-[0.1em] ${item.issue ? "text-white/68" : "text-white/42"}`}
                >
                  {item.domain}
                </p>
                <span
                  className={`shrink-0 px-2 py-1 font-mono text-[9px] font-semibold uppercase tracking-[0.08em] ${
                    item.issue
                      ? "bg-signal text-[#16110e]"
                      : "bg-white/[0.06] text-white/46"
                  }`}
                >
                  {item.issue ? "Possible issue" : "Less likely"}
                </span>
              </div>

              <p
                className={`mt-2 leading-[1.45] ${
                  item.issue
                    ? "text-[16px] font-medium text-white"
                    : "text-[15px] text-white/72"
                }`}
              >
                {item.finding}
              </p>
              <p
                className={`mt-1.5 text-[12px] leading-[1.55] ${
                  item.issue ? "text-white/68" : "text-white/42"
                }`}
              >
                {item.detail}
              </p>
            </article>
          ))}
        </div>

        <p className="mt-4 border-l-2 border-signal pl-3 text-[13px] leading-[1.55] text-white/72">
          In this trace, the evidence points more strongly to the product pages
          than to search or stock.
        </p>
      </div>

      <div className="border-b border-white/14 py-6">
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-[10px] font-semibold tabular-nums text-signal">
            03
          </span>
          <StepLabel>Change</StepLabel>
        </div>
        <p className="mt-3 text-[15px] leading-[1.55] text-white/90">
          {OUTCOME[0].value}
        </p>
      </div>

      <div className="py-6">
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-[10px] font-semibold tabular-nums text-signal">
            04
          </span>
          <StepLabel>Verify</StepLabel>
        </div>
        <p className="mt-3 text-[15px] leading-[1.55] text-white/90">
          {OUTCOME[1].value}
        </p>
      </div>

      <div className="border-t border-white/14 pt-6">
        <p className="text-[12px] leading-[1.65] text-white/54">
          Beseam keeps the shopper signal, the explanations it checked, the
          action, and what happened afterward connected. We work through the
          evidence with your team, help make the supported change, and measure
          what happens next.
        </p>
        <Link
          href="/manifesto"
          className="mt-4 inline-flex min-h-10 items-center gap-2 text-[13px] font-semibold text-signal underline decoration-white/20 underline-offset-6 hover:decoration-signal"
        >
          Why I built Beseam
          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}

export default function ConnectedEvidence() {
  return (
    <section
      id="proof"
      className="scroll-mt-24 border-y border-black/18 bg-ink-deep text-white"
    >
      <div className="mx-auto max-w-[92rem] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
        <Reveal>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-end lg:gap-16">
            <div>
              <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.14em] text-signal">
                The buying decision
              </p>
              <h2 className="mt-7 max-w-[16ch] text-balance font-display text-[clamp(2.25rem,3.4vw,3.5rem)] font-normal leading-[1.05] tracking-[-0.02em]">
                Beseam doesn&rsquo;t stop at the symptom.
              </h2>
            </div>
            <div className="max-w-[50ch] text-[16px] leading-[1.75] text-white/72">
              <p className="lg:hidden">
                Seeing that a shopper left tells you what happened, not what
                may have shaped the buying decision. Several things could
                explain it. Beseam checks the possible explanations and shows
                where the evidence points.
              </p>
              <p className="hidden lg:block">
                Seeing that a shopper left tells you what happened, not what may
                have shaped the buying decision. Three things could explain it
                here. Beseam checks all three, and shows you the two the evidence
                rules out.
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.04}>
          <div className="mt-10 border-y border-white/14 py-5">
            <div className="grid gap-5 sm:grid-cols-4 sm:gap-0">
              {DOMAINS.map((domain, index) => (
                <div
                  key={domain.title}
                  className="relative pr-8 sm:px-6 sm:first:pl-0 sm:last:pr-0"
                >
                  <div className="flex items-center gap-3">
                    <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.12em] text-white">
                      {domain.title}
                    </p>
                    {index < DOMAINS.length - 1 ? (
                      <ArrowRight
                        aria-hidden="true"
                        className="h-3.5 w-3.5 shrink-0 text-white/30 sm:absolute sm:-right-2 sm:top-0.5"
                      />
                    ) : null}
                  </div>
                  <p className="mt-2 text-[12px] leading-relaxed text-white/58">
                    {domain.detail}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-5 max-w-[70ch] text-[13px] leading-[1.65] text-white/58">
              One shopper, followed across all four. So what you find in one
              place still means something in the next.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.06}>
          <div className="mt-10 lg:border lg:border-white/16 lg:bg-white/[0.02]">
            <div className="flex flex-wrap items-center justify-between gap-3 border-y border-white/12 py-3 lg:border-t-0 lg:border-b lg:px-6">
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-signal">
                Example trace
              </p>
              <p className="text-[12px] text-white/56">
                Onsite discovery &middot; schematic
              </p>
            </div>

            <div className="relative pb-8 pt-6 sm:pb-10 sm:pt-9 lg:px-10">
              <MobileTrace />

              <div className="hidden lg:block">
                <div className="grid grid-cols-2 gap-6">
                  {QUERIES.map((query) => (
                    <div key={query.value} className="relative text-center">
                      <span className="mb-3 flex justify-center">
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

                <div className="relative text-center">
                  <span className="mb-3 flex justify-center">
                    <NodeDot />
                  </span>
                  <StepLabel>What happened next</StepLabel>
                  <p className="mt-2 text-[clamp(1.1rem,1.7vw,1.4rem)] leading-[1.4] text-white/92">
                    {SIGNAL}
                  </p>
                </div>

                <Fork />

                <div className="grid grid-cols-3 items-stretch gap-14">
                  {CANDIDATES.map((item) => (
                    <div key={item.domain} className="flex flex-col">
                      <span className="mb-4 flex justify-center">
                        <NodeDot tone={item.cause ? "cause" : "dead"} />
                      </span>
                      <article
                        className={
                          item.cause
                            ? "relative flex flex-1 flex-col gap-3.5 border border-signal/70 bg-signal/[0.08] px-5 py-5"
                            : "relative flex flex-1 flex-col gap-3 border border-dashed border-white/25 px-5 py-5"
                        }
                      >
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
                              ? "bg-signal text-[#16110e]"
                              : "bg-white/[0.07] text-white/60"
                          }`}
                        >
                          {item.cause ? "Observed" : "Ruled out"}
                        </p>
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

                <div className="grid border border-signal/45 bg-signal/[0.05] lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
                  {OUTCOME.map((item) => (
                    <div
                      key={item.label}
                      className="border-l border-white/14 px-6 py-5 first:border-l-0"
                    >
                      <StepLabel>{item.label}</StepLabel>
                      <p className="mt-2.5 text-[16px] leading-[1.5] text-white/92">
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-9 flex items-center justify-between gap-8 border-t border-white/14 pt-7">
                  <p className="max-w-[70ch] text-[13px] leading-[1.7] text-white/62">
                    Beseam does not stop at the recommendation. We work through
                    the evidence with your team, help make the supported change,
                    and measure what happens afterward.
                  </p>
                  <Link
                    href="/manifesto"
                    className="inline-flex min-h-10 shrink-0 items-center gap-2 text-[13px] font-semibold text-signal underline decoration-white/20 underline-offset-6 hover:decoration-signal"
                  >
                    Why I built Beseam
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* The trace above says what Beseam concluded. This says where the
            merchant reads it back afterwards — the same claim, in the product
            rather than in a diagram. */}
        <Reveal delay={0.08}>
          <div className="mt-12 grid gap-8 lg:mt-16 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-center lg:gap-14">
            <div>
              <h3 className="max-w-[18ch] text-balance font-display text-[clamp(1.6rem,2.3vw,2.2rem)] font-normal leading-[1.1] tracking-[-0.02em]">
                Then the same questions, asked again.
              </h3>
              <p className="mt-4 max-w-[48ch] text-[15px] leading-[1.7] text-white/66">
                A change is a guess until something measures it. What was
                changed, what moved afterwards, and what did not. Kept next to
                the decision that produced it.
              </p>
            </div>
            <ImpactScreen />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
