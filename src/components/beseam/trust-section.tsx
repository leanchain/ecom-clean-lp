"use client";

import Image from "next/image";

import { motion } from "framer-motion";
import { Check, Lock, Shield, Star } from "lucide-react";

const platforms = [
  { name: "ChatGPT", logo: "/images/ai-platforms/chatgpt.svg" },
  { name: "Google", logo: "/images/ai-platforms/google.svg" },
  { name: "Gemini", logo: "/images/ai-platforms/gemini.svg" },
  { name: "AI Mode", logo: "/images/ai-platforms/ai-mode.svg" },
  { name: "Perplexity", logo: "/images/ai-platforms/perplexity.svg" },
];

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

const complianceItems = [
  { icon: Shield, label: "GDPR compliant" },
  { icon: Shield, label: "CASA Tier II verified" },
  { icon: Shield, label: "CCPA compliant" },
  { icon: Lock, label: "SOC 2 Type II (in progress)" },
];

const enterpriseFeatures = [
  "Shopify-native integration",
  "No store data stored on our servers",
  "Read-only access by default",
  "Rollback protection on all publishes",
];

export default function TrustSection() {
  return (
    <section className="bg-muted/30 px-4 py-20 sm:px-6 md:py-28">
      <div className="container max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">
            Built for production
          </p>
          <h2 className="font-heading text-3xl font-bold tracking-tight md:text-5xl">
            Secure, compliant,{" "}
            <span className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent italic">
              ready to scale.
            </span>
          </h2>
        </motion.div>

        {/* AI Platforms tracked */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 rounded-2xl border border-border bg-background p-6 text-center md:p-8"
        >
          <p className="mb-6 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            AI shopping surfaces we track
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8">
            {platforms.map((platform) => (
              <div
                key={platform.name}
                className="flex flex-col items-center gap-1.5"
              >
                <div className="flex h-10 w-10 items-center justify-center md:h-12 md:w-12">
                  <Image
                    alt={platform.name}
                    className="h-full w-full object-contain"
                    src={platform.logo}
                    width={48}
                    height={48}
                  />
                </div>
                <span className="text-[10px] font-medium text-muted-foreground">
                  {platform.name}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Testimonials */}
        <div className="mb-12 grid gap-5 md:grid-cols-2">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="rounded-2xl border border-border bg-background p-6"
            >
              <div className="mb-3 flex gap-0.5">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star
                    key={j}
                    className="h-4 w-4 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>
              <p className="text-sm italic leading-relaxed text-foreground/80">
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

        {/* Compliance + Enterprise grid */}
        <div className="grid gap-5 md:grid-cols-2">
          {/* Compliance */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl border border-border bg-background p-6"
          >
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-foreground">
              Compliance
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {complianceItems.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-2.5 rounded-xl bg-muted/30 px-3 py-2.5"
                >
                  <item.icon className="h-4 w-4 shrink-0 text-emerald-600" />
                  <span className="text-xs font-medium text-foreground/80">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Enterprise features */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="rounded-2xl border border-border bg-background p-6"
          >
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-foreground">
              Enterprise ready
            </h3>
            <ul className="space-y-3">
              {enterpriseFeatures.map((feature) => (
                <li key={feature} className="flex items-center gap-2.5">
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-50">
                    <Check className="h-3 w-3 text-emerald-600" />
                  </div>
                  <span className="text-sm text-foreground/80">{feature}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
