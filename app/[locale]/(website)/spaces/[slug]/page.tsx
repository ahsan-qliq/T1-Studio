import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { HeroBanner } from "@/components/sections/HeroBanner";
import { SpaceIntroSection } from "@/components/sections/SpaceIntroSection";
import { SpaceApproachSection } from "@/components/sections/SpaceApproachSection";
import { ImageCarouselSection } from "@/components/sections/ImageCarouselSection";
import { SpacesAccordionSection } from "@/components/sections/SpacesAccordionSection";
import { ProjectJourneySection } from "@/components/sections/ProjectJourneySection";
import { ReferralPartnerSection } from "@/components/sections/ReferralPartnerSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { FadeUp } from "@/components/ui/animate";
import {
  getAccordionSpaces,
  getAwardsConfig,
  getDreamSpaceConfig,
  getJourneySteps,
  getReferralPartnerConfig,
  getSignatureProjects,
} from "@/app/config/home.config";
import {
  getFaqConfig,
  getSpaceDetailConfig,
  SPACE_SLUGS,
} from "@/app/config/space.config";
import { AwardsSection } from "@/components/sections/AwardsSection";
import { SignatureProjectsSection } from "@/components/sections/SignatureProjectsSection";
import { DreamSpaceSection } from "@/components/sections/DreamSpaceSection";
import { MaterialInspirationSection } from "@/components/sections/MaterialInspirationSection";

interface Props {
  params: Promise<{ slug: string; locale: string }>;
}

export function generateStaticParams() {
  return SPACE_SLUGS.map((slug) => ({ slug }));
}

export default async function SpaceDetailPage({ params }: Props) {
  const { slug } = await params;

  const [
    tDetail,
    tSpaces,
    tJourney,
    tReferral,
    tFaq,
    tAwards,
    tProjects,
    tDreamSpace,
  ] = await Promise.all([
    getTranslations("SpaceDetail"),
    getTranslations("FeaturedSpaces"),
    getTranslations("ProjectJourney"),
    getTranslations("ReferralPartner"),
    getTranslations("Faq"),
    getTranslations("Awards"),
    getTranslations("SignatureProject"),
    getTranslations("DreamSpace"),
  ]);

  const spaceDetail = getSpaceDetailConfig(slug, tDetail);
  if (!spaceDetail) notFound();

  const accordionSpaces = getAccordionSpaces(tSpaces).filter(
    (s) => s.id !== slug && s.id !== `${slug}s`,
  );
  const journeySteps = getJourneySteps(tJourney);
  const referralPartnerConfig = getReferralPartnerConfig(tReferral);
  const faqConfig = getFaqConfig(tFaq);
  const awardsConfig = getAwardsConfig(tAwards);
  const signatureProjects = getSignatureProjects(tProjects);
  const dreamSpaceConfig = getDreamSpaceConfig(tDreamSpace);

  const gallerySlides = [
    { src: "/assets/images/spaces.png", alt: spaceDetail.heroImageAlt },
    { src: "/assets/images/why-t1.webp", alt: spaceDetail.heroImageAlt },
    { src: "/assets/images/Banner.webp", alt: spaceDetail.heroImageAlt },
  ];

  return (
    <main>
      <HeroBanner
        badge={tDetail("badge")}
        heading={spaceDetail.heroHeading}
        description={spaceDetail.heroDescription}
        cta={tDetail("ctaLabel")}
        imageSrc="/assets/images/spaces.png"
      />

      <SpaceIntroSection
        label={spaceDetail.overviewLabel}
        heading={spaceDetail.overviewHeading}
        description={spaceDetail.overviewDescription}
        image="/assets/images/Banner.webp"
        imageAlt={spaceDetail.heroImageAlt}
      />

      <SpaceApproachSection
        label={tDetail("approachLabel")}
        heading={spaceDetail.approachHeading}
        items={spaceDetail.approachItems}
        image="/assets/images/why-t1.webp"
        imageAlt={spaceDetail.heroImageAlt}
      />

      <SpacesAccordionSection
        heading={tDetail("otherSpacesHeading")}
        viewAllLabel={tDetail("otherSpacesViewAll")}
        viewAllHref="/spaces"
        spaces={accordionSpaces}
      />
      <ImageCarouselSection
        slides={gallerySlides}
        aria-label={tDetail("galleryAriaLabel")}
        prevLabel={tDetail("prevLabel")}
        nextLabel={tDetail("nextLabel")}
        gridItems={[
          { src: "/assets/images/Banner.webp", alt: spaceDetail.heroImageAlt },
          { src: "/assets/images/why-t1.webp", alt: spaceDetail.heroImageAlt },
        ]}
      />

      <MaterialInspirationSection
        heading={tDetail("materialInspirationHeading")}
        items={[
          {
            src: "/assets/images/Banner.webp",
            alt: spaceDetail.heroImageAlt,
            label: "Marble",
          },
          {
            src: "/assets/images/why-t1.webp",
            alt: spaceDetail.heroImageAlt,
            label: "Oak",
          },
        ]}
      />

      <FadeUp>
        <AwardsSection {...awardsConfig} />
      </FadeUp>
      <SignatureProjectsSection
        heading={tProjects("heading")}
        viewAllLabel={tProjects("viewAllLabel")}
        viewAllHref="/projects"
        projects={signatureProjects}
      />

      <ProjectJourneySection
        label={tJourney("label")}
        heading={tJourney("heading")}
        advantageLabel={tJourney("advantageLabel")}
        prevLabel={tJourney("prevLabel")}
        nextLabel={tJourney("nextLabel")}
        steps={journeySteps}
      />
      <FaqSection {...faqConfig} />
      <SpacesAccordionSection
        heading={tDetail("otherSpacesHeading")}
        viewAllLabel={tDetail("otherSpacesViewAll")}
        viewAllHref="/spaces"
        spaces={accordionSpaces}
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
    </main>
  );
}
