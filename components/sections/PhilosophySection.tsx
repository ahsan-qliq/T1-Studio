'use client';

import { ArrowRight } from 'lucide-react';
import { Link } from '@/app/i18n/navigation';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const EASE = [0.22, 1, 0.36, 1] as const;

export interface PhilosophySectionProps {
  label: string;
  heading: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
}

export function PhilosophySection({
  label,
  heading,
  description,
  ctaLabel,
  ctaHref,
}: PhilosophySectionProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref as React.RefObject<Element>, {
    once: true,
    margin: '-80px',
  });

  return (
    <section
      ref={ref}
      aria-labelledby="philosophy-heading"
      className="relative overflow-hidden bg-[#0C0C0C] py-24 sm:py-32"
    >
      {/* Decorative grid lines */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      {/* Content */}
      <div className="page-wrap relative z-10 flex flex-col items-center text-center">
        <motion.p
          className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-white/50"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE }}
        >
          {label}
        </motion.p>

        <motion.h2
          id="philosophy-heading"
          className="mx-auto max-w-3xl text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl lg:leading-[1.1]"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
        >
          {heading}
        </motion.h2>

        <motion.p
          className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-white/60 sm:text-base"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
        >
          {description}
        </motion.p>

        <motion.div
          className="mt-10"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE, delay: 0.3 }}
        >
          <Link
            href={ctaHref}
            className="group inline-flex items-center gap-2 rounded-full border border-white/30 px-7 py-3 text-sm font-medium text-white transition-colors duration-200 hover:border-white/60 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0C0C0C]"
          >
            {ctaLabel}
            <ArrowRight
              className="size-4 motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
