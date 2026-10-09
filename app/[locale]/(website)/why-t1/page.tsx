import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getWhyT1PageCms } from "@/lib/cms/why-t1";
import { JsonLdSchema } from "@/components/JsonLdSchema";
import { HeroBanner } from "@/components/sections/HeroBanner";
import { ComparisonSection } from "@/components/sections/ComparisonSection";
import { ProjectJourneySection } from "@/components/sections/ProjectJourneySection";
import { StatsBar } from "@/components/sections/StatsBar";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { ClientTestimonialSection } from "@/components/sections/ClientTestimonialSection";
import { AwardsSection } from "@/components/sections/AwardsSection";
import { ReferralPartnerSection } from "@/components/sections/ReferralPartnerSection";
import { SignatureProjectsSection } from "@/components/sections/SignatureProjectsSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { FadeUp } from "@/components/ui/animate";
import { resolveJourney, pick } from "@/app/config/home.config";
import type { PickFn } from "@/app/config/home.config";
import {
  mapWhyT1ComparisonColumns,
  mapWhyT1Stats,
  mapWhyT1Benefits,
  mapWhyT1ClientTestimonials,
  mapWhyT1Brands,
  mapWhyT1Partnership,
  mapWhyT1DesignTips,
  mapWhyT1Faq,
} from "@/app/config/why-t1.config";

export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const cms = await getWhyT1PageCms(locale);
  const seo = cms?.seo;
  return {
    ...(seo?.metaTitle && { title: seo.metaTitle }),
    ...(seo?.metaDescription && { description: seo.metaDescription }),
    alternates: { canonical: seo?.canonicalUrl ?? `${locale === "ar" ? "/ar" : ""}/why-t1` },
    ...(seo?.ogImage?.url && {
      openGraph: { images: [{ url: seo.ogImage.url }] },
      twitter: { images: [seo.ogImage.url] },
    }),
  };
}

export default async function WhyT1Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const [cms, tJourney, tStats] = await Promise.all([
    getWhyT1PageCms(locale),
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
          breadcrumbs={s.hero.breadcrumbs.map((bc) => ({
            label: bc.label as string,
            href: bc.href || "/",
          }))}
          imageSrc={s.hero.backgroundImage.url || undefined}
        />
      )}

      {s?.comparison?.isVisible && (
        <FadeUp>
          <ComparisonSection
            heading={s.comparison.heading as string}
            columns={mapWhyT1ComparisonColumns(s.comparison)}
          />
        </FadeUp>
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
            items={mapWhyT1Stats(s.stats)}
            sectionLabel={tStats("sectionLabel")}
          />
        </FadeUp>
      )}

      {s?.benefits?.isVisible && (
        <ServicesSection
          label={s.benefits.eyebrow as string}
          heading={s.benefits.heading as string}
          services={mapWhyT1Benefits(s.benefits)}
        />
      )}

      {s?.clientTestimonials?.isVisible && (
        <ClientTestimonialSection
          label={s.clientTestimonials.eyebrow}
          heading={s.clientTestimonials.heading}
          variant="card"
          testimonials={mapWhyT1ClientTestimonials(s.clientTestimonials)}
        />
      )}

      {s?.brands?.isVisible && (
        <FadeUp className="bg-secondary">
          <AwardsSection
            label={s.brands.heading as string}
            logos={mapWhyT1Brands(s.brands)}
          />
        </FadeUp>
      )}

      {s?.partnership?.isVisible && (
        <ReferralPartnerSection {...mapWhyT1Partnership(s.partnership)} />
      )}

      {s?.designTips?.isVisible && (
        <SignatureProjectsSection
          heading={s.designTips.heading as string}
          viewAllLabel={s.designTips.button.label as string}
          viewAllHref="/projects"
          projects={mapWhyT1DesignTips(s.designTips)}
        />
      )}

      {s?.faq?.isVisible && (
        <FaqSection
          label={s.faq.eyebrow as string}
          heading={s.faq.heading as string}
          items={mapWhyT1Faq(s.faq)}
        />
      )}
      <JsonLdSchema globalSeo={cms?.globalSeo} pageSeo={cms?.seo} />
    </main>
  );
}
