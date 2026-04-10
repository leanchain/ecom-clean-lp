import AiPlatformsStrip from "@/components/beseam/ai-platforms-strip";
import BuyerJourneySection from "@/components/beseam/buyer-journey-section";
import BeforeAfterAISection from "@/components/beseam/before-after-ai-section";
import OutcomesSection from "@/components/beseam/outcomes-section";
import DifferentiationSection from "@/components/beseam/differentiation-section";
import IdealCustomerSection from "@/components/beseam/ideal-customer-section";
import FaqSection from "@/components/beseam/faq-section";
import FinalCtaSection from "@/components/beseam/final-cta-section";
import HeroSection from "@/components/beseam/hero-section";
import HowItWorksSection from "@/components/beseam/how-it-works-section";
import ProblemSection from "@/components/beseam/problem-section";
import CookieConsent from "@/components/cookie-consent";

export default function Home() {
  return (
    <>
      <HeroSection />
      <AiPlatformsStrip />
      <ProblemSection />
      {/* <BuyerJourneySection /> */}
      <HowItWorksSection />
      <BeforeAfterAISection />
      {/* <OutcomesSection /> */}
      {/* <DifferentiationSection /> */}
      {/* <IdealCustomerSection /> */}
      <FaqSection />
      <FinalCtaSection />
      <CookieConsent />
    </>
  );
}
