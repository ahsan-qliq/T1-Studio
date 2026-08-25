'use client';

import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/app/i18n/navigation';
import { ChevronDown } from 'lucide-react';

export function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations('Nav');

  const nextLocale = locale === 'en' ? 'ar' : 'en';

  const handleSwitch = () => {
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <button
      type="button"
      onClick={handleSwitch}
      aria-label={t('switchLocaleLabel')}
      className="inline-flex items-center gap-1.5 rounded-full border border-white/60 px-4 py-2 text-sm font-medium text-white transition-colors hover:border-white hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
    >
      <span>{locale.toUpperCase()}</span>
      <ChevronDown className="size-3.5" aria-hidden="true" />
    </button>
  );
}
