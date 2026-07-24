import type { Metadata } from "next";

import FaqSection from "@/components/beseam/faq-section";
import MobileStickyCta from "@/components/beseam/mobile-sticky-cta";
import ProductionHomepage from "@/components/beseam/production-homepage";
import CookieConsent from "@/components/cookie-consent";
import { STORE_HEALTH_FAQS } from "@/lib/store-health-faqs";

export const metadata: Metadata = {
  title: { absolute: "Beseam | Find the revenue leaks between your commerce systems" },
  description:
    "Beseam checks your storefront, catalog, customer journeys, AI discovery, and campaigns together, shows which issue deserves attention first, and verifies what changed after your team acts.",
  alternates: { canonical: "/" },
};

export default function Home() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    name: "Questions about Beseam products, access, and revenue measurement",
    mainEntity: STORE_HEALTH_FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <ProductionHomepage />
      <FaqSection />
      <MobileStickyCta />
      <CookieConsent />
    </>
  );
}
