import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { createElement } from "react";
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
import { getSpaceDetailCms } from "@/lib/cms/space-detail";
import { SPACE_SLUGS } from "@/app/config/space.config";
import { HeroBanner } from "@/components/sections/HeroBanner";
import { SpaceIntroSection } from "@/components/sections/SpaceIntroSection";
import { SpaceApproachSection } from "@/components/sections/SpaceApproachSection";
import { ImageCarouselSection } from "@/components/sections/ImageCarouselSection";
import { SpacesAccordionSection } from "@/components/sections/SpacesAccordionSection";
import { ProjectJourneySection } from "@/components/sections/ProjectJourneySection";
import {
  SmartSpaceDiagram,
  KellerBadge,
} from "@/components/sections/ProjectJourneySection";
import { AwardsSection } from "@/components/sections/AwardsSection";
import { SignatureProjectsSection } from "@/components/sections/SignatureProjectsSection";
import { MaterialInspirationSection } from "@/components/sections/MaterialInspirationSection";
import { DreamSpaceSection } from "@/components/sections/DreamSpaceSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { FadeUp } from "@/components/ui/animate";
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

interface Props {
  params: Promise<{ slug: string; locale: string }>;
}

export function generateStaticParams() {
  return SPACE_SLUGS.map((slug) => ({ slug }));
}

export const revalidate = 3600;

export default async function SpaceDetailPage({ params }: Props) {
  const { slug, locale } = await params;

  const [cms, tJourney, tDreamSpace] = await Promise.all([
    getSpaceDetailCms(slug, locale),
    getTranslations({ locale, namespace: "ProjectJourney" }),
    getTranslations({ locale, namespace: "DreamSpace" }),
  ]);

  if (!cms) notFound();

  const s = cms.sections;
  const dreamSpaceConfig = getDreamSpaceConfig(tDreamSpace);

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

  const galleryImages = s?.gallery?.images ?? [];
  const gallerySlides = galleryImages.slice(0, 3).map((img) => ({
    src: img.image.url,
    alt: img.image.alt as string,
  }));
  const galleryGridItems = galleryImages.slice(3, 5).map((img) => ({
    src: img.image.url,
    alt: img.image.alt as string,
  }));
const  styleRange = s.styles.items.map((sp)=>({
      id: sp._id,
        title: sp.title as string,
        href: sp.href,
        image: { src: sp.image.url, alt: sp.image.alt as string },
}))
  const relatedSpaces =
    s?.relatedSpaces?.spaces
      .filter((sp) => sp.isVisible)
      .map((sp) => ({
        id: sp._id,
        title: sp.title as string,
        href: sp.href,
        image: { src: sp.image.url, alt: sp.image.alt as string },
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
        <SpaceIntroSection
          label={s.intro.eyebrow}
          heading={s.intro.heading}
          description={s.intro.description}
          image={s.intro.image.url}
          imageAlt={s.intro.image.alt as string}
        />
      )}

      {s?.features?.isVisible && (
        <SpaceApproachSection
          label={s.features.eyebrow}
          heading={s.features.heading}
          items={s.features.items.map((item) => item.description)}
          image={s.features.image.url}
          imageAlt={s.features.image.alt as string}
        />
      )}

      {s?.styles?.isVisible && styleRange.length > 0 && (
        <SpacesAccordionSection
          heading={s.styles.heading}
          viewAllLabel={s.styles.button.label as string}
          viewAllHref={s.styles.button.href}
          spaces={styleRange}
        />
      )}

      {s?.gallery?.isVisible && gallerySlides.length > 0 && (
        <ImageCarouselSection
          slides={gallerySlides}
          gridItems={galleryGridItems.length > 0 ? galleryGridItems : undefined}
        />
      )}

      {s?.materials?.isVisible && (
        <MaterialInspirationSection
          heading={s.materials.heading}
          items={s.materials.materials.map((item) => ({
            src: item.image.url,
            alt: item.image.alt as string,
            label: item.title,
          }))}
        />
      )}

      {s?.brands?.isVisible && s.brands.brands.length > 0 && (
        <FadeUp>
          <AwardsSection
            label={s.brands.heading}
            logos={s.brands.brands.map((brand) => ({
              src: brand.logo.url,
              alt: brand.logo.alt as string,
              width: 120,
              height: 40,
            }))}
          />
        </FadeUp>
      )}

      {s?.relatedProjects?.isVisible && (
        <SignatureProjectsSection
          heading={s.relatedProjects.heading as string}
          viewAllLabel={s.relatedProjects.button.label as string}
          viewAllHref="/projects"
          projects={s.relatedProjects.projects
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

      {s?.journey?.isVisible && journeySteps.length > 0 && (
        <ProjectJourneySection
          label={s.journey.eyebrow as string}
          heading={s.journey.heading as string}
          advantageLabel={tJourney("advantageLabel")}
          prevLabel={tJourney("prevLabel")}
          nextLabel={tJourney("nextLabel")}
          steps={journeySteps}
        />
      )}

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
            .filter((faq) => faq.isVisible)
            .map((faq) => ({
              question: faq.question as string,
              answer: faq.answer as string,
            }))}
        />
      )}

      {s?.relatedSpaces?.isVisible && relatedSpaces.length > 0 && (
        <SpacesAccordionSection
          heading={s.relatedSpaces.heading}
          viewAllLabel={s.relatedSpaces.button.label as string}
          viewAllHref="/spaces"
          spaces={relatedSpaces}
        />
      )}
    </main>
  );
}
