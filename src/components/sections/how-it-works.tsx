"use client";

import React from "react";
const steps = [
  {
    number: "01",
    title: "Connect & Audit",
    description: "Connect your store and get a complete AI visibility audit.",
    bullets: [
      "Connect Shopify, WooCommerce, or any e‑commerce platform.",
      "Import existing PDPs, media, and product attributes.",
      "Get instant AI visibility scores for every product page.",
    ],
  },
  {
    number: "02",
    title: "Optimize & Enrich",
    description:
      "Beseam analyzes gaps and generates AI-optimized content to fill them.",
    bullets: [
      "Identify missing images, weak copy, and structural gaps.",
      "Generate on‑brand packshots, lifestyle images, and videos.",
      "Create deep product narratives, FAQs, and comparisons.",
    ],
  },
  {
    number: "03",
    title: "Convert & Scale",
    description:
      "Deploy AI-ready PDPs that drive both discovery and conversion.",
    bullets: [
      "Sync enriched content back to your store instantly.",
      "Get recommended more often in AI search results.",
      "Scale across your catalog without manual effort.",
    ],
  },
];

const StepVisual = ({ index }: { index: number }) => {
  if (index === 0) {
    // Connect store & brand style
    return (
      <div className="mb-4 flex h-[184px] w-full flex-col justify-between rounded-2xl bg-muted px-4 py-3">
        <div className="mb-3 flex flex-wrap gap-2">
          <span className="bg-background text-foreground/80 rounded-full px-3 py-1 text-[11px] font-medium">
            Store
          </span>
          <span className="bg-background text-foreground/80 rounded-full px-3 py-1 text-[11px] font-medium">
            Brand style
          </span>
          <span className="border-border text-muted-foreground rounded-full border px-3 py-1 text-[11px]">
            Catalog
          </span>
        </div>
        <div className="space-y-2">
          <div className="bg-background/70 h-2 w-full rounded-full" />
          <div className="bg-background/50 h-2 w-4/5 rounded-full" />
          <div className="bg-background/30 h-2 w-2/3 rounded-full" />
        </div>
        <div className="mt-3 flex items-center justify-between text-[11px] text-muted-foreground">
          <span>Sources connected</span>
          <span className="bg-background text-foreground/80 rounded-full px-2 py-0.5 font-medium">
            Shopify · API
          </span>
        </div>
      </div>
    );
  }

  if (index === 1) {
    // Analysis & scoring
    return (
      <div className="mb-4 flex h-[184px] w-full flex-col justify-between rounded-2xl bg-muted px-4 py-3">
        <div className="mb-2 flex h-16 items-end gap-2">
          <div className="bg-primary/30 h-6 w-2 rounded-full" />
          <div className="bg-primary h-10 w-2 rounded-full" />
          <div className="bg-primary/50 h-8 w-2 rounded-full" />
          <div className="bg-primary/20 h-4 w-2 rounded-full" />
          <div className="bg-primary/40 h-7 w-2 rounded-full" />
        </div>
        <div className="mb-2 flex flex-wrap gap-2 text-[11px]">
          <span className="bg-background text-foreground/80 rounded-full px-2 py-0.5 font-medium">
            PDP score
          </span>
          <span className="bg-background/70 text-muted-foreground rounded-full px-2 py-0.5">
            Gaps & opportunities
          </span>
        </div>
        <div className="flex items-center justify-between text-[11px]">
          <span className="text-muted-foreground text-[11px] font-medium">
            AI visibility & conversion
          </span>
          <span className="bg-background text-foreground/90 rounded-full px-2 py-0.5 text-[11px] font-semibold">
            {process.env.NEXT_PUBLIC_RELEASE_GUARD === "true" ? "Score" : "91% score"}
          </span>
        </div>
      </div>
    );
  }

  // index === 2 — content generation & sync
  return (
    <div className="mb-4 flex h-[184px] w-full flex-col justify-between rounded-2xl bg-muted px-4 py-3">
      <div className="space-y-2">
        <div className="bg-background h-6 w-full rounded-full" />
        <div className="bg-background/70 h-2 w-full rounded-full" />
        <div className="bg-background/60 h-2 w-11/12 rounded-full" />
        <div className="bg-background/50 h-2 w-10/12 rounded-full" />
        <div className="bg-background/30 h-2 w-8/12 rounded-full" />
      </div>
      <div className="flex items-center justify-between">
        <span className="bg-background text-foreground/85 rounded-full px-2 py-0.5 text-[11px] font-medium">
          PDP content
        </span>
        <span className="bg-primary text-primary-foreground rounded-full px-2 py-0.5 text-[11px] font-semibold">
          Sync to store
        </span>
      </div>
    </div>
  );
};

const HowItWorks = () => {
  return (
    <section className="bg-muted/30 py-20 md:py-32">
      <div className="container">
        <div className="mb-12 text-center md:mb-16">
          <h2 className="mb-4 text-3xl font-bold md:text-5xl">
            How Beseam Works
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg md:text-xl">
            {process.env.NEXT_PUBLIC_RELEASE_GUARD === "true"
              ? "As a pilot partner, we'll work together to turn your catalog into AI‑ready PDP content."
              : "Turn your catalog into AI‑ready PDP content in three simple steps."}
          </p>
        </div>

        {/* Steps Grid */}
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3">
          {steps.map((step, index) => {
            return (
              <div key={index} className="flex flex-col items-start">
                <StepVisual index={index} />
                <div className="text-secondary mb-1 text-3xl font-semibold tracking-tight md:text-4xl">
                  {step.number}
                </div>

                <h3 className="mb-1 text-lg font-semibold md:text-xl">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed md:text-base">
                  {step.description}
                </p>
                <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
                  {step.bullets?.map((item, bulletIndex) => (
                    <li key={bulletIndex} className="flex gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
