"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import { useCookieConsent } from "@/contexts/CookieConsentContext";

export default function CookieConsent() {
  const { status, accept, decline } = useCookieConsent();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer =
      status === "undecided"
        ? window.setTimeout(() => setIsVisible(true), 400)
        : undefined;
    if (status !== "undecided") setIsVisible(false);
    return () => {
      if (timer) window.clearTimeout(timer);
    };
  }, [status]);

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Cookie choices"
      className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-sm rounded-2xl border border-rule bg-panel p-4 shadow-xl sm:left-5 sm:right-auto sm:mx-0 sm:p-5"
    >
      <h2 className="text-[15px] font-semibold text-ink">
        Your privacy choices
      </h2>
      <p className="mt-2 text-[12.5px] leading-relaxed text-foreground sm:text-[13.5px]">
        Essential cookies keep the site working. We load optional analytics only
        if you accept, so we can understand how the public website is used.
      </p>
      <Link
        href="/privacy-policy"
        className="mt-1 inline-flex min-h-9 items-center py-1 text-[12px] font-medium hover:underline sm:min-h-11 sm:text-[13px]"
      >
        Read the privacy policy
      </Link>
      <div className="mt-2 grid grid-cols-2 gap-2 sm:mt-3">
        <button
          type="button"
          onClick={decline}
          className="min-h-10 rounded-full border border-rule px-3 text-[12px] font-semibold text-ink transition-colors hover:border-ink/30 sm:min-h-11 sm:px-4 sm:text-[14px]"
        >
          Reject analytics
        </button>
        <button
          type="button"
          onClick={accept}
          className="min-h-10 rounded-full bg-primary px-3 text-[12px] font-semibold text-primary-foreground transition-colors hover:bg-[var(--primary-hover)] sm:min-h-11 sm:px-4 sm:text-[14px]"
        >
          Accept analytics
        </button>
      </div>
    </aside>
  );
}
