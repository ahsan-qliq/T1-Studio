'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export interface PrivacySection {
  id: string;
  title: string;
  body: string;
  /** Inline link text rendered at the end of body, e.g. an email address */
  linkText?: string;
  linkHref?: string;
}

export interface PrivacyPolicySectionProps {
  tocLabel: string;
  lastUpdated: string;
  sections: PrivacySection[];
}

const EASE = [0.22, 1, 0.36, 1] as const;

function SectionBlock({ section, index }: { section: PrivacySection; index: number }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref as React.RefObject<Element>, { once: true, margin: '-60px' });

  return (
    <motion.article
      id={section.id}
      ref={ref}
      aria-labelledby={`${section.id}-heading`}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, ease: EASE, delay: 0.05 * index }}
      className="scroll-mt-32 border-b border-secondary/10 pb-10 last:border-0"
    >
      <h2
        id={`${section.id}-heading`}
        className="mb-4 text-xl font-semibold text-secondary sm:text-2xl"
      >
        <span className="mr-3 font-light text-secondary/40" aria-hidden="true">
          {String(index + 1).padStart(2, '0')}.
        </span>
        {section.title}
      </h2>
      <p className="leading-relaxed text-secondary/70">
        {section.body}
        {section.linkText && section.linkHref && (
          <>
            {' '}
            <a
              href={section.linkHref}
              className="font-medium text-secondary underline underline-offset-4 hover:text-secondary/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
            >
              {section.linkText}
            </a>
          </>
        )}
      </p>
    </motion.article>
  );
}

export function PrivacyPolicySection({
  tocLabel,
  lastUpdated,
  sections,
}: PrivacyPolicySectionProps) {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef as React.RefObject<Element>, { once: true, margin: '-60px' });

  return (
    <section aria-label="Privacy policy content" className="page-wrap py-16 lg:py-24">
      <div className="flex flex-col gap-12 lg:flex-row lg:gap-16 xl:gap-24">
        {/* Sticky sidebar — table of contents */}
        <aside
          aria-label={tocLabel}
          className="lg:w-56 xl:w-64 shrink-0"
        >
          <div
            ref={headerRef}
            className="lg:sticky lg:top-28"
          >
            <motion.p
              className="mb-5 text-xs font-semibold uppercase tracking-widest text-secondary/50"
              initial={{ opacity: 0, x: -16 }}
              animate={headerInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, ease: EASE }}
            >
              {tocLabel}
            </motion.p>
            <nav aria-label={tocLabel}>
              <ol className="space-y-3" role="list">
                {sections.map((s, i) => (
                  <motion.li
                    key={s.id}
                    initial={{ opacity: 0, x: -16 }}
                    animate={headerInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.55, ease: EASE, delay: 0.06 * i }}
                  >
                    <a
                      href={`#${s.id}`}
                      className="group flex items-start gap-2.5 text-sm text-secondary/60 transition-colors duration-200 hover:text-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
                    >
                      <span className="mt-px shrink-0 font-light tabular-nums text-secondary/30 group-hover:text-secondary/60">
                        {String(i + 1).padStart(2, '0')}.
                      </span>
                      <span>{s.title}</span>
                    </a>
                  </motion.li>
                ))}
              </ol>
            </nav>

            <motion.p
              className="mt-10 text-xs text-secondary/40"
              initial={{ opacity: 0 }}
              animate={headerInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, ease: EASE, delay: 0.5 }}
            >
              {lastUpdated}
            </motion.p>
          </div>
        </aside>

        {/* Main content */}
        <div className="min-w-0 flex-1 space-y-10">
          {sections.map((section, i) => (
            <SectionBlock key={section.id} section={section} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
