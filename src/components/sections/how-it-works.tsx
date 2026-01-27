"use client";

import React from "react";
const steps = [
  {
    number: "01",
    title: "Audit Your PDPs",
    description: "Comprehensive analysis across SEO, GEO, AEO, CRO, layout, and style.",
    bullets: [
      "AI-powered audit of search visibility and optimization opportunities.",
      "Evaluate conversion rates, user experience, and design effectiveness.",
      "Identify gaps in content, structure, and performance metrics.",
    ],
  },
  {
    number: "02",
    title: "Optimize & Enrich Content",
    description: "Transform insights into high-converting, AI-ready PDP content.",
    bullets: [
      "Generate optimized copy, images, and structured narratives.",
      "Enhance product descriptions with persuasion psychology.",
      "Apply brand-consistent styling and layout improvements.",
    ],
  },
  {
    number: "03",
    title: "Access Complete Toolsets",
    description: "Powerful tools for recommendations, testing, and personalization.",
    bullets: [
      "Get actionable recommendations for continuous improvement.",
      "Try different variations with A/B testing capabilities.",
      "Personalize experiences with style guides and dynamic content.",
    ],
  },
];

const StepVisual = ({ index }: { index: number }) => {
  if (index === 0) {
    // Audit step
    return (
      <div className="relative mb-4 flex h-[200px] w-full flex-col justify-between rounded-3xl bg-gradient-to-br from-muted/80 to-muted border border-border/50 shadow-lg px-6 py-4 group-hover:shadow-xl transition-shadow duration-300">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-3xl" />
        <div className="relative z-10 mb-4 flex flex-wrap gap-3">
          <span className="bg-background text-foreground/90 rounded-full px-4 py-2 text-sm font-semibold shadow-sm border border-border/30">
            SEO
          </span>
          <span className="bg-background text-foreground/90 rounded-full px-4 py-2 text-sm font-semibold shadow-sm border border-border/30">
            GEO
          </span>
          <span className="bg-background text-foreground/90 rounded-full px-4 py-2 text-sm font-semibold shadow-sm border border-border/30">
            AEO
          </span>
          <span className="bg-background text-foreground/90 rounded-full px-4 py-2 text-sm font-semibold shadow-sm border border-border/30">
            CRO
          </span>
        </div>
        <div className="relative z-10 space-y-3">
          <div className="bg-primary/20 h-3 w-full rounded-full shadow-sm" />
          <div className="bg-primary/40 h-3 w-4/5 rounded-full shadow-sm" />
          <div className="bg-primary/60 h-3 w-3/5 rounded-full shadow-sm" />
        </div>
        <div className="relative z-10 mt-4 flex items-center justify-between text-sm text-muted-foreground">
          <span className="font-medium">Comprehensive Audit</span>
          <span className="bg-primary text-primary-foreground rounded-full px-3 py-1 text-sm font-bold shadow-sm">
            🔍 Analyze
          </span>
        </div>
      </div>
    );
  }

  if (index === 1) {
    // Optimize & Enrich step
    return (
      <div className="relative mb-4 flex h-[200px] w-full flex-col justify-between rounded-3xl bg-gradient-to-br from-muted/80 to-muted border border-border/50 shadow-lg px-6 py-4 group-hover:shadow-xl transition-shadow duration-300">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-3xl" />
        <div className="relative z-10 mb-3 flex h-20 items-end gap-3">
          <div className="bg-primary/30 h-8 w-3 rounded-full shadow-sm" />
          <div className="bg-primary h-12 w-3 rounded-full shadow-sm" />
          <div className="bg-primary/50 h-10 w-3 rounded-full shadow-sm" />
          <div className="bg-primary/20 h-6 w-3 rounded-full shadow-sm" />
          <div className="bg-primary/40 h-9 w-3 rounded-full shadow-sm" />
        </div>
        <div className="relative z-10 mb-3 flex flex-wrap gap-3 text-sm">
          <span className="bg-background text-foreground/90 rounded-full px-3 py-1 font-semibold shadow-sm border border-border/30">
            Content
          </span>
          <span className="bg-background text-foreground/90 rounded-full px-3 py-1 font-semibold shadow-sm border border-border/30">
            Images
          </span>
          <span className="bg-background/70 text-muted-foreground rounded-full px-3 py-1 shadow-sm">
            Structure
          </span>
        </div>
        <div className="relative z-10 flex items-center justify-between text-sm">
          <span className="text-muted-foreground font-medium">
            AI-powered optimization
          </span>
          <span className="bg-primary text-primary-foreground rounded-full px-3 py-1 text-sm font-bold shadow-sm">
            ✨ Enhance
          </span>
        </div>
      </div>
    );
  }

  // index === 2 — Toolsets step
  return (
    <div className="relative mb-4 flex h-[200px] w-full flex-col justify-between rounded-3xl bg-gradient-to-br from-muted/80 to-muted border border-border/50 shadow-lg px-6 py-4 group-hover:shadow-xl transition-shadow duration-300">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-3xl" />
      <div className="relative z-10 space-y-3">
        <div className="bg-background h-8 w-full rounded-full shadow-sm flex items-center justify-center text-sm font-semibold">
          Recommendations
        </div>
        <div className="bg-background/70 h-6 w-full rounded-full shadow-sm flex items-center justify-center text-sm">
          Tryouts & Testing
        </div>
        <div className="bg-background/60 h-6 w-11/12 rounded-full shadow-sm flex items-center justify-center text-sm">
          Style Guide
        </div>
        <div className="bg-background/50 h-6 w-10/12 rounded-full shadow-sm flex items-center justify-center text-sm">
          Personalization
        </div>
      </div>
      <div className="relative z-10 flex items-center justify-between">
        <span className="bg-background text-foreground/90 rounded-full px-3 py-1 text-sm font-semibold shadow-sm border border-border/30">
          Complete Toolkit
        </span>
        <span className="bg-primary text-primary-foreground rounded-full px-3 py-1 text-sm font-bold shadow-sm">
          🛠️ Tools
        </span>
      </div>
    </div>
  );
};

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="bg-gradient-to-br from-muted/20 via-background to-muted/30 py-24 md:py-32">
      <div className="container">
        <div className="mb-20 text-center">
          <h2 className="mb-6 text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl">
            How Beseam
            <span className="bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent"> Works</span>
          </h2>
          <p className="text-muted-foreground mx-auto max-w-3xl text-xl leading-relaxed md:text-2xl">
            Transform your catalog into <strong className="text-foreground font-semibold">AI-ready PDP content</strong> in three simple steps.
            From connection to conversion, we've streamlined the entire process.
          </p>
        </div>

        {/* Platform Sync Highlight */}
        <div className="mb-16 text-center">
          <div className="inline-flex items-center gap-3 rounded-full bg-primary/10 border border-primary/20 px-6 py-3 text-lg font-semibold text-primary shadow-lg">
            <span className="text-2xl">🔄</span>
            <span>Top E-commerce Platforms - Sync</span>
            <div className="flex items-center gap-2 text-sm font-normal">
              <span className="bg-primary text-primary-foreground rounded-full px-3 py-1">Shopify</span>
              <span className="bg-primary text-primary-foreground rounded-full px-3 py-1">WooCommerce</span>
              <span className="bg-primary text-primary-foreground rounded-full px-3 py-1">BigCommerce</span>
              <span className="bg-primary text-primary-foreground rounded-full px-3 py-1">ERP</span>
            </div>
          </div>
        </div>

        {/* Enhanced Steps Grid */}
        <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-3">
          {steps.map((step, index) => {
            return (
              <div key={index} className="group flex flex-col items-start">
                <div className="relative mb-6">
                  <StepVisual index={index} />
                  <div className="absolute -top-3 -right-3 h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-bold shadow-lg">
                    {step.number}
                  </div>
                </div>

                <h3 className="mb-3 text-xl font-bold text-foreground md:text-2xl group-hover:text-primary transition-colors duration-300">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-base leading-relaxed mb-4 md:text-lg">
                  {step.description}
                </p>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  {step.bullets?.map((item, bulletIndex) => (
                    <li key={bulletIndex} className="flex gap-3 group/item hover:text-foreground transition-colors duration-200">
                      <span className="mt-1.5 h-2 w-2 rounded-full bg-primary group-hover/item:scale-125 transition-transform duration-200" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Advanced Analytics & Testing Section */}
        <div className="mt-20 text-center">
          <h3 className="mb-12 text-2xl font-bold md:text-3xl">
            Advanced Analytics & Continuous Optimization
          </h3>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-card/80 to-card/40 p-8 border border-border/50 hover:border-primary/50 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 text-primary text-4xl group-hover:scale-110 transition-transform duration-300">
                  📊
                </div>
                <h4 className="mb-3 text-xl font-bold">Analytics & Insights</h4>
                <p className="text-muted-foreground leading-relaxed">
                  Deep performance metrics and actionable insights for data-driven decisions.
                </p>
              </div>
            </div>
            <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-card/80 to-card/40 p-8 border border-border/50 hover:border-primary/50 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 text-primary text-4xl group-hover:scale-110 transition-transform duration-300">
                  🧪
                </div>
                <h4 className="mb-3 text-xl font-bold">A/B Testing</h4>
                <p className="text-muted-foreground leading-relaxed">
                  Test variations and optimize conversions with statistical significance.
                </p>
              </div>
            </div>
            <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-card/80 to-card/40 p-8 border border-border/50 hover:border-primary/50 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 text-primary text-4xl group-hover:scale-110 transition-transform duration-300">
                  📈
                </div>
                <h4 className="mb-3 text-xl font-bold">Live Results</h4>
                <p className="text-muted-foreground leading-relaxed">
                  Real-time performance tracking and instant feedback on optimizations.
                </p>
              </div>
            </div>
            <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-card/80 to-card/40 p-8 border border-border/50 hover:border-primary/50 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 text-primary text-4xl group-hover:scale-110 transition-transform duration-300">
                  🎯
                </div>
                <h4 className="mb-3 text-xl font-bold">Competitor Analysis</h4>
                <p className="text-muted-foreground leading-relaxed">
                  Benchmark against competitors and identify market opportunities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
