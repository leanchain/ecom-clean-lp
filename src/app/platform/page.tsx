import PlatformPageContent from "@/components/beseam/platform-page";
import { getMarketingMetadata, getMarketingPage } from "@/lib/marketing-pages";

const page = getMarketingPage("platform");

export const metadata = getMarketingMetadata(page);

export default function PlatformPage() {
  return <PlatformPageContent page={page} />;
}
