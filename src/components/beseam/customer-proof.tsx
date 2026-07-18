import type { ReactNode } from "react";

/**
 * Placeholder for a real customer-story / proof block.
 *
 * Beseam has no shipped, verifiable customer proof to show yet, so this renders
 * NOTHING today (no "coming soon" cards, no fabricated logos or quotes). The
 * shape is kept here so a genuine story can drop into the founder section later
 * without a redesign: pass real, attributable `stories` and it will render.
 */
export type CustomerStory = {
  quote: string;
  attribution: string;
  role: string;
};

export function CustomerProof({
  stories = [],
}: {
  stories?: CustomerStory[];
}): ReactNode {
  if (stories.length === 0) {
    return null;
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {stories.map((story) => (
        <figure
          key={story.attribution}
          className="rounded-2xl border border-rule bg-panel p-6"
        >
          <blockquote className="text-[15px] leading-relaxed text-foreground">
            {story.quote}
          </blockquote>
          <figcaption className="mt-4 text-sm text-muted-foreground">
            <span className="font-semibold text-ink">{story.attribution}</span>
            {" · "}
            {story.role}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

export default CustomerProof;
