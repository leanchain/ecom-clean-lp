"use client";

import { useState } from "react";

import { ChevronDown } from "lucide-react";

type Severity = "critical" | "high" | "medium";

export interface Finding {
  title: string;
  severity: Severity;
  description: string;
  fix: string;
}

const SEVERITY: Record<Severity, { label: string; className: string }> = {
  critical: { label: "Critical", className: "text-[#b3261e]" },
  high: { label: "High", className: "text-[#a8621a]" },
  medium: { label: "Medium", className: "text-black/45" },
};

function FindingItem({ finding, index }: { finding: Finding; index: number }) {
  const [open, setOpen] = useState(false);
  const severity = SEVERITY[finding.severity];

  return (
    <article className="border-b border-black/18">
      <h3>
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          className="grid w-full grid-cols-[2.5rem_1fr_1.25rem] items-start gap-4 py-6 text-left sm:grid-cols-[2.5rem_6rem_1fr_1.25rem]"
        >
          <span className="font-mono text-[10px] text-black/38">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span
            className={`hidden font-mono text-[10px] font-semibold uppercase tracking-[0.1em] sm:block ${severity.className}`}
          >
            {severity.label}
          </span>
          <span className="text-[16px] font-semibold leading-snug text-black/82">
            <span
              className={`mb-1 block font-mono text-[10px] font-semibold uppercase tracking-[0.1em] sm:hidden ${severity.className}`}
            >
              {severity.label}
            </span>
            {finding.title}
          </span>
          <ChevronDown
            aria-hidden="true"
            className={`mt-1 h-4 w-4 shrink-0 text-black/40 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          />
        </button>
      </h3>
      {open ? (
        <div className="pb-7 sm:pl-[8.5rem]">
          <p className="max-w-2xl text-[14px] leading-relaxed text-black/62">
            {finding.description}
          </p>
          <p className="mt-6 font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-[#3154ff]">
            Proposed fix
          </p>
          <pre className="mt-3 overflow-x-auto border border-black/20 bg-[#111318] p-4 text-[12px] leading-relaxed text-white/78">
            <code>{finding.fix}</code>
          </pre>
        </div>
      ) : null}
    </article>
  );
}

export default function SampleFindings({ findings }: { findings: Finding[] }) {
  return (
    <div className="border-t border-black/22">
      {findings.map((finding, index) => (
        <FindingItem key={finding.title} finding={finding} index={index} />
      ))}
    </div>
  );
}
