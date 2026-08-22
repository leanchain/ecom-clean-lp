import { notFound } from "next/navigation";

import type { Metadata } from "next";

import FieldbookDocumentPage from "@/components/beseam/fieldbook/fieldbook-document";
import { getFieldbookDocument } from "@/lib/fieldbook-content";
import { FIELDBOOK_SOCIAL_IMAGE, buildPublicMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPublicMetadata({
  title: "Contribute | Beseam Commerce Fieldbook",
  description:
    "Propose a correction, problem, skill, playbook, project, or anonymized field result.",
  path: "/resources/contribute",
  image: FIELDBOOK_SOCIAL_IMAGE,
});
export default function ContributePage() {
  const document = getFieldbookDocument("pages", "contribute");
  if (!document) notFound();
  return <FieldbookDocumentPage document={document} />;
}
