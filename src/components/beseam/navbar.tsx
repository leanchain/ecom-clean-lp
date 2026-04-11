"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import { ArrowRight, Menu, X } from "lucide-react";

import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import NavbarLogo from "@/components/ui/navbar-logo";
import { cn } from "@/lib/utils";

const APP_RECENT_REPORTS_URL = "https://app.beseam.com/analyze";
const APP_SCAN_URL = "https://app.beseam.com/scan";

const NAV_LINKS = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "Recent Reports", href: APP_RECENT_REPORTS_URL },
  { label: "Fix Sprint", href: "/demo" },
  { label: "FAQ", href: "#faq" },
];

export default function BeseamNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled ? "px-4 py-3" : "",
      )}
    >
      <nav
        className={cn(
          "transition-all duration-300",
          scrolled
            ? "mx-auto max-w-5xl rounded-full border border-border/20 bg-background/50 px-5 shadow-lg shadow-black/5 backdrop-blur-2xl"
            : "mx-auto max-w-6xl px-4 sm:px-6",
        )}
      >
        <div
          className={cn(
            "flex items-center justify-between transition-all duration-300",
            scrolled ? "h-14" : "h-16",
          )}
        >
          <Link href="/" className="flex items-center">
            <NavbarLogo className="text-primary" />
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <ThemeToggle />
            <Button
              variant="outline"
              className="rounded-lg px-6 font-bold"
              asChild
            >
              <Link href="https://app.beseam.com/login">Log In</Link>
            </Button>
            <Link
              href={APP_SCAN_URL}
              className="inline-flex h-9 items-center gap-1.5 rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
            >
              Free Scan
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle menu"
            className="md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </nav>

      {mobileOpen && (
        <div
          className="animate-in fade-in fixed inset-0 z-40 bg-background/60 duration-300 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {mobileOpen && (
        <div className="animate-in slide-in-from-right fixed right-0 top-0 z-50 flex h-dvh w-[300px] max-w-[90vw] flex-col border-l border-border bg-background shadow-2xl duration-300 sm:w-[360px] md:hidden">
          <div className="flex h-14 items-center justify-between border-b border-border/50 px-6">
            <span className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
              Menu
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileOpen(false)}
              className="hover:bg-accent"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-8">
            <nav className="space-y-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center rounded-lg p-4 text-base font-medium transition-colors hover:bg-accent"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="mt-8 space-y-3 border-t border-border/50 pt-8">
              <Button
                variant="outline"
                className="w-full rounded-lg border-primary/20 p-5 text-base font-bold"
                asChild
              >
                <Link
                  href="https://app.beseam.com/login"
                  onClick={() => setMobileOpen(false)}
                >
                  Log In
                </Link>
              </Button>
              <Link
                href={APP_SCAN_URL}
                onClick={() => setMobileOpen(false)}
                className="flex w-full items-center justify-center rounded-lg bg-primary p-5 text-base font-bold text-primary-foreground shadow-lg transition-all hover:bg-primary/90"
              >
                Run Free Scan
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
