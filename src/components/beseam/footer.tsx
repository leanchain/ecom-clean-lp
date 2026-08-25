import Link from "next/link";

import Logo from "@/components/beseam/logo";

const FOOTER_GROUPS = [
  {
    label: "Product",
    links: [
      ["Platform", "/platform"],
      ["AI shopping discovery", "/ai-visibility-monitoring"],
      ["Compare", "/compare"],
    ],
  },
  {
    label: "Company",
    links: [
      ["How we work", "/how-we-work"],
      ["About", "/about"],
      ["Manifesto", "/manifesto"],
      ["Contact us", "/contact"],
    ],
  },
  {
    label: "Resources",
    links: [
      ["Resources", "/resources"],
      ["Benchmarks", "/benchmarks"],
    ],
  },
] as const;

export default function BeseamFooter() {
  return (
    <footer className="bg-ink-deep text-white">
      <div className="mx-auto max-w-[92rem] px-5 pb-8 pt-14 sm:px-8 sm:pt-16 lg:px-10">
        <div className="grid gap-12 border-b border-white/18 pb-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1.25fr)] lg:gap-20">
          <div>
            <Link href="/" aria-label="Beseam home" className="inline-flex">
              <Logo className="text-white" />
            </Link>
            <p className="mt-7 max-w-[20ch] font-display text-[34px] leading-[1.08] tracking-[-0.02em] text-white/92">
              Make products easier to find, choose, and buy.
            </p>
            <p className="mt-6 max-w-[54ch] text-[14px] leading-relaxed text-white/62">
              Observe what is happening, understand what may explain it, decide,
              act with control, and learn from what changes.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 sm:gap-x-10">
            {FOOTER_GROUPS.map((group) => (
              <nav key={group.label} aria-label={group.label}>
                <p className="text-[13px] font-semibold text-white">
                  {group.label}
                </p>
                <ul className="mt-5 space-y-3.5">
                  {group.links.map(([label, href]) => (
                    <li key={label}>
                      <Link
                        href={href}
                        className="inline-flex min-h-11 items-center text-[13px] text-white/62 transition-colors hover:text-white"
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-5 pt-8 text-[12px] text-white/52 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
            <p>© {new Date().getFullYear()} Beseam. All rights reserved.</p>
            <Link
              href="/privacy-policy"
              className="transition-colors hover:text-white"
            >
              Privacy
            </Link>
            <Link
              href="/terms-of-service"
              className="transition-colors hover:text-white"
            >
              Terms
            </Link>
            <Link href="/bot" className="transition-colors hover:text-white">
              BeseamBot
            </Link>
          </div>

          <p className="inline-flex items-center gap-2 sm:justify-end">
            <span>Made with love in Switzerland</span>
            <span
              aria-label="Swiss flag"
              role="img"
              className="relative inline-block h-4 w-4 shrink-0 bg-[#d52b1e]"
            >
              <span className="absolute left-1/2 top-[3px] h-[10px] w-[3px] -translate-x-1/2 bg-white" />
              <span className="absolute left-[3px] top-1/2 h-[3px] w-[10px] -translate-y-1/2 bg-white" />
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
