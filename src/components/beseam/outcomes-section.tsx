"use client";

import Link from "next/link";

import { motion } from "framer-motion";
import {
  Activity,
  ArrowRight,
  CheckCircle2,
  Search,
  ShoppingCart,
  Wrench,
} from "lucide-react";

const APP_STORE_URL = "https://app.beseam.com/store";

interface Pillar {
  icon: typeof Search;
  title: string;
  description: string;
  bullets: string[];
  color: string;
  bgColor: string;
}

const pillars: Pillar[] = [
  {
    icon: Search,
    title: "Discoverability",
    description:
      "See how AI and search read every product page - titles, attributes, schema, and selling points. Know exactly what surfaces can and cannot understand about your catalog.",
    bullets: [
      "Product understanding across AI and search",
      "Schema and structured-data coverage",
      "Rankings and rich-result health",
    ],
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: ShoppingCart,
    title: "Purchase",
    description:
      "Catch the failures that quietly block the sale - broken checkout, failed payments, frozen buttons, and wrong prices - across the devices and countries you never test on.",
    bullets: [
      "Checkout and cart failure detection",
      "Payment errors by gateway and country",
      "Device- and browser-specific breakage",
    ],
    color: "text-violet-600",
    bgColor: "bg-violet-500/10",
  },
  {
    icon: Activity,
    title: "Monitoring",
    description:
      "Beseam watches real shoppers and your catalog around the clock, so regressions after a theme update, app install, or feed sync surface in minutes - not from a customer complaint.",
    bullets: [
      "24/7 coverage of selling and discovery",
      "Regression alerts after changes",
      "Instant alerts via WhatsApp, Email, Slack",
    ],
    color: "text-amber-600",
    bgColor: "bg-amber-500/10",
  },
  {
    icon: Wrench,
    title: "Resolution",
    description:
      "Every finding comes with the evidence and the fix. Follow the plain-language steps, or push structured-data and content fixes straight to Shopify - then re-check to confirm it is resolved.",
    bullets: [
      "Root cause and revenue impact per issue",
      "One-click publish to Shopify with rollback",
      "Before-and-after verification",
    ],
    color: "text-emerald-600",
    bgColor: "bg-emerald-500/10",
  },
];

export default function OutcomesSection() {
  return (
    <section className="bg-background px-4 py-20 sm:px-6 md:py-32">
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
              One store health platform.
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
            Beseam covers the full lifecycle of a healthy store - from how AI
            and search discover your catalog, to whether shoppers can actually
            buy, to catching what breaks and helping you fix it.
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
            href={APP_STORE_URL}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-lg transition-all hover:-translate-y-0.5 hover:bg-primary/90"
          >
            Scan my store
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
