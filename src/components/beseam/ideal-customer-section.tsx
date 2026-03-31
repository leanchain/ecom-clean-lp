"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Link from "next/link";

const personas = [
  {
    role: "Head of E-commerce",
    why: "AI engines are the fastest-growing shopping channel. You need to know if ChatGPT recommends your products or your competitors'.",
    fits: [
      "Store-level audit score with per-product breakdown",
      "AI traffic intelligence — which engines send revenue",
      "Before/after evidence for stakeholder reporting",
    ],
  },
  {
    role: "SEO & Discovery Lead",
    why: "Organic search now includes AI Overviews, Gemini, and Perplexity. Your SEO strategy needs to cover how AI reads your pages, not just Google crawlers.",
    fits: [
      "118+ checks including AI-specific readability tests",
      "Schema, structured data, and selling point optimization",
      "AI referral tracking across 13 engines",
    ],
  },
  {
    role: "CRO / Conversion Lead",
    why: "AI-referred visitors convert differently. You need to know what AI told them before they arrived — and fix pages where AI gets the product wrong.",
    fits: [
      "AI product probe — see exactly what AI tells shoppers",
      "AI-generated fixes for content and schema gaps",
      "Publish to Shopify and verify improvement",
    ],
  },
  {
    role: "Shopify Agency Operator",
    why: "Clients are asking about AI traffic. You need a repeatable way to audit how AI sees their products, fix what it gets wrong, and prove results.",
    fits: [
      "Scalable AI store audit across multiple brands",
      "White-label-ready audit reports",
      "One workflow: audit → fix → verify for every client",
    ],
  },
];

export default function IdealCustomerSection() {
  return (
    <section className="bg-muted/30 px-4 py-20 sm:px-6 md:py-32">
      <div className="container max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className="text-primary mb-3 text-sm font-semibold uppercase tracking-wider">
            Who This Is For
          </p>
          <h2 className="font-heading text-3xl font-bold tracking-tight md:text-5xl">
            Built for teams who want{" "}
            <span className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent italic">
              AI agents to recommend them.
            </span>
          </h2>
          <p className="mt-4 mx-auto max-w-2xl text-base leading-relaxed text-muted-foreground">
            Beseam is for Shopify operators who see AI as the next major
            shopping channel and want to get ahead before competitors do.
          </p>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2">
          {personas.map((persona, index) => (
            <motion.div
              key={persona.role}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
              className="flex flex-col rounded-2xl border border-border bg-background p-7"
            >
              <h3 className="text-lg font-bold text-foreground">
                {persona.role}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {persona.why}
              </p>

              <ul className="mt-5 space-y-2.5">
                {persona.fits.map((fit) => (
                  <li key={fit} className="flex items-start gap-2.5">
                    <div className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-50">
                      <Check className="h-2.5 w-2.5 text-emerald-600" />
                    </div>
                    <span className="text-sm text-foreground/80">{fit}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-10 text-center"
        >
          <Link
            href="/demo"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-8 text-sm font-semibold text-primary-foreground shadow-lg transition-all hover:-translate-y-0.5 hover:bg-primary/90"
          >
            Book a Pilot for Your Team
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
