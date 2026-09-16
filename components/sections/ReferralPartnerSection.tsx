'use client';

import Image from "next/image";
import {
  ArrowRight, Gift, UserCheck, Zap, Eye, Handshake, UserPlus,
  Check, Video, Award, Star, CheckCircle2, TrendingUp,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const ICON_MAP: Record<string, LucideIcon> = {
  Gift, UserCheck, Zap, Eye, Handshake, UserPlus,
  Check, Video, Award, Star, CheckCircle2, TrendingUp,
};

export interface PartnerBenefit {
  iconName: string;
  label: string;
}

export interface PartnerStep {
  label: string;
  iconName: string;
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

const EASE = [0.22, 1, 0.36, 1] as const;

function ProcessStep({ iconName, label, isLast }: PartnerStep & { isLast: boolean }) {
  const Icon = ICON_MAP[iconName] ?? ArrowRight;
  return (
    <>
      <li className="flex flex-col items-center gap-2 text-center">
        <div className="flex size-11 items-center justify-center" aria-hidden="true">
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

export function ReferralPartnerSection({
  heading,
  description,
  steps,
  ctaLabel,
  ctaHref,
  imageSrc,
  imageAlt,
}: ReferralPartnerSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref as React.RefObject<Element>, {
    once: true,
    margin: "-80px",
  });

  const stepsRef = useRef<HTMLDivElement>(null);
  const stepsInView = useInView(stepsRef as React.RefObject<Element>, {
    once: true,
    margin: "-40px",
  });

  return (
    <section
      ref={ref}
      aria-labelledby="referral-partner-heading"
      className="relative overflow-hidden py-16 px-4 sm:px-8 lg:px-16"
    >
      {/* Background image */}
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
      </div>

      {/* Content */}
      <div className="relative z-10">
        <div className="max-w-4xl">
          {/* Heading + description */}
          <div className="mb-10 max-w-lg">
            <motion.h2
              id="referral-partner-heading"
              className="mb-4 text-3xl font-bold leading-tight text-secondary lg:text-4xl"
              initial={{ opacity: 0, x: -40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, ease: EASE }}
            >
              {heading}
            </motion.h2>
            <motion.p
              className="text-sm leading-relaxed text-muted-foreground"
              initial={{ opacity: 0, x: -32 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.75, ease: EASE, delay: 0.1 }}
            >
              {description}
            </motion.p>
          </div>
        </div>

        {/* Process flow */}
        <motion.div
          ref={stepsRef}
          className="mb-10 px-6 py-5 shadow-sm backdrop-blur-sm"
          initial={{ opacity: 0, y: 32 }}
          animate={stepsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <ol
            aria-label="Referral process steps"
            className="flex flex-wrap items-start justify-between gap-y-4"
          >
            {steps.map((step, i) => (
              <motion.div
                key={step.label}
                initial={{ opacity: 0, y: 20 }}
                animate={stepsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, ease: EASE, delay: i * 0.07 }}
                style={{ display: "contents" }}
              >
                <ProcessStep {...step} isLast={i === steps.length - 1} />
              </motion.div>
            ))}
          </ol>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: EASE, delay: 0.35 }}
        >
          <a
            href={ctaHref}
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "group gap-2 border-secondary text-primary hover:bg-secondary/5 hover:text-secondary/90",
            )}
          >
            {ctaLabel}
            <ArrowRight
              className="size-4 motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
