import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, FolderGit2, MessagesSquare, Wrench } from "lucide-react";

import { ECOSYSTEM_RESOURCES, FEATURED_RESOURCES, FIELD_PROBLEMS, FIELD_SKILLS, FIELD_TYPES } from "@/lib/commerce-fieldbook";

export const metadata: Metadata = {
  title: { absolute: "Commerce Fieldbook | Beseam" },
  description: "Practical ecommerce problems, reusable agent skills, open-source projects, standards, and evidence-first references curated by Beseam.",
  alternates: { canonical: "/resources" },
};

const ICONS = [BookOpen, Wrench, FolderGit2] as const;

export default function ResourcesPage() {
  return (
    <div className="bg-[var(--beseam-surface)] text-[var(--beseam-ink)]">
      <section className="border-b border-black/18">
        <div className="mx-auto max-w-[92rem] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--beseam-accent)]">Beseam Commerce Fieldbook</p>
          <div className="mt-7 grid gap-10 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:items-end lg:gap-20">
            <h1 className="max-w-[11ch] font-serif text-[clamp(3.35rem,5.8vw,6rem)] font-normal leading-[0.97] tracking-[-0.05em] text-[var(--beseam-ink)]">Practical commerce knowledge, with the evidence attached.</h1>
            <div className="max-w-2xl">
              <p className="text-[19px] leading-[1.7] text-black/66">Start with a real ecommerce problem, run a reusable agent skill, or inspect the open-source tools, standards, and primary references behind the workflow. Beseam curates the fieldbook; it does not pretend to have invented the ecosystem.</p>
              <p className="mt-5 text-[14px] leading-relaxed text-black/52">External projects retain their own maintainers, licenses, documentation, and trademarks. Inclusion means the resource is useful to the workflow—not that its maintainers endorse Beseam.</p>
              <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.09em] text-[var(--beseam-accent)]">{ECOSYSTEM_RESOURCES.length} reviewed ecosystem resources · {FIELD_SKILLS.length} reusable skills · {FIELD_PROBLEMS.length} problem guides</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-black/18 bg-[var(--beseam-panel)]">
        <div className="mx-auto grid max-w-[92rem] md:grid-cols-3">
          {FIELD_TYPES.map((item, index) => {
            const Icon = ICONS[index];
            return (
              <Link key={item.href} href={item.href} className="group border-b border-black/18 px-5 py-10 transition-colors hover:bg-[var(--beseam-panel-hover)] md:border-b-0 md:border-r md:px-8 lg:px-10 last:md:border-r-0">
                <Icon className="h-5 w-5 text-[var(--beseam-accent)]" strokeWidth={1.6} />
                <h2 className="mt-8 font-serif text-[31px] tracking-[-0.03em]">{item.title}</h2>
                <p className="mt-4 max-w-sm text-[14px] leading-relaxed text-black/58">{item.description}</p>
                <span className="mt-7 inline-flex items-center gap-2 text-[13px] font-semibold text-[var(--beseam-accent)]">Explore <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" /></span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="border-b border-black/18">
        <div className="mx-auto max-w-[92rem] px-5 py-20 sm:px-8 sm:py-24 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-20">
            <div><p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--beseam-accent)]">Start with the symptom</p><h2 className="mt-6 max-w-[10ch] font-serif text-[clamp(2.7rem,4vw,4rem)] leading-[1.02] tracking-[-0.04em]">Common problems across the commerce stack.</h2></div>
            <div className="border-t border-black/22">
              {FIELD_PROBLEMS.map((problem, index) => (
                <Link key={problem.slug} href={`/resources/problems/${problem.slug}`} className="group grid gap-3 border-b border-black/18 py-6 sm:grid-cols-[3rem_13rem_1fr_auto] sm:gap-6">
                  <span className="font-mono text-[10px] text-black/38">{String(index + 1).padStart(2, "0")}</span>
                  <div><span className="font-mono text-[9px] uppercase tracking-[0.09em] text-[var(--beseam-accent)]">{problem.category}</span><h3 className="mt-2 text-[16px] font-semibold text-black/82">{problem.title}</h3></div>
                  <p className="text-[14px] leading-relaxed text-black/58">{problem.summary}</p>
                  <ArrowRight className="h-4 w-4 text-[var(--beseam-accent)] transition-transform group-hover:translate-x-0.5" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-white/18 bg-[var(--beseam-technical)] text-white">
        <div className="mx-auto max-w-[92rem] px-5 py-20 sm:px-8 sm:py-24 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-20">
            <div><p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--beseam-accent-soft)]">Reusable workflows</p><h2 className="mt-6 max-w-[10ch] font-serif text-[clamp(2.7rem,4vw,4rem)] leading-[1.02] tracking-[-0.04em]">Agent skills with explicit boundaries.</h2><Link href="/resources/skills" className="mt-7 inline-flex items-center gap-2 text-[13px] font-semibold text-[var(--beseam-accent-soft)]">View all skills <ArrowRight className="h-4 w-4" /></Link></div>
            <div className="grid gap-px border border-white/18 bg-white/18 sm:grid-cols-2">
              {FIELD_SKILLS.map((skill) => (
                <Link key={skill.slug} href={`/resources/skills/${skill.slug}`} className="group bg-[var(--beseam-technical)] p-6 hover:bg-[var(--beseam-technical-hover)]">
                  <p className="font-mono text-[9px] uppercase tracking-[0.1em] text-[var(--beseam-accent-soft)]">{skill.category}</p><h3 className="mt-5 text-[19px] font-semibold leading-snug text-white">{skill.title}</h3><p className="mt-4 text-[13px] leading-relaxed text-white/55">{skill.summary}</p><span className="mt-6 inline-flex items-center gap-2 text-[12px] font-semibold text-[var(--beseam-accent-soft)]">Open skill <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" /></span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-black/18 bg-[var(--beseam-panel)]">
        <div className="mx-auto max-w-[92rem] px-5 py-20 sm:px-8 sm:py-24 lg:px-10">
          <div className="flex flex-col gap-6 border-b border-black/22 pb-8 sm:flex-row sm:items-end sm:justify-between">
            <div><p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--beseam-accent)]">Ecosystem index</p><h2 className="mt-5 font-serif text-[clamp(2.6rem,3.8vw,3.8rem)] tracking-[-0.04em]">Built with, beside, and on top of open work.</h2></div>
            <Link href="/resources/projects" className="inline-flex items-center gap-2 text-[13px] font-semibold text-[var(--beseam-accent)]">Browse all {ECOSYSTEM_RESOURCES.length} resources <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <div className="grid md:grid-cols-3">
            {FEATURED_RESOURCES.map((resource) => (
              <article key={resource.slug} className="border-b border-black/18 py-7 md:border-r md:px-6 md:first:pl-0 md:nth-[3n]:border-r-0">
                <p className="font-mono text-[9px] uppercase tracking-[0.09em] text-black/44">{resource.category} · {resource.maturity}</p><h3 className="mt-4 text-[18px] font-semibold">{resource.name}</h3><p className="mt-3 text-[13px] leading-relaxed text-black/58">{resource.summary}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-black/18">
        <div className="mx-auto grid max-w-[92rem] gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:px-10">
          <div className="flex items-start gap-4"><MessagesSquare className="mt-1 h-5 w-5 text-[var(--beseam-accent)]" /><div><p className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--beseam-accent)]">Participation, before a forum</p><h2 className="mt-4 font-serif text-[34px] leading-[1.06] tracking-[-0.035em]">Contribute a problem, correction, project, or field result.</h2></div></div>
          <div><p className="max-w-2xl text-[15px] leading-relaxed text-black/62">The first community layer is moderated and structured. Useful submissions become improved playbooks or anonymized case files. We will add open discussion only when there is enough recurring participation to support it responsibly.</p><a href="mailto:pankaj@beseam.com?subject=Commerce%20Fieldbook%20contribution" className="mt-6 inline-flex items-center gap-2 text-[13px] font-semibold text-[var(--beseam-accent)]">Submit a contribution <ArrowRight className="h-4 w-4" /></a></div>
        </div>
      </section>
    </div>
  );
}
