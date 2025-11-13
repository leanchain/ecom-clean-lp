"use client";

import { Facebook, Home, Linkedin, Twitter } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

import { cn } from "@/lib/utils";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

type Blogpost5Props = {
  title: string;
  authorName: string;
  authorAvatar?: string;
  date: string; // ISO or readable string
  description?: string;
  coverImage?: string;
  children?: React.ReactNode;
};

const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

const Blogpost5 = ({
  title,
  authorName,
  authorAvatar = "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp",
  date,
  description,
  coverImage,
  children,
}: Blogpost5Props) => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [toc, setToc] = useState<Array<{ id: string; text: string }>>([]);
  const contentRef = useRef<HTMLDivElement | null>(null);

  const formattedDate = useMemo(() => {
    const d = new Date(date);
    return isNaN(d.getTime())
      ? date
      : d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  }, [date]);

  useEffect(() => {
    if (!contentRef.current) return;

    const headings = Array.from(
      contentRef.current.querySelectorAll<HTMLHeadingElement>("h2, h3"),
    );

    const tocEntries: Array<{ id: string; text: string }> = [];
    headings.forEach((el) => {
      const text = el.textContent?.trim() || "";
      if (!text) return;
      let id = el.id;
      if (!id) {
        id = slugify(text);
        el.id = id;
      }
      tocEntries.push({ id, text });
    });
    setToc(tocEntries);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting);
        if (visible) setActiveId((visible.target as HTMLElement).id);
      },
      { rootMargin: "0px 0px -60% 0px", threshold: 0.1 },
    );

    headings.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [children]);

  return (
    <section className="py-32">
      <div className="container">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">
                <Home className="h-4 w-4" />
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/blog">Blog</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className="mb-7 mt-9 max-w-3xl text-4xl font-bold md:mb-10 md:text-7xl">
          {title}
        </h1>
        <div className="flex items-center gap-3 text-sm md:text-base">
          <Avatar className="h-8 w-8 border">
            <AvatarImage src={authorAvatar} />
          </Avatar>
          <span>
            <span className="font-medium">{authorName}</span>
            <span className="text-muted-foreground ml-1">on {formattedDate}</span>
          </span>
        </div>
        <div className="relative mt-12 grid max-w-7xl gap-14 lg:mt-14 lg:grid lg:grid-cols-12 lg:gap-6">
          {/* Sidebar moved to the left */}
          <div className="order-1 flex h-fit flex-col text-sm lg:sticky lg:top-8 lg:order-none lg:col-span-3 lg:col-start-1 lg:text-xs">
            <div className="order-3 lg:order-none">
              <span className="text-xs font-medium">ON THIS PAGE</span>
              <nav className="mt-2 lg:mt-4">
                <ul className="space-y-1">
                  {toc.map((item) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        className={cn(
                          "block py-1 transition-colors duration-200",
                          activeId === item.id
                            ? "text-muted-foreground lg:text-primary"
                            : "text-muted-foreground hover:text-primary",
                        )}
                      >
                        {item.text}
                      </a>
                    </li>
                  ))}
                  {toc.length === 0 && (
                    <li className="text-muted-foreground text-xs">No sections</li>
                  )}
                </ul>
              </nav>
            </div>
            <Separator className="order-2 mb-11 mt-8 lg:hidden" />
            <div className="order-1 flex flex-col gap-2 lg:order-none lg:mt-9">
              <p className="text-muted-foreground font-medium">Share this article:</p>
              <ul className="flex gap-2">
                <li>
                  <Button variant="secondary" size="icon" className="group rounded-full">
                    <a href="#">
                      <Facebook className="fill-muted-foreground text-muted-foreground group-hover:fill-primary group-hover:text-primary h-4 w-4 transition-colors" />
                    </a>
                  </Button>
                </li>
                <li>
                  <Button variant="secondary" size="icon" className="group rounded-full">
                    <a href="#">
                      <Linkedin className="fill-muted-foreground text-muted-foreground group-hover:fill-primary group-hover:text-primary h-4 w-4 transition-colors" />
                    </a>
                  </Button>
                </li>
                <li>
                  <Button variant="secondary" size="icon" className="group rounded-full">
                    <a href="#">
                      <Twitter className="fill-muted-foreground text-muted-foreground group-hover:fill-primary group-hover:text-primary h-4 w-4 transition-colors" />
                    </a>
                  </Button>
                </li>
              </ul>
            </div>
          </div>

          {/* Main content */}
          <div className="order-2 lg:order-none lg:col-span-8 lg:col-start-5">
            {coverImage && (
              <img
                src={coverImage}
                alt={title}
                className="mb-8 mt-0 aspect-video w-full rounded-lg border object-cover"
              />
            )}
            {description && (
              <p className="text-muted-foreground text-sm">{description}</p>
            )}
            <div ref={contentRef} className="prose-brand my-8">
              {children}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Blogpost5 };
