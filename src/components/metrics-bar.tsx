"use client";

import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, Clock, Zap, DollarSign } from "lucide-react";

const metrics = [
  {
    id: 1,
    icon: TrendingUp,
    value: "3-5×",
    label: "Higher AI Search Visibility",
    description: "Get recommended more often in ChatGPT & Perplexity",
  },
  {
    id: 2,
    icon: Clock,
    value: "10×",
    label: "Faster Than Manual Work",
    description: "Generate complete PDPs in minutes, not days",
  },
  {
    id: 3,
    icon: Zap,
    value: "100+",
    label: "Products Per Day",
    description: "Scale your catalog with AI-powered automation",
  },
  {
    id: 4,
    icon: DollarSign,
    value: "$1-10",
    label: "Cost Per Product",
    description: "vs $100s-1000s with traditional methods",
  },
];

const MetricsBar = () => {
  return (
    <section className="py-12 md:py-16 bg-muted/30">
      <div className="container">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <motion.div
                key={metric.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col items-center text-center p-6 rounded-3xl border border-border bg-background"
              >
                <div className="mb-4">
                  <Icon className="size-8 text-primary" />
                </div>
                <div className="mb-2">
                  <span className="text-4xl font-bold text-foreground">
                    {metric.value}
                  </span>
                </div>
                <h3 className="text-sm font-semibold text-foreground mb-2">
                  {metric.label}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {metric.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default MetricsBar;

