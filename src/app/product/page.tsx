import Link from "next/link";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Store Health for Shopify | Beseam" },
  description:
    "Beseam brings Shopify discoverability, purchase health and monitoring coverage into one evidence-backed view.",
  alternates: { canonical: "/shopify-store-health" },
  robots: { index: false, follow: true },
};

export default function ProductLegacyPage() {
  return (
    <section className="flex min-h-[70vh] items-center bg-surface px-6">
      <div className="mx-auto max-w-2xl">
        <p className="editorial-eyebrow text-primary">Store Health</p>
        <h1 className="editorial-heading mt-4 text-ink">
          Discoverability and purchase health, in one view.
        </h1>
        <p className="editorial-body mt-5 text-foreground">
          The canonical product overview now lives on the Store Health page.
        </p>
        <Link
          href="/shopify-store-health"
          className="mt-7 inline-flex min-h-11 items-center rounded-full bg-primary px-6 text-[14px] font-semibold text-primary-foreground"
        >
          See how Store Health works
        </Link>
      </div>
    </section>
  );
}
