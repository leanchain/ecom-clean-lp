"use client";

import { ArrowRight } from "lucide-react";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import AnimatedBorderButton from "@/components/animated-border-button";

const rows = [
  {
    label: "Purpose",
    Hexadd: <>✅ Full AI Search + ✅ Human Conversion Engine</>,
    traditional: <>❌ Fragmented tools for single tasks</>,
  },
  {
    label: "AI Search Visibility",
    Hexadd: (
      <>
        ✅ 3–5× higher visibility ✅ Optimized for GEO (ChatGPT, Perplexity,
        Google AI Overviews, etc) and ✅ SEO
      </>
    ),
    traditional: <>❌ Weak</>,
  },
  {
    label: "AI Visibility Score",
    Hexadd: <>✅ 75 - 95+</>,
    traditional: <>❌ 5 - 45</>,
  },
  {
    label: "Deep Product Context for AI",
    Hexadd: (
      <>
        ✅ LLM-optimized PDP narrative text and ✅ structured format with ✅
        benefits, objections, FAQs, 'best for', howto, use cases, why,
        comparisons etc.
      </>
    ),
    traditional: <>❌ Low/non-existent; generic unstructured top-level text.</>,
  },
  {
    label: "Product Images",
    Hexadd: (
      <>
        ✅ Full coverage: On-brand packshots, product on model, lifestyle,
        product in use, UCG, detail shots, comparison, ✅ aligned with narrative
        and user needs
      </>
    ),
    traditional: (
      <>
        ❌ Low quality, high costs/time, generic/stale, low stopping power, ❌
        no context & not aligned with user needs, ❌ no lifestyle/product in use
      </>
    ),
  },
  {
    label: "Product Videos",
    Hexadd: (
      <>
        ✅ On-brand AI videos auto-built from ✅ brandbook, ✅ aligned with
        narrative and user needs
      </>
    ),
    traditional: (
      <>
        ❌ None mostly, or ❌ low-quality generic clips ❌ disconnected from
        narrative
      </>
    ),
  },
  {
    label: "Human Conversion Quality",
    Hexadd: (
      <>
        ✅ User needs driven conversion ✅ built from the same deep product
        context narrative
      </>
    ),
    traditional: <>❌ Low, ❌ generic top-level copy</>,
  },
  {
    label: "Category control",
    Hexadd: (
      <>
        ✅ Category/collection PDP, ✅ image & video templates to standardise
        and control quality at scale
      </>
    ),
    traditional: <>❌ Not available</>,
  },
  {
    label: "Brand Consistency",
    Hexadd: <>✅ On-brand ✅ category templates, ✅ lighting, style & tone</>,
    traditional: <>❌ No brand logic</>,
  },
  {
    label: "Narrative Coherence",
    Hexadd: <>✅ All media + text generated from ONE persuasion graph</>,
    traditional: <>❌ No coherence between assets and/or text</>,
  },
  {
    label: "Scale & time",
    Hexadd: (
      <>
        ✅ Update & control entire catalogue in minutes, ✅ easily scale from 1
        to 100k+ SKUs consistently, ✅ auto-updates/onboarding
      </>
    ),
    traditional: <>❌ Manual per product</>,
  },
  {
    label: "Sync & customisation",
    Hexadd: (
      <>
        ✅ Syncs all content from and to your store, ✅ customise sections per
        category/collection, ✅ easy review before publish
      </>
    ),
    traditional: <>❌ Manual up-/downloads</>,
  },
  {
    label: "Cost per Product",
    Hexadd: <>✅ $1–$10</>,
    traditional: <>❌ $X00s–X000s</>,
  },
  {
    label: "Schema Markup",
    Hexadd: (
      <>✅ Full automated LLM-optimised schema ✅ based on deep context</>
    ),
    traditional: <>❌ Mostly ❌ missing/low quality</>,
  },
];

const ComparisonTable = () => {
  return (
    <section className="py-32">
      <div className="container">
        <div className="-mr-4 overflow-x-auto">
          <div className="min-w-2xl overflow-hidden">
            <div className="grid grid-cols-[minmax(160px,0.8fr)_2.2fr_1.8fr]">
              <div className="p-4"></div>
              <div className="flex items-center justify-center rounded-t-3xl bg-green-50 dark:bg-green-950/30 py-4 md:py-5">
                <div className="text-center">
                  <div className="mb-2 text-2xl font-bold">Hex+ PDP AI</div>
                  <div className="text-muted-foreground text-sm">
                    AI-Optimized
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center rounded-t-3xl py-3 md:py-4">
                <div className="text-center">
                  <div className="mb-2 text-xl font-semibold">
                    Traditional PDPs
                  </div>
                  <div className="text-muted-foreground text-sm">
                    Not AI-Ready
                  </div>
                </div>
              </div>
              {rows.map((row, idx) => (
                <React.Fragment key={idx}>
                  <div
                    className={`flex items-center px-2 py-1.5 text-sm font-medium md:px-3 md:py-2 md:text-base ${
                      idx < rows.length - 1 ? "border-b" : ""
                    }`}
                  >
                    {row.label}
                  </div>
                  <div
                    className={`bg-green-50 dark:bg-green-950/30 px-2 py-1.5 md:px-4 md:py-2 ${
                      idx < rows.length - 1 ? "border-b" : ""
                    }`}
                  >
                    <span className="text-sm md:text-base">{row.Hexadd}</span>
                  </div>
                  <div
                    className={`px-2 py-1.5 md:px-4 md:py-2 ${
                      idx < rows.length - 1 ? "border-b" : ""
                    }`}
                  >
                    <span className="text-sm text-muted-foreground md:text-base">
                      {row.traditional}
                    </span>
                  </div>
                </React.Fragment>
              ))}
              {/* Button row at bottom */}
              <div className="p-2"></div>
              <div className="rounded-b-3xl bg-green-50 dark:bg-green-950/30 p-4 md:p-6">
                <AnimatedBorderButton
                  asChild
                  fullWidth={true}
                  wrapperClassName="w-full cursor-pointer"
                  className="cursor-pointer [&_svg]:transition-transform hover:[&_svg]:translate-x-0.5"
                >
                  <Link href="/demo">
                    Get Started <ArrowRight />
                  </Link>
                </AnimatedBorderButton>
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
