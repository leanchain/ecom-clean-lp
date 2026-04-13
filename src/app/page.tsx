import BeforeAfterAISection from "@/components/beseam/before-after-ai-section";
import FaqSection from "@/components/beseam/faq-section";
import FinalCtaSection from "@/components/beseam/final-cta-section";
import FindsFixesSection from "@/components/beseam/finds-fixes-section";
import HeroSection from "@/components/beseam/hero-section";
import HowItWorksSection from "@/components/beseam/how-it-works-section";
import OutcomesSection from "@/components/beseam/outcomes-section";
import ProblemSection from "@/components/beseam/problem-section";
import TrustSection from "@/components/beseam/trust-section";
import WorkspacePreviewSection from "@/components/beseam/workspace-preview-section";
import CookieConsent from "@/components/cookie-consent";

export default function Home() {
  return (
    <>
      {/* 1. Hero — category-defining headline + CTAs */}
      <HeroSection />

      {/* 2. Product surface — calm workspace mockup */}
      <WorkspacePreviewSection />

      {/* 3. Platform pillars — 4 stable product areas */}
      <OutcomesSection />

      {/* 4. Business value — 3 outcome props */}
      <ProblemSection />

      {/* 6. Before/After — how AI interprets your store */}
      <BeforeAfterAISection />

      {/* 7. Trust — social proof, compliance, enterprise */}
      <TrustSection />

      {/* 8. FAQ */}
      <FaqSection />

      {/* 9. Final CTA */}
      <FinalCtaSection />

      <CookieConsent />
    </>
  );
}
