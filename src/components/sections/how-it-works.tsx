"use client";

import React from "react";

const steps = [
  {
    number: "01",
    title: "Audit & Recommend",
    description:
      "Connect your store and get a baseline PDP quality report. Beseam identifies gaps and generates upgrade recommendations — or your agency brings their own improvements.",
    bullets: [
      "Get a baseline score for AI visibility, conversion readiness, and performance.",
      "AI generates prioritized upgrade playbooks you can review or hand to your agency.",
      "Agencies and internal teams can bring their own changes too — all welcome.",
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

const HowItWorks = () => {
  return (
    <section className="bg-muted/30 py-20 md:py-32">
      <div className="container">
        <div className="mb-12 text-center md:mb-16">
          <h2 className="mb-4 text-3xl font-bold md:text-5xl">
            How Beseam Works
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg md:text-xl">
            Upgrade your PDPs, deploy with confidence, and protect your revenue
            — in three steps.
          </p>
        </div>

        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-start">
              <StepVisual index={index} />
              <div className="text-secondary mb-1 text-3xl font-semibold tracking-tight md:text-4xl">
                {step.number}
              </div>
              <h3 className="mb-1 text-lg font-semibold md:text-xl">
                {step.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed md:text-base">
                {step.description}
              </p>
              <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
                {step.bullets?.map((item, bulletIndex) => (
                  <li key={bulletIndex} className="flex gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
