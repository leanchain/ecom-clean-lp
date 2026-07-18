"use client";

import Script from "next/script";

import { useCookieConsent } from "@/contexts/CookieConsentContext";

export function AnalyticsScripts() {
  const { status } = useCookieConsent();
  const enabled = process.env.NEXT_PUBLIC_ENABLE_ANALYTICS !== "false";
  const measurementId =
    process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-GT7632NCQT";
  const tagManagerId = process.env.NEXT_PUBLIC_GTM_ID || "GTM-K5XM33MJ";

  if (!enabled || status !== "accepted") return null;

  if (tagManagerId) {
    const bootstrap =
      "window.dataLayer=window.dataLayer||[];" +
      "window.gtag=window.gtag||function(){window.dataLayer.push(arguments);};" +
      "(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':" +
      "new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0]," +
      "j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=" +
      "'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);" +
      "})(window,document,'script','dataLayer'," +
      JSON.stringify(tagManagerId) +
      ");";

    return (
      <Script id="google-tag-manager" strategy="afterInteractive">
        {bootstrap}
      </Script>
    );
  }

  const configure =
    "window.dataLayer=window.dataLayer||[];" +
    "window.gtag=window.gtag||function(){window.dataLayer.push(arguments);};" +
    "window.gtag('js',new Date());window.gtag('config'," +
    JSON.stringify(measurementId) +
    ",{page_path:window.location.pathname});";

  return (
    <>
      <Script
        src={"https://www.googletagmanager.com/gtag/js?id=" + measurementId}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {configure}
      </Script>
    </>
  );
}
