import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/app/i18n/navigation";

export default async function NotFound() {
  const t = await getTranslations("NotFound");

  return (
    <main
      aria-labelledby="not-found-heading"
      className="flex min-h-screen flex-col items-center justify-start bg-[#f5f0eb] px-4 pb-20 pt-32 text-center"
    >
      {/* Error code */}
      <p
        className="text-[clamp(5rem,20vw,11rem)] font-bold leading-none tracking-tight text-secondary"
        aria-hidden="true"
      >
        {t("code")}
      </p>

      {/* Heading */}
      <h1
        id="not-found-heading"
        className="mt-2 text-3xl font-semibold text-secondary sm:text-4xl lg:text-5xl"
      >
        {t("heading")}
      </h1>

      {/* Description */}
      <p className="mt-4 max-w-md text-base leading-relaxed text-secondary/60 sm:text-lg">
        {t("description")}
      </p>

      {/* Interior image */}
      <div className="relative mx-auto mt-10 w-full max-w-lg">
        <Image
          src="/assets/images/spaces.png"
          alt={t("imageAlt")}
          width={640}
          height={560}
          priority
          className="h-auto w-full rounded-sm object-cover"
        />
      </div>

      {/* CTAs */}
      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/"
          className="group inline-flex items-center gap-2 rounded-full bg-secondary px-8 py-3.5 text-sm font-semibold text-primary transition-colors duration-200 hover:bg-secondary/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2"
        >
          {t("ctaHome")}
          <ArrowRight
            className="size-4 motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </Link>

        <Link
          href="/spaces"
          className="group inline-flex items-center gap-2 rounded-full border border-secondary/30 px-8 py-3.5 text-sm font-semibold text-secondary transition-colors duration-200 hover:border-secondary/60 hover:bg-secondary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2"
        >
          {t("ctaSpaces")}
          <ArrowRight
            className="size-4 motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </Link>
      </div>
    </main>
  );
}
