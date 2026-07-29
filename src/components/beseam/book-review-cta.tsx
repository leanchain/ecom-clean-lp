"use client";

import { ArrowRight } from "lucide-react";

import TrackedLink from "@/components/beseam/tracked-link";
import { cn } from "@/lib/utils";

export const REVIEW_URL = "/product-visibility-monitoring";

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
          "inline-flex min-h-12 items-center justify-center gap-2 border border-black/25 bg-transparent px-6 text-[15px] font-semibold text-[#151515] transition-colors hover:border-[#c04e26] hover:text-[#c04e26] focus-visible:ring-2 focus-visible:ring-[#c04e26] focus-visible:ring-offset-3",
          className,
        )}
      >
        {label ?? "See how monitoring works"}
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
        "group inline-flex min-h-12 items-center justify-center gap-3 bg-[#111318] px-7 py-3 text-[15px] font-semibold leading-tight text-white transition-colors hover:bg-[#c04e26] focus-visible:ring-2 focus-visible:ring-[#c04e26] focus-visible:ring-offset-3",
        className,
      )}
    >
      {label ?? "Book a 20-minute review"}
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
    </TrackedLink>
  );
}

export default BookReviewCta;
