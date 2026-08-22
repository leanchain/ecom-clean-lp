import TrackedLink from "@/components/beseam/tracked-link";
import Reveal from "@/components/beseam/reveal";

const APP_REGISTER_URL = "https://app.beseam.com/register";

export default function FirstMonthPromise({
  showManifestoLink = true,
}: {
  showManifestoLink?: boolean;
}) {
  void showManifestoLink;

  return (
    <section id="promise" className="scroll-mt-24 bg-[#faf1eb]">
      <div className="mx-auto max-w-[92rem] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
        <Reveal className="grid gap-12 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-20">
          <div>
            <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.14em] text-[#b8441d]">
              Our guarantee
            </p>
            <h2 className="mt-4 max-w-[20ch] font-display text-[clamp(2rem,3.1vw,2.6rem)] font-normal leading-[1.06] tracking-[-0.02em] text-[#111318]">
              Let Beseam find one worthwhile fix and prove what changed: free
              for 30 days.
            </h2>
          </div>

          <div className="self-end">
            <p className="max-w-[68ch] text-[17px] leading-[1.7] text-black/66">
              We start with one commercially meaningful problem somewhere from
              discovery through conversion. Beseam brings the evidence together,
              proposes a supported change, and measures the relevant signal
              again after approved work. The fix might be product data, content,
              merchandising, creative, or a supported store experience. You pay
              nothing for the first 30 days. Then you decide whether Beseam
              earned the right to continue.
            </p>

            <dl className="mt-10 border-y border-black/22">
              {[
                [
                  "You receive",
                  "A prioritized issue, supporting evidence, proposed change, and before/after measurement",
                ],
                [
                  "We re-check",
                  "The original discovery or conversion signal after the approved change",
                ],
                [
                  "We do not promise",
                  "Recommendation placement or a guaranteed traffic, conversion, or sales increase",
                ],
                [
                  "What we need",
                  "Your store domain to start. Store access or analytics connections only when the work needs them",
                ],
                ["Who decides", "You do, at day 30"],
              ].map(([term, detail]) => (
                <div
                  key={term}
                  className="grid gap-2 border-b border-black/18 py-5 last:border-b-0 sm:grid-cols-[10rem_1fr] sm:gap-8"
                >
                  <dt className="font-mono text-[12px] font-semibold uppercase tracking-[0.1em] text-black/62">
                    {term}
                  </dt>
                  <dd className="text-[14px] leading-relaxed text-black/64">
                    {detail}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <TrackedLink
                href={APP_REGISTER_URL}
                eventName="free_pilot_clicked"
                eventCategory="conversion"
                placement="first_month_promise"
                preserveUtm
                className="inline-flex min-h-11 items-center justify-center bg-[#111318] px-5 text-[14px] font-semibold text-white transition-colors hover:bg-[#b8441d]"
              >
                Start my free 30 days
              </TrackedLink>
              <TrackedLink
                href="/product-visibility-monitoring"
                eventName="pilot_review_clicked"
                eventCategory="conversion"
                placement="first_month_promise"
                preserveUtm
                className="inline-flex min-h-11 items-center justify-center px-2 text-[14px] font-semibold text-[#111318] underline decoration-black/30 underline-offset-6 hover:decoration-[#b8441d]"
              >
                Prefer a walkthrough? Book 20 minutes
              </TrackedLink>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
