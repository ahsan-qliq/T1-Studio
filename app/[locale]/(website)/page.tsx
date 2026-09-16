import {
  getAccordionSpaces,
  getServiceItems,
  getSignatureProjects,
  getComparisonColumns,
  getJourneySteps,
  getDreamSpaceConfig,
  getReferralPartnerConfig,
  getTestimonialsConfig,
  getAwardsConfig,
  getBlogConfig,
  getLocationColumns,
} from "@/app/config/home.config";
import { AwardsSection } from "@/components/sections/AwardsSection";
import { BlogSection } from "@/components/sections/BlogSection";
import { LocationLinksSection } from "@/components/sections/LocationLinksSection";
import { ComparisonSection } from "@/components/sections/ComparisonSection";
import { DreamSpaceSection } from "@/components/sections/DreamSpaceSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { HeroBanner } from "@/components/sections/HeroBanner";
import { ProjectJourneySection } from "@/components/sections/ProjectJourneySection";
import { ReferralPartnerSection } from "@/components/sections/ReferralPartnerSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { SignatureProjectsSection } from "@/components/sections/SignatureProjectsSection";
import { SpacesAccordionSection } from "@/components/sections/SpacesAccordionSection";
import { StatsBarServer } from "@/components/sections/StatsBarServer";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { FadeUp } from "@/components/ui/animate";
import { getTranslations } from "next-intl/server";
import { getFaqConfig } from "@/app/config/space.config";

export default async function HomePage() {
  const [
    tHero,
    tSpaces,
    tprojects,
    tComparison,
    tJourney,
    tReferral,
    tDreamSpace,
    tTestimonials,
    tAwards,
    tBlog,
    tServices,
    tFaq,
    tLocationLinks,
  ] = await Promise.all([
    getTranslations("Hero"),
    getTranslations("FeaturedSpaces"),
    getTranslations("SignatureProject"),
    getTranslations("Comparison"),
    getTranslations("ProjectJourney"),
    getTranslations("ReferralPartner"),
    getTranslations("DreamSpace"),
    getTranslations("Testimonials"),
    getTranslations("Awards"),
    getTranslations("Blog"),
    getTranslations("Services"),
    getTranslations("Faq"),
    getTranslations("LocationLinks"),
  ]);

  const accordionSpaces = getAccordionSpaces(tSpaces);
  const serviceItems = getServiceItems(tServices);
  const signatureProjects = getSignatureProjects(tprojects);
  const comparisonColumns = getComparisonColumns(tComparison);
  const journeySteps = getJourneySteps(tJourney);
  const dreamSpaceConfig = getDreamSpaceConfig(tDreamSpace);
  const referralPartnerConfig = getReferralPartnerConfig(tReferral);
  const testimonialsConfig = getTestimonialsConfig(tTestimonials);
  const awardsConfig = getAwardsConfig(tAwards);
  const blogConfig = getBlogConfig(tBlog);
  const faqConfig = getFaqConfig(tFaq);
  const locationColumns = getLocationColumns(tLocationLinks);

  return (
    <main>
      {/* Hero — entrance animation handled internally */}
      <HeroBanner
        badge={tHero("badge")}
        heading={tHero("heading")}
        description={tHero("description")}
        cta={tHero("cta")}
      />

      {/* Stats — staggered scroll reveal per item */}
      <StatsBarServer namespace="Stats" />

      {/* Services — stagger animation handled internally */}
      <ServicesSection
        label={tServices("label")}
        heading={tServices("heading")}
        services={serviceItems}
      />

      {/* Spaces accordion — scroll reveal handled internally */}
      <SpacesAccordionSection
        heading={tSpaces("heading")}
        viewAllLabel={tSpaces("viewAllLabel")}
        viewAllHref="/spaces"
        spaces={accordionSpaces}
      />

      {/* Signature projects — stagger animation handled internally */}
      <SignatureProjectsSection
        heading={tprojects("heading")}
        viewAllLabel={tprojects("viewAllLabel")}
        viewAllHref="/projects"
        projects={signatureProjects}
      />

      {/* Journey — scroll reveal */}
      <FadeUp>
        <ProjectJourneySection
          label={tJourney("label")}
          heading={tJourney("heading")}
          advantageLabel={tJourney("advantageLabel")}
          prevLabel={tJourney("prevLabel")}
          nextLabel={tJourney("nextLabel")}
          steps={journeySteps}
        />
      </FadeUp>

      {/* Comparison — columns slide in from different directions */}
      <ComparisonSection
        heading={tComparison("heading")}
        columns={comparisonColumns}
      />

      {/* Testimonials — scroll reveal handled internally */}
      <TestimonialsSection
        {...testimonialsConfig}
        testimonials={testimonialsConfig.testimonials.map((testimonial) => ({
          ...testimonial,
          role: "",
          rating: 5,
          description: testimonial.quote,
        }))}
      />

      {/* Dream space — split slide-in handled internally */}
      <DreamSpaceSection
        heading={tDreamSpace("heading")}
        imageSrc={dreamSpaceConfig.imageSrc}
        imageAlt={tDreamSpace("imageAlt")}
        audienceTabs={dreamSpaceConfig.audienceTabs}
        propertyTypeLabel={tDreamSpace("propertyTypeLabel")}
        propertyTypeOptions={dreamSpaceConfig.propertyTypeOptions}
        spaceRequiredLabel={tDreamSpace("spaceRequiredLabel")}
        spaceRequiredOptions={dreamSpaceConfig.spaceRequiredOptions}
        typeOfServiceLabel={tDreamSpace("typeOfServiceLabel")}
        typeOfServiceOptions={dreamSpaceConfig.typeOfServiceOptions}
        timelineLabel={tDreamSpace("timelineLabel")}
        timelineOptions={dreamSpaceConfig.timelineOptions}
        firstNameLabel={tDreamSpace("firstNameLabel")}
        lastNameLabel={tDreamSpace("lastNameLabel")}
        emailLabel={tDreamSpace("emailLabel")}
        phoneLabel={tDreamSpace("phoneLabel")}
        submitLabel={tDreamSpace("submitLabel")}
      />

      {/* Referral — animated internally */}
      <ReferralPartnerSection {...referralPartnerConfig} />

      {/* Awards — staggered logos */}
      <AwardsSection {...awardsConfig} />

      {/* Blog — stagger animation handled internally */}
      <BlogSection {...blogConfig} />

      <FaqSection {...faqConfig} />

      {/* Location links — SEO-focused service × city grid */}
      <LocationLinksSection columns={locationColumns} />
    </main>
  );
}
