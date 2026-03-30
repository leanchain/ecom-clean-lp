"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Link from "next/link";

const personas = [
  {
    role: "Head of E-commerce",
    why: "You own the P&L. You need to know which journeys are leaking revenue and whether published fixes actually moved the needle.",
    fits: [
      "Journey-level visibility, not just page metrics",
      "Before/after evidence for stakeholder reporting",
      "Guided pilot — results in weeks, not quarters",
    ],
  },
  {
    role: "CRO / Conversion Lead",
    why: 'You run experiments but can\'t keep up with the PDP backlog. You need a faster path from "issue found" to "fix verified."',
    fits: [
      "118+ automated page checks — no manual audit needed",
      "AI-generated fixes you can review and approve",
      "Publish to Shopify and verify in one workflow",
    ],
  },
  {
    role: "Search & Discovery Lead",
    why: "You're responsible for organic and AI-referral traffic. You need to ensure landing pages match shopper intent from every source.",
    fits: [
      "AI-referral mission tracking (ChatGPT, Perplexity, etc.)",
      "Schema, structured data, and feed diagnostics",
      "Journey-to-page linkage for intent matching",
    ],
  },
  {
    role: "Shopify Agency Operator",
    why: "You manage stores for multiple clients. You need a repeatable workflow that scales across brands without hiring more analysts.",
    fits: [
      "Operator-assisted pilot — we help you run it for your clients",
      "White-label-ready diagnostics and verification",
      "One consistent workflow: diagnose → fix → verify",
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
            Built for teams who{" "}
            <span className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent italic">
              ship and verify.
            </span>
          </h2>
          <p className="mt-4 mx-auto max-w-2xl text-base leading-relaxed text-muted-foreground">
            Beseam is for Shopify operators who are tired of audit backlog and
            want a guided path from diagnosis to verified improvement.
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
