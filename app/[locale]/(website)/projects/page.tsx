import type { Metadata } from "next";
import { getProjectsPageCms } from "@/lib/cms/projects";
import { JsonLdSchema } from "@/components/JsonLdSchema";
import { HeroBanner } from "@/components/sections/HeroBanner";
import { AllProjectsSection } from "@/components/sections/AllProjectsSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { BeforeAfterSection } from "@/components/sections/BeforeAfterSection";
import { ReferralPartnerSection } from "@/components/sections/ReferralPartnerSection";
import { FaqSection } from "@/components/sections/FaqSection";

export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const cms = await getProjectsPageCms(locale);
  const seo = cms?.seo;
  return {
    ...(seo?.metaTitle && { title: seo.metaTitle }),
    ...(seo?.metaDescription && { description: seo.metaDescription }),
    ...(seo?.canonicalUrl && { alternates: { canonical: seo.canonicalUrl } }),
    ...(seo?.ogImage?.url && {
      openGraph: { images: [{ url: seo.ogImage.url }] },
      twitter: { images: [seo.ogImage.url] },
    }),
  };
}

type Locale = "en" | "ar";

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;

  const locale: Locale = rawLocale === "ar" ? "ar" : "en";

  const cms = await getProjectsPageCms(locale);
  console.log(cms, 77)
  const s = cms?.sections;

  const t = (value: unknown): string => {
    if (!value) return "";

    if (typeof value === "string") {
      return value;
    }

    if (typeof value !== "object") return "";

    const localizedValue = value as Partial<Record<Locale, unknown>>;
    const translation = localizedValue[locale] ?? localizedValue.en;

    return typeof translation === "string" ? translation : "";
  };

  /* =========================================================
     HERO
  ========================================================= */

  const hero = s?.hero;

  /* =========================================================
     PROJECTS
  ========================================================= */

  const projectsSection = s?.projects;
  const apiFilters = cms?.filters;

  const toOptions = (values: string[] = []) =>
    values.map((v) => ({ value: v, label: v }));

  const filterOptions = {
    locations: toOptions(apiFilters?.locations),
    services: [] as { value: string; label: string }[],
    styles: [] as { value: string; label: string }[],
    propertyTypes: toOptions(apiFilters?.categories),
    completionYears: toOptions(apiFilters?.completionYears),
  };

  const projectItems =
    projectsSection?.projects
      ?.filter((p) => p.isVisible)
      .map((p) => ({
        id: p._id,
        title: p.title,
        propertyType: p.category || "",
        completionYear: Number(p.completionYear) || 0,
        location: p.location,
        description: p.shortDescription,
        image: {
          src: p.image?.url || "",
          alt: t(p.image?.alt),
        },
        href: p.href || `/projects/${p.slug}`,
        locationKey: p.location || "",
        serviceKeys: [],
        styleKey: "",
        propertyTypeKey: p.category || "",
      })) ?? [];

  /* =========================================================
     TESTIMONIALS
  ========================================================= */

  const testimonials = s?.testimonials;

  /* =========================================================
     BEFORE / AFTER
  ========================================================= */

  const beforeAfterItem = s?.beforeAfter?.items?.[0];

  /* =========================================================
     PARTNERSHIP
  ========================================================= */

  const partnership = s?.partnership;

  /* =========================================================
     FAQ
  ========================================================= */

  const faq = s?.faq;
  return (
    <main>
      {/* =====================================================
          HERO
      ===================================================== */}

      {hero?.isVisible && (
        <HeroBanner
          badge={t(hero.eyebrow)}
          heading={t(hero.heading)}
          description={t(hero.description)}
          breadcrumbs={hero.breadcrumbs?.map((b) => ({
            label: t(b.label),
            href: b.href || undefined,
          })) || []}
          imageSrc={hero.backgroundImage?.url || undefined}
        />
      )}

      {/* =====================================================
          ALL PROJECTS
      ===================================================== */}

      {projectsSection?.isVisible && (
        <AllProjectsSection
          heading={t(projectsSection.heading)}
          viewCaseStudyLabel={
            locale === "ar" ? "عرض دراسة الحالة" : "View Case Study"
          }
          loadMoreLabel={
            projectsSection.loadMoreLabel ||
            (locale === "ar" ? "عرض المزيد" : "Load More")
          }
          propertyTypeMeta={locale === "ar" ? "نوع العقار" : "Property Type"}
          completionYearMeta={
            locale === "ar" ? "سنة الإنجاز" : "Completion Year"
          }
          locationMeta={locale === "ar" ? "الموقع" : "Location"}
          noResultsLabel={
            locale === "ar"
              ? "لم يتم العثور على أي مشاريع"
              : "No projects found"
          }
          clearFiltersLabel={locale === "ar" ? "مسح الفلاتر" : "Clear Filters"}
          filterLabels={{
            locations: locale === "ar" ? "الموقع" : "Locations",
            services: locale === "ar" ? "الخدمات" : "Services",
            style: locale === "ar" ? "الأسلوب" : "Style",
            propertyType: locale === "ar" ? "الفئة" : "Category",
            completionYear: locale === "ar" ? "سنة الإنجاز" : "Year",
          }}
          filterOptions={filterOptions}
          projects={projectItems}
        />
      )}

      {/* =====================================================
          TESTIMONIALS
      ===================================================== */}

      {testimonials?.isVisible && (
        <TestimonialsSection
          label={t(testimonials.eyebrow)}
          heading={t(testimonials.heading)}
          testimonials={(testimonials.testimonials || [])
            .filter((item) => item.isVisible)
            .map((item, index) => ({
              id: index,
              name: t(item.clientName),
              quote: t(item.testimonial),
              image: item.image?.url || "",
            }))}
        />
      )}

      {/* =====================================================
          BEFORE / AFTER
      ===================================================== */}

      {beforeAfterItem?.isVisible &&
        beforeAfterItem?.beforeImage?.url &&
        beforeAfterItem?.afterImage?.url && (
          <BeforeAfterSection
            heading={t(s?.beforeAfter?.heading)}
            beforeImage={{
              src: beforeAfterItem.beforeImage.url,
              alt: t(beforeAfterItem.beforeImage.alt),
            }}
            afterImage={{
              src: beforeAfterItem.afterImage.url,
              alt: t(beforeAfterItem.afterImage.alt),
            }}
            beforeLabel={locale === "ar" ? "قبل" : "Before"}
            afterLabel={locale === "ar" ? "بعد" : "After"}
            handleLabel={
              locale === "ar"
                ? "اسحب للمقارنة"
                : "Drag to compare before and after"
            }
          />
        )}

      {/* =====================================================
          REFERRAL PARTNERSHIP
      ===================================================== */}

      {partnership?.isVisible && (
        <ReferralPartnerSection
          heading={t(partnership.heading)}
          description={t(partnership.description)}
          imageSrc={partnership.image?.url || ""}
          imageAlt={t(partnership.image?.alt)}
          ctaLabel={t(partnership.button?.label)}
          ctaHref={partnership.button?.href || "/"}
          steps={(partnership.steps || []).map((step) => ({
            label: t(step.title),
            iconName: step.icon,
          }))}
          benefits={[]}
        />
      )}

      {/* =====================================================
          FAQ
      ===================================================== */}

      {faq?.isVisible && (
        <FaqSection
          label={t(faq.eyebrow)}
          heading={t(faq.heading)}
          items={(faq.faqs || [])
            .filter((item) => item.isVisible)
            .map((item) => ({
              question: t(item.question),
              answer: t(item.answer),
            }))}
        />
      )}
      <JsonLdSchema globalSeo={cms?.globalSeo} pageSeo={cms?.seo} />
    </main>
  );
}
