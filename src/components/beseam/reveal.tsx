import type { CSSProperties, ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
};

export function Reveal({
  children,
  className,
  delay = 0,
  y = 14,
}: RevealProps) {
  const style = {
    "--reveal-y": String(y) + "px",
    animationDelay: String(delay) + "s",
  } as CSSProperties;

  return (
    <div className={"marketing-reveal " + (className ?? "")} style={style}>
      {children}
    </div>
  );
}

export default Reveal;
