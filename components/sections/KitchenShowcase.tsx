"use client";

/**
 * KitchenShowcase
 * -----------------
 * A pinned vertical-scroll section that translates 5 "material swatch"
 * slides horizontally — like flipping through a kitchen finishes board.
 *
 * Drop this file into e.g. app/components/KitchenShowcase.tsx and render it
 * anywhere in a page: <KitchenShowcase />
 *
 * Fonts: uses next/font/google for Fraunces (display serif), Inter (body),
 * and IBM Plex Mono (swatch codes). No tailwind.config changes required —
 * all colors are arbitrary-value Tailwind classes.
 *
 * Dependency: lucide-react (npm install lucide-react)
 */

import { useEffect, useRef, useState } from "react";
import { Fraunces, Inter, IBM_Plex_Mono } from "next/font/google";
import { Waves, TreePine, Sparkles, Leaf, CircleDot } from "lucide-react";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-body",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

type Slide = {
  code: string; // swatch code, like a paint-chip label
  index: string; // 01–05
  title: string;
  material: string;
  copy: string;
  swatch: string; // tailwind bg class for the color block
  ink: string; // tailwind text class for contrast on the swatch
  Icon: typeof Waves;
};

const SLIDES: Slide[] = [
  {
    code: "MARBLE",
    index: "01",
    title: "Honed Calacatta Island",
    material: "Honed marble, waterfall edge",
    copy: "Soft veining under a matte finish — no glare, no fingerprints, just quiet grain across nine feet of island.",
    swatch: "bg-[#E7E2D8]",
    ink: "text-[#2A2622]",
    Icon: Waves,
  },
  {
    code: "OAK",
    index: "02",
    title: "Smoked Oak Cabinetry",
    material: "Rift-sawn oak, ash-brushed",
    copy: "Full-height run of smoked oak, brushed to open the grain — warm enough to anchor the room without competing with the stone.",
    swatch: "bg-[#8B6A47]",
    ink: "text-[#F5EFE4]",
    Icon: TreePine,
  },
  {
    code: "BRASS",
    index: "03",
    title: "Brushed Brass Fixtures",
    material: "Unlacquered brass, hand-finished",
    copy: "Left unlacquered on purpose — it will darken with use, recording every year of cooking like a patina you chose.",
    swatch: "bg-[#B08D57]",
    ink: "text-[#241C10]",
    Icon: Sparkles,
  },
  {
    code: "SAGE",
    index: "04",
    title: "Sage Green Millwork",
    material: "In-frame joinery, lacquered sage",
    copy: "A single muted green on the perimeter cabinets, low enough in saturation to read as neutral from across the room.",
    swatch: "bg-[#7C8B6F]",
    ink: "text-[#F5EFE4]",
    Icon: Leaf,
  },
  {
    code: "IRON",
    index: "05",
    title: "Matte Iron Hardware",
    material: "Blackened steel, knurled pulls",
    copy: "Small, cold, deliberate details — knurled pulls and pivot hinges in blackened steel close out the palette.",
    swatch: "bg-[#26241F]",
    ink: "text-[#EDE7DD]",
    Icon: CircleDot,
  },
];

export default function KitchenShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const railFillRefs = useRef<Array<HTMLDivElement | null>>([]);
  const labelRef = useRef<HTMLSpanElement>(null);

  const progressNow = useRef(0); // eased, current
  const progressTarget = useRef(0); // raw, from scroll
  const rafId = useRef<number | null>(null);
  const lastActiveIndex = useRef(-1);

  const [activeIndex, setActiveIndex] = useState(0);
  const count = SLIDES.length;

  useEffect(() => {
    // How much smoothing to apply per frame. Lower = smoother/laggier,
    // higher = snappier/closer to raw scroll. 0.08–0.14 feels natural.
    const EASE = 0.09;

    const readTarget = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      if (scrollable <= 0) return;
      const raw = -rect.top / scrollable;
      progressTarget.current = Math.min(1, Math.max(0, raw));
    };

    const applyToDom = (progress: number) => {
      const track = trackRef.current;
      if (track) {
        const translateX = progress * (100 * (count - 1));
        track.style.transform = `translate3d(-${translateX}%, 0, 0)`;
      }

      railFillRefs.current.forEach((fill, i) => {
        if (!fill) return;
        const scale = Math.min(1, Math.max(0, progress * count - i));
        fill.style.transform = `scaleX(${scale})`;
      });

      const idx = Math.min(count - 1, Math.floor(progress * count));
      if (idx !== lastActiveIndex.current) {
        lastActiveIndex.current = idx;
        setActiveIndex(idx);
      }
      if (labelRef.current) {
        labelRef.current.textContent = String(idx + 1).padStart(2, "0");
      }
    };

    const loop = () => {
      readTarget();
      const delta = progressTarget.current - progressNow.current;

      // Snap once close enough, so it doesn't chase forever.
      if (Math.abs(delta) < 0.0006) {
        progressNow.current = progressTarget.current;
      } else {
        progressNow.current += delta * EASE;
      }

      applyToDom(progressNow.current);
      rafId.current = requestAnimationFrame(loop);
    };

    rafId.current = requestAnimationFrame(loop);
    window.addEventListener("resize", readTarget);
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      window.removeEventListener("resize", readTarget);
    };
  }, [count]);

  return (
    <section
      ref={sectionRef}
      className={`${fraunces.variable} ${inter.variable} ${plexMono.variable} relative`}
      style={{ height: `${count * 150}vh` }}
    >
      <div className="sticky top-0 h-screen w-screen overflow-hidden">
        {/* eyebrow */}
        <div className="absolute left-6 top-6 z-10 flex items-center gap-2 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.2em] text-[#EDE7DD]/60 sm:left-10 sm:top-10">
          <span>Finishes board</span>
          <span className="text-[#EDE7DD]/30">/</span>
          <span ref={labelRef} className="text-[#EDE7DD]">
            01
          </span>
          <span className="text-[#EDE7DD]/40">of {String(count).padStart(2, "0")}</span>
        </div>

        {/* horizontal track */}
        <div
          ref={trackRef}
          className="flex h-full will-change-transform"
          style={{ width: `${count * 100}%` }}
        >
          {SLIDES.map((slide, i) => (
            <article
              key={slide.code}
              className="relative flex h-full w-screen shrink-0 flex-col justify-between px-6 pb-24 pt-24 sm:px-14 sm:pt-28 lg:px-24"
              aria-hidden={i !== activeIndex}
            >
              {/* swatch block */}
              <div
                className={`absolute inset-x-6 top-24 h-[40vh] rounded-sm sm:inset-x-14 sm:top-28 lg:inset-x-24 ${slide.swatch}`}
              >
                <div
                  className={`flex h-full flex-col justify-between p-5 font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.15em] sm:p-8 ${slide.ink}`}
                >
                  <div className="flex items-start justify-between">
                    <span>{slide.code}</span>
                    <span>{slide.index}</span>
                  </div>
                  <slide.Icon className="h-7 w-7 opacity-70" strokeWidth={1.25} />
                </div>
              </div>

              {/* text block */}
              <div className="relative mt-[calc(40vh+2.5rem)] max-w-xl sm:mt-[calc(40vh+3.5rem)]">
                <p className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.2em] text-[#EDE7DD]/50">
                  {slide.material}
                </p>
                <h3 className="mt-3 font-[family-name:var(--font-display)] text-3xl italic text-[#EDE7DD] sm:text-4xl lg:text-5xl">
                  {slide.title}
                </h3>
                <p className="mt-4 max-w-md font-[family-name:var(--font-body)] text-sm leading-relaxed text-[#EDE7DD]/70 sm:text-base">
                  {slide.copy}
                </p>
              </div>
            </article>
          ))}
        </div>

        {/* progress rail — physical swatch-chip strip */}
        <div className="absolute inset-x-6 bottom-8 z-10 flex items-center gap-2 sm:inset-x-10">
          {SLIDES.map((slide, i) => (
            <div
              key={slide.code}
              className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#EDE7DD]/15"
            >
              <div
                ref={(el) => {
                  railFillRefs.current[i] = el;
                }}
                className={`h-full ${slide.swatch}`}
                style={{ transform: "scaleX(0)", transformOrigin: "left" }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}