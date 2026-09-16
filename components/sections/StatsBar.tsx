'use client';

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface StatItem {
  value: string;
  label: string;
}

interface StatsBarProps {
  items: StatItem[];
  sectionLabel: string;
}

const EASE = [0.22, 1, 0.36, 1] as const;

export function StatsBar({ items, sectionLabel }: StatsBarProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref as React.RefObject<Element>, {
    once: true,
    margin: "-60px",
  });

  return (
    <section ref={ref} aria-label={sectionLabel} className="page-wrap py-12">
      <ul
        role="list"
        className="flex flex-wrap justify-between gap-8 sm:gap-12 lg:gap-16"
      >
        {items.map(({ value, label }, i) => (
          <motion.li
            key={label}
            className="flex flex-col items-center gap-2 text-center"
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: EASE, delay: i * 0.1 }}
          >
            <span
              className="text-4xl font-bold text-white sm:text-5xl lg:text-[56px]"
              aria-label={`${value} ${label}`}
            >
              {value}
            </span>
            <p className="text-sm text-white/80 sm:text-base" aria-hidden="true">
              {label}
            </p>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}

