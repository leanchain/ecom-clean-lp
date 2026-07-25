import { notFound } from "next/navigation";

import type { Metadata } from "next";

import FieldbookDocumentPage from "@/components/beseam/fieldbook/fieldbook-document";
import {
  getFieldbookDocument,
  getFieldbookDocuments,
} from "@/lib/fieldbook-content";

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
  return {
    title: {
      absolute: `${document.frontmatter.title} | Beseam Commerce Fieldbook`,
    },
    description: document.frontmatter.summary,
    alternates: { canonical: document.href },
  };
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
