"use client";

import { motion } from "framer-motion";
import {
  ShoppingCart,
  CreditCard,
  Smartphone,
  Zap,
  Globe,
  MousePointerClick,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Detection {
  icon: LucideIcon;
  title: string;
  impact: string;
  description: string;
  tag: string;
}

const detections: Detection[] = [
  {
    icon: ShoppingCart,
    title: "Checkout & Cart Failures",
    impact: "€1K–€10K per incident",
    description:
      "Add-to-cart not responding, checkout flow broken, cart not updating. The #1 revenue killer.",
    tag: "Revenue Critical",
  },
  {
    icon: CreditCard,
    title: "Payment Errors by Country",
    impact: "€2K–€30K if undetected",
    description:
      "PayPal/Stripe/Klarna failures by country. Currency mismatch at checkout.",
    tag: "Revenue Critical",
  },
  {
    icon: Smartphone,
    title: "Broken UI by Device",
    impact: "€500–€5K per incident",
    description:
      "Frozen dropdowns, dead buttons, broken navigation — on devices you don't test.",
    tag: "Conversion Killer",
  },
  {
    icon: Zap,
    title: "App Conflicts & JS Errors",
    impact: "€500–€8K per incident",
    description:
      "Theme updates breaking features. Third-party app conflicts. Script crashes.",
    tag: "Silent Breaker",
  },
  {
    icon: Globe,
    title: "Wrong Content by Region",
    impact: "+20–40% abandonment",
    description:
      "Wrong currency, wrong language, missing images, incorrect pricing. Destroys trust.",
    tag: "Trust Destroyer",
  },
  {
    icon: MousePointerClick,
    title: "Frustration Signals",
    impact: "Leading indicator",
    description:
      "Rage clicks, dead clicks, repeated failed attempts. Early warnings before revenue drops.",
    tag: "Early Warning",
  },
];

export default function DetectionSection() {
  return (
    <section
      id="what-we-detect"
      className="bg-background px-4 py-20 sm:px-6 md:py-32"
    >
      <div className="container max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className="text-primary mb-3 text-sm font-semibold uppercase tracking-wider">
            Detection Coverage
          </p>
          <h2 className="font-heading text-3xl font-bold tracking-tight md:text-5xl">
            Everything that{" "}
            <span className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
              silently drains your revenue.
            </span>
          </h2>
          <p className="mt-4 mx-auto max-w-xl text-base leading-relaxed text-muted-foreground">
            Six categories of invisible failures — each one costing money while
            you have no idea they exist.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {detections.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.07 * index, duration: 0.5 }}
              className="flex flex-col rounded-2xl border border-border bg-background p-7 transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              {/* Large bare icon */}
              <item.icon className="mb-4 h-8 w-8 text-primary" />

              <h3 className="text-base font-bold text-foreground">
                {item.title}
              </h3>
              <p className="mt-1 text-xs font-semibold text-primary">
                {item.impact}
              </p>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>

              <div className="mt-4 border-t border-border/50 pt-3">
                <span className="rounded-full bg-primary/8 px-2.5 py-1 text-[10px] font-bold text-primary">
                  {item.tag}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
