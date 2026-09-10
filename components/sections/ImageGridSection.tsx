'use client';

import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { cn } from '@/lib/utils';

const EASE = [0.22, 1, 0.36, 1] as const;

// ─── Public types ─────────────────────────────────────────────────────────────

export interface ImageGridItem {
  src: string;
  alt: string;
  caption?: string;
}

export interface ImageGridSectionProps {
  heading?: string;
  items: ImageGridItem[];
  /** Number of columns in the grid. Defaults to 2. */
  columns?: 2 | 3;
  className?: string;
  /** Passed to the wrapping <section> for screen readers. Falls back to heading. */
  ariaLabel?: string;
}

// ─── Single tile ──────────────────────────────────────────────────────────────

function ImageTile({
  item,
  index,
  inView,
  columns,
}: {
  item: ImageGridItem;
  index: number;
  inView: boolean;
  columns: 2 | 3;
}) {
  return (
    <motion.figure
      className="relative overflow-hidden"
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, ease: EASE, delay: 0.08 + index * 0.12 }}
    >
      {/* aspect-[3/2] for 2-col, slightly taller for 3-col */}
      <div
        className={cn(
          'relative w-full overflow-hidden',
          columns === 3 ? 'aspect-[4/3]' : 'aspect-[3/2]',
        )}
      >
        <Image
          src={item.src}
          alt={item.alt}
          fill
          sizes={
            columns === 3
              ? '(max-width: 768px) 100vw, 33vw'
              : '(max-width: 768px) 100vw, 50vw'
          }
          className="object-cover transition-transform duration-700 ease-in-out hover:scale-105"
        />
      </div>

      {item.caption && (
        <figcaption className="mt-3 text-sm font-medium text-white/60">
          {item.caption}
        </figcaption>
      )}
    </motion.figure>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export function ImageGridSection({
  heading,
  items,
  columns = 2,
  className,
  ariaLabel,
}: ImageGridSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref as React.RefObject<Element>, {
    once: true,
    margin: '-60px',
  });

  const headingId = 'image-grid-heading';

  return (
    <section
      ref={ref}
      aria-labelledby={heading ? headingId : undefined}
      aria-label={!heading ? (ariaLabel ?? 'Image gallery') : undefined}
      className={cn('bg-[#0C0C0C] py-16 sm:py-20', className)}
    >
      <div className="page-wrap">
        {heading && (
          <motion.h2
            id={headingId}
            className="mb-10 text-2xl font-bold text-white sm:text-3xl lg:text-4xl"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE }}
          >
            {heading}
          </motion.h2>
        )}

        <ul
          role="list"
          aria-label={ariaLabel ?? heading ?? 'Image gallery'}
          className={cn(
            'grid grid-cols-1 gap-4 sm:gap-6',
            columns === 2 ? 'sm:grid-cols-2' : 'sm:grid-cols-2 lg:grid-cols-3',
          )}
        >
          {items.map((item, i) => (
            <li key={`${item.src}-${i}`} role="listitem">
              <ImageTile item={item} index={i} inView={inView} columns={columns} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
