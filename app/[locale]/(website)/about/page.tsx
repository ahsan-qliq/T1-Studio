import { getTranslations } from "next-intl/server";
import { getAboutPageCms } from "@/lib/cms/about";
import { HeroBanner } from "@/components/sections/HeroBanner";
import { AboutStorySection } from "@/components/sections/AboutStorySection";
import { MilestoneTimelineSection } from "@/components/sections/MilestoneTimelineSection";
import type { MilestoneIconName } from "@/components/sections/MilestoneTimelineSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { MaterialInspirationSection } from "@/components/sections/MaterialInspirationSection";
import { StatsBar } from "@/components/sections/StatsBar";
import { TeamSection } from "@/components/sections/TeamSection";
import { ImageCarouselSection } from "@/components/sections/ImageCarouselSection";
import { AwardsSection } from "@/components/sections/AwardsSection";
import { ReferralPartnerSection } from "@/components/sections/ReferralPartnerSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { FadeUp } from "@/components/ui/animate";

const VALID_MILESTONE_ICONS = new Set([
  "Globe",
  "Lightbulb",
  "BarChart2",
  "BookMarked",
]);

export const revalidate = 3600;

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const [cms, tStats, tCarousel, tTeam] = await Promise.all([
    getAboutPageCms(locale),
    getTranslations({ locale, namespace: "Stats" }),
    getTranslations({ locale, namespace: "SpacesCarousel" }),
    getTranslations({ locale, namespace: "Team" }),
  ]);

  const s = cms?.sections;
  console.log(s, 41)
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

      {s?.story?.isVisible && (
        <AboutStorySection
          label={s.story.eyebrow}
          heading={s.story.heading}
          description={s.story.description}
          image={{
            src: s.story.image.url,
            alt: s.story.image.alt as string,
          }}
        />
      )}

      {s?.journey?.isVisible && (
        <MilestoneTimelineSection
          heading={s.journey.heading}
          milestones={s.journey.items.map((m) => ({
            iconName: (VALID_MILESTONE_ICONS.has(m.iconName)
              ? m.iconName
              : "Globe") as MilestoneIconName,
            year: m.year,
            description: m.description,
          }))}
        />
      )}

      {s?.philosophy?.isVisible && (
        <ServicesSection
          label={s.philosophy.eyebrow as string}
          heading={s.philosophy.heading as string}
          services={s.philosophy.items
            .filter((svc) => svc.isVisible)
            .map((svc) => ({
              title: svc.title as string,
              subtitle: svc.description as string,
            }))}
        />
      )}

      {s?.values?.isVisible && (
        <MaterialInspirationSection
          heading={s.values.heading}
          items={(s.values.values || []).map((item) => ({
            src: item.image.url,
            alt: item.image.alt as string,
            label: item.label,
          }))}
        />
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

      {/* {s?.team?.isVisible && (
        <TeamSection
          heading={s.team.heading}
          members={s.team.members.map((m) => ({
            name: m.name,
            role: m.role,
            experience: m.experience,
            quote: m.quote,
            image: { src: m.image.url, alt: m.image.alt as string },
          }))}
          prevLabel={tTeam("prevLabel")}
          nextLabel={tTeam("nextLabel")}
        />
      )} */}

      {s?.showcase?.isVisible && s.showcase.items.length > 0 && (
        <ImageCarouselSection
          slides={s.showcase.items.map((img) => ({
            src: img.image.url,
            alt: img.image.alt as string,
          }))}
          aria-label={tCarousel("ariaLabel")}
          prevLabel={tCarousel("prevLabel")}
          nextLabel={tCarousel("nextLabel")}
        />
      )}

      {s?.brands?.isVisible && (
        <FadeUp>
          <AwardsSection
            label={s.brands.heading as string}
            logos={(s.brands.brands || []).map((award) => ({
              src: award.logo.url,
              alt: award.logo.alt as string,
              width: 120,
              height: 40,
            }))}
          />
        </FadeUp>
      )}

      {/* {s?.partnership?.isVisible && (
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
      )} */}

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
