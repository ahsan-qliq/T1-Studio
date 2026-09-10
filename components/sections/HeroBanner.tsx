import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { Link } from "@/app/i18n/navigation";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface HeroBannerProps {
  badge?: string;
  heading?: string;
  description?: string;
  cta?: string;
  imageSrc?: string;
  videoSrc?: string;
}

// CSS stagger timings — delay increases per element so they cascade in.
// animation-fill-mode: both keeps opacity:0 before the delay fires.
const ANIM = "hero-fade-up 0.75s cubic-bezier(0.22,1,0.36,1) both";

export async function HeroBanner({
  badge,
  heading,
  description,
  cta,
  imageSrc,
  videoSrc,
}: HeroBannerProps) {
  const t = await getTranslations("Hero");

  return (
    <section
      className="relative min-h-screen bg-zinc-950"
      aria-labelledby="hero-heading"
    >
      {/* Background — video takes priority over image when provided */}
      {videoSrc ? (
        <video
          src={videoSrc}
          poster="/assets/images/Home.webp"
          autoPlay
          loop
          muted
          playsInline
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <Image
          src={imageSrc ?? "/assets/images/Banner.webp"}
          alt={t("bgImageAlt")}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      )}

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 bg-linear-to-t from-black/85 via-black/60 to-black/20"
        aria-hidden="true"
      />

      {/* Page content stacks inside the section: nav space + hero copy */}
      <div className="relative z-10 flex min-h-screen flex-col max-w-225 mx-auto">
        <div className="h-16 shrink-0 sm:h-20" aria-hidden="true" />

        {/* Hero copy — each element animates in via CSS (runs before JS hydration) */}
        <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-8 sm:py-16 lg:px-16">
          <div className="text-center">
            <p
              className="mb-6 text-xs font-medium uppercase tracking-widest text-white/75 underline underline-offset-4 decoration-white/40"
              style={{ animation: ANIM, animationDelay: "0.15s" }}
            >
              {badge}
            </p>

            <h1
              id="hero-heading"
              className="mb-6 text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl lg:text-[3.25rem] lg:leading-[1.15]"
              style={{ animation: ANIM, animationDelay: "0.3s" }}
            >
              {heading}
            </h1>

            {/* <p
              className="mb-10 max-w-xl text-sm leading-relaxed text-white/75 sm:text-base lg:text-lg"
              style={{ animation: ANIM, animationDelay: "0.45s" }}
            >
              {description}
            </p> */}

            <div style={{ animation: ANIM, animationDelay: "0.6s" }}>
              <Link
                href="/contact"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "group py-3",
                )}
              >
                {cta}
                <ArrowRight
                  className="size-4 motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
