"use client";

import { useEffect } from "react";
import Script from "next/script";
import { useTheme } from "next-themes";

const CRISP_WEBSITE_ID = "55e053c3-37dc-40cb-a4e8-99fb05ce565b";

const ChatWidget = () => {
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Crisp exposes a command queue on window. Keep its color mode aligned
    // with the marketing site's current theme after the widget has loaded.
    const crisp = (window as typeof window & { $crisp?: unknown[] }).$crisp;
    if (!crisp) return;

    const mode = resolvedTheme === "dark" ? "dark" : "light";
    crisp.push(["config", "color:mode", [mode]]);
  }, [resolvedTheme]);

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
          window.$crisp.push(["config", "color:theme", ["#b8441d"]]);
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
