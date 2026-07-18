"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import { Menu, X } from "lucide-react";

import BookReviewCta from "@/components/beseam/book-review-cta";
import TrackedLink from "@/components/beseam/tracked-link";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import NavbarLogo from "@/components/ui/navbar-logo";
import { cn } from "@/lib/utils";

const APP_LOGIN_URL = "https://app.beseam.com/login";

const NAV_LINKS = [
  { label: "Product", href: "/#product" },
  { label: "How it works", href: "/#how-it-works" },
  { label: "Who it’s for", href: "/#teams" },
  { label: "About", href: "/about" },
];

export default function BeseamNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-colors duration-200",
        scrolled
          ? "border-rule bg-surface/95 backdrop-blur-md"
          : "border-transparent bg-surface",
      )}
    >
      <a
        href="#main-content"
        className="absolute left-4 top-2 -translate-y-20 rounded-md bg-ink px-4 py-2 text-sm font-semibold text-white focus:translate-y-0"
      >
        Skip to content
      </a>
      <div className="mx-auto max-w-[88rem] px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center" aria-label="Beseam home">
            <NavbarLogo className="text-ink" />
          </Link>

          <nav
            aria-label="Primary"
            className="hidden items-center gap-1 lg:flex"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="rounded-md px-3 py-2 text-[14px] font-medium text-muted-foreground transition-colors hover:text-ink focus-visible:ring-2 focus-visible:ring-primary"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <ThemeToggle />
            <TrackedLink
              href={APP_LOGIN_URL}
              eventName="login_clicked"
              placement="navbar"
              className="inline-flex min-h-11 items-center px-2 text-[14px] font-medium text-muted-foreground transition-colors hover:text-ink focus-visible:ring-2 focus-visible:ring-primary"
            >
              Log in
            </TrackedLink>
            <BookReviewCta
              location="navbar"
              label="Book a Store Health Review"
              className="min-h-10 px-5 py-2 text-[14px]"
            />
          </div>

          <div className="flex items-center gap-1 lg:hidden">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation"
              onClick={() => setMobileOpen((value) => !value)}
            >
              {mobileOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {mobileOpen ? (
        <div
          id="mobile-navigation"
          className="absolute inset-x-0 top-16 border-b border-rule bg-surface px-4 py-5 lg:hidden"
        >
          <nav aria-label="Mobile" className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-md px-3 py-3 text-[15px] font-medium text-ink hover:bg-panel focus-visible:ring-2 focus-visible:ring-primary"
              >
                {link.label}
              </Link>
            ))}
            <TrackedLink
              href={APP_LOGIN_URL}
              eventName="login_clicked"
              placement="navbar_mobile"
              onClick={() => setMobileOpen(false)}
              className="rounded-md px-3 py-3 text-[15px] font-medium text-muted-foreground hover:bg-panel focus-visible:ring-2 focus-visible:ring-primary"
            >
              Log in
            </TrackedLink>
          </nav>
          <div className="mt-4 border-t border-rule pt-4">
            <BookReviewCta location="navbar_mobile" className="w-full" />
          </div>
        </div>
      ) : null}
    </header>
  );
}
