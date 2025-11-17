"use client";
import React from "react";
import Image from "next/image";
import { Star, ShieldCheck, Package, Headphones } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface VariantOption {
  id: string;
  name: string;
  image: string;
}

interface PurchasePanelProps {
  title: string;
  description?: string;
  price: number;
  originalPrice?: number;
  variants: VariantOption[];
  selectedVariantId: string;
  onSelectVariant: (id: string) => void;
}

export default function PurchasePanel({
  title,
  description,
  price,
  originalPrice,
  variants,
  selectedVariantId,
  onSelectVariant,
}: PurchasePanelProps) {
  const [qty, setQty] = React.useState(1);

  const handleQtyChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const v = parseInt(e.target.value, 10);
    setQty(Number.isNaN(v) || v < 1 ? 1 : v);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
          {title}
        </h1>
        {description && (
          <p className="mt-3 text-lg text-muted-foreground max-w-prose">
            {description}
          </p>
        )}
        <div className="mt-4 flex items-center gap-2 text-amber-500">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="fill-current" />
          ))}
          <span className="text-sm text-muted-foreground">(128 reviews)</span>
        </div>
      </div>

      <div className="flex items-baseline gap-3">
        <div className="text-3xl font-semibold">${price}</div>
        {originalPrice && (
          <div className="text-lg line-through text-muted-foreground">
            ${originalPrice}
          </div>
        )}
      </div>

      {/* Variant selector */}
      {variants.length > 0 && (
        <div className="space-y-3">
          <div className="text-sm text-muted-foreground">Choose a style</div>
          <div className="flex flex-wrap gap-3">
            {variants.map((v) => (
              <button
                key={v.id}
                type="button"
                className={cn(
                  "relative flex items-center gap-2 rounded-2xl border p-2 pr-3 transition-all",
                  v.id === selectedVariantId
                    ? "border-ring ring-2 ring-ring/50"
                    : "border-input hover:border-ring/50",
                )}
                onClick={() => onSelectVariant(v.id)}
                aria-pressed={v.id === selectedVariantId}
              >
                <span className="relative block size-8 overflow-hidden rounded-xl">
                  <Image src={v.image} alt={v.name} fill className="object-cover" />
                </span>
                <span className="text-sm">{v.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quantity + CTAs */}
      <div className="flex items-center gap-3">
        <div className="w-24">
          <Input
            type="number"
            min={1}
            value={qty}
            onChange={handleQtyChange}
            aria-label="Quantity"
          />
        </div>
        <Button size="lg" className="rounded-full">Add to cart</Button>
        <Button size="lg" variant="outline" className="rounded-full">
          Buy it now
        </Button>
      </div>

      {/* Trust badges */}
      <div className="grid grid-cols-1 gap-3 text-sm text-muted-foreground md:grid-cols-3">
        <div className="flex items-center gap-2">
          <Headphones className="size-4" />
          24/7 customer support
        </div>
        <div className="flex items-center gap-2">
          <Package className="size-4" />
          Free shipping over $150
        </div>
        <div className="flex items-center gap-2">
          <ShieldCheck className="size-4" />
          Secure checkout
        </div>
      </div>

      <div className="text-sm text-muted-foreground">
        Ships in 1–2 business days. Easy returns within 30 days.
      </div>
    </div>
  );
}

