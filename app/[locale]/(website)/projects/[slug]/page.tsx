import {
  getAwardsConfig,
  getDreamSpaceConfig,
  getSignatureProjects,
  getWhyT1GridFeatures,
} from "@/app/config/home.config";
import {
  getCarouselSlides,
  getSpaceDetailConfig,
  SPACE_SLUGS,
} from "@/app/config/space.config";
import { AwardsSection } from "@/components/sections/AwardsSection";
import { BeforeAfterSection } from "@/components/sections/BeforeAfterSection";
import { HeroBanner } from "@/components/sections/HeroBanner";
import { ImageCarouselSection } from "@/components/sections/ImageCarouselSection";
import { MaterialInspirationSection } from "@/components/sections/MaterialInspirationSection";
import { SignatureProjectsSection } from "@/components/sections/SignatureProjectsSection";
import { WhyT1GridSection } from "@/components/sections/WhyT1GridSection";
import { ClientTestimonialSection } from "@/components/sections/ClientTestimonialSection";
import { SpaceIntroSection } from "@/components/sections/SpaceIntroSection";
import { StatsBarServer } from "@/components/sections/StatsBarServer";
import { FadeUp } from "@/components/ui/animate";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/dist/client/components/not-found";
import { DreamSpaceSection } from "@/components/sections/DreamSpaceSection";

interface Props {
  params: Promise<{ slug: string; locale: string }>;
}
export function generateStaticParams() {
  return SPACE_SLUGS.map((slug) => ({ slug }));
}

export default async function ProjectDetailsPage({ params }: Props) {
  const { slug } = await params;
  const [
    tHero,
    tDetail,
    tBeforeAfter,
    tCarousel,
    tprojects,
    tWhyT1,
    tDreamSpace,
    tTestimonials,
  ] = await Promise.all([
    getTranslations("Hero"),
    getTranslations("SpaceDetail"),
    getTranslations("BeforeAfter"),
    getTranslations("SpacesCarousel"),
    getTranslations("SignatureProject"),
    getTranslations("WhyT1"),
    getTranslations("DreamSpace"),
    getTranslations("Testimonials"),
  ]);
  const spaceDetail = getSpaceDetailConfig(slug, tDetail);
  if (!spaceDetail) notFound();
  const carouselSlides = getCarouselSlides(tCarousel);
  const signatureProjects = getSignatureProjects(tprojects);
  const dreamSpaceConfig = getDreamSpaceConfig(tDreamSpace);
  return (
    <main>
      <HeroBanner
        badge={tHero("badge")}
        heading={tHero("heading")}
        description={tHero("description")}
        cta={tHero("cta")}
      />
      <FadeUp>
        <StatsBarServer namespace="ProjectStats" />
      </FadeUp>
      <SpaceIntroSection
        label={spaceDetail.overviewLabel}
        heading={spaceDetail.overviewHeading}
        description={spaceDetail.overviewDescription}
        image="/assets/images/Banner.webp"
        imageAlt={spaceDetail.heroImageAlt}
        className="order-2 lg:order-1"
      />
      <BeforeAfterSection
        heading={tBeforeAfter("heading")}
        beforeLabel={tBeforeAfter("beforeLabel")}
        afterLabel={tBeforeAfter("afterLabel")}
        handleLabel={tBeforeAfter("handleLabel")}
        beforeImage={{
          src: "/assets/images/Banner.webp",
          alt: tBeforeAfter("beforeLabel"),
        }}
        afterImage={{
          src: "/assets/images/growth.webp",
          alt: tBeforeAfter("afterLabel"),
        }}
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

      <WhyT1GridSection
        label={tWhyT1("label")}
        heading={tWhyT1("heading")}
        description={tWhyT1("description")}
        features={getWhyT1GridFeatures(tWhyT1)}
      />

      <ClientTestimonialSection
        label={tTestimonials("label")}
        heading={tTestimonials("heading")}
        variant="card"
        testimonials={[
          {
            quote: tTestimonials("t1Quote"),
            author: tTestimonials("t1Name"),
            authorRole: tTestimonials("t1Role"),
            badge: tTestimonials("t1Badge"),
            readTime: tTestimonials("t1ReadTime"),
            image: { src: "/assets/images/Banner.webp", alt: tTestimonials("t1Name") },
            avatar: { src: "/assets/images/Banner.webp", alt: tTestimonials("t1Name") },
          },
          {
            quote: tTestimonials("t2Quote"),
            author: tTestimonials("t2Name"),
            authorRole: tTestimonials("t2Role"),
            badge: tTestimonials("t1Badge"),
            readTime: tTestimonials("t1ReadTime"),
            image: { src: "/assets/images/growth.webp", alt: tTestimonials("t2Name") },
            avatar: { src: "/assets/images/Banner.webp", alt: tTestimonials("t2Name") },
          },
          {
            quote: tTestimonials("t3Quote"),
            author: tTestimonials("t3Name"),
            authorRole: tTestimonials("t3Role"),
            badge: tTestimonials("t1Badge"),
            readTime: tTestimonials("t1ReadTime"),
            image: { src: "/assets/images/why-t1.webp", alt: tTestimonials("t3Name") },
            avatar: { src: "/assets/images/Banner.webp", alt: tTestimonials("t3Name") },
          },
        ]}
      />

      <SignatureProjectsSection
        heading={tprojects("heading")}
        viewAllLabel={tprojects("viewAllLabel")}
        viewAllHref="/projects"
        projects={signatureProjects}
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
