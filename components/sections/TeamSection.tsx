'use client';

import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel';
import { cn } from '@/lib/utils';

const EASE = [0.22, 1, 0.36, 1] as const;

// ─── Public types ─────────────────────────────────────────────────────────────

export interface TeamMember {
  name: string;
  role: string;
  experience: string;
  quote: string;
  image: { src: string; alt: string };
}

export interface TeamSectionProps {
  heading: string;
  members: TeamMember[];
  prevLabel?: string;
  nextLabel?: string;
}

// ─── Member card ──────────────────────────────────────────────────────────────

function MemberCard({ member }: { member: TeamMember }) {
  return (
    <article className="flex h-full flex-col border-r border-white/10">
      {/* Photo */}
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src={member.image.src}
          alt={member.image.alt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover object-top grayscale transition-all duration-500 hover:grayscale-0"
        />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-4 p-6">
        <blockquote>
          <p className="text-base font-semibold leading-snug text-white sm:text-lg">
            &ldquo;{member.quote}&rdquo;
          </p>
        </blockquote>

        <footer className="mt-auto flex flex-col gap-0.5">
          <p className="text-sm font-semibold text-white">{member.name}</p>
          <p className="text-xs text-white/50">{member.role}</p>
          <p className="text-xs text-white/40">{member.experience}</p>
        </footer>
      </div>
    </article>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export function TeamSection({
  heading,
  members,
  prevLabel = 'Previous member',
  nextLabel = 'Next member',
}: TeamSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref as React.RefObject<Element>, {
    once: true,
    margin: '-60px',
  });

  const [api, setApi] = useState<CarouselApi>();
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const updateState = useCallback((api: CarouselApi) => {
    if (!api) return;
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

  if (!members.length) return null;

  return (
    <section
      ref={ref}
      aria-labelledby="team-heading"
      className="relative overflow-hidden"
    >

      <div className="relative z-10 page-wrap py-12 sm:py-16">
        {/* Header: heading left, nav right */}
        <motion.div
          className="mb-8 flex items-center justify-between gap-4"
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <h2
            id="team-heading"
            className="text-3xl font-bold text-white sm:text-4xl"
          >
            {heading}
          </h2>

          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              aria-label={prevLabel}
              disabled={!canPrev}
              onClick={() => api?.scrollPrev()}
              className={cn(
                'flex size-11 items-center justify-center rounded-full border border-white/25 text-white transition-all duration-200',
                'hover:border-white/50 hover:bg-white/10 disabled:pointer-events-none disabled:opacity-30',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white',
              )}
            >
              <ChevronLeft className="size-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              aria-label={nextLabel}
              disabled={!canNext}
              onClick={() => api?.scrollNext()}
              className={cn(
                'flex size-11 items-center justify-center rounded-full border border-white/25 text-white transition-all duration-200',
                'hover:border-white/50 hover:bg-white/10 disabled:pointer-events-none disabled:opacity-30',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white',
              )}
            >
              <ChevronRight className="size-5" aria-hidden="true" />
            </button>
          </div>
        </motion.div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: EASE, delay: 0.1 }}
        >
          <Carousel
            opts={{ loop: false, align: 'start' }}
            setApi={handleApi}
            className="w-full"
          >
            <CarouselContent className="-ml-0 border-l border-white/10">
              {members.map((member, i) => (
                <CarouselItem
                  key={`${member.name}-${i}`}
                  className="pl-0 basis-full sm:basis-1/2 lg:basis-1/4"
                  aria-label={`${i + 1} of ${members.length}: ${member.name}`}
                >
                  <MemberCard member={member} />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </motion.div>
      </div>
    </section>
  );
}
