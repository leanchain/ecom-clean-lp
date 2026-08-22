"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { User } from "lucide-react";

type Metric = readonly [label: string, value: string, score: number];
type Satellite = readonly [label: string, value: string];
type Capability = readonly [label: string, value: string, description: string];

type Hub = {
  id: string;
  label: string;
  x: number;
  y: number;
  satellites: readonly Satellite[];
  metrics: readonly Metric[];
};

type Point = { x: number; y: number };

type CapabilityNode = {
  hubId: string;
  index: number;
  x: number;
  y: number;
  capability: Capability;
};

type CardState =
  | { kind: "hub"; hubId: string }
  | { kind: "capability"; hubId: string; index: number }
  | null;

const ACCENT = "#b8441d";
const INK = "#111318";
const PAPER = "#fafafa";
const INTERNAL_MATURITY = new Set(["Beta", "Experimental", "Production"]);
const HUBS: readonly Hub[] = [
  {
    id: "ai",
    label: "AI answers",
    x: 170,
    y: 158,
    satellites: [
      ["ChatGPT", "68"],
      ["Gemini", "61"],
      ["AI Mode", "72"],
      ["citations", "54"],
    ],
    metrics: [
      ["ChatGPT visibility", "68 / 100", 68],
      ["Gemini visibility", "61 / 100", 61],
      ["Google AI Mode", "72 / 100", 72],
    ],
  },
  {
    id: "search",
    label: "Search",
    x: 365,
    y: 108,
    satellites: [
      ["JSON-LD", "83%"],
      ["indexable", "100%"],
      ["queries", "74%"],
      ["snippets", "66%"],
    ],
    metrics: [
      ["JSON-LD coverage", "83%", 83],
      ["Indexability", "100%", 100],
      ["Query match", "74%", 74],
    ],
  },
  {
    id: "catalog",
    label: "Catalog",
    x: 590,
    y: 245,
    satellites: [
      ["fields", "91%"],
      ["freshness", "96%"],
      ["variants", "88%"],
      ["stock", "94%"],
    ],
    metrics: [
      ["Completeness", "91%", 91],
      ["Freshness", "96%", 96],
      ["Variant coverage", "88%", 88],
    ],
  },
  {
    id: "brand",
    label: "Brand",
    x: 770,
    y: 112,
    satellites: [
      ["claims", "86%"],
      ["identity", "94%"],
      ["trust", "71%"],
      ["evidence", "79%"],
    ],
    metrics: [
      ["Approved claims", "86%", 86],
      ["Identity coverage", "94%", 94],
      ["Trust evidence", "71%", 71],
    ],
  },
  {
    id: "truth",
    label: "Product truth",
    x: 840,
    y: 315,
    satellites: [
      ["price", "100%"],
      ["shipping", "80%"],
      ["reviews", "60%"],
      ["facts", "89%"],
    ],
    metrics: [
      ["Evidence coverage", "5 / 7", 71],
      ["Shipping facts", "4 / 5", 80],
      ["Structured facts", "89%", 89],
    ],
  },
  {
    id: "creative",
    label: "Creative",
    x: 1040,
    y: 118,
    satellites: [
      ["images", "82%"],
      ["video", "46%"],
      ["brand fit", "91%"],
      ["assets", "24"],
    ],
    metrics: [
      ["Product image coverage", "82%", 82],
      ["Brand consistency", "91%", 91],
      ["Video coverage", "46%", 46],
    ],
  },
  {
    id: "campaigns",
    label: "Campaigns",
    x: 1245,
    y: 155,
    satellites: [
      ["Google Ads", "82%"],
      ["Meta Ads", "76%"],
      ["landing", "91%"],
      ["tracking", "88%"],
    ],
    metrics: [
      ["Google Ads readiness", "82%", 82],
      ["Meta Ads readiness", "76%", 76],
      ["Landing readiness", "91%", 91],
    ],
  },
  {
    id: "onsite",
    label: "Onsite search",
    x: 1085,
    y: 330,
    satellites: [
      ["retrieval", "86%"],
      ["top 3", "64%"],
      ["zero result", "3.8%"],
      ["filters", "77%"],
    ],
    metrics: [
      ["Retrieval coverage", "86%", 86],
      ["Top-3 placement", "64%", 64],
      ["Zero-result rate", "3.8%", 38],
    ],
  },
  {
    id: "recs",
    label: "Recommendations",
    x: 1325,
    y: 315,
    satellites: [
      ["coverage", "84%"],
      ["affinity", "73%"],
      ["rules", "12"],
      ["holdout", "on"],
    ],
    metrics: [
      ["Catalog coverage", "84%", 84],
      ["Affinity confidence", "73%", 73],
      ["Holdout coverage", "62%", 62],
    ],
  },
  {
    id: "pdp",
    label: "Product page",
    x: 925,
    y: 500,
    satellites: [
      ["evidence", "5/7"],
      ["policy", "82%"],
      ["trust", "60%"],
      ["content", "89%"],
    ],
    metrics: [
      ["Decision evidence", "5 / 7", 71],
      ["Policy clarity", "82%", 82],
      ["Trust coverage", "60%", 60],
    ],
  },
  {
    id: "behavior",
    label: "Behavior",
    x: 1225,
    y: 500,
    satellites: [
      ["engagement", "18%"],
      ["friction", "7.2%"],
      ["searches", "426"],
      ["replay", "128"],
    ],
    metrics: [
      ["Interaction rate", "18%", 58],
      ["Friction sessions", "7.2%", 28],
      ["Searches observed", "426", 76],
    ],
  },
  {
    id: "checkout",
    label: "Checkout",
    x: 1490,
    y: 385,
    satellites: [
      ["complete", "72%"],
      ["payment", "97%"],
      ["drop-off", "28%"],
      ["errors", "1.4%"],
    ],
    metrics: [
      ["Completion", "72%", 72],
      ["Payment success", "97%", 97],
      ["Drop-off", "28%", 28],
    ],
  },
  {
    id: "revenue",
    label: "Revenue",
    x: 1630,
    y: 210,
    satellites: [
      ["orders", "184"],
      ["CVR", "3.6%"],
      ["AOV", "$84"],
      ["impact", "+8.4%"],
    ],
    metrics: [
      ["Orders", "184", 74],
      ["Conversion rate", "3.6%", 60],
      ["Observed impact", "+8.4%", 68],
    ],
  },
] as const;

type HubId = (typeof HUBS)[number]["id"];
type GraphLayoutName = "mobile" | "tablet" | "desktop" | "wide" | "ultrawide";
type GraphLayout = {
  width: number;
  height: number;
  capabilityLimit: number;
  capabilityRadius: number;
  satelliteRadius: number;
  positions: Record<HubId, Point>;
};

const GRAPH_LAYOUTS: Record<GraphLayoutName, GraphLayout> = {
  mobile: {
    width: 720,
    height: 1180,
    capabilityLimit: 2,
    capabilityRadius: 0.82,
    satelliteRadius: 0.9,
    positions: {
      ai: { x: 86, y: 150 },
      search: { x: 300, y: 92 },
      catalog: { x: 150, y: 330 },
      brand: { x: 520, y: 230 },
      truth: { x: 350, y: 430 },
      creative: { x: 612, y: 390 },
      campaigns: { x: 630, y: 590 },
      onsite: { x: 128, y: 610 },
      recs: { x: 330, y: 735 },
      pdp: { x: 92, y: 850 },
      behavior: { x: 520, y: 835 },
      checkout: { x: 380, y: 1035 },
      revenue: { x: 632, y: 1040 },
    },
  },
  tablet: {
    width: 1160,
    height: 900,
    capabilityLimit: 4,
    capabilityRadius: 1.02,
    satelliteRadius: 1.08,
    positions: {
      ai: { x: 92, y: 165 },
      search: { x: 280, y: 92 },
      catalog: { x: 330, y: 300 },
      brand: { x: 510, y: 120 },
      truth: { x: 585, y: 350 },
      creative: { x: 760, y: 105 },
      campaigns: { x: 1000, y: 180 },
      onsite: { x: 820, y: 345 },
      recs: { x: 1035, y: 405 },
      pdp: { x: 650, y: 675 },
      behavior: { x: 900, y: 685 },
      checkout: { x: 1070, y: 590 },
      revenue: { x: 1080, y: 275 },
    },
  },
  desktop: {
    width: 1800,
    height: 760,
    capabilityLimit: 99,
    capabilityRadius: 1.18,
    satelliteRadius: 1.22,
    positions: {
      ai: { x: 150, y: 92 },
      search: { x: 390, y: 64 },
      catalog: { x: 660, y: 145 },
      brand: { x: 870, y: 72 },
      truth: { x: 310, y: 360 },
      creative: { x: 1110, y: 68 },
      campaigns: { x: 1390, y: 88 },
      onsite: { x: 220, y: 565 },
      recs: { x: 1540, y: 360 },
      pdp: { x: 520, y: 675 },
      behavior: { x: 1280, y: 675 },
      checkout: { x: 1580, y: 580 },
      revenue: { x: 1640, y: 126 },
    },
  },
  wide: {
    width: 2200,
    height: 780,
    capabilityLimit: 99,
    capabilityRadius: 1.28,
    satelliteRadius: 1.34,
    positions: {
      ai: { x: 135, y: 92 },
      search: { x: 420, y: 62 },
      catalog: { x: 760, y: 145 },
      brand: { x: 1020, y: 68 },
      truth: { x: 330, y: 370 },
      creative: { x: 1330, y: 64 },
      campaigns: { x: 1690, y: 84 },
      onsite: { x: 210, y: 590 },
      recs: { x: 1910, y: 370 },
      pdp: { x: 600, y: 690 },
      behavior: { x: 1590, y: 700 },
      checkout: { x: 1940, y: 610 },
      revenue: { x: 2070, y: 128 },
    },
  },
  ultrawide: {
    width: 2800,
    height: 820,
    capabilityLimit: 99,
    capabilityRadius: 1.38,
    satelliteRadius: 1.44,
    positions: {
      ai: { x: 125, y: 98 },
      search: { x: 500, y: 66 },
      catalog: { x: 940, y: 150 },
      brand: { x: 1260, y: 74 },
      truth: { x: 380, y: 390 },
      creative: { x: 1650, y: 68 },
      campaigns: { x: 2150, y: 88 },
      onsite: { x: 240, y: 625 },
      recs: { x: 2450, y: 395 },
      pdp: { x: 760, y: 730 },
      behavior: { x: 2020, y: 742 },
      checkout: { x: 2460, y: 650 },
      revenue: { x: 2660, y: 132 },
    },
  },
};

function resolveGraphLayout(width: number, height: number): GraphLayoutName {
  const aspect = width / Math.max(1, height);
  if (width < 640) return "mobile";
  if (width < 1024) return "tablet";
  if (width >= 2200 || aspect >= 2.7) return "ultrawide";
  if (width >= 1600 || aspect >= 2.15) return "wide";
  return "desktop";
}

const CAPABILITIES: Readonly<Record<string, readonly Capability[]>> = {
  ai: [
    [
      "Visibility checks",
      "Production",
      "Check how products and the brand appear across AI shopping surfaces.",
    ],
    [
      "Scheduled monitoring",
      "Production",
      "Re-run visibility checks on a schedule and surface meaningful changes.",
    ],
    [
      "Answer coverage",
      "68%",
      "Measure whether products are present for the shopper questions that matter.",
    ],
    [
      "Competitor observation",
      "active",
      "Observe products that appear instead of or alongside the merchant catalog.",
    ],
    [
      "Citation evidence",
      "54%",
      "Track the evidence and sources that support product representation.",
    ],
  ],
  search: [
    [
      "Search Console",
      "Production",
      "Scheduled search-performance evidence joined to commerce visibility.",
    ],
    [
      "JSON-LD coverage",
      "83%",
      "Structured product information available to search and shopping systems.",
    ],
    [
      "Indexability",
      "100%",
      "Whether important product surfaces can be discovered and indexed.",
    ],
    [
      "Query match",
      "74%",
      "How well product facts line up with commercial shopper queries.",
    ],
    [
      "Snippet support",
      "66%",
      "Visible and structured evidence that can support richer search results.",
    ],
  ],
  catalog: [
    [
      "Catalog sync",
      "Production",
      "Canonical product ingestion used by the rest of the commerce system.",
    ],
    [
      "Product workspace",
      "Production",
      "Synced product and variant truth available for diagnosis and decisions.",
    ],
    [
      "Product proposals",
      "Beta",
      "Supported product-field changes prepared for merchant review.",
    ],
    [
      "Product publishing",
      "Beta",
      "Approved product changes written back to the merchant store.",
    ],
    [
      "Variant coverage",
      "88%",
      "Coverage of variant-level product truth across the catalog.",
    ],
    [
      "Availability parity",
      "94%",
      "Agreement between catalog availability and visible storefront state.",
    ],
  ],
  brand: [
    [
      "Brand profile",
      "Production",
      "Approved brand identity and evidence reused across commerce decisions.",
    ],
    [
      "Brand refresh",
      "Beta",
      "Refresh brand evidence when the merchant chooses to regenerate it.",
    ],
    [
      "Approved claims",
      "86%",
      "Claims with enough supporting evidence to reuse safely.",
    ],
    [
      "Trust evidence",
      "71%",
      "Policies, proof and credibility signals attached to the brand.",
    ],
    [
      "Brand consistency",
      "94%",
      "Consistency between approved brand context and generated output.",
    ],
  ],
  truth: [
    [
      "Offer truth",
      "96%",
      "Canonical price, availability and offer-state agreement.",
    ],
    [
      "Price parity",
      "100%",
      "Price consistency across catalog, schema and the visible product page.",
    ],
    [
      "Shipping facts",
      "80%",
      "Shipping information available as structured and visible evidence.",
    ],
    [
      "Review visibility",
      "60%",
      "Whether review evidence is visible where shoppers decide.",
    ],
    [
      "Schema parity",
      "89%",
      "Agreement between structured product data and rendered product evidence.",
    ],
    [
      "Verification",
      "Beta",
      "Re-check a prior finding after an approved change is made.",
    ],
  ],
  creative: [
    [
      "Creative Studio",
      "Beta",
      "Product, brand, organic and advertising creative workspace.",
    ],
    [
      "Image generation",
      "Beta",
      "Credit-metered product and campaign image generation.",
    ],
    [
      "Video generation",
      "Beta",
      "Credit-metered product and campaign video generation.",
    ],
    [
      "Media review",
      "Beta",
      "Review and moderation before generated assets are promoted.",
    ],
    [
      "Asset library",
      "Beta",
      "Saved and reusable creative assets tied to store context.",
    ],
    [
      "Organic content",
      "Beta",
      "Creative and content workflows for non-paid commerce surfaces.",
    ],
  ],
  campaigns: [
    [
      "Google readiness",
      "Experimental",
      "Preflight catalog, tracking, landing and account readiness for Google Ads.",
    ],
    [
      "Google drafts",
      "Experimental",
      "Create and edit Google Ads campaign drafts before publishing.",
    ],
    [
      "Google publish",
      "Experimental",
      "Controlled publishing of approved Google Ads campaigns.",
    ],
    [
      "Meta readiness",
      "Experimental",
      "Preflight catalog, tracking, landing and account readiness for Meta Ads.",
    ],
    [
      "Meta drafts",
      "Experimental",
      "Create and edit Meta campaign drafts before publishing.",
    ],
    [
      "Ad creative",
      "Experimental",
      "Generate campaign copy and creative variants from product context.",
    ],
    [
      "Campaign performance",
      "Experimental",
      "Read campaign performance back into the commerce system.",
    ],
    [
      "Media spend",
      "Experimental",
      "External Google and Meta spend used in commercial measurement.",
    ],
  ],
  onsite: [
    [
      "Retrieval coverage",
      "86%",
      "How consistently relevant products can be retrieved for store search.",
    ],
    [
      "Search placement",
      "64% top 3",
      "Where relevant products appear in onsite search results.",
    ],
    [
      "Zero-result rate",
      "3.8%",
      "Shopping searches that return no useful product result.",
    ],
    [
      "Search behavior",
      "Beta",
      "Observed shopper search events and downstream behavior.",
    ],
    [
      "Merchandising signals",
      "Beta",
      "Rules and product signals that influence onsite discovery.",
    ],
  ],
  recs: [
    [
      "Recommendation placements",
      "Beta",
      "Storefront recommendation surfaces managed by Beseam.",
    ],
    [
      "Merchandising rules",
      "Beta",
      "Pin, block and boost controls over recommendation output.",
    ],
    [
      "Product affinity",
      "73%",
      "Behavior-derived strength between products and shopper intent.",
    ],
    [
      "Catalog coverage",
      "84%",
      "How much of the relevant catalog can participate in recommendations.",
    ],
    [
      "Holdout attribution",
      "Beta",
      "Measure recommendation incrementality against holdout traffic.",
    ],
  ],
  pdp: [
    [
      "Page inspection",
      "Experimental",
      "Product-page evidence and structural diagnosis.",
    ],
    [
      "Page audit",
      "Experimental",
      "Focused audit of a product page and its decision evidence.",
    ],
    [
      "Post-change verification",
      "Experimental",
      "Re-check a prior page finding after an approved change.",
    ],
    [
      "Structured parity",
      "89%",
      "Agreement between visible page content and structured product facts.",
    ],
    [
      "Size & fit",
      "Beta",
      "Fit guidance and size recommendations that help shoppers choose the right variant.",
    ],
    [
      "Trust visibility",
      "60%",
      "Reviews and trust evidence visible at the decision point.",
    ],
    [
      "Structured parity",
      "89%",
      "Agreement between visible page content and structured product facts.",
    ],
  ],
  behavior: [
    [
      "Beseam tracker",
      "Beta",
      "First-party navigation, engagement, commerce and friction events.",
    ],
    [
      "ShopifyQL",
      "Beta",
      "Shopify behavioral data rolled into the shared evidence model.",
    ],
    [
      "GA4",
      "Beta",
      "Google Analytics behavioral evidence joined into commerce analysis.",
    ],
    [
      "Microsoft Clarity",
      "Beta",
      "Clarity behavioral evidence available to the shared behavior layer.",
    ],
    [
      "PostHog",
      "Beta",
      "PostHog behavioral evidence available to the shared behavior layer.",
    ],
    [
      "Session replay",
      "Beta",
      "Replay evidence for understanding shopper friction.",
    ],
    ["Heatmaps", "Beta", "Heatmap and zone evidence for interaction analysis."],
  ],
  checkout: [
    [
      "Checkout events",
      "Beta",
      "Observed commerce events through the purchase path.",
    ],
    [
      "Payment success",
      "97%",
      "Observed payment completion across tracked checkout sessions.",
    ],
    ["Drop-off", "28%", "Observed shopper loss during the checkout path."],
    ["Runtime errors", "Beta", "Errors that may interfere with conversion."],
    [
      "Reliability alerts",
      "Beta",
      "Monitoring and incidents tied to storefront health.",
    ],
  ],
  revenue: [
    [
      "Commerce ledger",
      "Production",
      "Canonical ledger of orders and revenue used for impact measurement.",
    ],
    [
      "Impact measurement",
      "Production",
      "Before-and-after commercial measurement tied to completed actions.",
    ],
    [
      "Attribution",
      "Beta",
      "Keep observed and attributed commercial outcomes distinct.",
    ],
    ["Funnels", "Beta", "Commerce-funnel performance across the journey."],
    [
      "Cohorts",
      "Beta",
      "Cohort-level commercial performance and retention analysis.",
    ],
    [
      "Revenue reconciliation",
      "Beta",
      "Reconcile tracked and commerce-source revenue evidence.",
    ],
  ],
};

const LINKS = [
  ["ai", "search"],
  ["ai", "catalog"],
  ["search", "catalog"],
  ["search", "brand"],
  ["catalog", "brand"],
  ["catalog", "truth"],
  ["brand", "truth"],
  ["brand", "creative"],
  ["truth", "creative"],
  ["truth", "onsite"],
  ["truth", "pdp"],
  ["creative", "campaigns"],
  ["campaigns", "revenue"],
  ["onsite", "recs"],
  ["onsite", "behavior"],
  ["recs", "behavior"],
  ["recs", "checkout"],
  ["pdp", "behavior"],
  ["pdp", "checkout"],
  ["behavior", "checkout"],
  ["checkout", "revenue"],
  ["search", "behavior"],
  ["catalog", "campaigns"],
  ["brand", "campaigns"],
  ["creative", "pdp"],
  ["revenue", "recs"],
] as const;

const WEAK_LINKS = [
  ["ai", "brand"],
  ["search", "campaigns"],
  ["catalog", "recs"],
  ["creative", "behavior"],
  ["truth", "revenue"],
  ["pdp", "revenue"],
] as const;

type JourneyDefinition = {
  id: string;
  nodes: readonly HubId[];
  supportByNode?: Partial<Record<HubId, readonly HubId[]>>;
};

const JOURNEYS: readonly JourneyDefinition[] = [
  {
    id: "ai-discovery",
    nodes: ["ai", "pdp", "checkout", "revenue"],
    supportByNode: {
      ai: ["catalog", "truth", "behavior"],
      pdp: ["catalog", "truth", "behavior"],
      checkout: ["behavior"],
      revenue: ["behavior"],
    },
  },
  {
    id: "search-discovery",
    nodes: ["search", "pdp", "checkout", "revenue"],
    supportByNode: {
      search: ["catalog", "truth", "behavior"],
      pdp: ["catalog", "truth", "behavior"],
      checkout: ["behavior"],
      revenue: ["behavior"],
    },
  },
  {
    id: "onsite-discovery",
    nodes: ["onsite", "recs", "pdp", "checkout", "revenue"],
    supportByNode: {
      onsite: ["catalog", "behavior"],
      recs: ["catalog", "behavior"],
      pdp: ["catalog", "behavior"],
      checkout: ["behavior"],
      revenue: ["behavior"],
    },
  },
  {
    id: "campaign-discovery",
    nodes: ["campaigns", "pdp", "checkout", "revenue"],
    supportByNode: {
      campaigns: ["brand", "creative", "behavior"],
      pdp: ["creative", "behavior"],
      checkout: ["behavior"],
      revenue: ["behavior"],
    },
  },
];

const INITIAL_AUTO_HUB_ID: HubId | null = JOURNEYS[0]?.nodes[0] ?? null;
function curve(a: Hub, b: Hub, bend = 0) {
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2;
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const length = Math.max(1, Math.hypot(dx, dy));
  const nx = -dy / length;
  const ny = dx / length;
  const control = 18 + Math.min(34, length * 0.045) + bend;
  return `M ${a.x} ${a.y} Q ${mx + nx * control} ${my + ny * control} ${b.x} ${b.y}`;
}

function journeySegmentCommand(a: Hub, b: Hub, offset: number) {
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2;
  return `Q ${mx} ${my + offset} ${b.x} ${b.y}`;
}

function journeySegmentPath(a: Hub, b: Hub, offset: number) {
  return `M ${a.x} ${a.y} ${journeySegmentCommand(a, b, offset)}`;
}

function journeyPath(
  ids: readonly string[],
  offset: number,
  hubById: Record<string, Hub>,
) {
  return ids.reduce((path, id, index) => {
    const hub = hubById[id];
    if (index === 0) return `M ${hub.x} ${hub.y}`;
    const previous = hubById[ids[index - 1]];
    return `${path} ${journeySegmentCommand(previous, hub, offset)}`;
  }, "");
}

function satellitePoint(
  hub: Hub,
  index: number,
  radiusScale: number,
  canvasWidth: number,
  canvasHeight: number,
) {
  const outwardAngle = Math.atan2(
    hub.y - canvasHeight / 2,
    hub.x - canvasWidth / 2,
  );
  const angle = outwardAngle + (index - 1.5) * 0.78;
  const radius = (78 + (index % 2) * 34) * radiusScale;
  return {
    x: hub.x + Math.cos(angle) * radius,
    y: hub.y + Math.sin(angle) * radius,
  };
}

function squaredDistance(a: Point, b: Point) {
  return (a.x - b.x) ** 2 + (a.y - b.y) ** 2;
}

function proximityProgress(distance: number, radius: number) {
  const linear = Math.max(0, Math.min(1, 1 - distance / Math.max(1, radius)));
  return linear * linear * (3 - 2 * linear);
}

export default function HeroSurfaceShift() {
  const svgRef = useRef<SVGSVGElement>(null);
  const lensRef = useRef<SVGCircleElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const focusFrameRef = useRef<number | null>(null);
  const autoTravelFrameRef = useRef<number | null>(null);
  const autoResumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const foregroundExitTimerRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );
  const foregroundSvgRef = useRef<SVGSVGElement>(null);
  const foregroundProgressRef = useRef(INITIAL_AUTO_HUB_ID ? 1 : 0);
  const renderedForegroundHubRef = useRef<string | null>(INITIAL_AUTO_HUB_ID);
  const pointerApproachHubRef = useRef<string | null>(null);
  const pointerProximityRef = useRef(0);
  const autoJourneyPathRef = useRef<SVGPathElement>(null);
  const autoSignalRef = useRef<HTMLDivElement>(null);
  const autoSignalAnimationRef = useRef<Animation | null>(null);
  const autoVisualFrameTimeRef = useRef(0);
  const autoVisualRef = useRef<{ full: string | null; soft: string | null }>({
    full: INITIAL_AUTO_HUB_ID,
    soft: INITIAL_AUTO_HUB_ID,
  });
  const autoContextHubRef = useRef<HubId | null>(INITIAL_AUTO_HUB_ID);
  const pendingFocusRef = useRef<Point | null>(null);
  const smoothedFocusRef = useRef<Point | null>(null);
  const activeHubRef = useRef<string | null>(null);
  const activeTargetRef = useRef<string | null>(null);
  const [layoutName, setLayoutName] = useState<GraphLayoutName>("desktop");
  const [shortViewport, setShortViewport] = useState(false);
  const [activeHubId, setActiveHubId] = useState<string | null>(null);
  const [activeCapability, setActiveCapability] = useState<{
    hubId: string;
    index: number;
  } | null>(null);
  const [activeSatellite, setActiveSatellite] = useState<number | null>(null);
  const [cardState, setCardState] = useState<CardState>(null);
  const [cardPosition, setCardPosition] = useState({ left: 0, top: 0 });
  const [autoJourneyIndex, setAutoJourneyIndex] = useState(0);
  const [autoPhase, setAutoPhase] = useState<
    "waiting" | "traveling" | "ending"
  >("waiting");
  const [autoFocusHubId, setAutoFocusHubId] = useState<string | null>(
    INITIAL_AUTO_HUB_ID,
  );
  const [autoApproachHubId, setAutoApproachHubId] = useState<string | null>(
    INITIAL_AUTO_HUB_ID,
  );
  const [autoContextHubId, setAutoContextHubId] = useState<HubId | null>(
    INITIAL_AUTO_HUB_ID,
  );
  const [autoInteractionPaused, setAutoInteractionPaused] = useState(false);
  const [pointerApproachHubId, setPointerApproachHubId] = useState<
    string | null
  >(null);
  const [renderedForegroundHubId, setRenderedForegroundHubId] = useState<
    string | null
  >(INITIAL_AUTO_HUB_ID);
  useEffect(() => {
    let frame = 0;
    const updateLayout = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        setLayoutName(resolveGraphLayout(width, height));
        setShortViewport(width >= 900 && height < 720);
      });
    };
    updateLayout();
    window.addEventListener("resize", updateLayout, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", updateLayout);
    };
  }, []);

  const graphLayout = GRAPH_LAYOUTS[layoutName];
  const autoJourney = JOURNEYS[autoJourneyIndex];
  const autoJourneyVisible =
    !activeHubId && !cardState && !autoInteractionPaused;
  const focusRadius =
    layoutName === "ultrawide"
      ? 430
      : layoutName === "wide"
        ? 350
        : layoutName === "desktop"
          ? 280
          : layoutName === "tablet"
            ? 220
            : 180;
  const nodeScale =
    layoutName === "ultrawide"
      ? 3
      : layoutName === "wide"
        ? 2.8
        : layoutName === "desktop"
          ? 2.2
          : layoutName === "tablet"
            ? 2.35
            : 2.6;
  const verticalScale = shortViewport ? 0.82 : 1;
  const graphHeight = Math.round(graphLayout.height * verticalScale);
  const layoutHubs = useMemo<Hub[]>(
    () =>
      HUBS.map((hub) => {
        const position = graphLayout.positions[hub.id];
        return { ...hub, x: position.x, y: position.y * verticalScale };
      }),
    [graphLayout, verticalScale],
  );
  const hubById = useMemo(
    () =>
      Object.fromEntries(layoutHubs.map((hub) => [hub.id, hub])) as Record<
        string,
        Hub
      >,
    [layoutHubs],
  );

  const capabilityNodes = useMemo<CapabilityNode[]>(() => {
    const heroExclusion =
      layoutName === "desktop" ||
      layoutName === "wide" ||
      layoutName === "ultrawide"
        ? {
            left: graphLayout.width * 0.28,
            right: graphLayout.width * 0.72,
            top: graphHeight * 0.18,
            bottom: graphHeight * 0.76,
          }
        : null;

    return layoutHubs.flatMap((hub, hubIndex) => {
      const capabilities = (CAPABILITIES[hub.id] ?? []).slice(
        0,
        graphLayout.capabilityLimit,
      );
      return capabilities.map((capability, index) => {
        const denominator = Math.max(1, capabilities.length - 1);
        const angle =
          -2.55 + (index / denominator) * 5.1 + ((hubIndex % 3) - 1) * 0.12;
        const radius =
          (48 + ((index * 23 + hubIndex * 11) % 78)) *
          graphLayout.capabilityRadius;
        let x = hub.x + Math.cos(angle) * radius;
        let y = hub.y + Math.sin(angle) * radius;

        if (
          heroExclusion &&
          x > heroExclusion.left &&
          x < heroExclusion.right &&
          y > heroExclusion.top &&
          y < heroExclusion.bottom
        ) {
          const margin = 22 + (index % 3) * 8;
          if (hub.y <= heroExclusion.top) {
            y = heroExclusion.top - margin;
          } else if (hub.y >= heroExclusion.bottom) {
            y = heroExclusion.bottom + margin;
          } else if (hub.x < graphLayout.width / 2) {
            x = heroExclusion.left - margin;
          } else {
            x = heroExclusion.right + margin;
          }
        }
        return { hubId: hub.id, index, x, y, capability };
      });
    });
  }, [graphHeight, graphLayout, layoutHubs, layoutName]);
  const setAutoSignalPosition = useCallback((point: Point) => {
    const marker = autoSignalRef.current;
    const root = rootRef.current;
    const matrix = svgRef.current?.getScreenCTM();
    if (!marker || !root || !matrix) return;

    const bounds = root.getBoundingClientRect();
    const screenPoint = new DOMPoint(point.x, point.y).matrixTransform(matrix);
    const x = screenPoint.x - bounds.left;
    const y = screenPoint.y - bounds.top;

    marker.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    marker.style.opacity = "1";
  }, []);
  const setForegroundProgress = useCallback((value: number) => {
    const clamped = Math.max(0, Math.min(1, value));
    foregroundProgressRef.current = clamped;
    foregroundSvgRef.current?.style.setProperty(
      "--kg-expand",
      clamped.toFixed(3),
    );
  }, []);

  const setSupportProgress = useCallback((value: number) => {
    const clamped = Math.max(0, Math.min(1, value));
    svgRef.current?.style.setProperty("--kg-support", clamped.toFixed(3));
  }, []);

  const holdAutoJourney = useCallback((delay = 3200) => {
    if (autoResumeTimerRef.current) {
      clearTimeout(autoResumeTimerRef.current);
    }
    setAutoInteractionPaused(true);
    autoResumeTimerRef.current = setTimeout(() => {
      autoResumeTimerRef.current = null;
      pointerApproachHubRef.current = null;
      pointerProximityRef.current = 0;
      setPointerApproachHubId(null);
      setAutoInteractionPaused(false);
    }, delay);
  }, []);

  useEffect(
    () => () => {
      if (autoResumeTimerRef.current) {
        clearTimeout(autoResumeTimerRef.current);
        autoResumeTimerRef.current = null;
      }
    },
    [],
  );

  useEffect(() => {
    if (!autoJourneyVisible) {
      if (autoTravelFrameRef.current !== null) {
        cancelAnimationFrame(autoTravelFrameRef.current);
        autoTravelFrameRef.current = null;
      }
      autoVisualRef.current = { full: null, soft: null };
      autoContextHubRef.current = null;
      setAutoFocusHubId(null);
      setAutoApproachHubId(null);
      setAutoContextHubId(null);
      setForegroundProgress(0);
      setSupportProgress(0);
      if (autoPhase !== "waiting") setAutoPhase("waiting");
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (autoPhase === "traveling") return;

    if (autoPhase === "ending") {
      const endingTimer = window.setTimeout(() => {
        setAutoJourneyIndex((index) => (index + 1) % JOURNEYS.length);
        autoVisualRef.current = { full: null, soft: null };
        autoContextHubRef.current = null;
        setAutoFocusHubId(null);
        setAutoApproachHubId(null);
        setAutoContextHubId(null);
        setForegroundProgress(0);
        setSupportProgress(0);
        setAutoPhase("waiting");
      }, 2200);
      return () => window.clearTimeout(endingTimer);
    }

    const firstHubId = autoJourney.nodes[0];
    if (autoVisualRef.current.full !== firstHubId) {
      autoVisualRef.current = { full: firstHubId, soft: firstHubId };
      autoContextHubRef.current = firstHubId;
      setAutoFocusHubId(firstHubId);
      setAutoApproachHubId(firstHubId);
      setAutoContextHubId(firstHubId);
      setForegroundProgress(1);
      setSupportProgress(1);
    }

    const departureTimer = window.setTimeout(() => {
      setAutoPhase("traveling");
    }, 1800);
    return () => window.clearTimeout(departureTimer);
  }, [
    autoJourney,
    autoJourneyVisible,
    autoPhase,
    setForegroundProgress,
    setSupportProgress,
  ]);

  useEffect(() => {
    if (!autoJourneyVisible || autoPhase === "traveling") return;

    const hubId =
      autoPhase === "ending"
        ? autoJourney.nodes[autoJourney.nodes.length - 1]
        : autoJourney.nodes[0];
    autoSignalAnimationRef.current?.cancel();
    autoSignalAnimationRef.current = null;
    setAutoSignalPosition(hubById[hubId]);
  }, [
    autoJourney,
    autoJourneyVisible,
    autoPhase,
    hubById,
    setAutoSignalPosition,
  ]);

  useEffect(() => {
    if (!autoJourneyVisible || autoPhase !== "traveling") return;

    const marker = autoSignalRef.current;
    const root = rootRef.current;
    const matrix = svgRef.current?.getScreenCTM();
    if (!marker || !root || !matrix) return;

    const activationRadius = Math.max(150, focusRadius * 0.64);
    const journeyOffset =
      (autoJourneyIndex % 2 === 0 ? -22 : 22) * verticalScale;
    const segmentDuration = 5400;
    const arrivalHoldDuration = 1100;
    const bounds = root.getBoundingClientRect();
    let cancelled = false;
    let arrivalTimer: number | null = null;
    let arrivalHoldResolve: (() => void) | null = null;
    let activeSegmentResolve: (() => void) | null = null;

    const activateNode = (hubId: HubId, full: boolean) => {
      autoContextHubRef.current = hubId;
      autoVisualRef.current = {
        full: full ? hubId : null,
        soft: hubId,
      };
      setAutoContextHubId(hubId);
      setAutoFocusHubId(full ? hubId : null);
      setAutoApproachHubId(hubId);
      if (full) {
        setForegroundProgress(1);
        setSupportProgress(1);
      }
    };

    const holdAtNode = () =>
      new Promise<void>((resolve) => {
        arrivalHoldResolve = resolve;
        arrivalTimer = window.setTimeout(() => {
          arrivalTimer = null;
          arrivalHoldResolve = null;
          resolve();
        }, arrivalHoldDuration);
      });

    const animateSegment = (fromId: HubId, toId: HubId) =>
      new Promise<void>((resolve) => {
        activeSegmentResolve = resolve;
        const from = hubById[fromId];
        const to = hubById[toId];
        const segmentPath = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "path",
        );
        segmentPath.setAttribute(
          "d",
          journeySegmentPath(from, to, journeyOffset),
        );
        const length = segmentPath.getTotalLength();
        const sampleCount = Math.min(120, Math.max(36, Math.ceil(length / 5)));
        const keyframes: Keyframe[] = [];

        for (let index = 0; index < sampleCount; index += 1) {
          const offset = index / (sampleCount - 1);
          const point = segmentPath.getPointAtLength(length * offset);
          const screenPoint = new DOMPoint(point.x, point.y).matrixTransform(
            matrix,
          );
          keyframes.push({
            offset,
            transform: `translate3d(${screenPoint.x - bounds.left}px, ${screenPoint.y - bounds.top}px, 0)`,
          });
        }

        activateNode(fromId, true);
        autoSignalAnimationRef.current?.cancel();
        const markerAnimation = marker.animate(keyframes, {
          duration: segmentDuration,
          easing: "linear",
          fill: "forwards",
        });
        autoSignalAnimationRef.current = markerAnimation;
        autoVisualFrameTimeRef.current = 0;
        marker.style.opacity = "1";
        const startedAt = performance.now();

        const finishSegment = () => {
          if (activeSegmentResolve !== resolve) return;
          activeSegmentResolve = null;
          autoTravelFrameRef.current = null;
          markerAnimation.finish();
          markerAnimation.commitStyles?.();
          markerAnimation.cancel();
          if (autoSignalAnimationRef.current === markerAnimation) {
            autoSignalAnimationRef.current = null;
          }
          setAutoSignalPosition(to);
          activateNode(toId, true);
          resolve();
        };

        const updateVisuals = (now: number) => {
          if (cancelled) return;
          const animationTime = markerAnimation.currentTime;
          const elapsed =
            typeof animationTime === "number"
              ? animationTime
              : Math.max(0, now - startedAt);
          const progress = Math.min(1, elapsed / segmentDuration);

          if (now - autoVisualFrameTimeRef.current >= 34 || progress >= 1) {
            autoVisualFrameTimeRef.current = now;
            const point = segmentPath.getPointAtLength(length * progress);
            const fromDistance = Math.sqrt(squaredDistance(point, from));
            const toDistance = Math.sqrt(squaredDistance(point, to));
            const departureProgress = proximityProgress(
              fromDistance,
              activationRadius,
            );
            const arrivalProgress = proximityProgress(
              toDistance,
              activationRadius,
            );
            const useDestination = arrivalProgress > departureProgress;
            const visualHubId = useDestination ? toId : fromId;
            const nodeProgress = useDestination
              ? arrivalProgress
              : departureProgress;
            const supportDistance = useDestination ? toDistance : fromDistance;
            const supportProgress =
              0.32 +
              proximityProgress(supportDistance, activationRadius * 1.4) * 0.68;

            activateNode(visualHubId, false);
            setForegroundProgress(nodeProgress);
            setSupportProgress(supportProgress);
          }

          if (progress >= 1) {
            finishSegment();
            return;
          }

          autoTravelFrameRef.current = requestAnimationFrame(updateVisuals);
        };

        autoTravelFrameRef.current = requestAnimationFrame(updateVisuals);
      });

    const runJourney = async () => {
      const nodes = autoJourney.nodes;
      if (nodes.length === 0) {
        if (!cancelled) setAutoPhase("ending");
        return;
      }
      if (nodes.length === 1) {
        setAutoSignalPosition(hubById[nodes[0]]);
        activateNode(nodes[0], true);
        if (!cancelled) setAutoPhase("ending");
        return;
      }

      for (let index = 0; index < nodes.length - 1; index += 1) {
        if (cancelled) return;
        await animateSegment(nodes[index], nodes[index + 1]);
        if (cancelled) return;

        if (index < nodes.length - 2) {
          await holdAtNode();
          if (cancelled) return;
        }
      }

      if (!cancelled) setAutoPhase("ending");
    };

    void runJourney();

    return () => {
      cancelled = true;
      if (autoTravelFrameRef.current !== null) {
        cancelAnimationFrame(autoTravelFrameRef.current);
        autoTravelFrameRef.current = null;
      }
      if (arrivalTimer !== null) {
        window.clearTimeout(arrivalTimer);
        arrivalTimer = null;
      }
      arrivalHoldResolve?.();
      arrivalHoldResolve = null;
      activeSegmentResolve?.();
      activeSegmentResolve = null;
      autoSignalAnimationRef.current?.cancel();
      autoSignalAnimationRef.current = null;
    };
  }, [
    autoJourney,
    autoJourneyIndex,
    autoJourneyVisible,
    autoPhase,
    focusRadius,
    hubById,
    setAutoSignalPosition,
    setForegroundProgress,
    setSupportProgress,
    verticalScale,
  ]);
  const cancelClose = useCallback(() => {
    if (!closeTimerRef.current) return;
    clearTimeout(closeTimerRef.current);
    closeTimerRef.current = null;
  }, []);

  const clearSelection = useCallback(() => {
    cancelClose();
    activeHubRef.current = null;
    activeTargetRef.current = null;
    setActiveHubId(null);
    setActiveCapability(null);
    setActiveSatellite(null);
    setCardState(null);
    if (!autoContextHubRef.current) {
      setForegroundProgress(pointerProximityRef.current);
    }
  }, [cancelClose, setForegroundProgress]);

  const scheduleClose = useCallback(() => {
    if (closeTimerRef.current) return;
    closeTimerRef.current = setTimeout(clearSelection, 420);
  }, [clearSelection]);

  const positionCard = useCallback((element: Element) => {
    const hero = svgRef.current?.parentElement;
    if (!hero) return;

    const anchor = element.getBoundingClientRect();
    const bounds = hero.getBoundingClientRect();
    let left = anchor.left - bounds.left + 24;
    let top = anchor.top - bounds.top - 24;

    if (left + 228 > bounds.width) left = anchor.left - bounds.left - 238;
    if (top + 170 > bounds.height) top = anchor.top - bounds.top - 148;
    if (left < 10) left = 10;
    if (top < 10) top = 10;

    setCardPosition({ left, top });
  }, []);

  const selectHub = useCallback(
    (hubId: string, element: Element) => {
      cancelClose();
      const targetKey = `hub:${hubId}`;
      if (activeTargetRef.current === targetKey) return;
      activeHubRef.current = hubId;
      activeTargetRef.current = targetKey;
      setActiveHubId(hubId);
      setActiveCapability(null);
      setActiveSatellite(null);
      setCardState({ kind: "hub", hubId });
      setForegroundProgress(1);
      positionCard(element);
    },
    [cancelClose, positionCard, setForegroundProgress],
  );

  const selectCapability = useCallback(
    (node: CapabilityNode, element: Element) => {
      cancelClose();
      const targetKey = `cap:${node.hubId}:${node.index}`;
      if (activeTargetRef.current === targetKey) return;
      activeHubRef.current = node.hubId;
      activeTargetRef.current = targetKey;
      setActiveHubId(node.hubId);
      setActiveCapability({ hubId: node.hubId, index: node.index });
      setActiveSatellite(null);
      setCardState({
        kind: "capability",
        hubId: node.hubId,
        index: node.index,
      });
      setForegroundProgress(1);
      positionCard(element);
    },
    [cancelClose, positionCard, setForegroundProgress],
  );

  const clearFocus = useCallback(() => {
    if (focusFrameRef.current !== null) {
      cancelAnimationFrame(focusFrameRef.current);
      focusFrameRef.current = null;
    }
    pendingFocusRef.current = null;
    smoothedFocusRef.current = null;
    const svg = svgRef.current;
    svg?.classList.remove("hero-kg-context");
    lensRef.current?.classList.remove("hero-kg-visible");
    svg
      ?.querySelectorAll<SVGElement>(
        ".hero-kg-capability, .hero-kg-capability-edge, .hero-kg-hub, .hero-kg-focus-edge",
      )
      .forEach((element) => {
        element.classList.remove("hero-kg-near");
        element.style.removeProperty("--kg-spot");
      });
    pointerApproachHubRef.current = null;
    pointerProximityRef.current = 0;
    setPointerApproachHubId(null);
    if (!activeHubRef.current && !autoContextHubRef.current) {
      setForegroundProgress(0);
    }
  }, [setForegroundProgress]);
  useEffect(() => {
    clearFocus();
    clearSelection();
  }, [clearFocus, clearSelection, layoutName, shortViewport]);

  const handlePointerMove = useCallback(
    (event: React.PointerEvent<SVGSVGElement>) => {
      holdAutoJourney();
      const svg = svgRef.current;
      const matrix = svg?.getScreenCTM();
      if (!svg || !matrix) return;

      pendingFocusRef.current = new DOMPoint(
        event.clientX,
        event.clientY,
      ).matrixTransform(matrix.inverse());
      if (focusFrameRef.current !== null) return;

      focusFrameRef.current = requestAnimationFrame(() => {
        focusFrameRef.current = null;
        const point = pendingFocusRef.current;
        const currentSvg = svgRef.current;
        const currentMatrix = currentSvg?.getScreenCTM();
        if (!point || !currentSvg || !currentMatrix) return;

        currentSvg.classList.add("hero-kg-context");
        const previousFocus = smoothedFocusRef.current;
        const smoothPoint = previousFocus
          ? {
              x: previousFocus.x + (point.x - previousFocus.x) * 0.42,
              y: previousFocus.y + (point.y - previousFocus.y) * 0.42,
            }
          : point;
        smoothedFocusRef.current = smoothPoint;

        const lens = lensRef.current;
        if (lens) {
          lens.setAttribute("cx", String(smoothPoint.x));
          lens.setAttribute("cy", String(smoothPoint.y));
          lens.classList.add("hero-kg-visible");
        }

        const scale = Math.max(
          0.01,
          Math.hypot(currentMatrix.a, currentMatrix.b),
        );

        let nearestPointerHubId: string | null = null;
        let nearestPointerHubDistance = Number.POSITIVE_INFINITY;

        currentSvg
          .querySelectorAll<SVGGElement>(".hero-kg-capability")
          .forEach((element) => {
            const x = Number(element.dataset.x);
            const y = Number(element.dataset.y);
            const distance = Math.sqrt(squaredDistance({ x, y }, smoothPoint));
            const spot = proximityProgress(distance, focusRadius);
            element.style.setProperty("--kg-spot", spot.toFixed(3));
            element.classList.toggle("hero-kg-near", spot > 0.025);
          });

        currentSvg
          .querySelectorAll<SVGLineElement>(".hero-kg-capability-edge")
          .forEach((element) => {
            const x = Number(element.dataset.x);
            const y = Number(element.dataset.y);
            const hub = element.dataset.hub
              ? hubById[element.dataset.hub]
              : null;
            const endpointDistance = Math.sqrt(
              squaredDistance({ x, y }, smoothPoint),
            );
            const endpointSpot = proximityProgress(
              endpointDistance,
              focusRadius,
            );
            const hubSpot = hub
              ? proximityProgress(
                  Math.sqrt(squaredDistance(hub, smoothPoint)),
                  focusRadius * 0.86,
                )
              : 0;
            const spot = Math.max(endpointSpot * 0.72, hubSpot);
            element.style.setProperty("--kg-spot", spot.toFixed(3));
          });

        currentSvg
          .querySelectorAll<SVGGElement>(".hero-kg-hub")
          .forEach((element) => {
            const x = Number(element.dataset.x);
            const y = Number(element.dataset.y);
            const distance = Math.sqrt(squaredDistance({ x, y }, smoothPoint));
            const spot = proximityProgress(distance, focusRadius * 0.86);
            element.style.setProperty("--kg-spot", spot.toFixed(3));
            element.classList.toggle("hero-kg-near", spot > 0.025);
            if (distance < nearestPointerHubDistance) {
              nearestPointerHubDistance = distance;
              nearestPointerHubId = element.dataset.hub ?? null;
            }
          });

        const pointerActivationRadius = focusRadius * 0.52;
        const pointerProgress = proximityProgress(
          nearestPointerHubDistance,
          pointerActivationRadius,
        );
        pointerProximityRef.current = pointerProgress;

        if (nearestPointerHubId && pointerProgress > 0.02) {
          if (pointerApproachHubRef.current !== nearestPointerHubId) {
            pointerApproachHubRef.current = nearestPointerHubId;
            setPointerApproachHubId(nearestPointerHubId);
          }
        } else if (pointerApproachHubRef.current) {
          pointerApproachHubRef.current = null;
          setPointerApproachHubId(null);
        }

        setForegroundProgress(activeHubRef.current ? 1 : pointerProgress);

        currentSvg
          .querySelectorAll<SVGPathElement>(".hero-kg-focus-edge")
          .forEach((element) => {
            const x = Number(element.dataset.midX);
            const y = Number(element.dataset.midY);
            const distance = Math.sqrt(squaredDistance({ x, y }, smoothPoint));
            const spot = proximityProgress(distance, focusRadius * 1.02);
            element.style.setProperty("--kg-spot", spot.toFixed(3));
            element.classList.toggle("hero-kg-near", spot > 0.025);
          });

        type HoverTarget =
          | {
              kind: "capability";
              key: string;
              distance: number;
              node: CapabilityNode;
              element: Element;
            }
          | {
              kind: "hub";
              key: string;
              distance: number;
              hubId: string;
              element: Element;
            }
          | {
              kind: "satellite";
              key: string;
              distance: number;
              index: number;
            };

        let nearest: HoverTarget | null = null;
        const consider = (candidate: HoverTarget) => {
          if (!nearest || candidate.distance < nearest.distance) {
            nearest = candidate;
          }
        };

        const currentTarget = activeTargetRef.current;
        if (currentTarget) {
          const [kind, hubId, indexValue] = currentTarget.split(":");
          let keepDistance = Number.POSITIVE_INFINITY;
          let keepRadius = 0;

          if (kind === "hub") {
            const hub = hubById[hubId];
            if (hub) {
              keepDistance = Math.sqrt(squaredDistance(hub, point)) * scale;
              keepRadius = 30;
            }
          } else if (kind === "cap") {
            const index = Number(indexValue);
            const node = capabilityNodes.find(
              (candidate) =>
                candidate.hubId === hubId && candidate.index === index,
            );
            if (node) {
              keepDistance = Math.sqrt(squaredDistance(node, point)) * scale;
              keepRadius = 25;
            }
          } else if (kind === "sat") {
            const hub = hubById[hubId];
            const index = Number(indexValue);
            if (hub?.satellites[index]) {
              const satellite = satellitePoint(
                hub,
                index,
                graphLayout.satelliteRadius,
                graphLayout.width,
                graphHeight,
              );
              keepDistance =
                Math.sqrt(squaredDistance(satellite, point)) * scale;
              keepRadius = 25;
            }
          }

          if (keepDistance <= keepRadius) {
            cancelClose();
            return;
          }
        }

        let withinActiveNeighborhood = false;
        const activeId = activeHubRef.current;
        if (activeId) {
          const hub = hubById[activeId];
          let farthestChildDistance = 0;

          hub.satellites.forEach((_, index) => {
            const satellite = satellitePoint(
              hub,
              index,
              graphLayout.satelliteRadius,
              graphLayout.width,
              graphHeight,
            );
            farthestChildDistance = Math.max(
              farthestChildDistance,
              Math.sqrt(squaredDistance(satellite, hub)),
            );
            const distance =
              Math.sqrt(squaredDistance(satellite, point)) * scale;
            if (distance <= 20) {
              consider({
                kind: "satellite",
                key: `sat:${activeId}:${index}`,
                distance,
                index,
              });
            }
          });

          capabilityNodes
            .filter((node) => node.hubId === activeId)
            .forEach((node) => {
              farthestChildDistance = Math.max(
                farthestChildDistance,
                Math.sqrt(squaredDistance(node, hub)),
              );
              const distance = Math.sqrt(squaredDistance(node, point)) * scale;
              if (distance > 21) return;
              const element = currentSvg.querySelector(
                `[data-capability="${node.hubId}:${node.index}"]`,
              );
              if (!element) return;
              consider({
                kind: "capability",
                key: `cap:${node.hubId}:${node.index}`,
                distance,
                node,
                element,
              });
            });

          const pointerDistance =
            Math.sqrt(squaredDistance(hub, point)) * scale;
          const neighborhoodRadius = farthestChildDistance * scale + 36;
          withinActiveNeighborhood = pointerDistance <= neighborhoodRadius;
        }

        layoutHubs.forEach((hub) => {
          const distance = Math.sqrt(squaredDistance(hub, point)) * scale;
          if (distance > 21) return;
          const element = currentSvg.querySelector(`[data-hub="${hub.id}"]`);
          if (!element) return;
          consider({
            kind: "hub",
            key: `hub:${hub.id}`,
            distance,
            hubId: hub.id,
            element,
          });
        });
        const target = nearest as HoverTarget | null;
        if (!target) {
          if (withinActiveNeighborhood) {
            cancelClose();
            return;
          }
          if (activeTargetRef.current) {
            activeTargetRef.current = null;
            setActiveSatellite(null);
            scheduleClose();
          }
          return;
        }

        cancelClose();
        if (target.key === activeTargetRef.current) return;

        if (target.kind === "capability") {
          selectCapability(target.node, target.element);
          return;
        }

        if (target.kind === "hub") {
          selectHub(target.hubId, target.element);
          return;
        }
        activeTargetRef.current = target.key;
        setActiveCapability(null);
        setActiveSatellite(target.index);
      });
    },
    [
      capabilityNodes,
      cancelClose,
      focusRadius,
      graphHeight,
      graphLayout.satelliteRadius,
      graphLayout.width,
      holdAutoJourney,
      hubById,
      layoutHubs,
      scheduleClose,
      selectCapability,
      selectHub,
      setForegroundProgress,
    ],
  );
  const activeHub = activeHubId ? hubById[activeHubId] : null;
  const autoHoverHub =
    autoJourneyVisible && autoFocusHubId ? hubById[autoFocusHubId] : null;
  const desiredForegroundHubId =
    activeHub?.id ??
    pointerApproachHubId ??
    autoHoverHub?.id ??
    (autoJourneyVisible ? autoApproachHubId : null) ??
    null;

  useEffect(() => {
    if (foregroundExitTimerRef.current) {
      clearTimeout(foregroundExitTimerRef.current);
      foregroundExitTimerRef.current = null;
    }

    if (desiredForegroundHubId) {
      renderedForegroundHubRef.current = desiredForegroundHubId;
      setRenderedForegroundHubId(desiredForegroundHubId);
      return;
    }

    if (renderedForegroundHubRef.current) {
      setForegroundProgress(0);
      foregroundExitTimerRef.current = setTimeout(() => {
        renderedForegroundHubRef.current = null;
        setRenderedForegroundHubId(null);
        foregroundExitTimerRef.current = null;
      }, 520);
    }

    return () => {
      if (foregroundExitTimerRef.current) {
        clearTimeout(foregroundExitTimerRef.current);
        foregroundExitTimerRef.current = null;
      }
    };
  }, [desiredForegroundHubId, setForegroundProgress]);

  useEffect(() => {
    foregroundSvgRef.current?.style.setProperty(
      "--kg-expand",
      foregroundProgressRef.current.toFixed(3),
    );
  }, [renderedForegroundHubId]);

  const foregroundHub = renderedForegroundHubId
    ? hubById[renderedForegroundHubId]
    : null;
  const autoSupportHubIds: readonly HubId[] =
    autoJourneyVisible && autoContextHubId
      ? (autoJourney.supportByNode?.[autoContextHubId] ?? [])
      : [];
  const autoSupportAnchor =
    autoJourneyVisible && autoContextHubId ? hubById[autoContextHubId] : null;
  const cardContent = useMemo(() => {
    if (!cardState) return null;
    const hub = hubById[cardState.hubId];
    if (cardState.kind === "hub") {
      return { title: hub.label, metrics: hub.metrics, description: null };
    }

    const capability = CAPABILITIES[cardState.hubId]?.[cardState.index];
    if (!capability) return null;
    const showSignal = !INTERNAL_MATURITY.has(capability[1]);
    return {
      title: capability[0],
      metrics: showSignal ? [["Signal", capability[1], 0] as Metric] : [],
      description: capability[2],
    };
  }, [cardState, hubById]);

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <svg
        ref={svgRef}
        data-layout={layoutName}
        data-short={shortViewport || undefined}
        viewBox={`0 0 ${graphLayout.width} ${graphHeight}`}
        preserveAspectRatio="xMidYMid meet"
        className={`pointer-events-none absolute inset-0 h-full w-full ${autoJourneyVisible ? "hero-kg-auto-running" : ""}`}
        onPointerMove={handlePointerMove}
        onPointerLeave={() => {
          holdAutoJourney();
          clearFocus();
          scheduleClose();
        }}
      >
        <rect
          className="pointer-events-auto"
          x="0"
          y="0"
          width={graphLayout.width}
          height={graphHeight}
          fill="transparent"
        />

        <g className="hero-kg-main-edges" fill="none">
          {LINKS.map(([aId, bId], index) => {
            const a = hubById[aId];
            const b = hubById[bId];
            const midpoint = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
            const connected = activeHubId === aId || activeHubId === bId;
            return (
              <path
                key={`${aId}-${bId}`}
                data-mid-x={midpoint.x}
                data-mid-y={midpoint.y}
                d={curve(a, b, ((index % 3) - 1) * 6)}
                className={`hero-kg-focus-edge ${connected ? "hero-kg-connected" : ""}`}
              />
            );
          })}
          {WEAK_LINKS.map(([aId, bId], index) => {
            const a = hubById[aId];
            const b = hubById[bId];
            const connected = activeHubId === aId || activeHubId === bId;
            return (
              <path
                key={`weak-${aId}-${bId}`}
                d={curve(a, b, ((index % 3) - 1) * 5)}
                className={`hero-kg-weak ${connected ? "hero-kg-connected" : ""}`}
              />
            );
          })}
        </g>

        <g className="hero-kg-journeys" fill="none">
          <path
            ref={autoJourneyPathRef}
            key={autoJourney.id}
            className={autoJourneyVisible ? "hero-kg-journey-active" : ""}
            d={journeyPath(
              autoJourney.nodes,
              (autoJourneyIndex % 2 === 0 ? -22 : 22) * verticalScale,
              hubById,
            )}
          />
        </g>

        {autoJourneyVisible && autoSupportAnchor ? (
          <g className="hero-kg-support-edges" fill="none">
            {autoSupportHubIds.map((supportId, index) => (
              <path
                key={`auto-support-${autoSupportAnchor.id}-${supportId}`}
                d={curve(
                  hubById[supportId],
                  autoSupportAnchor,
                  ((index % 3) - 1) * 5,
                )}
              />
            ))}
          </g>
        ) : null}

        <g className="hero-kg-capability-edges">
          {capabilityNodes.map((node) => {
            const hub = hubById[node.hubId];
            const shadowed = foregroundHub?.id === node.hubId;
            return (
              <line
                key={`${node.hubId}-${node.index}`}
                x1={hub.x}
                y1={hub.y}
                x2={node.x}
                y2={node.y}
                data-hub={node.hubId}
                data-x={node.x}
                data-y={node.y}
                className={`hero-kg-capability-edge ${activeHubId === node.hubId ? "hero-kg-parent-active" : ""} ${shadowed ? "hero-kg-base-shadowed" : ""}`}
              />
            );
          })}
        </g>

        <g className="hero-kg-capabilities">
          {capabilityNodes.map((node) => {
            const parentActive = activeHubId === node.hubId;
            const autoSoftParent =
              autoJourneyVisible && autoApproachHubId === node.hubId;
            const isActive =
              activeCapability?.hubId === node.hubId &&
              activeCapability.index === node.index;
            const labelOnLeft = node.x > graphLayout.width * 0.82;
            const shadowed = foregroundHub?.id === node.hubId;

            return (
              <g
                key={`${node.hubId}-${node.index}`}
                data-capability={`${node.hubId}:${node.index}`}
                data-x={node.x}
                data-y={node.y}
                transform={`translate(${node.x} ${node.y})`}
                className={`hero-kg-capability ${parentActive ? "hero-kg-parent-active" : ""} ${autoSoftParent ? "hero-kg-auto-soft-parent" : ""} ${isActive ? "hero-kg-active" : ""} ${shadowed ? "hero-kg-base-shadowed" : ""}`}
              >
                <circle
                  className="hero-kg-cap-dot"
                  r={(0.72 + (node.index % 3) * 0.14) * nodeScale}
                />
                <text
                  className="hero-kg-cap-label"
                  x={labelOnLeft ? -4.2 : 4.2}
                  y={-3.8}
                  textAnchor={labelOnLeft ? "end" : "start"}
                >
                  {node.capability[0]}
                </text>
              </g>
            );
          })}
        </g>

        <g className="hero-kg-hubs">
          {layoutHubs.map((hub) => {
            const selected = activeHubId === hub.id;
            const autoSoft = autoJourneyVisible && autoApproachHubId === hub.id;
            const autoRoute =
              autoJourneyVisible && autoJourney.nodes.includes(hub.id as HubId);
            const autoSupport =
              autoJourneyVisible && autoSupportHubIds.includes(hub.id as HubId);
            const autoMuted = autoJourneyVisible && !autoRoute && !autoSupport;
            const shadowed = foregroundHub?.id === hub.id;
            const labelBelow = hub.y > graphHeight * 0.58;

            return (
              <g
                key={hub.id}
                data-hub={hub.id}
                data-x={hub.x}
                data-y={hub.y}
                transform={`translate(${hub.x} ${hub.y})`}
                className={`hero-kg-hub ${selected ? "hero-kg-selected" : ""} ${autoSoft ? "hero-kg-auto-soft" : ""} ${autoRoute ? "hero-kg-auto-route" : ""} ${autoSupport ? "hero-kg-auto-support" : ""} ${autoMuted ? "hero-kg-auto-muted" : ""} ${shadowed ? "hero-kg-base-shadowed" : ""}`}
              >
                <circle
                  className="hero-kg-hub-ring"
                  r={(hub.id === "truth" ? 4.8 : 4.2) * nodeScale}
                />
                <circle
                  className="hero-kg-hub-core"
                  r={(hub.id === "truth" ? 1.9 : 1.65) * nodeScale}
                />
                <text
                  className="hero-kg-hub-label"
                  x="7.5"
                  y={labelBelow ? 12 : -6.5}
                >
                  {hub.label}
                </text>
              </g>
            );
          })}
        </g>

        <circle
          ref={lensRef}
          className="hero-kg-lens"
          cx="0"
          cy="0"
          r={focusRadius}
        />
      </svg>

      <div
        className={`hero-kg-center-wash hero-kg-center-wash-${layoutName} absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2`}
      />

      {autoJourneyVisible ? (
        <div
          ref={autoSignalRef}
          className="hero-kg-auto-signal absolute left-0 top-0 z-20 grid place-items-center"
        >
          <User
            aria-hidden="true"
            className="hero-kg-auto-user-icon"
            size={17}
            strokeWidth={2}
          />
        </div>
      ) : null}

      {foregroundHub ? (
        <svg
          ref={foregroundSvgRef}
          aria-hidden="true"
          data-layout={layoutName}
          viewBox={`0 0 ${graphLayout.width} ${graphHeight}`}
          preserveAspectRatio="xMidYMid meet"
          style={
            {
              "--kg-expand": foregroundProgressRef.current,
            } as React.CSSProperties
          }
          className="hero-kg-foreground pointer-events-none absolute inset-0 z-20 h-full w-full"
        >
          <g className="hero-kg-foreground-neighbor-edges" fill="none">
            {LINKS.filter(
              ([aId, bId]) =>
                aId === foregroundHub.id || bId === foregroundHub.id,
            ).map(([aId, bId], index) => {
              const neighborId = aId === foregroundHub.id ? bId : aId;
              return (
                <path
                  key={`foreground-neighbor-${aId}-${bId}`}
                  d={curve(
                    foregroundHub,
                    hubById[neighborId],
                    ((index % 3) - 1) * 6,
                  )}
                  pathLength={1}
                  className="hero-kg-foreground-neighbor-edge"
                />
              );
            })}
            {WEAK_LINKS.filter(
              ([aId, bId]) =>
                aId === foregroundHub.id || bId === foregroundHub.id,
            ).map(([aId, bId], index) => {
              const neighborId = aId === foregroundHub.id ? bId : aId;
              return (
                <path
                  key={`foreground-neighbor-weak-${aId}-${bId}`}
                  d={curve(
                    foregroundHub,
                    hubById[neighborId],
                    ((index % 3) - 1) * 5,
                  )}
                  className="hero-kg-foreground-neighbor-edge hero-kg-foreground-neighbor-edge-weak"
                />
              );
            })}
          </g>

          <g className="hero-kg-capability-edges">
            {capabilityNodes
              .filter((node) => node.hubId === foregroundHub.id)
              .map((node) => (
                <line
                  key={`foreground-edge-${node.hubId}-${node.index}`}
                  x1={foregroundHub.x}
                  y1={foregroundHub.y}
                  x2={node.x}
                  y2={node.y}
                  pathLength={1}
                  className="hero-kg-parent-active hero-kg-foreground-cap-edge"
                />
              ))}
          </g>

          <g className="hero-kg-capabilities">
            {capabilityNodes
              .filter((node) => node.hubId === foregroundHub.id)
              .map((node) => {
                const isActive =
                  activeCapability?.hubId === node.hubId &&
                  activeCapability.index === node.index;
                const labelOnLeft = node.x > graphLayout.width * 0.82;
                return (
                  <g
                    key={`foreground-cap-${node.hubId}-${node.index}`}
                    transform={`translate(${node.x} ${node.y})`}
                    className={`hero-kg-capability hero-kg-parent-active hero-kg-foreground-capability ${isActive ? "hero-kg-active" : ""}`}
                  >
                    <circle
                      className="hero-kg-cap-dot"
                      r={(1.75 + (node.index % 3) * 0.22) * nodeScale}
                    />
                    <text
                      className="hero-kg-cap-label"
                      x={labelOnLeft ? -5.2 : 5.2}
                      y={-4.4}
                      textAnchor={labelOnLeft ? "end" : "start"}
                    >
                      {node.capability[0]}
                    </text>
                  </g>
                );
              })}
          </g>

          <g
            transform={`translate(${foregroundHub.x} ${foregroundHub.y})`}
            className="hero-kg-hub hero-kg-selected hero-kg-foreground-hub"
          >
            <circle
              className="hero-kg-hub-ring"
              r={(foregroundHub.id === "truth" ? 4.8 : 4.2) * nodeScale}
            />
            <circle
              className="hero-kg-hub-core"
              r={(foregroundHub.id === "truth" ? 1.9 : 1.65) * nodeScale}
            />
            <text
              className="hero-kg-hub-label"
              x="7.5"
              y={foregroundHub.y > graphHeight * 0.58 ? 12 : -6.5}
            >
              {foregroundHub.label}
            </text>
          </g>

          <g className="hero-kg-expanded hero-kg-expanded-foreground">
            {foregroundHub.satellites.map(([label, value], index) => {
              const { x, y } = satellitePoint(
                foregroundHub,
                index,
                graphLayout.satelliteRadius,
                graphLayout.width,
                graphHeight,
              );
              const active = activeHub ? activeSatellite === index : false;
              const labelOnLeft = x > graphLayout.width * 0.82;
              return (
                <g key={`foreground-sat-${foregroundHub.id}-${label}`}>
                  <line
                    x1={foregroundHub.x}
                    y1={foregroundHub.y}
                    x2={x}
                    y2={y}
                    pathLength={1}
                    className="hero-kg-sat-edge"
                  />
                  <g
                    className={`hero-kg-sat-item ${active ? "hero-kg-active" : ""}`}
                    transform={`translate(${x} ${y})`}
                  >
                    <circle className="hero-kg-sat-dot" r={2.9 * nodeScale} />
                    <text
                      className="hero-kg-sat-label"
                      x={labelOnLeft ? -5.5 * nodeScale : 5.5 * nodeScale}
                      y={-3.6 * nodeScale}
                      textAnchor={labelOnLeft ? "end" : "start"}
                    >
                      {label}
                    </text>
                    <text
                      className="hero-kg-sat-value"
                      x={labelOnLeft ? -5.5 * nodeScale : 5.5 * nodeScale}
                      y={3.2 * nodeScale}
                      textAnchor={labelOnLeft ? "end" : "start"}
                    >
                      {value}
                    </text>
                  </g>
                </g>
              );
            })}
          </g>
        </svg>
      ) : null}

      {cardContent ? (
        <div
          className="hero-kg-card pointer-events-auto absolute z-30 w-[218px] border border-black/20 bg-[#fbfbf8]/97 p-3 font-mono shadow-[0_16px_46px_rgba(17,19,24,0.1)] backdrop-blur-[10px]"
          style={{ left: cardPosition.left, top: cardPosition.top }}
          onPointerEnter={() => {
            holdAutoJourney();
            cancelClose();
          }}
          onPointerLeave={() => {
            holdAutoJourney();
            scheduleClose();
          }}
        >
          <p className="text-[9px] font-bold uppercase tracking-[0.1em] text-[#111318]">
            {cardContent.title}
          </p>
          {cardContent.metrics.length ? (
            <div className="mt-2">
              {cardContent.metrics.map(([label, value, score]) => (
                <div
                  key={`${label}-${value}`}
                  className="grid grid-cols-[1fr_auto] gap-x-2 border-t border-black/10 py-[6px] text-[9px] text-black/62"
                >
                  <span>{label}</span>
                  <strong className="font-bold text-[#111318]">{value}</strong>
                  {score > 0 ? (
                    <span className="col-span-2 mt-1 h-[2px] bg-black/8">
                      <span
                        className="block h-full bg-[#b8441d]"
                        style={{ width: `${Math.min(score, 100)}%` }}
                      />
                    </span>
                  ) : null}
                </div>
              ))}
            </div>
          ) : null}
          {cardContent.description ? (
            <p className="mt-2 border-t border-black/10 pt-2 text-[8px] leading-[1.45] text-black/56">
              {cardContent.description}
            </p>
          ) : null}
        </div>
      ) : null}

      <style>{`
          stroke-dasharray: 2 10;
          stroke-opacity: 0.052;
        }
        .hero-kg-auto-running .hero-kg-main-edges path {
          stroke-opacity: 0.038;
        }
        .hero-kg-auto-running .hero-kg-main-edges path.hero-kg-weak {
          stroke-opacity: 0.018;
        }
        .hero-kg-main-edges path.hero-kg-near {
          stroke-opacity: 0.12;
        }
        .hero-kg-main-edges path.hero-kg-connected {
          stroke: ${ACCENT};
          stroke-opacity: 0.22;
          stroke-width: 0.82;
        }
        .hero-kg-context .hero-kg-main-edges path:not(.hero-kg-near):not(.hero-kg-connected) {
          stroke-opacity: 0.012;
        }
        .hero-kg-journeys path {
          stroke: ${ACCENT};
          stroke-width: 0.75;
          stroke-opacity: 0;
          stroke-linecap: round;
          vector-effect: non-scaling-stroke;
          transition: stroke-opacity 260ms cubic-bezier(.2,.8,.2,1);
        }
        .hero-kg-journeys path.hero-kg-journey-active {
          stroke-width: 1.35;
          stroke-opacity: 0.34;
          stroke-dasharray: none;
          filter: drop-shadow(0 0 3px rgba(184,68,29,.2));
        }
        .hero-kg-auto-signal {
          width: 18px;
          height: 18px;
          margin-left: -9px;
          margin-top: -9px;
          opacity: 0;
          pointer-events: none;
          will-change: transform;
          transform: translate3d(0, 0, 0);
          backface-visibility: hidden;
          contain: layout paint style;
        }
        .hero-kg-auto-user-icon {
          flex: 0 0 auto;
          color: ${ACCENT};
        }
        .hero-kg-support-edges path {
          stroke: ${ACCENT};
          stroke-width: 0.82;
          stroke-opacity: calc(.04 + var(--kg-support, 0) * .34);
          stroke-dasharray: 2 8;
          stroke-linecap: round;
          vector-effect: non-scaling-stroke;
          filter: drop-shadow(0 0 3px rgba(184,68,29,.12));
          transition: stroke-opacity 90ms linear;
        }
        .hero-kg-capability-edges line {
          --kg-spot: 0;
          stroke: ${ACCENT};
          stroke-width: 0.62;
          stroke-opacity: calc(var(--kg-spot, 0) * .24);
          vector-effect: non-scaling-stroke;
          transition: stroke-opacity 90ms linear;
        }
        .hero-kg-capability-edges line.hero-kg-parent-active {
          stroke-opacity: 0.3;
        }
        .hero-kg-capability {
          --kg-spot: 0;
        }
        .hero-kg-cap-dot {
          fill: ${ACCENT};
          opacity: calc(var(--kg-spot, 0) * .4);
          transform: scale(calc(.72 + var(--kg-spot, 0) * .28));
          transform-box: fill-box;
          transform-origin: center;
          transition: opacity 90ms linear, transform 110ms linear, fill 160ms ease;
        }
        .hero-kg-cap-label {
          fill: ${INK};
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
          font-size: 7.2px;
          font-weight: 620;
          letter-spacing: 0.02em;
          opacity: clamp(0, calc((var(--kg-spot, 0) - .48) * 1.85), .72);
          pointer-events: none;
          transition: opacity 100ms linear;
        }
        .hero-kg-capability.hero-kg-active .hero-kg-cap-dot {
          fill: ${ACCENT};
          opacity: 1;
          transform: scale(1.7);
        }
        .hero-kg-capability.hero-kg-active .hero-kg-cap-label {
          opacity: 0.96;
        }
        .hero-kg-hub {
          --kg-spot: 0;
          transition: opacity 180ms ease, filter 220ms ease;
        }
        .hero-kg-hub-ring {
          fill: ${PAPER};
          stroke: ${INK};
          stroke-width: 0.78;
          stroke-opacity: calc(.42 + var(--kg-spot, 0) * .16);
          transform: scale(calc(1 + var(--kg-spot, 0) * .055));
          transform-box: fill-box;
          transform-origin: center;
          vector-effect: non-scaling-stroke;
          transition: stroke 160ms ease, stroke-opacity 100ms linear, transform 110ms linear;
        }
        .hero-kg-hub-core {
          fill: ${INK};
          opacity: calc(.58 + var(--kg-spot, 0) * .18);
          transform: scale(calc(1 + var(--kg-spot, 0) * .1));
          transform-box: fill-box;
          transform-origin: center;
          transition: opacity 100ms linear, transform 110ms linear, fill 160ms ease;
        }
        .hero-kg-hub-label {
          fill: ${INK};
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
          font-size: 8px;
          font-weight: 600;
          letter-spacing: 0.04em;
          opacity: calc(.3 + var(--kg-spot, 0) * .14);
          transition: opacity 100ms linear;
        }
        .hero-kg-hub.hero-kg-auto-muted {
          opacity: 0.42;
        }
        .hero-kg-hub.hero-kg-auto-muted .hero-kg-hub-ring {
          stroke-opacity: 0.3;
          transform: scale(.9);
        }
        .hero-kg-hub.hero-kg-auto-muted .hero-kg-hub-core {
          opacity: 0.44;
          transform: scale(.9);
        }
        .hero-kg-hub.hero-kg-auto-muted .hero-kg-hub-label {
          font-size: 7.4px;
          opacity: 0.2;
        }
        .hero-kg-hub.hero-kg-auto-support {
          opacity: calc(.44 + var(--kg-support, 0) * .5);
          filter: drop-shadow(0 0 calc(2px + var(--kg-support, 0) * 5px) rgba(184,68,29,.14));
        }
        .hero-kg-hub.hero-kg-auto-support .hero-kg-hub-ring {
          stroke: ${ACCENT};
          stroke-opacity: calc(.28 + var(--kg-support, 0) * .5);
          transform: scale(calc(.94 + var(--kg-support, 0) * .1));
        }
        .hero-kg-hub.hero-kg-auto-support .hero-kg-hub-core {
          fill: ${ACCENT};
          opacity: calc(.38 + var(--kg-support, 0) * .5);
          transform: scale(calc(.94 + var(--kg-support, 0) * .18));
        }
        .hero-kg-hub.hero-kg-auto-support .hero-kg-hub-label {
          opacity: calc(.24 + var(--kg-support, 0) * .46);
        }
        .hero-kg-hub.hero-kg-selected {
          filter: drop-shadow(0 4px 7px rgba(17,19,24,0.07));
        }
        .hero-kg-hub.hero-kg-selected .hero-kg-hub-ring {
          stroke: ${ACCENT};
          stroke-opacity: 0.82;
        }
        .hero-kg-hub.hero-kg-selected .hero-kg-hub-core {
          fill: ${ACCENT};
          opacity: 0.9;
        }
        .hero-kg-hub.hero-kg-selected .hero-kg-hub-label {
          opacity: 0.82;
        }
        .hero-kg-sat-dot {
          fill: ${ACCENT};
          transform-box: fill-box;
          transform-origin: center;
        }
        .hero-kg-sat-label {
          fill: ${INK};
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
          font-size: 8.5px;
          font-weight: 650;
        }
        .hero-kg-sat-value {
          fill: ${ACCENT};
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
          font-size: 7.4px;
          font-weight: 750;
        }
        .hero-kg-lens {
          fill: none;
          stroke: ${INK};
          stroke-width: 0.5;
          stroke-opacity: 0;
          stroke-dasharray: 2 10;
          vector-effect: non-scaling-stroke;
          pointer-events: none;
          transition: stroke-opacity 120ms ease;
        }
        .hero-kg-lens.hero-kg-visible {
          stroke-opacity: 0.05;
        }
        .hero-kg-capability.hero-kg-base-shadowed,
        .hero-kg-capability-edges line.hero-kg-base-shadowed {
          opacity: 0 !important;
          stroke-opacity: 0 !important;
        }
        .hero-kg-hub.hero-kg-base-shadowed .hero-kg-hub-label {
          opacity: 0 !important;
        }
        .hero-kg-foreground {
          --kg-expand: 0;
          filter: drop-shadow(0 6px 14px rgba(17,19,24,0.06));
        }
        .hero-kg-foreground .hero-kg-expanded,
        .hero-kg-foreground .hero-kg-sat-item,
        .hero-kg-foreground .hero-kg-sat-dot {
          animation: none;
        }
        .hero-kg-foreground-neighbor-edge {
          stroke: ${INK};
          stroke-width: 0.9;
          stroke-opacity: calc(var(--kg-expand) * .3);
          stroke-dasharray: 1;
          stroke-dashoffset: calc(1 - var(--kg-expand));
          stroke-linecap: round;
          vector-effect: non-scaling-stroke;
          transition: stroke-dashoffset 110ms linear, stroke-opacity 110ms linear;
        }
        .hero-kg-foreground-neighbor-edge-weak {
          stroke-width: 0.72;
          stroke-opacity: calc(var(--kg-expand) * .15);
          stroke-dasharray: 2 8;
          stroke-dashoffset: 0;
        }
        .hero-kg-foreground-cap-edge {
          stroke: ${ACCENT};
          stroke-width: 0.82;
          stroke-opacity: calc(var(--kg-expand) * .38);
          stroke-dasharray: 1;
          stroke-dashoffset: calc(1 - var(--kg-expand));
          vector-effect: non-scaling-stroke;
          transition: stroke-dashoffset 90ms linear, stroke-opacity 90ms linear;
        }
        .hero-kg-foreground-capability {
          opacity: var(--kg-expand);
          transition: opacity 90ms linear;
        }
        .hero-kg-foreground-capability .hero-kg-cap-dot {
          fill: ${ACCENT};
          opacity: calc(.26 + var(--kg-expand) * .72);
          transform: scale(calc(.72 + var(--kg-expand) * .28));
          transition: opacity 90ms linear, transform 100ms linear, fill 160ms ease;
        }
        .hero-kg-foreground-capability .hero-kg-cap-label {
          font-size: 8.2px;
          opacity: clamp(0, calc((var(--kg-expand) - .3) * 1.65), .96);
          transition: opacity 100ms linear;
        }
        .hero-kg-foreground-capability.hero-kg-active .hero-kg-cap-dot {
          fill: ${ACCENT};
          opacity: 1;
          transform: scale(calc(1 + var(--kg-expand) * .75));
        }
        .hero-kg-foreground-hub {
          opacity: calc(.18 + var(--kg-expand) * .82);
          transition: opacity 90ms linear, filter 100ms linear;
        }
        .hero-kg-foreground-hub .hero-kg-hub-ring {
          stroke: ${ACCENT};
          stroke-opacity: calc(.3 + var(--kg-expand) * .7);
          transform: scale(calc(.98 + var(--kg-expand) * .07));
          transition: stroke-opacity 90ms linear, transform 100ms linear;
        }
        .hero-kg-foreground-hub .hero-kg-hub-core {
          fill: ${ACCENT};
          opacity: calc(.34 + var(--kg-expand) * .66);
          transform: scale(calc(.96 + var(--kg-expand) * .42));
          transition: opacity 90ms linear, transform 100ms linear;
        }
        .hero-kg-foreground-hub .hero-kg-hub-label {
          opacity: clamp(.15, calc(.15 + var(--kg-expand) * .8), .95);
          font-size: 8.4px;
          transition: opacity 100ms linear;
        }
        .hero-kg-foreground .hero-kg-expanded-foreground .hero-kg-sat-edge {
          stroke: ${ACCENT};
          stroke-width: 0.78;
          stroke-opacity: calc(var(--kg-expand) * .42);
          stroke-dasharray: 1;
          stroke-dashoffset: calc(1 - var(--kg-expand));
          vector-effect: non-scaling-stroke;
          transition: stroke-dashoffset 90ms linear, stroke-opacity 90ms linear;
        }
        .hero-kg-foreground .hero-kg-sat-item {
          opacity: clamp(0, calc((var(--kg-expand) - .08) * 1.1), 1);
          transition: opacity 90ms linear;
        }
        .hero-kg-foreground .hero-kg-sat-dot {
          opacity: calc(.18 + var(--kg-expand) * .8);
          transform: scale(calc(.62 + var(--kg-expand) * .38));
          transition: opacity 90ms linear, transform 100ms linear;
        }
        .hero-kg-foreground .hero-kg-sat-label,
        .hero-kg-foreground .hero-kg-sat-value {
          opacity: clamp(0, calc((var(--kg-expand) - .36) * 1.8), 1);
          transition: opacity 100ms linear;
        }
        .hero-kg-foreground .hero-kg-sat-item.hero-kg-active .hero-kg-sat-dot {
          opacity: 1;
          transform: scale(calc(1 + var(--kg-expand) * .8));
        }
        .hero-kg-center-wash {
          width: min(820px, 54vw);
          height: 68%;
          background: radial-gradient(ellipse at center, rgba(250,250,250,0.965) 0%, rgba(250,250,250,0.72) 40%, rgba(250,250,250,0.26) 66%, rgba(250,250,250,0) 100%);
          transition: width 320ms cubic-bezier(.2,.8,.2,1), height 320ms cubic-bezier(.2,.8,.2,1);
        }
        svg[data-layout="tablet"] .hero-kg-cap-label { font-size: 7.8px; }
        svg[data-layout="tablet"] .hero-kg-sat-label { font-size: 9.5px; }
        svg[data-layout="tablet"] .hero-kg-sat-value { font-size: 8.4px; }
        svg[data-layout="wide"] .hero-kg-hub-label { font-size: 10px; }
        svg[data-layout="wide"] .hero-kg-cap-label { font-size: 8.8px; }
        svg[data-layout="wide"] .hero-kg-sat-label { font-size: 10px; }
        svg[data-layout="wide"] .hero-kg-sat-value { font-size: 8.7px; }
        svg[data-layout="ultrawide"] .hero-kg-hub-label { font-size: 11.5px; }
        svg[data-layout="ultrawide"] .hero-kg-cap-label { font-size: 9.6px; }
        svg[data-layout="ultrawide"] .hero-kg-sat-label { font-size: 11px; }
        svg[data-layout="ultrawide"] .hero-kg-sat-value { font-size: 9.5px; }
        .hero-kg-center-wash-mobile { width: 88vw; height: 64%; }
        .hero-kg-center-wash-tablet { width: 78vw; height: 68%; }
        .hero-kg-center-wash-wide { width: min(980px, 50vw); height: 70%; }
        .hero-kg-center-wash-ultrawide { width: min(1040px, 42vw); height: 68%; }
        svg[data-layout="ultrawide"] .hero-kg-sat-label { font-size: 11px; }
        svg[data-layout="ultrawide"] .hero-kg-sat-value { font-size: 9.5px; }
        .hero-kg-center-wash-mobile { width: 88vw; height: 64%; }
        .hero-kg-center-wash-tablet { width: 78vw; height: 68%; }
        .hero-kg-center-wash-wide { width: min(980px, 50vw); height: 70%; }
        .hero-kg-center-wash-ultrawide { width: min(1040px, 42vw); height: 68%; }
        @keyframes hero-kg-drift {
          to { stroke-dashoffset: -56; }
        }
        @keyframes hero-kg-expanded-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes hero-kg-edge-draw {
          from { stroke-dashoffset: 90; opacity: 0; }
          to { stroke-dashoffset: 0; opacity: 1; }
        }
        @keyframes hero-kg-sat-pop {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .hero-kg-expanded .hero-kg-sat-dot {
          animation: hero-kg-dot-bloom 300ms cubic-bezier(.16,1,.3,1) both;
        }
        @keyframes hero-kg-dot-bloom {
          from { transform: scale(.55); opacity: 0; }
          to { transform: scale(1); opacity: .66; }
        }
        @keyframes hero-kg-card-in {
          from { opacity: 0; transform: translateY(4px) scale(.985); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @media (max-width: 1100px) {
          .hero-kg-cap-label {
            font-size: 5.2px;
          }
          .hero-kg-hub-label {
            font-size: 7.2px;
            opacity: 0.4;
          }
        }
        @media (max-width: 767px) {
          .hero-kg-cap-label,
          .hero-kg-sat-label,
          .hero-kg-sat-value {
            display: none;
          }
          .hero-kg-hub-label {
            display: block;
            font-size: 8px;
            opacity: 0.42;
          }
          .hero-kg-card {
            display: none;
          }
          .hero-kg-main-edges path {
            stroke-opacity: 0.09;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-kg-journeys path,
          .hero-kg-expanded,
          .hero-kg-expanded .hero-kg-sat-edge,
          .hero-kg-sat-item,
          .hero-kg-card {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
