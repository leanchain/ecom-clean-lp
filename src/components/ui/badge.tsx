import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-info text-info-foreground hover:bg-info/80 shadow-sm',
        secondary: 'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive: 'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80 shadow-sm',
        success: 'border-transparent bg-success text-background hover:bg-success/80 shadow-sm',
        warning: 'border-transparent bg-warning text-foreground hover:bg-warning/80 shadow-sm',
        outline: 'text-foreground border-border hover:bg-[var(--surface-subtle)]/60',
        ghost: 'border-transparent hover:bg-[var(--surface-subtle)]/60 hover:text-foreground',
        gradient:
          'border-transparent bg-gradient-to-r from-primary to-accent text-background hover:from-primary/80 hover:to-accent/80 shadow-sm',
      },
      size: {
        default: 'px-2.5 py-0.5 text-xs',
        sm: 'px-2 py-0.5 text-xs',
        lg: 'px-3 py-1 text-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {
  pulse?: boolean;
}

function Badge({ className, variant, size, pulse, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant, size }), pulse && 'animate-pulse', className)} {...props} />;
}

export { Badge, badgeVariants };
