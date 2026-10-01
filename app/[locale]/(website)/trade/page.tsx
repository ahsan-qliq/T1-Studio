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
import { getDreamSpaceConfig } from "@/app/config/home.config";

const JOURNEY_ICONS: LucideIcon[] = [
  Globe,
  Lightbulb,
  Building2,
  Rocket,
  TrendingUp,
];
const JOURNEY_HIGHLIGHT_ICONS: LucideIcon[] = [
  User,
  Maximize2,
  Shield,
  CheckCircle2,
  RefreshCw,
];

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

  const [cms, tJourney, tStats, tDreamSpace] = await Promise.all([
    getTradePageCms(locale),
    getTranslations({ locale, namespace: "ProjectJourney" }),
    getTranslations({ locale, namespace: "Stats" }),
    getTranslations("DreamSpace"),
  ]);
const dreamSpaceConfig = getDreamSpaceConfig(tDreamSpace);
  const s = cms?.sections;

  // ── Journey steps ─────────────────────────────────────────────────────────
  const journeySteps =
    s?.journey?.steps
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
  return (
    <main>
      {s?.hero?.isVisible && (
        <HeroBanner
          badge={s.hero.eyebrow as string}
          heading={s.hero.heading as string}
          description={s.hero.description as string}
          breadcrumbs={s.hero.breadcrumbs?.map((b) => ({
            label: b.label as string,
            href: b.href || undefined,
          })) || []}
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

      {s?.whoWeWorkWith?.isVisible && (
        <MaterialInspirationSection
          heading={s.whoWeWorkWith.heading}
          items={s.whoWeWorkWith.items.map((item) => ({
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
            items={s.stats.stats
              .filter((stat) => stat.isVisible)
              .map((stat) => ({
                value: stat.value,
                label: stat.label as string,
              }))}
            sectionLabel={tStats("sectionLabel")}
          />
        </FadeUp>
      )}

      {s?.projects?.isVisible && (
        <SignatureProjectsSection
          heading={s.projects.heading as string}
          viewAllLabel={s.projects.button.label as string}
          viewAllHref="/projects"
          projects={s.projects.projects
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

      {s?.benefits?.isVisible && (
        <ServicesSection
          label={s.benefits.eyebrow as string}
          heading={s.benefits.heading as string}
          services={s.benefits.items
            .filter((svc) => svc.isVisible)
            .map((svc) => ({
              title: svc.title as string,
              subtitle: svc.description as string,
            }))}
        />
      )}

      {/* {s?.partnershipServices?.isVisible && (
        <FadeUp>
          <ReferralPartnerSection
            heading={s.partnershipServices.heading as string}
            description={s.partnershipServices.description as string}
            imageSrc={s.partnershipServices.image.url}
            imageAlt={s.partnershipServices.image.alt as string}
            ctaLabel={s.partnershipServices.button.label as string}
            ctaHref={s.partnershipServices.button.href || "/"}
            steps={s.partnershipServices.services.map((step) => ({
              label: step.title as string,
              iconName: step.icon,
            }))}
            benefits={[]}
          />
        </FadeUp>
      )} */}

      <DreamSpaceSection
        {...dreamSpaceConfig}
        heading={tDreamSpace("heading")}
        imageAlt={tDreamSpace("imageAlt")}
        propertyTypeLabel={tDreamSpace("propertyTypeLabel")}
        spaceRequiredLabel={tDreamSpace("spaceRequiredLabel")}
        typeOfServiceLabel={tDreamSpace("typeOfServiceLabel")}
        timelineLabel={tDreamSpace("timelineLabel")}
        firstNameLabel={tDreamSpace("firstNameLabel")}
        lastNameLabel={tDreamSpace("lastNameLabel")}
        emailLabel={tDreamSpace("emailLabel")}
        phoneLabel={tDreamSpace("phoneLabel")}
        submitLabel={tDreamSpace("submitLabel")}
      />

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
