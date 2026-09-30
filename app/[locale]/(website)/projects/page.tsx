// import { getProjectsPageCms } from "@/lib/cms/projects";
// import { HeroBanner } from "@/components/sections/HeroBanner";
// import { AllProjectsSection } from "@/components/sections/AllProjectsSection";
// import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
// import { BeforeAfterSection } from "@/components/sections/BeforeAfterSection";
// import { ReferralPartnerSection } from "@/components/sections/ReferralPartnerSection";
// import { FaqSection } from "@/components/sections/FaqSection";

// export const revalidate = 3600;

// export default async function ProjectsPage({
//   params,
// }: {
//   params: Promise<{ locale: string }>;
// }) {
//   const { locale } = await params;
//   const cms = await getProjectsPageCms(locale);
//   const s = cms?.sections;

//   const listing = s?.listing;

//   return (
//     <main>
//       {s?.hero?.isVisible && (
//         <HeroBanner
//           badge={s.hero.eyebrow as string}
//           heading={s.hero.heading as string}
//           description={s.hero.description as string}
//           cta={s.hero.primaryButton.label as string}
//           imageSrc={s.hero.backgroundImage.url || undefined}
//         />
//       )}

//       {listing?.isVisible && (
//         <AllProjectsSection
//           heading={listing.heading}
//           viewCaseStudyLabel={listing.viewCaseStudyLabel}
//           loadMoreLabel={listing.loadMoreLabel}
//           propertyTypeMeta={listing.propertyTypeMeta}
//           completionYearMeta={listing.completionYearMeta}
//           locationMeta={listing.locationMeta}
//           noResultsLabel={listing.noResultsLabel}
//           clearFiltersLabel={listing.clearFiltersLabel}
//           filterLabels={listing.filterLabels}
//           filterOptions={{
//             locations: listing.filterOptions.locations.map((o) => ({
//               value: o.value,
//               label: o.label,
//             })),
//             services: listing.filterOptions.services.map((o) => ({
//               value: o.value,
//               label: o.label,
//             })),
//             styles: listing.filterOptions.styles.map((o) => ({
//               value: o.value,
//               label: o.label,
//             })),
//             propertyTypes: listing.filterOptions.propertyTypes.map((o) => ({
//               value: o.value,
//               label: o.label,
//             })),
//           }}
//           projects={listing.projects
//             .filter((p) => p.isVisible)
//             .map((p) => ({
//               id: p._id,
//               title: p.title,
//               propertyType: p.propertyType,
//               completionYear: p.completionYear,
//               location: p.location,
//               description: p.description,
//               image: { src: p.image.url, alt: p.image.alt as string },
//               href: p.href,
//               locationKey: p.locationKey,
//               serviceKeys: p.serviceKeys,
//               styleKey: p.styleKey,
//               propertyTypeKey: p.propertyTypeKey,
//             }))}
//         />
//       )}

//       {s?.testimonials?.isVisible && (
//         <TestimonialsSection
//           label={s.testimonials.eyebrow as string}
//           heading={s.testimonials.heading as string}
//           testimonials={s.testimonials.testimonials
//             .filter((t) => t.isVisible)
//             .map((t, i) => ({
//               id: i,
//               name: t.clientName as string,
//               quote: t.testimonial as string,
//               image: t.image.url,
//             }))}
//         />
//       )}

//       {s?.beforeAfter?.isVisible && (
//         <BeforeAfterSection
//           heading={s.beforeAfter.heading}
//           beforeLabel={s.beforeAfter.beforeLabel}
//           afterLabel={s.beforeAfter.afterLabel}
//           handleLabel={s.beforeAfter.handleLabel}
//           beforeImage={{
//             src: s.beforeAfter.items?.[0].beforeImage.url,
//             alt: s.beforeAfter.items?.[0].beforeImage.alt as string,
//           }}
//           afterImage={{
//             src: s.beforeAfter.items?.[0].afterImage.url,
//             alt: s.beforeAfter.items?.[0].afterImage.alt as string,
//           }}
//         />
//       )}

//       {s?.partnership?.isVisible && (
//         <ReferralPartnerSection
//           heading={s.partnership.heading as string}
//           description={s.partnership.description as string}
//           imageSrc={s.partnership.image.url}
//           imageAlt={s.partnership.image.alt as string}
//           ctaLabel={s.partnership.button.label as string}
//           ctaHref={s.partnership.button.href || "/"}
//           steps={s.partnership.steps.map((step) => ({
//             label: step.title as string,
//             iconName: step.icon,
//           }))}
//           benefits={[]}
//         />
//       )}

//       {s?.faq?.isVisible && (
//         <FaqSection
//           label={s.faq.eyebrow as string}
//           heading={s.faq.heading as string}
//           items={s.faq.faqs
//             .filter((f) => f.isVisible)
//             .map((f) => ({
//               question: f.question as string,
//               answer: f.answer as string,
//             }))}
//         />
//       )}
//     </main>
//   );
// }

import { getProjectsPageCms } from "@/lib/cms/projects";
import { HeroBanner } from "@/components/sections/HeroBanner";
import { AllProjectsSection } from "@/components/sections/AllProjectsSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { BeforeAfterSection } from "@/components/sections/BeforeAfterSection";
import { ReferralPartnerSection } from "@/components/sections/ReferralPartnerSection";
import { FaqSection } from "@/components/sections/FaqSection";

export const revalidate = 3600;

type Locale = "en" | "ar";

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;

  const locale: Locale = rawLocale === "ar" ? "ar" : "en";

  const cms = await getProjectsPageCms(locale);
  const s = cms?.sections;

  /**
   * CMS localized fields are:
   * {
   *   en: "...",
   *   ar: "..."
   * }
   */
  const t = (value: any): string => {
    if (!value) return "";

    if (typeof value === "string") {
      return value;
    }

    return value?.[locale] ?? value?.en ?? "";
  };

  /* =========================================================
     HERO
  ========================================================= */

  const hero = s?.hero;

  /* =========================================================
     PROJECTS
  ========================================================= */

  const projectsSection = s?.projects;

  /**
   * AllProjectsSection expects:
   *
   * locationKey
   * serviceKeys
   * styleKey
   * propertyTypeKey
   *
   * But the current CMS project response doesn't provide these.
   *
   * So we derive propertyTypeKey from category and locationKey
   * from the location for now.
   *
   * If your CMS later adds service/style/filter keys, map them here.
   */
  const projectItems =
    projectsSection?.projects
      ?.filter((p) => p.isVisible)
      .map((p) => ({
        id: p._id,

        title: t(p.title),

        propertyType: p.category || "",

        /**
         * CMS currently doesn't provide completionYear.
         * Keep 0 rather than passing undefined to a number prop.
         */
        completionYear: 0,

        location: t(p.location),

        description: t(p.description),

        image: {
          src: p.image?.url || "",
          alt: t(p.image?.alt),
        },

        href: p.href || `/projects/${p.slug}`,

        /**
         * Used by AllProjectsSection filtering.
         */
        locationKey: t(p.location),

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
          cta={t(hero.primaryButton?.label)}
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

            propertyType: locale === "ar" ? "نوع العقار" : "Property Type",
          }}
          filterOptions={{
            locations: [],
            services: [],
            styles: [],
            propertyTypes: [],
          }}
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
    </main>
  );
}
