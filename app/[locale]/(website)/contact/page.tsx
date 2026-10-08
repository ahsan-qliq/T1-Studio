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
  const dreamSpaceConfig = getDreamSpaceConfig(tDreamSpace);

  console.log("Contact page CMS data:", s?.location);
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
          imageSrc={s.hero.backgroundImage.url || undefined}
        />
      )}

      {s?.contactInfo?.isVisible && (
        <ServicesSection
          label={s.contactInfo.eyebrow as string}
          heading={s.contactInfo.heading as string}
          services={s.contactInfo.items
            .filter((svc) => svc.isVisible)
            .map((svc) => ({
              title: svc.title as string,
              subtitle: svc.value as string,
              href: svc.href || undefined,
            }))}
        />
      )}

      <DreamSpaceSection
        {...dreamSpaceConfig}
        heading={tDreamSpace("heading")}
        imageAlt={tDreamSpace("imageAlt")}
        propertyTypeLabel={tDreamSpace("propertyTypeLabel")}
        spaceRequiredLabel={tDreamSpace("spaceRequiredLabel")}
        typeOfServiceLabel={tDreamSpace("typeOfServiceLabel")}
        timelineLabel={tDreamSpace("timelineLabel")}
        firstNameLabel={tDreamSpace("firstNameLabel")}
        lastNameLabel={tDreamSpace("lastNameLabel")}
        emailLabel={tDreamSpace("emailLabel")}
        phoneLabel={tDreamSpace("phoneLabel")}
        submitLabel={tDreamSpace("submitLabel")}
        developerDropdown1Label={tDreamSpace("developerProjectScaleLabel")}
        developerDropdown2Label={tDreamSpace("developerProjectTypeLabel")}
        developerDropdown3Label={tDreamSpace("developerServiceLabel")}
        companyNameLabel={tDreamSpace("companyNameLabel")}
        messageLabel={tDreamSpace("messageLabel")}
        consentText={tDreamSpace("consentText")}
        privacyPolicyLabel={tDreamSpace("privacyPolicyLabel")}
        privacyPolicyHref={tDreamSpace("privacyPolicyHref")}
        consentRequired={tDreamSpace("consentRequired")}
      />

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
