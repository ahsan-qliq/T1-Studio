'use client';

import { useState, useCallback, useEffect } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StepInfo {
  number: string;
  title: string;
}

interface JourneyStepperClientProps {
  steps: StepInfo[];
  trackId: string;
  prevLabel: string;
  nextLabel: string;
}

export function JourneyStepperClient({
  steps,
  trackId,
  prevLabel,
  nextLabel,
}: JourneyStepperClientProps) {
  const [activeStep, setActiveStep] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const getTrack = useCallback(
    () => document.getElementById(trackId) as HTMLElement | null,
    [trackId],
  );

  const cardScrollWidth = useCallback(() => {
    const track = getTrack();
    if (!track) return 0;
    const cards = track.querySelectorAll<HTMLLIElement>('li');
    if (cards.length < 2) return cards[0]?.offsetWidth ?? 0;
    return cards[1].offsetLeft - cards[0].offsetLeft;
  }, [getTrack]);

  const syncState = useCallback(() => {
    const track = getTrack();
    if (!track) return;
    const { scrollLeft, scrollWidth, offsetWidth } = track;
    setCanPrev(scrollLeft > 1);
    setCanNext(scrollLeft < scrollWidth - offsetWidth - 1);
    const unit = cardScrollWidth();
    if (unit > 0) setActiveStep(Math.round(scrollLeft / unit));
  }, [getTrack, cardScrollWidth]);

  useEffect(() => {
    const track = getTrack();
    if (!track) return;
    syncState();
    track.addEventListener('scroll', syncState, { passive: true });
    return () => track.removeEventListener('scroll', syncState);
  }, [getTrack, syncState]);

  const scrollByCard = useCallback(
    (direction: 1 | -1) => {
      const track = getTrack();
      if (!track) return;
      track.scrollBy({ left: direction * cardScrollWidth(), behavior: 'smooth' });
    },
    [getTrack, cardScrollWidth],
  );

  const goTo = useCallback(
    (index: number) => {
      const track = getTrack();
      if (!track) return;
      const cards = track.querySelectorAll<HTMLLIElement>('li');
      const card = cards[index];
      if (!card) return;
      track.scrollTo({ left: card.offsetLeft, behavior: 'smooth' });
    },
    [getTrack],
  );

  return (
    <div className="mb-8 flex items-center gap-2 sm:gap-3">
      <button
        type="button"
        onClick={() => scrollByCard(-1)}
        disabled={!canPrev}
        aria-label={prevLabel}
        className={cn(
          'flex size-11 shrink-0 items-center justify-center rounded-xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold',
          canPrev
            ? 'bg-secondary/20 text-gold hover:bg-secondary/30'
            : 'bg-secondary/10 text-gold/40 cursor-not-allowed',
        )}
      >
        <ArrowLeft className="size-5" aria-hidden="true" />
      </button>

      <div className="flex flex-1 items-center overflow-hidden">
        <div className="flex-1 border-t-2 border-gold/50" aria-hidden="true" />
        {steps.map((step, i) => (
          <div key={step.number} className="flex items-center">
            <button
              type="button"
              onClick={() => goTo(i)}
              aria-current={activeStep === i ? 'step' : undefined}
              aria-label={`${step.number} ${step.title}`}
              className={cn(
                'flex size-11 shrink-0 items-center justify-center rounded-full text-sm font-bold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2',
                activeStep === i
                  ? 'bg-gold text-gold-foreground scale-110 shadow-md'
                  : 'bg-secondary text-secondary-foreground hover:opacity-80',
              )}
            >
              {step.number}
            </button>
            {i < steps.length - 1 && (
              <div className="w-4 border-t-2 border-gold/50 sm:w-8 lg:w-16" aria-hidden="true" />
            )}
          </div>
        ))}
        <div className="flex-1 border-t-2 border-gold/50" aria-hidden="true" />
      </div>

      <button
        type="button"
        onClick={() => scrollByCard(1)}
        disabled={!canNext}
        aria-label={nextLabel}
        className={cn(
          'flex size-11 shrink-0 items-center justify-center rounded-xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold',
          canNext
            ? 'bg-secondary/20 text-gold hover:bg-secondary/30'
            : 'bg-secondary/10 text-gold/40 cursor-not-allowed',
        )}
      >
        <ArrowRight className="size-5" aria-hidden="true" />
      </button>
    </div>
  );
}
