import { PUBLIC_AI_SHOPPING_DATASET } from "@/lib/public-ai-shopping-data";

export const dynamic = "force-static";

export function GET() {
  return Response.json(PUBLIC_AI_SHOPPING_DATASET, {
    headers: {
      "Cache-Control": "public, max-age=3600",
      "Content-Disposition": 'inline; filename="beseam-ai-shopping-data.json"',
    },
  });
}
