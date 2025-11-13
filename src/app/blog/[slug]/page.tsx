import { compileMDX } from 'next-mdx-remote/rsc';
import { Blogpost5 } from '@/components/blogpost5';
import { getBlogBySlug, getBlogSlugs } from '@/lib/blog';

export async function generateStaticParams() {
  const slugs = getBlogSlugs();
  return slugs.map((slug) => ({
    slug: slug.replace(/\.mdx$/, ''),
  }));
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
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
