import React from "react";
import Image from "next/image";
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
    <div className={cn(``, wrapperClassName)}>
      <Link href="/" className={cn(`relative block w-25 h-6`, className)}>
        {/* Light mode logo */}
        <Image
          src="/layout/logo.svg"
          alt="Fieson Logo"
          fill
          priority
          className="object-contain dark:hidden"
        />
        {/* Dark mode logo */}
        <Image
          src="/layout/logo-dark.svg"
          alt="Fieson Logo"
          fill
          priority
          className="object-contain hidden dark:block"
        />
      </Link>
    </div>
  );
};

export default Logo;
