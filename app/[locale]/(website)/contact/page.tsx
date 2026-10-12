import type { Metadata } from "next";
import { getContactPageCms } from "@/lib/cms/contact";
import { JsonLdSchema } from "@/components/JsonLdSchema";
import { HeroBanner } from "@/components/sections/HeroBanner";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { DreamSpaceSection } from "@/components/sections/DreamSpaceSection";
import { MapSection } from "@/components/sections/MapSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { getTranslations } from "next-intl/server";
import { getDreamSpaceConfig } from "@/app/config/home.config";
import { mapContactServices } from "@/app/config/contact.config";

export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const cms = await getContactPageCms(locale);
  const seo = cms?.seo;
  return {
    ...(seo?.metaTitle && { title: seo.metaTitle }),
    ...(seo?.metaDescription && { description: seo.metaDescription }),
    alternates: { canonical: seo?.canonicalUrl ?? `${locale === "ar" ? "/ar" : ""}/contact` },
    ...(seo?.ogImage?.url && {
      openGraph: { images: [{ url: seo.ogImage.url }] },
      twitter: { images: [seo.ogImage.url] },
    }),
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const [cms, tDreamSpace] = await Promise.all([
    getContactPageCms(locale),
    getTranslations({ locale, namespace: "DreamSpace" }),
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

      {s?.contactInfo?.isVisible && (
        <ServicesSection
          label={s.contactInfo.eyebrow as string}
          heading={s.contactInfo.heading as string}
          services={mapContactServices(s.contactInfo)}
        />
      )}

      <DreamSpaceSection {...getDreamSpaceConfig(tDreamSpace)} />

      {s?.location?.isVisible && s.location.mapEmbedUrl && (
        <MapSection
          embedUrl={s.location.mapEmbedUrl}
          title={s.location.heading}
          height={480}
        />
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
