import { compileMDX } from "next-mdx-remote/rsc";
import { Blogpost5 } from "@/components/blogpost5";
import { getBlogBySlug, getBlogSlugs } from "@/lib/blog";

export async function generateStaticParams() {
  const slugs = getBlogSlugs();
  if (slugs.length === 0) {
    // Return a placeholder slug for "coming soon" page
    return [{ slug: "coming-soon" }];
  }
  return slugs.map((slug) => ({
    slug: slug.replace(/\.mdx$/, ""),
  }));
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // If no blog posts, show coming soon for any slug
  const slugs = getBlogSlugs();
  if (slugs.length === 0) {
    return (
      <section className="hero-padding-margin container">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-3xl font-bold mb-4">Coming Soon</h1>
          <p className="text-lg text-muted-foreground">
            We're crafting insightful content about AI media generation, product
            detail page optimization, and how to win in AI search.
          </p>
          <p className="mt-4 text-sm text-muted-foreground">
            Check back soon for expert tips, case studies, and industry
            insights.
          </p>
        </div>
      </section>
    );
  }

  const post = getBlogBySlug(slug);
  const { content } = await compileMDX({
    source: post.content,
    options: { parseFrontmatter: true },
  });

  return (
    <Blogpost5
      title={post.title}
      authorName={post.author}
      date={post.date}
      description={post.description}
      coverImage={post.coverImage}
    >
      {content}
    </Blogpost5>
  );
}
