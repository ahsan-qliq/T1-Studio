import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ComparisonColumn {
  title: string;
  features: string[];
  variant: 'dark' | 'light';
}

interface ComparisonSectionProps {
  heading: string;
  columns: ComparisonColumn[];
}

function ComparisonCard({ title, features, variant }: ComparisonColumn) {
  const isDark = variant === 'dark';

  return (
    <article
      className={cn(
        'flex flex-col gap-6 rounded-2xl p-8',
        isDark
          ? 'bg-primary'
          : 'border border-border bg-white',
      )}
    >
      <h3
        className={cn(
          'text-center text-xl font-bold',
          isDark ? 'text-white' : 'text-foreground',
        )}
      >
        {title}
      </h3>

      <ul role="list" className="flex flex-col gap-5">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            <Check
              className={cn(
                'mt-0.5 size-4 shrink-0',
                isDark ? 'text-white' : 'text-foreground',
              )}
              aria-hidden="true"
              strokeWidth={2.5}
            />
            <span
              className={cn(
                'text-sm leading-relaxed',
                isDark ? 'text-white/85' : 'text-muted-foreground',
              )}
            >
              {feature}
            </span>
          </li>
        ))}
      </ul>
    </article>
  );
}

export function ComparisonSection({ heading, columns }: ComparisonSectionProps) {
  return (
    <section aria-labelledby="comparison-heading" className="bg-white py-14 px-8 lg:px-16">

      <h2
        id="comparison-heading"
        className="mb-10 text-center text-3xl font-bold text-foreground lg:text-4xl"
      >
        {heading}
      </h2>

      <ul
        role="list"
        className="mx-auto grid max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {columns.map((col) => (
          <li key={col.title}>
            <ComparisonCard {...col} />
          </li>
        ))}
      </ul>

    </section>
  );
}
