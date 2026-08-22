import React from "react";

import CategoryBadge from "./category-badge";

import { cn } from "@/lib/utils";

type SectionHeaderVariant = "default" | "light" | "dark";
type SectionHeaderLayout = "split" | "center" | "left";

interface SectionHeaderProps {
  /** Small label above the title (e.g., "AI MEDIA STUDIO", "PRICING") */
  category?: string;
  /** Main heading text */
  title: string;
  /** Supporting description text */
  description?: string;
  /** Optional icon for the category badge */
  icon?: React.ReactNode;
  /** Layout style: split (title left, description right), center, or left-aligned */
  layout?: SectionHeaderLayout;
  /** Color variant for different backgrounds */
  variant?: SectionHeaderVariant;
  /** Optional CTA element (button, link, etc.) */
  action?: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Override title size: 'sm' | 'md' | 'lg' | 'xl' */
  titleSize?: "sm" | "md" | "lg" | "xl";
}

export default function SectionHeader({
  title,
  icon,
  category,
  description,
  layout = "split",
  variant = "default",
  action,
  className = "",
  titleSize = "lg",
}: SectionHeaderProps) {
  const isCenter = layout === "center";
  const isLeft = layout === "left";

  const variantStyles = {
    default: {
      category: "text-primary",
      title: "text-foreground",
      description: "text-muted-foreground",
    },
    light: {
      category: "text-primary",
      title: "text-foreground",
      description: "text-muted-foreground",
    },
    dark: {
      category: "text-white/80",
      title: "text-white",
      description: "text-white/70",
    },
  };

  const titleSizes = {
    sm: "text-xl md:text-2xl lg:text-3xl",
    md: "text-2xl md:text-3xl lg:text-4xl",
    lg: "text-2xl md:text-4xl lg:text-5xl",
    xl: "text-3xl md:text-5xl lg:text-6xl",
  };

  const styles = variantStyles[variant];

  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        // Split layout: side by side on desktop
        layout === "split" &&
          "md:flex-row md:items-end md:justify-between md:gap-8",
        // Center layout: stacked and centered
        isCenter && "items-center text-center",
        // Left layout: stacked and left-aligned
        isLeft && "items-start",
        className,
      )}
    >
      {/* Title block */}
      <div
        className={cn(
          "flex flex-col gap-3 md:gap-4",
          layout === "split" && "flex-1",
          isCenter && "items-center",
        )}
      >
        {/* Category badge or simple label */}
        {category &&
          (icon ? (
            <CategoryBadge label={category} icon={icon} />
          ) : (
            <p
              className={cn(
                "text-sm font-medium uppercase tracking-wider",
                styles.category,
              )}
            >
              {category}
            </p>
          ))}

        {/* Title */}
        <h2
          className={cn(
            "font-heading font-bold text-balance leading-tight",
            titleSizes[titleSize],
            styles.title,
          )}
        >
          {title}
        </h2>

        {/* Description for center/left layouts (below title) */}
        {description && (isCenter || isLeft) && (
          <p
            className={cn(
              "text-lg md:text-xl text-pretty max-w-2xl",
              styles.description,
            )}
          >
            {description}
          </p>
        )}

        {/* Action for center/left layouts */}
        {action && (isCenter || isLeft) && <div className="mt-2">{action}</div>}
      </div>

      {/* Description block for split layout (right side) */}
      {layout === "split" && (description || action) && (
        <div className="flex flex-col gap-4 md:items-end md:text-end flex-1">
          {description && (
            <p
              className={cn(
                "text-lg md:text-xl text-pretty",
                styles.description,
              )}
            >
              {description}
            </p>
          )}
          {action && <div>{action}</div>}
        </div>
      )}
    </div>
  );
}
