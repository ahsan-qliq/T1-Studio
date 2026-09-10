'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Globe, Lightbulb, BarChart2, BookMarked, type LucideIcon } from 'lucide-react';

const EASE = [0.22, 1, 0.36, 1] as const;

// Icon name → component map (keeps the server→client boundary serialisable)
const ICON_MAP = {
  Globe,
  Lightbulb,
  BarChart2,
  BookMarked,
} as const;

export type MilestoneIconName = keyof typeof ICON_MAP;

// ─── Public types ─────────────────────────────────────────────────────────────

export interface Milestone {
  iconName: MilestoneIconName;
  year: string;
  description: string;
}

export interface MilestoneTimelineSectionProps {
  heading: string;
  milestones: Milestone[];
}

// ─── Single milestone card ────────────────────────────────────────────────────

function MilestoneCard({
  milestone,
  index,
  total,
  inView,
}: {
  milestone: Milestone;
  index: number;
  total: number;
  inView: boolean;
}) {
  const Icon: LucideIcon = ICON_MAP[milestone.iconName];

  return (
    <motion.li
      role="listitem"
      className="relative flex flex-col items-center gap-5 px-8 py-10 text-center"
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, ease: EASE, delay: index * 0.1 }}
    >
      {/* Horizontal connector line — spans to the next card */}
      {index < total - 1 && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute top-[72px] left-1/2 h-px w-full bg-white/15"
        />
      )}

      {/* Icon circle */}
      <div
        className="relative z-10 flex size-16 shrink-0 items-center justify-center rounded-full border border-white/25 bg-[#0C0C0C]"
        aria-hidden="true"
      >
        <Icon className="size-7 text-white" strokeWidth={1.25} />
      </div>

      {/* Year */}
      <p className="text-2xl font-bold text-white sm:text-3xl">
        {milestone.year}
      </p>

      {/* Description */}
      <p className="text-sm leading-relaxed text-white/55 sm:text-base">
        {milestone.description}
      </p>
    </motion.li>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export function MilestoneTimelineSection({
  heading,
  milestones,
}: MilestoneTimelineSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref as React.RefObject<Element>, {
    once: true,
    margin: '-60px',
  });

  if (!milestones.length) return null;

  return (
    <section
      ref={ref}
      aria-labelledby="milestone-timeline-heading"
      className="relative overflow-hidden"
    >
      {/* Decorative grid lines */}
      {/* <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      /> */}

      <div className="relative z-10">
        {/* Heading */}
        <motion.h2
          id="milestone-timeline-heading"
          className="pt-16 text-center text-3xl font-bold text-white sm:text-4xl"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE }}
        >
          {heading}
        </motion.h2>

        {/* Timeline grid */}
        <ul
          role="list"
          className="mt-8 grid grid-cols-1 divide-y  sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4"
        >
          {milestones.map((milestone, i) => (
            <MilestoneCard
              key={`${milestone.year}-${i}`}
              milestone={milestone}
              index={i}
              total={milestones.length}
              inView={inView}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}
