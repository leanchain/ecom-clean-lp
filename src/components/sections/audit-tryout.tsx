"use client";

import { ArrowRight, ShieldCheck, BarChart2, Sparkles } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const AuditTryout = () => {
  return (
    <section className="relative overflow-hidden bg-muted/30 py-20 md:py-32">
      {/* Background glow */}
      <div className="pointer-events-none absolute left-1/4 top-1/2 -z-10 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-primary/5 blur-[120px]" />
      <div className="pointer-events-none absolute right-1/4 bottom-0 -z-10 h-[400px] w-[400px] rounded-full bg-secondary/5 blur-[100px]" />

      <div className="container relative">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">

          {/* Left: text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div>
              <p className="text-primary mb-3 text-sm font-semibold uppercase tracking-wider">
                Free Baseline Audit
              </p>
              <h2 className="font-heading text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
                Know exactly where your PDPs stand{" "}
                <span className="text-primary italic">before</span> making changes.
              </h2>
            </div>

            <p className="text-muted-foreground text-lg leading-relaxed max-w-xl">
              Get a comprehensive baseline report for any product page.
              Understand AI visibility, conversion readiness, and performance
              gaps - so every improvement starts from solid ground.
            </p>

            <ul className="space-y-3">
              {[
                "AI visibility score across all major search platforms",
                "Conversion readiness assessment with prioritized fixes",
                "Performance baseline for monitoring regressions later",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-muted-foreground/90">
                  <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary/10 border border-primary/20">
                    <ShieldCheck className="h-2.5 w-2.5 text-primary" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                href="https://app.beseam.com/analyze"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition hover:-translate-y-0.5 hover:bg-primary/90"
              >
                Get Your Baseline Report <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/reports"
                className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-semibold text-foreground transition hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary"
              >
                See Recent Reports
              </Link>
            </div>
          </motion.div>

          {/* Right: mockup card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div className="overflow-hidden rounded-2xl border border-border/60 bg-background shadow-2xl ring-1 ring-border/30">
              {/* Title bar */}
              <div className="flex items-center gap-1.5 border-b border-border/40 bg-muted/20 px-4 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-300/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
                <div className="ml-3 flex items-center gap-1 rounded-md bg-background/70 border border-border/40 px-3 py-1 mx-auto">
                  <span className="text-[9px] text-muted-foreground/40 font-medium">beseam.io/audit/</span>
                  <span className="text-[9px] font-black text-primary">baseline</span>
                </div>
                <div className="flex items-center gap-1.5 ml-2">
                  <span className="flex h-1.5 w-1.5 relative">
                    <span className="animate-ping absolute inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500 opacity-60" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  </span>
                  <span className="text-[8px] font-black uppercase tracking-widest text-emerald-600">Live</span>
                </div>
              </div>

              {/* Card body */}
              <div className="p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-black text-foreground">PDP Quality Baseline</h3>
                    <p className="text-[11px] text-muted-foreground/60">alpine-pro-jacket · Just analyzed</p>
                  </div>
                  <span className="flex items-center gap-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 px-2.5 py-1 text-[10px] font-black text-indigo-600">
                    <Sparkles className="size-3" /> 62 / 100
                  </span>
                </div>

                <div className="space-y-3 rounded-xl border border-border/40 bg-muted/30 p-4">
                  {[
                    { label: "AI Visibility", pct: 85, color: "bg-emerald-500", status: "Good", statusColor: "text-emerald-600 bg-emerald-500/10" },
                    { label: "Conversion Readiness", pct: 55, color: "bg-amber-500", status: "Needs Work", statusColor: "text-amber-600 bg-amber-500/10" },
                    { label: "Performance & Structure", pct: 40, color: "bg-red-400", status: "Gaps Found", statusColor: "text-red-600 bg-red-500/10" },
                  ].map((row) => (
                    <div key={row.label}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[12px] font-semibold text-foreground">{row.label}</span>
                        <span className={`rounded-full px-2 py-0.5 text-[9px] font-black ${row.statusColor}`}>{row.status}</span>
                      </div>
                      <div className="h-1.5 w-full rounded-full bg-muted">
                        <div className={`h-full rounded-full ${row.color}`} style={{ width: `${row.pct}%` }} />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="rounded-xl border border-border/40 bg-muted/20 p-4 space-y-2.5">
                  <div className="flex items-center gap-2 mb-3">
                    <BarChart2 className="h-3.5 w-3.5 text-primary" />
                    <p className="text-[11px] font-black uppercase tracking-widest text-muted-foreground/60">Recommended Playbook</p>
                  </div>
                  {[
                    "Add FAQ section with schema.org markup",
                    "Generate deep product narrative (benefits, use cases)",
                    "Deploy staged rollout - monitor 48h before scaling",
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2.5 rounded-lg bg-background/60 border border-border/30 px-3 py-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                      <span className="text-[11px] font-semibold text-foreground/90">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AuditTryout;
