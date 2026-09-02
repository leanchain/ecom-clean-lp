import { buildPublicAiShoppingCsv } from "@/lib/public-ai-shopping-data";

export const dynamic = "force-static";

export function GET() {
  return new Response(buildPublicAiShoppingCsv(), {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
      "Content-Disposition": 'attachment; filename="beseam-ai-shopping-data.csv"',
    },
  });
}
