"use client";

import { motion } from "framer-motion";
import {
  Route,
  Link2,
  Sparkles,
  Upload,
  GitCompareArrows,
  CheckCircle2,
} from "lucide-react";

const outcomes = [
  {
    icon: Route,
    title: "AI Store Audit",
    description:
      "See a clear score for how well AI agents understand each product page — across schema, content, structured data, and selling points.",
  },
  {
    icon: Link2,
    title: "AI Traffic Intelligence",
    description:
      "Track which AI engines send shoppers to your store — ChatGPT, Gemini, Perplexity, and 10+ more — with per-engine session and revenue data.",
  },
  {
    icon: Sparkles,
    title: "AI-Generated Fixes",
    description:
      "Get targeted fixes for the exact issues blocking AI from understanding your products: schema gaps, missing selling points, ambiguous pricing.",
  },
  {
    icon: Upload,
    title: "Shopify Publish",
    description:
      "Approve a fix, and it publishes directly to your Shopify store. One click. Rollback protection built in.",
  },
  {
    icon: GitCompareArrows,
    title: "Before / After Verification",
    description:
      "After fixes go live, Beseam re-runs the AI probe and shows exactly how your scores improved — with evidence for every engine.",
  },
  {
    icon: CheckCircle2,
    title: "13 AI Engines Tracked",
    description:
      "From ChatGPT and Gemini to Perplexity, Claude, Meta AI, Grok, and more — know exactly which AI engines send traffic and how they see your products.",
  },
];

export default function OutcomesSection() {
  return (
    <section className="bg-muted/30 px-4 py-20 sm:px-6 md:py-32">
      <div className="container max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className="text-primary mb-3 text-sm font-semibold uppercase tracking-wider">
            What You Get
          </p>
          <h2 className="font-heading text-3xl font-bold tracking-tight md:text-5xl">
            One platform.{" "}
            <span className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent italic">
              See it. Fix it. Verify it.
            </span>
          </h2>
          <p className="mt-4 mx-auto max-w-2xl text-base leading-relaxed text-muted-foreground">
            Beseam connects the full loop: from showing you how AI reads your
            products, to generating and publishing fixes, to verifying AI now
            recommends you.
          </p>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {outcomes.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.07 * index, duration: 0.5 }}
              className="flex flex-col rounded-2xl border border-border bg-background p-7 transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              <item.icon className="mb-4 h-8 w-8 text-emerald-600" />
              <h3 className="text-base font-bold text-foreground">
                {item.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
