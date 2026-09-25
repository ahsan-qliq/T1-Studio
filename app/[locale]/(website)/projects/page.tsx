import { getProjectsPageCms } from "@/lib/cms/projects";
import { HeroBanner } from "@/components/sections/HeroBanner";
import { AllProjectsSection } from "@/components/sections/AllProjectsSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { BeforeAfterSection } from "@/components/sections/BeforeAfterSection";
import { ReferralPartnerSection } from "@/components/sections/ReferralPartnerSection";
import { FaqSection } from "@/components/sections/FaqSection";

export const revalidate = 3600;

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const cms = await getProjectsPageCms(locale);
  const s = cms?.sections;

  const listing = s?.listing;

  return (
    <main>
      {s?.hero?.isVisible && (
        <HeroBanner
          badge={s.hero.eyebrow as string}
          heading={s.hero.heading as string}
          description={s.hero.description as string}
          cta={s.hero.primaryButton.label as string}
          imageSrc={s.hero.backgroundImage.url || undefined}
        />
      )}

      {listing?.isVisible && (
        <AllProjectsSection
          heading={listing.heading}
          viewCaseStudyLabel={listing.viewCaseStudyLabel}
          loadMoreLabel={listing.loadMoreLabel}
          propertyTypeMeta={listing.propertyTypeMeta}
          completionYearMeta={listing.completionYearMeta}
          locationMeta={listing.locationMeta}
          noResultsLabel={listing.noResultsLabel}
          clearFiltersLabel={listing.clearFiltersLabel}
          filterLabels={listing.filterLabels}
          filterOptions={{
            locations: listing.filterOptions.locations.map((o) => ({
              value: o.value,
              label: o.label,
            })),
            services: listing.filterOptions.services.map((o) => ({
              value: o.value,
              label: o.label,
            })),
            styles: listing.filterOptions.styles.map((o) => ({
              value: o.value,
              label: o.label,
            })),
            propertyTypes: listing.filterOptions.propertyTypes.map((o) => ({
              value: o.value,
              label: o.label,
            })),
          }}
          projects={listing.projects
            .filter((p) => p.isVisible)
            .map((p) => ({
              id: p._id,
              title: p.title,
              propertyType: p.propertyType,
              completionYear: p.completionYear,
              location: p.location,
              description: p.description,
              image: { src: p.image.url, alt: p.image.alt as string },
              href: p.href,
              locationKey: p.locationKey,
              serviceKeys: p.serviceKeys,
              styleKey: p.styleKey,
              propertyTypeKey: p.propertyTypeKey,
            }))}
        />
      )}

      {s?.testimonials?.isVisible && (
        <TestimonialsSection
          label={s.testimonials.eyebrow as string}
          heading={s.testimonials.heading as string}
          testimonials={s.testimonials.testimonials
            .filter((t) => t.isVisible)
            .map((t, i) => ({
              id: i,
              name: t.clientName as string,
              quote: t.testimonial as string,
              image: t.image.url,
            }))}
        />
      )}

      {s?.beforeAfter?.isVisible && (
        <BeforeAfterSection
          heading={s.beforeAfter.heading}
          beforeLabel={s.beforeAfter.beforeLabel}
          afterLabel={s.beforeAfter.afterLabel}
          handleLabel={s.beforeAfter.handleLabel}
          beforeImage={{
            src: s.beforeAfter.beforeImage.url,
            alt: s.beforeAfter.beforeImage.alt as string,
          }}
          afterImage={{
            src: s.beforeAfter.afterImage.url,
            alt: s.beforeAfter.afterImage.alt as string,
          }}
        />
      )}

      {s?.partnership?.isVisible && (
        <ReferralPartnerSection
          heading={s.partnership.heading as string}
          description={s.partnership.description as string}
          imageSrc={s.partnership.image.url}
          imageAlt={s.partnership.image.alt as string}
          ctaLabel={s.partnership.button.label as string}
          ctaHref={s.partnership.button.href || "/"}
          steps={s.partnership.steps.map((step) => ({
            label: step.title as string,
            iconName: step.icon,
          }))}
          benefits={[]}
        />
      )}

      {s?.faq?.isVisible && (
        <FaqSection
          label={s.faq.eyebrow as string}
          heading={s.faq.heading as string}
          items={s.faq.faqs
            .filter((f) => f.isVisible)
            .map((f) => ({
              question: f.question as string,
              answer: f.answer as string,
            }))}
        />
      )}
    </main>
  );
}
