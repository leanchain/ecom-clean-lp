import ChatWidget from "@/components/chat-widget";
import ClientLogos from "@/components/client-logos";
import { Compare2 } from "@/components/compare2";
import CookieConsent from "@/components/cookie-consent";
import { Faq9 } from "@/components/faq9";
import { Hero230 } from "@/components/hero230";
import { Integration1 } from "@/components/integration1";
import MetricsBar from "@/components/metrics-bar";
import AiTestPreview from "@/components/sections/ai-test-preview";
import AuditTryout from "@/components/sections/audit-tryout";
import DashboardScroll from "@/components/sections/dashboard-scroll";
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
      {/* Hero - Outcome-focused hook + dual CTA */}
      <Hero230 />

      {/* Social Proof - Build trust immediately */}
      <ClientLogos />

      {/* How It Works - Numbered 01/02/03 flow */}
      <HowItWorks />
      {/* Dashboard - Platform Preview scroll-driven tabs */}
      <DashboardScroll />

      {/* AI Agents - 6 specialized agents */}
      <AiTestPreview />

      {/* Guardrails - Versioning + staged rollout */}
      <Compare2 />

      {/* Testimonials - Social proof */}
      <Testimonials />
      {/* Audit CTA - Low commitment baseline entry point */}
      <AuditTryout />
      {/* Integrations - Show compatibility */}
      <Integration1 />

      {/* Featured Partners - Affiliate / ecosystem */}
      <FeaturedPartners />

      {/* FAQ - Top 6 objection-busters */}
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
