'use client';

import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/app/i18n/navigation';
import { ChevronDown, Check } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';

const LOCALES = [
  { value: 'en', label: 'English', short: 'EN' },
  { value: 'ar', label: 'العربية', short: 'AR' },
] as const;

export function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations('Nav');

  const current = LOCALES.find((l) => l.value === locale) ?? LOCALES[0];

  const handleSelect = (value: string) => {
    if (value !== locale) {
      router.replace(pathname, { locale: value });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label={t('switchLocaleLabel')}
        className="inline-flex items-center gap-1.5 rounded-full border border-white/60 px-4 py-2 text-sm font-medium text-white transition-colors hover:border-white hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 data-popup-open:border-white data-popup-open:bg-white/10"
      >
        <span>{current.short}</span>
        <ChevronDown className="size-3.5 transition-transform duration-200 data-popup-open:rotate-180" aria-hidden="true" />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className="min-w-[8rem] rounded-lg border border-white/10 bg-[#0C0C0C] p-1 text-white shadow-xl"
      >
        {LOCALES.map(({ value, label, short }) => (
          <DropdownMenuItem
            key={value}
            onClick={() => handleSelect(value)}
            className="flex cursor-pointer items-center justify-between gap-3 rounded-md px-3 py-2 text-sm text-white/80 transition-colors hover:bg-white/10 hover:text-white/90 focus:bg-white focus:text-white"
          >
            <span>
              <span className="mr-2 font-medium text-white/50">{short}</span>
              {label}
            </span>
            {value === locale && (
              <Check className="size-3.5 text-white/60" aria-hidden="true" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
