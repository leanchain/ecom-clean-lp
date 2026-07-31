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

  /*
   * A short bottom bar rather than a card: the card sat over the hero scan
   * field on first paint and covered the sticky CTA slot on mobile. Keeping the
   * bar one row tall on desktop and two on mobile means it can only ever sit
   * below the fold's content, never on top of the primary conversion field.
   */
  return (
    <aside
      aria-label="Cookie choices"
      className="fixed inset-x-0 bottom-0 z-50 border-t-2 border-[#111318] bg-[#ffffff]"
    >
      <div className="mx-auto flex max-w-[92rem] flex-col gap-3 px-5 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:px-8 lg:px-10">
        <p className="max-w-[68ch] text-[13px] leading-relaxed text-black/62">
          Essential cookies keep the site working. Optional analytics load only
          after you accept.{" "}
          <Link
            href="/privacy-policy"
            className="font-semibold text-[#b8441d] underline decoration-black/30 underline-offset-4 hover:decoration-[#b8441d]"
          >
            Privacy policy
          </Link>
        </p>
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={decline}
            className="min-h-10 border border-black/40 px-4 text-[13px] font-semibold text-[#111318] transition-colors hover:border-[#b8441d] hover:text-[#b8441d]"
          >
            Reject analytics
          </button>
          <button
            type="button"
            onClick={accept}
            className="min-h-10 bg-[#111318] px-4 text-[13px] font-semibold text-white transition-colors hover:bg-[#b8441d]"
          >
            Accept analytics
          </button>
        </div>
      </div>
    </aside>
  );
}
