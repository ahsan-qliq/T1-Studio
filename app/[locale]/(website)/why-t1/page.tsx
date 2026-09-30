import { getTranslations } from "next-intl/server";
import { getWhyT1PageCms } from "@/lib/cms/why-t1";
import { HeroBanner } from "@/components/sections/HeroBanner";
import { ComparisonSection } from "@/components/sections/ComparisonSection";
import { ProjectJourneySection } from "@/components/sections/ProjectJourneySection";
import {
  SmartSpaceDiagram,
  KellerBadge,
} from "@/components/sections/ProjectJourneySection";
import { StatsBar } from "@/components/sections/StatsBar";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { ClientTestimonialSection } from "@/components/sections/ClientTestimonialSection";
import { AwardsSection } from "@/components/sections/AwardsSection";
import { ReferralPartnerSection } from "@/components/sections/ReferralPartnerSection";
import { SignatureProjectsSection } from "@/components/sections/SignatureProjectsSection";
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
          cta={s.hero.primaryButton.label as string}
          imageSrc={s.hero.backgroundImage.url || undefined}
        />
      )}

      {s?.comparison?.isVisible && (
        <FadeUp>
          <ComparisonSection
            heading={s.comparison.heading as string}
            columns={s.comparison.columns.map((col) => ({
              title: col.title as string,
              variant: (col.highlighted ? "dark" : "light") as "dark" | "light",
              features: col.items.map((item) => item.label as string),
            }))}
          />
        </FadeUp>
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

      {s?.clientTestimonials?.isVisible && (
        <ClientTestimonialSection
          label={s.clientTestimonials.eyebrow}
          heading={s.clientTestimonials.heading}
          variant="card"
          testimonials={s.clientTestimonials.testimonials.map((t) => ({
            quote: t.quote,
            author: t.author,
            authorRole: t.authorRole,
            badge: t.badge,
            readTime: t.readTime,
            image: { src: t.image.url, alt: t.image.alt as string },
            avatar: { src: t.avatar.url, alt: t.avatar.alt as string },
            videoUrl: t.videoUrl,
          }))}
        />
      )}

      {s?.brands?.isVisible && (
        <FadeUp>
          <AwardsSection
            label={s.brands.heading as string}
            logos={s.brands.awards.map((award) => ({
              src: award.logo.url,
              alt: award.logo.alt as string,
              width: 120,
              height: 40,
            }))}
          />
        </FadeUp>
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

      {s?.designTips?.isVisible && (
        <SignatureProjectsSection
          heading={s.designTips.heading as string}
          viewAllLabel={s.designTips.button.label as string}
          viewAllHref="/projects"
          projects={(s.designTips.articles || [])
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
