import Link from "next/link";
import { ArrowRight } from "lucide-react";

const APP_STORE_URL = "https://app.beseam.com/store";

export default function MobileStickyCta() {
  return (
    <div className="fixed inset-x-4 bottom-4 z-50 md:hidden">
      <Link
        href={APP_STORE_URL}
        className="flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary px-5 text-sm font-bold text-primary-foreground shadow-lg"
      >
        Scan my store
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
