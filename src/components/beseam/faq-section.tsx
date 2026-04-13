"use client";

import { useState } from "react";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "What does the free scan do?",
    a: "It checks one public Shopify product page for the signals AI shopping surfaces rely on: product clarity, structured data, reviews, pricing, shipping, and overall trust. You get a short report with the top issues and the first fix worth making.",
  },
  {
    q: "Do I need to install a Shopify app?",
    a: "No. Start with a free scan using just a public URL. You can connect your Shopify store later if you want to publish fixes or enable monitoring.",
  },
  {
    q: "What happens after the scan?",
    a: "You get an AI visibility report showing what blocks AI agents from recommending your products. From there you can generate fixes, publish them to Shopify, and monitor improvements.",
  },
  {
    q: "Is this Shopify-only?",
    a: "Yes. Beseam is built specifically for Shopify stores. Keeping the focus narrow means deeper integration and better results.",
  },
  {
    q: "Does Beseam push my products to AI engines?",
    a: "No. Beseam makes your product pages ready for AI surfaces by fixing the structured data, content, and signals those engines rely on. The traffic comes organically.",
  },
  {
    q: "What AI engines does Beseam track?",
    a: "ChatGPT, Google AI Mode, Gemini, Perplexity, Claude, Meta AI, Grok, and several others — 13 AI shopping surfaces in total.",
  },
  {
    q: "Can you help implement fixes?",
    a: "Yes. Beseam generates fixes automatically for most issues. For complex cases, you can book a fix sprint where our team prioritizes and implements changes with you.",
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
            Common questions
          </h2>
          <p className="text-muted-foreground mt-4 mx-auto max-w-2xl text-lg leading-relaxed">
            Everything you need to know about getting started with Beseam.
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
