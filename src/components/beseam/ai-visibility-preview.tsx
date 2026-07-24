import Image from "next/image";

import {
  AlertTriangle,
  ArrowUpRight,
  CheckCircle2,
  Eye,
  ShieldCheck,
  UserRoundCheck,
} from "lucide-react";

import { cn } from "@/lib/utils";

const ENGINES = [
  { name: "ChatGPT", src: "/images/ai-platforms/chatgpt.svg" },
  { name: "Gemini", src: "/images/ai-platforms/gemini.svg" },
  { name: "Perplexity", src: "/images/ai-platforms/perplexity.svg" },
  { name: "Claude", src: "/images/ai-platforms/claude.svg" },
];

const METRICS = [
  {
    label: "Visibility",
    value: "42%",
    detail: "of monitored AI answers",
    icon: Eye,
    tone: "text-[#4f46e5]",
  },
  {
    label: "Accuracy",
    value: "86%",
    detail: "product facts are correct",
    icon: ShieldCheck,
    tone: "text-[#059669]",
  },
  {
    label: "Control",
    value: "71%",
    detail: "you are credited as seller",
    icon: UserRoundCheck,
    tone: "text-[#d97706]",
  },
];

type AiVisibilityPreviewProps = {
  compact?: boolean;
  className?: string;
};

export default function AiVisibilityPreview({
  compact = false,
  className,
}: AiVisibilityPreviewProps) {
  return (
    <div
      role="img"
      aria-label="Illustrative Beseam AI visibility dashboard showing a 42 percent visibility rate, an upward trend, accuracy and merchant control metrics, and monitored AI answer engines"
      className={cn(
        "flex h-full flex-col bg-[#f8fafc] text-[#172033]",
        compact ? "p-4 sm:p-5" : "p-5 sm:p-7",
        className,
      )}
    >
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#dbe2ec] pb-4">
        <div>
          <p className="text-[12px] font-semibold text-[#172033]">
            AI visibility
          </p>
          <p className="mt-0.5 text-[10px] text-[#64748b]">
            Illustrative workspace data
          </p>
        </div>
        <div className="flex items-center gap-1.5">
          {ENGINES.map((engine) => (
            <span
              key={engine.name}
              title={engine.name}
              className="flex h-7 w-7 items-center justify-center rounded-full border border-[#dbe2ec] bg-white"
            >
              <Image
                src={engine.src}
                alt=""
                width={15}
                height={15}
                aria-hidden="true"
              />
            </span>
          ))}
        </div>
      </div>

      <div
        className={cn(
          "grid flex-1 gap-5 pt-5",
          compact
            ? "xl:grid-cols-[0.75fr_1.25fr]"
            : "sm:grid-cols-[0.78fr_1.22fr]",
        )}
      >
        <div className="flex flex-col justify-between">
          <div>
            <p className="text-[11px] font-medium text-[#64748b]">
              Products appearing in relevant AI answers
            </p>
            <div className="mt-2 flex flex-wrap items-end gap-2">
              <span className="text-[42px] font-semibold leading-none tracking-[-0.03em] tabular-nums">
                42%
              </span>
              <span className="mb-1 inline-flex items-center gap-1 rounded-full bg-[#dcfce7] px-2 py-1 text-[10px] font-semibold text-[#047857]">
                <ArrowUpRight className="h-3 w-3" aria-hidden="true" />8 pts vs
                last check
              </span>
            </div>
            <p className="mt-3 text-[12px] leading-relaxed text-[#475569]">
              Your products are showing up more often, but one high-intent
              product is still being outranked.
            </p>
          </div>

          {!compact ? (
            <div className="mt-5 border-t border-[#dbe2ec] pt-4">
              <div className="flex items-start gap-2">
                <AlertTriangle
                  className="mt-0.5 h-4 w-4 shrink-0 text-[#d97706]"
                  aria-hidden="true"
                />
                <div>
                  <p className="text-[11px] font-semibold">Needs attention</p>
                  <p className="mt-1 text-[11px] leading-relaxed text-[#64748b]">
                    A competitor holds the top citation for 3 buying questions.
                  </p>
                </div>
              </div>
            </div>
          ) : null}
        </div>

        <div
          className={cn(
            "border-l-0 border-[#dbe2ec]",
            compact ? "xl:border-l xl:pl-5" : "sm:border-l sm:pl-5",
          )}
        >
          <div className="flex items-center justify-between text-[10px] text-[#64748b]">
            <span>Visibility trend</span>
            <span>Last 30 days</span>
          </div>
          <svg
            viewBox="0 0 360 150"
            className={cn("mt-2 w-full", compact ? "h-28" : "h-36")}
            aria-hidden="true"
          >
            <path d="M12 28H348M12 74H348M12 120H348" stroke="#dbe2ec" />
            <path
              d="M12 112 C48 108, 58 94, 92 98 S142 82, 174 86 S224 58, 256 64 S302 38, 348 32"
              fill="none"
              stroke="#4f46e5"
              strokeWidth="4"
              strokeLinecap="round"
            />
            {[
              ["12", "112"],
              ["92", "98"],
              ["174", "86"],
              ["256", "64"],
              ["348", "32"],
            ].map(([cx, cy]) => (
              <circle
                key={cx}
                cx={cx}
                cy={cy}
                r="4"
                fill="#ffffff"
                stroke="#4f46e5"
                strokeWidth="3"
              />
            ))}
          </svg>
          <div className="flex justify-between text-[9px] text-[#94a3b8]">
            <span>Jun 19</span>
            <span>Jul 19</span>
          </div>
        </div>
      </div>

      <div
        className={cn(
          "mt-5 grid border-t border-[#dbe2ec]",
          compact ? "grid-cols-3" : "sm:grid-cols-3",
        )}
      >
        {METRICS.map((metric, index) => (
          <div
            key={metric.label}
            className={cn(
              "pt-4",
              index > 0
                ? "border-l border-[#dbe2ec] pl-3 sm:pl-4"
                : "pr-3 sm:pr-4",
            )}
          >
            <div className="flex items-center gap-1.5">
              <metric.icon
                className={cn("h-3.5 w-3.5", metric.tone)}
                aria-hidden="true"
              />
              <span className="text-[10px] font-semibold text-[#64748b]">
                {metric.label}
              </span>
            </div>
            <p
              className={cn(
                "mt-2 text-[20px] font-semibold tabular-nums",
                metric.tone,
              )}
            >
              {metric.value}
            </p>
            {!compact ? (
              <p className="mt-1 text-[9px] leading-snug text-[#64748b]">
                {metric.detail}
              </p>
            ) : null}
          </div>
        ))}
      </div>

      {!compact ? (
        <div className="mt-5 flex items-center gap-2 border-t border-[#dbe2ec] pt-4 text-[11px] text-[#475569]">
          <CheckCircle2 className="h-4 w-4 text-[#059669]" aria-hidden="true" />
          Every metric links back to the prompt, answer, cited sources, and
          competitors.
        </div>
      ) : null}
    </div>
  );
}
