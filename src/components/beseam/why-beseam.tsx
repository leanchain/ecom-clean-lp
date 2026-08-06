import Link from "next/link";

import { ArrowRight } from "lucide-react";

import { Reveal } from "@/components/beseam/reveal";

// The argument, in the order it has to be believed. Kept as one numbered
// sequence so the page reads as a position, not a feature list.
const ARGUMENT = [
  [
    "The shift",
    "A buying question now gets answered before anyone reaches your storefront. That answer is assembled from your product data, your pages, and sources you do not control.",
  ],
  [
    "The blind spot",
    "Your platform reports one number, your ad accounts another, your analytics a third. None of them can tell you what an assistant said about your product this morning, or which competitor it named instead.",
  ],
  [
    "Why it stays broken",
    "Discovery work runs on a quarterly loop. An audit lands, someone ships half of it, nobody rechecks. By the time anyone knows whether it worked, the catalog, the campaigns and the assistants have all moved.",
  ],
  [
    "What we do instead",
    "Close the loop. Check continuously, trace each miss to the product field behind it, propose the exact change, then run the same question again. The loop is the product.",
  ],
  [
    "What we will not claim",
    "Placement inside an answer no vendor controls. A revenue number in the contract. Nothing customer-facing ships without your store access and a named approver.",
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
              Why Beseam exists
            </p>
            <h2 className="mt-7 max-w-[16ch] font-display text-[clamp(2.25rem,3.4vw,3.5rem)] font-normal leading-[1.05] tracking-[-0.02em]">
              Shoppers stopped starting at your store.
            </h2>
            <p className="mt-7 max-w-md text-[16px] leading-[1.7] text-white/72">
              Discovery moved into assistants. Checkout mostly did not. The
              product data those answers are built from is still yours to fix —
              and almost nobody is watching it.
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
              The check at the top of this page is the product running against
              live assistants, not a recorded demo. We run it on ourselves
              first.
            </p>

            <Link
              href="/manifesto"
              className="mt-6 inline-flex min-h-11 items-center gap-2 text-[14px] font-semibold text-[#e8653a] underline decoration-white/20 underline-offset-7 hover:decoration-[#e8653a]"
            >
              Read the manifesto{" "}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
