import { getTranslations } from "next-intl/server";
import { HeroBanner } from "@/components/sections/HeroBanner";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { getDreamSpaceConfig, getServiceItems } from "@/app/config/home.config";
import { DreamSpaceSection } from "@/components/sections/DreamSpaceSection";
import { getFaqConfig } from "@/app/config/space.config";
import { FaqSection } from "@/components/sections/FaqSection";
import { MapSection } from "@/components/sections/MapSection";


export default async function ContactPage() {
  const [tHero, tServices, tDreamSpace, tFaq] = await Promise.all([
    getTranslations("Hero"),
    getTranslations("Services"),
    getTranslations("DreamSpace"),
    getTranslations("Faq"),
  ]);
  const serviceItems = getServiceItems(tServices);
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
      <ServicesSection
        label={tServices("label")}
        heading={tServices("heading")}
        services={serviceItems}
      />

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
                  <MapSection
        embedUrl="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3605.8!2d55.5136!3d25.4052!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f5b0e4b4b4b4b%3A0x0!2sAjman+Corniche!5e0!3m2!1sen!2sae!4v1000000000000"
        title="T1 Studio location — Ajman Corniche, UAE"
        height={480}
      />
      <FaqSection {...faqConfig} />

    </main>
  );
}
