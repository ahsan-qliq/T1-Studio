'use client';

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link2 } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

export interface BlogDetailArticleLayoutProps {
  blocks: Array<{
    id: string;
    label: string;
    body: string;
    image?: { src: string; alt: string };
    bodyAfter?: string;
  }>;
  authorQuote?: string;
  authorName?: string;
  authorRole?: string;
  authorExperience?: string;
  authorImage?: { src: string; alt: string };
  sidebarImage?: { src: string; alt: string };
}

function ContentBlock({
  block,
}: {
  block: BlogDetailArticleLayoutProps["blocks"][number];
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref as React.RefObject<Element>, {
    once: true,
    margin: "-80px",
  });

  return (
    <motion.section
      ref={ref}
      id={block.id}
      aria-labelledby={`${block.id}-heading`}
      className="flex flex-col gap-5"
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: EASE }}
    >
      <h2
        id={`${block.id}-heading`}
        className="text-2xl font-bold text-white"
      >
        {block.label}
      </h2>
      {block.body && (
        <p className="text-sm leading-relaxed text-white/70 sm:text-[0.9375rem]">
          {block.body}
        </p>
      )}
      {block.image && (
        <div className="relative w-full overflow-hidden" style={{ aspectRatio: "16/9" }}>
          <Image
            src={block.image.src}
            alt={block.image.alt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 65vw, 800px"
            className="object-cover"
          />
        </div>
      )}
      {block.bodyAfter && (
        <p className="text-sm leading-relaxed text-white/70 sm:text-[0.9375rem]">
          {block.bodyAfter}
        </p>
      )}
    </motion.section>
  );
}

function InlineBlockquote({
  quote,
  authorName,
  authorRole,
  authorImage,
}: {
  quote: string;
  authorName?: string;
  authorRole?: string;
  authorImage?: { src: string; alt: string };
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref as React.RefObject<Element>, {
    once: true,
    margin: "-80px",
  });

  return (
    <motion.div
      ref={ref}
      className="relative rounded-sm border border-white/10 bg-white/[0.03] p-7 sm:p-9"
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: EASE }}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-3 left-6 select-none font-serif text-7xl leading-none text-white/10"
      >
        &ldquo;
      </span>
      <blockquote className="relative z-10 mb-6 text-lg font-medium leading-snug text-white sm:text-xl">
        &ldquo;{quote}&rdquo;
      </blockquote>
      {(authorName || authorImage) && (
        <div className="flex items-center gap-3">
          {authorImage && (
            <div className="relative size-10 shrink-0 overflow-hidden rounded-full border border-white/10">
              <Image
                src={authorImage.src}
                alt={authorImage.alt}
                fill
                sizes="40px"
                className="object-cover"
              />
            </div>
          )}
          <div className="flex flex-col leading-tight">
            {authorName && (
              <span className="text-sm font-semibold text-white">
                {authorName}
              </span>
            )}
            {authorRole && (
              <span className="text-xs text-white/40">{authorRole}</span>
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
}

function AuthorBioCard({
  authorName,
  authorRole,
  authorExperience,
  authorImage,
}: {
  authorName?: string;
  authorRole?: string;
  authorExperience?: string;
  authorImage?: { src: string; alt: string };
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref as React.RefObject<Element>, {
    once: true,
    margin: "-80px",
  });

  return (
    <motion.div
      ref={ref}
      className="flex flex-col sm:flex-row gap-6 border-t border-white/10 pt-10"
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: EASE }}
    >
      {authorImage && (
        <div className="relative size-20 shrink-0 overflow-hidden rounded-full border border-white/10 sm:size-24">
          <Image
            src={authorImage.src}
            alt={authorImage.alt}
            fill
            sizes="96px"
            className="object-cover"
          />
        </div>
      )}
      <div className="flex flex-col gap-3">
        {authorName && (
          <div>
            <p className="text-xs uppercase tracking-widest text-white/30 mb-1">
              Written by
            </p>
            <p className="text-lg font-bold text-white">{authorName}</p>
          </div>
        )}
        {authorRole && (
          <p className="text-sm text-white/50">{authorRole}</p>
        )}
        {authorExperience && (
          <p className="text-sm leading-relaxed text-white/60">
            {authorExperience}
          </p>
        )}
        <div
          className="flex items-center gap-2.5 mt-1"
          role="group"
          aria-label="Author social links"
        >
          <a
            href="#"
            aria-label={`${authorName ?? "Author"} on LinkedIn`}
            className="inline-flex size-8 items-center justify-center rounded-full border border-white/20 text-white/50 hover:border-white/40 hover:text-white transition-colors duration-200"
          >
            <svg
              aria-hidden="true"
              className="size-3.5"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect x="2" y="9" width="4" height="12" />
              <circle cx="4" cy="4" r="2" />
            </svg>
          </a>
          <a
            href="#"
            aria-label={`${authorName ?? "Author"} on Instagram`}
            className="inline-flex size-8 items-center justify-center rounded-full border border-white/20 text-white/50 hover:border-white/40 hover:text-white transition-colors duration-200"
          >
            <svg
              aria-hidden="true"
              className="size-3.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
          </a>
          <a
            href="#"
            aria-label={`${authorName ?? "Author"} website`}
            className="inline-flex size-8 items-center justify-center rounded-full border border-white/20 text-white/50 hover:border-white/40 hover:text-white transition-colors duration-200"
          >
            <Link2 className="size-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}

function TableOfContents({
  items,
}: {
  items: Array<{ id: string; label: string }>;
}) {
  return (
    <nav aria-label="Table of contents">
      <div className="border border-white/10 p-5">
        <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/40">
          Table of Contents
        </p>
        <ol className="flex flex-col gap-2.5">
          {items.map((item, i) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className="group flex items-start gap-3 text-sm text-white/50 hover:text-white transition-colors duration-200"
              >
                <span
                  className="shrink-0 text-xs text-white/20 group-hover:text-white/40 transition-colors duration-200 tabular-nums pt-px"
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="leading-snug">{item.label}</span>
              </a>
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}

export function BlogDetailArticleLayout({
  blocks,
  authorQuote,
  authorName,
  authorRole,
  authorExperience,
  authorImage,
  sidebarImage,
}: BlogDetailArticleLayoutProps) {
  const tocItems = blocks.map((b) => ({ id: b.id, label: b.label }));

  return (
    <section
      aria-label="Article content"
      className="bg-[#0C0C0C] py-14"
    >
      <div className="grid lg:grid-cols-[1fr_300px] gap-10 xl:gap-14 max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <article className="flex flex-col gap-14">
          {blocks.map((block) => (
            <ContentBlock key={block.id} block={block} />
          ))}

          {authorQuote && (
            <InlineBlockquote
              quote={authorQuote}
              authorName={authorName}
              authorRole={authorRole}
              authorImage={authorImage}
            />
          )}

          <AuthorBioCard
            authorName={authorName}
            authorRole={authorRole}
            authorExperience={authorExperience}
            authorImage={authorImage}
          />
        </article>

        <aside className="hidden lg:block" aria-label="Article sidebar">
          <div className="sticky top-24 flex flex-col gap-6">
            {tocItems.length > 0 && <TableOfContents items={tocItems} />}
            {sidebarImage && (
              <div className="relative w-full overflow-hidden" style={{ aspectRatio: "4/3" }}>
                <Image
                  src={sidebarImage.src}
                  alt={sidebarImage.alt}
                  fill
                  sizes="300px"
                  className="object-cover"
                />
              </div>
            )}
          </div>
        </aside>
      </div>
    </section>
  );
}
