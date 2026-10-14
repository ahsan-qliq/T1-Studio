import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { HeroBanner } from "@/components/sections/HeroBanner";
import {
  PrivacyPolicySection,
  type PrivacySection,
} from "@/components/sections/PrivacyPolicySection";
import { JsonLdSchema } from "@/components/JsonLdSchema";
import { getPrivacyPolicyCms } from "@/lib/cms/privacy-policy";

export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const [cms, t] = await Promise.all([
    getPrivacyPolicyCms(locale),
    getTranslations({ locale, namespace: "PrivacyPolicy" }),
  ]);
  const seo = cms?.seo;
  const base = locale === "ar" ? "/ar" : "";
  return {
    title: seo?.metaTitle ?? t("metaTitle"),
    description: seo?.metaDescription ?? t("metaDescription"),
    alternates: { canonical: seo?.canonicalUrl || `${base}/privacy-policy` },
    ...(seo?.ogImage?.url && {
      openGraph: { images: [{ url: seo.ogImage.url }] },
      twitter: { images: [seo.ogImage.url] },
    }),
  };
}

export default async function PrivacyPolicyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const [cms, t] = await Promise.all([
    getPrivacyPolicyCms(locale),
    getTranslations({ locale, namespace: "PrivacyPolicy" }),
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
          id: "information-collection",
          title: t("section1Title"),
          body: t("section1Body"),
        },
        {
          id: "sharing-of-information",
          title: t("section2Title"),
          body: t("section2Body"),
        },
        {
          id: "security",
          title: t("section3Title"),
          body: t("section3Body"),
        },
        {
          id: "cookies",
          title: t("section4Title"),
          body: t("section4Body"),
        },
        {
          id: "changes-to-policy",
          title: t("section5Title"),
          body: t("section5Body"),
        },
        {
          id: "contact-us",
          title: t("section6Title"),
          body: t("section6Body"),
          linkText: t("contactEmail"),
          linkHref: `mailto:${t("contactEmail")}`,
        },
      ];

  return (
    <main>
      <HeroBanner
        heading={hero?.heading}
        description={hero?.description}
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
        tocLabel={content?.tocLabel ?? ''}
        lastUpdated={content?.lastUpdated ?? ''}
        sections={sections}
      />
      <JsonLdSchema globalSeo={cms?.globalSeo} pageSeo={cms?.seo} />
    </main>
  );
}
