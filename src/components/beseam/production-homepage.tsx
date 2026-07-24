import Image from "next/image";
import Link from "next/link";

import {
  Activity,
  ArrowRight,
  BarChart3,
  BrainCircuit,
  Check,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  Database,
  Eye,
  Layers3,
  LockKeyhole,
  Megaphone,
  MousePointerClick,
  PackageSearch,
  Palette,
  Plug,
  Radar,
  RefreshCw,
  ScanSearch,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Target,
  TrendingUp,
  WandSparkles,
} from "lucide-react";

import { BookReviewCta } from "@/components/beseam/book-review-cta";
import { Reveal } from "@/components/beseam/reveal";

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

const PRODUCT_SUITE = [
  {
    name: "Foundation",
    entitlement: "Included with every contract",
    status: "Production",
    description:
      "The shared revenue command layer: Overview, commerce truth, Actions, Impact, catalog synchronization, and connection health.",
    features: ["Revenue overview", "Unified actions", "Verified impact"],
    icon: Layers3,
    href: "#foundation",
    image: "/images/product-live/revenue-overview.webp",
    imageAlt: "Beseam revenue overview for the Dancing Queens commerce workspace",
  },
  {
    name: "AI Visibility",
    entitlement: "Independent package",
    status: "Production",
    description:
      "Track where products and brands are absent, inaccurate, or displaced across AI answers, citations, and discovery surfaces.",
    features: ["Query monitoring", "Competitor displacement", "Representation accuracy"],
    icon: Eye,
    href: "/ai-visibility-monitoring",
    image: "/images/product-live/ai-visibility.webp",
    imageAlt: "Beseam AI Visibility workspace for Dancing Queens",
  },
  {
    name: "Commerce Readiness",
    entitlement: "Independent package",
    status: "Production",
    description:
      "Keep products, pages, feeds, checkout, tracking, brand evidence, and destinations ready to convert and ready for traffic.",
    features: ["Products", "Store Health", "Inspection + Brand"],
    icon: ShoppingBag,
    href: "/shopify-store-health",
    image: "/images/product-live/product-intelligence.webp",
    imageAlt: "Beseam product intelligence workspace using a real Dancing Queens product",
  },
  {
    name: "Advertising",
    entitlement: "Google + Meta lifecycle",
    status: "Production path",
    description:
      "Connect channels, verify readiness, create exact drafts, approve budgets and targeting, publish safely, and reconcile performance.",
    features: ["Campaign readiness", "Safe publishing", "Performance evidence"],
    icon: Megaphone,
    href: "#advertising",
    image: "/images/product-live/campaign-readiness.webp",
    imageAlt: "Beseam campaign readiness workspace for Dancing Queens",
  },
  {
    name: "Analytics",
    entitlement: "Advanced Intelligence",
    status: "Beta",
    description:
      "Revenue, funnel, cohort, journey, attribution, reconciliation, and trend intelligence grounded in booked commerce data.",
    features: ["Revenue analytics", "Funnels + cohorts", "Attribution"],
    icon: BarChart3,
    href: "#advanced-intelligence",
    image: "/images/product-live/revenue-analytics.webp",
    imageAlt: "Beseam revenue analytics workspace for Dancing Queens",
  },
  {
    name: "Optimization",
    entitlement: "Advanced Intelligence",
    status: "Beta",
    description:
      "Turn behavioral and commercial signals into governed experiments, personalization decisions, missions, and proposals.",
    features: ["Experiments", "Personalization", "Decisioning"],
    icon: Sparkles,
    href: "#advanced-intelligence",
    image: "/images/product-live/optimization.webp",
    imageAlt: "Beseam optimization experiment workspace for Dancing Queens",
  },
] as const;

const EXTENDED_PRODUCTS = [
  {
    name: "Behavior",
    entitlement: "Advanced Intelligence · Beta",
    description:
      "Sessions, replay, heatmaps, zones, intent, navigation, and friction intelligence for understanding why customers hesitate or convert.",
    icon: MousePointerClick,
  },
  {
    name: "Reliability",
    entitlement: "Advanced Intelligence · Beta",
    description:
      "Performance, errors, incidents, web vitals, and revenue-sensitive monitoring before operational failures become expensive blind spots.",
    icon: ShieldCheck,
  },
  {
    name: "Creative Studio",
    entitlement: "Independent creation package · Beta",
    description:
      "Product, brand, organic, and advertising images and video with model choice, approvals, reusable assets, and visible credit estimates.",
    icon: Palette,
  },
] as const;

const AGENT_LOOP = [
  {
    step: "01",
    title: "Observe",
    detail:
      "Watch storefront behavior, catalog state, checkout reliability, AI discovery, campaigns, and booked commerce outcomes from outside the stack.",
    icon: Radar,
  },
  {
    step: "02",
    title: "Understand",
    detail:
      "Connect signals that normally live in different systems, identify the leak, estimate its commercial priority, and explain the evidence.",
    icon: BrainCircuit,
  },
  {
    step: "03",
    title: "Improve",
    detail:
      "Recommend the exact fix, prepare governed content or campaign changes, route approval, and act through the systems already in place.",
    icon: WandSparkles,
  },
  {
    step: "04",
    title: "Learn",
    detail:
      "Recheck the affected signal, measure the comparable result, and use verified outcomes to improve the next recommendation.",
    icon: RefreshCw,
  },
] as const;

const PACKAGE_MODEL = [
  {
    name: "Foundation",
    status: "Mandatory",
    funding: "Contract included",
    detail: "Overview, Actions, Impact, commerce ledger, connection health, and minimum catalog synchronization.",
  },
  {
    name: "AI Visibility",
    status: "Independent",
    funding: "Contract package",
    detail: "Scheduled visibility intelligence is included within contract limits. Incremental discretionary runs can be credit-metered.",
  },
  {
    name: "Commerce Readiness",
    status: "Independent",
    funding: "Contract package",
    detail: "Products, Store Health, Inspection, and Brand work as one readiness system. Deep runs or generation may use credits.",
  },
  {
    name: "Advertising",
    status: "One package",
    funding: "Contract + channel spend",
    detail: "Google and Meta connection, readiness, drafting, publishing, performance, and measurement. Media spend remains external.",
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
    detail: "Workspace access is contracted; image and video generation shows an estimate and reserves credits before work begins.",
  },
] as const;

const TRUST_POINTS = [
  {
    title: "Your systems remain the systems of record",
    detail:
      "Beseam layers over the storefront, commerce platform, analytics, search, and ad channels instead of forcing a replatform.",
    icon: Database,
  },
  {
    title: "Every money number keeps its meaning",
    detail:
      "Booked, observed, attributed, and modeled values remain separate, with currency, freshness, confidence, and methodology visible.",
    icon: CircleDollarSign,
  },
  {
    title: "High-impact changes remain governed",
    detail:
      "Budgets, targeting, publishing, and customer-facing changes follow explicit entitlements, roles, approvals, and audit trails.",
    icon: LockKeyhole,
  },
] as const;

function BrowserFrame({ title, children, className = "" }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`product-screen overflow-hidden rounded-[1.25rem] border border-rule bg-panel ${className}`}>
      <div className="flex h-11 items-center justify-between border-b border-rule bg-[#f7f7f5] px-4 dark:bg-technical-panel">
        <div className="flex items-center gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff6b5d]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#f6bd4f]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#56c271]" />
        </div>
        <p className="truncate px-4 text-[11px] font-semibold text-muted-foreground">{title}</p>
        <span className="w-10" aria-hidden="true" />
      </div>
      {children}
    </div>
  );
}

function ProductMedia({
  src,
  alt,
  title,
  animated = false,
  priority = false,
  caption = "Real Beseam product interface · Dancing Queens local demonstration workspace.",
}: {
  src: string;
  alt: string;
  title: string;
  animated?: boolean;
  priority?: boolean;
  caption?: string;
}) {
  return (
    <figure>
      <BrowserFrame title={title}>
        <Image
          src={src}
          alt={alt}
          width={animated ? 1200 : 1600}
          height={animated ? 750 : 1000}
          priority={priority}
          loading="eager"
          unoptimized={animated}
          className="h-auto w-full bg-[#f7f8fb]"
        />
      </BrowserFrame>
      <figcaption className="mt-3 text-center text-[11px] leading-relaxed text-muted-foreground">{caption}</figcaption>
    </figure>
  );
}

function LayerArchitectureVisual() {
  const sources = [
    ["Storefront", ShoppingBag],
    ["Commerce platform", Database],
    ["Customer behavior", MousePointerClick],
    ["Search + AI", Eye],
    ["Google + Meta", Megaphone],
  ] as const;
  const outcomes = [
    ["Revenue leakage found", ScanSearch],
    ["Priorities ranked", Target],
    ["Experiences adapted", Sparkles],
    ["Changes verified", CheckCircle2],
  ] as const;

  return (
    <div className="rounded-[1.5rem] border border-white/12 bg-white/[0.04] p-5 shadow-2xl sm:p-7">
      <div className="grid gap-5 lg:grid-cols-[minmax(0,0.78fr)_3rem_minmax(0,1fr)_3rem_minmax(0,0.78fr)] lg:items-center">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.11em] text-white/40">Existing infrastructure</p>
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
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand text-brand-foreground">
              <BrainCircuit className="h-5 w-5" strokeWidth={1.7} aria-hidden="true" />
            </span>
            <div>
              <p className="text-[14px] font-semibold text-white">Beseam revenue agent</p>
              <p className="mt-0.5 text-[10px] text-white/46">Outside-in intelligence + governed action</p>
            </div>
          </div>
          <div className="mt-4 space-y-3">
            {["Observe continuously", "Connect evidence", "Prioritize by revenue", "Recommend or orchestrate", "Verify and learn"].map((capability, index) => (
              <div key={capability} className="flex items-center gap-3 text-[11px] text-white/72">
                <span className="flex h-5 w-5 items-center justify-center rounded-full border border-brand/35 text-[8px] font-bold text-brand">{index + 1}</span>
                {capability}
              </div>
            ))}
          </div>
        </div>

        <div className="hidden items-center justify-center lg:flex"><ArrowRight className="h-5 w-5 text-brand" aria-hidden="true" /></div>

        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.11em] text-white/40">Commercial outcomes</p>
          <div className="mt-4 space-y-2">
            {outcomes.map(([label, Icon]) => (
              <div key={label} className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/10 px-3.5 py-3">
                <Icon className="h-4 w-4 text-brand" strokeWidth={1.7} aria-hidden="true" />
                <span className="text-[12px] font-semibold text-white/82">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function CatalogStrip() {
  const products = [
    {
      name: "Flow Tanzschuhe in Gold Glitter",
      detail: "Real catalog product · CHF 99 · 14 variants",
      image: "/images/product-live/catalog/flow-gold.webp",
    },
    {
      name: "Glow Twinkle in Rosé Gold Glitter",
      detail: "Real catalog product monitored by AI Visibility",
      image: "/images/product-live/catalog/glow-rose.webp",
    },
    {
      name: "Flow in Silber & Schwarz Glitter",
      detail: "Real catalog product connected to commerce evidence",
      image: "/images/product-live/catalog/flow-silver-black.webp",
    },
  ] as const;

  return (
    <div className="mt-5 grid gap-3 sm:grid-cols-3">
      {products.map((product) => (
        <div key={product.name} className="group flex items-center gap-3 rounded-xl border border-rule bg-panel p-3">
          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-[#f2f2ef]">
            <Image src={product.image} alt={product.name} fill sizes="64px" className="object-cover transition-transform duration-300 group-hover:scale-[1.04]" />
          </div>
          <div className="min-w-0">
            <p className="line-clamp-2 text-[12px] font-semibold leading-snug text-ink">{product.name}</p>
            <p className="mt-1 text-[10px] leading-relaxed text-muted-foreground">{product.detail}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function ProductionHomepage() {
  return (
    <>
      <section id="home-hero" className="relative overflow-hidden border-b border-rule bg-surface">
        <div className="marketing-grid absolute inset-0 opacity-50" aria-hidden="true" />
        <div className="marketing-wash absolute -right-44 -top-60 h-[46rem] w-[46rem] rounded-full" aria-hidden="true" />
        <div className="relative mx-auto max-w-[88rem] px-6 pb-16 pt-14 lg:pb-24 lg:pt-20">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.82fr)_minmax(42rem,1.18fr)] lg:items-center lg:gap-14">
            <Reveal>
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary-50 px-4 py-2 text-[12px] font-semibold text-primary-700 dark:bg-primary/10 dark:text-primary">
                <Activity className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />
                Autonomous revenue intelligence for commerce
              </div>
              <h1 className="mt-7 max-w-[12ch] text-[clamp(3rem,5.5vw,6.25rem)] font-extrabold leading-[0.96] tracking-[-0.055em] text-ink">
                Find the revenue leaks <em className="font-semibold text-primary">your stack cannot see.</em>
              </h1>
              <p className="mt-7 max-w-2xl text-[clamp(1.1rem,1.2vw,1.32rem)] leading-[1.58] text-foreground">
                Beseam is a self-improving agent above your existing commerce infrastructure. It observes the storefront and customer journey from the outside, connects those signals to catalog, campaigns, and booked revenue, then recommends, orchestrates, and verifies the changes most likely to increase conversion.
              </p>
              <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
                <BookReviewCta location="hero" label="Book a platform demo" className="w-full sm:w-auto" />
                <Link href="#products" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-ink/15 bg-panel px-6 text-[15px] font-semibold text-ink transition-colors hover:border-ink/30 hover:bg-white">
                  Explore the product suite
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
              <div className="mt-8 grid gap-3 text-[13px] font-medium text-muted-foreground sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                {["No replatform", "Human-governed action", "Verified commercial impact"].map((item) => (
                  <span key={item} className="flex items-center gap-2"><Check className="h-4 w-4 shrink-0 text-primary" strokeWidth={2} aria-hidden="true" />{item}</span>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.08} y={20}>
              <ProductMedia
                src="/images/product-live/product-workflow.gif"
                alt="Animated walkthrough of a real Beseam product intelligence workspace for Dancing Queens"
                title="Product intelligence · live workflow"
                animated
                priority
              />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-b border-rule bg-panel">
        <div className="mx-auto max-w-[88rem] px-6 py-8">
          <p className="text-center text-[11px] font-semibold uppercase tracking-[0.11em] text-muted-foreground">A revenue layer across the commerce infrastructure already in place</p>
          <div className="mt-7 grid grid-cols-2 items-center gap-x-8 gap-y-7 sm:grid-cols-4 lg:grid-cols-8">
            {INTEGRATIONS.map((integration) => (
              <div key={integration.name} className="flex min-h-9 items-center justify-center opacity-68 grayscale transition duration-200 hover:opacity-100 hover:grayscale-0">
                <Image src={integration.src} alt={integration.name} width={130} height={36} className="max-h-7 w-auto max-w-[7rem] object-contain dark:brightness-0 dark:invert" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="platform" className="border-b border-technical-rule bg-technical text-white">
        <div className="section-pad mx-auto max-w-[88rem] px-6">
          <Reveal className="grid gap-8 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:items-end lg:gap-16">
            <div>
              <p className="editorial-eyebrow text-brand">Layer on top. Do not rip and replace.</p>
              <h2 className="editorial-heading mt-5 max-w-[13ch] font-bold text-white">One agent across <em className="font-semibold text-brand">every revenue surface.</em></h2>
            </div>
            <p className="editorial-body max-w-3xl text-white/66 lg:justify-self-end">
              Commerce platforms know transactions. Analytics tools know events. Search tools know queries. Ad platforms know campaigns. Beseam connects the evidence between them and keeps each source’s truth intact.
            </p>
          </Reveal>
          <Reveal delay={0.08} y={18} className="mt-14"><LayerArchitectureVisual /></Reveal>
        </div>
      </section>

      <section id="products" className="border-b border-rule bg-panel">
        <div className="section-pad mx-auto max-w-[88rem] px-6">
          <Reveal className="grid gap-8 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:items-end lg:gap-16">
            <div>
              <p className="editorial-eyebrow text-primary">The Beseam product suite</p>
              <h2 className="editorial-heading mt-5 max-w-[13ch] font-bold text-ink">A complete revenue platform, <em className="font-semibold text-primary">product by product.</em></h2>
            </div>
            <p className="editorial-body max-w-3xl text-foreground lg:justify-self-end">
              Foundation creates the shared revenue model. Independent product packages add discovery, readiness, advertising, analytics, behavior, optimization, reliability, and creative capabilities without pretending every customer needs the same contract.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {PRODUCT_SUITE.map((product, index) => {
              const Icon = product.icon;
              const beta = product.status === "Beta";
              return (
                <Reveal key={product.name} delay={(index % 3) * 0.04}>
                  <Link href={product.href} className="group flex h-full flex-col overflow-hidden rounded-2xl border border-rule bg-surface transition duration-200 hover:-translate-y-0.5 hover:border-primary/35 hover:shadow-xl">
                    <div className="relative aspect-[16/10] overflow-hidden border-b border-rule bg-[#f7f8fb]">
                      <Image src={product.image} alt={product.imageAlt} fill loading="eager" sizes="(min-width:1280px) 30vw, (min-width:768px) 48vw, 100vw" className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.015]" />
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <div className="flex items-start justify-between gap-4">
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 text-primary dark:bg-primary/10"><Icon className="h-5 w-5" strokeWidth={1.7} aria-hidden="true" /></span>
                        <span className={`rounded-full border px-2.5 py-1 text-[10px] font-semibold ${beta ? "border-warning-200 bg-warning-50 text-warning-700" : "border-success-200 bg-success-50 text-success-700"}`}>{product.status}</span>
                      </div>
                      <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.08em] text-primary">{product.entitlement}</p>
                      <h3 className="mt-2 text-[25px] font-semibold tracking-[-0.025em] text-ink">{product.name}</h3>
                      <p className="mt-3 flex-1 text-[14px] leading-relaxed text-muted-foreground">{product.description}</p>
                      <div className="mt-5 flex flex-wrap gap-2">{product.features.map((feature) => <span key={feature} className="rounded-full border border-rule bg-panel px-2.5 py-1 text-[10px] font-medium text-muted-foreground">{feature}</span>)}</div>
                      <span className="mt-6 inline-flex items-center gap-2 text-[13px] font-semibold text-primary">Explore {product.name}<ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" /></span>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>

          <div className="mt-5 grid gap-5 lg:grid-cols-3">
            {EXTENDED_PRODUCTS.map((product, index) => {
              const Icon = product.icon;
              return (
                <Reveal key={product.name} delay={index * 0.04}>
                  <div id={product.name === "Creative Studio" ? "creative-studio" : undefined} className="h-full scroll-mt-28 rounded-2xl border border-rule bg-surface p-6">
                    <div className="flex items-start justify-between gap-4">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 text-primary dark:bg-primary/10"><Icon className="h-5 w-5" strokeWidth={1.7} aria-hidden="true" /></span>
                      <span className="rounded-full border border-warning-200 bg-warning-50 px-2.5 py-1 text-[10px] font-semibold text-warning-700">Beta</span>
                    </div>
                    <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.08em] text-primary">{product.entitlement}</p>
                    <h3 className="mt-2 text-[23px] font-semibold tracking-[-0.025em] text-ink">{product.name}</h3>
                    <p className="mt-3 text-[14px] leading-relaxed text-muted-foreground">{product.description}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section id="foundation" className="border-b border-rule bg-surface">
        <div className="section-pad mx-auto max-w-[88rem] px-6">
          <Reveal className="grid gap-12 lg:grid-cols-[minmax(0,0.72fr)_minmax(42rem,1.28fr)] lg:items-center lg:gap-20">
            <div>
              <p className="editorial-eyebrow text-primary">Foundation</p>
              <h2 className="editorial-heading mt-5 font-bold text-ink">Revenue first. <em className="font-semibold text-primary">Every other signal second.</em></h2>
              <p className="mt-6 text-[17px] leading-relaxed text-foreground">
                The command center keeps booked revenue, commercial risk, evidence quality, actions requiring attention, verification, and measured impact in one store-scoped operating view.
              </p>
              <div className="mt-8 space-y-4">
                {[
                  ["See the state of the business", "Currency, window, scope, freshness, completeness, connection, and authoritative booked revenue remain visible."],
                  ["Open the next commercial decision", "The highest-value issue is connected to evidence and the product workspace that can resolve it."],
                  ["Keep outcomes accountable", "Actions, verification, and impact remain separate stages rather than becoming a generic task list."],
                ].map(([title, detail]) => (
                  <div key={title} className="flex gap-3"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" strokeWidth={1.7} aria-hidden="true"/><div><p className="text-[14px] font-semibold text-ink">{title}</p><p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">{detail}</p></div></div>
                ))}
              </div>
            </div>
            <ProductMedia src="/images/product-live/revenue-overview.webp" alt="Real Beseam revenue overview showing Dancing Queens booked revenue and commercial decisions" title="Foundation · revenue overview" />
          </Reveal>
        </div>
      </section>

      <section className="border-b border-rule bg-panel">
        <div className="section-pad mx-auto max-w-[88rem] px-6">
          <Reveal className="grid gap-12 lg:grid-cols-[minmax(42rem,1.25fr)_minmax(0,0.75fr)] lg:items-center lg:gap-20">
            <div className="lg:order-2">
              <p className="editorial-eyebrow text-primary">AI Visibility</p>
              <h2 className="editorial-heading mt-5 font-bold text-ink">Know how AI systems represent you—<em className="font-semibold text-primary">and why competitors win.</em></h2>
              <p className="mt-6 text-[17px] leading-relaxed text-foreground">
                Monitor the queries, products, sources, competitor mentions, seller attribution, and claim accuracy shaping discovery across answer engines and AI shopping surfaces.
              </p>
              <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                {["Visibility share", "Answer accuracy", "Seller control", "Performance matrix"].map((item) => <div key={item} className="flex items-center gap-3 rounded-xl border border-rule bg-surface p-4"><Eye className="h-4 w-4 text-primary" strokeWidth={1.7} aria-hidden="true"/><span className="text-[13px] font-semibold text-ink">{item}</span></div>)}
              </div>
              <Link href="/ai-visibility-monitoring" className="mt-8 inline-flex items-center gap-2 text-[14px] font-semibold text-primary">Explore AI Visibility <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
            </div>
            <div className="lg:order-1"><ProductMedia src="/images/product-live/ai-visibility.webp" alt="Real Beseam AI Visibility dashboard for Dancing Queens" title="AI Visibility · overview" /></div>
          </Reveal>
        </div>
      </section>

      <section className="border-b border-rule bg-surface">
        <div className="section-pad mx-auto max-w-[88rem] px-6">
          <Reveal className="grid gap-12 lg:grid-cols-[minmax(0,0.72fr)_minmax(42rem,1.28fr)] lg:items-center lg:gap-20">
            <div>
              <p className="editorial-eyebrow text-primary">Product Intelligence</p>
              <h2 className="editorial-heading mt-5 font-bold text-ink">Improve the actual products <em className="font-semibold text-primary">customers are deciding between.</em></h2>
              <p className="mt-6 text-[17px] leading-relaxed text-foreground">
                Product-level intelligence combines canonical catalog truth, SEO and GEO evidence, variants, translations, discoverability, readiness, proposed changes, and post-change performance.
              </p>
              <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                {[
                  ["Catalog truth", PackageSearch],
                  ["Content readiness", CheckCircle2],
                  ["AI visibility", Eye],
                  ["Changes + performance", TrendingUp],
                ].map(([label, Icon]) => {
                  const TypedIcon = Icon as typeof PackageSearch;
                  return <div key={label as string} className="flex items-center gap-3 rounded-xl border border-rule bg-panel p-4"><TypedIcon className="h-4 w-4 text-primary" strokeWidth={1.7} aria-hidden="true"/><span className="text-[13px] font-semibold text-ink">{label as string}</span></div>;
                })}
              </div>
            </div>
            <div>
              <ProductMedia src="/images/product-live/product-workflow.gif" alt="Real animated Beseam product intelligence workflow using a Dancing Queens product" title="Product intelligence · overview to performance" animated />
              <CatalogStrip />
            </div>
          </Reveal>
        </div>
      </section>

      <section id="advanced-intelligence" className="border-b border-technical-rule bg-technical text-white">
        <div className="section-pad mx-auto max-w-[88rem] px-6">
          <Reveal className="grid gap-8 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:items-end lg:gap-16">
            <div>
              <div className="flex items-center gap-3"><p className="editorial-eyebrow text-brand">Advanced Intelligence</p><span className="rounded-full border border-warning-300/30 bg-warning-300/10 px-2.5 py-1 text-[10px] font-semibold text-warning-300">Beta modules</span></div>
              <h2 className="editorial-heading mt-5 max-w-[13ch] font-bold text-white">Understand behavior. <em className="font-semibold text-brand">Prove the next change.</em></h2>
            </div>
            <p className="editorial-body max-w-3xl text-white/66 lg:justify-self-end">
              Analytics, Behavior, Optimization, and Reliability can be contracted independently. Together they reveal where revenue is leaking, why customers struggle, which intervention should run, and what evidence proves recovery.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-7 lg:grid-cols-2">
            <Reveal>
              <ProductMedia src="/images/product-live/revenue-analytics.webp" alt="Real Beseam analytics dashboard showing Dancing Queens revenue and funnel performance" title="Analytics · performance overview" caption="Real Beseam product interface · locally seeded commerce history linked to the real Dancing Queens catalog." />
              <div className="mt-5"><p className="text-[20px] font-semibold text-white">Analytics</p><p className="mt-2 text-[13px] leading-relaxed text-white/56">Revenue, funnels, cohorts, journeys, attribution, reconciliation, and commercial trend intelligence.</p></div>
            </Reveal>
            <Reveal delay={0.06}>
              <ProductMedia src="/images/product-live/optimization.webp" alt="Real Beseam optimization workspace showing a completed commerce experiment" title="Optimization · experiments" caption="Real Beseam product interface · locally seeded experiment evidence in the Dancing Queens workspace." />
              <div className="mt-5"><p className="text-[20px] font-semibold text-white">Optimization</p><p className="mt-2 text-[13px] leading-relaxed text-white/56">Governed experiments, personalization, decisioning, missions, holdouts, and measured results.</p></div>
            </Reveal>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {[
              ["Behavior", "Sessions, replay, heatmaps, zones, engagement, intent, and friction signals.", MousePointerClick],
              ["Reliability", "Errors, incidents, performance, web vitals, recovery evidence, and revenue-sensitive monitoring.", ShieldCheck],
            ].map(([title, detail, Icon]) => {
              const TypedIcon = Icon as typeof MousePointerClick;
              return <div key={title as string} className="rounded-2xl border border-white/12 bg-white/[0.035] p-6"><TypedIcon className="h-5 w-5 text-brand" strokeWidth={1.7} aria-hidden="true"/><h3 className="mt-6 text-[22px] font-semibold text-white">{title as string}</h3><p className="mt-2 max-w-xl text-[13px] leading-relaxed text-white/54">{detail as string}</p></div>;
            })}
          </div>
        </div>
      </section>

      <section id="advertising" className="border-b border-rule bg-surface">
        <div className="section-pad mx-auto max-w-[88rem] px-6">
          <Reveal className="grid gap-12 lg:grid-cols-[minmax(0,0.72fr)_minmax(42rem,1.28fr)] lg:items-center lg:gap-20">
            <div>
              <p className="editorial-eyebrow text-primary">Advertising</p>
              <h2 className="editorial-heading mt-5 font-bold text-ink">From readiness to revenue, <em className="font-semibold text-primary">without unsafe automation.</em></h2>
              <p className="mt-6 text-[17px] leading-relaxed text-foreground">
                Beseam checks Google and Meta account access, billing, measurement, catalog truth, product eligibility, destinations, creative, configuration, and final preflight before spend can activate.
              </p>
              <div className="mt-7 rounded-xl border border-warning-200 bg-warning-50 p-4">
                <div className="flex gap-3"><ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-warning-700" aria-hidden="true"/><p className="text-[13px] leading-relaxed text-muted-foreground"><strong className="font-semibold text-ink">Human approval stays explicit.</strong> Administrators review the exact account, products, audience, geography, budget, schedule, conversion event, creative, and destination before publishing.</p></div>
              </div>
            </div>
            <ProductMedia src="/images/product-live/campaign-readiness.webp" alt="Real Beseam campaign readiness workspace showing Google and Meta lifecycle states" title="Advertising · campaign readiness" caption="Real Beseam product interface · local Dancing Queens demonstration with a connected Meta draft." />
          </Reveal>
        </div>
      </section>

      <section id="agent-loop" className="border-b border-rule bg-panel">
        <div className="section-pad mx-auto max-w-[88rem] px-6">
          <Reveal className="mx-auto max-w-4xl text-center">
            <p className="editorial-eyebrow text-primary">A self-improving commercial agent</p>
            <h2 className="editorial-heading mt-5 font-bold text-ink">It does not stop at the alert. <em className="font-semibold text-primary">It learns from the outcome.</em></h2>
            <p className="editorial-body mx-auto mt-6 max-w-3xl text-foreground">Every cycle makes the next recommendation more useful while preserving evidence, ownership, approval, verification, and commercial meaning.</p>
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

      <section id="packages" className="border-b border-rule bg-surface">
        <div className="section-pad mx-auto max-w-[88rem] px-6">
          <Reveal className="mx-auto max-w-4xl text-center">
            <p className="editorial-eyebrow text-primary">Products and entitlements</p>
            <h2 className="editorial-heading mt-5 font-bold text-ink">Build the platform around <em className="font-semibold text-primary">the capabilities you need.</em></h2>
            <p className="editorial-body mx-auto mt-6 max-w-3xl text-foreground">Foundation is always present. Every other product is contracted deliberately and enforced across the interface, APIs, processing, jobs, models, and credit policy—not hidden behind a cosmetic menu toggle.</p>
          </Reveal>

          <div className="mt-14 overflow-hidden rounded-2xl border border-rule bg-panel">
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
          <p className="mt-4 text-[11px] leading-relaxed text-muted-foreground">Product availability and Beta access are contract-specific. Generation and discretionary compute show a visible estimate before credits are reserved.</p>
        </div>
      </section>

      <section className="border-b border-rule bg-panel">
        <div className="section-pad mx-auto max-w-[88rem] px-6">
          <Reveal className="grid gap-8 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:items-end lg:gap-16">
            <div>
              <p className="editorial-eyebrow text-primary">Enterprise trust by design</p>
              <h2 className="editorial-heading mt-5 max-w-[13ch] font-bold text-ink">Autonomy where it helps. <em className="font-semibold text-primary">Control where it matters.</em></h2>
            </div>
            <p className="editorial-body max-w-3xl text-foreground lg:justify-self-end">A self-improving system only works when evidence, money, permissions, approvals, and resulting changes remain inspectable.</p>
          </Reveal>
          <div className="mt-12 grid gap-4 lg:grid-cols-3">
            {TRUST_POINTS.map((item, index) => {
              const Icon = item.icon;
              return (
                <Reveal key={item.title} delay={index * 0.05}>
                  <div className="h-full rounded-2xl border border-rule bg-surface p-6">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50 text-primary dark:bg-primary/10"><Icon className="h-5 w-5" strokeWidth={1.7} aria-hidden="true" /></span>
                    <h3 className="mt-7 text-[20px] font-semibold tracking-[-0.02em] text-ink">{item.title}</h3>
                    <p className="mt-3 text-[14px] leading-relaxed text-muted-foreground">{item.detail}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-[88rem] px-6 py-16 md:py-20">
          <Reveal className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
            <div>
              <p className="editorial-eyebrow text-white/72">See the platform on your commerce stack</p>
              <h2 className="mt-5 max-w-[18ch] text-[clamp(2.4rem,4.5vw,5rem)] font-bold leading-[1.02] tracking-[-0.045em] text-white">Put a revenue agent above the systems you already run.</h2>
              <p className="mt-5 max-w-3xl text-[17px] leading-relaxed text-white/78">We will map the product packages, evidence sources, governance boundaries, and first commercial decisions for your store or portfolio.</p>
            </div>
            <BookReviewCta location="homepage_final" label="Book a platform demo" className="w-full border-white bg-white text-ink hover:bg-white/92 lg:w-auto" />
          </Reveal>
        </div>
      </section>
    </>
  );
}
