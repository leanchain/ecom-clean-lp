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
 *   backend/scripts/marketing/category_benchmark_emit.py : emits these entries
 * Re-run those to refresh; never edit a number here by hand, and never add an
 * entry that did not come from a real run.
 *
 * HARD RULES (same as `gap-track-figure.tsx`):
 *   1. Real completed runs only. No invented, rounded-up, or filled-in values.
 *   2. Every figure states its question, date, engines, and denominator.
 *   3. An engine with no completed answer is excluded, never shown as zero.
 *   4. Report what was observed. Never editorialise about a named brand, and
 *      never imply an unnamed brand is inferior: only that it was not named.
 */

export type BenchmarkBrand = {
  /** Brand exactly as the assistant named it. */
  brand: string;
  /** How many of the engines below named this brand. */
  engines: number;
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

/**
 * Run-level totals. Percentages are computed from these, never stored
 * pre-rounded, so the arithmetic on the page is always checkable.
 */
export const BENCHMARK_RUN = {
  askedOn: "2026-08-19",
  engines: ["ChatGPT", "Gemini", "Google AI Mode"],
  /** Questions that produced at least one completed answer naming a brand. */
  questions: 15,
  /** Completed answers behind the whole run. */
  answersCompleted: 47,
  /** Distinct brand-per-question namings across the run. */
  namings: 153,
  /** Namings that appeared on exactly one of the three engines. */
  singleEngineOnly: 108,
  /** Namings that appeared on every engine that answered. */
  everyEngine: 17,
  /**
   * Disclosed rather than dropped: Perplexity had no API key configured, so it
   * was not asked at all. One ChatGPT probe timed out. "What are the best
   * running shoes under $150?" completed on two engines but neither named a
   * brand, so it carries no figure.
   */
  notMeasured:
    "Perplexity was not asked: no API key configured. One ChatGPT probe timed out. One question (running shoes under $150) completed without either engine naming a brand and is therefore not charted.",
} as const;

export const CATEGORY_BENCHMARKS: CategoryBenchmark[] = [
  {
    slug: "what-are-the-best-noise-cancelling-headphones-under-200",
    category: "Consumer tech",
    question: "What are the best noise cancelling headphones under $200?",
    askedOn: "2026-08-19",
    engines: ["ChatGPT", "Gemini", "Google AI Mode"],
    brands: [
      { brand: "Sony", engines: 2 },
      { brand: "JBL", engines: 1 },
      { brand: "Sennheiser", engines: 1 },
      { brand: "soundcore (Anker)", engines: 1 },
    ],
  },
  {
    slug: "which-robot-vacuum-should-i-buy-for-pet-hair",
    category: "Consumer tech",
    question: "Which robot vacuum should I buy for pet hair?",
    askedOn: "2026-08-19",
    engines: ["ChatGPT", "Gemini", "Google AI Mode"],
    brands: [
      { brand: "Roborock", engines: 3 },
      { brand: "Shark", engines: 3 },
      { brand: "iRobot", engines: 3 },
      { brand: "Dreame", engines: 2 },
      { brand: "Ecovacs", engines: 2 },
      { brand: "Neato", engines: 1 },
      { brand: "eufy (Anker)", engines: 1 },
    ],
  },
  {
    slug: "what-is-a-good-portable-monitor-for-travel",
    category: "Consumer tech",
    question: "What is a good portable monitor for travel?",
    askedOn: "2026-08-19",
    engines: ["ChatGPT", "Gemini", "Google AI Mode"],
    brands: [
      { brand: "ASUS", engines: 3 },
      { brand: "Lenovo", engines: 2 },
      { brand: "ViewSonic", engines: 2 },
      { brand: "AOC", engines: 1 },
      { brand: "Acer", engines: 1 },
      { brand: "Arzopa", engines: 1 },
      { brand: "Dell", engines: 1 },
      { brand: "LG", engines: 1 },
    ],
  },
  {
    slug: "best-budget-mechanical-keyboard-for-typing",
    category: "Consumer tech",
    question: "Best budget mechanical keyboard for typing?",
    askedOn: "2026-08-19",
    engines: ["ChatGPT", "Gemini", "Google AI Mode"],
    brands: [
      { brand: "Keychron", engines: 2 },
      { brand: "AKKO", engines: 1 },
      { brand: "ANNE PRO (Obinslab)", engines: 1 },
      { brand: "AULA", engines: 1 },
      { brand: "Ajazz", engines: 1 },
      { brand: "DURGOD", engines: 1 },
      { brand: "HAVIT", engines: 1 },
      { brand: "Redragon", engines: 1 },
      { brand: "Royal Kludge", engines: 1 },
      { brand: "Tecware", engines: 1 },
    ],
  },
  {
    slug: "what-is-the-best-creatine-supplement-to-buy",
    category: "Supplements",
    question: "What is the best creatine supplement to buy?",
    askedOn: "2026-08-19",
    engines: ["ChatGPT", "Gemini", "Google AI Mode"],
    brands: [
      { brand: "Transparent Labs", engines: 3 },
      { brand: "Nutricost", engines: 2 },
      { brand: "Optimum Nutrition", engines: 2 },
      { brand: "Thorne", engines: 2 },
      { brand: "BulkSupplements", engines: 1 },
      { brand: "Kaged Muscle", engines: 1 },
      { brand: "Legion Athletics", engines: 1 },
      { brand: "Momentous", engines: 1 },
      { brand: "MuscleTech", engines: 1 },
      { brand: "NAKED Nutrition (Naked Creatine)", engines: 1 },
      { brand: "Sports Research (Creapure®)", engines: 1 },
    ],
  },
  {
    slug: "which-magnesium-supplement-is-best-for-sleep",
    category: "Supplements",
    question: "Which magnesium supplement is best for sleep?",
    askedOn: "2026-08-19",
    engines: ["ChatGPT", "Gemini", "Google AI Mode"],
    brands: [
      { brand: "Pure Encapsulations", engines: 3 },
      { brand: "Thorne", engines: 3 },
      { brand: "Doctor's Best", engines: 2 },
      { brand: "Jarrow Formulas", engines: 1 },
      { brand: "Life Extension", engines: 1 },
      { brand: "NOW Foods", engines: 1 },
      { brand: "Natural Vitality", engines: 1 },
      { brand: "Natural Vitality (CALM Sleep)", engines: 1 },
      { brand: "Nature Made", engines: 1 },
    ],
  },
  {
    slug: "best-protein-powder-for-women-over-40",
    category: "Supplements",
    question: "Best protein powder for women over 40?",
    askedOn: "2026-08-19",
    engines: ["ChatGPT", "Gemini", "Google AI Mode"],
    brands: [
      { brand: "Naked Nutrition", engines: 2 },
      { brand: "Optimum Nutrition", engines: 2 },
      { brand: "Orgain", engines: 2 },
      { brand: "Ritual", engines: 2 },
      { brand: "Anthony's Goods", engines: 1 },
      { brand: "Garden of Life", engines: 1 },
      { brand: "KOS", engines: 1 },
      { brand: "Natural Force", engines: 1 },
      { brand: "OWYN", engines: 1 },
      { brand: "Transparent Labs", engines: 1 },
      { brand: "Vega", engines: 1 },
      { brand: "Vital Proteins", engines: 1 },
    ],
  },
  {
    slug: "what-electrolyte-drink-is-best-for-runners",
    category: "Supplements",
    question: "What electrolyte drink is best for runners?",
    askedOn: "2026-08-19",
    engines: ["ChatGPT", "Gemini", "Google AI Mode"],
    brands: [
      { brand: "LMNT", engines: 3 },
      { brand: "Nuun", engines: 3 },
      { brand: "Skratch Labs", engines: 3 },
      { brand: "Liquid I.V.", engines: 2 },
      { brand: "GU Energy Labs", engines: 1 },
      { brand: "Gatorade (Endurance)", engines: 1 },
      { brand: "Pedialyte", engines: 1 },
      { brand: "SOS Hydration", engines: 1 },
      { brand: "SaltStick", engines: 1 },
      { brand: "Tailwind Nutrition", engines: 1 },
      { brand: "Ultima Replenisher", engines: 1 },
    ],
  },
  {
    slug: "which-merino-wool-base-layer-should-i-buy-for-winter-hiking",
    category: "Apparel & footwear",
    question: "Which merino wool base layer should I buy for winter hiking?",
    askedOn: "2026-08-19",
    engines: ["ChatGPT", "Gemini", "Google AI Mode"],
    brands: [
      { brand: "Icebreaker", engines: 2 },
      { brand: "Smartwool", engines: 2 },
      { brand: "Black Diamond", engines: 1 },
      { brand: "Ibex", engines: 1 },
      { brand: "Minus33", engines: 1 },
      { brand: "Ortovox", engines: 1 },
      { brand: "Unbound Merino", engines: 1 },
      { brand: "Woolx", engines: 1 },
    ],
  },
  {
    slug: "best-waterproof-rain-jacket-for-commuting",
    category: "Apparel & footwear",
    question: "Best waterproof rain jacket for commuting?",
    askedOn: "2026-08-19",
    engines: ["ChatGPT", "Gemini", "Google AI Mode"],
    brands: [
      { brand: "Patagonia", engines: 3 },
      { brand: "REI Co-op", engines: 3 },
      { brand: "Showers Pass", engines: 2 },
      { brand: "Arc'teryx", engines: 1 },
      { brand: "Chrome Industries", engines: 1 },
      { brand: "Marmot", engines: 1 },
      { brand: "Mountain Hardwear", engines: 1 },
      { brand: "POC", engines: 1 },
      { brand: "Rains", engines: 1 },
      { brand: "Rapha", engines: 1 },
    ],
  },
  {
    slug: "what-are-good-everyday-sneakers-for-wide-feet",
    category: "Apparel & footwear",
    question: "What are good everyday sneakers for wide feet?",
    askedOn: "2026-08-19",
    engines: ["ChatGPT", "Gemini", "Google AI Mode"],
    brands: [
      { brand: "Brooks", engines: 3 },
      { brand: "New Balance", engines: 3 },
      { brand: "Nike", engines: 3 },
      { brand: "Altra", engines: 2 },
      { brand: "HOKA", engines: 2 },
      { brand: "ASICS", engines: 1 },
      { brand: "Hoka", engines: 1 },
      { brand: "Saucony", engines: 1 },
      { brand: "Skechers", engines: 1 },
    ],
  },
  {
    slug: "what-is-the-best-olive-oil-to-buy-for-cooking",
    category: "Food & drink",
    question: "What is the best olive oil to buy for cooking?",
    askedOn: "2026-08-19",
    engines: ["ChatGPT", "Gemini", "Google AI Mode"],
    brands: [
      { brand: "California Olive Ranch", engines: 2 },
      { brand: "Graza", engines: 2 },
      { brand: "Bertolli", engines: 1 },
      { brand: "Cobram Estate", engines: 1 },
      { brand: "Colavita", engines: 1 },
      { brand: "Filippo Berio", engines: 1 },
      { brand: "Kirkland Signature (Costco)", engines: 1 },
      { brand: "La Tourangelle", engines: 1 },
      { brand: "Lucini", engines: 1 },
      { brand: "Lucini Italia", engines: 1 },
      { brand: "O-Live & Co.", engines: 1 },
      { brand: "Partanna", engines: 1 },
      { brand: "Pompeian", engines: 1 },
    ],
  },
  {
    slug: "which-coffee-beans-should-i-buy-for-espresso-at-home",
    category: "Food & drink",
    question: "Which coffee beans should I buy for espresso at home?",
    askedOn: "2026-08-19",
    engines: ["ChatGPT", "Gemini", "Google AI Mode"],
    brands: [
      { brand: "Lavazza", engines: 3 },
      { brand: "Intelligentsia", engines: 2 },
      { brand: "Blue Bottle", engines: 1 },
      { brand: "Blue Bottle Coffee", engines: 1 },
      { brand: "Counter Culture", engines: 1 },
      { brand: "Death Wish", engines: 1 },
      { brand: "Kicking Horse", engines: 1 },
      { brand: "Peet's", engines: 1 },
      { brand: "Starbucks", engines: 1 },
      { brand: "Stumptown", engines: 1 },
      { brand: "Stumptown Coffee Roasters", engines: 1 },
      { brand: "Verve Coffee Roasters", engines: 1 },
      { brand: "illy", engines: 1 },
    ],
  },
  {
    slug: "what-is-a-good-protein-bar-that-actually-tastes-good",
    category: "Food & drink",
    question: "What is a good protein bar that actually tastes good?",
    askedOn: "2026-08-19",
    engines: ["ChatGPT", "Gemini", "Google AI Mode"],
    brands: [
      { brand: "Barebells", engines: 3 },
      { brand: "ALOHA", engines: 2 },
      { brand: "BUILT", engines: 1 },
      { brand: "CLIF BUILDER'S", engines: 1 },
      { brand: "FULFIL", engines: 1 },
      { brand: "GHOST", engines: 1 },
      { brand: "Grenade (Carb Killa)", engines: 1 },
      { brand: "KIND", engines: 1 },
      { brand: "No Cow", engines: 1 },
      { brand: "ONE Brands", engines: 1 },
      { brand: "Pure Protein", engines: 1 },
      { brand: "Quest Nutrition", engines: 1 },
      { brand: "RXBAR", engines: 1 },
    ],
  },
  {
    slug: "best-hot-sauce-gift-set",
    category: "Food & drink",
    question: "Best hot sauce gift set?",
    askedOn: "2026-08-19",
    engines: ["ChatGPT", "Gemini", "Google AI Mode"],
    brands: [
      { brand: "Chilli No. 5", engines: 2 },
      { brand: "Cholula", engines: 2 },
      { brand: "TRUFF", engines: 2 },
      { brand: "Yellowbird", engines: 2 },
      { brand: "Elijah's Xtreme", engines: 1 },
      { brand: "HEATONIST", engines: 1 },
      { brand: "Hot Ones", engines: 1 },
      { brand: "Hot Ones (Heatonist)", engines: 1 },
      { brand: "Independent", engines: 1 },
      { brand: "Kiri & Sons", engines: 1 },
      { brand: "Man Crates", engines: 1 },
      { brand: "Melinda's", engines: 1 },
      { brand: "The Good Hurt (Thoughtfully)", engines: 1 },
      { brand: "Thoughtfully", engines: 1 },
      { brand: "Thoughtfully (Smokehouse)", engines: 1 },
    ],
  },
];
