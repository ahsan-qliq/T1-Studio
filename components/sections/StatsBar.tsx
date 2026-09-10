import { getTranslations } from "next-intl/server";

interface StatItem {
  value: string;
  label: string;
}

interface StatsBarProps {
  namespace: string;
}

export async function StatsBar({ namespace }: StatsBarProps) {
  const t = await getTranslations(namespace);
  console.log("StatsBar namespace:", t);
  const stats = t.raw("items") as StatItem[];

  return (
    <section aria-label={t("sectionLabel")} className="page-wrap py-12">
      <ul role="list" className="flex flex-wrap justify-between gap-8 sm:gap-12 lg:gap-16">
        {stats.map(({ value, label }) => (
          <li
            key={label}
            className="flex flex-col items-center gap-2 text-center"
          >
            <span
              className="text-4xl font-bold text-white sm:text-5xl lg:text-[56px]"
              aria-label={`${value} ${label}`}
            >
              {value}
            </span>
            <p
              className="text-sm text-white/80 sm:text-base"
              aria-hidden="true"
            >
              {label}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
