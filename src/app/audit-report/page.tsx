import type { Metadata } from "next";

import PublicAuditReport from "@/components/beseam/public-audit-report";

export const metadata: Metadata = {
  title: "Public AI shopping audit",
  description:
    "A shareable, evidence-led audit of how AI shopping assistants interpret a store's public catalog and which brands they recommend.",
  robots: { index: false, follow: true },
};

export default function AuditReportPage() {
  return <PublicAuditReport />;
}
