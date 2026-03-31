"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, AlertTriangle, AlertCircle, Info } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Severity = "critical" | "high" | "medium";

export interface Finding {
  title: string;
  severity: Severity;
  description: string;
  fix: string;
}

const severityConfig: Record<
  Severity,
  { icon: LucideIcon; label: string; color: string; bg: string }
> = {
  critical: {
    icon: AlertTriangle,
    label: "CRITICAL",
    color: "text-red-600",
    bg: "bg-red-50 dark:bg-red-950/30",
  },
  high: {
    icon: AlertCircle,
    label: "HIGH",
    color: "text-amber-600",
    bg: "bg-amber-50 dark:bg-amber-950/30",
  },
  medium: {
    icon: Info,
    label: "MEDIUM",
    color: "text-sky-600",
    bg: "bg-sky-50 dark:bg-sky-950/30",
  },
};

function FindingItem({ finding }: { finding: Finding }) {
  const [open, setOpen] = useState(false);
  const config = severityConfig[finding.severity];
  const Icon = config.icon;

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-background transition-shadow hover:shadow-sm">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center gap-3 px-5 py-4 text-left"
      >
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${config.color} ${config.bg}`}
        >
          <Icon className="h-3 w-3" />
          {config.label}
        </span>
        <span className="flex-1 text-sm font-semibold text-foreground">
          {finding.title}
        </span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="border-t border-border/50 px-5 py-4">
              <p className="text-sm leading-relaxed text-muted-foreground">
                {finding.description}
              </p>
              <div className="mt-3">
                <p className="mb-1.5 text-xs font-bold uppercase tracking-wider text-emerald-600">
                  Fix
                </p>
                <pre className="overflow-x-auto rounded-lg bg-[#0d0d0d] p-4 text-xs leading-relaxed text-emerald-400">
                  <code>{finding.fix}</code>
                </pre>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function SampleFindings({ findings }: { findings: Finding[] }) {
  return (
    <div className="space-y-3">
      {findings.map((f) => (
        <FindingItem key={f.title} finding={f} />
      ))}
    </div>
  );
}
