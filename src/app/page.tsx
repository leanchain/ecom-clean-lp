import type { Metadata } from "next";

import FaqSection from "@/components/beseam/faq-section";
import MobileStickyCta from "@/components/beseam/mobile-sticky-cta";
import ProductionHomepage from "@/components/beseam/production-homepage";
import CookieConsent from "@/components/cookie-consent";
import { STORE_HEALTH_FAQS } from "@/lib/store-health-faqs";

export const metadata: Metadata = {
  title: {
    absolute: "Beseam | Be the answer when a shopper asks what to buy",
  },
  description:
    "Beseam runs your customers' buying questions against ChatGPT, Copilot, Perplexity, and Google AI Overviews, traces each miss to the product field behind it, publishes the fix to your store with one-click revert, and asks again to confirm the answer changed.",
  alternates: { canonical: "/" },
};

export default function Home() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    name: "Questions about Beseam product visibility monitoring",
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
