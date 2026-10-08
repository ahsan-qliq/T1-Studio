import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { HeroBanner } from "@/components/sections/HeroBanner";
import {
  SitemapSection,
  type SitemapGroup,
} from "@/components/sections/SitemapSection";

export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Sitemap" });
  const base = locale === "ar" ? "/ar" : "";
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: { canonical: `${base}/sitemap` },
  };
}

export default async function SitemapPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Sitemap" });

  const groups: SitemapGroup[] = [
    {
      heading: t("mainPagesHeading"),
      links: [
        { label: t("mainHome"), href: "/" },
        { label: t("mainSpaces"), href: "/spaces" },
        { label: t("mainProjects"), href: "/projects" },
        { label: t("mainInspiration"), href: "/inspiration" },
        { label: t("mainAbout"), href: "/about" },
        { label: t("mainContact"), href: "/contact" },
      ],
    },
    {
      heading: t("spacesHeading"),
      links: [
        { label: t("spacesKitchens"), href: "/spaces/kitchens" },
        { label: t("spacesWardrobes"), href: "/spaces/wardrobes" },
        { label: t("spacesLivingRooms"), href: "/spaces/living-rooms" },
        { label: t("spacesBedrooms"), href: "/spaces/bedrooms" },
        { label: t("spacesBathrooms"), href: "/spaces/bathrooms" },
        { label: t("spacesHomeOffices"), href: "/spaces/home-offices" },
        { label: t("spacesOutdoorLiving"), href: "/spaces/outdoor-living" },
        { label: t("spacesBespokeJoinery"), href: "/spaces/bespoke-joinery" },
      ],
    },
    {
      heading: t("helpfulLinksHeading"),
      links: [
        { label: t("linkPrivacyPolicy"), href: "/privacy-policy" },
        { label: t("linkTerms"), href: "/terms-and-conditions" },
        { label: t("linkCookiePolicy"), href: "/cookie-policy" },
        { label: t("linkAccessibility"), href: "/accessibility" },
        { label: t("linkSitemap"), href: "/sitemap" },
      ],
    },
    {
      heading: t("tradeHeading"),
      links: [
        { label: t("tradePartner"), href: "/trade" },
        { label: t("tradeWhyT1"), href: "/why-t1" },
        { label: t("tradeProjects"), href: "/projects" },
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
      <SitemapSection groups={groups} />
    </main>
  );
}
