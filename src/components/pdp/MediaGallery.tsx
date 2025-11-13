"use client";
import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface MediaGalleryProps {
  images: { src: string; alt?: string }[];
  selectedIndex: number;
  onSelect: (index: number) => void;
}

export default function MediaGallery({
  images,
  selectedIndex,
  onSelect,
}: MediaGalleryProps) {
  const selected = images[selectedIndex] ?? images[0];

  return (
    <div className="w-full">
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl bg-card">
        {selected && (
          <Image
            src={selected.src}
            alt={selected.alt || "Product image"}
            fill
            className="object-contain"
            priority
          />
        )}
      </div>

      <div className="mt-4 grid grid-cols-5 gap-3">
        {images.map((img, idx) => (
          <button
            key={idx}
            type="button"
            className={cn(
              "relative aspect-square overflow-hidden rounded-xl border transition-all",
              idx === selectedIndex
                ? "border-ring ring-2 ring-ring/50"
                : "border-input hover:border-ring/50",
            )}
            onClick={() => onSelect(idx)}
            aria-label={`Select image ${idx + 1}`}
          >
            <Image
              src={img.src}
              alt={img.alt || `Thumbnail ${idx + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}

