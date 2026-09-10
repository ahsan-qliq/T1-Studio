'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StepInfo {
  number: string;
  title: string;
}

interface JourneyCarouselClientProps {
  children: React.ReactNode;
  steps: StepInfo[];
  prevLabel: string;
  nextLabel: string;
  cardsLabel: string;
}

export function JourneyCarouselClient({
  children,
  steps,
  prevLabel,
  nextLabel,
  cardsLabel,
}: JourneyCarouselClientProps) {
  const [index, setIndex] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const [cardWidth, setCardWidth] = useState(0);

  const trackRef = useRef<HTMLOListElement>(null);

  // Keep a ref so measure() can read the latest index without stale closure
  const indexRef = useRef(0);

  const measure = useCallback(() => {
    const track = trackRef.current;
    if (!track || !track.children[0]) return;

    const cw = (track.children[0] as HTMLElement).offsetWidth;
    if (cw <= 0) return;

    const wrapperWidth = (track.parentElement as HTMLElement | null)?.offsetWidth ?? 0;
    const vc = Math.max(1, Math.round(wrapperWidth / cw));
    const max = Math.max(0, steps.length - vc);
    const clamped = Math.min(indexRef.current, max);

    indexRef.current = clamped;
    setCardWidth(cw);
    setVisibleCount(vc);
    setIndex(clamped);
    setTranslateX(clamped * cw);
  }, [steps.length]);

  useEffect(() => {
    measure();
    const observer = new ResizeObserver(measure);
    const wrapper = trackRef.current?.parentElement;
    if (wrapper) observer.observe(wrapper);
    return () => observer.disconnect();
  }, [measure]);

  const maxIndex = Math.max(0, steps.length - visibleCount);
  const canPrev = index > 0;
  const canNext = index < maxIndex;

  const go = (dir: 1 | -1) => {
    const newIndex = Math.max(0, Math.min(maxIndex, index + dir));
    indexRef.current = newIndex;
    setIndex(newIndex);
    setTranslateX(newIndex * cardWidth);
  };

  const goToStep = (i: number) => {
    if (i >= index && i < index + visibleCount) return;
    const newIndex = i < index
      ? Math.max(0, i)
      : Math.min(maxIndex, i - visibleCount + 1);
    indexRef.current = newIndex;
    setIndex(newIndex);
    setTranslateX(newIndex * cardWidth);
  };

  const transform = `translateX(-${translateX}px)`;

  return (
    <>
      {/* Stepper row — prev / timeline / next */}
      <div className="mb-8 flex items-center gap-2 sm:gap-3">

        {/* Prev */}
        <button
          type="button"
          onClick={() => go(-1)}
          disabled={!canPrev}
          aria-label={prevLabel}
          className={cn(
            'flex size-11 shrink-0 items-center justify-center rounded-full transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold',
            canPrev
              ? 'bg-secondary/20 text-primary hover:bg-secondary/30 motion-safe:hover:scale-105 motion-safe:active:scale-95'
              : 'bg-secondary/10 text-primary/40 cursor-not-allowed',
          )}
        >
          <ArrowLeft className="size-5" aria-hidden="true" />
        </button>

        {/* Timeline track — overflows hidden, translates with cards */}
        <div className="flex-1 overflow-hidden" aria-hidden="true">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform }}
          >
            {steps.map((step, i) => {
              const isVisible = i >= index && i < index + visibleCount;
              return (
                <div
                  key={step.number}
                  /*
                   * CSS classes provide an approximate layout during SSR / before first
                   * measure. Once JS runs, the inline width (exact card pixel width)
                   * overrides so circles align precisely above their cards.
                   */
                  className="shrink-0 w-full sm:w-1/2 lg:w-1/3 flex items-center"
                  style={{ width: cardWidth > 0 ? `${cardWidth}px` : undefined }}
                >
                  {/* Left connector line — hidden on first item */}
                  <div
                    className={cn(
                      'h-0.5 flex-1 transition-colors duration-300',
                      i === 0 ? 'opacity-0' : 'bg-secondary',
                    )}
                  />

                  {/* Step circle */}
                  <button
                    type="button"
                    onClick={() => goToStep(i)}
                    aria-label={`${step.number} ${step.title}`}
                    className={cn(
                      'flex size-10 shrink-0 items-center justify-center rounded-full text-sm font-bold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
                      isVisible
                        ? 'bg-secondary text-primary shadow-md scale-110'
                        : 'bg-secondary text-secondary motion-safe:hover:scale-110 motion-safe:hover:opacity-90',
                    )}
                  >
                    {step.number}
                  </button>

                  {/* Right connector line — hidden on last item */}
                  <div
                    className={cn(
                      'h-0.5 flex-1 transition-colors duration-300',
                      i === steps.length - 1 ? 'opacity-0' : 'bg-secondary',
                    )}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Next */}
        <button
          type="button"
          onClick={() => go(1)}
          disabled={!canNext}
          aria-label={nextLabel}
          className={cn(
            'flex size-11 shrink-0 items-center justify-center rounded-full transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold',
            canNext
              ? 'bg-secondary/20 text-primary hover:bg-secondary/30 motion-safe:hover:scale-105 motion-safe:active:scale-95'
              : 'bg-secondary/10 text-primary/40 cursor-not-allowed',
          )}
        >
          <ArrowRight className="size-5" aria-hidden="true" />
        </button>
      </div>

      {/* Cards viewport — clips to show only N cards */}
      <div className="overflow-hidden">
        <ol
          ref={trackRef}
          aria-label={cardsLabel}
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform }}
        >
          {children}
        </ol>
      </div>
    </>
  );
}
