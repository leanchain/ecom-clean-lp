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
    title: "Mission & Journey Diagnostics",
    description:
      "See which shopping missions are healthy and which are leaking revenue. Track drop-offs from ad click to purchase.",
  },
  {
    icon: Link2,
    title: "Linked Page Issues",
    description:
      "Every weak journey is traced back to the specific PDP or landing page causing the problem. No guessing which page to fix.",
  },
  {
    icon: Sparkles,
    title: "AI-Generated Fixes",
    description:
      "Get concrete, reviewable fixes for schema, meta descriptions, structured data, and content gaps — generated automatically.",
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
      "After fixes go live, Beseam re-scans and shows you exactly what improved — with evidence you can share with your team.",
  },
  {
    icon: CheckCircle2,
    title: "Guided Pilot Support",
    description:
      "This isn't a self-serve dashboard you'll forget about. Each pilot is operator-assisted, so you get results — not another login.",
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
            One workflow.{" "}
            <span className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent italic">
              Real outcomes.
            </span>
          </h2>
          <p className="mt-4 mx-auto max-w-2xl text-base leading-relaxed text-muted-foreground">
            Beseam connects the full loop: from diagnosing weak journeys, to
            generating and publishing fixes, to verifying what actually
            improved.
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
