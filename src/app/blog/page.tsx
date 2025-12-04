import { Paperclip, Sparkles } from "lucide-react";

import { Blog7 } from "@/components/blog7";
import SectionHeader from "@/components/section-header";
import { getAllBlogs } from "@/lib/blog";

export default function BlogPage() {
  const blogPosts = getAllBlogs();

  const posts = blogPosts.map((post) => ({
    id: post.slug,
    title: post.title,
    summary: post.description,
    label: post.tags?.[0] ?? "Blog",
    author: post.author,
    published: new Date(post.date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }),
    url: `/blog/${post.slug}`,
    image: post.coverImage,
  }));

  // Show "Coming Soon" if no blog posts
  if (posts.length === 0) {
    return (
      <section className="hero-padding-margin container">
        <div className="mx-auto max-w-3xl text-center">
          <SectionHeader
            icon={<Paperclip />}
            category="Blog"
            title="Fisca Insights"
            description="The latest insights in optimising your PDP images, videos, copy and page layout for conversion and AI Search."
            isCenter
          />

          <div className="mt-16 rounded-3xl border border-border bg-card p-12 md:p-16">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
              <Sparkles className="h-10 w-10 text-primary" />
            </div>

            <h2 className="mt-6 text-2xl font-semibold md:text-3xl">
              Coming Soon
            </h2>

            <p className="mt-4 text-lg text-muted-foreground">
              We're crafting insightful content about AI media generation,
              product detail page optimization, and how to win in AI search.
            </p>

            <p className="mt-4 text-sm text-muted-foreground">
              Check back soon for expert tips, case studies, and industry
              insights.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="hero-padding-margin container space-y-10.5">
        <SectionHeader
          icon={<Paperclip />}
          category="Blog"
          title="Fisca Insights"
          description="The latest insights in optimising your PDP images, videos, copy and page layout for conversion and AI Search."
          isCenter
        />
      </section>
      <Blog7 hideHeader posts={posts} />
    </>
  );
}
