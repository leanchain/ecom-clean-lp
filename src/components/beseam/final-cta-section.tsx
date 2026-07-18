import { BookReviewCta } from "@/components/beseam/book-review-cta";
import { Reveal } from "@/components/beseam/reveal";
import TrackedLink from "@/components/beseam/tracked-link";

const APP_LOGIN_URL = "https://app.beseam.com/login";

const OUTPUTS = [
  "Monitoring coverage assessment",
  "Priority risks",
  "Recommended checks",
  "Pilot plan",
];

export default function FinalCtaSection() {
  return (
    <section className="border-t border-rule bg-brand text-brand-foreground">
      <div className="section-pad mx-auto max-w-6xl px-6">
        <Reveal>
          <h2 className="editorial-heading max-w-4xl text-brand-foreground">
            Start with the health of your actual store.
          </h2>
          <p className="mt-6 max-w-3xl text-[18px] leading-relaxed text-brand-foreground">
            We review your current Shopify setup, monitoring gaps and the store
            journeys your team cannot afford to miss.
          </p>

          <ul className="mt-8 grid gap-3 border-y border-brand-foreground/20 py-5 text-[15px] font-medium sm:grid-cols-2">
            {OUTPUTS.map((output) => (
              <li key={output} className="flex items-center gap-3">
                <span
                  aria-hidden
                  className="h-1.5 w-1.5 rounded-full bg-brand-foreground"
                />
                {output}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <BookReviewCta
              location="final_cta"
              className="w-full bg-technical text-white hover:bg-technical-panel sm:w-auto"
            />
            <TrackedLink
              href={APP_LOGIN_URL}
              eventName="login_clicked"
              placement="final_cta"
              className="inline-flex min-h-11 items-center justify-center font-semibold text-brand-foreground underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:ring-ink sm:justify-start"
            >
              Already using Beseam? Log in
            </TrackedLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
