import type { CSSProperties } from "react";

import { cn } from "@/lib/utils";

export type LogoVariant =
  | "default"
  | "secondary"
  | "inverted"
  | "secondary-inverted";

export interface LogoProps {
  className?: string;
  markClassName?: string;
  wordmarkClassName?: string;
  style?: CSSProperties;
  variant?: LogoVariant;
  /** Collapse the wordmark so only the B mark stays (e.g. scrolled navbar). */
  hideWordmark?: boolean;
}

const MARK_VIEW_BOX = "62 62 484 696";
const MARK_CLIP_ID = "beseam-mark-b-clip";
const B_OUTLINE =
  "M 62 62 H 300 C 430 62, 522 132, 522 244 C 522 318, 480 370, 414 396 C 493 421, 546 485, 546 574 C 546 690, 446 758, 308 758 H 62 Z";
const S_INLAY =
  "M 411.00 150.00 C 361.78 156.93, 325.52 163.87, 298.14 170.80 C 270.77 177.73, 252.30 184.67, 238.64 191.60 C 224.98 198.53, 216.14 205.47, 208.01 212.40 C 191.75 226.27, 178.38 240.13, 169.32 254.00 C 157.99 271.33, 153.49 288.67, 156.04 306.00 C 158.60 323.33, 168.16 340.67, 182.18 358.00 C 196.20 375.33, 214.57 392.67, 233.00 410.00 C 251.43 427.33, 269.80 444.67, 283.82 462.00 C 297.84 479.33, 307.40 496.67, 309.96 514.00 C 312.51 531.33, 308.01 548.67, 296.68 566.00 C 287.62 579.87, 274.25 593.73, 257.99 607.60 C 249.86 614.53, 241.02 621.47, 231.73 628.40 C 222.44 635.33, 212.71 642.27, 202.82 649.20 C 192.93 656.13, 182.89 663.07, 173.00 670.00 C 222.22 663.07, 258.48 656.13, 285.86 649.20 C 313.23 642.27, 331.70 635.33, 345.36 628.40 C 359.02 621.47, 367.86 614.53, 375.99 607.60 C 392.25 593.73, 405.62 579.87, 414.68 566.00 C 426.01 548.67, 430.51 531.33, 427.96 514.00 C 425.40 496.67, 415.84 479.33, 401.82 462.00 C 387.80 444.67, 369.43 427.33, 351.00 410.00 C 332.57 392.67, 314.20 375.33, 300.18 358.00 C 286.16 340.67, 276.60 323.33, 274.04 306.00 C 271.49 288.67, 275.99 271.33, 287.32 254.00 C 296.38 240.13, 309.75 226.27, 326.01 212.40 C 334.14 205.47, 342.98 198.53, 352.27 191.60 C 361.56 184.67, 371.29 177.73, 381.18 170.80 C 391.07 163.87, 401.11 156.93, 411.00 150.00 Z";
const STITCHES = [
  "187.79,235.36 164.25,215.19 153.84,227.34 177.38,247.51",
  "163.12,271.01 133.35,262.38 128.89,277.75 158.67,286.38",
  "160.17,313.17 131.16,324.10 136.80,339.07 165.81,328.15",
  "180.74,351.55 156.82,371.27 166.99,383.61 190.92,363.90",
  "210.53,384.42 188.97,406.68 200.46,417.82 222.03,395.55",
  "242.94,415.21 221.53,437.63 233.10,448.68 254.51,426.26",
  "274.86,446.91 251.49,467.28 262.01,479.34 285.37,458.97",
  "302.37,483.17 274.28,496.28 281.04,510.78 309.14,497.67",
  "314.00,527.84 283.50,522.33 280.65,538.07 311.16,543.59",
  "297.52,570.53 273.10,551.44 263.24,564.04 287.67,583.13",
  "296.33,236.87 320.76,255.96 310.90,268.56 286.48,249.47",
  "272.84,276.41 303.35,281.93 300.50,297.67 270.00,292.16",
  "274.86,322.33 302.96,309.22 309.72,323.72 281.63,336.83",
  "298.63,361.03 321.99,340.66 332.51,352.72 309.14,373.09",
  "329.49,393.74 350.90,371.32 362.47,382.37 341.06,404.79",
  "361.97,424.45 383.54,402.18 395.03,413.32 373.47,435.58",
  "393.08,456.10 417.01,436.39 427.18,448.73 403.26,468.45",
  "418.19,491.85 447.20,480.93 452.84,495.90 423.83,506.83",
  "425.33,533.62 455.11,542.25 450.65,557.62 420.88,548.99",
  "406.62,572.49 430.16,592.66 419.75,604.81 396.21,584.64",
] as const;

const MARK_COLORS: Record<LogoVariant, { body: string; inlay: string }> = {
  default: { body: "#111318", inlay: "#ffffff" },
  secondary: { body: "#b8441d", inlay: "#ffffff" },
  inverted: { body: "#ffffff", inlay: "#111318" },
  "secondary-inverted": { body: "#ffffff", inlay: "#b8441d" },
};

function LogoMark({
  variant,
  className,
}: {
  variant: LogoVariant;
  className?: string;
}) {
  const { body, inlay } = MARK_COLORS[variant];
  return (
    <svg
      viewBox={MARK_VIEW_BOX}
      width={484}
      height={696}
      aria-hidden="true"
      focusable="false"
      className={cn("block w-auto shrink-0", className)}
      style={{
        height: "0.86em",
        width: "auto",
        transform: "translateY(0.005em)",
      }}
    >
      <defs>
        <clipPath id={MARK_CLIP_ID}>
          <path d={B_OUTLINE} />
        </clipPath>
      </defs>
      <path d={B_OUTLINE} fill={body} />
      <path d={S_INLAY} fill={inlay} />
      <g clipPath={`url(#${MARK_CLIP_ID})`} fill={inlay}>
        {STITCHES.map((points) => (
          <polygon key={points} points={points} />
        ))}
      </g>
    </svg>
  );
}

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
      {/* Inline geometry means the mark and wordmark paint together; there is
          no second image request that can make “eseam” appear before the B. */}
      <LogoMark variant={variant} className={markClassName} />
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
