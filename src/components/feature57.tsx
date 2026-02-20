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
      "See your entire catalog at a glance. AI visibility scores, conversion readiness, and performance — all in one view. Prioritize what to fix first.",
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
      "AI-generated upgrade recommendations you can apply directly or hand to your agency. Each playbook is versioned and reversible — review the diff before deploying.",
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
      "When KPIs regress after any change — from your agency, dev team, or AI — Beseam explains what happened, identifies the source, and recommends whether to rollback, iterate, or keep.",
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
      "A complete timeline of every PDP change — whether from your agency, dev team, or Beseam AI. See who changed what, when, and what happened to revenue afterward.",
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

const Feature57 = () => {
  const [selection, setSelection] = useState(0);

  return (
    <section id="platform" className="py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center md:mb-12">
          <div className="mb-3 flex justify-center">
            <CategoryBadge
              label="Platform Preview"
              icon={<Package className="h-4 w-4" />}
            />
          </div>
          <h2 className="text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">
            One Platform. Every PDP Change.
          </h2>
          <p className="text-muted-foreground mx-auto mt-3 max-w-2xl text-sm md:mt-4 md:text-base">
            AI recommendations, agency deliverables, and internal updates — all
            managed, monitored, and protected in one place.
          </p>
        </div>
        <div className="mx-auto max-w-6xl">
          {/* Tab Navigation */}
          <div className="mb-8 flex justify-center gap-3">
            {tabs.map((tab, i) => {
              const isSelected = selection === i;
              return (
                <button
                  key={i}
                  className={`group relative flex cursor-pointer items-center gap-2 rounded-3xl border px-4 py-3 transition-all duration-300 ${
                    isSelected
                      ? "border-border bg-accent"
                      : "hover:border-border hover:bg-accent/30 border-transparent"
                  }`}
                  onClick={() => setSelection(i)}
                  aria-label={tab.title}
                >
                  <tab.icon
                    className={`size-4 transition-colors ${
                      isSelected ? "text-primary" : "text-muted-foreground"
                    }`}
                  />
                  <span
                    className={`hidden md:block text-sm font-medium transition-colors ${
                      isSelected ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {tab.title}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="flex flex-col gap-6 md:flex-row md:gap-8 lg:gap-16">
            {/* Text Section */}
            <div className="md:w-1/2 lg:w-2/5">
              <div className="flex h-full flex-col justify-center">
                {tabs.map((tab, i) => {
                  const isSelected = selection === i;
                  return (
                    <div
                      key={tab.id}
                      className={`transition-all duration-500 ${
                        isSelected
                          ? "opacity-100"
                          : "pointer-events-none absolute opacity-0"
                      }`}
                    >
                      <div className="mb-6">
                        <h3 className="text-foreground text-2xl font-bold md:text-3xl lg:text-4xl mb-3 flex items-center gap-3">
                          <tab.icon className="size-7 md:size-8 text-primary shrink-0" />
                          {tab.title}
                        </h3>
                      </div>
                      <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-6">
                        {tab.description}
                      </p>
                      <ul className="space-y-3">
                        {tab.bullets.map((bullet, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <svg
                              className="size-4 text-primary shrink-0 mt-0.5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={3}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                            <span className="text-muted-foreground text-sm md:text-base">
                              {bullet}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Mockup Section */}
            <div className="relative md:w-1/2 lg:w-3/5">
              {tabs.map((tab, i) => {
                const isSelected = selection === i;
                return (
                  <div
                    key={tab.id}
                    className={`transition-all duration-500 ${
                      isSelected
                        ? "opacity-100"
                        : "pointer-events-none absolute opacity-0"
                    }`}
                  >
                    <div className="border-border overflow-hidden rounded-3xl border bg-background">
                      {/* Window bar */}
                      <div className="flex items-center gap-1.5 border-b px-4 py-3">
                        <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                        <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
                        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                        <span className="ml-3 text-xs text-muted-foreground font-medium">
                          {tab.mockup.header}
                        </span>
                      </div>

                      <div className="p-4">
                        {tab.id === "scoreboard" && (
                          <div className="space-y-3">
                            <div className="grid grid-cols-[1fr_60px_60px_100px] gap-2 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider px-2">
                              <span>Product</span>
                              <span className="text-center">AI</span>
                              <span className="text-center">Conv</span>
                              <span className="text-right">Status</span>
                            </div>
                            {tab.mockup.rows?.map((row, idx) => (
                              <div
                                key={idx}
                                className="grid grid-cols-[1fr_60px_60px_100px] gap-2 items-center rounded-xl bg-muted/40 px-3 py-2.5 text-sm"
                              >
                                <span className="font-medium text-foreground truncate">
                                  {row.name}
                                </span>
                                <span className="text-center font-semibold">
                                  {row.ai}
                                </span>
                                <span className="text-center font-semibold">
                                  {row.conv}
                                </span>
                                <span
                                  className={`text-right text-xs font-semibold ${row.statusColor}`}
                                >
                                  {row.status}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}

                        {tab.id === "playbooks" && (
                          <div className="space-y-3">
                            {tab.mockup.items?.map((item, idx) => (
                              <div
                                key={idx}
                                className="flex items-center justify-between rounded-xl bg-muted/40 px-3 py-2.5"
                              >
                                <div className="flex items-center gap-2">
                                  <span
                                    className={`h-2 w-2 rounded-full ${item.type === "add" ? "bg-emerald-500" : "bg-amber-500"}`}
                                  />
                                  <span className="text-sm text-foreground">
                                    {item.action}
                                  </span>
                                </div>
                                <span className="text-xs font-semibold text-emerald-600">
                                  {item.impact}
                                </span>
                              </div>
                            ))}
                            <div className="flex gap-2 mt-4">
                              <button className="flex-1 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground">
                                Apply All
                              </button>
                              <button className="flex-1 rounded-full border px-4 py-2 text-xs font-semibold text-muted-foreground">
                                Review Diff
                              </button>
                            </div>
                          </div>
                        )}

                        {tab.id === "incidents" && tab.mockup.incident && (
                          <div className="space-y-4">
                            <div className="rounded-xl border-2 border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/30 p-4">
                              <div className="flex items-center justify-between mb-3">
                                <span className="text-sm font-bold text-red-700 dark:text-red-400">
                                  {tab.mockup.incident.product}
                                </span>
                                <span className="rounded-full bg-red-500 px-2 py-0.5 text-[10px] font-bold text-white">
                                  {tab.mockup.incident.severity}
                                </span>
                              </div>
                              <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">
                                    Metric
                                  </span>
                                  <span className="font-semibold text-red-600">
                                    {tab.mockup.incident.metric}{" "}
                                    {tab.mockup.incident.change}
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">
                                    Likely Cause
                                  </span>
                                  <span className="font-medium text-foreground">
                                    {tab.mockup.incident.cause}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <button className="flex-1 rounded-full bg-red-500 px-4 py-2 text-xs font-semibold text-white">
                                {tab.mockup.incident.recommendation}
                              </button>
                              <button className="flex-1 rounded-full border px-4 py-2 text-xs font-semibold text-muted-foreground">
                                Investigate
                              </button>
                            </div>
                          </div>
                        )}

                        {tab.id === "history" && (
                          <div className="space-y-3">
                            {tab.mockup.entries?.map((entry, idx) => (
                              <div
                                key={idx}
                                className="flex items-center justify-between rounded-xl bg-muted/40 px-3 py-2.5"
                              >
                                <div className="flex items-center gap-3">
                                  <span className="text-[10px] text-muted-foreground w-12">
                                    {entry.date}
                                  </span>
                                  <div>
                                    <span className="text-sm font-medium text-foreground block">
                                      {entry.action}
                                    </span>
                                    <span className="text-[10px] text-muted-foreground">
                                      {entry.product} · {entry.author}
                                    </span>
                                  </div>
                                </div>
                                <span
                                  className={`text-xs font-semibold ${entry.impact.startsWith("-") ? "text-red-500" : "text-emerald-600"}`}
                                >
                                  {entry.impact}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Feature57 };
