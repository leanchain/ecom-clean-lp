"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, Search, X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type BlogIndexPost = {
  id: string;
  title: string;
  summary: string;
  author: string;
  dateISO: string;
  published: string;
  url: string;
  image?: string;
  tags: string[];
  isComparison: boolean;
  comparisonRank: number;
  readingTimeMinutes: number;
};

function normalize(text: string) {
  return text.toLowerCase().trim();
}

export function BlogIndexClient({ posts }: { posts: BlogIndexPost[] }) {
  const hasComparisons = posts.some((p) => p.isComparison);
  const defaultTab = hasComparisons ? "comparisons" : "all";

  const [tab, setTab] = useState<string>(defaultTab);
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string>("All");

  const tags = useMemo(() => {
    const counts = new Map<string, number>();
    for (const post of posts) {
      for (const tag of post.tags) {
        counts.set(tag, (counts.get(tag) ?? 0) + 1);
      }
    }

    const tagList = Array.from(counts.entries())
      .sort((a, b) => {
        if (a[0] === "Comparison") return -1;
        if (b[0] === "Comparison") return 1;
        return a[0].localeCompare(b[0]);
      })
      .map(([tag, count]) => ({ tag, count }));

    return [{ tag: "All", count: posts.length }, ...tagList];
  }, [posts]);

  const visiblePosts = useMemo(() => {
    const q = normalize(query);

    const filtered = posts.filter((post) => {
      if (tab === "comparisons" && !post.isComparison) return false;

      if (activeTag !== "All" && !post.tags.includes(activeTag)) return false;

      if (!q) return true;
      const haystack = normalize(
        [post.title, post.summary, post.author, post.tags.join(" ")].join(" "),
      );
      return haystack.includes(q);
    });

    filtered.sort((a, b) => {
      if (a.isComparison && b.isComparison) {
        if (a.comparisonRank !== b.comparisonRank) {
          return a.comparisonRank - b.comparisonRank;
        }
        return a.title.localeCompare(b.title);
      }
      if (a.isComparison !== b.isComparison) return a.isComparison ? -1 : 1;
      return b.dateISO.localeCompare(a.dateISO);
    });

    return filtered;
  }, [posts, tab, activeTag, query]);

  const topComparisons = useMemo(() => {
    return posts
      .filter((p) => p.isComparison)
      .slice()
      .sort((a, b) => a.comparisonRank - b.comparisonRank)
      .slice(0, 5);
  }, [posts]);

  const showStartHere =
    tab === "comparisons" &&
    query.trim().length === 0 &&
    activeTag === "All" &&
    topComparisons.length > 0;

  const gridPosts =
    showStartHere && visiblePosts.length > 4
      ? visiblePosts.slice(4)
      : visiblePosts;

  return (
    <div className="mt-10">
      <Tabs value={tab} onValueChange={setTab}>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <TabsList className="w-fit">
            <TabsTrigger value="comparisons">Comparisons</TabsTrigger>
            <TabsTrigger value="all">All posts</TabsTrigger>
          </TabsList>

          <div className="relative w-full md:max-w-md">
            <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              aria-label="Search posts"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search comparisons, tags, or keywords…"
              className="pl-11 pr-11"
              variant="flat"
              animate={false}
            />
            {query.length > 0 && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
                aria-label="Clear search"
              >
                <X className="size-4" />
              </button>
            )}
          </div>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-2">
          {tags.slice(0, 12).map(({ tag, count }) => {
            const isActive = activeTag === tag;
            return (
              <button
                key={tag}
                type="button"
                onClick={() => setActiveTag(tag)}
                className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-full"
              >
                <Badge
                  variant={isActive ? "gradient" : "outline"}
                  className={cn("cursor-pointer", isActive && "shadow-sm")}
                >
                  {tag}
                  <span className="ml-2 rounded-full bg-background/70 px-2 py-0.5 text-[10px] font-semibold text-foreground/80">
                    {count}
                  </span>
                </Badge>
              </button>
            );
          })}
        </div>

        <TabsContent value="comparisons">
          <div className="mt-8">
            <PostGrid posts={gridPosts} />
          </div>
        </TabsContent>

        <TabsContent value="all">
          <div className="mt-8">
            <PostGrid posts={visiblePosts} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function PostGrid({ posts }: { posts: BlogIndexPost[] }) {
  if (posts.length === 0) {
    return (
      <Card className="rounded-3xl border border-border bg-card">
        <CardContent className="p-10 text-center">
          <p className="text-lg font-semibold">No matches</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Try a different search term or tag.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}

function PostCard({ post }: { post: BlogIndexPost }) {
  return (
    <Card variant="interactive" className="overflow-hidden rounded-3xl pt-0">
      <div className="aspect-16/9 w-full overflow-hidden">
        <Link
          href={post.url}
          className="fade-in block transition-opacity duration-200 hover:opacity-80"
        >
          <img
            src={post.image || "/images/blog/vs/_default.svg"}
            alt={post.title}
            className="h-full w-full object-cover object-center"
            loading="lazy"
          />
        </Link>
      </div>

      <CardHeader className="pb-3">
        <div className="flex flex-wrap items-center gap-2">
          {post.tags.slice(0, 2).map((tag) => (
            <Badge key={tag} variant="outline" size="sm">
              {tag}
            </Badge>
          ))}
          {post.readingTimeMinutes > 0 && (
            <span className="text-xs text-muted-foreground">
              {post.readingTimeMinutes} min read
            </span>
          )}
        </div>

        <CardTitle className="mt-2 text-lg md:text-xl">
          <Link
            href={post.url}
            className="transition-colors hover:text-primary"
          >
            {post.title}
          </Link>
        </CardTitle>
      </CardHeader>

      <CardContent className="pt-0">
        <p className="text-sm text-muted-foreground">{post.summary}</p>
      </CardContent>

      <CardFooter className="justify-between">
        <div className="text-xs text-muted-foreground">
          <span className="font-medium text-foreground">{post.author}</span>
          <span className="mx-1">·</span>
          <span>{post.published}</span>
        </div>
        <Link
          href={post.url}
          className="text-sm text-foreground hover:text-primary hover:underline underline-offset-4"
        >
          Read
        </Link>
      </CardFooter>
    </Card>
  );
}
