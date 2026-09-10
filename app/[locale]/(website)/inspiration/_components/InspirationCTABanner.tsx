'use client';

import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link } from '@/app/i18n/navigation';

const EASE = [0.22, 1, 0.36, 1] as const;

// ─── Public types ─────────────────────────────────────────────────────────────

export interface InspirationCTABannerProps {
  heading: string;
  description: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  image: { src: string; alt: string };
}

// ─── Component ────────────────────────────────────────────────────────────────

export function InspirationCTABanner({
  heading,
  description,
  primaryCta,
  secondaryCta,
  image,
}: InspirationCTABannerProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref as React.RefObject<Element>, {
    once: true,
    margin: '-60px',
  });

  return (
    <section
      ref={ref}
      aria-labelledby="inspiration-cta-heading"
      className="relative py-12 overflow-hidden"
    >
      {/* Background image */}
      <div className="relative min-h-[220px] w-full sm:min-h-[260px]">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="100vw"
          className="object-cover object-center"
          priority
        />

        {/* Left-to-right dark gradient */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to right, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.75) 40%, rgba(0,0,0,0.35) 70%, transparent 100%)',
          }}
        />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col items-start justify-center gap-8 px-6 py-10 sm:px-10 lg:flex-row lg:items-center lg:justify-between lg:px-16 lg:py-0">

          {/* Left — heading + description */}
          <motion.div
            className="max-w-lg"
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <h2
              id="inspiration-cta-heading"
              className="mb-3 text-2xl font-bold leading-tight text-white sm:text-3xl lg:text-4xl"
            >
              {heading}
            </h2>
            <p className="text-sm leading-relaxed text-white/70 sm:text-base">
              {description}
            </p>
          </motion.div>

          {/* Right — CTA buttons */}
          <motion.div
            className="flex flex-wrap items-center gap-4"
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: EASE, delay: 0.12 }}
          >
            <Link
              href={primaryCta.href}
              className="group inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-6 py-3 text-sm font-medium text-white backdrop-blur-sm transition-colors duration-200 hover:border-white/70 hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              {primaryCta.label}
              <ArrowRight
                className="size-4 motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>

            <Link
              href={secondaryCta.href}
              className="group inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-6 py-3 text-sm font-medium text-white backdrop-blur-sm transition-colors duration-200 hover:border-white/70 hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              {secondaryCta.label}
              <ArrowRight
                className="size-4 motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
