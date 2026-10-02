'use client';

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";

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

  const [emblaRef] = useEmblaCarousel({
    align: "start",
    loop: true,
    dragFree: true,
  });

  return (
    <section ref={ref} aria-label={label} className="page-wrap py-16">
      <div className="mx-auto flex flex-col items-center justify-between gap-8 sm:flex-row sm:gap-12">
        {/* Label */}
        <motion.p
          className={`shrink-0 text-2xl font-bold text-secondary sm:text-3xl ${className ?? ""}`}
          initial={{ opacity: 0, x: -24 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE }}
        >
          {label}
        </motion.p>

        {/* Mobile: embla slider */}
        <div
          ref={emblaRef}
          className="w-full overflow-hidden sm:hidden"
          aria-label="Partner and award logos"
        >
          <div className="flex gap-6">
            {logos.map((logo, i) => (
              <div
                key={logo.alt || i}
                className="flex-[0_0_auto] flex items-center justify-center"
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={logo.width ?? 120}
                  height={logo.height ?? 40}
                  className="size-20 object-contain grayscale transition-all duration-300 hover:grayscale-0"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Desktop: staggered grid */}
        <ul
          role="list"
          aria-label="Partner and award logos"
          className="hidden sm:flex flex-wrap items-center justify-start gap-10 lg:gap-14"
        >
          {logos.map((logo, i) => (
            <motion.li
              key={logo.alt || i}
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
                className="size-24 object-contain grayscale transition-all duration-300 hover:grayscale-0"
              />
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
