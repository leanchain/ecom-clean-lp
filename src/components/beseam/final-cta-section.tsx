"use client";

import Link from "next/link";

import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";

const FEATURES = [
  "Free Shopify PDP scan",
  "Example report before signup",
  "Paid fix sprint if needed",
  "No store connection required to start",
];

const APP_SCAN_URL = "https://app.beseam.com/scan";
const FIX_SPRINT_URL = "/demo";

export default function FinalCtaSection() {
  return (
    <section className="relative overflow-hidden border-y border-border/20 bg-[linear-gradient(135deg,#0d0d0d,#111827)] py-24 md:py-36">
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[100px]"
        aria-hidden
      />

      <div className="container relative z-10">
        <div className="mx-auto max-w-4xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-heading text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-7xl"
          >
            Run the scan first.
            <span className="text-white/90 italic">
              {" "}
              Book the fix sprint only if it finds real problems.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-white/90 md:text-xl"
          >
            Start with one Shopify product page. See what AI shoppers can read.
            If the gaps are real, we help you prioritize and implement the fixes
            that matter.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mx-auto mt-10 flex w-full max-w-2xl flex-col gap-3 sm:flex-row sm:justify-center"
          >
            <Link
              href={APP_SCAN_URL}
              className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-primary px-8 text-base font-bold text-primary-foreground shadow-lg transition-all hover:-translate-y-0.5 hover:bg-primary/90 active:scale-95"
            >
              Scan a Product Page
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href={FIX_SPRINT_URL}
              className="inline-flex h-14 items-center justify-center rounded-full border border-white/20 bg-white/5 px-8 text-base font-semibold text-white transition-colors hover:bg-white/10"
            >
              Book Fix Sprint
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-4"
          >
            {FEATURES.map((item) => (
              <div key={item} className="flex items-center gap-2 text-white">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/20 backdrop-blur-sm">
                  <Check className="h-3 w-3 text-emerald-400" />
                </div>
                <span className="text-sm font-medium tracking-wide">
                  {item}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
