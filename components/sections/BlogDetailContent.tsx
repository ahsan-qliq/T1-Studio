'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Link } from '@/app/i18n/navigation';
import { Plus, Minus, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ShareButtons } from '@/components/ui/ShareButtons';

// ─── Block types ──────────────────────────────────────────────────────────────

export type ParagraphBlock = {
  type: 'paragraph';
  id: string;
  eyebrow?: string;
  heading: string;
  body: string;
};

export type StepsBlock = {
  type: 'steps';
  id: string;
  eyebrow?: string;
  heading: string;
  steps: { title: string; body: string }[];
};

export type ListBlock = {
  type: 'list';
  id: string;
  eyebrow?: string;
  heading: string;
  items: string[];
};

export type TableBlock = {
  type: 'table';
  id: string;
  eyebrow?: string;
  heading: string;
  headers: string[];
  rows: string[][];
};

export type FaqBlock = {
  type: 'faq';
  id: string;
  eyebrow?: string;
  heading: string;
  faqs: { question: string; answer: string }[];
};

export type CtaBlock = {
  type: 'cta';
  id: string;
  eyebrow?: string;
  heading: string;
  body: string;
  buttonLabel: string;
  buttonHref: string;
};

export type ArticleBlock =
  | ParagraphBlock
  | StepsBlock
  | ListBlock
  | TableBlock
  | FaqBlock
  | CtaBlock;

export interface AuthorBio {
  name: string;
  role: string;
  experience: string;
  image?: { src: string; alt: string };
}

export interface BlogDetailContentProps {
  blocks: ArticleBlock[];
  authorBio?: AuthorBio;
  title?: string;
}

// ─── TOC helpers ─────────────────────────────────────────────────────────────

interface TocSubItem {
  id: string;
  label: string;
  numStr: string;
}

interface TocItem {
  id: string;
  label: string;
  num: number;
  subItems?: TocSubItem[];
}

function pad(n: number): string {
  return String(n).padStart(2, '0');
}

function buildToc(blocks: ArticleBlock[]): TocItem[] {
  let mainIndex = 0;
  const items: TocItem[] = [];

  for (const block of blocks) {
    if (block.type === 'cta') continue;
    mainIndex += 1;
    const item: TocItem = { id: block.id, label: block.heading, num: mainIndex };
    if (block.type === 'steps') {
      item.subItems = block.steps.map((step, i) => ({
        id: `${block.id}-step-${i}`,
        label: step.title,
        numStr: `${mainIndex}.${i + 1}`,
      }));
    }
    items.push(item);
  }

  return items;
}

// ─── TableOfContents ─────────────────────────────────────────────────────────

function TableOfContents({
  items,
  activeId,
  onItemClick,
}: {
  items: TocItem[];
  activeId: string;
  onItemClick?: () => void;
}) {
  function scrollTo(id: string) {
    const el = document.getElementById(id);
    if (!el) return;
    const offset = 96;
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
    onItemClick?.();
  }
  return (
    <nav aria-label="Table of contents">
      <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/30">
        Table of Contents
      </p>
      <ol className="flex flex-col gap-1">
        {items.filter((fil)=>fil.label !=='').map((item, index) => {
          const isActive = activeId === item.id;
          return (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => scrollTo(item.id)}
                className={cn(
                  'flex w-full items-start gap-2 py-1 text-left text-xs leading-snug transition-colors',
                  isActive
                    ? 'border-l-2 border-white pl-3 text-white'
                    : 'border-l border-white/10 pl-3.5 text-white/45 hover:text-white/75',
                )}
              >
                <span className="text-xs tabular-nums text-white/30 shrink-0 w-6">
                  {index +1 }
                </span>
                <span>{item.label}</span>
              </button>
              {item.subItems && item.subItems.length > 0 && (
                <ol className="mt-0.5 flex flex-col gap-0.5">
                  {item.subItems.map((sub) => {
                    const subActive = activeId === sub.id;
                    return (
                      <li key={sub.id}>
                        <button
                          type="button"
                          onClick={() => scrollTo(sub.id)}
                          className={cn(
                            'flex w-full items-start gap-2 pl-10 py-1 text-left text-xs leading-snug transition-colors',
                            subActive
                              ? 'border-l-2 border-white text-white'
                              : 'border-l border-white/10 text-white/35 hover:text-white/65',
                          )}
                        >
                          <span className="text-xs tabular-nums text-white/25 shrink-0 w-6">
                            {sub.numStr}
                          </span>
                          <span>{sub.label}</span>
                        </button>
                      </li>
                    );
                  })}
                </ol>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

// ─── Block sections ───────────────────────────────────────────────────────────

function Eyebrow({ text }: { text?: string }) {
  if (!text) return null;
  return (
    <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-white/30">
      {text}
    </p>
  );
}

function SectionHeading({ id, text }: { id: string; text: string }) {
  return (
    <h2
      id={`heading-${id}`}
      className="text-xl font-bold text-white sm:text-2xl mb-4"
    >
      {text}
    </h2>
  );
}

function Divider() {
  return <div className="border-b border-white/10 mt-10" aria-hidden="true" />;
}

function ParagraphSection({ block }: { block: ParagraphBlock }) {
  return (
    <>
      <section
        id={block.id}
        aria-labelledby={`heading-${block.id}`}
        className="pt-10 first:pt-0"
      >
        <Eyebrow text={block.eyebrow} />
        <SectionHeading id={block.id} text={block.heading} />
        <p className="text-sm leading-relaxed text-white/60 sm:text-base">{block.body}</p>
      </section>
      <Divider />
    </>
  );
}

function StepsSection({ block }: { block: StepsBlock }) {
  return (
    <>
      <section
        id={block.id}
        aria-labelledby={`heading-${block.id}`}
        className="pt-10"
      >
        <Eyebrow text={block.eyebrow} />
        <SectionHeading id={block.id} text={block.heading} />
        <ol className="mt-6 flex flex-col">
          {block.steps.map((step, i) => (
            <li
              key={i}
              id={`${block.id}-step-${i}`}
              className={cn(
                'relative flex gap-5 pb-10',
                i === block.steps.length - 1 && 'pb-0',
              )}
            >
              {/* Vertical connector */}
              {i < block.steps.length - 1 && (
                <div
                  className="absolute left-[19px] top-10 bottom-0 w-px bg-white/10"
                  aria-hidden="true"
                />
              )}
              {/* Circle */}
              <div
                className="size-10 rounded-full bg-[color:var(--color-gold,#C9A96E)]/10 border border-[color:var(--color-gold,#C9A96E)]/30 flex items-center justify-center shrink-0"
                aria-hidden="true"
              >
                <span className="text-xs font-bold text-[color:var(--color-gold,#C9A96E)]">
                  {i + 1}
                </span>
              </div>
              {/* Content */}
              <div className="pt-1.5">
                <h3 className="font-semibold text-white text-sm sm:text-base mb-1.5">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-white/55">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>
      <Divider />
    </>
  );
}

function ListSection({ block }: { block: ListBlock }) {
  return (
    <>
      <section
        id={block.id}
        aria-labelledby={`heading-${block.id}`}
        className="pt-10"
      >
        <Eyebrow text={block.eyebrow} />
        <SectionHeading id={block.id} text={block.heading} />
        <ul className="mt-4 flex flex-col gap-3">
          {block.items.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-white/60">
              <span
                className="mt-2 size-1.5 rounded-full bg-white/40 shrink-0"
                aria-hidden="true"
              />
              {item}
            </li>
          ))}
        </ul>
      </section>
      <Divider />
    </>
  );
}

function TableSection({ block }: { block: TableBlock }) {
  return (
    <>
      <section
        id={block.id}
        aria-labelledby={`heading-${block.id}`}
        className="pt-10"
      >
        <Eyebrow text={block.eyebrow} />
        <SectionHeading id={block.id} text={block.heading} />
        <div className="overflow-x-auto mt-6">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr>
                {block.headers.map((h, i) => (
                  <th
                    key={i}
                    className="bg-white/[0.04] text-xs uppercase tracking-wider text-white/50 px-4 py-3 text-left font-medium"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, ri) => (
                <tr key={ri} className="border-b border-white/10">
                  {row.map((cell, ci) => (
                    <td
                      key={ci}
                      className={cn(
                        'px-4 py-3',
                        ci === 0
                          ? 'font-medium text-white/80'
                          : 'text-white/60',
                      )}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <Divider />
    </>
  );
}

function FaqSection({ block }: { block: FaqBlock }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <>
      <section
        id={block.id}
        aria-labelledby={`heading-${block.id}`}
        className="pt-10"
      >
        <Eyebrow text={block.eyebrow} />
        <SectionHeading id={block.id} text={block.heading} />
        <div className="mt-4 flex flex-col">
          {block.faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={i} className="border-b border-white/10">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 py-4 text-left text-sm font-medium text-white/80 hover:text-white transition-colors"
                >
                  <span>{faq.question}</span>
                  {isOpen ? (
                    <Minus className="size-4 shrink-0 text-white/40" aria-hidden="true" />
                  ) : (
                    <Plus className="size-4 shrink-0 text-white/40" aria-hidden="true" />
                  )}
                </button>
                {isOpen && (
                  <div className="pb-4 text-sm text-white/55 leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
      <Divider />
    </>
  );
}

function CtaSection({ block }: { block: CtaBlock }) {
  return (
    <section
      id={block.id}
      aria-labelledby={`heading-${block.id}`}
      className="pt-10"
    >
      {block.eyebrow && <Eyebrow text={block.eyebrow} />}
      <h2
        id={`heading-${block.id}`}
        className="text-2xl font-bold text-white mb-4"
      >
        {block.heading}
      </h2>
      <p className="text-sm leading-relaxed text-white/60 mb-6">{block.body}</p>
      <Link
        href={block.buttonHref}
        className="rounded-full border border-white/30 px-6 py-2.5 text-sm font-medium text-white hover:border-white/60 hover:bg-white/5 inline-flex items-center gap-2 transition-colors"
      >
        {block.buttonLabel}
        <ArrowRight className="size-4" aria-hidden="true" />
      </Link>
    </section>
  );
}

// ─── Author bio ───────────────────────────────────────────────────────────────

function AuthorBioSection({ bio }: { bio: AuthorBio }) {
  return (
    <div className="border-t border-white/10 pt-10 flex flex-col sm:flex-row gap-6">
      {/* Avatar */}
      <div className="size-16 sm:size-20 rounded-full border border-white/10 overflow-hidden relative shrink-0">
        {bio.image?.src ? (
          <Image
            src={bio.image.src}
            alt={bio.image.alt}
            fill
            sizes="80px"
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-white/10">
            <span className="text-lg font-semibold text-white/70 select-none">
              {bio.name.charAt(0)}
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col gap-1">
        <p className="text-xs uppercase tracking-widest text-white/30">Written by</p>
        <p className="text-lg font-bold text-white">{bio.name}</p>
        <p className="text-sm text-white/50">{bio.role}</p>
        <p className="mt-2 text-sm leading-relaxed text-white/60 max-w-xl">
          {bio.experience}
        </p>
        {/* Social links */}
        <div className="mt-3 flex items-center gap-3">
          <a
            href="#"
            aria-label={`${bio.name} on LinkedIn`}
            className="size-8 rounded-full border border-white/20 text-white/50 hover:border-white/40 hover:text-white transition-colors flex items-center justify-center"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="size-3.5" aria-hidden="true">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
          <a
            href="#"
            aria-label={`${bio.name} on Instagram`}
            className="size-8 rounded-full border border-white/20 text-white/50 hover:border-white/40 hover:text-white transition-colors flex items-center justify-center"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="size-3.5" aria-hidden="true">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
            </svg>
          </a>
          <a
            href="#"
            aria-label={`${bio.name} website`}
            className="size-8 rounded-full border border-white/20 text-white/50 hover:border-white/40 hover:text-white transition-colors flex items-center justify-center"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-3.5" aria-hidden="true">
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}

// ─── Mobile TOC ───────────────────────────────────────────────────────────────

function MobileToc({ items, activeId }: { items: TocItem[]; activeId: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden mb-8 border border-white/10 rounded-lg overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className="flex w-full items-center justify-between px-4 py-3 text-sm font-medium text-white/70 hover:text-white transition-colors"
        aria-expanded={open}
      >
        <span>Table of Contents</span>
        <span aria-hidden="true" className="text-white/40 text-xs">
          {open ? '▲' : '▼'}
        </span>
      </button>
      {open && (
        <div className="border-t border-white/10 px-4 py-4">
          <TableOfContents items={items} activeId={activeId} onItemClick={() => setOpen(false)} />
        </div>
      )}
    </div>
  );
}

// ─── Render block ─────────────────────────────────────────────────────────────

function renderBlock(block: ArticleBlock) {
  switch (block.type) {
    case 'paragraph':
      return <ParagraphSection key={block.id} block={block} />;
    case 'steps':
      return <StepsSection key={block.id} block={block} />;
    case 'list':
      return <ListSection key={block.id} block={block} />;
    case 'table':
      return <TableSection key={block.id} block={block} />;
    case 'faq':
      return <FaqSection key={block.id} block={block} />;
    case 'cta':
      return <CtaSection key={block.id} block={block} />;
  }
}

// ─── Social follow links (same profiles as footer) ───────────────────────────

const FOLLOW_LINKS = [
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/t1studiomena',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-4" aria-hidden="true">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/t1studiomena',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/t1studiomena',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-4" aria-hidden="true">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/@t1studiomena',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-4" aria-hidden="true">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
        <polygon fill="white" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
      </svg>
    ),
  },
  {
    label: 'TikTok',
    href: 'https://www.tiktok.com/@t1studiomena',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-4" aria-hidden="true">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z" />
      </svg>
    ),
  },
];

const btnClass =
  'size-8 rounded-full border border-white/20 text-white/50 hover:border-white/40 hover:text-white transition-colors flex items-center justify-center';

// ─── Main export ─────────────────────────────────────────────────────────────

export function BlogDetailContent({ blocks, authorBio, title }: BlogDetailContentProps) {
  const tocItems = buildToc(blocks);
  const [activeId, setActiveId] = useState(tocItems[0]?.id ?? '');
  const contentRef = useRef<HTMLDivElement>(null);

  const onIntersect = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      }
    },
    [],
  );

  useEffect(() => {
    const observer = new IntersectionObserver(onIntersect, {
      rootMargin: '-15% 0px -70% 0px',
    });

    const sections = contentRef.current?.querySelectorAll('section[id]') ?? [];
    sections.forEach((s) => observer.observe(s));

    return () => observer.disconnect();
  }, [onIntersect]);

  return (
    <div className="bg-[#0C0C0C]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-8 lg:px-12">
        <div className="lg:grid lg:grid-cols-[220px_1fr] lg:gap-16 xl:gap-24">
          {/* Sticky sidebar TOC — desktop only */}
          <aside className="hidden lg:block">
            <div className="sticky top-16">
              <TableOfContents items={tocItems} activeId={activeId} />
            </div>
          </aside>

          {/* Main content */}
          <div ref={contentRef}>
            <MobileToc items={tocItems} activeId={activeId} />

            {blocks.map((block) => renderBlock(block))}

            {authorBio && (
              <div className="mt-12">
                <AuthorBioSection bio={authorBio} />
              </div>
            )}

            {/* Share + Follow bar */}
            <div className="mt-10 flex flex-col gap-5 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <span className="text-xs uppercase tracking-wider text-white/40">Share</span>
                <ShareButtons title={title} />
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs uppercase tracking-wider text-white/40">Follow</span>
                <ul role="list" className="flex items-center gap-2">
                  {FOLLOW_LINKS.map(({ label, href, icon }) => (
                    <li key={label}>
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Follow on ${label}`}
                        className={btnClass}
                      >
                        {icon}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
