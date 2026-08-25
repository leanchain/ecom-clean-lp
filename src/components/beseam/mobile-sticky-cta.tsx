"use client";

import { useEffect, useState } from "react";

import { ArrowRight } from "lucide-react";

import TrackedLink from "@/components/beseam/tracked-link";
import { APP_REGISTER_URL } from "@/lib/app-urls";

/** Roughly one screen of scroll: the bar appears once the hero copy is behind you. */
const SHOW_AFTER_SCROLL_Y = 600;

export default function MobileStickyCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const updateVisibility = () => {
      const menuOpen = Boolean(document.getElementById("mobile-navigation"));
      const cookieChoicesOpen = Boolean(
        document.querySelector('[aria-label="Cookie choices"]'),
      );
      const dialogOpen = Boolean(document.querySelector('[role="dialog"]'));
      const footer = document.querySelector("footer");
      const footerVisible = footer
        ? footer.getBoundingClientRect().top < window.innerHeight
        : false;
      const scrolledPastHeroCopy = window.scrollY > SHOW_AFTER_SCROLL_Y;
      setVisible(
        scrolledPastHeroCopy &&
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
    <div data-print-hide className="fixed inset-x-4 bottom-4 z-40 md:hidden">
      <TrackedLink
        href={APP_REGISTER_URL}
        eventName="marketing_primary_cta_clicked"
        eventCategory="conversion"
        placement="mobile_sticky"
        preserveUtm
        className="flex min-h-12 items-center justify-center gap-3 border border-white/18 bg-ink-deep px-5 text-sm font-semibold text-white"
      >
        Start for free
        <ArrowRight className="h-4 w-4" />
      </TrackedLink>
    </div>
  );
}
