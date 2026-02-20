"use client";

import { useCallback } from "react";

import { GtagEvent } from "@/lib/utils";

const useAnalytics = () => {
  const isEnabled = process.env.NEXT_PUBLIC_ENABLE_ANALYTICS !== "false";

  const trackEvent = useCallback(
    (event: GtagEvent) => {
      if (!isEnabled || typeof window === "undefined" || !window.gtag) return;

      window.gtag("event", event.action, {
        event_category: event.category,
        event_label: event.label,
        value: event.value,
        ...event,
      });
    },
    [isEnabled]
  );

  const trackPageView = useCallback(
    (path: string, title?: string) => {
      if (!isEnabled || typeof window === "undefined" || !window.gtag) return;

      window.gtag("event", "page_view", {
        page_path: path,
        page_location: window.location.href,
        page_title: title || document.title,
      });
    },
    [isEnabled]
  );

  return {
    trackEvent,
    trackPageView,
    trackConversion: () => {},
    trackPurchase: () => {},
    trackAddToCart: () => {},
    trackSearch: () => {},
    trackLogin: () => {},
    trackSignUp: () => {},
  };
};

export default useAnalytics;
