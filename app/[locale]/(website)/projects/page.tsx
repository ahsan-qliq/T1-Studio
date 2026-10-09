import type { Metadata } from "next";
import { getProjectsPageCms } from "@/lib/cms/projects";
import { JsonLdSchema } from "@/components/JsonLdSchema";
import { HeroBanner } from "@/components/sections/HeroBanner";
import { AllProjectsSection } from "@/components/sections/AllProjectsSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { BeforeAfterSection } from "@/components/sections/BeforeAfterSection";
import { ReferralPartnerSection } from "@/components/sections/ReferralPartnerSection";
import { FaqSection } from "@/components/sections/FaqSection";
import {
  getText,
  mapProjectsFilterOptions,
  mapProjectItems,
  mapProjectsAllProjectsLabels,
  mapProjectsTestimonials,
  mapProjectsBeforeAfter,
  mapProjectsPartnership,
  mapProjectsFaq,
} from "@/app/config/projects.config";

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
    alternates: { canonical: seo?.canonicalUrl ?? `${locale === "ar" ? "/ar" : ""}/projects` },
    ...(seo?.ogImage?.url && {
      openGraph: { images: [{ url: seo.ogImage.url }] },
      twitter: { images: [seo.ogImage.url] },
    }),
  };
}

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const cms = await getProjectsPageCms(locale);
  const s = cms?.sections;

  const hero = s?.hero;
  const projectsSection = s?.projects;
  const filterOptions = mapProjectsFilterOptions(cms?.filters);
  const projectItems = projectsSection ? mapProjectItems(projectsSection, locale) : [];

  const ba = s?.beforeAfter ? mapProjectsBeforeAfter(s.beforeAfter, locale) : null;

  return (
    <main>
      {hero?.isVisible && (
        <HeroBanner
          badge={getText(hero.eyebrow, locale)}
          heading={getText(hero.heading, locale)}
          description={getText(hero.description, locale)}
          breadcrumbs={hero.breadcrumbs?.map((b) => ({
            label: getText(b.label, locale),
            href: b.href || undefined,
          })) || []}
          imageSrc={hero.backgroundImage?.url || undefined}
        />
      )}

      {projectsSection?.isVisible && (
        <AllProjectsSection
          {...mapProjectsAllProjectsLabels(projectsSection, locale)}
          filterOptions={filterOptions}
          projects={projectItems}
        />
      )}

      {s?.testimonials?.isVisible && (
        <TestimonialsSection {...mapProjectsTestimonials(s.testimonials, locale)} />
      )}

      {ba?.item?.isVisible && ba.item.beforeImage?.url && ba.item.afterImage?.url && (
        <BeforeAfterSection
          heading={ba.heading}
          beforeImage={{
            src: ba.item.beforeImage.url,
            alt: getText(ba.item.beforeImage.alt, locale),
          }}
          afterImage={{
            src: ba.item.afterImage.url,
            alt: getText(ba.item.afterImage.alt, locale),
          }}
          beforeLabel={ba.beforeLabel}
          afterLabel={ba.afterLabel}
          handleLabel={ba.handleLabel}
        />
      )}

      {s?.partnership?.isVisible && (
        <ReferralPartnerSection {...mapProjectsPartnership(s.partnership, locale)} />
      )}

      {s?.faq?.isVisible && (
        <FaqSection {...mapProjectsFaq(s.faq, locale)} />
      )}
      <JsonLdSchema globalSeo={cms?.globalSeo} pageSeo={cms?.seo} />
    </main>
  );
}
