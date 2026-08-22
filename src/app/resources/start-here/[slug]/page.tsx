import { notFound } from "next/navigation";

import type { Metadata } from "next";

import FieldbookDocumentPage from "@/components/beseam/fieldbook/fieldbook-document";
import {
  getFieldbookDocument,
  getFieldbookDocuments,
} from "@/lib/fieldbook-content";
import { FIELDBOOK_SOCIAL_IMAGE, buildPublicMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return getFieldbookDocuments("start-here")
    .filter(({ slug }) => slug !== "overview")
    .map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const document = getFieldbookDocument("start-here", slug);
  if (!document) return {};
  return buildPublicMetadata({
    title: `${document.frontmatter.title} | Beseam`,
    description: document.frontmatter.summary,
    path: document.href,
    image: FIELDBOOK_SOCIAL_IMAGE,
    type: "article",
    modifiedTime: document.frontmatter.reviewedAt,
    section: "Commerce Fieldbook",
    tags: [document.frontmatter.category, document.frontmatter.kind],
  });
}

export default async function StartHereDocumentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const document = getFieldbookDocument("start-here", slug);
  if (!document || slug === "overview") notFound();
  return <FieldbookDocumentPage document={document} />;
}
