"use client";

import { useState } from "react";

import { Globe } from "lucide-react";

interface FaviconImageProps {
  domain: string;
  className?: string;
}

export function FaviconImage({ domain, className }: FaviconImageProps) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div
        className={`${className} flex items-center justify-center bg-muted/50 text-muted-foreground`}
      >
        <Globe className="h-1/2 w-1/2" />
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`https://www.google.com/s2/favicons?domain=${domain}&sz=64`}
      alt={`${domain} favicon`}
      className={className}
      onError={() => setError(true)}
    />
  );
}
