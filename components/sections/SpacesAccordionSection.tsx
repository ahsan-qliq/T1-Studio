"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Link } from "@/app/i18n/navigation";
import { motion, useInView } from "framer-motion";

export interface AccordionSpace {
  id: string;
  title: string;
  href: string;
  image: { src: string; alt: string };
}

interface SpacesAccordionSectionProps {
  heading: string;
  viewAllLabel: string;
  viewAllHref: string;
  spaces: AccordionSpace[];
}

function SpacePanel({
  space,
  isActive,
  onActivate,
  onDeactivate,
}: {
  space: AccordionSpace;
  isActive: boolean;
  onActivate: () => void;
  onDeactivate: () => void;
}) {
  return (
    <div
      role="listitem"
      className="relative min-w-0 overflow-hidden"
      style={{
        flex: isActive ? "3 1 0%" : "1 1 0%",
        transition: "flex 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
      onMouseEnter={onActivate}
      onMouseLeave={onDeactivate}
      onFocus={onActivate}
      onBlur={onDeactivate}
    >
      <Link
        href={space.href}
        aria-label={space.title}
        className="block h-full w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-inset"
      >
        <Image
          src={space.image.src}
          alt={space.image.alt}
          fill
          sizes="(max-width: 768px) 50vw, 20vw"
          className="object-cover transition-transform duration-700 ease-in-out"
          style={{ transform: isActive ? "scale(1.05)" : "scale(1)" }}
          draggable={false}
        />

        {/* Gradient overlay — stronger at bottom */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)",
          }}
          aria-hidden="true"
        />

        {/* Vertical label — insetInlineStart flips automatically in RTL */}
        <p
          className="absolute bottom-5 select-none font-semibold leading-tight text-white"
          style={{
            insetInlineStart: "1rem",
            writingMode: "vertical-rl",
            transform: "rotate(180deg)",
            fontSize: "clamp(0.85rem, 1.1vw, 1.1rem)",
            letterSpacing: "0.03em",
            textShadow: "0 1px 4px rgba(0,0,0,0.6)",
          }}
          aria-hidden="true"
        >
          {space.title}
        </p>
      </Link>
    </div>
  );
}

const EASE = [0.22, 1, 0.36, 1] as const;

export function SpacesAccordionSection({
  heading,
  viewAllLabel,
  viewAllHref,
  spaces,
}: SpacesAccordionSectionProps) {
  const [activeId, setActiveId] = useState<string | null>(null);

  const headingRef = useRef<HTMLHeadingElement>(null);
  const headingInView = useInView(headingRef as React.RefObject<Element>, {
    once: true,
    margin: '-60px',
  });

  const accordionRef = useRef<HTMLDivElement>(null);
  const accordionInView = useInView(accordionRef as React.RefObject<Element>, {
    once: true,
    margin: '-40px',
  });

  const ctaRef = useRef<HTMLDivElement>(null);
  const ctaInView = useInView(ctaRef as React.RefObject<Element>, {
    once: true,
    margin: '-40px',
  });

  return (
    <section
      aria-labelledby="spaces-accordion-heading"
      className="py-12"
    >
      <motion.h2
        ref={headingRef}
        id="spaces-accordion-heading"
        className="mb-10 text-center text-4xl font-bold text-white lg:text-5xl"
        initial={{ opacity: 0, y: 24 }}
        animate={headingInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: EASE }}
      >
        {heading}
      </motion.h2>

      <motion.div
        ref={accordionRef}
        className="flex h-90 w-full sm:h-100 lg:h-110"
        onMouseLeave={() => setActiveId(null)}
        role="list"
        aria-label={heading}
        initial={{ opacity: 0, y: 32 }}
        animate={accordionInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
      >
        {spaces.map((space) => (
          <SpacePanel
            key={space.id}
            space={space}
            isActive={activeId === space.id}
            onActivate={() => setActiveId(space.id)}
            onDeactivate={() => setActiveId(null)}
          />
        ))}
      </motion.div>

      <motion.div
        ref={ctaRef}
        className="mt-10 flex justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={ctaInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: EASE, delay: 0.15 }}
      >
        <Link
          href={viewAllHref}
          className="group inline-flex items-center gap-2 rounded-full border border-white/30 bg-white px-7 py-3 text-sm font-medium text-primary transition-colors duration-200 hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
        >
          {viewAllLabel}
          <ArrowRight
            className="size-4 motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </Link>
      </motion.div>
    </section>
  );
}
