import Image from "next/image";
import Link from "next/link";

import {
  ArrowRight,
  BarChart3,
  Check,
  Eye,
  Megaphone,
  MousePointerClick,
  PackageSearch,
  Palette,
  Radar,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
} from "lucide-react";

import { BookReviewCta } from "@/components/beseam/book-review-cta";
import FirstMonthPromise from "@/components/beseam/first-month-promise";
import { Reveal } from "@/components/beseam/reveal";

const INTEGRATIONS = [
  { name: "Shopify", src: "/logos/integrations/shopify.svg" },
  { name: "WooCommerce", src: "/logos/integrations/woocommerce.svg" },
  { name: "BigCommerce", src: "/logos/integrations/bigcommerce.svg" },
  { name: "Adobe Commerce", src: "/logos/integrations/adobe-commerce.svg" },
  { name: "Salesforce Commerce Cloud", src: "/logos/integrations/sfcc.svg" },
  { name: "Google Merchant Center", src: "/logos/integrations/google-merchant.svg" },
  { name: "Google", src: "/logos/google.svg" },
  { name: "Meta", src: "/images/ai-platforms/meta.svg" },
] as const;

const TRACE = [
  {
    label: "Observe",
    detail: "Check the storefront, catalog, customer sessions, AI answers, campaign setup, and order data.",
  },
  {
    label: "Diagnose",
    detail: "Attach the issue to the exact product, page, query, or channel and rank it by evidence.",
  },
  {
    label: "Intervene",
    detail: "Create the proposed change, assign an owner, and require approval where spend or customer-facing content is involved.",
  },
  {
    label: "Verify",
    detail: "Recheck the original signal and compare equivalent periods without merging booked, attributed, and modeled results.",
  },
] as const;

const SYSTEMS = [
  {
    id: "observe",
    index: "01",
    name: "Observe",
    title: "Find where demand is lost before it becomes an order.",
    description:
      "AI Visibility checks how assistants describe and cite the brand. Behavior shows where visitors hesitate or abandon. Reliability connects technical incidents to the pages and journeys exposed.",
    products: [
      {
        name: "AI Visibility",
        status: "Production",
        detail: "Track the queries that mention you, the sources assistants cite, incorrect claims, and competitors taking your place.",
        icon: Eye,
      },
      {
        name: "Behavior",
        status: "Beta",
        detail: "See where visitors hesitate, backtrack, abandon, or follow a high-intent path.",
        icon: MousePointerClick,
      },
      {
        name: "Reliability",
        status: "Beta",
        detail: "Tie slowdowns and incidents to the pages, products, and revenue windows they affected.",
        icon: Radar,
      },
    ],
  },
  {
    id: "decide",
    index: "02",
    name: "Decide",
    title: "Revenue-sensitive issues rise above operational noise.",
    description:
      "Foundation brings current state, booked revenue, open actions, and verified impact into one view. Analytics explains movement. Optimization turns evidence into an experiment or personalization proposal.",
    products: [
      {
        name: "Foundation",
        status: "Production",
        detail: "Today’s store state, authoritative revenue, action ownership, connection health, and verified impact.",
        icon: BarChart3,
      },
      {
        name: "Analytics",
        status: "Beta",
        detail: "Funnels, cohorts, journeys, attribution, and reconciliation with the commerce ledger.",
        icon: BarChart3,
      },
      {
        name: "Optimization",
        status: "Beta",
        detail: "Experiments and personalization proposals with a hypothesis, approval, and measurement plan.",
        icon: Sparkles,
      },
    ],
  },
  {
    id: "act",
    index: "03",
    name: "Act",
    title: "Improve the commerce object, not another internal dashboard.",
    description:
      "Commerce Readiness finds product, page, feed, tracking, and checkout defects before traffic reaches them. Advertising checks whether Google or Meta can launch safely. Creative Studio creates approved assets for products and campaigns.",
    products: [
      {
        name: "Commerce Readiness",
        status: "Production",
        detail: "Find product, feed, landing-page, tracking, or checkout problems before they block traffic or a launch.",
        icon: ShoppingBag,
      },
      {
        name: "Advertising",
        status: "Production rollout",
        detail: "Check the account, catalog, measurement, destination, budget, and creative before an Admin publishes to Google or Meta.",
        icon: Megaphone,
      },
      {
        name: "Creative Studio",
        status: "Beta",
        detail: "Create product and campaign images or video from approved brand evidence, with a credit estimate before generation.",
        icon: Palette,
      },
    ],
  },
] as const;

const ENTITLEMENTS = [
  ["Foundation", "Decide", "Included with every active contract", "Production"],
  ["AI Visibility", "Observe", "Independent package", "Production"],
  ["Commerce Readiness", "Act", "Independent package", "Production"],
  ["Advertising", "Act", "Google + Meta lifecycle package", "Production rollout"],
  ["Analytics", "Decide", "Advanced Intelligence module", "Beta"],
  ["Behavior", "Observe", "Advanced Intelligence module", "Beta"],
  ["Optimization", "Decide", "Advanced Intelligence module", "Beta"],
  ["Reliability", "Observe", "Advanced Intelligence module", "Beta"],
  ["Creative Studio", "Act", "Independent creation package", "Beta"],
] as const;

const CATALOG = [
  {
    name: "Flow Tanzschuhe in Gold Glitter",
    price: "CHF 189",
    image: "/images/product-live/catalog/flow-gold.webp",
  },
  {
    name: "Glow Twinkle in Rosé Gold Glitter",
    price: "CHF 179",
    image: "/images/product-live/catalog/glow-rose.webp",
  },
  {
    name: "Flow in Silber & Schwarz Glitter",
    price: "CHF 189",
    image: "/images/product-live/catalog/flow-silver-black.webp",
  },
] as const;

function EvidenceFigure({
  src,
  alt,
  label,
  caption,
  priority = false,
  className = "",
  unoptimized = false,
}: {
  src: string;
  alt: string;
  label: string;
  caption: string;
  priority?: boolean;
  className?: string;
  unoptimized?: boolean;
}) {
  return (
    <figure className={className}>
      <div className="relative aspect-[16/10] overflow-hidden border border-black/18 bg-white">
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          unoptimized={unoptimized}
          sizes="(max-width: 1024px) 100vw, 58vw"
          className="object-cover object-top"
        />
      </div>
      <figcaption className="grid gap-2 border-x border-b border-black/18 bg-[#f7f5ee] px-4 py-3 sm:grid-cols-[8rem_1fr] sm:px-5">
        <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-[#3154ff]">
          {label}
        </span>
        <span className="text-[13px] leading-relaxed text-black/62">{caption}</span>
      </figcaption>
    </figure>
  );
}

function ProductRows({ products }: { products: (typeof SYSTEMS)[number]["products"] }) {
  return (
    <div className="mt-10 border-t border-black/18">
      {products.map((product) => {
        const Icon = product.icon;
        return (
          <div
            key={product.name}
            className="grid gap-3 border-b border-black/18 py-5 sm:grid-cols-[1.1fr_7rem_1.8fr] sm:items-start"
          >
            <div className="flex items-center gap-3 text-[16px] font-semibold text-[#151515]">
              <Icon className="h-4 w-4 text-[#3154ff]" strokeWidth={1.7} aria-hidden="true" />
              {product.name}
            </div>
            <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-black/48">
              {product.status}
            </span>
            <p className="text-[14px] leading-relaxed text-black/62">{product.detail}</p>
          </div>
        );
      })}
    </div>
  );
}

export default function ProductionHomepage() {
  return (
    <div className="bg-[#f4f1e9] text-[#151515]">
      <section id="home-hero" className="border-b border-black/18">
        <div className="mx-auto max-w-[92rem] px-5 pb-20 pt-16 sm:px-8 sm:pb-24 sm:pt-20 lg:px-10 lg:pb-28 lg:pt-24">
          <div className="grid gap-14 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:items-end lg:gap-16">
            <Reveal>
              <div className="flex items-center gap-3 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-black/55">
                <span className="h-2 w-2 bg-[#e8653a]" aria-hidden="true" />
                Autonomous revenue intelligence for commerce
              </div>
              <h1 className="mt-8 max-w-[10.5ch] font-serif text-[clamp(3.25rem,5.1vw,4.75rem)] font-normal leading-[0.98] tracking-[-0.045em] text-[#111318]">
                Find the revenue leaks your stack cannot see.
              </h1>
              <p className="mt-8 max-w-xl text-[18px] leading-[1.65] text-black/68">
                Beseam is a self-improving revenue agent that observes commerce from the outside, connects what it sees to your catalog, campaigns, customer behavior, and booked revenue, then recommends and verifies the change most likely to matter. Each verified result improves the next decision.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                <BookReviewCta location="hero" label="Book a 20-minute commerce review" className="w-full sm:w-auto" />
                <Link
                  href="#products"
                  className="inline-flex min-h-12 items-center justify-center gap-2 px-1 text-[15px] font-semibold text-[#151515] underline decoration-black/30 underline-offset-8 transition-colors hover:decoration-[#3154ff] sm:justify-start"
                >
                  Explore the product suite <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <dl className="mt-14 grid grid-cols-3 border-y border-black/18">
                {[
                  ["Connects to", "Your existing stack"],
                  ["Ranks", "Issues by evidence"],
                  ["Learns from", "Verified results"],
                ].map(([term, value]) => (
                  <div key={term} className="border-r border-black/18 py-4 pr-3 pl-3 first:pl-0 last:border-r-0 sm:py-5 sm:pr-5 sm:pl-5 sm:first:pl-0">
                    <dt className="font-mono text-[10px] uppercase tracking-[0.12em] text-black/45">{term}</dt>
                    <dd className="mt-2 text-[13px] font-semibold leading-snug text-black/78 sm:text-[14px]">{value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal delay={0.08} y={18}>
              <div className="grid gap-0 lg:grid-cols-[2rem_1fr]">
                <div className="hidden border-y border-l border-black/18 bg-[#e9e6dd] px-2 py-5 lg:flex lg:flex-col lg:justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-black/48 [writing-mode:vertical-rl]">
                    Live product evidence
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#3154ff] [writing-mode:vertical-rl]">
                    Dancing Queens / CHF
                  </span>
                </div>
                <EvidenceFigure
                  src="/images/product-live/revenue-overview.webp"
                  alt="Beseam revenue overview for the Dancing Queens workspace"
                  label="Current state"
                  caption="The Dancing Queens workspace shows connected store state, booked revenue, data freshness, and the highest-priority issue."
                  priority
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section aria-label="Supported commerce platforms" className="border-b border-black/18 bg-[#ebe8df]">
        <div className="mx-auto grid max-w-[92rem] gap-5 px-5 py-7 sm:px-8 lg:grid-cols-[15rem_1fr] lg:items-center lg:px-10">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-black/48">
            Works above your existing stack—not instead of it.
          </p>
          <div className="grid grid-cols-4 items-center gap-x-7 gap-y-5 opacity-62 sm:grid-cols-8">
            {INTEGRATIONS.map((integration) => (
              <div key={integration.name} className="relative h-6">
                <Image src={integration.src} alt={integration.name} fill sizes="120px" className="object-contain object-left" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="platform" className="scroll-mt-24 border-b border-black/18">
        <div className="mx-auto max-w-[92rem] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
          <Reveal className="grid gap-10 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-20">
            <div>
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-[#3154ff]">How Beseam works</p>
              <h2 className="mt-6 max-w-[11ch] font-serif text-[clamp(2.7rem,4.2vw,4.2rem)] font-normal leading-[1.02] tracking-[-0.04em]">
                See the whole revenue journey as one connected system.
              </h2>
            </div>
            <div className="self-end">
              <p className="max-w-2xl text-[17px] leading-[1.65] text-black/66">
                Beseam turns disconnected evidence into one commercially ranked decision, then carries the issue from observation to diagnosis, intervention, and verification. It does not stop at the recommendation. It learns from the outcome, while Shopify remains the order ledger and Google and Meta retain their own attribution.
              </p>
            </div>
          </Reveal>

          <div id="agent-loop" className="relative mt-16 scroll-mt-24 border-y border-black/22">
            <div className="absolute left-0 right-0 top-[3.1rem] hidden h-px bg-[#3154ff] md:block" aria-hidden="true" />
            <div className="grid md:grid-cols-4">
              {TRACE.map((item, index) => (
                <div key={item.label} className="relative border-b border-black/18 py-5 md:border-b-0 md:border-r md:px-6 md:py-6 md:first:pl-0 md:last:border-r-0 md:last:pr-0">
                  <span className="relative z-10 inline-flex h-5 items-center bg-[#f4f1e9] pr-4 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#3154ff]">
                    {String(index + 1).padStart(2, "0")} / {item.label}
                  </span>
                  <p className="mt-9 max-w-xs text-[15px] leading-relaxed text-black/66">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="products" className="scroll-mt-24">
        <div className="mx-auto max-w-[92rem] px-5 pt-20 sm:px-8 sm:pt-24 lg:px-10 lg:pt-28">
          <div className="grid gap-10 border-b border-black/22 pb-16 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-20">
            <div>
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-[#3154ff]">Products</p>
              <h2 className="mt-6 max-w-[10ch] font-serif text-[clamp(2.8rem,4.4vw,4.4rem)] font-normal leading-[1.02] tracking-[-0.04em]">
                Observe. Decide. Act.
              </h2>
            </div>
            <p className="max-w-2xl self-end text-[17px] leading-[1.65] text-black/66">
              Nine products help your team find the issue, choose the next move, and make the change.
            </p>
          </div>

          {SYSTEMS.map((system) => (
            <section key={system.id} id={system.id === "decide" ? "foundation" : system.id === "act" ? "advertising" : "observe"} className="scroll-mt-24 border-b border-black/22 py-20 sm:py-24 lg:py-28">
              <Reveal className="grid gap-12 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-20">
                <div>
                  <div className="flex items-baseline gap-4">
                    <span className="font-mono text-[11px] text-black/38">{system.index}</span>
                    <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-[#3154ff]">{system.name}</span>
                  </div>
                  <h3 className="mt-7 max-w-[11ch] font-serif text-[clamp(2.45rem,3.6vw,3.8rem)] font-normal leading-[1.04] tracking-[-0.035em]">
                    {system.title}
                  </h3>
                  <p className="mt-7 max-w-xl text-[16px] leading-[1.7] text-black/64">{system.description}</p>
                  <ProductRows products={system.products} />
                </div>

                <div className="lg:pt-2">
                  {system.id === "observe" && (
                    <EvidenceFigure
                      src="/images/product-live/ai-visibility.webp"
                      alt="Beseam AI Visibility workspace for Dancing Queens"
                      label="Observe / AI Visibility"
                      caption="Queries, cited sources, competitor mentions, and representation evidence from the live Dancing Queens workspace."
                    />
                  )}

                  {system.id === "decide" && (
                    <div className="grid gap-6">
                      <EvidenceFigure
                        src="/images/product-live/revenue-analytics.webp"
                        alt="Beseam revenue analytics workspace for Dancing Queens"
                        label="Decide / Analytics"
                        caption="Booked revenue, funnels, and attribution stay separate so the team can trace movement without merging unlike numbers."
                      />
                      <EvidenceFigure
                        src="/images/product-live/optimization.webp"
                        alt="Beseam optimization experiment workspace for Dancing Queens"
                        label="Decide / Optimization"
                        caption="A real experiment record with a hypothesis, proposed change, audience, and measurement window."
                      />
                    </div>
                  )}

                  {system.id === "act" && (
                    <div className="grid gap-6">
                      <EvidenceFigure
                        src="/images/product-live/product-workflow.gif"
                        alt="Beseam product workflow using a Dancing Queens product"
                        label="Act / Product workflow"
                        caption="A real Dancing Queens product moves from evidence to proposed change, approval, and verification."
                        unoptimized
                      />
                      <div className="grid grid-cols-3 border border-black/18 bg-[#ebe8df]">
                        {CATALOG.map((product) => (
                          <figure key={product.name} className="border-r border-black/18 last:border-r-0">
                            <div className="relative aspect-square overflow-hidden bg-white">
                              <Image src={product.image} alt={product.name} fill sizes="(max-width: 768px) 33vw, 18vw" className="object-cover" />
                            </div>
                            <figcaption className="border-t border-black/18 px-3 py-3">
                              <p className="line-clamp-2 text-[11px] font-semibold leading-snug text-black/72">{product.name}</p>
                              <p className="mt-1 font-mono text-[10px] text-black/45">{product.price}</p>
                            </figcaption>
                          </figure>
                        ))}
                      </div>
                      <EvidenceFigure
                        src="/images/product-live/campaign-readiness.webp"
                        alt="Beseam campaign readiness workspace for Dancing Queens"
                        label="Act / Advertising"
                        caption="Google and Meta readiness checks cover the account, catalog, measurement, destination, budget, and creative before publication."
                      />
                    </div>
                  )}
                </div>
              </Reveal>
            </section>
          ))}
        </div>
      </section>

      <section id="advanced-intelligence" className="scroll-mt-24 bg-[#111318] text-white">
        <div className="mx-auto max-w-[92rem] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
          <div className="grid gap-10 border-b border-white/18 pb-14 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-20">
            <div>
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8ea2ff]">Dancing Queens example</p>
              <h2 className="mt-6 max-w-[10ch] font-serif text-[clamp(2.8rem,4.4vw,4.4rem)] font-normal leading-[1.02] tracking-[-0.04em]">
                Measure what changed. Improve the next decision.
              </h2>
            </div>
            <div className="self-end">
              <p className="max-w-2xl text-[16px] leading-[1.7] text-white/64">
                These are real Beseam product captures from the Dancing Queens workspace. The workspace uses the real catalog and representative CHF activity so the evidence, proposed action, and verification can be inspected together.
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-3">
            {[
              {
                code: "Signal",
                title: "Where does AI discovery omit or misrepresent the brand?",
                src: "/images/product-live/ai-visibility.webp",
                alt: "AI visibility evidence in Beseam",
                note: "Beseam keeps the query, answer, cited sources, competitor presence, and timestamp together.",
                accent: "text-[#e98a66]",
              },
              {
                code: "Intervention",
                title: "Which product or page should the team change?",
                src: "/images/product-live/product-intelligence.webp",
                alt: "Product intelligence evidence in Beseam",
                note: "The affected product, evidence, proposed change, owner, and approval state remain linked.",
                accent: "text-[#8ea2ff]",
              },
              {
                code: "Verification",
                title: "Did the original signal improve after the change?",
                src: "/images/product-live/revenue-analytics.webp",
                alt: "Revenue analytics evidence in Beseam",
                note: "Beseam rechecks the original signal and compares commercial results over equivalent periods.",
                accent: "text-[#8ea2ff]",
              },
            ].map((item) => (
              <article key={item.code} className="border-b border-white/18 py-10 lg:border-b-0 lg:border-r lg:px-7 lg:first:pl-0 lg:last:border-r-0 lg:last:pr-0">
                <p className={`font-mono text-[10px] font-semibold uppercase tracking-[0.14em] ${item.accent}`}>{item.code}</p>
                <h3 className="mt-4 min-h-[4.5rem] max-w-sm text-[20px] font-semibold leading-snug text-white">{item.title}</h3>
                <div className="relative mt-7 aspect-[16/10] overflow-hidden border border-white/18 bg-white">
                  <Image src={item.src} alt={item.alt} fill sizes="(max-width: 1024px) 100vw, 33vw" className="object-cover object-top" />
                </div>
                <p className="mt-5 max-w-sm text-[14px] leading-relaxed text-white/58">{item.note}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="packages" className="scroll-mt-24 border-b border-black/18">
        <div className="mx-auto max-w-[92rem] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-20">
            <div>
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-[#3154ff]">Products and access</p>
              <h2 className="mt-6 max-w-[9ch] font-serif text-[clamp(2.8rem,4.4vw,4.4rem)] font-normal leading-[1.02] tracking-[-0.04em]">
                Choose the products each store needs.
              </h2>
              <p className="mt-7 max-w-lg text-[16px] leading-[1.7] text-black/64">
                Every active contract includes Foundation. AI Visibility, Commerce Readiness, Advertising, Analytics, Behavior, Optimization, Reliability, and Creative Studio can be enabled independently for each store.
              </p>
            </div>

            <div className="border-t border-black/25">
              <div className="hidden grid-cols-[1.05fr_0.6fr_1.35fr_0.6fr] border-b border-black/25 py-3 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-black/42 sm:grid">
                <span>Product</span><span>System</span><span>How it is sold</span><span>Status</span>
              </div>
              {ENTITLEMENTS.map(([product, system, commercial, status]) => (
                <div key={product} className="grid gap-2 border-b border-black/18 py-5 sm:grid-cols-[1.05fr_0.6fr_1.35fr_0.6fr] sm:items-baseline sm:gap-5">
                  <span className="text-[15px] font-semibold text-black/82">{product}</span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.09em] text-[#3154ff]">{system}</span>
                  <span className="text-[13px] leading-relaxed text-black/58">{commercial}</span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-black/48">{status}</span>
                </div>
              ))}
              <div id="creative-studio" className="scroll-mt-24 pt-6 text-[13px] leading-relaxed text-black/54">
                Beta products remain marked Beta. Google and Meta bill media spend directly. Creative Studio shows the credit estimate before generation.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-black/18 bg-[#f4f1e9]">
        <div className="mx-auto max-w-[92rem] px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-[18rem_minmax(0,1fr)] lg:gap-16">
            <div>
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-[#3154ff]">Compare the operating model</p>
              <h2 className="mt-6 font-serif text-[36px] leading-[1.02] tracking-[-0.038em]">Keep the tools that already do their job.</h2>
              <Link href="/compare" className="mt-6 inline-flex items-center gap-2 text-[13px] font-semibold text-[#3154ff]">
                View all comparisons <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="border-t border-black/24">
              {[
                ["Google Analytics", "Reporting", "Measure acquisition and events; use Beseam to rank the cross-system commerce issue."],
                ["Hotjar", "Behavior", "Keep replay and heatmaps; use Beseam to connect the evidence to revenue action."],
                ["VWO", "Experimentation", "Run the experiment in VWO; use Beseam to decide what deserves one."],
              ].map(([name, category, detail]) => (
                <Link key={name} href={`/compare/${name.toLowerCase().replaceAll(" ", "-")}`} className="group grid gap-3 border-b border-black/18 py-6 sm:grid-cols-[11rem_8rem_minmax(0,1fr)_auto] sm:items-start">
                  <h3 className="text-[15px] font-semibold text-black/82">Beseam vs {name}</h3>
                  <span className="font-mono text-[9px] uppercase tracking-[0.09em] text-[#3154ff]">{category}</span>
                  <p className="text-[13px] leading-relaxed text-black/56">{detail}</p>
                  <ArrowRight className="h-4 w-4 text-[#3154ff] transition-transform group-hover:translate-x-0.5" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-black/18 bg-[#111318] text-white">
        <div className="mx-auto max-w-[92rem] px-5 py-20 sm:px-8 sm:py-24 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-20">
            <div>
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8ea2ff]">Commerce Fieldbook</p>
              <h2 className="mt-6 max-w-[10ch] font-serif text-[clamp(2.7rem,4.1vw,4.1rem)] font-normal leading-[1.02] tracking-[-0.04em]">
                Solve the problem. Inspect the method. Reuse the workflow.
              </h2>
              <p className="mt-7 max-w-lg text-[15px] leading-[1.7] text-white/58">
                Practical ecommerce problems, evidence-aware agent skills, open-source projects, standards, and primary references curated by Beseam.
              </p>
              <Link href="/resources" className="mt-8 inline-flex items-center gap-2 text-[13px] font-semibold text-[#8ea2ff]">
                Open the Commerce Fieldbook <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid border-y border-white/18 md:grid-cols-3">
              {[
                ["Problems", "Start with products missing from AI answers, feed conflicts, partial checkout failure, or revenue disagreement.", "/resources/problems"],
                ["Agent skills", "Use structured workflows with explicit inputs, outputs, checks, evidence requirements, and boundaries.", "/resources/skills"],
                ["Projects", "Explore open-source tools, open standards, primary documentation, and selected Beseam projects.", "/resources/projects"],
              ].map(([title, detail, href]) => (
                <Link key={title} href={href} className="group border-b border-white/18 py-7 md:border-b-0 md:border-r md:px-6 md:first:pl-0 md:last:border-r-0 md:last:pr-0">
                  <h3 className="text-[18px] font-semibold text-white">{title}</h3>
                  <p className="mt-4 text-[13px] leading-relaxed text-white/52">{detail}</p>
                  <span className="mt-7 inline-flex items-center gap-2 text-[12px] font-semibold text-[#8ea2ff]">Explore <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" /></span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-black/18 bg-[#ebe8df]">
        <div className="mx-auto max-w-[92rem] px-5 py-20 sm:px-8 sm:py-24 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-20">
            <div>
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-[#3154ff]">Automation boundaries</p>
              <h2 className="mt-6 max-w-[10ch] font-serif text-[clamp(2.7rem,4.1vw,4.1rem)] font-normal leading-[1.02] tracking-[-0.04em]">
                Autonomous where evidence is strong. Human where impact is material.
              </h2>
            </div>
            <div className="grid border-y border-black/22 md:grid-cols-3">
              {[
                {
                  icon: ShieldCheck,
                  title: "Your systems remain the systems of record",
                  detail: "Shopify keeps the order ledger. Google and Meta keep channel attribution. Beseam connects the evidence without rewriting the source record.",
                },
                {
                  icon: PackageSearch,
                  title: "Every action keeps evidence",
                  detail: "The affected store, product or page, issue, owner, approval, execution, and verification remain attached.",
                },
                {
                  icon: Check,
                  title: "Money keeps its meaning",
                  detail: "Booked, observed, attributed, and modeled values keep their own source, period, method, and confidence.",
                },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="border-b border-black/18 py-7 md:border-b-0 md:border-r md:px-6 md:first:pl-0 md:last:border-r-0 md:last:pr-0">
                    <Icon className="h-5 w-5 text-[#3154ff]" strokeWidth={1.6} aria-hidden="true" />
                    <h3 className="mt-8 text-[18px] font-semibold leading-snug">{item.title}</h3>
                    <p className="mt-3 text-[14px] leading-relaxed text-black/60">{item.detail}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <FirstMonthPromise />

      <section className="border-b border-black/18 bg-[#f4f1e9]">
        <div className="mx-auto max-w-[92rem] px-5 py-20 sm:px-8 sm:py-24 lg:px-10">
          <div className="grid border-y border-black/24 lg:grid-cols-[minmax(0,1fr)_19rem]">
            <div className="py-10 pr-0 lg:py-14 lg:pr-16">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#3154ff]">20-minute commerce review</p>
              <h2 className="mt-5 max-w-[16ch] font-serif text-[clamp(2.6rem,4.2vw,4.3rem)] font-normal leading-[1.02] tracking-[-0.04em] text-[#111318]">
                Bring one store and leave with the first issue to investigate.
              </h2>
            </div>
            <div className="border-t border-black/24 py-8 lg:border-l lg:border-t-0 lg:py-0 lg:pl-8">
              <div className="flex h-full flex-col justify-center">
                <dl className="grid gap-4 border-b border-black/18 pb-6 font-mono text-[10px] uppercase tracking-[0.09em] text-black/48">
                  <div className="flex justify-between gap-4"><dt>Input</dt><dd className="text-right text-black/72">One store + current stack</dd></div>
                  <div className="flex justify-between gap-4"><dt>Output</dt><dd className="text-right text-black/72">Priority + next step</dd></div>
                  <div className="flex justify-between gap-4"><dt>Commitment</dt><dd className="text-right text-black/72">20 minutes; no replatform</dd></div>
                </dl>
                <BookReviewCta location="homepage_final" label="Book a 20-minute commerce review" className="mt-7 w-full" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
