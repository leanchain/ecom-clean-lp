import Image from "next/image";
import Link from "next/link";

import {
  Activity,
  ArrowRight,
  BarChart3,
  Blocks,
  Bot,
  BrainCircuit,
  Check,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  Code2,
  Database,
  Eye,
  Gauge,
  Globe2,
  Layers3,
  LineChart,
  LockKeyhole,
  Megaphone,
  MonitorSmartphone,
  MousePointerClick,
  PackageSearch,
  Palette,
  Plug,
  Radar,
  RefreshCw,
  Route,
  ScanSearch,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Store,
  Target,
  TrendingUp,
  Users,
  WandSparkles,
  Workflow,
  Zap,
} from "lucide-react";

import { BookReviewCta } from "@/components/beseam/book-review-cta";
import { Reveal } from "@/components/beseam/reveal";
import TrackedLink from "@/components/beseam/tracked-link";

const APP_LOGIN_URL = "https://app.beseam.com/login";

const INTEGRATIONS = [
  { name: "Shopify", src: "/logos/integrations/shopify.svg" },
  { name: "WooCommerce", src: "/logos/integrations/woocommerce.svg" },
  { name: "BigCommerce", src: "/logos/integrations/bigcommerce.svg" },
  { name: "Adobe Commerce", src: "/logos/integrations/adobe-commerce.svg" },
  { name: "Salesforce Commerce Cloud", src: "/logos/integrations/sfcc.svg" },
  { name: "Google Merchant Center", src: "/logos/integrations/google-merchant.svg" },
  { name: "Google", src: "/logos/google.svg" },
  { name: "Meta", src: "/images/ai-platforms/meta.svg" },
] as const;

const AGENT_LOOP = [
  {
    step: "01",
    title: "Observe",
    detail:
      "Watch storefront behavior, catalog state, checkout reliability, AI discovery, campaigns, and commerce outcomes from outside the stack.",
    icon: Radar,
  },
  {
    step: "02",
    title: "Understand",
    detail:
      "Connect signals across systems, find the revenue leak, estimate commercial priority, and explain why it matters now.",
    icon: BrainCircuit,
  },
  {
    step: "03",
    title: "Improve",
    detail:
      "Recommend the exact fix, create governed variations, route approval, and execute through the systems you already use.",
    icon: WandSparkles,
  },
  {
    step: "04",
    title: "Learn",
    detail:
      "Recheck the affected signal, measure the result, and use verified outcomes to improve the next decision.",
    icon: RefreshCw,
  },
] as const;

const PRODUCT_SUITE = [
  {
    name: "Foundation",
    eyebrow: "Included with every contract",
    description:
      "The shared revenue command layer: Overview, Actions, Impact, commerce truth, connection health, and catalog synchronization.",
    features: ["Revenue overview", "Unified actions", "Verified impact"],
    icon: Layers3,
    status: "Production",
    href: "#platform",
  },
  {
    name: "AI Visibility",
    eyebrow: "Independent package",
    description:
      "See where your products and brand are absent, inaccurate, or displaced across AI answers, search surfaces, and source citations.",
    features: ["Query monitoring", "Competitor displacement", "Representation accuracy"],
    icon: Eye,
    status: "Production",
    href: "/ai-visibility-monitoring",
  },
  {
    name: "Commerce Readiness",
    eyebrow: "Independent package",
    description:
      "Keep products, pages, feeds, checkout, tracking, brand evidence, and store operations ready to convert and ready for paid traffic.",
    features: ["Products", "Store Health", "Inspection + Brand"],
    icon: ShoppingBag,
    status: "Production",
    href: "/shopify-store-health",
  },
  {
    name: "Advertising",
    eyebrow: "Google + Meta lifecycle",
    description:
      "Connect channels, verify readiness, create drafts, approve exact budgets and targeting, publish safely, and reconcile performance.",
    features: ["Campaign readiness", "Safe publishing", "Performance + attribution"],
    icon: Megaphone,
    status: "Production path",
    href: "#advertising",
  },
  {
    name: "Analytics",
    eyebrow: "Advanced Intelligence",
    description:
      "Revenue, funnel, cohort, journey, attribution, reconciliation, and trend intelligence grounded in your commerce ledger.",
    features: ["Revenue analytics", "Funnels + cohorts", "Attribution"],
    icon: BarChart3,
    status: "Beta",
    href: "#advanced-intelligence",
  },
  {
    name: "Behavior",
    eyebrow: "Advanced Intelligence",
    description:
      "Understand intent, friction, navigation, engagement, and purchase behavior through sessions, replays, heatmaps, and zones.",
    features: ["Session intelligence", "Replays", "Heatmaps"],
    icon: MousePointerClick,
    status: "Beta",
    href: "#advanced-intelligence",
  },
  {
    name: "Optimization",
    eyebrow: "Advanced Intelligence",
    description:
      "Turn behavior and commercial signals into governed experiments, personalization decisions, missions, and content proposals.",
    features: ["Experiments", "Personalization", "Decisioning"],
    icon: Sparkles,
    status: "Beta",
    href: "#advanced-intelligence",
  },
  {
    name: "Reliability",
    eyebrow: "Advanced Intelligence",
    description:
      "Monitor performance, errors, incidents, web vitals, and revenue-sensitive failures before they become expensive blind spots.",
    features: ["Monitors + alerts", "Web vitals", "Incident intelligence"],
    icon: ShieldCheck,
    status: "Beta",
    href: "#advanced-intelligence",
  },
  {
    name: "Creative Studio",
    eyebrow: "Independent creation package",
    description:
      "Create reusable product, brand, organic, and advertising images and video with model choice, approvals, and credit visibility.",
    features: ["Images + video", "Shared asset library", "Credit-metered generation"],
    icon: Palette,
    status: "Beta",
    href: "#creative-studio",
  },
] as const;

const PACKAGE_MODEL = [
  {
    name: "Foundation",
    status: "Mandatory",
    funding: "Contract included",
    detail: "Overview, Actions, Impact, commerce ledger, connection health, and minimum catalog sync.",
  },
  {
    name: "AI Visibility",
    status: "Independent",
    funding: "Contract package",
    detail: "Scheduled visibility intelligence is included within contract limits; discretionary incremental runs can be credit-metered.",
  },
  {
    name: "Commerce Readiness",
    status: "Independent",
    funding: "Contract package",
    detail: "Products, Store Health, Inspection, and Brand ship together. User-triggered generation or deep runs can use credits.",
  },
  {
    name: "Advertising",
    status: "One package",
    funding: "Contract + external spend",
    detail: "Google and Meta connection, readiness, drafting, publishing, performance, and measurement. Media spend remains channel spend.",
  },
  {
    name: "Advanced Intelligence",
    status: "Choose modules",
    funding: "Contract funded",
    detail: "Analytics, Behavior, Optimization, and Reliability are enabled independently and do not consume credits for entitled intelligence.",
  },
  {
    name: "Creative Studio",
    status: "Independent",
    funding: "Contract access + credits",
    detail: "Workspace access is contracted; image and video generation shows an estimate and reserves credits before work starts.",
  },
] as const;

const TRUST_POINTS = [
  {
    title: "Your systems remain the systems of record",
    detail:
      "Beseam layers over your storefront, commerce platform, analytics, search, and ad channels instead of forcing a replatform.",
    icon: Database,
  },
  {
    title: "Revenue claims remain separated",
    detail:
      "Booked, observed, attributed, and modeled values stay distinct, with freshness, confidence, and methodology visible.",
    icon: CircleDollarSign,
  },
  {
    title: "High-impact changes stay governed",
    detail:
      "Budgets, targeting, publishing, and customer-facing changes follow explicit entitlements, roles, approvals, and audit trails.",
    icon: LockKeyhole,
  },
] as const;

function BrowserFrame({
  title,
  children,
  className = "",
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`overflow-hidden rounded-[1.4rem] border border-rule bg-panel shadow-xl ${className}`}>
      <div className="flex h-11 items-center justify-between border-b border-rule bg-[#f7f7f5] px-4 dark:bg-technical-panel">
        <div className="flex items-center gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff6b5d]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#f6bd4f]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#56c271]" />
        </div>
        <p className="text-[11px] font-semibold text-muted-foreground">{title}</p>
        <span className="w-10" aria-hidden="true" />
      </div>
      {children}
    </div>
  );
}

function HeroPlatformVisual() {
  return (
    <BrowserFrame title="Revenue command center · illustrative data">
      <div className="grid bg-[#f8f8f6] dark:bg-[#121214] lg:grid-cols-[10rem_minmax(0,1fr)]">
        <aside className="hidden border-r border-rule bg-panel p-4 lg:block">
          <div className="flex items-center gap-2 border-b border-rule pb-4">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-ink text-[10px] font-bold text-white">B</span>
            <div>
              <p className="text-[10px] font-semibold text-ink">Northstar</p>
              <p className="text-[8px] text-muted-foreground">All stores</p>
            </div>
          </div>
          <div className="mt-4 space-y-1.5">
            {[
              ["Overview", Gauge],
              ["Visibility", Eye],
              ["Products", PackageSearch],
              ["Behavior", MousePointerClick],
              ["Optimization", Sparkles],
              ["Impact", TrendingUp],
            ].map(([label, Icon], index) => {
              const TypedIcon = Icon as typeof Gauge;
              return (
                <div
                  key={label as string}
                  className={`flex items-center gap-2 rounded-lg px-2.5 py-2 text-[9px] font-semibold ${
                    index === 0 ? "bg-primary-50 text-primary-700" : "text-muted-foreground"
                  }`}
                >
                  <TypedIcon className="h-3.5 w-3.5" strokeWidth={1.7} aria-hidden="true" />
                  {label as string}
                </div>
              );
            })}
          </div>
        </aside>

        <div className="p-4 sm:p-5 lg:p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-primary">Live revenue layer</p>
                <span className="rounded-full border border-success-200 bg-success-50 px-2 py-0.5 text-[8px] font-semibold text-success-700">Learning</span>
              </div>
              <h2 className="mt-2 text-[20px] font-semibold tracking-[-0.03em] text-ink sm:text-[25px]">
                CHF 81.4K in prioritized revenue opportunity
              </h2>
              <p className="mt-1 text-[10px] text-muted-foreground">Across storefront, discovery, behavior, and campaigns · refreshed 6 min ago</p>
            </div>
            <span className="w-fit rounded-full border border-rule bg-panel px-3 py-1.5 text-[9px] font-semibold text-ink">Last 30 days</span>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {[
              ["Booked revenue", "CHF 428K", "+8.4%", ShoppingBag],
              ["Leakage detected", "CHF 31.2K", "12 issues", ScanSearch],
              ["Verified lift", "CHF 18.6K", "7 changes", TrendingUp],
            ].map(([label, value, meta, Icon]) => {
              const TypedIcon = Icon as typeof ShoppingBag;
              return (
                <div key={label as string} className="rounded-xl border border-rule bg-panel p-3.5">
                  <div className="flex items-center justify-between">
                    <p className="text-[8px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">{label as string}</p>
                    <TypedIcon className="h-3.5 w-3.5 text-primary" strokeWidth={1.7} aria-hidden="true" />
                  </div>
                  <p className="mt-3 text-[18px] font-semibold text-ink">{value as string}</p>
                  <p className="mt-1 text-[9px] font-medium text-success-700">{meta as string}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-3 grid gap-3 lg:grid-cols-[minmax(0,1.15fr)_minmax(15rem,0.85fr)]">
            <div className="rounded-xl border border-rule bg-panel p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[9px] font-semibold text-ink">Revenue trend and intervention points</p>
                  <p className="mt-1 text-[8px] text-muted-foreground">Beseam connects changes to comparable outcome windows.</p>
                </div>
                <LineChart className="h-4 w-4 text-primary" strokeWidth={1.7} aria-hidden="true" />
              </div>
              <div className="mt-5 flex h-24 items-end gap-1.5 border-b border-l border-rule pl-2">
                {[34, 39, 35, 43, 47, 44, 53, 58, 54, 63, 69, 76, 73, 84].map((height, index) => (
                  <span
                    key={`${height}-${index}`}
                    className={`relative flex-1 rounded-t-sm ${index > 8 ? "bg-primary" : "bg-primary-100"}`}
                    style={{ height: `${height}%` }}
                  >
                    {index === 8 ? <span className="absolute -top-3 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full border-2 border-panel bg-success" /> : null}
                  </span>
                ))}
              </div>
              <div className="mt-2 flex justify-between text-[7px] text-muted-foreground"><span>Before</span><span>Price fix verified</span><span>After</span></div>
            </div>

            <div className="rounded-xl border border-primary/25 bg-primary-50 p-4 dark:bg-primary/10">
              <div className="flex items-center justify-between gap-3">
                <p className="text-[9px] font-semibold uppercase tracking-[0.08em] text-primary-700 dark:text-primary">Agent priority</p>
                <Bot className="h-4 w-4 text-primary" strokeWidth={1.7} aria-hidden="true" />
              </div>
              <h3 className="mt-3 text-[15px] font-semibold leading-snug text-ink">High-intent mobile visitors are dropping after shipping becomes visible.</h3>
              <div className="mt-3 space-y-2 text-[8px] text-muted-foreground">
                <div className="flex justify-between gap-3"><span>Modeled opportunity</span><strong className="text-ink">CHF 22.8K</strong></div>
                <div className="flex justify-between gap-3"><span>Confidence</span><strong className="text-ink">High</strong></div>
                <div className="flex justify-between gap-3"><span>Recommended test</span><strong className="text-ink">2 experiences</strong></div>
              </div>
              <div className="mt-4 rounded-lg bg-ink px-3 py-2.5 text-[8px] font-semibold text-white">Review personalized experience →</div>
            </div>
          </div>
        </div>
      </div>
    </BrowserFrame>
  );
}

function LayerArchitectureVisual() {
  const sources = [
    ["Storefront", MonitorSmartphone],
    ["Commerce", ShoppingBag],
    ["Analytics", BarChart3],
    ["Search + AI", Globe2],
    ["Google + Meta", Megaphone],
  ] as const;
  const capabilities = ["Observe outside-in", "Connect the evidence", "Prioritize by revenue", "Recommend + orchestrate", "Verify + learn"];

  return (
    <div className="rounded-[1.5rem] border border-white/12 bg-white/[0.04] p-5 shadow-2xl sm:p-7">
      <div className="grid gap-5 lg:grid-cols-[minmax(0,0.78fr)_3rem_minmax(0,1fr)_3rem_minmax(0,0.82fr)] lg:items-center">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-white/38">Your existing stack</p>
          <div className="mt-4 space-y-2">
            {sources.map(([label, Icon]) => (
              <div key={label} className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/10 px-3.5 py-3">
                <Icon className="h-4 w-4 text-white/58" strokeWidth={1.7} aria-hidden="true" />
                <span className="text-[12px] font-semibold text-white/82">{label}</span>
                <Plug className="ml-auto h-3.5 w-3.5 text-success-300" strokeWidth={1.7} aria-hidden="true" />
              </div>
            ))}
          </div>
        </div>

        <div className="hidden items-center justify-center lg:flex"><ArrowRight className="h-5 w-5 text-brand" aria-hidden="true" /></div>

        <div className="rounded-2xl border border-brand/35 bg-brand/[0.07] p-5">
          <div className="flex items-center gap-3 border-b border-white/10 pb-4">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand text-brand-foreground">
              <BrainCircuit className="h-5 w-5" strokeWidth={1.7} aria-hidden="true" />
            </span>
            <div>
              <p className="text-[13px] font-semibold text-white">Beseam revenue agent</p>
              <p className="mt-0.5 text-[10px] text-white/44">External intelligence + governed action layer</p>
            </div>
          </div>
          <div className="mt-4 space-y-2.5">
            {capabilities.map((capability, index) => (
              <div key={capability} className="flex items-center gap-3 text-[11px] text-white/72">
                <span className="flex h-5 w-5 items-center justify-center rounded-full border border-brand/35 text-[8px] font-bold text-brand">{index + 1}</span>
                {capability}
              </div>
            ))}
          </div>
        </div>

        <div className="hidden items-center justify-center lg:flex"><ArrowRight className="h-5 w-5 text-brand" aria-hidden="true" /></div>

        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-white/38">Commercial outcomes</p>
          <div className="mt-4 space-y-2">
            {[
              ["Revenue leakage found", ScanSearch],
              ["Experiences adapted", Sparkles],
              ["Campaigns made ready", Target],
              ["Fixes verified", CheckCircle2],
              ["Agent improved", RefreshCw],
            ].map(([label, Icon]) => {
              const TypedIcon = Icon as typeof ScanSearch;
              return (
                <div key={label as string} className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/10 px-3.5 py-3">
                  <TypedIcon className="h-4 w-4 text-brand" strokeWidth={1.7} aria-hidden="true" />
                  <span className="text-[12px] font-semibold text-white/82">{label as string}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function VisibilityVisual() {
  return (
    <BrowserFrame title="AI Visibility · illustrative product view">
      <div className="bg-[#f8f8f6] p-4 dark:bg-[#121214] sm:p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.08em] text-primary">AI discovery share</p>
            <p className="mt-1 text-[22px] font-semibold text-ink">37.8%</p>
          </div>
          <div className="flex gap-2">
            {["ChatGPT", "Gemini", "Perplexity"].map((name) => (
              <span key={name} className="rounded-full border border-rule bg-panel px-2.5 py-1 text-[8px] font-semibold text-muted-foreground">{name}</span>
            ))}
          </div>
        </div>
        <div className="mt-5 grid gap-3 md:grid-cols-[minmax(0,1fr)_minmax(14rem,0.72fr)]">
          <div className="rounded-xl border border-rule bg-panel p-4">
            <div className="flex items-center justify-between"><p className="text-[10px] font-semibold text-ink">Where competitors displace you</p><Eye className="h-4 w-4 text-primary" aria-hidden="true" /></div>
            <div className="mt-4 space-y-3">
              {[
                ["best trail shoes for wet weather", "Competitor cited first", "High"],
                ["lightweight shoes for city travel", "Brand absent", "High"],
                ["durable everyday walking shoe", "Outdated product claim", "Medium"],
              ].map(([query, issue, severity]) => (
                <div key={query} className="grid gap-2 border-t border-rule pt-3 first:border-t-0 first:pt-0 sm:grid-cols-[minmax(0,1fr)_8rem_4rem] sm:items-center">
                  <p className="text-[9px] font-semibold text-ink">{query}</p>
                  <p className="text-[8px] text-muted-foreground">{issue}</p>
                  <span className="w-fit rounded-full bg-primary-50 px-2 py-1 text-[7px] font-semibold text-primary-700">{severity}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-xl border border-primary/25 bg-primary-50 p-4 dark:bg-primary/10">
            <p className="text-[9px] font-semibold uppercase tracking-[0.08em] text-primary-700 dark:text-primary">Recommended intervention</p>
            <h3 className="mt-3 text-[15px] font-semibold leading-snug text-ink">Strengthen waterproofing evidence on 8 priority PDPs.</h3>
            <p className="mt-2 text-[9px] leading-relaxed text-muted-foreground">Beseam traced the visibility gap to missing first-party evidence and weak source alignment.</p>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <div className="rounded-lg border border-rule bg-panel p-2.5"><p className="text-[7px] text-muted-foreground">Affected revenue</p><p className="mt-1 text-[11px] font-semibold text-ink">CHF 64K</p></div>
              <div className="rounded-lg border border-rule bg-panel p-2.5"><p className="text-[7px] text-muted-foreground">Verification</p><p className="mt-1 text-[11px] font-semibold text-ink">Next run</p></div>
            </div>
          </div>
        </div>
      </div>
    </BrowserFrame>
  );
}

function BehaviorOptimizationVisual() {
  return (
    <BrowserFrame title="Behavior + Optimization · illustrative product view">
      <div className="grid bg-[#f8f8f6] dark:bg-[#121214] lg:grid-cols-[minmax(0,1.05fr)_minmax(15rem,0.95fr)]">
        <div className="border-b border-rule p-4 sm:p-6 lg:border-b-0 lg:border-r">
          <div className="flex items-center justify-between"><div><p className="text-[9px] font-semibold uppercase tracking-[0.08em] text-primary">Intent map</p><p className="mt-1 text-[17px] font-semibold text-ink">Product page · mobile</p></div><span className="rounded-full border border-success-200 bg-success-50 px-2.5 py-1 text-[8px] font-semibold text-success-700">12.4K sessions</span></div>
          <div className="relative mt-5 h-56 overflow-hidden rounded-xl border border-rule bg-panel">
            <div className="absolute inset-x-0 top-0 h-10 border-b border-rule bg-[#f4f4f1] px-3 py-2 dark:bg-technical-panel"><div className="h-2 w-20 rounded-full bg-ink/14" /></div>
            <div className="absolute left-4 top-14 h-28 w-[38%] rounded-lg bg-[#ece9e4] dark:bg-white/8" />
            <div className="absolute right-4 top-14 w-[50%] space-y-2"><div className="h-3 w-4/5 rounded-full bg-ink/16"/><div className="h-2 w-full rounded-full bg-ink/8"/><div className="h-2 w-3/4 rounded-full bg-ink/8"/><div className="mt-4 h-9 w-full rounded-lg bg-primary"/></div>
            {[
              [30, 38, 44],
              [66, 31, 34],
              [76, 67, 52],
              [47, 81, 31],
              [84, 84, 24],
            ].map(([left, top, size], index) => (
              <span key={index} className="absolute rounded-full bg-primary/30 ring-1 ring-primary/30" style={{ left: `${left}%`, top: `${top}%`, width: size, height: size }} />
            ))}
            <div className="absolute bottom-3 left-3 rounded-lg border border-rule bg-panel/95 px-3 py-2 text-[8px] shadow-sm"><strong className="text-ink">Friction cluster</strong><span className="ml-2 text-muted-foreground">Shipping reveal → exit</span></div>
          </div>
        </div>
        <div className="p-4 sm:p-6">
          <p className="text-[9px] font-semibold uppercase tracking-[0.08em] text-primary">Governed personalization</p>
          <h3 className="mt-2 text-[18px] font-semibold leading-snug text-ink">Adapt the experience to the visitor’s strongest buying signal.</h3>
          <div className="mt-4 space-y-2.5">
            {[
              ["High urgency", "Show delivery promise above CTA", "+7.2% modeled CVR"],
              ["Comparison shopper", "Lead with proof and returns", "+4.8% modeled CVR"],
              ["Price sensitive", "Prioritize bundle economics", "+5.3% modeled AOV"],
            ].map(([segment, action, impact], index) => (
              <div key={segment} className={`rounded-xl border p-3.5 ${index === 0 ? "border-primary/30 bg-primary-50 dark:bg-primary/10" : "border-rule bg-panel"}`}>
                <div className="flex items-center justify-between gap-3"><p className="text-[9px] font-semibold text-ink">{segment}</p><span className="text-[8px] font-semibold text-success-700">{impact}</span></div>
                <p className="mt-1.5 text-[8px] text-muted-foreground">{action}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center gap-2 rounded-lg bg-ink px-3 py-2.5 text-[8px] font-semibold text-white"><ShieldCheck className="h-3.5 w-3.5 text-brand" aria-hidden="true"/> Review rules and launch experiment</div>
        </div>
      </div>
    </BrowserFrame>
  );
}

function AdvertisingVisual() {
  return (
    <BrowserFrame title="Advertising + Impact · illustrative product view">
      <div className="bg-[#f8f8f6] p-4 dark:bg-[#121214] sm:p-6">
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            ["Google", "Ready", "Retail Performance Max", "/logos/google.svg"],
            ["Meta", "2 blockers", "Sales · website purchases", "/images/ai-platforms/meta.svg"],
          ].map(([channel, status, campaign, logo], index) => (
            <div key={channel} className="rounded-xl border border-rule bg-panel p-4">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3"><Image src={logo} alt="" width={22} height={22} className="h-5 w-5 object-contain"/><div><p className="text-[10px] font-semibold text-ink">{channel}</p><p className="mt-0.5 text-[8px] text-muted-foreground">{campaign}</p></div></div>
                <span className={`rounded-full px-2.5 py-1 text-[8px] font-semibold ${index === 0 ? "border border-success-200 bg-success-50 text-success-700" : "border border-warning-200 bg-warning-50 text-warning-700"}`}>{status}</span>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                {[
                  ["Catalog", index === 0 ? "Pass" : "Pass"],
                  ["Tracking", index === 0 ? "Pass" : "Blocked"],
                  ["Destination", index === 0 ? "Pass" : "Review"],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-lg border border-rule bg-[#fafaf8] p-2.5 dark:bg-technical-panel"><p className="text-[7px] text-muted-foreground">{label}</p><p className="mt-1 text-[9px] font-semibold text-ink">{value}</p></div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-3 rounded-xl border border-rule bg-panel p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><div><p className="text-[9px] font-semibold text-ink">Campaign impact</p><p className="mt-1 text-[8px] text-muted-foreground">Channel-native attribution and Beseam normalized comparison stay separate.</p></div><span className="w-fit rounded-full border border-rule px-2.5 py-1 text-[8px] font-semibold text-muted-foreground">Comparable 14-day windows</span></div>
          <div className="mt-4 grid gap-2 sm:grid-cols-4">
            {[["Spend", "CHF 18.2K"],["Booked revenue", "CHF 72.6K"],["Channel attributed", "CHF 64.1K"],["Normalized ROAS", "3.52×"]].map(([label,value])=><div key={label} className="rounded-lg bg-[#f5f5f2] p-3 dark:bg-technical-panel"><p className="text-[7px] text-muted-foreground">{label}</p><p className="mt-1 text-[12px] font-semibold text-ink">{value}</p></div>)}
          </div>
        </div>
      </div>
    </BrowserFrame>
  );
}

function CreativeVisual() {
  return (
    <BrowserFrame title="Creative Studio · illustrative product view">
      <div className="grid bg-[#f8f8f6] dark:bg-[#121214] md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
        <div className="border-b border-rule p-4 sm:p-5 md:border-b-0 md:border-r">
          <p className="text-[9px] font-semibold uppercase tracking-[0.08em] text-primary">Generation brief</p>
          <div className="mt-4 space-y-3">
            {[
              ["Context", "Trail Pro Hiker · campaign"],
              ["Asset", "4:5 lifestyle image"],
              ["Model", "Approved image model"],
              ["Credits", "18 estimated · 842 available"],
            ].map(([label, value]) => (
              <div key={label} className="rounded-lg border border-rule bg-panel p-3"><p className="text-[7px] uppercase tracking-[0.08em] text-muted-foreground">{label}</p><p className="mt-1 text-[9px] font-semibold text-ink">{value}</p></div>
            ))}
          </div>
          <div className="mt-4 rounded-full bg-primary px-4 py-2.5 text-center text-[9px] font-semibold text-white">Generate with visible estimate</div>
        </div>
        <div className="p-4 sm:p-5">
          <div className="grid grid-cols-2 gap-3">
            {["/images/gallery/gallery-2.jpg", "/images/gallery/gallery-4.jpg", "/images/features/ai-image-gen.jpg", "/images/gallery/gallery-6.jpg"].map((src, index) => (
              <div key={src} className={`relative overflow-hidden rounded-xl border ${index === 0 ? "border-primary ring-2 ring-primary/15" : "border-rule"}`}>
                <Image src={src} alt="Representative generated commerce creative" width={360} height={280} className="aspect-[4/3] h-full w-full object-cover" />
                {index === 0 ? <span className="absolute left-2 top-2 rounded-full bg-panel/95 px-2 py-1 text-[7px] font-semibold text-ink">Selected</span> : null}
              </div>
            ))}
          </div>
          <div className="mt-3 flex items-center justify-between rounded-lg border border-rule bg-panel px-3 py-2.5 text-[8px]"><span className="font-semibold text-ink">Approved asset</span><span className="text-primary">Promote to library →</span></div>
        </div>
      </div>
    </BrowserFrame>
  );
}

function ProductScreenshot({ src, alt }: { src: string; alt: string }) {
  return (
    <BrowserFrame title={`${alt} · Beseam product`}>
      <Image src={src} alt={alt} width={1440} height={900} className="h-auto w-full" />
    </BrowserFrame>
  );
}

export default function ProductionHomepage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-rule bg-surface">
        <div className="marketing-grid absolute inset-0 opacity-60" aria-hidden="true" />
        <div className="marketing-wash absolute -right-40 -top-52 h-[42rem] w-[42rem] rounded-full" aria-hidden="true" />
        <div className="relative mx-auto max-w-[88rem] px-6 pb-16 pt-14 lg:pb-24 lg:pt-20">
          <Reveal className="mx-auto max-w-5xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary-50 px-4 py-2 text-[12px] font-semibold text-primary-700 dark:bg-primary/10 dark:text-primary">
              <Activity className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />
              Autonomous revenue intelligence for commerce
            </div>
            <h1 className="editorial-hero mx-auto mt-7 max-w-[15ch] font-extrabold text-ink">
              The self-improving revenue layer for <em className="font-semibold text-primary">your existing commerce stack.</em>
            </h1>
            <p className="editorial-body mx-auto mt-7 max-w-4xl text-pretty text-foreground">
              Beseam observes your storefront, catalog, customer behavior, discovery, and campaigns from the outside. It finds revenue leakage, recommends the highest-value fix, helps adapt each experience, and learns from what happens next.
            </p>
            <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row sm:items-center">
              <BookReviewCta location="hero" label="Book a platform demo" className="w-full sm:w-auto" />
              <Link href="#products" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-ink/15 bg-panel px-6 text-[15px] font-semibold text-ink transition-colors hover:border-ink/30 hover:bg-white">
                Explore all products
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
            <div className="mx-auto mt-8 flex max-w-3xl flex-wrap justify-center gap-x-6 gap-y-3 text-[13px] font-medium text-muted-foreground">
              {["Find revenue leakage", "Adapt experiences by intent", "Verify commercial impact"].map((item) => (
                <span key={item} className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" strokeWidth={2} aria-hidden="true" />{item}</span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.08} y={20} className="mx-auto mt-14 max-w-[82rem]">
            <HeroPlatformVisual />
            <p className="mt-3 text-center text-[11px] text-muted-foreground">Representative product view using illustrative data.</p>
          </Reveal>
        </div>
      </section>

      <section className="border-b border-rule bg-panel">
        <div className="mx-auto max-w-[88rem] px-6 py-8">
          <p className="text-center text-[11px] font-semibold uppercase tracking-[0.11em] text-muted-foreground">Works across the commerce infrastructure you already run</p>
          <div className="mt-7 grid grid-cols-2 items-center gap-x-8 gap-y-7 sm:grid-cols-4 lg:grid-cols-8">
            {INTEGRATIONS.map((integration) => (
              <div key={integration.name} className="flex min-h-9 items-center justify-center opacity-70 grayscale transition hover:opacity-100 hover:grayscale-0">
                <Image src={integration.src} alt={integration.name} width={130} height={36} className="max-h-7 w-auto max-w-[7rem] object-contain dark:brightness-0 dark:invert" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="platform" className="border-b border-technical-rule bg-technical text-white">
        <div className="section-pad mx-auto max-w-[88rem] px-6">
          <Reveal className="grid gap-8 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:items-end lg:gap-16">
            <div>
              <p className="editorial-eyebrow text-brand">Layer on top. Do not rip and replace.</p>
              <h2 className="editorial-heading mt-5 max-w-[13ch] font-bold text-white">
                One intelligence layer across <em className="font-semibold text-brand">every revenue surface.</em>
              </h2>
            </div>
            <p className="editorial-body max-w-3xl text-white/66 lg:justify-self-end">
              Beseam connects evidence across systems that normally disagree. The agent sees the whole commercial journey, while your commerce platform, analytics stack, CMS, and ad channels remain in place.
            </p>
          </Reveal>
          <Reveal delay={0.08} y={18} className="mt-14"><LayerArchitectureVisual /></Reveal>
        </div>
      </section>

      <section id="agent-loop" className="border-b border-rule bg-surface">
        <div className="section-pad mx-auto max-w-[88rem] px-6">
          <Reveal className="mx-auto max-w-4xl text-center">
            <p className="editorial-eyebrow text-primary">A self-improving commercial agent</p>
            <h2 className="editorial-heading mt-5 font-bold text-ink">It does not stop at the alert. <em className="font-semibold text-primary">It learns from the outcome.</em></h2>
            <p className="editorial-body mx-auto mt-6 max-w-3xl text-foreground">Every cycle makes the next recommendation more useful: observe the business, understand the leak, improve the experience, and learn from verified results.</p>
          </Reveal>
          <div className="mt-14 grid border-y border-rule md:grid-cols-2 xl:grid-cols-4">
            {AGENT_LOOP.map((item, index) => {
              const Icon = item.icon;
              return (
                <Reveal key={item.title} delay={index * 0.05} className="relative border-b border-rule p-6 last:border-b-0 md:border-r md:even:border-r-0 xl:border-b-0 xl:even:border-r xl:last:border-r-0">
                  <div className="flex items-center justify-between"><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50 text-primary dark:bg-primary/10"><Icon className="h-5 w-5" strokeWidth={1.7} aria-hidden="true" /></span><span className="text-[12px] font-semibold text-muted-foreground">{item.step}</span></div>
                  <h3 className="mt-8 text-[24px] font-semibold tracking-[-0.025em] text-ink">{item.title}</h3>
                  <p className="mt-3 text-[14px] leading-relaxed text-muted-foreground">{item.detail}</p>
                  {index < AGENT_LOOP.length - 1 ? <ChevronRight className="absolute -right-3 top-1/2 z-10 hidden h-6 w-6 rounded-full border border-rule bg-panel p-1 text-primary xl:block" aria-hidden="true" /> : null}
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section id="products" className="border-b border-rule bg-panel">
        <div className="section-pad mx-auto max-w-[88rem] px-6">
          <Reveal className="grid gap-8 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:items-end lg:gap-16">
            <div>
              <p className="editorial-eyebrow text-primary">The Beseam product suite</p>
              <h2 className="editorial-heading mt-5 max-w-[13ch] font-bold text-ink">A complete revenue platform, <em className="font-semibold text-primary">not a task tracker.</em></h2>
            </div>
            <p className="editorial-body max-w-3xl text-foreground lg:justify-self-end">Choose the commercial products your business needs. Foundation connects every package through one revenue model, one action layer, and one impact view.</p>
          </Reveal>

          <div className="mt-14 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {PRODUCT_SUITE.map((product, index) => {
              const Icon = product.icon;
              return (
                <Reveal key={product.name} delay={(index % 3) * 0.04}>
                  <Link href={product.href} className="group flex h-full flex-col rounded-2xl border border-rule bg-surface p-6 transition-colors hover:border-primary/35 hover:bg-panel">
                    <div className="flex items-start justify-between gap-4">
                      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50 text-primary dark:bg-primary/10"><Icon className="h-5 w-5" strokeWidth={1.7} aria-hidden="true" /></span>
                      <span className={`rounded-full border px-2.5 py-1 text-[10px] font-semibold ${product.status === "Beta" ? "border-warning-200 bg-warning-50 text-warning-700" : "border-success-200 bg-success-50 text-success-700"}`}>{product.status}</span>
                    </div>
                    <p className="mt-7 text-[11px] font-semibold uppercase tracking-[0.08em] text-primary">{product.eyebrow}</p>
                    <h3 className="mt-2 text-[25px] font-semibold tracking-[-0.025em] text-ink">{product.name}</h3>
                    <p className="mt-3 flex-1 text-[14px] leading-relaxed text-muted-foreground">{product.description}</p>
                    <div className="mt-5 flex flex-wrap gap-2">{product.features.map((feature) => <span key={feature} className="rounded-full border border-rule bg-panel px-2.5 py-1 text-[10px] font-medium text-muted-foreground">{feature}</span>)}</div>
                    <span className="mt-6 inline-flex items-center gap-2 text-[13px] font-semibold text-primary">Explore {product.name}<ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" /></span>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-b border-rule bg-surface">
        <div className="section-pad mx-auto max-w-[88rem] px-6">
          <Reveal className="grid gap-12 lg:grid-cols-[minmax(0,0.78fr)_minmax(38rem,1.22fr)] lg:items-center lg:gap-20">
            <div>
              <p className="editorial-eyebrow text-primary">Commerce Readiness</p>
              <h2 className="editorial-heading mt-5 font-bold text-ink">Find the operational leak <em className="font-semibold text-primary">before traffic finds it.</em></h2>
              <p className="mt-6 text-[17px] leading-relaxed text-foreground">Products, Store Health, Inspection, and Brand work together to keep the catalog, storefront, checkout, tracking, landing pages, feeds, and evidence ready to convert.</p>
              <div className="mt-8 space-y-4">
                {[
                  ["Prioritize by commercial importance", "Revenue-sensitive issues rise above low-value noise."],
                  ["Repair through the existing platform", "Proposals and approved changes flow back to the systems your team already operates."],
                  ["Recheck the exact signal", "Every fix retains evidence, ownership, verification, and impact."],
                ].map(([title, detail]) => <div key={title} className="flex gap-3"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" strokeWidth={1.7} aria-hidden="true"/><div><p className="text-[14px] font-semibold text-ink">{title}</p><p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">{detail}</p></div></div>)}
              </div>
              <Link href="/shopify-store-health" className="mt-8 inline-flex items-center gap-2 text-[14px] font-semibold text-primary">Explore Commerce Readiness <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
            </div>
            <Reveal delay={0.08} y={18}><ProductScreenshot src="/images/product-screenshots/store-health.png" alt="Beseam Store Health workspace" /></Reveal>
          </Reveal>

          <Reveal className="mt-24 grid gap-12 lg:grid-cols-[minmax(38rem,1.22fr)_minmax(0,0.78fr)] lg:items-center lg:gap-20">
            <div className="lg:order-2">
              <p className="editorial-eyebrow text-primary">Product Intelligence</p>
              <h2 className="editorial-heading mt-5 font-bold text-ink">Know which products are costing you <em className="font-semibold text-primary">visibility and conversion.</em></h2>
              <p className="mt-6 text-[17px] leading-relaxed text-foreground">Beseam connects booked revenue, content quality, feed readiness, discoverability, availability, policy state, and storefront truth at product level.</p>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {[["Catalog truth", PackageSearch],["Content proposals", Sparkles],["Channel readiness", Target],["Publish + verify", RefreshCw]].map(([label, Icon]) => { const TypedIcon = Icon as typeof PackageSearch; return <div key={label as string} className="flex items-center gap-3 rounded-xl border border-rule bg-panel p-4"><TypedIcon className="h-4 w-4 text-primary" strokeWidth={1.7} aria-hidden="true"/><span className="text-[13px] font-semibold text-ink">{label as string}</span></div>; })}
              </div>
            </div>
            <div className="lg:order-1"><ProductScreenshot src="/images/product-screenshots/products.png" alt="Beseam Products workspace" /></div>
          </Reveal>
        </div>
      </section>

      <section className="border-b border-rule bg-panel">
        <div className="section-pad mx-auto max-w-[88rem] px-6">
          <Reveal className="grid gap-12 lg:grid-cols-[minmax(0,0.78fr)_minmax(38rem,1.22fr)] lg:items-center lg:gap-20">
            <div>
              <p className="editorial-eyebrow text-primary">AI Visibility</p>
              <h2 className="editorial-heading mt-5 font-bold text-ink">See how AI systems represent your brand—<em className="font-semibold text-primary">and why competitors win.</em></h2>
              <p className="mt-6 text-[17px] leading-relaxed text-foreground">Monitor the queries, products, sources, competitor mentions, claims, and evidence that shape discovery across ChatGPT, Gemini, Perplexity, Google AI surfaces, and other answer engines.</p>
              <Link href="/ai-visibility-monitoring" className="mt-8 inline-flex items-center gap-2 text-[14px] font-semibold text-primary">Explore AI Visibility <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
            </div>
            <VisibilityVisual />
          </Reveal>
        </div>
      </section>

      <section id="advanced-intelligence" className="border-b border-technical-rule bg-technical text-white">
        <div className="section-pad mx-auto max-w-[88rem] px-6">
          <Reveal className="grid gap-8 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:items-end lg:gap-16">
            <div>
              <div className="flex items-center gap-3"><p className="editorial-eyebrow text-brand">Advanced Intelligence</p><span className="rounded-full border border-warning-300/30 bg-warning-300/10 px-2.5 py-1 text-[10px] font-semibold text-warning-300">Beta packages</span></div>
              <h2 className="editorial-heading mt-5 max-w-[13ch] font-bold text-white">Understand behavior. <em className="font-semibold text-brand">Adapt every experience.</em></h2>
            </div>
            <p className="editorial-body max-w-3xl text-white/66 lg:justify-self-end">Analytics, Behavior, Optimization, and Reliability are independent packages. Together they reveal why customers convert, where they struggle, which experience should change, and whether the change worked.</p>
          </Reveal>
          <Reveal delay={0.08} y={18} className="mt-14"><BehaviorOptimizationVisual /></Reveal>
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {[
              ["Analytics", "Revenue, funnels, cohorts, journeys, attribution, and reconciliation.", BarChart3],
              ["Behavior", "Sessions, replays, heatmaps, friction, engagement, and intent signals.", MousePointerClick],
              ["Optimization", "Experiments, personalization, decisioning, and governed content proposals.", Sparkles],
              ["Reliability", "Errors, incidents, performance, web vitals, and revenue-sensitive monitoring.", ShieldCheck],
            ].map(([title, detail, Icon]) => { const TypedIcon = Icon as typeof BarChart3; return <div key={title as string} className="rounded-2xl border border-white/12 bg-white/[0.035] p-5"><TypedIcon className="h-5 w-5 text-brand" strokeWidth={1.7} aria-hidden="true"/><h3 className="mt-6 text-[20px] font-semibold text-white">{title as string}</h3><p className="mt-2 text-[13px] leading-relaxed text-white/54">{detail as string}</p></div>; })}
          </div>
        </div>
      </section>

      <section id="advertising" className="border-b border-rule bg-surface">
        <div className="section-pad mx-auto max-w-[88rem] px-6">
          <Reveal className="grid gap-12 lg:grid-cols-[minmax(0,0.78fr)_minmax(38rem,1.22fr)] lg:items-center lg:gap-20">
            <div>
              <p className="editorial-eyebrow text-primary">Advertising</p>
              <h2 className="editorial-heading mt-5 font-bold text-ink">From readiness to revenue, <em className="font-semibold text-primary">without unsafe automation.</em></h2>
              <p className="mt-6 text-[17px] leading-relaxed text-foreground">Beseam checks Google and Meta account access, billing, measurement, catalog truth, product eligibility, destination quality, creative, campaign configuration, and final preflight before spend can activate.</p>
              <div className="mt-7 rounded-xl border border-warning-200 bg-warning-50 p-4"><div className="flex gap-3"><ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-warning-700" aria-hidden="true"/><p className="text-[13px] leading-relaxed text-muted-foreground"><strong className="font-semibold text-ink">Human approval remains explicit.</strong> Admins review the exact account, products, audience, geography, budget, schedule, conversion event, creative, and destination before publishing.</p></div></div>
            </div>
            <AdvertisingVisual />
          </Reveal>
        </div>
      </section>

      <section id="creative-studio" className="border-b border-rule bg-panel">
        <div className="section-pad mx-auto max-w-[88rem] px-6">
          <Reveal className="grid gap-12 lg:grid-cols-[minmax(38rem,1.22fr)_minmax(0,0.78fr)] lg:items-center lg:gap-20">
            <div className="lg:order-2">
              <div className="flex items-center gap-3"><p className="editorial-eyebrow text-primary">Creative Studio</p><span className="rounded-full border border-warning-200 bg-warning-50 px-2.5 py-1 text-[10px] font-semibold text-warning-700">Beta</span></div>
              <h2 className="editorial-heading mt-5 font-bold text-ink">Create what the next experience <em className="font-semibold text-primary">needs to convert.</em></h2>
              <p className="mt-6 text-[17px] leading-relaxed text-foreground">Generate product, lifestyle, brand, organic, and advertising images and video. Every job shows the selected model, estimated credits, available balance, progress, approval, and downstream reuse.</p>
              <div className="mt-7 flex flex-wrap gap-2">{["Product imagery", "Campaign creative", "Brand assets", "Video", "Shared library"].map((item)=><span key={item} className="rounded-full border border-rule bg-surface px-3 py-1.5 text-[11px] font-semibold text-muted-foreground">{item}</span>)}</div>
            </div>
            <div className="lg:order-1"><CreativeVisual /></div>
          </Reveal>
        </div>
      </section>

      <section className="border-b border-rule bg-surface">
        <div className="section-pad mx-auto max-w-[88rem] px-6">
          <Reveal className="grid gap-12 lg:grid-cols-[minmax(0,0.78fr)_minmax(38rem,1.22fr)] lg:items-center lg:gap-20">
            <div>
              <p className="editorial-eyebrow text-primary">Portfolio control</p>
              <h2 className="editorial-heading mt-5 font-bold text-ink">One revenue layer across <em className="font-semibold text-primary">every store and market.</em></h2>
              <p className="mt-6 text-[17px] leading-relaxed text-foreground">Operate store by store or across a portfolio without losing currency, scope, freshness, connection, entitlement, or ownership context.</p>
              <div className="mt-8 space-y-3">{["Store-specific health and actions", "Portfolio-safe comparisons", "Contract entitlements resolved per store", "No silent cross-store data blending"].map((item)=><div key={item} className="flex items-center gap-3 text-[14px] font-medium text-foreground"><Check className="h-4 w-4 text-primary" aria-hidden="true"/>{item}</div>)}</div>
            </div>
            <ProductScreenshot src="/images/product-screenshots/stores.png" alt="Beseam multi-store portfolio workspace" />
          </Reveal>
        </div>
      </section>

      <section id="packages" className="border-b border-rule bg-panel">
        <div className="section-pad mx-auto max-w-[88rem] px-6">
          <Reveal className="mx-auto max-w-4xl text-center">
            <p className="editorial-eyebrow text-primary">Products and entitlements</p>
            <h2 className="editorial-heading mt-5 font-bold text-ink">Build the platform around <em className="font-semibold text-primary">the capabilities you need.</em></h2>
            <p className="editorial-body mx-auto mt-6 max-w-3xl text-foreground">Foundation is always present. Every other product is contracted deliberately, enforced across the interface, APIs, processing, jobs, and models—not hidden behind a cosmetic menu toggle.</p>
          </Reveal>

          <div className="mt-14 overflow-hidden rounded-2xl border border-rule bg-surface">
            <div className="hidden grid-cols-[1.05fr_0.65fr_0.9fr_1.8fr] border-b border-rule bg-[#f5f5f2] px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.08em] text-muted-foreground lg:grid dark:bg-technical-panel">
              <span>Package</span><span>Entitlement</span><span>Funding</span><span>What it means</span>
            </div>
            {PACKAGE_MODEL.map((item) => (
              <div key={item.name} className="grid gap-3 border-b border-rule px-5 py-5 last:border-b-0 lg:grid-cols-[1.05fr_0.65fr_0.9fr_1.8fr] lg:items-center">
                <p className="text-[15px] font-semibold text-ink">{item.name}</p>
                <p className="text-[12px] font-semibold text-primary">{item.status}</p>
                <p className="text-[12px] font-medium text-foreground">{item.funding}</p>
                <p className="text-[13px] leading-relaxed text-muted-foreground">{item.detail}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-[11px] leading-relaxed text-muted-foreground">Package availability and Beta access are contract-specific. Product generation and discretionary compute show a visible estimate before credits are reserved.</p>
        </div>
      </section>

      <section className="border-b border-rule bg-surface">
        <div className="section-pad mx-auto max-w-[88rem] px-6">
          <Reveal className="grid gap-8 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:items-end lg:gap-16">
            <div>
              <p className="editorial-eyebrow text-primary">Enterprise trust by design</p>
              <h2 className="editorial-heading mt-5 max-w-[13ch] font-bold text-ink">Autonomy where it helps. <em className="font-semibold text-primary">Control where it matters.</em></h2>
            </div>
            <p className="editorial-body max-w-3xl text-foreground lg:justify-self-end">A self-improving system only works when the evidence, money, permissions, approvals, and resulting changes remain inspectable.</p>
          </Reveal>
          <div className="mt-12 grid gap-4 lg:grid-cols-3">
            {TRUST_POINTS.map((item) => { const Icon = item.icon; return <Reveal key={item.title} className="rounded-2xl border border-rule bg-panel p-6"><Icon className="h-5 w-5 text-primary" strokeWidth={1.7} aria-hidden="true"/><h3 className="mt-7 text-[20px] font-semibold text-ink">{item.title}</h3><p className="mt-3 text-[14px] leading-relaxed text-muted-foreground">{item.detail}</p></Reveal>; })}
          </div>
        </div>
      </section>

      <section className="bg-brand text-brand-foreground">
        <div className="section-pad mx-auto max-w-[88rem] px-6">
          <Reveal className="grid gap-10 lg:grid-cols-[minmax(0,1.25fr)_minmax(22rem,0.75fr)] lg:items-end lg:gap-20">
            <div>
              <p className="editorial-eyebrow text-brand-foreground/58">See the complete platform</p>
              <h2 className="editorial-heading mt-5 max-w-[15ch] font-bold text-brand-foreground">Find the revenue your existing stack cannot see—and build the system that keeps improving it.</h2>
              <p className="mt-6 max-w-3xl text-[18px] leading-relaxed text-brand-foreground/80">Walk through the product suite, your required packages, the data Beseam can observe, and the first revenue leaks it can help prioritize.</p>
            </div>
            <div className="lg:justify-self-end">
              <BookReviewCta location="final_cta" label="Book a platform demo" className="w-full bg-technical px-7 text-white hover:bg-technical-panel sm:w-auto" />
              <TrackedLink href={APP_LOGIN_URL} eventName="login_clicked" placement="final_cta" className="mt-4 inline-flex min-h-11 w-full items-center justify-center gap-2 text-[14px] font-semibold text-brand-foreground underline-offset-4 hover:underline sm:justify-start">Already using Beseam? Log in<ArrowRight className="h-4 w-4" aria-hidden="true" /></TrackedLink>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
