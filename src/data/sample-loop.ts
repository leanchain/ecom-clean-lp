// The Diagnose/Fix/Verify stages of the loop for the same store the sample
// scan came from. Diagnose is the frozen, unedited output of a real PDP audit
// run against the store's live Rosé Gold sneaker page (same engine the
// platform runs; brand tokens stripped, nothing else touched). Fix is the
// audit's own top recommendation: still `proposed`, nothing has been
// published to the store. Verify describes what runs after a publish and
// carries no fabricated result.

export type LoopFinding = {
  field: string;
  issue: string;
  severity: "blocker" | "high" | "medium" | "low";
};

export type SampleLoop = {
  product: {
    title: string;
    price: string;
    image_url: string | null;
  };
  missedQuestion: string;
  diagnose: {
    source: string;
    score: number;
    grade: string;
    failedChecks: number;
    totalChecks: number;
    findings: LoopFinding[];
  };
  fix: {
    field: string;
    diff: { kind: "context" | "del" | "add"; text: string }[];
    alsoQueued: {
      field: string;
      change: string;
      severity: "blocker" | "high" | "medium" | "low";
    }[];
    note: string;
  };
  verify: {
    question: string;
    channels: string[];
    answerIntro: string;
    answerPoints: { label: string; text: string }[];
    answerBridge: string;
    answerOutro: string;
    answerProducts: {
      title: string;
      merchant: string;
      price: string;
      ours: boolean;
      image_url: string | null;
    }[];
    note: string;
  };
};

export const SAMPLE_LOOP: SampleLoop = {
  product: {
    title: "Low-Top Dance Sneakers (Rosé Gold)",
    price: "130.00 CHF",
    image_url:
      "https://cdn.shopify.com/s/files/1/0047/2321/2377/files/1_e2a8e2a6-7392-4ced-b91e-e7291ff3c5fb.png?v=1769175886",
  },
  missedQuestion: "What dance shoes are best for beginners?",
  diagnose: {
    source: "PDP audit, run on the live product page",
    score: 31,
    grade: "F",
    failedChecks: 27,
    totalChecks: 81,
    findings: [
      {
        field: "offers.availability",
        issue:
          "The Offer schema and the visible stock message don't resolve to the same status, leaving buyability ambiguous to systems reading the page.",
        severity: "blocker",
      },
      {
        field: "offers.priceCurrency",
        issue:
          "Currency isn't explicit in both the visible price and the Offer schema.",
        severity: "high",
      },
      {
        field: "offers.shippingDetails",
        issue:
          "No OfferShippingDetails in the Offer schema: required for shipping annotations in Google Search.",
        severity: "high",
      },
      {
        field: "BreadcrumbList",
        issue:
          "No breadcrumb schema: the page provides less explicit category context to systems reading its structured data.",
        severity: "low",
      },
    ],
  },
  fix: {
    field: "offers.availability",
    // The Offer schema already declares InStock; the page never says it: the
    // fix adds the visible stock line so both resolve to the same status.
    diff: [
      { kind: "context", text: '<p class="product-price">CHF 130.00</p>' },
      { kind: "del", text: "(no visible stock status on the page)" },
      {
        kind: "add",
        text: '<p class="stock-status">In stock: ready to ship</p>',
      },
      {
        kind: "context",
        text: '"availability": "https://schema.org/InStock"  ✓ unchanged',
      },
    ],
    alsoQueued: [
      {
        field: "offers.priceCurrency",
        change:
          "Declare the currency in the Offer schema and show it with the visible price.",
        severity: "high",
      },
      {
        field: "offers.shippingDetails",
        change:
          "Add OfferShippingDetails JSON-LD (rate and delivery time) so shipping annotations can show.",
        severity: "high",
      },
      {
        field: "BreadcrumbList",
        change:
          "Add BreadcrumbList schema so the category path is machine-readable.",
        severity: "low",
      },
    ],
    note: "Every change from the audit is queued as its own proposed action: approved, published and reverted one field at a time.",
  },
  verify: {
    question: "What dance shoes are best for beginners?",
    channels: ["ChatGPT", "Google AI Mode"],
    answerIntro:
      "Good question: it depends mostly on the style you're starting with:",
    answerPoints: [
      {
        label: "Ballet",
        text: "soft canvas or leather slippers with a full or split sole.",
      },
      {
        label: "Ballroom & Latin",
        text: "a low-heeled practice shoe with a suede sole, so you can pivot without sticking.",
      },
      {
        label: "Salsa & social dancing",
        text: "dance sneakers or suede-sole shoes: the most forgiving choice for long social nights.",
      },
      {
        label: "Hip-hop & studio classes",
        text: "lightweight dance sneakers with a pivot spot under the ball of the foot.",
      },
    ],
    answerBridge:
      "If you're not sure which style will stick, a low-top dance sneaker is the safest first pair: comfortable, flexible, and it works across styles. A few options that come up often:",
    answerOutro:
      "Whichever you pick, prioritise fit and a sole that matches your dance floor: you can always specialise once you know your style.",
    // The rivals here are the real products the assistant named in the scan;
    // the store's own sneaker is placed where the fix aims to put it.
    answerProducts: [
      {
        title: "Low-Top Dance Sneakers (Rosé Gold)",
        merchant: "This store",
        price: "130.00 CHF",
        ours: true,
        image_url:
          "https://cdn.shopify.com/s/files/1/0047/2321/2377/files/1_e2a8e2a6-7392-4ced-b91e-e7291ff3c5fb.png?v=1769175886",
      },
      {
        title: "Performa Stretch Canvas Split Sole Ballet Shoe",
        merchant: "BLOCH Dance US",
        price: "24.00 USD",
        ours: false,
        image_url: null,
      },
      {
        title: "Elasta Bootie Jazz Shoe (S0499L)",
        merchant: "GetDancewear",
        price: "57.50 USD",
        ours: false,
        image_url: null,
      },
      {
        title: "Cadence Tap Shoe (CG19)",
        merchant: "Capezio",
        price: "98.50 USD",
        ours: false,
        image_url: null,
      },
    ],
    note: "After the fix publishes, the same question is asked again. A changed answer is an observed result to compare with the earlier run, not a guarantee of future placement.",
  },
};
