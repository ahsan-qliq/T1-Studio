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
  const t = await getTranslations({ locale, namespace: "PrivacyPolicy" });
  const base = locale === "ar" ? "/ar" : "";
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: { canonical: `${base}/privacy-policy` },
  };
}

export default async function PrivacyPolicyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "PrivacyPolicy" });

  
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
          "@id": "https://t1-studio.com/privacy-policy/#breadcrumb",
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
              item: "https://t1-studio.com/privacy-policy/",
            },
          ],
        },
        {
          "@type": "WebPage",
          "@id": "https://t1-studio.com/privacy-policy/#webpage",
          url: "https://t1-studio.com/privacy-policy/",
          name: t("metaTitle"),
          description: t("metaDescription"),
          inLanguage: locale === "ar" ? "ar" : "en",
          isPartOf: { "@id": "https://t1-studio.com/#website" },
          breadcrumb: { "@id": "https://t1-studio.com/privacy-policy/#breadcrumb" },
        },
      ],
    },
  };

  const sections: PrivacySection[] = [
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
