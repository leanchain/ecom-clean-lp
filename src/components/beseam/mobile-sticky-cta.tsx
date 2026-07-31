"use client";

import { useEffect, useState } from "react";

import { ArrowRight } from "lucide-react";

import TrackedLink from "@/components/beseam/tracked-link";

/**
 * The hero scan field. The sticky bar scrolls to it and focuses it rather than
 * routing to a separate scan page, so the label matches what happens.
 */
const HERO_FIELD_ID = "answer-check-domain";

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
    <div className="fixed inset-x-4 bottom-4 z-40 md:hidden">
      <TrackedLink
        href={`/#${HERO_FIELD_ID}`}
        eventName="marketing_primary_cta_clicked"
        eventCategory="conversion"
        placement="mobile_sticky"
        preserveUtm
        onClick={(event) => {
          const field = document.getElementById(HERO_FIELD_ID);
          if (!field) return;
          event.preventDefault();
          field.scrollIntoView({ behavior: "smooth", block: "center" });
          field.focus({ preventScroll: true });
        }}
        className="flex min-h-12 items-center justify-center gap-3 border border-white/18 bg-[#111318] px-5 text-sm font-semibold text-white"
      >
        Scan my store free
        <ArrowRight className="h-4 w-4" />
      </TrackedLink>
    </div>
  );
}
