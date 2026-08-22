import { notFound } from "next/navigation";

import type { Metadata } from "next";

import FieldbookDocumentPage from "@/components/beseam/fieldbook/fieldbook-document";
import {
  getFieldbookDocument,
  getFieldbookDocuments,
} from "@/lib/fieldbook-content";
import { FIELDBOOK_SOCIAL_IMAGE, buildPublicMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return getFieldbookDocuments("skills").map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const document = getFieldbookDocument("skills", slug);
  if (!document) return {};
  return buildPublicMetadata({
    title: `${document.frontmatter.title} | Beseam`,
    description: document.frontmatter.summary,
    path: document.href,
    image: FIELDBOOK_SOCIAL_IMAGE,
    type: "article",
    modifiedTime: document.frontmatter.reviewedAt,
    section: "Commerce Fieldbook",
    tags: [
      document.frontmatter.category,
      document.frontmatter.kind,
      ...(document.frontmatter.worksWith ?? []),
    ],
  });
}

export default async function SkillPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const document = getFieldbookDocument("skills", slug);
  if (!document) notFound();
  return <FieldbookDocumentPage document={document} />;
}
