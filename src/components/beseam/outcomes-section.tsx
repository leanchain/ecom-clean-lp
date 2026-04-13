"use client";

import Link from "next/link";

import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  LayoutGrid,
  Search,
  Zap,
  Activity,
} from "lucide-react";

const APP_SCAN_URL = "https://app.beseam.com/scan";

interface Pillar {
  icon: typeof LayoutGrid;
  title: string;
  description: string;
  bullets: string[];
  color: string;
  bgColor: string;
}

const pillars: Pillar[] = [
  {
    icon: LayoutGrid,
    title: "Catalog",
    description:
      "See how AI interprets every product page — titles, variants, attributes, schema, and selling points. Know exactly what AI can and cannot read.",
    bullets: [
      "Product understanding score per page",
      "Schema and structured data coverage",
      "Attribute and variant clarity",
    ],
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: Search,
    title: "Audit",
    description:
      "Run 118+ checks across AI discoverability, SEO foundations, shopping feed quality, and content structure. Surface the gaps that actually block recommendations.",
    bullets: [
      "AI discoverability and LLM readiness",
      "SEO and shopping feed alignment",
      "Prioritized issues with clear severity",
    ],
    color: "text-violet-600",
    bgColor: "bg-violet-500/10",
  },
  {
    icon: Zap,
    title: "Actions",
    description:
      "Generate targeted fixes for the issues that matter most. Approve them, publish directly to Shopify, and verify the improvement with a re-audit.",
    bullets: [
      "AI-generated fixes for schema and content",
      "One-click publish to Shopify",
      "Before-and-after verification",
    ],
    color: "text-amber-600",
    bgColor: "bg-amber-500/10",
  },
  {
    icon: Activity,
    title: "Monitor",
    description:
      "Track AI readiness over time. Catch regressions after catalog changes, monitor schema health, and get alerts when something drifts.",
    bullets: [
      "Continuous site health tracking",
      "Regression detection after changes",
      "Feed and schema drift alerts",
    ],
    color: "text-emerald-600",
    bgColor: "bg-emerald-500/10",
  },
];

export default function OutcomesSection() {
  return (
    <section className="bg-muted/30 px-4 py-20 sm:px-6 md:py-28">
      <div className="container max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">
            Platform
          </p>
          <h2 className="font-heading text-3xl font-bold tracking-tight md:text-5xl">
            Four areas.{" "}
            <span className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent italic">
              One platform.
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
            Beseam covers the full lifecycle — from understanding how AI reads
            your catalog to fixing gaps, publishing changes, and monitoring what
            happens next.
          </p>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.07 * index, duration: 0.5 }}
              className="flex flex-col rounded-2xl border border-border bg-background p-7 transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="mb-4 flex items-center gap-3">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-xl ${pillar.bgColor}`}
                >
                  <pillar.icon className={`h-5 w-5 ${pillar.color}`} />
                </div>
                <h3 className="text-lg font-bold text-foreground">
                  {pillar.title}
                </h3>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {pillar.description}
              </p>
              <ul className="mt-5 space-y-2.5">
                {pillar.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-2.5">
                    <div className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-50">
                      <CheckCircle2 className="h-2.5 w-2.5 text-emerald-600" />
                    </div>
                    <span className="text-sm text-foreground/80">{bullet}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-10 flex justify-center"
        >
          <Link
            href={APP_SCAN_URL}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-lg transition-all hover:-translate-y-0.5 hover:bg-primary/90"
          >
            Start with a Free Scan
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
