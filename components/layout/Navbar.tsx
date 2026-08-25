import { getTranslations } from 'next-intl/server';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/app/i18n/navigation';
import { LocaleSwitcher } from '@/components/layout/LocaleSwitcher';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { key: 'spaces', href: '/spaces' },
  { key: 'projects', href: '/projects' },
  { key: 'designStudio', href: '/design-studio' },
  { key: 'inspirations', href: '/inspirations' },
  { key: 'trade', href: '/trade' },
  { key: 'whyT1', href: '/why-t1' },
  { key: 'aboutUs', href: '/about' },
] as const;

export async function Navbar() {
  const t = await getTranslations('Nav');

  return (
    <header role="banner" className="relative z-50 w-full">
      <nav
        aria-label={t('mainNav')}
        className="flex items-center justify-between px-8 py-6"
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

        {/* Primary nav links — hidden on small screens */}
        <ul
          className="hidden lg:flex items-center gap-7"
          role="list"
        >
          {NAV_LINKS.map(({ key, href }) => (
            <li key={key}>
              <Link
                href={href}
                className="text-sm text-white/85 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-sm"
              >
                {t(key)}
              </Link>
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className="flex items-center gap-3 shrink-0">
          <LocaleSwitcher />
          <Link
            href="/kitchen-design"
            className={cn(
              buttonVariants({ variant: 'gold', size: 'lg' }),
              'rounded-full gap-2 px-5 hidden sm:inline-flex'
            )}
          >
            {t('startKitchenDesign')}
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </nav>
    </header>
  );
}
