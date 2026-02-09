"use client";

import Script from "next/script";

import { useCookieConsent } from "@/contexts/CookieConsentContext";

export function AnalyticsScripts() {
  const { status } = useCookieConsent();

  // Hardcoded IDs for the landing page as requested
  const GA_MEASUREMENT_ID = "G-LRZQ9CJC4G";
  const GTM_ID = "GTM-PXFQP8G9";
  const ENABLE_ANALYTICS = true;

  // Only render if analytics are enabled, IDs are present, and user has accepted cookies
  if (!ENABLE_ANALYTICS || status !== "accepted" || !GA_MEASUREMENT_ID) {
    return null;
  }

  return (
    <>
      {/* Google Analytics (gtag.js) */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
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
