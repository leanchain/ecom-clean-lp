"use client";

import {
  BarChart3,
  BookOpen,
  AlertTriangle,
  History,
  Package,
} from "lucide-react";
import React, { useState } from "react";

import CategoryBadge from "@/components/category-badge";

const tabs = [
  {
    id: "scoreboard",
    title: "Scoreboard",
    icon: BarChart3,
    description:
      "See your entire catalog at a glance. AI visibility scores, conversion readiness, and performance - all in one view. Prioritize what to fix first.",
    bullets: [
      "AI visibility + conversion readiness scores per PDP",
      "Prioritized by revenue impact",
      "Filter by category, brand, or performance tier",
    ],
    mockup: {
      header: "Top PDPs by Priority",
      rows: [
        {
          name: "Nimbus Trail Runner",
          ai: 92,
          conv: 78,
          status: "Upgrade Ready",
          statusColor: "text-emerald-500",
        },
        {
          name: "Alpine Pro Jacket",
          ai: 67,
          conv: 45,
          status: "Needs Work",
          statusColor: "text-amber-500",
        },
        {
          name: "Summit Daypack 25L",
          ai: 43,
          conv: 38,
          status: "Critical",
          statusColor: "text-red-500",
        },
        {
          name: "Cascade Rain Shell",
          ai: 88,
          conv: 82,
          status: "Healthy",
          statusColor: "text-emerald-500",
        },
      ],
    },
  },
  {
    id: "playbooks",
    title: "Playbooks",
    icon: BookOpen,
    description:
      "AI-generated upgrade recommendations you can apply directly or hand to your agency. Each playbook is versioned and reversible - review the diff before deploying.",
    bullets: [
      "Prioritized improvements per PDP",
      "Apply directly or share with your agency to refine",
      "Every change is versioned with full rollback",
    ],
    mockup: {
      header: "Playbook: Alpine Pro Jacket",
      items: [
        {
          action: "Add FAQ section with schema.org",
          impact: "+18 pts",
          type: "add",
        },
        {
          action: "Generate deep product narrative",
          impact: "+15 pts",
          type: "add",
        },
        {
          action: "Add comparison table vs competitors",
          impact: "+12 pts",
          type: "add",
        },
        {
          action: "Optimize meta description for AI",
          impact: "+8 pts",
          type: "update",
        },
      ],
    },
  },
  {
    id: "incidents",
    title: "Incidents",
    icon: AlertTriangle,
    description:
      "When KPIs regress after any change - from your agency, dev team, or AI - Beseam explains what happened, identifies the source, and recommends whether to rollback, iterate, or keep.",
    bullets: [
      "Auto-detected regressions with source attribution",
      "Change diff linked to KPI impact",
      "One-click rollback or guided fix",
    ],
    mockup: {
      header: "Active Incident",
      incident: {
        product: "Nimbus Trail Runner",
        metric: "Conversion Rate",
        change: "-12%",
        cause: "Dev team theme publish removed FAQ module",
        recommendation: "Rollback to v2.1",
        severity: "High",
      },
    },
  },
  {
    id: "history",
    title: "History",
    icon: History,
    description:
      "A complete timeline of every PDP change - whether from your agency, dev team, or Beseam AI. See who changed what, when, and what happened to revenue afterward.",
    bullets: [
      "Full attribution: agency, internal, or AI-generated",
      "Filter by product, source, or outcome",
      "Compare any two versions side-by-side",
    ],
    mockup: {
      header: "Change Timeline",
      entries: [
        {
          date: "Today",
          action: "FAQ section added",
          product: "Alpine Pro Jacket",
          impact: "+18 pts",
          author: "Beseam AI",
        },
        {
          date: "Yesterday",
          action: "Copy refreshed for spring",
          product: "Nimbus Trail Runner",
          impact: "+5 pts",
          author: "SEO Agency",
        },
        {
          date: "Feb 18",
          action: "Theme layout updated",
          product: "All PDPs",
          impact: "-3 pts avg",
          author: "Dev Team",
        },
        {
          date: "Feb 16",
          action: "Schema markup added",
          product: "Summit Daypack",
          impact: "+22 pts",
          author: "Beseam AI",
        },
      ],
    },
  },
];

import { motion, AnimatePresence } from "framer-motion";

const Feature57 = () => {
  const [selection, setSelection] = useState(0);

  return (
    <section id="platform" className="relative overflow-hidden py-24 md:py-32 bg-background">
      {/* Background glow effects */}
      <div className="absolute right-0 top-1/4 -z-10 h-[500px] w-[500px] bg-primary/5 blur-[120px] rounded-full" />
      <div className="absolute left-0 bottom-1/4 -z-10 h-[500px] w-[500px] bg-secondary/5 blur-[120px] rounded-full" />

      <div className="container relative mx-auto px-4">
        <div className="mb-16 text-center md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-6 flex justify-center">
              <CategoryBadge
                label="Platform Preview"
                icon={<Package className="h-4 w-4" />}
              />
            </div>
            <h2 className="font-heading mb-6 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl tracking-tight">
              One Platform. <span className="text-primary italic">Every PDP Change.</span>
            </h2>
            <p className="text-muted-foreground/90 mx-auto max-w-2xl text-lg md:text-xl leading-relaxed">
              AI recommendations, agency deliverables, and internal updates - all
              managed, monitored, and protected in one place.
            </p>
          </motion.div>
        </div>
        
        <div className="mx-auto max-w-6xl">
          {/* Tab Navigation */}
          <div className="mb-12 flex justify-center gap-2 overflow-x-auto pb-4 scrollbar-hide md:gap-4 md:pb-0">
            {tabs.map((tab, i) => {
              const isSelected = selection === i;
              return (
                <button
                  key={i}
                  className={`group relative flex cursor-pointer items-center gap-2.5 rounded-full border px-6 py-3.5 transition-all duration-300 ${
                    isSelected
                      ? "border-primary/20 bg-primary/5 ring-1 ring-primary/20"
                      : "hover:border-border/60 hover:bg-accent border-transparent"
                  }`}
                  onClick={() => setSelection(i)}
                  aria-label={tab.title}
                >
                  <tab.icon
                    className={`size-4.5 transition-colors ${
                      isSelected ? "text-primary" : "text-muted-foreground/60"
                    }`}
                  />
                  <span
                    className={`whitespace-nowrap text-sm font-bold transition-colors ${
                      isSelected ? "text-foreground" : "text-muted-foreground/60 group-hover:text-muted-foreground"
                    }`}
                  >
                    {tab.title}
                  </span>
                  {isSelected && (
                    <motion.div
                      layoutId="tab-underline"
                      className="absolute -bottom-1 left-1/2 h-1 w-8 -translate-x-1/2 rounded-full bg-primary"
                    />
                  )}
                </button>
              );
            })}
          </div>

          <div className="flex flex-col gap-10 md:flex-row md:items-center md:gap-12 lg:gap-20">
            {/* Text Section */}
            <div className="md:w-1/2 lg:w-[40%]">
              <div className="relative h-[320px] md:h-[400px]">
                <AnimatePresence mode="wait">
                  {tabs.map((tab, i) => {
                    const isSelected = selection === i;
                    if (!isSelected) return null;
                    return (
                      <motion.div
                        key={tab.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="absolute inset-0 flex flex-col justify-center"
                      >
                        <div className="mb-8 flex items-center gap-4">
                          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-sm border border-primary/20">
                            <tab.icon className="size-7" />
                          </div>
                          <h3 className="font-heading text-foreground text-3xl font-bold md:text-4xl">
                            {tab.title}
                          </h3>
                        </div>
                        <p className="text-muted-foreground/90 text-lg leading-relaxed mb-8">
                          {tab.description}
                        </p>
                        <ul className="space-y-4">
                          {tab.bullets.map((bullet, idx) => (
                            <li key={idx} className="flex items-start gap-3.5 group">
                              <div className="mt-1.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary border border-primary/20 transition-transform group-hover:scale-110">
                                <svg
                                  className="size-2.5"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  strokeWidth={4}
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                              </div>
                              <span className="text-muted-foreground text-sm md:text-base font-medium">
                                {bullet}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            </div>

            {/* Mockup Section */}
            <div className="relative md:w-1/2 lg:w-[60%]">
              <div className="relative">
                {/* Visual shadow glow */}
                <div className="absolute inset-0 bg-primary/5 blur-[80px] rounded-[3rem] -z-10" />
                
                <div className="border-border overflow-hidden rounded-3xl border bg-background/80 backdrop-blur-md shadow-2xl ring-1 ring-border/50">
                  {/* Window bar */}
                  <div className="flex items-center gap-1.5 border-b bg-muted/30 px-5 py-4">
                    <span className="h-3 w-3 rounded-full bg-red-400/80 shadow-sm" />
                    <span className="h-3 w-3 rounded-full bg-amber-300/80 shadow-sm" />
                    <span className="h-3 w-3 rounded-full bg-emerald-400/80 shadow-sm" />
                    <div className="ml-6 flex items-center gap-2 rounded-lg bg-background/50 border border-border/40 px-3 py-1">
                      {React.createElement(tabs[selection].icon, { className: "size-3 text-muted-foreground/60" })}
                      <span className="text-[10px] text-muted-foreground font-black uppercase tracking-widest">
                        {tabs[selection].mockup.header}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 md:p-8">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={selection}
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.02 }}
                        transition={{ duration: 0.3 }}
                      >
                        {tabs[selection].id === "scoreboard" && (
                          <div className="space-y-4">
                            <div className="grid grid-cols-[1fr_60px_60px_100px] gap-4 text-[10px] font-black text-muted-foreground/60 uppercase tracking-widest px-4">
                              <span>Product</span>
                              <span className="text-center">AI</span>
                              <span className="text-center">Conv</span>
                              <span className="text-right">Status</span>
                            </div>
                            {tabs[selection].mockup.rows?.map((row, idx) => (
                              <div
                                key={idx}
                                className="group grid grid-cols-[1fr_60px_60px_100px] gap-4 items-center rounded-2xl bg-muted/40 hover:bg-muted/60 px-5 py-3.5 transition-all duration-200 border border-transparent hover:border-border/60"
                              >
                                <span className="font-bold text-foreground text-sm truncate">
                                  {row.name}
                                </span>
                                <span className="text-center font-black text-sm">
                                  {row.ai}
                                </span>
                                <span className="text-center font-black text-sm">
                                  {row.conv}
                                </span>
                                <span
                                  className={`text-right text-[11px] font-black uppercase tracking-wider ${row.statusColor}`}
                                >
                                  {row.status}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}

                        {tabs[selection].id === "playbooks" && (
                          <div className="space-y-4">
                            {tabs[selection].mockup.items?.map((item, idx) => (
                              <div
                                key={idx}
                                className="flex items-center justify-between rounded-2xl bg-muted/40 border border-transparent hover:border-border/40 px-5 py-4 transition-all"
                              >
                                <div className="flex items-center gap-4">
                                  <div className={`h-2.5 w-2.5 rounded-full shadow-sm ${item.type === "add" ? "bg-emerald-500" : "bg-amber-500"}`} />
                                  <span className="text-sm font-semibold text-foreground/90 leading-tight">
                                    {item.action}
                                  </span>
                                </div>
                                <span className="text-xs font-black text-emerald-600 bg-emerald-500/10 px-2 py-1 rounded-lg border border-emerald-500/20">
                                  {item.impact}
                                </span>
                              </div>
                            ))}
                            <div className="flex gap-4 mt-8">
                              <button className="flex-1 rounded-full bg-primary px-6 py-3.5 text-sm font-black text-primary-foreground shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform">
                                Apply All
                              </button>
                              <button className="flex-1 rounded-full border-2 px-6 py-3.5 text-sm font-black text-muted-foreground hover:bg-muted/30 transition-all">
                                Review Diff
                              </button>
                            </div>
                          </div>
                        )}

                        {tabs[selection].id === "incidents" && tabs[selection].mockup.incident && (
                          <div className="space-y-6">
                            <div className="rounded-[2rem] border-2 border-red-200/50 dark:border-red-900/30 bg-red-50/50 dark:bg-red-950/20 p-8 shadow-inner">
                              <div className="flex items-center justify-between mb-6">
                                <span className="text-lg font-black text-red-700 dark:text-red-400 tracking-tight">
                                  {tabs[selection].mockup.incident.product}
                                </span>
                                <span className="rounded-full bg-red-500 px-3 py-1 text-[11px] font-black uppercase tracking-widest text-white shadow-sm">
                                  {tabs[selection].mockup.incident.severity}
                                </span>
                              </div>
                              <div className="space-y-4">
                                <div className="flex justify-between items-center pb-4 border-b border-red-200/30">
                                  <span className="text-sm font-bold text-red-800/60 dark:text-red-300/60">
                                    Metric Drop
                                  </span>
                                  <span className="text-xl font-black text-red-600">
                                    {tabs[selection].mockup.incident.metric}{" "}
                                    {tabs[selection].mockup.incident.change}
                                  </span>
                                </div>
                                <div className="space-y-2">
                                  <span className="text-xs font-black uppercase tracking-widest text-red-800/40 dark:text-red-300/40">
                                    Likely Cause
                                  </span>
                                  <div className="rounded-xl bg-white/50 dark:bg-black/20 p-4 text-sm font-bold text-foreground/90 border border-red-200/30">
                                    {tabs[selection].mockup.incident.cause}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="flex gap-4">
                              <button className="flex-1 rounded-full bg-red-500 px-6 py-4 text-sm font-black text-white shadow-xl shadow-red-500/20 hover:scale-[1.02] transition-transform">
                                {tabs[selection].mockup.incident.recommendation}
                              </button>
                              <button className="flex-1 rounded-full border-2 px-6 py-4 text-sm font-black text-muted-foreground hover:bg-muted/30 transition-all">
                                Investigate
                              </button>
                            </div>
                          </div>
                        )}

                        {tabs[selection].id === "history" && (
                          <div className="space-y-4">
                            {tabs[selection].mockup.entries?.map((entry, idx) => (
                              <div
                                key={idx}
                                className="group flex items-center justify-between rounded-2xl bg-muted/40 border border-transparent hover:border-border/40 px-5 py-4 transition-all"
                              >
                                <div className="flex items-center gap-5">
                                  <div className="flex flex-col items-center shrink-0">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">
                                      {entry.date}
                                    </span>
                                    <div className="w-0.5 h-6 bg-border/40 my-1" />
                                  </div>
                                  <div>
                                    <span className="text-base font-bold text-foreground block tracking-tight">
                                      {entry.action}
                                    </span>
                                    <span className="text-[11px] font-bold text-muted-foreground/80">
                                      {entry.product} <span className="mx-1.5 opacity-30">·</span> <span className="text-primary/70">{entry.author}</span>
                                    </span>
                                  </div>
                                </div>
                                <span
                                  className={`text-sm font-black px-3 py-1 rounded-lg border ${entry.impact.startsWith("-") ? "text-red-500 bg-red-500/10 border-red-500/20" : "text-emerald-600 bg-emerald-500/10 border-emerald-500/20"}`}
                                >
                                  {entry.impact}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Feature57 };
