import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

interface Post {
  id: string;
  title: string;
  summary: string;
  label: string;
  author: string;
  published: string;
  url: string;
  image: string;
}

interface Blog7Props {
  tagline?: string;
  heading?: string;
  description?: string;
  buttonText?: string;
  buttonUrl?: string;
  posts: Post[];
  hideHeader?: boolean;
}

const Blog7 = ({
  tagline = "Latest Updates",
  heading = "Blog Posts",
  description = "Discover the latest trends, tips, and best practices in modern web development. From UI components to design systems, stay updated with our expert insights.",
  buttonText,
  buttonUrl,
  posts = [
    {
      id: "post-1",
      title: "Getting Started with shadcn/ui Components",
      summary:
        "Learn how to quickly integrate and customize shadcn/ui components in your Next.js projects. We'll cover installation, theming, and best practices for building modern interfaces.",
      label: "Tutorial",
      author: "Sarah Chen",
      published: "1 Jan 2024",
      url: "https://shadcnblocks.com",
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-1.svg",
    },
    {
      id: "post-2",
      title: "Building Accessible Web Applications",
      summary:
        "Explore how to create inclusive web experiences using shadcn/ui's accessible components. Discover practical tips for implementing ARIA labels, keyboard navigation, and semantic HTML.",
      label: "Accessibility",
      author: "Marcus Rodriguez",
      published: "1 Jan 2024",
      url: "https://shadcnblocks.com",
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-1.svg",
    },
    {
      id: "post-3",
      title: "Modern Design Systems with Tailwind CSS",
      summary:
        "Dive into creating scalable design systems using Tailwind CSS and shadcn/ui. Learn how to maintain consistency while building flexible and maintainable component libraries.",
      label: "Design Systems",
      author: "Emma Thompson",
      published: "1 Jan 2024",
      url: "https://shadcnblocks.com",
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-1.svg",
    },
  ],
  hideHeader = false,
}: Blog7Props) => {
  return (
    <section className="hero-padding-margin">
      <div className="container mx-auto flex flex-col items-center gap-16 lg:px-16">
        {!hideHeader && (
          <div className="text-center">
            <Badge variant="secondary" className="mb-6">
              {tagline}
            </Badge>
            <h2 className="mb-3 text-pretty text-3xl font-semibold md:mb-4 md:text-4xl lg:mb-6 lg:max-w-3xl lg:text-5xl">
              {heading}
            </h2>
            <p className="text-muted-foreground mb-8 md:text-base lg:max-w-2xl lg:text-lg">
              {description}
            </p>
            {buttonText && buttonUrl ? (
              <Button variant="link" className="w-full sm:w-auto" asChild>
                {buttonUrl.startsWith("/") ? (
                  <Link href={buttonUrl}>
                    {buttonText}
                    <ArrowRight className="ml-2 size-4" />
                  </Link>
                ) : (
                  <a href={buttonUrl} target="_blank" rel="noopener noreferrer">
                    {buttonText}
                    <ArrowRight className="ml-2 size-4" />
                  </a>
                )}
              </Button>
            ) : null}
          </div>
        )}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {posts.map((post) => (
            <Card
              key={post.id}
              className="grid grid-rows-[auto_auto_1fr_auto] overflow-hidden pt-0 rounded-3xl"
            >
              <div className="aspect-16/9 w-full rounded-t-3xl overflow-hidden">
                {post.url.startsWith("/") ? (
                  <Link
                    href={post.url}
                    className="fade-in transition-opacity duration-200 hover:opacity-70"
                  >
                    <img
                      src={post.image}
                      alt={post.title}
                      className="h-full w-full object-cover object-center"
                    />
                  </Link>
                ) : (
                  <a
                    href={post.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="fade-in transition-opacity duration-200 hover:opacity-70"
                  >
                    <img
                      src={post.image}
                      alt={post.title}
                      className="h-full w-full object-cover object-center"
                    />
                  </a>
                )}
              </div>
              <CardHeader>
                <h3 className="text-lg font-semibold md:text-xl">
                  {post.url.startsWith("/") ? (
                    <Link href={post.url} className="transition-colors hover:text-primary">
                      {post.title}
                    </Link>
                  ) : (
                    <a
                      href={post.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-colors hover:text-primary"
                    >
                      {post.title}
                    </a>
                  )}
                </h3>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{post.summary}</p>
              </CardContent>
              <CardFooter>
                {post.url.startsWith("/") ? (
                  <Link
                    href={post.url}
                    className="text-foreground flex items-center transition-colors hover:text-primary"
                  >
                    Read more
                    <ArrowRight className="ml-2 size-4" />
                  </Link>
                ) : (
                  <a
                    href={post.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground flex items-center transition-colors hover:text-primary"
                  >
                    Read more
                    <ArrowRight className="ml-2 size-4" />
                  </a>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Blog7 };
