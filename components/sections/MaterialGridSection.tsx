'use client';

import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const EASE = [0.22, 1, 0.36, 1] as const;

// ─── Public types ─────────────────────────────────────────────────────────────

export interface MaterialItem {
  src: string;
  alt: string;
  label: string;
}

export interface MaterialGridSectionProps {
  heading: string;
  items: MaterialItem[];
}

// ─── Single tile ──────────────────────────────────────────────────────────────

function MaterialTile({
  item,
  index,
  inView,
}: {
  item: MaterialItem;
  index: number;
  inView: boolean;
}) {
  return (
    <motion.figure
      className="relative aspect-[4/3] overflow-hidden"
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, ease: EASE, delay: 0.1 + index * 0.1 }}
    >
      <Image
        src={item.src}
        alt={item.alt}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover transition-transform duration-700 ease-in-out hover:scale-105"
      />

      {/* Bottom gradient for label readability */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.2) 40%, transparent 70%)',
        }}
      />

      <figcaption className="absolute bottom-0 left-0 p-5 text-xl font-bold text-white sm:p-7 sm:text-2xl lg:text-3xl">
        {item.label}
      </figcaption>
    </motion.figure>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export function MaterialGridSection({ heading, items }: MaterialGridSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref as React.RefObject<Element>, {
    once: true,
    margin: '-60px',
  });

  const cols = Math.min(Math.max(items.length, 1), 4);

  return (
    <section
      ref={ref}
      aria-labelledby="material-grid-heading"
      className="bg-[#0C0C0C]"
    >
      {/* Heading */}
      <motion.div
        className="px-4 py-10 text-center sm:py-12"
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <h2
          id="material-grid-heading"
          className="text-2xl font-bold text-white sm:text-3xl lg:text-4xl"
        >
          {heading}
        </h2>
      </motion.div>

      {/* Grid — no gap, columns driven by items count */}
      <div
        role="list"
        aria-label={heading}
        className="grid"
        style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
      >
        {items.map((item, i) => (
          <div key={item.label} role="listitem">
            <MaterialTile item={item} index={i} inView={inView} />
          </div>
        ))}
      </div>
    </section>
  );
}
