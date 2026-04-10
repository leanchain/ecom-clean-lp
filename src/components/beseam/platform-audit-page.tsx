"use client";

import { useState, type FormEvent } from "react";

import Link from "next/link";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import SampleFindings, {
  type Finding,
} from "@/components/beseam/sample-findings";
import AnimatedBorderContainer from "@/components/ui/animated-border-container";
import { Input } from "@/components/ui/input";

interface PlatformAuditPageProps {
  platform: string;
  headline: string;
  description: string;
  contextParagraphs: string[];
  findings: Finding[];
  otherPlatforms: { name: string; href: string }[];
}

export default function PlatformAuditPage({
  platform,
  headline,
  description,
  contextParagraphs,
  findings,
  otherPlatforms,
}: PlatformAuditPageProps) {
  const [store, setStore] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const cleaned = store.trim();
    if (!cleaned) return;

    const normalized = /^https?:\/\//i.test(cleaned)
      ? cleaned
      : `https://${cleaned}`;

    window.location.href = `https://app.beseam.com/scan?url=${encodeURIComponent(normalized)}`;
  };

  return (
    <>
      <section className="relative overflow-hidden px-4 pb-12 pt-24 sm:px-6 md:pb-16 md:pt-32">
        <div className="absolute left-1/2 top-0 -z-10 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-primary/5 blur-[120px]" />
        <div className="container max-w-4xl text-center">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary"
          >
            {platform} AI Audit
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-heading text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl"
          >
            {headline}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground"
          >
            {description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mx-auto mt-8 w-full max-w-xl"
          >
            <AnimatedBorderContainer rounded="full">
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-2 rounded-[28px] border bg-background/95 p-2 shadow-lg backdrop-blur sm:flex-row sm:items-center"
              >
                <Input
                  type="text"
                  value={store}
                  onChange={(e) => setStore(e.target.value)}
                  placeholder="https://yourstore.com/products/your-product"
                  animate={false}
                  className="h-12 flex-1 rounded-full border-0 bg-transparent px-5 text-sm shadow-none focus-visible:border-0 focus-visible:ring-0"
                />
                <button
                  type="submit"
                  className="flex h-14 shrink-0 items-center justify-center gap-2 rounded-full bg-primary px-8 text-base font-bold text-primary-foreground shadow-lg transition-all hover:-translate-y-0.5 hover:bg-primary/90 active:scale-95"
                >
                  Scan Product Page
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            </AnimatedBorderContainer>
            <p className="mt-3 text-xs text-muted-foreground">
              Paste one public product page · No app install · Free scan
            </p>
          </motion.div>
        </div>
      </section>

      <section className="bg-muted/20 px-4 py-16 sm:px-6 md:py-24">
        <div className="container max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-heading text-2xl font-bold tracking-tight md:text-3xl">
              {platform} &amp; AI readability: what you need to know
            </h2>
            <div className="mt-6 space-y-4">
              {contextParagraphs.map((p, i) => (
                <p
                  key={i}
                  className="text-sm leading-relaxed text-muted-foreground"
                >
                  {p}
                </p>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 md:py-24">
        <div className="container max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <h2 className="font-heading text-2xl font-bold tracking-tight md:text-3xl">
              Example findings we often see on {platform}
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Click any finding to see the type of fix.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <SampleFindings findings={findings} />
          </motion.div>
        </div>
      </section>

      <section className="border-y border-border/40 bg-muted/20 px-4 py-16 sm:px-6 md:py-20">
        <div className="container max-w-2xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-heading text-2xl font-bold tracking-tight md:text-3xl"
          >
            Scan one {platform} product page now
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="mt-2 text-sm text-muted-foreground"
          >
            Start with a single PDP and see whether AI shopping surfaces can
            actually understand it.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.4 }}
            className="mx-auto mt-6 w-full max-w-xl"
          >
            <AnimatedBorderContainer rounded="full">
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-2 rounded-[28px] border bg-background/95 p-2 shadow-md backdrop-blur sm:flex-row sm:items-center"
              >
                <Input
                  type="text"
                  value={store}
                  onChange={(e) => setStore(e.target.value)}
                  placeholder="https://yourstore.com/products/your-product"
                  animate={false}
                  className="h-12 flex-1 rounded-full border-0 bg-transparent px-5 text-sm shadow-none focus-visible:border-0 focus-visible:ring-0"
                />
                <button
                  type="submit"
                  className="flex h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground transition-all hover:-translate-y-0.5 hover:bg-primary/90 active:scale-95"
                >
                  Scan Product Page
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            </AnimatedBorderContainer>
          </motion.div>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 md:py-16">
        <div className="container max-w-3xl">
          <p className="mb-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">
            Also available
          </p>
          <h3 className="font-heading text-lg font-bold">
            AI audits for other platforms
          </h3>
          <div className="mt-4 flex flex-wrap gap-3">
            {otherPlatforms.map((p) => (
              <Link
                key={p.name}
                href={p.href}
                className="inline-flex items-center rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary/30 hover:bg-primary/5"
              >
                {p.name}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
