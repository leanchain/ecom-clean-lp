import type { Metadata } from "next";

import FaqSection from "@/components/beseam/faq-section";
import MobileStickyCta from "@/components/beseam/mobile-sticky-cta";
import ProductionHomepage from "@/components/beseam/production-homepage";
import CookieConsent from "@/components/cookie-consent";
import { HOME_SOCIAL_IMAGE, buildPublicMetadata } from "@/lib/seo";
import { STORE_HEALTH_FAQS } from "@/lib/store-health-faqs";

export const metadata: Metadata = buildPublicMetadata({
  title: "Beseam | Get more shoppers to choose you",
  description:
    "Beseam helps ecommerce teams see where shoppers overlook their products, choose something else, or stop before buying, then understand what to improve and measure what happens next.",
  path: "/",
  image: HOME_SOCIAL_IMAGE,
  imageAlt:
    "Beseam showing where shoppers find, choose, and buy products",
});

export default function Home() {
  const pageJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://beseam.com/#webpage",
        url: "https://beseam.com/",
        name: "Beseam | Get more shoppers to choose you",
        description:
          "Beseam helps ecommerce teams see where shoppers overlook their products, choose something else, or stop before buying, then understand what to improve and measure what happens next.",
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
          "Beseam helps ecommerce teams make products easier to find, choose, and buy by connecting shopper questions, store evidence, behavior, supported changes, and what happened afterward.",
        featureList: [
          "See where shoppers overlook products or choose something else",
          "Understand likely explanations with source evidence attached",
          "Act on what matters under merchant approval rules",
          "Measure what happens after the action",
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
