import { notFound } from "next/navigation";

import type { Metadata } from "next";

import FieldbookDocumentPage from "@/components/beseam/fieldbook/fieldbook-document";
import { getFieldbookDocument } from "@/lib/fieldbook-content";
import { FIELDBOOK_SOCIAL_IMAGE, buildPublicMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPublicMetadata({
  title: "Start Here | Beseam Commerce Fieldbook",
  description:
    "How to use the Commerce Fieldbook, its evidence model, agent skills, and editorial boundaries.",
  path: "/resources/start-here",
  image: FIELDBOOK_SOCIAL_IMAGE,
});

export default function StartHerePage() {
  const document = getFieldbookDocument("start-here", "overview");
  if (!document) notFound();
  return <FieldbookDocumentPage document={document} />;
}
