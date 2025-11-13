import { Blog7 } from "@/components/blog7";
import SectionHeader from "@/components/section-header";
import { getAllBlogs } from "@/lib/blog";
import { Paperclip } from "lucide-react";

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

  return (
    <>
      <section className="hero-padding-margin container space-y-10.5">
        <SectionHeader
          icon={<Paperclip />}
          category="Blog"
          title="Sound Insights"
          description="Stay updated with the latest trends in audio technology, speaker innovations, and expert tips to enhance your listening experience."
          isCenter
        />
      </section>
      <Blog7 hideHeader posts={posts} />
    </>
  );
}
