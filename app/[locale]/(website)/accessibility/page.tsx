import { getTranslations } from "next-intl/server";
import { HeroBanner } from "@/components/sections/HeroBanner";
import {
  PrivacyPolicySection,
  type PrivacySection,
} from "@/components/sections/PrivacyPolicySection";

export const revalidate = 3600;

export default async function AccessibilityPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Accessibility" });

  const sections: PrivacySection[] = [
    {
      id: "commitment",
      title: t("section1Title"),
      body: t("section1Body"),
    },
    {
      id: "standard",
      title: t("section2Title"),
      body: t("section2Body"),
      items: [
        t("std1"),
        t("std2"),
        t("std3"),
        t("std4"),
        t("std5"),
        t("std6"),
        t("std7"),
      ],
      note: t("section2Note"),
    },
    {
      id: "shortfalls",
      title: t("section3Title"),
      body: t("section3Body"),
      subsections: [
        { title: t("short1Title"), body: t("short1Body") },
        { title: t("short2Title"), body: t("short2Body") },
        { title: t("short3Title"), body: t("short3Body") },
        { title: t("short4Title"), body: t("short4Body") },
      ],
      note: t("section3Note"),
    },
    {
      id: "beyond-website",
      title: t("section4Title"),
      body: t("section4Body"),
    },
    {
      id: "contact",
      title: t("section5Title"),
      body: t("section5Body"),
      subsections: [
        {
          title: t("contactSubTitle"),
          items: [
            t("contact1"),
            t("contact2"),
            t("contact3"),
            t("contact4"),
            t("contact5"),
          ],
        },
      ],
      note: t("section5Note"),
    },
    {
      id: "faq",
      title: t("section6Title"),
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
