import { getTranslations } from "next-intl/server";
import { getTradePageCms } from "@/lib/cms/trade";
import { HeroBanner } from "@/components/sections/HeroBanner";
import { AwardsSection } from "@/components/sections/AwardsSection";
import { MaterialInspirationSection } from "@/components/sections/MaterialInspirationSection";
import { ProjectJourneySection } from "@/components/sections/ProjectJourneySection";
import {
  SmartSpaceDiagram,
  KellerBadge,
} from "@/components/sections/ProjectJourneySection";
import { StatsBar } from "@/components/sections/StatsBar";
import { SignatureProjectsSection } from "@/components/sections/SignatureProjectsSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { ReferralPartnerSection } from "@/components/sections/ReferralPartnerSection";
import { DreamSpaceSection } from "@/components/sections/DreamSpaceSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { FadeUp } from "@/components/ui/animate";
import {
  Globe,
  Lightbulb,
  Building2,
  Rocket,
  TrendingUp,
  User,
  Maximize2,
  Shield,
  CheckCircle2,
  RefreshCw,
  LayoutGrid,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { createElement } from "react";

const JOURNEY_ICONS: LucideIcon[] = [Globe, Lightbulb, Building2, Rocket, TrendingUp];
const JOURNEY_HIGHLIGHT_ICONS: LucideIcon[] = [User, Maximize2, Shield, CheckCircle2, RefreshCw];

const PROJECT_SIZES = [
  { width: 700, height: 500 },
  { width: 280, height: 180 },
  { width: 560, height: 480 },
];

export const revalidate = 3600;

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

  // ── Journey steps ─────────────────────────────────────────────────────────
  const journeySteps = s?.journey?.steps
    .filter((step) => step.isVisible)
    .map((step, i) => ({
      number: String(i + 1).padStart(2, "0"),
      icon: JOURNEY_ICONS[i] ?? Globe,
      title: step.title as string,
      subtitle: step.subtitle as string,
      description: step.description as string,
      advantageText: step.advantageTitle as string,
      highlightIcon: JOURNEY_HIGHLIGHT_ICONS[i] ?? User,
      highlightText: step.highlight as string,
      extraContent:
        i === 1
          ? createElement(SmartSpaceDiagram, {
              badge: tJourney("smartSpaceBadge"),
              items: [
                { icon: LayoutGrid, label: tJourney("smartSpaceItem1") },
                { icon: LayoutGrid, label: tJourney("smartSpaceItem2") },
                { icon: LayoutGrid, label: tJourney("smartSpaceItem3") },
              ],
            })
          : i === 2
            ? createElement(KellerBadge, {
                line1: tJourney("kellerLine1"),
                line2: tJourney("kellerLine2"),
              })
            : undefined,
    })) ?? [];

  // ── Dream Space field helpers ──────────────────────────────────────────────
  const cta = s?.consultationCTA;
  const getField = (name: string) => cta?.fields.find((f) => f.name === name);
  const mapFieldOptions = (name: string) =>
    getField(name)?.options?.map((o) => ({ value: o.value, label: o.label as string })) ?? [];

  return (
    <main>
      {s?.hero?.isVisible && (
        <HeroBanner
          badge={s.hero.eyebrow as string}
          heading={s.hero.heading as string}
          description={s.hero.description as string}
          cta={s.hero.primaryButton.label as string}
          imageSrc={s.hero.backgroundImage.url || undefined}
        />
      )}

      {s?.awardsRecognition?.isVisible && (
        <FadeUp>
          <AwardsSection
            label={s.awardsRecognition.heading as string}
            logos={s.awardsRecognition.awards.map((award) => ({
              src: award.logo.url,
              alt: award.logo.alt as string,
              width: 120,
              height: 40,
            }))}
          />
        </FadeUp>
      )}

      {s?.materialInspiration?.isVisible && (
        <MaterialInspirationSection
          heading={s.materialInspiration.heading}
          items={s.materialInspiration.materials.map((item) => ({
            src: item.image.url,
            alt: item.image.alt as string,
            label: item.label,
          }))}
        />
      )}

      {s?.journey?.isVisible && journeySteps.length > 0 && (
        <FadeUp>
          <ProjectJourneySection
            label={s.journey.eyebrow as string}
            heading={s.journey.heading as string}
            advantageLabel={tJourney("advantageLabel")}
            prevLabel={tJourney("prevLabel")}
            nextLabel={tJourney("nextLabel")}
            steps={journeySteps}
          />
        </FadeUp>
      )}

      {s?.stats?.isVisible && (
        <FadeUp>
          <StatsBar
            items={s.stats.statistics
              .filter((stat) => stat.isVisible)
              .map((stat) => ({ value: stat.value, label: stat.label as string }))}
            sectionLabel={tStats("sectionLabel")}
          />
        </FadeUp>
      )}

      {s?.signatureProjects?.isVisible && (
        <SignatureProjectsSection
          heading={s.signatureProjects.heading as string}
          viewAllLabel={s.signatureProjects.button.label as string}
          viewAllHref="/projects"
          projects={s.signatureProjects.projects
            .filter((pr) => pr.isVisible)
            .map((pr, i) => ({
              id: pr._id,
              title: pr.title as string,
              location: pr.location as string,
              href: pr.href,
              image: {
                src: pr.image.url,
                alt: pr.image.alt as string,
                ...(PROJECT_SIZES[i] ?? { width: 700, height: 500 }),
              },
            }))}
        />
      )}

      {s?.services?.isVisible && (
        <ServicesSection
          label={s.services.eyebrow as string}
          heading={s.services.heading as string}
          services={s.services.services
            .filter((svc) => svc.isVisible)
            .map((svc) => ({
              title: svc.title as string,
              subtitle: svc.description as string,
            }))}
        />
      )}

      {s?.partnership?.isVisible && (
        <FadeUp>
          <ReferralPartnerSection
            heading={s.partnership.heading as string}
            description={s.partnership.description as string}
            imageSrc={s.partnership.image.url}
            imageAlt={s.partnership.image.alt as string}
            ctaLabel={s.partnership.button.label as string}
            ctaHref={s.partnership.button.href || "/"}
            steps={s.partnership.steps.map((step) => ({
              label: step.title as string,
              iconName: step.icon,
            }))}
            benefits={[]}
          />
        </FadeUp>
      )}

      {cta?.isVisible && (
        <DreamSpaceSection
          heading={cta.heading as string}
          imageSrc={cta.image?.url || ""}
          imageAlt={cta.image?.alt as string}
          audienceTabs={cta.tabs.map((tab) => ({
            id: tab.value,
            label: tab.label as string,
          }))}
          propertyTypeLabel={getField("propertyType")?.label as string ?? ""}
          propertyTypeOptions={mapFieldOptions("propertyType")}
          spaceRequiredLabel={getField("spaceRequired")?.label as string ?? ""}
          spaceRequiredOptions={mapFieldOptions("spaceRequired")}
          typeOfServiceLabel={getField("typeOfService")?.label as string ?? ""}
          typeOfServiceOptions={mapFieldOptions("typeOfService")}
          timelineLabel={getField("timeline")?.label as string ?? ""}
          timelineOptions={mapFieldOptions("timeline")}
          firstNameLabel={getField("firstName")?.label as string ?? ""}
          lastNameLabel={getField("lastName")?.label as string ?? ""}
          emailLabel={getField("email")?.label as string ?? ""}
          phoneLabel={getField("phone")?.label as string ?? ""}
          submitLabel={cta.submitButtonLabel as string}
        />
      )}

      {s?.faq?.isVisible && (
        <FaqSection
          label={s.faq.eyebrow as string}
          heading={s.faq.heading as string}
          items={s.faq.faqs
            .filter((f) => f.isVisible)
            .map((f) => ({
              question: f.question as string,
              answer: f.answer as string,
            }))}
        />
      )}
    </main>
  );
}
