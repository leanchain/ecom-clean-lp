import Link from "next/link";

import Logo from "@/components/beseam/logo";
import TrackedLink from "@/components/beseam/tracked-link";

const PAGE_LINKS = [
  ["How it works", "/#how-it-works"],
  ["From miss to fix", "/#answer-check"],
  ["What leaves you out", "/#what-breaks"],
  ["First-month promise", "/#promise"],
] as const;

export default function BeseamFooter() {
  return (
    <footer className="bg-[#111318] text-white">
      <div className="mx-auto max-w-[92rem] px-5 pb-8 pt-14 sm:px-8 sm:pt-16 lg:px-10">
        <div className="grid gap-10 border-b border-white/18 pb-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:items-end lg:gap-20">
          <div>
            <Link href="/" aria-label="Beseam home" className="inline-flex">
              <Logo className="text-white" />
            </Link>
            <p className="mt-7 max-w-[20ch] font-display text-[34px] leading-[1.08] tracking-[-0.02em] text-white/92">
              Know when a valuable product disappears from view.
            </p>
            <p className="mt-6 max-w-[62ch] text-[14px] leading-relaxed text-white/72">
              Beseam monitors each product across your store, shopping feeds,
              search results, and product recommendations. Your team sees what
              changed, who should act, and whether the fix restored visibility.
            </p>
          </div>

          <nav
            aria-label="Page sections"
            className="border-t border-white/18 sm:flex sm:flex-wrap sm:items-center sm:gap-x-10"
          >
            {PAGE_LINKS.map(([label, href]) => (
              <Link
                key={label}
                href={href}
                className="block border-b border-white/14 py-4 text-[14px] font-semibold text-white/72 transition-colors last:border-b-0 hover:text-[#e8653a] sm:border-b-0 sm:py-5"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="grid gap-8 border-b border-white/18 py-8 sm:grid-cols-2 lg:grid-cols-[1fr_auto_auto_auto_auto_auto] lg:items-center lg:gap-10">
          <p className="font-mono text-[12px] tracking-[0.02em] text-white/72">
            Product visibility monitoring for ecommerce
          </p>
          <Link
            href="/resources"
            className="text-[12px] text-white/62 hover:text-white"
          >
            Resources
          </Link>
          <Link
            href="/about"
            className="text-[12px] text-white/62 hover:text-white"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="text-[12px] text-white/62 hover:text-white"
          >
            Contact us
          </Link>
          <Link
            href="/privacy-policy"
            className="text-[12px] text-white/62 hover:text-white"
          >
            Privacy
          </Link>
          <Link
            href="/terms-of-service"
            className="text-[12px] text-white/62 hover:text-white"
          >
            Terms
          </Link>
          <TrackedLink
            href="/product-visibility-monitoring"
            eventName="monitoring_setup_clicked"
            placement="footer_secondary"
            className="w-fit text-[12px] text-[#e8653a] underline decoration-white/20 underline-offset-5"
          >
            Set up catalog monitoring
          </TrackedLink>
        </div>

        <p className="pt-8 text-[12px] text-white/62">
          © {new Date().getFullYear()} Beseam. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
