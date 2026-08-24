'use client';

import { CircleCheck, Info, LoaderCircle, OctagonX, TriangleAlert } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Toaster as Sonner } from 'sonner';

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ position = 'bottom-right', ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme();

  const isDark =
    theme === 'dark' ||
    (theme === 'system' && typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  const successClasses = isDark
    ? '[--normal-bg:hsl(150,100%,6%)] [--normal-text:hsl(150,86%,65%)] [--normal-border:hsl(147,100%,12%)]'
    : '[--normal-bg:#dcfce7] [--normal-text:#166534] [--normal-border:#bbf7d0]';

  const errorClasses = isDark
    ? '[--normal-bg:hsl(358,76%,10%)] [--normal-text:hsl(358,100%,81%)] [--normal-border:hsl(357,89%,16%)]'
    : '[--normal-bg:#fee2e2] [--normal-text:#991b1b] [--normal-border:#fca5a5]';

  const warningClasses = isDark
    ? '[--normal-bg:hsl(64,100%,6%)] [--normal-text:hsl(46,87%,65%)] [--normal-border:hsl(60,100%,9%)]'
    : '[--normal-bg:#fef3c7] [--normal-text:#92400e] [--normal-border:#fcd34d]';

  const infoClasses = isDark
    ? '[--normal-bg:hsl(215,100%,6%)] [--normal-text:hsl(216,87%,65%)] [--normal-border:hsl(223,43%,17%)]'
    : '[--normal-bg:#dbeafe] [--normal-text:#1e40af] [--normal-border:#93c5fd]';

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className="toaster group"
      position={position}
      expand={true}
      gap={16}
      icons={{
        success: <CircleCheck className="h-4 w-4" />,
        info: <Info className="h-4 w-4" />,
        warning: <TriangleAlert className="h-4 w-4" />,
        error: <OctagonX className="h-4 w-4" />,
        loading: <LoaderCircle className="h-4 w-4 animate-spin" />,
      }}
      toastOptions={{
        classNames: {
          toast:
            'group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg',
          description: 'group-[.toast]:text-muted-foreground',
          actionButton: 'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
          cancelButton: 'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground',
          success: successClasses,
          error: errorClasses,
          warning: warningClasses,
          info: infoClasses,
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
