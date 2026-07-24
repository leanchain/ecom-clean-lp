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
    name: "Enhancer Agent",
    description:
      "Produces upgrade assets - schema, FAQ sections, product narratives, media prompts - all within your brand constraints and style guidelines.",
    icon: Wand2,
    color: "text-violet-500",
    bg: "bg-violet-500/10",
  },
  {
    name: "Deploy Agent",
    description:
      "Applies changes in a reversible way with full versioning. Manages staged rollouts - 1 PDP first, then scale when KPIs confirm success.",
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
    <section className="relative overflow-hidden py-24 md:py-32 bg-gradient-to-b from-background to-muted/50">
      {/* Background glow effects */}
      <div className="absolute left-0 top-1/4 -z-10 h-[500px] w-[500px] bg-primary/5 blur-[120px] rounded-full" />
      <div className="absolute right-0 bottom-1/4 -z-10 h-[500px] w-[500px] bg-secondary/5 blur-[120px] rounded-full" />

      <div className="container relative">
        <div className="mx-auto max-w-5xl">
          {/* Header */}
          <div className="mb-16 text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary mb-6 shadow-sm border border-primary/20">
              <Wand2 className="h-4 w-4" />
              AI-Native Architecture
            </div>
            <h2 className="font-heading mb-6 text-3xl font-bold md:text-5xl lg:text-6xl tracking-tight">
              Six Specialized Agents.{" "}
              <span className="text-primary italic">One Closed Loop.</span>
            </h2>
            <p className="text-muted-foreground/90 mx-auto max-w-2xl text-lg md:text-xl leading-relaxed">
              Beseam&apos;s AI isn&apos;t a chatbot writing copy. It&apos;s a
              system of specialized agents that handle the full
              upgrade-and-protect lifecycle autonomously.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {agents.map((agent, idx) => (
              <div
                key={idx}
                className="group flex flex-col rounded-3xl border bg-card/80 backdrop-blur-sm p-8 shadow-sm transition-all hover:shadow-xl hover:-translate-y-2 hover:border-primary/20"
              >
                <div
                  className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl ${agent.bg} transition-all duration-300 group-hover:scale-110 shadow-sm`}
                >
                  <agent.icon className={`h-7 w-7 ${agent.color}`} />
                </div>
                <h3 className="font-heading mb-3 text-xl font-bold text-foreground">
                  {agent.name}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-4">
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
