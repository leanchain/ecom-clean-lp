import Link from "next/link";

import CookieSettingsButton from "@/components/beseam/cookie-settings-button";
import TrackedLink from "@/components/beseam/tracked-link";
import Logo from "@/components/ui/logo";

const APP_LOGIN_URL = "https://app.beseam.com/login";

const PRODUCT_LINKS = [
  { label: "All products", href: "/#products" },
  { label: "AI Visibility", href: "/ai-visibility-monitoring" },
  { label: "Commerce Readiness", href: "/shopify-store-health" },
  { label: "Advertising", href: "/#advertising" },
  { label: "Advanced Intelligence", href: "/#advanced-intelligence" },
  { label: "Creative Studio", href: "/#creative-studio" },
];

const PLATFORM_LINKS = [
  { label: "Revenue layer", href: "/#platform" },
  { label: "Self-improving agent", href: "/#agent-loop" },
  { label: "Packages and entitlements", href: "/#packages" },
  { label: "Commerce review", href: "/store-health-review" },
];

export default function BeseamFooter() {
  return (
    <footer className="border-t border-rule bg-surface">
      <div className="mx-auto max-w-[88rem] px-6 py-12 md:py-16">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1.2fr)] lg:gap-20">
          <div className="max-w-xl">
            <Logo className="origin-left scale-[2.5] text-ink" />
            <p className="mt-8 text-[17px] font-medium leading-relaxed text-ink">The self-improving revenue layer for modern commerce.</p>
            <p className="mt-4 max-w-lg text-[13px] leading-relaxed text-muted-foreground">Beseam observes your existing stack, finds revenue leakage, adapts experiences through governed intelligence, and verifies what changed.</p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            <div><h2 className="text-[12px] font-semibold text-muted-foreground">Products</h2><ul className="mt-3 space-y-1 text-[14px]">{PRODUCT_LINKS.map((item)=><li key={item.href}><Link className="inline-flex min-h-10 items-center text-foreground hover:text-primary" href={item.href}>{item.label}</Link></li>)}</ul></div>
            <div><h2 className="text-[12px] font-semibold text-muted-foreground">Platform</h2><ul className="mt-3 space-y-1 text-[14px]">{PLATFORM_LINKS.map((item)=><li key={item.href}><Link className="inline-flex min-h-10 items-center text-foreground hover:text-primary" href={item.href}>{item.label}</Link></li>)}</ul></div>
            <div><h2 className="text-[12px] font-semibold text-muted-foreground">Company</h2><ul className="mt-3 space-y-1 text-[14px]"><li><Link className="inline-flex min-h-10 items-center text-foreground hover:text-primary" href="/about">About</Link></li><li><a className="inline-flex min-h-10 items-center text-foreground hover:text-primary" href="mailto:contact@beseam.com">Contact</a></li><li><a className="inline-flex min-h-10 items-center text-foreground hover:text-primary" href="https://www.linkedin.com/company/beseam/" target="_blank" rel="noopener noreferrer">LinkedIn</a></li><li><TrackedLink href={APP_LOGIN_URL} eventName="login_clicked" placement="footer" className="inline-flex min-h-10 items-center text-foreground hover:text-primary">Log in</TrackedLink></li></ul></div>
            <div><h2 className="text-[12px] font-semibold text-muted-foreground">Legal</h2><ul className="mt-3 space-y-1 text-[14px]"><li><Link className="inline-flex min-h-10 items-center text-foreground hover:text-primary" href="/privacy-policy">Privacy</Link></li><li><Link className="inline-flex min-h-10 items-center text-foreground hover:text-primary" href="/terms-of-service">Terms</Link></li><li><CookieSettingsButton /></li></ul></div>
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-3 border-t border-rule pt-6 text-[13px] text-muted-foreground sm:flex-row sm:items-center sm:justify-between"><p>© {new Date().getFullYear()} Beseam. All rights reserved.</p><TrackedLink href="/tools/ai-visibility-scan" eventName="scanner_tool_clicked" placement="footer_secondary" className="w-fit text-muted-foreground underline-offset-4 hover:text-ink hover:underline">Try the AI visibility scan</TrackedLink></div>
      </div>
    </footer>
  );
}
