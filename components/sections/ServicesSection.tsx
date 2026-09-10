'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { stagger } from '@/components/ui/animate';

export interface ServiceItem {
  title: string;
  subtitle: string;
}

interface ServicesSectionProps {
  label: string;
  heading: string;
  services: ServiceItem[];
}

const CELL_BORDERS = [
  "border-b border-white/20 sm:border-r lg:border-b-0",
  "border-b border-white/20 lg:border-r lg:border-b-0",
  "border-b border-white/20 sm:border-r sm:border-b-0",
  "",
] as const;

const EASE = [0.22, 1, 0.36, 1] as const;

export function ServicesSection({
  label,
  heading,
  services,
}: ServicesSectionProps) {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef as React.RefObject<Element>, {
    once: true,
    margin: '-60px',
  });

  const gridRef = useRef<HTMLUListElement>(null);
  const gridInView = useInView(gridRef as React.RefObject<Element>, {
    once: true,
    margin: '-60px',
  });

  return (
    <section
      aria-labelledby="services-heading"
      className="page-wrap py-12"
    >
      {/* Animated header */}
      <motion.div
        ref={headerRef}
        className="mb-14 text-center"
        initial={{ opacity: 0, y: 24 }}
        animate={headerInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: EASE }}
      >
        <p className="mb-3 text-sm text-white/70">{label}</p>
        <h2
          id="services-heading"
          className="text-4xl font-bold text-white sm:text-5xl"
        >
          {heading}
        </h2>
      </motion.div>

      {/* Staggered service grid */}
      <motion.ul
        ref={gridRef}
        role="list"
        className="border border-white/20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
        variants={stagger.container}
        initial="hidden"
        animate={gridInView ? 'show' : 'hidden'}
      >
        {services.map((service, i) => (
          <motion.li
            key={service.title}
            className={`px-8 py-10 ${CELL_BORDERS[i] ?? ''}`}
            variants={stagger.item}
          >
            <h3 className="mb-3 text-xl font-bold text-white">
              {service.title}
            </h3>
            <p className="text-sm text-white/65 sm:text-base">
              {service.subtitle}
            </p>
          </motion.li>
        ))}
      </motion.ul>
    </section>
  );
}
