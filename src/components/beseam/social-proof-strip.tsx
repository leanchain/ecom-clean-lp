"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Bettina Gimenez",
    role: "Founder, DancingQueens",
    image: "/images/testimonials/bettina.jpeg",
    quote:
      "Beseam completely changed how AI engines understand our products. We went from invisible to recommended — and saw it in our traffic within weeks.",
  },
  {
    name: "Sharon Bottana",
    role: "E-commerce Manager, DancingQueens",
    image: "/images/testimonials/sharon.jpeg",
    quote:
      "We used to wonder why ChatGPT never mentioned us. Beseam showed us exactly what AI was getting wrong on our pages — and the fixes were live in a day.",
  },
];

const stats = [
  { value: "127+", label: "Stores trust Beseam" },
  { value: "118+", label: "AI readability checks" },
  { value: "13", label: "AI engines tracked" },
];

export default function SocialProofStrip() {
  return (
    <section className="bg-background px-4 py-16 sm:px-6 md:py-20">
      <div className="mx-auto max-w-6xl">
        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 grid grid-cols-3 gap-6"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className="flex flex-col items-center gap-1 text-center"
            >
              <span className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                {stat.value}
              </span>
              <span className="text-xs font-medium text-muted-foreground">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonials */}
        <div className="grid gap-6 md:grid-cols-2">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="rounded-2xl border border-border bg-muted/20 p-6"
            >
              <div className="mb-3 flex gap-0.5">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star
                    key={j}
                    className="h-4 w-4 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>
              <p className="text-sm leading-relaxed text-foreground/80 italic">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-4 flex items-center gap-3">
                <Image
                  src={t.image}
                  alt={t.name}
                  width={40}
                  height={40}
                  className="rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {t.name}
                  </p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
