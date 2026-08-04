"use client";

import { useCallback, useEffect, useState } from "react";

import { ArrowRight } from "lucide-react";

import TrackedLink from "@/components/beseam/tracked-link";
import useAnalytics from "@/hooks/useAnalytics";
import {
  getMarketingProperties,
  getUtmValues,
} from "@/lib/marketing-analytics";
import { cn } from "@/lib/utils";

export const REVIEW_URL = "/product-visibility-monitoring";
const CAL_LINK = "pankaj.kumar/Beseam";
const CAL_NAMESPACE = "Beseam";

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
  const { trackEvent } = useAnalytics();
  const [calConfig, setCalConfig] = useState<Record<string, string>>({
    layout: "month_view",
  });

  useEffect(() => {
    if (variant !== "primary") return;
    setCalConfig({ layout: "month_view", ...getUtmValues() });

    void (async () => {
      const { getCalApi } = await import("@calcom/embed-react");
      const cal = await getCalApi({ namespace: CAL_NAMESPACE });
      cal("ui", { hideEventTypeDetails: false, layout: "month_view" });
    })();
  }, [variant]);

  const handleBookClick = useCallback(() => {
    trackEvent({
      action: "marketing_primary_cta_clicked",
      category: "conversion",
      ...getMarketingProperties(location, `https://cal.com/${CAL_LINK}`),
    });
  }, [trackEvent, location]);

  if (variant === "secondary") {
    return (
      <TrackedLink
        href="/#products"
        eventName="marketing_secondary_cta_clicked"
        placement={location}
        className={cn(
          "inline-flex min-h-12 items-center justify-center gap-2 border border-black/40 bg-transparent px-6 text-[15px] font-semibold text-[#151515] transition-colors hover:border-[#b8441d] hover:text-[#b8441d] focus-visible:ring-2 focus-visible:ring-[#b8441d] focus-visible:ring-offset-3",
          className,
        )}
      >
        {label ?? "See how monitoring works"}
      </TrackedLink>
    );
  }

  return (
    <button
      type="button"
      data-cal-namespace={CAL_NAMESPACE}
      data-cal-link={CAL_LINK}
      data-cal-config={JSON.stringify(calConfig)}
      onClick={handleBookClick}
      className={cn(
        "group inline-flex min-h-12 items-center justify-center gap-3 bg-[#111318] px-7 py-3 text-[15px] font-semibold leading-tight text-white transition-colors hover:bg-[#b8441d] focus-visible:ring-2 focus-visible:ring-[#b8441d] focus-visible:ring-offset-3",
        className,
      )}
    >
      {label ?? "Book a 20-minute review"}
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
    </button>
  );
}

export default BookReviewCta;
