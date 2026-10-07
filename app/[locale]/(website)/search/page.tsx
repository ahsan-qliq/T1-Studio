import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { getGlobalSeo } from "@/lib/cms/global-seo";
import { JsonLdSchema } from "@/components/JsonLdSchema";
import { SearchShell } from "./_components/SearchShell";

export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Search" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function SearchPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const globalSeo = await getGlobalSeo(locale);
  const t = await getTranslations({ locale, namespace: "Search" });

  const popularTerms = [
    t("popularKitchens"),
    t("popularLivingRooms"),
    t("popularBedrooms"),
    t("popularProjects"),
    t("popularTrade"),
    t("popularMaterials"),
  ];

  return (
    <main>
      <Suspense>
        <SearchShell
          imageSrc="/assets/images/spaces.png"
          imageAlt={t("bgImageAlt")}
          heading={t("heading")}
          description={t("description")}
          placeholder={t("placeholder")}
          searchLabel={t("searchLabel")}
          popularHeading={t("popularHeading")}
          popularTerms={popularTerms}
          recentHeading={t("recentHeading")}
          clearLabel={t("clearRecent")}
        />
      </Suspense>
      <JsonLdSchema globalSeo={globalSeo} />
    </main>
  );
}
