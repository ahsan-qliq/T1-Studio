'use client';

import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { useCallback, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';

const EASE = [0.22, 1, 0.36, 1] as const;
const CAROUSEL_THRESHOLD = 3; // > this → carousel mode

// ─── Public types ─────────────────────────────────────────────────────────────

export interface MaterialInspirationItem {
  src: string;
  alt: string;
  label: string;
}

export interface MaterialInspirationSectionProps {
  heading: string;
  items: MaterialInspirationItem[];
  prevLabel?: string;
  nextLabel?: string;
}

// ─── Single tile ──────────────────────────────────────────────────────────────

function InspirationTile({
  item,
  index,
  inView,
  sizes,
}: {
  item: MaterialInspirationItem;
  index: number;
  inView: boolean;
  sizes: string;
}) {
  return (
    <motion.figure
      className="relative aspect-[2/1] overflow-hidden"
      initial={{ opacity: 0, scale: 1.04 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.9, ease: EASE, delay: index * 0.1 }}
    >
      <Image
        src={item.src}
        alt={item.alt}
        fill
        sizes={sizes}
        className="object-cover transition-transform duration-700 ease-in-out hover:scale-105"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.18) 35%, transparent 60%)',
        }}
      />

      <figcaption className="absolute bottom-0 left-0 p-5 text-2xl font-bold text-white sm:p-7 sm:text-3xl lg:text-4xl">
        {item.label}
      </figcaption>
    </motion.figure>
  );
}

// ─── Grid layout (≤ threshold items) ──────────────────────────────────────────

function GridLayout({
  heading,
  items,
  inView,
}: {
  heading: string;
  items: MaterialInspirationItem[];
  inView: boolean;
}) {
  const cols = Math.min(Math.max(items.length, 1), 4);

  return (
    <>
      {/* Centered heading */}
      <motion.div
        className="px-4 py-10 text-center sm:py-12"
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <h2
          id="material-inspiration-heading"
          className="text-2xl font-bold text-white sm:text-3xl lg:text-4xl"
        >
          {heading}
        </h2>
      </motion.div>

      <ul
        role="list"
        aria-label={heading}
        className="grid"
        style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
      >
        {items.map((item, i) => (
          <li key={`${item.src}-${i}`} role="listitem">
            <InspirationTile
              item={item}
              index={i}
              inView={inView}
              sizes={`(max-width: 768px) 100vw, ${Math.round(100 / cols)}vw`}
            />
          </li>
        ))}
      </ul>
    </>
  );
}

// ─── Carousel layout (> threshold items) ─────────────────────────────────────

function CarouselLayout({
  heading,
  items,
  inView,
  prevLabel,
  nextLabel,
}: {
  heading: string;
  items: MaterialInspirationItem[];
  inView: boolean;
  prevLabel: string;
  nextLabel: string;
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'start', loop: true });
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const updateButtons = useCallback(() => {
    if (!emblaApi) return;
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  // Sync button state
  const onInit = useCallback(() => updateButtons(), [updateButtons]);
  const onSelect = useCallback(() => updateButtons(), [updateButtons]);

  // Register listeners via ref callback
  const emblaRefCallback = useCallback(
    (node: HTMLDivElement | null) => {
      if (!node || !emblaApi) return;
      emblaApi.on('init', onInit);
      emblaApi.on('select', onSelect);
      emblaApi.on('reInit', onSelect);
    },
    [emblaApi, onInit, onSelect],
  );

  return (
    <>
      {/* Header row: heading left, nav controls right */}
      <motion.div
        className="flex items-center justify-between gap-6 px-4 py-10 sm:px-8 sm:py-12 lg:px-16"
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <h2
          id="material-inspiration-heading"
          className="text-2xl font-bold text-white sm:text-3xl lg:text-4xl"
        >
          {heading}
        </h2>

        <div className="flex shrink-0 items-center gap-3" aria-label="Carousel controls">
          <button
            type="button"
            onClick={() => emblaApi?.scrollPrev()}
            disabled={!canPrev}
            aria-label={prevLabel}
            className="flex size-11 items-center justify-center rounded-full border border-white/20 text-white transition-colors duration-200 hover:border-white/50 hover:bg-white/5 disabled:pointer-events-none disabled:opacity-30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          >
            <ChevronLeft className="size-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => emblaApi?.scrollNext()}
            disabled={!canNext}
            aria-label={nextLabel}
            className="flex size-11 items-center justify-center rounded-full border border-white/20 text-white transition-colors duration-200 hover:border-white/50 hover:bg-white/5 disabled:pointer-events-none disabled:opacity-30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          >
            <ChevronRight className="size-5" aria-hidden="true" />
          </button>
        </div>
      </motion.div>

      {/* Carousel */}
      <div ref={emblaRef} className="overflow-hidden" aria-label={heading}>
        <div ref={emblaRefCallback} className="flex">
          {items.map((item, i) => (
            <div
              key={`${item.src}-${i}`}
              className="min-w-0 flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%]"
            >
              <InspirationTile
                item={item}
                index={i}
                inView={inView}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export function MaterialInspirationSection({
  heading,
  items,
  prevLabel = 'Previous slide',
  nextLabel = 'Next slide',
}: MaterialInspirationSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref as React.RefObject<Element>, {
    once: true,
    margin: '-60px',
  });

  const isCarousel = items.length > CAROUSEL_THRESHOLD;

  return (
    <section
      ref={ref}
      aria-labelledby="material-inspiration-heading"
      className="bg-[#0C0C0C]"
    >
      {isCarousel ? (
        <CarouselLayout
          heading={heading}
          items={items}
          inView={inView}
          prevLabel={prevLabel}
          nextLabel={nextLabel}
        />
      ) : (
        <GridLayout heading={heading} items={items} inView={inView} />
      )}
    </section>
  );
}
