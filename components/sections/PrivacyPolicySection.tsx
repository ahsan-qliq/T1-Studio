'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

export interface SubSection {
  title: string;
  body?: string;
  items?: string[];
}

export interface PrivacySection {
  id: string;
  title: string;
  body?: string;
  note?: string;
  subsections?: SubSection[];
  items?: string[];
  linkText?: string;
  linkHref?: string;
}

export interface PrivacyPolicySectionProps {
  tocLabel: string;
  lastUpdated: string;
  sections: PrivacySection[];
}

const EASE = [0.22, 1, 0.36, 1] as const;

function useActiveSection(ids: string[]): string {
  const [activeId, setActiveId] = useState(ids[0] ?? '');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
            break;
          }
        }
      },
      { rootMargin: '-15% 0px -70% 0px', threshold: 0 },
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [ids]);

  return activeId;
}

function SectionBlock({ section, index }: { section: PrivacySection; index: number }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref as React.RefObject<Element>, { once: true, margin: '-60px' });

  return (
    <motion.article
      id={section.id}
      ref={ref}
      aria-labelledby={`${section.id}-heading`}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, ease: EASE, delay: 0.04 * index }}
      className="scroll-mt-28 border-b border-secondary/10 pb-10 last:border-0"
    >
      <h2
        id={`${section.id}-heading`}
        className="mb-4 text-xl font-semibold text-secondary sm:text-2xl"
      >
        <span className="mr-3 font-light text-secondary/35" aria-hidden="true">
          {String(index + 1).padStart(2, '0')}.
        </span>
        {section.title}
      </h2>

      {section.body && (
        <p className="leading-relaxed text-secondary/65">
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
      )}

      {section.items && section.items.length > 0 && (
        <ul className="mt-3 space-y-2" role="list" aria-label={section.title}>
          {section.items.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-secondary/65 leading-relaxed">
              <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-secondary/40" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      )}

      {section.subsections && section.subsections.length > 0 && (
        <div className="mt-6 space-y-6">
          {section.subsections.map((sub, i) => (
            <div key={i}>
              <h3 className="mb-2 text-base font-semibold text-secondary sm:text-lg">
                {sub.title}
              </h3>
              {sub.body && (
                <p className="leading-relaxed text-secondary/65">{sub.body}</p>
              )}
              {sub.items && sub.items.length > 0 && (
                <ul className="mt-2 space-y-1.5" role="list">
                  {sub.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-3 leading-relaxed text-secondary/65">
                      <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-secondary/40" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {section.note && (
        <p className="mt-6 leading-relaxed text-secondary/65">{section.note}</p>
      )}
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
  const ids = sections.map((s) => s.id);
  const activeId = useActiveSection(ids);

  return (
    <section aria-label="Privacy policy content" className="page-wrap py-16 lg:py-24">
      <div className="flex flex-col gap-12 lg:flex-row lg:gap-16 xl:gap-20">

        {/* Sticky sidebar — table of contents */}
        <aside aria-label={tocLabel} className="shrink-0 lg:w-56 xl:w-64">
          <div ref={headerRef} className="lg:sticky lg:top-28">
            <motion.p
              className="mb-5 text-xs font-semibold uppercase tracking-widest text-secondary/40"
              initial={{ opacity: 0, x: -16 }}
              animate={headerInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, ease: EASE }}
            >
              {tocLabel}
            </motion.p>

            <nav aria-label={tocLabel}>
              <ol className="space-y-1" role="list">
                {sections.map((s, i) => {
                  const isActive = activeId === s.id;
                  return (
                    <motion.li
                      key={s.id}
                      initial={{ opacity: 0, x: -16 }}
                      animate={headerInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.55, ease: EASE, delay: 0.05 * i }}
                    >
                      <a
                        href={`#${s.id}`}
                        aria-current={isActive ? 'true' : undefined}
                        className={cn(
                          'group flex items-start gap-3 border-l-2 py-1.5 pl-3 text-sm transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary',
                          isActive
                            ? 'border-secondary text-secondary font-medium'
                            : 'border-transparent text-secondary/50 hover:border-secondary/30 hover:text-secondary/80',
                        )}
                      >
                        <span
                          className={cn(
                            'mt-px shrink-0 tabular-nums transition-colors duration-200',
                            isActive ? 'text-secondary/60' : 'text-secondary/30 group-hover:text-secondary/50',
                          )}
                          aria-hidden="true"
                        >
                          {String(i + 1).padStart(2, '0')}.
                        </span>
                        <span>{s.title}</span>
                      </a>
                    </motion.li>
                  );
                })}
              </ol>
            </nav>

            <motion.p
              className="mt-10 pl-3 text-xs text-secondary/35"
              initial={{ opacity: 0 }}
              animate={headerInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, ease: EASE, delay: 0.55 }}
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
