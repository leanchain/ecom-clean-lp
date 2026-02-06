"use client";

import React from "react";
import {
  ShoppingCart,
  TrendingUp,
  Package,
  Palette,
  Users,
  Rocket,
} from "lucide-react";

const roles = [
  {
    icon: ShoppingCart,
    title: "E-commerce Managers",
    description:
      "Stop waiting weeks for product launches. Beseam generates complete, AI-ready PDPs in minutes—images, video, copy, and schema included.",
  },
  {
    icon: TrendingUp,
    title: "Growth & Marketing Teams",
    description:
      "Unlock a new traffic channel. When ChatGPT or Perplexity recommends products, your catalog shows up—not your competitors'.",
  },
  {
    icon: Package,
    title: "Product Teams",
    description:
      "Finally give your products the context they deserve. Deep narratives, FAQs, and comparisons that answer every buyer question.",
  },
  {
    icon: Palette,
    title: "Content & Creative Teams",
    description:
      "Generate consistent, on-brand visuals at scale. No more coordinating photoshoots or briefing designers for every SKU.",
  },
  {
    icon: Users,
    title: "Agencies & Consultants",
    description:
      "Deliver measurable results for e-commerce clients. Offer AI visibility audits and optimization as a high-value service.",
  },
  {
    icon: Rocket,
    title: "DTC Founders",
    description:
      "Compete with enterprise brands on a startup budget. Professional PDPs that look and perform like you have a full team behind them.",
  },
];

const WhoItsFor = () => {
  return (
    <section className="py-20 md:py-32">
      <div className="container">
        {/* Header */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-5xl">
            Built for Every Role in E-commerce
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg md:text-xl">
            Whether you're launching products or scaling a catalog, Beseam
            adapts to your workflow
          </p>
        </div>

        {/* Roles Grid */}
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2 lg:grid-cols-3">
          {roles.map((role, index) => {
            const Icon = role.icon;
            return (
              <div
                key={index}
                className="group flex flex-col items-start rounded-3xl border bg-card p-6 shadow-sm transition-all hover:shadow-md md:p-8"
              >
                {/* Icon */}
                <div className="bg-primary/10 text-primary mb-4 flex h-12 w-12 items-center justify-center rounded-full">
                  <Icon className="h-6 w-6" strokeWidth={2} />
                </div>

                {/* Content */}
                <h3 className="mb-3 text-xl font-semibold">{role.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed md:text-base">
                  {role.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhoItsFor;
