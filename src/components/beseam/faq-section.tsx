"use client";

import { useState } from "react";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "What does the free scan do?",
    a: "It checks one public Shopify product page for the signals AI shopping experiences rely on most: product clarity, structured data, reviews, pricing, availability, shipping, returns, and overall trust.",
  },
  {
    q: "Do I need to connect Shopify first?",
    a: "No. The launch flow is intentionally value-first. Paste a public PDP URL and see the report before you connect anything.",
  },
  {
    q: "What do I get from the scan?",
    a: "A short AI visibility report with the biggest blockers, what AI may be missing, and the first fix worth making.",
  },
  {
    q: "Is this Shopify-only?",
    a: "Yes for launch. Keeping the offer narrow makes it easier to understand and easier to buy.",
  },
  {
    q: "Does Beseam push my products to ChatGPT or Gemini?",
    a: "Not as the first product. Shopify, feeds, structured data, and merchant systems are increasingly becoming the distribution layer. Beseam focuses on whether your PDPs are ready for those surfaces.",
  },
  {
    q: "What is the paid next step?",
    a: "A fix sprint. We review the report, prioritize the highest-impact changes, and help you ship the fixes that matter first.",
  },
  {
    q: "Can you help implement the fixes too?",
    a: "Yes. The free scan is the proof layer. If the report finds real issues, the fix sprint turns it into an implementation plan and, where needed, hands-on support.",
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
    <section id="faq" className="bg-background px-4 py-20 sm:px-6 md:py-28">
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
            Questions before you run the scan
          </h2>
          <p className="text-muted-foreground mt-4 mx-auto max-w-2xl text-lg leading-relaxed">
            The launch offer should feel obvious: free scan first, then a paid
            fix sprint only if the report finds something worth fixing.
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
