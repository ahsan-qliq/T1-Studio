import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Link } from "@/app/i18n/navigation";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// ─── Public types ─────────────────────────────────────────────────────────────

export interface CollectionItem {
  id: string;
  title: string;
  location: string;
  image: { src: string; alt: string };
  href: string;
}

export interface TrendingCollectionsProps {
  heading: string;
  viewAllLabel: string;
  viewAllHref: string;
  exploreLabel: string;
  collections: CollectionItem[];
}

// ─── Collection card ──────────────────────────────────────────────────────────

function CollectionCard({
  collection,
  exploreLabel,
  featured = false,
}: {
  collection: CollectionItem;
  exploreLabel: string;
  featured?: boolean;
}) {
  return (
    <Link
      href={collection.href}
      aria-label={`${collection.title} — ${collection.location}`}
      className="group relative flex aspect-[3/4] overflow-hidden rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 sm:aspect-[4/5]"
    >
      {/* Image */}
      <Image
        src={collection.image.src}
        alt={collection.image.alt}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-[1.04]"
      />

      {/* Gradient overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent"
      />

      {/* Text + optional CTA */}
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5">
        <div className="flex flex-col gap-1">
          <p className="text-base font-semibold leading-snug text-white sm:text-lg">
            {collection.title}
          </p>
          <p className="text-xs text-white/70 sm:text-sm">{collection.location}</p>
        </div>

        {featured && (
          <span
            className={cn(
              buttonVariants({ variant: "secondary", size: "sm" }),
              "shrink-0 gap-1.5 rounded-full bg-white text-foreground hover:bg-white/90 motion-safe:hover:-translate-y-px",
            )}
          >
            {exploreLabel}
            <ArrowRight className="size-3.5" aria-hidden="true" />
          </span>
        )}
      </div>
    </Link>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export function TrendingCollections({
  heading,
  viewAllLabel,
  viewAllHref,
  exploreLabel,
  collections,
}: TrendingCollectionsProps) {
  return (
    <section
      aria-labelledby="trending-collections-heading"
      className="bg-white py-16 px-4 sm:px-8 lg:px-16"
    >
      {/* Header */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <h2
          id="trending-collections-heading"
          className="text-3xl font-bold text-foreground sm:text-4xl"
        >
          {heading}
        </h2>

        <Link
          href={viewAllHref}
          className={cn(
            buttonVariants({ variant: "gold", size: "lg" }),
            "group gap-2 rounded-lg",
          )}
        >
          {viewAllLabel}
          <ArrowRight
            className="size-4 motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </Link>
      </div>

      {/* Grid */}
      <ul
        role="list"
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {collections.map((col, i) => (
          <li key={col.id}>
            <CollectionCard
              collection={col}
              exploreLabel={exploreLabel}
              featured={i === 0}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
