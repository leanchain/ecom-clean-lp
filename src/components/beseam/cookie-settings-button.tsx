"use client";

import { useCookieConsent } from "@/contexts/CookieConsentContext";

export default function CookieSettingsButton() {
  const { reset } = useCookieConsent();

  return (
    <button
      type="button"
      onClick={reset}
      className="min-h-11 text-left text-[14px] text-foreground transition-colors hover:text-primary focus-visible:ring-2 focus-visible:ring-primary"
    >
      Cookie settings
    </button>
  );
}
