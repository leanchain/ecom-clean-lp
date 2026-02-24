"use client";

import React from "react";

const steps = [
  {
    number: "01",
    title: "Audit, Monitor & Recommend",
    description:
      "Connect your store and get a baseline PDP quality report. Beseam then continuously monitors your pages — when something changes or a new gap appears, you get alerted with prioritized fixes.",
    bullets: [
      "Baseline scores for AI visibility, conversion readiness, and performance.",
      "Continuous monitoring — get weekly reports and instant alerts when pages degrade.",
      "AI generates prioritized upgrade playbooks you can review or hand to your agency.",
    ],
  },
  {
    number: "02",
    title: "Deploy Through Beseam",
    description:
      "Whether the change comes from your agency, dev team, or Beseam's AI — every update is versioned, diffed, and deployed safely.",
    bullets: [
      "One pipeline for all PDP changes — agencies, internal, and AI-generated.",
      "Staged rollout: apply to 1 PDP, then 10, then your whole catalog.",
      "Full diff view with source attribution (who changed what, and when).",
    ],
  },
  {
    number: "03",
    title: "Monitor & Protect Revenue",
    description:
      "Guardrails watch KPIs after every change. If revenue dips, Beseam pinpoints which change caused it — and who made it.",
    bullets: [
      "Track rev/session, checkout-start rate, and conversion continuously.",
      "Get alerted when a regression is detected — with the change and source identified.",
      "One-click rollback or guided remediation. Your agency gets visibility too.",
    ],
  },
];

const StepVisual = ({ index }: { index: number }) => {
  if (index === 0) {
    return (
      <div className="mb-4 flex h-[184px] w-full flex-col justify-between rounded-2xl bg-muted px-4 py-3">
        <div className="mb-3 flex flex-wrap gap-2">
          <span className="bg-background text-foreground/80 rounded-full px-3 py-1 text-[11px] font-medium">
            Audit
          </span>
          <span className="bg-background text-foreground/80 rounded-full px-3 py-1 text-[11px] font-medium">
            Score
          </span>
          <span className="bg-emerald-500/15 text-emerald-600 rounded-full px-3 py-1 text-[11px] font-medium">
            Monitoring
          </span>
          <span className="border-border text-muted-foreground rounded-full border px-3 py-1 text-[11px]">
            Playbook
          </span>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-muted-foreground">AI Visibility</span>
            <span className="text-emerald-500 font-medium">85/100</span>
          </div>
          <div className="bg-background/70 h-2 w-full rounded-full">
            <div className="bg-emerald-500 h-2 w-[85%] rounded-full" />
          </div>
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-muted-foreground">Conversion Ready</span>
            <span className="text-amber-500 font-medium">52/100</span>
          </div>
          <div className="bg-background/70 h-2 w-full rounded-full">
            <div className="bg-amber-500 h-2 w-[52%] rounded-full" />
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between text-[11px] text-muted-foreground">
          <span>3 upgrades recommended</span>
          <span className="bg-primary text-primary-foreground rounded-full px-2 py-0.5 font-medium">
            View Playbook
          </span>
        </div>
      </div>
    );
  }

  if (index === 1) {
    return (
      <div className="mb-4 flex h-[184px] w-full flex-col justify-between rounded-2xl bg-muted px-4 py-3">
        <div className="flex items-center gap-2 text-[11px]">
          <span className="bg-background text-foreground/80 rounded-full px-2 py-0.5 font-medium">
            v2.1 → v2.2
          </span>
          <span className="text-muted-foreground">staged rollout</span>
        </div>
        <div className="space-y-2 my-2">
          <div className="flex items-center gap-2 text-[11px]">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span className="text-muted-foreground">+ FAQ section with schema</span>
          </div>
          <div className="flex items-center gap-2 text-[11px]">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span className="text-muted-foreground">+ Deep product narrative</span>
          </div>
          <div className="flex items-center gap-2 text-[11px]">
            <span className="h-2 w-2 rounded-full bg-amber-500" />
            <span className="text-muted-foreground">~ Updated meta description</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-[11px]">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span className="text-muted-foreground">1 of 1 PDPs deployed</span>
          </div>
          <span className="bg-background text-foreground/80 rounded-full px-2 py-0.5 text-[11px] font-medium">
            Monitoring...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-4 flex h-[184px] w-full flex-col justify-between rounded-2xl bg-muted px-4 py-3">
      <div className="flex items-center justify-between text-[11px]">
        <span className="bg-background text-foreground/80 rounded-full px-2 py-0.5 font-medium">
          Live Monitoring
        </span>
        <span className="bg-emerald-500/15 text-emerald-600 rounded-full px-2 py-0.5 font-medium">
          All Clear
        </span>
      </div>
      <div className="my-2 space-y-2">
        <div className="flex items-center justify-between text-[11px]">
          <span className="text-muted-foreground">Rev/Session</span>
          <span className="text-emerald-500 font-medium">+12% ↑</span>
        </div>
        <div className="flex items-center justify-between text-[11px]">
          <span className="text-muted-foreground">Checkout Start</span>
          <span className="text-emerald-500 font-medium">+8% ↑</span>
        </div>
        <div className="flex items-center justify-between text-[11px]">
          <span className="text-muted-foreground">Conversion Rate</span>
          <span className="text-emerald-500 font-medium">+5% ↑</span>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-[11px] text-muted-foreground">48h post-deploy</span>
        <span className="bg-primary text-primary-foreground rounded-full px-2 py-0.5 text-[11px] font-semibold">
          Scale to catalog
        </span>
      </div>
    </div>
  );
};

import { motion } from "framer-motion";

const HowItWorks = () => {
  return (
    <section className="relative overflow-hidden bg-muted/30 py-24 md:py-32">
      {/* Background glow effect */}
      <div className="absolute left-1/2 top-1/2 -z-10 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 bg-primary/5 blur-[120px] rounded-full" />

      <div className="container relative">
        <div className="mb-16 text-center md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-heading mb-6 text-4xl font-bold md:text-5xl lg:text-6xl tracking-tight">
              How it works
            </h2>
            <p className="text-muted-foreground/90 mx-auto max-w-2xl text-lg md:text-xl leading-relaxed">
              From audit to auto-rollback in three steps. A closed-loop system designed for safety and scale.
            </p>
          </motion.div>
        </div>

        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-3">
          {steps.map((step, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              className="group flex flex-col items-start"
            >
              <div className="w-full mb-8 transform transition-all duration-300 group-hover:scale-[1.02]">
                <StepVisual index={index} />
              </div>
              <div className="font-heading text-secondary mb-3 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl opacity-20 transition-opacity group-hover:opacity-40">
                {step.number}
              </div>
              <h3 className="font-heading mb-3 text-xl font-bold md:text-2xl text-foreground">
                {step.title}
              </h3>
              <p className="text-muted-foreground text-base leading-relaxed mb-6">
                {step.description}
              </p>
              <ul className="mt-auto space-y-3">
                {step.bullets?.map((item, bulletIndex) => (
                  <li key={bulletIndex} className="flex gap-3 text-sm text-muted-foreground/90 leading-snug">
                    <div className="mt-1.5 flex h-1.5 w-1.5 shrink-0 items-center justify-center rounded-full bg-primary" />
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
};

export default HowItWorks;
