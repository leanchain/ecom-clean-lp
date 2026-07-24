import type { Metadata } from "next";

import ReviewContent from "./review-content";

export const metadata: Metadata = {
  title: { absolute: "Book a Visibility + Health Review | Beseam" },
  description:
    "Book a 30-minute Beseam review covering Shopify Store Health, monitoring coverage and priority AI visibility questions - with the evidence to act.",
  alternates: { canonical: "/store-health-review" },
};

export default function StoreHealthReviewPage() {
  return <ReviewContent />;
}
