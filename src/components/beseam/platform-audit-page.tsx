import Link from "next/link";

import { ArrowRight } from "lucide-react";

import BookReviewCta from "@/components/beseam/book-review-cta";
import LeadCaptureForm from "@/components/beseam/lead-capture-form";
import Reveal from "@/components/beseam/reveal";
import SampleFindings, {
  type Finding,
} from "@/components/beseam/sample-findings";

interface PlatformAuditPageProps {
  platform: string;
  headline: string;
  description: string;
  contextParagraphs: string[];
  findings: Finding[];
  otherPlatforms: { name: string; href: string }[];
}

const BOUNDARIES = [
  [
    "Read-only",
    "The scan reads public pages and the structured data your storefront already emits. It does not install an app, change a template, or publish anything to your store.",
  ],
  [
    "Evidence, then a proposal",
    "Each gap is shown with the page it came from and a specific change to make. Your team decides whether to apply it.",
  ],
  [
    "No placement promises",
    "No vendor controls whether an assistant cites you. Correct, complete product data is what you can control, so that is what this checks.",
  ],
] as const;

export default function PlatformAuditPage({
  platform,
  headline,
  description,
  contextParagraphs,
  findings,
  otherPlatforms,
}: PlatformAuditPageProps) {
  return (
    <div className="bg-[#f4f1e9] text-[#151515]">
      <section className="border-b border-black/18">
        <div className="mx-auto max-w-[92rem] px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
          <Reveal className="grid gap-12 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:items-end lg:gap-16">
            <div>
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-[#c04e26]">
                {platform} · Product data audit
              </p>
              <h1 className="mt-7 max-w-[12ch] font-serif text-[clamp(2.9rem,5vw,4.6rem)] font-normal leading-[0.99] tracking-[-0.045em] text-[#111318]">
                {headline}
              </h1>
            </div>
            <div className="self-end">
              <p className="max-w-2xl text-[18px] leading-[1.65] text-black/68">
                {description}
              </p>
              <div className="mt-8">
                <LeadCaptureForm
                  mode="product-page"
                  source="platform_audit"
                  placement={`audit_${platform.toLowerCase().replaceAll(" ", "_")}_hero`}
                  storeLabel="Product page URL"
                  storePlaceholder="https://yourstore.com/products/your-product"
                  buttonLabel="Scan this product page"
                  helpText="One public product page. No app install. We send the findings to your email and open the scan."
                  storeFieldId="audit-hero"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-b border-black/18 bg-[#ebe8df]">
        <div className="mx-auto max-w-[92rem] px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
          <Reveal className="grid gap-12 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-20">
            <div>
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-[#c04e26]">
                Platform behaviour
              </p>
              <h2 className="mt-6 max-w-[12ch] font-serif text-[clamp(2.4rem,3.6vw,3.6rem)] font-normal leading-[1.04] tracking-[-0.04em]">
                What {platform} emits, and where it stops.
              </h2>
            </div>
            <div className="max-w-3xl space-y-5 text-[16px] leading-[1.75] text-black/66">
              {contextParagraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 48)}>{paragraph}</p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-b border-black/18">
        <div className="mx-auto max-w-[92rem] px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
          <Reveal className="grid gap-12 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-20">
            <div>
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-[#c04e26]">
                Example findings
              </p>
              <h2 className="mt-6 max-w-[12ch] font-serif text-[clamp(2.4rem,3.6vw,3.6rem)] font-normal leading-[1.04] tracking-[-0.04em]">
                What we usually find on {platform}.
              </h2>
              <p className="mt-7 max-w-md text-[15px] leading-relaxed text-black/60">
                Open a finding to see the change it would take to fix it. These
                are patterns from real stores, not results from yours.
              </p>
            </div>
            <SampleFindings findings={findings} />
          </Reveal>
        </div>
      </section>

      <section className="border-b border-black/18 bg-[#111318] text-white">
        <div className="mx-auto max-w-[92rem] px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
          <Reveal className="grid gap-12 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-20">
            <div>
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8ea2ff]">
                What this audit does not do
              </p>
              <h2 className="mt-6 max-w-[12ch] font-serif text-[clamp(2.4rem,3.6vw,3.6rem)] font-normal leading-[1.04] tracking-[-0.04em]">
                We read your store. We do not change it.
              </h2>
            </div>
            <dl className="border-t border-white/22">
              {BOUNDARIES.map(([term, detail]) => (
                <div
                  key={term}
                  className="grid gap-2 border-b border-white/18 py-6 sm:grid-cols-[14rem_1fr] sm:gap-6"
                >
                  <dt className="font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-white/50">
                    {term}
                  </dt>
                  <dd className="text-[14px] leading-relaxed text-white/64">
                    {detail}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      <section className="border-b border-black/18 bg-[#ebe8df]">
        <div className="mx-auto max-w-[92rem] px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
          <Reveal className="grid gap-10 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:items-end lg:gap-20">
            <div>
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-[#c04e26]">
                Start here
              </p>
              <h2 className="mt-6 max-w-[13ch] font-serif text-[clamp(2.3rem,3.4vw,3.4rem)] font-normal leading-[1.04] tracking-[-0.04em]">
                Scan one {platform} product page.
              </h2>
            </div>
            <div className="self-end">
              <LeadCaptureForm
                mode="product-page"
                source="platform_audit"
                placement={`audit_${platform.toLowerCase().replaceAll(" ", "_")}_footer`}
                storeLabel="Product page URL"
                storePlaceholder="https://yourstore.com/products/your-product"
                buttonLabel="Scan this product page"
                helpText="Prefer to talk it through first? Book the 20-minute commerce review below."
                storeFieldId="audit-footer"
              />
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                <BookReviewCta
                  location={`audit_${platform.toLowerCase().replaceAll(" ", "_")}`}
                  label="Book a 20-minute commerce review"
                  className="w-full sm:w-auto"
                />
                <Link
                  href="/shopify-store-health"
                  className="inline-flex min-h-11 items-center justify-center gap-2 text-[14px] font-semibold text-[#151515] underline decoration-black/25 underline-offset-7 hover:decoration-[#e8653a] sm:justify-start"
                >
                  See continuous store health{" "}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-[92rem] px-5 py-12 sm:px-8 sm:py-16 lg:px-10">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-black/45">
            Audits for other platforms
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {otherPlatforms.map((entry) => (
              <Link
                key={entry.name}
                href={entry.href}
                className="inline-flex min-h-11 items-center border border-black/22 px-5 text-[14px] font-medium text-black/72 transition-colors hover:border-[#c04e26] hover:text-[#c04e26]"
              >
                {entry.name}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
