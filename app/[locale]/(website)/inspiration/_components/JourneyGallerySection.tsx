'use client';

import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link } from '@/app/i18n/navigation';

const EASE = [0.22, 1, 0.36, 1] as const;

// ─── Public types ─────────────────────────────────────────────────────────────

export interface JourneyImage {
  src: string;
  alt: string;
}

export interface JourneyGallerySectionProps {
  heading: string;
  ctaLabel: string;
  ctaHref: string;
  images: JourneyImage[];
}

// ─── Component ────────────────────────────────────────────────────────────────

export function JourneyGallerySection({
  heading,
  ctaLabel,
  ctaHref,
  images,
}: JourneyGallerySectionProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref as React.RefObject<Element>, {
    once: true,
    margin: '-60px',
  });

  return (
    <section
      ref={ref}
      aria-labelledby="journey-gallery-heading"
      className="page-wrap py-12 sm:py-18"
    >
      {/* Heading */}
      <motion.h2
        id="journey-gallery-heading"
        className="mb-10 text-center text-2xl font-bold text-white sm:text-3xl lg:text-4xl"
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: EASE }}
      >
        {heading}
      </motion.h2>

      {/* Image strip — scrollable on mobile, full row on desktop */}
      <div
        className="scrollbar-none overflow-x-auto"
        aria-label={heading}
      >
        <ul
          role="list"
          className="flex gap-2 px-4 sm:px-6 lg:px-0"
          style={{ minWidth: 'max-content' }}
        >
          {images.map((image, i) => (
            <motion.li
              key={`${image.src}-${i}`}
              role="listitem"
              className="relative aspect-[4/5] w-36 shrink-0 overflow-hidden sm:w-44 lg:w-0 lg:flex-1"
              initial={{ opacity: 0, scale: 1.04 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.75, ease: EASE, delay: i * 0.07 }}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 640px) 144px, (max-width: 1024px) 176px, 20vw"
                className="object-cover transition-transform duration-700 ease-in-out hover:scale-105"
              />
            </motion.li>
          ))}
        </ul>
      </div>

      {/* CTA */}
      <motion.div
        className="mt-10 flex justify-center"
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: EASE, delay: 0.3 }}
      >
        <Link
          href={ctaHref}
          className="group inline-flex items-center gap-2 rounded-full border border-white/30 px-8 py-3 text-sm font-medium text-white transition-colors duration-200 hover:border-white/60 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
        >
          {ctaLabel}
          <ArrowRight
            className="size-4 motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </Link>
      </motion.div>
    </section>
  );
}
