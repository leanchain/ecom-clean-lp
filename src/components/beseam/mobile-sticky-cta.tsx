"use client";

import { ArrowRight } from "lucide-react";

import { REVIEW_URL } from "@/components/beseam/book-review-cta";
import TrackedLink from "@/components/beseam/tracked-link";

export default function MobileStickyCta() {
  return (
    <div className="fixed inset-x-4 bottom-4 z-40 md:hidden">
      <TrackedLink
        href={REVIEW_URL}
        eventName="marketing_primary_cta_clicked"
        eventCategory="conversion"
        placement="mobile_sticky"
        preserveUtm
        className="flex min-h-12 items-center justify-center gap-2 rounded-full bg-brand-vibrant px-5 text-sm font-bold text-white shadow-lg"
      >
        Book a 20-minute Store Health Review
        <ArrowRight className="h-4 w-4" />
      </TrackedLink>
    </div>
  );
}
