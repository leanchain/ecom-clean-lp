"use client";

import { useEffect } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

/**
 * Legacy route. The canonical setup page is /product-visibility-monitoring.
 * Host-level 301 lives in public/_redirects; this client redirect is the
 * static-export fallback so /demo never serves stale content on any host.
 */
export default function DemoRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/product-visibility-monitoring");
  }, [router]);

  return (
    <div className="bg-surface flex min-h-screen items-center justify-center px-6">
      <p className="text-muted-foreground text-[15px]">
        Taking you to{" "}
        <Link
          href="/product-visibility-monitoring"
          className="text-primary font-semibold hover:underline"
        >
          Book a Store Health Review
        </Link>
        …
      </p>
    </div>
  );
}
