"use client";

import React from "react";
import { GitBranch, Shield, ArrowRight } from "lucide-react";
import Link from "next/link";

const Compare2 = () => {
  return (
    <section className="py-20 md:py-32 bg-muted/30">
      <div className="container">
        <div className="mx-auto max-w-5xl">
          {/* Header */}
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-5xl">
              Every Change, Revenue-Protected
            </h2>
            <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
              Your SEO agency ships new copy. Your dev team pushes a theme
              update. You apply Beseam&apos;s AI recommendations. Every change —
              regardless of source — goes through the same guardrails.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {/* Mechanism 1: Versioning */}
            <div className="rounded-3xl border bg-card p-8 shadow-sm">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                <GitBranch className="h-7 w-7 text-primary" />
              </div>
              <h3 className="mb-3 text-xl font-bold">
                Versioning + Reversible Deployment
              </h3>
              <p className="mb-6 text-sm text-muted-foreground leading-relaxed">
                Every PDP change — whether from your agency, dev team, or
                Beseam&apos;s AI — is isolated, tracked, and reversible. Full
                history, instant rollback, clear attribution.
              </p>
              <div className="space-y-3">
                {[
                  "Every change gets a version number and full diff",
                  "Changes are isolated — won't affect other PDPs",
                  "One-click rollback to any previous version",
                  "Compare any two versions side-by-side",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                    <span className="text-sm text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>

              {/* Visual: version diff mockup */}
              <div className="mt-6 rounded-xl border bg-muted/50 p-4">
                <div className="flex items-center justify-between mb-3 text-xs">
                  <span className="font-semibold text-foreground">
                    v2.1 → v2.2
                  </span>
                  <span className="text-muted-foreground">Alpine Pro Jacket</span>
                </div>
                <div className="space-y-1.5 text-[11px] font-mono">
                  <div className="rounded bg-emerald-500/10 px-2 py-1 text-emerald-700 dark:text-emerald-400">
                    + FAQ section (5 entries + schema.org)
                  </div>
                  <div className="rounded bg-emerald-500/10 px-2 py-1 text-emerald-700 dark:text-emerald-400">
                    + Product narrative (benefits, use cases)
                  </div>
                  <div className="rounded bg-amber-500/10 px-2 py-1 text-amber-700 dark:text-amber-400">
                    ~ Meta description updated
                  </div>
                </div>
              </div>
            </div>

            {/* Mechanism 2: Guardrails */}
            <div className="rounded-3xl border bg-card p-8 shadow-sm">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10">
                <Shield className="h-7 w-7 text-emerald-500" />
              </div>
              <h3 className="mb-3 text-xl font-bold">
                Guardrails + Staged Rollout
              </h3>
              <p className="mb-6 text-sm text-muted-foreground leading-relaxed">
                When your agency delivers updates or you apply AI
                recommendations, deploy to a small set first. Beseam monitors
                KPIs and only scales when results confirm success.
              </p>
              <div className="space-y-3">
                {[
                  "Apply to 1 PDP first — prove the improvement works",
                  "Monitor rev/session, conversion, and checkout for 24-48h",
                  "Scale to next 10, then to your full catalog",
                  "Auto-alert if any KPI regresses during rollout",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" />
                    <span className="text-sm text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>

              {/* Visual: staged rollout */}
              <div className="mt-6 rounded-xl border bg-muted/50 p-4">
                <div className="mb-3 text-xs font-semibold text-foreground">
                  Staged Rollout Progress
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="h-2 flex-1 rounded-full bg-muted">
                      <div className="h-2 w-full rounded-full bg-emerald-500" />
                    </div>
                    <span className="text-[11px] text-emerald-500 font-medium w-16 text-right">
                      1 PDP ✓
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-2 flex-1 rounded-full bg-muted">
                      <div className="h-2 w-[60%] rounded-full bg-emerald-500" />
                    </div>
                    <span className="text-[11px] text-muted-foreground font-medium w-16 text-right">
                      10 PDPs
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-2 flex-1 rounded-full bg-muted">
                      <div className="h-2 w-0 rounded-full bg-emerald-500" />
                    </div>
                    <span className="text-[11px] text-muted-foreground font-medium w-16 text-right">
                      All PDPs
                    </span>
                  </div>
                </div>
                <div className="mt-3 text-[10px] text-muted-foreground">
                  Monitoring: +8% conv, +12% rev/session — ready to scale
                </div>
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-4">
              Agencies, dev teams, and AI recommendations — all shipping
              through the same guardrailed pipeline.
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
