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
      "Launch products 10× faster with AI-powered PDPs. No more waiting on copywriters or designers—get complete product pages in minutes.",
  },
  {
    icon: TrendingUp,
    title: "Marketing Teams",
    description:
      "Drive more organic traffic from AI search engines. Get recommended 3-5× more often in ChatGPT, Perplexity, and other AI platforms.",
  },
  {
    icon: Package,
    title: "Product Managers",
    description:
      "Create deep product context that converts browsers to buyers. Build persuasion graphs that work for both AI discovery and human conversion.",
  },
  {
    icon: Palette,
    title: "Content Creators",
    description:
      "Generate images, videos, and copy from one source of truth. Keep everything on-brand and consistent across all your product pages.",
  },
  {
    icon: Users,
    title: "Agency Partners",
    description:
      "Scale client work without scaling headcount. Deliver professional PDPs for multiple clients while maintaining quality and speed.",
  },
  {
    icon: Rocket,
    title: "Solo Entrepreneurs",
    description:
      "Professional PDPs without the professional budget. Compete with bigger brands using AI-powered content that punches above its weight.",
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
            Whether you're launching products or scaling a catalog, Fisca adapts
            to your workflow
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
