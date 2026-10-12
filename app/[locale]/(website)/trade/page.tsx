import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getTradePageCms } from "@/lib/cms/trade";
import { JsonLdSchema } from "@/components/JsonLdSchema";
import { HeroBanner } from "@/components/sections/HeroBanner";
import { AwardsSection } from "@/components/sections/AwardsSection";
import { MaterialInspirationSection } from "@/components/sections/MaterialInspirationSection";
import { ProjectJourneySection } from "@/components/sections/ProjectJourneySection";
import { StatsBar } from "@/components/sections/StatsBar";
import { SignatureProjectsSection } from "@/components/sections/SignatureProjectsSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { PartnerLeadSection } from "@/components/sections/PartnerLeadSection";
import { ResourceCenterSection } from "@/components/sections/ResourceCenterSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { FadeUp } from "@/components/ui/animate";
import { MilestoneTimelineSection } from "@/components/sections/MilestoneTimelineSection";
import { resolveJourney, pick } from "@/app/config/home.config";
import type { PickFn } from "@/app/config/home.config";
import {
  mapTradeLogos,
  mapTradeWhoWeWorkWith,
  mapTradeStats,
  mapTradeProjects,
  mapTradeBenefits,
  mapTradeIndustryServices,
  mapTradeFaq,
  getResourceCenterConfig,
  getPartnerLeadConfig,
} from "@/app/config/trade.config";

export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const cms = await getTradePageCms(locale);
  const seo = cms?.seo;
  return {
    ...(seo?.metaTitle && { title: seo.metaTitle }),
    ...(seo?.metaDescription && { description: seo.metaDescription }),
    alternates: {
      canonical: seo?.canonicalUrl ?? `${locale === "ar" ? "/ar" : ""}/trade`,
    },
    ...(seo?.ogImage?.url && {
      openGraph: { images: [{ url: seo.ogImage.url }] },
      twitter: { images: [seo.ogImage.url] },
    }),
    ...(seo?.noIndex || seo?.noFollow
      ? { robots: { index: !seo.noIndex, follow: !seo.noFollow } }
      : {}),
  };
}

export default async function TradePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const [cms, tJourney, tStats] = await Promise.all([
    getTradePageCms(locale),
    getTranslations({ locale, namespace: "ProjectJourney" }),
    getTranslations({ locale, namespace: "Stats" }),
  ]);
  const s = cms?.sections;
  const p: PickFn = (field) => pick(field, locale);
  const journey = resolveJourney(s?.journey, p, tJourney);

  return (
    <main>
      {s?.hero?.isVisible && (
        <HeroBanner
          badge={s.hero.eyebrow as string}
          heading={s.hero.heading as string}
          description={s.hero.description as string}
          breadcrumbs={
            s.hero.breadcrumbs?.map((b) => ({
              label: b.label as string,
              href: b.href || undefined,
            })) || []
          }
          imageSrc={s.hero.backgroundImage.url || undefined}
        />
      )}

      {s?.logos?.isVisible && (
        <FadeUp className="bg-secondary">
          <AwardsSection
            label={s.logos.heading as string}
            logos={mapTradeLogos(s.logos)}
          />
        </FadeUp>
      )}

      {s?.whoWeWorkWith?.isVisible && (
        <MaterialInspirationSection
          heading={s.whoWeWorkWith.heading}
          items={mapTradeWhoWeWorkWith(s.whoWeWorkWith)}
        />
      )}

      {s?.journey?.isVisible && journey.steps.length > 0 && (
        <FadeUp>
          <ProjectJourneySection
            label={journey.label}
            heading={journey.heading}
            advantageLabel={tJourney("advantageLabel")}
            prevLabel={tJourney("prevLabel")}
            nextLabel={tJourney("nextLabel")}
            steps={journey.steps}
          />
        </FadeUp>
      )}

      {s?.stats?.isVisible && (
        <FadeUp>
          <StatsBar
            items={mapTradeStats(s.stats)}
            sectionLabel={tStats("sectionLabel")}
          />
        </FadeUp>
      )}

      {s?.projects?.isVisible && (
        <SignatureProjectsSection
          heading={s.projects.heading as string}
          viewAllLabel={s.projects.button.label as string}
          viewAllHref="/projects"
          projects={mapTradeProjects(s.projects)}
        />
      )}

      {s?.benefits?.isVisible && (
        <ServicesSection
          label={s.benefits.eyebrow as string}
          heading={s.benefits.heading as string}
          services={mapTradeBenefits(s.benefits)}
        />
      )}

      {s?.industryServices?.isVisible && (
        <MilestoneTimelineSection
          heading={s.industryServices.heading as string}
          milestones={mapTradeIndustryServices(s.industryServices)}
        />
      )}

      <ResourceCenterSection {...getResourceCenterConfig(locale)} />

      <PartnerLeadSection {...getPartnerLeadConfig()} />

      {s?.faq?.isVisible && (
        <FaqSection
          label={s.faq.eyebrow as string}
          heading={s.faq.heading as string}
          items={mapTradeFaq(s.faq)}
        />
      )}
      <JsonLdSchema globalSeo={cms?.globalSeo} pageSeo={cms?.seo} />
    </main>
  );
}
