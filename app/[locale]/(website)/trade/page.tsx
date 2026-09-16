import {
  getAwardsConfig,
  getDreamSpaceConfig,
  getJourneySteps,
  getReferralPartnerConfig,
  getServiceItems,
  getSignatureProjects,
} from "@/app/config/home.config";
import { AwardsSection } from "@/components/sections/AwardsSection";
import { HeroBanner } from "@/components/sections/HeroBanner";
import { MaterialInspirationSection } from "@/components/sections/MaterialInspirationSection";
import { ProjectJourneySection } from "@/components/sections/ProjectJourneySection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { SignatureProjectsSection } from "@/components/sections/SignatureProjectsSection";
import { StatsBarServer } from "@/components/sections/StatsBarServer";
import { FadeUp } from "@/components/ui/animate";
import { getTranslations } from "next-intl/server";
import { ReferralPartnerSection } from "@/components/sections/ReferralPartnerSection";
import { DreamSpaceSection } from "@/components/sections/DreamSpaceSection";
import { getFaqConfig } from "@/app/config/space.config";
import { FaqSection } from "@/components/sections/FaqSection";

export default async function TradePage() {
  const [
    tHero,
    tAwards,
    tDetail,
    tJourney,
    tprojects,
    tServices,
    tReferral,
    tDreamSpace,
    tFaq,
  ] = await Promise.all([
    getTranslations("Hero"),
    getTranslations("Awards"),
    getTranslations("SpaceDetail"),
    getTranslations("ProjectJourney"),
    getTranslations("SignatureProject"),
    getTranslations("Services"),
    getTranslations("ReferralPartner"),
    getTranslations("DreamSpace"),
    getTranslations("Faq"),
  ]);
  const awardsConfig = getAwardsConfig(tAwards);
  const journeySteps = getJourneySteps(tJourney);
  const signatureProjects = getSignatureProjects(tprojects);
  const serviceItems = getServiceItems(tServices);
  const referralPartnerConfig = getReferralPartnerConfig(tReferral);
  const dreamSpaceConfig = getDreamSpaceConfig(tDreamSpace);
  const faqConfig = getFaqConfig(tFaq);
  return (
    <main>
      <HeroBanner
        badge={tHero("badge")}
        heading={tHero("heading")}
        description={tHero("description")}
        cta={tHero("cta")}
      />
      <FadeUp>
        <AwardsSection {...awardsConfig} className="order-1 lg:order-2" />
      </FadeUp>
      <MaterialInspirationSection
        heading={tDetail("materialInspirationHeading")}
        items={[
          {
            src: "/assets/images/Banner.webp",
            alt: "img-01",
            label: "Marble",
          },
          {
            src: "/assets/images/why-t1.webp",
            alt: "img-02",
            label: "Oak",
          },
          {
            src: "/assets/images/why-t1.webp",
            alt: "img-03",
            label: "bOak",
          },
          {
            src: "/assets/images/Banner.webp",
            alt: "img-01",
            label: "Marble",
          },
        ]}
      />
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
      <FadeUp>
        <StatsBarServer namespace="Stats" />
      </FadeUp>
      <SignatureProjectsSection
        heading={tprojects("heading")}
        viewAllLabel={tprojects("viewAllLabel")}
        viewAllHref="/projects"
        projects={signatureProjects}
      />
      <ServicesSection
        label={tServices("label")}
        heading={tServices("heading")}
        services={serviceItems}
      />
      <FadeUp>
        <StatsBarServer namespace="Stats" />
      </FadeUp>
      <ServicesSection
        label={tServices("label")}
        heading={tServices("heading")}
        services={serviceItems}
      />
      <FadeUp>
        <ReferralPartnerSection {...referralPartnerConfig} />
      </FadeUp>
      <SignatureProjectsSection
        heading={tprojects("heading")}
        viewAllLabel={tprojects("viewAllLabel")}
        viewAllHref="/projects"
        projects={signatureProjects}
      />
      <FadeUp>
        <ReferralPartnerSection {...referralPartnerConfig} />
      </FadeUp>
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
      <FaqSection {...faqConfig} />
    </main>
  );
}
