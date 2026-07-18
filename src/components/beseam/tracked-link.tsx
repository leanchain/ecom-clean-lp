"use client";

import { useEffect, useState, type ComponentProps } from "react";

import Link from "next/link";

import useAnalytics from "@/hooks/useAnalytics";
import {
  getMarketingProperties,
  withCurrentUtm,
} from "@/lib/marketing-analytics";

type TrackedLinkProps = Omit<ComponentProps<typeof Link>, "href"> & {
  href: string;
  eventName: string;
  eventCategory?: string;
  placement: string;
  preserveUtm?: boolean;
};

export default function TrackedLink({
  href,
  eventName,
  eventCategory = "marketing",
  placement,
  preserveUtm = false,
  onClick,
  ...props
}: TrackedLinkProps) {
  const { trackEvent } = useAnalytics();
  const [destination, setDestination] = useState(href);

  useEffect(() => {
    if (preserveUtm) {
      setDestination(withCurrentUtm(href));
    }
  }, [href, preserveUtm]);

  return (
    <Link
      {...props}
      href={destination}
      onClick={(event) => {
        trackEvent({
          action: eventName,
          category: eventCategory,
          ...getMarketingProperties(placement, destination),
        });
        onClick?.(event);
      }}
    />
  );
}
