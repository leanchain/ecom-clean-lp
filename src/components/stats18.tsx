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
