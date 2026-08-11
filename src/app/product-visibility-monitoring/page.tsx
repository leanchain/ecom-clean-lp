import type { Metadata } from "next";

import ReviewContent from "./review-content";

export const metadata: Metadata = {
  title: { absolute: "Book an AI Product Recommendation Review | Beseam" },
  description:
    "Book a 20-minute review to choose the products and buying questions that matter, inspect how AI assistants answer them, and define the first evidence-backed re-check.",
  alternates: { canonical: "/product-visibility-monitoring" },
};

export default function ProductVisibilityMonitoringPage() {
  return <ReviewContent />;
}
