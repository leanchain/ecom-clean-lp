"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    q: "What is a shopping mission?",
    a: "A shopping mission is a goal-driven journey a shopper takes across your store — from landing page to purchase (or drop-off). Instead of looking at individual pageviews, Beseam tracks the full mission so you can see where journeys succeed or fail.",
  },
  {
    q: "How does Beseam find weak landing pages?",
    a: "Beseam runs 118+ checks across SEO foundations, schema markup, content quality, and shopping feed alignment. It links those page-level issues to the shopping missions they affect — so you know exactly which pages are costing you conversions.",
  },
  {
    q: "What kind of fixes does Beseam generate?",
    a: "AI-generated fixes for structured data (Product, Offer, Review schema), meta descriptions, content gaps, and feed mismatches. You review a before/after preview and approve before anything publishes. Nothing goes live without your explicit approval.",
  },
  {
    q: "How does Shopify publish work?",
    a: "Once you approve a fix, Beseam publishes it directly to your Shopify store. Every change includes rollback protection — one click to revert if anything looks wrong. No developer access or theme changes required.",
  },
  {
    q: "What does 'verify' mean?",
    a: "After a fix goes live, Beseam re-runs the same diagnostics and shows you a before/after comparison. You see exactly what improved — page scores, issue counts, journey health — with evidence you can share with your team or stakeholders.",
  },
  {
    q: "Is this a self-serve tool?",
    a: "Not yet. Today, Beseam runs as a guided pilot — operator-assisted, so you get results rather than just another dashboard login. We work with your team to set up missions, review fix queues, and verify improvements together.",
  },
  {
    q: "What Shopify plans do you support?",
    a: "Beseam works with all Shopify plans — Basic, Shopify, Advanced, and Shopify Plus. No developer access or theme changes required.",
  },
  {
    q: "How long does a pilot take?",
    a: "Most pilots show results within 2–4 weeks. You'll see your first mission diagnostics and page-level findings within the first few days. Fix generation and verification follow quickly after that.",
  },
  {
    q: "What's the commitment for a pilot?",
    a: "A pilot is a focused, time-boxed engagement — typically 4–6 weeks. No long-term contract. You see the results and decide if you want to continue. The goal is to prove value on your store, not lock you into a subscription.",
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-border">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-4 py-5 text-left text-base font-medium text-[var(--base-dark)] transition-colors hover:text-primary"
      >
        {q}
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm leading-relaxed text-muted-foreground">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FaqSection() {
  const mid = Math.ceil(faqs.length / 2);
  const left = faqs.slice(0, mid);
  const right = faqs.slice(mid);

  return (
    <section id="faq" className="bg-background px-4 py-20 sm:px-6 md:py-32">
      <div className="container max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className="text-primary mb-3 text-sm font-semibold uppercase tracking-wider">
            FAQ
          </p>
          <h2 className="font-heading text-3xl font-bold tracking-tight md:text-5xl">
            Everything you need to know
          </h2>
          <p className="text-muted-foreground mt-4 mx-auto max-w-2xl text-lg leading-relaxed">
            Common questions about how Beseam works, what a pilot looks like,
            and what to expect.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="grid gap-0 md:grid-cols-2 md:gap-12"
        >
          <div>
            {left.map((f) => (
              <FaqItem key={f.q} q={f.q} a={f.a} />
            ))}
          </div>
          <div>
            {right.map((f) => (
              <FaqItem key={f.q} q={f.q} a={f.a} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
