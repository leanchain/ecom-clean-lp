"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import AnimatedBorderContainer from "@/components/ui/animated-border-container";
import { Input } from "@/components/ui/input";
import { TypingAnimation } from "@/components/typing-animation";

const capsules = [
  "Schema markup fixed",
  "Geo-tags for local intent",
  "Metadata tuned for AI",
];

const platforms = [
  { name: "Google", logo: "/images/ai-platforms/google.svg" },
  { name: "ChatGPT", logo: "/images/ai-platforms/chatgpt.svg" },
  { name: "Gemini", logo: "/images/ai-platforms/gemini.svg" },
  { name: "AI Mode", logo: "/images/ai-platforms/ai-mode.svg" },
  { name: "Claude", logo: "/images/ai-platforms/claude.svg" },
  { name: "Perplexity", logo: "/images/ai-platforms/perplexity.svg" },
  { name: "Meta AI", logo: "/images/ai-platforms/meta.svg" },
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
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/60 px-4 py-1.5 text-xs font-semibold text-muted-foreground">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-success" />
            Prepare Your Store for AI Search
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="space-y-6"
        >
          <h1 className="font-heading text-foreground max-w-4xl text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl">
            Prepare your store for
            <br />
            <span className="text-primary">AI Search &amp; LLMs.</span>
          </h1>

          <p className="text-muted-foreground/90 mx-auto max-w-2xl text-lg leading-relaxed md:text-xl">
            Beseam automatically fixes your schema markup, geo-tags, and
            metadata so your catalog is structured for AI discovery before
            ranking gaps turn into lost demand.
          </p>
        </motion.div>

        {/* <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-3"
        >
          {capsules.map((item) => (
            <span
              key={item}
              className="rounded-full border border-border bg-muted/60 px-4 py-1.5 text-sm font-medium text-foreground/80"
            >
              {item}
            </span>
          ))}
        </motion.div> */}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex items-center gap-2 text-sm font-medium text-muted-foreground/70"
        >
          <span className="text-[10px] uppercase tracking-widest text-muted-foreground/50">
            User:
          </span>
          <TypingAnimation
            words={[
              "best linen summer dress under $80",
              "running sneakers wide toe box free returns",
              "eco water bottle fast shipping under $40",
              "minimalist leather wallet slim profile",
              "kids birthday gift under $50",
            ]}
            typingSpeed={65}
            deletingSpeed={32}
            delayBetweenWords={2500}
          />
        </motion.div>

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
          Free AI-readiness report for 10 products · No credit card · 2 minutes
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-4 flex flex-col items-center gap-4 pt-2"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-muted-foreground/50">
            Prepare your store for
          </p>
          <div className="flex flex-wrap items-center justify-center gap-5">
            {platforms.map((platform) => (
              <div
                key={platform.name}
                className="flex flex-col items-center gap-1.5"
              >
                <Image
                  src={platform.logo}
                  alt={platform.name}
                  width={32}
                  height={32}
                  title={platform.name}
                  className="h-8 w-8 object-contain"
                />
                <span className="text-[9px] font-medium text-muted-foreground/50">
                  {platform.name}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
