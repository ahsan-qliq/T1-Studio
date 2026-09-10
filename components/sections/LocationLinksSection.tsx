'use client';

import { Link } from '@/app/i18n/navigation';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { stagger } from '@/components/ui/animate';

// ─── Public types ─────────────────────────────────────────────────────────────

export interface LocationLink {
  label: string;
  href: string;
}

export interface LocationColumn {
  city: string;
  links: LocationLink[];
}

interface LocationLinksSectionProps {
  columns: LocationColumn[];
}

// ─── Single column ────────────────────────────────────────────────────────────

function CityColumn({ city, links }: LocationColumn) {
  return (
    <nav aria-label={city} className="px-6 py-10 lg:px-8 lg:py-0">
      <h2 className="mb-6 text-xl font-bold text-white lg:text-2xl">{city}</h2>
      <ul role="list" className="flex flex-col gap-4">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href as '/'}
              className="text-sm leading-snug text-white/65 transition-colors duration-150 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export function LocationLinksSection({ columns }: LocationLinksSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref as React.RefObject<Element>, {
    once: true,
    margin: '-60px',
  });

  return (
    <section aria-label="Services by location" className="page-wrap py-12">
      <motion.div
        ref={ref}
        variants={stagger.container}
        initial="hidden"
        animate={inView ? 'show' : 'hidden'}
      >
        {/* Responsive grid — 1 col → 2 col → 4 col, with dividers between columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y divide-white/10 sm:divide-y-0 lg:divide-x lg:divide-y-0">
          {columns.map((col, i) => (
            <motion.div
              key={col.city}
              variants={stagger.item}
              // On sm (2-col), draw a bottom border on the top row only
              className={
                i < 2
                  ? 'sm:border-b sm:border-white/10 lg:border-b-0'
                  : ''
              }
            >
              <CityColumn {...col} />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
