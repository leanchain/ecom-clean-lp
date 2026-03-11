import CookieConsent from "@/components/cookie-consent";
import HeroSection from "@/components/beseam/hero-section";
import ClientLogos from "@/components/client-logos";
import BuyerJourneySection from "@/components/beseam/buyer-journey-section";
import HowItWorksSection from "@/components/beseam/how-it-works-section";
import BeforeAfterSection from "@/components/beseam/before-after-section";
import FaqSection from "@/components/beseam/faq-section";
import FinalCtaSection from "@/components/beseam/final-cta-section";

export default function Home() {
  return (
    <>
      <HeroSection />
      <ClientLogos />
      <BuyerJourneySection />
      <HowItWorksSection />
      <BeforeAfterSection />
      <FaqSection />
      <FinalCtaSection />
      <CookieConsent />
    </>
  );
}
