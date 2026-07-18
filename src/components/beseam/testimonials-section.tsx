"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  initials: string;
  revenue?: string;
  kind: string;
}

// NOTE: Representative examples, not verified customer quotes.
// Swap in real, attributable testimonials before publishing.
const testimonials: Testimonial[] = [
  {
    quote:
      "I had no idea PayPal was broken for my German customers for three days. Beseam caught the next one in 18 minutes and told me exactly which app update caused it. That single alert paid for a full year.",
    name: "Electronics merchant",
    role: "Shopify Plus · Germany",
    initials: "EM",
    revenue: "€6,200 saved",
    kind: "Purchase health",
  },
  {
    quote:
      "Beseam completely changed how AI engines understand our products. We went from invisible to recommended — and saw it reflected in our traffic within weeks.",
    name: "Apparel merchant",
    role: "Shopify · EU",
    initials: "AM",
    kind: "Discoverability",
  },
];

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <div className="flex h-full w-full flex-col rounded-2xl border border-border bg-background p-9 shadow-lg">
      {/* Stars + kind */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className="h-[18px] w-[18px] fill-amber-400 text-amber-400"
            />
          ))}
        </div>
        <span className="rounded-full bg-primary/8 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-primary">
          {t.kind}
        </span>
      </div>

      {/* Quote */}
      <p
        className="mb-6 flex-1 text-foreground"
        style={{ fontSize: "17px", lineHeight: "1.65" }}
      >
        &ldquo;{t.quote}&rdquo;
      </p>

      {/* Author */}
      <div className="flex items-center gap-3.5">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-primary bg-primary/10 text-sm font-bold text-primary">
          {t.initials}
        </div>
        <div className="flex-1">
          <strong className="block text-[15px] font-bold text-foreground">
            {t.name}
          </strong>
          <p style={{ fontSize: "13px", color: "var(--muted-foreground)" }}>
            {t.role}
          </p>
        </div>
        {t.revenue && (
          <span className="shrink-0 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-700">
            {t.revenue}
          </span>
        )}
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(
      () => setIdx((i) => (i + 1) % testimonials.length),
      5000,
    );
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="bg-background px-4 py-20 sm:px-6 md:py-32">
      <div className="container max-w-6xl">
        {/* Left-aligned header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 max-w-2xl"
        >
          <p className="text-primary mb-3 text-sm font-semibold uppercase tracking-wider">
            Testimonials
          </p>
          <h2 className="font-heading text-3xl font-bold tracking-tight md:text-4xl">
            Real stores. Real incidents.{" "}
            <span className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
              Caught before they became disasters.
            </span>
          </h2>
          <p className="mt-3 text-xs text-muted-foreground">
            Representative examples across purchase health and discoverability.
          </p>
        </motion.div>

        {/* Desktop: 2 cards side by side */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="hidden gap-6 md:grid md:grid-cols-2"
        >
          {testimonials.map((t) => (
            <TestimonialCard key={t.name} t={t} />
          ))}
        </motion.div>

        {/* Mobile: single-card slider */}
        <div className="relative flex flex-col items-center gap-6 md:hidden">
          <div className="relative w-full">
            <button
              onClick={() =>
                setIdx(
                  (i) => (i - 1 + testimonials.length) % testimonials.length,
                )
              }
              aria-label="Previous testimonial"
              className="absolute -left-5 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background text-[18px] transition-colors hover:border-primary hover:text-primary"
            >
              &#8592;
            </button>

            <div className="px-8">
              <TestimonialCard t={testimonials[idx]} />
            </div>

            <button
              onClick={() => setIdx((i) => (i + 1) % testimonials.length)}
              aria-label="Next testimonial"
              className="absolute -right-5 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background text-[18px] transition-colors hover:border-primary hover:text-primary"
            >
              &#8594;
            </button>
          </div>

          {/* Dots */}
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                className={`h-2 w-2 rounded-full border-0 p-0 transition-all ${
                  i === idx ? "scale-125 bg-primary" : "bg-border"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
