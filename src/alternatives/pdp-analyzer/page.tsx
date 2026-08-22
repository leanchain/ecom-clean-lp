import type { Metadata } from "next";

import { PdpAnalyzer } from "@/components/pdp-analyzer";

export const metadata: Metadata = {
  title: "PDP Analyzer - AI Search Visibility Score",
  description:
    "Analyze your product detail page and get an AI search visibility score. See exactly which sections are missing and how to optimize for ChatGPT, Claude, and Perplexity.",
};

export default function PdpAnalyzerPage() {
  return <PdpAnalyzer />;
}
