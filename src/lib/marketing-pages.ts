import type { Metadata } from "next";

export type MarketingFaq = {
  question: string;
  answer: string;
};

export type MarketingPageData = {
  slug: string;
  eyebrow: string;
  headline: string;
  metaTitle: string;
  description: string;
  intro: string;
  proofLine: string;
  observations: Array<{ title: string; detail: string }>;
  sections: Array<{ title: string; body: string; points: string[] }>;
  limits: string[];
  faqs: MarketingFaq[];
  related: Array<{ label: string; href: string }>;
};

export const MARKETING_PAGES: Record<string, MarketingPageData> = {
  "shopify-store-health": {
    slug: "shopify-store-health",
    eyebrow: "Store health for Shopify",
    headline:
      "One evidence-backed view of whether your store can be found and purchased from.",
    metaTitle: "Shopify Store Health Monitoring | Beseam",
    description:
      "Monitor Shopify discoverability, purchase health and source freshness in one evidence-backed workspace. See issues, affected scope, owners and next actions.",
    intro:
      "Beseam Store Health brings together current Shopify catalog state, technical product-page evidence, storefront commerce signals and monitoring coverage. It gives ecommerce teams one place to ask what needs attention now—and whether enough current data exists to trust the answer.",
    proofLine:
      "A read-only health view built from existing Beseam sources; missing or stale data never becomes a reassuring healthy status.",
    observations: [
      {
        title: "Discoverability domain",
        detail:
          "Current product and channel gaps, product-page verification findings and the freshness of crawl and Search Console coverage.",
      },
      {
        title: "Purchase domain",
        detail:
          "Open friction incidents, supported tracker alerts and recent storefront-event coverage across the purchase journey.",
      },
      {
        title: "Monitoring coverage",
        detail:
          "Fresh, stale, disconnected, failed and not-configured states for each source contributing to the answer.",
      },
      {
        title: "Prioritized handoff",
        detail:
          "Domain, issue class, severity, affected scope, evidence, recommended owner, action and a direct source path.",
      },
    ],
    sections: [
      {
        title: "Store Health separates a real issue from a monitoring gap.",
        body: "A store can have no reported errors because it is healthy—or because a source stopped sending data. Beseam keeps those situations separate. Domain health is calculated from active issues and the freshness of the primary evidence source.",
        points: [
          "Critical, degraded, healthy and unknown are distinct health states.",
          "Broken, degraded and opportunity issues are prioritized differently.",
          "A healthy overall state requires healthy domains and current source coverage.",
        ],
      },
      {
        title: "Discoverability and purchasing remain one commercial story.",
        body: "A theme, app or catalog change can affect how a product is represented to search systems and how shoppers interact with it. Store Health connects the evidence without pretending every issue has the same cause or owner.",
        points: [
          "SEO and content teams receive technical evidence and affected products.",
          "Ecommerce teams see purchase friction and monitoring blind spots.",
          "Developers and agencies receive a narrower investigation path.",
        ],
      },
      {
        title: "The workspace is evidence first—not score first.",
        body: "Store Health preserves the source record and observation time behind an issue. It can show a likely cause or recommended action when supported, but it leaves impact uncalculated when the product cannot verify it.",
        points: [
          "No fabricated revenue-at-risk figure.",
          "No silent demo-data substitution.",
          "No guaranteed cause when the evidence only shows correlation.",
        ],
      },
    ],
    limits: [
      "Store Health is currently read-only.",
      "It does not synthetically reproduce every storefront path.",
      "It does not calculate a composite 0–100 health score.",
      "It does not fabricate financial impact when the calculation is unavailable.",
    ],
    faqs: [
      {
        question: "What Shopify stores is Store Health designed for?",
        answer:
          "It is designed for Shopify brands with a meaningful catalog and a small or medium ecommerce team working across SEO, content, operations and development.",
      },
      {
        question: "Does Store Health replace our existing tools?",
        answer:
          "No. It brings selected evidence and freshness state into one health view. Shopify, Search Console, crawling and storefront monitoring remain the underlying sources.",
      },
      {
        question: "Can Store Health automatically fix every issue?",
        answer:
          "No. Current Store Health prioritizes evidence and investigation paths. Automated resolution and complete change correlation are not part of the current phase.",
      },
    ],
    related: [
      { label: "Purchase Health", href: "/purchase-health" },
      { label: "Discoverability Health", href: "/discoverability-health" },
      { label: "Monitoring coverage", href: "/monitoring-coverage" },
    ],
  },
  "purchase-health": {
    slug: "purchase-health",
    eyebrow: "Purchase Health for Shopify",
    headline:
      "Observe where the purchase journey degrades—and keep the affected context attached.",
    metaTitle: "Shopify Purchase Health and Checkout Monitoring | Beseam",
    description:
      "Monitor Shopify purchase-path signals, storefront errors, friction incidents and conversion regressions with evidence, source freshness and affected context.",
    intro:
      "Purchase Health turns supported Shopify commerce events, storefront errors, friction signals and configured conversion monitors into evidence that ecommerce and development teams can investigate. It is designed for partial failures that affect a browser, product, page pattern or funnel stage while the rest of the store still appears normal.",
    proofLine:
      "Real-user evidence across product view, add-to-cart, cart, checkout and purchase—without claiming synthetic reproduction of every path.",
    observations: [
      {
        title: "Commerce events",
        detail:
          "Product view, add-to-cart, remove-from-cart, cart update, checkout start, checkout step and purchase signals where configured.",
      },
      {
        title: "Errors and friction",
        detail:
          "JavaScript, console, resource, HTTP, GraphQL and form errors alongside rage clicks, dead clicks and form abandonment.",
      },
      {
        title: "Performance context",
        detail:
          "Web-vital, long-task and page-freeze signals can provide context when they are present in observed sessions.",
      },
      {
        title: "Affected scope",
        detail:
          "Session, page pattern, product or variant, device, browser, market and primary funnel stage where the underlying evidence provides them.",
      },
    ],
    sections: [
      {
        title: "Follow the purchase journey instead of watching only uptime.",
        body: "A page can return a successful response while a theme handler fails on one browser or an error interrupts add-to-cart. Purchase Health groups the observed signals around the stage where shoppers encountered the problem.",
        points: [
          "Product page and variant interaction context.",
          "Add-to-cart success, failure and related error clusters.",
          "Cart, checkout, payment-stage and purchase evidence.",
        ],
      },
      {
        title: "Use incident evidence to narrow the investigation.",
        body: "A friction incident can carry its type, severity, affected sessions and users, primary funnel stage, signal summary, first and last observed times, page pattern and recommended investigation.",
        points: [
          "Source record remains available for deeper investigation.",
          "Likely cause is kept separate from confirmed evidence.",
          "Recommended owner routes the issue without replacing developer verification.",
        ],
      },
      {
        title:
          "Configure monitors for conversion regressions that matter to your team.",
        body: "Configured conversion monitors run hourly, compare a current period with an earlier baseline window and create an alert when the chosen threshold is crossed. Optional email notification is available.",
        points: [
          "Lookback and alert threshold are configurable.",
          "Overall and per-zone regressions can create alerts.",
          "The alert is a statistical signal—not proof of root cause.",
        ],
      },
    ],
    limits: [
      "Evidence depends on observed traffic and configured tracking.",
      "Current Store Health does not synthetically reproduce every device or payment path.",
      "An observed correlation is not automatically a confirmed cause.",
      "No guaranteed alert time is claimed.",
    ],
    faqs: [
      {
        question: "Is Purchase Health the former tracking product?",
        answer:
          "The useful tracking capabilities now form the Purchase Health domain inside Beseam Store Health. They are no longer presented as a separate commercial product.",
      },
      {
        question: "Does Purchase Health record purchases?",
        answer:
          "The tracker supports ecommerce purchase events, and Shopify order tracking can be handled server-side through the Shopify integration. Availability still depends on the store configuration.",
      },
      {
        question: "Is this the same as synthetic checkout testing?",
        answer:
          "No. Current Purchase Health is based on observed storefront and commerce evidence. Synthetic storefront checks are not part of the current Store Health phase.",
      },
    ],
    related: [
      { label: "Shopify integration", href: "/integrations/shopify" },
      { label: "Monitoring coverage", href: "/monitoring-coverage" },
      { label: "Shopify Store Health", href: "/shopify-store-health" },
    ],
  },
  "discoverability-health": {
    slug: "discoverability-health",
    eyebrow: "Discoverability Health for Shopify",
    headline:
      "Keep catalog, product-page and search-source evidence connected.",
    metaTitle: "Shopify Discoverability and Technical SEO Health | Beseam",
    description:
      "Monitor Shopify product and channel gaps, product-page verification evidence, crawl coverage and Search Console freshness in one discoverability health view.",
    intro:
      "Discoverability Health gives Shopify teams a technical evidence layer beneath SEO and content work. It connects current product state, structured product requirements, recent crawl or verification coverage and the freshness of connected search sources without turning incomplete coverage into a healthy score.",
    proofLine:
      "Current Store Health normalizes channel-readiness gaps and product-page verification findings while reporting crawl and Search Console freshness.",
    observations: [
      {
        title: "Catalog truth",
        detail:
          "Recent active Shopify catalog snapshots establish the current product and variant state used by downstream checks.",
      },
      {
        title: "Channel readiness",
        detail:
          "Current high-priority gaps identify the affected field, product, channel, severity and suggested Shopify action.",
      },
      {
        title: "Product-page verification",
        detail:
          "Critical and high rendered-page findings can be normalized into Store Health with source evidence and affected URLs.",
      },
      {
        title: "Search and crawl coverage",
        detail:
          "Completed crawl state and Search Console connection freshness show whether recent evidence is available to support the domain answer.",
      },
    ],
    sections: [
      {
        title: "Start with the product record that should be discoverable.",
        body: "Titles, handles, variants and identifiers originate in Shopify. Beseam keeps the product record connected to downstream channel and page evidence so a team can see exactly which item needs attention.",
        points: [
          "Affected product IDs and URLs remain part of the issue.",
          "Missing structured product fields become explicit gaps.",
          "The recommended owner can be content, SEO or development.",
        ],
      },
      {
        title: "Treat technical coverage as evidence—not decoration.",
        body: "A recent crawl or product-page verification run can support a technical answer. A missing, failed or stale source cannot. Discoverability Health exposes that distinction before presenting the domain as healthy.",
        points: [
          "Crawl and verification use source-specific freshness windows.",
          "Rendered-page drift can be kept separate from catalog state.",
          "Search Console sync state remains visible when it is stale or disconnected.",
        ],
      },
      {
        title:
          "Give the SEO team an investigation path, not another generic grade.",
        body: "Beseam does not replace SEO strategy, content planning or developer work. It provides technical evidence, affected products and pages, freshness and a recommended action that the existing team can verify.",
        points: [
          "No guaranteed ranking outcome.",
          "No invented traffic or revenue impact.",
          "No claim that every indexing issue is currently ingested.",
        ],
      },
    ],
    limits: [
      "Current Store Health does not ingest every Search Console indexing issue.",
      "General crawl-issue ingestion is not claimed beyond the shipped source and verification evidence.",
      "Channel readiness is not a ranking guarantee.",
      "Technical findings still require team verification before publishing a fix.",
    ],
    faqs: [
      {
        question: "Is Discoverability Health an SEO replacement?",
        answer:
          "No. It provides the technical monitoring and evidence layer beneath SEO and content work. Strategy, content and implementation remain with your team or agency.",
      },
      {
        question: "Does it guarantee Google Shopping eligibility?",
        answer:
          "No. Beseam can surface product and channel gaps such as a missing GTIN. Eligibility and performance remain controlled by the channel and the complete product setup.",
      },
      {
        question: "What role does Search Console play?",
        answer:
          "Search Console is a connected evidence source. Store Health currently reports its connection and freshness; it does not claim complete ingestion of every indexing issue.",
      },
    ],
    related: [
      {
        label: "Google Search Console integration",
        href: "/integrations/google-search-console",
      },
      { label: "Shopify integration", href: "/integrations/shopify" },
      { label: "Monitoring coverage", href: "/monitoring-coverage" },
    ],
  },
  "monitoring-coverage": {
    slug: "monitoring-coverage",
    eyebrow: "Monitoring coverage",
    headline: "Know when the evidence is fresh, stale, failed or missing.",
    metaTitle: "Shopify Monitoring Coverage and Data Freshness | Beseam",
    description:
      "Understand Shopify Store Health source freshness across catalog, storefront events, Search Console, crawl and product-page verification.",
    intro:
      "Monitoring coverage is the trust layer beneath Store Health. It answers whether each connected source is configured, working and recent enough to support a health conclusion. Without that layer, missing data can look deceptively healthy.",
    proofLine:
      "Every source keeps its own state, last successful observation and source-specific freshness window.",
    observations: [
      {
        title: "Fresh",
        detail:
          "Recent data is available inside the source-specific freshness window.",
      },
      {
        title: "Stale",
        detail:
          "A successful observation exists, but it is too old to support a current healthy answer.",
      },
      {
        title: "Disconnected or failed",
        detail:
          "The connection is unavailable or returned an error and cannot currently support the answer.",
      },
      {
        title: "Not configured",
        detail:
          "No trustworthy record or data has arrived for that source yet.",
      },
    ],
    sections: [
      {
        title: "Different sources age at different speeds.",
        body: "A storefront event stream becomes stale sooner than a completed crawl. Beseam uses deterministic, source-specific freshness thresholds rather than one arbitrary timestamp for the whole store.",
        points: [
          "Shopify catalog and Search Console require recent synchronization.",
          "Storefront tracker coverage reflects recent observed events.",
          "Crawl and product-page verification have longer technical windows.",
        ],
      },
      {
        title: "Coverage changes the health answer.",
        body: "Critical evidence can still produce a critical status. But when the primary source is missing, disconnected or failed, the domain becomes unknown. A stale source produces degraded or unknown depending on the active evidence.",
        points: [
          "Unknown is not a softer version of healthy.",
          "Low-severity issues do not degrade a domain on their own.",
          "Overall healthy requires all domains and reported sources to be current.",
        ],
      },
      {
        title: "Coverage gaps become work your team can route.",
        body: "A stale connector or missing verification run is itself operational information. The team can reconnect a source, run a fresh check or narrow the confidence of an investigation instead of relying on an unsupported status.",
        points: [
          "Last successful and last data timestamps remain available.",
          "Coverage is grouped by discoverability, purchase or monitoring domain.",
          "The message explains why the source has its current state.",
        ],
      },
    ],
    limits: [
      "Freshness confirms recent data—not the absence of every issue.",
      "A configured source with no trustworthy data is not considered healthy.",
      "Thresholds are deterministic but may evolve with the product.",
      "Coverage does not replace source-specific investigation.",
    ],
    faqs: [
      {
        question: "Why can a store be unknown instead of healthy?",
        answer:
          "Because a primary source is missing, stale, disconnected or failed. Beseam refuses to infer health when the evidence cannot support it.",
      },
      {
        question: "Does fresh mean there are no problems?",
        answer:
          "No. Fresh only means the source is current enough to evaluate. Active issues still determine whether the domain is critical, degraded or healthy.",
      },
      {
        question: "Can one stale source affect the overall state?",
        answer:
          "Yes. A would-be healthy overall state is downgraded when reported source coverage is not fully current.",
      },
    ],
    related: [
      { label: "Shopify Store Health", href: "/shopify-store-health" },
      { label: "Purchase Health", href: "/purchase-health" },
      { label: "Discoverability Health", href: "/discoverability-health" },
    ],
  },
  "integrations/shopify": {
    slug: "integrations/shopify",
    eyebrow: "Shopify integration",
    headline:
      "Use Shopify store and commerce evidence as the foundation of Store Health.",
    metaTitle: "Beseam Shopify Store Health Integration",
    description:
      "Connect Shopify catalog, product, variant and commerce-event evidence to Beseam Store Health for discoverability and purchase-health monitoring.",
    intro:
      "The Shopify integration provides the product and commerce context Store Health needs to identify affected items and purchase stages. Beseam uses current catalog snapshots and supported ecommerce signals while keeping source freshness and configuration visible.",
    proofLine:
      "Shopify remains the source of truth for store, product, variant and order state; Store Health is a read-only evidence layer.",
    observations: [
      {
        title: "Catalog snapshots",
        detail:
          "Recent active product snapshots provide titles, handles, variants and identifiers for discoverability evidence.",
      },
      {
        title: "Automatic journey signals",
        detail:
          "On Shopify, supported tracker setup can automatically observe add-to-cart form submission and checkout navigation.",
      },
      {
        title: "Purchase events",
        detail:
          "Shopify order webhooks can provide server-side purchase tracking when the integration is configured.",
      },
      {
        title: "Affected item context",
        detail:
          "Product and variant identifiers help route a channel gap, product-page finding or purchase incident to the exact item.",
      },
    ],
    sections: [
      {
        title: "Connect store state to the evidence that depends on it.",
        body: "A missing identifier or changed variant is useful only when the team can trace it back to Shopify. Store Health keeps affected product IDs, URLs and source records attached to the issue.",
        points: [
          "Catalog freshness supports the discoverability domain.",
          "Products and variants remain identifiable in the issue.",
          "Recommended actions can point back to Shopify.",
        ],
      },
      {
        title:
          "Observe the purchase journey without presenting it as synthetic testing.",
        body: "The tracker supports GA4-compatible ecommerce events from product view through purchase. On Shopify, add-to-cart and checkout observation can be automatic, while order tracking can be handled server-side.",
        points: [
          "Product view, add-to-cart, cart, checkout and purchase events.",
          "Observed storefront errors and friction can add context.",
          "Availability depends on the installed and configured integration.",
        ],
      },
      {
        title: "Keep the integration state visible.",
        body: "A connected integration is useful only when data is arriving. Store Health tracks the latest catalog and storefront evidence and marks the source stale or not configured when it cannot support a current answer.",
        points: [
          "No-data does not become healthy.",
          "Store Health does not silently substitute sample data.",
          "The current workspace is read-only.",
        ],
      },
    ],
    limits: [
      "The Shopify integration does not synthetically test every storefront path.",
      "Store Health does not automatically edit Shopify in the current phase.",
      "Observed events depend on correct tracker and webhook configuration.",
      "Purchase-event availability can differ by store configuration.",
    ],
    faqs: [
      {
        question: "Does Beseam change my Shopify store?",
        answer:
          "Current Store Health is read-only. It uses store and monitoring evidence to prioritize issues and investigation paths.",
      },
      {
        question: "Which ecommerce events are supported?",
        answer:
          "The tracker taxonomy includes product view, item selection, add-to-cart, remove-from-cart, cart update, checkout start, checkout step, payment start and purchase events.",
      },
      {
        question: "How does Beseam know the Shopify source is current?",
        answer:
          "Store Health uses the latest successful catalog or event timestamp and a source-specific freshness threshold.",
      },
    ],
    related: [
      { label: "Purchase Health", href: "/purchase-health" },
      { label: "Discoverability Health", href: "/discoverability-health" },
      { label: "Monitoring coverage", href: "/monitoring-coverage" },
    ],
  },
  "integrations/google-search-console": {
    slug: "integrations/google-search-console",
    eyebrow: "Google Search Console integration",
    headline:
      "Keep search-source freshness visible inside Shopify Store Health.",
    metaTitle: "Beseam Google Search Console Integration for Shopify",
    description:
      "Connect Google Search Console to Beseam Store Health and see whether the search evidence source is connected, current, stale or unavailable.",
    intro:
      "Search Console is an important evidence source for understanding how Google sees and reports a Shopify storefront. Beseam keeps the connector and its latest synchronization state visible so a stale or failed source cannot quietly support a healthy discoverability conclusion.",
    proofLine:
      "Current Store Health uses Search Console connection and synchronization freshness as monitoring coverage; it does not claim complete indexing-issue ingestion.",
    observations: [
      {
        title: "Connection state",
        detail:
          "Connected, disconnected and failed states show whether Beseam can currently rely on the connector.",
      },
      {
        title: "Last synchronization",
        detail:
          "The latest successful sync time is compared with the source-specific freshness window.",
      },
      {
        title: "Discoverability coverage",
        detail:
          "A stale or unavailable Search Console source contributes to unknown or degraded confidence instead of healthy.",
      },
      {
        title: "Supporting evidence",
        detail:
          "Search-source coverage is interpreted alongside Shopify catalog, crawl, channel and product-page evidence.",
      },
    ],
    sections: [
      {
        title: "A connected badge is not enough.",
        body: "Credentials can exist while the latest data is too old to support a current answer. Beseam separates connection from freshness and preserves the last successful synchronization time.",
        points: [
          "Connected and fresh are related but different states.",
          "Expired or failed connections remain visible.",
          "No successful data means the source cannot support healthy.",
        ],
      },
      {
        title: "Use Search Console as one part of discoverability evidence.",
        body: "Search Console does not explain the entire product record or rendered storefront. Store Health combines its coverage state with current Shopify catalog evidence, channel gaps, crawl completion and product-page verification.",
        points: [
          "Catalog evidence identifies the affected product.",
          "Crawl and verification provide technical page context.",
          "Search Console provides an independent search-source connection.",
        ],
      },
      {
        title: "Keep the current product boundary explicit.",
        body: "The current Store Health phase reports Search Console connection and freshness. It does not claim to ingest or diagnose every indexing issue from Search Console.",
        points: [
          "No guaranteed ranking or indexing outcome.",
          "No healthy status from stale search data.",
          "Broader diagnosis requires supporting technical evidence.",
        ],
      },
    ],
    limits: [
      "Complete Search Console indexing-issue ingestion is not claimed.",
      "A fresh connector does not guarantee search visibility.",
      "Search performance still depends on Google and the wider store implementation.",
      "Connector availability depends on valid authorization and successful sync.",
    ],
    faqs: [
      {
        question: "Does Beseam read every Search Console issue?",
        answer:
          "No. Current Store Health reports the connector and synchronization freshness. It does not claim complete ingestion of every indexing issue.",
      },
      {
        question: "Why does Search Console freshness matter?",
        answer:
          "Because an old or failed sync cannot support a current discoverability conclusion. Beseam keeps that uncertainty visible.",
      },
      {
        question: "Does connecting Search Console improve rankings?",
        answer:
          "No. The integration provides evidence and monitoring coverage. It does not guarantee ranking, indexing or traffic outcomes.",
      },
    ],
    related: [
      { label: "Discoverability Health", href: "/discoverability-health" },
      { label: "Shopify integration", href: "/integrations/shopify" },
      { label: "Monitoring coverage", href: "/monitoring-coverage" },
    ],
  },
};

export function getMarketingPage(slug: string): MarketingPageData {
  const page = MARKETING_PAGES[slug];
  if (!page) throw new Error("Unknown marketing page: " + slug);
  return page;
}

export function getMarketingMetadata(page: MarketingPageData): Metadata {
  const path = "/" + page.slug;
  return {
    title: { absolute: page.metaTitle },
    description: page.description,
    alternates: { canonical: path },
    openGraph: {
      title: page.metaTitle,
      description: page.description,
      url: path,
      type: "website",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: page.metaTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: page.metaTitle,
      description: page.description,
      images: ["/og-image.png"],
    },
  };
}
