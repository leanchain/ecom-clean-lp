import { notFound } from "next/navigation";

import type { Metadata } from "next";

import FieldbookDocumentPage from "@/components/beseam/fieldbook/fieldbook-document";
import { getFieldbookDocument } from "@/lib/fieldbook-content";
import { FIELDBOOK_SOCIAL_IMAGE, buildPublicMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPublicMetadata({
  title: "Case Files | Beseam Commerce Fieldbook",
  description:
    "How the Fieldbook turns verified, anonymized ecommerce investigations into reusable case files.",
  path: "/resources/case-files",
  image: FIELDBOOK_SOCIAL_IMAGE,
});
export default function CaseFilesPage() {
  const document = getFieldbookDocument("pages", "case-files");
  if (!document) notFound();
  return <FieldbookDocumentPage document={document} />;
}
