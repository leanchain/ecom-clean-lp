import type { Metadata } from "next";

import ScanForm from "./scan-form";

export const metadata: Metadata = {
  title: { absolute: "Free AI Product Recommendation Scan | Beseam" },
  description:
    "Check how public product information is represented for AI shopping and answer engines, then inspect the product evidence behind the result.",
  alternates: { canonical: "/tools/ai-visibility-scan" },
};

export default function AiVisibilityScanPage() {
  return (
    <section className="min-h-screen bg-surface">
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
