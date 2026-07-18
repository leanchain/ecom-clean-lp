import Image from "next/image";
import Link from "next/link";

import { Reveal } from "@/components/beseam/reveal";

const TRUST_POINTS = [
  {
    title: "Real source state",
    body: "Fresh, stale, failed and not-configured sources remain visible in the health view.",
  },
  {
    title: "Careful attribution",
    body: "Evidence and likely causes stay separate when the product cannot confirm causality.",
  },
];

export default function FounderSection() {
  return (
    <section className="border-t border-technical-rule bg-technical text-white">
      <div className="section-pad-tight mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.62fr)] lg:items-center lg:gap-16">
        <Reveal>
          <p className="text-[13px] font-semibold text-brand">Why Beseam</p>
          <h2 className="editorial-heading mt-4 text-white">
            Built by Pankaj Kumar, a former Google and Amazon engineer focused
            on measurement, reliability and large-scale data systems.
          </h2>
          <p className="mt-6 max-w-3xl text-[17px] leading-relaxed text-white/72">
            Beseam applies that reliability mindset to the changes, signals and
            failures that are otherwise difficult to see inside a Shopify store.
          </p>

          <div className="mt-8 grid border-y border-white/16 sm:grid-cols-2">
            {TRUST_POINTS.map((point, index) => (
              <div
                key={point.title}
                className={
                  "py-5 " +
                  (index === 1
                    ? "border-t border-white/16 sm:border-l sm:border-t-0 sm:pl-7"
                    : "sm:pr-7")
                }
              >
                <h3 className="text-[15px] font-semibold text-white">
                  {point.title}
                </h3>
                <p className="mt-2 text-[14px] leading-relaxed text-white/66">
                  {point.body}
                </p>
              </div>
            ))}
          </div>

          <Link
            href="/about"
            className="mt-7 inline-flex min-h-11 items-center gap-2 font-semibold text-brand underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:ring-brand"
          >
            Meet the founder and advisors
            <span aria-hidden>→</span>
          </Link>
        </Reveal>

        <Reveal delay={0.06}>
          <figure className="overflow-hidden rounded-xl border border-white/16 bg-white/5">
            <Image
              src="/images/about/pankaj-kumar.jpg"
              alt="Pankaj Kumar, founder of Beseam"
              width={640}
              height={800}
              sizes="(min-width: 1024px) 34vw, 90vw"
              className="aspect-[4/5] h-auto w-full object-cover"
            />
            <figcaption className="border-t border-white/16 px-5 py-4">
              <p className="text-[15px] font-semibold">Pankaj Kumar</p>
              <p className="mt-1 text-[13px] text-white/60">Founder, Beseam</p>
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
