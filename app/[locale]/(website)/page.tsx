import type { Metadata } from "next";
import {
  pick,
  resolveHero,
  resolveStats,
  resolveServices,
  resolveAccordionSpaces,
  resolveSignatureProjects,
  resolveJourney,
  resolveComparison,
  resolveTestimonials,
  getDreamSpaceConfig,
  resolveReferral,
  resolveAwards,
  resolveBlog,
  resolveFaq,
} from "@/app/config/home.config";
import { AwardsSection } from "@/components/sections/AwardsSection";
import { BlogSection } from "@/components/sections/BlogSection";
import { ComparisonSection } from "@/components/sections/ComparisonSection";
import { DreamSpaceSection } from "@/components/sections/DreamSpaceSection";
import { JsonLdSchema } from "@/components/JsonLdSchema";
import { FaqSection } from "@/components/sections/FaqSection";
import { HeroBanner } from "@/components/sections/HeroBanner";
import { ProjectJourneySection } from "@/components/sections/ProjectJourneySection";
import { ReferralPartnerSection } from "@/components/sections/ReferralPartnerSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { SignatureProjectsSection } from "@/components/sections/SignatureProjectsSection";
import { SpacesAccordionSection } from "@/components/sections/SpacesAccordionSection";
import { StatsBar } from "@/components/sections/StatsBar";
import { StatsBarServer } from "@/components/sections/StatsBarServer";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { FadeUp } from "@/components/ui/animate";
import { getTranslations } from "next-intl/server";
import { getHomePageCms } from "@/lib/cms/home";
import type { CmsBilingualText } from "@/lib/cms/types";

export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const cms = await getHomePageCms(locale);
  const seo = cms?.seo;
  return {
    ...(seo?.metaTitle && { title: seo.metaTitle }),
    ...(seo?.metaDescription && { description: seo.metaDescription }),
    alternates: {
      canonical: seo?.canonicalUrl ?? (locale === "ar" ? "/ar" : "/"),
    },
    ...(seo?.ogImage?.url && {
      openGraph: { images: [{ url: seo.ogImage.url }] },
      twitter: { images: [seo.ogImage.url] },
    }),
    ...(seo?.noIndex || seo?.noFollow
      ? { robots: { index: !seo.noIndex, follow: !seo.noFollow } }
      : {}),
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const [
    cms,
    tHero,
    tSpaces,
    tProjects,
    tComparison,
    tJourney,
    tReferral,
    tDreamSpace,
    tTestimonials,
    tAwards,
    tBlog,
    tServices,
    tFaq,
    tStats,
  ] = await Promise.all([
    getHomePageCms(locale),
    getTranslations({ locale, namespace: "Hero" }),
    getTranslations({ locale, namespace: "FeaturedSpaces" }),
    getTranslations({ locale, namespace: "SignatureProject" }),
    getTranslations({ locale, namespace: "Comparison" }),
    getTranslations({ locale, namespace: "ProjectJourney" }),
    getTranslations({ locale, namespace: "ReferralPartner" }),
    getTranslations({ locale, namespace: "DreamSpace" }),
    getTranslations({ locale, namespace: "Testimonials" }),
    getTranslations({ locale, namespace: "Awards" }),
    getTranslations({ locale, namespace: "Blog" }),
    getTranslations({ locale, namespace: "Services" }),
    getTranslations({ locale, namespace: "Faq" }),
    getTranslations({ locale, namespace: "Stats" }),
  ]);

  const p = (field: CmsBilingualText | string | undefined) =>
    pick(field, locale);
  const s = cms?.sections;

  const heroProps = resolveHero(s?.hero, p, tHero);
  const statsItems = resolveStats(s?.stats, p);
  const servicesProps = resolveServices(s?.services, p, tServices);
  const spacesProps = resolveAccordionSpaces(s?.featuredSpaces, p, tSpaces);
  const projectsProps = resolveSignatureProjects(s?.signatureProjects, p, tProjects);
  const journeyProps = resolveJourney(s?.journey, p, tJourney);
  const comparisonProps = resolveComparison(s?.whyChooseT1, p, tComparison);
  const testimonialsProps = resolveTestimonials(s?.testimonials, p, tTestimonials);
  const dreamSpaceProps = getDreamSpaceConfig(tDreamSpace);
  const referralProps = resolveReferral(s?.partnership, p, tReferral);
  const awardsProps = resolveAwards(s?.awardsRecognition, p, tAwards);
  const blogProps = resolveBlog(s?.designTips, p, tBlog);
  const faqProps = resolveFaq(s?.faq, p, tFaq);

  return (
    <main>
      <HeroBanner {...heroProps} />

      {statsItems ? (
        <StatsBar items={statsItems} sectionLabel={tStats("sectionLabel")} />
      ) : (
        <StatsBarServer namespace="Stats" />
      )}

      <ServicesSection {...servicesProps} />

      <SpacesAccordionSection {...spacesProps} viewAllHref="/spaces" />

      <SignatureProjectsSection {...projectsProps} viewAllHref="/projects" />

      <FadeUp>
        <ProjectJourneySection
          {...journeyProps}
          advantageLabel={tJourney("advantageLabel")}
          prevLabel={tJourney("prevLabel")}
          nextLabel={tJourney("nextLabel")}
        />
      </FadeUp>

      <ComparisonSection {...comparisonProps} />

      <TestimonialsSection {...testimonialsProps} />

      <DreamSpaceSection {...dreamSpaceProps} />

      <ReferralPartnerSection {...referralProps} />

      <FadeUp className="bg-secondary">
        <AwardsSection {...awardsProps} />
      </FadeUp>

      <BlogSection {...blogProps} />

      <FaqSection {...faqProps} />

      {/* <LocationLinksSection columns={locationColumns} /> */}

      <JsonLdSchema globalSeo={cms?.globalSeo} pageSeo={cms?.seo} />
    </main>
  );
}
