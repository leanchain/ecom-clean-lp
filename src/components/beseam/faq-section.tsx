"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    q: "Why do I need to prepare my store for AI search?",
    a: "AI shopping engines like ChatGPT, Perplexity, and Gemini don't browse pages like humans — they parse structured data (JSON-LD schema, metadata, geo-tags). If your product pages lack proper markup, AI literally can't recommend your products. Beseam prepares your catalog automatically so you're ready before the traffic shift hits.",
  },
  {
    q: "How is this different from traditional SEO?",
    a: "Traditional SEO focuses on Google rankings. Preparing for AI search means ensuring your structured data is complete enough for LLMs to understand, compare, and recommend your products. Beseam handles both — but the real opportunity is preparing your catalog before your competitors do.",
  },
  {
    q: "Which AI search engines will this help with?",
    a: "Any AI that reads structured data — ChatGPT (with browsing & shopping), Google Gemini, Perplexity, Microsoft Copilot, and future AI shopping assistants. Proper schema markup is the universal language they all understand.",
  },
  {
    q: "Will Beseam break my store?",
    a: "No. Every fix creates a rollback point before pushing to Shopify. You review every change in a before/after diff before approving. And Beseam verifies fixes are live on your actual pages after pushing — if anything looks wrong, one-click rollback.",
  },
  {
    q: "How long does a scan take?",
    a: "Most stores with under 1,000 products are fully scanned in under 2 minutes. Larger stores (2,000+ products) may take 3–5 minutes. You get results progressively as products are checked.",
  },
  {
    q: "Do I need technical knowledge?",
    a: "Not at all. Beseam is built for e-commerce managers, not developers. Every issue has a plain-English explanation, a severity tag, and a clear fix path — either 'AI fixes it' with one click, or 'exported for your team' as a prioritized report.",
  },
  {
    q: "What Shopify plans do you support?",
    a: "Beseam works with all Shopify plans — Basic, Shopify, Advanced, and Shopify Plus. No special app permissions or theme modifications required.",
  },
  {
    q: "Can I try it before paying?",
    a: "Yes! Every account starts with a free AI-readiness scan of up to 10 products. You'll see exactly what AI search engines can and can't read about your products — no credit card required.",
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
            Common questions about how Beseam prepares Shopify catalogs for AI
            search without breaking live storefronts.
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
