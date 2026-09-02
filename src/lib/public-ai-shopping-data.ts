import {
  BENCHMARK_ENGINES,
  BENCHMARK_RUN,
  CATEGORY_BENCHMARKS,
} from "@/data/category-benchmarks";

export const PUBLIC_AI_SHOPPING_DATASET = {
  id: `ai-shopping-report-${BENCHMARK_RUN.askedOn}`,
  title: "Beseam AI Shopping Report data",
  description:
    "Public observations from real shopping questions asked across AI assistants, including which brands each assistant named.",
  observedOn: BENCHMARK_RUN.askedOn,
  source: "https://beseam.com/benchmarks",
  method: "https://beseam.com/benchmarks#method",
  run: BENCHMARK_RUN,
  engines: BENCHMARK_ENGINES,
  questions: CATEGORY_BENCHMARKS,
} as const;

export type PublicAiShoppingRow = {
  asked_on: string;
  category: string;
  question: string;
  engines_answered: string;
  brand: string;
  named_by: string;
  named_by_count: number;
};

export function getPublicAiShoppingRows(): PublicAiShoppingRow[] {
  return CATEGORY_BENCHMARKS.flatMap((benchmark) =>
    benchmark.brands.map((brand) => ({
      asked_on: benchmark.askedOn,
      category: benchmark.category,
      question: benchmark.question,
      engines_answered: benchmark.engines.join(" | "),
      brand: brand.brand,
      named_by: brand.namedBy.join(" | "),
      named_by_count: brand.namedBy.length,
    })),
  );
}

function csvCell(value: string | number) {
  const text = String(value);
  if (!/[",\n]/.test(text)) return text;
  return `"${text.replaceAll('"', '""')}"`;
}

export function buildPublicAiShoppingCsv() {
  const columns: Array<keyof PublicAiShoppingRow> = [
    "asked_on",
    "category",
    "question",
    "engines_answered",
    "brand",
    "named_by",
    "named_by_count",
  ];

  return [
    columns.join(","),
    ...getPublicAiShoppingRows().map((row) =>
      columns.map((column) => csvCell(row[column])).join(","),
    ),
  ].join("\n");
}
