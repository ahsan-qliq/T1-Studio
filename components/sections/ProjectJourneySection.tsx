import { ArrowRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { JourneyStepperClient } from './JourneyStepperClient';

// ─── Public types ─────────────────────────────────────────────────────────────

export interface JourneyStep {
  number: string;
  icon: LucideIcon;
  title: string;
  subtitle: string;
  description: string;
  advantageText: string;
  highlightIcon: LucideIcon;
  highlightText: string;
  extraContent?: React.ReactNode;
}

interface ProjectJourneySectionProps {
  label: string;
  heading: string;
  steps: JourneyStep[];
  advantageLabel: string;
  prevLabel: string;
  nextLabel: string;
}

// ─── Exported helper components (pass as extraContent from the page) ──────────

interface SmartSpaceDiagramProps {
  badge: string;
  items: Array<{ icon: LucideIcon; label: string }>;
}

export function SmartSpaceDiagram({ badge, items }: SmartSpaceDiagramProps) {
  return (
    <figure className="relative rounded-xl border border-border p-4 pt-6" aria-label={badge}>
      <figcaption className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-secondary px-3 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-secondary-foreground">
        {badge}
      </figcaption>
      <div className="flex items-start justify-between gap-1" role="list">
        {items.map((item, i) => {
          const Icon = item.icon;
          return (
            <div key={i} className="flex items-start gap-1" role="listitem">
              <div className="flex flex-col items-center gap-1.5 text-center">
                <div className="flex size-10 items-center justify-center rounded-lg border border-border">
                  <Icon className="size-5 text-gold" aria-hidden="true" strokeWidth={1.5} />
                </div>
                <span className="text-[11px] leading-tight text-muted-foreground">{item.label}</span>
              </div>
              {i < items.length - 1 && (
                <ArrowRight className="mt-2.5 size-3.5 shrink-0 text-muted-foreground" aria-hidden="true" />
              )}
            </div>
          );
        })}
      </div>
    </figure>
  );
}

interface KellerBadgeProps {
  line1: string;
  line2: string;
}

export function KellerBadge({ line1, line2 }: KellerBadgeProps) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-border px-4 py-3">
      <div className="grid shrink-0 grid-cols-2 gap-1" aria-hidden="true">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="size-1.5 rounded-full bg-gold" />
        ))}
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-gold">{line1}</p>
        <p className="text-xs font-semibold uppercase tracking-wider text-gold">{line2}</p>
      </div>
    </div>
  );
}

// ─── Internal step card (server) ──────────────────────────────────────────────

function StepCard({
  step,
  advantageLabel,
  id,
}: {
  step: JourneyStep;
  advantageLabel: string;
  id: string;
}) {
  const Icon = step.icon;
  const HighlightIcon = step.highlightIcon;

  return (
    <article
      id={id}
      aria-label={step.title}
      className="flex h-full flex-col gap-4 rounded-2xl border border-border bg-white p-6"
    >
      <Icon className="size-9 text-gold" aria-hidden="true" strokeWidth={1.5} />

      <div className="flex flex-col gap-1">
        <h3 className="text-2xl font-bold text-foreground">{step.title}</h3>
        <p className="text-sm font-medium text-gold">{step.subtitle}</p>
      </div>

      <p className="text-sm leading-relaxed text-muted-foreground">{step.description}</p>

      <hr className="border-border" />

      {step.extraContent && (
        <>
          {step.extraContent}
          <hr className="border-border" />
        </>
      )}

      <div className="flex flex-col gap-1.5">
        <p className="text-xs font-semibold uppercase tracking-widest text-gold">
          {advantageLabel}
        </p>
        <p className="text-sm leading-relaxed text-muted-foreground">{step.advantageText}</p>
      </div>

      <div className="mt-auto flex items-start gap-3 rounded-xl border border-border p-4">
        <HighlightIcon
          className="mt-0.5 size-5 shrink-0 text-gold"
          aria-hidden="true"
          strokeWidth={1.5}
        />
        <p className="text-sm leading-relaxed text-muted-foreground">{step.highlightText}</p>
      </div>
    </article>
  );
}

// ─── Main section (server) ────────────────────────────────────────────────────

const TRACK_ID = 'journey-track';

export function ProjectJourneySection({
  label,
  heading,
  steps,
  advantageLabel,
  prevLabel,
  nextLabel,
}: ProjectJourneySectionProps) {
  return (
    <section aria-labelledby="journey-heading" className="bg-white py-14 px-8 lg:px-16">

      {/* Label + heading */}
      <div className="mb-10 text-center">
        <p className="mb-3 text-sm font-medium text-muted-foreground">{label}</p>
        <h2 id="journey-heading" className="text-3xl font-bold text-foreground lg:text-4xl">
          {heading}
        </h2>
      </div>

      {/* Interactive stepper — client island, receives only plain strings */}
      <JourneyStepperClient
        steps={steps.map((s) => ({ number: s.number, title: s.title }))}
        trackId={TRACK_ID}
        prevLabel={prevLabel}
        nextLabel={nextLabel}
      />

      {/* Step cards — server-rendered, icons resolved here */}
      <ol
        id={TRACK_ID}
        aria-label={heading}
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-2 lg:overflow-visible"
      >
        {steps.map((step, i) => (
          <li
            key={step.number}
            className="shrink-0 snap-start w-[min(calc(100vw-4rem),400px)] lg:w-auto lg:flex-1"
          >
            <StepCard step={step} advantageLabel={advantageLabel} id={`journey-step-${i}`} />
          </li>
        ))}
      </ol>

    </section>
  );
}
