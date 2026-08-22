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
              Free for 30 days
            </p>
            <h2 className="mt-4 max-w-[20ch] font-display text-[clamp(2rem,3.1vw,2.6rem)] font-normal leading-[1.06] tracking-[-0.02em] text-[#111318]">
              Find one worthwhile improvement. Make it. Measure what changed.
            </h2>
          </div>

          <div className="self-end">
            <p className="max-w-[54ch] text-[17px] leading-[1.7] text-black/66">
              Give Beseam 30 days to find an opportunity, help you act on it,
              and measure the result.
            </p>

            <dl className="mt-10 border-y border-black/22">
              {[
                [
                  "You get",
                  "Evidence, a prioritized action, and before/after measurement",
                ],
                [
                  "You stay in control",
                  "Nothing customer-facing changes without your approval",
                ],
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
                Start free for 30 days
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
