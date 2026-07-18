import type { Metadata } from "next";

import ReviewContent from "./review-content";

export const metadata: Metadata = {
  title: { absolute: "Book a Store Health Review | Beseam" },
  description:
    "Book a Store Health Review. We look at your existing Shopify setup, your current monitoring coverage and the problems your team most needs to detect — with the evidence to act.",
  alternates: { canonical: "/store-health-review" },
};

export default function StoreHealthReviewPage() {
  return <ReviewContent />;
}
