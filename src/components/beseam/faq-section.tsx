"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    q: "How much time do I have to invest?",
    a: "Very little. Most stores are fully scanned in under 2 minutes, and our AI fixes the most common issues automatically — no manual work needed. Reviewing and approving fixes takes around 10–15 minutes. After that, Beseam monitors your store continuously so you don't have to think about it.",
  },
  {
    q: "Do I need to hire someone to use this?",
    a: "No. Beseam is built for store owners and e-commerce managers, not developers or technical experts. Everything is explained in plain language, and most fixes happen with a single click. You don't need an agency, a developer, or any technical knowledge.",
  },
  {
    q: "When do I see a return on my investment?",
    a: "Many stores start seeing improvement within weeks of fixing their product listings. AI shopping tools like ChatGPT and Google are already recommending products to buyers — stores that are properly set up get picked over those that aren't. The sooner you fix it, the sooner you capture that traffic.",
  },
  {
    q: "Why aren't AI tools recommending my products right now?",
    a: "AI shopping assistants like ChatGPT, Google, and Perplexity look for specific information on your product pages before they can recommend them. If that information is missing or incomplete, your products simply won't show up — even if they're great. Beseam finds what's missing and fixes it automatically.",
  },
  {
    q: "How is this different from regular SEO?",
    a: 'Regular SEO is about getting your pages ranked on Google. AI search is different — these tools actively recommend specific products to shoppers who ask questions like "best linen dress under $80." Beseam ensures your products have everything AI tools need to recommend them confidently.',
  },
  {
    q: "Which AI shopping tools will this help with?",
    a: "ChatGPT, Google Gemini, Perplexity, Microsoft Copilot, and other AI shopping assistants. All of them look for the same basic product information — Beseam makes sure your catalog speaks their language.",
  },
  {
    q: "Will Beseam break my store?",
    a: "No. Every fix is saved before it goes live, and you review a before/after preview before approving. If anything ever looks wrong, one click reverts the change instantly.",
  },
  {
    q: "What Shopify plans do you support?",
    a: "Beseam works with all Shopify plans — Basic, Shopify, Advanced, and Shopify Plus. No developer access or theme changes required.",
  },
  {
    q: "Can I try it before paying?",
    a: "Yes! Every account starts with a free scan of up to 10 products. You'll see exactly what AI shopping tools can and can't find about your products — no credit card required.",
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
            Everything you need to know about getting your store recommended by
            AI shopping tools — without any technical headaches.
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
