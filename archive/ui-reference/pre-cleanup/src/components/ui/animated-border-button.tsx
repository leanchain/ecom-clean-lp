'use client';

import type React from 'react';
import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from './button';
import { cn } from '@/lib/utils';

interface AnimatedBorderButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  borderColor?: string;
  borderWidth?: number;
  animationDuration?: number;
  rounded?: 'md' | 'lg' | 'xl' | '2xl' | 'full';
  asChild?: boolean;
  wrapperClassName?: string;
  buttonSize?: 'sm' | 'default' | 'lg' | 'icon';
  fullWidth?: boolean;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export default function AnimatedBorderButton({
  children,
  className,
  onClick,
  borderColor = 'var(--primary)',
  borderWidth = 2,
  animationDuration = 0.3,
  rounded = 'lg',
  asChild = false,
  wrapperClassName,
  buttonSize = 'lg',
  fullWidth = true,
  type = 'button',
  disabled = false,
}: AnimatedBorderButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const pathRef = useRef<SVGRectElement>(null);

  const radiusMap = {
    md: '6',
    lg: '8',
    xl: '12',
    '2xl': '16',
    full: '9999',
  };

  const borderRadius = radiusMap[rounded];

  return (
    <div
      className={cn(
        'relative transition-transform duration-200 active:scale-[0.98]',
        fullWidth ? 'w-full' : 'w-auto',
        wrapperClassName
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Outer SVG Border */}
      <div className="pointer-events-none absolute inset-0 z-10">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <motion.rect
            ref={pathRef}
            x={borderWidth / 2}
            y={borderWidth / 2}
            width={`calc(100% - ${borderWidth}px)`}
            height={`calc(100% - ${borderWidth}px)`}
            rx={rounded === 'full' ? '9999' : borderRadius}
            ry={rounded === 'full' ? '9999' : borderRadius}
            fill="none"
            stroke={borderColor}
            strokeWidth={borderWidth}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: isHovered ? 1 : 0,
              opacity: isHovered ? 1 : 0,
            }}
            transition={{ duration: animationDuration, ease: 'easeInOut' }}
          />
        </svg>
      </div>

      <Button
        type={type}
        size={buttonSize}
        disabled={disabled}
        className={cn(
          'relative z-0',
          fullWidth ? 'w-full' : 'w-auto',
          rounded === 'full' ? 'rounded-full' : `rounded-${rounded}`,
          className
        )}
        asChild={asChild}
        onClick={onClick}
      >
        {children}
      </Button>
    </div>
  );
}
