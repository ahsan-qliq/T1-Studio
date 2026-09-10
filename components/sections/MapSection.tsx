'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const EASE = [0.22, 1, 0.36, 1] as const;

// ─── Public types ─────────────────────────────────────────────────────────────

export interface MapSectionProps {
  embedUrl: string;
  title: string;
  height?: number;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function MapSection({
  embedUrl,
  title,
  height = 480,
}: MapSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref as React.RefObject<Element>, {
    once: true,
    margin: '-60px',
  });

  return (
    <section
      ref={ref}
      aria-label={title}
      className="w-full overflow-hidden"
      style={{ height }}
    >
      <motion.div
        className="size-full"
        initial={{ opacity: 0, scale: 1.02 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.7, ease: EASE }}
      >
        <iframe
          src={embedUrl}
          title={title}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </motion.div>
    </section>
  );
}
