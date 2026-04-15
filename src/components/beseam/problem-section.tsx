"use client";

import { motion } from "framer-motion";
import { Eye, Wrench, Shield } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface ValueProp {
  icon: LucideIcon;
  title: string;
  description: string;
  metric: string;
  metricLabel: string;
}

const valueProps: ValueProp[] = [
  {
    icon: Eye,
    title: "More complete product answers",
    description:
      "When AI can reliably extract price, reviews, shipping, attributes, and availability, your products are easier to compare and recommend.",
    metric: "Buyer-ready",
    metricLabel: "product signals",
  },
  {
    icon: Wrench,
    title: "Less manual cleanup",
    description:
      "Your team sees the highest-impact issues first and can publish fixes without turning every improvement into a dev project.",
    metric: "Fewer",
    metricLabel: "handoffs",
  },
  {
    icon: Shield,
    title: "Fewer regressions",
    description:
      "Theme edits, feed changes, and catalog updates can undo good work. Monitoring catches that drift before it quietly costs discovery.",
    metric: "Always-on",
    metricLabel: "regression checks",
  },
];

export default function ProblemSection() {
  return (
    <section className="bg-background px-4 py-20 sm:px-6 md:py-28">
      <div className="container max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">
            Why it matters
          </p>
          <h2 className="font-heading text-3xl font-bold tracking-tight md:text-5xl">
            What changes{" "}
            <span className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
              for your store.
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
            Better AI visibility is not just about being indexed. It is about
            giving AI enough product detail to mention your store with confidence
            when buyers compare options.
          </p>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-3">
          {valueProps.map((prop, index) => (
            <motion.div
              key={prop.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
              className="flex flex-col rounded-2xl border border-border bg-background p-7 transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <prop.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-foreground">
                {prop.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                {prop.description}
              </p>
              <div className="mt-5 rounded-xl bg-muted/30 px-4 py-3">
                <span className="text-2xl font-black text-foreground">
                  {prop.metric}
                </span>
                <span className="ml-2 text-xs font-medium text-muted-foreground">
                  {prop.metricLabel}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
