import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { JsonLdSchema } from "@/components/JsonLdSchema";
import { getSpaceDetailCms } from "@/lib/cms/space-detail";
import {
  SPACE_SLUGS,
  toSpaceHref,
  mapSpaceDetailGallery,
  mapSpaceDetailStyles,
  mapSpaceDetailMaterials,
  mapSpaceDetailBrands,
  mapSpaceDetailRelatedProjects,
  mapSpaceDetailFaq,
  mapSpaceDetailRelatedSpaces,
} from "@/app/config/space.config";
import { resolveJourney, pick, getDreamSpaceConfig } from "@/app/config/home.config";
import type { PickFn } from "@/app/config/home.config";
import { HeroBanner } from "@/components/sections/HeroBanner";
import { SpaceIntroSection } from "@/components/sections/SpaceIntroSection";
import { SpaceApproachSection } from "@/components/sections/SpaceApproachSection";
import { ImageCarouselSection } from "@/components/sections/ImageCarouselSection";
import { SpacesAccordionSection } from "@/components/sections/SpacesAccordionSection";
import { ProjectJourneySection } from "@/components/sections/ProjectJourneySection";
import { AwardsSection } from "@/components/sections/AwardsSection";
import { SignatureProjectsSection } from "@/components/sections/SignatureProjectsSection";
import { MaterialInspirationSection } from "@/components/sections/MaterialInspirationSection";
import { DreamSpaceSection } from "@/components/sections/DreamSpaceSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { FadeUp } from "@/components/ui/animate";

interface Props {
  params: Promise<{ slug: string; locale: string }>;
}

export function generateStaticParams() {
  return SPACE_SLUGS.map((slug) => ({ slug }));
}

export const revalidate = 3600;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params;
  const cms = await getSpaceDetailCms(slug, locale);
  const seo = cms?.seo;
  return {
    ...(seo?.metaTitle && { title: seo.metaTitle }),
    ...(seo?.metaDescription && { description: seo.metaDescription }),
    alternates: { canonical: seo?.canonicalUrl ?? `${locale === "ar" ? "/ar" : ""}/spaces/${slug}` },
    ...(seo?.ogImage?.url && {
      openGraph: { images: [{ url: seo.ogImage.url }] },
      twitter: { images: [seo.ogImage.url] },
    }),
  };
}

export default async function SpaceDetailPage({ params }: Props) {
  const { slug, locale } = await params;

  const [cms, tJourney, tDreamSpace, tSpaceDetail] = await Promise.all([
    getSpaceDetailCms(slug, locale),
    getTranslations({ locale, namespace: "ProjectJourney" }),
    getTranslations({ locale, namespace: "DreamSpace" }),
    getTranslations({ locale, namespace: "SpaceDetail" }),
  ]);

  if (!cms) notFound();

  const s = cms.sections;
  const p: PickFn = (field) => pick(field, locale);
  const journey = resolveJourney(s?.journey, p, tJourney);

  const { slides: gallerySlides, gridItems: galleryGridItems } = s?.gallery
    ? mapSpaceDetailGallery(s.gallery)
    : { slides: [], gridItems: [] };

  const styleRange = mapSpaceDetailStyles(s.styles);
  const relatedSpaces = s?.relatedSpaces ? mapSpaceDetailRelatedSpaces(s.relatedSpaces) : [];

  return (
    <main>
      {s?.hero?.isVisible && (
        <HeroBanner
          badge={s.hero.eyebrow as string}
          heading={s.hero.heading as string}
          description={s.hero.description as string}
          imageSrc={s.hero.backgroundImage.url || undefined}
          breadcrumbs={s.hero.breadcrumbs.map((b) => ({
            label: b.label as string,
            href: b.href ? toSpaceHref(b.href) : undefined,
          }))}
        />
      )}

      {s?.intro?.isVisible && (
        <SpaceIntroSection
          label={s.intro.eyebrow}
          heading={s.intro.heading}
          description={s.intro.description}
          challengeTitle={tSpaceDetail("challengeTitle")}
          challengeDescription={s.intro.challenge}
          image={s.intro.image.url}
          imageAlt={s.intro.image.alt as string}
        />
      )}

      {s?.features?.isVisible && (
        <SpaceApproachSection
          label={s.features.eyebrow}
          heading={s.features.heading}
          items={s.features.items.map((item) => item.description)}
          image={s.features.image.url}
          imageAlt={s.features.image.alt as string}
        />
      )}

      {s?.styles?.isVisible && styleRange.length > 0 && (
        <SpacesAccordionSection
          heading={s.styles.heading}
          viewAllLabel={s.styles.button.label as string}
          viewAllHref={s.styles.button.href}
          spaces={styleRange}
        />
      )}

      {s?.gallery?.isVisible && gallerySlides.length > 0 && (
        <ImageCarouselSection
          slides={gallerySlides}
          gridItems={galleryGridItems.length > 0 ? galleryGridItems : undefined}
        />
      )}

      {s?.materials?.isVisible && (
        <MaterialInspirationSection
          heading={s.materials.heading}
          items={mapSpaceDetailMaterials(s.materials)}
        />
      )}

      {s?.brands?.isVisible && s.brands.brands.length > 0 && (
        <FadeUp className="bg-secondary">
          <AwardsSection
            label={s.brands.heading}
            logos={mapSpaceDetailBrands(s.brands)}
          />
        </FadeUp>
      )}

      {s?.relatedProjects?.isVisible && (
        <SignatureProjectsSection
          heading={s.relatedProjects.heading as string}
          viewAllLabel={s.relatedProjects.button.label as string}
          viewAllHref="/projects"
          projects={mapSpaceDetailRelatedProjects(s.relatedProjects)}
        />
      )}

      {s?.journey?.isVisible && journey.steps.length > 0 && (
        <ProjectJourneySection
          label={journey.label}
          heading={journey.heading}
          advantageLabel={tJourney("advantageLabel")}
          prevLabel={tJourney("prevLabel")}
          nextLabel={tJourney("nextLabel")}
          steps={journey.steps}
        />
      )}

      <DreamSpaceSection {...getDreamSpaceConfig(tDreamSpace)} />

      {s?.faq?.isVisible && (
        <FaqSection
          label={s.faq.eyebrow as string}
          heading={s.faq.heading as string}
          items={mapSpaceDetailFaq(s.faq)}
        />
      )}

      {s?.relatedSpaces?.isVisible && relatedSpaces.length > 0 && (
        <SpacesAccordionSection
          heading={s.relatedSpaces.heading}
          viewAllLabel={s.relatedSpaces.button.label as string}
          viewAllHref="/spaces"
          spaces={relatedSpaces}
        />
      )}
      <JsonLdSchema globalSeo={cms?.globalSeo} pageSeo={cms?.seo} />
    </main>
  );
}
