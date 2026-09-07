import { getTranslations } from 'next-intl/server';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/app/i18n/navigation';
import { LocaleSwitcher } from '@/components/layout/LocaleSwitcher';
import { NavMobileMenu } from '@/components/layout/NavMobileMenu';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const NAV_LINK_KEYS = [
  { key: 'spaces', href: '/spaces' },
  { key: 'projects', href: '/projects' },
  { key: 'designStudio', href: '/design-studio' },
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
    <header role="banner" className="relative z-50 w-full">
      <nav
        aria-label={t('mainNav')}
        className="flex items-center justify-between py-4 sm:py-6"
      >
        {/* Logo */}
        <Link
          href="/"
          aria-label={t('logoLabel')}
          className="flex items-center gap-2 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-sm"
        >
          <span className="text-xl font-semibold text-white tracking-tight select-none">
            T<span className="text-gold">.</span>one
          </span>
          <span className="text-white/40 text-xl font-light select-none" aria-hidden="true">|</span>
          <span className="text-white text-xl font-light tracking-widest select-none">keller</span>
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
            href="/kitchen-design"
            className={cn(
              buttonVariants({ size: 'lg' }),
              'group hidden lg:inline-flex',
            )}
          >
            {t('startKitchenDesign')}
            <ArrowRight className="size-4 motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>

          {/* Mobile menu trigger — client island, hidden on desktop */}
          <NavMobileMenu
            links={navLinks}
            ctaLabel={t('startKitchenDesign')}
            ctaHref="/kitchen-design"
            openLabel={t('openMenu')}
            closeLabel={t('closeMenu')}
          />
        </div>
      </nav>
    </header>
  );
}
