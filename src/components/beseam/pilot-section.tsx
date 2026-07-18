import BookReviewCta from "@/components/beseam/book-review-cta";
import Reveal from "@/components/beseam/reveal";

const PILOT_STEPS = [
  "Connect the store",
  "Review discoverability monitoring",
  "Review purchase-health signals",
  "Configure the checks that matter",
  "A prioritized issue list",
  "A recurring review",
  "Help with a defined number of fixes",
];

export default function PilotSection() {
  return (
    <section className="border-t border-rule bg-background">
      <div className="section-pad mx-auto max-w-6xl px-6">
        <div className="rounded-2xl border border-rule bg-surface p-8 md:p-12">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center lg:gap-14">
            <Reveal>
              <p className="editorial-eyebrow text-primary">The pilot</p>
              <h2 className="editorial-subheading mt-4 text-ink">
                Beseam Store Health Pilot
              </h2>
              <p className="mt-4 text-[15.5px] leading-relaxed text-foreground">
                A focused engagement to stand up monitoring on your actual
                store, agree what matters, and work through the first issues
                together.
              </p>
              <div className="mt-7">
                <BookReviewCta variant="primary" location="pilot" />
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <ul className="divide-y divide-rule border-y border-rule">
                {PILOT_STEPS.map((step, i) => (
                  <li key={step} className="flex items-center gap-4 py-3.5">
                    <span className="text-[12px] font-semibold tabular-nums text-muted-foreground/70">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[15px] text-foreground">{step}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
