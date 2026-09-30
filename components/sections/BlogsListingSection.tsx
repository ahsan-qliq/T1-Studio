"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Link } from "@/app/i18n/navigation";
import { cn } from "@/lib/utils";

const DEFAULT_INITIAL = 7;
const DEFAULT_LOAD_MORE = 6;

// ─── Public types ─────────────────────────────────────────────────────────────

export interface BlogListPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  categoryKey: string;
  readTime?: string;
  image: { src: string; alt: string };
  href: string;
}

export interface BlogsListingSectionProps {
  heading: string;
  readMoreLabel: string;
  loadMoreLabel: string;
  noResultsLabel: string;
  clearFiltersLabel: string;
  enableCategoryFilter?: boolean;
  enableLoadMore?: boolean;
  initialDisplayCount?: number;
  loadMoreCount?: number;
  filterOptions: { value: string; label: string }[];
  posts: BlogListPost[];
}

// ─── Badge ────────────────────────────────────────────────────────────────────

function CategoryBadge({ label }: { label: string }) {
  return (
    <span className="rounded-full border border-white/25 bg-black/20 px-3 py-1 text-xs font-medium text-white/80">
      {label}
    </span>
  );
}

// ─── Featured card ─────────────────────────────────────────────────────────────
// Spans all 3 cols with its own internal 2-col grid: image (2fr) | content (3fr)

function FeaturedCard({
  post,
  readMoreLabel,
}: {
  post: BlogListPost;
  readMoreLabel: string;
}) {
  return (
    <div className="lg:col-span-2 lg:grid lg:grid-cols-[3fr_3fr]">
      {/* Image — wider 2fr column */}
      <div className="relative min-h-80 border-b border-white/10 lg:border-b-0 lg:border-r lg:min-h-0 lg:self-stretch">
        {post.image.src ? (
          <Image
            src={post.image.src}
            alt={post.image.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 40vw"
            className="object-cover"
            priority
          />
        ) : (
          <div className="absolute inset-0 bg-white/5" />
        )}
      </div>

      {/* Content — 3fr column */}
      <div className="flex flex-col justify-center gap-5 border-b border-white/10 px-8 py-12 lg:px-14 lg:py-20">
        {(post.category || post.readTime) && (
          <div className="flex items-center gap-3">
            {post.category && <CategoryBadge label={post.category} />}
            {post.readTime && (
              <span className="text-sm text-white/50">{post.readTime}</span>
            )}
          </div>
        )}

        <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
          {post.title}
        </h2>

        {post.excerpt && (
          <p className="max-w-lg text-sm leading-relaxed text-white/60 sm:text-[0.9375rem]">
            {post.excerpt}
          </p>
        )}

        <div>
          <Link
            href={post.href}
            className="group inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-2.5 text-sm font-medium text-white transition-colors duration-200 hover:border-white/60 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          >
            {readMoreLabel}
            <ArrowRight
              className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}

// ─── Compact card ─────────────────────────────────────────────────────────────
// isRight  → col 3 only — portrait image with title overlay, badge + readtime below
// !isRight → cols 1-2   — portrait image with title overlay, badge + readtime below

function CompactCard({
  post,
  isRight,
}: {
  post: BlogListPost;
  isRight: boolean;
}) {
  if (isRight) {
    return (
      <Link
        href={post.href}
        aria-label={post.title}
        className="group block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
      >
        {/* Portrait image with title overlay */}
        <div className="relative aspect-4/3 w-full overflow-hidden">
          {post.image.src ? (
            <Image
              src={post.image.src}
              alt={post.image.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 bg-white/5" />
          )}

          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 50%, transparent 75%)",
            }}
          />

          <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
            <h3 className="text-lg font-bold leading-tight text-white sm:text-xl">
              {post.title}
            </h3>
          </div>
        </div>

        {/* Badge + readtime below image */}
        {(post.category || post.readTime) && (
          <div className="flex items-center justify-between px-5 py-4 sm:px-6">
            {post.category && <CategoryBadge label={post.category} />}
            {post.readTime && (
              <span className="text-sm text-white/50">{post.readTime}</span>
            )}
          </div>
        )}
      </Link>
    );
  }

  return (
    <Link
      href={post.href}
      aria-label={post.title}
      className="group block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
    >
      {/* Portrait image with title overlay */}
      <div className="relative aspect-4/3 w-full overflow-hidden">
        {post.image.src ? (
          <Image
            src={post.image.src}
            alt={post.image.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 bg-white/5" />
        )}

        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 50%, transparent 75%)",
          }}
        />

        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
          <h3 className="text-xl font-bold leading-tight text-white sm:text-2xl">
            {post.title}
          </h3>
        </div>
      </div>

      {/* Badge + readtime below image */}
      {(post.category || post.readTime) && (
        <div className="flex items-center justify-between px-5 py-4 sm:px-6">
          {post.category && <CategoryBadge label={post.category} />}
          {post.readTime && (
            <span className="text-sm text-white/50">{post.readTime}</span>
          )}
        </div>
      )}
    </Link>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export function BlogsListingSection({
  heading,
  readMoreLabel,
  loadMoreLabel,
  noResultsLabel,
  clearFiltersLabel,
  enableCategoryFilter = true,
  enableLoadMore = true,
  initialDisplayCount = DEFAULT_INITIAL,
  loadMoreCount = DEFAULT_LOAD_MORE,
  filterOptions,
  posts,
}: BlogsListingSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(initialDisplayCount);

  const filtered = useMemo(
    () =>
      activeCategory
        ? posts.filter((p) => p.categoryKey === activeCategory)
        : posts,
    [posts, activeCategory],
  );

  const featured = filtered[0];
  const rest = filtered.slice(1);
  const visibleRest = rest.slice(0, Math.max(0, visibleCount - 1));
  const hasMore = enableLoadMore && rest.length > visibleRest.length;

  const handleCategoryToggle = (value: string) => {
    setActiveCategory((prev) => (prev === value ? null : value));
    setVisibleCount(initialDisplayCount);
  };

  const handleClearFilters = () => {
    setActiveCategory(null);
    setVisibleCount(initialDisplayCount);
  };

  return (
    <section aria-labelledby="blogs-listing-heading">
      <div className="mx-auto max-w-7xl">

        {/* ── Header: heading + category filter tabs ── */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 px-4 py-6 sm:px-8 lg:px-12">
          <h1
            id="blogs-listing-heading"
            className="text-3xl font-bold text-white sm:text-4xl"
          >
            {heading}
          </h1>

          {enableCategoryFilter && filterOptions.length > 0 && (
            <nav
              aria-label="Filter by category"
              className="flex flex-wrap items-center gap-2"
            >
              {filterOptions.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => handleCategoryToggle(opt.value)}
                  aria-pressed={activeCategory === opt.value}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-sm transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black",
                    activeCategory === opt.value
                      ? "border-white/70 text-white"
                      : "border-white/25 text-white/60 hover:border-white/40 hover:text-white/90",
                  )}
                >
                  {opt.label}
                  <ChevronDown className="size-3 opacity-70" aria-hidden="true" />
                </button>
              ))}
            </nav>
          )}
        </div>

        {/* ── Grid ── */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center gap-4 py-20 text-center">
            <p className="text-white/50">{noResultsLabel}</p>
            {activeCategory && (
              <button
                type="button"
                onClick={handleClearFilters}
                className="text-sm font-medium text-gold underline underline-offset-4 hover:text-gold/80"
              >
                {clearFiltersLabel}
              </button>
            )}
          </div>
        ) : (
          <div className="lg:grid lg:grid-cols-2">

            {/* Featured — spans all 3 cols with its own wider image layout */}
            {featured && (
              <FeaturedCard post={featured} readMoreLabel={readMoreLabel} />
            )}

            {/* Compact cards — staggered right / left */}
            {visibleRest.map((post, i) => {
              const isRight = i % 2 !== 0;
              return isRight ? (
                <React.Fragment key={post.id}>
                  {/* Empty dark cell — col 1 */}
                  <div
                    className="hidden border-b border-r border-white/10 lg:block"
                    aria-hidden="true"
                  />
                  {/* Card — col 3 only */}
                  <div className="border-b border-white/10">
                    <CompactCard post={post} isRight={false} />
                  </div>
                </React.Fragment>
              ) : (
                <React.Fragment key={post.id}>
                  {/* Card — col 1 */}
                  <div className="border-b border-r border-white/10">
                    <CompactCard post={post} isRight />
                  </div>
                  {/* Empty dark cell — col 3 */}
                  <div
                    className="hidden border-b border-white/10 lg:block"
                    aria-hidden="true"
                  />
                </React.Fragment>
              );
            })}
          </div>
        )}

        {/* ── Load more ── */}
        {hasMore && (
          <div className="flex justify-center border-t border-white/10 py-12">
            <button
              type="button"
              onClick={() => setVisibleCount((c) => c + loadMoreCount)}
              className="rounded-full border border-white/25 px-8 py-3 text-sm font-medium text-white transition-colors duration-200 hover:border-white/50 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              {loadMoreLabel}
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
