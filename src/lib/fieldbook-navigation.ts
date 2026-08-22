import { ECOSYSTEM_RESOURCES } from "@/lib/commerce-fieldbook";
import {
  getFieldbookDocuments,
  getFieldbookSearchEntries,
  type FieldbookSearchEntry,
} from "@/lib/fieldbook-content";

export type FieldbookNavItem = {
  title: string;
  href: string;
  badge?: string;
};

export type FieldbookNavGroup = {
  title: string;
  items: FieldbookNavItem[];
};

export function getFieldbookNavigation(): FieldbookNavGroup[] {
  const startHere = getFieldbookDocuments("start-here");
  const problems = getFieldbookDocuments("problems");
  const skills = getFieldbookDocuments("skills");
  const playbooks = getFieldbookDocuments("playbooks");

  return [
    {
      title: "Start here",
      items: startHere.map((document) => ({
        title: document.frontmatter.navTitle ?? document.frontmatter.title,
        href: document.href,
      })),
    },
    {
      title: "Problems",
      items: [
        { title: "All problems", href: "/resources/problems" },
        ...problems.map((document) => ({
          title: document.frontmatter.navTitle ?? document.frontmatter.title,
          href: document.href,
        })),
      ],
    },
    {
      title: "Agent skills",
      items: [
        { title: "All agent skills", href: "/resources/skills" },
        ...skills.map((document) => ({
          title: document.frontmatter.navTitle ?? document.frontmatter.title,
          href: document.href,
        })),
      ],
    },
    {
      title: "Playbooks",
      items: [
        { title: "All playbooks", href: "/resources/playbooks" },
        ...playbooks.map((document) => ({
          title: document.frontmatter.navTitle ?? document.frontmatter.title,
          href: document.href,
        })),
      ],
    },
    {
      title: "Ecosystem",
      items: [
        {
          title: "Projects and references",
          href: "/resources/projects",
          badge: String(ECOSYSTEM_RESOURCES.length),
        },
      ],
    },
    {
      title: "Community",
      items: [
        { title: "Case files", href: "/resources/case-files" },
        { title: "Contribute", href: "/resources/contribute" },
      ],
    },
  ];
}

export function getFieldbookSearchIndex(): FieldbookSearchEntry[] {
  const documentEntries = getFieldbookSearchEntries();
  const resourceEntries: FieldbookSearchEntry[] = ECOSYSTEM_RESOURCES.map(
    (resource) => ({
      href: `/resources/projects/${resource.slug}`,
      title: resource.name,
      summary: resource.summary,
      section: "Projects and references",
      category: resource.category,
      keywords: [
        resource.maintainer,
        resource.license,
        resource.kind,
        ...resource.tags,
        ...resource.useCases,
      ].join(" "),
    }),
  );

  return [
    {
      href: "/resources",
      title: "Commerce Fieldbook",
      summary:
        "Evidence-first ecommerce problems, agent skills, playbooks, open-source projects, standards, and primary references.",
      section: "Fieldbook",
      category: "Start here",
      keywords:
        "ecommerce commerce knowledge base documentation community hub SEO GEO AEO CRO",
    },
    {
      href: "/resources/projects",
      title: "Projects and references index",
      summary:
        "Browse the reviewed ecosystem catalog by category, resource type, maintainer, usage boundary, and use case.",
      section: "Projects and references",
      category: "Ecosystem",
      keywords:
        "open source standards official documentation commerce platforms testing analytics observability accessibility",
    },
    ...documentEntries,
    ...resourceEntries,
  ];
}

export function getAdjacentFieldbookPages(currentHref: string) {
  const flattened = getFieldbookNavigation().flatMap((group) => group.items);
  const unique = flattened.filter(
    (item, index, items) =>
      items.findIndex((candidate) => candidate.href === item.href) === index,
  );
  const currentIndex = unique.findIndex((item) => item.href === currentHref);
  if (currentIndex === -1) return { previous: undefined, next: undefined };
  return {
    previous: currentIndex > 0 ? unique[currentIndex - 1] : undefined,
    next:
      currentIndex < unique.length - 1 ? unique[currentIndex + 1] : undefined,
  };
}
