'use client';

import Image from 'next/image';
import { Check } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const EASE = [0.22, 1, 0.36, 1] as const;

// ─── Public types ─────────────────────────────────────────────────────────────

export interface SpaceApproachSectionProps {
  label: string;
  heading: string;
  items: string[];
  image: string;
  imageAlt: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function SpaceApproachSection({
  label,
  heading,
  items,
  image,
  imageAlt,
}: SpaceApproachSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref as React.RefObject<Element>, {
    once: true,
    margin: '-80px',
  });

  return (
    <section
      ref={ref}
      aria-labelledby="space-approach-heading"
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

      {/* Top border to separate from SpaceIntroSection if stacked */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-white/10"
      />

      <div className="page-wrap relative z-10 grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Left — text + checklist */}
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <motion.p
              className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50"
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: EASE }}
            >
              {label}
            </motion.p>

            <motion.h2
              id="space-approach-heading"
              className="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-[2.4rem] lg:leading-[1.2]"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
            >
              {heading}
            </motion.h2>
          </div>

          <ul role="list" className="flex flex-col gap-5" aria-label={heading}>
            {items.map((item, i) => (
              <motion.li
                key={i}
                className="flex items-start gap-4"
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, ease: EASE, delay: 0.15 + i * 0.08 }}
              >
                <span
                  className="mt-0.5 flex size-5 shrink-0 items-center justify-center"
                  aria-hidden="true"
                >
                  <Check className="size-4 text-white" strokeWidth={2.5} />
                </span>
                <span className="text-sm leading-relaxed text-white/75 sm:text-base">
                  {item}
                </span>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Right — image */}
        <motion.div
          className="relative aspect-[4/5] w-full overflow-hidden"
          initial={{ opacity: 0, x: 40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
        >
          <Image
            src={image}
            alt={imageAlt}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
}
