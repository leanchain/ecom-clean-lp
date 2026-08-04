import Link from "next/link";

export default function AuditReportNav({
  domain,
  active,
}: {
  domain: string;
  active: "audit" | "brand-book";
}) {
  const items = [
    {
      key: "audit" as const,
      number: "01",
      label: "Assistant audit",
      href: `/audit-report?domain=${encodeURIComponent(domain)}`,
    },
    {
      key: "brand-book" as const,
      number: "02",
      label: "Brand evidence",
      href: `/audit-report/brand-book?domain=${encodeURIComponent(domain)}`,
    },
  ];

  return (
    <nav
      aria-label="Audit pages"
      className="mb-10 inline-grid grid-cols-2 border border-black/18 bg-black/18"
    >
      {items.map((item) => {
        const selected = active === item.key;
        return (
          <Link
            key={item.key}
            href={item.href}
            aria-current={selected ? "page" : undefined}
            className={`min-w-[9.5rem] px-4 py-3 text-left transition-colors sm:min-w-[12rem] ${
              selected
                ? "bg-[#111318] text-white"
                : "bg-white text-[#111318] hover:bg-black/[0.04]"
            }`}
          >
            <span
              className={`block font-mono text-[11px] ${selected ? "text-white/62" : "text-black/48"}`}
            >
              {item.number}
            </span>
            <span className="mt-1 block text-[13px] font-semibold">
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
