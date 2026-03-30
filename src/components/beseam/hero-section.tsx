"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Search, Wrench, CheckCircle2 } from "lucide-react";
import AnimatedBorderContainer from "@/components/ui/animated-border-container";
import { Input } from "@/components/ui/input";

const WORKFLOW_STEPS = [
  { icon: Search, label: "See what AI sees" },
  { icon: Wrench, label: "Fix what they get wrong" },
  { icon: CheckCircle2, label: "Verify improvement" },
];

export default function HeroSection() {
  const [store, setStore] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const cleaned = store.trim().replace(/^https?:\/\//, "");
    if (cleaned) {
      window.location.href = `https://app.beseam.com/store?shop=${encodeURIComponent(cleaned)}`;
    }
  };

  return (
    <section className="relative overflow-hidden px-4 pb-16 pt-24 sm:px-6 md:pt-32 md:pb-24 lg:pt-40 lg:pb-32">
      <div className="absolute left-1/2 top-0 -z-10 h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-primary/5 blur-[120px]" />
      <div className="absolute right-0 top-1/4 -z-10 h-[400px] w-[400px] rounded-full bg-secondary/5 blur-[100px]" />

      <div className="container relative flex flex-col items-center justify-center gap-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="space-y-6"
        >
          <h1 className="font-heading text-foreground max-w-4xl text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl">
            See how AI agents see your store.
            <br />
            <span className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
              Fix what they get wrong.
            </span>
          </h1>

          <p className="text-muted-foreground/90 mx-auto max-w-2xl text-lg leading-relaxed md:text-xl">
            ChatGPT, Gemini, and Perplexity recommend products every day &mdash;
            but they might be misreading yours. Beseam shows you exactly what AI
            agents see on your product pages, finds what they get wrong, and
            fixes it &mdash; so they recommend you, not your competitors.
          </p>
        </motion.div>

        {/* Workflow steps capsules */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-3"
        >
          {WORKFLOW_STEPS.map((step, i) => (
            <span
              key={step.label}
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/60 px-4 py-1.5 text-sm font-medium text-foreground/80"
            >
              <step.icon className="h-3.5 w-3.5 text-primary" />
              {step.label}
              {i < WORKFLOW_STEPS.length - 1 && (
                <ArrowRight className="ml-1 h-3 w-3 text-muted-foreground/40" />
              )}
            </span>
          ))}
        </motion.div>

        {/* Store URL input CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mx-auto mt-2 w-full max-w-xl"
        >
          <AnimatedBorderContainer rounded="full">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-2 rounded-[28px] border bg-background/95 p-2 shadow-lg backdrop-blur transition-all duration-300 hover:shadow-xl focus-within:ring-2 focus-within:ring-primary/20 focus-within:shadow-xl sm:flex-row sm:items-center"
            >
              <Input
                type="text"
                value={store}
                onChange={(e) => setStore(e.target.value)}
                placeholder="yourstore.myshopify.com"
                animate={false}
                className="h-12 flex-1 rounded-full border-0 bg-transparent px-5 text-sm shadow-none focus-visible:border-0 focus-visible:ring-0"
              />
              <button
                type="submit"
                className="flex h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground transition-all hover:-translate-y-0.5 hover:bg-primary/90 active:scale-95"
              >
                Scan Free
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </AnimatedBorderContainer>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-xs text-muted-foreground"
        >
          Free store scan &middot; 13 AI engines tracked &middot; Results in
          minutes
        </motion.p>
      </div>
    </section>
  );
}
