import { getBlogsPageCms } from "@/lib/cms/blogs";
import { HeroBanner } from "@/components/sections/HeroBanner";
import { AllProjectsSection } from "@/components/sections/AllProjectsSection";
import { ReferralPartnerSection } from "@/components/sections/ReferralPartnerSection";
import { FaqSection } from "@/components/sections/FaqSection";

export const revalidate = 3600;

export default async function BlogsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const cms = await getBlogsPageCms(locale);
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
