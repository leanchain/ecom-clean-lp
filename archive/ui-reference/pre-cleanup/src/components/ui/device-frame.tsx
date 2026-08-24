import React from "react";
import { cn } from "@/lib/utils";

export interface DeviceFrameProps {
  children: React.ReactNode;
  type: "mobile" | "desktop";
  width?: number;
  height?: number;
  url?: string;
  isFullPage?: boolean;
  /** Hide the browser/URL bar - use when content provides its own app chrome */
  hideHeader?: boolean;
}

export function DeviceFrame({
  children,
  type,
  width,
  height,
  url,
  isFullPage = false,
  hideHeader = false,
}: DeviceFrameProps) {
  const isMobile = type === "mobile";
  const bezel = isMobile ? 2 : 4;
  const headerHeight = hideHeader ? 0 : !isMobile ? 44 : 56;

  const innerWidth = width || (isMobile ? 375 : 1200);
  const innerHeight = height || (isMobile ? 812 : 800);

  const outerWidth = innerWidth + bezel * 2;
  const outerHeight = innerHeight + headerHeight + bezel * 2;

  return (
    <div
      className={cn(
        "relative overflow-hidden border flex flex-col",
        isMobile
          ? "rounded-[30px] border-black bg-black"
          : "rounded-2xl border-muted-foreground/10 bg-background shadow-2xl",
      )}
      style={{
        width: `${outerWidth}px`,
        maxWidth: "100%",
        borderWidth: `${bezel}px`,
        aspectRatio: !isFullPage ? `${outerWidth}/${outerHeight}` : undefined,
        boxShadow: isMobile
          ? "0 32px 72px -8px rgba(0,0,0,0.55), 0 8px 24px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.06)"
          : undefined,
      }}
    >
      {/* Browser header - desktop */}
      {!isMobile && !hideHeader && (
        <div
          className="flex items-center gap-1.5 px-4 border-b bg-muted/50 shrink-0"
          style={{ height: `${headerHeight}px` }}
        >
          <div className="flex gap-1.5 shrink-0">
            <div className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-amber-400/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/60" />
          </div>
          <div className="ml-4 flex-1 h-7 rounded-lg bg-background/80 border flex items-center px-3 text-[10px] text-muted-foreground truncate opacity-80 tabular-nums font-medium">
            {url}
          </div>
        </div>
      )}

      {/* Browser header - mobile */}
      {isMobile && !hideHeader && (
        <div
          className="flex items-end justify-center px-4 pb-2 border-b bg-muted/30 shrink-0 pt-7"
          style={{ height: `${headerHeight}px` }}
        >
          <div className="w-full max-w-[200px] h-7 rounded-lg bg-background/80 border flex items-center justify-center px-3 text-[10px] text-muted-foreground truncate opacity-80 tabular-nums font-medium">
            {url}
          </div>
        </div>
      )}

      <div
        className={cn(
          "relative flex-1 w-full overflow-hidden bg-background",
          isFullPage ? "max-h-[800px] overflow-auto scrollbar-hide" : "h-full",
        )}
      >
        {children}
      </div>

      {/* Camera dot - single circle, centered at top */}
      {isMobile && (
        <div className="pointer-events-none absolute left-1/2 top-3 z-20 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-black" />
      )}
    </div>
  );
}
