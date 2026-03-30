"use client";

import { Check } from "lucide-react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const FEATURES = [
  "Free AI readiness scan",
  "13 AI engines tracked",
  "Shopify publish with rollback",
  "Before/after AI verification",
];

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
            Stop guessing how AI sees your store.
            <span className="text-white/90 italic">
              {" "}
              Start making it recommend you.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-white/90 md:text-xl"
          >
            Book a guided pilot. We&apos;ll audit how AI reads your products,
            generate fixes for what it gets wrong, and verify improvement
            together.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mx-auto mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center"
          >
            <Link
              href="/demo"
              className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-primary px-8 text-base font-semibold text-primary-foreground shadow-2xl transition-all hover:-translate-y-0.5 hover:bg-primary/90"
            >
              Book a Pilot
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="mailto:contact@beseam.com"
              className="inline-flex h-14 items-center justify-center gap-2 rounded-full border-2 border-white/30 px-8 text-base font-semibold text-white transition-all hover:border-white/50 hover:bg-white/10"
            >
              Talk Through Your Store
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
