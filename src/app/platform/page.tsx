import MarketingDetailPage from "@/components/beseam/marketing-detail-page";
import { getMarketingMetadata, getMarketingPage } from "@/lib/marketing-pages";

const page = getMarketingPage("platform");

export const metadata = getMarketingMetadata(page);

export default function PlatformPage() {
  return <MarketingDetailPage page={page} />;
}
