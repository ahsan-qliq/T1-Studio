import { getTranslations } from "next-intl/server";
import { getSpacesPageCms } from "@/lib/cms/spaces";
import { HeroBanner } from "@/components/sections/HeroBanner";
import { PhilosophySection } from "@/components/sections/PhilosophySection";
import { SpacesAccordionSection } from "@/components/sections/SpacesAccordionSection";
import { ImageCarouselSection } from "@/components/sections/ImageCarouselSection";
import { ComparisonSection } from "@/components/sections/ComparisonSection";
import { SignatureProjectsSection } from "@/components/sections/SignatureProjectsSection";
import { ProjectJourneySection } from "@/components/sections/ProjectJourneySection";
import {
  SmartSpaceDiagram,
  KellerBadge,
} from "@/components/sections/ProjectJourneySection";
import { ReferralPartnerSection } from "@/components/sections/ReferralPartnerSection";
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

export default async function SpacesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const [cms, tJourney, tCarousel] = await Promise.all([
    getSpacesPageCms(locale),
    getTranslations({ locale, namespace: "ProjectJourney" }),
    getTranslations({ locale, namespace: "SpacesCarousel" }),
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
  return (
    <main>
      {s?.hero?.isVisible && (
        <HeroBanner
          badge={s.hero.eyebrow as string}
          heading={s.hero.heading as string}
          description={s.hero.description as string}
          imageSrc={s.hero.backgroundImage.url || undefined}
          breadcrumbs={s.hero.breadcrumbs.map((b) => ({
            label: b.label as string,
            href: b.href || undefined,
          }))}
        />
      )}

      {s?.intro?.isVisible && (
        <PhilosophySection
          label={s.intro.eyebrow}
          heading={s.intro.heading}
          description={s.intro.description}
          ctaLabel={s.intro.button.label as string}
          ctaHref={s.intro.button.href || "/"}
        />
      )}

      {s?.featuredSpaces?.isVisible && (
        <SpacesAccordionSection
          heading={s.featuredSpaces.heading as string}
          // viewAllLabel={s.featuredSpaces.button.label as string}
          // viewAllHref="/spaces"
          spaces={s.featuredSpaces.spaces
            .filter((sp) => sp.isVisible)
            .map((sp) => ({
              id: sp._id,
              title: sp.title as string,
              href: sp.href,
              image: { src: sp.image.url, alt: sp.image.alt as string },
            }))}
        />
      )}

      {s?.showcase?.isVisible && s.showcase.gallery.length > 0 && (
        <ImageCarouselSection
          slides={s.showcase.gallery.map((img) => ({
            src: img.image.url,
            alt: img.image.alt as string,
          }))}
          prevLabel={tCarousel("prevLabel")}
          nextLabel={tCarousel("nextLabel")}
          aria-label={tCarousel("ariaLabel")}
        />
      )}

      {/* {s?.whyChooseT1?.isVisible && (
        <FadeUp>
          <ComparisonSection
            heading={s.whyChooseT1.heading as string}
            columns={s.whyChooseT1.columns.map((col) => ({
              title: col.title as string,
              variant: (col.highlighted ? "dark" : "light") as "dark" | "light",
              features: col.items.map((item) => item.label as string),
            }))}
          />
        </FadeUp>
      )} */}

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

      {/* {s?.journey?.isVisible && journeySteps.length > 0 && (
        <ProjectJourneySection
          label={s.journey.eyebrow as string}
          heading={s.journey.heading as string}
          advantageLabel={tJourney("advantageLabel")}
          prevLabel={tJourney("prevLabel")}
          nextLabel={tJourney("nextLabel")}
          steps={journeySteps}
        />
      )}

      {s?.partnership?.isVisible && (
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
      )} */}
    </main>
  );
}
