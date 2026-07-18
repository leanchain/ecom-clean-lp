"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

const plans = [
  {
    name: "Audit",
    price: "Free",
    period: "",
    description: "See what\u2019s broken today",
    badge: null,
    features: [
      { text: "One-time SEO scan (10 products)", included: true },
      { text: "Full health report with revenue impact", included: true },
      { text: "AI-fixable vs. manual breakdown", included: true },
      { text: "No real-time monitoring", included: false },
    ],
    cta: "Scan my store \u2192",
    ctaStyle: "outline" as const,
    href: "https://app.beseam.com/store",
  },
  {
    name: "Guard",
    price: "\u20ac199",
    period: "/ month",
    description: "For stores up to \u20ac500K annual revenue",
    badge: "Most Popular",
    features: [
      { text: "24/7 real-time revenue guard", included: true },
      { text: "Instant alerts (WhatsApp + Email + Slack)", included: true },
      { text: "Revenue impact (€) on every alert", included: true },
      { text: "Detection across all devices & countries", included: true },
      {
        text: "\u201CWhat broke + how to fix it\u201D in plain language",
        included: true,
      },
      { text: "Weekly SEO scans (1,000 products)", included: true },
      { text: "AI auto-fixes for SEO issues", included: true },
      { text: "Push to Shopify with rollback", included: true },
    ],
    cta: "Start Guarding Revenue \u2192",
    ctaStyle: "primary" as const,
    href: "https://app.beseam.com/store",
  },
  {
    name: "Scale",
    price: "\u20ac499",
    period: "/ month",
    description: "For stores \u20ac500K\u2013\u20ac5M annual revenue",
    badge: null,
    features: [
      { text: "Everything in Guard", included: true },
      { text: "Up to 3 stores / 5,000 products", included: true },
      { text: "Daily SEO scans", included: true },
      { text: "Priority detection (< 5 min)", included: true },
      { text: "Custom alert rules & thresholds", included: true },
      { text: "Slack integration", included: true },
      { text: "Dedicated support", included: true },
    ],
    cta: "Start Scaling \u2192",
    ctaStyle: "outline" as const,
    href: "https://app.beseam.com/store",
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For stores over \u20ac5M annual revenue",
    badge: null,
    features: [
      { text: "Everything in Scale", included: true },
      { text: "Unlimited stores & products", included: true },
      { text: "Real-time priority detection", included: true },
      { text: "Custom integrations", included: true },
      { text: "SLA & dedicated account manager", included: true },
      {
        text: "Early access: Intent Detection & Revenue Intelligence",
        included: true,
      },
    ],
    cta: "Talk to Us \u2192",
    ctaStyle: "outline" as const,
    href: "mailto:contact@beseam.com",
  },
];

export default function PricingSection() {
  return (
    <section id="pricing" className="bg-muted/30 px-4 py-20 sm:px-6 md:py-32">
      <div className="container max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-4 text-center"
        >
          <p className="text-primary mb-3 text-sm font-semibold uppercase tracking-wider">
            Pricing
          </p>
          <h2 className="font-heading text-3xl font-bold tracking-tight md:text-5xl">
            One broken checkout costs more than{" "}
            <span className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
              a year of Beseam.
            </span>
          </h2>
          <p className="mt-4 text-base text-muted-foreground max-w-2xl mx-auto">
            Starts at &euro;199/month. Scales with your revenue. No sales calls.
            No hidden fees.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
              className={`relative flex flex-col rounded-2xl border bg-background p-6 transition-all hover:-translate-y-0.5 hover:shadow-lg ${
                plan.badge
                  ? "border-primary shadow-xl ring-1 ring-primary/20"
                  : "border-border hover:border-primary"
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="rounded-full bg-primary px-4 py-1 text-xs font-bold text-primary-foreground">
                    {plan.badge}
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-lg font-bold text-foreground">
                  {plan.name}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {plan.description}
                </p>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-foreground">
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-sm text-muted-foreground">
                      {plan.period}
                    </span>
                  )}
                </div>
              </div>

              <ul className="mb-8 flex-1 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature.text} className="flex items-start gap-2">
                    {feature.included ? (
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    ) : (
                      <X className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground/40" />
                    )}
                    <span
                      className={`text-sm ${feature.included ? "text-muted-foreground" : "text-muted-foreground/50 line-through"}`}
                    >
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              <a
                href={plan.href}
                className={`flex items-center justify-center rounded-full py-3 text-sm font-semibold transition-colors ${
                  plan.ctaStyle === "primary"
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "border border-border text-foreground hover:bg-muted"
                }`}
              >
                {plan.cta}
              </a>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-8 space-y-3 text-center"
        >
          <p className="text-sm text-muted-foreground">
            14-day free trial on all paid plans. Cancel anytime. One prevented
            incident pays for months of Beseam.
          </p>
          <div className="mx-auto max-w-xl rounded-xl border border-primary/20 bg-primary/5 p-4">
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">
                Pricing scales with your revenue.
              </span>{" "}
              Small store? &euro;199/mo. Growing fast? We grow with you. Every
              plan includes the full revenue guard — no feature gates.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
