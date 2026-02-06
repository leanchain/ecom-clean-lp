import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
interface LogoProps {
  className?: string;
  wrapperClassName?: string;
}

const Logo: React.FC<LogoProps> = ({
  className = "",
  wrapperClassName = "",
}) => {
  return (
    <div className={cn("flex items-center", wrapperClassName)}>
      <Link href="/" className={cn("inline-flex items-center", className)}>
        <svg
          width="95"
          height="26"
          viewBox="0 0 95 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-auto"
        >
          <text
            x="0"
            y="20"
            fontFamily="var(--font-figtree), system-ui, -apple-system, sans-serif"
            fontSize="24"
            fontWeight="600"
            letterSpacing="-0.02em"
            fill="currentColor"
          >
            Beseam
          </text>
        </svg>
      </Link>
    </div>
  );
};

export default Logo;
