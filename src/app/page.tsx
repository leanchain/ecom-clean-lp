import type { Metadata } from "next";

import EvidenceSection from "@/components/beseam/evidence-section";
import FaqSection from "@/components/beseam/faq-section";
import FinalCtaSection from "@/components/beseam/final-cta-section";
import FounderSection from "@/components/beseam/founder-section";
import HealthDomainsSection from "@/components/beseam/health-domains-section";
import HeroSection from "@/components/beseam/hero-section";
import MobileStickyCta from "@/components/beseam/mobile-sticky-cta";
import ProblemSection from "@/components/beseam/problem-section";
import ProofStrip from "@/components/beseam/proof-strip";
import StoreHealthModelSection from "@/components/beseam/store-health-model-section";
import TeamsSection from "@/components/beseam/teams-section";
import CookieConsent from "@/components/cookie-consent";
import { STORE_HEALTH_FAQS } from "@/lib/store-health-faqs";

export const metadata: Metadata = {
  title: { absolute: "Beseam — Store Health for Shopify" },
  description:
    "Monitor Shopify discoverability, technical SEO, purchase-health signals and source freshness in one evidence-backed workspace. See what changed and what to fix first.",
  alternates: { canonical: "/" },
};

export default function Home() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: STORE_HEALTH_FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <HeroSection />
      <ProofStrip />
      <ProblemSection />
      <HealthDomainsSection />
      <StoreHealthModelSection />
      <EvidenceSection />
      <TeamsSection />
      <FounderSection />
      <FaqSection />
      <FinalCtaSection />
      <MobileStickyCta />
      <CookieConsent />
    </>
  );
}
