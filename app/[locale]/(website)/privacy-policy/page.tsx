import { getTranslations } from "next-intl/server";
import { HeroBanner } from "@/components/sections/HeroBanner";
import {
  PrivacyPolicySection,
  type PrivacySection,
} from "@/components/sections/PrivacyPolicySection";

export default async function PrivacyPolicyPage() {
  const t = await getTranslations("PrivacyPolicy");

  const sections: PrivacySection[] = [
    {
      id: "information-we-collect",
      title: t("section1Title"),
      body: t("section1Body"),
    },
    {
      id: "how-we-use-your-information",
      title: t("section2Title"),
      body: t("section2Body"),
    },
    {
      id: "cookies-tracking-technologies",
      title: t("section3Title"),
      body: t("section3Body"),
    },
    {
      id: "data-sharing",
      title: t("section4Title"),
      body: t("section4Body"),
    },
    {
      id: "data-security",
      title: t("section5Title"),
      body: t("section5Body"),
    },
    {
      id: "your-rights",
      title: t("section6Title"),
      body: t("section6Body"),
    },
    {
      id: "contact-us",
      title: t("section7Title"),
      body: t("section7Body"),
      linkText: t("contactEmail"),
      linkHref: `mailto:${t("contactEmail")}`,
    },
  ];

  return (
    <main>
      <HeroBanner
        badge={t("badge")}
        heading={t("heading")}
        description={t("description")}
        imageSrc="/assets/images/spaces.png"
      />
      <PrivacyPolicySection
        tocLabel={t("tocLabel")}
        lastUpdated={t("lastUpdated")}
        sections={sections}
      />
    </main>
  );
}
