"use client";

import React from "react";
import { motion } from "framer-motion";
import { Shield, Activity, Bot, GitBranch } from "lucide-react";

const metrics = [
  {
    id: 1,
    icon: Shield,
    value: "Safe",
    label: "At Scale",
    description: "Deploy PDP improvements with built-in rollback",
  },
  {
    id: 2,
    icon: Activity,
    value: "24/7",
    label: "Monitoring",
    description: "Continuous KPI tracking after every change",
  },
  {
    id: 3,
    icon: Bot,
    value: "6",
    label: "AI Agents",
    description: "Specialized agents handle the full upgrade-protect loop",
  },
  {
    id: 4,
    icon: GitBranch,
    value: "CI/CD",
    label: "For PDPs",
    description: "Versioned, reversible, staged deployments",
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
