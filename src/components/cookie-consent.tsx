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
      className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-md rounded-2xl border border-rule bg-panel p-5 shadow-lg sm:left-5 sm:right-auto sm:mx-0"
    >
      <h2 className="text-[15px] font-semibold text-ink">
        Your privacy choices
      </h2>
      <p className="mt-2 text-[13.5px] leading-relaxed text-foreground">
        Essential cookies keep the site working. We load optional analytics only
        if you accept, so we can understand how the public website is used.
      </p>
      <Link
        href="/privacy-policy"
        className="mt-2 inline-block min-h-11 py-2 text-[13px] font-medium hover:underline"
      >
        Read the privacy policy
      </Link>
      <div className="mt-3 grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={decline}
          className="min-h-11 rounded-full border border-rule px-4 text-[14px] font-semibold text-ink transition-colors hover:border-ink/30"
        >
          Reject analytics
        </button>
        <button
          type="button"
          onClick={accept}
          className="min-h-11 rounded-full bg-primary px-4 text-[14px] font-semibold text-primary-foreground transition-colors hover:bg-[var(--primary-hover)]"
        >
          Accept analytics
        </button>
      </div>
    </aside>
  );
}
