import Image from "next/image";

import { cn } from "@/lib/utils";

export interface LogoProps {
  className?: string;
  markClassName?: string;
  wordmarkClassName?: string;
  inverted?: boolean;
}

export default function Logo({
  className,
  markClassName,
  wordmarkClassName,
  inverted = false,
}: LogoProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center text-[27px] leading-none",
        className,
      )}
    >
      <Image
        src="/favicon/favicon.svg"
        width={32}
        height={32}
        alt=""
        aria-hidden="true"
        className={cn(
          "h-[0.80em] w-[0.70em] shrink-0 object-contain",
          inverted && "brightness-0 invert",
          markClassName,
        )}
        priority
      />
      <span
        aria-hidden="true"
        className={cn("font-semibold tracking-[-0.065em]", wordmarkClassName)}
      >
        eseam
      </span>
      <span className="sr-only">Beseam</span>
    </span>
  );
}
