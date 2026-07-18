import MarketingDetailPage from "@/components/beseam/marketing-detail-page";
import { getMarketingMetadata, getMarketingPage } from "@/lib/marketing-pages";

const page = getMarketingPage("shopify-store-health");

export const metadata = getMarketingMetadata(page);

export default function ShopifyStoreHealthPage() {
  return <MarketingDetailPage page={page} />;
}
