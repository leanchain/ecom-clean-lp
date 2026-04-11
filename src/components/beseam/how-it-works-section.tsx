"use client";

import Link from "next/link";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Link2, Search, Wrench } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const APP_RECENT_REPORTS_URL = "https://app.beseam.com/analyze";
const APP_SCAN_URL = "https://app.beseam.com/scan";

interface Step {
  icon: LucideIcon;
  step: string;
  title: string;
  description: string;
  bullets: string[];
}

const steps: Step[] = [
  {
    icon: Link2,
    step: "Step 1",
    title: "Paste one Shopify product page",
    description:
      "Start with one public PDP URL. No app install, no OAuth, and no setup call before value.",
    bullets: [
      "Public product page only",
      "No store connection required",
      "Fast proof before commitment",
    ],
  },
  {
    icon: Search,
    step: "Step 2",
    title: "See what AI can and cannot read",
    description:
      "Get a short report showing the gaps that matter most for AI product understanding and trust.",
    bullets: [
      "Clear blockers instead of a giant audit dump",
      "Example of what AI may miss",
      "Top issue and first fix worth making",
    ],
  },
  {
    icon: Wrench,
    step: "Step 3",
    title: "Choose the next step",
    description:
      "If the report finds real issues, book a fix sprint. Connect your store later only if you want help implementing changes.",
    bullets: [
      "Browse recent reports first",
      "Book a paid fix sprint when ready",
      "Keep the product simple until customers buy",
    ],
  },
];

export default function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden bg-muted/20 px-4 py-20 sm:px-6 md:py-28"
    >
      <div className="absolute left-0 top-1/4 -z-10 h-[420px] w-[420px] rounded-full bg-primary/5 blur-[120px]" />
      <div className="absolute right-0 top-1/3 -z-10 h-[420px] w-[420px] rounded-full bg-secondary/5 blur-[120px]" />

      <div className="container max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <p className="text-primary mb-3 text-sm font-semibold uppercase tracking-wider">
            How it works
          </p>
          <h2 className="font-heading text-3xl font-bold tracking-tight md:text-5xl">
            A simple launch wedge{" "}
            <span className="text-primary italic">
              you can ship this weekend.
            </span>
          </h2>
          <p className="mt-4 mx-auto max-w-2xl text-base leading-relaxed text-muted-foreground">
            The homepage should do one job: get merchants to run a free scan on
            one product page and understand whether there is a real problem to
            fix.
          </p>
        </motion.div>

        <div className="grid gap-4 lg:grid-cols-3">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 * index, duration: 0.5 }}
              className="rounded-2xl border border-border bg-background p-7 shadow-sm"
            >
              <div className="mb-5 flex items-center justify-between">
                <span className="text-primary text-xs font-semibold uppercase tracking-wider">
                  {step.step}
                </span>
                <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-full">
                  <step.icon className="text-primary h-5 w-5" />
                </div>
              </div>
              <h3 className="text-lg font-bold text-foreground">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>

              <ul className="mt-5 space-y-2.5">
                {step.bullets.map((bullet) => (
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
          transition={{ delay: 0.25, duration: 0.6 }}
          className="mt-10 grid gap-4 lg:grid-cols-2"
        >
          <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6">
            <p className="text-primary text-xs font-semibold uppercase tracking-wider">
              Launch now
            </p>
            <h3 className="mt-2 text-lg font-bold text-foreground">
              Free scan, recent reports, paid fix sprint
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              This is the believable offer for the weekend launch. It is easy to
              understand and directly tied to a merchant pain point.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-background p-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Layer later
            </p>
            <h3 className="mt-2 text-lg font-bold text-foreground">
              Store connection, recurring monitoring, broader analytics
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Those can stay behind the scenes until merchants trust the initial
              scan and start paying for help.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.35, duration: 0.6 }}
          className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <Link
            href={APP_SCAN_URL}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-lg transition-all hover:-translate-y-0.5 hover:bg-primary/90"
          >
            Run Free Scan
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href={APP_RECENT_REPORTS_URL}
            className="inline-flex h-12 items-center justify-center rounded-full border border-border bg-background px-6 text-sm font-semibold text-foreground transition-colors hover:bg-accent"
          >
            View Recent Reports
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
