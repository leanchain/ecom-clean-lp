"use client";

import { useEffect } from "react";
import Script from "next/script";

import { useCookieConsent } from "@/contexts/CookieConsentContext";

export function AnalyticsScripts() {
  const { status } = useCookieConsent();

  const ENABLE_ANALYTICS = process.env.NEXT_PUBLIC_ENABLE_ANALYTICS !== "false";
  const GA_MEASUREMENT_ID =
    process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-GT7632NCQT";
  const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || "GTM-K5XM33MJ";

  // Update consent state whenever status changes (handles initial load and user interaction)
  useEffect(() => {
    if (!ENABLE_ANALYTICS || typeof window === "undefined" || !(window as any).gtag) {
      return;
    }

    if (status === "accepted") {
      (window as any).gtag("consent", "update", {
        "ad_storage": "granted",
        "ad_user_data": "granted",
        "ad_personalization": "granted",
        "analytics_storage": "granted"
      });
    } else if (status === "declined") {
      (window as any).gtag("consent", "update", {
        "ad_storage": "denied",
        "ad_user_data": "denied",
        "ad_personalization": "denied",
        "analytics_storage": "denied"
      });
    }
  }, [status, ENABLE_ANALYTICS]);

  // Only render if analytics are enabled and ID is present
  if (!ENABLE_ANALYTICS || !GA_MEASUREMENT_ID) {
    return null;
  }

  return (
    <>
      {/* Google Consent Mode v2 Initialization */}
      <Script id="google-consent-mode" strategy="beforeInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          
          // Set regional defaults for EEA + UK + CH
          // Default to 'denied' only in regions where it's legally required
          gtag('consent', 'default', {
            'ad_storage': 'denied',
            'ad_user_data': 'denied',
            'ad_personalization': 'denied',
            'analytics_storage': 'denied',
            'region': ['AT', 'BE', 'BG', 'CY', 'CZ', 'DE', 'DK', 'EE', 'ES', 'FI', 'FR', 'GR', 'HR', 'HU', 'IE', 'IS', 'IT', 'LI', 'LT', 'LU', 'LV', 'MT', 'NL', 'NO', 'PL', 'PT', 'RO', 'SE', 'SI', 'SK', 'GB', 'CH'],
            'wait_for_update': 500
          });

          // Set default consent to 'granted' for all other regions 
          // This fixes the "0% consent rate" warning for traffic outside EEA
          gtag('consent', 'default', {
            'ad_storage': 'granted',
            'ad_user_data': 'granted',
            'ad_personalization': 'granted',
            'analytics_storage': 'granted',
            'wait_for_update': 500
          });
        `}
      </Script>

      {/* Google Analytics (gtag.js) */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>

      {/* Google Tag Manager */}
      {GTM_ID && (
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');
          `}
        </Script>
      )}

      {/* GTM NoScript */}
      {GTM_ID && (
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="gtm-noscript"
          />
        </noscript>
      )}
    </>
  );
}
