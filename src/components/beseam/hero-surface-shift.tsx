"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

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
    capabilityRadius: 0.72,
    satelliteRadius: 0.82,
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
    capabilityRadius: 0.86,
    satelliteRadius: 0.9,
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
    capabilityRadius: 1,
    satelliteRadius: 1,
    positions: Object.fromEntries(
      HUBS.map((hub) => [hub.id, { x: hub.x, y: hub.y }]),
    ) as Record<HubId, Point>,
  },
  wide: {
    width: 2200,
    height: 780,
    capabilityLimit: 99,
    capabilityRadius: 1.08,
    satelliteRadius: 1.04,
    positions: {
      ai: { x: 135, y: 165 },
      search: { x: 390, y: 95 },
      catalog: { x: 690, y: 245 },
      brand: { x: 930, y: 105 },
      truth: { x: 1050, y: 325 },
      creative: { x: 1290, y: 100 },
      campaigns: { x: 1580, y: 150 },
      onsite: { x: 1370, y: 345 },
      recs: { x: 1670, y: 320 },
      pdp: { x: 1160, y: 555 },
      behavior: { x: 1510, y: 565 },
      checkout: { x: 1870, y: 430 },
      revenue: { x: 2070, y: 210 },
    },
  },
  ultrawide: {
    width: 2800,
    height: 820,
    capabilityLimit: 99,
    capabilityRadius: 1.18,
    satelliteRadius: 1.08,
    positions: {
      ai: { x: 125, y: 175 },
      search: { x: 470, y: 95 },
      catalog: { x: 870, y: 270 },
      brand: { x: 1160, y: 105 },
      truth: { x: 1360, y: 350 },
      creative: { x: 1640, y: 105 },
      campaigns: { x: 2040, y: 155 },
      onsite: { x: 1760, y: 365 },
      recs: { x: 2160, y: 345 },
      pdp: { x: 1480, y: 610 },
      behavior: { x: 1930, y: 620 },
      checkout: { x: 2380, y: 470 },
      revenue: { x: 2660, y: 225 },
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
      "Synced product and variant truth available for diagnosis and fixes.",
    ],
    [
      "Product proposals",
      "Beta",
      "Generated product-field fixes prepared for merchant review.",
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
      "Post-fix verification",
      "Experimental",
      "Re-check whether a prior page finding is actually fixed.",
    ],
    [
      "Policy visibility",
      "82%",
      "Shipping, returns and other decision policies visible to shoppers.",
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

const JOURNEYS = [
  ["ai", "catalog", "truth", "onsite", "checkout", "revenue"],
  ["search", "catalog", "pdp", "behavior", "checkout", "revenue"],
] as const;

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

function journeyPath(
  ids: readonly string[],
  offset: number,
  hubById: Record<string, Hub>,
) {
  return ids.reduce((path, id, index) => {
    const hub = hubById[id];
    if (index === 0) return `M ${hub.x} ${hub.y}`;
    const previous = hubById[ids[index - 1]];
    const mx = (previous.x + hub.x) / 2;
    const my = (previous.y + hub.y) / 2;
    return `${path} Q ${mx} ${my + offset} ${hub.x} ${hub.y}`;
  }, "");
}

function satellitePoint(hub: Hub, index: number, radiusScale: number) {
  const angle = -1.8 + index * 1.12;
  const radius = (50 + (index % 2) * 13) * radiusScale;
  return {
    x: hub.x + Math.cos(angle) * radius,
    y: hub.y + Math.sin(angle) * radius,
  };
}

function squaredDistance(a: Point, b: Point) {
  return (a.x - b.x) ** 2 + (a.y - b.y) ** 2;
}

export default function HeroSurfaceShift() {
  const svgRef = useRef<SVGSVGElement>(null);
  const lensRef = useRef<SVGCircleElement>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const focusFrameRef = useRef<number | null>(null);
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
  const nodeScale =
    layoutName === "ultrawide"
      ? 1.8
      : layoutName === "wide"
        ? 1.55
        : layoutName === "desktop"
          ? 1.2
          : layoutName === "tablet"
            ? 1.4
            : 1.65;
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
          (30 + ((index * 23 + hubIndex * 11) % 50)) *
          graphLayout.capabilityRadius;
        return {
          hubId: hub.id,
          index,
          x: hub.x + Math.cos(angle) * radius,
          y: hub.y + Math.sin(angle) * radius,
          capability,
        };
      });
    });
  }, [graphLayout, layoutHubs]);

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
  }, [cancelClose]);

  const scheduleClose = useCallback(() => {
    if (closeTimerRef.current) return;
    closeTimerRef.current = setTimeout(clearSelection, 120);
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
      positionCard(element);
    },
    [cancelClose, positionCard],
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
      positionCard(element);
    },
    [cancelClose, positionCard],
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
      ?.querySelectorAll(".hero-kg-near")
      .forEach((element) => element.classList.remove("hero-kg-near"));
  }, []);

  useEffect(() => {
    clearFocus();
    clearSelection();
  }, [clearFocus, clearSelection, layoutName, shortViewport]);

  const handlePointerMove = useCallback(
    (event: React.PointerEvent<SVGSVGElement>) => {
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

        currentSvg
          .querySelectorAll<SVGGElement>(".hero-kg-capability")
          .forEach((element) => {
            const x = Number(element.dataset.x);
            const y = Number(element.dataset.y);
            element.classList.toggle(
              "hero-kg-near",
              squaredDistance({ x, y }, smoothPoint) < 15500,
            );
          });

        currentSvg
          .querySelectorAll<SVGGElement>(".hero-kg-hub")
          .forEach((element) => {
            const x = Number(element.dataset.x);
            const y = Number(element.dataset.y);
            element.classList.toggle(
              "hero-kg-near",
              squaredDistance({ x, y }, smoothPoint) < 20500,
            );
          });

        currentSvg
          .querySelectorAll<SVGPathElement>(".hero-kg-focus-edge")
          .forEach((element) => {
            const x = Number(element.dataset.midX);
            const y = Number(element.dataset.midY);
            element.classList.toggle(
              "hero-kg-near",
              squaredDistance({ x, y }, smoothPoint) < 22000,
            );
          });

        const scale = Math.max(
          0.01,
          Math.hypot(currentMatrix.a, currentMatrix.b),
        );

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

        const activeId = activeHubRef.current;
        if (activeId) {
          const hub = hubById[activeId];
          hub.satellites.forEach((_, index) => {
            const satellite = satellitePoint(
              hub,
              index,
              graphLayout.satelliteRadius,
            );
            const distance =
              Math.sqrt(squaredDistance(satellite, point)) * scale;
            if (distance <= 18) {
              consider({
                kind: "satellite",
                key: `sat:${activeId}:${index}`,
                distance,
                index,
              });
            }
          });
        }

        capabilityNodes.forEach((node) => {
          const distance = Math.sqrt(squaredDistance(node, point)) * scale;
          if (distance > 17) return;
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
      graphLayout.satelliteRadius,
      hubById,
      layoutHubs,
      scheduleClose,
      selectCapability,
      selectHub,
    ],
  );

  const activeHub = activeHubId ? hubById[activeHubId] : null;

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
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <svg
        ref={svgRef}
        data-layout={layoutName}
        data-short={shortViewport || undefined}
        viewBox={`0 0 ${graphLayout.width} ${graphHeight}`}
        preserveAspectRatio="xMidYMid meet"
        className="pointer-events-none absolute inset-0 h-full w-full"
        onPointerMove={handlePointerMove}
        onPointerLeave={() => {
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
          {JOURNEYS.map((journey, index) => (
            <path
              key={journey.join("-")}
              d={journeyPath(
                journey,
                (index === 0 ? -24 : 24) * verticalScale,
                hubById,
              )}
              style={{ animationDelay: `${index * -7}s` }}
            />
          ))}
        </g>

        <g className="hero-kg-capability-edges">
          {capabilityNodes.map((node) => {
            const hub = hubById[node.hubId];
            return (
              <line
                key={`${node.hubId}-${node.index}`}
                x1={hub.x}
                y1={hub.y}
                x2={node.x}
                y2={node.y}
                className={
                  activeHubId === node.hubId ? "hero-kg-parent-active" : ""
                }
              />
            );
          })}
        </g>

        <g className="hero-kg-capabilities">
          {capabilityNodes.map((node) => {
            const parentActive = activeHubId === node.hubId;
            const isActive =
              activeCapability?.hubId === node.hubId &&
              activeCapability.index === node.index;
            const labelOnLeft = node.x > graphLayout.width * 0.82;

            return (
              <g
                key={`${node.hubId}-${node.index}`}
                data-capability={`${node.hubId}:${node.index}`}
                data-x={node.x}
                data-y={node.y}
                transform={`translate(${node.x} ${node.y})`}
                className={`hero-kg-capability ${parentActive ? "hero-kg-parent-active" : ""} ${isActive ? "hero-kg-active" : ""}`}
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
            const labelBelow = hub.y > graphHeight * 0.58;

            return (
              <g
                key={hub.id}
                data-hub={hub.id}
                data-x={hub.x}
                data-y={hub.y}
                transform={`translate(${hub.x} ${hub.y})`}
                className={`hero-kg-hub ${selected ? "hero-kg-selected" : ""}`}
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

        {activeHub ? (
          <g key={activeHub.id} className="hero-kg-expanded">
            {activeHub.satellites.map(([label, value], index) => {
              const { x, y } = satellitePoint(
                activeHub,
                index,
                graphLayout.satelliteRadius,
              );
              const active = activeSatellite === index;
              const labelOnLeft = x > graphLayout.width * 0.82;

              return (
                <g key={`${activeHub.id}-${label}`}>
                  <line
                    x1={activeHub.x}
                    y1={activeHub.y}
                    x2={x}
                    y2={y}
                    className="hero-kg-sat-edge"
                    style={{ animationDelay: `${index * 18}ms` }}
                  />
                  <g
                    className={`hero-kg-sat-item ${active ? "hero-kg-active" : ""}`}
                    transform={`translate(${x} ${y})`}
                    style={{ animationDelay: `${index * 20}ms` }}
                  >
                    <circle className="hero-kg-sat-dot" r={1.7 * nodeScale} />
                    <text
                      className="hero-kg-sat-label"
                      x={labelOnLeft ? -4.5 : 4.5}
                      y="-4"
                      textAnchor={labelOnLeft ? "end" : "start"}
                    >
                      {label}
                    </text>
                    <text
                      className="hero-kg-sat-value"
                      x={labelOnLeft ? -4.5 : 4.5}
                      y="2.5"
                      textAnchor={labelOnLeft ? "end" : "start"}
                    >
                      {value}
                    </text>
                  </g>
                </g>
              );
            })}
          </g>
        ) : null}

        <circle ref={lensRef} className="hero-kg-lens" cx="0" cy="0" r="116" />
      </svg>

      <div
        className={`hero-kg-center-wash hero-kg-center-wash-${layoutName} absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2`}
      />

      {cardContent ? (
        <div
          className="hero-kg-card pointer-events-auto absolute z-[8] w-[218px] border border-black/20 bg-[#fbfbf8]/97 p-3 font-mono shadow-[0_16px_46px_rgba(17,19,24,0.1)] backdrop-blur-[10px]"
          style={{ left: cardPosition.left, top: cardPosition.top }}
          onPointerEnter={cancelClose}
          onPointerLeave={scheduleClose}
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
        .hero-kg-main-edges path {
          stroke: ${INK};
          stroke-width: 0.55;
          stroke-opacity: 0.045;
          vector-effect: non-scaling-stroke;
          transition: stroke-opacity 230ms cubic-bezier(.2,.8,.2,1), stroke-width 230ms cubic-bezier(.2,.8,.2,1), stroke 230ms cubic-bezier(.2,.8,.2,1);
        }
        .hero-kg-main-edges path.hero-kg-weak {
          stroke-dasharray: 2 10;
          stroke-opacity: 0.026;
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
          stroke-opacity: 0.06;
          stroke-linecap: round;
          stroke-dasharray: 10 18;
          vector-effect: non-scaling-stroke;
          animation: hero-kg-drift 20s linear infinite;
        }
        .hero-kg-capability-edges line {
          stroke: ${INK};
          stroke-width: 0.42;
          stroke-opacity: 0.022;
          vector-effect: non-scaling-stroke;
          transition: stroke-opacity 230ms cubic-bezier(.2,.8,.2,1);
        }
        .hero-kg-capability-edges line.hero-kg-parent-active {
          stroke-opacity: 0.05;
        }
        .hero-kg-capability {
          transition: opacity 220ms cubic-bezier(.2,.8,.2,1);
        }
        .hero-kg-cap-dot {
          fill: ${INK};
          opacity: 0.11;
          transform-box: fill-box;
          transform-origin: center;
          transition: opacity 190ms cubic-bezier(.2,.8,.2,1), transform 260ms cubic-bezier(.16,1,.3,1), fill 190ms ease;
        }
        .hero-kg-cap-label {
          fill: ${INK};
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
          font-size: 3.65px;
          font-weight: 600;
          letter-spacing: 0.025em;
          opacity: 0;
          pointer-events: none;
          transition: opacity 200ms cubic-bezier(.2,.8,.2,1);
        }
        .hero-kg-capability.hero-kg-near .hero-kg-cap-dot {
          opacity: 0.22;
          transform: scale(1.35);
        }
        .hero-kg-capability.hero-kg-parent-active .hero-kg-cap-dot {
          opacity: 0.28;
        }
        .hero-kg-capability.hero-kg-active .hero-kg-cap-dot {
          fill: ${ACCENT};
          opacity: 1;
          transform: scale(2.2);
        }
        .hero-kg-capability.hero-kg-active .hero-kg-cap-label {
          opacity: 0.86;
        }
        .hero-kg-context .hero-kg-capability:not(.hero-kg-near):not(.hero-kg-parent-active):not(.hero-kg-active) {
          opacity: 0.36;
        }
        .hero-kg-hub {
          transition: opacity 220ms cubic-bezier(.2,.8,.2,1), filter 260ms cubic-bezier(.2,.8,.2,1);
        }
        .hero-kg-hub-ring {
          fill: ${PAPER};
          stroke: ${INK};
          stroke-width: 0.62;
          stroke-opacity: 0.24;
          vector-effect: non-scaling-stroke;
          transition: stroke 200ms ease, stroke-opacity 200ms ease, transform 270ms cubic-bezier(.16,1,.3,1);
        }
        .hero-kg-hub-core {
          fill: ${INK};
          opacity: 0.42;
          transform-box: fill-box;
          transform-origin: center;
          transition: opacity 200ms ease, transform 270ms cubic-bezier(.16,1,.3,1), fill 200ms ease;
        }
        .hero-kg-hub-label {
          fill: ${INK};
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
          font-size: 6px;
          font-weight: 600;
          letter-spacing: 0.04em;
          opacity: 0.18;
          transition: opacity 210ms ease, font-size 270ms cubic-bezier(.16,1,.3,1);
        }
        .hero-kg-hub.hero-kg-near .hero-kg-hub-ring {
          stroke-opacity: 0.34;
        }
        .hero-kg-hub.hero-kg-near .hero-kg-hub-core {
          opacity: 0.54;
          transform: scale(1.12);
        }
        .hero-kg-hub.hero-kg-near .hero-kg-hub-label {
          opacity: 0.28;
        }
        .hero-kg-hub.hero-kg-selected {
          filter: drop-shadow(0 5px 8px rgba(17,19,24,0.08));
        }
        .hero-kg-hub.hero-kg-selected .hero-kg-hub-ring {
          stroke: ${ACCENT};
          stroke-opacity: 0.82;
          transform: scale(1.08);
          transform-box: fill-box;
          transform-origin: center;
        }
        .hero-kg-hub.hero-kg-selected .hero-kg-hub-core {
          fill: ${ACCENT};
          opacity: 0.96;
          transform: scale(1.55);
        }
        .hero-kg-hub.hero-kg-selected .hero-kg-hub-label {
          opacity: 0.78;
          font-size: 5px;
        }
        .hero-kg-context .hero-kg-hub:not(.hero-kg-near):not(.hero-kg-selected) {
          opacity: 0.48;
        }
        .hero-kg-expanded {
          animation: hero-kg-expanded-in 260ms cubic-bezier(.16,1,.3,1) both;
        }
        .hero-kg-expanded .hero-kg-sat-edge {
          stroke: ${ACCENT};
          stroke-width: 0.65;
          stroke-opacity: 0.2;
          vector-effect: non-scaling-stroke;
          stroke-dasharray: 90;
          animation: hero-kg-edge-draw 320ms cubic-bezier(.16,1,.3,1) both;
        }
        .hero-kg-sat-item {
          animation: hero-kg-sat-pop 280ms cubic-bezier(.16,1,.3,1) both;
        }
        .hero-kg-sat-dot {
          fill: ${ACCENT};
          opacity: 0.66;
          transform-box: fill-box;
          transform-origin: center;
          transition: opacity 200ms ease, transform 260ms cubic-bezier(.16,1,.3,1);
        }
        .hero-kg-sat-label {
          fill: ${INK};
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
          font-size: 4px;
          font-weight: 600;
          opacity: 0.36;
          transition: opacity 200ms ease;
        }
        .hero-kg-sat-value {
          fill: ${ACCENT};
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
          font-size: 3.8px;
          font-weight: 700;
          opacity: 0.76;
          transition: opacity 200ms ease;
        }
        .hero-kg-sat-item.hero-kg-active .hero-kg-sat-dot {
          opacity: 1;
          transform: scale(2);
        }
        .hero-kg-sat-item.hero-kg-active .hero-kg-sat-label,
        .hero-kg-sat-item.hero-kg-active .hero-kg-sat-value {
          opacity: 1;
        }
        .hero-kg-lens {
          fill: none;
          stroke: ${INK};
          stroke-width: 0.5;
          stroke-opacity: 0;
          stroke-dasharray: 2 10;
          vector-effect: non-scaling-stroke;
          pointer-events: none;
          transition: stroke-opacity 200ms ease;
        }
        .hero-kg-lens.hero-kg-visible {
          stroke-opacity: 0.05;
        }
        .hero-kg-card {
          animation: hero-kg-card-in 220ms cubic-bezier(.16,1,.3,1) both;
          transition: left 200ms cubic-bezier(.2,.8,.2,1), top 200ms cubic-bezier(.2,.8,.2,1);
        }
        .hero-kg-center-wash {
          width: min(900px, 62vw);
          height: 72%;
          background: radial-gradient(ellipse at center, rgba(250,250,250,0.992) 0%, rgba(250,250,250,0.91) 42%, rgba(250,250,250,0.52) 68%, rgba(250,250,250,0) 100%);
          transition: width 320ms cubic-bezier(.2,.8,.2,1), height 320ms cubic-bezier(.2,.8,.2,1);
        }
        svg[data-layout="wide"] .hero-kg-hub-label {
          font-size: 7.4px;
          opacity: 0.21;
        }
        svg[data-layout="wide"] .hero-kg-cap-dot {
          opacity: 0.14;
        }
        svg[data-layout="ultrawide"] .hero-kg-hub-label {
          font-size: 8.5px;
          opacity: 0.23;
        }
        svg[data-layout="ultrawide"] .hero-kg-cap-dot {
          opacity: 0.16;
        }
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
            font-size: 4.2px;
          }
          .hero-kg-hub-label {
            font-size: 4.8px;
          }
        }
        @media (max-width: 767px) {
          .hero-kg-cap-label,
          .hero-kg-hub-label,
          .hero-kg-sat-label,
          .hero-kg-sat-value {
            display: none;
          }
          .hero-kg-card {
            display: none;
          }
          .hero-kg-main-edges path {
            stroke-opacity: 0.018;
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
