import ChatWidget from "@/components/chat-widget";
import ClientLogos from "@/components/client-logos";
import { Compare2 } from "@/components/compare2";
import CookieConsent from "@/components/cookie-consent";
import { Faq9 } from "@/components/faq9";
import { Feature57 } from "@/components/feature57";
import { Hero230 } from "@/components/hero230";
import { Integration1 } from "@/components/integration1";
import MetricsBar from "@/components/metrics-bar";
import AiTestPreview from "@/components/sections/ai-test-preview";
import AuditTryout from "@/components/sections/audit-tryout";
import FeaturedPartners from "@/components/sections/featured-partners";
import FinalCta from "@/components/sections/final-cta";
import HowItWorks from "@/components/sections/how-it-works";
import Testimonials from "@/components/sections/testimonials";
import { Stats18 } from "@/components/stats18";
import StickyCTA from "@/components/sticky-cta";
import TrustBadges from "@/components/trust-badges";

export default function Home() {
  return (
    <>
      {/* Hero - Upgrade + Protect value prop */}
      <Hero230 />

      {/* Social Proof - Build trust immediately */}
      <ClientLogos />

      {/* Key Metrics - Core value props */}
      <MetricsBar />

      {/* The Loop - 7-step closed-loop system */}
      <Stats18 />

      {/* Audit CTA - Low commitment baseline entry point */}
      <AuditTryout />

      {/* How It Works - Upgrade → Deploy Safely → Monitor */}
      <HowItWorks />

      {/* Platform Preview - 4-tab product UI */}
      <Feature57 />

      {/* AI Agents - 6 specialized agents */}
      <AiTestPreview />

      {/* Guardrails - Versioning + staged rollout */}
      <Compare2 />

      {/* Testimonials - Social proof */}
      {/* <Testimonials /> */}

      {/* Trust Badges - Security and reliability */}
      <TrustBadges />

      {/* Integrations - Show compatibility */}
      <Integration1 />

      {/* Featured Partners - Affiliate / ecosystem */}
      {/* <FeaturedPartners /> */}

      {/* FAQ - Handle objections */}
      <Faq9 />

      {/* Final CTA - Strong close */}
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
