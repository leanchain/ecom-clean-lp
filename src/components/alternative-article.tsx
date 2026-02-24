"use client";

import Link from "next/link";
import React, { useMemo } from "react";
import {
  ArrowRight,
  CircleAlert,
  CircleCheckBig,
  Home,
  ListChecks,
  MoveRight,
  Sparkles,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

type RelatedAlternative = {
  slug: string;
  name: string;
  description: string;
};

type ComparisonRow = {
  feature: string;
  tool: string;
  lookFor: string;
  beseam?: string;
  highlight?: "tool" | "beseam" | "none";
};

type Faq = { q: string; a: string };

type GetStartedStep =
  | string
  | {
      title: string;
      description: string;
    };

type AlternativeArticleProps = {
  name: string;
  description: string;
  category?: string;
  website?: string;
  docsUrl?: string;
  shopifyAppUrl?: string;
  comparisonUrl?: string;
  pricing?: string;
  pricingDetails?: string;
  freeTrial?: string;
  bestFor?: string[];
  headline?: string;
  subheadline?: string;
  whySectionHeading?: string;
  whySectionSubheading?: string;
  whySwitch?: string[];
  beseamDoesDifferently?: string[];
  quickComparison?: ComparisonRow[];
  strengths?: string[];
  weaknesses?: string[];
  whatToLookFor?: string[];
  getStartedSteps?: GetStartedStep[];
  faqs?: Faq[];
  related?: RelatedAlternative[];
  children?: React.ReactNode;
};

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function renderStyledText(
  text: string,
  options: { styledClassName: string; tag?: string } = { styledClassName: "" },
) {
  const tag = options.tag ?? "styled";
  const pattern = new RegExp(`<${tag}>([\\s\\S]*?)<\\/${tag}>`, "g");

  const nodes: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null = null;

  while ((match = pattern.exec(text)) !== null) {
    const fullMatch = match[0] ?? "";
    const styledValue = match[1] ?? "";
    const matchIndex = match.index ?? 0;

    if (matchIndex > lastIndex) {
      nodes.push(text.slice(lastIndex, matchIndex));
    }

    nodes.push(
      <span key={`${tag}:${matchIndex}`} className={options.styledClassName}>
        {styledValue}
      </span>,
    );

    lastIndex = matchIndex + fullMatch.length;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes.length > 0 ? nodes : text;
}

function getDefaults(category: string | undefined, name: string) {
  const c = (category ?? "Other").trim();

  const sharedFaqs: Faq[] = [
    {
      q: `What’s the best ${name} alternative?`,
      a: "It depends on your goal: qualitative UX insight, quantitative product analytics, experimentation, or monitoring. Use the quick comparison to narrow down categories, then validate with a short trial.",
    },
    {
      q: "How long should I evaluate a tool?",
      a: "Long enough to capture your real traffic patterns and decision workflow. Most teams get a meaningful read in 1–2 weeks, longer if you need cohort/funnel depth.",
    },
    {
      q: "What should I check for privacy and compliance?",
      a: "Masking rules for inputs and PII, consent handling, data retention controls, and whether session replay is allowed on checkout in your jurisdiction/policies.",
    },
    {
      q: "Will this slow down my site?",
      a: "Most tools load asynchronously, but sampling, replay fidelity, and tag manager setup matter. Verify Core Web Vitals impact and confirm you can tune capture settings.",
    },
    {
      q: "Can I use multiple tools together?",
      a: "Yes—many teams pair web analytics (traffic + conversions) with replay/heatmaps for qualitative insight and product analytics for event-level funnels.",
    },
  ];

  const beseamDoesDifferently = [
    "Instead of dashboards, get a prioritized “what to fix” list",
    "Insights in days (weekly), not months of A/B testing",
    "Direct correlation between behavior and conversions",
    "Ship safely: versioned deploys, KPI monitoring, instant rollback",
  ];

  const beseamOnboardingSteps: GetStartedStep[] = [
    {
      title: `Keep ${name} running (optional)`,
      description:
        "If it’s already installed, keep it on while Beseam establishes a baseline so you can compare approaches.",
    },
    {
      title: "Audit + get an upgrade playbook",
      description:
        "Get baseline scores for AI visibility, conversion readiness, and performance—plus prioritized fixes you can approve.",
    },
    {
      title: "Install Beseam tracking",
      description:
        "60-second install via Google Tag Manager to start learning from real traffic—no heavy instrumentation required.",
    },
    {
      title: "Mark UI zones",
      description:
        "Tag CTAs, forms, variant selectors, shipping/returns, and trust elements so behavior can be correlated to outcomes.",
    },
    {
      title: "Set conversion goals + KPI guardrails",
      description:
        "Define success (purchases, add-to-cart, signups) and the KPIs you want protected after every change.",
    },
    {
      title: "Deploy through Beseam + monitor KPIs",
      description:
        "Apply playbook upgrades with versioning and staged rollout, monitor KPI impact, and rollback instantly on regressions.",
    },
  ];

  if (c === "Heatmap & Session Tools") {
    return {
      headline: `The ${name} Alternative Guide`,
      subheadline:
        "A detailed look at what teams use instead—plus a practical framework for choosing the right tool for your conversion workflow.",
      beseamDoesDifferently,
      whySwitch: [
        "Hard to translate insights into fixes",
        "Heatmaps show what happened—not the best next action",
        "Session replay gets noisy at scale (sampling + manual review)",
        "You still need a repeatable process to prioritize changes",
      ],
      quickComparison: [
        {
          feature: "Setup time",
          tool: "Minutes (script install)",
          lookFor: "Fast setup + clear verification",
        },
        {
          feature: "Heatmaps",
          tool: "Yes",
          lookFor: "Yes + actionable insights",
        },
        {
          feature: "Session recordings",
          tool: "Yes (sampling)",
          lookFor: "Yes + better filtering",
        },
        {
          feature: "Recommendations",
          tool: "Mostly manual",
          lookFor: "Prioritized fix list",
        },
        {
          feature: "Feedback",
          tool: "Often included",
          lookFor: "Targeting + analysis",
        },
        {
          feature: "Time to insights",
          tool: "Manual review",
          lookFor: "Automated summaries",
        },
      ],
      strengths: [
        "Fast qualitative insight into friction points",
        "Heatmaps for attention and scroll patterns",
        "Session recordings for debugging journeys",
        "Great for early-stage CRO discovery",
      ],
      weaknesses: [
        "Manual interpretation required to decide what to change",
        "Sampling and retention can limit coverage",
        "Difficult to standardize across many pages/teams",
        "Not designed for rigorous causal measurement",
      ],
      whatToLookFor: [
        "Prioritized fix recommendations (not just dashboards)",
        "Strong segmentation and filtering at scale",
        "Clear privacy masking and consent controls",
        "Workflow support for teams (ownership + follow-up)",
      ],
      getStartedSteps: beseamOnboardingSteps,
      faqs: sharedFaqs,
    };
  }

  if (c === "Session Replay Platforms") {
    return {
      headline: `${name}: Overview, strengths, and alternatives`,
      subheadline:
        "Session replay platforms can be extremely powerful—here’s how teams evaluate them and what to look for when switching.",
      beseamDoesDifferently,
      whySwitch: [
        "Costs can scale quickly with traffic and replay volume",
        "Privacy/compliance requirements demand careful configuration",
        "Setup often needs engineering time for best results",
        "Teams want faster paths from issue → fix → verification",
      ],
      quickComparison: [
        {
          feature: "Replay fidelity",
          tool: "High (varies)",
          lookFor: "High + reliable masking",
        },
        {
          feature: "Debug workflow",
          tool: "Strong",
          lookFor: "Strong + fast sharing/collab",
        },
        {
          feature: "Setup complexity",
          tool: "Medium–High",
          lookFor: "Clear docs + easy rollout",
        },
        {
          feature: "Cost at scale",
          tool: "Can rise with usage",
          lookFor: "Transparent usage controls",
        },
      ],
      strengths: [
        "Powerful debugging and reproduction",
        "Great for finding UX friction quickly",
        "Helpful for support and engineering alignment",
      ],
      weaknesses: [
        "Complex privacy considerations",
        "Can be overkill for small sites",
        "Operationalizing insights still takes process",
      ],
      whatToLookFor: [
        "Strict masking + consent features",
        "Great search/filters to find the right sessions",
        "Reasonable retention and sampling controls",
      ],
      getStartedSteps: beseamOnboardingSteps,
      faqs: sharedFaqs,
    };
  }

  if (c === "Product Analytics") {
    return {
      headline: `${name} alternatives and evaluation guide`,
      subheadline:
        "Product analytics is about event-level truth: funnels, retention, cohorts, and activation—this is how teams choose.",
      beseamDoesDifferently,
      whySwitch: [
        "Instrumentation can take time and maintenance",
        "Teams want simpler answers with less configuration",
        "Costs can scale with event volume",
        "Data governance and ownership requirements evolve",
      ],
      quickComparison: [
        {
          feature: "Funnel analysis",
          tool: "Yes",
          lookFor: "Yes + easy segmentation",
        },
        {
          feature: "Retention",
          tool: "Yes",
          lookFor: "Cohorts + lifecycle views",
        },
        {
          feature: "Experiments",
          tool: "Varies",
          lookFor: "Flags + experiment analysis",
        },
        {
          feature: "Data export",
          tool: "Varies",
          lookFor: "Warehouse-friendly workflows",
        },
      ],
      strengths: [
        "Quantitative funnels and retention insights",
        "Great segmentation and cohorts",
        "Supports experimentation workflows (varies)",
      ],
      weaknesses: [
        "Requires disciplined event taxonomy",
        "Can drift without ongoing governance",
        "Not a replacement for qualitative replay/heatmaps",
      ],
      whatToLookFor: [
        "Clear event model and governance tools",
        "Warehouse exports and long-term ownership",
        "Support for experimentation/flags (if needed)",
      ],
      getStartedSteps: beseamOnboardingSteps,
      faqs: sharedFaqs,
    };
  }

  if (c === "Web Analytics") {
    return {
      headline: `${name} alternatives and evaluation guide`,
      subheadline:
        "Web analytics tools answer traffic + conversion reporting. Here’s how teams choose based on privacy, simplicity, and extensibility.",
      beseamDoesDifferently,
      whySwitch: [
        "Teams want simpler dashboards and faster answers",
        "Privacy and consent requirements are stricter",
        "Attribution expectations differ by business",
        "Data ownership and retention requirements grow",
      ],
      quickComparison: [
        {
          feature: "Setup",
          tool: "Quick",
          lookFor: "Quick + reliable goal tracking",
        },
        {
          feature: "Attribution",
          tool: "Varies",
          lookFor: "Matches your decision needs",
        },
        {
          feature: "Privacy controls",
          tool: "Varies",
          lookFor: "Consent + retention + hosting options",
        },
        {
          feature: "Simplicity",
          tool: "Varies",
          lookFor: "Fast time-to-answer",
        },
      ],
      strengths: [
        "Traffic and conversion visibility",
        "Campaign reporting",
        "Stakeholder-friendly dashboards",
      ],
      weaknesses: [
        "Limited qualitative insight",
        "Attribution can be confusing",
        "Often needs complementary tools",
      ],
      whatToLookFor: [
        "Clear goals/events",
        "Privacy and compliance controls",
        "Exports/integrations",
      ],
      getStartedSteps: beseamOnboardingSteps,
      faqs: sharedFaqs,
    };
  }

  return {
    headline: `${name}: overview and alternatives`,
    subheadline:
      "A practical overview and a framework for choosing alternatives based on your workflows and constraints.",
    beseamDoesDifferently,
    whySwitch: [
      "Teams want clearer next steps from data",
      "Costs and complexity can scale over time",
      "Privacy requirements need tighter controls",
      "Different workflows require different tools",
    ],
    quickComparison: [
      { feature: "Setup", tool: "Varies", lookFor: "Clear onboarding" },
      { feature: "Coverage", tool: "Varies", lookFor: "Matches your needs" },
      { feature: "Governance", tool: "Varies", lookFor: "Controls + exports" },
    ],
    strengths: [
      "Clear value in its category",
      "Common integrations",
      "Actionable reporting (varies)",
    ],
    weaknesses: [
      "May not match every workflow",
      "Costs/complexity can scale",
      "Often needs complementary tools",
    ],
    whatToLookFor: [
      "Fit to workflow",
      "Privacy/compliance",
      "Cost and maintainability",
    ],
    getStartedSteps: beseamOnboardingSteps,
    faqs: sharedFaqs,
  };
}

function PrimaryCtas() {
  return (
    <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
      <Button asChild size="lg" className="rounded-full px-10">
        <a
          href="https://app.beseam.com/analyze"
          target="_blank"
          rel="noopener noreferrer"
        >
          Try Beseam Free
          <MoveRight className="ml-2 h-4 w-4" />
        </a>
      </Button>
      <Button
        asChild
        size="lg"
        variant="outline"
        className="rounded-full px-10"
      >
        <Link href="/demo">See demo</Link>
      </Button>
    </div>
  );
}

function SourceButtons({
  website,
  docsUrl,
  shopifyAppUrl,
}: {
  website?: string;
  docsUrl?: string;
  shopifyAppUrl?: string;
}) {
  const actions = useMemo(() => {
    const out: Array<{ label: string; href: string }> = [];
    if (website) out.push({ label: "Website", href: website });
    if (docsUrl) out.push({ label: "Docs", href: docsUrl });
    if (shopifyAppUrl) out.push({ label: "Shopify app", href: shopifyAppUrl });
    return out;
  }, [website, docsUrl, shopifyAppUrl]);

  if (actions.length === 0) return null;

  return (
    <div className="flex shrink-0 flex-wrap items-center gap-2">
      {actions.map((action) => (
        <Button
          key={`${action.label}:${action.href}`}
          asChild
          size="sm"
          variant="outline"
          className="rounded-full"
        >
          <a href={action.href} target="_blank" rel="noopener noreferrer">
            {action.label}
          </a>
        </Button>
      ))}
    </div>
  );
}

export function AlternativeArticle(props: AlternativeArticleProps) {
  const {
    name,
    description,
    category,
    website,
    docsUrl,
    shopifyAppUrl,
    comparisonUrl,
    pricing,
    pricingDetails,
    freeTrial,
    bestFor,
    headline,
    subheadline,
    whySectionHeading,
    whySectionSubheading,
    whySwitch,
    beseamDoesDifferently,
    quickComparison,
    strengths,
    weaknesses,
    whatToLookFor,
    getStartedSteps,
    faqs,
    related = [],
    children,
  } = props;

  const defaults = useMemo(() => getDefaults(category, name), [category, name]);

  const resolved = {
    headline: headline ?? defaults.headline,
    subheadline: subheadline ?? defaults.subheadline,
    whySectionHeading: whySectionHeading ?? `Why Teams Switch from ${name}`,
    whySectionSubheading:
      whySectionSubheading ??
      "Common reasons teams look for alternatives—based on workflow fit, scale, and how fast insights translate into action.",
    whySwitch: (whySwitch && whySwitch.length > 0
      ? whySwitch
      : defaults.whySwitch) as string[],
    quickComparison: (quickComparison && quickComparison.length > 0
      ? quickComparison
      : defaults.quickComparison) as ComparisonRow[],
    strengths: (strengths && strengths.length > 0
      ? strengths
      : defaults.strengths) as string[],
    weaknesses: (weaknesses && weaknesses.length > 0
      ? weaknesses
      : defaults.weaknesses) as string[],
    beseamDoesDifferently: (beseamDoesDifferently &&
    beseamDoesDifferently.length > 0
      ? beseamDoesDifferently
      : defaults.beseamDoesDifferently) as string[],
    whatToLookFor: (whatToLookFor && whatToLookFor.length > 0
      ? whatToLookFor
      : defaults.whatToLookFor) as string[],
    getStartedSteps: (getStartedSteps && getStartedSteps.length > 0
      ? getStartedSteps
      : defaults.getStartedSteps) as GetStartedStep[],
    faqs: (faqs && faqs.length > 0 ? faqs : defaults.faqs) as Faq[],
  };

  const comparisonRightLabel = resolved.quickComparison.some(
    (row) => row.beseam,
  )
    ? "Beseam"
    : "What to look for";

  const isBeseamComparison = comparisonRightLabel === "Beseam";

  const comparisonDescription =
    comparisonRightLabel === "Beseam"
      ? `A quick snapshot of ${name} vs Beseam.`
      : `A practical snapshot of ${name} vs what teams typically look for.`;

  const comparisonRows = useMemo(() => {
    const rank = (highlight: ComparisonRow["highlight"]) => {
      if (highlight === "tool") return 0;
      if (highlight === "beseam") return 1;
      return 2;
    };

    return resolved.quickComparison
      .map((row, index) => ({ row, index }))
      .sort((a, b) => {
        const diff = rank(a.row.highlight) - rank(b.row.highlight);
        if (diff !== 0) return diff;
        return a.index - b.index;
      })
      .map(({ row }) => row);
  }, [resolved.quickComparison]);

  return (
    <div className="pb-2 pt-2">
      <div className="container">
        <div className="text-sm text-muted-foreground">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">
                  <Home className="h-4 w-4" />
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/alternatives">
                  Alternatives
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Hero */}
        <section className="pt-16 mx-auto mt-10 max-w-4xl text-center">
          <Badge
            variant="secondary"
            className="rounded-full px-4 py-2 text-xs font-semibold"
          >
            {name} Alternative
          </Badge>

          <h1 className="mt-8 font-heading text-4xl font-bold leading-tight md:text-6xl">
            {renderStyledText(resolved.headline, {
              styledClassName: "text-primary",
            })}
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-base text-muted-foreground md:text-lg leading-relaxed">
            {resolved.subheadline}
          </p>

          <PrimaryCtas />

          {comparisonUrl && (
            <div className="mt-6 flex items-center justify-center">
              <Button asChild variant="ghost" className="rounded-full">
                <Link href={comparisonUrl}>
                  Read comparison: Beseam vs {name}
                  <MoveRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          )}

          {/* <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {category && (
              <Badge variant="outline" className="rounded-full">
                {category}
              </Badge>
            )}
            {pricing && (
              <Badge variant="secondary" className="rounded-full">
                {pricing}
              </Badge>
            )}
            {freeTrial && (
              <Badge variant="outline" className="rounded-full">
                {freeTrial}
              </Badge>
            )}
          </div> */}
        </section>

        {/* Why switch */}
        <section className="mx-auto mt-24 max-w-5xl">
          <h2 className="text-center text-2xl font-bold md:text-3xl">
            {renderStyledText(resolved.whySectionHeading, {
              styledClassName:
                "italic underline decoration-primary/30 underline-offset-8",
            })}
          </h2>
          <p className="mx-auto mt-3 max-w-3xl text-center text-sm text-muted-foreground md:text-base">
            {resolved.whySectionSubheading}
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-2">
            {resolved.whySwitch.slice(0, 4).map((item, idx) => (
              <div
                key={`${item}:${idx}`}
                className="rounded-2xl border bg-card/50 p-4 text-sm text-foreground"
              >
                <div className="flex items-start gap-3">
                  <CircleAlert className="h-6 w-6 text-muted-foreground text-orange-400" />
                  <div className="font-medium">{item}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Quick comparison */}
        <section className="mx-auto mt-16 max-w-5xl">
          <h2 className="text-center text-2xl font-bold md:text-3xl">
            Quick Comparison
          </h2>
          <p className="mt-3 text-center text-sm text-muted-foreground md:text-base">
            {comparisonDescription}
          </p>

          <div className="mt-8 overflow-hidden rounded-3xl border bg-card/50">
            {/* Desktop table */}
            <div className="hidden md:block">
              <div className="grid grid-cols-[1.1fr_1fr_1fr] border-b bg-muted/10 text-xs font-semibold text-muted-foreground">
                <div className="px-5 py-4">Feature</div>
                <div className="px-5 py-4 text-center">
                  <div className="text-sm font-bold text-foreground">
                    {name}
                  </div>
                </div>
                <div className="px-5 py-4 text-center">
                  <div
                    className={`text-sm font-bold ${
                      isBeseamComparison ? "text-primary" : "text-foreground"
                    }`}
                  >
                    {comparisonRightLabel}
                  </div>
                </div>
              </div>

              <div className="divide-y">
                {comparisonRows.map((row) => {
                  const rightValue = row.beseam ?? row.lookFor;
                  const highlight = row.highlight ?? "none";
                  const toolIsHighlighted = highlight === "tool";
                  const rightIsHighlighted =
                    isBeseamComparison && highlight === "beseam";

                  return (
                    <div
                      key={row.feature}
                      className="grid grid-cols-[1.1fr_1fr_1fr] transition-colors hover:bg-muted/10"
                    >
                      <div className="px-5 py-4 text-sm font-semibold text-foreground">
                        {row.feature}
                      </div>
                      <div
                        className={`px-5 py-4 text-sm ${
                          toolIsHighlighted
                            ? "bg-secondary/15 text-foreground font-medium"
                            : "text-muted-foreground"
                        }`}
                      >
                        {row.tool}
                      </div>
                      <div
                        className={`px-5 py-4 text-sm ${
                          rightIsHighlighted
                            ? "bg-secondary/15 text-foreground font-medium border-l border-border/70"
                            : isBeseamComparison
                              ? "text-foreground border-l border-border/70"
                              : "text-foreground"
                        }`}
                      >
                        {rightValue}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Mobile cards */}
            <div className="grid gap-3 p-4 md:hidden">
              {comparisonRows.map((row) => {
                const rightValue = row.beseam ?? row.lookFor;
                const highlight = row.highlight ?? "none";
                const toolIsHighlighted = highlight === "tool";
                const rightIsHighlighted =
                  isBeseamComparison && highlight === "beseam";

                return (
                  <div
                    key={row.feature}
                    className="rounded-2xl border bg-muted/5 p-4"
                  >
                    <div className="text-sm font-semibold text-foreground">
                      {row.feature}
                    </div>
                    <div className="mt-3 grid gap-3">
                      <div
                        className={`rounded-2xl border p-4 ${
                          toolIsHighlighted
                            ? "bg-secondary/15"
                            : "bg-background/40"
                        }`}
                      >
                        <div className="text-xs font-semibold text-muted-foreground">
                          {name}
                        </div>
                        <div
                          className={`mt-2 text-sm ${
                            toolIsHighlighted
                              ? "text-foreground/90"
                              : "text-muted-foreground"
                          }`}
                        >
                          {row.tool}
                        </div>
                      </div>
                      <div
                        className={`rounded-2xl border p-4 ${
                          rightIsHighlighted
                            ? "bg-secondary/15"
                            : isBeseamComparison
                              ? "border-border bg-background/40"
                              : "border-border bg-background/40"
                        }`}
                      >
                        <div
                          className={`text-xs font-semibold ${
                            isBeseamComparison
                              ? "text-primary"
                              : "text-muted-foreground"
                          }`}
                        >
                          {comparisonRightLabel}
                        </div>
                        <div className="mt-2 text-sm text-foreground/90">
                          {rightValue}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* About */}
        <section className="mx-auto mt-16 max-w-5xl">
          <h2 className="text-center text-2xl font-bold md:text-3xl">
            About {name}
          </h2>

          <div className="mt-8 rounded-3xl border bg-card/50 p-6 md:p-10">
            <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
              {description}
            </p>
            <Separator className="my-8" />

            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <div className="flex items-center gap-2 text-sm font-bold text-success">
                  <ThumbsUp className="h-4 w-4" />
                  Strengths
                </div>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  {resolved.strengths.slice(0, 10).map((strength) => (
                    <li key={strength} className="flex gap-3">
                      <span className="mt-0.5 shrink-0 font-semibold text-success">
                        +
                      </span>
                      <span>{strength}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <div className="flex items-center gap-2 text-sm font-bold text-warning ">
                  <ThumbsDown className="h-4 w-4" />
                  Weaknesses
                </div>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  {resolved.weaknesses.slice(0, 10).map((weakness) => (
                    <li key={weakness} className="flex gap-3">
                      <span className="mt-0.5 shrink-0 font-semibold text-warning">
                        -
                      </span>
                      <span>{weakness}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {(bestFor?.length || pricingDetails || pricing || freeTrial) && (
              <>
                <Separator className="my-8" />
                <div className="grid gap-8 md:grid-cols-2">
                  <div>
                    <div className="text-sm font-bold text-foreground">
                      Best for
                    </div>
                    {bestFor?.length ? (
                      <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                        {bestFor.slice(0, 8).map((item) => (
                          <li key={item} className="flex gap-3">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground/60" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="mt-4 text-sm text-muted-foreground">
                        See the TL;DR and use-case sections below to decide if
                        this tool matches your workflow.
                      </div>
                    )}
                  </div>

                  {(pricingDetails || pricing || freeTrial) && (
                    <div>
                      <div className="text-sm font-bold text-foreground">
                        Pricing
                      </div>
                      <div className="mt-4 space-y-2 text-sm text-muted-foreground">
                        {pricingDetails ? (
                          <div>{pricingDetails}</div>
                        ) : (
                          pricing && <div>{pricing}</div>
                        )}
                        {freeTrial && <div>{freeTrial}</div>}
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}

            {children && (
              <>
                <Separator className="my-10" />
                <div className="prose-brand max-w-none">{children}</div>
              </>
            )}
          </div>
        </section>

        {/* What Beseam does differently */}
        <section className="mx-auto mt-16 max-w-5xl">
          <h2 className="text-center text-2xl font-bold md:text-3xl">
            What Beseam Does Differently
          </h2>
          <p className="mt-3 text-center text-sm text-muted-foreground md:text-base">
            Instead of showing you data to analyze, we tell you what to fix.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-2">
            {resolved.beseamDoesDifferently.slice(0, 4).map((item, idx) => (
              <div
                key={`${item}:${idx}`}
                className="rounded-2xl border bg-card/50 p-4 text-sm text-foreground"
              >
                <div className="flex items-start gap-3">
                  <CircleCheckBig className="h-6 w-6 text-primary" />
                  <div className="text-sm text-muted-foreground">{item}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Get started */}
        <section className="mx-auto mt-16 max-w-5xl">
          <h2 className="text-center text-2xl font-bold md:text-3xl">
            How to Get Started with Beseam
          </h2>
          <p className="mt-3 text-center text-sm text-muted-foreground md:text-base">
            Switching from {name} is easy:
          </p>

          <ol className="mx-auto mt-10 max-w-3xl space-y-8">
            {(() => {
              const steps = resolved.getStartedSteps.slice(0, 6);

              return steps.map((step, idx) => {
                const isLast = idx === steps.length - 1;

                return (
                  <li
                    key={`${typeof step === "string" ? step : step.title}:${idx}`}
                    className="relative pl-12"
                  >
                    {!isLast && (
                      <span
                        aria-hidden
                        className="absolute left-[18px] top-10 h-[calc(100%+0.5rem)] w-px bg-border"
                      />
                    )}

                    <div className="absolute left-0 top-0 flex h-9 w-9 items-center justify-center rounded-full border bg-muted/10 text-sm font-bold text-muted-foreground">
                      {idx + 1}
                    </div>

                    {typeof step === "string" ? (
                      <div className="pt-1 text-sm leading-relaxed text-muted-foreground">
                        {step}
                      </div>
                    ) : (
                      <div className="pt-0.5">
                        <div className="text-sm font-semibold text-foreground">
                          {step.title}
                        </div>
                        <div className="mt-1 text-sm leading-relaxed text-muted-foreground">
                          {step.description}
                        </div>
                      </div>
                    )}
                  </li>
                );
              });
            })()}
          </ol>
        </section>

        {/* FAQ */}
        <section className="mx-auto mt-16 max-w-5xl">
          <h2 className="text-center text-2xl font-bold md:text-3xl">
            {name} Alternative FAQ
          </h2>

          <div className="mt-8 rounded-3xl border bg-card/50 p-2 md:p-4">
            <Accordion type="single" collapsible>
              {resolved.faqs.slice(0, 6).map((faqItem, idx) => (
                <AccordionItem
                  key={`${faqItem.q}:${idx}`}
                  value={`${slugify(faqItem.q)}-${idx}`}
                  className="border-b last:border-b-0"
                >
                  <AccordionTrigger className="px-4">
                    {faqItem.q}
                  </AccordionTrigger>
                  <AccordionContent className="px-4 text-muted-foreground">
                    {faqItem.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Related */}
        {related.length > 0 && (
          <section className="mx-auto mt-16 max-w-5xl">
            <h2 className="text-center text-2xl font-bold md:text-3xl">
              Related Pages
            </h2>
            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/alternatives/${r.slug}`}
                  className="group relative overflow-hidden rounded-2xl border bg-card/50 p-4 transition-colors hover:bg-accent"
                >
                  <ArrowRight className="absolute right-4 top-4 h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                  <div className="pr-8">
                    <div className="text-sm font-bold">{r.name}</div>
                    <div className="mt-2 line-clamp-2 text-xs text-muted-foreground">
                      {r.description}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Bottom CTA */}
        <section className="mx-auto mt-16 max-w-5xl">
          <div className="rounded-3xl border bg-muted/10 p-8 md:p-12 text-center">
            <h3 className="text-2xl font-bold md:text-3xl">
              Ready to choose the right tool?
            </h3>
            <p className="mt-3 text-sm text-muted-foreground md:text-base">
              Browse alternatives by category, then use comparisons when you’re
              ready to go feature-by-feature.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild size="lg" className="rounded-full px-10">
                <Link href="/alternatives">Browse alternatives</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full px-10"
              >
                <Link href="/compare">View comparisons</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
