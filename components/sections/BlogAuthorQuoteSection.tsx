'use client';

import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const EASE = [0.22, 1, 0.36, 1] as const;

export interface BlogAuthorQuoteSectionProps {
  quote: string;
  authorName: string;
  authorRole: string;
  authorExperience: string;
  authorImage: { src: string; alt: string };
}

export function BlogAuthorQuoteSection({
  quote,
  authorName,
  authorRole,
  authorExperience,
  authorImage,
}: BlogAuthorQuoteSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref as React.RefObject<Element>, {
    once: true,
    margin: '-60px',
  });

  return (
    <section
      ref={ref}
      aria-label="Author quote"
      className="relative overflow-hidden bg-[#0C0C0C] py-14 sm:py-20"
    >
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

      {/* Decorative large opening quote mark */}
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute -top-4 left-6 select-none text-[10rem] font-serif leading-none text-white/5 sm:left-12 lg:text-[14rem]"
        initial={{ opacity: 0, y: -20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, ease: EASE }}
      >
        &ldquo;
      </motion.span>

      <div className="page-wrap relative z-10 flex flex-col gap-10 sm:flex-row sm:items-center sm:gap-12">
        {/* Portrait — slides in from left with subtle scale */}
        <motion.div
          className="relative h-40 w-40 flex-shrink-0 overflow-hidden grayscale sm:h-48 sm:w-48"
          initial={{ opacity: 0, x: -32, scale: 0.96 }}
          animate={inView ? { opacity: 1, x: 0, scale: 1 } : {}}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <Image
            src={authorImage.src}
            alt={authorImage.alt}
            fill
            sizes="192px"
            className="object-cover object-top"
          />
        </motion.div>

        {/* Content */}
        <div className="flex flex-col gap-5">
          {/* Divider line — expands from left */}
          <motion.div
            className="h-px w-12 bg-white/20"
            initial={{ scaleX: 0, originX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.6, ease: EASE, delay: 0.12 }}
          />

          {/* Quote */}
          <motion.blockquote
            className="text-lg font-medium leading-snug text-white sm:text-xl lg:text-2xl"
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.75, ease: EASE, delay: 0.18 }}
          >
            &ldquo;{quote}&rdquo;
          </motion.blockquote>

          {/* Author details — staggered lines */}
          <motion.div
            className="flex flex-col gap-0.5"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, ease: EASE, delay: 0.3 }}
          >
            <p className="text-sm font-semibold text-white">{authorName}</p>
            <p className="text-xs text-white/50">{authorRole}</p>
            <p className="text-xs text-white/50">{authorExperience}</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
