import { getTranslations } from "next-intl/server";
import {
  Sun, Shield, RefreshCcw, Users,
  Globe, Lightbulb, Building2, User, Maximize2, LayoutGrid,
} from "lucide-react";
import { HeroBanner } from "@/components/sections/HeroBanner";
import { StatsBar } from "@/components/sections/StatsBar";
import { WhyT1Section } from "@/components/sections/WhyT1Section";
import { CarouselSection } from "@/components/sections/CarouselSection";
import { FeaturedSpaces } from "@/components/sections/FeaturedSpaces";
import { ComparisonSection } from "@/components/sections/ComparisonSection";
import {
  ProjectJourneySection,
  SmartSpaceDiagram,
  KellerBadge,
} from "@/components/sections/ProjectJourneySection";
import type { FeatureCard } from "@/components/sections/WhyT1Section";
import type { CarouselCard } from "@/components/sections/CarouselSection";
import type { SpaceCard } from "@/components/sections/FeaturedSpaces";
import type { ComparisonColumn } from "@/components/sections/ComparisonSection";
import type { JourneyStep } from "@/components/sections/ProjectJourneySection";

export default async function HomePage() {
  const [tHero, tWhyT1, tCarousel, tSpaces, tprojects, tComparison, tJourney] =
    await Promise.all([
      getTranslations("Hero"),
      getTranslations("WhyT1"),
      getTranslations("AudienceCarousel"),
      getTranslations("FeaturedSpaces"),
      getTranslations("SignatureProject"),
      getTranslations("Comparison"),
      getTranslations("ProjectJourney"),
    ]);

  const featureCards: FeatureCard[] = [
    {
      icon: Sun,
      title: tWhyT1("oneStudio"),
      description: tWhyT1("oneStudioDesc"),
      variant: "dark",
    },
    {
      icon: Shield,
      title: tWhyT1("europeanQuality"),
      description: tWhyT1("europeanQualityDesc"),
      variant: "gold",
    },
    {
      icon: RefreshCcw,
      title: tWhyT1("premiumMaterials"),
      description: tWhyT1("premiumMaterialsDesc"),
      variant: "gold",
    },
    {
      icon: Users,
      title: tWhyT1("expertDesigners"),
      description: tWhyT1("expertDesignersDesc"),
      variant: "dark",
    },
  ];

  const audienceCards: CarouselCard[] = [
    {
      image: {
        src: "/assets/images/Banner.png",
        alt: tCarousel("homeownersAlt"),
      },
      label: tCarousel("homeowners"),
      href: "/spaces/homeowners",
    },
    {
      image: {
        src: "/assets/images/Banner.png",
        alt: tCarousel("apartmentsOwnersAlt"),
      },
      label: tCarousel("apartmentsOwners"),
      href: "/spaces/apartments",
    },
    {
      image: {
        src: "/assets/images/Banner.png",
        alt: tCarousel("propertyDevelopersAlt"),
      },
      label: tCarousel("propertyDevelopers"),
      href: "/spaces/developers",
    },
  ];

  const spaceCards: SpaceCard[] = [
    {
      image: { src: "/assets/images/why-t1.png", alt: tSpaces("kitchenAlt") },
      title: tSpaces("kitchenTitle"),
      description: tSpaces("kitchenDesc"),
      href: "/spaces/kitchen",
    },
    {
      image: { src: "/assets/images/why-t1.png", alt: tSpaces("wardrobesAlt") },
      title: tSpaces("wardrobesTitle"),
      description: tSpaces("wardrobesDesc"),
      href: "/spaces/wardrobes",
    },
    {
      image: {
        src: "/assets/images/why-t1.png",
        alt: tSpaces("livingRoomsAlt"),
      },
      title: tSpaces("livingRoomsTitle"),
      description: tSpaces("livingRoomsDesc"),
      href: "/spaces/living-rooms",
    },
  ];

  const comparisonColumns: ComparisonColumn[] = [
    {
      title: tComparison("t1Title"),
      variant: "dark",
      features: [
        tComparison("t1Feature1"),
        tComparison("t1Feature2"),
        tComparison("t1Feature3"),
        tComparison("t1Feature4"),
        tComparison("t1Feature5"),
      ],
    },
    {
      title: tComparison("luxuryTitle"),
      variant: "light",
      features: [
        tComparison("luxuryFeature1"),
        tComparison("luxuryFeature2"),
        tComparison("luxuryFeature3"),
        tComparison("luxuryFeature4"),
        tComparison("luxuryFeature5"),
      ],
    },
    {
      title: tComparison("budgetTitle"),
      variant: "light",
      features: [
        tComparison("budgetFeature1"),
        tComparison("budgetFeature2"),
        tComparison("budgetFeature3"),
        tComparison("budgetFeature4"),
        tComparison("budgetFeature5"),
      ],
    },
  ];

  const journeySteps: JourneyStep[] = [
    {
      number: tJourney("discoverNumber"),
      icon: Globe,
      title: tJourney("discoverTitle"),
      subtitle: tJourney("discoverSubtitle"),
      description: tJourney("discoverDesc"),
      advantageText: tJourney("discoverAdvantage"),
      highlightIcon: User,
      highlightText: tJourney("discoverHighlight"),
    },
    {
      number: tJourney("innovateNumber"),
      icon: Lightbulb,
      title: tJourney("innovateTitle"),
      subtitle: tJourney("innovateSubtitle"),
      description: tJourney("innovateDesc"),
      advantageText: tJourney("innovateAdvantage"),
      highlightIcon: Maximize2,
      highlightText: tJourney("innovateHighlight"),
      extraContent: (
        <SmartSpaceDiagram
          badge={tJourney("smartSpaceBadge")}
          items={[
            { icon: LayoutGrid, label: tJourney("smartSpaceItem1") },
            { icon: LayoutGrid, label: tJourney("smartSpaceItem2") },
            { icon: LayoutGrid, label: tJourney("smartSpaceItem3") },
          ]}
        />
      ),
    },
    {
      number: tJourney("engineerNumber"),
      icon: Building2,
      title: tJourney("engineerTitle"),
      subtitle: tJourney("engineerSubtitle"),
      description: tJourney("engineerDesc"),
      advantageText: tJourney("engineerAdvantage"),
      highlightIcon: Shield,
      highlightText: tJourney("engineerHighlight"),
      extraContent: (
        <KellerBadge
          line1={tJourney("kellerLine1")}
          line2={tJourney("kellerLine2")}
        />
      ),
    },
  ];

  return (
    <main>
      <HeroBanner
        badge={tHero("badge")}
        heading={tHero("heading")}
        description={tHero("description")}
        cta={tHero("cta")}
      />
      <StatsBar />
      <WhyT1Section
        label={tWhyT1("label")}
        heading={tWhyT1("heading")}
        image={{ src: "/assets/images/Banner.png", alt: tWhyT1("imageAlt") }}
        cards={featureCards}
      />
      <CarouselSection
        heading={tCarousel("heading")}
        cards={audienceCards}
        prevLabel={tCarousel("prevLabel")}
        nextLabel={tCarousel("nextLabel")}
        cardArrowLabel={tCarousel("cardArrowLabel")}
      />
      <FeaturedSpaces
        heading={tSpaces("heading")}
        viewAllLabel={tSpaces("viewAllLabel")}
        viewAllHref="/spaces"
        cardArrowLabel={tSpaces("cardArrowLabel")}
        cards={spaceCards}
      />
      <FeaturedSpaces
        heading={tprojects("heading")}
        viewAllLabel={tprojects("viewAllLabel")}
        viewAllHref="/projects"
        cardArrowLabel={tprojects("cardArrowLabel")}
        cards={spaceCards}
      />
      <ComparisonSection
        heading={tComparison("heading")}
        columns={comparisonColumns}
      />
      <ProjectJourneySection
        label={tJourney("label")}
        heading={tJourney("heading")}
        advantageLabel={tJourney("advantageLabel")}
        prevLabel={tJourney("prevLabel")}
        nextLabel={tJourney("nextLabel")}
        steps={journeySteps}
      />
    </main>
  );
}
