import Link from "next/link";

import Logo from "@/components/beseam/logo";
import TrackedLink from "@/components/beseam/tracked-link";

const APP_REGISTER_URL = "https://app.beseam.com/register";
const PAGE_LINKS = [
  ["What Beseam sees", "/#scope"],
  ["How it works", "/#proof"],
  ["Live check", "/#ai-check"],
  ["30 days free", "/#promise"],
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
              Make products easier to find, choose, and buy.
            </p>
            <p className="mt-6 max-w-[62ch] text-[14px] leading-relaxed text-white/72">
              See where products lose ground, decide what to change, and measure
              what happened next.
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

        <div className="flex flex-wrap items-center gap-x-10 gap-y-4 border-b border-white/18 py-8">
          <Link
            href="/platform"
            className="text-[12px] text-white/62 hover:text-white"
          >
            Platform
          </Link>
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
            href="/bot"
            className="text-[12px] text-white/62 hover:text-white"
          >
            BeseamBot
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
            href={APP_REGISTER_URL}
            eventName="marketing_primary_cta_clicked"
            eventCategory="conversion"
            placement="footer_secondary"
            preserveUtm
            className="w-fit text-[12px] text-[#e8653a] underline decoration-white/20 underline-offset-5"
          >
            Start for free
          </TrackedLink>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-8 text-[12px] text-white/62">
          <p>© {new Date().getFullYear()} Beseam. All rights reserved.</p>
          <p className="inline-flex items-center gap-2">
            <span>Made with love in Switzerland</span>
            <span
              aria-label="Swiss flag"
              role="img"
              className="relative inline-block h-4 w-4 shrink-0 bg-[#d52b1e]"
            >
              <span className="absolute left-1/2 top-[3px] h-[10px] w-[3px] -translate-x-1/2 bg-white" />
              <span className="absolute left-[3px] top-1/2 h-[3px] w-[10px] -translate-y-1/2 bg-white" />
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
