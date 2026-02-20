"use client";

import React from "react";
import {
  ClipboardCheck,
  Wand2,
  Rocket,
  Shield,
  Stethoscope,
  GraduationCap,
} from "lucide-react";

const agents = [
  {
    name: "Audit Agent",
    description:
      "Scores every PDP and identifies gaps with evidence. Produces a baseline quality report across AI visibility, conversion readiness, and performance.",
    icon: ClipboardCheck,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    name: "Generator Agent",
    description:
      "Produces upgrade assets — schema, FAQ sections, product narratives, media prompts — all within your brand constraints and style guidelines.",
    icon: Wand2,
    color: "text-violet-500",
    bg: "bg-violet-500/10",
  },
  {
    name: "Deploy Agent",
    description:
      "Applies changes in a reversible way with full versioning. Manages staged rollouts — 1 PDP first, then scale when KPIs confirm success.",
    icon: Rocket,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
  {
    name: "Guardrail Agent",
    description:
      "Watches KPIs continuously after every deployment. Triggers incidents when rev/session, checkout-start, or conversion rate regress.",
    icon: Shield,
    color: "text-amber-500",
    bg: "bg-amber-500/10",
  },
  {
    name: "Diagnosis Agent",
    description:
      "Links regressions to specific change diffs. Provides evidence of what caused the drop and suggests rollback or remediation.",
    icon: Stethoscope,
    color: "text-rose-500",
    bg: "bg-rose-500/10",
  },
  {
    name: "Learning Agent",
    description:
      "Updates playbooks, templates, and priors based on outcomes. Your system gets smarter per category and brand over time.",
    icon: GraduationCap,
    color: "text-cyan-500",
    bg: "bg-cyan-500/10",
  },
];

const AiTestPreview = () => {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-background to-muted/30">
      <div className="container">
        <div className="mx-auto max-w-5xl">
          {/* Header */}
          <div className="mb-12 text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary mb-4">
              <Wand2 className="h-4 w-4" />
              AI-Native Architecture
            </div>
            <h2 className="mb-4 text-3xl font-bold md:text-5xl">
              Six Specialized Agents. One Closed Loop.
            </h2>
            <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
              Beseam&apos;s AI isn&apos;t a chatbot writing copy. It&apos;s a system of
              specialized agents that handle the full upgrade-and-protect
              lifecycle autonomously.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {agents.map((agent, idx) => (
              <div
                key={idx}
                className="group flex flex-col rounded-2xl border bg-card p-6 shadow-sm transition-all hover:shadow-md hover:-translate-y-1"
              >
                <div
                  className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${agent.bg}`}
                >
                  <agent.icon className={`h-6 w-6 ${agent.color}`} />
                </div>
                <h3 className="mb-2 text-lg font-bold text-foreground">
                  {agent.name}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {agent.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AiTestPreview;
