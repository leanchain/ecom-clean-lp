import * as React from 'react';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';

import { cn } from '@/lib/utils';
import { ButtonProps } from '@/components/ui/button';

export interface PaginationControlProps {
  page: number;
  onChange: (page: number) => void;
  totalPages: number;
  showEdges?: boolean;
  className?: string;
}

const Pagination = ({ className, ...props }: React.ComponentProps<'nav'>) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn('mx-auto flex w-full justify-center', className)}
    {...props}
  />
);
Pagination.displayName = 'Pagination';

const PaginationContent = React.forwardRef<HTMLUListElement, React.ComponentProps<'ul'>>(
  ({ className, ...props }, ref) => (
    <ul ref={ref} className={cn('flex flex-row items-center gap-1', className)} {...props} />
  )
);
PaginationContent.displayName = 'PaginationContent';

const PaginationItem = React.forwardRef<HTMLLIElement, React.ComponentProps<'li'>>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn('', className)} {...props} />
));
PaginationItem.displayName = 'PaginationItem';

type PaginationLinkProps = {
  isActive?: boolean;
} & Pick<ButtonProps, 'size'> &
  React.ComponentProps<'a'>;

const PaginationLink = ({ className, isActive, size = 'icon', ...props }: PaginationLinkProps) => (
  <a
    aria-current={isActive ? 'page' : undefined}
    className={cn(
      'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
      size === 'icon' ? 'h-9 w-9' : 'h-9 px-3',
      isActive
        ? 'bg-primary text-primary-foreground hover:bg-primary/90'
        : 'hover:bg-[var(--surface-subtle)]/60 hover:text-foreground',
      className
    )}
    {...props}
  />
);
PaginationLink.displayName = 'PaginationLink';

const PaginationPrevious = ({ className, ...props }: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink aria-label="Go to previous page" size="default" className={cn('gap-1 pl-2.5', className)} {...props}>
    <ChevronLeft className="h-4 w-4" />
    <span>Previous</span>
  </PaginationLink>
);
PaginationPrevious.displayName = 'PaginationPrevious';

const PaginationNext = ({ className, ...props }: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink aria-label="Go to next page" size="default" className={cn('gap-1 pr-2.5', className)} {...props}>
    <span>Next</span>
    <ChevronRight className="h-4 w-4" />
  </PaginationLink>
);
PaginationNext.displayName = 'PaginationNext';

const PaginationEllipsis = ({ className, ...props }: React.ComponentProps<'span'>) => (
  <span aria-hidden className={cn('flex h-9 w-9 items-center justify-center', className)} {...props}>
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More pages</span>
  </span>
);
PaginationEllipsis.displayName = 'PaginationEllipsis';

/**
 * PaginationControl - A controlled pagination component
 *
 * Usage:
 * <PaginationControl
 *   page={currentPage}
 *   onChange={setCurrentPage}
 *   totalPages={totalPages}
 *   showEdges
 * />
 */
const PaginationControl = React.forwardRef<HTMLDivElement, PaginationControlProps>(
  ({ page, onChange, totalPages, showEdges = false, className }, ref) => {
    if (totalPages <= 1) return null;

    const handlePrevious = () => {
      if (page > 1) onChange(Math.max(1, page - 1));
    };

    const handleNext = () => {
      if (page < totalPages) onChange(Math.min(totalPages, page + 1));
    };

    const handlePageClick = (pageNum: number) => {
      onChange(pageNum);
    };

    // Generate page numbers to display
    const getPageNumbers = () => {
      const pages: (number | string)[] = [];

      if (showEdges) {
        // Show first page
        pages.push(1);

        // Show ellipsis if needed
        if (page > 3) {
          pages.push('ellipsis-start');
        }

        // Show pages around current page
        const start = Math.max(2, page - 1);
        const end = Math.min(totalPages - 1, page + 1);

        for (let i = start; i <= end; i++) {
          if (i !== 1 && i !== totalPages) {
            pages.push(i);
          }
        }

        // Show ellipsis if needed
        if (page < totalPages - 2) {
          pages.push('ellipsis-end');
        }

        // Show last page
        if (totalPages > 1) {
          pages.push(totalPages);
        }
      } else {
        // Without edges, show pages around current page
        const start = Math.max(1, page - 1);
        const end = Math.min(totalPages, page + 1);

        for (let i = start; i <= end; i++) {
          pages.push(i);
        }
      }

      return pages;
    };

    const pageNumbers = getPageNumbers();

    return (
      <div ref={ref} className={cn('flex justify-center', className)}>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={handlePrevious}
                className={page === 1 || totalPages === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
              />
            </PaginationItem>

            {pageNumbers.map((pageNum, index) => {
              if (pageNum === 'ellipsis-start' || pageNum === 'ellipsis-end') {
                return (
                  <PaginationItem key={`${pageNum}-${index}`}>
                    <PaginationEllipsis />
                  </PaginationItem>
                );
              }

              return (
                <PaginationItem key={pageNum}>
                  <PaginationLink
                    onClick={() => handlePageClick(pageNum as number)}
                    isActive={page === pageNum}
                    className={page === pageNum ? '' : 'cursor-pointer'}
                  >
                    {pageNum}
                  </PaginationLink>
                </PaginationItem>
              );
            })}

            <PaginationItem>
              <PaginationNext
                onClick={handleNext}
                className={
                  page === totalPages || totalPages === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    );
  }
);

PaginationControl.displayName = 'PaginationControl';

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationControl,
};
