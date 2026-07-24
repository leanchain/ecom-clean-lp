"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, BarChart3, ChevronDown, Eye, Layers3, Megaphone, Menu, Palette, ShoppingBag, X } from "lucide-react";

import BookReviewCta from "@/components/beseam/book-review-cta";
import TrackedLink from "@/components/beseam/tracked-link";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import NavbarLogo from "@/components/ui/navbar-logo";
import { cn } from "@/lib/utils";

const APP_LOGIN_URL = "https://app.beseam.com/login";

const PRODUCT_LINKS = [
  { label: "Foundation", detail: "Revenue overview, Actions, Impact", href: "/#foundation", icon: Layers3 },
  { label: "AI Visibility", detail: "AI discovery and representation", href: "/ai-visibility-monitoring", icon: Eye },
  { label: "Commerce Readiness", detail: "Products, Store Health, Inspection", href: "/shopify-store-health", icon: ShoppingBag },
  { label: "Advertising", detail: "Google and Meta lifecycle", href: "/#advertising", icon: Megaphone },
  { label: "Advanced Intelligence", detail: "Analytics, Behavior, Optimization, Reliability", href: "/#advanced-intelligence", icon: BarChart3 },
  { label: "Creative Studio", detail: "Images, video, and reusable assets", href: "/#creative-studio", icon: Palette },
] as const;

const NAV_LINKS = [
  { label: "Platform", href: "/#platform" },
  { label: "How it works", href: "/#agent-loop" },
  { label: "Packages", href: "/#packages" },
  { label: "Company", href: "/about" },
] as const;

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
    <header className={cn("sticky top-0 z-50 w-full border-b transition-all duration-200", scrolled ? "border-rule bg-surface/92 shadow-[0_8px_28px_rgba(0,0,0,0.045)] backdrop-blur-xl" : "border-transparent bg-surface/96")}>
      <a href="#main-content" className="absolute left-4 top-2 -translate-y-20 rounded-md bg-ink px-4 py-2 text-sm font-semibold text-white focus:translate-y-0">Skip to content</a>
      <div className="mx-auto max-w-[88rem] px-4 sm:px-6">
        <div className="flex h-[4.5rem] items-center justify-between">
          <Link href="/" className="flex items-center" aria-label="Beseam home"><NavbarLogo className="text-ink" /></Link>

          <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
            <div className="group relative">
              <button className="inline-flex min-h-11 items-center gap-1 rounded-full px-3.5 text-[14px] font-medium text-muted-foreground transition-colors hover:bg-panel hover:text-ink focus-visible:ring-2 focus-visible:ring-primary" aria-haspopup="true">
                Products <ChevronDown className="h-3.5 w-3.5 transition-transform group-hover:rotate-180 group-focus-within:rotate-180" aria-hidden="true" />
              </button>
              <div className="pointer-events-none absolute left-1/2 top-[calc(100%+0.6rem)] w-[45rem] -translate-x-1/2 translate-y-2 opacity-0 transition duration-150 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:translate-y-0 group-focus-within:opacity-100">
                <div className="overflow-hidden rounded-2xl border border-rule bg-panel shadow-2xl">
                  <div className="grid grid-cols-2 gap-px bg-rule">
                    {PRODUCT_LINKS.map((product) => {
                      const Icon = product.icon;
                      return (
                        <Link key={product.label} href={product.href} className="group/item flex gap-3 bg-panel p-5 transition-colors hover:bg-surface focus-visible:bg-surface">
                          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary dark:bg-primary/10"><Icon className="h-4.5 w-4.5" strokeWidth={1.7} aria-hidden="true" /></span>
                          <span className="min-w-0"><span className="flex items-center gap-2 text-[14px] font-semibold text-ink">{product.label}<ArrowRight className="h-3.5 w-3.5 text-primary opacity-0 transition group-hover/item:translate-x-0.5 group-hover/item:opacity-100" aria-hidden="true" /></span><span className="mt-1 block text-[12px] leading-relaxed text-muted-foreground">{product.detail}</span></span>
                        </Link>
                      );
                    })}
                  </div>
                  <div className="flex items-center justify-between bg-surface px-5 py-3 text-[12px] text-muted-foreground"><span>Products and entitlements are resolved per contract and store.</span><Link href="/#products" className="font-semibold text-primary">View all products →</Link></div>
                </div>
              </div>
            </div>
            {NAV_LINKS.map((link) => <Link key={link.label} href={link.href} className="rounded-full px-3.5 py-3 text-[14px] font-medium text-muted-foreground transition-colors hover:bg-panel hover:text-ink focus-visible:ring-2 focus-visible:ring-primary">{link.label}</Link>)}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <ThemeToggle />
            <TrackedLink href={APP_LOGIN_URL} eventName="login_clicked" placement="navbar" className="inline-flex min-h-11 items-center px-2 text-[14px] font-medium text-muted-foreground transition-colors hover:text-ink focus-visible:ring-2 focus-visible:ring-primary">Log in</TrackedLink>
            <BookReviewCta location="navbar" label="Book a demo" className="min-h-11 px-5 py-2 text-[14px]" />
          </div>

          <div className="flex items-center gap-1 lg:hidden">
            <ThemeToggle />
            <Button variant="ghost" size="icon" aria-label={mobileOpen ? "Close menu" : "Open menu"} aria-expanded={mobileOpen} aria-controls="mobile-navigation" onClick={() => setMobileOpen((value) => !value)}>{mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</Button>
          </div>
        </div>
      </div>

      {mobileOpen ? (
        <div id="mobile-navigation" className="absolute inset-x-0 top-[4.5rem] max-h-[calc(100vh-4.5rem)] overflow-y-auto border-b border-rule bg-surface px-4 py-5 shadow-xl lg:hidden">
          <nav aria-label="Mobile" className="mx-auto max-w-lg">
            <p className="px-3 text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">Products</p>
            <div className="mt-2 grid gap-1 sm:grid-cols-2">
              {PRODUCT_LINKS.map((product) => {
                const Icon = product.icon;
                return <Link key={product.label} href={product.href} onClick={() => setMobileOpen(false)} className="flex items-center gap-3 rounded-xl px-3 py-3 text-[14px] font-semibold text-ink hover:bg-panel"><Icon className="h-4 w-4 text-primary" strokeWidth={1.7} aria-hidden="true"/><span>{product.label}</span></Link>;
              })}
            </div>
            <div className="my-4 border-t border-rule" />
            <div className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => <Link key={link.label} href={link.href} onClick={() => setMobileOpen(false)} className="rounded-lg px-3 py-3 text-[15px] font-medium text-ink hover:bg-panel">{link.label}</Link>)}
              <TrackedLink href={APP_LOGIN_URL} eventName="login_clicked" placement="navbar_mobile" onClick={() => setMobileOpen(false)} className="rounded-lg px-3 py-3 text-[15px] font-medium text-muted-foreground hover:bg-panel">Log in</TrackedLink>
            </div>
            <div className="mt-4 border-t border-rule pt-4"><BookReviewCta location="navbar_mobile" label="Book a platform demo" className="w-full" /></div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
