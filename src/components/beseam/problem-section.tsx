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
    title: "Better AI visibility",
    description:
      "Products start appearing in AI shopping recommendations once the signals AI agents rely on are present and correct.",
    metric: "13",
    metricLabel: "AI engines tracked",
  },
  {
    icon: Wrench,
    title: "Faster time to fix",
    description:
      "Go from finding issues to publishing fixes in one workflow — no spreadsheets, no manual handoffs, no waiting on dev cycles.",
    metric: "118+",
    metricLabel: "checks per audit",
  },
  {
    icon: Shield,
    title: "Ongoing protection",
    description:
      "Continuous monitoring catches regressions after catalog updates, theme changes, or feed syncs — before they affect traffic.",
    metric: "24/7",
    metricLabel: "monitoring",
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
            AI shopping surfaces are the fastest-growing channel for product
            discovery. Stores with clean, structured data get recommended.
            Stores without it stay invisible.
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
