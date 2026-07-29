import { STORE_HEALTH_FAQS } from "@/lib/store-health-faqs";

export default function FaqSection() {
  return (
    <section id="faq" className="border-b border-black/18 bg-[#f4f1e9]">
      <div className="mx-auto grid max-w-[92rem] gap-12 px-5 py-20 sm:px-8 sm:py-24 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-20 lg:px-10 lg:py-28">
        <div>
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-[#3154ff]">Before monitoring starts</p>
          <h2 className="mt-6 max-w-[10ch] font-serif text-[clamp(2.7rem,4.1vw,4.1rem)] font-normal leading-[1.02] tracking-[-0.04em] text-[#111318]">
            Questions about monitoring product visibility.
          </h2>
          <p className="mt-7 max-w-lg text-[16px] leading-[1.7] text-black/62">
            Clear answers about baselines, change alerts, commercial priority, approvals, and recovery checks.
          </p>
        </div>
        <div className="border-t border-black/25">
          {STORE_HEALTH_FAQS.map((faq) => (
            <details key={faq.question} className="group border-b border-black/18">
              <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-5 py-5 text-[16px] font-semibold text-[#111318] marker:content-none focus-visible:ring-2 focus-visible:ring-[#3154ff]">
                <span>{faq.question}</span>
                <span aria-hidden className="font-mono text-[22px] font-normal text-[#3154ff] transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="max-w-3xl pb-6 pr-10 text-[15px] leading-relaxed text-black/62">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
