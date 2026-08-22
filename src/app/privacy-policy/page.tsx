import Link from "next/link";

import { readFileSync } from "fs";
import { Calendar } from "lucide-react";
import type { Metadata } from "next";
import { compileMDX } from "next-mdx-remote/rsc";
import { join } from "path";

import CategoryBadge from "@/components/category-badge";
import { buildPublicMetadata } from "@/lib/seo";

interface Frontmatter {
  title: string;
  description: string;
  date: string;
}

export const metadata: Metadata = buildPublicMetadata({
  title: "Privacy Policy | Beseam",
  description:
    "How Beseam collects, uses, shares, and protects personal data across our website and ecommerce services.",
  path: "/privacy-policy",
});

export default async function PrivacyPolicy() {
  const filePath = join(process.cwd(), "./src/app/privacy-policy/index.mdx");
  const source = readFileSync(filePath, "utf8");
  const { content, frontmatter } = await compileMDX<Frontmatter>({
    source,
    options: { parseFrontmatter: true },
  });

  return (
    <article className="hero-padding-margin container max-w-4xl space-y-6 md:space-y-8">
      <header className="flex flex-col items-center justify-center gap-4">
        <Link href="/" className="group">
          <CategoryBadge
            label={new Date(frontmatter.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
            icon={<Calendar className="!text-current" />}
          />
        </Link>
        <h1 className="text-center text-2xl md:text-4xl lg:text-5xl">
          {frontmatter.title}
        </h1>
        <p className="max-w-2xl text-center text-base leading-7 text-muted-foreground md:text-lg">
          {frontmatter.description}
        </p>
      </header>

      <div className="prose prose-lg prose-headings:scroll-mt-24 dark:prose-invert max-w-none leading-8">
        {content}
      </div>
    </article>
  );
}
