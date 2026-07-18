import MarketingDetailPage from "@/components/beseam/marketing-detail-page";
import { getMarketingMetadata, getMarketingPage } from "@/lib/marketing-pages";

const page = getMarketingPage("monitoring-coverage");

export const metadata = getMarketingMetadata(page);

export default function MonitoringCoveragePage() {
  return <MarketingDetailPage page={page} />;
}
