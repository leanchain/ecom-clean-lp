"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    q: "What is AI commerce readiness?",
    a: "AI commerce readiness measures how well AI shopping engines — like ChatGPT, Gemini, and Perplexity — can read and understand your product pages. A store with high AI readiness gets recommended accurately with correct prices, descriptions, and selling points. A store with low readiness gets skipped or misrepresented.",
  },
  {
    q: "Which AI engines does Beseam track?",
    a: "Beseam tracks 13 AI engines: ChatGPT, Gemini (Google AI), Perplexity, Claude, Bing Copilot, Meta AI, Grok, You.com, Brave AI, DeepSeek, Phind, Amazon Rufus, and Shopify Sidekick. We add new engines as they emerge.",
  },
  {
    q: "How does the AI product probe work?",
    a: "Beseam sends an LLM to read your product page exactly like ChatGPT or Gemini would. It checks whether AI can correctly identify the product, understand its price and availability, find selling points, and confidently recommend it. You see a side-by-side comparison of what AI understood vs. your actual product data.",
  },
  {
    q: "What kind of fixes does Beseam generate?",
    a: "AI-generated fixes for structured data (Product, Offer, Review schema), meta descriptions, content gaps, and selling point clarity. You review a before/after preview and approve before anything publishes. Nothing goes live without your explicit approval.",
  },
  {
    q: "How does Shopify publish work?",
    a: "Once you approve a fix, Beseam publishes it directly to your Shopify store. Every change includes rollback protection — one click to revert if anything looks wrong. No developer access or theme changes required.",
  },
  {
    q: "What does 'verify' mean?",
    a: "After a fix goes live, Beseam re-runs the AI probe and diagnostics. You see a before/after comparison of your AI readiness score, plus exactly how each AI engine's understanding of your products improved.",
  },
  {
    q: "How is this different from regular SEO audits?",
    a: "Traditional SEO audits check what Google's crawler sees. Beseam checks what AI engines understand — including whether they can identify your product, read correct pricing, and find compelling reasons to recommend it. It's the difference between being indexed and being recommended.",
  },
  {
    q: "What Shopify plans do you support?",
    a: "Beseam works with all Shopify plans — Basic, Shopify, Advanced, and Shopify Plus. No developer access or theme changes required.",
  },
  {
    q: "How long does it take to see results?",
    a: "You'll see your AI readiness score within minutes of scanning your store. Fix generation happens immediately after. Most stores see measurable AI readiness improvement within the first week of publishing fixes.",
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
            Common questions about AI commerce readiness, what Beseam audits,
            and how to get your products recommended by AI.
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
