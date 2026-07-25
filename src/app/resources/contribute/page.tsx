import { notFound } from "next/navigation";

import type { Metadata } from "next";

import FieldbookDocumentPage from "@/components/beseam/fieldbook/fieldbook-document";
import { getFieldbookDocument } from "@/lib/fieldbook-content";

export const metadata: Metadata = {
  title: { absolute: "Contribute | Beseam Commerce Fieldbook" },
  description:
    "Propose a correction, problem, skill, playbook, project, or anonymized field result.",
  alternates: { canonical: "/resources/contribute" },
};
export default function ContributePage() {
  const document = getFieldbookDocument("pages", "contribute");
  if (!document) notFound();
  return <FieldbookDocumentPage document={document} />;
}
