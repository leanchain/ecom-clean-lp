"use client";

import React from "react";
import { GitBranch, Package, MoveRight, ChevronRight } from "lucide-react";
import CategoryBadge from "@/components/category-badge";
import Image from "next/image";
import {
  ClipboardCheck,
  Wand2,
  Radar,
  MessageSquareWarning,
  Scale,
  RotateCcw,
  Brain,
} from "lucide-react";

const loopSteps = [
  {
    icon: ClipboardCheck,
    label: "Audit",
    description:
      "Baseline + priorities across AI visibility, conversion readiness, and performance.",
    color: "text-secondary",
    bg: "bg-muted/40",
  },
  {
    icon: Wand2,
    label: "Enhance",
    description:
      "Use Beseam's AI recommendations, your agency's strategy, or your own ideas — all welcome.",
    color: "text-violet-500",
    bg: "bg-muted/40",
  },
  {
    icon: GitBranch,
    label: "Deploy",
    description:
      "Ship changes from any source safely — versioned, diffed, and reversible.",
    color: "text-primary",
    bg: "bg-muted/40",
  },
  {
    icon: Radar,
    label: "Guardrails",
    description:
      "Monitor KPIs after every deploy (rev/session, checkout-start, CVR). Alert on regressions — no matter who made the change.",
    color: "text-amber-500",
    bg: "bg-muted/40",
  },
  {
    icon: MessageSquareWarning,
    label: "Diagnose",
    description:
      "Rank the most likely cause using the change log + evidence — no more guesswork.",
    color: "text-primary",
    bg: "bg-muted/40",
  },
  {
    icon: RotateCcw,
    label: "Act",
    description:
      "One-click rollback (where possible) or a guided fix plan to recover quickly.",
    color: "text-emerald-500",
    bg: "bg-muted/40",
  },
  {
    icon: Brain,
    label: "Learn",
    description:
      "Outcomes train smarter playbooks: what to ship next, and what to avoid.",
    color: "text-cyan-500",
    bg: "bg-muted/40",
  },
];

const platforms = [
  { name: "Search", logo: "/images/ai-platforms/google.svg" },
  { name: "ChatGPT", logo: "/images/ai-platforms/chatgpt.svg" },
  { name: "Gemini", logo: "/images/ai-platforms/gemini.svg" },
  { name: "AI Mode", logo: "/images/ai-platforms/ai-mode.svg" },
  { name: "Claude", logo: "/images/ai-platforms/claude.svg" },
  { name: "Perplexity", logo: "/images/ai-platforms/perplexity.svg" },
  { name: "Meta AI", logo: "/images/ai-platforms/meta.svg" },
];

const Stats18 = () => {
  return (
    <section id="the-loop" className="overflow-hidden pt-20 pb-32">
      <div className="container px-4">
        <div className="mb-12 text-center">
          <div className="mx-auto mb-4 flex justify-center">
            <CategoryBadge
              label="The Beseam Loop"
              icon={<Package className="h-4 w-4" />}
            />
          </div>
          <h2 className="relative py-2 text-center font-sans text-4xl font-semibold tracking-tighter lg:text-5xl">
            One loop for every PDP change
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl px-5 text-center text-sm lg:text-base">
            Your SEO agency pushes new copy. Your dev team ships a theme update.
            Beseam generates AI-powered upgrades. No matter where the change
            comes from, the same loop audits, deploys safely, monitors KPIs, and
            rolls back if revenue dips.
          </p>
        </div>

        {/* Loop Steps */}
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {loopSteps.slice(0, 4).map((step, i) => (
              <div
                key={i}
                className="relative flex flex-col items-center rounded-2xl border bg-card p-6 text-center"
              >
                <div
                  className={`mb-3 flex h-12 w-12 items-center justify-center rounded-xl ${step.bg}`}
                >
                  <step.icon className={`h-6 w-6 ${step.color}`} />
                </div>
                <h3 className="mb-1 text-lg font-bold">{step.label}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
                {i < 3 && (
                  <div className="absolute -right-5 top-1/2 hidden -translate-y-1/2 text-muted-foreground/30 lg:block">
                    <ChevronRight className="h-6 w-6 stroke-[1.5]" />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {loopSteps.slice(4).map((step, i) => (
              <div
                key={i}
                className="relative flex flex-col items-center rounded-2xl border bg-card p-6 text-center"
              >
                <div
                  className={`mb-3 flex h-12 w-12 items-center justify-center rounded-xl ${step.bg}`}
                >
                  <step.icon className={`h-6 w-6 ${step.color}`} />
                </div>
                <h3 className="mb-1 text-lg font-bold">{step.label}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
                {i < 2 && (
                  <div className="absolute -right-6 top-1/2 hidden -translate-y-1/2 text-muted-foreground/30 lg:block">
                    <ChevronRight className="h-6 w-6 stroke-[1.5]" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Feedback arrow */}
          <div className="mx-auto mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              className="text-primary"
            >
              <path
                d="M10 17V3M10 3l-4 4M10 3l4 4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="font-medium text-primary">
              Outcomes feed back into smarter recommendations — for your team,
              your agencies, and Beseam&apos;s AI
            </span>
          </div>
        </div>

        {/* AI Platforms logos */}
        <div className="mx-auto mt-16 max-w-2xl text-center">
          <p className="text-muted-foreground text-sm md:text-base">
            Beseam ensures your PDPs are optimized for discovery across all
            major AI search platforms and stays on guard after every change.
          </p>
        </div>
        <div className="mx-auto mt-12 max-w-5xl">
          <h3 className="text-muted-foreground mb-8 text-center text-sm font-semibold uppercase tracking-wider">
            Optimize Discovery for
          </h3>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-7">
            {platforms.map((platform) => (
              <div key={platform.name} className="space-y-2 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center">
                  <Image
                    alt={platform.name}
                    className="h-full w-full object-contain"
                    src={platform.logo}
                    width={64}
                    height={64}
                  />
                </div>
                <h3 className="text-foreground text-sm font-semibold">
                  {platform.name}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export { Stats18 };
