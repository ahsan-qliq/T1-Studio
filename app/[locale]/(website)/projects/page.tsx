import { getTranslations } from "next-intl/server";
import { HeroBanner } from "@/components/sections/HeroBanner";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { AllProjectsSection } from "@/components/sections/AllProjectsSection";
import { BeforeAfterSection } from "@/components/sections/BeforeAfterSection";
import {
  getReferralPartnerConfig,
  getTestimonialsConfig,
} from "@/app/config/home.config";
import {
  getProjectFilterOptions,
  getProjects,
} from "@/app/config/project.config";
import { ReferralPartnerSection } from "@/components/sections/ReferralPartnerSection";
import { getFaqConfig } from "@/app/config/space.config";
import { FaqSection } from "@/components/sections/FaqSection";

export default async function ProjectsPage() {
  const [
    tHeroProject,
    tTestimonials,
    tAllProjects,
    tBeforeAfter,
    tReferral,
    tFaq,
  ] = await Promise.all([
    getTranslations("HeroProject"),
    getTranslations("Testimonials"),
    getTranslations("AllProjects"),
    getTranslations("BeforeAfter"),
    getTranslations("ReferralPartner"),
    getTranslations("Faq"),
  ]);

  const testimonialsConfig = getTestimonialsConfig(tTestimonials);
  const filterOptions = getProjectFilterOptions(tAllProjects);
  const projects = getProjects(tAllProjects);
  const referralPartnerConfig = getReferralPartnerConfig(tReferral);
  const faqConfig = getFaqConfig(tFaq);
  return (
    <main>
      <HeroBanner
        badge={tHeroProject("badge")}
        heading={tHeroProject("heading")}
        description={tHeroProject("description")}
        cta={tHeroProject("cta")}
      />
      <AllProjectsSection
        heading={tAllProjects("heading")}
        viewCaseStudyLabel={tAllProjects("viewCaseStudyLabel")}
        loadMoreLabel={tAllProjects("loadMore")}
        propertyTypeMeta={tAllProjects("propertyTypeMeta")}
        completionYearMeta={tAllProjects("completionYearMeta")}
        locationMeta={tAllProjects("locationMeta")}
        noResultsLabel={tAllProjects("noResults")}
        clearFiltersLabel={tAllProjects("clearFilters")}
        filterLabels={{
          locations: tAllProjects("locationsLabel"),
          services: tAllProjects("servicesLabel"),
          style: tAllProjects("styleLabel"),
          propertyType: tAllProjects("propertyTypeLabel"),
        }}
        filterOptions={filterOptions}
        projects={projects}
      />
      <TestimonialsSection {...testimonialsConfig} />
      <BeforeAfterSection
        heading={tBeforeAfter("heading")}
        beforeLabel={tBeforeAfter("beforeLabel")}
        afterLabel={tBeforeAfter("afterLabel")}
        handleLabel={tBeforeAfter("handleLabel")}
        beforeImage={{
          src: "/assets/images/Banner.webp",
          alt: tBeforeAfter("beforeLabel"),
        }}
        afterImage={{
          src: "/assets/images/growth.webp",
          alt: tBeforeAfter("afterLabel"),
        }}
      />
      <ReferralPartnerSection {...referralPartnerConfig} />
      <FaqSection {...faqConfig} />
    </main>
  );
}
