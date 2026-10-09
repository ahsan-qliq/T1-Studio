import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getAboutPageCms } from "@/lib/cms/about";
import { JsonLdSchema } from "@/components/JsonLdSchema";
import { HeroBanner } from "@/components/sections/HeroBanner";
import { AboutStorySection } from "@/components/sections/AboutStorySection";
import { MilestoneTimelineSection } from "@/components/sections/MilestoneTimelineSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { MaterialInspirationSection } from "@/components/sections/MaterialInspirationSection";
import { StatsBar } from "@/components/sections/StatsBar";
import { ImageCarouselSection } from "@/components/sections/ImageCarouselSection";
import { AwardsSection } from "@/components/sections/AwardsSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { FadeUp } from "@/components/ui/animate";
import { mapMilestones } from "@/app/config/about.config";

export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const cms = await getAboutPageCms(locale);
  const seo = cms?.seo;
  return {
    ...(seo?.metaTitle && { title: seo.metaTitle }),
    ...(seo?.metaDescription && { description: seo.metaDescription }),
    alternates: { canonical: seo?.canonicalUrl ?? `${locale === "ar" ? "/ar" : ""}/about` },
    ...(seo?.ogImage?.url && {
      openGraph: { images: [{ url: seo.ogImage.url }] },
      twitter: { images: [seo.ogImage.url] },
    }),
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const [cms, tStats, tCarousel] = await Promise.all([
    getAboutPageCms(locale),
    getTranslations({ locale, namespace: "Stats" }),
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
          breadcrumbs={
            s.hero.breadcrumbs?.map((b) => ({
              label: b.label as string,
              href: b.href || undefined,
            })) || []
          }
          imageSrc={s.hero.backgroundImage.url || undefined}
        />
      )}

      {s?.story?.isVisible && (
        <AboutStorySection
          label={s.story.eyebrow}
          heading={s.story.heading}
          description={s.story.description}
          image={{ src: s.story.image.url, alt: s.story.image.alt as string }}
        />
      )}

      {s?.journey?.isVisible && (
        <MilestoneTimelineSection
          heading={s.journey.heading}
          milestones={mapMilestones(s.journey.items)}
        />
      )}

      {s?.philosophy?.isVisible && (
        <ServicesSection
          label={s.philosophy.eyebrow as string}
          heading={s.philosophy.heading as string}
          services={s.philosophy.items
            .filter((svc) => svc.isVisible)
            .map((svc) => ({
              title: svc.title as string,
              subtitle: svc.description as string,
            }))}
        />
      )}

      {s?.values?.isVisible && (
        <MaterialInspirationSection
          heading={s.values.heading}
          items={(s.values.values || []).map((item) => ({
            src: item.image.url,
            alt: item.image.alt as string,
            label: item.title as string,
          }))}
        />
      )}

      {s?.stats?.isVisible && (
        <FadeUp>
          <StatsBar
            items={s.stats.stats
              .filter((stat) => stat.isVisible)
              .map((stat) => ({ value: stat.value, label: stat.label as string }))}
            sectionLabel={tStats("sectionLabel")}
          />
        </FadeUp>
      )}

      {s?.showcase?.isVisible && s.showcase.items.length > 0 && (
        <ImageCarouselSection
          slides={s.showcase.items.map((img) => ({
            src: img.image.url,
            alt: img.image.alt as string,
          }))}
          aria-label={tCarousel("ariaLabel")}
          prevLabel={tCarousel("prevLabel")}
          nextLabel={tCarousel("nextLabel")}
        />
      )}

      {s?.brands?.isVisible && (
        <FadeUp className="bg-secondary">
          <AwardsSection
            label={s.brands.heading as string}
            logos={(s.brands.brands || []).map((award) => ({
              src: award.logo.url,
              alt: award.logo.alt as string,
              width: 120,
              height: 40,
            }))}
          />
        </FadeUp>
      )}

      {s?.faq?.isVisible && (
        <FaqSection
          label={s.faq.eyebrow as string}
          heading={s.faq.heading as string}
          items={s.faq.faqs
            .filter((f) => f.isVisible)
            .map((f) => ({
              question: f.question as string,
              answer: f.answer as string,
            }))}
        />
      )}
      <JsonLdSchema globalSeo={cms?.globalSeo} pageSeo={cms?.seo} />
    </main>
  );
}
