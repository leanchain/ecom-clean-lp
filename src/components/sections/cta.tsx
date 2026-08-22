"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { ChevronRight } from "lucide-react";

import AnimatedBorderButton from "../animated-border-button";

const CTA = () => {
  const pathname = usePathname();
  const shouldShowCTA = ![
    "/privacy-policy",
    "/terms-of-service",
    "/alternatives",
    "/compare",
    "/demo",
  ].includes(pathname);

  if (!shouldShowCTA) return null;

  return (
    <section className="bg-card py-15">
      <div className="container flex flex-col justify-between gap-8 md:flex-row md:gap-16">
        <div className="space-y-6 sm:min-w-[440px] md:space-y-8 lg:w-[569px] lg:shrink-0">
          <h2 className="text-5xl leading-13 font-bold md:text-6xl md:leading-18">
            Ship PDP changes safely.
          </h2>

          <AnimatedBorderButton
            asChild
            wrapperClassName="w-fit"
            className="gap-2.5 pe-3 [&_svg]:transition-transform hover:[&_svg]:translate-x-0.25"
          >
            <Link
              href="https://app.beseam.com/analyze"
              target="_blank"
              rel="noopener noreferrer"
            >
              Run Free PDP Audit
              <span className="bg-background text-foreground rounded-full p-2">
                <ChevronRight />
              </span>
            </Link>
          </AnimatedBorderButton>
        </div>
        <div className="max-w-xl space-y-4">
          <h3 className="text-3xl font-bold">
            Every change. Revenue-guardrailed.
          </h3>
          <p className="text-xl leading-8">
            Whether updates come from your SEO agency, dev team, or
            Beseam&apos;s AI recommendations - every PDP change is versioned,
            monitored, and reversible. Ship improvements without risking
            conversion.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTA;
