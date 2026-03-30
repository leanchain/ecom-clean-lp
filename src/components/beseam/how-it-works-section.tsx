"use client";

import { useEffect, useRef, useState } from "react";
import {
  Activity,
  Bell,
  CheckCircle2,
  ChevronRight,
  Search,
  Sparkles,
  User,
  ArrowRight,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const sections = [
  {
    id: "diagnose",
    title: "Audit",
    subtitle: "See how AI reads your products",
    support: "AI store diagnostics",
    routeLabel: "ai-readiness",
    navLabel: "Audit",
    icon: Search,
    colorClass: "text-sky-600",
    bgClass: "bg-sky-50 dark:bg-sky-950/30",
    borderClass: "border-sky-200 dark:border-sky-800",
    dotClass: "bg-sky-500",
    sidebarActiveClass:
      "bg-sky-100 text-sky-600 border-sky-200 dark:bg-sky-950/40 dark:text-sky-400 dark:border-sky-800",
    description:
      "Beseam sends AI to read every product page like ChatGPT or Gemini would. See exactly what AI gets right, what it gets wrong, and where your store is invisible to AI shopping engines.",
    areas: [
      "AI product probe — LLM reads your pages like a shopper would",
      "118+ checks across schema, structured data, content & SEO",
      "Per-product score — see how well AI understands each page",
      "AI referral tracking across 13 engines",
    ],
    totalChecks: "118+ checks",
  },
  {
    id: "fix",
    title: "Fix",
    subtitle: "Make your products AI-readable",
    support: "AI-generated improvements",
    routeLabel: "tasks/fix",
    navLabel: "Tasks",
    icon: Sparkles,
    colorClass: "text-violet-600",
    bgClass: "bg-violet-50 dark:bg-violet-950/30",
    borderClass: "border-violet-200 dark:border-violet-800",
    dotClass: "bg-violet-500",
    sidebarActiveClass:
      "bg-violet-100 text-violet-600 border-violet-200 dark:bg-violet-950/40 dark:text-violet-400 dark:border-violet-800",
    description:
      "Get targeted fixes for the exact issues blocking AI from understanding your products: schema gaps, missing selling points, ambiguous pricing. Review before/after, then publish to Shopify.",
    areas: [
      "AI-generated fixes for schema, metadata & structured data",
      "Selling point optimization for AI readability",
      "One-click publish to Shopify",
      "Rollback protection on every change",
    ],
    totalChecks: "3 fix paths",
  },
  {
    id: "verify",
    title: "Verify",
    subtitle: "Confirm AI now recommends you",
    support: "Before/after tracking",
    routeLabel: "verify",
    navLabel: "Verify",
    icon: Activity,
    colorClass: "text-emerald-600",
    bgClass: "bg-emerald-50 dark:bg-emerald-950/30",
    borderClass: "border-emerald-200 dark:border-emerald-800",
    dotClass: "bg-emerald-500",
    sidebarActiveClass:
      "bg-emerald-100 text-emerald-600 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800",
    description:
      "After fixes go live, Beseam re-runs the AI probe and diagnostics. See exactly how your scores improved — with before/after evidence across every AI engine.",
    areas: [
      "Before/after audit scores",
      "AI recommendation confidence tracking",
      "Per-engine visibility improvement",
      "Evidence you can share with stakeholders",
    ],
    totalChecks: "Continuous",
  },
] as const;

const collectTabs = ["Overview", "Audit", "Tasks", "Verify"] as const;

/* ── Diagnose Mockup ─────────────────────────────────────────────────── */

function DiagnoseMockup() {
  const products = [
    {
      name: "Blue Summer Dress",
      source: "ChatGPT",
      score: 92,
      scoreClass: "text-emerald-600",
      issues: 0,
      status: "AI Ready",
      statusClass: "bg-emerald-500/10 text-emerald-600",
    },
    {
      name: "Running Shoes Pro",
      source: "Gemini",
      score: 41,
      scoreClass: "text-red-600",
      issues: 5,
      status: "Needs fixes",
      statusClass: "bg-red-500/10 text-red-600",
    },
    {
      name: "Eco Water Bottle",
      source: "Perplexity",
      score: 67,
      scoreClass: "text-amber-600",
      issues: 2,
      status: "Partially ready",
      statusClass: "bg-amber-500/10 text-amber-600",
    },
  ];

  const findings = [
    {
      issue: "AI read wrong price on 4 products",
      priority: "P0",
      category: "Schema",
    },
    {
      issue: "No selling points found by AI probe",
      priority: "P0",
      category: "Content",
    },
    {
      issue: "Missing review markup — AI can't cite ratings",
      priority: "P1",
      category: "SEO",
    },
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-black text-foreground">
            AI Store Audit
          </h3>
          <p className="text-[11px] text-muted-foreground/60">
            How AI engines understand your products
          </p>
        </div>
        <span className="rounded-full border border-sky-200 bg-sky-50 px-2.5 py-1 text-[10px] font-black text-sky-600">
          3 products scanned
        </span>
      </div>

      <div className="space-y-2">
        {products.map((m) => (
          <div
            key={m.name}
            className="rounded-xl border border-border/40 bg-background/80 px-3 py-2.5"
          >
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="truncate text-[12px] font-bold text-foreground">
                  {m.name}
                </p>
                <p className="text-[10px] text-muted-foreground/60">
                  tested via {m.source} &middot; {m.issues} issues
                </p>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-right">
                  <p className={`text-[12px] font-black ${m.scoreClass}`}>
                    {m.score}%
                  </p>
                  <p className="text-[8px] text-muted-foreground/50">
                    AI ready
                  </p>
                </div>
                <span
                  className={`rounded-full px-2 py-0.5 text-[9px] font-black ${m.statusClass}`}
                >
                  {m.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-border/40 bg-muted/20 px-3 py-2.5">
        <p className="mb-2 text-[9px] font-black uppercase tracking-widest text-muted-foreground/50">
          AI Probe Findings
        </p>
        <div className="space-y-1.5">
          {findings.map((f) => (
            <div
              key={f.issue}
              className="flex items-center justify-between text-[11px]"
            >
              <span className="truncate text-foreground/80">{f.issue}</span>
              <div className="flex items-center gap-1.5">
                <span className="text-[9px] font-black text-muted-foreground">
                  {f.category}
                </span>
                <span className="text-[9px] font-black text-amber-600">
                  {f.priority}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Fix Mockup ─────────────────────────────────────────────────────── */

function FixMockup() {
  const fixes = [
    {
      page: "Product schema for Summer Dress",
      status: "AI fix",
      statusClass: "bg-emerald-500/10 text-emerald-600",
    },
    {
      page: "Meta descriptions — summer collection",
      status: "AI-assisted",
      statusClass: "bg-sky-500/10 text-sky-600",
    },
    {
      page: "Review markup on best sellers",
      status: "AI fix",
      statusClass: "bg-emerald-500/10 text-emerald-600",
    },
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-black text-foreground">Fix Queue</h3>
          <p className="text-[11px] text-muted-foreground/60">
            AI-generated improvements ready for review
          </p>
        </div>
        <span className="rounded-full border border-violet-200 bg-violet-50 px-2.5 py-1 text-[10px] font-black text-violet-600">
          3 fixes ready
        </span>
      </div>

      <div className="rounded-xl border border-border/40 bg-muted/20 px-3 py-3">
        <div className="mb-3 flex items-center justify-between">
          <div>
            <p className="text-[12px] font-bold text-foreground">
              Summer Dress &mdash; Product Schema Fix
            </p>
            <p className="text-[10px] text-muted-foreground/60">
              AI-generated &middot; High confidence
            </p>
          </div>
          <span className="rounded-md bg-emerald-500/10 px-1.5 py-0.5 text-[10px] font-black text-emerald-600">
            Ready
          </span>
        </div>

        {/* Preview snippet */}
        <div className="rounded-lg border border-border/40 bg-background/80 p-2.5 text-[10px] font-mono leading-relaxed text-muted-foreground">
          <div className="flex items-center gap-2 mb-1">
            <span className="rounded bg-red-500/10 px-1 py-0.5 text-[8px] font-black text-red-600">
              BEFORE
            </span>
            <span className="line-through opacity-60">No product schema</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="rounded bg-emerald-500/10 px-1 py-0.5 text-[8px] font-black text-emerald-600">
              AFTER
            </span>
            <span>Product, Offer, Review schema added</span>
          </div>
        </div>

        <div className="space-y-2 mt-3">
          {fixes.map((fix) => (
            <div
              key={fix.page}
              className="flex items-center justify-between rounded-lg border border-border/40 bg-background/80 px-3 py-2"
            >
              <span className="truncate text-[11px] font-semibold text-foreground/90">
                {fix.page}
              </span>
              <span
                className={`ml-3 shrink-0 rounded-full px-2 py-0.5 text-[10px] font-black ${fix.statusClass}`}
              >
                {fix.status}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-3 flex gap-2">
          <button className="flex-1 rounded-full bg-primary py-2 text-[11px] font-black text-primary-foreground">
            Approve &amp; Publish
          </button>
          <button className="flex-1 rounded-full border-2 border-border/40 py-2 text-[11px] font-black text-muted-foreground">
            Discard
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Verify Mockup ──────────────────────────────────────────────────── */

function VerifyMockup() {
  const improvements = [
    { metric: "AI Understanding", before: 34, after: 91, unit: "%" },
    { metric: "Schema Coverage", before: 12, after: 89, unit: "%" },
    { metric: "Content Quality", before: 45, after: 78, unit: "%" },
    { metric: "AI Confidence", before: 28, after: 85, unit: "%" },
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-black text-foreground">
            Verification Report
          </h3>
          <p className="text-[11px] text-muted-foreground/60">
            Before/after improvement tracking
          </p>
        </div>
        <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[10px] font-black text-emerald-600">
          4 verified improvements
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {improvements.map((item) => {
          const delta = item.after - item.before;
          return (
            <div
              key={item.metric}
              className="rounded-xl border border-border/70 bg-card px-3 py-3 shadow-sm"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] font-semibold text-foreground">
                  {item.metric}
                </span>
                <span className="flex items-center gap-0.5 text-[10px] font-black text-emerald-600">
                  <TrendingUp className="h-2.5 w-2.5" />+{delta}
                  {item.unit}
                </span>
              </div>
              <div className="mt-2 flex items-center gap-2">
                <div className="flex-1">
                  <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-red-400/60"
                      style={{ width: `${item.before}%` }}
                    />
                  </div>
                  <p className="mt-1 text-[9px] text-muted-foreground/60">
                    Before: {item.before}
                    {item.unit}
                  </p>
                </div>
                <ArrowRight className="h-2.5 w-2.5 text-muted-foreground/30 shrink-0" />
                <div className="flex-1">
                  <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-emerald-500"
                      style={{ width: `${item.after}%` }}
                    />
                  </div>
                  <p className="mt-1 text-[9px] text-muted-foreground/60">
                    After: {item.after}
                    {item.unit}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="rounded-xl border border-border/40 bg-background/80 px-3 py-3">
        <div className="mb-2 flex items-center justify-between">
          <p className="text-[12px] font-bold text-foreground">
            Issues Resolved
          </p>
          <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-black text-emerald-600">
            6 of 7 fixed
          </span>
        </div>
        <div className="space-y-1.5">
          {[
            { issue: "Product schema on 4 PDPs", resolved: true },
            { issue: "Thin meta descriptions", resolved: true },
            { issue: "Missing review markup", resolved: true },
          ].map((item) => (
            <div
              key={item.issue}
              className="flex items-center gap-2 text-[11px]"
            >
              <CheckCircle2 className="h-3 w-3 shrink-0 text-emerald-500" />
              <span className="text-foreground/80">{item.issue}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Dashboard mockup content array ─────────────────────────────────── */

const mockupContent = [
  <DiagnoseMockup key="diagnose" />,
  <FixMockup key="fix" />,
  <VerifyMockup key="verify" />,
];

/* ── Dashboard Chrome ────────────────────────────────────────────────── */

function DashboardChrome({
  activeTab,
  children,
}: {
  activeTab: number;
  children: React.ReactNode;
}) {
  const tab = sections[activeTab];

  return (
    <div className="overflow-hidden rounded-2xl border border-border/60 bg-background shadow-2xl ring-1 ring-border/30">
      <div className="flex items-center gap-1.5 border-b border-border/40 bg-muted/20 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-300/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
        <div className="mx-auto ml-3 flex items-center gap-1 rounded-md border border-border/40 bg-background/70 px-3 py-1">
          <span className="text-[9px] font-medium text-muted-foreground/40">
            app.beseam.com/
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
              {tab.routeLabel}
            </motion.span>
          </AnimatePresence>
        </div>
        <div className="ml-2 flex items-center gap-2">
          <Bell className="h-3 w-3 text-muted-foreground/50" />
          <div className="flex h-6 w-6 items-center justify-center rounded-full border border-primary/30 bg-primary/20">
            <User className="h-3 w-3 text-primary" />
          </div>
        </div>
      </div>

      <div className="flex">
        <div className="flex w-[52px] shrink-0 flex-col border-r border-border/40 bg-muted/10 py-3">
          <div className="mb-3 flex h-8 items-center justify-center">
            <div className="flex h-5 w-5 items-center justify-center rounded-md bg-primary">
              <span className="text-[8px] font-black text-white">B</span>
            </div>
          </div>
          <div className="flex flex-col gap-1 px-2">
            {sections.map((item, index) => {
              const isActive = index === activeTab;
              return (
                <div
                  key={item.id}
                  className={`relative flex h-8 w-full items-center justify-center rounded-lg border transition-all duration-300 ${
                    isActive
                      ? item.sidebarActiveClass
                      : "border-transparent text-muted-foreground/40"
                  }`}
                >
                  <item.icon className="h-3.5 w-3.5" />
                  {isActive && (
                    <motion.div
                      layoutId="how-it-works-sidebar"
                      className={`absolute -right-[1px] top-1/2 h-4 w-0.5 -translate-y-1/2 rounded-full ${item.dotClass}`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between border-b border-border/40 bg-background/50 px-4 py-2.5">
            <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground/50">
              <span className="font-semibold">Beseam</span>
              <ChevronRight className="h-2.5 w-2.5" />
              <span className={`font-black ${tab.colorClass}`}>
                {tab.navLabel}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              {collectTabs.map((item) => {
                const isActive = item === tab.navLabel;
                return (
                  <span
                    key={item}
                    className={`rounded-full px-2 py-0.5 text-[9px] font-black ${
                      isActive
                        ? `${tab.bgClass} ${tab.colorClass}`
                        : "text-muted-foreground/45"
                    }`}
                  >
                    {item}
                  </span>
                );
              })}
            </div>
          </div>

          <div className="overflow-hidden p-4">
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
}

/* ── Main Section ────────────────────────────────────────────────────── */

export default function HowItWorksSection() {
  const [activeTab, setActiveTab] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window === "undefined" || window.innerWidth < 1024) return;
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const sectionHeight = section.offsetHeight;
      const windowHeight = window.innerHeight;
      const scrolled = Math.max(0, -rect.top);
      const scrollable = sectionHeight - windowHeight;

      if (scrollable <= 0) return;

      const progress = scrolled / scrollable;
      const nextTab = Math.min(
        Math.max(0, Math.floor(progress * sections.length)),
        sections.length - 1,
      );

      setActiveTab((current) => (current === nextTab ? current : nextTab));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const tab = sections[activeTab];

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="relative h-auto lg:h-[450vh]"
    >
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className={`absolute right-0 top-1/4 h-[560px] w-[560px] rounded-full blur-[140px] opacity-15 ${tab.bgClass}`}
          />
        </AnimatePresence>
        <div className="absolute bottom-1/3 left-0 h-[480px] w-[480px] rounded-full bg-secondary/5 blur-[140px]" />
      </div>

      {/* Desktop: sticky scroll-driven */}
      <div className="hidden lg:flex lg:sticky lg:top-0 lg:h-screen flex-col overflow-hidden">
        <div className="shrink-0 text-center pt-10 pb-2 px-4">
          <p className="text-primary mb-2 text-xs font-semibold uppercase tracking-wider">
            How It Works
          </p>
          <h2 className="font-heading text-2xl font-bold tracking-tight sm:text-3xl">
            Audit. Fix. <span className="text-primary italic">Verify.</span>
          </h2>
        </div>

        <div className="flex-1 min-h-0 flex items-center px-8">
          <div className="w-full max-w-6xl mx-auto flex gap-14 items-center">
            <div className="w-[40%] shrink-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="space-y-5"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`select-none text-6xl font-black leading-none opacity-10 ${tab.colorClass}`}
                    >
                      {String(activeTab + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${tab.bgClass} ${tab.colorClass} ${tab.borderClass}`}
                    >
                      <tab.icon className="h-3.5 w-3.5" />
                      {tab.title}
                    </span>
                  </div>

                  <div>
                    <h3 className="mb-3 text-2xl font-bold text-foreground">
                      {tab.subtitle}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {tab.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`rounded-full border px-3 py-1 text-xs font-semibold ${tab.bgClass} ${tab.colorClass} ${tab.borderClass}`}
                    >
                      {tab.support}
                    </span>
                    <span className="rounded-full border border-border/60 px-3 py-1 text-xs font-semibold text-muted-foreground">
                      {tab.totalChecks}
                    </span>
                  </div>

                  <ul className="space-y-3">
                    {tab.areas.map((area) => (
                      <li key={area} className="flex items-start gap-3">
                        <div
                          className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${tab.bgClass} ${tab.borderClass}`}
                        >
                          <CheckCircle2
                            className={`h-2.5 w-2.5 ${tab.colorClass}`}
                          />
                        </div>
                        <span className="text-sm text-muted-foreground/90">
                          {area}
                        </span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="min-w-0 flex-1">
              <div className="relative">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`glow-${activeTab}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6 }}
                    className={`pointer-events-none absolute -inset-8 -z-10 rounded-3xl blur-3xl opacity-20 ${tab.bgClass}`}
                  />
                </AnimatePresence>
                <DashboardChrome activeTab={activeTab}>
                  {mockupContent[activeTab]}
                </DashboardChrome>
              </div>
            </div>
          </div>
        </div>

        <div className="flex shrink-0 items-center justify-center gap-3 pb-8">
          {sections.map((item, index) => (
            <div
              key={item.id}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                index === activeTab
                  ? `w-8 ${item.dotClass}`
                  : index < activeTab
                    ? `w-2 ${item.dotClass} opacity-30`
                    : "w-1.5 bg-muted-foreground/20"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Mobile: tab switcher */}
      <div className="lg:hidden py-16 px-4 sm:px-6">
        <div className="text-center mb-8">
          <p className="text-primary mb-2 text-xs font-semibold uppercase tracking-wider">
            How It Works
          </p>
          <h2 className="font-heading text-2xl font-bold tracking-tight">
            Audit. Fix. <span className="text-primary italic">Verify.</span>
          </h2>
        </div>

        <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
          {sections.map((item, index) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(index)}
              className={`shrink-0 rounded-full border px-4 py-2 text-xs font-semibold transition-all ${
                index === activeTab
                  ? `${item.bgClass} ${item.colorClass} ${item.borderClass} shadow-sm`
                  : "border-border/40 bg-background text-muted-foreground/60"
              }`}
            >
              {item.title}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={`mobile-copy-${activeTab}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="mb-6"
          >
            <div>
              <p className="mb-3 text-2xl font-bold text-foreground">
                {tab.subtitle}
              </p>
              <p className="text-foreground/80 mb-4 leading-relaxed">
                {tab.description}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`rounded-full border px-3 py-1 text-xs font-semibold ${tab.bgClass} ${tab.colorClass} ${tab.borderClass}`}
              >
                {tab.support}
              </span>
              <span className="rounded-full border border-border/60 px-3 py-1 text-xs font-semibold text-muted-foreground">
                {tab.totalChecks}
              </span>
            </div>
            <ul className="mb-6 mt-4 space-y-2">
              {tab.areas.map((area) => (
                <li
                  key={area}
                  className="flex items-start gap-2 text-sm text-muted-foreground"
                >
                  <div
                    className={`mt-0.5 flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full border ${tab.bgClass} ${tab.borderClass}`}
                  >
                    <CheckCircle2 className={`h-2 w-2 ${tab.colorClass}`} />
                  </div>
                  {area}
                </li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.div
            key={`mobile-dash-${activeTab}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <DashboardChrome activeTab={activeTab}>
              {mockupContent[activeTab]}
            </DashboardChrome>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
