"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Public types ─────────────────────────────────────────────────────────────

export interface BeforeAfterSectionProps {
  heading: string;
  beforeImage: { src: string; alt: string };
  afterImage: { src: string; alt: string };
  beforeLabel: string;
  afterLabel: string;
  handleLabel?: string;
  initialPosition?: number;
  className?: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function BeforeAfterSection({
  heading,
  beforeImage,
  afterImage,
  beforeLabel,
  afterLabel,
  handleLabel = "Drag to compare before and after",
  initialPosition = 50,
  className,
}: BeforeAfterSectionProps) {
  const [pos, setPos] = useState(initialPosition);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const clamp = (v: number) => Math.min(100, Math.max(0, v));

  const updateFromClientX = useCallback((clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setPos(clamp(((clientX - rect.left) / rect.width) * 100));
  }, []);

  // ── Mouse ────────────────────────────────────────────────────────────────
  const onMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      isDragging.current = true;
      updateFromClientX(e.clientX);
    },
    [updateFromClientX],
  );

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      updateFromClientX(e.clientX);
    };
    const onUp = () => {
      isDragging.current = false;
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, [updateFromClientX]);

  // ── Touch ────────────────────────────────────────────────────────────────
  const onTouchStart = useCallback(
    (e: React.TouchEvent) => {
      isDragging.current = true;
      updateFromClientX(e.touches[0].clientX);
    },
    [updateFromClientX],
  );

  useEffect(() => {
    const onMove = (e: TouchEvent) => {
      if (!isDragging.current) return;
      updateFromClientX(e.touches[0].clientX);
    };
    const onEnd = () => {
      isDragging.current = false;
    };
    window.addEventListener("touchmove", onMove, { passive: true });
    window.addEventListener("touchend", onEnd);
    return () => {
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onEnd);
    };
  }, [updateFromClientX]);

  // ── Keyboard (slider role) ────────────────────────────────────────────────
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") setPos((p) => clamp(p - 1));
    else if (e.key === "ArrowRight") setPos((p) => clamp(p + 1));
    else if (e.key === "Home") setPos(0);
    else if (e.key === "End") setPos(100);
    else return;
    e.preventDefault();
  };

  return (
    <section aria-label={heading} className={cn(" page-wrap py-12", className)}>
      {/* Heading */}
      <h2 className="mb-10 text-center text-3xl font-bold text-foreground sm:text-4xl">
        {heading}
      </h2>

      {/* Slider container */}
      <div
        ref={containerRef}
        className="relative mx-auto aspect-video  cursor-col-resize select-none overflow-hidden rounded-2xl"
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
      >
        {/* Before image — full width, underneath */}
        <Image
          src={beforeImage.src}
          alt={beforeImage.alt}
          fill
          sizes="(max-width: 1024px) 100vw, 1024px"
          className="pointer-events-none object-cover"
          draggable={false}
          priority
        />

        {/* After image — clipped by slider position */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{ clipPath: `inset(0 0 0 ${pos}%)` }}
        >
          <Image
            src={afterImage.src}
            alt={afterImage.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 1024px"
            className="pointer-events-none object-cover"
            draggable={false}
          />
        </div>

        {/* Divider line */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 w-px bg-white/80"
          style={{ left: `${pos}%` }}
        />

        {/* Handle */}
        <button
          type="button"
          role="slider"
          aria-label={handleLabel}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(pos)}
          onKeyDown={onKeyDown}
          className="absolute top-1/2 z-20 flex size-10 -translate-x-1/2 -translate-y-1/2 cursor-col-resize items-center justify-center rounded-full border border-border bg-white shadow-md outline-none focus-visible:ring-2 focus-visible:ring-gold motion-safe:transition-shadow motion-safe:hover:shadow-lg"
          style={{ left: `${pos}%` }}
        >
          <ChevronLeft
            className="size-3.5 text-foreground"
            aria-hidden="true"
          />
          <ChevronRight
            className="size-3.5 text-foreground"
            aria-hidden="true"
          />
        </button>

        {/* Before / After labels */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute bottom-4 left-4 rounded-sm bg-black/40 px-2 py-0.5 text-sm font-medium text-white backdrop-blur-sm"
        >
          {beforeLabel}
        </span>
        <span
          aria-hidden="true"
          className="pointer-events-none absolute bottom-4 right-4 rounded-sm bg-black/40 px-2 py-0.5 text-sm font-medium text-white backdrop-blur-sm"
        >
          {afterLabel}
        </span>
      </div>
    </section>
  );
}
