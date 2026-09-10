import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Link } from "@/app/i18n/navigation";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface SpaceCard {
  image: { src: string; alt: string };
  title: string;
  description: string;
  href: string;
}

interface FeaturedSpacesProps {
  heading: string;
  viewAllLabel?: string;
  viewAllHref?: string;
  cardArrowLabel: string;
  cards: SpaceCard[];
}

function SpaceCard({
  image,
  title,
  description,
  href,
  cardArrowLabel,
}: SpaceCard & { cardArrowLabel: string }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-border shadow-sm">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute bottom-0 left-0 right-0 flex gap-5 items-center pr-4">
          <div className="flex-1 bg-white px-5 py-2 rounded-tr-2xl shadow-md">
            <h3 className="mb-2 text-xl font-bold text-foreground">{title}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {description}
            </p>
          </div>
          <div className="">
            {/* Arrow button — sits at the top-right, overlapping the image */}
            <Link
              href={href}
              aria-label={`${cardArrowLabel} ${title}`}
              className="group/arrow flex size-10 items-center justify-center rounded-md border border-border bg-white text-foreground shadow-sm transition-all duration-200 hover:bg-gold hover:border-gold hover:text-white hover:shadow-md motion-safe:hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <ArrowRight
                className="size-4 motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover/arrow:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
          </div>
        </div>
      </div>

      {/* Content */}
    </article>
  );
}

export function FeaturedSpaces({
  heading,
  viewAllLabel,
  viewAllHref,
  cardArrowLabel,
  cards,
}: FeaturedSpacesProps) {
  return (
    <section
      aria-labelledby="featured-spaces-heading"
      // sticky top-0 z-20
      className="bg-white py-14 px-4 sm:px-8 lg:px-16"
    >
      {/* Header row */}
      {/* <div className="mb-8 flex items-center justify-between">
        <h2
          id="featured-spaces-heading"
          className="text-3xl font-bold text-foreground lg:text-4xl"
        >
          {heading}
        </h2>

        <Link
          href={viewAllHref}
          className={cn(
            buttonVariants({ variant: "gold", size: "lg" }),
            "group text-white rounded-lg gap-2",
          )}
        >
          {viewAllLabel}
          <ArrowRight className="size-4 motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover:translate-x-0.5" aria-hidden="true" />
        </Link>
      </div> */}

      {/* Header row */}
      <div
        className={cn(
          "mb-8 flex items-center",
          viewAllLabel && viewAllHref
            ? "justify-between"
            : "justify-center text-center",
        )}
      >
        <h2
          id="featured-spaces-heading"
          className="text-3xl font-bold text-foreground lg:text-4xl"
        >
          {heading}
        </h2>

        {viewAllLabel && viewAllHref && (
          <Link
            href={viewAllHref}
            className={cn(
              buttonVariants({ variant: "gold", size: "lg" }),
              "group gap-2 rounded-lg text-white",
            )}
          >
            {viewAllLabel}

            <ArrowRight
              className="size-4 motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
        )}
      </div>

      {/* Cards grid */}
      <ul
        role="list"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {cards.map((card) => (
          <li key={card.href}>
            <SpaceCard {...card} cardArrowLabel={cardArrowLabel} />
          </li>
        ))}
      </ul>
    </section>
  );
}
