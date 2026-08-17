import BookReviewCta from "@/components/beseam/book-review-cta";
import Reveal from "@/components/beseam/reveal";

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
            <h2 className="max-w-[20ch] font-display text-[clamp(2rem,3.1vw,2.6rem)] font-normal leading-[1.06] tracking-[-0.02em] text-[#111318]">
              Try Beseam on your catalog for 30 days.
            </h2>
          </div>

          <div className="self-end">
            <p className="max-w-[68ch] text-[17px] leading-[1.7] text-black/66">
              We find a buying question where your product loses, keep the
              answer and competing products, show the product evidence you can
              change, and re-run the question after the change. There is no fee
              for the first 30 days. At day 30, you decide whether the work was
              useful enough to continue.
            </p>

            <dl className="mt-10 border-y border-black/22">
              {[
                [
                  "You receive",
                  "The question, observed answer, competing products, product evidence, and proposed change",
                ],
                [
                  "We re-check",
                  "The same buying question after the approved product change",
                ],
                [
                  "We do not promise",
                  "A recommendation, ranking, traffic increase, or sales increase",
                ],
                [
                  "What we need",
                  "The agreed catalog scope and store access if you want us to publish an approved change",
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
