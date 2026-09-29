import Image from "next/image";
import { ChevronRight, Clock, Link2 } from "lucide-react";
import { Link } from "@/app/i18n/navigation";

export interface BlogDetailHeroProps {
  category?: string;
  readTime?: string;
  title: string;
  excerpt?: string;
  publishedAt?: string | null;
  updatedAt?: string;
  authorName?: string;
  authorRole?: string;
  authorImage?: { src: string; alt: string };
  heroImage?: { src: string; alt: string };
  breadcrumbs?: Array<{ label: string; href?: string }>;
}

function formatDate(dateStr?: string | null): string {
  if (!dateStr) return "";
  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(dateStr));
}

export function BlogDetailHeroSection({
  category,
  readTime,
  title,
  excerpt,
  publishedAt,
  updatedAt,
  authorName,
  authorRole,
  authorImage,
  heroImage,
  breadcrumbs,
}: BlogDetailHeroProps) {
  const pageUrl = typeof window !== "undefined" ? window.location.href : "";

  return (
    <section
      aria-labelledby="blog-hero-heading"
      className="bg-[#0C0C0C] py-12 sm:py-16 lg:py-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-1.5 text-xs text-white/40">
              {breadcrumbs.map((crumb, i) => (
                <li key={i} className="flex items-center gap-1.5">
                  {i > 0 && (
                    <ChevronRight
                      className="size-3 text-white/20 flex-shrink-0"
                      aria-hidden="true"
                    />
                  )}
                  {crumb.href ? (
                    <Link
                      href={crumb.href}
                      className="hover:text-white/70 transition-colors duration-200 truncate max-w-[120px] sm:max-w-none"
                    >
                      {crumb.label}
                    </Link>
                  ) : (
                    <span
                      aria-current="page"
                      className="truncate max-w-[120px] sm:max-w-xs text-white/60"
                    >
                      {crumb.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        <div className="grid lg:grid-cols-2 gap-10 xl:gap-16 items-center">
          <div className="flex flex-col gap-6">
            <div className="flex flex-wrap items-center gap-3">
              {category && (
                <span className="inline-flex items-center rounded-full border border-white/20 px-3.5 py-1 text-xs font-medium text-white/70">
                  {category}
                </span>
              )}
              {readTime && (
                <span className="inline-flex items-center gap-1.5 text-xs text-white/40">
                  <Clock className="size-3.5" aria-hidden="true" />
                  {readTime}
                </span>
              )}
            </div>

            <h1
              id="blog-hero-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-[1.1] tracking-tight"
            >
              {title}
            </h1>

            {excerpt && (
              <p className="text-base leading-relaxed text-white/60 max-w-xl">
                {excerpt}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-x-5 gap-y-3 text-xs text-white/50">
              {(authorName || authorImage) && (
                <div className="flex items-center gap-2.5">
                  {authorImage ? (
                    <div className="relative size-8 overflow-hidden rounded-full border border-white/10 flex-shrink-0">
                      <Image
                        src={authorImage.src}
                        alt={authorImage.alt}
                        fill
                        sizes="32px"
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div
                      className="size-8 rounded-full bg-white/10 flex-shrink-0"
                      aria-hidden="true"
                    />
                  )}
                  <div className="flex flex-col leading-tight">
                    {authorName && (
                      <span className="text-white/80 font-medium">
                        By {authorName}
                      </span>
                    )}
                    {authorRole && (
                      <span className="text-white/40">{authorRole}</span>
                    )}
                  </div>
                </div>
              )}

              {(publishedAt || updatedAt) && (
                <>
                  <span
                    className="hidden sm:block h-3 w-px bg-white/20"
                    aria-hidden="true"
                  />
                  <div className="flex flex-col gap-0.5">
                    {publishedAt && (
                      <span>
                        <span className="text-white/30">Published: </span>
                        {formatDate(publishedAt)}
                      </span>
                    )}
                    {updatedAt && (
                      <span>
                        <span className="text-white/30">Last updated: </span>
                        {formatDate(updatedAt)}
                      </span>
                    )}
                  </div>
                </>
              )}
            </div>

            <div
              className="flex items-center gap-2.5"
              role="group"
              aria-label="Share this article"
            >
              <span className="text-xs text-white/30 mr-1">Share:</span>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Share on Facebook"
                className="inline-flex size-9 items-center justify-center rounded-full border border-white/20 text-white/50 hover:border-white/40 hover:text-white transition-colors duration-200"
              >
                <svg
                  aria-hidden="true"
                  className="size-4"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Share on LinkedIn"
                className="inline-flex size-9 items-center justify-center rounded-full border border-white/20 text-white/50 hover:border-white/40 hover:text-white transition-colors duration-200"
              >
                <svg
                  aria-hidden="true"
                  className="size-4"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
              <a
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(pageUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Share on X (Twitter)"
                className="inline-flex size-9 items-center justify-center rounded-full border border-white/20 text-white/50 hover:border-white/40 hover:text-white transition-colors duration-200"
              >
                <svg
                  aria-hidden="true"
                  className="size-4"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <span
                role="button"
                tabIndex={0}
                aria-label="Copy link"
                className="inline-flex size-9 items-center justify-center rounded-full border border-white/20 text-white/50 hover:border-white/40 hover:text-white transition-colors duration-200 cursor-pointer"
              >
                <Link2 className="size-4" aria-hidden="true" />
              </span>
            </div>
          </div>

          {heroImage && (
            <div className="relative w-full aspect-4/3 overflow-hidden">
              <Image
                src={heroImage.src}
                alt={heroImage.alt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
