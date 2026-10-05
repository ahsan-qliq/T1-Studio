'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link } from '@/app/i18n/navigation';

interface SitemapLink {
  label: string;
  href: string;
}

export interface SitemapGroup {
  heading: string;
  links: SitemapLink[];
}

interface SitemapSectionProps {
  groups: SitemapGroup[];
}

const EASE = [0.22, 1, 0.36, 1] as const;

function BotanicalIllustration() {
  return (
    <svg
      viewBox="0 0 320 420"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="h-full w-full opacity-20"
    >
      {/* Main stem */}
      <path d="M160 420 C160 380 155 340 158 300 C161 260 156 220 160 180 C164 140 158 100 160 60" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      {/* Left branches */}
      <path d="M158 300 C140 285 115 278 95 265" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M95 265 C82 258 70 248 60 238" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
      <path d="M156 260 C135 248 112 240 92 228" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M159 220 C142 210 122 204 104 194" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M158 180 C138 170 116 162 96 150" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M159 140 C144 132 128 126 112 118" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/>
      {/* Right branches */}
      <path d="M162 290 C178 275 200 268 220 255" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M220 255 C234 247 248 238 260 228" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
      <path d="M161 248 C178 237 200 230 218 218" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M162 208 C178 198 198 192 216 182" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M161 168 C178 158 198 150 216 140" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M160 128 C174 120 190 114 206 106" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/>
      <path d="M160 90 C170 83 182 77 194 71" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
      {/* Leaves on left branches */}
      {[
        [95,265],[80,252],[68,240],[92,228],[76,218],[104,194],[88,184],[96,150],[80,142],[112,118],[98,110]
      ].map(([cx,cy],i) => (
        <ellipse key={`ll${i}`} cx={cx} cy={cy} rx="6" ry="10" transform={`rotate(-40 ${cx} ${cy})`} stroke="currentColor" strokeWidth="0.9" />
      ))}
      {/* Leaves on right branches */}
      {[
        [220,255],[236,244],[252,232],[218,218],[234,208],[216,182],[230,172],[216,140],[228,130],[206,106],[218,97],[194,71],[204,62]
      ].map(([cx,cy],i) => (
        <ellipse key={`rl${i}`} cx={cx} cy={cy} rx="6" ry="10" transform={`rotate(40 ${cx} ${cy})`} stroke="currentColor" strokeWidth="0.9" />
      ))}
      {/* Top leaves */}
      <ellipse cx="155" cy="50" rx="5" ry="9" transform="rotate(-15 155 50)" stroke="currentColor" strokeWidth="0.9"/>
      <ellipse cx="165" cy="46" rx="5" ry="9" transform="rotate(15 165 46)" stroke="currentColor" strokeWidth="0.9"/>
      <ellipse cx="160" cy="38" rx="4" ry="8" stroke="currentColor" strokeWidth="0.9"/>
    </svg>
  );
}

function SitemapColumn({ group, index, inView }: { group: SitemapGroup; index: number; inView: boolean }) {
  return (
    <motion.nav
      aria-label={group.heading}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, ease: EASE, delay: 0.08 * index }}
    >
      <h2 className="mb-4 text-2xl font-semibold text-secondary sm:text-3xl">
        {group.heading}
      </h2>
      <div className="mb-6 h-px bg-secondary/15" role="separator" />
      <ul role="list" className="space-y-3">
        {group.links.map(({ label, href }) => (
          <li key={href}>
            <Link
              href={href}
              className="text-base text-secondary/65 transition-colors duration-200 hover:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50 rounded-sm"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </motion.nav>
  );
}

export function SitemapSection({ groups }: SitemapSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref as React.RefObject<Element>, {
    once: true,
    margin: '-60px',
  });

  // Split groups: first 3 go in top row, rest in bottom row
  const topGroups = groups.slice(0, 3);
  const bottomGroups = groups.slice(3);

  return (
    <section
      ref={ref}
      aria-label="Site navigation map"
      className="page-wrap py-16 lg:py-24"
    >
      {/* Top row — 3 columns */}
      <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-16">
        {topGroups.map((group, i) => (
          <SitemapColumn key={group.heading} group={group} index={i} inView={inView} />
        ))}
      </div>

      {/* Bottom row — remaining groups + botanical illustration */}
      {bottomGroups.length > 0 && (
        <div className="mt-14 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-16">
          {bottomGroups.map((group, i) => (
            <SitemapColumn
              key={group.heading}
              group={group}
              index={topGroups.length + i}
              inView={inView}
            />
          ))}

          {/* Botanical illustration — spans remaining columns */}
          <motion.div
            className="pointer-events-none hidden lg:col-span-2 lg:flex items-end justify-center text-secondary"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 1.2, ease: EASE, delay: 0.5 }}
            aria-hidden="true"
          >
            <div className="h-80 w-64">
              <BotanicalIllustration />
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
}
