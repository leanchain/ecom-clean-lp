/**
 * Category benchmarks: what AI assistants actually answered for real shopper
 * questions in high-volume categories.
 *
 * OBSERVATIONS OF PUBLIC BRANDS, not customer data. No merchant permission is
 * involved and no customer store is identified, which is why this can ship
 * before there is a single case study.
 *
 * GENERATED, NOT HAND-WRITTEN. Every entry below comes from a completed run of
 * the same connectors the product uses:
 *   backend/scripts/marketing/category_benchmark_run.py  : asks the engines
 *   backend/scripts/marketing/category_benchmark_emit.py : emits this file
 * Re-run those to refresh; never edit a number here by hand, and never add an
 * entry that did not come from a real run.
 *
 * HARD RULES (same as `gap-track-figure.tsx`):
 *   1. Real completed runs only. No invented, rounded-up, or filled-in values.
 *   2. Every figure states its question, date, engines, and denominator.
 *   3. An engine with no completed answer is excluded, never shown as zero. An
 *      engine that answered and named nothing keeps its column and reads empty.
 *   4. Report what was observed. Never editorialise about a named brand, and
 *      never imply an unnamed brand is inferior: only that it was not named.
 */

export type BenchmarkBrand = {
  /** Brand exactly as the assistant named it. */
  brand: string;
  /** Engines that named this brand, in the figure's column order. */
  namedBy: string[];
};

export type CategoryBenchmark = {
  slug: string;
  /** High-volume category this question sits in. */
  category: string;
  /** The shopper question, verbatim as it was asked. */
  question: string;
  /** ISO date the run completed. */
  askedOn: string;
  /** Engines that returned a completed answer: the denominator. */
  engines: string[];
  /** Brands named, most engines first. */
  brands: BenchmarkBrand[];
};

/** How one engine behaved across every charted question. */
export type BenchmarkEngine = {
  engine: string;
  /** Charted questions this engine returned a completed answer for. */
  answers: number;
  /** Brand namings across those answers. */
  namings: number;
  /** Namings no other engine repeated on the same question. */
  soleNamings: number;
  /** Completed answers that named no brand at all. */
  silentAnswers: number;
};

/**
 * Run-level totals over the charted questions. Percentages are computed from
 * these on the page, never stored pre-rounded, so the arithmetic is checkable.
 */
export const BENCHMARK_RUN = {
  askedOn: "2026-08-19",
  engines: ["ChatGPT", "Gemini", "Google AI Mode"],
  /** Questions that produced at least one completed answer naming a brand. */
  questions: 15,
  /** Completed answers behind those questions. */
  answersCompleted: 45,
  /** Distinct brand-per-question namings across the run. */
  namings: 153,
  /** Namings that appeared on exactly one engine. */
  singleEngineOnly: 108,
  /** Namings that two engines agreed on. */
  twoEngines: 28,
  /** Namings that appeared on every engine that answered. */
  everyEngine: 17,
} as const;

/** One row per engine, over the same charted questions. */
export const BENCHMARK_ENGINES: BenchmarkEngine[] = [
  {
    engine: "ChatGPT",
    answers: 15,
    namings: 125,
    soleNamings: 84,
    silentAnswers: 0,
  },
  {
    engine: "Gemini",
    answers: 15,
    namings: 41,
    soleNamings: 9,
    silentAnswers: 2,
  },
  {
    engine: "Google AI Mode",
    answers: 15,
    namings: 49,
    soleNamings: 15,
    silentAnswers: 3,
  },
];

export const CATEGORY_BENCHMARKS: CategoryBenchmark[] = [
  {
    slug: "what-are-the-best-noise-cancelling-headphones-under-200",
    category: "Consumer tech",
    question: "What are the best noise cancelling headphones under $200?",
    askedOn: "2026-08-19",
    engines: ["ChatGPT", "Gemini", "Google AI Mode"],
    brands: [
      { brand: "Sony", namedBy: ["ChatGPT", "Google AI Mode"] },
      { brand: "JBL", namedBy: ["ChatGPT"] },
      { brand: "Sennheiser", namedBy: ["ChatGPT"] },
      { brand: "soundcore (Anker)", namedBy: ["ChatGPT"] },
    ],
  },
  {
    slug: "which-robot-vacuum-should-i-buy-for-pet-hair",
    category: "Consumer tech",
    question: "Which robot vacuum should I buy for pet hair?",
    askedOn: "2026-08-19",
    engines: ["ChatGPT", "Gemini", "Google AI Mode"],
    brands: [
      { brand: "Roborock", namedBy: ["ChatGPT", "Gemini", "Google AI Mode"] },
      { brand: "Shark", namedBy: ["ChatGPT", "Gemini", "Google AI Mode"] },
      { brand: "iRobot", namedBy: ["ChatGPT", "Gemini", "Google AI Mode"] },
      { brand: "Dreame", namedBy: ["ChatGPT", "Gemini"] },
      { brand: "Ecovacs", namedBy: ["ChatGPT", "Gemini"] },
      { brand: "Neato", namedBy: ["ChatGPT"] },
      { brand: "eufy (Anker)", namedBy: ["ChatGPT"] },
    ],
  },
  {
    slug: "what-is-a-good-portable-monitor-for-travel",
    category: "Consumer tech",
    question: "What is a good portable monitor for travel?",
    askedOn: "2026-08-19",
    engines: ["ChatGPT", "Gemini", "Google AI Mode"],
    brands: [
      { brand: "ASUS", namedBy: ["ChatGPT", "Gemini", "Google AI Mode"] },
      { brand: "Lenovo", namedBy: ["ChatGPT", "Google AI Mode"] },
      { brand: "ViewSonic", namedBy: ["ChatGPT", "Google AI Mode"] },
      { brand: "AOC", namedBy: ["ChatGPT"] },
      { brand: "Acer", namedBy: ["ChatGPT"] },
      { brand: "Arzopa", namedBy: ["Google AI Mode"] },
      { brand: "Dell", namedBy: ["ChatGPT"] },
      { brand: "LG", namedBy: ["Google AI Mode"] },
    ],
  },
  {
    slug: "best-budget-mechanical-keyboard-for-typing",
    category: "Consumer tech",
    question: "Best budget mechanical keyboard for typing?",
    askedOn: "2026-08-19",
    engines: ["ChatGPT", "Gemini", "Google AI Mode"],
    brands: [
      { brand: "Keychron", namedBy: ["ChatGPT", "Gemini"] },
      { brand: "AKKO", namedBy: ["ChatGPT"] },
      { brand: "ANNE PRO (Obinslab)", namedBy: ["ChatGPT"] },
      { brand: "AULA", namedBy: ["Gemini"] },
      { brand: "Ajazz", namedBy: ["Gemini"] },
      { brand: "DURGOD", namedBy: ["ChatGPT"] },
      { brand: "HAVIT", namedBy: ["ChatGPT"] },
      { brand: "Redragon", namedBy: ["ChatGPT"] },
      { brand: "Royal Kludge", namedBy: ["ChatGPT"] },
      { brand: "Tecware", namedBy: ["ChatGPT"] },
    ],
  },
  {
    slug: "what-is-the-best-creatine-supplement-to-buy",
    category: "Supplements",
    question: "What is the best creatine supplement to buy?",
    askedOn: "2026-08-19",
    engines: ["ChatGPT", "Gemini", "Google AI Mode"],
    brands: [
      {
        brand: "Transparent Labs",
        namedBy: ["ChatGPT", "Gemini", "Google AI Mode"],
      },
      { brand: "Nutricost", namedBy: ["ChatGPT", "Google AI Mode"] },
      { brand: "Optimum Nutrition", namedBy: ["ChatGPT", "Google AI Mode"] },
      { brand: "Thorne", namedBy: ["ChatGPT", "Google AI Mode"] },
      { brand: "BulkSupplements", namedBy: ["ChatGPT"] },
      { brand: "Kaged Muscle", namedBy: ["ChatGPT"] },
      { brand: "Legion Athletics", namedBy: ["ChatGPT"] },
      { brand: "Momentous", namedBy: ["ChatGPT"] },
      { brand: "MuscleTech", namedBy: ["ChatGPT"] },
      { brand: "NAKED Nutrition (Naked Creatine)", namedBy: ["ChatGPT"] },
      { brand: "Sports Research (Creapure®)", namedBy: ["ChatGPT"] },
    ],
  },
  {
    slug: "which-magnesium-supplement-is-best-for-sleep",
    category: "Supplements",
    question: "Which magnesium supplement is best for sleep?",
    askedOn: "2026-08-19",
    engines: ["ChatGPT", "Gemini", "Google AI Mode"],
    brands: [
      {
        brand: "Pure Encapsulations",
        namedBy: ["ChatGPT", "Gemini", "Google AI Mode"],
      },
      { brand: "Thorne", namedBy: ["ChatGPT", "Gemini", "Google AI Mode"] },
      { brand: "Doctor's Best", namedBy: ["ChatGPT", "Google AI Mode"] },
      { brand: "Jarrow Formulas", namedBy: ["ChatGPT"] },
      { brand: "Life Extension", namedBy: ["ChatGPT"] },
      { brand: "NOW Foods", namedBy: ["ChatGPT"] },
      { brand: "Natural Vitality", namedBy: ["Google AI Mode"] },
      { brand: "Natural Vitality (CALM Sleep)", namedBy: ["ChatGPT"] },
      { brand: "Nature Made", namedBy: ["ChatGPT"] },
    ],
  },
  {
    slug: "best-protein-powder-for-women-over-40",
    category: "Supplements",
    question: "Best protein powder for women over 40?",
    askedOn: "2026-08-19",
    engines: ["ChatGPT", "Gemini", "Google AI Mode"],
    brands: [
      { brand: "Naked Nutrition", namedBy: ["ChatGPT", "Gemini"] },
      { brand: "Optimum Nutrition", namedBy: ["ChatGPT", "Gemini"] },
      { brand: "Orgain", namedBy: ["ChatGPT", "Gemini"] },
      { brand: "Ritual", namedBy: ["ChatGPT", "Gemini"] },
      { brand: "Anthony's Goods", namedBy: ["ChatGPT"] },
      { brand: "Garden of Life", namedBy: ["ChatGPT"] },
      { brand: "KOS", namedBy: ["ChatGPT"] },
      { brand: "Natural Force", namedBy: ["ChatGPT"] },
      { brand: "OWYN", namedBy: ["ChatGPT"] },
      { brand: "Transparent Labs", namedBy: ["Gemini"] },
      { brand: "Vega", namedBy: ["ChatGPT"] },
      { brand: "Vital Proteins", namedBy: ["ChatGPT"] },
    ],
  },
  {
    slug: "what-electrolyte-drink-is-best-for-runners",
    category: "Supplements",
    question: "What electrolyte drink is best for runners?",
    askedOn: "2026-08-19",
    engines: ["ChatGPT", "Gemini", "Google AI Mode"],
    brands: [
      { brand: "LMNT", namedBy: ["ChatGPT", "Gemini", "Google AI Mode"] },
      { brand: "Nuun", namedBy: ["ChatGPT", "Gemini", "Google AI Mode"] },
      {
        brand: "Skratch Labs",
        namedBy: ["ChatGPT", "Gemini", "Google AI Mode"],
      },
      { brand: "Liquid I.V.", namedBy: ["ChatGPT", "Gemini"] },
      { brand: "GU Energy Labs", namedBy: ["ChatGPT"] },
      { brand: "Gatorade (Endurance)", namedBy: ["ChatGPT"] },
      { brand: "Pedialyte", namedBy: ["ChatGPT"] },
      { brand: "SOS Hydration", namedBy: ["ChatGPT"] },
      { brand: "SaltStick", namedBy: ["Gemini"] },
      { brand: "Tailwind Nutrition", namedBy: ["ChatGPT"] },
      { brand: "Ultima Replenisher", namedBy: ["ChatGPT"] },
    ],
  },
  {
    slug: "which-merino-wool-base-layer-should-i-buy-for-winter-hiking",
    category: "Apparel & footwear",
    question: "Which merino wool base layer should I buy for winter hiking?",
    askedOn: "2026-08-19",
    engines: ["ChatGPT", "Gemini", "Google AI Mode"],
    brands: [
      { brand: "Icebreaker", namedBy: ["ChatGPT", "Gemini"] },
      { brand: "Smartwool", namedBy: ["ChatGPT", "Gemini"] },
      { brand: "Black Diamond", namedBy: ["Gemini"] },
      { brand: "Ibex", namedBy: ["Gemini"] },
      { brand: "Minus33", namedBy: ["ChatGPT"] },
      { brand: "Ortovox", namedBy: ["ChatGPT"] },
      { brand: "Unbound Merino", namedBy: ["ChatGPT"] },
      { brand: "Woolx", namedBy: ["ChatGPT"] },
    ],
  },
  {
    slug: "best-waterproof-rain-jacket-for-commuting",
    category: "Apparel & footwear",
    question: "Best waterproof rain jacket for commuting?",
    askedOn: "2026-08-19",
    engines: ["ChatGPT", "Gemini", "Google AI Mode"],
    brands: [
      { brand: "Patagonia", namedBy: ["ChatGPT", "Gemini", "Google AI Mode"] },
      { brand: "REI Co-op", namedBy: ["ChatGPT", "Gemini", "Google AI Mode"] },
      { brand: "Showers Pass", namedBy: ["Gemini", "Google AI Mode"] },
      { brand: "Arc'teryx", namedBy: ["ChatGPT"] },
      { brand: "Chrome Industries", namedBy: ["Gemini"] },
      { brand: "Marmot", namedBy: ["ChatGPT"] },
      { brand: "Mountain Hardwear", namedBy: ["Google AI Mode"] },
      { brand: "POC", namedBy: ["Google AI Mode"] },
      { brand: "Rains", namedBy: ["ChatGPT"] },
      { brand: "Rapha", namedBy: ["Gemini"] },
    ],
  },
  {
    slug: "what-are-good-everyday-sneakers-for-wide-feet",
    category: "Apparel & footwear",
    question: "What are good everyday sneakers for wide feet?",
    askedOn: "2026-08-19",
    engines: ["ChatGPT", "Gemini", "Google AI Mode"],
    brands: [
      { brand: "Brooks", namedBy: ["ChatGPT", "Gemini", "Google AI Mode"] },
      {
        brand: "New Balance",
        namedBy: ["ChatGPT", "Gemini", "Google AI Mode"],
      },
      { brand: "Nike", namedBy: ["ChatGPT", "Gemini", "Google AI Mode"] },
      { brand: "Altra", namedBy: ["ChatGPT", "Google AI Mode"] },
      { brand: "HOKA", namedBy: ["ChatGPT", "Gemini"] },
      { brand: "ASICS", namedBy: ["ChatGPT"] },
      { brand: "Hoka", namedBy: ["Google AI Mode"] },
      { brand: "Saucony", namedBy: ["ChatGPT"] },
      { brand: "Skechers", namedBy: ["ChatGPT"] },
    ],
  },
  {
    slug: "what-is-the-best-olive-oil-to-buy-for-cooking",
    category: "Food & drink",
    question: "What is the best olive oil to buy for cooking?",
    askedOn: "2026-08-19",
    engines: ["ChatGPT", "Gemini", "Google AI Mode"],
    brands: [
      {
        brand: "California Olive Ranch",
        namedBy: ["ChatGPT", "Google AI Mode"],
      },
      { brand: "Graza", namedBy: ["ChatGPT", "Google AI Mode"] },
      { brand: "Bertolli", namedBy: ["ChatGPT"] },
      { brand: "Cobram Estate", namedBy: ["Google AI Mode"] },
      { brand: "Colavita", namedBy: ["ChatGPT"] },
      { brand: "Filippo Berio", namedBy: ["ChatGPT"] },
      { brand: "Kirkland Signature (Costco)", namedBy: ["ChatGPT"] },
      { brand: "La Tourangelle", namedBy: ["ChatGPT"] },
      { brand: "Lucini", namedBy: ["ChatGPT"] },
      { brand: "Lucini Italia", namedBy: ["Google AI Mode"] },
      { brand: "O-Live & Co.", namedBy: ["ChatGPT"] },
      { brand: "Partanna", namedBy: ["Google AI Mode"] },
      { brand: "Pompeian", namedBy: ["ChatGPT"] },
    ],
  },
  {
    slug: "which-coffee-beans-should-i-buy-for-espresso-at-home",
    category: "Food & drink",
    question: "Which coffee beans should I buy for espresso at home?",
    askedOn: "2026-08-19",
    engines: ["ChatGPT", "Gemini", "Google AI Mode"],
    brands: [
      { brand: "Lavazza", namedBy: ["ChatGPT", "Gemini", "Google AI Mode"] },
      { brand: "Intelligentsia", namedBy: ["ChatGPT", "Google AI Mode"] },
      { brand: "Blue Bottle", namedBy: ["ChatGPT"] },
      { brand: "Blue Bottle Coffee", namedBy: ["Google AI Mode"] },
      { brand: "Counter Culture", namedBy: ["ChatGPT"] },
      { brand: "Death Wish", namedBy: ["ChatGPT"] },
      { brand: "Kicking Horse", namedBy: ["ChatGPT"] },
      { brand: "Peet's", namedBy: ["ChatGPT"] },
      { brand: "Starbucks", namedBy: ["ChatGPT"] },
      { brand: "Stumptown", namedBy: ["ChatGPT"] },
      { brand: "Stumptown Coffee Roasters", namedBy: ["Google AI Mode"] },
      { brand: "Verve Coffee Roasters", namedBy: ["ChatGPT"] },
      { brand: "illy", namedBy: ["ChatGPT"] },
    ],
  },
  {
    slug: "what-is-a-good-protein-bar-that-actually-tastes-good",
    category: "Food & drink",
    question: "What is a good protein bar that actually tastes good?",
    askedOn: "2026-08-19",
    engines: ["ChatGPT", "Gemini", "Google AI Mode"],
    brands: [
      { brand: "Barebells", namedBy: ["ChatGPT", "Gemini", "Google AI Mode"] },
      { brand: "ALOHA", namedBy: ["ChatGPT", "Google AI Mode"] },
      { brand: "BUILT", namedBy: ["ChatGPT"] },
      { brand: "CLIF BUILDER'S", namedBy: ["ChatGPT"] },
      { brand: "FULFIL", namedBy: ["Google AI Mode"] },
      { brand: "GHOST", namedBy: ["ChatGPT"] },
      { brand: "Grenade (Carb Killa)", namedBy: ["ChatGPT"] },
      { brand: "KIND", namedBy: ["ChatGPT"] },
      { brand: "No Cow", namedBy: ["ChatGPT"] },
      { brand: "ONE Brands", namedBy: ["ChatGPT"] },
      { brand: "Pure Protein", namedBy: ["ChatGPT"] },
      { brand: "Quest Nutrition", namedBy: ["ChatGPT"] },
      { brand: "RXBAR", namedBy: ["ChatGPT"] },
    ],
  },
  {
    slug: "best-hot-sauce-gift-set",
    category: "Food & drink",
    question: "Best hot sauce gift set?",
    askedOn: "2026-08-19",
    engines: ["ChatGPT", "Gemini", "Google AI Mode"],
    brands: [
      { brand: "Chilli No. 5", namedBy: ["Gemini", "Google AI Mode"] },
      { brand: "Cholula", namedBy: ["ChatGPT", "Google AI Mode"] },
      { brand: "TRUFF", namedBy: ["Gemini", "Google AI Mode"] },
      { brand: "Yellowbird", namedBy: ["Gemini", "Google AI Mode"] },
      { brand: "Elijah's Xtreme", namedBy: ["Google AI Mode"] },
      { brand: "HEATONIST", namedBy: ["Google AI Mode"] },
      { brand: "Hot Ones", namedBy: ["Gemini"] },
      { brand: "Hot Ones (Heatonist)", namedBy: ["ChatGPT"] },
      { brand: "Independent", namedBy: ["ChatGPT"] },
      { brand: "Kiri & Sons", namedBy: ["ChatGPT"] },
      { brand: "Man Crates", namedBy: ["ChatGPT"] },
      { brand: "Melinda's", namedBy: ["ChatGPT"] },
      { brand: "The Good Hurt (Thoughtfully)", namedBy: ["ChatGPT"] },
      { brand: "Thoughtfully", namedBy: ["Google AI Mode"] },
      { brand: "Thoughtfully (Smokehouse)", namedBy: ["ChatGPT"] },
    ],
  },
];
