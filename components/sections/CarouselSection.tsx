'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Link } from '@/app/i18n/navigation';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';

export interface CarouselCard {
  image: { src: string; alt: string };
  label: string;
  href: string;
}

interface CarouselSectionProps {
  heading: string;
  cards: CarouselCard[];
  prevLabel: string;
  nextLabel: string;
  cardArrowLabel: string;
}

export function CarouselSection({
  heading,
  cards,
  prevLabel,
  nextLabel,
  cardArrowLabel,
}: CarouselSectionProps) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const syncState = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    syncState();
    el.addEventListener('scroll', syncState, { passive: true });
    return () => el.removeEventListener('scroll', syncState);
  }, [syncState]);

  const scroll = (dir: 'prev' | 'next') => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector('li');
    const amount = card ? card.offsetWidth + 16 : 340;
    el.scrollBy({ left: dir === 'next' ? amount : -amount, behavior: 'smooth' });
  };

  return (
    <section aria-labelledby="carousel-heading" className="bg-white py-14 px-8 lg:px-16">

      {/* Header row */}
      <div className="mb-8 flex items-center justify-between">
        <h2
          id="carousel-heading"
          className="text-3xl font-bold text-foreground lg:text-4xl"
        >
          {heading}
        </h2>

        {/* Nav buttons */}
        <div role="group" aria-label="Carousel controls" className="flex gap-2">
          <Button
            type="button"
            onClick={() => scroll('prev')}
            disabled={!canPrev}
            aria-label={prevLabel}
            aria-controls="carousel-track"
            className={cn(
              'flex size-11 items-center justify-center rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold',
              canPrev
                ? 'bg-secondary text-secondary-foreground hover:bg-gold-hover'
                : 'bg-secondary/40 text-secondary-foreground/50 cursor-not-allowed',
            )}
          >
            <ArrowLeft className="size-5 text-white" aria-hidden="true" />
          </Button>

          <Button
            type="button"
            onClick={() => scroll('next')}
            disabled={!canNext}
            aria-label={nextLabel}
            aria-controls="carousel-track"
            className={cn(
              'flex size-11 items-center justify-center rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold',
              canNext
                ? 'bg-secondary text-secondary-foreground hover:bg-gold-hover'
                : 'bg-secondary/40 text-secondary-foreground/50 cursor-not-allowed',
            )}
          >
            <ArrowRight className="size-5 text-white" aria-hidden="true"  />
          </Button>
        </div>
      </div>

      {/* Track */}
      <ul
        id="carousel-track"
        ref={trackRef}
        role="list"
        aria-label={heading}
        className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-none [&::-webkit-scrollbar]:hidden"
      >
        {cards.map((card) => (
          <li
            key={card.label}
            className="shrink-0 snap-start w-[calc(33.333%-11px)] min-w-64"
          >
            <article className="group relative overflow-hidden rounded-2xl h-72">
              {/* Background image */}
              <Image
                src={card.image.src}
                alt={card.image.alt}
                fill
                sizes="(max-width: 768px) 80vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Dark footer strip */}
              <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between bg-primary px-5 py-4">
                <span className="text-base font-medium text-white">{card.label}</span>
                <Link
                  href={card.href}
                  aria-label={`${cardArrowLabel} ${card.label}`}
                  className="flex size-9 shrink-0 items-center justify-center rounded-md border border-white/25 text-black transition-colors bg-white hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                >
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}
