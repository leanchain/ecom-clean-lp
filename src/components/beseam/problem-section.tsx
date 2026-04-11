"use client";

import { motion } from "framer-motion";
import { FileText, Search, ShieldCheck, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface ScanCheck {
  icon: LucideIcon;
  title: string;
  description: string;
  output: string;
  tag: string;
}

const checks: ScanCheck[] = [
  {
    icon: Search,
    title: "Product understanding",
    description:
      "Can AI clearly identify the product, the variant, the key attributes, and what makes it different?",
    output: "Title clarity, variants, materials, key attributes",
    tag: "What AI reads first",
  },
  {
    icon: FileText,
    title: "Structured data readiness",
    description:
      "We check the Product, Offer, and Review signals that help AI shopping surfaces trust what your page is saying.",
    output: "Schema, identifiers, reviews, merchant-listing signals",
    tag: "What AI trusts",
  },
  {
    icon: ShieldCheck,
    title: "Trust and buying context",
    description:
      "Shipping, returns, availability, and other buyer-confidence details matter when AI decides whether to surface a product.",
    output: "Availability, shipping, returns, trust signals",
    tag: "What helps conversion",
  },
  {
    icon: Sparkles,
    title: "First fix worth making",
    description:
      "The free scan does not dump everything. It shows the top blockers and the clearest next improvement to ship.",
    output: "Top issues, short summary, first recommended fix",
    tag: "What to do next",
  },
];

export default function ProblemSection() {
  return (
    <section className="bg-background px-4 py-20 sm:px-6 md:py-28">
      <div className="container max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <p className="text-primary mb-3 text-sm font-semibold uppercase tracking-wider">
            What the scan checks
          </p>
          <h2 className="font-heading text-3xl font-bold tracking-tight md:text-5xl">
            One page. One report.{" "}
            <span className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
              One clear next step.
            </span>
          </h2>
          <p className="mt-4 mx-auto max-w-2xl text-base leading-relaxed text-muted-foreground">
            The launch version stays intentionally narrow. It checks one Shopify
            product page for the signals AI shopping results rely on most.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="grid gap-4 sm:grid-cols-2"
        >
          {checks.map((check, index) => (
            <motion.div
              key={check.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
              className="flex flex-col overflow-hidden rounded-2xl border border-border bg-background transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex flex-1 flex-col p-8">
                <check.icon className="mb-4 h-8 w-8 text-secondary" />

                <h3 className="text-lg font-bold leading-snug text-foreground">
                  {check.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {check.description}
                </p>

                <div className="mt-5 rounded-xl bg-muted/30 p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Scan output
                  </p>
                  <p className="mt-2 text-sm font-medium text-foreground">
                    {check.output}
                  </p>
                </div>
              </div>

              <div className="border-t border-secondary/10 bg-secondary/5 px-6 py-3">
                <span className="text-xs font-semibold text-secondary">
                  {check.tag}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-12 rounded-2xl border border-border bg-muted/30 p-6 md:p-8"
        >
          <p className="text-sm leading-relaxed text-foreground md:text-base">
            Weekend-launch scope: free Shopify PDP scan, recent reports, and a
            paid fix sprint if the issues are real. Whole-store monitoring,
            multi-platform support, and broader analytics can stay in the
            background until customers actually ask for them.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
