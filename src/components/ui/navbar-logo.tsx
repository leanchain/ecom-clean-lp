import Logo, { type LogoProps } from "@/components/beseam/logo";
import { cn } from "@/lib/utils";

interface NavbarLogoProps extends LogoProps {
  wrapperClassName?: string;
}

export default function NavbarLogo({ wrapperClassName, ...props }: NavbarLogoProps) {
  return (
    <span className={cn("inline-flex items-center", wrapperClassName)}>
      <Logo {...props} />
    </span>
  );
}
