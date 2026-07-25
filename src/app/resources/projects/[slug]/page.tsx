import Link from "next/link";
import { notFound } from "next/navigation";

import { ArrowRight, ExternalLink } from "lucide-react";
import type { Metadata } from "next";

import FieldbookShell from "@/components/beseam/fieldbook/fieldbook-shell";
import { ECOSYSTEM_RESOURCES, getResource } from "@/lib/commerce-fieldbook";
import {
  getAllFieldbookDocuments,
  type FieldbookHeading,
} from "@/lib/fieldbook-content";

const HEADINGS: FieldbookHeading[] = [
  {
    id: "why-it-is-in-the-fieldbook",
    title: "Why it is in the Fieldbook",
    level: 2,
  },
  {
    id: "useful-commerce-applications",
    title: "Useful commerce applications",
    level: 2,
  },
  {
    id: "maintenance-and-usage-boundary",
    title: "Maintenance and usage boundary",
    level: 2,
  },
  {
    id: "related-fieldbook-workflows",
    title: "Related Fieldbook workflows",
    level: 2,
  },
];

export function generateStaticParams() {
  return ECOSYSTEM_RESOURCES.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const resource = getResource(slug);
  if (!resource) return {};
  return {
    title: { absolute: `${resource.name} | Beseam Commerce Fieldbook` },
    description: resource.summary,
    alternates: { canonical: `/resources/projects/${slug}` },
  };
}

export default async function ResourcePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const resource = getResource(slug);
  if (!resource) notFound();

  const relatedDocuments = getAllFieldbookDocuments()
    .filter((document) =>
      document.frontmatter.relatedResources?.includes(resource.slug),
    )
    .slice(0, 8);
  const relatedResources = ECOSYSTEM_RESOURCES.filter(
    (candidate) =>
      candidate.slug !== resource.slug &&
      candidate.category === resource.category,
  ).slice(0, 4);
  const external = resource.url.startsWith("http");

  return (
    <FieldbookShell
      currentHref={`/resources/projects/${resource.slug}`}
      headings={HEADINGS}
    >
      <header className="border-b border-black/18 pb-10">
        <div className="flex flex-wrap items-center gap-2 font-mono text-[9px] uppercase tracking-[0.1em] text-black/42">
          <Link
            href="/resources/projects"
            className="text-[var(--beseam-accent)]"
          >
            Projects and references
          </Link>
          <span>/</span>
          <span>{resource.category}</span>
        </div>
        <h1 className="mt-6 max-w-[14ch] font-serif text-[clamp(3.2rem,5vw,5.3rem)] leading-[0.98] tracking-[-0.05em] text-[var(--beseam-ink)]">
          {resource.name}
        </h1>
        <p className="mt-7 max-w-3xl text-[18px] leading-[1.7] text-black/62">
          {resource.summary}
        </p>
        <div className="mt-7 flex flex-wrap gap-2">
          <span className="border border-black/16 px-2.5 py-1 font-mono text-[8px] uppercase tracking-[0.08em] text-[var(--beseam-accent)]">
            {resource.kind}
          </span>
          <span className="border border-black/16 px-2.5 py-1 font-mono text-[8px] uppercase tracking-[0.08em] text-black/46">
            {resource.maturity}
          </span>
          <span className="border border-black/16 px-2.5 py-1 font-mono text-[8px] uppercase tracking-[0.08em] text-black/46">
            Reviewed {resource.reviewedAt}
          </span>
        </div>
        <a
          href={resource.url}
          target={external ? "_blank" : undefined}
          rel={external ? "noreferrer" : undefined}
          className="mt-7 inline-flex min-h-11 items-center gap-2 bg-[var(--beseam-technical)] px-4 text-[12px] font-semibold text-white"
        >
          Open official source{" "}
          {external ? (
            <ExternalLink className="h-4 w-4" />
          ) : (
            <ArrowRight className="h-4 w-4" />
          )}
        </a>
      </header>

      <div className="fieldbook-prose mt-12">
        <h2
          id="why-it-is-in-the-fieldbook"
          className="scroll-mt-36 border-t border-black/18 pt-9 font-serif text-[clamp(2rem,3.2vw,2.75rem)] leading-[1.08] tracking-[-0.035em]"
        >
          Why it is in the Fieldbook
        </h2>
        <p className="text-[15px] leading-[1.78] text-black/64">
          {resource.name} is included because it supports practical work in{" "}
          <strong>{resource.category.toLowerCase()}</strong>. The Fieldbook uses
          it as a project, standard, or primary source—not as evidence that its
          maintainers endorse Beseam.
        </p>

        <h2
          id="useful-commerce-applications"
          className="scroll-mt-36 border-t border-black/18 pt-9 font-serif text-[clamp(2rem,3.2vw,2.75rem)] leading-[1.08] tracking-[-0.035em]"
        >
          Useful commerce applications
        </h2>
        <ul className="space-y-2 border-l border-black/16 pl-5 text-[14px] leading-relaxed text-black/62">
          {resource.useCases.map((useCase) => (
            <li key={useCase}>{useCase}</li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-2">
          {resource.tags.map((tag) => (
            <span
              key={tag}
              className="border border-black/16 bg-[var(--beseam-panel)] px-2.5 py-1 font-mono text-[8px] uppercase tracking-[0.07em] text-black/46"
            >
              {tag}
            </span>
          ))}
        </div>

        <h2
          id="maintenance-and-usage-boundary"
          className="scroll-mt-36 border-t border-black/18 pt-9 font-serif text-[clamp(2rem,3.2vw,2.75rem)] leading-[1.08] tracking-[-0.035em]"
        >
          Maintenance and usage boundary
        </h2>
        <dl className="grid gap-px border border-black/16 bg-black/16 sm:grid-cols-2">
          <div className="bg-[var(--beseam-surface)] p-5">
            <dt className="font-mono text-[8px] uppercase tracking-[0.09em] text-black/36">
              Maintainer
            </dt>
            <dd className="mt-2 text-[14px] font-semibold text-[var(--beseam-ink)]">
              {resource.maintainer}
            </dd>
          </div>
          <div className="bg-[var(--beseam-surface)] p-5">
            <dt className="font-mono text-[8px] uppercase tracking-[0.09em] text-black/36">
              License or usage boundary
            </dt>
            <dd className="mt-2 text-[14px] font-semibold text-[var(--beseam-ink)]">
              {resource.license}
            </dd>
          </div>
        </dl>
        <p className="text-[13px] leading-relaxed text-black/56">
          Confirm current requirements, support policy, compatibility, and
          licensing against the official source before adopting the resource.
          Fieldbook review metadata does not replace the maintainer's
          documentation.
        </p>

        <h2
          id="related-fieldbook-workflows"
          className="scroll-mt-36 border-t border-black/18 pt-9 font-serif text-[clamp(2rem,3.2vw,2.75rem)] leading-[1.08] tracking-[-0.035em]"
        >
          Related Fieldbook workflows
        </h2>
        {relatedDocuments.length > 0 ? (
          <div className="grid gap-px border border-black/16 bg-black/16 sm:grid-cols-2">
            {relatedDocuments.map((document) => (
              <Link
                key={document.href}
                href={document.href}
                className="group bg-[var(--beseam-surface)] p-5 transition-colors hover:bg-[var(--beseam-panel)]"
              >
                <p className="font-mono text-[8px] uppercase tracking-[0.08em] text-[var(--beseam-accent)]">
                  {document.frontmatter.kind} · {document.frontmatter.status}
                </p>
                <h3 className="mt-3 text-[14px] font-semibold text-[var(--beseam-ink)]">
                  {document.frontmatter.title}
                </h3>
                <p className="mt-2 text-[12px] leading-relaxed text-black/50">
                  {document.frontmatter.summary}
                </p>
                <span className="mt-4 inline-flex items-center gap-2 text-[11px] font-semibold text-[var(--beseam-accent)]">
                  Open workflow{" "}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-[14px] leading-relaxed text-black/56">
            No dedicated workflow currently depends on this resource. It remains
            in the ecosystem index for its broader operational value.
          </p>
        )}
        {relatedResources.length > 0 && (
          <div className="border-t border-black/14">
            {relatedResources.map((related) => (
              <Link
                key={related.slug}
                href={`/resources/projects/${related.slug}`}
                className="group flex items-center justify-between gap-5 border-b border-black/14 py-4"
              >
                <span>
                  <span className="font-mono text-[8px] uppercase tracking-[0.08em] text-black/36">
                    Also in {related.category}
                  </span>
                  <span className="mt-1 block text-[13px] font-semibold text-[var(--beseam-ink)]">
                    {related.name}
                  </span>
                </span>
                <ArrowRight className="h-3.5 w-3.5 text-[var(--beseam-accent)] transition-transform group-hover:translate-x-0.5" />
              </Link>
            ))}
          </div>
        )}
      </div>
    </FieldbookShell>
  );
}
