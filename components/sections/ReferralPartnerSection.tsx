import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// ─── Public types ─────────────────────────────────────────────────────────────

export interface PartnerBenefit {
  icon: LucideIcon;
  label: string;
}

export interface PartnerStep {
  label: string;
  icon: LucideIcon;
}

interface ReferralPartnerSectionProps {
  heading: string;
  description: string;
  benefits: PartnerBenefit[];
  steps: PartnerStep[];
  ctaLabel: string;
  ctaHref: string;
  imageSrc: string;
  imageAlt: string;
}

// ─── Benefit item ─────────────────────────────────────────────────────────────

function BenefitItem({ icon: Icon, label }: PartnerBenefit) {
  return (
    <li className="flex flex-col items-center gap-2 text-center">
      <div
        className="flex size-12 items-center justify-center rounded-full border border-gold/30 bg-gold/10"
        aria-hidden="true"
      >
        <Icon className="size-5 text-gold" strokeWidth={1.5} />
      </div>
      <span className="text-xs leading-snug text-foreground">{label}</span>
    </li>
  );
}

// ─── Process step ─────────────────────────────────────────────────────────────

function ProcessStep({
  icon: Icon,
  label,
  isLast,
}: PartnerStep & { isLast: boolean }) {
  return (
    <>
      <li className="flex flex-col items-center gap-2 text-center">
        <div
          className="flex size-11 items-center justify-center"
          aria-hidden="true"
        >
          <Icon className="size-5 text-white" strokeWidth={2} />
        </div>
        <span className="text-xs leading-snug text-secondary w-10 text-center">{label}</span>
      </li>
      {!isLast && (
        <li aria-hidden="true" className="mb-4 shrink-0 self-start pt-3">
          <ArrowRight className="size-4 text-muted-foreground" />
        </li>
      )}
    </>
  );
}

// ─── Main section ─────────────────────────────────────────────────────────────

export function ReferralPartnerSection({
  heading,
  description,
  benefits,
  steps,
  ctaLabel,
  ctaHref,
  imageSrc,
  imageAlt,
}: ReferralPartnerSectionProps) {
  return (
    <section
      aria-labelledby="referral-partner-heading"
      className="relative overflow-hidden py-16 px-4 sm:px-8 lg:px-16"
    >
      {/* Background image — right half, fades to white toward the left */}
      <div
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-5/5 lg:block"
        aria-hidden="true"
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Tailwind v4: bg-linear-to-r */}
        {/* <div className="absolute inset-0 bg-linear-to-r  from-black via-black/90 to-black/10" /> */}
      </div>

      {/* Content */}
      <div className="relative z-10">
        <div className=" max-w-4xl">
          {/* Heading + description */}
          <div className="mb-10 max-w-lg">
            <h2
              id="referral-partner-heading"
              className="mb-4 text-3xl font-bold leading-tight text-secondary lg:text-4xl"
            >
              {heading}
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {description}
            </p>
          </div>

          {/* Benefits grid */}
          {/* <ul
            aria-label="Partnership benefits"
            className="mb-8 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 lg:grid-cols-6"
          >
            {benefits.map((b) => (
              <BenefitItem key={b.label} {...b} />
            ))}
          </ul> */}
        </div>
        {/* Process flow card */}
        <div className="mb-10 px-6 py-5 shadow-sm backdrop-blur-sm">
          <ol
            aria-label="Referral process steps"
            className="flex flex-wrap items-start justify-between gap-y-4"
          >
            {steps.map((step, i) => (
              <ProcessStep
                key={step.label}
                {...step}
                isLast={i === steps.length - 1}
              />
            ))}
          </ol>
        </div>

        {/* CTA */}
        <a
          href={ctaHref}
          className={cn(
            buttonVariants({ variant: "outline", size: "lg" }),
            "group gap-2 border-secondary text-primary hover:bg-secondary/5 hover:text-secondary/90",
          )}
        >
          {ctaLabel}
          <ArrowRight className="size-4 motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover:translate-x-0.5" aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
