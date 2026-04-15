"use client";

import Link from "next/link";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const APP_SCAN_URL = "https://app.beseam.com/scan";
const APP_RECENT_REPORTS_URL = "https://app.beseam.com/recent";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden px-4 pb-20 pt-24 sm:px-6 md:pb-28 md:pt-32 lg:pb-32 lg:pt-40">
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
            Free · No App Install · Results in Minutes
          </p>

          <h1 className="font-heading text-foreground mx-auto max-w-4xl text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl">
            Free Shopify{" "}
            <span className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
              AI Visibility Scan
            </span>
          </h1>

          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground/90 md:text-xl">
            Paste one product page URL and see what ChatGPT, Google AI, Gemini,
            and Perplexity can actually read — and what is blocking it from
            being recommended.
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
            Scan a Product Page Free
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href={APP_RECENT_REPORTS_URL}
            className="inline-flex h-14 w-full items-center justify-center rounded-full border border-border bg-background/90 px-8 text-base font-semibold text-foreground transition-colors hover:bg-accent sm:w-auto"
          >
            See Recent Reports
          </Link>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45, duration: 0.5 }}
          className="text-xs text-muted-foreground"
        >
          No app install · No store connection · Free to start
        </motion.p>
      </div>
    </section>
  );
}
