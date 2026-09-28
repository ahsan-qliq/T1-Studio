'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel';
import { cn } from '@/lib/utils';
import { ImageGridSection, type ImageGridItem } from '@/components/sections/ImageGridSection';

// ─── Public types ─────────────────────────────────────────────────────────────

export interface CarouselSlide {
  src: string;
  alt: string;
}

interface ImageCarouselSectionProps {
  slides: CarouselSlide[];
  prevLabel?: string;
  nextLabel?: string;
  'aria-label'?: string;
  gridItems?: ImageGridItem[];
  gridColumns?: 2 | 3;
}

// ─── Nav button ───────────────────────────────────────────────────────────────

function NavButton({
  direction,
  onClick,
  disabled,
  label,
}: {
  direction: 'prev' | 'next';
  onClick: () => void;
  disabled: boolean;
  label: string;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        'absolute top-1/2 z-10 -translate-y-1/2 flex size-12 items-center justify-center rounded-full bg-white shadow-md transition-all duration-200',
        'hover:bg-white/90 disabled:pointer-events-none disabled:opacity-40',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2',
        'motion-safe:hover:scale-105 motion-safe:active:scale-95',
        direction === 'prev' ? 'left-6' : 'right-6',
      )}
    >
      {direction === 'prev' ? (
        <ChevronLeft className="size-5 text-[#0C0C0C]" aria-hidden="true" />
      ) : (
        <ChevronRight className="size-5 text-[#0C0C0C]" aria-hidden="true" />
      )}
    </button>
  );
}

// ─── Dot indicators ───────────────────────────────────────────────────────────

function Dots({
  count,
  active,
  onSelect,
}: {
  count: number;
  active: number;
  onSelect: (index: number) => void;
}) {
  return (
    <div
      role="tablist"
      aria-label="Slide indicators"
      className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2"
    >
      {Array.from({ length: count }).map((_, i) => (
        <button
          key={i}
          type="button"
          role="tab"
          aria-label={`Go to slide ${i + 1}`}
          aria-selected={i === active}
          onClick={() => onSelect(i)}
          className={cn(
            'size-2 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black',
            i === active
              ? 'bg-white scale-125'
              : 'bg-white/40 hover:bg-white/70',
          )}
        />
      ))}
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export function ImageCarouselSection({
  slides,
  prevLabel = 'Previous slide',
  nextLabel = 'Next slide',
  'aria-label': ariaLabel = 'Image gallery',
  gridItems,
  gridColumns = 2,
}: ImageCarouselSectionProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const updateState = useCallback((api: CarouselApi) => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    setCanPrev(api.canScrollPrev());
    setCanNext(api.canScrollNext());
  }, []);

  const handleApi = useCallback(
    (nextApi: CarouselApi) => {
      setApi(nextApi);
      updateState(nextApi);
    },
    [updateState],
  );

  useEffect(() => {
    if (!api) return;
    api.on('select', updateState);
    api.on('reInit', updateState);
    return () => {
      api.off('select', updateState);
      api.off('reInit', updateState);
    };
  }, [api, updateState]);

  const scrollTo = useCallback(
    (index: number) => api?.scrollTo(index),
    [api],
  );

  if (!slides.length) return null;

  return (
    <div className="bg-[#0C0C0C]">
      <section aria-label={ariaLabel} className="relative w-full overflow-hidden">
        <Carousel
          opts={{ loop: false, align: 'start' }}
          setApi={handleApi}
          className="w-full"
        >
          <CarouselContent className="-ml-0">
            {slides.map((slide, i) => (
              <CarouselItem
                key={slide.src}
                className="pl-0"
                aria-label={`Slide ${i + 1} of ${slides.length}: ${slide.alt}`}
              >
                <div className="relative w-full aspect-[21/9] min-h-[320px]">
                  <Image
                    src={slide.src}
                    alt={slide.alt}
                    fill
                    sizes="100vw"
                    className="object-cover"
                    priority={i === 0}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <NavButton
            direction="prev"
            label={prevLabel}
            onClick={() => api?.scrollPrev()}
            disabled={!canPrev}
          />
          <NavButton
            direction="next"
            label={nextLabel}
            onClick={() => api?.scrollNext()}
            disabled={!canNext}
          />

          <Dots count={slides.length} active={current} onSelect={scrollTo} />
        </Carousel>
      </section>
    </div>
  );
}
