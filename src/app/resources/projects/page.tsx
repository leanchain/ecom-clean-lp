import type { Metadata } from "next";
import Link from "next/link";

import ResourceIndex from "@/components/beseam/resource-index";
import { ECOSYSTEM_RESOURCES, FIELD_REVIEW_DATE, RESOURCE_CATEGORIES } from "@/lib/commerce-fieldbook";

export const metadata: Metadata = {
  title: { absolute: "Open-source Projects and References | Beseam Commerce Fieldbook" },
  description: "A reviewed index of agent skills, commerce platforms, standards, primary documentation, testing tools, and operational references.",
  alternates: { canonical: "/resources/projects" },
};

export default function ProjectsPage() {
  return (
    <div className="bg-[var(--beseam-surface)] text-[var(--beseam-ink)]">
      <section className="border-b border-black/18">
        <div className="mx-auto max-w-[92rem] px-5 py-20 sm:px-8 lg:px-10">
          <Link href="/resources" className="font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--beseam-accent)]">Commerce Fieldbook / Projects and references</Link>
          <div className="mt-7 grid gap-10 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:items-end lg:gap-20">
            <h1 className="max-w-[11ch] font-serif text-[clamp(3.2rem,5.2vw,5.4rem)] leading-[0.98] tracking-[-0.05em]">The wider ecosystem behind better commerce operations.</h1>
            <div>
              <p className="max-w-2xl text-[18px] leading-relaxed text-black/64">This bootstrap includes {ECOSYSTEM_RESOURCES.length} reviewed resources across {RESOURCE_CATEGORIES.length} operational categories. Every entry names its maintainer, license or usage boundary, maturity, and practical reason for inclusion.</p>
              <p className="mt-5 text-[13px] leading-relaxed text-black/48">Beseam curates the index; it does not repackage external work as its own. Inclusion does not imply endorsement. Emerging and experimental resources are labeled so they are not mistaken for settled standards.</p>
              <p className="mt-4 font-mono text-[9px] uppercase tracking-[0.09em] text-[var(--beseam-accent)]">Catalog review date · {FIELD_REVIEW_DATE}</p>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="mx-auto max-w-[92rem] px-5 py-12 sm:px-8 sm:py-16 lg:px-10">
          <ResourceIndex resources={ECOSYSTEM_RESOURCES} />
        </div>
      </section>
    </div>
  );
}
