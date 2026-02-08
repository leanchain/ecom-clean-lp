import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Analytics utilities
export interface GtagEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
  [key: string]: unknown; // Allow for additional custom parameters
}

// Declare global gtag function
declare global {
  interface Window {
    gtag: (command: 'config' | 'event' | 'js' | 'set', targetId: string | Date, config?: unknown) => void;
    dataLayer: unknown[];
  }
}
