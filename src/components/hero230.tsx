"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  Play,
  Shield,
  GitBranch,
  Activity,
  RotateCcw,
} from "lucide-react";

import AnimatedBorderButton from "@/components/animated-border-button";
import { TypingAnimation } from "@/components/typing-animation";
import { Button } from "@/components/ui/button";

const Hero230 = () => {
  return (
    <section className="pt-20 pb-16">
      <div className="container flex flex-col items-center justify-center gap-4 text-center">
        <h1 className="font-heading text-foreground max-w-4xl text-4xl md:text-5xl lg:text-6xl">
          Every PDP change.
          <br />
          Guardrailed on revenue.
        </h1>

        <p className="text-muted-foreground/80 mt-3 max-w-2xl text-base md:text-lg">
          Whether changes come from your SEO agency, dev team, or Beseam&apos;s
          own AI recommendations — every update is versioned, monitored, and
          reversible. Ship PDP improvements from any source without risking
          conversion.
        </p>

        {/* Typing animation for positioning */}
        <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
          <span>Think:</span>
          <span className="font-semibold text-foreground">
            <TypingAnimation
              words={[
                "Guardrails for every PDP change",
                "Your agency ships, we protect revenue",
                "AI recommendations + safe deploy",
                "Rollback when KPIs dip",
              ]}
              typingSpeed={80}
              deletingSpeed={40}
              delayBetweenWords={2500}
            />
          </span>
        </div>

        {/* CTA Buttons */}
        <div className="mt-8 mb-6 flex flex-col items-center gap-4 sm:flex-row">
          <AnimatedBorderButton
            asChild
            className="h-14 px-8 text-lg cursor-pointer [&_svg]:transition-transform hover:[&_svg]:translate-x-0.5"
          >
            <Link href="https://app.beseam.com/analyze">
              Run Free PDP Audit <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </AnimatedBorderButton>

          <Button
            asChild
            variant="outline"
            size="lg"
            className="h-14 rounded-full px-8 text-base"
          >
            <Link href="/demo">
              <Play className="mr-2 h-4 w-4" />
              Watch Demo
            </Link>
          </Button>
        </div>

        {/* Product pillars - visual summary */}
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4 max-w-3xl w-full">
          {[
            {
              icon: Shield,
              label: "Audit & Recommend",
              sub: "AI-powered upgrade playbooks",
            },
            {
              icon: GitBranch,
              label: "Version & Deploy",
              sub: "Any source, safely shipped",
            },
            {
              icon: Activity,
              label: "Monitor KPIs",
              sub: "Revenue guardrails, always on",
            },
            {
              icon: RotateCcw,
              label: "Diagnose & Rollback",
              sub: "Pinpoint cause, recover fast",
            },
          ].map((pillar, i) => (
            <div
              key={i}
              className="flex flex-col items-center gap-2 rounded-2xl border bg-muted/30 p-4"
            >
              <pillar.icon className="h-5 w-5 text-primary" />
              <span className="text-sm font-semibold text-foreground">
                {pillar.label}
              </span>
              <span className="text-xs text-muted-foreground">
                {pillar.sub}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Hero230 };
