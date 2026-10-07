import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { getGlobalSeo } from "@/lib/cms/global-seo";
import { JsonLdSchema } from "@/components/JsonLdSchema";
import { HeroBanner } from "@/components/sections/HeroBanner";
import {
  PrivacyPolicySection,
  type PrivacySection,
} from "@/components/sections/PrivacyPolicySection";

export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "TermsConditions" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function TermsConditionsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const globalSeo = await getGlobalSeo(locale);
  const t = await getTranslations({ locale, namespace: "TermsConditions" });

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
      <JsonLdSchema globalSeo={globalSeo} />
    </main>
  );
}
