"use client";

import { useEffect, useRef, useState } from "react";
import {
  Activity,
  Bell,
  CheckCircle2,
  ChevronRight,
  Globe,
  Search,
  Sparkles,
  User,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const sections = [
  {
    id: "crawl",
    title: "Crawl",
    subtitle: "Whole-store collection",
    support: "Crawling every page",
    routeLabel: "crawl",
    navLabel: "Pages",
    icon: Globe,
    colorClass: "text-sky-600",
    bgClass: "bg-sky-50 dark:bg-sky-950/30",
    borderClass: "border-sky-200 dark:border-sky-800",
    dotClass: "bg-sky-500",
    sidebarActiveClass:
      "bg-sky-100 text-sky-600 border-sky-200 dark:bg-sky-950/40 dark:text-sky-400 dark:border-sky-800",
    description:
      "Start by crawling the whole site so product pages, collections, and commercial entry points are all available for analysis.",
    areas: ["Product pages", "Collections", "Merchant URLs"],
    totalChecks: "126 pages",
  },
  {
    id: "audit",
    title: "Audit",
    subtitle: "Checks everything",
    support: "Structured audit coverage",
    routeLabel: "tasks",
    navLabel: "Tasks",
    icon: Search,
    colorClass: "text-amber-600",
    bgClass: "bg-amber-50 dark:bg-amber-950/30",
    borderClass: "border-amber-200 dark:border-amber-800",
    dotClass: "bg-amber-500",
    sidebarActiveClass:
      "bg-amber-100 text-amber-600 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-800",
    description:
      "Run the full audit layer across the site and group every issue into the checks that actually matter for visibility and storefront quality.",
    areas: [
      "SEO Foundations",
      "AI / LLM Discoverability",
      "Shopping Feed",
      "Content Quality",
    ],
    totalChecks: "118+ checks",
  },
  {
    id: "fix",
    title: "Fix",
    subtitle: "Automated, assisted, or manual",
    support: "AI fixes it where possible",
    routeLabel: "tasks/184",
    navLabel: "Tasks",
    icon: Sparkles,
    colorClass: "text-violet-600",
    bgClass: "bg-violet-50 dark:bg-violet-950/30",
    borderClass: "border-violet-200 dark:border-violet-800",
    dotClass: "bg-violet-500",
    sidebarActiveClass:
      "bg-violet-100 text-violet-600 border-violet-200 dark:bg-violet-950/40 dark:text-violet-400 dark:border-violet-800",
    description:
      "Take the audit output and route it into the right fix path: fully automated, review-first, or manual execution for edge cases.",
    areas: ["AI fixes it", "AI-assisted", "Manual fix"],
    totalChecks: "3 fix paths",
  },
  {
    id: "monitor",
    title: "Monitor",
    subtitle: "Continuous site health",
    support: "Tracked & alerted",
    routeLabel: "monitor",
    navLabel: "Overview",
    icon: Activity,
    colorClass: "text-emerald-600",
    bgClass: "bg-emerald-50 dark:bg-emerald-950/30",
    borderClass: "border-emerald-200 dark:border-emerald-800",
    dotClass: "bg-emerald-500",
    sidebarActiveClass:
      "bg-emerald-100 text-emerald-600 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800",
    description:
      "Keep watching site health after fixes ship so performance, international setup, and structural regressions are caught early.",
    areas: ["Performance / Speed", "International / i18n", "Health alerts"],
    totalChecks: "Continuous",
  },
] as const;

const collectTabs = ["Overview", "Pages", "Tasks", "Categories"] as const;

function CrawlMockup() {
  const rows = [
    {
      url: "/products/blue-summer-dress",
      type: "product",
      status: "Fetched",
      statusClass: "bg-emerald-500/10 text-emerald-600",
      updated: "2m ago",
    },
    {
      url: "/products/linen-shirt",
      type: "product",
      status: "Crawling",
      statusClass: "bg-sky-500/10 text-sky-600",
      updated: "running",
    },
    {
      url: "/products/running-cap",
      type: "product",
      status: "Pending",
      statusClass: "bg-muted text-muted-foreground",
      updated: "queued",
    },
    {
      url: "/products/summer-sandals",
      type: "product",
      status: "Failed",
      statusClass: "bg-red-500/10 text-red-600",
      updated: "retry needed",
    },
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-black text-foreground">Store URLs</h3>
          <p className="text-[11px] text-muted-foreground/60">
            Active crawl session
          </p>
        </div>
        <span className="rounded-full border border-sky-200 bg-sky-50 px-2.5 py-1 text-[10px] font-black text-sky-600">
          68% complete
        </span>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {[
          ["Fetched", "82"],
          ["Crawling", "11"],
          ["Pending", "27"],
          ["Failed", "6"],
        ].map(([label, value]) => (
          <div
            key={label}
            className="rounded-xl border border-border/40 bg-muted/20 px-3 py-2.5"
          >
            <p className="mb-1 text-[9px] font-black uppercase tracking-widest text-muted-foreground/50">
              {label}
            </p>
            <p className="text-[18px] font-black leading-none text-foreground">
              {value}
            </p>
          </div>
        ))}
      </div>

      <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
        <div className="h-full w-[68%] rounded-full bg-sky-500" />
      </div>

      <div className="rounded-xl border border-border/40 bg-muted/20 px-3 py-2.5">
        <div className="grid grid-cols-[1.7fr_0.6fr_0.8fr] gap-3 text-[9px] font-black uppercase tracking-widest text-muted-foreground/50">
          <span>Page</span>
          <span>Type</span>
          <span>Status</span>
        </div>
      </div>

      <div className="space-y-2">
        {rows.map((row) => (
          <div
            key={row.url}
            className="grid grid-cols-[1.7fr_0.6fr_0.8fr] items-start gap-3 rounded-xl border border-border/40 bg-background/80 px-3 py-2.5"
          >
            <div className="min-w-0">
              <p className="truncate text-[12px] font-bold text-foreground">
                {row.url}
              </p>
              <p className="text-[10px] text-muted-foreground/60">
                {row.updated}
              </p>
            </div>
            <span className="text-[10px] font-black capitalize text-foreground/75">
              {row.type}
            </span>
            <span
              className={`w-fit rounded-full px-2 py-0.5 text-[10px] font-black ${row.statusClass}`}
            >
              {row.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function AuditMockup() {
  const rows = [
    {
      task: "Missing merchant + shipping info",
      status: "Pending",
      category: "AEO",
      priority: "P0",
    },
    {
      task: "Thin meta descriptions on best sellers",
      status: "In Progress",
      category: "Content",
      priority: "P1",
    },
    {
      task: "No review schema on summer collection",
      status: "Pending",
      category: "SEO",
      priority: "P1",
    },
    {
      task: "Hreflang mismatch on EU storefront",
      status: "Pending",
      category: "i18n",
      priority: "P2",
    },
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-black text-foreground">
            Persistent Tasks
          </h3>
          <p className="text-[11px] text-muted-foreground/60">
            Synced from crawl audit results
          </p>
        </div>
        <span className="rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-[10px] font-black text-amber-600">
          14 open
        </span>
      </div>

      <div className="rounded-xl border border-border/40 bg-muted/20 px-3 py-2.5">
        <div className="grid grid-cols-[1.55fr_0.75fr_0.55fr_0.55fr] gap-3 text-[9px] font-black uppercase tracking-widest text-muted-foreground/50">
          <span>Task</span>
          <span>Status</span>
          <span>Category</span>
          <span>Priority</span>
        </div>
      </div>

      <div className="space-y-2">
        {rows.map((row) => (
          <div
            key={row.task}
            className="grid grid-cols-[1.55fr_0.75fr_0.55fr_0.55fr] gap-3 rounded-xl border border-border/40 bg-background/80 px-3 py-3"
          >
            <div className="min-w-0">
              <p className="truncate text-[12px] font-bold text-foreground">
                {row.task}
              </p>
            </div>
            <span className="text-[10px] font-black text-muted-foreground">
              {row.status}
            </span>
            <span className="text-[10px] font-black text-foreground/80">
              {row.category}
            </span>
            <span className="text-[10px] font-black text-amber-600">
              {row.priority}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function FixMockup() {
  const rows = [
    {
      page: "Merchant + shipping fields",
      status: "AI fix",
      statusClass: "bg-emerald-500/10 text-emerald-600",
    },
    {
      page: "Thin meta descriptions",
      status: "AI-assisted",
      statusClass: "bg-sky-500/10 text-sky-600",
    },
    {
      page: "International hreflang gaps",
      status: "Manual",
      statusClass: "bg-amber-500/10 text-amber-700",
    },
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-black text-foreground">Fix Paths</h3>
          <p className="text-[11px] text-muted-foreground/60">
            Automated, assisted, and manual workflows
          </p>
        </div>
        <span className="rounded-full border border-violet-200 bg-violet-50 px-2.5 py-1 text-[10px] font-black text-violet-600">
          3 active paths
        </span>
      </div>

      <div className="rounded-xl border border-border/40 bg-muted/20 px-3 py-3">
        <div className="mb-3 flex items-center justify-between">
          <div>
            <p className="text-[12px] font-bold text-foreground">
              Recommended resolution mix
            </p>
            <p className="text-[10px] text-muted-foreground/60">
              Based on issue type and confidence
            </p>
          </div>
          <span className="rounded-md bg-emerald-500/10 px-1.5 py-0.5 text-[10px] font-black text-emerald-600">
            27 ready
          </span>
        </div>

        <div className="space-y-2">
          {rows.map((row) => (
            <div
              key={row.page}
              className="flex items-center justify-between rounded-lg border border-border/40 bg-background/80 px-3 py-2"
            >
              <span className="truncate text-[11px] font-semibold text-foreground/90">
                {row.page}
              </span>
              <span
                className={`ml-3 shrink-0 rounded-full px-2 py-0.5 text-[10px] font-black ${row.statusClass}`}
              >
                {row.status}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-3 flex gap-2">
          <button className="flex-1 rounded-full bg-primary py-2 text-[11px] font-black text-primary-foreground">
            Approve
          </button>
          <button className="flex-1 rounded-full border-2 border-border/40 py-2 text-[11px] font-black text-muted-foreground">
            Discard
          </button>
          <button className="flex-1 rounded-full border-2 border-emerald-300 bg-emerald-50 py-2 text-[11px] font-black text-emerald-700">
            Push to Shopify
          </button>
        </div>
      </div>
    </div>
  );
}

function MonitorMockup() {
  const cards = [
    {
      label: "Performance / Speed",
      percentage: 84,
      metricLabel: "Healthy pages",
      issueLabel: "warnings",
      issueCount: 6,
      totalCount: 38,
      tone: "emerald",
      description: "Core Web Vitals drift and render-blocking assets.",
    },
    {
      label: "International / i18n",
      percentage: 67,
      metricLabel: "Coverage",
      issueLabel: "drifts",
      issueCount: 11,
      totalCount: 33,
      tone: "amber",
      description: "Hreflang, locale routing, and market-specific URLs.",
    },
    {
      label: "Schema Health",
      percentage: 91,
      metricLabel: "Validated markup",
      issueLabel: "issues",
      issueCount: 3,
      totalCount: 34,
      tone: "emerald",
      description: "Merchant, offer, review, and product structured data.",
    },
    {
      label: "Feed Sync",
      percentage: 58,
      metricLabel: "Channels aligned",
      issueLabel: "mismatches",
      issueCount: 14,
      totalCount: 33,
      tone: "red",
      description: "Price, availability, and variant parity across feeds.",
    },
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-black text-foreground">Site Health</h3>
          <p className="text-[11px] text-muted-foreground/60">
            Continuous monitoring after publish
          </p>
        </div>
        <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[10px] font-black text-emerald-600">
          4 health lanes tracked
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {cards.map((card) => {
          const textClass =
            card.tone === "emerald"
              ? "text-emerald-600"
              : card.tone === "amber"
                ? "text-amber-600"
                : "text-red-600";
          const barClass =
            card.tone === "emerald"
              ? "bg-emerald-500"
              : card.tone === "amber"
                ? "bg-amber-500"
                : "bg-red-500";

          return (
            <div
              key={card.label}
              className="rounded-xl border border-border/70 bg-card px-3 py-3 shadow-sm"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="text-[11px] font-semibold text-foreground">
                  {card.label}
                </span>
                <span className={`text-[18px] font-black ${textClass}`}>
                  {card.percentage}%
                </span>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
                <div
                  className={`h-full rounded-full ${barClass}`}
                  style={{ width: `${card.percentage}%` }}
                />
              </div>
              <div className="mt-2 flex items-center justify-between text-[10px] text-muted-foreground/70">
                <span>{card.metricLabel}</span>
                <span>
                  {card.issueCount} of {card.totalCount} {card.issueLabel}
                </span>
              </div>
              <p className="mt-2 text-[10px] leading-relaxed text-muted-foreground/75">
                {card.description}
              </p>
            </div>
          );
        })}
      </div>

      <div className="rounded-xl border border-border/40 bg-background/80 px-3 py-3">
        <div className="mb-2 flex items-center justify-between">
          <p className="text-[12px] font-bold text-foreground">Latest alert</p>
          <span className="rounded-full bg-red-500/10 px-2 py-0.5 text-[10px] font-black text-red-600">
            Feed mismatch
          </span>
        </div>
        <p className="text-[11px] leading-relaxed text-muted-foreground">
          Variant availability drift was detected between Shopify and the
          merchant feed on 14 monitored PDPs after the latest catalog sync.
        </p>
      </div>
    </div>
  );
}

const mockupContent = [
  <CrawlMockup key="crawl" />,
  <AuditMockup key="audit" />,
  <FixMockup key="fix" />,
  <MonitorMockup key="monitor" />,
];

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
            app.beseam.com/collect/
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
                      layoutId="collect-preview-sidebar"
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
              <span className="font-semibold">Collect</span>
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
    <section ref={sectionRef} className="relative h-auto lg:h-[600vh]">
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

      <div className="hidden lg:flex lg:sticky lg:top-0 lg:h-screen flex-col overflow-hidden">
        <div className="shrink-0 text-center pt-10 pb-2 px-4">
          <p className="text-primary mb-2 text-xs font-semibold uppercase tracking-wider">
            How It Works
          </p>
          <h2 className="font-heading text-2xl font-bold tracking-tight sm:text-3xl">
            Crawl, audit, fix,{" "}
            <span className="text-primary italic">and monitor.</span>
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

      <div className="lg:hidden py-16 px-4 sm:px-6">
        <div className="text-center mb-8">
          <p className="text-primary mb-2 text-xs font-semibold uppercase tracking-wider">
            Platform Preview
          </p>
          <h2 className="font-heading text-2xl font-bold tracking-tight">
            Here&apos;s the platform{" "}
            <span className="text-primary italic">behind it.</span>
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
