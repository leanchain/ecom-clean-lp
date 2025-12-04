import Image from "next/image";
import {
  ArrowDownRight,
  CheckCircle2,
  PlayCircle,
  Sparkles,
} from "lucide-react";

interface AnnotationCardProps {
  index: number;
  title: string;
  description: string;
  side: "left" | "right";
}

const leftAnnotations: AnnotationCardProps[] = [
  {
    index: 1,
    title: "Hero media gallery",
    description:
      "Main PDP canvas with the primary image or video and a row of thumbnails.",
    side: "left",
  },
  {
    index: 2,
    title: "Title, price & review summary",
    description:
      "Stack for product name, star rating, price, promo badges and key benefit bullets.",
    side: "left",
  },
  {
    index: 3,
    title: "Purchase controls",
    description:
      "Quantity selector, options (size/colour) and a primary add-to-cart button.",
    side: "left",
  },
  {
    index: 4,
    title: "Trust and delivery row",
    description:
      "Inline copy for shipping, returns and security placed directly under the CTA.",
    side: "left",
  },
];

const rightAnnotations: AnnotationCardProps[] = [
  {
    index: 5,
    title: "Customer reviews module",
    description:
      "Star summary plus review cards in the middle of the page for social proof.",
    side: "right",
  },
  {
    index: 6,
    title: "Story, benefits & in-use content",
    description:
      "Image + text sections that explain how and when the product is used.",
    side: "right",
  },
  {
    index: 7,
    title: "Comparison & FAQ blocks",
    description:
      "Comparison rows and on-page FAQs so AI and shoppers don't need to leave the PDP.",
    side: "right",
  },
  {
    index: 8,
    title: "Related products, UGC & footer",
    description:
      "Recommended products, social proof strips, email capture and footer navigation.",
    side: "right",
  },
];

const benefitBullets = [
  "Deep, AI-readable PDP content for every product — images, video, copy and schema in one flow.",
  "Narrative sections built to answer real shopper questions inside ChatGPT, Gemini and Perplexity.",
  "Drop-in sections that match your brand and slot straight into Shopify, composable and headless stacks.",
];

const AnnotationCard = ({
  index,
  title,
  description,
  side,
}: AnnotationCardProps) => {
  return (
    <div className="relative rounded-3xl bg-background/90 px-4 py-3 text-left shadow-sm ring-1 ring-border/60">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
            {index}
          </span>
          <div className="space-y-1">
            <p className="text-sm font-medium">{title}</p>
            <p className="text-xs text-muted-foreground">{description}</p>
          </div>
        </div>
        <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-medium text-primary">
          <Sparkles className="h-3 w-3" />
          Fisca PDP AI
        </span>
      </div>
    </div>
  );
};

interface PlaceholderBoxProps {
  label: string;
  className?: string;
}

const PlaceholderBox = ({ label, className }: PlaceholderBoxProps) => {
  return (
    <div
      className={`flex items-center justify-center rounded-md border border-dashed border-border/70 bg-muted/40 px-3 text-[10px] leading-snug text-muted-foreground ${
        className ?? ""
      }`}
    >
      <span className="text-center">{label}</span>
    </div>
  );
};

const LegacyOptimisedPdp = () => {
  return (
    <section className="bg-muted/40 py-24">
      <div className="container space-y-12">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary/80">
            Fisca Optimised PDP
          </p>
          <h1 className="mt-3 text-balance text-4xl font-bold md:text-5xl">
            Turn every product page into an AI search magnet
          </h1>
          <p className="mt-4 text-muted-foreground">
            This is a long-form, multi-unit PDP mock that shows how Fisca
            combines images, video, narrative and structured sections so AI
            engines can confidently recommend your products.
          </p>
          <ul className="mt-6 grid gap-3 text-left text-sm md:grid-cols-3">
            {benefitBullets.map((bullet) => (
              <li
                key={bullet}
                className="flex items-start gap-2 rounded-3xl bg-background/80 p-3"
              >
                <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-500" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1.7fr)_minmax(0,1.1fr)]">
          <div className="space-y-4">
            {leftAnnotations.map((annotation) => (
              <AnnotationCard key={annotation.index} {...annotation} />
            ))}
          </div>

          <div className="relative mx-auto w-full max-w-3xl">
            <div className="absolute -inset-4 -z-10 rounded-[40px] bg-linear-to-br from-primary/15 via-primary/0 to-violet-500/25 blur-2xl" />
            <div className="rounded-[34px] border border-border/70 bg-background shadow-2xl">
              <div className="flex items-center justify-between gap-4 border-b border-border/60 px-6 py-4">
                <div className="space-y-1">
                  <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
                    Aurora Bottle PDP • Fisca narrative layout
                  </p>
                  <p className="text-xs text-muted-foreground">
                    One scrollable page combining hero, benefits, lifestyle,
                    comparison, FAQs and bundles.
                  </p>
                </div>
                <div className="flex flex-col items-end gap-1 text-right">
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-semibold text-emerald-700">
                    <Sparkles className="h-3 w-3" /> AI Search Score 92/100
                  </span>
                  <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                    Built by Fisca PDP AI <ArrowDownRight className="h-3 w-3" />
                  </span>
                </div>
              </div>

              <div className="grid gap-6 border-b border-border/60 px-6 py-6 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
                <div className="space-y-4">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-muted">
                    <Image
                      src="/images/hero/hero-3.png"
                      alt="Lifestyle hero for the Aurora bottle"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
                    <div className="absolute bottom-3 left-3 flex items-center gap-2 rounded-full bg-background/80 px-3 py-1 text-[11px] font-medium">
                      <PlayCircle className="h-3 w-3" />
                      PDP hero video + lifestyle image
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3 text-[11px]">
                    <div className="rounded-2xl bg-muted/80 p-2">
                      <p className="font-medium">Lifestyle</p>
                      <p className="text-muted-foreground text-[10px]">
                        On-location scenes for context.
                      </p>
                    </div>
                    <div className="rounded-2xl bg-muted/80 p-2">
                      <p className="font-medium">In use</p>
                      <p className="text-muted-foreground text-[10px]">
                        Hands, movement and real moments.
                      </p>
                    </div>
                    <div className="rounded-2xl bg-muted/80 p-2">
                      <p className="font-medium">Detail</p>
                      <p className="text-muted-foreground text-[10px]">
                        Macro crops for texture and finish.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 text-sm">
                  <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
                    BENEFIT-LED HERO
                  </p>
                  <h2 className="text-base font-semibold md:text-lg">
                    Stays cold for 24 hours, looks premium on every commute and
                    is structured for AI to understand exactly why.
                  </h2>
                  <ul className="space-y-1.5 text-xs text-muted-foreground">
                    <li>
                      Clear, AI-readable H1 focused on outcome, not materials.
                    </li>
                    <li>
                      Three benefit bullets covering performance, lifestyle and
                      sustainability.
                    </li>
                    <li>
                      Schema-ready attributes for capacity, insulation, use
                      cases and materials.
                    </li>
                  </ul>
                  <div className="mt-3 flex items-center justify-between gap-3 text-xs">
                    <div>
                      <p className="text-lg font-semibold">€39.00</p>
                      <p className="text-muted-foreground">
                        Free EU shipping over €50.
                      </p>
                    </div>
                    <button className="rounded-full bg-foreground px-4 py-2 text-[11px] font-medium text-background">
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>

              <div className="space-y-4 px-6 py-6 text-[11px]">
                <div className="grid gap-3 md:grid-cols-2">
                  <div className="rounded-3xl border bg-muted/60 p-3">
                    <p className="text-[10px] font-semibold tracking-[0.15em] text-muted-foreground">
                      SECTION 01 • BENEFITS
                    </p>
                    <p className="mt-1 text-sm font-medium">
                      Deep benefits & problems solved.
                    </p>
                    <p className="mt-1 text-muted-foreground">
                      Explains when, where and why shoppers should pick this
                      bottle over alternatives.
                    </p>
                  </div>
                  <div className="rounded-3xl border bg-muted/60 p-3">
                    <p className="text-[10px] font-semibold tracking-[0.15em] text-muted-foreground">
                      SECTION 02 • VIDEO BLOCKS
                    </p>
                    <p className="mt-1 text-sm font-medium">
                      Short-form PDP loops.
                    </p>
                    <div className="mt-2 overflow-hidden rounded-2xl bg-black/80">
                      <video
                        src="/videos/gallery/gallery-video-1.mp4"
                        className="h-28 w-full object-cover opacity-90"
                        muted
                        autoPlay
                        loop
                        playsInline
                      />
                    </div>
                  </div>
                </div>

                <div className="grid gap-3 md:grid-cols-2">
                  <div className="rounded-3xl border bg-muted/60 p-3">
                    <p className="text-[10px] font-semibold tracking-[0.15em] text-muted-foreground">
                      SECTION 03 • BEST FOR
                    </p>
                    <p className="mt-1 text-sm font-medium">
                      Segmented "best for" chips.
                    </p>
                    <div className="mt-2 flex flex-wrap gap-1.5 text-[10px]">
                      {[
                        "Daily commuters",
                        "Weekend hikes",
                        "Office desk",
                        "Carry-on travel",
                      ].map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-background px-2 py-1"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-3xl border bg-muted/60 p-3">
                    <p className="text-[10px] font-semibold tracking-[0.15em] text-muted-foreground">
                      SECTION 04 • WHY / PROBLEMS SOLVED
                    </p>
                    <ul className="mt-1 space-y-1.5 text-[10px] text-muted-foreground">
                      <li>Replaces leaky, single-use plastic bottles.</li>
                      <li>
                        Keeps drinks cold or hot for the full day journey.
                      </li>
                      <li>
                        Designed to fit cup holders, backpacks and tote bags.
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="grid gap-3 md:grid-cols-2">
                  <div className="rounded-3xl border bg-muted/60 p-3">
                    <p className="text-[10px] font-semibold tracking-[0.15em] text-muted-foreground">
                      SECTION 05 • COMPARISON TABLE
                    </p>
                    <div className="mt-2 overflow-hidden rounded-2xl border bg-background/90 text-[10px]">
                      <div className="grid grid-cols-[1.1fr_1fr_1fr] bg-muted/70">
                        <div className="px-2 py-1.5"></div>
                        <div className="px-2 py-1.5 text-center font-semibold">
                          Fisca PDP AI
                        </div>
                        <div className="px-2 py-1.5 text-center text-muted-foreground">
                          Traditional PDP
                        </div>
                      </div>
                      <div className="grid grid-cols-[1.1fr_1fr_1fr] border-t">
                        <div className="px-2 py-1.5 font-medium">
                          AI visibility
                        </div>
                        <div className="bg-emerald-500/5 px-2 py-1.5">
                          3–5× more AI search coverage.
                        </div>
                        <div className="px-2 py-1.5 text-muted-foreground">
                          Sparse, generic copy.
                        </div>
                      </div>
                      <div className="grid grid-cols-[1.1fr_1fr_1fr] border-t">
                        <div className="px-2 py-1.5 font-medium">
                          Narrative depth
                        </div>
                        <div className="bg-emerald-500/5 px-2 py-1.5">
                          Full story, FAQs and use cases.
                        </div>
                        <div className="px-2 py-1.5 text-muted-foreground">
                          Thin bullet list.
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-3xl border bg-muted/60 p-3">
                    <p className="text-[10px] font-semibold tracking-[0.15em] text-muted-foreground">
                      SECTION 06 • FAQS IN PDP CONTEXT
                    </p>
                    <div className="mt-2 space-y-1.5">
                      <details className="rounded-2xl bg-background/90 p-2">
                        <summary className="cursor-pointer text-[11px] font-medium">
                          Will this fit my bag or cup holder?
                        </summary>
                        <p className="mt-1 text-[10px] text-muted-foreground">
                          Yes — the Aurora is 750ml with a slim base designed
                          for standard holders and backpacks.
                        </p>
                      </details>
                      <details className="rounded-2xl bg-background/90 p-2">
                        <summary className="cursor-pointer text-[11px] font-medium">
                          Is it dishwasher safe?
                        </summary>
                        <p className="mt-1 text-[10px] text-muted-foreground">
                          The bottle is top-rack dishwasher safe; the lid rinses
                          clean under the tap.
                        </p>
                      </details>
                    </div>
                  </div>
                </div>

                <div className="rounded-3xl border bg-muted/60 p-3">
                  <p className="text-[10px] font-semibold tracking-[0.15em] text-muted-foreground">
                    SECTION 07 • COMPLETE THE LOOK BUNDLES
                  </p>
                  <p className="mt-1 text-sm font-medium">
                    AI-generated combination images.
                  </p>
                  <p className="mt-1 text-[10px] text-muted-foreground">
                    Fisca auto-builds bundles and renders visual combinations so
                    AI can recommend outfits, sets and cross-sells straight from
                    the PDP.
                  </p>
                  <div className="mt-3 grid gap-2 md:grid-cols-3">
                    {[
                      {
                        src: "/images/gallery/gallery-2.jpg",
                        label: "Commuter set",
                      },
                      {
                        src: "/images/hero/hero-11.jpeg",
                        label: "Weekend hike",
                      },
                      {
                        src: "/images/gallery/gallery-5.jpeg",
                        label: "Desk & gym combo",
                      },
                    ].map((combo) => (
                      <div
                        key={combo.label}
                        className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-muted"
                      >
                        <Image
                          src={combo.src}
                          alt={combo.label}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute bottom-2 left-2 rounded-full bg-background/80 px-2 py-1 text-[10px] font-medium">
                          {combo.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {rightAnnotations.map((annotation) => (
              <AnnotationCard key={annotation.index} {...annotation} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const OptimisedPdp = () => {
  return (
    <section className="bg-muted/40 py-24">
      <div className="container space-y-10">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary/80">
            Fisca Optimised PDP template
          </p>
          <h1 className="mt-3 text-balance text-4xl font-bold md:text-5xl">
            Annotated product detail page layout
          </h1>
          <p className="mt-4 text-sm text-muted-foreground md:text-base">
            This is a neutral wireframe-style PDP template. Grey boxes show
            where your images, videos and content modules would go – not the
            final visual design.
          </p>
        </div>

        <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1.7fr)_minmax(0,1.1fr)]">
          <div className="mx-auto w-full max-w-3xl rounded-3xl border border-border/70 bg-background p-6 text-[11px] shadow-sm">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-border/60 pb-3">
              <div className="space-y-1">
                <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                  Promo bar / breadcrumbs / trust strip
                </p>
                <p className="text-[11px] text-muted-foreground">
                  Use this area for free-shipping banners, breadcrumbs and key
                  trust labels.
                </p>
              </div>
              <div className="flex gap-2 text-[10px] text-muted-foreground">
                <span className="rounded-sm border border-dashed border-border px-2 py-1">
                  Badge
                </span>
                <span className="rounded-sm border border-dashed border-border px-2 py-1">
                  AI score / tag
                </span>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
              <div className="space-y-3">
                <PlaceholderBox
                  label="Primary product image / video gallery"
                  className="h-56 md:h-64"
                />
                <div className="grid grid-cols-4 gap-2">
                  <PlaceholderBox label="Thumb" className="h-14" />
                  <PlaceholderBox label="Thumb" className="h-14" />
                  <PlaceholderBox label="Thumb" className="h-14" />
                  <PlaceholderBox label="Thumb" className="h-14" />
                </div>
              </div>

              <div className="space-y-2">
                <PlaceholderBox
                  label="Product title + subtitle"
                  className="h-10 justify-start"
                />
                <PlaceholderBox
                  label="Rating stars + review count"
                  className="h-7 max-w-[220px] justify-start"
                />
                <PlaceholderBox
                  label="Price, discount & badges"
                  className="h-7 max-w-[240px] justify-start"
                />
                <PlaceholderBox
                  label="3-5 key benefit bullets"
                  className="h-16 justify-start"
                />
                <PlaceholderBox
                  label="Options (size / colour / variants)"
                  className="h-12 justify-start"
                />
                <PlaceholderBox
                  label="Primary add to cart button"
                  className="h-9 max-w-[220px]"
                />
                <PlaceholderBox
                  label="Inline guarantees (shipping, returns, security)"
                  className="h-10 justify-start"
                />
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <PlaceholderBox
                label="Long-form product description / story"
                className="h-24 justify-start"
              />
              <div className="grid gap-4 md:grid-cols-2">
                <PlaceholderBox
                  label="Benefit / feature stack"
                  className="h-24 justify-start"
                />
                <PlaceholderBox
                  label="Lifestyle / in-use imagery row"
                  className="h-24"
                />
              </div>
              <PlaceholderBox
                label="Customer reviews section (summary + review cards)"
                className="h-24 justify-start"
              />
              <PlaceholderBox
                label="Comparison table (this product vs alternatives)"
                className="h-20 justify-start"
              />
              <PlaceholderBox
                label="FAQs accordion section"
                className="h-20 justify-start"
              />
              <PlaceholderBox
                label="You may also like / recommended products row"
                className="h-24"
              />
              <PlaceholderBox
                label="UGC / social gallery strip"
                className="h-20"
              />
              <PlaceholderBox
                label="Email capture + footer links"
                className="h-16"
              />
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Fisca PDP AI layout elements
            </p>
            {[...leftAnnotations, ...rightAnnotations].map((annotation) => (
              <AnnotationCard key={annotation.index} {...annotation} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export { OptimisedPdp };
