"use client";

import { useMemo, useState } from "react";

import { BlogCard, type Blog } from "./BlogCard";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

const blogs: Blog[] = [
  {
    id: "smart-kitchen-dubai",
    title: "Getting a smart kitchen in Dubai",
    category: "Tips & Tricks",
    readTime: "2 min read",
    excerpt:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus.",
    image: "/images/blog/smart-kitchen.jpg",
    href: "/blog/getting-a-smart-kitchen-in-dubai",
    featured: true,
  },
  {
    id: "functional-kitchen",
    title: "What are Functional Kitchen’s Essential Elements?",
    category: "Tips & Tricks",
    readTime: "2 min read",
    image: "/images/blog/functional-kitchen.jpg",
    href: "/blog/functional-kitchen-essential-elements",
  },
  {
    id: "dutch-kitchens",
    title: "Dutch kitchens in Dubai",
    category: "Tips & Tricks",
    readTime: "2 min read",
    image: "/images/blog/dutch-kitchens.jpg",
    href: "/blog/dutch-kitchens-in-dubai",
  },
  {
    id: "walk-in-wardrobe",
    title: "Best efficient Walk in Wardrobe in Dubai",
    category: "Tips & Tricks",
    readTime: "2 min read",
    image: "/images/blog/walk-in-wardrobe.jpg",
    href: "/blog/best-efficient-walk-in-wardrobe-dubai",
  },
];

const filters = {
  Trends: ["Trends"],
  Guides: ["Guides"],
  Materials: ["Materials"],
  Projects: ["Projects"],
  News: ["News"],
} as const;

export function BlogGrid() {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const filteredBlogs = useMemo(() => {
    if (!activeFilter) {
      return blogs;
    }

    return blogs.filter((blog) => blog.category === activeFilter);
  }, [activeFilter]);

  return (
    <section
      aria-labelledby="all-blogs-heading"
      className="min-h-screen bg-black text-white"
    >
      {/* Header */}
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-8 px-6 py-7 md:px-8 lg:px-10">
          <h1
            id="all-blogs-heading"
            className="text-2xl font-medium tracking-tight md:text-3xl"
          >
            All Blogs
          </h1>

          <nav aria-label="Blog categories">
            <ul className="flex flex-wrap items-center justify-end gap-2">
              {Object.keys(filters).map((filter) => (
                <li key={filter}>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 rounded-full border-white/10 bg-transparent px-3 text-[10px] font-normal text-white hover:bg-white/10 hover:text-white"
                      >
                        {filter}
                        <ChevronDown
                          className="ml-1 size-3"
                          aria-hidden="true"
                        />
                      </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => setActiveFilter(filter)}
                      >
                        {filter}
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        onClick={() => setActiveFilter(null)}
                      >
                        All
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      {/* Blog grid */}
      <div className="mx-auto max-w-[1400px] px-1 md:px-4">
        <div
          className="
            grid
            grid-cols-1
            gap-0
            md:grid-cols-12
            md:auto-rows-[74px]
          "
        >
          {filteredBlogs.map((blog, index) => {
            /*
             * Desktop positioning reproduces the staggered
             * layout from the screenshot.
             */
            const layout =
              index === 0
                ? "md:col-span-5 md:row-span-4"
                : index === 1
                  ? "md:col-start-7 md:col-span-5 md:row-start-5 md:row-span-3"
                  : index === 2
                    ? "md:col-start-4 md:col-span-3 md:row-start-8 md:row-span-4"
                    : "md:col-start-7 md:col-span-4 md:row-start-12 md:row-span-3";

            return (
              <BlogCard
                key={blog.id}
                blog={blog}
                className={`
                  ${layout}
                  border-r border-b border-white/10
                `}
              />
            );
          })}
        </div>

        {/* Load more */}
        <div className="flex justify-center py-10">
          <Button
            type="button"
            variant="outline"
            className="rounded-full border-white/20 bg-white px-6 text-xs text-black hover:bg-white/90"
          >
            Load More
            <span className="sr-only"> blog posts</span>
          </Button>
        </div>
      </div>
    </section>
  );
}