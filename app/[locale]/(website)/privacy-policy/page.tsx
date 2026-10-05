import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
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
  const t = await getTranslations({ locale, namespace: "PrivacyPolicy" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function PrivacyPolicyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "PrivacyPolicy" });

  
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
    </main>
  );
}
