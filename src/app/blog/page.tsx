import { Paperclip, Sparkles } from "lucide-react";

import Link from "next/link";

import { BlogIndexClient } from "@/components/blog/blog-index-client";
import SectionHeader from "@/components/section-header";
import { getAllBlogs } from "@/lib/blog";
import { Button } from "@/components/ui/button";

export default function BlogPage() {
  const blogPosts = getAllBlogs();

  const comparisonPriority = new Map<string, number>([
    ["beseam-vs-triple-whale", 1],
    ["beseam-vs-haus", 2],
    ["beseam-vs-measured", 3],
    ["beseam-vs-rockerbox", 4],
    ["beseam-vs-workmagic", 5],
  ]);

  const posts = blogPosts.map((post) => {
    const tags = post.tags ?? [];
    const isComparison = post.title.startsWith("Beseam vs ");
    const contentWordCount = post.content
      ? post.content.split(/\s+/).filter(Boolean).length
      : 0;
    const readingTimeMinutes = Math.max(
      2,
      Math.round(contentWordCount / 220) || 0,
    );

    return {
    id: post.slug,
    title: post.title,
    summary: post.description,
    author: post.author,
    dateISO: post.date,
    published: new Date(post.date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }),
    url: `/blog/${post.slug}`,
    image: post.coverImage,
    tags,
    isComparison,
    comparisonRank: comparisonPriority.get(post.slug) ?? 999,
    readingTimeMinutes,
    };
  });

  // Show "Coming Soon" if no blog posts
  if (posts.length === 0) {
    return (
      <section className="hero-padding-margin container">
        <div className="mx-auto max-w-3xl text-center">
          <SectionHeader
            icon={<Paperclip />}
            category="Blog"
            title="Beseam Insights"
            description="Insights on PDP optimization, revenue protection, and shipping improvements safely at scale."
            layout="center"
          />

          <div className="mt-16 rounded-3xl border border-border bg-card p-12 md:p-16">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
              <Sparkles className="h-10 w-10 text-primary" />
            </div>

            <h2 className="mt-6 text-2xl font-semibold md:text-3xl">
              Coming Soon
            </h2>

            <p className="mt-4 text-lg text-muted-foreground">
              We&apos;re crafting content about PDP ops, safe deployment
              practices, revenue guardrails, and how agencies and brands
              ship improvements together.
            </p>

            <p className="mt-4 text-sm text-muted-foreground">
              Check back soon for expert tips, case studies, and industry
              insights.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild size="lg" className="rounded-full px-8">
                <a href="https://app.beseam.com/analyze" target="_blank" rel="noopener noreferrer">Run Free PDP Audit</a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full px-8"
              >
                <Link href="/demo">Watch demo</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="hero-padding-margin container">
        <SectionHeader
          icon={<Paperclip />}
          category="Blog"
          title="Beseam Insights"
          description="Deep dives for dev agencies and SEO/GEO agencies shipping PDP improvements—and keeping every change revenue-guardrailed."
          layout="center"
          titleSize="xl"
          action={
            <div className="flex flex-col items-center gap-3 sm:flex-row">
              <Button asChild size="lg" className="rounded-full px-8">
                <a href="https://app.beseam.com/analyze" target="_blank" rel="noopener noreferrer">Run Free PDP Audit</a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full px-8"
              >
                <Link href="/demo">Watch demo</Link>
              </Button>
            </div>
          }
        />

        <BlogIndexClient posts={posts} />
      </section>
    </>
  );
}
