import fs from "fs";
import matter from "gray-matter";
import path from "path";

const ALTERNATIVES_PATH = path.join(process.cwd(), "src/alternatives");

export type AlternativeDocFrontmatter = {
  name: string;
  description: string;
  website?: string;
  docsUrl?: string;
  shopifyAppUrl?: string;
  category?: string;
  pricing?: string;
  freeTrial?: string;
  headline?: string;
  subheadline?: string;
  whySectionHeading?: string;
  whySectionSubheading?: string;
  whySwitch?: string[];
  pricingDetails?: string;
  bestFor?: string[];
  beseamDoesDifferently?: string[];
  quickComparison?: Array<{
    feature: string;
    tool: string;
    lookFor: string;
    beseam?: string;
    highlight?: "tool" | "beseam" | "none";
  }>;
  strengths?: string[];
  weaknesses?: string[];
  whatToLookFor?: string[];
  getStartedSteps?: Array<string | { title: string; description: string }>;
  faqs?: Array<{ q: string; a: string }>;
};

export type AlternativeDoc = {
  slug: string;
  frontmatter: AlternativeDocFrontmatter;
  content: string;
};

export function getAlternativeSlugs(): string[] {
  if (!fs.existsSync(ALTERNATIVES_PATH)) return [];
  return fs
    .readdirSync(ALTERNATIVES_PATH)
    .filter((filePath) => /\.mdx?$/.test(filePath));
}

export function getAlternativeBySlug(slug: string): AlternativeDoc {
  const realSlug = slug.replace(/\.mdx$/, "");
  const fullPath = path.join(ALTERNATIVES_PATH, `${realSlug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug: realSlug,
    frontmatter: data as AlternativeDocFrontmatter,
    content,
  };
}

export function getAllAlternatives(): AlternativeDoc[] {
  const slugs = getAlternativeSlugs();
  return slugs
    .map((slug) => getAlternativeBySlug(slug))
    .sort((a, b) => a.frontmatter.name.localeCompare(b.frontmatter.name));
}
