import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { HeroBanner } from "@/components/sections/HeroBanner";
import {
  PrivacyPolicySection,
  type PrivacySection,
} from "@/components/sections/PrivacyPolicySection";
import { JsonLdSchema } from "@/components/JsonLdSchema";

export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "TermsConditions" });
  const base = locale === "ar" ? "/ar" : "";
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: { canonical: `${base}/terms-and-conditions` },
  };
}

export default async function TermsConditionsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "TermsConditions" });

  const pageSchema = {
    structuredData: {
      "@graph": [
        {
          "@type": "Organization",
          "@id": "https://t1-studio.com/#organization",
          name: "T1 Studio",
          url: "https://t1-studio.com/",
        },
        {
          "@type": "BreadcrumbList",
          "@id": "https://t1-studio.com/terms-and-conditions/#breadcrumb",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: t("breadcrumbHome"),
              item: "https://t1-studio.com/",
            },
            {
              "@type": "ListItem",
              position: 2,
              name: t("breadcrumbCurrent"),
              item: "https://t1-studio.com/terms-and-conditions/",
            },
          ],
        },
        {
          "@type": "WebPage",
          "@id": "https://t1-studio.com/terms-and-conditions/#webpage",
          url: "https://t1-studio.com/terms-and-conditions/",
          name: t("metaTitle"),
          description: t("metaDescription"),
          inLanguage: locale === "ar" ? "ar" : "en",
          isPartOf: { "@id": "https://t1-studio.com/#website" },
          breadcrumb: { "@id": "https://t1-studio.com/terms-and-conditions/#breadcrumb" },
        },
      ],
    },
  };

  const sections: PrivacySection[] = [
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
        {
          title: t("sub2_0Title"),
          body: t("sub2_0Body"),
        },
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
        {
          title: t("sub3_4Title"),
          items: [t("sub3_4A"), t("sub3_4B"), t("sub3_4C")],
        },
        {
          title: t("sub3_5Title"),
          items: [t("sub3_5A"), t("sub3_5B")],
        },
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
        heading={t("heading")}
        description={t("description")}
        imageSrc="/assets/images/spaces.png"
        breadcrumbs={[
          { label: t("breadcrumbHome"), href: "/" },
          { label: t("breadcrumbCurrent") },
        ]}
      />
      <PrivacyPolicySection
        tocLabel={t("tocLabel")}
        lastUpdated={t("lastUpdated")}
        sections={sections}
      />
      <JsonLdSchema pageSeo={pageSchema} />
    </main>
  );
}
