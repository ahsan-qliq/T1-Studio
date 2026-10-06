import { getTranslations } from 'next-intl/server';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { Link } from '@/app/i18n/navigation';
import { LocaleSwitcher } from '@/components/layout/LocaleSwitcher';
import { NavMobileMenu } from '@/components/layout/NavMobileMenu';
import { NavbarShell } from '@/components/layout/NavbarShell';
import logo from '@/public/assets/images/Logo.png';

const NAV_LINK_KEYS = [
  { key: 'spaces', href: '/spaces' },
  { key: 'projects', href: '/projects' },
  { key: 'inspirations', href: '/inspiration' },
  { key: 'trade', href: '/trade' },
  { key: 'whyT1', href: '/why-t1' },
  { key: 'aboutUs', href: '/about' },
] as const;

export async function Navbar() {
  const t = await getTranslations('Nav');

  const navLinks = NAV_LINK_KEYS.map(({ key, href }) => ({
    label: t(key),
    href,
  }));

  return (
    <NavbarShell>
      <nav
        aria-label={t('mainNav')}
        className="page-wrap flex items-center justify-between py-4 sm:py-6"
      >
        {/* Logo */}
        <Link
          href="/"
          aria-label={t('logoLabel')}
          className="shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-sm"
        >
          <Image src={logo} alt={t('logoLabel')} height={36} priority />
        </Link>

        {/* Primary nav links — desktop only */}
        <ul className="hidden lg:flex items-center gap-7" role="list">
          {navLinks.map(({ label, href }) => (
            <li key={href}>
              <Link
                href={href}
                className="underline-grow text-sm text-white/85 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-sm"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <LocaleSwitcher />

          {/* CTA — desktop only; mobile gets it inside the drawer */}
          <Link
            href="/contact#enquiry"
            className="group hidden lg:inline-flex items-center gap-2 rounded-full bg-white px-5 py-2 text-sm font-semibold text-black transition-colors duration-200 hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          >
            {t('startKitchenDesign')}
            <ArrowRight className="size-3.5 motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>

          {/* Mobile menu trigger — client island, hidden on desktop */}
          <NavMobileMenu
            links={navLinks}
            ctaLabel={t('startKitchenDesign')}
            ctaHref="/spaces/kitchens"
            openLabel={t('openMenu')}
            closeLabel={t('closeMenu')}
          />
        </div>
      </nav>
    </NavbarShell>
  );
}
