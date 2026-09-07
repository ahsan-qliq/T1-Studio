import { getTranslations } from "next-intl/server";
import { TrendingCollections } from "./_components/TrendingCollections";
import { HeroBanner } from "@/components/sections/HeroBanner";
import { FeaturedSpaces } from "@/components/sections/FeaturedSpaces";
import { getSpaceCards } from "@/app/config/home.config";

export default async function InspirationsPage() {
  const tCollections = await getTranslations("TrendingCollections");

  const collections = [
    {
      id: "blue-waters-dubai",
      title: tCollections("c1Title"),
      location: tCollections("c1Location"),
      image: { src: "/assets/images/Banner.webp", alt: tCollections("c1Alt") },
      href: "/projects/blue-waters-dubai",
    },
    {
      id: "al-yasmeen-sharjah",
      title: tCollections("c2Title"),
      location: tCollections("c2Location"),
      image: { src: "/assets/images/growth.webp", alt: tCollections("c2Alt") },
      href: "/projects/al-yasmeen-sharjah",
    },
    {
      id: "medical-center-dubai",
      title: tCollections("c3Title"),
      location: tCollections("c3Location"),
      image: { src: "/assets/images/why-t1.webp", alt: tCollections("c3Alt") },
      href: "/projects/medical-center-dubai",
    },
  ];
    const [
    tHeroInspiration,
    tWhyT1,
    tCarousel,
    tSpaces,
    tprojects,
    tComparison,
    tJourney,
    tPlanYourProject,
    tReferral,
    tDreamSpace,
    tTestimonials,
    tAwards,
    tBlog,
  ] = await Promise.all([
    getTranslations("HeroInspiration"),
    getTranslations("WhyT1"),
    getTranslations("AudienceCarousel"),
    getTranslations("FeaturedSpaces"),
    getTranslations("SignatureProject"),
    getTranslations("Comparison"),
    getTranslations("ProjectJourney"),
    getTranslations("PlanYourProject"),
    getTranslations("ReferralPartner"),
    getTranslations("DreamSpace"),
    getTranslations("Testimonials"),
    getTranslations("Awards"),
    getTranslations("Blog"),
  ]);
  const spaceCards = getSpaceCards(tSpaces);
  return (
    <main>
       <HeroBanner
        badge={tHeroInspiration("badge")}
        heading={tHeroInspiration("heading")}
        description={tHeroInspiration("description")}
        cta={tHeroInspiration("cta")}
      />
          <FeaturedSpaces
        heading={tSpaces("heading")}
        viewAllLabel={tSpaces("viewAllLabel")}
        viewAllHref="/spaces"
        cardArrowLabel={tSpaces("cardArrowLabel")}
        cards={spaceCards.slice(0,3)}
      />
      <TrendingCollections
        heading={tCollections("heading")}
        viewAllLabel={tCollections("viewAllLabel")}
        viewAllHref={tCollections("viewAllHref")}
        exploreLabel={tCollections("exploreLabel")}
        collections={collections}
      />
    </main>
  );
}
