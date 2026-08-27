"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import { Menu, X } from "lucide-react";

import Logo from "@/components/beseam/logo";
import TrackedLink from "@/components/beseam/tracked-link";
import { SHOPIFY_APP_URL } from "@/lib/app-urls";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Why Beseam", href: "/#why" },
  { label: "Platform", href: "/platform" },
  { label: "How we work", href: "/how-we-work" },
  { label: "Benchmarks", href: "/benchmarks" },
] as const;

/** Pill CTA styled after app-fit.beseam.com/fit's "Add to Shopify" button. */
function AddToShopifyCta({
  placement,
  className,
}: {
  placement: string;
  className?: string;
}) {
  return (
    <TrackedLink
      href={SHOPIFY_APP_URL}
      eventName="shopify_admin_clicked"
      eventCategory="conversion"
      placement={placement}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full bg-primary font-bold text-primary-foreground shadow-sm transition-all hover:scale-[1.02] hover:bg-primary-hover active:scale-[0.98]",
        className,
      )}
    >
      <img
        src="/shopify.svg"
        alt=""
        className="h-4 w-auto brightness-0 invert"
      />
      Add to Shopify
    </TrackedLink>
  );
}

export default function BeseamNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky z-50 mx-auto border transition-all duration-200",
        scrolled
          ? "top-3 w-[calc(100%-1.5rem)] max-w-[95rem] rounded-none border-black/14 bg-ground/72 shadow-lg backdrop-blur-2xl"
          : "top-0 w-full border-x-transparent border-t-transparent border-b-black/10 bg-ground/92 backdrop-blur-md",
      )}
    >
      <a
        href="#main-content"
        className="absolute left-4 top-2 -translate-y-20 bg-ink-deep px-4 py-2 text-sm font-semibold text-white focus:translate-y-0"
      >
        Skip to content
      </a>

      <div
        className={cn(
          "mx-auto max-w-[92rem] transition-all duration-200",
          scrolled ? "px-3 sm:px-4 lg:px-5" : "px-4 sm:px-6 lg:px-8",
        )}
      >
        <div
          className={cn(
            "flex items-center justify-between transition-all duration-200",
            scrolled ? "h-14" : "h-16",
          )}
        >
          <Link href="/" className="flex items-center" aria-label="Beseam home">
            <Logo className="text-ink-deep" markClassName="drop-shadow-none" />
          </Link>

          <nav aria-label="Primary" className="hidden items-center lg:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="min-h-11 whitespace-nowrap px-3 py-3 text-[14px] font-medium text-black/62 transition-colors hover:text-ink-deep focus-visible:ring-2 focus-visible:ring-signal-ink xl:px-4"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex">
            <AddToShopifyCta
              placement="navbar"
              className="min-h-10 px-5 text-[13px]"
            />
          </div>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center border border-black/40 text-ink-deep lg:hidden"
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
          className={cn(
            "border-t border-black/18 lg:hidden",
            scrolled ? "bg-ground/88 backdrop-blur-2xl" : "bg-ground",
          )}
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
            <div className="mt-5">
              <AddToShopifyCta
                placement="mobile_nav"
                className="min-h-12 w-full px-5 text-[14px]"
              />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
