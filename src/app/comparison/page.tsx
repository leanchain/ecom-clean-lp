import { CheckCircle2, Minus, OctagonX } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";

const sections = [
  {
    title: "Narrative & Conversion",
    rows: [
      {
        label: "Cross-modal narrative (image + video + copy stay in sync)",
        Hexadd:
          "Single pipeline generates all three per SKU and keeps them aligned",
        pointTools: "Asset-by-asset; no linkage between visuals and copy",
        traditional: "Separate teams & handoffs → drift",
      },
      {
        label: "Visual coverage (angles, context, details)",
        Hexadd: "Auto shot-plan: angles, in-use scenes, macro",
        pointTools: "Usually 1–3 static edits; manual to expand",
        traditional: "Depends on budget; often 3–5 images",
      },
      {
        label: "Video formats",
        Hexadd:
          "Auto from image set + script (portrait/landscape, 6–30s demos)",
        pointTools: "None or generic templates; no per-SKU script",
        traditional: "Separate crew; slow/expensive",
      },
      {
        label: 'Copy modules (benefits, FAQs, comparisons, "Best for")',
        Hexadd: "Generated and tied to visuals & attributes",
        pointTools: "Generic text; no SKU-level depth",
        traditional: "Manually written; slow to update",
      },
      {
        label: "Brand consistency",
        Hexadd: "Brandbook constraints applied across SKUs",
        pointTools: "Varies per asset/template",
        traditional: "Varies by vendor/photographer",
      },
      {
        label: "Personalization & locales",
        Hexadd: "Auto language/region variants; channel-specific crops",
        pointTools: "Manual duplicates",
        traditional: "Separate projects per locale",
      },
      {
        label: "Accessibility (alt text, captions)",
        Hexadd: "Auto-generated and consistent",
        pointTools: "Usually missing",
        traditional: "Manual if at all",
      },
    ],
  },
  {
    title: "Speed, Cost & Scale",
    rows: [
      {
        label: "Time to first publish (per SKU)",
        Hexadd: "Minutes",
        pointTools: "Minutes per asset (full PDP = hours/days)",
        traditional: "Weeks",
      },
      {
        label: "Initial cost per SKU",
        Hexadd: "$10–50 (images+video+copy+schema)",
        pointTools: "$1–10 per asset, but adds up; copy extra",
        traditional: "$500–5,000+",
      },
      {
        label: "Update cost & speed",
        Hexadd: "< $5 and minutes (re-generate deltas)",
        pointTools: "Manual rework per asset",
        traditional: "Re-shoot + rewrite",
      },
      {
        label: "Throughput per operator/day (example)",
        Hexadd: "50–200 SKUs end-to-end",
        pointTools: "10–30 assets (not end-to-end)",
        traditional: "2–10 SKUs",
      },
    ],
  },
  {
    title: "AI Search & Discovery",
    rows: [
      {
        label: "Schema.org & product attributes",
        Hexadd: "Auto and complete per module",
        pointTools: "Out of scope",
        traditional: "Partial; manual",
      },
      {
        label: "Normalized attributes (size/color/material)",
        Hexadd: "Mapped to a consistent catalog",
        pointTools: "Not handled",
        traditional: "CSVs/hand-maintained",
      },
      {
        label:
          "Commerce feed readiness (e.g., ChatGPT/OpenAI, Google Merchant Center)",
        Hexadd: "Designed to output standard commerce feeds",
        pointTools: "Not supported",
        traditional: "Requires separate tooling",
      },
      {
        label: "Freshness signals (timestamps, changefeed)",
        Hexadd: "Automatic on price/stock/season triggers",
        pointTools: "None",
        traditional: "Batch updates",
      },
      {
        label: '"AI Search Readiness" score (0–100)*',
        Hexadd: "80–95 (diagnostic)",
        pointTools: "30–50",
        traditional: "40–60",
      },
    ],
  },
  {
    title: "Ops, Governance & Proof",
    rows: [
      {
        label: "Review workflow (human-in-the-loop)",
        Hexadd: "Built-in approvals, versioning, rollback",
        pointTools: "None",
        traditional: "Email/Drive chains",
      },
      {
        label: "Experimentation & analytics",
        Hexadd: "A/B variants; ties assets to conversion",
        pointTools: "None",
        traditional: "Rare and manual",
      },
      {
        label: "Rights, provenance, guardrails",
        Hexadddd: "License tracking; optional C2PA/provenance",
        pointTools: "Mixed, per-asset",
        traditional: "Paper releases; scattered",
      },
      {
        label: "Channels & CMS export",
        Hexadd: "Shopify/BigCommerce + marketplaces + social",
        pointTools: "File export only",
        traditional: "CMS + manual reformatting",
      },
      {
        label: "Best fit",
        Hexadd: "Large catalogs (1k–100k SKUs), frequent refresh",
        pointTools: "One-off assets, micro-catalogs",
        traditional: "Flagship hero SKUs/campaigns",
      },
      {
        label: "Outcome",
        Hexadd:
          "One coherent PDP that sells to humans and AI—fast, consistent, measurable",
        pointTools: "Disconnected assets",
        traditional: "High craft, low speed/scale",
      },
    ],
  },
];

export default function ComparisonPage() {
  return (
    <div className="min-h-screen py-20">
      <div className="container">
        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="mb-4 text-4xl font-bold md:text-6xl">
            Hex+ PDP AI vs Alternatives
          </h1>
          <p className="text-muted-foreground mx-auto max-w-3xl text-lg md:text-xl">
            A comprehensive comparison of Hex+&apos;s Narrative PDP AI against
            point tools and traditional product page workflows
          </p>
        </div>

        {/* Comparison Table */}
        <div className="-mr-4 overflow-x-auto">
          <div className="min-w-[900px]">
            <div className="grid grid-cols-4">
              {/* Table Header - Only once */}
              <div className="border-b p-4"></div>
              <div className="flex flex-col items-center justify-center gap-2 rounded-t-3xl bg-green-100 p-4 md:p-6">
                <div className="text-center">
                  <div className="mb-2 text-xl font-bold md:text-2xl">
                    Hex+ PDP AI
                  </div>
                  <div className="text-muted-foreground text-xs md:text-sm">
                    Narrative PDP AI
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center gap-2 rounded-t-3xl border-b p-4 md:p-6">
                <div className="text-center">
                  <div className="mb-2 text-xl font-bold md:text-2xl">
                    Point Tools
                  </div>
                  <div className="text-muted-foreground text-xs md:text-sm">
                    Photoroom/Freepik/SEO
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center gap-2 rounded-t-3xl border-b p-4 md:p-6">
                <div className="text-center">
                  <div className="mb-2 text-xl font-bold md:text-2xl">
                    Traditional Stack
                  </div>
                  <div className="text-muted-foreground text-xs md:text-sm">
                    shoot + copy + SEO
                  </div>
                </div>
              </div>

              {/* All sections */}
              {sections.map((section, sectionIdx) => (
                <React.Fragment key={sectionIdx}>
                  {/* Section Header spanning all columns */}
                  <div className="col-span-4 border-b bg-muted/50 p-4 pt-8">
                    <h2 className="text-xl font-bold md:text-2xl">
                      {section.title}
                    </h2>
                  </div>

                  {/* Section Rows */}
                  {section.rows.map((row, rowIdx) => (
                    <React.Fragment key={rowIdx}>
                      <div className="flex items-center border-b p-3 text-sm font-medium md:p-4 md:text-base">
                        {row.label}
                      </div>
                      <div className="border-b bg-green-50 p-3 md:p-6">
                        <div className="flex items-center gap-2">
                          <span className="text-sm md:text-base">
                            {row.Hexadd}
                          </span>
                        </div>
                      </div>
                      <div className="border-b p-3 md:p-6">
                        <div className="flex items-center gap-2">
                          <span className="text-muted-foreground text-sm md:text-base">
                            {row.pointTools}
                          </span>
                        </div>
                      </div>
                      <div className="border-b p-3 md:p-6">
                        <div className="flex items-center gap-2">
                          <span className="text-muted-foreground text-sm md:text-base">
                            {row.traditional}
                          </span>
                        </div>
                      </div>
                    </React.Fragment>
                  ))}
                </React.Fragment>
              ))}

              {/* Button at the bottom */}
              <div className="p-4"></div>
              <div className="flex items-center justify-center rounded-b-3xl bg-green-100 p-4 md:p-6">
                <Button className="w-full">Get Started with Hex+</Button>
              </div>
              <div className="p-4"></div>
              <div className="p-4"></div>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="bg-muted mt-12 rounded-3xl p-6 md:p-8">
          <p className="text-muted-foreground text-sm">
            <strong>* AI Search Readiness Score:</strong> Internal benchmark
            based on coverage of schema, attribute completeness, freshness
            cadence, media/copy completeness, and feed validity. Scores are
            diagnostic and based on typical implementations.
          </p>
        </div>
      </div>
    </div>
  );
}
