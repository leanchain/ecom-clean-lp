import MarketingDetailPage from "@/components/beseam/marketing-detail-page";
import { getMarketingMetadata, getMarketingPage } from "@/lib/marketing-pages";

const page = getMarketingPage("integrations/shopify");

export const metadata = getMarketingMetadata(page);

export default function ShopifyIntegrationPage() {
  return <MarketingDetailPage page={page} />;
}
