import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { FIELD_PROBLEMS } from "@/lib/commerce-fieldbook";

export const metadata: Metadata = {
  title: { absolute: "Ecommerce Problems | Beseam Commerce Fieldbook" },
  description: "Evidence-first investigation paths for common ecommerce, discovery, catalog, purchase, and measurement problems.",
  alternates: { canonical: "/resources/problems" },
};

export default function ProblemsIndexPage() {
  return <div className="bg-[var(--beseam-surface)] text-[var(--beseam-ink)]"><section className="border-b border-black/18"><div className="mx-auto max-w-[92rem] px-5 py-20 sm:px-8 lg:px-10"><Link href="/resources" className="font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--beseam-accent)]">Commerce Fieldbook / Problems</Link><h1 className="mt-7 max-w-[11ch] font-serif text-[clamp(3.2rem,5.2vw,5.4rem)] leading-[0.98] tracking-[-0.05em]">Start with what your team can actually observe.</h1><p className="mt-7 max-w-2xl text-[18px] leading-relaxed text-black/64">Each problem page separates symptoms, evidence, first moves, reusable skills, and supporting projects before it proposes a conclusion.</p></div></section><section><div className="mx-auto max-w-[92rem] px-5 py-16 sm:px-8 lg:px-10"><div className="border-t border-black/22">{FIELD_PROBLEMS.map((problem, index) => <Link key={problem.slug} href={`/resources/problems/${problem.slug}`} className="group grid gap-4 border-b border-black/18 py-7 md:grid-cols-[3rem_12rem_minmax(0,1fr)_auto] md:gap-8"><span className="font-mono text-[10px] text-black/36">{String(index + 1).padStart(2, "0")}</span><div><p className="font-mono text-[9px] uppercase tracking-[0.1em] text-[var(--beseam-accent)]">{problem.category}</p><h2 className="mt-2 text-[18px] font-semibold">{problem.title}</h2></div><p className="max-w-2xl text-[14px] leading-relaxed text-black/58">{problem.summary}</p><ArrowRight className="h-4 w-4 text-[var(--beseam-accent)] transition-transform group-hover:translate-x-0.5" /></Link>)}</div></div></section></div>;
}
