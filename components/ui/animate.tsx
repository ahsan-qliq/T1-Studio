'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, type ReactNode } from 'react';

const EASE = [0.22, 1, 0.36, 1] as const;

// Shared stagger variants — import in any client section component
export const stagger = {
  container: {
    hidden: {},
    show: { transition: { staggerChildren: 0.1, delayChildren: 0.08 } },
  },
  item: {
    hidden: { opacity: 0, y: 28 },
    show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
  },
  itemFromLeft: {
    hidden: { opacity: 0, x: -32 },
    show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE } },
  },
  itemFromRight: {
    hidden: { opacity: 0, x: 32 },
    show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE } },
  },
} as const;

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useScrollReveal(margin = '-80px') {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref as React.RefObject<Element>, {
    once: true,
    margin: margin as `${number}px`,
  });
  return { ref, inView };
}

// ─── FadeUp — scroll-triggered fade + slide up ────────────────────────────────
// Safe to use with RSC children: pass server-rendered sections as children.

export function FadeUp({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, inView } = useScrollReveal();

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

// ─── SlideIn — scroll-triggered slide from either side ────────────────────────

export function SlideIn({
  children,
  from = 'left',
  delay = 0,
  className,
}: {
  children: ReactNode;
  from?: 'left' | 'right';
  delay?: number;
  className?: string;
}) {
  const { ref, inView } = useScrollReveal();

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, x: from === 'left' ? -56 : 56 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.85, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}
