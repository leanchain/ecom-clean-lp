"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const gaps = [
  {
    tool: "Uptime monitors",
    misses:
      "The page can load while checkout, variants, or payment options are broken.",
    beseam:
      "Beseam watches real visitor behavior and ties failures to revenue risk.",
  },
  {
    tool: "Error trackers",
    misses:
      "Stack traces explain code, not which merchant action is losing money.",
    beseam:
      "Alerts are written for operators: what broke, who is affected, and what to fix first.",
  },
  {
    tool: "Session replay",
    misses:
      "You still have to watch recordings after the damage has already started.",
    beseam:
      "The alert lands while the issue is active, with impact and a direct next step.",
  },
  {
    tool: "SEO crawlers & audit tools",
    misses:
      "They grade static markup and meta tags — not whether real shoppers can buy or whether AI assistants recommend you.",
    beseam:
      "Beseam ties live shopper behavior, revenue risk, and AI discoverability together, not a one-off markup score.",
  },
];

export default function ComparisonSection() {
  return (
    <section id="compare" className="bg-muted/30 px-4 py-20 sm:px-6 md:py-32">
      <div className="container max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <p className="mb-3 text-sm font-semibold text-primary">
            Where monitoring stops
          </p>
          <h2 className="font-heading text-3xl font-bold tracking-tight md:text-5xl">
            Other tools report symptoms. Beseam tells the merchant what is
            costing money.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {gaps.map((item) => (
            <article
              key={item.tool}
              className="rounded-2xl border border-border bg-background p-5"
            >
              <p className="text-sm font-bold text-foreground">{item.tool}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {item.misses}
              </p>
              <div className="mt-5 rounded-xl bg-primary/8 p-4 text-sm leading-relaxed text-foreground">
                <div className="mb-2 flex items-center gap-2 font-semibold text-primary">
                  <CheckCircle2 className="h-4 w-4" />
                  What Beseam adds
                </div>
                {item.beseam}
              </div>
            </article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
