"use client";

import { motion } from "framer-motion";
import { X, Check } from "lucide-react";

const comparisons = [
  {
    tool: "Generic Analytics (GA4, Mixpanel)",
    them: "Shows page views and bounce rates. Doesn't connect journey drop-offs to specific page-level issues.",
    us: "Links shopping mission failures directly to the weak PDP or landing page causing the problem.",
  },
  {
    tool: "Site Audit Tools (Screaming Frog, Semrush)",
    them: "Crawls your site and lists hundreds of technical issues. No journey context, no fix generation, no Shopify publish.",
    us: "Audits pages in the context of actual shopping journeys. Generates fixes and publishes directly to Shopify.",
  },
  {
    tool: "AI Content Tools (Jasper, Copy.ai)",
    them: "Generates copy without knowing what's actually broken on your page or why shoppers are dropping off.",
    us: "Generates targeted fixes based on audit data — schema, meta, structured data — not generic copy.",
  },
  {
    tool: "CRO Platforms (Hotjar, VWO)",
    them: "Records sessions and runs A/B tests. You have to watch videos and guess what to fix.",
    us: "Identifies weak journeys automatically and tells you exactly what to fix, with before/after verification.",
  },
];

export default function DifferentiationSection() {
  return (
    <section className="bg-background px-4 py-20 sm:px-6 md:py-32">
      <div className="container max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className="text-primary mb-3 text-sm font-semibold uppercase tracking-wider">
            How This Is Different
          </p>
          <h2 className="font-heading text-3xl font-bold tracking-tight md:text-5xl">
            Not another dashboard.{" "}
            <span className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
              A complete fix workflow.
            </span>
          </h2>
          <p className="mt-4 mx-auto max-w-2xl text-base leading-relaxed text-muted-foreground">
            Most tools stop at showing you data. Beseam connects journey
            diagnostics to page fixes to verified improvement — so you ship
            results, not reports.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="overflow-hidden rounded-2xl border border-border bg-background"
        >
          <div className="grid grid-cols-[1fr_1fr] border-b border-border bg-muted/30">
            <div className="flex items-center gap-2 px-6 py-3 border-r border-border">
              <X className="h-3.5 w-3.5 text-muted-foreground/40" />
              <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground/60">
                What they do
              </span>
            </div>
            <div className="flex items-center gap-2 px-6 py-3">
              <Check className="h-3.5 w-3.5 text-emerald-600" />
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-600">
                What Beseam does
              </span>
            </div>
          </div>

          <div className="divide-y divide-border/50">
            {comparisons.map(({ tool, them, us }) => (
              <div key={tool}>
                <div className="px-6 py-3 border-b border-border/30 bg-muted/10">
                  <span className="text-sm font-bold text-foreground">
                    {tool}
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-border/30">
                  <div className="flex items-start gap-2.5 px-6 py-4">
                    <X className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground/40" />
                    <span className="text-sm text-muted-foreground">
                      {them}
                    </span>
                  </div>
                  <div className="flex items-start gap-2.5 px-6 py-4">
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600" />
                    <span className="text-sm font-medium text-foreground">
                      {us}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
