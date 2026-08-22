"use client";

import React from "react";

import Link from "next/link";

import { X, Check, ArrowRight } from "lucide-react";

const rows = [
  {
    scenario: "Your PDPs aren't showing up in ChatGPT or Perplexity",
    without:
      "No visibility into why. No structured data, no FAQ schema, no framework for AI readiness.",
    with: "AI visibility score + prioritized schema fixes. See exactly what's missing for each platform.",
    pillar: "Discovery",
  },
  {
    scenario: "Knowing which PDP changes actually lift conversion",
    without:
      "Deploy and hope. Wait weeks for analytics to show anything meaningful.",
    with: "Per-change KPI window tied to each update. Know the impact of every improvement.",
    pillar: "Conversion",
  },
  {
    scenario: "Revenue drops after a deploy",
    without: "No idea which change caused it. Check analytics in a week.",
    with: "Regression traced to exact change within hours.",
    pillar: "Safety",
  },
  {
    scenario: "Rolling back a bad change",
    without: "Dev sprint. Coordinating agency. Days of delay.",
    with: "One-click rollback to any previous version.",
    pillar: "Safety",
  },
  {
    scenario: "3 vendors pushing PDP changes",
    without: "No shared history. Finger-pointing when something breaks.",
    with: "One versioned pipeline. Clear attribution for every change.",
    pillar: "Safety",
  },
];

const Compare2 = () => {
  return (
    <section className="py-20 md:py-32 bg-muted/30">
      <div className="container">
        <div className="mx-auto max-w-5xl">
          {/* Header */}
          <div className="mb-12 text-center">
            <p className="text-primary mb-3 text-sm font-semibold uppercase tracking-wider">
              Why teams switch
            </p>
            <h2 className="font-heading mb-4 text-3xl font-bold tracking-tight md:text-5xl">
              The alternative is guesswork,
              <br />a spreadsheet, and a post-mortem.
            </h2>
            <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
              Without Beseam: no AI visibility, no conversion attribution, and
              you find out something broke in next week&apos;s report.
            </p>
          </div>

          {/* Comparison table */}
          <div className="rounded-3xl border bg-card overflow-hidden shadow-sm">
            {/* Header row */}
            <div className="grid grid-cols-[1fr_1fr_1fr] border-b bg-muted/30">
              <div className="p-5 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Scenario
              </div>
              <div className="p-5 border-l text-xs font-bold uppercase tracking-wider text-destructive/70 flex items-center gap-1.5">
                <X className="h-3.5 w-3.5" /> Without Beseam
              </div>
              <div className="p-5 border-l text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5" /> With Beseam
              </div>
            </div>

            {/* Data rows */}
            {rows.map((row, i) => (
              <div
                key={i}
                className={`grid grid-cols-[1fr_1fr_1fr] ${i < rows.length - 1 ? "border-b" : ""}`}
              >
                <div className="p-5 text-sm font-semibold text-foreground">
                  <span
                    className={`mb-2 inline-block rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                      row.pillar === "Discovery"
                        ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40"
                        : row.pillar === "Conversion"
                          ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40"
                          : "bg-amber-50 text-amber-600 dark:bg-amber-950/40"
                    }`}
                  >
                    {row.pillar}
                  </span>
                  <div>{row.scenario}</div>
                </div>
                <div className="p-5 border-l text-sm text-muted-foreground bg-destructive/3 leading-relaxed">
                  {row.without}
                </div>
                <div className="p-5 border-l text-sm text-foreground bg-primary/4 leading-relaxed font-medium">
                  {row.with}
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-4">
              Free baseline audit. No credit card. Setup in under 15 minutes.
            </p>
            <Link
              href="/demo"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:-translate-y-0.5 hover:bg-primary/90"
            >
              See It In Action <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Compare2 };
