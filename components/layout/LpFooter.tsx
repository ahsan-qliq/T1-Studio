'use client';

import { useState } from 'react';
import { ArrowUpRight, Mail, MapPin, Clock2 } from 'lucide-react';
import { Link } from '@/app/i18n/navigation';

// ─── Public types ─────────────────────────────────────────────────────────────

export interface LpFooterSocialLink {
  platform: 'facebook' | 'instagram' | 'twitter' | 'linkedin' | 'youtube';
  href: string;
  label: string;
}

export interface LpFooterOpeningHour {
  label: string;
}

export interface LpFooterLegalLink {
  label: string;
  href: string;
}

export interface LpFooterProps {
  logo: React.ReactNode;
  tagline: string;
  socials: LpFooterSocialLink[];
  showroom: {
    heading: string;
    address: string;
    phone: string;
    phoneHref: string;
    email: string;
    directionsLabel: string;
    directionsHref: string;
  };
  openingHours: {
    heading: string;
    hours: LpFooterOpeningHour[];
  };
  newsletter: {
    heading: string;
    description: string;
    emailPlaceholder: string;
    submitLabel: string;
  };
  copyright: string;
  legalLinks: LpFooterLegalLink[];
}

// ─── Social SVG icons ─────────────────────────────────────────────────────────

function SvgIcon({ path, viewBox = '0 0 24 24' }: { path: string; viewBox?: string }) {
  return (
    <svg viewBox={viewBox} fill="currentColor" aria-hidden="true" className="size-5">
      <path d={path} />
    </svg>
  );
}

const SOCIAL_SVG: Record<LpFooterSocialLink['platform'], string> = {
  facebook:
    'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z',
  instagram:
    'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z',
  twitter:
    'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.259 5.631 5.905-5.631zm-1.161 17.52h1.833L7.084 4.126H5.117z',
  linkedin:
    'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
  youtube:
    'M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z',
};

// ─── Component ────────────────────────────────────────────────────────────────

export function LpFooter({
  logo,
  tagline,
  socials,
  showroom,
  openingHours,
  newsletter,
  copyright,
  legalLinks,
}: LpFooterProps) {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmail('');
  };

  return (
    <footer className="border-t border-white/10 bg-[#0C0C0C]" aria-label="Site footer">
      {/* Main grid */}
      <div className="page-wrap grid grid-cols-1 gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">

        {/* Col 1 — Brand */}
        <div className="flex flex-col gap-5">
          <div aria-label="Brand logo">{logo}</div>
          <p className="text-sm leading-relaxed text-white/55">{tagline}</p>
          {socials.length > 0 && (
            <ul role="list" className="flex items-center gap-4">
              {socials.map(({ platform, href, label }) => (
                  <li key={platform}>
                    <a
                      href={href}
                      aria-label={label}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex size-8 items-center justify-center text-white/50 transition-colors duration-200 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0C0C0C]"
                    >
                      <SvgIcon path={SOCIAL_SVG[platform]} />
                    </a>
                  </li>
                ))}
            </ul>
          )}
        </div>

        {/* Col 2 — Showroom */}
        <div className="flex flex-col gap-4">
          <h2 className="text-sm font-semibold text-white">{showroom.heading}</h2>
          <p className="text-sm leading-relaxed text-white/55">{showroom.address}</p>
          <ul role="list" className="flex flex-col gap-3">
            <li>
              <a
                href={showroom.phoneHref}
                className="inline-flex items-center gap-2 text-sm text-white/70 transition-colors duration-200 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <ArrowUpRight className="size-4 shrink-0" aria-hidden="true" />
                {showroom.phone}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${showroom.email}`}
                className="inline-flex items-center gap-2 text-sm text-white/70 transition-colors duration-200 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <Mail className="size-4 shrink-0" aria-hidden="true" />
                {showroom.email}
              </a>
            </li>
            <li>
              <a
                href={showroom.directionsHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-white/70 transition-colors duration-200 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <MapPin className="size-4 shrink-0" aria-hidden="true" />
                {showroom.directionsLabel}
              </a>
            </li>
          </ul>
        </div>

        {/* Col 3 — Opening Hours */}
        <div className="flex flex-col gap-4">
          <h2 className="text-sm font-semibold text-white">{openingHours.heading}</h2>
          <ul role="list" className="flex flex-col gap-3">
            {openingHours.hours.map((hour, i) => (
              <li key={i} className="inline-flex items-center gap-2 text-sm text-white/55">
                <Clock2 className="size-4 shrink-0 text-white/40" aria-hidden="true" />
                {hour.label}
              </li>
            ))}
          </ul>
        </div>

        {/* Col 4 — Newsletter */}
        <div className="flex flex-col gap-4">
          <h2 className="text-sm font-semibold text-white">{newsletter.heading}</h2>
          <p className="text-sm leading-relaxed text-white/55">{newsletter.description}</p>
          <form
            onSubmit={handleSubmit}
            className="flex items-stretch gap-2"
            aria-label="Newsletter sign-up"
          >
            <label htmlFor="lp-newsletter-email" className="sr-only">
              {newsletter.emailPlaceholder}
            </label>
            <input
              id="lp-newsletter-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={newsletter.emailPlaceholder}
              className="min-w-0 flex-1 rounded-md border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/35 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#0C0C0C]"
            />
            <button
              type="submit"
              className="shrink-0 rounded-md bg-white px-5 py-2.5 text-sm font-semibold text-black transition-colors duration-200 hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0C0C0C]"
            >
              {newsletter.submitLabel}
            </button>
          </form>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="page-wrap flex flex-col items-start justify-between gap-4 py-5 sm:flex-row sm:items-center">
          <p className="text-xs text-white/40">{copyright}</p>
          {legalLinks.length > 0 && (
            <nav aria-label="Legal links">
              <ul role="list" className="flex flex-wrap items-center gap-x-5 gap-y-2">
                {legalLinks.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-xs text-white/50 transition-colors duration-200 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>
      </div>
    </footer>
  );
}
