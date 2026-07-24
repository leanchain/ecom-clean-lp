"use client";

import { ArrowRight } from "lucide-react";
import TrackedLink from "@/components/beseam/tracked-link";
import { cn } from "@/lib/utils";

export const REVIEW_URL = "/store-health-review";

type BookReviewCtaProps = { variant?: "primary" | "secondary"; label?: string; location?: string; className?: string };

export function BookReviewCta({ variant = "primary", label, location = "unknown", className }: BookReviewCtaProps) {
  if (variant === "secondary") {
    return <TrackedLink href="/#products" eventName="marketing_secondary_cta_clicked" placement={location} className={cn("inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-ink/20 bg-transparent px-6 text-[15px] font-semibold text-ink transition-colors hover:border-ink/40 hover:bg-ink/[0.04] focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-3", className)}>{label ?? "Explore the product suite"}</TrackedLink>;
  }
  return <TrackedLink href={REVIEW_URL} eventName="marketing_primary_cta_clicked" eventCategory="conversion" placement={location} preserveUtm className={cn("group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-brand-vibrant px-7 py-3 text-[15px] font-semibold leading-tight text-white transition-colors hover:bg-[#e5572a] focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-3", className)}>{label ?? "Book a platform demo"}<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" /></TrackedLink>;
}

export default BookReviewCta;
