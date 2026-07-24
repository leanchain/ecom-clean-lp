import type { Metadata } from "next";

import FaqSection from "@/components/beseam/faq-section";
import MobileStickyCta from "@/components/beseam/mobile-sticky-cta";
import ProductionHomepage from "@/components/beseam/production-homepage";
import CookieConsent from "@/components/cookie-consent";
import { STORE_HEALTH_FAQS } from "@/lib/store-health-faqs";

export const metadata: Metadata = {
  title: { absolute: "Beseam: The self-improving revenue layer for commerce" },
  description:
    "Beseam sits on top of your existing commerce stack to observe customer behavior, find revenue leakage, adapt experiences, orchestrate approved fixes, and learn from verified commercial outcomes.",
  alternates: { canonical: "/" },
};

export default function Home() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    name: "Beseam commerce revenue platform questions",
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
