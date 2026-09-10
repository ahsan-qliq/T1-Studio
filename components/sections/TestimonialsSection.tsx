"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { cn } from "@/lib/utils";
import { motion, useInView } from "framer-motion";

// ─── Public types ─────────────────────────────────────────────────────────────

export interface VideoTestimonial {
  id: number;
  name: string;
  quote: string;
  image: string;
  videoUrl?: string;
}

interface TestimonialsSectionProps {
  label: string;
  heading: string;
  testimonials: VideoTestimonial[];
}

// ─── Single card ──────────────────────────────────────────────────────────────

function TestimonialCard({
  testimonial,
  isActive,
  onPlay,
}: {
  testimonial: VideoTestimonial;
  isActive: boolean;
  onPlay: () => void;
}) {
  return (
    <article
      aria-label={`Testimonial from ${testimonial.name}`}
      className={cn(
        "relative h-[380px] overflow-hidden transition-shadow duration-300",
        isActive && "ring-[3px] ring-[#3B82F6]",
      )}
    >
      {/* Portrait background */}
      <Image
        src={testimonial.image}
        alt={testimonial.name}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        className="object-cover object-top"
        draggable={false}
      />

      {/* Bottom gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.4) 55%, transparent 100%)",
        }}
        aria-hidden="true"
      />

      {/* Quote + author + play */}
      <div className="absolute inset-x-0 bottom-0 p-5">
        <blockquote className="mb-4">
          <p className="text-sm leading-relaxed text-white">
            &ldquo;{testimonial.quote}&rdquo;
          </p>
        </blockquote>

        <div className="flex items-end justify-between gap-3">
          <cite className="not-italic text-sm font-medium text-white">
            {testimonial.name}
          </cite>

          <button
            type="button"
            onClick={onPlay}
            aria-label={`Play ${testimonial.name}'s video testimonial`}
            className="flex size-11 shrink-0 items-center justify-center rounded-full bg-white text-black transition-transform duration-200 motion-safe:hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          >
            <Play className="size-4 fill-current ms-0.5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </article>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export function TestimonialsSection({
  label,
  heading,
  testimonials,
}: TestimonialsSectionProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: true,
    slidesToScroll: 1,
  });

  const [activeIndex, setActiveIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setActiveIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  // Scroll reveal
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef as React.RefObject<Element>, {
    once: true,
    margin: "-60px",
  });

  const EASE = [0.22, 1, 0.36, 1] as const;

  return (
    <section aria-labelledby="testimonials-heading" className="page-wrap py-12">
      {/* Header */}
      <motion.div
        ref={sectionRef}
        className="mb-10"
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: EASE }}
      >
        <p className="mb-3 text-sm text-white/60">{label}</p>
        <h2
          id="testimonials-heading"
          className="text-3xl font-bold text-white lg:text-4xl xl:text-5xl"
        >
          {heading}
        </h2>
      </motion.div>

      {/* Carousel */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.75, ease: EASE, delay: 0.15 }}
      >
        <div ref={emblaRef} className="overflow-hidden" aria-label={heading}>
          <div className="flex gap-4">
            {testimonials.map((t, i) => (
              <div
                key={t.id}
                className="min-w-0 flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_25%]"
              >
                <TestimonialCard
                  testimonial={t}
                  isActive={i === activeIndex}
                  onPlay={() => {
                    setActiveIndex(i);
                    // TODO: open video player with t.videoUrl
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Prev / Next */}
        <div className="mt-8 flex items-center gap-3">
          <button
            type="button"
            onClick={scrollPrev}
            aria-label="Previous testimonial"
            className="flex size-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors duration-200 hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0C0C0C]"
          >
            <ChevronLeft className="size-5" aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={scrollNext}
            aria-label="Next testimonial"
            className="flex size-12 items-center justify-center rounded-full bg-white/20 text-white transition-colors duration-200 hover:bg-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0C0C0C]"
          >
            <ChevronRight className="size-5" aria-hidden="true" />
          </button>
        </div>
      </motion.div>
    </section>
  );
}
