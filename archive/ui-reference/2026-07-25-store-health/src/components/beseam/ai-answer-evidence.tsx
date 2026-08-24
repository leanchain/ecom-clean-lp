import Image from "next/image";

import { AlertTriangle, ArrowUpRight, CircleCheck } from "lucide-react";

const RESULTS = [
  {
    position: "01",
    product: "Northpeak Storm",
    merchant: "Marketplace",
    active: false,
  },
  {
    position: "03",
    product: "Aster Trail",
    merchant: "Your store",
    active: true,
  },
];

const SOURCES = [
  {
    name: "Outdoor Lab",
    src: "/images/ai-platforms/perplexity.svg",
  },
  {
    name: "Brand product page",
    src: "/images/ai-platforms/chatgpt.svg",
  },
];

export default function AiAnswerEvidence() {
  return (
    <div
      role="img"
      aria-label="Illustrative AI answer evidence showing a competitor ranked ahead of the merchant product, cited sources, and a recommended action"
      className="overflow-hidden border border-rule bg-panel text-ink shadow-[0_24px_70px_rgba(18,24,39,0.08)]"
    >
      <div className="flex items-center justify-between border-b border-rule px-5 py-4">
        <div>
          <p className="text-[13px] font-semibold">Answer evidence</p>
          <p className="mt-0.5 text-[11px] text-muted-foreground">
            Perplexity · United States · Jul 18
          </p>
        </div>
        <span className="rounded-full bg-amber-100 px-3 py-1.5 text-[11px] font-semibold text-amber-800">
          Competitor leads
        </span>
      </div>

      <div className="grid lg:grid-cols-[minmax(0,1.1fr)_minmax(15rem,0.9fr)]">
        <div className="p-5 sm:p-7">
          <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
            Buyer question
          </p>
          <p className="mt-3 max-w-xl text-[20px] font-semibold leading-snug sm:text-[24px]">
            What are the best waterproof trail shoes for daily use?
          </p>

          <div className="mt-7 border-y border-rule">
            {RESULTS.map((result) => (
              <div
                key={result.product}
                className="grid grid-cols-[2.5rem_1fr_auto] items-center gap-3 border-b border-rule py-4 last:border-b-0"
              >
                <span className="font-mono text-[12px] text-muted-foreground">
                  {result.position}
                </span>
                <div>
                  <p className="text-[14px] font-semibold">{result.product}</p>
                  <p className="mt-0.5 text-[11px] text-muted-foreground">
                    {result.merchant}
                  </p>
                </div>
                {result.active ? (
                  <span className="rounded-full border border-rule px-2.5 py-1 text-[10px] font-semibold text-primary">
                    Your product
                  </span>
                ) : (
                  <ArrowUpRight
                    className="h-4 w-4 text-muted-foreground"
                    aria-hidden="true"
                  />
                )}
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-start gap-3 bg-brand/10 p-4">
            <AlertTriangle
              className="mt-0.5 h-4 w-4 shrink-0 text-primary"
              aria-hidden="true"
            />
            <div>
              <p className="text-[12px] font-semibold">
                Why the competitor won
              </p>
              <p className="mt-1 text-[13px] leading-relaxed text-foreground">
                Its waterproofing claim is repeated across two cited sources.
                Your product page mentions the membrane but not the outcome.
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-rule bg-surface p-5 lg:border-l lg:border-t-0">
          <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
            Sources used
          </p>
          <div className="mt-4 space-y-3">
            {SOURCES.map((source) => (
              <div
                key={source.name}
                className="flex items-center gap-3 border-b border-rule pb-3"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-rule bg-panel">
                  <Image
                    src={source.src}
                    alt=""
                    width={16}
                    height={16}
                    aria-hidden="true"
                  />
                </span>
                <span className="text-[13px] font-semibold">{source.name}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 border-t border-rule pt-5">
            <CircleCheck
              className="h-5 w-5 text-emerald-600"
              aria-hidden="true"
            />
            <p className="mt-3 text-[12px] font-semibold">Recommended action</p>
            <p className="mt-1 text-[13px] leading-relaxed text-foreground">
              Strengthen the waterproofing claim on four product pages and
              verify the next answer run.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
