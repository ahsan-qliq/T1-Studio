'use client';

import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const EASE = [0.22, 1, 0.36, 1] as const;

export interface BlogContentBlock {
  label: string;
  body: string;
  image: { src: string; alt: string };
  bodyAfter?: string;
}

interface BlogDetailContentSectionProps {
  blocks: BlogContentBlock[];
}

function ContentBlock({ block, index }: { block: BlogContentBlock; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref as React.RefObject<Element>, {
    once: true,
    margin: '-80px',
  });

  return (
    <div ref={ref} className="flex flex-col gap-6">
      {/* Label — slides up with a slight delay based on block index */}
      <motion.p
        className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40"
        initial={{ opacity: 0, y: 10 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: EASE }}
      >
        {block.label}
      </motion.p>

      {/* Body text — fades up */}
      <motion.p
        className="text-sm leading-relaxed text-white/70 sm:text-[0.9375rem]"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.65, ease: EASE, delay: 0.1 }}
      >
        {block.body}
      </motion.p>

      {/* Image — cinematic scale-up + fade reveal, hover zoom */}
      <motion.div
        className="group relative w-full overflow-hidden"
        style={{ aspectRatio: '16/9' }}
        initial={{ opacity: 0, scale: 1.04, y: 28 }}
        animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
        transition={{ duration: 0.9, ease: EASE, delay: 0.18 }}
      >
        <Image
          src={block.image.src}
          alt={block.image.alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 800px"
          className="object-cover motion-safe:transition-transform motion-safe:duration-700 motion-safe:ease-in-out motion-safe:group-hover:scale-[1.04]"
        />
        {/* Subtle dark vignette on hover */}
        <div
          className="absolute inset-0 bg-black/0 motion-safe:transition-colors motion-safe:duration-500 motion-safe:group-hover:bg-black/15"
          aria-hidden="true"
        />
      </motion.div>

      {/* Body after image — fades up after image */}
      {block.bodyAfter && (
        <motion.p
          className="text-sm leading-relaxed text-white/70 sm:text-[0.9375rem]"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: EASE, delay: 0.32 }}
        >
          {block.bodyAfter}
        </motion.p>
      )}
    </div>
  );
}

export function BlogDetailContentSection({ blocks }: BlogDetailContentSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const sectionInView = useInView(sectionRef as React.RefObject<Element>, {
    once: true,
    margin: '-60px',
  });

  return (
    <motion.section
      ref={sectionRef}
      aria-label="Blog content"
      className="bg-[#0C0C0C] py-16 sm:py-20"
      initial={{ opacity: 0 }}
      animate={sectionInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.5, ease: EASE }}
    >
      <div className="page-wrap mx-auto max-w-3xl flex flex-col gap-16 sm:gap-24">
        {blocks.map((block, i) => (
          <ContentBlock key={i} block={block} index={i} />
        ))}
      </div>
    </motion.section>
  );
}
