import Link from "next/link";

import { Activity } from "lucide-react";

import { BookReviewCta } from "@/components/beseam/book-review-cta";
import { Reveal } from "@/components/beseam/reveal";
import WorkspaceShowcase from "@/components/beseam/workspace-showcase";

export default function HeroSection() {
  return (
    <section className="overflow-hidden bg-surface">
      <div className="mx-auto max-w-6xl px-6 pb-12 pt-16 md:pb-16 md:pt-24">
        <Reveal>
          <p className="editorial-eyebrow flex items-center gap-2 text-primary">
            <Activity className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
            Beseam for ecommerce teams
          </p>
          <h1 className="mt-5 max-w-[17ch] text-balance text-[clamp(2.75rem,6vw,5.25rem)] font-semibold leading-[0.98] tracking-[-0.035em] text-ink">
            AI Visibility. Store Health.
          </h1>
          <p className="editorial-body mt-7 max-w-2xl text-foreground">
            Two focused products for the teams accountable for how products are
            discovered and bought.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <BookReviewCta
              location="hero"
              label="Book a Beseam review"
              className="w-full sm:w-auto"
            />
            <Link
              href="#product"
              className="inline-flex min-h-11 items-center justify-center font-semibold text-ink underline-offset-4 hover:text-primary hover:underline sm:justify-start"
            >
              Explore both products ↓
            </Link>
          </div>
        </Reveal>
      </div>

      <Reveal
        delay={0.08}
        y={20}
        className="mx-auto max-w-7xl px-6 pb-16 md:pb-24"
      >
        <WorkspaceShowcase />
      </Reveal>
    </section>
  );
}
