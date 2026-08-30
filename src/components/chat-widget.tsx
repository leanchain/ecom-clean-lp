"use client";

import { useEffect } from "react";
import Script from "next/script";
import { useTheme } from "next-themes";

const CRISP_WEBSITE_ID = "55e053c3-37dc-40cb-a4e8-99fb05ce565b";
const MOBILE_CTA_VISIBILITY_EVENT = "beseam:mobile-cta-visibility";
const MOBILE_BREAKPOINT = "(max-width: 767px)";

const ChatWidget = () => {
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Create the queue immediately so visibility/theme commands are preserved
    // even when Crisp itself has not finished loading yet.
    const crispWindow = window as typeof window & { $crisp?: unknown[] };
    const crisp = (crispWindow.$crisp ??= []);

    const mode = resolvedTheme === "dark" ? "dark" : "light";
    crisp.push(["config", "color:mode", [mode]]);
  }, [resolvedTheme]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const crispWindow = window as typeof window & { $crisp?: unknown[] };
    const crisp = (crispWindow.$crisp ??= []);
    const mobile = window.matchMedia(MOBILE_BREAKPOINT);
    let mobileCtaVisible = Boolean(
      document.querySelector("[data-mobile-sticky-cta]"),
    );

    const syncChatLauncher = () => {
      const shouldShow = !mobile.matches || mobileCtaVisible;
      crisp.push(["do", shouldShow ? "chat:show" : "chat:hide"]);
    };

    const handleCtaVisibility = (event: Event) => {
      mobileCtaVisible = Boolean(
        (event as CustomEvent<{ visible?: boolean }>).detail?.visible,
      );
      syncChatLauncher();
    };

    syncChatLauncher();
    mobile.addEventListener("change", syncChatLauncher);
    window.addEventListener(MOBILE_CTA_VISIBILITY_EVENT, handleCtaVisibility);

    return () => {
      mobile.removeEventListener("change", syncChatLauncher);
      window.removeEventListener(MOBILE_CTA_VISIBILITY_EVENT, handleCtaVisibility);
    };
  }, []);

  return (
    <Script
      id="crisp-widget"
      strategy="lazyOnload"
      dangerouslySetInnerHTML={{
        __html: `
          window.$crisp = window.$crisp || [];
          window.CRISP_WEBSITE_ID = "${CRISP_WEBSITE_ID}";
          window.CRISP_RUNTIME_CONFIG = {
            lock_maximized: false,
            lock_full_view: false,
            cross_origin_cookies: true,
            show_availability_tooltip: false
          };
          window.$crisp.push(["config", "color:theme", ["deep_orange"]]);
          window.$crisp.push(["config", "show:availability_tooltip", [false]]);
          window.$crisp.push(["config", "show:operator_count", [false]]);

          (function () {
            var d = document;
            var s = d.createElement("script");
            s.src = "https://client.crisp.chat/l.js";
            s.async = 1;
            d.getElementsByTagName("head")[0].appendChild(s);
          })();
        `,
      }}
    />
  );
};

export default ChatWidget;
