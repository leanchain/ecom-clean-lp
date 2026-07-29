import type { Metadata } from "next";

import ReviewContent from "./review-content";

export const metadata: Metadata = {
  title: { absolute: "Set Up Product Visibility Monitoring | Beseam" },
  description:
    "Book a 20-minute setup call to choose the products and discovery paths Beseam should monitor, establish the baseline, and define the first alerts.",
  alternates: { canonical: "/product-visibility-monitoring" },
};

export default function ProductVisibilityMonitoringPage() {
  return <ReviewContent />;
}
