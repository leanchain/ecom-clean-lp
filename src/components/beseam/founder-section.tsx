import Image from "next/image";
import Link from "next/link";

import { CheckCircle2 } from "lucide-react";

import { Reveal } from "@/components/beseam/reveal";

const TRUST_POINTS = [
  {
    title: "Source truth",
    body: "Fresh, stale, failed, unknown, and unavailable states remain visible instead of being flattened into a score.",
  },
  {
    title: "Human control",
    body: "Campaign approval and publishing stay explicit, attributable, and Admin-controlled before spend can begin.",
  },
  {
    title: "Commercial honesty",
    body: "Booked, observed, attributed, and modeled values are labeled separately, with confidence and method disclosed.",
  },
] as const;

export default function FounderSection() {
  return (
    <section className="border-b border-rule bg-surface">
      <div className="section-pad mx-auto grid max-w-[88rem] gap-12 px-6 lg:grid-cols-[minmax(20rem,0.62fr)_minmax(0,1.38fr)] lg:items-center lg:gap-20">
        <Reveal>
          <figure className="overflow-hidden rounded-[1.25rem] border border-rule bg-panel shadow-sm">
            <Image
              src="/images/about/pankaj-kumar.jpg"
              alt="Pankaj Kumar, founder of Beseam"
              width={640}
              height={800}
              sizes="(min-width: 1024px) 34vw, 90vw"
              className="aspect-[4/5] h-auto w-full object-cover"
            />
            <figcaption className="border-t border-rule px-5 py-4">
              <p className="text-[15px] font-semibold text-ink">Pankaj Kumar</p>
              <p className="mt-1 text-[13px] text-muted-foreground">Founder, Beseam</p>
            </figcaption>
          </figure>
        </Reveal>

        <Reveal delay={0.06}>
          <p className="editorial-eyebrow text-primary">Built for operational trust</p>
          <h2 className="editorial-heading mt-5 max-w-[16ch] font-bold text-ink">
            Reliability thinking, applied to <em className="font-semibold text-primary">ecommerce decisions.</em>
          </h2>
          <p className="mt-6 max-w-3xl text-[17px] leading-relaxed text-foreground">
            Beseam is built by Pankaj Kumar, a former Google and Amazon engineer focused on measurement, reliability, and large-scale data systems. The product applies that discipline to store operations, discovery, campaign readiness, and commercial impact.
          </p>

          <div className="mt-9 border-t border-rule">
            {TRUST_POINTS.map((point) => (
              <div key={point.title} className="grid gap-3 border-b border-rule py-5 sm:grid-cols-[2rem_minmax(0,0.42fr)_minmax(0,1fr)] sm:gap-5">
                <CheckCircle2 className="h-5 w-5 text-primary" strokeWidth={1.7} aria-hidden="true" />
                <h3 className="text-[15px] font-semibold text-ink">{point.title}</h3>
                <p className="text-[14px] leading-relaxed text-muted-foreground">{point.body}</p>
              </div>
            ))}
          </div>

          <Link
            href="/about"
            className="mt-7 inline-flex min-h-11 items-center gap-2 font-semibold text-primary underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:ring-primary"
          >
            Meet the founder and advisors
            <span aria-hidden>→</span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
