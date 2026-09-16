'use client';

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export interface AwardLogo {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

interface AwardsSectionProps {
  label: string;
  logos: AwardLogo[];
  className?: string;
}

const EASE = [0.22, 1, 0.36, 1] as const;

export function AwardsSection({ label, logos, className }: AwardsSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref as React.RefObject<Element>, {
    once: true,
    margin: "-60px",
  });

  return (
    <section ref={ref} aria-label={label} className="page-wrap py-12">
      <div className="mx-auto flex flex-col items-center justify-between gap-8 sm:flex-row sm:gap-12">
        {/* Label */}
        <motion.p
          className={`shrink-0 text-3xl font-bold text-secondary ${className ?? ""}`}
          initial={{ opacity: 0, x: -24 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE }}
        >
          {label}
        </motion.p>

        {/* Divider */}
        <motion.div
          className="hidden h-8 w-px bg-border sm:block"
          aria-hidden="true"
          initial={{ opacity: 0, scaleY: 0 }}
          animate={inView ? { opacity: 1, scaleY: 1 } : {}}
          transition={{ duration: 0.5, ease: EASE, delay: 0.15 }}
        />

        {/* Logos — staggered */}
        <ul
          role="list"
          aria-label="Partner and award logos"
          className="flex flex-wrap items-center justify-center gap-8 sm:justify-start sm:gap-10 lg:gap-14"
        >
          {logos.map((logo, i) => (
            <motion.li
              key={logo.alt}
              className="flex items-center justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: EASE, delay: 0.1 + i * 0.1 }}
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={logo.width ?? 120}
                height={logo.height ?? 40}
                className="max-h-10 w-auto object-contain grayscale transition-all duration-300 hover:grayscale-0"
              />
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
