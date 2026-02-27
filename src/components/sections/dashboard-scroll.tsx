"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BarChart3,
  BookOpen,
  AlertTriangle,
  History,
  ChevronRight,
  CheckCircle2,
  ArrowDownRight,
  RotateCcw,
  Search,
  MoreHorizontal,
  Settings,
  Bell,
  User,
  Package,
  Home,
  TrendingUp,
  TrendingDown,
  ShieldCheck,
} from "lucide-react";
import CategoryBadge from "@/components/category-badge";

/* ─────────────────────────────────────────────
   Tab config  (Audit → Enhance → Incident → History)
───────────────────────────────────────────── */
const tabs = [
  {
    id: "audit",
    sidebarId: "scoreboard",
    title: "Audit",
    subtitle: "Scoreboard & catalog health",
    icon: BarChart3,
    colorClass: "text-indigo-600",
    bgClass: "bg-indigo-50 dark:bg-indigo-950/30",
    borderClass: "border-indigo-200 dark:border-indigo-800",
    dotClass: "bg-indigo-500",
    sidebarActiveClass:
      "bg-indigo-100 text-indigo-600 border-indigo-200 dark:bg-indigo-950/40 dark:text-indigo-400 dark:border-indigo-800",
    progressClass: "bg-indigo-500",
    numberClass:
      "text-indigo-600 bg-indigo-50 border-indigo-200 dark:bg-indigo-950/40 dark:border-indigo-800",
    description:
      "Understand your store's health at a glance. The scoreboard surfaces coverage gaps, open issues, and performance trends across your entire catalog.",
    bullets: [
      "Coverage metrics across your full catalog",
      "Open issues and active regressions",
      "Performance trends — week, month, quarter",
    ],
  },
  {
    id: "enhance",
    sidebarId: "playbooks",
    title: "Enhance",
    subtitle: "AI-generated upgrade playbooks",
    icon: BookOpen,
    colorClass: "text-emerald-600",
    bgClass: "bg-emerald-50 dark:bg-emerald-950/30",
    borderClass: "border-emerald-200 dark:border-emerald-800",
    dotClass: "bg-emerald-500",
    sidebarActiveClass:
      "bg-emerald-100 text-emerald-600 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800",
    progressClass: "bg-emerald-500",
    numberClass:
      "text-emerald-600 bg-emerald-50 border-emerald-200 dark:bg-emerald-950/40 dark:border-emerald-800",
    description:
      "Every audit generates a prioritized playbook — a sequenced list of improvements ranked by projected revenue impact. Review the diff, approve, and deploy in one click.",
    bullets: [
      "Ranked by projected revenue impact",
      "One-click deploy or share with your agency",
      "Full version history with rollback",
    ],
  },
  {
    id: "incident",
    sidebarId: "incidents",
    title: "Incident",
    subtitle: "Regression detection & attribution",
    icon: AlertTriangle,
    colorClass: "text-red-600",
    bgClass: "bg-red-50 dark:bg-red-950/30",
    borderClass: "border-red-200 dark:border-red-800",
    dotClass: "bg-red-500",
    sidebarActiveClass:
      "bg-red-100 text-red-600 border-red-200 dark:bg-red-950/40 dark:text-red-400 dark:border-red-800",
    progressClass: "bg-red-500",
    numberClass:
      "text-red-600 bg-red-50 border-red-200 dark:bg-red-950/40 dark:border-red-800",
    description:
      "When KPIs drop after any change — from your agency, dev team, or Beseam — an incident opens automatically. You get the source, the diff, and a recommended fix.",
    bullets: [
      "Auto-detected from real-time KPI monitoring",
      "Source-attributed: who changed what, when",
      "One-click rollback or guided remediation",
    ],
  },
  {
    id: "history",
    sidebarId: "history",
    title: "History",
    subtitle: "Complete change timeline",
    icon: History,
    colorClass: "text-blue-600",
    bgClass: "bg-blue-50 dark:bg-blue-950/30",
    borderClass: "border-blue-200 dark:border-blue-800",
    dotClass: "bg-blue-500",
    sidebarActiveClass:
      "bg-blue-100 text-blue-600 border-blue-200 dark:bg-blue-950/40 dark:text-blue-400 dark:border-blue-800",
    progressClass: "bg-blue-500",
    numberClass:
      "text-blue-600 bg-blue-50 border-blue-200 dark:bg-blue-950/40 dark:border-blue-800",
    description:
      "A full audit trail of every PDP change across your catalog. Filter by product, author, or outcome. Compare any two versions side-by-side in seconds.",
    bullets: [
      "Full attribution: agency, internal team, or Beseam AI",
      "Side-by-side diff view for any two versions",
      "Filter by outcome: positive, neutral, or regression",
    ],
  },
];

const SLIDE_DURATION = 4500; // ms per tab

/* ─────────────────────────────────────────────
   AuditMockup — Scoreboard
───────────────────────────────────────────── */
const AuditMockup = () => (
  <div className="space-y-3">
    <div className="flex items-center justify-between mb-3">
      <div>
        <h3 className="text-sm font-black text-foreground">Audit Scoreboard</h3>
        <p className="text-[11px] text-muted-foreground/60">
          Last run · 14 min ago
        </p>
      </div>
      <span className="flex items-center gap-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 px-2.5 py-1 text-[10px] font-black text-indigo-600">
        <ShieldCheck className="size-3" /> 78 / 100
      </span>
    </div>

    {/* Score grid */}
    <div className="grid grid-cols-2 gap-2">
      {[
        { label: "Coverage", value: "92%", delta: "+3%", up: true },
        { label: "Open Issues", value: "7", delta: "−2", up: true },
        { label: "Regressions", value: "2", delta: "+1", up: false },
        { label: "Trend (MoM)", value: "+5%", delta: "↑", up: true },
      ].map((m) => (
        <div
          key={m.label}
          className="rounded-xl border border-border/40 bg-muted/30 px-3 py-2.5"
        >
          <p className="text-[10px] text-muted-foreground/50 uppercase tracking-widest mb-1">
            {m.label}
          </p>
          <div className="flex items-end justify-between">
            <span className="text-[18px] font-black leading-none text-foreground">
              {m.value}
            </span>
            <span
              className={`text-[10px] font-black ${
                m.up ? "text-emerald-600" : "text-red-500"
              }`}
            >
              {m.delta}
            </span>
          </div>
        </div>
      ))}
    </div>

    {/* Top products */}
    <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/40 pt-1">
      Top Products
    </p>
    {[
      { name: "Alpine Pro Jacket", score: 91, trend: true },
      { name: "Summit Daypack 25L", score: 76, trend: true },
      { name: "Nimbus Trail Runner", score: 58, trend: false },
    ].map((p) => (
      <div
        key={p.name}
        className="flex items-center gap-3 rounded-xl border border-border/40 bg-muted/20 px-3 py-2"
      >
        <div className="flex-1 min-w-0">
          <p className="text-[12px] font-bold text-foreground truncate">
            {p.name}
          </p>
          <div className="mt-1 h-1.5 w-full rounded-full bg-muted overflow-hidden">
            <div
              className="h-full rounded-full bg-indigo-500/70"
              style={{ width: `${p.score}%` }}
            />
          </div>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <span className="text-[12px] font-black text-foreground">
            {p.score}
          </span>
          {p.trend ? (
            <TrendingUp className="size-3 text-emerald-500" />
          ) : (
            <TrendingDown className="size-3 text-red-500" />
          )}
        </div>
      </div>
    ))}
  </div>
);

/* ─────────────────────────────────────────────
   EnhanceMockup — Playbooks
───────────────────────────────────────────── */
const EnhanceMockup = () => (
  <div className="space-y-2.5">
    <div className="flex items-center justify-between mb-3">
      <div>
        <h3 className="text-sm font-black text-foreground">
          Upgrade Playbooks
        </h3>
        <p className="text-[11px] text-muted-foreground/60">
          3 ready · 2 pending review
        </p>
      </div>
      <div className="flex items-center gap-1.5 rounded-lg bg-muted/60 border border-border/40 px-2.5 py-1.5">
        <Search className="size-3 text-muted-foreground/50" />
        <span className="text-[10px] text-muted-foreground/40">Search…</span>
      </div>
    </div>

    {[
      {
        product: "Alpine Pro Jacket",
        status: "Ready",
        sColor: "text-emerald-600 bg-emerald-500/10",
        impact: "+43 pts",
        steps: [
          { label: "Add FAQ section with schema.org", pts: "+18 pts" },
          { label: "Generate deep product narrative", pts: "+15 pts" },
          { label: "Comparison table vs competitors", pts: "+12 pts" },
        ],
        expanded: true,
      },
      {
        product: "Summit Daypack 25L",
        status: "In Review",
        sColor: "text-amber-600 bg-amber-500/10",
        impact: "+31 pts",
        steps: [],
        expanded: false,
      },
      {
        product: "Cascade Rain Shell",
        status: "Approved",
        sColor: "text-blue-600 bg-blue-500/10",
        impact: "+19 pts",
        steps: [],
        expanded: false,
      },
    ].map((pb, i) => (
      <div
        key={i}
        className={`rounded-xl border overflow-hidden ${
          pb.expanded
            ? "border-emerald-200/60 dark:border-emerald-900/40 bg-emerald-50/40 dark:bg-emerald-950/20"
            : "border-border/40 bg-muted/30"
        }`}
      >
        <div className="flex items-center justify-between px-3.5 py-2.5">
          <div className="flex items-center gap-2.5">
            <div
              className={`h-7 w-7 rounded-lg flex items-center justify-center ${
                pb.expanded
                  ? "bg-emerald-500/15 text-emerald-600"
                  : "bg-muted text-muted-foreground/40"
              }`}
            >
              <BookOpen className="size-3.5" />
            </div>
            <div>
              <p className="text-[12px] font-bold text-foreground leading-tight">
                {pb.product}
              </p>
              <p className="text-[10px] text-muted-foreground/60">
                {pb.steps.length || "3"} improvements ·{" "}
                <span className="text-emerald-600 font-black">{pb.impact}</span>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span
              className={`text-[9px] font-black px-2 py-0.5 rounded-full ${pb.sColor}`}
            >
              {pb.status}
            </span>
            <ChevronRight
              className={`size-3.5 text-muted-foreground/30 transition-transform ${
                pb.expanded ? "rotate-90" : ""
              }`}
            />
          </div>
        </div>
        {pb.expanded && (
          <div className="border-t border-emerald-200/30 px-3.5 py-2.5 space-y-1.5">
            {pb.steps.map((s, si) => (
              <div
                key={si}
                className="flex items-center justify-between rounded-lg bg-white/50 dark:bg-white/5 border border-emerald-200/20 px-3 py-2"
              >
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  <span className="text-[11px] font-semibold text-foreground/90">
                    {s.label}
                  </span>
                </div>
                <span className="text-[10px] font-black text-emerald-600 bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 rounded-md ml-2 shrink-0">
                  {s.pts}
                </span>
              </div>
            ))}
            <div className="flex gap-2 pt-1">
              <button className="flex-1 rounded-full bg-primary py-2 text-[11px] font-black text-primary-foreground">
                Deploy All
              </button>
              <button className="flex-1 rounded-full border-2 border-border/40 py-2 text-[11px] font-black text-muted-foreground">
                Review Diff
              </button>
            </div>
          </div>
        )}
      </div>
    ))}
  </div>
);

/* ─────────────────────────────────────────────
   IncidentMockup
───────────────────────────────────────────── */
const IncidentMockup = () => (
  <div className="space-y-3">
    <div className="flex items-center justify-between mb-3">
      <div>
        <h3 className="text-sm font-black text-foreground">Incidents</h3>
        <p className="text-[11px] text-muted-foreground/60">
          1 active · 2 resolved this week
        </p>
      </div>
      <span className="flex h-2 w-2 relative">
        <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-red-500 opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
      </span>
    </div>

    <div className="rounded-xl border-2 border-red-200/60 dark:border-red-900/30 bg-red-50/50 dark:bg-red-950/20 overflow-hidden">
      <div className="flex items-center justify-between px-3.5 py-2 border-b border-red-200/30 bg-red-100/30 dark:bg-red-950/30">
        <span className="text-[10px] font-black uppercase tracking-widest text-red-700 dark:text-red-400">
          Active — INC-041
        </span>
        <span className="rounded-full bg-red-500 px-2 py-0.5 text-[9px] font-black text-white">
          HIGH
        </span>
      </div>
      <div className="px-3.5 py-3 space-y-2.5">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[13px] font-black text-red-700 dark:text-red-400">
              Nimbus Trail Runner
            </p>
            <div className="flex items-center gap-1 mt-0.5">
              <ArrowDownRight className="size-3 text-red-500" />
              <span className="text-[12px] font-black text-red-600">
                Conversion Rate −12%
              </span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[9px] font-semibold text-muted-foreground/50 uppercase tracking-widest">
              Source
            </p>
            <p className="text-[11px] font-black text-foreground/80">
              Dev Team
            </p>
          </div>
        </div>
        <div className="rounded-lg bg-white/60 dark:bg-black/20 border border-red-200/20 px-3 py-2">
          <p className="text-[9px] font-black uppercase tracking-widest text-red-700/40 mb-0.5">
            Root Cause
          </p>
          <p className="text-[11px] font-semibold text-foreground/90">
            Theme publish removed FAQ module from PDP template
          </p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-1.5 flex-1 justify-center rounded-full bg-red-500 py-2 text-[11px] font-black text-white">
            <RotateCcw className="size-3" /> Rollback to v2.1
          </button>
          <button className="flex items-center gap-1.5 flex-1 justify-center rounded-full border-2 border-border/40 py-2 text-[11px] font-black text-muted-foreground">
            <Search className="size-3" /> Investigate
          </button>
        </div>
      </div>
    </div>

    <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/40">
      Recently Resolved
    </p>
    <div className="flex items-center justify-between rounded-xl border border-border/40 bg-muted/30 px-3.5 py-2.5">
      <div className="flex items-center gap-2.5">
        <CheckCircle2 className="size-3.5 text-emerald-500 shrink-0" />
        <div>
          <p className="text-[12px] font-bold text-foreground/80">
            Alpine Pro Jacket
          </p>
          <p className="text-[10px] text-muted-foreground/60">
            Add-to-Cart −7% · SEO Agency
          </p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-[11px] font-black text-emerald-600">Rolled back</p>
        <p className="text-[10px] text-muted-foreground/40">Yesterday</p>
      </div>
    </div>
  </div>
);

/* ─────────────────────────────────────────────
   HistoryMockup
───────────────────────────────────────────── */
const HistoryMockup = () => (
  <div className="space-y-2.5">
    <div className="flex items-center justify-between mb-3">
      <div>
        <h3 className="text-sm font-black text-foreground">Change History</h3>
        <p className="text-[11px] text-muted-foreground/60">
          14 changes this month
        </p>
      </div>
      <div className="flex gap-1">
        {["All", "+", "−"].map((f, fi) => (
          <button
            key={fi}
            className={`rounded-full px-2.5 py-1 text-[10px] font-black ${
              fi === 0
                ? "bg-foreground text-background"
                : "border border-border/40 text-muted-foreground/60"
            }`}
          >
            {f}
          </button>
        ))}
        <button className="rounded-lg border border-border/40 bg-muted/40 p-1.5 ml-1">
          <MoreHorizontal className="size-3 text-muted-foreground/50" />
        </button>
      </div>
    </div>

    <div className="relative pl-5">
      <div className="absolute left-[7px] top-2 bottom-2 w-px bg-border/40" />
      {[
        {
          date: "Today 14:32",
          action: "FAQ section added via schema.org",
          product: "Alpine Pro Jacket",
          impact: "+18 pts",
          author: "Beseam AI",
          authorColor: "text-primary",
          positive: true,
        },
        {
          date: "Yesterday 09:15",
          action: "Spring copy refresh",
          product: "Nimbus Trail Runner",
          impact: "+5 pts",
          author: "SEO Agency",
          authorColor: "text-blue-600",
          positive: true,
        },
        {
          date: "Feb 20 16:48",
          action: "Theme layout updated (global)",
          product: "All PDPs",
          impact: "−3 pts avg",
          author: "Dev Team",
          authorColor: "text-amber-600",
          positive: false,
        },
        {
          date: "Feb 18 11:05",
          action: "Schema markup added",
          product: "Summit Daypack 25L",
          impact: "+22 pts",
          author: "Beseam AI",
          authorColor: "text-primary",
          positive: true,
        },
      ].map((e, i) => (
        <div key={i} className="relative pb-2">
          <div
            className={`absolute -left-[13px] h-2 w-2 rounded-full border-2 border-background ring-1 mt-[13px] ${
              e.positive
                ? "bg-emerald-500 ring-emerald-500/40"
                : "bg-red-500 ring-red-500/40"
            }`}
          />
          <div className="rounded-xl border border-border/40 bg-muted/30 hover:bg-muted/50 px-3 py-2.5 transition-colors">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <p className="text-[12px] font-bold text-foreground leading-tight truncate">
                  {e.action}
                </p>
                <p className="text-[10px] text-muted-foreground/60 mt-0.5">
                  {e.product} <span className="opacity-30 mx-1">·</span>
                  <span className={`font-black ${e.authorColor}`}>
                    {e.author}
                  </span>
                </p>
              </div>
              <div className="text-right shrink-0">
                <span
                  className={`text-[10px] font-black px-1.5 py-0.5 rounded-md border ${
                    e.positive
                      ? "text-emerald-600 bg-emerald-500/10 border-emerald-500/20"
                      : "text-red-500 bg-red-500/10 border-red-500/20"
                  }`}
                >
                  {e.impact}
                </span>
                <p className="text-[9px] text-muted-foreground/40 mt-0.5">
                  {e.date}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const mockupContent = [
  <AuditMockup key="audit" />,
  <EnhanceMockup key="enhance" />,
  <IncidentMockup key="incident" />,
  <HistoryMockup key="history" />,
];

/* ─────────────────────────────────────────────
   Sidebar nav items
───────────────────────────────────────────── */
const sidebarItems = [
  { icon: Home, id: "overview", label: "Overview" },
  { icon: BarChart3, id: "scoreboard", label: "Scoreboard" },
  { icon: BookOpen, id: "playbooks", label: "Playbooks" },
  { icon: AlertTriangle, id: "incidents", label: "Incidents" },
  { icon: History, id: "history", label: "History" },
  { icon: Package, id: "catalog", label: "Catalog" },
  { icon: Settings, id: "settings", label: "Settings" },
];

/* ─────────────────────────────────────────────
   Dashboard chrome
───────────────────────────────────────────── */
const DashboardChrome = ({
  activeTab,
  children,
}: {
  activeTab: number;
  children: React.ReactNode;
}) => {
  const tab = tabs[activeTab];
  return (
    <div className="overflow-hidden rounded-2xl border border-border/60 bg-background shadow-2xl ring-1 ring-border/30">
      {/* Title bar */}
      <div className="flex items-center gap-1.5 border-b border-border/40 bg-muted/20 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-300/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
        <div className="ml-3 flex items-center gap-1 rounded-md bg-background/70 border border-border/40 px-3 py-1 mx-auto">
          <span className="text-[9px] text-muted-foreground/40 font-medium">
            beseam.io/dashboard/
          </span>
          <AnimatePresence mode="wait">
            <motion.span
              key={activeTab}
              initial={{ opacity: 0, x: -4 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 4 }}
              transition={{ duration: 0.2 }}
              className={`text-[9px] font-black ${tab.colorClass}`}
            >
              {tab.id}
            </motion.span>
          </AnimatePresence>
        </div>
        <div className="flex items-center gap-1.5 ml-2">
          <span className="flex h-1.5 w-1.5 relative">
            <span className="animate-ping absolute inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500 opacity-60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
          </span>
          <span className="text-[8px] font-black uppercase tracking-widest text-emerald-600">
            Live
          </span>
        </div>
      </div>

      {/* App body */}
      <div className="flex">
        {/* Icon sidebar */}
        <div className="flex w-[52px] flex-col border-r border-border/40 bg-muted/10 py-3 shrink-0">
          <div className="flex h-8 items-center justify-center mb-3">
            <div className="h-5 w-5 rounded-md bg-primary flex items-center justify-center">
              <span className="text-[8px] font-black text-white">B</span>
            </div>
          </div>
          <div className="flex flex-col gap-0.5 px-2">
            {sidebarItems.map((item) => {
              const isActive = item.id === tab.sidebarId;
              return (
                <div
                  key={item.id}
                  className={`relative flex h-8 w-full items-center justify-center rounded-lg border transition-all duration-300 ${
                    isActive
                      ? `${tab.sidebarActiveClass} border`
                      : "border-transparent text-muted-foreground/40"
                  }`}
                  title={item.label}
                >
                  <item.icon className="size-3.5" />
                  {isActive && (
                    <motion.div
                      layoutId="sidebar-indicator"
                      className={`absolute -right-[1px] top-1/2 -translate-y-1/2 h-4 w-0.5 rounded-full ${tab.dotClass}`}
                    />
                  )}
                </div>
              );
            })}
          </div>
          <div className="mt-auto flex justify-center pb-1">
            <div className="h-7 w-7 rounded-full bg-muted border border-border/50 flex items-center justify-center">
              <User className="size-3.5 text-muted-foreground/50" />
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top bar */}
          <div className="flex items-center justify-between border-b border-border/40 bg-background/50 px-4 py-2.5 shrink-0">
            <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground/50">
              <span className="font-semibold">Dashboard</span>
              <ChevronRight className="size-2.5" />
              <AnimatePresence mode="wait">
                <motion.span
                  key={activeTab}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`font-black ${tab.colorClass}`}
                >
                  {tab.title}
                </motion.span>
              </AnimatePresence>
            </div>
            <div className="flex items-center gap-2">
              <button className="relative p-1.5 rounded-lg hover:bg-muted/40 transition-colors">
                <Bell className="size-3 text-muted-foreground/50" />
                {activeTab === 2 && (
                  <span className="absolute top-1 right-1 h-1.5 w-1.5 rounded-full bg-red-500" />
                )}
              </button>
              <div className="h-6 w-6 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center">
                <span className="text-[8px] font-black text-primary">PK</span>
              </div>
            </div>
          </div>

          {/* Page content */}
          <div className="p-4 overflow-y-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   Step list (left panel — clickable, auto-advances)
───────────────────────────────────────────── */
const StepList = ({
  activeTab,
  timerProgress,
  onSelect,
}: {
  activeTab: number;
  timerProgress: number;
  onSelect: (i: number) => void;
}) => (
  <div className="flex flex-col gap-1">
    {tabs.map((tab, i) => {
      const isActive = i === activeTab;
      const isPast = i < activeTab;
      return (
        <button
          key={tab.id}
          onClick={() => onSelect(i)}
          className={`group w-full text-left rounded-2xl border px-4 py-3.5 transition-all duration-300 ${
            isActive
              ? `${tab.borderClass} ${tab.bgClass} shadow-sm`
              : "border-transparent hover:border-border/40 hover:bg-muted/30"
          }`}
        >
          <div className="flex items-center gap-3">
            {/* Step number / check */}
            <div
              className={`h-7 w-7 rounded-lg border flex items-center justify-center shrink-0 text-[11px] font-black transition-all duration-300 ${
                isPast
                  ? "border-muted bg-muted text-muted-foreground/50"
                  : isActive
                    ? `${tab.numberClass} border`
                    : "border-border/30 bg-muted/30 text-muted-foreground/30"
              }`}
            >
              {isPast ? (
                <CheckCircle2 className="size-3.5 text-muted-foreground/50" />
              ) : (
                i + 1
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <span
                  className={`text-sm font-black transition-colors ${
                    isActive
                      ? "text-foreground"
                      : isPast
                        ? "text-muted-foreground/60"
                        : "text-muted-foreground/40"
                  }`}
                >
                  {tab.title}
                </span>
                {isPast && (
                  <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/30 shrink-0">
                    Done
                  </span>
                )}
              </div>
              <p
                className={`text-[12px] transition-colors truncate ${
                  isActive
                    ? "text-muted-foreground/70"
                    : "text-muted-foreground/30"
                }`}
              >
                {tab.subtitle}
              </p>
            </div>

            {!isActive && !isPast && (
              <tab.icon className="size-4 text-muted-foreground/20 shrink-0" />
            )}
          </div>

          {/* Expanded content when active */}
          {isActive && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="mt-3 ml-10 overflow-hidden"
            >
              <p className="text-sm text-muted-foreground/75 leading-relaxed mb-3">
                {tab.description}
              </p>
              <ul className="space-y-2 mb-3">
                {tab.bullets.map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <div
                      className={`mt-1 h-3 w-3 shrink-0 rounded-full flex items-center justify-center border ${tab.bgClass} ${tab.borderClass}`}
                    >
                      <svg
                        className="size-1.5"
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
                    <span className="text-sm text-muted-foreground">
                      {bullet}
                    </span>
                  </li>
                ))}
              </ul>
              {/* Timer bar */}
              <div className="h-0.5 w-full rounded-full bg-muted overflow-hidden">
                <motion.div
                  className={`h-full rounded-full ${tab.progressClass}`}
                  style={{ width: `${timerProgress * 100}%` }}
                />
              </div>
            </motion.div>
          )}
        </button>
      );
    })}
  </div>
);

/* ─────────────────────────────────────────────
   Main export
───────────────────────────────────────────── */
export default function DashboardScroll() {
  const [activeTab, setActiveTab] = useState(0);
  const [timerProgress, setTimerProgress] = useState(0);
  const [paused, setPaused] = useState(false);
  const startTimeRef = useRef<number>(Date.now());
  const rafRef = useRef<number | null>(null);

  const goToTab = useCallback((i: number) => {
    setActiveTab(i);
    setTimerProgress(0);
    startTimeRef.current = Date.now();
  }, []);

  useEffect(() => {
    const tick = () => {
      if (!paused) {
        const elapsed = Date.now() - startTimeRef.current;
        const progress = Math.min(elapsed / SLIDE_DURATION, 1);
        setTimerProgress(progress);
        if (progress >= 1) {
          const next = (activeTab + 1) % tabs.length;
          setActiveTab(next);
          setTimerProgress(0);
          startTimeRef.current = Date.now();
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [activeTab, paused]);

  return (
    <section id="dashboard" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute right-0 top-1/4 h-[600px] w-[600px] bg-primary/3 blur-[140px] rounded-full" />
        <div className="absolute left-0 bottom-1/3 h-[500px] w-[500px] bg-secondary/3 blur-[140px] rounded-full" />
      </div>

      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          {/* Section header */}
          <div className="mb-14 text-center">
            <div className="mb-4 flex justify-center">
              <CategoryBadge
                label="Platform Preview"
                icon={<Package className="h-4 w-4" />}
              />
            </div>
            <h2 className="font-heading text-3xl font-bold leading-tight sm:text-4xl md:text-5xl tracking-tight mb-3">
              One Platform.{" "}
              <span className="text-primary italic">Every PDP Change.</span>
            </h2>
            <p className="text-muted-foreground/80 mx-auto max-w-xl text-sm sm:text-base md:text-lg leading-relaxed">
              AI recommendations, agency deliverables, and internal updates —
              all managed, monitored, and protected in one place.
            </p>
          </div>

          {/* Left / Right layout */}
          <div
            className="flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-12"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {/* Left: step list */}
            <div className="lg:w-[42%] shrink-0">
              <StepList
                activeTab={activeTab}
                timerProgress={timerProgress}
                onSelect={goToTab}
              />
            </div>

            {/* Right: dashboard mockup */}
            <div className="flex-1 min-w-0">
              <div className="relative">
                {/* Ambient glow */}
                <AnimatePresence>
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6 }}
                    className={`pointer-events-none absolute -inset-8 -z-10 rounded-3xl blur-3xl opacity-20 ${tabs[activeTab].bgClass}`}
                  />
                </AnimatePresence>
                <DashboardChrome activeTab={activeTab}>
                  {mockupContent[activeTab]}
                </DashboardChrome>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
