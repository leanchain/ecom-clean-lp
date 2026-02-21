"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useCookieConsent } from "@/contexts/CookieConsentContext";

const CookieConsent = () => {
  const { status, accept, decline } = useCookieConsent();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (status === "undecided") {
      // Show popup after a short delay
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [status]);

  const handleAccept = () => {
    accept();
    // Update Google Analytics consent mode immediately
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("consent", "update", {
        ad_storage: "granted",
        ad_user_data: "granted",
        ad_personalization: "granted",
        analytics_storage: "granted",
      });
    }
    setIsVisible(false);
  };

  const handleDecline = () => {
    decline();
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50 max-w-sm animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="rounded-2xl border bg-card p-5 shadow-xl">
        <button
          onClick={handleDecline}
          className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="pr-6">
          <p className="text-sm text-foreground">
            Like many websites, we use cookies to enhance your experience and
            analyze site usage.
          </p>
          <Link
            href="/privacy-policy"
            className="mt-1 inline-block text-xs text-primary hover:underline"
          >
            Learn more about our cookie policy
          </Link>
        </div>

        <div className="mt-4 flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleDecline}
            className="flex-1 rounded-full text-sm"
          >
            Decline
          </Button>
          <Button
            size="sm"
            onClick={handleAccept}
            className="flex-1 rounded-full text-sm"
          >
            Accept
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
