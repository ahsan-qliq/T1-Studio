import { getTranslations } from 'next-intl/server';

interface StatItem {
  value: string;
  labelKey: 'unitsDelivered' | 'projectScale' | 'leadTime' | 'teamMembers';
}

const DEFAULT_STATS: StatItem[] = [
  { value: '50+',  labelKey: 'unitsDelivered' },
  { value: '200+', labelKey: 'projectScale' },
  { value: '200+', labelKey: 'leadTime' },
  { value: '200+', labelKey: 'teamMembers' },
];

interface StatsBarProps {
  stats?: StatItem[];
}

export async function StatsBar({ stats = DEFAULT_STATS }: StatsBarProps) {
  const t = await getTranslations('Stats');

  return (
    <section aria-label={t('sectionLabel')} className="bg-primary py-14 px-8 lg:px-16">
      <ul role="list" className="flex flex-wrap justify-between gap-y-10 max-w-6xl mx-auto">
        {stats.map(({ value, labelKey }) => (
          <li key={labelKey} className="flex flex-col text-center gap-2">
            <span
              className="text-4xl font-bold text-white lg:text-[56px]"
              aria-label={`${value} ${t(labelKey)}`}
            >
              {value}
            </span>
            <p className="text-base  text-white/80" aria-hidden="true">
              {t(labelKey)}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
