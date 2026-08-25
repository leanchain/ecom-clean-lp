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
      className="fixed bottom-20 left-3 z-50 w-[calc(100%-1.5rem)] max-w-[22rem] border border-black/20 bg-white p-3 shadow-[0_8px_28px_rgba(17,19,24,0.12)] sm:bottom-5 sm:left-5"
    >
      <p className="text-[11.5px] leading-[1.5] text-black/62">
        Essential cookies keep the site working. Optional analytics load only
        after you accept.{" "}
        <Link
          href="/privacy-policy"
          className="font-semibold text-ink-deep underline decoration-black/30 underline-offset-3 hover:decoration-signal-ink"
        >
          Privacy policy
        </Link>
      </p>
      <div className="mt-2.5 flex items-center gap-2">
        <button
          type="button"
          onClick={decline}
          className="min-h-8 border border-black/30 px-3 text-[11.5px] font-semibold text-ink-deep transition-colors hover:border-signal-ink hover:text-signal-ink"
        >
          Reject analytics
        </button>
        <button
          type="button"
          onClick={accept}
          className="min-h-8 bg-signal-ink px-3 text-[11.5px] font-semibold text-white"
        >
          Accept analytics
        </button>
      </div>
    </aside>
  );
}
