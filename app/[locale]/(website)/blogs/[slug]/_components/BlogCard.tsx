import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

export interface Blog {
  id: string;
  title: string;
  category: string;
  readTime: string;
  excerpt?: string;
  image: string;
  href: string;
  featured?: boolean;
}

interface BlogCardProps {
  blog: Blog;
  className?: string;
}

export function BlogCard({ blog, className }: BlogCardProps) {
  return (
    <article
      className={cn(
        "group relative overflow-hidden bg-muted",
        "min-h-[280px]",
        className
      )}
    >
      <Link
        href={blog.href}
        className="absolute inset-0 z-10 rounded-[inherit] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
        aria-label={`Read ${blog.title}`}
      >
        <span className="sr-only">Read {blog.title}</span>
      </Link>

      <Image
        src={blog.image}
        alt=""
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
      />

      {/* Image overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
      />

      <div className="absolute inset-x-0 bottom-0 p-5 text-white md:p-6">
        <div className="mb-3 flex items-center justify-between gap-4">
          <span className="inline-flex w-fit rounded-full bg-white px-2.5 py-1 text-[10px] font-medium text-black">
            {blog.category}
          </span>

          <span className="text-xs font-medium whitespace-nowrap">
            {blog.readTime}
          </span>
        </div>

        <h2 className="max-w-[500px] text-xl font-medium leading-tight tracking-tight md:text-2xl">
          {blog.title}
        </h2>

        {blog.excerpt && (
          <p className="mt-2 line-clamp-2 max-w-xl text-xs leading-relaxed text-white/75">
            {blog.excerpt}
          </p>
        )}
      </div>
    </article>
  );
}