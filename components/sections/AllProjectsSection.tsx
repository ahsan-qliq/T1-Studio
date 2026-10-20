"use client";

import { useRef, useState, useMemo } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Link } from "@/app/i18n/navigation";
import { Select, type SelectOption } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { motion, useInView } from "framer-motion";

import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 80,
  },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: EASE,
      delay: i * 0.12,
    },
  }),
};

const INITIAL_COUNT = 3;

const CARD_WIDTHS = [
  "lg:w-[58%] lg:justify-self-end",
  "lg:w-[88%] lg:justify-self-start",
  "lg:w-[58%] lg:justify-self-end",
  "lg:w-[88%] lg:justify-self-start",
  "lg:w-[58%] lg:justify-self-end",
] as const;

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
  status?: string;
  readTime?: string;
  hasInnerPage?: boolean;
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
    completionYear: string;
    status: string;
  };
  filterOptions: {
    locations: SelectOption[];
    services: SelectOption[];
    styles: SelectOption[];
    propertyTypes: SelectOption[];
    completionYears: SelectOption[];
    statuses: SelectOption[];
  };
  projects: ProjectItem[];
  commercialStatsBarNode?: React.ReactNode;
  retailStatsBarNode?: React.ReactNode;
  awardsNode?: React.ReactNode;
  retailBeforeAfterNode?: React.ReactNode;
}

// ─── Badge ────────────────────────────────────────────────────────────────────

function Badge({ label }: { label: string }) {
  return (
    <span className="rounded-full border border-white/25 bg-black/20 px-3 py-1 text-xs font-medium text-white/80">
      {label}
    </span>
  );
}

// ─── Featured card ────────────────────────────────────────────────────────────
// Two sibling grid items: image (col 1) + content (col 2-3)

function FeaturedCard({
  project,
  viewCaseStudyLabel,
}: {
  project: ProjectItem;
  viewCaseStudyLabel: string;
}) {
  console.log("project", project);
  return (
    <>
      {/* Image — col 1, stretches to row height via CSS Grid */}
      <div
        className="relative grid grid-cols-2 overflow-hidden border-b border-white/10 lg:border-r"
        style={{ aspectRatio: "4 / 5" }}
      >
        {project.image.src ? (
          <Image
            src={project.image.src}
            alt={project.image.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 33vw"
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-white/5" />
        )}
      </div>

      {/* Content — col 2-3 */}
      <div className="flex flex-col justify-center gap-6 border-b border-white/10 px-8 py-16 lg:col-span-2 lg:px-14 lg:py-20">
        {/* {(project.propertyType || project.readTime) && (
          <div className="flex items-center gap-3">
            {project.location && <Badge label={project.location} />}
            {project.readTime && (
              <span className="text-sm text-white/50">{project.readTime}</span>
            )}
          </div>
        )} */}

        <h3 className="max-w-2xl text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
          {project.title}
        </h3>
        <p className="text-base text-secondary font-medium">
          Property Type: {project.propertyType}
        </p>
        <p className="text-base text-secondary font-medium">
          Completion Year: {project.completionYear}
        </p>
        <p className="text-base text-secondary font-medium">
          Location: {project.location}
        </p>

        {project.description && (
          <p className="max-w-lg text-sm leading-relaxed text-secondary sm:text-[0.9375rem]">
            {project.description}
          </p>
        )}

        {project.hasInnerPage !== false && (
          <div>
            <Link
              href={project.href}
              className="group inline-flex items-center gap-2 rounded-full bg-secondary border border-white/30 px-6 py-2.5 text-sm font-medium text-black transition-all duration-200 hover:bg-black hover:text-white hover:border-black hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:ring-offset-white"
            >
              {viewCaseStudyLabel}
              <ArrowRight
                className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
          </div>
        )}
      </div>
    </>
  );
}

// ─── Compact card ─────────────────────────────────────────────────────────────
function CompactCard({
  project,
  isRight,
  index,
}: {
  project: ProjectItem;
  isRight: boolean;
  index: number;
}) {
  const ref = useRef<HTMLElement>(null);

  const inView = useInView(ref as React.RefObject<Element>, {
    once: true,
    margin: "-80px",
  });

  const secondaryInfo =
    project.readTime ??
    (project.completionYear ? String(project.completionYear) : null);

  return (
    <motion.article
      ref={ref}
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
    >
      <Link
        href={project.href}
        aria-label={project.title}
        className="group block w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
      >
        <div
          className="relative w-full overflow-hidden"
          style={{
            aspectRatio: isRight ? "16 / 10" : "3 / 5",
          }}
        >
          {project.image.src ? (
            <Image
              src={project.image.src}
              alt={project.image.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 bg-white/5" />
          )}

          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 50%, transparent 75%)",
            }}
          />

          <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
            <h3 className="mb-3 text-xl font-bold leading-tight text-white sm:text-2xl">
              {project.title}
            </h3>

            {(project.location || secondaryInfo) && (
              <div className="flex items-center justify-between">
                {project.location && <Badge label={project.location} />}
                {secondaryInfo && (
                  <span className="text-sm text-white/60">{secondaryInfo}</span>
                )}
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
// ─── Section ──────────────────────────────────────────────────────────────────

export function AllProjectsSection({
  heading,
  viewCaseStudyLabel,
  loadMoreLabel,
  propertyTypeMeta: _pt,
  completionYearMeta: _cy,
  locationMeta: _lm,
  noResultsLabel,
  clearFiltersLabel,
  filterLabels,
  filterOptions,
  projects,
  commercialStatsBarNode,
  retailStatsBarNode,
  awardsNode,
  retailBeforeAfterNode,
}: AllProjectsSectionProps) {

  const [activeTab, setActiveTab] = useState<"commercial" | "retail">(
    "commercial",
  );
  const [filters, setFilters] = useState<{
    category: string | null;
    location: string | null;
    completionYear: string | null;
    status: string | null;
  }>({ category: null, location: null, completionYear: null, status: null });
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

  const hasDropdownFilters =
    filterOptions.propertyTypes.length > 0 ||
    filterOptions.locations.length > 0 ||
    filterOptions.completionYears.length > 0 ||
    filterOptions.statuses.length > 0;
console.log("projects 299", projects);
  const filtered = useMemo(
    () =>
      projects.filter((p) => {
        if (activeTab === "commercial" && p.propertyType === "Villa") return false;
        if (activeTab === "retail" && p.propertyType !== "Villa") return false;
        if (filters.category && p.propertyTypeKey !== filters.category)
          return false;
        if (filters.location && p.locationKey !== filters.location)
          return false;
        if (
          filters.completionYear &&
          String(p.completionYear) !== filters.completionYear
        )
          return false;
        if (filters.status === "ongoing" && p.status !== "ongoing")
          return false;
        return true;
      }),
    [projects, filters, activeTab],
  );

  const hasActiveFilter = Object.values(filters).some(Boolean);
  const visibleProjects = filtered.slice(0, visibleCount);
  const hasMore = filtered.length > visibleCount;

  const handleFilter = (
    key: "category" | "location" | "completionYear" | "status",
    value: string | null,
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setVisibleCount(INITIAL_COUNT);
  };

  const handleClearFilters = () => {
    setFilters({ category: null, location: null, completionYear: null, status: null });
    setVisibleCount(INITIAL_COUNT);
  };
  
  return (
    <section aria-labelledby="all-projects-heading">
      <div className="mx-auto">
        <Tabs
          value={activeTab}
          onValueChange={(v) => {
            setActiveTab(v as "commercial" | "retail");
            setVisibleCount(INITIAL_COUNT);
          }}
        >
          <div className="border-b border-white/10 px-4 py-6 sm:px-8 lg:px-12">
            <TabsList
              variant="line"
              className="w-auto h-auto rounded-none bg-transparent p-0 gap-6"
            >
              <TabsTrigger
                value="commercial"
                className="rounded-full border border-white/25 px-8 py-3.5 text-sm font-semibold text-white/50 transition-colors duration-200 after:hidden hover:bg-white/10 hover:text-white data-active:border-white data-active:bg-white/10 data-active:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              >
                Commercial
              </TabsTrigger>
              <TabsTrigger
                value="retail"
                className="rounded-full border border-white/25 px-8 py-3.5 text-sm font-semibold text-white/50 transition-colors duration-200 after:hidden hover:bg-white/10 hover:text-white data-active:border-white data-active:bg-white/10 data-active:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              >
                Residential
              </TabsTrigger>
            </TabsList>
          </div>

          {(["commercial", "retail"] as const).map((tab) => (
            <TabsContent key={tab} value={tab} className="mt-0">
              <div>
              {tab === "commercial" ? commercialStatsBarNode : retailStatsBarNode}
              {tab === "commercial" && awardsNode}
              {/* ── Header: heading + filters ── */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 px-4 py-6 sm:px-8 lg:px-12">
                <h2
                  id="all-projects-heading"
                  className="text-3xl font-bold text-white sm:text-4xl"
                >
                  {heading}
                </h2>

                {hasDropdownFilters && (
                  <div
                    role="search"
                    aria-label="Project filters"
                    className="flex flex-wrap items-center gap-3"
                  >
                    {filterOptions.propertyTypes.length > 0 && (
                      <Select
                        placeholder={filterLabels.propertyType}
                        options={filterOptions.propertyTypes}
                        value={filters.category ?? undefined}
                        onValueChange={(v) => handleFilter("category", v)}
                        aria-label={filterLabels.propertyType}
                        className="w-44"
                      />
                    )}
                    {filterOptions.locations.length > 0 && (
                      <Select
                        placeholder={filterLabels.locations}
                        options={filterOptions.locations}
                        value={filters.location ?? undefined}
                        onValueChange={(v) => handleFilter("location", v)}
                        aria-label={filterLabels.locations}
                        className="w-52"
                      />
                    )}
                    {filterOptions.completionYears.length > 0 && (
                      <Select
                        placeholder={filterLabels.completionYear}
                        options={filterOptions.completionYears}
                        value={filters.completionYear ?? undefined}
                        onValueChange={(v) => handleFilter("completionYear", v)}
                        aria-label={filterLabels.completionYear}
                        className="w-36"
                      />
                    )}
                    {filterOptions.statuses.length > 0 && (
                      <Select
                        placeholder={filterLabels.status}
                        options={filterOptions.statuses}
                        value={filters.status ?? undefined}
                        onValueChange={(v) => handleFilter("status", v)}
                        aria-label={filterLabels.status}
                        className="w-40"
                      />
                    )}
                    {hasActiveFilter && (
                      <button
                        type="button"
                        onClick={handleClearFilters}
                        className="text-sm font-medium text-white/50 underline underline-offset-4 hover:text-white/80"
                      >
                        {clearFiltersLabel}
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* ── Results ── */}
              {filtered.length === 0 ? (
                <div className="flex flex-col items-center gap-4 py-20 text-center">
                  <p className="text-white/50">{noResultsLabel}</p>
                </div>
              ) : (
                <>
                  {visibleProjects.length > 0 && (
                    <div className="lg:grid lg:grid-cols-3">
                      {visibleProjects.map((item) => (
                        <FeaturedCard
                          key={item.id}
                          project={item}
                          viewCaseStudyLabel={viewCaseStudyLabel}
                        />
                      ))}
                    </div>
                  )}
                </>
              )}

              {/* ── Load more ── */}
              {hasMore && (
                <div className="flex justify-center border-t border-white/10 py-16">
                  <button
                    type="button"
                    onClick={() => setVisibleCount((c) => c + INITIAL_COUNT)}
                    className="rounded-full border border-white/25 px-8 py-3 text-sm font-medium text-white transition-colors duration-200 hover:border-white/50 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                  >
                    {loadMoreLabel}
                  </button>
                </div>
              )}
              {tab === "retail" && retailBeforeAfterNode}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
