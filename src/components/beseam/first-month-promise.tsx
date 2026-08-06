import BookReviewCta from "@/components/beseam/book-review-cta";
import Reveal from "@/components/beseam/reveal";

export default function FirstMonthPromise({
  showManifestoLink: _showManifestoLink = true,
}: {
  showManifestoLink?: boolean;
}) {
  return (
    <section
      id="promise"
      className="scroll-mt-24 border-b border-black/18 bg-[#f6f6f6]"
    >
      <div className="mx-auto max-w-[92rem] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
        <Reveal className="grid gap-12 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-20">
          <div>
            <h2 className="max-w-[20ch] font-display text-[clamp(2rem,3.1vw,2.6rem)] font-normal leading-[1.06] tracking-[-0.02em] text-[#111318]">
              The first 30 days are free. At day 30, you decide.
            </h2>
          </div>

          <div className="self-end">
            <p className="max-w-[68ch] text-[17px] leading-[1.7] text-black/66">
              In the pilot window Beseam establishes the product baseline,
              monitors the agreed discovery paths, and brings you a material
              visibility issue with the evidence and the proposed fix. There is
              no fee for that window and no invoice at the end of it. If you do
              not think it was worth the access you gave us, you say so and we
              close it. There are no criteria for you to argue against.
            </p>

            <dl className="mt-10 border-y border-black/22">
              {[
                [
                  "You receive",
                  "A monitored product scope, baseline, alert evidence, and proposed fix — yours to keep whether or not you continue",
                ],
                [
                  "We recheck",
                  "The original visibility signal after your team makes the change",
                ],
                [
                  "The boundary",
                  "We promise useful monitoring and diagnosis, not a sales increase",
                ],
                [
                  "What we need",
                  "The agreed store and data access, and an hour from someone who knows the catalog",
                ],
                ["Who decides", "You do, at day 30, without giving a reason"],
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

            <BookReviewCta
              location="first_month_promise"
              label="Book a 20-minute review"
              className="mt-8 w-full sm:w-auto"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
