import React from 'react';
import { cn } from '@/lib/utils';

interface CustomSelectProps {
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
  className?: string;
  label?: string;
  dense?: boolean;
  popupPosition?: 'top' | 'bottom';
  compact?: boolean;
}

interface CustomSelectTriggerProps {
  children: React.ReactNode;
  className?: string;
  dense?: boolean;
  compact?: boolean;
  onClick?: () => void;
}

interface CustomSelectContentProps {
  children: React.ReactNode;
  popupPosition?: 'top' | 'bottom';
  onClose?: () => void;
  onValueChange?: (value: string) => void;
  selectedValue?: string;
}

interface CustomSelectItemProps {
  value: string;
  children: React.ReactNode;
  isSelected?: boolean;
  onClick?: () => void;
}

export const CustomSelect: React.FC<CustomSelectProps> = ({
  value,
  onValueChange,
  children,
  className,
  label,
  dense = false,
  popupPosition = 'bottom',
  compact = false,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className={cn('flex flex-col gap-1', className)}>
      {label && !dense && (
        <label className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide">{label}</label>
      )}
      <div className="relative">
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child) && child.type === CustomSelectTrigger) {
            return React.cloneElement(child as React.ReactElement<CustomSelectTriggerProps>, {
              onClick: () => setIsOpen(!isOpen),
              dense,
              compact,
            });
          }
          if (React.isValidElement(child) && child.type === CustomSelectContent && isOpen) {
            return React.cloneElement(child as React.ReactElement<CustomSelectContentProps>, {
              onClose: () => setIsOpen(false),
              onValueChange,
              selectedValue: value,
              popupPosition,
            });
          }
          return child;
        })}
      </div>
    </div>
  );
};

export const CustomSelectTrigger: React.FC<CustomSelectTriggerProps> = ({
  children,
  className,
  onClick,
  dense = false,
  compact = false,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex items-center justify-between w-full bg-card border border-border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors',
        dense ? 'h-8 px-2 text-xs' : compact ? 'h-9 px-2.5 text-sm' : 'h-10 px-3 text-sm',
        className
      )}
    >
      {children}
      <svg
        className={cn('text-gray-400 transition-transform', dense ? 'w-3 h-3 ml-1' : 'w-4 h-4 ml-2')}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </button>
  );
};

export const CustomSelectContent: React.FC<
  CustomSelectContentProps & {
    onClose: () => void;
    onValueChange: (value: string) => void;
    selectedValue: string;
  }
> = ({ children, onClose, onValueChange, selectedValue, popupPosition = 'bottom' }) => {
  return (
    <>
      <div className="fixed inset-0 z-10" onClick={onClose} />
      <div
        className={cn(
          'absolute z-20 w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg',
          popupPosition === 'top' ? 'mb-1 bottom-full' : 'mt-1 top-full'
        )}
      >
        <div className="py-1 max-h-48 overflow-y-auto">
          {React.Children.map(children, (child) => {
            if (React.isValidElement(child) && child.type === CustomSelectItem) {
              return React.cloneElement(child as React.ReactElement<CustomSelectItemProps>, {
                isSelected: (child as any).props.value === selectedValue,
                onClick: () => {
                  onValueChange((child as any).props.value);
                  onClose();
                },
              });
            }
            return child;
          })}
        </div>
      </div>
    </>
  );
};

export const CustomSelectItem: React.FC<
  CustomSelectItemProps & {
    isSelected?: boolean;
    onClick?: () => void;
  }
> = ({ children, isSelected, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'w-full px-3 py-2 text-sm text-left hover:bg-gray-100 focus:outline-none focus:bg-gray-100',
        isSelected && 'bg-gray-50 font-medium'
      )}
    >
      {children}
    </button>
  );
};

export const CustomSelectValue: React.FC<{ placeholder?: string }> = ({ placeholder }) => {
  return <span className="text-gray-900">{placeholder}</span>;
};
