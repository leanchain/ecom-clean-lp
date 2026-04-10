"use client";

import Link from "next/link";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const APP_SCAN_URL = "https://app.beseam.com/scan";
const APP_EXAMPLE_REPORT_URL = "https://app.beseam.com/analyze";
const FIX_SPRINT_URL = "/demo";

const PROOF_POINTS = [
  "Product title, variants, and attribute clarity",
  "Schema, reviews, and merchant-listing readiness",
  "Shipping, returns, and the first fix worth making",
];

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden px-4 pb-16 pt-24 sm:px-6 md:pb-24 md:pt-32 lg:pb-28 lg:pt-40">
      <div className="absolute left-1/2 top-0 -z-10 h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-primary/5 blur-[120px]" />
      <div className="absolute right-0 top-1/4 -z-10 h-[400px] w-[400px] rounded-full bg-secondary/5 blur-[100px]" />

      <div className="container relative flex flex-col items-center justify-center gap-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="space-y-6"
        >
          <p className="text-primary text-sm font-semibold uppercase tracking-[0.2em]">
            Free Shopify AI Visibility Scan
          </p>

          <h1 className="font-heading text-foreground max-w-5xl text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl">
            Find out if AI shoppers can read your{" "}
            <span className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
              Shopify product page.
            </span>
          </h1>

          <p className="text-muted-foreground/90 mx-auto max-w-2xl text-lg leading-relaxed md:text-xl">
            Paste one public PDP and see what ChatGPT, Google AI Mode, and
            Perplexity can actually understand, trust, and recommend.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mx-auto mt-2 flex w-full max-w-xl flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <Link
            href={APP_SCAN_URL}
            className="inline-flex h-14 w-full items-center justify-center gap-2 rounded-full bg-primary px-8 text-base font-bold text-primary-foreground shadow-lg transition-all hover:-translate-y-0.5 hover:bg-primary/90 active:scale-95 sm:w-auto"
          >
            Scan a Product Page
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href={APP_EXAMPLE_REPORT_URL}
            className="inline-flex h-14 w-full items-center justify-center rounded-full border border-border bg-background/90 px-8 text-base font-semibold text-foreground transition-colors hover:bg-accent sm:w-auto"
          >
            View Example Report
          </Link>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45, duration: 0.5 }}
          className="text-xs text-muted-foreground"
        >
          Shopify only · One product page · No app install
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.5 }}
          className="mx-auto mt-4 grid w-full max-w-4xl gap-3 md:grid-cols-3"
        >
          {PROOF_POINTS.map((item) => (
            <div
              key={item}
              className="flex items-start gap-3 rounded-2xl border border-border/60 bg-background/70 p-4 text-left"
            >
              <div className="bg-primary/10 mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full">
                <CheckCircle2 className="text-primary h-4 w-4" />
              </div>
              <p className="text-sm leading-relaxed text-foreground/85">
                {item}
              </p>
            </div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.65, duration: 0.5 }}
          className="text-sm text-muted-foreground"
        >
          Need hands-on help after the scan?{" "}
          <Link href={FIX_SPRINT_URL} className="font-semibold text-foreground">
            Book a fix sprint.
          </Link>
        </motion.p>
      </div>
    </section>
  );
}
