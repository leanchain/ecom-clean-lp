import MarketingDetailPage from "@/components/beseam/marketing-detail-page";
import { getMarketingMetadata, getMarketingPage } from "@/lib/marketing-pages";

const page = getMarketingPage("ai-visibility-monitoring");

export const metadata = getMarketingMetadata(page);

export default function AiVisibilityMonitoringPage() {
  return <MarketingDetailPage page={page} />;
}
