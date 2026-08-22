import Link from "next/link";

import { ArrowRight } from "lucide-react";

import { Reveal } from "@/components/beseam/reveal";

const ARGUMENT = [
  [
    "See the loss",
    "A product can disappear before the click or a shopper can fail to find and choose it onsite. Beseam brings external discovery and onsite behavior into the same commerce picture.",
  ],
  [
    "Narrow the problem",
    "Compare product and store facts, competitor evidence, search and discovery behavior, and conversion signals to narrow the problem to something you can actually change.",
  ],
  [
    "Ship the fix",
    "Turn the diagnosis into approved work across product data, content, merchandising, creative, and supported store experiences. Publish or hand it off, with the previous value kept when Beseam makes the change.",
  ],
  [
    "Prove the result",
    "Re-check the original discovery signal and measure downstream behavior, conversion, orders, or revenue separately. Keep observed results distinct from modeled estimates and unsupported causal claims.",
  ],
] as const;

export default function WhyBeseam() {
  return (
    <section
      id="why"
      className="scroll-mt-24 border-b border-black/18 bg-[#111318] text-white"
    >
      <div className="mx-auto max-w-[92rem] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
        <Reveal className="grid gap-12 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-20">
          <div>
            <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.14em] text-[#e8653a]">
              From signal to shipped work
            </p>
            <h2 className="mt-7 max-w-[16ch] font-display text-[clamp(2.25rem,3.4vw,3.5rem)] font-normal leading-[1.05] tracking-[-0.02em]">
              Another dashboard does not fix your store.
            </h2>
            <p className="mt-7 max-w-md text-[16px] leading-[1.7] text-white/72">
              Discovery, catalog, brand, onsite search, creative, conversion,
              and analytics usually live in separate tools. Beseam connects the
              evidence so the output is not another report: it is the next piece
              of work worth doing.
            </p>
            <p className="mt-5 max-w-md text-[14px] leading-[1.7] text-white/56">
              I kept seeing ecommerce teams find a problem in one tool, make a
              change somewhere else, and lose the proof in between. Beseam is
              built to keep the problem, the approved fix, and the measured
              result together. Before Beseam, I worked on measurement and
              reliability at Google and Amazon.{" "}
              <Link
                href="/manifesto"
                className="underline decoration-white/25 underline-offset-4 hover:decoration-white/60"
              >
                Why I&rsquo;m building Beseam
              </Link>
              .
            </p>
          </div>

          <div className="border-t border-white/22">
            {ARGUMENT.map(([title, body], index) => (
              <article
                key={title}
                className="grid gap-3 border-b border-white/18 py-6 sm:grid-cols-[3rem_13rem_1fr] sm:gap-6"
              >
                <span className="font-mono text-[12px] text-white/72">
                  0{index + 1}
                </span>
                <h3 className="text-[16px] font-semibold text-white/88">
                  {title}
                </h3>
                <p className="text-[14px] leading-relaxed text-white/72">
                  {body}
                </p>
              </article>
            ))}

            <p className="mt-8 max-w-[64ch] text-[15px] leading-[1.7] text-white/72">
              The free AI check on this page is one live external-discovery
              signal, not the whole product. Inside Beseam, that signal joins
              store, product, brand, search, behavior, creative, conversion, and
              impact evidence.
            </p>

            <Link
              href="/platform"
              className="mt-6 inline-flex min-h-11 items-center gap-2 text-[14px] font-semibold text-[#e8653a] underline decoration-white/20 underline-offset-7 hover:decoration-[#e8653a]"
            >
              See the platform{" "}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
