"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { useCookieConsent } from "@/contexts/CookieConsentContext";

export default function CookieConsent() {
  const { status, accept, decline } = useCookieConsent();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = status === "undecided" ? window.setTimeout(() => setIsVisible(true), 400) : undefined;
    if (status !== "undecided") setIsVisible(false);
    return () => {
      if (timer) window.clearTimeout(timer);
    };
  }, [status]);

  if (!isVisible) return null;

  return (
    <aside aria-label="Cookie choices" className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-sm border border-black/22 bg-[#f4f1e9] p-4 shadow-[0_20px_60px_rgba(17,19,24,0.18)] sm:left-5 sm:right-auto sm:mx-0 sm:p-5">
      <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-[#3154ff]">Privacy choices</p>
      <h2 className="mt-3 font-serif text-[23px] leading-tight tracking-[-0.02em] text-[#111318]">Keep analytics under your control.</h2>
      <p className="mt-3 text-[13px] leading-relaxed text-black/62">
        Essential cookies keep the site working. Optional analytics load only after you accept.
      </p>
      <Link href="/privacy-policy" className="mt-2 inline-flex min-h-9 items-center text-[12px] font-semibold text-black/60 underline decoration-black/20 underline-offset-5 hover:decoration-[#3154ff]">
        Read the privacy policy
      </Link>
      <div className="mt-3 grid grid-cols-2 gap-2">
        <button type="button" onClick={decline} className="min-h-10 border border-black/22 px-3 text-[12px] font-semibold text-[#111318] transition-colors hover:border-[#3154ff] hover:text-[#3154ff]">
          Reject analytics
        </button>
        <button type="button" onClick={accept} className="min-h-10 bg-[#111318] px-3 text-[12px] font-semibold text-white transition-colors hover:bg-[#3154ff]">
          Accept analytics
        </button>
      </div>
    </aside>
  );
}
