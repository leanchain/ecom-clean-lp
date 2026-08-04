import type { Metadata } from "next";

import PublicBrandBook from "@/components/beseam/public-brand-book";

export const metadata: Metadata = {
  title: "Brand evidence behind the AI shopping audit",
  description:
    "The public products, category vocabulary, market context, and buying moments used to frame an AI shopping audit's buyer questions.",
  robots: { index: false, follow: true },
};

export default function AuditBrandBookPage() {
  return <PublicBrandBook />;
}
