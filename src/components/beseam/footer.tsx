import Link from "next/link";

import CookieSettingsButton from "@/components/beseam/cookie-settings-button";
import TrackedLink from "@/components/beseam/tracked-link";
import Logo from "@/components/ui/logo";

const APP_LOGIN_URL = "https://app.beseam.com/login";

const PRODUCT_LINKS = [
  { label: "Store Health", href: "/shopify-store-health" },
  { label: "Purchase Health", href: "/purchase-health" },
  { label: "Discoverability", href: "/discoverability-health" },
  { label: "Monitoring coverage", href: "/monitoring-coverage" },
];

export default function BeseamFooter() {
  return (
    <footer className="border-t border-rule bg-surface">
      <div className="mx-auto max-w-6xl px-6 py-12 md:py-14">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1.15fr)] lg:gap-16">
          <div className="max-w-md">
            <Logo className="origin-left scale-[2.5] text-ink" />
            <p className="mt-7 text-[15px] leading-relaxed text-foreground">
              Beseam helps Shopify teams detect and resolve changes that affect
              discoverability and purchasing.
            </p>
            <p className="mt-4 text-[13px] leading-relaxed text-muted-foreground">
              Evidence from Shopify, Search Console, technical checks and
              observed storefront signals—with source freshness kept visible.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            <div>
              <h2 className="text-[12px] font-semibold text-muted-foreground">
                Product
              </h2>
              <ul className="mt-3 space-y-1 text-[14px]">
                {PRODUCT_LINKS.map((item) => (
                  <li key={item.href}>
                    <Link
                      className="inline-flex min-h-11 items-center text-foreground hover:text-primary"
                      href={item.href}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <TrackedLink
                    href={APP_LOGIN_URL}
                    eventName="login_clicked"
                    placement="footer"
                    className="inline-flex min-h-11 items-center text-foreground hover:text-primary"
                  >
                    Log in
                  </TrackedLink>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-[12px] font-semibold text-muted-foreground">
                Company
              </h2>
              <ul className="mt-3 space-y-1 text-[14px]">
                <li>
                  <Link
                    className="inline-flex min-h-11 items-center text-foreground hover:text-primary"
                    href="/about"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <a
                    className="inline-flex min-h-11 items-center text-foreground hover:text-primary"
                    href="mailto:contact@beseam.com"
                  >
                    Contact
                  </a>
                </li>
                <li>
                  <a
                    className="inline-flex min-h-11 items-center text-foreground hover:text-primary"
                    href="https://www.linkedin.com/company/beseam/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-[12px] font-semibold text-muted-foreground">
                Legal
              </h2>
              <ul className="mt-3 space-y-1 text-[14px]">
                <li>
                  <Link
                    className="inline-flex min-h-11 items-center text-foreground hover:text-primary"
                    href="/privacy-policy"
                  >
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link
                    className="inline-flex min-h-11 items-center text-foreground hover:text-primary"
                    href="/terms-of-service"
                  >
                    Terms
                  </Link>
                </li>
                <li>
                  <CookieSettingsButton />
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-rule pt-6 text-[13px] text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Beseam. All rights reserved.</p>
          <TrackedLink
            href="/tools/ai-visibility-scan"
            eventName="scanner_tool_clicked"
            placement="footer_secondary"
            className="w-fit text-muted-foreground underline-offset-4 hover:text-ink hover:underline"
          >
            Secondary tool: AI visibility scan
          </TrackedLink>
        </div>
      </div>
    </footer>
  );
}
