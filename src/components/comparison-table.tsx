"use client";

import { CheckCircle2, OctagonX } from "lucide-react";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const rows = [
  {
    label: "Purpose",
    fieson: (
      <>
        <CheckCircle2 className="inline h-4 w-4 text-green-600" /> Full AI
        Search + <CheckCircle2 className="inline h-4 w-4 text-green-600" />{" "}
        Human Conversion Engine
      </>
    ),
    traditional: (
      <>
        <OctagonX className="inline h-4 w-4 text-red-600" /> Fragmented tools
        for single tasks
      </>
    ),
  },
  {
    label: "AI Search Visibility",
    fieson: (
      <>
        <CheckCircle2 className="inline h-4 w-4 text-green-600" /> 3–5× higher |
        Optimized for <CheckCircle2 className="inline h-4 w-4 text-green-600" />{" "}
        GEO (ChatGPT, Perplexity, Google AI Overviews, etc) and{" "}
        <CheckCircle2 className="inline h-4 w-4 text-green-600" /> SEO directly
      </>
    ),
    traditional: (
      <>
        <OctagonX className="inline h-4 w-4 text-red-600" /> Weak
      </>
    ),
  },
  {
    label: "AI Visibility Score",
    fieson: (
      <>
        <CheckCircle2 className="inline h-4 w-4 text-green-600" /> 75 - 95+
      </>
    ),
    traditional: (
      <>
        <OctagonX className="inline h-4 w-4 text-red-600" /> 5 - 45
      </>
    ),
  },
  {
    label: "Deep Product Context for AI",
    fieson: (
      <>
        <CheckCircle2 className="inline h-4 w-4 text-green-600" /> LLM-optimized
        PDP narrative text and structured format with{" "}
        <CheckCircle2 className="inline h-4 w-4 text-green-600" /> benefits,{" "}
        <CheckCircle2 className="inline h-4 w-4 text-green-600" /> objections,{" "}
        <CheckCircle2 className="inline h-4 w-4 text-green-600" /> FAQs,{" "}
        <CheckCircle2 className="inline h-4 w-4 text-green-600" /> 'best for',{" "}
        <CheckCircle2 className="inline h-4 w-4 text-green-600" /> howto,{" "}
        <CheckCircle2 className="inline h-4 w-4 text-green-600" /> use cases,{" "}
        <CheckCircle2 className="inline h-4 w-4 text-green-600" /> why,{" "}
        <CheckCircle2 className="inline h-4 w-4 text-green-600" /> comparisons
        etc.
      </>
    ),
    traditional: (
      <>
        <OctagonX className="inline h-4 w-4 text-red-600" /> Low,{" "}
        <OctagonX className="inline h-4 w-4 text-red-600" /> non-existent;
        generic unstructered top-level text.
      </>
    ),
  },
  {
    label: "Product Images",
    fieson: (
      <>
        <CheckCircle2 className="inline h-4 w-4 text-green-600" /> Full
        coverage: <CheckCircle2 className="inline h-4 w-4 text-green-600" />{" "}
        On-brand packshots,{" "}
        <CheckCircle2 className="inline h-4 w-4 text-green-600" /> Product on
        model, <CheckCircle2 className="inline h-4 w-4 text-green-600" />{" "}
        Lifestyle, <CheckCircle2 className="inline h-4 w-4 text-green-600" />{" "}
        Product in use,{" "}
        <CheckCircle2 className="inline h-4 w-4 text-green-600" /> UCG,{" "}
        <CheckCircle2 className="inline h-4 w-4 text-green-600" /> Detail shots,{" "}
        <CheckCircle2 className="inline h-4 w-4 text-green-600" /> Comparison —
        aligned with narrative and user needs
      </>
    ),
    traditional: (
      <>
        <OctagonX className="inline h-4 w-4 text-red-600" /> Low quality,{" "}
        <OctagonX className="inline h-4 w-4 text-red-600" /> high costs/time,{" "}
        <OctagonX className="inline h-4 w-4 text-red-600" /> generic stale,{" "}
        <OctagonX className="inline h-4 w-4 text-red-600" /> low stopping power,{" "}
        <OctagonX className="inline h-4 w-4 text-red-600" /> no context,{" "}
        <OctagonX className="inline h-4 w-4 text-red-600" /> not aligned with
        user needs, <OctagonX className="inline h-4 w-4 text-red-600" /> no
        lifestyle/product in use
      </>
    ),
  },
  {
    label: "Product Videos",
    fieson: (
      <>
        <CheckCircle2 className="inline h-4 w-4 text-green-600" /> Cinematic AI
        videos auto-built from{" "}
        <CheckCircle2 className="inline h-4 w-4 text-green-600" /> brandbook,{" "}
        <CheckCircle2 className="inline h-4 w-4 text-green-600" /> angles, and{" "}
        <CheckCircle2 className="inline h-4 w-4 text-green-600" /> storyboard
      </>
    ),
    traditional: (
      <>
        <OctagonX className="inline h-4 w-4 text-red-600" /> None mostly, or{" "}
        <OctagonX className="inline h-4 w-4 text-red-600" /> low-quality generic
        clips/
        <OctagonX className="inline h-4 w-4 text-red-600" /> disconnected from
        narrative
      </>
    ),
  },
  {
    label: "Human Conversion Quality",
    fieson: (
      <>
        <CheckCircle2 className="inline h-4 w-4 text-green-600" />{" "}
        Psychology-driven conversion built from the same{" "}
        <CheckCircle2 className="inline h-4 w-4 text-green-600" /> deep product
        context narrative.
      </>
    ),
    traditional: (
      <>
        <OctagonX className="inline h-4 w-4 text-red-600" /> Low{" "}
        <OctagonX className="inline h-4 w-4 text-red-600" /> generic top level
      </>
    ),
  },
  {
    label: "Category control",
    fieson: (
      <>
        <CheckCircle2 className="inline h-4 w-4 text-green-600" />{" "}
        Category/collection PDP,{" "}
        <CheckCircle2 className="inline h-4 w-4 text-green-600" /> image & video
        templates to standardise and control quality at scale
      </>
    ),
    traditional: (
      <>
        <OctagonX className="inline h-4 w-4 text-red-600" /> Not available
      </>
    ),
  },
  {
    label: "Brand Consistency",
    fieson: (
      <>
        <CheckCircle2 className="inline h-4 w-4 text-green-600" /> Guaranteed -{" "}
        <CheckCircle2 className="inline h-4 w-4 text-green-600" />{" "}
        brandbook-enforced{" "}
        <CheckCircle2 className="inline h-4 w-4 text-green-600" /> templates,{" "}
        <CheckCircle2 className="inline h-4 w-4 text-green-600" /> lighting,{" "}
        <CheckCircle2 className="inline h-4 w-4 text-green-600" /> style,{" "}
        <CheckCircle2 className="inline h-4 w-4 text-green-600" /> tone
      </>
    ),
    traditional: (
      <>
        <OctagonX className="inline h-4 w-4 text-red-600" /> No brand logic
      </>
    ),
  },
  {
    label: "Narrative Coherence",
    fieson: (
      <>
        <CheckCircle2 className="inline h-4 w-4 text-green-600" /> All{" "}
        <CheckCircle2 className="inline h-4 w-4 text-green-600" /> media +{" "}
        <CheckCircle2 className="inline h-4 w-4 text-green-600" /> text
        generated from ONE persuasion graph
      </>
    ),
    traditional: (
      <>
        <OctagonX className="inline h-4 w-4 text-red-600" /> No coherence
        between <OctagonX className="inline h-4 w-4 text-red-600" /> assets
        and/or <OctagonX className="inline h-4 w-4 text-red-600" /> text
      </>
    ),
  },
  {
    label: "Scale & time",
    fieson: (
      <>
        <CheckCircle2 className="inline h-4 w-4 text-green-600" /> Update &
        control entire catalogue in{" "}
        <CheckCircle2 className="inline h-4 w-4 text-green-600" /> minutes,
        easily scale from 1 to{" "}
        <CheckCircle2 className="inline h-4 w-4 text-green-600" /> 100k+ SKUs
        consistent, <CheckCircle2 className="inline h-4 w-4 text-green-600" />{" "}
        auto-updates/onboarding
      </>
    ),
    traditional: (
      <>
        <OctagonX className="inline h-4 w-4 text-red-600" /> Manual per product
      </>
    ),
  },
  {
    label: "Sync & customisation",
    fieson: (
      <>
        <CheckCircle2 className="inline h-4 w-4 text-green-600" /> Syncs all
        content from and to your store,{" "}
        <CheckCircle2 className="inline h-4 w-4 text-green-600" /> customise
        sections per category/collection,{" "}
        <CheckCircle2 className="inline h-4 w-4 text-green-600" /> easy review
        before publish
      </>
    ),
    traditional: (
      <>
        <OctagonX className="inline h-4 w-4 text-red-600" /> Manual
        up-/downloads
      </>
    ),
  },
  {
    label: "Cost per Product",
    fieson: (
      <>
        <CheckCircle2 className="inline h-4 w-4 text-green-600" /> $1–$10
      </>
    ),
    traditional: (
      <>
        <OctagonX className="inline h-4 w-4 text-red-600" /> $X00s–X000s
      </>
    ),
  },
  {
    label: "Schema Markup",
    fieson: (
      <>
        <CheckCircle2 className="inline h-4 w-4 text-green-600" /> Full{" "}
        <CheckCircle2 className="inline h-4 w-4 text-green-600" /> automated{" "}
        <CheckCircle2 className="inline h-4 w-4 text-green-600" /> LLM optimised
        schema based on deep context.
      </>
    ),
    traditional: (
      <>
        <OctagonX className="inline h-4 w-4 text-red-600" /> Mostly{" "}
        <OctagonX className="inline h-4 w-4 text-red-600" /> missing/low quality
      </>
    ),
  },
];

const ComparisonTable = () => {
  return (
    <section className="py-32">
      <div className="container">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-5xl">
            Fieson PDP AI vs Traditional Product Pages
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
            Optimized PDPs are shown 3× more often in AI results—driving more
            impressions, clicks, and sales
          </p>
        </div>
        <div className="-mr-4 overflow-x-auto">
          <div className="min-w-2xl">
            {/* Sticky Headers */}
            <div className="sticky top-0 z-10 grid grid-cols-[minmax(180px,1fr)_2fr_2fr] bg-background">
              <div className="p-4"></div>
              <div className="flex items-center justify-center rounded-t-3xl bg-green-100 p-4 md:p-6">
                <div className="text-center">
                  <div className="mb-2 text-2xl font-bold">Fieson PDP AI</div>
                  <div className="text-muted-foreground text-sm">
                    AI-Optimized
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center rounded-t-3xl bg-red-100 p-4 md:p-6">
                <div className="text-center">
                  <div className="mb-2 text-2xl font-bold">
                    Traditional PDPs
                  </div>
                  <div className="text-muted-foreground text-sm">
                    Not AI-Ready
                  </div>
                </div>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="grid grid-cols-[minmax(180px,1fr)_2fr_2fr]">
              {rows.map((row, idx) => (
                <React.Fragment key={idx}>
                  <div className="flex items-center border-b p-2 text-sm font-medium md:p-3 md:text-base">
                    {row.label}
                  </div>
                  <div className="border-b bg-green-50 p-2 md:p-4">
                    <span className="text-sm md:text-base">{row.fieson}</span>
                  </div>
                  <div className="border-b bg-red-50 p-2 md:p-4">
                    <span className="text-sm md:text-base">
                      {row.traditional}
                    </span>
                  </div>
                </React.Fragment>
              ))}
              {/* Button row at bottom */}
              <div className="p-2"></div>
              <div className="flex items-center justify-center rounded-b-3xl bg-green-100 p-4 md:p-6">
                <Button size="lg" className="w-full">
                  Get Started
                </Button>
              </div>
              <div className="p-2"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { ComparisonTable };
