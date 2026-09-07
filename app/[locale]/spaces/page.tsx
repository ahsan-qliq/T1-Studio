import { getTranslations } from "next-intl/server";
import { HeroBanner } from "@/components/sections/HeroBanner";
import { PhilosophySection } from "@/components/sections/PhilosophySection";
import { FeaturedSpaces } from "@/components/sections/FeaturedSpaces";
import {
  getFeatureCards,
  getJourneySteps,
  getReferralPartnerConfig,
  getSpaceCards,
} from "@/app/config/home.config";
import { WhyT1Section } from "@/components/sections/WhyT1Section";
import { ProjectJourneySection } from "@/components/sections/ProjectJourneySection";
import { ReferralPartnerSection } from "@/components/sections/ReferralPartnerSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { getFaqConfig } from "@/app/config/space.config";

export default async function SpacesPage() {
  const [
    tHeroSpaces,
    tPhilosophy,
    tSpaces,
    tWhyT1,
    tprojects,
    tJourney,
    tReferral,
    tFaq,
  ] = await Promise.all([
    getTranslations("HeroSpaces"),
    getTranslations("Philosophy"),
    getTranslations("FeaturedSpaces"),
    getTranslations("WhyT1"),
    getTranslations("SignatureProject"),
    getTranslations("ProjectJourney"),
    getTranslations("ReferralPartner"),
    getTranslations("Faq"),
  ]);
  const spaceCards = getSpaceCards(tSpaces);
  const featureCards = getFeatureCards(tWhyT1);
  const journeySteps = getJourneySteps(tJourney);
  const referralPartnerConfig = getReferralPartnerConfig(tReferral);
  const faqConfig = getFaqConfig(tFaq);
  return (
    <main>
      <HeroBanner
        badge={tHeroSpaces("badge")}
        heading={tHeroSpaces("heading")}
        description={tHeroSpaces("description")}
        cta={tHeroSpaces("cta")}
      />
      <PhilosophySection
        label={tPhilosophy("label")}
        heading={tPhilosophy("label")}
        description={tPhilosophy("heading")}
        ctaLabel={tPhilosophy("ctaLabel")}
        ctaHref="/"
        image={"/assets/images/growth.webp"}
        imageAlt={tPhilosophy("imageAlt")}
      />
      <FeaturedSpaces
        heading={tSpaces("heading")}
        cardArrowLabel={tSpaces("cardArrowLabel")}
        cards={spaceCards}
      />
      <WhyT1Section
        label={tWhyT1("label")}
        heading={tWhyT1("heading")}
        image={{ src: "/assets/images/Banner.webp", alt: tWhyT1("imageAlt") }}
        cards={featureCards}
      />
      <FeaturedSpaces
        heading={tprojects("heading")}
        viewAllLabel={tprojects("viewAllLabel")}
        viewAllHref="/projects"
        cardArrowLabel={tprojects("cardArrowLabel")}
        cards={spaceCards.slice(0, 3)}
      />
      <ProjectJourneySection
        label={tJourney("label")}
        heading={tJourney("heading")}
        advantageLabel={tJourney("advantageLabel")}
        prevLabel={tJourney("prevLabel")}
        nextLabel={tJourney("nextLabel")}
        steps={journeySteps}
      />
      <ReferralPartnerSection {...referralPartnerConfig} />
      <FaqSection {...faqConfig} />
    </main>
  );
}
