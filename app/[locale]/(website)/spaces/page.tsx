import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getSpacesPageCms } from "@/lib/cms/spaces";
import { JsonLdSchema } from "@/components/JsonLdSchema";
import { HeroBanner } from "@/components/sections/HeroBanner";
import { PhilosophySection } from "@/components/sections/PhilosophySection";
import { SpacesAccordionSection } from "@/components/sections/SpacesAccordionSection";
import { ImageCarouselSection } from "@/components/sections/ImageCarouselSection";
import { SignatureProjectsSection } from "@/components/sections/SignatureProjectsSection";
import {
  mapSpacesFeaturedSpaces,
  mapSpacesShowcase,
  mapSpacesSignatureProjects,
} from "@/app/config/spaces.config";

export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const cms = await getSpacesPageCms(locale);
  const seo = cms?.seo;
  return {
    ...(seo?.metaTitle && { title: seo.metaTitle }),
    ...(seo?.metaDescription && { description: seo.metaDescription }),
    alternates: { canonical: seo?.canonicalUrl ?? `${locale === "ar" ? "/ar" : ""}/spaces` },
    ...(seo?.ogImage?.url && {
      openGraph: { images: [{ url: seo.ogImage.url }] },
      twitter: { images: [seo.ogImage.url] },
    }),
  };
}

export default async function SpacesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const [cms, tCarousel] = await Promise.all([
    getSpacesPageCms(locale),
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
          imageSrc={s.hero.backgroundImage.url || undefined}
          breadcrumbs={s.hero.breadcrumbs.map((b) => ({
            label: b.label as string,
            href: b.href || undefined,
          }))}
        />
      )}

      {s?.intro?.isVisible && (
        <PhilosophySection
          label={s.intro.eyebrow}
          heading={s.intro.heading}
          description={s.intro.description}
          ctaLabel={s.intro.button.label as string}
          ctaHref={s.intro.button.href || "/"}
        />
      )}

      {s?.featuredSpaces?.isVisible && (
        <SpacesAccordionSection
          heading={s.featuredSpaces.heading as string}
          spaces={mapSpacesFeaturedSpaces(s.featuredSpaces)}
        />
      )}

      {s?.showcase?.isVisible && s.showcase.gallery.length > 0 && (
        <ImageCarouselSection
          slides={mapSpacesShowcase(s.showcase)}
          prevLabel={tCarousel("prevLabel")}
          nextLabel={tCarousel("nextLabel")}
          aria-label={tCarousel("ariaLabel")}
        />
      )}

      {s?.signatureProjects?.isVisible && (
        <SignatureProjectsSection
          heading={s.signatureProjects.heading as string}
          viewAllLabel={s.signatureProjects.button.label as string}
          viewAllHref="/projects"
          projects={mapSpacesSignatureProjects(s.signatureProjects)}
        />
      )}
      <JsonLdSchema globalSeo={cms?.globalSeo} pageSeo={cms?.seo} />
    </main>
  );
}
