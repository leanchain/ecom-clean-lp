"use client";

import { ArrowRight } from "lucide-react";

import TrackedLink from "@/components/beseam/tracked-link";
import { cn } from "@/lib/utils";

export const REVIEW_URL = "/store-health-review";

type BookReviewCtaProps = {
  variant?: "primary" | "secondary";
  label?: string;
  location?: string;
  className?: string;
};

export function BookReviewCta({
  variant = "primary",
  label,
  location = "unknown",
  className,
}: BookReviewCtaProps) {
  if (variant === "secondary") {
    return (
      <TrackedLink
        href="/#products"
        eventName="marketing_secondary_cta_clicked"
        placement={location}
        className={cn(
          "inline-flex min-h-12 items-center justify-center gap-2 border border-black/25 bg-transparent px-6 text-[15px] font-semibold text-[#151515] transition-colors hover:border-[#3154ff] hover:text-[#3154ff] focus-visible:ring-2 focus-visible:ring-[#3154ff] focus-visible:ring-offset-3",
          className,
        )}
      >
        {label ?? "Examine the product systems"}
      </TrackedLink>
    );
  }

  return (
    <TrackedLink
      href={REVIEW_URL}
      eventName="marketing_primary_cta_clicked"
      eventCategory="conversion"
      placement={location}
      preserveUtm
      className={cn(
        "group inline-flex min-h-12 items-center justify-center gap-3 bg-[#111318] px-7 py-3 text-[15px] font-semibold leading-tight text-white transition-colors hover:bg-[#3154ff] focus-visible:ring-2 focus-visible:ring-[#3154ff] focus-visible:ring-offset-3",
        className,
      )}
    >
      {label ?? "Review your revenue surface"}
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
    </TrackedLink>
  );
}

export default BookReviewCta;
