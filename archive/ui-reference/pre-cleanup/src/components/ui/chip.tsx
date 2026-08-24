import React from 'react';
import { cn } from '@/lib/utils';

interface ChipProps {
  children: React.ReactNode;
  color?: string;
  className?: string;
}

export const Chip: React.FC<ChipProps> = ({ children, color, className }) => {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium',
        color || 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200',
        className
      )}
    >
      {children}
    </span>
  );
};
