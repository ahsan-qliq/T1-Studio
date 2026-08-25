import Image from 'next/image';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface FeatureCard {
  icon: LucideIcon;
  title: string;
  description: string;
  variant: 'dark' | 'gold';
}

interface WhyT1SectionProps {
  label: string;
  heading: string;
  image: { src: string; alt: string };
  cards: FeatureCard[];
}

function FeatureCard({ icon: Icon, title, description, variant }: FeatureCard) {
  const isDark = variant === 'dark';

  return (
    <article
      className={cn(
        'flex flex-col gap-4 rounded-2xl p-6 h-full',
        isDark ? 'bg-primary' : 'bg-secondary',
      )}
    >
      <Icon
        className={cn('size-6 shrink-0', isDark ? 'text-white' : 'text-primary')}
        aria-hidden="true"
        strokeWidth={1.5}
      />
      <div className="flex flex-col gap-2">
        <h3
          className={cn(
            'text-lg font-semibold',
            isDark ? 'text-white' : 'text-primary',
          )}
        >
          {title}
        </h3>
        <p
          className={cn(
            'text-sm leading-relaxed',
            isDark ? 'text-white/70' : 'text-primary/70',
          )}
        >
          {description}
        </p>
      </div>
    </article>
  );
}

export function WhyT1Section({ label, heading, image, cards }: WhyT1SectionProps) {
  return (
    <section aria-labelledby="why-t1-heading" className="bg-white py-14 px-8 lg:px-16">
      <div className="mx-auto grid items-center gap-12 lg:grid-cols-[2fr_3fr]">

        {/* Left — image */}
        <div className="relative aspect-3/4 w-full overflow-hidden rounded-3xl lg:aspect-auto lg:h-full lg:min-h-120">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 40vw"
            className="object-cover"
          />
        </div>

        {/* Right — content */}
        <div className="flex flex-col gap-6">
          <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
            {label}
          </p>

          <h2
            id="why-t1-heading"
            className="text-3xl font-bold leading-tight text-foreground lg:text-4xl"
          >
            {heading}
          </h2>

          {/* 2×2 card grid */}
          <div
            role="list"
            className="grid grid-cols-2 gap-3"
            aria-label={heading}
          >
            {cards.map((card) => (
              <div role="listitem" key={card.title}>
                <FeatureCard {...card} />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
