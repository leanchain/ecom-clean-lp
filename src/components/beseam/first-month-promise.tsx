import { BookReviewCta } from "@/components/beseam/book-review-cta";
import { Reveal } from "@/components/beseam/reveal";
import TrackedLink from "@/components/beseam/tracked-link";
import { APP_REGISTER_URL } from "@/lib/app-urls";

export default function FirstMonthPromise({
  showManifestoLink = true,
}: {
  showManifestoLink?: boolean;
}) {
  void showManifestoLink;

  return (
    <section
      id="promise"
      className="scroll-mt-24 border-t border-black/14 bg-[#faf1eb]"
    >
      <div className="mx-auto max-w-[92rem] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
        <Reveal>
          <div>
            <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.14em] text-signal-ink">
              Start
            </p>
            <h2 className="mt-6 max-w-[18ch] text-balance font-display text-[clamp(2.3rem,3.8vw,3.9rem)] font-normal leading-[1.03] tracking-[-0.02em] text-ink-deep">
              Start with one buying decision.
            </h2>
          </div>
        </Reveal>

        <Reveal delay={0.06}>
          <div className="mt-12 grid border-t-2 border-ink-deep lg:mt-16 lg:grid-cols-2">
            <article className="border-b border-black/16 py-8 lg:border-b-0 lg:pr-10 lg:py-10">
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-black/58">
                Your team
              </p>
              <h3 className="mt-4 font-display text-[clamp(1.65rem,2.3vw,2.2rem)] font-normal leading-[1.1] tracking-[-0.02em] text-ink-deep">
                Run Beseam yourself.
              </h3>
              <p className="mt-4 max-w-[46ch] text-[15px] leading-[1.7] text-black/66">
                Track the AI shopping questions that matter, act on what Beseam finds, and measure what changes.
              </p>
              <TrackedLink
                href={APP_REGISTER_URL}
                eventName="free_pilot_clicked"
                eventCategory="conversion"
                placement="first_month_promise"
                preserveUtm
                className="mt-7 inline-flex min-h-12 items-center justify-center border border-black/40 bg-transparent px-6 text-[15px] font-semibold text-[#151515] transition-colors hover:border-signal-ink hover:text-signal-ink"
              >
                Start free
              </TrackedLink>
            </article>

            <article className="py-8 lg:border-l lg:border-black/16 lg:bg-white/55 lg:px-10 lg:py-10">
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-signal-ink">
                With Beseam
              </p>
              <h3 className="mt-4 font-display text-[clamp(1.65rem,2.3vw,2.2rem)] font-normal leading-[1.1] tracking-[-0.02em] text-ink-deep">
                Have Beseam run the first loop with you.
              </h3>
              <p className="mt-4 max-w-[46ch] text-[15px] leading-[1.7] text-black/66">
                We find the gap, investigate it, turn the strongest evidence into a supported change, and measure what happens afterward.
              </p>
              <BookReviewCta
                variant="primary"
                location="first_month_promise"
                label="Work with Beseam"
                className="mt-7 min-h-12 gap-2 px-6 py-0 text-[15px] font-semibold"
              />
            </article>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
