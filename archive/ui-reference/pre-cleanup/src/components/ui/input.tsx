'use client';
import * as React from 'react';
import { motion } from 'framer-motion';

import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  animate?: boolean;
  variant?: 'default' | 'glass' | 'minimal' | 'flat' | 'elevated';
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, animate = true, variant = 'default', ...props }, ref) => {
    const baseClasses =
      'flex h-12 w-full px-4 py-3 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground/80 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300';

    const variantClasses = {
      default:
        'rounded-2xl border border-input bg-background hover:border-primary/40 focus-visible:border-primary shadow-sm hover:shadow-md',
      glass:
        'rounded-2xl border border-white/20 bg-background/80 backdrop-blur-md hover:border-primary/40 focus-visible:border-primary shadow-lg hover:shadow-xl',
      minimal:
        'rounded-md border border-transparent bg-[var(--surface-subtle)]/60 focus-visible:bg-background focus-visible:border-primary/30 shadow-none hover:shadow-none',
      flat: 'rounded-2xl border border-input bg-background focus-visible:border-primary shadow-none hover:shadow-none',
      elevated:
        'rounded-2xl border border-input bg-background text-foreground shadow-none hover:shadow-md focus-visible:border-primary hover:ring-0',
    };

    if (animate) {
      return (
        <motion.input
          type={type}
          className={cn(baseClasses, variantClasses[variant], className)}
          ref={ref}
          whileFocus={{ scale: 1.0 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          {...(props as any)}
        />
      );
    }
    return <input type={type} className={cn(baseClasses, variantClasses[variant], className)} ref={ref} {...props} />;
  }
);
Input.displayName = 'Input';

export { Input };
