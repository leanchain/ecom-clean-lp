import Link from "next/link";
import { ArrowRight } from "lucide-react";

const APP_SCAN_URL = "https://app.beseam.com/scan";

export default function MobileStickyCta() {
  return (
    <div className="fixed inset-x-4 bottom-4 z-50 md:hidden">
      <Link
        href={APP_SCAN_URL}
        className="flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary px-5 text-sm font-bold text-primary-foreground shadow-lg"
      >
        Start Free AI Visibility Scan
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
