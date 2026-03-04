import Link from "next/link";
import React from "react";
import {
  Activity,
  ArrowRight,
  BarChart3,
  Compass,
  CreditCard,
  Globe,
  ChevronDown,
  MousePointerClick,
  Play,
  Repeat,
  RotateCcw,
  Search,
  TrendingUp,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getAllAlternatives } from "@/lib/alternatives";

type AlternativeItem = {
  slug: string;
  name: string;
  description: string;
  category: string;
  website?: string;
  pricing?: string;
  freeTrial?: string;
};

function getCategoryLabel(category?: string) {
  return category?.trim() || "Other";
}

const DEFAULT_VISIBLE_PER_CATEGORY = 8;

export default function AlternativesPage() {
  const alternatives = getAllAlternatives();

  const items: AlternativeItem[] = alternatives.map((doc) => ({
    slug: doc.slug,
    name: doc.frontmatter.name,
    description: doc.frontmatter.description,
    category: getCategoryLabel(doc.frontmatter.category),
    website: doc.frontmatter.website,
    pricing: doc.frontmatter.pricing,
    freeTrial: doc.frontmatter.freeTrial,
  }));

  const grouped = new Map<string, AlternativeItem[]>();
  for (const item of items) {
    grouped.set(item.category, [...(grouped.get(item.category) ?? []), item]);
  }

  const categoryOrder = [
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
    "Other",
  ];

  const orderedCategories = categoryOrder.filter(
    (category) => (grouped.get(category) ?? []).length > 0,
  );

  const CATEGORY_META: Record<
    string,
    {
      icon: React.ElementType;
      subtitle: string;
    }
  > = {
    "Heatmap & Session Tools": {
      icon: MousePointerClick,
      subtitle: "Alternatives to visual behavior analytics tools",
    },
    "Session Replay Platforms": {
      icon: Play,
      subtitle: "Alternatives to enterprise session replay",
    },
    "Product Analytics": {
      icon: BarChart3,
      subtitle: "Alternatives to in-app analytics platforms",
    },
    "Web Analytics": {
      icon: Globe,
      subtitle: "Alternatives to traditional web analytics",
    },
    "Measurement & Attribution": {
      icon: TrendingUp,
      subtitle: "Alternatives for incrementality, MMM, and attribution",
    },
    "Change Intelligence": {
      icon: Search,
      subtitle: "Alternatives for tracking website changes",
    },
    "Monitoring & QA": {
      icon: Activity,
      subtitle: "Alternatives for site monitoring and quality assurance",
    },
    "Checkout Monitoring": {
      icon: CreditCard,
      subtitle: "Alternatives for checkout and payment monitoring",
    },
    "Backups & Recovery": {
      icon: RotateCcw,
      subtitle: "Alternatives for data backup and recovery",
    },
    "Ops & Reliability": {
      icon: Compass,
      subtitle: "Alternatives for operations and system reliability",
    },
    Other: {
      icon: Compass,
      subtitle: "Alternatives across categories and use cases",
    },
  };

  return (
    <div className="pb-24">
      <section className="relative overflow-hidden pt-24 pb-16 md:pt-32 md:pb-20">
        <div className="absolute -left-40 top-1/4 -z-10 h-[500px] w-[500px] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute -right-40 bottom-0 -z-10 h-[400px] w-[400px] rounded-full bg-secondary/5 blur-[100px]" />
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <div className="flex items-center justify-center">
              <Badge
                variant="outline"
                className="mb-6 rounded-full border-primary/20 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary"
              >
                <Repeat className="mr-2 h-4 w-4" />
                Alternatives
              </Badge>
            </div>

            <h1 className="font-heading mb-6 text-4xl tracking-tight sm:text-5xl md:text-6xl">
              Find the{" "}
              <span className="text-primary italic">Right Alternative</span>
            </h1>

            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
              Looking to switch analytics tools? We publish honest comparisons to
              help you decide — whether that&apos;s Beseam or something else.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild size="lg" className="rounded-full px-10 h-14 text-base font-bold shadow-xl shadow-primary/20">
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

      <section className="container mt-16 md:mt-20">
        <div className="mx-auto max-w-6xl space-y-12 md:space-y-16">
          {orderedCategories.map((category) => {
            const categoryItems = (grouped.get(category) ?? []).slice();
            categoryItems.sort((a, b) => a.name.localeCompare(b.name));

            const meta = CATEGORY_META[category] ?? CATEGORY_META.Other;
            const Icon = meta.icon;

            const visible = categoryItems.slice(
              0,
              DEFAULT_VISIBLE_PER_CATEGORY,
            );
            const hidden = categoryItems.slice(DEFAULT_VISIBLE_PER_CATEGORY);

            return (
              <div key={category}>
                <div className="mb-8">
                  <div className="mb-2 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border bg-muted/20">
                      <Icon className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <h2 className="font-heading text-xl tracking-tight">{category}</h2>
                  </div>
                  <p className="ml-[52px] text-sm text-muted-foreground">
                    {meta.subtitle}
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {visible.map((item) => (
                    <Link
                      key={item.slug}
                      href={`/alternatives/${item.slug}`}
                      className="group rounded-2xl border bg-card/50 p-5 transition-all duration-300 hover:border-primary/30 hover:bg-accent/10"
                    >
                      <div className="mb-3 flex items-center justify-between gap-3">
                        <h3 className="truncate text-base font-semibold text-foreground transition-colors group-hover:text-primary">
                          {item.name}
                        </h3>
                        <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
                      </div>
                      <p className="line-clamp-2 text-xs text-muted-foreground">
                        {item.description}
                      </p>
                    </Link>
                  ))}
                </div>

                {hidden.length > 0 && (
                  <details className="group mt-4">
                    <summary className="inline-flex cursor-pointer list-none items-center gap-2 rounded-full border bg-background px-4 py-2 text-sm font-semibold text-foreground/80 transition-colors hover:bg-accent">
                      <span className="group-open:hidden">
                        Show all ({categoryItems.length})
                      </span>
                      <span className="hidden group-open:inline">
                        Show less
                      </span>
                      <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform group-open:rotate-180" />
                    </summary>

                    <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                      {hidden.map((item) => (
                        <Link
                          key={item.slug}
                          href={`/alternatives/${item.slug}`}
                          className="group rounded-2xl border bg-card/50 p-5 transition-all duration-300 hover:border-primary/30 hover:bg-accent/10"
                        >
                          <div className="mb-3 flex items-center justify-between gap-3">
                            <h3 className="truncate text-base font-semibold text-foreground transition-colors group-hover:text-primary">
                              {item.name}
                            </h3>
                            <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
                          </div>
                          <p className="line-clamp-2 text-xs text-muted-foreground">
                            {item.description}
                          </p>
                        </Link>
                      ))}
                    </div>
                  </details>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <section className="container mt-16 md:mt-20">
        <div className="relative overflow-hidden mx-auto max-w-5xl rounded-[2.5rem] border bg-muted/10 p-10 md:p-16 text-center">
          <div className="absolute -left-24 top-1/2 z-0 h-64 w-64 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -right-24 top-1/2 z-0 h-64 w-64 -translate-y-1/2 rounded-full bg-secondary/10 blur-3xl" />
          <div className="relative z-10">
            <h3 className="font-heading text-2xl tracking-tight md:text-3xl">
              Not sure which tool fits?
            </h3>
            <p className="mt-3 text-muted-foreground md:text-base">
              Start with comparisons, then deep-dive into the tool docs.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild size="lg" className="rounded-full px-10 h-14 text-base font-bold shadow-xl shadow-primary/20">
                <a
                  href="https://app.beseam.com/analyze"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Try Beseam Free
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-full px-10 h-14 text-base font-bold border-2"
              >
                <Link href="/compare">View comparisons</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
