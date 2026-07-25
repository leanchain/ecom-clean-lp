import { notFound } from "next/navigation";

import type { Metadata } from "next";

import FieldbookDocumentPage from "@/components/beseam/fieldbook/fieldbook-document";
import { getFieldbookDocument } from "@/lib/fieldbook-content";

export const metadata: Metadata = {
  title: { absolute: "Start Here | Beseam Commerce Fieldbook" },
  description:
    "How to use the Commerce Fieldbook, its evidence model, agent skills, and editorial boundaries.",
  alternates: { canonical: "/resources/start-here" },
};

export default function StartHerePage() {
  const document = getFieldbookDocument("start-here", "overview");
  if (!document) notFound();
  return <FieldbookDocumentPage document={document} />;
}
