"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";

import BookReviewCta from "@/components/beseam/book-review-cta";
import TrackedLink from "@/components/beseam/tracked-link";
import Logo from "@/components/beseam/logo";
import { cn } from "@/lib/utils";

const APP_LOGIN_URL = "https://app.beseam.com/login";

const PRODUCT_SYSTEMS = [
  {
    name: "Observe",
    statement: "Find where demand is lost before it becomes an order.",
    products: ["AI Visibility", "Behavior", "Reliability"],
    href: "/#observe",
  },
  {
    name: "Decide",
    statement: "Revenue-sensitive issues rise above operational noise.",
    products: ["Foundation", "Analytics", "Optimization"],
    href: "/#foundation",
  },
  {
    name: "Act",
    statement: "Improve the commerce object, not another internal dashboard.",
    products: ["Commerce Readiness", "Advertising", "Creative Studio"],
    href: "/#advertising",
  },
] as const;

const NAV_LINKS = [
  { label: "How it works", href: "/#platform" },
  { label: "Example", href: "/#advanced-intelligence" },
  { label: "Products & access", href: "/#packages" },
  { label: "Compare", href: "/compare" },
  { label: "Manifesto", href: "/manifesto" },
  { label: "Company", href: "/about" },
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
        scrolled ? "border-black/18 bg-[#f4f1e9]/94 backdrop-blur-xl" : "border-transparent bg-[#f4f1e9]",
      )}
    >
      <a href="#main-content" className="absolute left-4 top-2 -translate-y-20 bg-[#111318] px-4 py-2 text-sm font-semibold text-white focus:translate-y-0">
        Skip to content
      </a>
      <div className="relative mx-auto max-w-[92rem] px-5 sm:px-8 lg:px-10">
        <div className="flex h-[4.5rem] items-center justify-between">
          <Link href="/" className="flex items-center" aria-label="Beseam home">
            <Logo className="text-[#111318]" />
          </Link>

          <nav aria-label="Primary" className="hidden items-center lg:flex">
            <div className="group">
              <button
                className="inline-flex min-h-11 items-center gap-1.5 px-4 text-[14px] font-medium text-black/62 transition-colors hover:text-[#111318] focus-visible:ring-2 focus-visible:ring-[#3154ff]"
                aria-haspopup="true"
              >
                Products
                <ChevronDown className="h-3.5 w-3.5 transition-transform group-hover:rotate-180 group-focus-within:rotate-180" aria-hidden="true" />
              </button>
              <div className="pointer-events-none absolute left-1/2 top-[calc(100%+0.55rem)] w-[49rem] max-w-[calc(100vw-2.5rem)] -translate-x-1/2 translate-y-2 opacity-0 transition duration-150 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:translate-y-0 group-focus-within:opacity-100">
                <div className="border border-black/22 bg-[#f4f1e9] shadow-[0_24px_60px_rgba(17,19,24,0.14)]">
                  <div className="grid grid-cols-3">
                    {PRODUCT_SYSTEMS.map((system, index) => (
                      <Link key={system.name} href={system.href} className="group/item border-r border-black/18 p-6 last:border-r-0 hover:bg-[#ebe8df] focus-visible:bg-[#ebe8df]">
                        <div className="flex items-baseline justify-between gap-4">
                          <span className="font-serif text-[24px] tracking-[-0.025em] text-[#111318]">{system.name}</span>
                          <span className="font-mono text-[10px] text-black/35">0{index + 1}</span>
                        </div>
                        <p className="mt-3 min-h-10 text-[13px] leading-relaxed text-black/58">{system.statement}</p>
                        <div className="mt-6 border-t border-black/18 pt-4">
                          {system.products.map((product) => (
                            <span key={product} className="block py-1 font-mono text-[10px] uppercase tracking-[0.08em] text-black/48">{product}</span>
                          ))}
                        </div>
                        <span className="mt-5 inline-flex items-center gap-2 text-[12px] font-semibold text-[#3154ff]">View products <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/item:translate-x-0.5" /></span>
                      </Link>
                    ))}
                  </div>
                  <div className="flex items-center justify-between border-t border-black/18 px-6 py-3 font-mono text-[10px] uppercase tracking-[0.08em] text-black/45">
                    <span>Products are enabled per store and contract</span>
                    <Link href="/#packages" className="text-[#3154ff]">Compare products →</Link>
                  </div>
                </div>
              </div>
            </div>
            {NAV_LINKS.map((link) => (
              <Link key={link.label} href={link.href} className="min-h-11 px-4 py-3 text-[14px] font-medium text-black/62 transition-colors hover:text-[#111318] focus-visible:ring-2 focus-visible:ring-[#3154ff]">
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-5 lg:flex">
            <TrackedLink href={APP_LOGIN_URL} eventName="login_clicked" placement="navbar" className="text-[14px] font-semibold text-black/62 transition-colors hover:text-[#3154ff]">
              Log in
            </TrackedLink>
            <BookReviewCta location="navbar" label="Book a 20-minute review" className="min-h-10 px-5 text-[13px]" />
          </div>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center border border-black/20 text-[#111318] lg:hidden"
            onClick={() => setMobileOpen((open) => !open)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div id="mobile-navigation" className="border-t border-black/18 bg-[#f4f1e9] lg:hidden">
          <div className="mx-auto max-w-[92rem] px-5 pb-7 sm:px-8">
            <div className="border-b border-black/18 py-5">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-[#3154ff]">Products by job</p>
              {PRODUCT_SYSTEMS.map((system) => (
                <Link key={system.name} href={system.href} onClick={() => setMobileOpen(false)} className="grid grid-cols-[5.5rem_1fr] gap-4 border-b border-black/14 py-4 last:border-b-0">
                  <span className="font-serif text-[20px] text-[#111318]">{system.name}</span>
                  <span className="text-[13px] leading-relaxed text-black/56">{system.products.join(" · ")}</span>
                </Link>
              ))}
            </div>
            <nav aria-label="Mobile" className="grid grid-cols-2 border-b border-black/18 py-3">
              {NAV_LINKS.map((link) => (
                <Link key={link.label} href={link.href} onClick={() => setMobileOpen(false)} className="py-3 text-[14px] font-semibold text-black/68">
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <TrackedLink href={APP_LOGIN_URL} eventName="login_clicked" placement="mobile_nav" className="flex min-h-12 items-center justify-center border border-black/22 text-[14px] font-semibold text-[#111318]">
                Log in
              </TrackedLink>
              <BookReviewCta location="mobile_nav" label="Book a 20-minute review" className="w-full" />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
