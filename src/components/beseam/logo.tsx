import type { CSSProperties } from "react";

import { cn } from "@/lib/utils";

export type LogoVariant =
  "default" | "secondary" | "inverted" | "secondary-inverted";

export interface LogoProps {
  className?: string;
  markClassName?: string;
  wordmarkClassName?: string;
  style?: CSSProperties;
  variant?: LogoVariant;
  /** Collapse the wordmark so only the B mark stays (e.g. scrolled navbar). */
  hideWordmark?: boolean;
}

const MARK_URLS: Record<LogoVariant, string> = {
  default: "/brand/beseam-mark-default.svg",
  secondary: "/brand/beseam-mark-secondary.svg",
  inverted: "/brand/beseam-mark-inverted.svg",
  "secondary-inverted": "/brand/beseam-mark-secondary-inverted.svg",
};

export default function Logo({
  className,
  markClassName,
  wordmarkClassName,
  style,
  variant = "default",
  hideWordmark = false,
}: LogoProps) {
  return (
    <span
      className={cn("inline-flex items-center text-[27px] leading-none", className)}
      style={{ columnGap: "0.09em", ...style }}
    >
      {/* Static generated SVG: render it directly instead of as a CSS background. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        aria-hidden="true"
        src={MARK_URLS[variant]}
        alt=""
        width={484}
        height={696}
        className={cn("block w-auto shrink-0", markClassName)}
        style={{
          height: "0.78em",
          width: "auto",
          transform: "translateY(0.005em)",
        }}
      />
      <span
        aria-hidden="true"
        className={cn(
          "inline-block overflow-hidden font-medium tracking-[-0.018em] transition-all duration-200",
          hideWordmark ? "max-w-0 opacity-0" : "max-w-[5.4em] opacity-100",
          wordmarkClassName,
        )}
      >
        eseam
      </span>
      <span className="sr-only">Beseam</span>
    </span>
  );
}
