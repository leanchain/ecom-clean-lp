"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import { ArrowRight, Menu, X } from "lucide-react";

import Logo from "@/components/beseam/logo";
import TrackedLink from "@/components/beseam/tracked-link";
import { cn } from "@/lib/utils";

const APP_LOGIN_URL = "https://app.beseam.com/login";
const APP_REGISTER_URL = "https://app.beseam.com/register";

const NAV_LINKS = [
  { label: "How it works", href: "/#proof" },
  { label: "What Beseam fixes", href: "/#scope" },
  { label: "Results", href: "/#ai-check" },
  { label: "30 days free", href: "/#promise" },
] as const;

export default function BeseamNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-colors duration-200",
        "bg-[#fafafa]",
        scrolled ? "border-black/18" : "border-transparent",
      )}
    >
      <a
        href="#main-content"
        className="absolute left-4 top-2 -translate-y-20 bg-[#111318] px-4 py-2 text-sm font-semibold text-white focus:translate-y-0"
      >
        Skip to content
      </a>
      <div className="mx-auto max-w-[92rem] px-5 sm:px-8 lg:px-10">
        <div className="flex h-[4.5rem] items-center justify-between">
          <Link href="/" className="flex items-center" aria-label="Beseam home">
            <Logo className="text-[#111318]" markClassName="drop-shadow-none" />
          </Link>

          <nav aria-label="Primary" className="hidden items-center lg:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="min-h-11 whitespace-nowrap px-3 py-3 text-[14px] font-medium text-black/62 transition-colors hover:text-[#111318] focus-visible:ring-2 focus-visible:ring-[#b8441d] xl:px-4"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-5 lg:flex">
            <TrackedLink
              href={APP_LOGIN_URL}
              eventName="login_clicked"
              placement="navbar"
              className="text-[14px] font-semibold text-black/62 transition-colors hover:text-[#b8441d]"
            >
              Log in
            </TrackedLink>
            <TrackedLink
              href={APP_REGISTER_URL}
              eventName="marketing_primary_cta_clicked"
              eventCategory="conversion"
              placement="navbar"
              preserveUtm
              className="group inline-flex min-h-10 items-center justify-center gap-2 whitespace-nowrap bg-[#111318] px-4 text-[13px] font-semibold text-white transition-colors hover:bg-[#b8441d] focus-visible:ring-2 focus-visible:ring-[#b8441d] focus-visible:ring-offset-3"
            >
              Start for free
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </TrackedLink>
          </div>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center border border-black/40 text-[#111318] lg:hidden"
            onClick={() => setMobileOpen((open) => !open)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div
          id="mobile-navigation"
          className="border-t border-black/18 bg-[#fafafa] lg:hidden"
        >
          <div className="mx-auto max-w-[92rem] px-5 pb-7 sm:px-8">
            <nav aria-label="Mobile" className="border-b border-black/18 py-3">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block border-b border-black/14 py-4 text-[14px] font-semibold text-black/68 last:border-b-0"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <TrackedLink
                href={APP_LOGIN_URL}
                eventName="login_clicked"
                placement="mobile_nav"
                className="flex min-h-12 items-center justify-center border border-black/40 text-[14px] font-semibold text-[#111318]"
              >
                Log in
              </TrackedLink>
              <TrackedLink
                href={APP_REGISTER_URL}
                eventName="marketing_primary_cta_clicked"
                eventCategory="conversion"
                placement="mobile_nav"
                preserveUtm
                onClick={() => setMobileOpen(false)}
                className="flex min-h-12 items-center justify-center gap-2 bg-[#111318] px-5 text-[14px] font-semibold text-white"
              >
                Start for free
                <ArrowRight className="h-4 w-4" />
              </TrackedLink>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
