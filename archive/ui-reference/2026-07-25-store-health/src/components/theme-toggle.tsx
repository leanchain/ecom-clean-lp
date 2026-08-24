'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import { cn } from '@/lib/utils';

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const buttonRef = React.useRef<HTMLButtonElement | null>(null);
  const [isTransitioning, setIsTransitioning] = React.useState(false);
  const isDark = (resolvedTheme || theme) === 'dark';

  const runWithViewTransition = (nextTheme: 'light' | 'dark') => {
    setIsTransitioning(true);

    if (typeof document === 'undefined' || !document.startViewTransition) {
      setTheme(nextTheme);
      setIsTransitioning(false);
      return;
    }

    const root = document.documentElement;
    const rect = buttonRef.current?.getBoundingClientRect();
    const x = rect ? (rect.left + rect.right) / 2 : window.innerWidth / 2;
    const y = rect ? (rect.top + rect.bottom) / 2 : window.innerHeight / 2;

    root.style.setProperty('--theme-x', `${(x / window.innerWidth) * 100}%`);
    root.style.setProperty('--theme-y', `${(y / window.innerHeight) * 100}%`);
    root.classList.remove('page-transition');
    root.classList.add('theme-transition');

    (document as any)
      .startViewTransition(() => {
        setTheme(nextTheme);
      })
      .finished.finally(() => {
        root.classList.remove('theme-transition');
        root.style.removeProperty('--theme-x');
        root.style.removeProperty('--theme-y');
        setIsTransitioning(false);
      });
  };

  const toggleTheme = () => {
    if (isTransitioning) return;
    const nextTheme: 'light' | 'dark' = isDark ? 'light' : 'dark';

    runWithViewTransition(nextTheme);
  };

  return (
    <button
      ref={buttonRef}
      type="button"
      aria-label="Toggle theme"
      aria-pressed={isDark}
      onClick={toggleTheme}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleTheme();
        }
      }}
      className={cn(
        'relative inline-flex h-10 w-10 items-center justify-center rounded-full text-foreground/80 transition-colors duration-200 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 cursor-pointer'
      )}
    >
      <span
        className={cn(
          'relative flex items-center justify-center transition-transform duration-250 ease-[cubic-bezier(0.22,1,0.36,1)]',
          isDark ? 'scale-95' : 'scale-100'
        )}
      >
        <Sun
          className={cn(
            'h-5 w-5 text-amber-500 transition-all duration-200',
            isDark ? 'opacity-0 scale-75' : 'opacity-100 scale-100'
          )}
        />
        <Moon
          className={cn(
            'absolute h-5 w-5 text-slate-200 transition-all duration-200',
            isDark ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
          )}
        />
      </span>
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}