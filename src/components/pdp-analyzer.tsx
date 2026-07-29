"use client";

import {
  Sparkles,
  Clock,
  Eye,
  TrendingUp,
  Package,
  Shield,
  CreditCard,
  CheckCircle2,
} from "lucide-react";

interface SectionScore {
  index: number;
  title: string;
  score: number;
  status: "complete" | "incomplete" | "missing";
  details: string;
  aiPriority?: boolean;
  pointsGain?: number;
  urgency?: "urgent" | "week" | "month";
}

const mockScanResults: SectionScore[] = [
  {
    index: 1,
    title: "Promo Bar & Breadcrumbs",
    score: 0,
    status: "missing",
    details: "No announcement bar or breadcrumb navigation found",
    urgency: "week",
    pointsGain: 5,
  },
  {
    index: 2,
    title: "Hero Media Gallery",
    score: 50,
    status: "incomplete",
    details: "Has 3 images, needs 10+ with lifestyle, detail, and in-use shots",
    urgency: "urgent",
    pointsGain: 10,
  },
  {
    index: 3,
    title: "Product Info & Pricing",
    score: 60,
    status: "incomplete",
    details:
      "Has title and price, missing SKU, rating display, and benefit bullets",
    pointsGain: 8,
  },
  {
    index: 4,
    title: "Upsells & Urgency",
    score: 0,
    status: "missing",
    details: "No bundle offers, stock urgency, or quantity incentives",
    urgency: "week",
    pointsGain: 7,
  },
  {
    index: 5,
    title: "Trust Signals & Shipping",
    score: 40,
    status: "incomplete",
    details: "Has basic shipping info, missing guarantees and trust badges",
    pointsGain: 6,
  },
  {
    index: 6,
    title: "Technical Specifications",
    score: 0,
    status: "missing",
    details: "No structured specs table for AI parsing",
    aiPriority: true,
    urgency: "urgent",
    pointsGain: 15,
  },
  {
    index: 7,
    title: "Product Story & Benefits",
    score: 30,
    status: "incomplete",
    details:
      "Has short description, needs 300-500 word narrative with use cases",
    aiPriority: true,
    urgency: "urgent",
    pointsGain: 10,
  },
  {
    index: 8,
    title: "How It Works",
    score: 0,
    status: "missing",
    details: "No step-by-step usage guide or process explanation",
    pointsGain: 5,
  },
  {
    index: 9,
    title: "Image + Text Sections",
    score: 20,
    status: "incomplete",
    details: "Minimal lifestyle imagery, needs feature callouts with visuals",
    pointsGain: 8,
  },
  {
    index: 10,
    title: "Benefits Showcase",
    score: 0,
    status: "missing",
    details: "No dedicated benefits section with icons and explanations",
    pointsGain: 6,
  },
  {
    index: 11,
    title: "Comparison & Stats",
    score: 0,
    status: "missing",
    details: "No comparison table or competitive differentiation",
    aiPriority: true,
    urgency: "urgent",
    pointsGain: 12,
  },
  {
    index: 12,
    title: "FAQs & Q&A",
    score: 0,
    status: "missing",
    details: "No FAQ section with schema markup",
    aiPriority: true,
    urgency: "urgent",
    pointsGain: 18,
  },
  {
    index: 13,
    title: "Trust & Guarantee Badges",
    score: 0,
    status: "missing",
    details: "No return policy, warranty, or security badges displayed",
    aiPriority: true,
    urgency: "urgent",
    pointsGain: 8,
  },
  {
    index: 14,
    title: "Reviews & Social Proof",
    score: 75,
    status: "complete",
    details: "Has reviews section with ratings, could add more schema markup",
    aiPriority: true,
    pointsGain: 3,
  },
  {
    index: 15,
    title: "Recommendations & Bundles",
    score: 0,
    status: "missing",
    details: "No 'Complete the look' or product recommendations",
    pointsGain: 7,
  },
];

const calculateOverallScore = (sections: SectionScore[]) => {
  const total = sections.reduce((sum, section) => sum + section.score, 0);
  return Math.round(total / sections.length);
};

const calculatePotentialScore = (sections: SectionScore[]) => {
  const current = calculateOverallScore(sections);
  const totalGain = sections.reduce(
    (sum, section) => sum + (section.pointsGain || 0),
    0,
  );
  return Math.min(100, current + totalGain);
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "complete":
      return "✅";
    case "incomplete":
      return "⚠️";
    case "missing":
      return "❌";
    default:
      return "•";
  }
};

const PlaceholderBox = ({
  label,
  className = "",
  borderColor = "border-border/70",
}: {
  label: string;
  className?: string;
  borderColor?: string;
}) => (
  <div
    className={`flex items-center justify-center rounded-md border border-dashed ${borderColor} bg-muted/40 px-3 py-2 text-[10px] leading-snug text-muted-foreground ${className}`}
  >
    {label}
  </div>
);

export function PdpAnalyzer() {
  // Real scanned PDP; host and SKU redacted so the demo store stays anonymous.
  const url = "https://…/products/net-dance-shoes";
  const overallScore = calculateOverallScore(mockScanResults);
  const potentialScore = calculatePotentialScore(mockScanResults);

  const getBorderColor = (section: SectionScore) => {
    if (section.status === "complete") return "border-emerald-200";
    if (section.status === "incomplete") return "border-orange-200";
    return "border-red-200";
  };

  return (
    <section className="bg-muted/40 py-24">
      <div className="container space-y-12">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary/80">
            Beseam PDP Analyzer
          </p>
          <h1 className="mt-3 text-balance text-4xl font-bold md:text-5xl">
            AI Search Visibility Score
          </h1>
          <p className="mt-4 text-muted-foreground">
            See exactly which sections your PDP is missing and how to optimize
            for AI search engines like ChatGPT, Claude, and Perplexity.
          </p>

          <div className="mt-6 rounded-3xl bg-background/80 px-4 py-3 text-left shadow-sm ring-1 ring-border/60">
            <p className="text-xs font-medium text-muted-foreground">
              Analyzed URL:
            </p>
            <p className="mt-1 truncate text-sm">{url}</p>
          </div>
        </div>

        <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1.7fr)_minmax(0,1.1fr)]">
          <div className="mx-auto w-full max-w-3xl rounded-3xl border border-border/70 bg-background p-6 text-[11px] shadow-sm">
            <div className="space-y-3 border-b border-border/60 pb-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                      Promo / Announcement Bar
                    </p>
                    <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[9px] font-semibold text-blue-700">
                      Above the fold
                    </span>
                  </div>
                  <p className="text-[11px] text-muted-foreground">
                    Flash sales, free shipping thresholds, limited-time offers
                  </p>
                </div>
              </div>
              <PlaceholderBox
                label="Promo bar: 'Free shipping on orders over $50' or 'Limited time: 30% off'"
                className="h-8 justify-start"
                borderColor={getBorderColor(mockScanResults[0])}
              />

              <div className="space-y-1">
                <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                  Breadcrumb Navigation (AI Priority)
                </p>
                <p className="text-[11px] text-muted-foreground">
                  Critical for AI understanding product taxonomy and category
                  structure
                </p>
              </div>
              <PlaceholderBox
                label="Home > Category > Subcategory > Product Name"
                className="h-6 max-w-md justify-start"
                borderColor={getBorderColor(mockScanResults[0])}
              />
            </div>

            <div className="grid gap-6 border-t border-border/60 pt-6 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                    Hero Media Gallery
                  </p>
                  <div className="flex gap-1.5 text-[9px]">
                    <span className="rounded-full bg-orange-50 px-2 py-0.5 font-semibold text-orange-700">
                      Bestseller
                    </span>
                    <span className="rounded-full bg-purple-50 px-2 py-0.5 font-semibold text-purple-700">
                      New
                    </span>
                  </div>
                </div>
                <PlaceholderBox
                  label="Primary product image / video gallery (with 360° view option)"
                  className="h-56 md:h-64"
                  borderColor={getBorderColor(mockScanResults[1])}
                />
                <div className="grid grid-cols-5 gap-2">
                  {[
                    "Angle 1",
                    "Angle 2",
                    "Lifestyle",
                    "Detail",
                    "In use",
                    "Angle 3",
                    "Context",
                    "Feature",
                    "Scale",
                    "Video",
                  ].map((label) => (
                    <PlaceholderBox
                      key={label}
                      label={label}
                      className="aspect-square"
                      borderColor={getBorderColor(mockScanResults[1])}
                    />
                  ))}
                </div>
                <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Eye className="h-3 w-3" />
                    <span>127 viewing now</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    <span>43 sold in last 24h</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <PlaceholderBox
                  label="Product title + subtitle"
                  className="h-10 justify-start"
                  borderColor={getBorderColor(mockScanResults[2])}
                />
                <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                  <span>SKU: PRD-12345</span>
                  <span>•</span>
                  <span>Model: TB-HD-750</span>
                </div>
                <div className="flex items-center gap-3">
                  <PlaceholderBox
                    label="⭐⭐⭐⭐⭐ 4.8 (1,247 reviews)"
                    className="h-6 max-w-[220px] justify-start"
                    borderColor={getBorderColor(mockScanResults[2])}
                  />
                  <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-0.5 text-[10px] font-semibold text-green-700">
                    <CheckCircle2 className="h-3 w-3" /> In Stock
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="flex items-baseline gap-2">
                    <PlaceholderBox
                      label="$69.99"
                      className="h-8 w-20 text-lg font-bold"
                      borderColor={getBorderColor(mockScanResults[2])}
                    />
                    <span className="text-[11px] text-muted-foreground line-through">
                      $99.99
                    </span>
                    <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
                      Save 30%
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>Sale ends in 2h 34m</span>
                  </div>
                </div>

                <PlaceholderBox
                  label="3-5 key benefit bullets with icons"
                  className="h-16 justify-start"
                  borderColor={getBorderColor(mockScanResults[2])}
                />

                <PlaceholderBox
                  label="Options (size / colour / variants) with swatches"
                  className="h-14 justify-start"
                  borderColor={getBorderColor(mockScanResults[2])}
                />

                <PlaceholderBox
                  label="Frequently bought together (bundle with discount)"
                  className="h-20 justify-start"
                  borderColor={getBorderColor(mockScanResults[3])}
                />

                <PlaceholderBox
                  label="Stock urgency: 'Only 7 left in stock' with progress bar"
                  className="h-8 justify-start"
                  borderColor={getBorderColor(mockScanResults[3])}
                />

                <div className="space-y-2">
                  <PlaceholderBox
                    label="Quantity selector + Add to cart + Buy now buttons"
                    className="h-12 justify-start"
                    borderColor={getBorderColor(mockScanResults[2])}
                  />
                  <div className="flex items-center gap-2 text-[10px]">
                    <CreditCard className="h-3.5 w-3.5 text-muted-foreground" />
                    <span className="text-muted-foreground">
                      Visa, Mastercard, PayPal, Apple Pay, Klarna
                    </span>
                  </div>
                </div>

                <PlaceholderBox
                  label="Estimated delivery: Arrives by Dec 15 (with zip code input)"
                  className="h-10 justify-start"
                  borderColor={getBorderColor(mockScanResults[4])}
                />

                <PlaceholderBox
                  label="Shipping options: Standard (Free), Express ($9.99), Next Day ($19.99)"
                  className="h-12 justify-start"
                  borderColor={getBorderColor(mockScanResults[4])}
                />

                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-[10px]">
                    <Shield className="h-3.5 w-3.5 text-secondary" />
                    <span className="font-medium">
                      Free shipping from $50 in EU/CH
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                    <Package className="h-3.5 w-3.5" />
                    <span>30-day return policy • 2-year warranty</span>
                  </div>
                </div>

                <PlaceholderBox
                  label="Collapsible sections: Benefits, Care, Sizing, Shipping, Returns, Warranty"
                  className="h-20 justify-start"
                  borderColor={getBorderColor(mockScanResults[4])}
                />
              </div>
            </div>

            <div className="mt-6 space-y-6">
              <div className="mb-4 border-t border-dashed border-border/60 pt-4">
                <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[9px] font-semibold text-blue-700">
                  Below the fold - Scroll sections
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                    Section 1 • Technical Specifications
                  </p>
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
                    <Sparkles className="h-3 w-3" /> AI Priority
                  </span>
                </div>
                <p className="text-[10px] text-muted-foreground">
                  Structured key-value pairs for AI parsing and customer clarity
                </p>
                <div className="grid gap-2 md:grid-cols-2">
                  <PlaceholderBox
                    label="Specs table: Dimensions, Weight, Power, Materials, etc."
                    className="h-24 justify-start"
                    borderColor={getBorderColor(mockScanResults[5])}
                  />
                  <PlaceholderBox
                    label="Compatibility: Works with all hair types, 110-240V worldwide"
                    className="h-24 justify-start"
                    borderColor={getBorderColor(mockScanResults[5])}
                  />
                </div>
                <div className="grid gap-2 md:grid-cols-2">
                  <PlaceholderBox
                    label="Use cases: Travel, Gym, Business trips, Camping"
                    className="h-12 justify-start"
                    borderColor={getBorderColor(mockScanResults[5])}
                  />
                  <PlaceholderBox
                    label="Target audience: Frequent travelers, Digital nomads"
                    className="h-12 justify-start"
                    borderColor={getBorderColor(mockScanResults[5])}
                  />
                </div>
                <PlaceholderBox
                  label="Certifications: CE, FCC, RoHS badges • Eco-friendly materials"
                  className="h-10 justify-start"
                  borderColor={getBorderColor(mockScanResults[5])}
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                    Section 2 • Product Story
                  </p>
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
                    <Sparkles className="h-3 w-3" /> AI Priority
                  </span>
                </div>
                <p className="text-[10px] text-muted-foreground">
                  Problem-solution framework with benefits and use cases
                </p>
                <PlaceholderBox
                  label="Long-form narrative (300-500 words): Problem → Solution → Benefits"
                  className="h-28 justify-start"
                  borderColor={getBorderColor(mockScanResults[6])}
                />
              </div>

              <div className="space-y-2">
                <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                  Section 3 • How It Works + What's in the Box
                </p>
                <div className="grid gap-4 md:grid-cols-2">
                  <PlaceholderBox
                    label="Step-by-step: 1. Pack it → 2. Travel → 3. Style"
                    className="h-28"
                    borderColor={getBorderColor(mockScanResults[7])}
                  />
                  <PlaceholderBox
                    label="Unboxing: Hair dryer, Diffuser, Travel case, Manual"
                    className="h-28"
                    borderColor={getBorderColor(mockScanResults[7])}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                  Section 4 • Image + Text Sections (2-3 alternating layouts)
                </p>
                <div className="grid gap-4 md:grid-cols-2">
                  <PlaceholderBox
                    label="Lifestyle image (square or 4:3)"
                    className="h-32"
                    borderColor={getBorderColor(mockScanResults[8])}
                  />
                  <PlaceholderBox
                    label="Benefit headline + 3-4 bullets + CTA"
                    className="h-32 justify-start"
                    borderColor={getBorderColor(mockScanResults[8])}
                  />
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <PlaceholderBox
                    label="Benefit headline + 3-4 bullets + CTA"
                    className="h-32 justify-start"
                    borderColor={getBorderColor(mockScanResults[8])}
                  />
                  <PlaceholderBox
                    label="Lifestyle image (reversed layout)"
                    className="h-32"
                    borderColor={getBorderColor(mockScanResults[8])}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                  Section 5 • Image with Benefits (circular center layout)
                </p>
                <div className="grid gap-4 md:grid-cols-[1fr_1.2fr_1fr]">
                  <div className="space-y-3">
                    <PlaceholderBox
                      label="✨ Benefit 1 with emoji"
                      className="h-16"
                      borderColor={getBorderColor(mockScanResults[9])}
                    />
                    <PlaceholderBox
                      label="⚡ Benefit 2 with emoji"
                      className="h-16"
                      borderColor={getBorderColor(mockScanResults[9])}
                    />
                  </div>
                  <PlaceholderBox
                    label="Circular product image"
                    className="aspect-square"
                    borderColor={getBorderColor(mockScanResults[9])}
                  />
                  <div className="space-y-3">
                    <PlaceholderBox
                      label="🔌 Benefit 3 with emoji"
                      className="h-16"
                      borderColor={getBorderColor(mockScanResults[9])}
                    />
                    <PlaceholderBox
                      label="💇‍♀️ Benefit 4 with emoji"
                      className="h-16"
                      borderColor={getBorderColor(mockScanResults[9])}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                    Section 6 • Comparison Table
                  </p>
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
                    <Sparkles className="h-3 w-3" /> AI Priority
                  </span>
                </div>
                <p className="text-[10px] text-muted-foreground">
                  Side-by-side feature comparison with visual checkmarks/crosses
                </p>
                <PlaceholderBox
                  label="Comparison: This Product vs Others (5-7 features with ✓/✕)"
                  className="h-28 justify-start"
                  borderColor={getBorderColor(mockScanResults[10])}
                />
              </div>

              <div className="space-y-2">
                <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                  Section 7 • Percentage Stats (customer satisfaction)
                </p>
                <p className="text-[10px] text-muted-foreground">
                  Circular progress indicators showing customer satisfaction
                  metrics
                </p>
                <div className="grid gap-4 md:grid-cols-2">
                  <PlaceholderBox
                    label="Product image (square or circular)"
                    className="h-32"
                    borderColor={getBorderColor(mockScanResults[10])}
                  />
                  <div className="space-y-2">
                    <PlaceholderBox
                      label="97% reported smoother hair (circular progress)"
                      className="h-9"
                      borderColor={getBorderColor(mockScanResults[10])}
                    />
                    <PlaceholderBox
                      label="96% noticed faster drying (circular progress)"
                      className="h-9"
                      borderColor={getBorderColor(mockScanResults[10])}
                    />
                    <PlaceholderBox
                      label="98% fits in carry-on (circular progress)"
                      className="h-9"
                      borderColor={getBorderColor(mockScanResults[10])}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                    Section 8 • FAQs with Schema Markup
                  </p>
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
                    <Sparkles className="h-3 w-3" /> AI Priority
                  </span>
                </div>
                <p className="text-[10px] text-muted-foreground">
                  Accordion FAQs with JSON-LD schema for AI search engines
                </p>
                <PlaceholderBox
                  label="FAQs accordion (5-8 questions) with FAQ schema markup"
                  className="h-28 justify-start"
                  borderColor={getBorderColor(mockScanResults[11])}
                />
              </div>

              <div className="space-y-2">
                <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                  Section 9 • Customer Q&A
                </p>
                <p className="text-[10px] text-muted-foreground">
                  Community questions answered by brand and other customers
                </p>
                <PlaceholderBox
                  label="Q&A section: Customer questions with answers (separate from FAQs)"
                  className="h-24 justify-start"
                  borderColor={getBorderColor(mockScanResults[11])}
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                    Section 10 • Trust Badges & Certifications
                  </p>
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
                    <Sparkles className="h-3 w-3" /> AI Priority
                  </span>
                </div>
                <p className="text-[10px] text-muted-foreground">
                  Security, payment, and certification badges for trust
                </p>
                <PlaceholderBox
                  label="Trust badges: Secure checkout, Money-back guarantee, Authorized dealer"
                  className="h-16 justify-start"
                  borderColor={getBorderColor(mockScanResults[12])}
                />
                <PlaceholderBox
                  label="Press mentions: 'As seen in Vogue, GQ, Travel + Leisure'"
                  className="h-12 justify-start"
                  borderColor={getBorderColor(mockScanResults[12])}
                />
              </div>

              <div className="space-y-2">
                <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                  Section 11 • Guarantee & Warranty Details
                </p>
                <PlaceholderBox
                  label="30-day money-back guarantee with checkmark list + CTA"
                  className="h-24 justify-start"
                  borderColor={getBorderColor(mockScanResults[12])}
                />
                <PlaceholderBox
                  label="Warranty details: 2-year manufacturer warranty, claim process"
                  className="h-16 justify-start"
                  borderColor={getBorderColor(mockScanResults[12])}
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                    Section 12 • Customer Reviews & Ratings
                  </p>
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
                    <Sparkles className="h-3 w-3" /> AI Priority
                  </span>
                </div>
                <p className="text-[10px] text-muted-foreground">
                  Reviews with schema markup, filters, sorting, and social proof
                </p>
                <PlaceholderBox
                  label="Review summary: 4.8/5 stars (1,247 reviews) with star distribution"
                  className="h-16 justify-start"
                  borderColor={getBorderColor(mockScanResults[13])}
                />
                <PlaceholderBox
                  label="Review filters: All, 5-star, 4-star, With photos, Verified only"
                  className="h-10 justify-start"
                  borderColor={getBorderColor(mockScanResults[13])}
                />
                <PlaceholderBox
                  label="Masonry review cards with avatars, stars, verified badges (10-15 reviews)"
                  className="h-36 justify-start"
                  borderColor={getBorderColor(mockScanResults[13])}
                />
                <PlaceholderBox
                  label="Video testimonials section (2-3 customer videos)"
                  className="h-24"
                  borderColor={getBorderColor(mockScanResults[13])}
                />
              </div>

              <div className="space-y-2">
                <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                  Section 13 • UGC Gallery & Social Proof
                </p>
                <p className="text-[10px] text-muted-foreground">
                  Customer photos and social media content
                </p>
                <PlaceholderBox
                  label="Instagram-style UGC gallery: Customer photos with product tags"
                  className="h-28"
                  borderColor={getBorderColor(mockScanResults[13])}
                />
                <PlaceholderBox
                  label="Influencer endorsements: 'Recommended by @travelinfluencer'"
                  className="h-12 justify-start"
                  borderColor={getBorderColor(mockScanResults[13])}
                />
              </div>

              <div className="space-y-2">
                <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                  Section 14 • Frequently Bought Together
                </p>
                <p className="text-[10px] text-muted-foreground">
                  Bundle suggestions with combined discount
                </p>
                <PlaceholderBox
                  label="Bundle: This product + Accessory 1 + Accessory 2 = Save 15%"
                  className="h-24"
                  borderColor={getBorderColor(mockScanResults[13])}
                />
              </div>

              <div className="space-y-2">
                <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                  Section 15 • Recommended & Related Products
                </p>
                <PlaceholderBox
                  label="You may also like / recommended products row (4-5 products)"
                  className="h-28"
                  borderColor={getBorderColor(mockScanResults[14])}
                />
                <PlaceholderBox
                  label="Recently viewed products (4 products)"
                  className="h-24"
                  borderColor={getBorderColor(mockScanResults[14])}
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-3xl bg-background p-6 shadow-sm ring-1 ring-border/60">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Current Score
                  </p>
                  <p className="mt-1 text-4xl font-bold">{overallScore}/100</p>
                </div>
                <div
                  className={`flex h-16 w-16 items-center justify-center rounded-full ${
                    overallScore >= 70
                      ? "bg-emerald-100"
                      : overallScore >= 40
                        ? "bg-orange-100"
                        : "bg-red-100"
                  }`}
                >
                  <span className="text-2xl">
                    {overallScore >= 70
                      ? "🎉"
                      : overallScore >= 40
                        ? "⚠️"
                        : "❌"}
                  </span>
                </div>
              </div>

              <div className="mt-4 h-2 w-full rounded-full bg-muted">
                <div
                  className={`h-full rounded-full ${
                    overallScore >= 70
                      ? "bg-emerald-500"
                      : overallScore >= 40
                        ? "bg-orange-500"
                        : "bg-red-500"
                  }`}
                  style={{ width: `${overallScore}%` }}
                />
              </div>

              <p className="mt-3 text-xs text-muted-foreground">
                {overallScore >= 70
                  ? "Good foundation"
                  : overallScore >= 40
                    ? "Needs improvement"
                    : "Needs significant work"}
              </p>
            </div>

            <div className="rounded-3xl bg-linear-to-br from-primary/20 to-violet-500/20 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Potential Score
                  </p>
                  <div className="mt-1 flex items-baseline gap-2">
                    <p className="text-sm text-muted-foreground line-through">
                      {overallScore}/100
                    </p>
                    <p className="text-3xl font-bold text-primary">
                      {potentialScore}/100
                    </p>
                  </div>
                </div>
                <div className="text-3xl">🚀</div>
              </div>

              <p className="mt-3 text-xs text-muted-foreground">
                With Beseam's AI-generated content
              </p>

              <button className="mt-4 w-full rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-lg transition-all hover:bg-primary/90">
                Get to {potentialScore}/100 with Beseam →
              </button>
            </div>

            {/* <div className="rounded-3xl bg-background p-6 shadow-sm ring-1 ring-border/60">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                <h3 className="text-sm font-semibold">Live AI Test Results</h3>
              </div>

              <p className="mt-2 text-xs text-muted-foreground">
                Tested in ChatGPT, Claude & Perplexity
              </p>

              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between rounded-lg bg-red-50 px-3 py-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">❌</span>
                    <span className="text-xs font-medium text-red-700">
                      ChatGPT
                    </span>
                  </div>
                  <span className="text-xs font-semibold text-red-600">
                    Not mentioned
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-lg bg-red-50 px-3 py-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">❌</span>
                    <span className="text-xs font-medium text-red-700">
                      Claude
                    </span>
                  </div>
                  <span className="text-xs font-semibold text-red-600">
                    Not mentioned
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-lg bg-red-50 px-3 py-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">❌</span>
                    <span className="text-xs font-medium text-red-700">
                      Perplexity
                    </span>
                  </div>
                  <span className="text-xs font-semibold text-red-600">
                    Not mentioned
                  </span>
                </div>
              </div>

              <p className="mt-3 text-xs text-muted-foreground">
                Query: "Best dance shoes for ballroom under $200"
              </p>
            </div> */}

            <div className="space-y-2">
              <h3 className="px-1 text-sm font-semibold">Section Breakdown</h3>

              {mockScanResults.map((section) => {
                const borderColor =
                  section.status === "complete"
                    ? "ring-emerald-200"
                    : section.status === "incomplete"
                      ? "ring-orange-200"
                      : "ring-red-200";
                const scoreColor =
                  section.status === "complete"
                    ? "text-emerald-600"
                    : section.status === "incomplete"
                      ? "text-orange-600"
                      : "text-red-600";

                return (
                  <div
                    key={section.index}
                    className={`rounded-2xl bg-background p-3 shadow-sm ring-1 ${borderColor}`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex min-w-0 flex-1 items-start gap-2">
                        <span className="mt-0.5 text-base">
                          {getStatusIcon(section.status)}
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-1.5">
                            <p className="text-sm font-medium">
                              {section.index}. {section.title}
                            </p>
                            {section.aiPriority && (
                              <span className="inline-flex items-center gap-0.5 rounded-full bg-emerald-50 px-1.5 py-0.5 text-[9px] font-semibold text-emerald-700">
                                <Sparkles className="h-2.5 w-2.5" /> AI
                              </span>
                            )}
                            {section.urgency === "urgent" && (
                              <span className="inline-flex items-center rounded-full bg-red-500 px-1.5 py-0.5 text-[9px] font-bold text-white">
                                URGENT
                              </span>
                            )}
                          </div>
                          <p className="mt-0.5 text-xs text-muted-foreground">
                            {section.details}
                          </p>
                          {section.pointsGain && section.pointsGain > 0 && (
                            <p className="mt-1 text-[10px] font-semibold text-emerald-600">
                              +{section.pointsGain} points possible
                            </p>
                          )}
                        </div>
                      </div>
                      <span
                        className={`whitespace-nowrap text-xs font-semibold ${scoreColor}`}
                      >
                        {section.score}/100
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
