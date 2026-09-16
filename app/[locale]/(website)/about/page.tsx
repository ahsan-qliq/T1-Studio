import {
  getAwardsConfig,
  getReferralPartnerConfig,
  getServiceItems,
} from "@/app/config/home.config";
import { getCarouselSlides, getFaqConfig } from "@/app/config/space.config";
import { AboutStorySection } from "@/components/sections/AboutStorySection";
import { AwardsSection } from "@/components/sections/AwardsSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { HeroBanner } from "@/components/sections/HeroBanner";
import { ImageCarouselSection } from "@/components/sections/ImageCarouselSection";
import { MaterialInspirationSection } from "@/components/sections/MaterialInspirationSection";
import {
  MilestoneTimelineSection,
  type Milestone,
} from "@/components/sections/MilestoneTimelineSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { StatsBarServer } from "@/components/sections/StatsBarServer";
import { TeamSection } from "@/components/sections/TeamSection";
import { type TeamMember } from "@/components/sections/TeamSection";
import { ReferralPartnerSection } from "@/components/sections/ReferralPartnerSection";
import { FadeUp } from "@/components/ui/animate";
import { getTranslations } from "next-intl/server";

export default async function AboutPage() {
  const [
    tHeroSpaces,
    tStory,
    tTimeline,
    tServices,
    tDetail,
    tTeam,
    tCarousel,
    tAwards,
    tReferral,
    tFaq,
  ] = await Promise.all([
    getTranslations("HeroSpaces"),
    getTranslations("AboutStory"),
    getTranslations("MilestoneTimeline"),
    getTranslations("Services"),
    getTranslations("SpaceDetail"),
    getTranslations("Team"),
    getTranslations("SpacesCarousel"),
    getTranslations("Awards"),
    getTranslations("ReferralPartner"),
    getTranslations("Faq"),
  ]);

  const milestones = tTimeline.raw("items") as Milestone[];
  const serviceItems = getServiceItems(tServices);
  const teamMembers = (tTeam.raw("members") as Omit<TeamMember, "image">[]).map(
    (m) => ({
      ...m,
      image: { src: "/assets/images/Banner.webp", alt: m.name },
    }),
  );
  const carouselSlides = getCarouselSlides(tCarousel);
  const awardsConfig = getAwardsConfig(tAwards);
  const referralPartnerConfig = getReferralPartnerConfig(tReferral);
  const faqConfig = getFaqConfig(tFaq);
  return (
    <main>
      <HeroBanner
        badge={tHeroSpaces("badge")}
        heading={tHeroSpaces("heading")}
        description={tHeroSpaces("description")}
        cta={tHeroSpaces("cta")}
        imageSrc="/assets/images/spaces.png"
      />
      <AboutStorySection
        label={tStory("label")}
        heading={tStory("heading")}
        description={tStory("description")}
        image={{
          src: "/assets/images/Banner.webp",
          alt: tStory("imageAlt"),
        }}
      />
      <MilestoneTimelineSection
        heading={tTimeline("heading")}
        milestones={milestones}
      />

      <ServicesSection
        label={tServices("label")}
        heading={tServices("heading")}
        services={serviceItems}
      />
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
        <StatsBarServer namespace="Stats" />
      </FadeUp>
      <TeamSection
        heading={tTeam("heading")}
        members={teamMembers}
        prevLabel={tTeam("prevLabel")}
        nextLabel={tTeam("nextLabel")}
      />
      <ImageCarouselSection
        slides={carouselSlides}
        aria-label={tCarousel("ariaLabel")}
        prevLabel={tCarousel("prevLabel")}
        nextLabel={tCarousel("nextLabel")}
      />
      <FadeUp>
        <AwardsSection {...awardsConfig} />
      </FadeUp>
      <FadeUp>
        <ReferralPartnerSection {...referralPartnerConfig} />
      </FadeUp>

      <FaqSection {...faqConfig} />
    </main>
  );
}
