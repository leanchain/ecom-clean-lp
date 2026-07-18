import { STORE_HEALTH_FAQS } from "@/lib/store-health-faqs";

export default function FaqSection() {
  return (
    <section id="faq" className="border-t border-rule bg-surface">
      <div className="section-pad-tight mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:gap-20">
        <div>
          <p className="text-[14px] font-semibold text-primary">
            Product questions
          </p>
          <h2 className="editorial-heading mt-4 text-ink">
            Clear limits make the monitoring more useful.
          </h2>
          <p className="mt-5 max-w-lg text-[16px] leading-relaxed text-foreground">
            What Beseam observes, what a status means and where a person still
            needs to verify the evidence.
          </p>
        </div>

        <div className="border-t border-rule">
          {STORE_HEALTH_FAQS.map((faq) => (
            <details key={faq.question} className="group border-b border-rule">
              <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-5 py-5 text-[16px] font-semibold text-ink marker:content-none focus-visible:ring-2 focus-visible:ring-primary">
                {faq.question}
                <span
                  aria-hidden
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-rule text-[18px] font-normal text-primary transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="max-w-3xl pb-6 pr-10 text-[15px] leading-relaxed text-foreground">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
