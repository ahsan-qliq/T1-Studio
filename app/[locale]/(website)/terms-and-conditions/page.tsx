import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { HeroBanner } from "@/components/sections/HeroBanner";
import {
  PrivacyPolicySection,
  type PrivacySection,
} from "@/components/sections/PrivacyPolicySection";
import { JsonLdSchema } from "@/components/JsonLdSchema";
import { getTermsConditionsCms } from "@/lib/cms/terms-conditions";

export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const [cms, t] = await Promise.all([
    getTermsConditionsCms(locale),
    getTranslations({ locale, namespace: "TermsConditions" }),
  ]);
  const seo = cms?.seo;
  const base = locale === "ar" ? "/ar" : "";
  return {
    title: seo?.metaTitle ?? t("metaTitle"),
    description: seo?.metaDescription ?? t("metaDescription"),
    alternates: { canonical: seo?.canonicalUrl || `${base}/terms-and-conditions` },
    ...(seo?.ogImage?.url && {
      openGraph: { images: [{ url: seo.ogImage.url }] },
      twitter: { images: [seo.ogImage.url] },
    }),
  };
}

export default async function TermsConditionsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const [cms, t] = await Promise.all([
    getTermsConditionsCms(locale),
    getTranslations({ locale, namespace: "TermsConditions" }),
  ]);

  const hero = cms?.sections?.hero;
  const content = cms?.sections?.content;

  const sections: PrivacySection[] = content?.items?.length
    ? content.items
        .filter((item) => item.isVisible !== false)
        .map((item) => ({
          id: item._id,
          title: item.title,
          body: item.intro || item.body,
          subsections: item.subsections?.map((sub) => ({
            title: sub.title,
            body: sub.body,
            items: sub.items,
          })),
          ...(item.linkText && { linkText: item.linkText }),
          ...(item.linkHref
            ? { linkHref: item.linkHref }
            : item.title.toLowerCase().includes("contact") && content.contactEmail
              ? { linkText: content.contactEmail, linkHref: `mailto:${content.contactEmail}` }
              : {}),
        }))
    : [
        {
          id: "terms-and-conditions",
          title: t("section1Title"),
          body: t("section1Intro"),
          subsections: [
            { title: t("sub1_1Title"), body: t("sub1_1Body") },
            { title: t("sub1_2Title"), body: t("sub1_2Body") },
            { title: t("sub1_3Title"), body: t("sub1_3Body") },
            { title: t("sub1_4Title"), body: t("sub1_4Body") },
            { title: t("sub1_5Title"), body: t("sub1_5Body") },
            { title: t("sub1_6Title"), body: t("sub1_6Body") },
            { title: t("sub1_7Title"), body: t("sub1_7Body") },
            { title: t("sub1_8Title"), body: t("sub1_8Body") },
          ],
        },
        {
          id: "campaign-promotions",
          title: t("section2Title"),
          subsections: [
            { title: t("sub2_0Title"), body: t("sub2_0Body") },
            { title: t("sub2_1Title"), body: t("sub2_1Body") },
            { title: t("sub2_2Title"), body: t("sub2_2Body") },
            { title: t("sub2_3Title"), body: t("sub2_3Body") },
            { title: t("sub2_4Title"), body: t("sub2_4Body") },
          ],
        },
        {
          id: "warranty-terms",
          title: t("section3Title"),
          subsections: [
            { title: t("sub3_1Title"), body: t("sub3_1Body") },
            { title: t("sub3_2Title"), body: t("sub3_2Body") },
            { title: t("sub3_3Title"), body: t("sub3_3Body") },
            { title: t("sub3_4Title"), items: [t("sub3_4A"), t("sub3_4B"), t("sub3_4C")] },
            { title: t("sub3_5Title"), items: [t("sub3_5A"), t("sub3_5B")] },
          ],
        },
        {
          id: "general",
          title: t("section4Title"),
          items: [t("gen_A"), t("gen_B"), t("gen_C"), t("gen_D")],
        },
      ];
  return (
    <main>
      <HeroBanner
        heading={hero?.heading ?? t("heading")}
        description={hero?.description ?? t("description")}
        imageSrc={hero?.bgImage?.url || "/assets/images/spaces.png"}
        breadcrumbs={
          hero?.breadcrumbs?.map((b) => ({
            label: b.label,
            href: b.href || undefined,
          })) ?? [
            { label: t("breadcrumbHome"), href: "/" },
            { label: t("breadcrumbCurrent") },
          ]
        }
      />
      <PrivacyPolicySection
        tocLabel={content?.tocLabel ?? t("tocLabel")}
        lastUpdated={content?.lastUpdated ?? t("lastUpdated")}
        sections={sections}
      />
      <JsonLdSchema globalSeo={cms?.globalSeo} pageSeo={cms?.seo} />
    </main>
  );
}
