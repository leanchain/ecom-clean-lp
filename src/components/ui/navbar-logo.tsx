import React from "react";
import Image from "next/image";
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
    <div className={cn(`relative w-25 h-6`, className, wrapperClassName)}>
      {/* Light mode logo */}
      <Image
        src="/layout/logo.svg"
        alt="Beseam Logo"
        fill
        priority
        className="object-contain dark:hidden"
      />
      {/* Dark mode logo */}
      <Image
        src="/layout/logo-dark.svg"
        alt="Beseam Logo"
        fill
        priority
        className="object-contain hidden dark:block"
      />
    </div>
  );
};

export default NavbarLogo;
