import MarketingDetailPage from "@/components/beseam/marketing-detail-page";
import { getMarketingMetadata, getMarketingPage } from "@/lib/marketing-pages";

const page = getMarketingPage("integrations/google-search-console");

export const metadata = getMarketingMetadata(page);

export default function GoogleSearchConsoleIntegrationPage() {
  return <MarketingDetailPage page={page} />;
}
