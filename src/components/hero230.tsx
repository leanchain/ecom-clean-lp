"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { TypingAnimation } from "@/components/typing-animation";
import { AnalyzerInput } from "@/components/sections/analyzer-input";

import { motion } from "framer-motion";

const platforms = [
  { name: "Google", logo: "/images/ai-platforms/google.svg" },
  { name: "ChatGPT", logo: "/images/ai-platforms/chatgpt.svg" },
  { name: "Gemini", logo: "/images/ai-platforms/gemini.svg" },
  { name: "AI Mode", logo: "/images/ai-platforms/ai-mode.svg" },
  { name: "Claude", logo: "/images/ai-platforms/claude.svg" },
  { name: "Perplexity", logo: "/images/ai-platforms/perplexity.svg" },
  { name: "Meta AI", logo: "/images/ai-platforms/meta.svg" },
];

const Hero230 = () => {
  const exampleReportHref = `/reports`;

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
            Ship PDP changes
            <br />
            <span className="text-primary">without revenue risk</span>
          </h1>

          <p className="text-muted-foreground/90 mx-auto max-w-2xl text-lg md:text-xl leading-relaxed">
            Optimize PDPs for AI search discovery and conversion — then deploy
            every change safely with versioning, KPI guardrails, and automatic
            rollback.
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
                  "Get found on ChatGPT, Perplexity, AI Mode",
                  "Lift conversion. Protect what you gain.",
                  "Guardrails for every PDP change",
                  "Your agency ships, we protect revenue",
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
          transition={{ delay: 0.55 }}
        >
          {/* Secondary link */}
          <Link
            href={exampleReportHref}
            className="text-sm font-semibold text-muted-foreground hover:text-primary transition-all underline underline-offset-4 decoration-muted-foreground/30 hover:decoration-primary/50"
          >
            See example reports
          </Link>
        </motion.div>

        {/* AI platform icons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex flex-col items-center gap-4 pt-2"
        >
          <p className="text-[11px] uppercase tracking-widest font-semibold text-muted-foreground/50">
            Optimizes visibility for
          </p>
          <div className="flex items-center gap-5 flex-wrap justify-center">
            {platforms.map((p) => (
              <div key={p.name} className="flex flex-col items-center gap-1.5">
                <Image
                  src={p.logo}
                  alt={p.name}
                  width={32}
                  height={32}
                  title={p.name}
                  className="h-8 w-8 object-contain"
                />
                <span className="text-[9px] text-muted-foreground/50 font-medium">
                  {p.name}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export { Hero230 };
