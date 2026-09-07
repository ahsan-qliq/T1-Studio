import { getTranslations } from 'next-intl/server';
import { Link } from '@/app/i18n/navigation';
import { MapPin, Phone, Mail } from 'lucide-react';

// ─── Inline social SVG icons ──────────────────────────────────────────────────

function IconFacebook() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-4" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function IconInstagram() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4" aria-hidden="true">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function IconX() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-4" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function IconLinkedin() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-4" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function IconYoutube() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-4" aria-hidden="true">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
      <polygon fill="white" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
    </svg>
  );
}

// ─── Logo ─────────────────────────────────────────────────────────────────────

function FooterLogo({ label }: { label: string }) {
  return (
    <Link
      href="/"
      aria-label={label}
      className="inline-flex items-center gap-2 rounded-sm border border-gold/60 px-4 py-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50"
    >
      <span className="text-xl font-semibold tracking-tight text-white select-none">
        T<span className="text-gold">.</span>one
      </span>
      <span className="text-xl font-light text-white/40 select-none" aria-hidden="true">|</span>
      <span className="text-xl font-light tracking-widest text-white select-none">keller</span>
    </Link>
  );
}

// ─── Nav column ───────────────────────────────────────────────────────────────

function FooterNavColumn({
  heading,
  links,
}: {
  heading: string;
  links: { label: string; href: string }[];
}) {
  return (
    <nav aria-label={heading}>
      <h3 className="mb-5 text-sm font-semibold text-white">{heading}</h3>
      <ul role="list" className="flex flex-col gap-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-sm text-white/60 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50 rounded-sm"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

// ─── Main footer ──────────────────────────────────────────────────────────────

export async function Footer() {
  const t = await getTranslations('Footer');

  const spacesLinks = [
    { label: t('spacesKitchens'),    href: '/spaces/kitchens' },
    { label: t('spacesWardrobes'),   href: '/spaces/wardrobes' },
    { label: t('spacesLivingRooms'), href: '/spaces/living-rooms' },
    { label: t('spacesBathrooms'),   href: '/spaces/bathrooms' },
  ];

  const projectsLinks = [
    { label: t('projectsResidential'),   href: '/projects/residential' },
    { label: t('projectsCommercial'),    href: '/projects/commercial' },
    { label: t('projectsHospitality'),   href: '/projects/hospitality' },
    { label: t('projectsDevelopers'),    href: '/projects/developers' },
  ];

  const studioLinks = [
    { label: t('studioConsultation'),  href: '/design-studio/consultation' },
    { label: t('studioProcess'),       href: '/design-studio/process' },
    { label: t('studioMaterials'),     href: '/design-studio/materials' },
    { label: t('studioPortfolio'),     href: '/design-studio/portfolio' },
  ];

  const socialLinks = [
    { Icon: IconFacebook,  label: t('socialFacebook'),  href: 'https://facebook.com' },
    { Icon: IconInstagram, label: t('socialInstagram'), href: 'https://instagram.com' },
    { Icon: IconX,         label: t('socialX'),         href: 'https://x.com' },
    { Icon: IconLinkedin,  label: t('socialLinkedin'),  href: 'https://linkedin.com' },
    { Icon: IconYoutube,   label: t('socialYoutube'),   href: 'https://youtube.com' },
  ];

  return (
    <footer className="bg-foreground" aria-label={t('footerLabel')}>

      {/* Main content */}
      <div className="mx-auto px-4 py-14 sm:px-8 lg:px-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-[2fr_1fr_1fr_1fr_1.4fr]">

          {/* Brand column */}
          <div className="flex flex-col gap-6">
            <FooterLogo label={t('logoLabel')} />
            <p className="max-w-xs text-sm leading-relaxed text-white/60">
              {t('description')}
            </p>

            {/* Social icons */}
            <ul role="list" className="flex items-center gap-4">
              {socialLinks.map(({ Icon, label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    aria-label={label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex size-9 items-center justify-center rounded-full border border-white/20 text-white/60 transition-all duration-200 hover:border-gold/60 hover:text-gold motion-safe:hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50"
                  >
                    <Icon />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Nav columns */}
          <FooterNavColumn heading={t('spacesHeading')}      links={spacesLinks}   />
          <FooterNavColumn heading={t('projectsHeading')}    links={projectsLinks} />
          <FooterNavColumn heading={t('studioHeading')}      links={studioLinks}   />

          {/* Contact */}
          <div>
            <h3 className="mb-5 text-sm font-semibold text-white">{t('contactHeading')}</h3>
            <address className="not-italic">
              <ul role="list" className="flex flex-col gap-4">
                <li className="flex items-start gap-3 text-sm text-white/60">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" strokeWidth={1.5} />
                  <span>{t('contactAddress')}</span>
                </li>
                <li>
                  <a
                    href={`tel:${t('contactPhone').replace(/\s/g, '')}`}
                    className="flex items-center gap-3 text-sm text-white/60 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50 rounded-sm"
                  >
                    <Phone className="size-4 shrink-0 text-gold" aria-hidden="true" strokeWidth={1.5} />
                    <span>{t('contactPhone')}</span>
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${t('contactEmail')}`}
                    className="flex items-center gap-3 text-sm text-white/60 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50 rounded-sm"
                  >
                    <Mail className="size-4 shrink-0 text-gold" aria-hidden="true" strokeWidth={1.5} />
                    <span>{t('contactEmail')}</span>
                  </a>
                </li>
              </ul>
            </address>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-5 sm:flex-row sm:px-8 lg:px-16">
          <p className="text-xs text-white/40">{t('copyright')}</p>

          <nav aria-label={t('legalNavLabel')}>
            <ul role="list" className="flex flex-wrap items-center gap-x-6 gap-y-2">
              {[
                { label: t('privacyPolicy'),        href: '/privacy-policy' },
                { label: t('termsOfService'),       href: '/terms-of-service' },
                { label: t('regulatoryCompliance'), href: '/regulatory-compliance' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-xs text-white/40 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50 rounded-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

    </footer>
  );
}
