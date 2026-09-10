'use client';

import Image from 'next/image';
import { Play, X, ChevronLeft, ChevronRight } from 'lucide-react';
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

export interface ClientTestimonialItem {
  quote: string;
  author: string;
  authorRole?: string;
  image: { src: string; alt: string };
  avatar?: { src: string; alt: string };
  badge?: string;
  readTime?: string;
  videoUrl?: string;
}

export interface ClientTestimonialSectionProps {
  label: string;
  heading: string;
  /** Single testimonial used by the banner variant */
  testimonial?: ClientTestimonialItem;
  /** Multiple testimonials used by the card carousel variant */
  testimonials?: ClientTestimonialItem[];
  playLabel?: string;
  closeLabel?: string;
  prevLabel?: string;
  nextLabel?: string;
  variant?: 'banner' | 'card';
}

// ─── Video modal ──────────────────────────────────────────────────────────────

function VideoModal({
  url,
  title,
  closeLabel,
  onClose,
}: {
  url: string;
  title: string;
  closeLabel: string;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label={closeLabel}
          className="absolute -top-10 right-0 flex size-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors duration-200 hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          <X className="size-4" aria-hidden="true" />
        </button>

        <div className="relative aspect-video overflow-hidden rounded-xl">
          <iframe
            src={url}
            title={title}
            className="size-full"
            allow="autoplay; fullscreen"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}

// ─── Banner variant (default) ─────────────────────────────────────────────────

function BannerLayout({
  label,
  heading,
  testimonial,
  playLabel,
  inView,
  onPlay,
}: {
  label: string;
  heading: string;
  testimonial: ClientTestimonialItem;
  playLabel: string;
  inView: boolean;
  onPlay: () => void;
}) {
  return (
    <div className="relative min-h-[360px] w-full aspect-[21/9]">
      <Image
        src={testimonial.image.src}
        alt={testimonial.image.alt}
        fill
        sizes="100vw"
        className="object-cover object-center"
        priority
      />

      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to right, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.88) 30%, rgba(0,0,0,0.45) 58%, transparent 78%)',
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 lg:hidden"
        style={{
          background:
            'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 60%)',
        }}
      />

      <div className="absolute inset-0 flex flex-col justify-between p-8 sm:p-12 lg:p-16">
        <motion.div
          className="flex flex-col gap-1.5"
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
            {label}
          </p>
          <h2
            id="client-testimonial-heading"
            className="text-2xl font-bold text-white sm:text-3xl"
          >
            {heading}
          </h2>
        </motion.div>

        <div className="flex items-end justify-between gap-6">
          <motion.div
            className="max-w-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
          >
            <blockquote>
              <p className="mb-4 text-2xl font-semibold leading-snug text-white sm:text-3xl lg:text-[2rem] lg:leading-[1.3]">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <cite className="text-sm font-semibold text-white not-italic">
                {testimonial.author}
              </cite>
            </blockquote>
          </motion.div>

          {testimonial.videoUrl && (
            <motion.div
              className="shrink-0"
              initial={{ opacity: 0, scale: 0.75 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, ease: EASE, delay: 0.25 }}
            >
              <button
                type="button"
                onClick={onPlay}
                aria-label={playLabel}
                className="flex size-14 items-center justify-center rounded-full bg-white text-black transition-transform duration-200 motion-safe:hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              >
                <Play className="size-5 fill-current ms-0.5" aria-hidden="true" />
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Single card ──────────────────────────────────────────────────────────────

// function TestimonialCard({
//   testimonial,
//   playLabel,
//   index,
//   onPlay,
// }: {
//   testimonial: ClientTestimonialItem;
//   playLabel: string;
//   index: number;
//   onPlay: () => void;
// }) {
//   if (!testimonial?.image) return null;

//   return (
//     <div className="relative overflow-hidden rounded-2xl aspect-[4/3] sm:aspect-[16/9]">
//       <Image
//         src={testimonial.image.src}
//         alt={testimonial.image.alt}
//         fill
//         sizes="(max-width: 640px) 100vw, (max-width: 1280px) 90vw, 1280px"
//         className="object-cover object-center"
//         priority={index === 0}
//       />

//       <div
//         aria-hidden="true"
//         className="absolute inset-0"
//         style={{
//           background:
//             'linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.15) 40%, rgba(0,0,0,0.8) 100%)',
//         }}
//       />

//       <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-8">
//         {/* Top row: badge + read time */}
//         <div className="flex items-center justify-between">
//           {testimonial.badge && (
//             <span className="rounded-full bg-white/15 px-4 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
//               {testimonial.badge}
//             </span>
//           )}
//           {testimonial.readTime && (
//             <span className="ms-auto text-xs font-medium text-white/70">
//               {testimonial.readTime}
//             </span>
//           )}
//         </div>

//         {/* Center: play button + quote */}
//         <div className="flex flex-col items-center gap-5 text-center">
//           {testimonial.videoUrl && (
//             <button
//               type="button"
//               onClick={onPlay}
//               aria-label={playLabel}
//               className="flex size-14 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/30 motion-safe:hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
//             >
//               <Play className="size-5 fill-current ms-0.5" aria-hidden="true" />
//             </button>
//           )}
//           <blockquote>
//             <p className="text-lg font-semibold leading-snug text-white sm:text-xl lg:text-2xl lg:leading-snug">
//               &ldquo;{testimonial.quote}&rdquo;
//             </p>
//           </blockquote>
//         </div>

//         {/* Bottom: avatar + name + role */}
//         <div className="flex items-center gap-3">
//           {testimonial.avatar && (
//             <div className="relative size-10 shrink-0 overflow-hidden rounded-full ring-2 ring-white/30">
//               <Image
//                 src={testimonial.avatar.src}
//                 alt={testimonial.avatar.alt}
//                 fill
//                 sizes="40px"
//                 className="object-cover"
//               />
//             </div>
//           )}
//           <cite className="not-italic">
//             <p className="text-sm font-semibold text-white">{testimonial.author}</p>
//             {testimonial.authorRole && (
//               <p className="text-xs text-white/60">{testimonial.authorRole}</p>
//             )}
//           </cite>
//         </div>
//       </div>
//     </div>
//   );
// }
function TestimonialCard({
  testimonial,
  playLabel,
  index,
  onPlay,
}: {
  testimonial: ClientTestimonialItem;
  playLabel: string;
  index: number;
  onPlay: () => void;
}) {
  if (!testimonial?.image) return null;

  return (
    <div className="relative w-full overflow-hidden rounded-2xl aspect-[4/5]">
      <Image
        src={testimonial.image.src}
        alt={testimonial.image.alt}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="object-cover object-center"
        priority={index === 0}
      />

      {/* Overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.15) 40%, rgba(0,0,0,0.8) 100%)",
        }}
      />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-between p-5 lg:p-6">
        {/* Top */}
        <div className="flex items-center justify-between gap-3">
          {testimonial.badge && (
            <span className="rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
              {testimonial.badge}
            </span>
          )}

          {testimonial.readTime && (
            <span className="ms-auto text-xs font-medium text-white/70">
              {testimonial.readTime}
            </span>
          )}
        </div>

        {/* Center */}
        <div className="flex flex-col items-center gap-4 text-center">
          {testimonial.videoUrl && (
            <button
              type="button"
              onClick={onPlay}
              aria-label={playLabel}
              className="flex size-12 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/30 motion-safe:hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <Play
                className="size-4 fill-current ms-0.5"
                aria-hidden="true"
              />
            </button>
          )}

          <blockquote>
            <p className="text-base font-semibold leading-snug text-white sm:text-lg lg:text-xl">
              &ldquo;{testimonial.quote}&rdquo;
            </p>
          </blockquote>
        </div>

        {/* Bottom */}
        <div className="flex items-center gap-3">
          {testimonial.avatar && (
            <div className="relative size-10 shrink-0 overflow-hidden rounded-full ring-2 ring-white/30">
              <Image
                src={testimonial.avatar.src}
                alt={testimonial.avatar.alt}
                fill
                sizes="40px"
                className="object-cover"
              />
            </div>
          )}

          <cite className="min-w-0 not-italic">
            <p className="truncate text-sm font-semibold text-white">
              {testimonial.author}
            </p>

            {testimonial.authorRole && (
              <p className="truncate text-xs text-white/60">
                {testimonial.authorRole}
              </p>
            )}
          </cite>
        </div>
      </div>
    </div>
  );
}

// ─── Card carousel variant ────────────────────────────────────────────────────

function CardCarouselLayout({
  label,
  heading,
  testimonials,
  playLabel,
  prevLabel,
  nextLabel,
  inView,
  onPlay,
}: {
  label: string;
  heading: string;
  testimonials: ClientTestimonialItem[];
  playLabel: string;
  prevLabel: string;
  nextLabel: string;
  inView: boolean;
  onPlay: (item: ClientTestimonialItem) => void;
}) {
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

  return (
    <div className="page-wrap py-12 sm:py-18">
      {/* Header row: label + heading left, nav controls right */}
      <motion.div
        className="mb-8 flex items-end justify-between gap-4"
        initial={{ opacity: 0, y: 14 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <div className="flex flex-col gap-1">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
            {label}
          </p>
          <h2
            id="client-testimonial-heading"
            className="text-2xl font-bold text-white sm:text-3xl"
          >
            {heading}
          </h2>
        </div>

        {/* Prev / next + dot counter */}
        <div className="flex shrink-0 items-center gap-3">
          <span className="text-sm tabular-nums text-white/40">
            {String(current + 1).padStart(2, '0')} /{' '}
            {String(testimonials.length).padStart(2, '0')}
          </span>
          <button
            type="button"
            aria-label={prevLabel}
            disabled={!canPrev}
            onClick={() => api?.scrollPrev()}
            className={cn(
              'flex size-10 items-center justify-center rounded-full border border-white/20 text-white transition-all duration-200',
              'hover:border-white/50 hover:bg-white/10 disabled:pointer-events-none disabled:opacity-30',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white',
            )}
          >
            <ChevronLeft className="size-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label={nextLabel}
            disabled={!canNext}
            onClick={() => api?.scrollNext()}
            className={cn(
              'flex size-10 items-center justify-center rounded-full border border-white/20 text-white transition-all duration-200',
              'hover:border-white/50 hover:bg-white/10 disabled:pointer-events-none disabled:opacity-30',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white',
            )}
          >
            <ChevronRight className="size-4" aria-hidden="true" />
          </button>
        </div>
      </motion.div>

      {/* Carousel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
      >
        <Carousel
          opts={{ loop: false, align: 'start' }}
          setApi={handleApi}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {testimonials.map((item, i) => (
              <CarouselItem
                key={`${item.author}-${i}`}
                className="pl-4 basis-1/2 lg:basis-1/3"
                aria-label={`Testimonial ${i + 1} of ${testimonials.length} — ${item.author}`}
              >
                <TestimonialCard
                  testimonial={item}
                  playLabel={playLabel}
                  index={i}
                  onPlay={() => onPlay(item)}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </motion.div>

      {/* Dot indicators */}
      {testimonials.length > 1 && (
        <div
          role="tablist"
          aria-label="Testimonial indicators"
          className="mt-6 flex justify-center gap-2"
        >
          {testimonials.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-label={`Go to testimonial ${i + 1}`}
              aria-selected={i === current}
              onClick={() => api?.scrollTo(i)}
              className={cn(
                'h-1.5 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white',
                i === current ? 'w-6 bg-white' : 'w-1.5 bg-white/30 hover:bg-white/60',
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export function ClientTestimonialSection({
  label,
  heading,
  testimonial,
  testimonials,
  playLabel = 'Play video testimonial',
  closeLabel = 'Close video',
  prevLabel = 'Previous testimonial',
  nextLabel = 'Next testimonial',
  variant = 'banner',
}: ClientTestimonialSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref as React.RefObject<Element>, {
    once: true,
    margin: '-60px',
  });

  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  // Resolve the list used by the card carousel
  const cardItems: ClientTestimonialItem[] =
    testimonials && testimonials.length > 0
      ? testimonials
      : testimonial
        ? [testimonial]
        : [];

  // The banner variant still needs a single item
  const bannerItem = testimonial ?? cardItems[0];

  if (variant === 'banner' && !bannerItem) return null;
  if (variant === 'card' && cardItems.length === 0) return null;

  return (
    <>
      <section
        ref={ref}
        aria-labelledby="client-testimonial-heading"
        className="relative w-full overflow-hidden"
      >
        {variant === 'card' ? (
          <CardCarouselLayout
            label={label}
            heading={heading}
            testimonials={cardItems}
            playLabel={playLabel}
            prevLabel={prevLabel}
            nextLabel={nextLabel}
            inView={inView}
            onPlay={(item) => item.videoUrl && setActiveVideo(item.videoUrl)}
          />
        ) : (
          <BannerLayout
            label={label}
            heading={heading}
            testimonial={bannerItem!}
            playLabel={playLabel}
            inView={inView}
            onPlay={() => bannerItem?.videoUrl && setActiveVideo(bannerItem.videoUrl)}
          />
        )}
      </section>

      {/* Video modal — outside section to avoid stacking-context clipping */}
      {activeVideo && (
        <VideoModal
          url={activeVideo}
          title={playLabel}
          closeLabel={closeLabel}
          onClose={() => setActiveVideo(null)}
        />
      )}
    </>
  );
}
