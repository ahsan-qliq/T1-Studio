'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, Accessibility, Settings2, Monitor, HelpCircle } from 'lucide-react';
import { Link } from '@/app/i18n/navigation';

const ICONS = [Accessibility, Settings2, Monitor, HelpCircle];

interface AccessibilityCard {
  title: string;
  body: string;
}

interface AccessibilitySectionProps {
  intro: string;
  cards: AccessibilityCard[];
  ctaLabel: string;
  ctaHref: string;
}

const EASE = [0.22, 1, 0.36, 1] as const;

function FeatureCard({
  card,
  index,
  inView,
}: {
  card: AccessibilityCard;
  index: number;
  inView: boolean;
}) {
  const { title, body } = card;
  const Icon = ICONS[index] ?? Accessibility;
  return (
    <motion.article
      aria-labelledby={`a11y-card-${index}`}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: EASE, delay: 0.1 + index * 0.08 }}
      className="flex flex-col gap-5 rounded-sm border border-secondary/10 bg-background p-7"
    >
      <div
        className="flex size-14 items-center justify-center rounded-full bg-secondary/8"
        aria-hidden="true"
      >
        <Icon className="size-6 text-secondary/70" strokeWidth={1.5} />
      </div>
      <div>
        <h2
          id={`a11y-card-${index}`}
          className="mb-2 text-lg font-semibold text-secondary sm:text-xl"
        >
          {title}
        </h2>
        <p className="text-sm leading-relaxed text-secondary/65">{body}</p>
      </div>
    </motion.article>
  );
}

export function AccessibilitySection({
  intro,
  cards,
  ctaLabel,
  ctaHref,
}: AccessibilitySectionProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref as React.RefObject<Element>, {
    once: true,
    margin: '-60px',
  });

  return (
    <section
      ref={ref}
      aria-label="Accessibility information"
      className="page-wrap py-16 lg:py-24"
    >
      {/* Intro */}
      <motion.p
        className="mb-12 max-w-3xl text-base leading-relaxed text-secondary/75 sm:text-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: EASE }}
      >
        {intro}
      </motion.p>

      {/* Feature cards 2×2 grid */}
      <div
        className="mb-12 grid grid-cols-1 gap-4 sm:grid-cols-2"
        role="list"
        aria-label="Accessibility features"
      >
        {cards.map((card, i) => (
          <div key={i} role="listitem">
            <FeatureCard card={card} index={i} inView={inView} />
          </div>
        ))}
      </div>

      {/* CTA */}
      <motion.div
        className="flex justify-center"
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: EASE, delay: 0.4 }}
      >
        <Link
          href={ctaHref}
          className="group inline-flex items-center gap-2 rounded-full bg-secondary px-8 py-3.5 text-sm font-semibold text-primary transition-colors duration-200 hover:bg-secondary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2"
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
