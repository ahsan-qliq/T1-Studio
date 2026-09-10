import { getTranslations } from "next-intl/server";
import { HeroBanner } from "@/components/sections/HeroBanner";
import { PhilosophySection } from "@/components/sections/PhilosophySection";
import {
  getAccordionSpaces,
  getComparisonColumns,
  getJourneySteps,
  getReferralPartnerConfig,
  getSignatureProjects,
} from "@/app/config/home.config";
import { FadeUp } from "@/components/ui/animate";
import { ProjectJourneySection } from "@/components/sections/ProjectJourneySection";
import { ReferralPartnerSection } from "@/components/sections/ReferralPartnerSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { getCarouselSlides, getFaqConfig } from "@/app/config/space.config";
import { SpacesAccordionSection } from "@/components/sections/SpacesAccordionSection";
import { ComparisonSection } from "@/components/sections/ComparisonSection";
import { SignatureProjectsSection } from "@/components/sections/SignatureProjectsSection";
import { ImageCarouselSection } from "@/components/sections/ImageCarouselSection";

export default async function SpacesPage() {
  const [
    tHeroSpaces,
    tPhilosophy,
    tSpaces,
    tComparison,
    tProjects,
    tJourney,
    tReferral,
    tFaq,
    tCarousel,
  ] = await Promise.all([
    getTranslations("HeroSpaces"),
    getTranslations("Philosophy"),
    getTranslations("FeaturedSpaces"),
    getTranslations("Comparison"),
    getTranslations("SignatureProject"),
    getTranslations("ProjectJourney"),
    getTranslations("ReferralPartner"),
    getTranslations("Faq"),
    getTranslations("SpacesCarousel"),
  ]);

  const accordionSpaces = getAccordionSpaces(tSpaces);
  const comparisonColumns = getComparisonColumns(tComparison);
  const signatureProjects = getSignatureProjects(tProjects);
  const journeySteps = getJourneySteps(tJourney);
  const referralPartnerConfig = getReferralPartnerConfig(tReferral);
  const faqConfig = getFaqConfig(tFaq);
  const carouselSlides =  getCarouselSlides(tCarousel);


  return (
    <main>
      <HeroBanner
        badge={tHeroSpaces("badge")}
        heading={tHeroSpaces("heading")}
        description={tHeroSpaces("description")}
        cta={tHeroSpaces("cta")}
        imageSrc="/assets/images/spaces.png"
      />
      <PhilosophySection
        label={tPhilosophy("label")}
        heading={tPhilosophy("heading")}
        description={tPhilosophy("description")}
        ctaLabel={tPhilosophy("ctaLabel")}
        ctaHref="/"
        image="/assets/images/why-t1.webp"
        imageAlt={tPhilosophy("imageAlt")}
      />
      <SpacesAccordionSection
        heading={tSpaces("heading")}
        viewAllLabel={tSpaces("viewAllLabel")}
        viewAllHref="/spaces"
        spaces={accordionSpaces}
      />
      <ImageCarouselSection
        slides={carouselSlides}
        aria-label={tCarousel("ariaLabel")}
        prevLabel={tCarousel("prevLabel")}
        nextLabel={tCarousel("nextLabel")}
      />
      <FadeUp>
        <ComparisonSection
          heading={tComparison("heading")}
          columns={comparisonColumns}
        />
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
      <ReferralPartnerSection {...referralPartnerConfig} />
      <FaqSection {...faqConfig} />
    </main>
  );
}
