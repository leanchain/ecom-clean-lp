"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Activity,
  ArrowUpRight,
  ChevronDown,
  Clock,
  Globe,
  Layers,
  Package,
  Search,
  Settings,
  Sparkles,
  SquareUser,
  Target,
  CheckCircle2,
} from "lucide-react";
import React, { useCallback, useEffect, useRef, useState } from "react";

/* ================================================================
   CONFIG
   ================================================================ */

const TAB_DURATION_MS = 10_000;
const TABS = [
  { id: "dsm", label: "Digital Shelf Manager" },
  { id: "catalog", label: "Catalog" },
  { id: "traffic", label: "Traffic Optimizer" },
] as const;
type TabId = (typeof TABS)[number]["id"];

/* ================================================================
   SIDEBAR NAV - mirrors real Sidebar.tsx
   ================================================================ */

type NavItem = {
  icon: React.ElementType;
  label: string;
  active?: boolean;
  indent?: boolean;
};

const SIDEBAR_NAV: Record<TabId, { main: NavItem[]; bottom: NavItem[] }> = {
  dsm: {
    main: [
      { icon: Layers, label: "Stores" },
      { icon: SquareUser, label: "Digital Shelf Manager", active: true },
      { icon: Package, label: "Catalog", indent: true },
      { icon: Globe, label: "Traffic Optimizer", indent: true },
    ],
    bottom: [{ icon: Settings, label: "Settings" }],
  },
  catalog: {
    main: [
      { icon: Layers, label: "Stores" },
      { icon: SquareUser, label: "Digital Shelf Manager" },
      { icon: Package, label: "Catalog", indent: true, active: true },
      { icon: Globe, label: "Traffic Optimizer", indent: true },
    ],
    bottom: [{ icon: Settings, label: "Settings" }],
  },
  traffic: {
    main: [
      { icon: Layers, label: "Stores" },
      { icon: SquareUser, label: "Digital Shelf Manager" },
      { icon: Package, label: "Catalog", indent: true },
      {
        icon: Globe,
        label: "Traffic Optimizer",
        indent: true,
        active: true,
      },
    ],
    bottom: [{ icon: Settings, label: "Settings" }],
  },
};

/* ================================================================
   SHARED - Header + SubTabRail + scoreColor
   ================================================================ */

function sc(n: number) {
  return n >= 80 ? "#10b981" : n >= 60 ? "#f59e0b" : "#ef4444";
}

function MockHeader({
  title,
  actionLabel,
}: {
  title: string;
  actionLabel?: string;
}) {
  return (
    <div className="flex items-center gap-2.5 border-b border-gray-200/80 bg-white px-4 py-2.5 dark:border-[#2a2d35] dark:bg-[#191b20]">
      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-[var(--color-primary)]/10">
        <span className="text-[9px] font-bold text-[var(--color-primary)]">
          D
        </span>
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[13px] font-semibold leading-tight text-gray-900 dark:text-gray-100">
          {title}
        </p>
        <div className="mt-0.5 flex items-center gap-2">
          <span className="rounded border border-emerald-500/30 bg-emerald-500/12 px-1.5 py-px text-[9px] font-medium text-emerald-700 dark:text-emerald-400">
            Active
          </span>
          <span className="hidden items-center gap-1 text-[10px] text-gray-400 sm:inline-flex dark:text-gray-500">
            <Clock className="h-2.5 w-2.5" />
            Last run 8m ago
          </span>
        </div>
      </div>
      <div className="hidden items-center gap-0.5 sm:flex">
        {[Activity, Sparkles, Settings].map((Icon, i) => (
          <div
            key={i}
            className={`flex h-6 w-6 items-center justify-center rounded-md ${
              i === 0
                ? "bg-[var(--color-primary)]/10 text-[var(--color-primary)]"
                : "text-gray-400 dark:text-gray-500"
            }`}
          >
            <Icon className="h-3 w-3" />
          </div>
        ))}
      </div>
      {actionLabel && (
        <div className="flex h-6 items-center gap-1.5 rounded-md bg-gray-900 px-2.5 text-[11px] font-medium text-white dark:bg-gray-100 dark:text-gray-900">
          <Search className="h-3 w-3" />
          <span>{actionLabel}</span>
        </div>
      )}
    </div>
  );
}

function SubTabRail({
  tabs,
  active,
}: {
  tabs: { id: string; label: string; count?: number }[];
  active: string;
}) {
  return (
    <div className="flex items-stretch border-b border-gray-200/60 bg-gray-50/60 px-1 dark:border-[#2a2d35] dark:bg-[#15171b]">
      {tabs.map((t) => {
        const isActive = t.id === active;
        return (
          <div
            key={t.id}
            className={`relative flex items-center gap-1 px-2.5 py-1.5 text-[10px] font-medium ${
              isActive
                ? "text-gray-900 dark:text-gray-100"
                : "text-gray-400 dark:text-gray-600"
            }`}
          >
            {isActive && (
              <div className="absolute inset-x-0 top-0 h-[2px] rounded-b bg-[var(--color-primary)]" />
            )}
            {isActive && (
              <div className="absolute inset-0 border-x border-gray-200/60 bg-white shadow-sm dark:border-[#2a2d35] dark:bg-[#191b20]" />
            )}
            <span className="relative z-10">{t.label}</span>
            {t.count != null && (
              <span className="relative z-10 tabular-nums text-gray-300 dark:text-gray-600">
                {t.count}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   TAB 1 - DSM OVERVIEW
   ════════════════════════════════════════════════════════════════ */

function DsmContent() {
  return (
    <div className="flex flex-col gap-3 p-4">
      {/* Brief Card */}
      <div className="rounded-xl border border-gray-200/80 bg-white px-4 py-4 shadow-sm dark:border-[#2a2d35] dark:bg-[#1e2025]">
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded border border-gray-200 bg-gray-50 px-1.5 py-px text-[9px] font-medium uppercase tracking-wide text-gray-500 dark:border-[#2a2d35] dark:bg-[#25272d] dark:text-gray-400">
              Overview
            </span>
            <span className="rounded border border-emerald-500/30 bg-emerald-500/10 px-1.5 py-px text-[9px] font-bold text-emerald-700 dark:text-emerald-400">
              Stable
            </span>
            <span className="text-[10px] text-gray-400">Apr 13, 3:42 PM</span>
          </div>
          <div className="flex gap-2.5">
            <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600" />
            <div>
              <p className="text-[12px] font-medium leading-relaxed text-gray-900 dark:text-gray-100">
                All systems healthy. 126 pages audited across 4 categories. 3
                new quick wins since last run.
              </p>
              <p className="mt-0.5 text-[11px] text-gray-400 dark:text-gray-500">
                Score improved +11 pts this week - best in 30 days.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 xl:grid-cols-4">
            {[
              { label: "Pages", desc: "126 of 189 crawled", em: false },
              { label: "Audit", desc: "81% health · SEO weakest", em: false },
              { label: "Products", desc: "72% shopping health", em: false },
              { label: "Tasks", desc: "14 urgent · 38 open", em: true },
            ].map((c) => (
              <div
                key={c.label}
                className={`flex min-h-[56px] flex-col justify-between rounded-lg border px-3 py-2 ${
                  c.em
                    ? "border-[var(--color-primary)]/30 bg-[var(--color-primary)]/5"
                    : "border-gray-200/60 bg-white dark:border-[#2a2d35] dark:bg-[#1e2025]"
                }`}
              >
                <div className="flex items-start justify-between">
                  <span className="text-[11px] font-semibold text-gray-900 dark:text-gray-100">
                    {c.label}
                  </span>
                  <ArrowUpRight className="h-3 w-3 text-gray-300 dark:text-gray-600" />
                </div>
                <span className="mt-1 text-[10px] text-gray-400 dark:text-gray-500">
                  {c.desc}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2">
        {[
          { label: "Score", value: "74", sub: "/100", warn: false },
          { label: "Open tasks", value: "38", sub: "", warn: false },
          { label: "Urgent", value: "14", sub: "", warn: true },
        ].map((s) => (
          <div
            key={s.label}
            className="rounded-lg border border-gray-200/60 bg-white px-3 py-2 text-center dark:border-[#2a2d35] dark:bg-[#1e2025]"
          >
            <p className="text-[9px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
              {s.label}
            </p>
            <p
              className={`text-base font-black leading-tight tabular-nums ${s.warn ? "text-red-500" : "text-gray-900 dark:text-gray-100"}`}
            >
              {s.value}
              {s.sub && (
                <span className="text-[10px] font-medium text-gray-300 dark:text-gray-600">
                  {s.sub}
                </span>
              )}
            </p>
          </div>
        ))}
      </div>

      {/* Outcome Cards */}
      <div className="rounded-xl border border-gray-200/80 bg-white px-4 py-3 shadow-sm dark:border-[#2a2d35] dark:bg-[#1e2025]">
        <div className="mb-2 flex items-center gap-2">
          <Target className="h-3.5 w-3.5 text-gray-400 dark:text-gray-500" />
          <span className="text-[11px] font-semibold text-gray-900 dark:text-gray-100">
            Tracked Outcomes
          </span>
          <span className="rounded-full bg-gray-100 px-1.5 py-px text-[9px] font-medium text-gray-500 dark:bg-[#25272d] dark:text-gray-400">
            3
          </span>
        </div>
        <div className="grid gap-2 sm:grid-cols-3">
          {[
            { label: "Product discoverability", domains: ["SEO", "Schema"] },
            { label: "Content quality", domains: ["Meta", "Headings"] },
            { label: "Conversion readiness", domains: ["Speed", "UX"] },
          ].map((o) => (
            <div
              key={o.label}
              className="rounded-lg border border-gray-200/50 bg-gray-50/50 px-3 py-2 dark:border-[#2a2d35] dark:bg-[#25272d]/50"
            >
              <p className="text-[11px] font-medium text-gray-900 dark:text-gray-100">
                {o.label}
              </p>
              <div className="mt-1 flex gap-1">
                {o.domains.map((d) => (
                  <span
                    key={d}
                    className="rounded bg-[var(--color-primary)]/8 px-1 py-px text-[8px] font-bold uppercase text-[var(--color-primary)]/70"
                  >
                    {d}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Category Health */}
      <div className="grid grid-cols-2 gap-2 xl:grid-cols-4">
        {[
          { icon: "🔍", label: "SEO", pct: 81, pages: "4 of 126" },
          { icon: "📊", label: "Structured Data", pct: 63, pages: "12 of 89" },
          { icon: "✍️", label: "Content", pct: 71, pages: "7 of 120" },
          { icon: "⚡", label: "Performance", pct: 58, pages: "9 of 126" },
        ].map((c) => (
          <div
            key={c.label}
            className="rounded-xl border border-gray-200/60 bg-white px-3 py-2.5 shadow-sm dark:border-[#2a2d35] dark:bg-[#1e2025]"
          >
            <div className="flex items-center gap-1.5">
              <span className="text-sm">{c.icon}</span>
              <span className="flex-1 text-[11px] font-semibold text-gray-900 dark:text-gray-100">
                {c.label}
              </span>
              <span
                className="text-base font-bold tabular-nums"
                style={{ color: sc(c.pct) }}
              >
                {c.pct}%
              </span>
            </div>
            <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-gray-100 dark:bg-[#25272d]">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${c.pct}%`,
                  background:
                    c.pct >= 80
                      ? "#10b981"
                      : c.pct >= 60
                        ? "#f59e0b"
                        : "#ef4444",
                }}
              />
            </div>
            <p className="mt-1 text-[9px] text-gray-400 dark:text-gray-500">
              {c.pages} impacted
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   TAB 2 - CATALOG / PRODUCTS
   ════════════════════════════════════════════════════════════════ */

function CatalogContent() {
  const products = [
    { name: "Summer Floral Midi Dress", vendor: "Zara", score: 92, issues: 1, status: "active" },
    { name: "Block Heel Sandal - Nude", vendor: "Jimmy Choo", score: 74, issues: 4, status: "active" },
    { name: "Quilted Chain Shoulder Bag", vendor: "Chanel", score: 61, issues: 8, status: "active" },
    { name: "Oversized Square Sunglasses", vendor: "Ray-Ban", score: 88, issues: 2, status: "active" },
    { name: "Straw Wide-Brim Hat", vendor: "H&M", score: 45, issues: 11, status: "draft" },
    { name: "Ribbed Knit Tank Top", vendor: "COS", score: 79, issues: 3, status: "active" },
    { name: "Leather Belt - Cognac", vendor: "Massimo Dutti", score: 84, issues: 2, status: "active" },
    { name: "Silk Scarf - Floral Print", vendor: "Hermès", score: 96, issues: 0, status: "active" },
  ];
  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="flex items-center gap-2 border-b border-gray-200/60 px-4 py-2 dark:border-[#2a2d35]">
        <div className="flex h-7 flex-1 items-center gap-2 rounded-md border border-gray-200/80 bg-gray-50/60 px-2.5 text-[11px] text-gray-400 dark:border-[#2a2d35] dark:bg-[#25272d]/50 dark:text-gray-500">
          <Search className="h-3 w-3" />
          <span>Filter products…</span>
        </div>
        <div className="flex h-7 items-center gap-1 rounded-md border border-gray-200/80 px-2 text-[10px] font-medium text-gray-500 dark:border-[#2a2d35] dark:text-gray-400">
          <span>Status</span>
          <ChevronDown className="h-2.5 w-2.5" />
        </div>
        <div className="flex h-7 items-center gap-1.5 rounded-md bg-gray-900 px-2.5 text-[10px] font-medium text-white dark:bg-gray-100 dark:text-gray-900">
          <Sparkles className="h-3 w-3" />
          <span>Discover</span>
        </div>
      </div>
      <div className="flex-1 overflow-hidden">
        <div className="grid grid-cols-[1fr_72px_40px_40px_48px] gap-1 border-b border-gray-200/40 px-4 py-1.5 text-[9px] font-bold uppercase tracking-widest text-gray-400 dark:border-[#2a2d35] dark:text-gray-500">
          <span>Product</span>
          <span>Vendor</span>
          <span className="text-right">Score</span>
          <span className="text-right">Issues</span>
          <span className="text-right">Status</span>
        </div>
        {products.map((r) => (
          <div
            key={r.name}
            className="grid grid-cols-[1fr_72px_40px_40px_48px] items-center gap-1 border-b border-gray-100/80 px-4 py-[7px] text-[11px] dark:border-[#25272d]"
          >
            <span className="truncate font-medium text-gray-900 dark:text-gray-100">
              {r.name}
            </span>
            <span className="truncate text-[10px] text-gray-400 dark:text-gray-500">
              {r.vendor}
            </span>
            <span className="text-right font-bold tabular-nums" style={{ color: sc(r.score) }}>
              {r.score}
            </span>
            <span className="text-right tabular-nums text-gray-400 dark:text-gray-500">
              {r.issues}
            </span>
            <span className={`text-right text-[9px] font-bold ${r.status === "active" ? "text-emerald-600 dark:text-emerald-400" : "text-gray-400 dark:text-gray-500"}`}>
              {r.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   TAB 3 - TRAFFIC OPTIMIZER
   ════════════════════════════════════════════════════════════════ */

const TRAFFIC_TABS = [
  { id: "pages", label: "Pages", count: 126 },
  { id: "audit", label: "Audit", count: 42 },
  { id: "speed", label: "Speed" },
  { id: "ai_audit", label: "AI Audit", count: 18 },
  { id: "tasks", label: "Tasks", count: 38 },
  { id: "fix_readiness", label: "Fix Ready" },
];

function TrafficContent() {
  const pages = [
    { url: "/products/summer-floral-midi-dress", type: "PDP", score: 91, http: 200 },
    { url: "/collections/summer-dresses", type: "PLP", score: 67, http: 200 },
    { url: "/blogs/blog/style-guide-2025", type: "Blog", score: 43, http: 200 },
    { url: "/pages/about-us", type: "Static", score: 88, http: 200 },
    { url: "/products/block-heel-sandal", type: "PDP", score: 72, http: 200 },
    { url: "/products/quilted-shoulder-bag", type: "PDP", score: 84, http: 200 },
    { url: "/collections/new-arrivals", type: "PLP", score: 59, http: 200 },
    { url: "/products/oversized-sunglasses", type: "PDP", score: 78, http: 200 },
  ];
  const dot = (s: number) =>
    s >= 80 ? "bg-emerald-500" : s >= 60 ? "bg-amber-500" : "bg-red-500";

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <SubTabRail tabs={TRAFFIC_TABS} active="pages" />
      <div className="flex items-center gap-2 border-b border-gray-200/60 px-4 py-2 dark:border-[#2a2d35]">
        <div className="flex h-7 flex-1 items-center gap-2 rounded-md border border-gray-200/80 bg-gray-50/60 px-2.5 text-[11px] text-gray-400 dark:border-[#2a2d35] dark:bg-[#25272d]/50 dark:text-gray-500">
          <Search className="h-3 w-3" />
          <span>Filter pages…</span>
        </div>
        <div className="flex h-7 items-center gap-1.5 rounded-md bg-gray-900 px-2.5 text-[10px] font-medium text-white dark:bg-gray-100 dark:text-gray-900">
          <Globe className="h-3 w-3" />
          <span>Crawl</span>
        </div>
      </div>
      <div className="flex-1 overflow-hidden">
        <div className="grid grid-cols-[8px_1fr_44px_36px_40px] gap-2 border-b border-gray-200/40 px-4 py-1.5 text-[9px] font-bold uppercase tracking-widest text-gray-400 dark:border-[#2a2d35] dark:text-gray-500">
          <span />
          <span>URL</span>
          <span className="text-right">Type</span>
          <span className="text-right">HTTP</span>
          <span className="text-right">Score</span>
        </div>
        {pages.map((r) => (
          <div
            key={r.url}
            className="grid grid-cols-[8px_1fr_44px_36px_40px] items-center gap-2 border-b border-gray-100/80 px-4 py-[7px] text-[11px] dark:border-[#25272d]"
          >
            <span className={`h-1.5 w-1.5 rounded-full ${dot(r.score)}`} />
            <span className="truncate text-gray-500 dark:text-gray-400">
              {r.url}
            </span>
            <span className="text-right text-[10px] text-gray-400 dark:text-gray-500">
              {r.type}
            </span>
            <span className="text-right tabular-nums text-gray-400 dark:text-gray-500">
              {r.http}
            </span>
            <span className="text-right font-bold tabular-nums" style={{ color: sc(r.score) }}>
              {r.score}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ================================================================
   TAB → CONTENT MAP
   ================================================================ */

const TAB_CONTENT: Record<
  TabId,
  { header: React.ReactNode; content: React.ReactNode }
> = {
  dsm: {
    header: (
      <MockHeader title="Digital Shelf Manager" actionLabel="Discover Pages" />
    ),
    content: <DsmContent />,
  },
  catalog: {
    header: <MockHeader title="Catalog" actionLabel="Discover" />,
    content: <CatalogContent />,
  },
  traffic: {
    header: <MockHeader title="Traffic Optimizer" actionLabel="Crawl" />,
    content: <TrafficContent />,
  },
};

/* ================================================================
   MAIN EXPORT
   ================================================================ */

export default function WorkspacePreviewSection() {
  const [activeTab, setActiveTab] = useState<TabId>("dsm");
  const [progressKey, setProgressKey] = useState(0);
  const pausedUntilRef = useRef(0);

  const switchTab = useCallback(
    (id: TabId, fromUser = false) => {
      if (id === activeTab && !fromUser) return;
      setActiveTab(id);
      setProgressKey((k) => k + 1);
      if (fromUser) pausedUntilRef.current = Date.now() + 15_000;
    },
    [activeTab],
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      if (Date.now() < pausedUntilRef.current) return;
      const idx = TABS.findIndex((t) => t.id === activeTab);
      const next = TABS[(idx + 1) % TABS.length];
      switchTab(next.id);
    }, TAB_DURATION_MS);
    return () => clearTimeout(timer);
  }, [activeTab, progressKey, switchTab]);

  useEffect(() => {
    if (pausedUntilRef.current <= Date.now()) return;
    const remaining = pausedUntilRef.current - Date.now();
    const timer = setTimeout(() => setProgressKey((k) => k + 1), remaining);
    return () => clearTimeout(timer);
  }, [progressKey]);

  const nav = SIDEBAR_NAV[activeTab];
  const { header, content } = TAB_CONTENT[activeTab];

  return (
    <section className="px-4 pb-16 pt-2 sm:px-6 md:pb-24">
      <div className="mx-auto w-full max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* ── Feature Tabs with progress bar ── */}
          <div className="grid w-full grid-cols-3 border-b border-gray-200 dark:border-[#2a2d35]">
            {TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => switchTab(tab.id, true)}
                  className={`group relative flex cursor-pointer flex-col items-center px-2 pb-3 pt-3 text-sm font-medium transition-colors sm:px-4 md:text-base ${
                    isActive
                      ? "bg-gray-900/5 text-gray-900 dark:bg-white/10 dark:text-white"
                      : "text-gray-400 hover:text-gray-600 dark:text-gray-600 dark:hover:text-gray-400"
                  }`}
                >
                  <span className="relative z-10">{tab.label}</span>
                  {isActive && (
                    <div className="absolute inset-x-0 bottom-0 h-0.5 overflow-hidden bg-gray-200 dark:bg-[#2a2d35]">
                      <div
                        key={progressKey}
                        className="h-full origin-left bg-gray-700 dark:bg-gray-300"
                        style={{
                          animation: `${TAB_DURATION_MS}ms linear 0s 1 normal forwards running showcaseTabFill`,
                        }}
                      />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* ── Workspace shell ── */}
          <div
            className="rounded-b-2xl bg-gray-900/5 p-1 dark:bg-white/5"
            style={{
              maskImage:
                "linear-gradient(to bottom, black 55%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, black 55%, transparent 100%)",
            }}
          >
            <div className="rounded-xl border border-gray-200 p-px dark:border-[#2a2d35]">
              <div
                className="pointer-events-none relative w-full select-none overflow-hidden rounded-[11px] bg-white text-[13px] dark:bg-[#191b20]"
                style={{
                  height: 560,
                  fontFamily: "Inter, system-ui, sans-serif",
                }}
              >
                <div className="flex h-full">
                  {/* ── Sidebar ── */}
                  <div className="hidden w-[200px] shrink-0 flex-col border-r border-gray-200/80 lg:flex dark:border-[#2a2d35]">
                    <div className="flex items-center gap-2.5 border-b border-gray-200/60 px-3.5 py-3 dark:border-[#2a2d35]">
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[var(--color-primary)]">
                        <span className="text-[10px] font-black text-white">
                          B
                        </span>
                      </div>
                      <span className="truncate text-[13px] font-semibold text-gray-900 dark:text-gray-100">
                        Summer Dress Boutique
                      </span>
                      <ChevronDown className="ml-auto h-3.5 w-3.5 shrink-0 text-gray-300 dark:text-gray-600" />
                    </div>
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeTab}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex flex-1 flex-col px-2 py-2"
                      >
                        <div className="space-y-0.5">
                          {nav.main.map((item) => (
                            <div
                              key={item.label}
                              className={`flex items-center gap-2.5 rounded-md px-2.5 py-[7px] text-[12px] ${
                                item.indent ? "ml-3" : ""
                              } ${
                                item.active
                                  ? "bg-gray-100 font-medium text-gray-900 dark:bg-[#25272d] dark:text-gray-100"
                                  : "text-gray-500 dark:text-gray-500"
                              }`}
                            >
                              <item.icon className="h-3.5 w-3.5 shrink-0" />
                              <span className="truncate">{item.label}</span>
                            </div>
                          ))}
                        </div>
                        <div className="mt-auto space-y-0.5">
                          {nav.bottom.map((item) => (
                            <div
                              key={item.label}
                              className="flex items-center gap-2.5 rounded-md px-2.5 py-[7px] text-[12px] text-gray-400 dark:text-gray-600"
                            >
                              <item.icon className="h-3.5 w-3.5 shrink-0" />
                              <span className="truncate">{item.label}</span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* ── Main ── */}
                  <div className="flex min-w-0 flex-1 flex-col">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeTab}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="flex flex-1 flex-col overflow-hidden"
                      >
                        {header}
                        <div className="flex-1 overflow-hidden">{content}</div>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Progress bar keyframe */}
      <style jsx global>{`
        @keyframes showcaseTabFill {
          0% {
            transform: scaleX(0);
          }
          100% {
            transform: scaleX(1);
          }
        }
      `}</style>
    </section>
  );
}
