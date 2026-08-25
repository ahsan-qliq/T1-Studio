'use client';

import { useState, useCallback } from 'react';
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

  const goTo = useCallback(
    (index: number) => {
      const clamped = Math.max(0, Math.min(index, steps.length - 1));
      const track = document.getElementById(trackId);
      if (track) {
        const cards = track.querySelectorAll<HTMLLIElement>('li');
        cards[clamped]?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
      }
      setActiveStep(clamped);
    },
    [steps.length, trackId],
  );

  const canPrev = activeStep > 0;
  const canNext = activeStep < steps.length - 1;

  return (
    <div className="mb-8 flex items-center gap-3">
      {/* Prev */}
      <button
        type="button"
        onClick={() => goTo(activeStep - 1)}
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

      {/* Step circles + connecting line */}
      <div className="flex flex-1 items-center">
        <div className="flex-1 border-t-2 border-gold/50" aria-hidden="true" />
        {steps.map((step, i) => (
          <div key={step.number} className="flex items-center">
            <button
              type="button"
              onClick={() => goTo(i)}
              aria-current={activeStep === i ? 'step' : undefined}
              aria-label={`${step.number} ${step.title}`}
              className="flex size-11 shrink-0 items-center justify-center rounded-full bg-secondary text-sm font-bold text-secondary-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
            >
              {step.number}
            </button>
            {i < steps.length - 1 && (
              <div className="w-24 border-t-2 border-gold/50 lg:w-48" aria-hidden="true" />
            )}
          </div>
        ))}
        <div className="flex-1 border-t-2 border-gold/50" aria-hidden="true" />
      </div>

      {/* Next */}
      <button
        type="button"
        onClick={() => goTo(activeStep + 1)}
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
