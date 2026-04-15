import BeforeAfterAISection from "@/components/beseam/before-after-ai-section";
import FaqSection from "@/components/beseam/faq-section";
import FinalCtaSection from "@/components/beseam/final-cta-section";
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
      {/* 1. Hero — low-friction audit CTA */}
      <HeroSection />

      {/* 2. Proof — sample report output */}
      <BeforeAfterAISection />

      {/* 3. Workflow — how the scan turns into action */}
      <HowItWorksSection />

      {/* 4. Product surface — workspace preview */}
      <WorkspacePreviewSection />

      {/* 5. Platform — what happens after the scan */}
      <OutcomesSection />

      {/* 6. Business value — why this matters */}
      <ProblemSection />

      {/* 7. Trust — security, proof, and operational safeguards */}
      <TrustSection />

      {/* 8. FAQ */}
      <FaqSection />

      {/* 9. Final CTA */}
      <FinalCtaSection />

      <CookieConsent />
    </>
  );
}
