'use client';

import React from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Badge } from '@/components/ui/badge';
import { ChevronDown, ChevronRight, Database } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CodeViewer } from '@/components/ui/code-viewer';

interface MetafieldsDisplayProps {
  metafields?: any;
  title?: string;
  className?: string;
}

export const MetafieldsDisplay: React.FC<MetafieldsDisplayProps> = ({
  metafields,
  title = 'Metafields',
  className,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  if (!metafields || metafields.length === 0) {
    return null;
  }

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className={className}>
      <CollapsibleTrigger className="flex items-center gap-2 w-full text-left p-2 rounded-md hover:bg-[var(--surface-subtle)]/60 transition-colors">
        {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        <Database className="h-4 w-4" />
        <span className="font-medium">{title}</span>
        <Badge variant="secondary" className="ml-auto">
          {metafields.length}
        </Badge>
      </CollapsibleTrigger>

      <CollapsibleContent className="space-y-2 mt-2">
        <div className="border rounded-md p-3 bg-background">
          {metafields.map((metafield: any, index: number) => (
            <div
              key={`${metafield.namespace}-${metafield.key}-${index}`}
              className={cn('border-b border-border/50 pb-3 mb-3 last:border-b-0 last:pb-0 last:mb-0', 'space-y-2')}
            >
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="outline" className="text-xs">
                  {metafield.namespace}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {metafield.key}
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  {metafield.value_type}
                </Badge>
              </div>

              <div className="text-sm">
                <div className="font-medium text-muted-foreground mb-1">Value:</div>
                <CodeViewer value={metafield.value} maxHeight="200px" minHeight="40px" />
              </div>

              {metafield.description && (
                <div className="text-sm">
                  <div className="font-medium text-muted-foreground mb-1">Description:</div>
                  <div className="text-xs text-muted-foreground">{metafield.description}</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

interface MetafieldsSectionProps {
  productMetafields?: any;
  variantMetafields?: any;
  imageMetafields?: any;
  className?: string;
}

export const MetafieldsSection: React.FC<MetafieldsSectionProps> = ({
  productMetafields,
  variantMetafields,
  imageMetafields,
  className,
}) => {
  const hasAnyMetafields =
    (productMetafields && productMetafields.length > 0) ||
    (variantMetafields && variantMetafields.length > 0) ||
    (imageMetafields && imageMetafields.length > 0);

  if (!hasAnyMetafields) {
    return null;
  }

  return (
    <div className={cn('space-y-3', className)}>
      {productMetafields && productMetafields.length > 0 && (
        <MetafieldsDisplay metafields={productMetafields} title="Product Metafields" />
      )}

      {variantMetafields && variantMetafields.length > 0 && (
        <MetafieldsDisplay metafields={variantMetafields} title="Variant Metafields" />
      )}

      {imageMetafields && imageMetafields.length > 0 && (
        <MetafieldsDisplay metafields={imageMetafields} title="Image Metafields" />
      )}
    </div>
  );
};
