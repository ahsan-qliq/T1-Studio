'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const EASE = [0.22, 1, 0.36, 1] as const;

export interface ChallengeSectionProps {
  label?: string;
  heading: string;
  description: string;
  highlight?: {
    value: string;
    unit: string;
    note: string;
  };
}

export function ChallengeSection({
  label = 'Challenge',
  heading,
  description,
  highlight = { value: '45', unit: 'Days', note: 'Physical completion deadline' },
}: ChallengeSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });

  return (
    <section
      ref={ref}
      className="bg-[#0C0C0C] py-20 lg:py-28"
    >
      <div className="page-wrap">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20 items-start">
          {/* Left column */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, ease: EASE }}
              className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-white/50"
            >
              {label}
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, ease: EASE, delay: 0.1 }}
              className="text-3xl sm:text-4xl lg:text-[2.6rem] font-bold leading-tight text-white"
            >
              {heading}
            </motion.h2>
          </div>

          {/* Right column */}
          <div className="flex flex-col gap-10">
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, ease: EASE, delay: 0.2 }}
              className="text-base leading-relaxed text-white/60"
            >
              {description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, ease: EASE, delay: 0.32 }}
              className="flex items-end gap-4 border-l-2 border-[#CA9C44] pl-6"
            >
              <span className="text-6xl font-bold leading-none text-white">
                {highlight.value}
              </span>
              <div className="pb-1">
                <p className="text-lg font-semibold text-white/80">{highlight.unit}</p>
                <p className="text-xs uppercase tracking-widest text-white/40">{highlight.note}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
