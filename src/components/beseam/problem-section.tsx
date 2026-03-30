"use client";

import { motion } from "framer-motion";
import { Bot, FileWarning, Eye, TrendingDown } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Problem {
  icon: LucideIcon;
  title: string;
  description: string;
  stat: string;
  statLabel: string;
  tag: string;
}

const problems: Problem[] = [
  {
    icon: Bot,
    title: "AI engines misread your products",
    description:
      "ChatGPT, Gemini, and Perplexity are recommending products to millions of shoppers — but if your pages lack structured data, they guess wrong on price, availability, and selling points.",
    stat: "13+",
    statLabel: "AI engines now driving e-commerce traffic",
    tag: "Visibility Problem",
  },
  {
    icon: FileWarning,
    title: "Pages that humans read fine, AI can't",
    description:
      "Your product pages may look great in a browser, but AI engines parse structured data, schema markup, and metadata — and most stores have critical gaps AI can't work around.",
    stat: "118+",
    statLabel: "checks across schema, content, SEO & AI readability",
    tag: "Readability Problem",
  },
  {
    icon: Eye,
    title: "You can't see what AI sees",
    description:
      "There's no 'View Source' for how ChatGPT understands your product. Without an AI-eye audit, you're invisible to the fastest-growing shopping channel.",
    stat: "Zero",
    statLabel: "visibility into how AI engines perceive your store",
    tag: "Intelligence Problem",
  },
  {
    icon: TrendingDown,
    title: "Competitors are already optimizing for AI",
    description:
      "Stores with rich structured data, clear selling points, and proper schema get recommended first. Every day you wait, AI engines learn to trust competitors more.",
    stat: "3×",
    statLabel: "higher AI recommendation rate with proper structured data",
    tag: "Competitive Problem",
  },
];

export default function ProblemSection() {
  return (
    <section className="bg-background px-4 py-20 sm:px-6 md:py-32">
      <div className="container max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <p className="text-primary mb-3 text-sm font-semibold uppercase tracking-wider">
            The Problem
          </p>
          <h2 className="font-heading text-3xl font-bold tracking-tight md:text-5xl">
            AI is the new storefront.{" "}
            <span className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
              Your products aren&apos;t ready.
            </span>
          </h2>
          <p className="mt-4 mx-auto max-w-2xl text-base leading-relaxed text-muted-foreground">
            AI shopping engines are recommending products to millions.
            If your pages lack the right structured data, AI gets your
            products wrong &mdash; or skips them entirely.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="grid gap-4 sm:grid-cols-2"
        >
          {problems.map((problem, index) => (
            <motion.div
              key={problem.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
              className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-background transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex flex-1 flex-col p-8">
                <problem.icon className="mb-4 h-8 w-8 text-secondary" />

                <h3 className="text-lg font-bold text-foreground leading-snug">
                  {problem.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {problem.description}
                </p>

                <div className="mt-5">
                  <p className="text-2xl font-black tracking-tight text-foreground">
                    {problem.stat}
                  </p>
                  <p className="text-[11px] font-medium text-muted-foreground">
                    {problem.statLabel}
                  </p>
                </div>
              </div>

              <div className="border-t border-secondary/10 bg-secondary/5 px-6 py-3">
                <span className="text-xs font-semibold text-secondary">
                  {problem.tag}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-12 rounded-2xl border border-border bg-muted/30 p-6 md:p-8"
        >
          <div className="flex gap-4">
            <span className="shrink-0 select-none text-4xl font-black leading-none text-muted-foreground/30">
              &ldquo;
            </span>
            <div>
              <blockquote className="text-base font-medium leading-relaxed text-foreground md:text-lg">
                We had no idea ChatGPT was showing the wrong price for our
                best-seller. Customers were confused before they even reached
                our site. We only found out when a customer mentioned it.
              </blockquote>
              <p className="mt-3 text-sm text-muted-foreground">
                Head of Digital &mdash; Shopify Plus brand
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
