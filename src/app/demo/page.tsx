"use client";

import { useEffect } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

/**
 * Legacy route. The canonical booking page is /store-health-review.
 * Host-level 301 lives in public/_redirects; this client redirect is the
 * static-export fallback so /demo never serves stale content on any host.
 */
export default function DemoRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/store-health-review");
  }, [router]);

  return (
    <div className="bg-surface flex min-h-screen items-center justify-center px-6">
      <p className="text-muted-foreground text-[15px]">
        Taking you to{" "}
        <Link
          href="/store-health-review"
          className="text-primary font-semibold hover:underline"
        >
          Book a Store Health Review
        </Link>
        …
      </p>
    </div>
  );
}
