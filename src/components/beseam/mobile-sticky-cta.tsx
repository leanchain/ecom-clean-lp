"use client";

import { useEffect, useState } from "react";

import { ArrowRight } from "lucide-react";

import TrackedLink from "@/components/beseam/tracked-link";

const SCAN_URL = "/tools/ai-visibility-scan";

export default function MobileStickyCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const updateVisibility = () => {
      const hero = document.getElementById("home-hero");
      const menuOpen = Boolean(document.getElementById("mobile-navigation"));
      const cookieChoicesOpen = Boolean(
        document.querySelector('[aria-label="Cookie choices"]'),
      );
      const dialogOpen = Boolean(document.querySelector('[role="dialog"]'));
      const footer = document.querySelector("footer");
      const footerVisible = footer
        ? footer.getBoundingClientRect().top < window.innerHeight
        : false;
      const passedHero = hero
        ? hero.getBoundingClientRect().bottom < 120
        : window.scrollY > window.innerHeight * 0.8;
      setVisible(
        passedHero &&
          !menuOpen &&
          !cookieChoicesOpen &&
          !dialogOpen &&
          !footerVisible,
      );
    };

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    window.addEventListener("resize", updateVisibility);
    const observer = new MutationObserver(updateVisibility);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("scroll", updateVisibility);
      window.removeEventListener("resize", updateVisibility);
      observer.disconnect();
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-x-4 bottom-4 z-40 md:hidden">
      <TrackedLink
        href={SCAN_URL}
        eventName="marketing_primary_cta_clicked"
        eventCategory="conversion"
        placement="mobile_sticky"
        preserveUtm
        className="flex min-h-12 items-center justify-center gap-3 border border-white/18 bg-[#111318] px-5 text-sm font-semibold text-white shadow-[0_16px_40px_rgba(17,19,24,0.28)]"
      >
        Scan my store free
        <ArrowRight className="h-4 w-4" />
      </TrackedLink>
    </div>
  );
}
