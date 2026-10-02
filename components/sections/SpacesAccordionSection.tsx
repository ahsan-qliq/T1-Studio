"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { ArrowRight, ChevronRight } from "lucide-react";
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
  viewAllLabel?: string;
  viewAllHref?: string;
  spaces: AccordionSpace[];
}

// ─── Desktop: horizontal accordion panel ─────────────────────────────────────

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
          sizes="20vw"
          className="object-cover transition-transform duration-700 ease-in-out"
          style={{ transform: isActive ? "scale(1.05)" : "scale(1)" }}
          draggable={false}
        />

        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)",
          }}
          aria-hidden="true"
        />

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

// ─── Mobile: stacked card row ─────────────────────────────────────────────────

function MobileSpaceCard({
  space,
  index,
  inView,
}: {
  space: AccordionSpace;
  index: number;
  inView: boolean;
}) {
  const num = String(index + 1).padStart(2, "0");
  const EASE = [0.22, 1, 0.36, 1] as const;

  return (
    <motion.li
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, ease: EASE, delay: index * 0.07 }}
    >
      <Link
        href={space.href}
        aria-label={space.title}
        className="group relative flex h-40 w-full overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-inset"
      >
        {/* Background image */}
        <Image
          src={space.image.src}
          alt={space.image.alt}
          fill
          sizes="100vw"
          className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
          draggable={false}
        />

        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.80) 0%, rgba(0,0,0,0.35) 55%, transparent 100%)",
          }}
          aria-hidden="true"
        />

        {/* Bottom row: number | separator | title + arrow */}
        <div className="absolute inset-x-0 bottom-0 flex items-end gap-0 px-4 pb-4">
          {/* Rotated number */}
          <span
            className="shrink-0 select-none text-xs font-semibold text-white/80"
            style={{
              writingMode: "vertical-rl",
              transform: "rotate(180deg)",
              letterSpacing: "0.08em",
            }}
            aria-hidden="true"
          >
            {num}
          </span>

          {/* Vertical separator */}
          <span
            className="mx-3 shrink-0 self-stretch w-px bg-white/40"
            aria-hidden="true"
          />

          {/* Title */}
          <span className="flex-1 text-lg font-semibold text-white">
            {space.title}
          </span>

          {/* Circle arrow */}
          <span
            className="ms-3 flex size-9 shrink-0 items-center justify-center rounded-full border border-white/40 bg-black/30 backdrop-blur-sm"
            aria-hidden="true"
          >
            <ChevronRight className="size-4 text-white" />
          </span>
        </div>
      </Link>
    </motion.li>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

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
    margin: "-60px",
  });

  const accordionRef = useRef<HTMLDivElement>(null);
  const accordionInView = useInView(accordionRef as React.RefObject<Element>, {
    once: true,
    margin: "-40px",
  });

  const mobileListRef = useRef<HTMLUListElement>(null);
  const mobileListInView = useInView(mobileListRef as React.RefObject<Element>, {
    once: true,
    margin: "-40px",
  });

  const ctaRef = useRef<HTMLDivElement>(null);
  const ctaInView = useInView(ctaRef as React.RefObject<Element>, {
    once: true,
    margin: "-40px",
  });

  return (
    <section aria-labelledby="spaces-accordion-heading" className="py-16">
      <motion.h2
        ref={headingRef}
        id="spaces-accordion-heading"
        className="mb-10 text-center text-3xl font-bold text-white sm:text-4xl lg:text-5xl"
        initial={{ opacity: 0, y: 24 }}
        animate={headingInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: EASE }}
      >
        {heading}
      </motion.h2>

      {/* ── Mobile stacked list (< sm) ── */}
      <ul
        ref={mobileListRef}
        role="list"
        aria-label={heading}
        className="flex flex-col sm:hidden"
      >
        {spaces.map((space, i) => (
          <MobileSpaceCard
            key={space.id}
            space={space}
            index={i}
            inView={mobileListInView}
          />
        ))}
      </ul>

      {/* ── Desktop horizontal accordion (≥ sm) ── */}
      <motion.div
        ref={accordionRef}
        className="hidden h-100 w-full sm:flex lg:h-110"
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

      {/* ── View all CTA ── */}
      {viewAllLabel && viewAllHref && (
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
      )}
    </section>
  );
}
