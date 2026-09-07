"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Link } from "@/app/i18n/navigation";
import { Select, type SelectOption } from "@/components/ui/select";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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

// ─── Project card ─────────────────────────────────────────────────────────────

function ProjectCard({
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
    <article className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
      {/* Image */}
      <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl">
        <Image
          src={project.image.src}
          alt={project.image.alt}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:hover:scale-[1.03]"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-5">
        <h2 className="text-3xl font-bold leading-tight text-foreground sm:text-4xl lg:text-[2.6rem] lg:leading-[1.15]">
          {project.title}
        </h2>

        <dl className="flex flex-col gap-2">
          <MetaRow label={propertyTypeMeta} value={project.propertyType} />
          <MetaRow label={completionYearMeta} value={String(project.completionYear)} />
          <MetaRow label={locationMeta} value={project.location} />
        </dl>

        <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
          {project.description}
        </p>

        <div>
          <Link
            href={project.href}
            className={cn(
              buttonVariants({ variant: "gold", size: "lg" }),
              "group mt-2 gap-2 rounded-lg",
            )}
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

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline gap-4">
      <dt className="min-w-[9rem] text-sm font-semibold text-foreground">{label}</dt>
      <dd className="text-sm text-muted-foreground">{value}</dd>
    </div>
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
  values: { location: string | null; service: string | null; style: string | null; propertyType: string | null };
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

  const handleFilterChange = (
    key: keyof typeof filters,
    value: string | null,
  ) => setFilters((prev) => ({ ...prev, [key]: value }));

  const filtered = useMemo(
    () =>
      projects.filter((p) => {
        if (filters.location && p.locationKey !== filters.location) return false;
        if (filters.service && !p.serviceKeys.includes(filters.service)) return false;
        if (filters.style && p.styleKey !== filters.style) return false;
        if (filters.propertyType && p.propertyTypeKey !== filters.propertyType) return false;
        return true;
      }),
    [projects, filters],
  );

  const hasActiveFilter = Object.values(filters).some(Boolean);

  return (
    <section
      aria-labelledby="all-projects-heading"
      className="bg-white py-16 px-4 sm:px-8 lg:px-16"
    >
      {/* Header row */}
      <div className="mb-10 flex flex-wrap items-center justify-between gap-6">
        <h1
          id="all-projects-heading"
          className="text-3xl font-bold text-foreground sm:text-4xl"
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

      {/* Project list */}
      {filtered.length > 0 ? (
        <div className="flex flex-col divide-y divide-border">
          {filtered.map((project) => (
            <div key={project.id} className="py-12 first:pt-0">
              <ProjectCard
                project={project}
                viewCaseStudyLabel={viewCaseStudyLabel}
                propertyTypeMeta={propertyTypeMeta}
                completionYearMeta={completionYearMeta}
                locationMeta={locationMeta}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4 py-20 text-center">
          <p className="text-muted-foreground">{noResultsLabel}</p>
          {hasActiveFilter && (
            <button
              type="button"
              onClick={() =>
                setFilters({ location: null, service: null, style: null, propertyType: null })
              }
              className="text-sm font-medium text-gold underline underline-offset-4 hover:text-gold-hover"
            >
              {clearFiltersLabel}
            </button>
          )}
        </div>
      )}
    </section>
  );
}
