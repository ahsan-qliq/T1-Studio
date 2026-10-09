import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getInspirationPageCms } from "@/lib/cms/inspiration";
import { JsonLdSchema } from "@/components/JsonLdSchema";
import { HeroBanner } from "@/components/sections/HeroBanner";
import { SpacesAccordionSection } from "@/components/sections/SpacesAccordionSection";
import { ImageCarouselSection } from "@/components/sections/ImageCarouselSection";
import { MaterialInspirationSection } from "@/components/sections/MaterialInspirationSection";
import { SignatureProjectsSection } from "@/components/sections/SignatureProjectsSection";
import { InspirationCTABanner } from "./_components/InspirationCTABanner";
import { JourneyGallerySection } from "./_components/JourneyGallerySection";
import {
  mapInspirationRooms,
  mapInspirationShowcase,
  mapInspirationMaterials,
  mapInspirationCTA,
  mapInspirationDesignTips,
  mapInspirationJourneyGallery,
} from "@/app/config/inspiration.config";

export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const cms = await getInspirationPageCms(locale);
  const seo = cms?.seo;
  return {
    ...(seo?.metaTitle && { title: seo.metaTitle }),
    ...(seo?.metaDescription && { description: seo.metaDescription }),
    alternates: { canonical: seo?.canonicalUrl ?? `${locale === "ar" ? "/ar" : ""}/inspiration` },
    ...(seo?.ogImage?.url && {
      openGraph: { images: [{ url: seo.ogImage.url }] },
      twitter: { images: [seo.ogImage.url] },
    }),
  };
}

export default async function InspirationPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const [cms, tCarousel, tInspirationCTA] = await Promise.all([
    getInspirationPageCms(locale),
    getTranslations({ locale, namespace: "SpacesCarousel" }),
    getTranslations({ locale, namespace: "InspirationCTA" }),
  ]);

  const s = cms?.sections;
  return (
    <main>
      {s?.hero?.isVisible && (
        <HeroBanner
          badge={s.hero.eyebrow as string}
          heading={s.hero.heading as string}
          description={s.hero.description as string}
          breadcrumbs={s.hero.breadcrumbs?.map((b) => ({
            label: b.label as string,
            href: b.href || undefined,
          })) || []}
          cta={s.hero.primaryButton?.label as string}
          imageSrc={s.hero.backgroundImage.url || undefined}
        />
      )}

      {s?.rooms?.isVisible && (
        <SpacesAccordionSection
          heading={s.rooms.heading as string}
          viewAllLabel={s.rooms.button.label as string}
          viewAllHref="/spaces"
          spaces={mapInspirationRooms(s.rooms)}
        />
      )}

      {s?.showcase?.isVisible && s.showcase.items.length > 0 && (
        <ImageCarouselSection
          slides={mapInspirationShowcase(s.showcase)}
          prevLabel={tCarousel("prevLabel")}
          nextLabel={tCarousel("nextLabel")}
          aria-label={tCarousel("ariaLabel")}
        />
      )}

      {s?.materials?.isVisible && (
        <MaterialInspirationSection
          heading={s.materials.heading}
          items={mapInspirationMaterials(s.materials)}
        />
      )}

      {s?.inspirationCTA?.isVisible && (
        <InspirationCTABanner
          {...mapInspirationCTA(s.inspirationCTA, tInspirationCTA("secondaryCta"))}
        />
      )}

      {s?.designTips?.isVisible && (
        <SignatureProjectsSection
          heading={s.designTips.heading as string}
          viewAllLabel={s.designTips.button.label as string}
          viewAllHref="/projects"
          projects={mapInspirationDesignTips(s.designTips)}
        />
      )}

      {s?.followJourney?.isVisible && (
        <JourneyGallerySection {...mapInspirationJourneyGallery(s.followJourney)} />
      )}
      <JsonLdSchema globalSeo={cms?.globalSeo} pageSeo={cms?.seo} />
    </main>
  );
}
