"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import { Menu, X } from "lucide-react";

import BookReviewCta from "@/components/beseam/book-review-cta";
import Logo from "@/components/beseam/logo";
import TrackedLink from "@/components/beseam/tracked-link";
import { cn } from "@/lib/utils";

const APP_LOGIN_URL = "https://app.beseam.com/login";

const NAV_LINKS = [
  { label: "How it works", href: "/#how-it-works" },
  { label: "From miss to fix", href: "/#answer-check" },
  { label: "What leaves you out", href: "/#what-breaks" },
  { label: "First-month promise", href: "/#promise" },
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
            <Logo
              className="text-[#111318]"
              markClassName="drop-shadow-none"
            />
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
            <BookReviewCta
              location="navbar"
              label="See how monitoring works"
              className="min-h-10 whitespace-nowrap px-4 text-[13px]"
            />
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
              <BookReviewCta
                location="mobile_nav"
                label="See how monitoring works"
                className="w-full"
              />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
