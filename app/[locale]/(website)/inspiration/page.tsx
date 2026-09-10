import { getTranslations } from "next-intl/server";
import { HeroBanner } from "@/components/sections/HeroBanner";
import { SpacesAccordionSection } from "@/components/sections/SpacesAccordionSection";
import {
  getAccordionSpaces,
  getSignatureProjects,
} from "@/app/config/home.config";
import { getCarouselSlides } from "@/app/config/space.config";
import { ImageCarouselSection } from "@/components/sections/ImageCarouselSection";
import { MaterialInspirationSection } from "@/components/sections/MaterialInspirationSection";
import { InspirationCTABanner } from "./_components/InspirationCTABanner";
import { JourneyGallerySection } from "./_components/JourneyGallerySection";
import { SignatureProjectsSection } from "@/components/sections/SignatureProjectsSection";

export default async function InspirationPage() {
  const [
    tHeroInspiration,
    tSpaces,
    tCarousel,
    tDetail,
    tCTA,
    tprojects,
    tJourney,
  ] = await Promise.all([
    getTranslations("HeroInspiration"),
    getTranslations("FeaturedSpaces"),
    getTranslations("SpacesCarousel"),
    getTranslations("SpaceDetail"),
    getTranslations("InspirationCTA"),
    getTranslations("SignatureProject"),
    getTranslations("JourneyGallery"),
  ]);

  const accordionSpaces = getAccordionSpaces(tSpaces);
  const carouselSlides = getCarouselSlides(tCarousel);
  const signatureProjects = getSignatureProjects(tprojects);
  return (
    <main>
      <HeroBanner
        badge={tHeroInspiration("badge")}
        heading={tHeroInspiration("heading")}
        description={tHeroInspiration("description")}
        cta={tHeroInspiration("cta")}
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

      <InspirationCTABanner
        heading={tCTA("heading")}
        description={tCTA("description")}
        primaryCta={{ label: tCTA("primaryCta"), href: "/spaces" }}
        secondaryCta={{ label: tCTA("secondaryCta"), href: "/lookbook" }}
        image={{ src: "/assets/images/Banner.webp", alt: tCTA("imageAlt") }}
      />

      <SignatureProjectsSection
        heading={tprojects("heading")}
        viewAllLabel={tprojects("viewAllLabel")}
        viewAllHref="/projects"
        projects={signatureProjects}
      />
      <JourneyGallerySection
        heading={tJourney("heading")}
        ctaLabel={tJourney("ctaLabel")}
        ctaHref="https://www.instagram.com"
        images={[
          { src: "/assets/images/spaces.png", alt: "Project exterior view 1" },
          { src: "/assets/images/why-t1.webp", alt: "Project exterior view 2" },
          { src: "/assets/images/Banner.webp", alt: "Project exterior view 3" },
          { src: "/assets/images/growth.webp", alt: "Project exterior view 4" },
          { src: "/assets/images/spaces.png", alt: "Project exterior view 5" },
          { src: "/assets/images/why-t1.webp", alt: "Project exterior view 6" },
        ]}
      />
    </main>
  );
}
