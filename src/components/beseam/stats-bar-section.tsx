"use client";

import { motion } from "framer-motion";

const stats = [
  {
    value: "~70%",
    label: "of online carts abandoned",
    sub: "documented average - Baymard Institute",
  },
  {
    value: "Silent",
    label: "checkout & payment bugs go unreported",
    sub: "not price, not UX - code that fails quietly",
  },
  {
    value: "No warning",
    label: "most shoppers just leave",
    sub: "no error report, no second chance",
  },
  {
    value: "< 30 min",
    label: "to detect with Beseam",
    sub: "vs days of silent loss otherwise",
    highlight: true,
  },
];

export default function StatsBarSection() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6, duration: 0.6 }}
      className="border-y border-border/40 bg-muted/40"
    >
      <div className="container max-w-6xl">
        <div className="grid grid-cols-2 divide-x divide-y divide-border/40 md:grid-cols-4 md:divide-y-0">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center justify-center px-6 py-7 text-center"
            >
              <span className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent text-2xl font-black md:text-3xl">
                {stat.value}
              </span>
              <span className="mt-1 text-xs font-semibold text-foreground/70">
                {stat.label}
              </span>
              <span
                className={`mt-0.5 text-[10px] leading-tight ${stat.highlight ? "font-bold text-emerald-600" : "text-muted-foreground/60"}`}
              >
                {stat.sub}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
