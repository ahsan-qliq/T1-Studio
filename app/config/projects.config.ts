import type {
  CmsBlogListingSection,
  CmsProjectsFilters,
  CmsTestimonialsSection,
  CmsBeforeAfterSection,
  CmsPartnershipSectionT,
  CmsFaqSection,
  CmsBilingualText,
  CmsProjectDetailGallerySection,
  CmsProjectDetailMaterialsSection,
  CmsProjectDetailTestimonialSection,
  CmsProjectDetailRelatedProjectsSection,
} from "@/lib/cms/types";

// ─── Shared helpers ───────────────────────────────────────────────────────────

type CmsTextValue = CmsBilingualText | string | undefined | null;

export function getText(value: CmsTextValue, locale: string): string {
  if (!value) return "";
  if (typeof value === "string") return value;
  if (locale === "ar") return value.ar || value.en || "";
  return value.en || value.ar || "";
}

export function isVisible(section?: { isVisible?: boolean } | null): boolean {
  return section?.isVisible !== false;
}

export function toProjectHref(raw: string): string {
  const clean = raw.trim().replace(/\s+/g, "-");
  if (clean === "/" || clean === "/projects" || clean.startsWith("/projects/")) return clean;
  return `/projects/${clean.replace(/^\//, "")}`;
}

const toOptions = (values: string[] = []) =>
  values.map((v) => ({ value: v, label: v }));

// ─── Projects list page ───────────────────────────────────────────────────────

export const mapProjectsFilterOptions = (filters: CmsProjectsFilters | undefined) => ({
  locations: toOptions(filters?.locations),
  services: [] as { value: string; label: string }[],
  styles: [] as { value: string; label: string }[],
  propertyTypes: toOptions(filters?.categories),
  completionYears: toOptions(filters?.completionYears),
});

export const mapProjectItems = (
  section: CmsBlogListingSection,
  locale: string,
) =>
  (section.projects ?? [])
    .filter((p) => p.isVisible)
    .map((p) => ({
      id: p._id,
      title: p.title,
      propertyType: p.category || "",
      completionYear: Number(p.completionYear) || 0,
      location: p.location,
      description: p.shortDescription,
      image: {
        src: p.image?.url || "",
        alt: getText(p.image?.alt, locale),
      },
      href: p.href || `/projects/${p.slug}`,
      locationKey: p.location || "",
      serviceKeys: [] as string[],
      styleKey: "",
      propertyTypeKey: p.category || "",
    }));

export const mapProjectsAllProjectsLabels = (
  section: CmsBlogListingSection,
  locale: string,
) => ({
  heading: getText(section.heading, locale),
  viewCaseStudyLabel: locale === "ar" ? "عرض دراسة الحالة" : "View Case Study",
  loadMoreLabel:
    section.loadMoreLabel || (locale === "ar" ? "عرض المزيد" : "Load More"),
  propertyTypeMeta: locale === "ar" ? "نوع العقار" : "Property Type",
  completionYearMeta: locale === "ar" ? "سنة الإنجاز" : "Completion Year",
  locationMeta: locale === "ar" ? "الموقع" : "Location",
  noResultsLabel:
    locale === "ar" ? "لم يتم العثور على أي مشاريع" : "No projects found",
  clearFiltersLabel: locale === "ar" ? "مسح الفلاتر" : "Clear Filters",
  filterLabels: {
    locations: locale === "ar" ? "الموقع" : "Locations",
    services: locale === "ar" ? "الخدمات" : "Services",
    style: locale === "ar" ? "الأسلوب" : "Style",
    propertyType: locale === "ar" ? "الفئة" : "Category",
    completionYear: locale === "ar" ? "سنة الإنجاز" : "Year",
  },
});

export const mapProjectsTestimonials = (
  section: CmsTestimonialsSection,
  locale: string,
) => ({
  label: getText(section.eyebrow, locale),
  heading: getText(section.heading, locale),
  testimonials: (section.testimonials || [])
    .filter((item) => item.isVisible)
    .map((item, index) => ({
      id: index,
      name: getText(item.clientName, locale),
      quote: getText(item.testimonial, locale),
      image: item.image?.url || "",
    })),
});

export const mapProjectsBeforeAfter = (
  section: CmsBeforeAfterSection,
  locale: string,
) => {
  const item = section.items?.[0];
  return {
    heading: getText(section.heading, locale),
    beforeLabel: locale === "ar" ? "قبل" : "Before",
    afterLabel: locale === "ar" ? "بعد" : "After",
    handleLabel: locale === "ar" ? "اسحب للمقارنة" : "Drag to compare before and after",
    item,
  };
};

export const mapProjectsPartnership = (
  section: CmsPartnershipSectionT,
  locale: string,
) => ({
  heading: getText(section.heading, locale),
  description: getText(section.description, locale),
  imageSrc: section.image?.url || "",
  imageAlt: getText(section.image?.alt, locale),
  ctaLabel: getText(section.button?.label, locale),
  ctaHref: section.button?.href || "/",
  steps: (section.steps || []).map((step) => ({
    label: getText(step.title, locale),
    iconName: step.icon,
  })),
  benefits: [] as { label: string; iconName: string }[],
});

export const mapProjectsFaq = (section: CmsFaqSection, locale: string) => ({
  label: getText(section.eyebrow, locale),
  heading: getText(section.heading, locale),
  items: (section.faqs || [])
    .filter((item) => item.isVisible)
    .map((item) => ({
      question: getText(item.question, locale),
      answer: getText(item.answer, locale),
    })),
});

// ─── Project detail page ──────────────────────────────────────────────────────

export const mapProjectGallery = (
  section: CmsProjectDetailGallerySection,
  locale: string,
  fallbackName: string,
) =>
  (section.images ?? [])
    .filter((item) => item?.isVisible !== false && Boolean(item?.image?.url))
    .map((item) => ({
      image: item.image.url,
      src: item.image.url,
      alt:
        getText(item.image.alt, locale) ||
        getText(item.title, locale) ||
        fallbackName ||
        "Project image",
      title: getText(item.title, locale),
      caption: getText(item.caption, locale),
    }));

export const mapProjectMaterials = (
  section: CmsProjectDetailMaterialsSection,
  locale: string,
  fallbackName: string,
) =>
  (section.materials ?? [])
    .filter((item) => item?.isVisible !== false && Boolean(item?.image?.url))
    .map((item) => ({
      src: item.image.url,
      alt:
        getText(item.image.alt, locale) ||
        getText(item.title, locale) ||
        fallbackName ||
        "Material",
      label: getText(item.title, locale),
    }));

export const mapProjectTestimonials = (
  section: CmsProjectDetailTestimonialSection,
  locale: string,
) =>
  (section.testimonials ?? [])
    .filter(Boolean)
    .map((item) => ({
      quote: getText(item.quote, locale),
      author: getText(item.author, locale),
      authorRole: getText(item.authorRole, locale),
      badge: getText(item.badge, locale),
      readTime: getText(item.readTime, locale),
      image: {
        src: item.image?.url || "",
        alt: getText(item.image?.alt, locale) || getText(item.author, locale),
      },
      avatar: {
        src: item.avatar?.url || "",
        alt: getText(item.avatar?.alt, locale) || getText(item.author, locale),
      },
    }))
    .filter((item) => item.quote || item.author);

export const mapProjectRelatedProjects = (
  section: CmsProjectDetailRelatedProjectsSection,
  locale: string,
) =>
  section.projects
    .filter((item) => item.isVisible !== false)
    .map((item, i) => ({
      id: item._id || String(i),
      title: getText(item.title, locale),
      location:
        getText(item.location, locale) || getText(item.description, locale),
      href: item.href || (item.slug ? `/projects/${item.slug}` : "/projects"),
      image: {
        src: item.image?.url || "",
        alt: getText(item.image?.alt, locale) || getText(item.title, locale),
        width: 4,
        height: 3,
      },
    }));
