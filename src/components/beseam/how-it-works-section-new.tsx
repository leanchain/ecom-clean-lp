"use client";

import { motion } from "framer-motion";
import {
  CheckCircle2,
  FileSearch,
  ListChecks,
  Radar,
  Wrench,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Step {
  number: string;
  label: string;
  icon: LucideIcon;
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    number: "01",
    label: "Detect",
    icon: Radar,
    title: "We watch selling and discovery",
    description:
      "Beseam observes what real shoppers experience and reads your catalog the way search and AI do — catching broken checkout, failed payments, frozen buttons, lost rankings, and missing product data, by device, country, and surface.",
  },
  {
    number: "02",
    label: "Evidence",
    icon: FileSearch,
    title: "See what broke and what it costs",
    description:
      "Every finding is a plain-language alert: what changed, how many shoppers are affected, the revenue or visibility at risk, and the root cause. No dashboards to babysit, no session videos to watch.",
  },
  {
    number: "03",
    label: "Prioritize",
    icon: ListChecks,
    title: "Know which fix matters first",
    description:
      "Issues are ranked by real impact on revenue and traffic, so you always work the problem that is costing the most — not the loudest one or the easiest one.",
  },
  {
    number: "04",
    label: "Resolve",
    icon: Wrench,
    title: "Ship the fix and verify",
    description:
      "Follow the exact fix, or push structured-data and content fixes straight to Shopify with rollback. Beseam re-checks afterwards so you can confirm it is actually resolved.",
  },
];

const capabilities = [
  "Checkout & Cart Failures",
  "Payment Gateway Errors",
  "Broken UI & Navigation",
  "Theme & JavaScript Regressions",
  "Lost Search Rankings",
  "Missing Product Schema",
  "AI Discoverability Gaps",
  "Country-Specific Content Bugs",
];

export default function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="bg-muted/30 px-4 py-20 sm:px-6 md:py-32"
    >
      <div className="container max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className="text-primary mb-3 text-sm font-semibold uppercase tracking-wider">
            How It Works
          </p>
          <h2 className="font-heading text-3xl font-bold tracking-tight md:text-5xl">
            From silent problem to shipped fix.{" "}
            <span className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
              In minutes, not weeks.
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
            One flow for the whole store , Detect, Evidence, Prioritize, Resolve
            , covering both what breaks the sale and what breaks the discovery.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.12 * index, duration: 0.5 }}
              className="flex flex-col rounded-2xl border border-border bg-background p-7 transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              <step.icon className="mb-4 h-8 w-8 text-primary" />

              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-widest text-primary">
                  {step.number}
                </span>
                <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  {step.label}
                </span>
              </div>
              <h3 className="mt-1 text-lg font-bold text-foreground">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>

              {/* WhatsApp preview — Evidence step only */}
              {step.number === "02" && (
                <div className="mt-4 rounded-xl border border-[#25D366]/20 bg-[#ECF8F0] p-3">
                  <div className="mb-1.5 flex items-center gap-1.5">
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#25D366]">
                      <svg viewBox="0 0 24 24" className="h-3 w-3 fill-white">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.553 4.116 1.52 5.845L0 24l6.335-1.495A11.934 11.934 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.032-1.386l-.36-.214-3.733.881.94-3.638-.235-.374A9.818 9.818 0 1112 21.818z" />
                      </svg>
                    </div>
                    <span className="text-[10px] font-bold text-[#25D366]">
                      Beseam &middot; now
                    </span>
                  </div>
                  <p className="text-[11px] leading-relaxed text-gray-700">
                    <strong>PayPal down in Germany.</strong> 34 shoppers
                    affected. <strong>€3,200 at risk.</strong> Cause: Klarna
                    conflict after theme update.{" "}
                    <span className="font-semibold text-[#25D366]">
                      &rarr; How to fix it
                    </span>
                  </p>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Detection speed comparison */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-10 rounded-2xl border border-border bg-background p-6 md:p-8"
        >
          <p className="mb-5 text-xs font-bold uppercase tracking-widest text-muted-foreground">
            Time to detect a store problem
          </p>
          <div className="space-y-4">
            <div>
              <div className="mb-1.5 flex items-center justify-between text-sm">
                <span className="font-medium text-muted-foreground">
                  Industry average (no tool)
                </span>
                <span className="font-black text-muted-foreground">
                  4–5 days
                </span>
              </div>
              <div className="h-2.5 w-full overflow-hidden rounded-full bg-muted">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
                  className="h-full rounded-full bg-muted-foreground/25"
                />
              </div>
            </div>
            <div>
              <div className="mb-1.5 flex items-center justify-between text-sm">
                <span className="font-medium text-foreground">With Beseam</span>
                <span className="font-black text-emerald-600">
                  &lt; 30 minutes
                </span>
              </div>
              <div className="h-2.5 w-full overflow-hidden rounded-full bg-muted">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "4%" }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6, duration: 0.6, ease: "easeOut" }}
                  className="h-full rounded-full bg-emerald-500"
                />
              </div>
            </div>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            Every hour undetected compounds the loss.{" "}
            <span className="font-semibold text-foreground">
              Beseam closes a multi-day gap down to minutes.
            </span>
          </p>
        </motion.div>

        {/* Detection Coverage */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 rounded-2xl border border-border bg-background p-8 md:p-10"
        >
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <h3 className="text-2xl font-bold text-foreground md:text-3xl">
                Full-store coverage.{" "}
                <span className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
                  No blind spots.
                </span>
              </h3>
              <p className="mt-4 text-muted-foreground">
                Beseam ties real shopper behavior and catalog signals together
                to catch the silent failures that break both selling and
                discovery.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {capabilities.map((capability) => (
                <div key={capability} className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-500" />
                  <span className="text-sm font-medium text-foreground">
                    {capability}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
