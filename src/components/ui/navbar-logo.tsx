import React from "react";
import { cn } from "@/lib/utils";

interface NavbarLogoProps {
  className?: string;
  wrapperClassName?: string;
}

const NavbarLogo: React.FC<NavbarLogoProps> = ({
  className = "",
  wrapperClassName = "",
}) => {
  return (
    <div className={cn("flex items-center", wrapperClassName)}>
      <div className={cn("inline-flex items-center", className)}>
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
      </div>
    </div>
  );
};

export default NavbarLogo;
