'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

const EASE = [0.22, 1, 0.36, 1] as const;
const SEGMENT_DURATION = 3000; // ms per segment
const SEGMENTS = 5;

// ─── Public types ─────────────────────────────────────────────────────────────

export interface VideoItem {
  src: string;
  poster?: string;
}

export interface SpaceIntroSectionProps {
  label: string;
  heading: string;
  description: string;
  image: string;
  imageAlt: string;
  videos?: VideoItem[];
  className?: string;
}

// ─── Video carousel ───────────────────────────────────────────────────────────

function VideoCarousel({ videos }: { videos: VideoItem[] }) {
  const [activeVideo, setActiveVideo] = useState(0);
  const [activeSegment, setActiveSegment] = useState(0);
  const [, setSegmentProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const startTimeRef = useRef<number>(0);
  const rafRef = useRef<number | undefined>(undefined);

  // Animate current segment progress via rAF
  useEffect(() => {
    startTimeRef.current = performance.now();

    const tick = (now: number) => {
      const progress = Math.min(
        ((now - startTimeRef.current) / SEGMENT_DURATION) * 100,
        100,
      );
      setSegmentProgress(progress);

      if (progress < 100) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        const nextSeg = activeSegment + 1;
        if (nextSeg >= SEGMENTS) {
          setActiveVideo((v) => (v + 1) % videos.length);
          setActiveSegment(0);
        } else {
          setActiveSegment(nextSeg);
        }
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [activeSegment, activeVideo, videos.length]);

  // Restart video playback when active video changes
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = 0;
    v.play().catch(() => {});
  }, [activeVideo]);

  const jumpTo = (videoIndex: number) => {
    setActiveVideo(videoIndex);
    setActiveSegment(0);
    setSegmentProgress(0);
  };

  return (
    <div className="relative overflow-hidden rounded-xl bg-black">


      {/* Video */}
      <video
        ref={videoRef}
        key={activeVideo}
        src={videos[activeVideo].src}
        poster={videos[activeVideo].poster}
        muted
        playsInline
        loop
        autoPlay
        className="object-cover"
      />

      {/* Video dot indicators */}
      <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
        {videos.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to video ${i + 1}`}
            onClick={() => jumpTo(i)}
            className={`h-1.5 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white ${
              i === activeVideo ? 'w-5 bg-white' : 'w-1.5 bg-white/40 hover:bg-white/70'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export function SpaceIntroSection({
  label,
  heading,
  description,
  image: _image,
  imageAlt: _imageAlt,
  videos,
  className: _className,
}: SpaceIntroSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref as React.RefObject<Element>, {
    once: true,
    margin: '-80px',
  });

  return (
    <section
      ref={ref}
      aria-labelledby="space-intro-heading"
      className="relative overflow-hidden bg-[#0C0C0C] py-20 sm:py-28"
    >
      {/* Decorative grid lines */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      <div className="page-wrap relative z-10 grid grid-cols-1 items-center gap-12 lg:grid-cols-[12fr_4fr] lg:gap-16">
        {/* Left column: text content */}
        <div className="flex flex-col gap-6 ">
          <motion.p
            className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
          >
            {label}
          </motion.p>

          <motion.h2
            id="space-intro-heading"
            className="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-[2.6rem] lg:leading-[1.15]"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
          >
            {heading}
          </motion.h2>

          <motion.p
            className="text-sm leading-relaxed text-white/65  sm:text-base"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: EASE, delay: 0.25 }}
          >
            {description}
          </motion.p>
        </div>

        {/* Right column: video carousel */}
        {videos && videos.length > 0 && (
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
          >
            <VideoCarousel videos={videos} />
          </motion.div>
        )}
      </div>
    </section>
  );
}
