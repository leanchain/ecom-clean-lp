'use client';
import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { motion } from 'framer-motion';

import { cn } from '@/lib/utils';

const cardVariants = cva(
  'rounded-2xl border bg-card text-card-foreground shadow-none transition-all duration-300 backdrop-blur-sm',
  {
    variants: {
      variant: {
        default: 'border-border hover:shadow-md hover:shadow-primary/5',
        elevated: 'shadow-xl hover:shadow-2xl',
        glass: 'bg-card/80 backdrop-blur-md border-white/20 shadow-xl hover:shadow-2xl',
        gradient: 'bg-gradient-to-br from-card via-card/95 to-card/80 border-border/50 shadow-xl hover:shadow-2xl',
        interactive: 'hover:shadow-xl cursor-pointer hover:border-primary/30 hover:bg-accent/10 hover:scale-[1.02]',
      },
      size: {
        default: '',
        sm: 'text-sm',
        lg: 'text-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface CardProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof cardVariants> {
  animate?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, size, animate = true, ...props }, ref) => {
    if (animate) {
      return (
        <motion.div
          ref={ref}
          className={cn(cardVariants({ variant, size, className }))}
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          whileHover={
            variant === 'interactive'
              ? {
                  y: -4,
                  scale: 1.02,
                  transition: { duration: 0.2, ease: 'easeOut' },
                }
              : undefined
          }
          transition={{ duration: 0.3, ease: 'easeOut' }}
          {...(props as any)}
        />
      );
    }
    return <div ref={ref} className={cn(cardVariants({ variant, size, className }))} {...props} />;
  }
);
Card.displayName = 'Card';

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex flex-col space-y-1.5 p-6', className)} {...props} />
  )
);
CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3 ref={ref} className={cn('font-semibold leading-none tracking-tight', className)} {...props} />
  )
);
CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn('text-sm text-muted-foreground', className)} {...props} />
  )
);
CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
);
CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn('flex items-center p-6 pt-0', className)} {...props} />
);
CardFooter.displayName = 'CardFooter';

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent, cardVariants };
