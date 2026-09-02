import Link from "next/link";

import { ArrowRight, Braces, Download, Table2 } from "lucide-react";
import type { Metadata } from "next";

import { Reveal } from "@/components/beseam/reveal";
import { BENCHMARK_RUN } from "@/data/category-benchmarks";
import { buildPublicMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPublicMetadata({
  title: "Public AI Shopping Data | Beseam",
  description:
    "Download Beseam's public AI shopping research data: real shopping questions, AI assistants, brands named, dates, and method.",
  path: "/data",
});

const DOWNLOADS = [
  {
    title: "JSON",
    detail: "Full run metadata, assistant totals, questions, and brand appearances.",
    href: "/data/ai-shopping.json",
    label: "Open JSON",
    Icon: Braces,
  },
  {
    title: "CSV",
    detail: "One row per question and brand, with the assistants that named it.",
    href: "/data/ai-shopping.csv",
    label: "Download CSV",
    Icon: Table2,
  },
] as const;

export default function DataPage() {
  return (
    <div className="bg-ground text-ink-deep">
      <section className="border-b border-black/18">
        <div className="mx-auto max-w-[92rem] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
          <Reveal className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(22rem,0.65fr)] lg:items-end lg:gap-20">
            <div>
              <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.14em] text-signal-ink">
                AI shopping data
              </p>
              <h1 className="mt-7 max-w-[15ch] font-display text-[clamp(2.8rem,6vw,4.7rem)] font-normal leading-[1] tracking-[-0.025em]">
                Public data from real shopping questions.
              </h1>
            </div>
            <div>
              <p className="max-w-[58ch] text-[18px] leading-[1.72] text-black/66">
                See the questions we asked, which AI assistants answered, and
                which brands they named. Download the same observations as JSON
                or CSV.
              </p>
              <p className="mt-5 text-[14px] leading-relaxed text-black/54">
                Public research only. No customer store or private merchant data
                is included.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-b border-black/18 bg-ground-2">
        <div className="mx-auto max-w-[92rem] px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
          <Reveal>
            <div className="grid gap-10 border-y-2 border-ink-deep py-8 lg:grid-cols-[minmax(18rem,0.7fr)_minmax(0,1.3fr)] lg:gap-16 lg:py-10">
              <div>
                <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-signal-ink">
                  Current public dataset
                </p>
                <h2 className="mt-5 max-w-[16ch] font-display text-[clamp(2rem,3.4vw,3.2rem)] font-normal leading-[1.05]">
                  AI Shopping Report · {BENCHMARK_RUN.askedOn}
                </h2>
                <Link
                  href="/benchmarks"
                  className="mt-7 inline-flex min-h-11 items-center gap-2 text-[14px] font-semibold underline decoration-black/25 underline-offset-6 hover:decoration-signal-ink"
                >
                  Browse the report
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>

              <div>
                <div className="grid grid-cols-2 border-l border-t border-black/18 sm:grid-cols-4">
                  {[
                    [BENCHMARK_RUN.questions, "shopping questions"],
                    [BENCHMARK_RUN.engines.length, "AI assistants"],
                    [BENCHMARK_RUN.answersCompleted, "completed answers"],
                    [BENCHMARK_RUN.namings, "brand appearances"],
                  ].map(([value, label]) => (
                    <div
                      key={label}
                      className="border-b border-r border-black/18 bg-white px-4 py-5"
                    >
                      <p className="font-mono text-[22px] font-semibold tabular-nums text-ink-deep">
                        {value}
                      </p>
                      <p className="mt-1 text-[12px] leading-[1.45] text-black/54">
                        {label}
                      </p>
                    </div>
                  ))}
                </div>

                <p className="mt-6 max-w-[66ch] text-[15px] leading-[1.7] text-black/64">
                  The same {BENCHMARK_RUN.questions} shopping questions were asked
                  across {BENCHMARK_RUN.engines.join(", ")}. The files keep the
                  question, date, assistants that answered, brand name, and which
                  assistants named that brand.
                </p>
              </div>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-px border border-black/18 bg-black/18 md:grid-cols-2">
            {DOWNLOADS.map(({ title, detail, href, label, Icon }) => (
              <article key={title} className="bg-white p-6 sm:p-7">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center bg-ink-deep text-signal">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <h2 className="text-[19px] font-semibold">{title}</h2>
                </div>
                <p className="mt-4 max-w-[48ch] text-[14px] leading-[1.65] text-black/60">
                  {detail}
                </p>
                <a
                  href={href}
                  className="mt-6 inline-flex min-h-11 items-center gap-2 text-[14px] font-semibold text-signal-ink underline decoration-signal-ink/30 underline-offset-6 hover:decoration-signal-ink"
                >
                  {label}
                  {title === "CSV" ? (
                    <Download className="h-4 w-4" aria-hidden="true" />
                  ) : (
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  )}
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="method" className="border-b border-black/18 bg-white">
        <div className="mx-auto grid max-w-[92rem] gap-12 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[minmax(16rem,0.55fr)_minmax(0,1.45fr)] lg:gap-20 lg:px-10 lg:py-24">
          <div>
            <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.12em] text-signal-ink">
              What the data means
            </p>
            <h2 className="mt-5 max-w-[15ch] font-display text-[clamp(2.1rem,3.2vw,3rem)] font-normal leading-[1.06]">
              Simple observations, with the date attached.
            </h2>
          </div>
          <div className="grid gap-px border border-black/16 bg-black/16 sm:grid-cols-2">
            {[
              ["Same question", "Each assistant gets the same shopping question."],
              ["Completed answers", "Only assistants that returned a completed answer are counted."],
              ["Brands named", "We record which brands appeared in each answer."],
              ["Point in time", "AI answers can change, so every observation keeps its date."],
              ["Not a ranking", "A brand appearance is not a score, endorsement, or guaranteed placement."],
              ["No private data", "The published dataset contains public-brand observations only."],
            ].map(([title, detail]) => (
              <div key={title} className="bg-ground px-5 py-5">
                <h3 className="text-[15px] font-semibold">{title}</h3>
                <p className="mt-2 text-[13px] leading-[1.6] text-black/58">{detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink-deep text-white">
        <div className="mx-auto grid max-w-[92rem] gap-8 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:px-10">
          <div>
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-signal">
              Building an AI shopping agent?
            </p>
            <h2 className="mt-4 max-w-[24ch] font-display text-[clamp(2rem,3vw,3rem)] font-normal leading-[1.06]">
              See the machine-readable Beseam resources in one place.
            </h2>
          </div>
          <Link
            href="/agents"
            className="inline-flex min-h-12 items-center justify-center gap-2 bg-signal-ink px-6 text-[14px] font-semibold text-white"
          >
            For AI shopping agents
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  );
}
