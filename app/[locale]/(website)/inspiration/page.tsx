import { getTranslations } from "next-intl/server";
import { getInspirationPageCms } from "@/lib/cms/inspiration";
import { HeroBanner } from "@/components/sections/HeroBanner";
import { SpacesAccordionSection } from "@/components/sections/SpacesAccordionSection";
import { ImageCarouselSection } from "@/components/sections/ImageCarouselSection";
import { MaterialInspirationSection } from "@/components/sections/MaterialInspirationSection";
import { SignatureProjectsSection } from "@/components/sections/SignatureProjectsSection";
import { InspirationCTABanner } from "./_components/InspirationCTABanner";
import { JourneyGallerySection } from "./_components/JourneyGallerySection";

const PROJECT_SIZES = [
  { width: 700, height: 500 },
  { width: 280, height: 180 },
  { width: 560, height: 480 },
];

export const revalidate = 3600;

export default async function InspirationPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const [cms, tCarousel] = await Promise.all([
    getInspirationPageCms(locale),
    getTranslations({ locale, namespace: "SpacesCarousel" }),
  ]);

  const s = cms?.sections;
  return (
    <main>
      {s?.hero?.isVisible && (
        <HeroBanner
          badge={s.hero.eyebrow as string}
          heading={s.hero.heading as string}
          description={s.hero.description as string}
          cta={s.hero.primaryButton.label as string}
          imageSrc={s.hero.backgroundImage.url || undefined}
        />
      )}

      {s?.rooms?.isVisible && (
        <SpacesAccordionSection
          heading={s.rooms.heading as string}
          viewAllLabel={s.rooms.button.label as string}
          viewAllHref="/spaces"
          spaces={s.rooms.rooms
            .filter((sp) => sp.isVisible)
            .map((sp) => ({
              id: sp._id,
              title: sp.title as string,
              href: sp.href,
              image: { src: sp.image.url, alt: sp.image.alt as string },
            }))}
        />
      )}

      {s?.showcase?.isVisible && s.showcase.items.length > 0 && (
        <ImageCarouselSection
          slides={s.showcase.items.map((img) => ({
            src: img.image.url,
            alt: img.image.alt as string,
          }))}
          prevLabel={tCarousel("prevLabel")}
          nextLabel={tCarousel("nextLabel")}
          aria-label={tCarousel("ariaLabel")}
        />
      )}

      {s?.materials?.isVisible && (
        <MaterialInspirationSection
          heading={s.materials.heading}
          items={s.materials.materials.map((item) => ({
            src: item.image.url,
            alt: item.image.alt as string,
            label: item.label,
          }))}
        />
      )}

      {s?.inspirationCTA?.isVisible && (
        <InspirationCTABanner
          heading={s.inspirationCTA.heading}
          description={s.inspirationCTA.description}
          primaryCta={{
            label: s.inspirationCTA.button.label as string,
            href: s.inspirationCTA.button.href || "/spaces",
          }}
          secondaryCta={{
            label: s.inspirationCTA.button.label as string,
            href: s.inspirationCTA.button.href || "/",
          }}
          image={{
            src: s.inspirationCTA.backgroundImage.url,
            alt: s.inspirationCTA.backgroundImage.alt as string,
          }}
        />
      )}

      {s?.designTips?.isVisible && (
        <SignatureProjectsSection
          heading={s.designTips.heading as string}
          viewAllLabel={s.designTips.button.label as string}
          viewAllHref="/projects"
          projects={(s.designTips.articles || [])
            .filter((pr) => pr.isVisible)
            .map((pr, i) => ({
              id: pr._id,
              title: pr.title as string,
              location: pr.location as string,
              href: pr.href,
              image: {
                src: pr.image.url,
                alt: pr.image.alt as string,
                ...(PROJECT_SIZES[i] ?? { width: 700, height: 500 }),
              },
            }))}
        />
      )}

      {s?.followJourney?.isVisible && (
        <JourneyGallerySection
          heading={s.followJourney.heading}
          ctaLabel={s.followJourney.button.label as string}
          ctaHref={s.followJourney.button.href || "/"}
          images={s.followJourney.items.map((img) => ({
            src: img.image.url,
            alt: img.image.alt as string,
          }))}
        />
      )}
    </main>
  );
}
