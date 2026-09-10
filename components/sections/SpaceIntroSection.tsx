'use client';

import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const EASE = [0.22, 1, 0.36, 1] as const;

// ─── Public types ─────────────────────────────────────────────────────────────

export interface SpaceIntroSectionProps {
  label: string;
  heading: string;
  description: string;
  image: string;
  imageAlt: string;
  className?: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function SpaceIntroSection({
  label,
  heading,
  description,
  image,
  imageAlt,
  className
}: SpaceIntroSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref as React.RefObject<Element>, {
    once: true,
    margin: '-80px',
  });

  return (
    <section
      ref={ref}
      aria-labelledby="space-intro-heading"
      className="relative overflow-hidden bg-[#0C0C0C] py-20 sm:py-28"
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

      <div className="page-wrap relative z-10 grid grid-cols-1 items-center gap-12 lg:grid-cols-[3fr_5fr] lg:gap-16">
        {/* Image */}
        <motion.div
          className={`relative aspect-3/4 w-full max-w-sm overflow-hidden lg:max-w-none ,${className}`}
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <Image
            src={image}
            alt={imageAlt}
            fill
            sizes="(max-width: 1024px) 80vw, 40vw"
            className="object-cover"
          />
        </motion.div>

        {/* Content */}
        <div className="flex flex-col gap-6">
          <motion.p
            className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
          >
            {label}
          </motion.p>

          <motion.h2
            id="space-intro-heading"
            className="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-[2.6rem] lg:leading-[1.15]"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
          >
            {heading}
          </motion.h2>

          <motion.p
            className="text-sm leading-relaxed text-white/65 sm:text-base"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: EASE, delay: 0.25 }}
          >
            {description}
          </motion.p>
        </div>
      </div>
    </section>
  );
}
