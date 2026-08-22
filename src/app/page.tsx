import type { Metadata } from "next";

import FaqSection from "@/components/beseam/faq-section";
import MobileStickyCta from "@/components/beseam/mobile-sticky-cta";
import ProductionHomepage from "@/components/beseam/production-homepage";
import CookieConsent from "@/components/cookie-consent";
import { HOME_SOCIAL_IMAGE, buildPublicMetadata } from "@/lib/seo";
import { STORE_HEALTH_FAQS } from "@/lib/store-health-faqs";

export const metadata: Metadata = buildPublicMetadata({
  title: "Beseam | Make products easier to find, choose, and buy",
  description:
    "Beseam shows where products lose shoppers across discovery and the store, helps teams understand what may explain it, make supported changes, and measure what changed in behavior, conversion, orders, and revenue.",
  path: "/",
  image: HOME_SOCIAL_IMAGE,
  imageAlt:
    "Beseam connecting discovery, store, behavior, and revenue evidence",
});

export default function Home() {
  const pageJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://beseam.com/#webpage",
        url: "https://beseam.com/",
        name: "Beseam | Make products easier to find, choose, and buy",
        description:
          "Beseam shows where products lose shoppers across discovery and the store, helps teams understand what may explain it, make supported changes, and measure what happened next.",
        about: { "@id": "https://beseam.com/#organization" },
        inLanguage: "en",
      },
      {
        "@type": "SoftwareApplication",
        "@id": "https://beseam.com/#software",
        name: "Beseam",
        url: "https://beseam.com/",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        description:
          "Beseam connects discovery, store, shopper behavior, conversion, orders, and revenue so teams can understand a commercial problem, decide what deserves action, make supported changes, and measure what changed afterward.",
        featureList: [
          "Observe connected discovery, store, behavior, and revenue signals",
          "Understand likely explanations with source evidence attached",
          "Decide what deserves action",
          "Act under merchant approval rules",
          "Learn from relevant signals after the action",
        ],
        publisher: { "@id": "https://beseam.com/#organization" },
      },
      {
        "@type": "FAQPage",
        "@id": "https://beseam.com/#faq",
        name: "Questions about Beseam",
        mainEntity: STORE_HEALTH_FAQS.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }}
      />
      <ProductionHomepage />
      <FaqSection />
      <MobileStickyCta />
      <CookieConsent />
    </>
  );
}
