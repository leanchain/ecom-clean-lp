"use client";

import { useEffect } from "react";

import Script from "next/script";

import { useTheme } from "next-themes";

const ChatWidget = () => {
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const crisp = (window as any).$crisp;
    if (typeof window !== "undefined" && crisp) {
      const mode = resolvedTheme === "dark" ? "dark" : "light";
      crisp.push(["config", "color:mode", [mode]]);
    }
  }, [resolvedTheme]);

  return (
    <Script
      id="crisp-widget"
      strategy="lazyOnload"
      dangerouslySetInnerHTML={{
        __html: `
          window.$crisp=[];
          window.CRISP_WEBSITE_ID="55e053c3-37dc-40cb-a4e8-99fb05ce565b";

          // Runtime config before loading
          window.CRISP_RUNTIME_CONFIG = {
            lock_maximized: false,
            lock_full_view: false,
            cross_origin_cookies: true
          };

          // Theme customization (queued before script loads)
          // Using "deep_orange" - closest to Beseam's #ff6041
          $crisp.push(["config", "color:theme", ["deep_orange"]]);

          // Load Crisp script
          (function(){
            var d=document;
            var s=d.createElement("script");
            s.src="https://client.crisp.chat/l.js";
            s.async=1;
            d.getElementsByTagName("head")[0].appendChild(s);
          })();
        `,
      }}
    />
  );
};

export default ChatWidget;
