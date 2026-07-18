import type { Metadata } from "next";

import ScanForm from "./scan-form";

export const metadata: Metadata = {
  title: { absolute: "AI Visibility Scan — Free Tool | Beseam" },
  description:
    "A secondary Beseam tool for checking how search and AI systems read a Shopify store's public product data.",
  alternates: { canonical: "/tools/ai-visibility-scan" },
};

export default function AiVisibilityScanPage() {
  return (
    <section className="min-h-screen bg-surface">
      <div className="mx-auto max-w-2xl px-6 py-24 md:py-32">
        <p className="editorial-eyebrow text-muted-foreground">Free tool</p>
        <h1 className="editorial-heading mt-4 text-ink">AI visibility scan</h1>
        <p className="editorial-body mt-5 max-w-xl text-foreground">
          A quick look at how public product information can be read by search
          and AI systems. This is a point-in-time tool, not the continuous Store
          Health workspace.
        </p>
        <ScanForm />
      </div>
    </section>
  );
}
