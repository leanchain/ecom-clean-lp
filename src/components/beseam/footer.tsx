import Link from "next/link";

import CookieSettingsButton from "@/components/beseam/cookie-settings-button";
import TrackedLink from "@/components/beseam/tracked-link";
import Logo from "@/components/ui/logo";
import { BookReviewCta } from "@/components/beseam/book-review-cta";

const APP_LOGIN_URL = "https://app.beseam.com/login";

const PRODUCT_LINKS = [
  { label: "Foundation", href: "/#foundation" },
  { label: "AI Visibility", href: "/ai-visibility-monitoring" },
  { label: "Commerce Readiness", href: "/shopify-store-health" },
  { label: "Advertising", href: "/#advertising" },
  { label: "Analytics", href: "/#advanced-intelligence" },
  { label: "Behavior", href: "/#advanced-intelligence" },
  { label: "Optimization", href: "/#advanced-intelligence" },
  { label: "Reliability", href: "/#advanced-intelligence" },
  { label: "Creative Studio", href: "/#creative-studio" },
] as const;

const PLATFORM_LINKS = [
  { label: "Revenue layer", href: "/#platform" },
  { label: "Self-improving agent", href: "/#agent-loop" },
  { label: "Packages and entitlements", href: "/#packages" },
  { label: "Commerce review", href: "/store-health-review" },
] as const;

const COMPANY_LINKS = [
  { label: "About", href: "/about" },
  { label: "Contact", href: "mailto:contact@beseam.com" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/beseam/", external: true },
] as const;

export default function BeseamFooter() {
  return (
    <footer className="bg-technical text-white">
      <div className="border-b border-white/10">
        <div className="mx-auto grid max-w-[88rem] gap-8 px-6 py-12 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:py-14">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.11em] text-brand">Autonomous revenue intelligence</p>
            <h2 className="mt-4 max-w-3xl text-[clamp(2rem,3.4vw,4rem)] font-bold leading-[1.04] tracking-[-0.04em] text-white">Put a revenue agent above the commerce stack you already run.</h2>
          </div>
          <BookReviewCta location="footer_cta" label="Book a platform demo" className="w-full border-white bg-white text-ink hover:bg-white/92 lg:w-auto" />
        </div>
      </div>

      <div className="mx-auto max-w-[88rem] px-6 py-14 md:py-16">
        <div className="grid gap-12 xl:grid-cols-[minmax(0,1.15fr)_minmax(0,1.85fr)] xl:gap-20">
          <div className="max-w-xl">
            <Logo className="origin-left scale-[2.5] text-white" />
            <p className="mt-9 text-[18px] font-medium leading-relaxed text-white">The self-improving revenue layer for modern commerce.</p>
            <p className="mt-4 max-w-lg text-[13px] leading-relaxed text-white/52">Beseam observes the existing stack from the outside, finds revenue leakage, recommends and orchestrates governed fixes, and verifies what changed.</p>
            <div className="mt-7 flex flex-wrap items-center gap-5 text-[13px]">
              <TrackedLink href={APP_LOGIN_URL} eventName="login_clicked" placement="footer" className="font-semibold text-white hover:text-brand">Log in</TrackedLink>
              <a href="mailto:contact@beseam.com" className="font-semibold text-white hover:text-brand">contact@beseam.com</a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4">
            <div>
              <h2 className="text-[11px] font-semibold uppercase tracking-[0.1em] text-white/38">Products</h2>
              <ul className="mt-4 space-y-1 text-[13px]">{PRODUCT_LINKS.map((item) => <li key={`${item.label}-${item.href}`}><Link className="inline-flex min-h-9 items-center text-white/68 transition-colors hover:text-brand" href={item.href}>{item.label}</Link></li>)}</ul>
            </div>
            <div>
              <h2 className="text-[11px] font-semibold uppercase tracking-[0.1em] text-white/38">Platform</h2>
              <ul className="mt-4 space-y-1 text-[13px]">{PLATFORM_LINKS.map((item) => <li key={item.href}><Link className="inline-flex min-h-9 items-center text-white/68 transition-colors hover:text-brand" href={item.href}>{item.label}</Link></li>)}</ul>
            </div>
            <div>
              <h2 className="text-[11px] font-semibold uppercase tracking-[0.1em] text-white/38">Company</h2>
              <ul className="mt-4 space-y-1 text-[13px]">{COMPANY_LINKS.map((item) => <li key={item.label}><a className="inline-flex min-h-9 items-center text-white/68 transition-colors hover:text-brand" href={item.href} target={"external" in item && item.external ? "_blank" : undefined} rel={"external" in item && item.external ? "noopener noreferrer" : undefined}>{item.label}</a></li>)}</ul>
            </div>
            <div>
              <h2 className="text-[11px] font-semibold uppercase tracking-[0.1em] text-white/38">Legal</h2>
              <ul className="mt-4 space-y-1 text-[13px]"><li><Link className="inline-flex min-h-9 items-center text-white/68 transition-colors hover:text-brand" href="/privacy-policy">Privacy</Link></li><li><Link className="inline-flex min-h-9 items-center text-white/68 transition-colors hover:text-brand" href="/terms-of-service">Terms</Link></li><li><CookieSettingsButton /></li></ul>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-6 text-[12px] text-white/38 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Beseam. All rights reserved.</p>
          <TrackedLink href="/tools/ai-visibility-scan" eventName="scanner_tool_clicked" placement="footer_secondary" className="w-fit text-white/48 underline-offset-4 hover:text-brand hover:underline">Try the AI visibility scan</TrackedLink>
        </div>
      </div>
    </footer>
  );
}
