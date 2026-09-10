'use client';

import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const EASE = [0.22, 1, 0.36, 1] as const;

// ─── Public types ─────────────────────────────────────────────────────────────

export interface AboutStorySectionProps {
  label: string;
  heading: string;
  description: string;
  image: { src: string; alt: string };
}

// ─── Component ────────────────────────────────────────────────────────────────

export function AboutStorySection({
  label,
  heading,
  description,
  image,
}: AboutStorySectionProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref as React.RefObject<Element>, {
    once: true,
    margin: '-80px',
  });

  return (
    <section
      ref={ref}
      aria-labelledby="about-story-heading"
      className="flex min-h-[520px] flex-col lg:flex-row"
    >
      {/* Left — full-bleed image */}
      <motion.div
        className="relative min-h-[320px] w-full lg:w-2/5 lg:min-h-full"
        initial={{ opacity: 0, x: -24 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, ease: EASE }}
      >
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(max-width: 1024px) 100vw, 40vw"
          className="object-cover object-center"
          priority
        />
      </motion.div>

      {/* Right — dark panel with grid overlay + content */}
      <div className="relative flex w-full flex-1 items-center bg-[#0C0C0C] lg:w-3/5">
        {/* Decorative grid lines */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col gap-6 px-8 py-16 sm:px-12 lg:px-16 xl:px-20">
          <motion.p
            className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
          >
            {label}
          </motion.p>

          <motion.h2
            id="about-story-heading"
            className="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
          >
            {heading}
          </motion.h2>

          <motion.p
            className="max-w-xl text-sm leading-relaxed text-white/60 sm:text-base"
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
