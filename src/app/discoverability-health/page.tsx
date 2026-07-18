import MarketingDetailPage from "@/components/beseam/marketing-detail-page";
import { getMarketingMetadata, getMarketingPage } from "@/lib/marketing-pages";

const page = getMarketingPage("discoverability-health");

export const metadata = getMarketingMetadata(page);

export default function DiscoverabilityHealthPage() {
  return <MarketingDetailPage page={page} />;
}
