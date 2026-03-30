import CookieConsent from "@/components/cookie-consent";
import AiPlatformsStrip from "@/components/beseam/ai-platforms-strip";
import HeroSection from "@/components/beseam/hero-section";
import ProblemSection from "@/components/beseam/problem-section";
import HowItWorksSection from "@/components/beseam/how-it-works-section";
import BeforeAfterAISection from "@/components/beseam/before-after-ai-section";
import OutcomesSection from "@/components/beseam/outcomes-section";
import DifferentiationSection from "@/components/beseam/differentiation-section";
import IdealCustomerSection from "@/components/beseam/ideal-customer-section";
import FaqSection from "@/components/beseam/faq-section";
import FinalCtaSection from "@/components/beseam/final-cta-section";

export default function Home() {
  return (
    <>
      <HeroSection />
      <AiPlatformsStrip />
      <ProblemSection />
      <HowItWorksSection />
      <BeforeAfterAISection />
      <OutcomesSection />
      <DifferentiationSection />
      <IdealCustomerSection />
      <FaqSection />
      <FinalCtaSection />
      <CookieConsent />
    </>
  );
}
