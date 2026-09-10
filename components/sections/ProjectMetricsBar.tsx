'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const EASE = [0.22, 1, 0.36, 1] as const;

// ─── Public types ─────────────────────────────────────────────────────────────

export interface ProjectMetric {
  value: string;
  label: string;
}

export interface ProjectMetricsBarProps {
  metrics: ProjectMetric[];
  ariaLabel?: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function ProjectMetricsBar({
  metrics,
  ariaLabel = 'Project metrics',
}: ProjectMetricsBarProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref as React.RefObject<Element>, {
    once: true,
    margin: '-40px',
  });

  if (!metrics.length) return null;

  return (
    <section
      ref={ref}
      aria-label={ariaLabel}
      className="relative w-full bg-[#0C0C0C] border-y border-white/10"
    >
      {/* Blue left accent */}
      <div
        aria-hidden="true"
        className="absolute inset-y-0 left-0 w-1 bg-blue-500"
      />

      <ul
        role="list"
        className="flex flex-wrap divide-x divide-white/10"
      >
        {metrics.map((metric, i) => (
          <motion.li
            key={`${metric.label}-${i}`}
            role="listitem"
            className="flex flex-1 basis-1/2 flex-col items-center justify-center gap-1.5 px-6 py-8 text-center sm:basis-auto sm:px-10 sm:py-10"
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, ease: EASE, delay: i * 0.08 }}
          >
            <span
              className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl"
              aria-label={`${metric.value} — ${metric.label}`}
            >
              {metric.value}
            </span>
            <p
              className="text-xs text-white/50 sm:text-sm"
              aria-hidden="true"
            >
              {metric.label}
            </p>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
