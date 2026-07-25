import Link from "next/link";

import {
  ArrowRight,
  BookOpen,
  Boxes,
  ClipboardCheck,
  FolderGit2,
  MessagesSquare,
  Workflow,
} from "lucide-react";
import type { Metadata } from "next";

import FieldbookSearch from "@/components/beseam/fieldbook/fieldbook-search";
import {
  ECOSYSTEM_RESOURCES,
  FEATURED_RESOURCES,
} from "@/lib/commerce-fieldbook";
import { getFieldbookDocuments } from "@/lib/fieldbook-content";
import { getFieldbookSearchIndex } from "@/lib/fieldbook-navigation";

export const metadata: Metadata = {
  title: { absolute: "Commerce Fieldbook | Beseam" },
  description:
    "Commerce problem guides, agent skills, team playbooks, open-source projects, standards, and official references maintained by Beseam.",
  alternates: { canonical: "/resources" },
};

const SECTIONS = [
  {
    title: "Start here",
    href: "/resources/start-here",
    description:
      "Learn what the Fieldbook treats as a fact, an estimate, a hypothesis, or a verified result.",
    icon: BookOpen,
  },
  {
    title: "Problems",
    href: "/resources/problems",
    description:
      "Find the symptom closest to yours, then collect the details needed to narrow the cause.",
    icon: ClipboardCheck,
  },
  {
    title: "Agent skills",
    href: "/resources/skills",
    description:
      "Use a written procedure with a defined input list, output format, checks, and limits.",
    icon: Workflow,
  },
  {
    title: "Playbooks",
    href: "/resources/playbooks",
    description:
      "Give each team a role, an order of work, and a clear definition of done.",
    icon: Boxes,
  },
  {
    title: "Projects and references",
    href: "/resources/projects",
    description:
      "Read the standards, platform documentation, and open-source tools used by the guides.",
    icon: FolderGit2,
  },
  {
    title: "Contribute",
    href: "/resources/contribute",
    description:
      "Send a correction, missing problem, useful project, or publishable field result.",
    icon: MessagesSquare,
  },
] as const;

export default function ResourcesPage() {
  const problems = getFieldbookDocuments("problems");
  const skills = getFieldbookDocuments("skills");
  const playbooks = getFieldbookDocuments("playbooks");
  const searchEntries = getFieldbookSearchIndex();

  return (
    <div className="bg-[var(--beseam-surface)] text-[var(--beseam-ink)]">
      <section className="border-b border-black/18">
        <div className="mx-auto max-w-[92rem] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--beseam-accent)]">
            Beseam Commerce Fieldbook
          </p>
          <div className="mt-7 grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-end lg:gap-20">
            <div>
              <h1 className="max-w-[11ch] font-serif text-[clamp(3.5rem,6.2vw,6.5rem)] font-normal leading-[0.95] tracking-[-0.055em]">
                Find the commerce problem in front of you.
              </h1>
              <Link
                href="/resources/start-here"
                className="mt-8 inline-flex min-h-12 items-center gap-3 bg-[var(--beseam-technical)] px-5 text-[13px] font-semibold text-white"
              >
                Open the Fieldbook <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="max-w-2xl">
              <p className="text-[19px] leading-[1.72] text-black/66">
                Pick the symptom that matches your store. From there, the
                Fieldbook links to a checklist, a team playbook, and the
                official sources behind the recommendation. External work stays
                credited to its maintainers.
              </p>
              <div className="mt-8">
                <FieldbookSearch entries={searchEntries} />
              </div>
              <p className="mt-5 font-mono text-[9px] uppercase tracking-[0.09em] text-black/42">
                {problems.length} problem guides · {skills.length} agent skills
                · {playbooks.length} playbooks · {ECOSYSTEM_RESOURCES.length}{" "}
                reviewed resources
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-black/18 bg-[var(--beseam-panel)]">
        <div className="mx-auto grid max-w-[92rem] sm:grid-cols-2 lg:grid-cols-3">
          {SECTIONS.map(({ title, href, description, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="group border-b border-black/16 p-7 transition-colors hover:bg-[var(--beseam-panel-hover)] sm:border-r lg:min-h-[18rem] lg:p-9"
            >
              <Icon
                className="h-5 w-5 text-[var(--beseam-accent)]"
                strokeWidth={1.6}
              />
              <h2 className="mt-9 font-serif text-[30px] tracking-[-0.035em] text-[var(--beseam-ink)]">
                {title}
              </h2>
              <p className="mt-4 max-w-sm text-[13px] leading-relaxed text-black/56">
                {description}
              </p>
              <span className="mt-7 inline-flex items-center gap-2 text-[12px] font-semibold text-[var(--beseam-accent)]">
                Browse section{" "}
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-b border-black/18">
        <div className="mx-auto max-w-[92rem] px-5 py-20 sm:px-8 sm:py-24 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.65fr)_minmax(0,1.35fr)] lg:gap-20">
            <div>
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--beseam-accent)]">
                Common problems
              </p>
              <h2 className="mt-5 max-w-[10ch] font-serif text-[clamp(2.8rem,4vw,4.2rem)] leading-[1.02] tracking-[-0.04em]">
                Pick the closest symptom.
              </h2>
            </div>
            <div className="border-t border-black/18">
              {problems.slice(0, 5).map((problem, index) => (
                <Link
                  key={problem.href}
                  href={problem.href}
                  className="group grid gap-4 border-b border-black/16 py-5 sm:grid-cols-[2.5rem_13rem_1fr_auto]"
                >
                  <span className="font-mono text-[9px] text-black/34">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>
                    <span className="font-mono text-[8px] uppercase tracking-[0.08em] text-[var(--beseam-accent)]">
                      {problem.frontmatter.category}
                    </span>
                    <span className="mt-1.5 block text-[14px] font-semibold text-[var(--beseam-ink)]">
                      {problem.frontmatter.navTitle ??
                        problem.frontmatter.title}
                    </span>
                  </span>
                  <span className="text-[12px] leading-relaxed text-black/50">
                    {problem.frontmatter.summary}
                  </span>
                  <ArrowRight className="h-4 w-4 text-[var(--beseam-accent)] transition-transform group-hover:translate-x-0.5" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-black/18 bg-[var(--beseam-technical)] text-white">
        <div className="mx-auto max-w-[92rem] px-5 py-20 sm:px-8 sm:py-24 lg:px-10">
          <div className="flex flex-col gap-6 border-b border-white/16 pb-8 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--beseam-accent-soft)]">
                Sources and tools
              </p>
              <h2 className="mt-5 font-serif text-[clamp(2.8rem,4vw,4.2rem)] leading-[1.02] tracking-[-0.04em]">
                Read the rule before you change the store.
              </h2>
            </div>
            <Link
              href="/resources/projects"
              className="inline-flex items-center gap-2 text-[12px] font-semibold text-[var(--beseam-accent-soft)]"
            >
              Browse all {ECOSYSTEM_RESOURCES.length} resources{" "}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-px bg-white/16 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURED_RESOURCES.map((resource) => (
              <article
                key={resource.slug}
                className="bg-[var(--beseam-technical)] p-6"
              >
                <p className="font-mono text-[8px] uppercase tracking-[0.09em] text-white/36">
                  {resource.category} · {resource.maturity}
                </p>
                <h3 className="mt-4 text-[17px] font-semibold">
                  {resource.name}
                </h3>
                <p className="mt-3 text-[12px] leading-relaxed text-white/52">
                  {resource.summary}
                </p>
                <p className="mt-5 font-mono text-[8px] uppercase tracking-[0.08em] text-[var(--beseam-accent-soft)]">
                  {resource.kind} · {resource.license}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
