import type { Metadata } from "next";

import LiveAnswerCheck from "@/components/beseam/answer-check";
import { buildPublicMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPublicMetadata({
  title: "See What Is Holding Your Store Back | Beseam",
  description:
    "See what’s stopping your products from being found. Observe the gaps, understand what is driving them, and decide what to change.",
  path: "/scan",
});

export default function ScanPage() {
  return (
    <section className="min-h-screen bg-[#faf1eb] text-[#111318]">
      <div className="mx-auto max-w-[92rem] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-[72rem] text-center">
          <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.14em] text-[#b8441d]">
            Start with Observe
          </p>
          <h1 className="mx-auto mt-7 max-w-[24ch] text-balance font-display text-[clamp(2.8rem,5vw,4.8rem)] font-normal leading-[1] tracking-[-0.025em]">
            What’s stopping your products from being found?
          </h1>
          <p className="mx-auto mt-7 max-w-[50ch] text-[17px] leading-[1.7] text-black/64">
            See the gaps. Then understand what is driving them and what to change.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-[76rem]">
          <LiveAnswerCheck placement="ai_discovery_scan" />
        </div>
      </div>
    </section>
  );
}
