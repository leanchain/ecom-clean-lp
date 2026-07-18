"use client";

import { motion } from "framer-motion";
import { X, Check, Link2 } from "lucide-react";

const comparisons = [
  {
    tool: "Generic Analytics (GA4, Mixpanel)",
    them: "Shows page views and bounce rates. Has no concept of how AI engines read your product pages or which AI channels send traffic.",
    us: "Tracks AI referral traffic across 13 engines and audits how each AI engine understands your products.",
  },
  {
    tool: "Site Audit Tools (Screaming Frog, Semrush)",
    them: "Crawls your site for technical SEO issues. Doesn't test how ChatGPT or Gemini actually interpret your product pages.",
    us: "Sends AI to read your pages like a shopper would. Tests schema, content, and structured data from an AI engine's perspective.",
  },
  {
    tool: "AI Content Tools (Jasper, Copy.ai)",
    them: "Generates generic marketing copy. Doesn't know what AI engines can or can't read on your product pages.",
    us: "Generates targeted fixes for the specific structured data and content gaps that block AI readability.",
  },
  {
    tool: "CRO Platforms (Hotjar, VWO)",
    them: "Records human sessions and runs A/B tests. Has zero visibility into AI-driven shopping behavior.",
    us: "Tracks AI-referred shopping sessions and connects them to product page readability scores.",
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
            Why Not Your Current Stack
          </p>
          <h2 className="font-heading text-3xl font-bold tracking-tight md:text-5xl">
            Your tools were built for the human web.{" "}
            <span className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
              AI needs something different.
            </span>
          </h2>
          <p className="mt-4 mx-auto max-w-2xl text-base leading-relaxed text-muted-foreground">
            You probably already use GA4, Semrush, and Hotjar. They&apos;re
            great at what they do. But none of them can answer the question that
            matters now: what does ChatGPT see when it reads your product page?
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

        {/* Zero-setup callout */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-8 flex flex-col items-center gap-4 rounded-2xl border border-primary/20 bg-primary/5 p-8 text-center sm:flex-row sm:text-left"
        >
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10">
            <Link2 className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-lg font-bold text-foreground">
              No code changes. No app installs. Just your store URL.
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Every tool above requires dashboard access, tracking scripts, or
              developer setup. Beseam works with a single URL , paste it, and
              your AI audit starts in seconds.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
