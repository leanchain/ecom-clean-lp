import ChatWidget from "@/components/chat-widget";
import ClientLogos from "@/components/client-logos";
import { Compare2 } from "@/components/compare2";
import CookieConsent from "@/components/cookie-consent";
import { Faq9 } from "@/components/faq9";
import { Feature57 } from "@/components/feature57";
import { Gallery25 } from "@/components/gallery25";
import { Hero230 } from "@/components/hero230";
import { Integration1 } from "@/components/integration1";
import MetricsBar from "@/components/metrics-bar";
import AiTestPreview from "@/components/sections/ai-test-preview";
import AuditTryout from "@/components/sections/audit-tryout";
import FeaturedPartners from "@/components/sections/featured-partners";
import FinalCta from "@/components/sections/final-cta";
import HowItWorks from "@/components/sections/how-it-works";
import RoiCalculator from "@/components/sections/roi-calculator";
import Testimonials from "@/components/sections/testimonials";
import VideoDemo from "@/components/sections/video-demo";
import { Stats18 } from "@/components/stats18";
import StickyCTA from "@/components/sticky-cta";
import TrustBadges from "@/components/trust-badges";

export default function Home() {
  return (
    <>
      {/* Hero - First impression, clear value prop */}
      <Hero230 />

      {/* Social Proof - Build trust immediately */}
      <ClientLogos />

      {/* Key Metrics - Quick value props */}
      <MetricsBar />

      {/* Stats & AI Platforms - Show the opportunity */}
      <Stats18 />

      {/* Audit CTA - Low commitment entry point */}
      <AuditTryout />

      {/* How It Works - Simple 3-step process */}
      <HowItWorks />

      {/* Video Demo - Show the product in action */}
      <VideoDemo />

      {/* AI Media Studio - Core features */}
      <Feature57 />

      {/* Gallery - Visual proof of capabilities */}
      <Gallery25 />

      {/* Before/After Comparison - Show transformation */}
      <Compare2 />

      {/* AI Test Preview - Show how AI engines see your products */}
      <AiTestPreview />

      {/* Testimonials - Social proof with specifics */}
      <Testimonials />

      {/* ROI Calculator - Quantify the value */}
      <RoiCalculator />

      {/* Trust Badges - Security and reliability */}
      <TrustBadges />

      {/* Integrations - Show compatibility */}
      <Integration1 />

      {/* Featured Partners - Affiliate / ecosystem */}
      <FeaturedPartners />

      {/* FAQ - Handle objections */}
      <Faq9 />

      {/* Final CTA - Strong close with urgency */}
      <FinalCta />

      {/* Sticky CTA - Always visible action */}
      <StickyCTA />

      {/* Chat Widget - Bottom right */}
      <ChatWidget />

      {/* Cookie Consent Popup */}
      <CookieConsent />
    </>
  );
}
