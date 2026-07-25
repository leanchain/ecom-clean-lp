import { notFound } from "next/navigation";

import type { Metadata } from "next";

import FieldbookDocumentPage from "@/components/beseam/fieldbook/fieldbook-document";
import { getFieldbookDocument } from "@/lib/fieldbook-content";

export const metadata: Metadata = {
  title: { absolute: "Case Files | Beseam Commerce Fieldbook" },
  description:
    "How the Fieldbook turns verified, anonymized ecommerce investigations into reusable case files.",
  alternates: { canonical: "/resources/case-files" },
};
export default function CaseFilesPage() {
  const document = getFieldbookDocument("pages", "case-files");
  if (!document) notFound();
  return <FieldbookDocumentPage document={document} />;
}
