import Link from "next/link";
import React from "react";
import {
  Activity,
  Compass,
  CreditCard,
  MousePointerClick,
  Play,
  Search,
  TrendingUp,
  Scale,
  RotateCcw,
  Globe,
  BarChart3,
  ArrowRight,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getAllAlternatives } from "@/lib/alternatives";
import {
  ComparisonMatrix,
  ComparisonTool,
  FeatureDefinition,
} from "@/components/compare/comparison-matrix";

const BESEAM_FEATURES = {
  pdp_audits: {
    id: "pdp_audits",
    label: "Automated PDP Audits",
    description:
      "Scoring product pages for conversion readiness, AI visibility, and performance.",
  },
  ai_action_plans: {
    id: "ai_action_plans",
    label: "AI Action Plans",
    description:
      "AI that generates prioritized 'what to fix' playbooks based on storefront data.",
  },
  conversion_guardrails: {
    id: "conversion_guardrails",
    label: "Conversion Guardrails",
    description:
      "Monitoring revenue KPIs after changes and providing one-click rollback.",
  },
  instant_rollback: {
    id: "instant_rollback",
    label: "Instant Rollback",
    description:
      "One-click reversal of storefront changes if revenue or conversion regresses.",
  },
  versioned_shipping: {
    id: "versioned_shipping",
    label: "Versioned Shipping",
    description:
      "Deploying changes as versions with staged rollout capabilities.",
  },
};

const CATEGORY_FEATURES_MAP: Record<string, FeatureDefinition[]> = {
  "Heatmap & Session Tools": [
    {
      id: "heatmaps",
      label: "Heatmap Visualization",
      description: "Click, scroll, and move heatmaps.",
    },
    {
      id: "session_replay",
      label: "Session Recording",
      description: "High-fidelity replay of user sessions.",
    },
    BESEAM_FEATURES.pdp_audits,
    BESEAM_FEATURES.ai_action_plans,
    BESEAM_FEATURES.conversion_guardrails,
  ],
  "Session Replay Platforms": [
    {
      id: "session_replay",
      label: "Session Recording",
      description: "High-fidelity replay of user sessions.",
    },
    {
      id: "error_stack",
      label: "Devtools & Error Stack",
      description: "Access to console logs and network requests for debugging.",
    },
    BESEAM_FEATURES.pdp_audits,
    BESEAM_FEATURES.ai_action_plans,
    BESEAM_FEATURES.conversion_guardrails,
  ],
  "Measurement & Attribution": [
    {
      id: "attribution",
      label: "Marketing Attribution",
      description: "Multi-touch attribution for ad spend.",
    },
    {
      id: "mmm_modeling",
      label: "Media Mix Modeling",
      description: "Top-down statistical modeling of marketing impact.",
    },
    {
      id: "incrementality",
      label: "Incrementality Testing",
      description: "Controlled experiments to measure lift.",
    },
    BESEAM_FEATURES.pdp_audits,
    BESEAM_FEATURES.conversion_guardrails,
  ],
  "Product Analytics": [
    {
      id: "event_tracking",
      label: "Event-Based Tracking",
      description: "Granular tracking of user actions.",
    },
    {
      id: "funnel_analysis",
      label: "Funnel Analysis",
      description: "Visualizing drop-offs in the user journey.",
    },
    BESEAM_FEATURES.pdp_audits,
    BESEAM_FEATURES.ai_action_plans,
    BESEAM_FEATURES.conversion_guardrails,
  ],
  "Web Analytics": [
    {
      id: "traffic_analysis",
      label: "Traffic Source Analysis",
      description: "Identifying where users come from.",
    },
    {
      id: "privacy_compliance",
      label: "Privacy Compliance",
      description: "GDPR/CCPA friendly tracking.",
    },
    BESEAM_FEATURES.pdp_audits,
    BESEAM_FEATURES.ai_action_plans,
    BESEAM_FEATURES.conversion_guardrails,
  ],
  "Change Intelligence": [
    {
      id: "visual_diff",
      label: "Visual Change Detection",
      description: "Tracking visual changes on the storefront.",
    },
    {
      id: "impact_attribution",
      label: "Impact Attribution",
      description: "Tying site changes to conversion shifts.",
    },
    BESEAM_FEATURES.pdp_audits,
    BESEAM_FEATURES.ai_action_plans,
    BESEAM_FEATURES.conversion_guardrails,
  ],
  "Monitoring & QA": [
    {
      id: "uptime",
      label: "Uptime Monitoring",
      description: "Alerts when the site is down.",
    },
    {
      id: "error_monitoring",
      label: "Error Monitoring",
      description: "Tracking JS and server errors.",
    },
    BESEAM_FEATURES.conversion_guardrails,
    BESEAM_FEATURES.instant_rollback,
  ],
  "Checkout Monitoring": [
    {
      id: "checkout_flow",
      label: "Checkout Monitoring",
      description: "End-to-end checkout flow verification.",
    },
    {
      id: "payment_alerts",
      label: "Payment Alerts",
      description: "Detection of payment processor issues.",
    },
    BESEAM_FEATURES.conversion_guardrails,
    BESEAM_FEATURES.instant_rollback,
  ],
  "Backups & Recovery": [
    {
      id: "data_backup",
      label: "Data Backups",
      description: "Automated backups of store data.",
    },
    {
      id: "site_recovery",
      label: "Site Recovery",
      description: "Fast restoration after data loss.",
    },
    BESEAM_FEATURES.versioned_shipping,
    BESEAM_FEATURES.instant_rollback,
  ],
  "Ops & Reliability": [
    {
      id: "incident_response",
      label: "Incident Response",
      description: "Workflows for resolving site issues.",
    },
    {
      id: "runbooks",
      label: "Automated Runbooks",
      description: "Step-by-step guides for common fixes.",
    },
    BESEAM_FEATURES.conversion_guardrails,
    BESEAM_FEATURES.instant_rollback,
  ],
};

const CATEGORY_META: Record<
  string,
  {
    icon: React.ElementType;
    subtitle: string;
  }
> = {
  "Heatmap & Session Tools": {
    icon: MousePointerClick,
    subtitle:
      "Behavior analytics tools (heatmaps + session insight) compared to Beseam.",
  },
  "Session Replay Platforms": {
    icon: Play,
    subtitle:
      "Session replay platforms compared to storefront change guardrails.",
  },
  "Product Analytics": {
    icon: BarChart3,
    subtitle:
      "In-app analytics platforms compared to Beseam's conversion ops focus.",
  },
  "Web Analytics": {
    icon: Globe,
    subtitle:
      "Traditional web analytics vs. specialized PDP conversion operations.",
  },
  "Measurement & Attribution": {
    icon: TrendingUp,
    subtitle:
      "Incrementality, MMM, attribution, and measurement tool comparisons.",
  },
  "Change Intelligence": {
    icon: Search,
    subtitle:
      "Tools that track what changed and how it impacted conversion outcomes.",
  },
  "Monitoring & QA": {
    icon: Activity,
    subtitle:
      "Quality assurance, detection, and reliability comparisons for teams shipping fast.",
  },
  "Checkout Monitoring": {
    icon: CreditCard,
    subtitle: "Checkout-focused monitoring and incident response tooling.",
  },
  "Backups & Recovery": {
    icon: RotateCcw,
    subtitle:
      "Data backup and recovery tools vs. operational change guardrails.",
  },
  "Ops & Reliability": {
    icon: Compass,
    subtitle:
      "Operational workflows for merchants and agencies: runbooks, incident response, and recovery.",
  },
};

const CATEGORY_ORDER = [
  "Heatmap & Session Tools",
  "Session Replay Platforms",
  "Product Analytics",
  "Web Analytics",
  "Measurement & Attribution",
  "Change Intelligence",
  "Monitoring & QA",
  "Checkout Monitoring",
  "Backups & Recovery",
  "Ops & Reliability",
];

export default function ComparePage() {
  const alternatives = getAllAlternatives();

  // Prepare tools data
  const beseamBase: ComparisonTool = {
    name: "Beseam",
    slug: "beseam",
    category: "All",
    isBeseam: true,
    features: {
      heatmaps: false,
      session_replay: false,
      error_stack: false,
      attribution: false,
      mmm_modeling: false,
      incrementality: false,
      event_tracking: true,
      funnel_analysis: true,
      traffic_analysis: true,
      privacy_compliance: true,
      visual_diff: true,
      impact_attribution: true,
      uptime: true,
      error_monitoring: true,
      checkout_flow: true,
      payment_alerts: true,
      data_backup: true,
      site_recovery: true,
      incident_response: true,
      runbooks: true,
      pdp_audits: true,
      ai_action_plans: true,
      conversion_guardrails: true,
      instant_rollback: true,
      versioned_shipping: true,
    },
  };

  const allTools: ComparisonTool[] = alternatives.map((doc) => {
    const q = doc.frontmatter.quickComparison || [];
    const cat = doc.frontmatter.category || "Other";

    const hasFeature = (keyword: string) => {
      return q.some(
        (i) =>
          i.feature.toLowerCase().includes(keyword) && i.highlight === "tool",
      );
    };

    return {
      name: doc.frontmatter.name,
      slug: doc.slug,
      category: cat,
      features: {
        heatmaps: cat.includes("Heatmap") || hasFeature("heatmap"),
        session_replay:
          cat.includes("Session") ||
          cat.includes("Replay") ||
          hasFeature("replay") ||
          hasFeature("recording"),
        error_stack:
          cat.includes("Replay") ||
          hasFeature("stack") ||
          hasFeature("devtools"),
        attribution: cat.includes("Attribution") || hasFeature("attribution"),
        mmm_modeling:
          cat.includes("Measurement") ||
          hasFeature("mmm") ||
          hasFeature("modeling"),
        incrementality:
          cat.includes("Measurement") ||
          hasFeature("incrementality"),
        event_tracking:
          cat.includes("Product Analytics") || hasFeature("event"),
        funnel_analysis:
          cat.includes("Product Analytics") || hasFeature("funnel"),
        traffic_analysis:
          cat.includes("Web Analytics") || hasFeature("traffic"),
        privacy_compliance:
          cat.includes("Web Analytics") || hasFeature("privacy"),
        visual_diff:
          cat.includes("Change Intelligence") ||
          hasFeature("diff") ||
          hasFeature("visual"),
        impact_attribution:
          cat.includes("Change Intelligence") || hasFeature("impact"),
        uptime:
          cat.includes("Monitoring") ||
          hasFeature("uptime") ||
          hasFeature("ping"),
        error_monitoring:
          cat.includes("Monitoring") ||
          hasFeature("error") ||
          hasFeature("sentry"),
        checkout_flow: cat.includes("Checkout") || hasFeature("checkout"),
        payment_alerts: cat.includes("Checkout") || hasFeature("payment"),
        data_backup: cat.includes("Backups") || hasFeature("backup"),
        site_recovery: cat.includes("Backups") || hasFeature("recovery"),
        incident_response: cat.includes("Ops") || hasFeature("incident"),
        runbooks: cat.includes("Ops") || hasFeature("runbook"),
        pdp_audits: hasFeature("audit") || hasFeature("score"),
        ai_action_plans: hasFeature("recommendation") || hasFeature("playbook"),
        conversion_guardrails: hasFeature("rollback") || hasFeature("shipping"),
        instant_rollback: hasFeature("rollback"),
        versioned_shipping: hasFeature("shipping"),
      },
    };
  });

  // Group by category
  const grouped = new Map<string, ComparisonTool[]>();
  for (const tool of allTools) {
    grouped.set(tool.category, [...(grouped.get(tool.category) ?? []), tool]);
  }

  const orderedCategories = CATEGORY_ORDER.filter(
    (category) => (grouped.get(category) ?? []).length > 0,
  );

  return (
    <div className="pb-24">
      {/* Hero */}
      <section className="relative overflow-hidden pt-24 pb-16 md:pt-32 md:pb-20">
        {/* Background glow */}
        <div className="absolute -left-40 top-1/4 -z-10 h-[500px] w-[500px] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute -right-40 bottom-0 -z-10 h-[400px] w-[400px] rounded-full bg-secondary/5 blur-[100px]" />

        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <div className="flex items-center justify-center">
              <Badge
                variant="outline"
                className="mb-6 rounded-full border-primary/20 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary"
              >
                <Scale className="mr-2 h-4 w-4" />
                Comparisons
              </Badge>
            </div>

            <h1 className="font-heading mb-6 text-4xl tracking-tight sm:text-5xl md:text-6xl">
              How Beseam stacks up{" "}
              <span className="text-primary italic">against the field</span>
            </h1>

            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
              Most tools tell you what happened. Beseam tells you what to fix,
              ships the improvement, and guardrails your revenue — all in one
              loop.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="rounded-full px-10 h-14 text-base font-bold shadow-xl shadow-primary/20"
              >
                <a
                  href="https://app.beseam.com/analyze"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Run Free PDP Audit
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full px-10 h-14 text-base font-bold border-2"
              >
                <Link href="/demo">Book a demo</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison matrices */}
      <section className="container mt-8 md:mt-12">
        <div className="mx-auto max-w-6xl space-y-20 md:space-y-28">
          {orderedCategories.map((category) => {
            const categoryTools = grouped.get(category) ?? [];
            const meta = CATEGORY_META[category] || {
              icon: Compass,
              subtitle: "",
            };
            const Icon = meta.icon;
            const features = CATEGORY_FEATURES_MAP[category] || [];

            return (
              <div
                key={category}
                className="scroll-mt-28"
                id={category.toLowerCase().replace(/\s+/g, "-")}
              >
                {/* Category header */}
                <div className="mb-10">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border bg-primary/5 text-primary">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h2 className="font-heading text-2xl tracking-tight md:text-3xl">
                        {category}
                      </h2>
                      <p className="mt-1 text-muted-foreground text-sm md:text-base">
                        {meta.subtitle}
                      </p>
                    </div>
                  </div>
                </div>

                <ComparisonMatrix
                  tools={[beseamBase, ...categoryTools]}
                  features={features}
                />

                {categoryTools.length > 0 && (
                  <div className="mt-6 flex flex-wrap items-center gap-2">
                    <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/60 mr-1">
                      Deep dives:
                    </span>
                    {categoryTools.map((tool) => (
                      <Link
                        key={tool.slug}
                        href={`/alternatives/${tool.slug}`}
                        className="inline-flex items-center gap-1.5 rounded-full border bg-muted/10 px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary/30 hover:text-primary"
                      >
                        Beseam vs {tool.name}{" "}
                        <ArrowRight className="h-3 w-3" />
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="container mt-24 md:mt-32">
        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[2.5rem] border bg-muted/10 p-10 md:p-16 text-center">
          {/* Background decoration */}
          <div className="absolute -left-24 top-1/2 z-0 h-64 w-64 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -right-24 top-1/2 z-0 h-64 w-64 -translate-y-1/2 rounded-full bg-secondary/10 blur-3xl" />

          <div className="relative z-10">
            <h3 className="font-heading text-3xl tracking-tight md:text-4xl lg:text-5xl">
              Get found. Convert more.{" "}
              <span className="text-primary italic">
                Deploy without the risk.
              </span>
            </h3>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
              Start with a free AI visibility + conversion audit. See your
              prioritized upgrade playbook. Ship with built-in KPI guardrails.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="rounded-full px-12 h-14 text-base font-bold shadow-xl shadow-primary/20"
              >
                <a
                  href="https://app.beseam.com/analyze"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Start for free
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-full px-12 h-14 text-base font-bold border-2"
              >
                <Link href="/demo">Book a platform walkthrough</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
