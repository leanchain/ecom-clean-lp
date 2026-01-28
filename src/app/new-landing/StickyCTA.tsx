"use client";
import { useState, useEffect } from "react";

export default function StickyCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 420);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed right-4 bottom-4 z-60" role="region" aria-label="Quick actions">
      <div className="bg-slate-900 dark:bg-white text-white dark:text-black p-3 rounded-xl flex gap-3 items-center">
        <div className="text-sm">Need help choosing a product?</div>
        <a className="bg-primary text-white px-3 py-2 rounded-lg text-decoration-none font-bold" href="#" onClick={(e) => e.preventDefault()}>
          Chat with us
        </a>
      </div>
    </div>
  );
}
