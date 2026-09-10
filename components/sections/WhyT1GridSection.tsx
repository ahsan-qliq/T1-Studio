'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Sun, Shield, RefreshCcw, Users } from 'lucide-react';

const EASE = [0.22, 1, 0.36, 1] as const;

// Icon name → component map (keeps the boundary serialisable)
const ICON_MAP = {
  Sun,
  Shield,
  RefreshCcw,
  Users,
} as const;

export type WhyT1IconName = keyof typeof ICON_MAP;

// ─── Public types ─────────────────────────────────────────────────────────────

export interface WhyT1GridFeature {
  iconName: WhyT1IconName;
  title: string;
  description: string;
}

export interface WhyT1GridSectionProps {
  label: string;
  heading: string;
  description: string;
  features: WhyT1GridFeature[];
}

// ─── Feature cell ─────────────────────────────────────────────────────────────

function FeatureCell({
  feature,
  index,
  inView,
}: {
  feature: WhyT1GridFeature;
  index: number;
  inView: boolean;
}) {
  const Icon = ICON_MAP[feature.iconName];

  return (
    <motion.article
      className="flex flex-col gap-4 bg-[#0C0C0C] p-8"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, ease: EASE, delay: 0.2 + index * 0.1 }}
    >
      <Icon
        className="size-7 shrink-0 text-white"
        aria-hidden="true"
        strokeWidth={1.5}
      />
      <div className="flex flex-col gap-2">
        <h3 className="text-base font-bold text-white">{feature.title}</h3>
        <p className="text-sm leading-relaxed text-white/60">
          {feature.description}
        </p>
      </div>
    </motion.article>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export function WhyT1GridSection({
  label,
  heading,
  description,
  features,
}: WhyT1GridSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref as React.RefObject<Element>, {
    once: true,
    margin: '-80px',
  });

  return (
    <section
      ref={ref}
      aria-labelledby="why-t1-grid-heading"
      className="bg-[#0C0C0C] px-4 py-16 sm:px-8 sm:py-20 lg:px-16"
    >
      <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">

        {/* Left — label, heading, description */}
        <div className="flex flex-col gap-6">
          <motion.p
            className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50"
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: EASE }}
          >
            {label}
          </motion.p>

          <motion.h2
            id="why-t1-grid-heading"
            className="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-[2.6rem] lg:leading-[1.15]"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE, delay: 0.08 }}
          >
            {heading}
          </motion.h2>

          <motion.p
            className="text-sm leading-relaxed text-white/60 sm:text-base"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE, delay: 0.15 }}
          >
            {description}
          </motion.p>
        </div>

        {/* Right — 2×2 feature grid with 1px border separators */}
        <ul
          role="list"
          aria-label={label}
          className="grid grid-cols-2 gap-px border border-white/10 bg-white/10"
        >
          {features.map((feature, i) => (
            <li key={feature.title} role="listitem">
              <FeatureCell feature={feature} index={i} inView={inView} />
            </li>
          ))}
        </ul>

      </div>
    </section>
  );
}
