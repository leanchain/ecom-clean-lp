import CookieConsent from "@/components/cookie-consent";
import HeroSection from "@/components/beseam/hero-section";
import ClientLogos from "@/components/client-logos";
import HowItWorksSection from "@/components/beseam/how-it-works-section";
import FindsFixesSection from "@/components/beseam/finds-fixes-section";
import BeforeAfterSection from "@/components/beseam/before-after-section";
import FaqSection from "@/components/beseam/faq-section";
import FinalCtaSection from "@/components/beseam/final-cta-section";

export default function Home() {
  return (
    <>
      <HeroSection />
      <ClientLogos />
      <HowItWorksSection />
      <FindsFixesSection />
      <BeforeAfterSection />
      <FaqSection />
      <FinalCtaSection />
      <CookieConsent />
    </>
  );
}
