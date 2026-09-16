import { HeroBanner } from "@/components/sections/HeroBanner";
import { getTranslations } from "next-intl/server";

import { getFaqConfig } from "@/app/config/space.config";
import { AllProjectsSection } from "@/components/sections/AllProjectsSection";
import {
  getProjectFilterOptions,
  getProjects,
} from "@/app/config/project.config";
import { ClientTestimonialSection } from "@/components/sections/ClientTestimonialSection";
import { ReferralPartnerSection } from "@/components/sections/ReferralPartnerSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { getReferralPartnerConfig } from "@/app/config/home.config";
export default async function BlogsPage() {
  const [tHero, tAllProjects, tReferral, tFaq] = await Promise.all([
    getTranslations("Hero"),
    getTranslations("AllProjects"),
    getTranslations("ReferralPartner"),
    getTranslations("Faq"),
  ]);
  const filterOptions = getProjectFilterOptions(tAllProjects);
  const projects = getProjects(tAllProjects);
  const referralPartnerConfig = getReferralPartnerConfig(tReferral);
  const faqConfig = getFaqConfig(tFaq);

  return (
    <main>
      <HeroBanner
        badge={tHero("badge")}
        heading={tHero("heading")}
        description={tHero("description")}
        cta={tHero("cta")}
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
      <ReferralPartnerSection {...referralPartnerConfig} />
      <FaqSection {...faqConfig} />
    </main>
  );
}
