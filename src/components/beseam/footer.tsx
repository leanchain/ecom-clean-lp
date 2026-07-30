import Link from "next/link";

import Logo from "@/components/beseam/logo";
import TrackedLink from "@/components/beseam/tracked-link";

const PAGE_LINKS = [
  ["How it works", "/#how-it-works"],
  ["Before and after", "/#answer-check"],
  ["What leaves you out", "/#what-breaks"],
  ["First-month promise", "/#promise"],
] as const;

export default function BeseamFooter() {
  return (
    <footer className="bg-[#111318] text-white">
      <div className="mx-auto max-w-[92rem] px-5 pb-8 pt-16 sm:px-8 sm:pt-20 lg:px-10">
        <div className="grid gap-12 border-b border-white/18 pb-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20">
          <div>
            <Link href="/" aria-label="Beseam home" className="inline-flex">
              <Logo className="text-white" />
            </Link>
            <p className="mt-7 max-w-md font-serif text-[34px] leading-[1.08] tracking-[-0.03em] text-white/92">
              Know when a valuable product disappears from view.
            </p>
            <p className="mt-6 max-w-md text-[14px] leading-relaxed text-white/52">
              Beseam monitors each product across your store, shopping feeds,
              search results, and product recommendations. Your team sees what
              changed, who should act, and whether the fix restored visibility.
            </p>
          </div>

          <div className="grid border-y border-white/18 sm:grid-cols-2">
            {PAGE_LINKS.map(([label, href]) => (
              <Link
                key={label}
                href={href}
                className="border-b border-white/14 py-5 text-[14px] font-semibold text-white/62 transition-colors hover:text-[#e8653a] sm:border-r sm:px-6 sm:nth-[3]:border-b-0 sm:nth-[4]:border-b-0 sm:nth-[2n]:border-r-0"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>

        <div className="grid gap-8 border-b border-white/18 py-8 sm:grid-cols-2 lg:grid-cols-[1fr_auto_auto_auto_auto_auto] lg:items-center lg:gap-10">
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-white/34">
            Product visibility monitoring for ecommerce
          </p>
          <Link
            href="/resources"
            className="text-[12px] text-white/48 hover:text-white"
          >
            Resources
          </Link>
          <Link
            href="/about"
            className="text-[12px] text-white/48 hover:text-white"
          >
            Company
          </Link>
          <Link
            href="/privacy-policy"
            className="text-[12px] text-white/48 hover:text-white"
          >
            Privacy
          </Link>
          <Link
            href="/terms-of-service"
            className="text-[12px] text-white/48 hover:text-white"
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

        <p className="pt-8 text-[11px] text-white/34">
          © {new Date().getFullYear()} Beseam. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
