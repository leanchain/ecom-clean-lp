'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AnimatedBorderContainerProps {
  children: React.ReactNode;
  className?: string;
  borderColor?: string;
  borderWidth?: number;
  animationDuration?: number;
  rounded?: 'md' | 'lg' | 'full' | 'xl' | '2xl' | '3xl';
  wrapperClassName?: string;
  trigger?: 'hover' | 'focus' | 'both';
}

export default function AnimatedBorderContainer({
  children,
  className,
  borderColor = 'var(--primary)',
  borderWidth = 2,
  animationDuration = 0.4,
  rounded = 'full',
  wrapperClassName,
  trigger = 'both',
}: AnimatedBorderContainerProps) {
  const [isActive, setIsActive] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const pathRef = useRef<SVGRectElement>(null);

  const borderRadiusMap = {
    md: '6',
    lg: '8',
    full: '32',
    xl: '12',
    '2xl': '16',
    '3xl': '24',
  };

  const borderRadius = borderRadiusMap[rounded] || borderRadiusMap.full;

  useEffect(() => {
    if (trigger === 'hover') {
      setIsActive(isHovered);
    } else if (trigger === 'focus') {
      setIsActive(isFocused);
    } else {
      setIsActive(isHovered || isFocused);
    }
  }, [isHovered, isFocused, trigger]);

  return (
    <div
      className={cn('relative transition-transform', wrapperClassName)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocusCapture={() => setIsFocused(true)}
      onBlurCapture={() => setIsFocused(false)}
    >
      {/* Outer SVG Border */}
      <div className="pointer-events-none absolute -inset-[3px] z-0">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <motion.rect
            ref={pathRef}
            x={borderWidth / 2}
            y={borderWidth / 2}
            width={`calc(100% - ${borderWidth}px)`}
            height={`calc(100% - ${borderWidth}px)`}
            rx={borderRadius}
            ry={borderRadius}
            fill="none"
            stroke={borderColor}
            strokeWidth={borderWidth}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: isActive ? 1 : 0,
              opacity: isActive ? 1 : 0,
            }}
            transition={{ duration: animationDuration, ease: 'easeInOut' }}
          />
        </svg>
      </div>

      <div className={cn('relative z-10', className)}>{children}</div>
    </div>
  );
}
