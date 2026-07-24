import Link from "next/link";

import { CheckCircle2 } from "lucide-react";

import AiAnswerEvidence from "@/components/beseam/ai-answer-evidence";
import { Reveal } from "@/components/beseam/reveal";

const OUTCOMES = [
  "Monitor the questions buyers ask",
  "Compare product position and citations",
  "Open the exact answer behind every change",
];

export default function AiVisibilitySection() {
  return (
    <section
      id="ai-visibility"
      className="scroll-mt-20 border-t border-rule bg-background"
    >
      <div className="section-pad mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.68fr)_minmax(0,1.32fr)] lg:gap-16">
          <Reveal>
            <p className="text-[14px] font-semibold text-primary">
              AI Visibility
            </p>
            <h2 className="editorial-heading mt-4 text-ink">
              Know why a competitor won the answer.
            </h2>
            <p className="mt-5 max-w-lg text-[17px] leading-relaxed text-foreground">
              Track the buyer questions that matter, then see your position,
              cited sources, and the reason behind every result.
            </p>

            <ul className="mt-7 space-y-3">
              {OUTCOMES.map((outcome) => (
                <li
                  key={outcome}
                  className="flex items-center gap-3 text-[14px] font-semibold text-ink"
                >
                  <CheckCircle2
                    className="h-4 w-4 shrink-0 text-primary"
                    aria-hidden="true"
                  />
                  {outcome}
                </li>
              ))}
            </ul>

            <Link
              href="/ai-visibility-monitoring"
              className="mt-8 inline-flex min-h-11 items-center font-semibold text-ink underline-offset-4 hover:text-primary hover:underline"
            >
              Explore AI Visibility →
            </Link>
          </Reveal>

          <Reveal delay={0.06} y={18}>
            <AiAnswerEvidence />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
