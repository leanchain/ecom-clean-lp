import Link from "next/link";

import TrackedLink from "@/components/beseam/tracked-link";
import NavbarLogo from "@/components/ui/navbar-logo";

const FOOTER_GROUPS = [
  {
    title: "Observe",
    links: [
      ["AI Visibility", "/ai-visibility-monitoring"],
      ["Behavior", "/#observe"],
      ["Reliability", "/#observe"],
    ],
  },
  {
    title: "Decide",
    links: [
      ["Foundation", "/#foundation"],
      ["Analytics", "/#advanced-intelligence"],
      ["Optimization", "/#advanced-intelligence"],
    ],
  },
  {
    title: "Act",
    links: [
      ["Commerce Readiness", "/shopify-store-health"],
      ["Advertising", "/#advertising"],
      ["Creative Studio", "/#creative-studio"],
    ],
  },
] as const;

export default function BeseamFooter() {
  return (
    <footer className="bg-[#111318] text-white">
      <div className="mx-auto max-w-[92rem] px-5 pb-8 pt-16 sm:px-8 sm:pt-20 lg:px-10">
        <div className="grid gap-12 border-b border-white/18 pb-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
          <div>
            <Link href="/" aria-label="Beseam home" className="inline-flex">
              <NavbarLogo className="text-white" />
            </Link>
            <p className="mt-7 max-w-md font-serif text-[31px] leading-[1.1] tracking-[-0.03em] text-white/92">
              Find the revenue leaks between your commerce systems.
            </p>
            <p className="mt-6 max-w-md text-[14px] leading-relaxed text-white/52">
              Beseam checks the storefront, catalog, customer behavior, AI discovery, and campaigns; ranks the issues; and verifies the result after your team acts.
            </p>
          </div>

          <div className="grid grid-cols-3 border-t border-white/18 lg:border-t-0">
            {FOOTER_GROUPS.map((group) => (
              <div key={group.title} className="border-r border-white/18 py-6 pr-4 last:border-r-0 last:pl-4 sm:px-6 sm:first:pl-0 sm:last:pr-0">
                <h2 className="font-serif text-[21px] text-white">{group.title}</h2>
                <ul className="mt-5 space-y-3">
                  {group.links.map(([label, href]) => (
                    <li key={label}>
                      <Link href={href} className="text-[12px] leading-relaxed text-white/48 transition-colors hover:text-[#8ea2ff] sm:text-[13px]">{label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-8 border-b border-white/18 py-8 sm:grid-cols-2 lg:grid-cols-[1fr_auto_auto_auto] lg:items-center lg:gap-10">
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-white/34">Beseam for ecommerce operators</p>
          <Link href="/about" className="text-[12px] text-white/48 hover:text-white">Company</Link>
          <Link href="/privacy-policy" className="text-[12px] text-white/48 hover:text-white">Privacy</Link>
          <Link href="/terms-of-service" className="text-[12px] text-white/48 hover:text-white">Terms</Link>
        </div>

        <div className="flex flex-col gap-4 pt-8 text-[11px] text-white/34 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Beseam. All rights reserved.</p>
          <TrackedLink href="/tools/ai-visibility-scan" eventName="scanner_tool_clicked" placement="footer_secondary" className="w-fit underline decoration-white/20 underline-offset-5 transition-colors hover:text-[#8ea2ff] hover:decoration-[#8ea2ff]">
            Check how AI assistants describe your brand
          </TrackedLink>
        </div>
      </div>
    </footer>
  );
}
