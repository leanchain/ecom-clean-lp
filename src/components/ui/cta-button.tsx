'use client';
import * as React from 'react';
import { motion } from 'framer-motion';

import { Button, type ButtonProps } from './button';
import { cn } from '@/lib/utils';

type RoundedOption = 'md' | 'full';

export interface CtaButtonProps extends ButtonProps {
  wrapperClassName?: string;
  borderColor?: string;
  animationDuration?: number;
  rounded?: RoundedOption;
}

const radiusClass: Record<RoundedOption, string> = {
  md: 'rounded-[calc(var(--radius)+2px)]',
  full: 'rounded-full',
};

const buttonRadiusClass: Record<RoundedOption, string> = {
  md: 'rounded-[calc(var(--radius)+1px)]',
  full: 'rounded-full',
};

export const CtaButton = React.forwardRef<HTMLButtonElement, CtaButtonProps>(
  (
    {
      className,
      wrapperClassName,
      borderColor = 'var(--color-accent)',
      animationDuration = 0.35,
      rounded = 'md',
      size = 'lg',
      ...props
    },
    ref
  ) => {
    return (
      <motion.div
        className={cn('group relative inline-flex items-center justify-center', radiusClass[rounded], wrapperClassName)}
        initial="rest"
        animate="rest"
        whileHover="hover"
        whileFocus="hover"
      >
        <motion.span
          aria-hidden
          className={cn('pointer-events-none absolute inset-0 -z-[1] border-2 opacity-0', radiusClass[rounded])}
          style={{ borderColor }}
          variants={{
            rest: { opacity: 0, scale: 0.95 },
            hover: { opacity: 1, scale: 1 },
          }}
          transition={{ duration: animationDuration, ease: 'easeInOut' }}
        />
        <Button
          ref={ref}
          size={size}
          className={cn(
            'relative origin-center font-semibold transition-transform duration-200 hover:translate-y-[-1px] hover:shadow-lg active:scale-95',
            buttonRadiusClass[rounded],
            className
          )}
          {...props}
        />
      </motion.div>
    );
  }
);
CtaButton.displayName = 'CtaButton';
