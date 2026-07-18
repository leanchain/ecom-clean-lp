import MarketingDetailPage from "@/components/beseam/marketing-detail-page";
import { getMarketingMetadata, getMarketingPage } from "@/lib/marketing-pages";

const page = getMarketingPage("purchase-health");

export const metadata = getMarketingMetadata(page);

export default function PurchaseHealthPage() {
  return <MarketingDetailPage page={page} />;
}
