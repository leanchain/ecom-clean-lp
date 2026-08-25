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
    <section id="promise" className="scroll-mt-24 bg-[#faf1eb]">
      <div className="mx-auto max-w-[92rem] px-5 pb-20 pt-12 sm:px-8 sm:pb-24 sm:pt-16 lg:px-10 lg:pb-28 lg:pt-16">
        <Reveal className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-end lg:gap-20">
          <div>
            <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.14em] text-[#b8441d]">
              Your first 30 days
            </p>
            <h2 className="mt-4 max-w-[20ch] font-display text-[clamp(2rem,3.1vw,2.6rem)] font-normal leading-[1.06] tracking-[-0.02em] text-[#111318]">
              Your first improvement, with us.
            </h2>
          </div>

          <div className="self-end">
            <p className="max-w-[58ch] text-[17px] leading-[1.7] text-black/66">
              For the first 30 days, we work as an extension of your commerce
              team. Give Beseam one meaningful commercial problem and we&rsquo;ll
              connect the relevant evidence, investigate what may explain it,
              decide with you what deserves action, help make a supported change,
              and measure what happens next.
            </p>
            <div className="mt-7 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
              <BookReviewCta
                variant="primary"
                location="first_month_promise"
                label="Work with Beseam"
                className="min-h-11 gap-2 px-5 py-0 text-[14px] font-semibold"
              />
              <TrackedLink
                href={APP_REGISTER_URL}
                eventName="free_pilot_clicked"
                eventCategory="conversion"
                placement="first_month_promise"
                preserveUtm
                className="inline-flex min-h-11 items-center justify-center border border-black/40 bg-transparent px-5 text-[14px] font-semibold text-[#151515] transition-colors hover:border-[#b8441d] hover:text-[#b8441d]"
              >
                Start free yourself
              </TrackedLink>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
