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
  const t = await getTranslations({ locale, namespace: "CookiePolicy" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function CookiePolicyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "CookiePolicy" });

  const sections: PrivacySection[] = [
    {
      id: "about-this-policy",
      title: t("section1Title"),
      body: t("section1Body"),
    },
    {
      id: "what-cookies-are",
      title: t("section2Title"),
      body: t("section2Body"),
    },
    {
      id: "cookies-we-use",
      title: t("section3Title"),
      body: t("section3Body"),
      subsections: [
        { title: t("cat1Title"), body: t("cat1Body") },
        { title: t("cat2Title"), body: t("cat2Body") },
        { title: t("cat3Title"), body: t("cat3Body") },
        { title: t("cat4Title"), body: t("cat4Body") },
      ],
      note: t("section3Note"),
    },
    {
      id: "your-choices",
      title: t("section4Title"),
      body: t("section4Body"),
      items: [t("choice1"), t("choice2"), t("choice3")],
      note: t("section4Note"),
    },
    {
      id: "your-rights",
      title: t("section5Title"),
      body: t("section5Body"),
    },
    {
      id: "changes-to-policy",
      title: t("section6Title"),
      body: t("section6Body"),
    },
    {
      id: "contact-us",
      title: t("section7Title"),
      body: t("section7Body"),
      subsections: [
        {
          title: t("contactSubTitle"),
          items: [
            t("contact1"),
            t("contact2"),
            t("contact3"),
            t("contact4"),
          ],
        },
      ],
    },
    {
      id: "faq",
      title: t("section8Title"),
      subsections: [
        { title: t("faq1Q"), body: t("faq1A") },
        { title: t("faq2Q"), body: t("faq2A") },
        { title: t("faq3Q"), body: t("faq3A") },
        { title: t("faq4Q"), body: t("faq4A") },
        { title: t("faq5Q"), body: t("faq5A") },
      ],
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
