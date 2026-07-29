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
      className="scroll-mt-24 border-b border-black/18 bg-[#ebe8df]"
    >
      <div className="mx-auto max-w-[92rem] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
        <Reveal className="grid gap-12 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-20">
          <div>
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-black/58">
              The first-month promise
            </p>
            <h2 className="mt-6 max-w-[11ch] font-serif text-[clamp(2.8rem,4.4vw,4.4rem)] font-normal leading-[1.02] tracking-[-0.04em] text-[#111318]">
              If we cannot set up useful product visibility monitoring in 30
              days, you pay nothing.
            </h2>
          </div>

          <div className="self-end">
            <p className="max-w-2xl text-[17px] leading-[1.7] text-black/66">
              During an agreed pilot, Beseam must establish the product
              baseline, monitor the agreed discovery paths, identify a material
              visibility issue, and show the evidence and proposed fix. If we
              cannot, the engagement ends and you owe us nothing.
            </p>

            <dl className="mt-10 border-y border-black/22">
              {[
                [
                  "You receive",
                  "A monitored product scope, baseline, alert evidence, and proposed fix",
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
                  "The agreed store and data access available during the pilot",
                ],
              ].map(([term, detail]) => (
                <div
                  key={term}
                  className="grid gap-2 border-b border-black/18 py-5 last:border-b-0 sm:grid-cols-[10rem_1fr] sm:gap-8"
                >
                  <dt className="font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-black/46">
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
