import { getTranslations } from "next-intl/server";
import { HeroBanner } from "@/components/sections/HeroBanner";
import {
  PrivacyPolicySection,
  type PrivacySection,
} from "@/components/sections/PrivacyPolicySection";

export default async function TermsConditionsPage() {
  const t = await getTranslations("TermsConditions");

  const sections: PrivacySection[] = [
    {
      id: "acceptance-of-terms",
      title: t("section1Title"),
      body: t("section1Body"),
    },
    {
      id: "use-of-our-website",
      title: t("section2Title"),
      body: t("section2Body"),
    },
    {
      id: "intellectual-property",
      title: t("section3Title"),
      body: t("section3Body"),
    },
    {
      id: "user-responsibilities",
      title: t("section4Title"),
      body: t("section4Body"),
    },
    {
      id: "limitation-of-liability",
      title: t("section5Title"),
      body: t("section5Body"),
    },
    {
      id: "governing-law",
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
