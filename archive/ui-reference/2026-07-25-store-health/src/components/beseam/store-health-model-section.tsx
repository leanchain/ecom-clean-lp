import Image from "next/image";
import Link from "next/link";

import { CheckCircle2 } from "lucide-react";

import { Reveal } from "@/components/beseam/reveal";

const OUTCOMES = [
  "See the affected sessions and funnel stage",
  "Trace the issue back to its evidence",
  "Give the right owner a concrete next step",
];

export default function StoreHealthModelSection() {
  return (
    <section
      id="store-health"
      className="scroll-mt-20 border-t border-technical-rule bg-technical text-white"
    >
      <div className="section-pad mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.66fr)_minmax(0,1.34fr)] lg:gap-16">
          <Reveal>
            <p className="text-[14px] font-semibold text-brand">Store Health</p>
            <h2 className="editorial-heading mt-4 text-white">
              Catch the issue before the support ticket.
            </h2>
            <p className="mt-5 max-w-lg text-[17px] leading-relaxed text-white/70">
              Beseam turns storefront signals into a clear issue with affected
              scope, evidence, and the next investigation.
            </p>

            <ul id="how-it-works" className="mt-7 scroll-mt-24 space-y-3">
              {OUTCOMES.map((outcome) => (
                <li
                  key={outcome}
                  className="flex items-center gap-3 text-[14px] font-semibold text-white"
                >
                  <CheckCircle2
                    className="h-4 w-4 shrink-0 text-brand"
                    aria-hidden="true"
                  />
                  {outcome}
                </li>
              ))}
            </ul>

            <Link
              href="/shopify-store-health"
              className="mt-8 inline-flex min-h-11 items-center font-semibold text-brand underline-offset-4 hover:underline"
            >
              Explore Store Health →
            </Link>
          </Reveal>

          <Reveal delay={0.06} y={18}>
            <figure>
              <figcaption className="mb-3 flex items-center justify-between gap-3 text-[12px] font-medium text-white/52">
                <span>Example Store Health issue</span>
                <span>Purchase · High severity</span>
              </figcaption>
              <div className="overflow-hidden border border-white/15 bg-[#f8fafc] shadow-[0_28px_80px_rgba(0,0,0,0.3)]">
                <Image
                  src="/images/store-health/issue-detail.png"
                  alt="Store Health issue showing an add-to-cart failure, affected sessions, evidence, and a recommended next step"
                  width={996}
                  height={875}
                  sizes="(min-width: 1024px) 58vw, 94vw"
                  className="h-auto w-full"
                />
              </div>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
