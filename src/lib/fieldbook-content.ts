import matter from "gray-matter";
import fs from "node:fs";
import path from "node:path";

export const FIELD_SECTIONS = [
  "start-here",
  "problems",
  "skills",
  "playbooks",
  "pages",
] as const;
export type FieldbookSection = (typeof FIELD_SECTIONS)[number];

export type FieldbookHeading = {
  id: string;
  title: string;
  level: 2 | 3;
};

export type FieldbookFrontmatter = {
  title: string;
  navTitle?: string;
  summary: string;
  category: string;
  kind: "guide" | "policy" | "problem" | "skill" | "playbook";
  status: "stable" | "emerging" | "experimental" | "deprecated";
  order: number;
  reviewedAt: string;
  difficulty?: "beginner" | "intermediate" | "advanced";
  version?: string;
  worksWith?: string[];
  audienceNote?: string;
  relatedSkills?: string[];
  relatedProblems?: string[];
  relatedResources?: string[];
};

export type FieldbookDocument = {
  slug: string;
  section: FieldbookSection;
  href: string;
  content: string;
  headings: FieldbookHeading[];
  frontmatter: FieldbookFrontmatter;
};

export type FieldbookSearchEntry = {
  href: string;
  title: string;
  summary: string;
  section: string;
  category: string;
  keywords: string;
};

const CONTENT_ROOT = path.join(process.cwd(), "content", "fieldbook");

export function slugifyHeading(value: string) {
  return value
    .toLowerCase()
    .replace(/[`*_~]/g, "")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function sectionHref(section: FieldbookSection, slug: string) {
  if (section === "pages") return `/resources/${slug}`;
  if (section === "start-here" && slug === "overview")
    return "/resources/start-here";
  return `/resources/${section}/${slug}`;
}

function extractHeadings(source: string): FieldbookHeading[] {
  const headings: FieldbookHeading[] = [];
  const seen = new Map<string, number>();
  const headingPattern = /^(##|###)\s+(.+)$/gm;

  for (const match of source.matchAll(headingPattern)) {
    const rawTitle = match[2]
      .replace(/\[([^\]]+)\]\([^\)]+\)/g, "$1")
      .replace(/[`*_~]/g, "")
      .trim();
    const base = slugifyHeading(rawTitle);
    const duplicateCount = seen.get(base) ?? 0;
    seen.set(base, duplicateCount + 1);
    headings.push({
      id: duplicateCount === 0 ? base : `${base}-${duplicateCount + 1}`,
      title: rawTitle,
      level: match[1] === "##" ? 2 : 3,
    });
  }

  return headings;
}

function cleanSearchText(source: string) {
  return source
    .replace(/^---[\s\S]*?---/m, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\[([^\]]+)\]\([^\)]+\)/g, "$1")
    .replace(/[`#*_>~-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function validateFrontmatter(
  data: Record<string, unknown>,
  filePath: string,
): FieldbookFrontmatter {
  const required = [
    "title",
    "summary",
    "category",
    "kind",
    "status",
    "order",
    "reviewedAt",
  ] as const;
  for (const key of required) {
    if (data[key] === undefined || data[key] === null || data[key] === "") {
      throw new Error(`Missing ${key} in ${filePath}`);
    }
  }

  return {
    ...data,
    reviewedAt:
      data.reviewedAt instanceof Date
        ? data.reviewedAt.toISOString().slice(0, 10)
        : String(data.reviewedAt),
  } as unknown as FieldbookFrontmatter;
}

export function getFieldbookDocument(
  section: FieldbookSection,
  slug: string,
): FieldbookDocument | undefined {
  const filePath = path.join(CONTENT_ROOT, section, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return undefined;

  const raw = fs.readFileSync(filePath, "utf8");
  const parsed = matter(raw);
  const frontmatter = validateFrontmatter(parsed.data, filePath);

  return {
    slug,
    section,
    href: sectionHref(section, slug),
    content: parsed.content.trim(),
    headings: extractHeadings(parsed.content),
    frontmatter,
  };
}

export function getFieldbookDocuments(
  section: FieldbookSection,
): FieldbookDocument[] {
  const directory = path.join(CONTENT_ROOT, section);
  if (!fs.existsSync(directory)) return [];

  return fs
    .readdirSync(directory)
    .filter((fileName) => fileName.endsWith(".mdx"))
    .map((fileName) =>
      getFieldbookDocument(section, fileName.replace(/\.mdx$/, "")),
    )
    .filter((document): document is FieldbookDocument => Boolean(document))
    .sort(
      (left, right) =>
        left.frontmatter.order - right.frontmatter.order ||
        left.frontmatter.title.localeCompare(right.frontmatter.title),
    );
}

export function getAllFieldbookDocuments() {
  return FIELD_SECTIONS.flatMap(getFieldbookDocuments);
}

export function getFieldbookSearchEntries(): FieldbookSearchEntry[] {
  return getAllFieldbookDocuments().map((document) => ({
    href: document.href,
    title: document.frontmatter.title,
    summary: document.frontmatter.summary,
    section: sectionLabel(document.section),
    category: document.frontmatter.category,
    keywords: cleanSearchText(document.content),
  }));
}

export function sectionLabel(section: FieldbookSection) {
  switch (section) {
    case "start-here":
      return "Start here";
    case "problems":
      return "Problems";
    case "skills":
      return "Agent skills";
    case "playbooks":
      return "Playbooks";
    case "pages":
      return "Fieldbook";
  }
}
