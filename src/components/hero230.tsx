"use client";

import React from "react";
import { Shield, GitBranch, Activity, RotateCcw } from "lucide-react";
import { TypingAnimation } from "@/components/typing-animation";
import { AnalyzerInput } from "@/components/sections/analyzer-input";

import { motion } from "framer-motion";

const Hero230 = () => {
  const [loadingReport, setLoadingReport] = React.useState(false);

  const handleExampleReport = async (e: React.MouseEvent) => {
    e.preventDefault();
    setLoadingReport(true);
    try {
      const apiBase =
        process.env.NEXT_PUBLIC_API_URL || "https://app.beseam.com/api";
      const res = await fetch(`${apiBase}/pdp/public/pdp-audit/latest`);
      if (res.ok) {
        const data = await res.json();
        const id = data?.audit_id;
        if (id) {
          window.open(`https://app.beseam.com/report/${id}`, "_blank");
          return;
        }
      }
    } catch {
      // fall through to demo
    } finally {
      setLoadingReport(false);
    }
    // fallback: open the static demo report
    window.open("https://app.beseam.com/report/-1", "_blank");
  };

  return (
    <section className="relative overflow-hidden pt-24 pb-16 md:pt-32 md:pb-24 lg:pt-40 lg:pb-32">
      {/* Background glow effect */}
      <div className="absolute left-1/2 top-0 -z-10 h-[600px] w-[800px] -translate-x-1/2 bg-primary/5 blur-[120px] rounded-full" />
      <div className="absolute right-0 top-1/4 -z-10 h-[400px] w-[400px] bg-secondary/5 blur-[100px] rounded-full" />

      <div className="container relative flex flex-col items-center justify-center gap-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="space-y-6"
        >
          <h1 className="font-heading text-foreground max-w-4xl text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl">
            Audit, upgrade, and safeguard
            <br />
            <span className="text-primary">every product page</span>
          </h1>

          <p className="text-muted-foreground/90 mx-auto max-w-2xl text-lg md:text-xl leading-relaxed">
            Beseam continuously audits your PDPs, generates AI-powered
            recommendations, and alerts you when something changes — then
            deploys fixes safely and rolls back if KPIs dip.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          {/* Typing animation for positioning */}
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground/70">
            <span className="uppercase tracking-widest text-[10px]">
              Think:
            </span>
            <span className="text-foreground">
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
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-6 mb-2 w-full flex justify-center"
        >
          <AnalyzerInput />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          {/* Secondary link */}
          <button
            onClick={handleExampleReport}
            disabled={loadingReport}
            className="text-sm font-semibold text-muted-foreground hover:text-primary transition-all underline underline-offset-4 decoration-muted-foreground/30 hover:decoration-primary/50 disabled:opacity-60 disabled:cursor-wait"
          >
            {loadingReport ? "Loading…" : "See an example report"}
          </button>
        </motion.div>

        {/* Product pillars */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4 max-w-4xl w-full"
        >
          {[
            {
              icon: Shield,
              label: "Audit & Monitor",
              sub: "Continuous checks & recommendations",
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
              className="group flex flex-col items-center gap-3 rounded-2xl border bg-card/50 p-5 transition-all hover:bg-card hover:shadow-lg hover:-translate-y-1"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                <pillar.icon className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-foreground">
                  {pillar.label}
                </h3>
                <p className="text-[11px] leading-tight text-muted-foreground">
                  {pillar.sub}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export { Hero230 };
