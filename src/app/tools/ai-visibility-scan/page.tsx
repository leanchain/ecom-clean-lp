import type { Metadata } from "next";

import ScanForm from "./scan-form";

import { SITE_URL, buildPublicMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPublicMetadata({
  title: "Free AI Product Recommendation Scan | Beseam",
  description:
    "Check how public product information is represented for AI shopping and answer engines, then inspect the product evidence behind the result.",
  path: "/tools/ai-visibility-scan",
});

export default function AiVisibilityScanPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": `${SITE_URL}/tools/ai-visibility-scan#app`,
        name: "Beseam AI Product Recommendation Scan",
        url: `${SITE_URL}/tools/ai-visibility-scan`,
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        isAccessibleForFree: true,
        description:
          "A point-in-time scan of how public product information is represented for AI shopping and answer engines, with supporting evidence kept visible.",
        provider: { "@id": `${SITE_URL}/#organization` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: `${SITE_URL}/`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "AI product recommendation scan",
            item: `${SITE_URL}/tools/ai-visibility-scan`,
          },
        ],
      },
    ],
  };

  return (
    <section className="min-h-screen bg-surface">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto max-w-2xl px-6 py-24 md:py-32">
        <p className="editorial-eyebrow text-muted-foreground">Free tool</p>
        <h1 className="editorial-heading mt-4 text-ink">
          AI product recommendation scan
        </h1>
        <p className="editorial-body mt-5 max-w-xl text-foreground">
          A point-in-time look at how public product information is represented
          for AI shopping and answer engines, with the evidence behind the
          finding kept visible.
        </p>
        <ScanForm />
      </div>
    </section>
  );
}
