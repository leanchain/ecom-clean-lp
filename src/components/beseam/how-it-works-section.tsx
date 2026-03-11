"use client";

import { Search, Sparkles, Rocket } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Scan",
    description:
      "Connect your store and get a clear AI-readiness baseline in minutes.",
    bullets: [
      "Visibility score for schema, metadata, and geo-tags.",
      "Prioritized issues with a clear next step.",
    ],
  },
  {
    number: "02",
    icon: Sparkles,
    title: "Fix",
    description:
      "AI drafts the fixes, and your team reviews the changes before publish.",
    bullets: [
      "One-click fixes for structured data gaps.",
      "Review diffs before anything goes live.",
    ],
  },
  {
    number: "03",
    icon: Rocket,
    title: "Push & Verify",
    description:
      "Push approved fixes to Shopify, then verify they render correctly.",
    bullets: [
      "Live checks confirm the markup is visible to bots.",
      "Monitoring catches regressions after future changes.",
    ],
  },
];

function StepVisual({ index }: { index: number }) {
  if (index === 0) {
    return (
      <div className="mb-4 flex h-[184px] w-full flex-col justify-between rounded-2xl bg-muted px-4 py-3">
        <div className="mb-3 flex flex-wrap gap-2">
          <span className="rounded-full bg-background px-3 py-1 text-[11px] font-medium text-foreground/80">
            Product scan
          </span>
          <span className="rounded-full bg-background px-3 py-1 text-[11px] font-medium text-foreground/80">
            Schema
          </span>
          <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-[11px] font-medium text-emerald-600">
            AI-ready score
          </span>
          <span className="rounded-full border border-border px-3 py-1 text-[11px] text-muted-foreground">
            Geo-tags
          </span>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-muted-foreground">Structured Data</span>
            <span className="font-medium text-emerald-500">81/100</span>
          </div>
          <div className="h-2 w-full rounded-full bg-background/70">
            <div className="h-2 w-[81%] rounded-full bg-emerald-500" />
          </div>
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-muted-foreground">AI Discoverability</span>
            <span className="font-medium text-amber-500">58/100</span>
          </div>
          <div className="h-2 w-full rounded-full bg-background/70">
            <div className="h-2 w-[58%] rounded-full bg-amber-500" />
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between text-[11px] text-muted-foreground">
          <span>4 issues prioritized</span>
          <span className="rounded-full bg-primary px-2 py-0.5 font-medium text-primary-foreground">
            Open report
          </span>
        </div>
      </div>
    );
  }

  if (index === 1) {
    return (
      <div className="mb-4 flex h-[184px] w-full flex-col justify-between rounded-2xl bg-muted px-4 py-3">
        <div className="flex items-center gap-2 text-[11px]">
          <span className="rounded-full bg-background px-2 py-0.5 font-medium text-foreground/80">
            draft → approved
          </span>
          <span className="text-muted-foreground">review queue</span>
        </div>
        <div className="my-2 space-y-2">
          <div className="flex items-center gap-2 text-[11px]">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span className="text-muted-foreground">
              + Product JSON-LD completed
            </span>
          </div>
          <div className="flex items-center gap-2 text-[11px]">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span className="text-muted-foreground">
              + Availability and price synced
            </span>
          </div>
          <div className="flex items-center gap-2 text-[11px]">
            <span className="h-2 w-2 rounded-full bg-amber-500" />
            <span className="text-muted-foreground">
              ~ Meta description rewritten
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-[11px]">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span className="text-muted-foreground">3 fixes queued</span>
          </div>
          <span className="rounded-full bg-background px-2 py-0.5 text-[11px] font-medium text-foreground/80">
            Review diff
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-4 flex h-[184px] w-full flex-col justify-between rounded-2xl bg-muted px-4 py-3">
      <div className="flex items-center justify-between text-[11px]">
        <span className="rounded-full bg-background px-2 py-0.5 font-medium text-foreground/80">
          Live verification
        </span>
        <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 font-medium text-emerald-600">
          Passed
        </span>
      </div>
      <div className="my-2 space-y-2">
        <div className="flex items-center justify-between text-[11px]">
          <span className="text-muted-foreground">Schema rendered</span>
          <span className="font-medium text-emerald-500">Yes</span>
        </div>
        <div className="flex items-center justify-between text-[11px]">
          <span className="text-muted-foreground">Price visible to bots</span>
          <span className="font-medium text-emerald-500">Synced</span>
        </div>
        <div className="flex items-center justify-between text-[11px]">
          <span className="text-muted-foreground">Regression watch</span>
          <span className="font-medium text-emerald-500">On</span>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-[11px] text-muted-foreground">
          Post-publish checked in 2m
        </span>
        <span className="rounded-full bg-primary px-2 py-0.5 text-[11px] font-semibold text-primary-foreground">
          Monitor store
        </span>
      </div>
    </div>
  );
}

export default function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden bg-muted/30 px-4 py-24 sm:px-6 md:py-32"
    >
      <div className="absolute left-1/2 top-1/2 -z-10 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[120px]" />

      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center md:mb-24"
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">
            How It Works
          </p>
          <h2 className="font-heading text-foreground mb-6 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
            AI-ready in three steps.
            <br />
            Prepared, pushed, and verified.
          </h2>
          <p className="text-muted-foreground/90 mx-auto max-w-xl text-lg leading-relaxed md:text-xl">
            Scan the gaps, fix them fast, and verify the result on your live
            store.
          </p>
        </motion.div>

        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-3">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.18, duration: 0.6 }}
              className="group flex flex-col items-start"
            >
              <div className="mb-8 w-full transform transition-all duration-300 group-hover:scale-[1.02]">
                <StepVisual index={i} />
              </div>
              <div className="font-heading text-secondary mb-3 text-4xl font-bold tracking-tight opacity-20 transition-opacity group-hover:opacity-40 md:text-5xl lg:text-6xl">
                {step.number}
              </div>
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10">
                  <step.icon className="h-4.5 w-4.5 text-primary" />
                </div>
                <h3 className="font-heading text-xl font-bold text-foreground md:text-2xl">
                  {step.title}
                </h3>
              </div>
              <p className="text-muted-foreground mb-5 max-w-sm text-base leading-relaxed">
                {step.description}
              </p>
              <ul className="mt-auto space-y-2.5">
                {step.bullets.map((item) => (
                  <li
                    key={item}
                    className="text-muted-foreground/90 flex gap-3 text-sm leading-snug"
                  >
                    <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
