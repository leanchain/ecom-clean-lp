"use client";

import { motion } from "framer-motion";
import { Route, FileWarning, TrendingDown, SearchX } from "lucide-react";
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
    icon: Route,
    title: "Journeys that go nowhere",
    description:
      "Shoppers land from ads, referrals, or AI recommendations — then bounce because the landing page doesn't match the intent they arrived with.",
    stat: "60–70%",
    statLabel: "of shopping journeys end without a conversion",
    tag: "Journey Problem",
  },
  {
    icon: FileWarning,
    title: "PDPs with hidden issues",
    description:
      "Missing structured data, thin descriptions, broken schema, no review markup — problems your analytics dashboard won't surface.",
    stat: "118+",
    statLabel: "checks across SEO, content, schema & feed",
    tag: "Page Problem",
  },
  {
    icon: TrendingDown,
    title: "Fixes that never ship",
    description:
      "Your team knows what's wrong but can't keep up. Audit backlogs grow while pages stay broken and revenue leaks.",
    stat: "Weeks",
    statLabel: "average time from issue found to fix published",
    tag: "Execution Problem",
  },
  {
    icon: SearchX,
    title: "No way to verify improvement",
    description:
      "You publish a fix, but there's no before/after tracking. You can't tell your team — or your boss — what actually improved.",
    stat: "Zero",
    statLabel: "visibility into whether fixes actually moved the needle",
    tag: "Measurement Problem",
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
            Your store has weak shopping journeys.{" "}
            <span className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
              You just can&apos;t see them yet.
            </span>
          </h2>
          <p className="mt-4 mx-auto max-w-2xl text-base leading-relaxed text-muted-foreground">
            Shoppers arrive with clear intent. But broken pages, missing data,
            and unvalidated fixes turn promising journeys into lost revenue.
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
                We had 40+ PDP fixes in a spreadsheet. Nobody could keep up. The
                backlog grew every month and we had no idea which fixes actually
                mattered for conversion.
              </blockquote>
              <p className="mt-3 text-sm text-muted-foreground">
                Head of E-commerce &mdash; Shopify Plus brand
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
