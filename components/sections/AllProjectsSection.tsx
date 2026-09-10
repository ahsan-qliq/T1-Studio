"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Link } from "@/app/i18n/navigation";
import { Select, type SelectOption } from "@/components/ui/select";
import { cn } from "@/lib/utils";

const INITIAL_COUNT = 4;

// ─── Public types ─────────────────────────────────────────────────────────────

export interface ProjectItem {
  id: string;
  title: string;
  propertyType: string;
  completionYear: number;
  location: string;
  description: string;
  image: { src: string; alt: string };
  href: string;
  locationKey: string;
  serviceKeys: string[];
  styleKey: string;
  propertyTypeKey: string;
}

export interface AllProjectsSectionProps {
  heading: string;
  viewCaseStudyLabel: string;
  loadMoreLabel: string;
  propertyTypeMeta: string;
  completionYearMeta: string;
  locationMeta: string;
  noResultsLabel: string;
  clearFiltersLabel: string;
  filterLabels: {
    locations: string;
    services: string;
    style: string;
    propertyType: string;
  };
  filterOptions: {
    locations: SelectOption[];
    services: SelectOption[];
    styles: SelectOption[];
    propertyTypes: SelectOption[];
  };
  projects: ProjectItem[];
}

// ─── Meta row ─────────────────────────────────────────────────────────────────

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline gap-4">
      <dt className="min-w-[9rem] text-sm font-semibold text-white/50">{label}</dt>
      <dd className="text-sm text-white/80">{value}</dd>
    </div>
  );
}

// ─── Featured card (first project) ───────────────────────────────────────────

function FeaturedCard({
  project,
  viewCaseStudyLabel,
  propertyTypeMeta,
  completionYearMeta,
  locationMeta,
}: {
  project: ProjectItem;
  viewCaseStudyLabel: string;
  propertyTypeMeta: string;
  completionYearMeta: string;
  locationMeta: string;
}) {
  return (
    <article
      aria-label={project.title}
      className="grid items-center gap-8 border-b border-white/10 pb-14 lg:grid-cols-2 lg:gap-14"
    >
      <div className="relative aspect-4/3 w-full overflow-hidden">
        <Image
          src={project.image.src}
          alt={project.image.alt}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:hover:scale-[1.03]"
          priority
        />
      </div>

      <div className="flex flex-col gap-5">
        <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-[2.6rem] lg:leading-[1.15]">
          {project.title}
        </h2>

        <dl className="flex flex-col gap-2">
          <MetaRow label={propertyTypeMeta} value={project.propertyType} />
          <MetaRow label={completionYearMeta} value={String(project.completionYear)} />
          <MetaRow label={locationMeta} value={project.location} />
        </dl>

        <p className="text-sm leading-relaxed text-white/60 sm:text-base">
          {project.description}
        </p>

        <div>
          <Link
            href={project.href}
            className="group inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-2.5 text-sm font-medium text-white transition-colors duration-200 hover:border-white/60 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          >
            {viewCaseStudyLabel}
            <ArrowRight
              className="size-4 motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
        </div>
      </div>
    </article>
  );
}

// ─── Compact card (grid items) ────────────────────────────────────────────────

function CompactCard({ project }: { project: ProjectItem }) {
  return (
    <article>
      <Link
        href={project.href}
        aria-label={`${project.title} — ${project.location}`}
        className="group relative block overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
      >
        <div className="relative aspect-4/3 overflow-hidden">
          <Image
            src={project.image.src}
            alt={project.image.alt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.35) 45%, transparent 75%)",
            }}
          />
          <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
            <h3 className="mb-1 text-xl font-bold leading-tight text-white sm:text-2xl">
              {project.title}
            </h3>
            <p className="text-sm text-white/70">{project.location}</p>
          </div>
        </div>
      </Link>
    </article>
  );
}

// ─── Filter bar ───────────────────────────────────────────────────────────────

function FilterBar({
  filterLabels,
  filterOptions,
  values,
  onChange,
}: {
  filterLabels: AllProjectsSectionProps["filterLabels"];
  filterOptions: AllProjectsSectionProps["filterOptions"];
  values: {
    location: string | null;
    service: string | null;
    style: string | null;
    propertyType: string | null;
  };
  onChange: (key: keyof typeof values, value: string | null) => void;
}) {
  return (
    <div
      role="search"
      aria-label="Filter projects"
      className="flex flex-wrap items-center gap-3"
    >
      <Select
        placeholder={filterLabels.locations}
        options={filterOptions.locations}
        value={values.location ?? undefined}
        onValueChange={(v) => onChange("location", v)}
        aria-label={filterLabels.locations}
        className="w-40"
      />
      <Select
        placeholder={filterLabels.services}
        options={filterOptions.services}
        value={values.service ?? undefined}
        onValueChange={(v) => onChange("service", v)}
        aria-label={filterLabels.services}
        className="w-40"
      />
      <Select
        placeholder={filterLabels.style}
        options={filterOptions.styles}
        value={values.style ?? undefined}
        onValueChange={(v) => onChange("style", v)}
        aria-label={filterLabels.style}
        className="w-36"
      />
      <Select
        placeholder={filterLabels.propertyType}
        options={filterOptions.propertyTypes}
        value={values.propertyType ?? undefined}
        onValueChange={(v) => onChange("propertyType", v)}
        aria-label={filterLabels.propertyType}
        className="w-40 bg-foreground text-background [&_span]:text-background/80"
      />
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export function AllProjectsSection({
  heading,
  viewCaseStudyLabel,
  loadMoreLabel,
  propertyTypeMeta,
  completionYearMeta,
  locationMeta,
  noResultsLabel,
  clearFiltersLabel,
  filterLabels,
  filterOptions,
  projects,
}: AllProjectsSectionProps) {
  const [filters, setFilters] = useState<{
    location: string | null;
    service: string | null;
    style: string | null;
    propertyType: string | null;
  }>({ location: null, service: null, style: null, propertyType: null });

  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

  const handleFilterChange = (
    key: keyof typeof filters,
    value: string | null,
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setVisibleCount(INITIAL_COUNT);
  };

  const filtered = useMemo(
    () =>
      projects.filter((p) => {
        if (filters.location && p.locationKey !== filters.location) return false;
        if (filters.service && !p.serviceKeys.includes(filters.service))
          return false;
        if (filters.style && p.styleKey !== filters.style) return false;
        if (
          filters.propertyType &&
          p.propertyTypeKey !== filters.propertyType
        )
          return false;
        return true;
      }),
    [projects, filters],
  );

  const hasActiveFilter = Object.values(filters).some(Boolean);

  const featured = filtered[0];
  const restAll = filtered.slice(1);
  const visibleRest = restAll.slice(0, Math.max(0, visibleCount - 1));
  const hasMore = restAll.length > visibleRest.length;

  return (
    <section
      aria-labelledby="all-projects-heading"
      className="px-4 py-16 sm:px-8 lg:px-16"
    >
      {/* Header row */}
      <div className="mb-10 flex flex-wrap items-center justify-between gap-6">
        <h1
          id="all-projects-heading"
          className="text-3xl font-bold text-white sm:text-4xl"
        >
          {heading}
        </h1>
        <FilterBar
          filterLabels={filterLabels}
          filterOptions={filterOptions}
          values={filters}
          onChange={handleFilterChange}
        />
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center gap-4 py-20 text-center">
          <p className="text-white/50">{noResultsLabel}</p>
          {hasActiveFilter && (
            <button
              type="button"
              onClick={() => {
                setFilters({
                  location: null,
                  service: null,
                  style: null,
                  propertyType: null,
                });
                setVisibleCount(INITIAL_COUNT);
              }}
              className="text-sm font-medium text-gold underline underline-offset-4 hover:text-gold/80"
            >
              {clearFiltersLabel}
            </button>
          )}
        </div>
      ) : (
        <>
          {/* Featured project */}
          {featured && (
            <FeaturedCard
              project={featured}
              viewCaseStudyLabel={viewCaseStudyLabel}
              propertyTypeMeta={propertyTypeMeta}
              completionYearMeta={completionYearMeta}
              locationMeta={locationMeta}
            />
          )}

          {/* Compact grid */}
          {visibleRest.length > 0 && (
            <ul
              role="list"
              aria-label="More projects"
              className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2"
            >
              {visibleRest.map((project) => (
                <li key={project.id}>
                  <CompactCard project={project} />
                </li>
              ))}
            </ul>
          )}

          {/* Load more */}
          {hasMore && (
            <div className="mt-14 flex justify-center">
              <button
                type="button"
                onClick={() => setVisibleCount((c) => c + INITIAL_COUNT)}
                className={cn(
                  "rounded-full border border-white/20 px-8 py-3 text-sm font-medium text-white",
                  "transition-colors duration-200 hover:border-white/50 hover:bg-white/5",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black",
                )}
              >
                {loadMoreLabel}
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}
