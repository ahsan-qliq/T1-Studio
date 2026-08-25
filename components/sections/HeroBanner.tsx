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
}

export async function HeroBanner({
  badge,
  heading,
  description,
  cta,
  imageSrc = "/assets/images/Banner.png",
}: HeroBannerProps) {
  const t = await getTranslations("Hero");

  return (
    <section
      className="relative min-h-screen bg-zinc-950"
      aria-labelledby="hero-heading"
    >
      {/* Background image */}
      <Image
        src={imageSrc}
        alt={t("bgImageAlt")}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      {/* Gradient overlay — darker on the content side */}
      <div
        className="absolute inset-0 bg-linear-to-r from-black/85 via-black/60 to-black/20"
        aria-hidden="true"
      />

      {/* Page content stacks inside the section: nav space + hero copy */}
      <div className="relative z-10 flex min-h-screen flex-col">
        {/* Reserved height for the absolutely-positioned Navbar */}
        <div className="h-20 shrink-0" aria-hidden="true" />

        {/* Hero copy */}
        <div className="flex flex-1 flex-col justify-center px-8 py-16 lg:px-16">
          <div className="max-w-2xl">
            {/* Category badge */}
            <p className="mb-6 text-xs font-medium uppercase tracking-widest text-white/75 underline underline-offset-4 decoration-white/40">
              {badge}
            </p>

            {/* Main heading */}
            <h1
              id="hero-heading"
              className="mb-6 text-4xl font-bold leading-tight text-white lg:text-[3.25rem] lg:leading-[1.15]"
            >
              {heading}
            </h1>

            {/* Supporting copy */}
            <p className="mb-10 max-w-xl text-base leading-relaxed text-white/75 lg:text-lg">
              {description}
            </p>

            {/* CTA */}
            <Link
              href="/contact"
              className={cn(
                buttonVariants({ variant: "gold", size: "lg" }),
                "rounded-full gap-2 px-6 py-3 text-base h-auto",
              )}
            >
              {cta}
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
