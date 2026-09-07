"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Public types ─────────────────────────────────────────────────────────────

export interface GalleryImage {
  src: string;
  alt: string;
}

export interface InspirationGalleryProps {
  heading: string;
  prevLabel: string;
  nextLabel: string;
  images: GalleryImage[];
}

// ─── Component ────────────────────────────────────────────────────────────────

export function InspirationGallery({
  heading,
  prevLabel,
  nextLabel,
  images,
}: InspirationGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [thumbStart, setThumbStart] = useState(0);
  const [thumbStep, setThumbStep] = useState(0); // thumb width + gap in px
  const [visibleCount, setVisibleCount] = useState(6);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const firstThumbRef = useRef<HTMLLIElement>(null);
  const thumbStartRef = useRef(thumbStart);
  thumbStartRef.current = thumbStart;

  // Measure thumb width from DOM and derive visible count
  useEffect(() => {
    const measure = () => {
      if (!firstThumbRef.current || !wrapperRef.current) return;
      const thumbW = firstThumbRef.current.offsetWidth;
      const gap = 12; // gap-3 = 12px
      const step = thumbW + gap;
      const vc = Math.max(1, Math.floor(wrapperRef.current.offsetWidth / step));
      setThumbStep(step);
      setVisibleCount(vc);
      // Re-clamp thumbStart
      setThumbStart((prev) => Math.min(prev, Math.max(0, images.length - vc)));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (wrapperRef.current) ro.observe(wrapperRef.current);
    return () => ro.disconnect();
  }, [images.length]);

  const maxStart = Math.max(0, images.length - visibleCount);

  const select = (i: number) => {
    setActiveIndex(i);
    // Scroll thumbnail strip to keep selected thumb visible
    setThumbStart((prev) => {
      if (i < prev) return i;
      if (i >= prev + visibleCount) return Math.min(maxStart, i - visibleCount + 1);
      return prev;
    });
  };

  const goPrev = () => setThumbStart((s) => Math.max(0, s - 1));
  const goNext = () => setThumbStart((s) => Math.min(maxStart, s + 1));

  const translateX = thumbStep > 0 ? thumbStart * thumbStep : 0;

  return (
    <section
      aria-labelledby="inspiration-gallery-heading"
      className="bg-white py-16 px-4 sm:px-8 lg:px-16"
    >
      {/* Heading */}
      <h2
        id="inspiration-gallery-heading"
        className="mb-8 text-center text-3xl font-bold text-foreground sm:text-4xl"
      >
        {heading}
      </h2>

      {/* Main image */}
      <div className="relative mx-auto aspect-[2/1] w-full overflow-hidden rounded-2xl">
        {images.map((img, i) => (
          <Image
            key={img.src + i}
            src={img.src}
            alt={img.alt}
            fill
            sizes="(max-width: 1280px) 100vw, 1280px"
            priority={i === 0}
            className={cn(
              "object-cover motion-safe:transition-opacity motion-safe:duration-500",
              i === activeIndex ? "opacity-100" : "opacity-0",
            )}
          />
        ))}
      </div>

      {/* Thumbnail strip + nav */}
      <div className="mt-4 flex items-center gap-3">
        {/* Scrollable thumbnail track */}
        <div ref={wrapperRef} className="min-w-0 flex-1 overflow-hidden">
          <ul
            role="list"
            aria-label={heading}
            className="flex gap-3 transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${translateX}px)` }}
          >
            {images.map((img, i) => (
              <li
                key={img.src + i}
                ref={i === 0 ? firstThumbRef : undefined}
                className="w-[calc((100%-60px)/6)] shrink-0 sm:w-[calc((100%-60px)/6)]"
              >
                <button
                  type="button"
                  aria-label={img.alt}
                  aria-pressed={i === activeIndex}
                  onClick={() => select(i)}
                  className={cn(
                    "relative aspect-4/3 w-full overflow-hidden rounded-xl ring-2 ring-transparent transition-all duration-200 motion-safe:hover:scale-[1.03]",
                    i === activeIndex
                      ? "ring-gold ring-offset-2"
                      : "hover:ring-gold/40",
                  )}
                >
                  <Image
                    src={img.src}
                    alt=""
                    fill
                    sizes="160px"
                    className="object-cover"
                  />
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Prev / Next */}
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            aria-label={prevLabel}
            onClick={goPrev}
            disabled={thumbStart === 0}
            className="flex size-10 items-center justify-center rounded-full border border-gold/40 bg-gold/10 text-gold transition-colors hover:bg-gold/20 disabled:pointer-events-none disabled:opacity-40 motion-safe:hover:scale-105 motion-safe:active:scale-95"
          >
            <ChevronLeft className="size-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label={nextLabel}
            onClick={goNext}
            disabled={thumbStart >= maxStart}
            className="flex size-10 items-center justify-center rounded-full bg-gold text-white transition-colors hover:bg-gold-hover disabled:pointer-events-none disabled:opacity-40 motion-safe:hover:scale-105 motion-safe:active:scale-95"
          >
            <ChevronRight className="size-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}
