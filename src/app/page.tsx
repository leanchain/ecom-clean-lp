import type { Metadata } from "next";

import FaqSection from "@/components/beseam/faq-section";
import MobileStickyCta from "@/components/beseam/mobile-sticky-cta";
import ProductionHomepage from "@/components/beseam/production-homepage";
import CookieConsent from "@/components/cookie-consent";
import { STORE_HEALTH_FAQS } from "@/lib/store-health-faqs";

export const metadata: Metadata = {
  title: {
    absolute: "Beseam | Make products easier to find, choose, and buy",
  },
  description:
    "See where products lose shoppers across AI, search, onsite discovery, product pages, and conversion. Beseam shows what to fix, helps make the change, and measures what happened next.",
  alternates: { canonical: "/" },
};

export default function Home() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    name: "Questions about Beseam ecommerce discovery and conversion optimization",
    mainEntity: STORE_HEALTH_FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <ProductionHomepage />
      <FaqSection />
      <MobileStickyCta />
      <CookieConsent />
    </>
  );
}
