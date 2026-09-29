import {
  getAccordionSpaces,
  getServiceItems,
  getSignatureProjects,
  getComparisonColumns,
  getJourneySteps,
  getDreamSpaceConfig,
  getReferralPartnerConfig,
  getTestimonialsConfig,
  getAwardsConfig,
  getBlogConfig,
  getLocationColumns,
} from "@/app/config/home.config";
import { AwardsSection } from "@/components/sections/AwardsSection";
import { BlogSection } from "@/components/sections/BlogSection";
import { LocationLinksSection } from "@/components/sections/LocationLinksSection";
import { ComparisonSection } from "@/components/sections/ComparisonSection";
import { DreamSpaceSection } from "@/components/sections/DreamSpaceSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { HeroBanner } from "@/components/sections/HeroBanner";
import { ProjectJourneySection } from "@/components/sections/ProjectJourneySection";
import {
  SmartSpaceDiagram,
  KellerBadge,
} from "@/components/sections/ProjectJourneySection";
import { ReferralPartnerSection } from "@/components/sections/ReferralPartnerSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { SignatureProjectsSection } from "@/components/sections/SignatureProjectsSection";
import { SpacesAccordionSection } from "@/components/sections/SpacesAccordionSection";
import { StatsBar } from "@/components/sections/StatsBar";
import { StatsBarServer } from "@/components/sections/StatsBarServer";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { FadeUp } from "@/components/ui/animate";
import { getTranslations } from "next-intl/server";
import { getFaqConfig } from "@/app/config/space.config";
import { getHomePageCms } from "@/lib/cms/home";
import type { CmsBilingualText } from "@/lib/cms/types";
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

function pick(field: CmsBilingualText | string | undefined, locale: string): string {
  if (!field) return "";
  if (typeof field === "string") return field;
  return field[locale as "en" | "ar"] ?? field.en ?? "";
}

const JOURNEY_ICONS: LucideIcon[] = [Globe, Lightbulb, Building2, Rocket, TrendingUp];
const JOURNEY_HIGHLIGHT_ICONS: LucideIcon[] = [User, Maximize2, Shield, CheckCircle2, RefreshCw];

export const revalidate = 3600;

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const [
    cms,
    tHero,
    tSpaces,
    tprojects,
    tComparison,
    tJourney,
    tReferral,
    tDreamSpace,
    tTestimonials,
    tAwards,
    tBlog,
    tServices,
    tFaq,
    tLocationLinks,
    tStats,
  ] = await Promise.all([
    getHomePageCms(locale),
    getTranslations({ locale, namespace: "Hero" }),
    getTranslations({ locale, namespace: "FeaturedSpaces" }),
    getTranslations({ locale, namespace: "SignatureProject" }),
    getTranslations({ locale, namespace: "Comparison" }),
    getTranslations({ locale, namespace: "ProjectJourney" }),
    getTranslations({ locale, namespace: "ReferralPartner" }),
    getTranslations({ locale, namespace: "DreamSpace" }),
    getTranslations({ locale, namespace: "Testimonials" }),
    getTranslations({ locale, namespace: "Awards" }),
    getTranslations({ locale, namespace: "Blog" }),
    getTranslations({ locale, namespace: "Services" }),
    getTranslations({ locale, namespace: "Faq" }),
    getTranslations({ locale, namespace: "LocationLinks" }),
    getTranslations({ locale, namespace: "Stats" }),
  ]);

  const p = (field: CmsBilingualText | string | undefined) => pick(field, locale);
  const s = cms?.sections;
  // ── Hero ──────────────────────────────────────────────────────────────────
  const heroProps = {
    badge: s?.hero ? p(s.hero.eyebrow) : tHero("badge"),
    heading: s?.hero ? p(s.hero.heading) : tHero("heading"),
    description: s?.hero ? p(s.hero.description) : tHero("description"),
    cta: s?.hero ? p(s.hero.primaryButton.label) : tHero("cta"),
    imageSrc: s?.hero?.backgroundImage.url,
  };
  // ── Stats ─────────────────────────────────────────────────────────────────
  const statsItems = s?.stats?.statistics
    ?.filter((stat) => stat.isVisible)
    .map((stat) => ({ value: stat.value, label: p(stat.label) }));

  // ── Services ──────────────────────────────────────────────────────────────
  const serviceItems = s?.services
    ? s.services.services
        .filter((svc) => svc.isVisible)
        .map((svc) => ({ title: p(svc.title), subtitle: p(svc.description) }))
    : getServiceItems(tServices);

  const servicesLabel = s?.services ? p(s.services.eyebrow) : tServices("label");
  const servicesHeading = s?.services ? p(s.services.heading) : tServices("heading");

  // ── Featured Spaces ───────────────────────────────────────────────────────
  const accordionSpaces = s?.featuredSpaces
    ? s.featuredSpaces.spaces
        .filter((sp) => sp.isVisible)
        .map((sp) => ({
          id: sp._id,
          title: p(sp.title),
          href: sp.href,
          image: { src: sp.image.url, alt: p(sp.image.alt) },
        }))
    : getAccordionSpaces(tSpaces);

  const spacesHeading = s?.featuredSpaces
    ? p(s.featuredSpaces.heading)
    : tSpaces("heading");
  const spacesViewAllLabel = s?.featuredSpaces
    ? p(s.featuredSpaces.button.label)
    : tSpaces("viewAllLabel");

  // ── Signature Projects ────────────────────────────────────────────────────
  // Aspect ratios are kept from the original design since CMS doesn't store dimensions
  const PROJECT_SIZES = [
    { width: 700, height: 500 },
    { width: 280, height: 180 },
    { width: 560, height: 480 },
  ];
  const signatureProjects = s?.signatureProjects
    ? s.signatureProjects.projects
        .filter((pr) => pr.isVisible)
        .map((pr, i) => ({
          id: pr._id,
          title: p(pr.title),
          location: p(pr.location),
          href: pr.href,
          image: {
            src: pr.image.url,
            alt: p(pr.image.alt),
            ...(PROJECT_SIZES[i] ?? { width: 700, height: 500 }),
          },
        }))
    : getSignatureProjects(tprojects);

  const projectsHeading = s?.signatureProjects
    ? p(s.signatureProjects.heading)
    : tprojects("heading");
  const projectsViewAllLabel = s?.signatureProjects
    ? p(s.signatureProjects.button.label)
    : tprojects("viewAllLabel");

  // ── Journey ───────────────────────────────────────────────────────────────
  const journeySteps = s?.journey
    ? s.journey.steps
        .filter((step) => step.isVisible)
        .map((step, i) => ({
          number: String(i + 1).padStart(2, "0"),
          icon: JOURNEY_ICONS[i] ?? Globe,
          title: p(step.title),
          subtitle: p(step.subtitle),
          description: p(step.description),
          advantageText: p(step.advantageTitle),
          highlightIcon: JOURNEY_HIGHLIGHT_ICONS[i] ?? User,
          highlightText: p(step.highlight),
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
        }))
    : getJourneySteps(tJourney);

  const journeyLabel = s?.journey ? p(s.journey.eyebrow) : tJourney("label");
  const journeyHeading = s?.journey ? p(s.journey.heading) : tJourney("heading");

  // ── Comparison ────────────────────────────────────────────────────────────
  const comparisonColumns = s?.whyChooseT1
    ? s.whyChooseT1.columns.map((col) => ({
        title: p(col.title),
        variant: (col.highlighted ? "dark" : "light") as "dark" | "light",
        features: col.items.map((item) => p(item.label)),
      }))
    : getComparisonColumns(tComparison);

  const comparisonHeading = s?.whyChooseT1
    ? p(s.whyChooseT1.heading)
    : tComparison("heading");

  // ── Testimonials ──────────────────────────────────────────────────────────
  const testimonialsLabel = s?.testimonials
    ? p(s.testimonials.eyebrow)
    : tTestimonials("label");
  const testimonialsHeading = s?.testimonials
    ? p(s.testimonials.heading)
    : tTestimonials("heading");
  const testimonials = s?.testimonials
    ? s.testimonials.testimonials
        .filter((t) => t.isVisible)
        .map((t, i) => ({
          id: i,
          name: t.clientName,
          quote: t.testimonial,
          image: t.image.url,
          videoUrl: t.videoUrl,
        }))
    : getTestimonialsConfig(tTestimonials).testimonials.map((t) => ({
        id: t.id,
        name: t.name,
        quote: t.quote,
        image: t.image,
      }));

  // ── Dream Space (Consultation CTA) ────────────────────────────────────────
  const dreamSpaceProps = {
    ...getDreamSpaceConfig(tDreamSpace),
    heading: tDreamSpace("heading"),
    imageAlt: tDreamSpace("imageAlt"),
    propertyTypeLabel: tDreamSpace("propertyTypeLabel"),
    spaceRequiredLabel: tDreamSpace("spaceRequiredLabel"),
    typeOfServiceLabel: tDreamSpace("typeOfServiceLabel"),
    timelineLabel: tDreamSpace("timelineLabel"),
    firstNameLabel: tDreamSpace("firstNameLabel"),
    lastNameLabel: tDreamSpace("lastNameLabel"),
    emailLabel: tDreamSpace("emailLabel"),
    phoneLabel: tDreamSpace("phoneLabel"),
    submitLabel: tDreamSpace("submitLabel"),
  };

  // ── Referral Partner ──────────────────────────────────────────────────────
  const referralPartnerConfig = s?.partnership
    ? {
        heading: p(s.partnership.heading),
        description: p(s.partnership.description),
        imageSrc: s.partnership.image.url,
        imageAlt: p(s.partnership.image.alt),
        ctaLabel: p(s.partnership.button.label),
        ctaHref: s.partnership.button.href,
        steps: s.partnership.steps.map((step) => ({
          label: p(step.title),
          iconName: step.icon,
        })),
        benefits: [],
      }
    : getReferralPartnerConfig(tReferral);

  // ── Awards ────────────────────────────────────────────────────────────────
  const awardsConfig = s?.awardsRecognition
    ? {
        label: p(s.awardsRecognition.heading),
        logos: s.awardsRecognition.awards.map((award) => ({
          src: award.logo.url,
          alt: p(award.logo.alt),
          width: 120,
          height: 40,
        })),
      }
    : getAwardsConfig(tAwards);

  // ── Blog ──────────────────────────────────────────────────────────────────
  const blogConfig = s?.designTips
    ? {
        label: p(s.designTips.eyebrow),
        heading: p(s.designTips.heading),
        viewAllLabel: p(s.designTips.button.label),
        viewAllHref: s.designTips.button.href || "/blogs",
        learnMoreLabel: tBlog("learnMoreLabel"),
        posts: s.designTips.articles
          .filter((a) => a.isVisible)
          .map((a) => ({
            slug: a._id,
            tag: a.category,
            readTime: a.readTime,
            title: a.title,
            href: a.href,
            image: { src: a.image.url, alt: p(a.image.alt) },
          })),
      }
    : getBlogConfig(tBlog);

  // ── FAQ ───────────────────────────────────────────────────────────────────
  const faqConfig = s?.faq
    ? {
        label: p(s.faq.eyebrow),
        heading: p(s.faq.heading),
        items: s.faq.faqs
          .filter((f) => f.isVisible)
          .map((f) => ({ question: p(f.question), answer: p(f.answer) })),
      }
    : getFaqConfig(tFaq);

  // ── Location Links ────────────────────────────────────────────────────────
  const locationColumns = s?.locationLinks
    ? s.locationLinks.columns.map((col) => ({
        city: p(col.title),
        links: col.links.map((link) => ({ label: p(link.label), href: link.href })),
      }))
    : getLocationColumns(tLocationLinks);

  return (
    <main>
      {/* Hero — entrance animation handled internally */}
      <HeroBanner {...heroProps} />

      {/* Stats — use CMS data if available, else translation namespace */}
      {statsItems ? (
        <StatsBar items={statsItems} sectionLabel={tStats("sectionLabel")} />
      ) : (
        <StatsBarServer namespace="Stats" />
      )}

      {/* Services — stagger animation handled internally */}
      <ServicesSection
        label={servicesLabel}
        heading={servicesHeading}
        services={serviceItems}
      />

      {/* Spaces accordion — scroll reveal handled internally */}
      <SpacesAccordionSection
        heading={spacesHeading}
        viewAllLabel={spacesViewAllLabel}
        viewAllHref="/spaces"
        spaces={accordionSpaces}
      />

      {/* Signature projects — stagger animation handled internally */}
      <SignatureProjectsSection
        heading={projectsHeading}
        viewAllLabel={projectsViewAllLabel}
        viewAllHref="/projects"
        projects={signatureProjects}
      />

      {/* Journey — scroll reveal */}
      <FadeUp>
        <ProjectJourneySection
          label={journeyLabel}
          heading={journeyHeading}
          advantageLabel={tJourney("advantageLabel")}
          prevLabel={tJourney("prevLabel")}
          nextLabel={tJourney("nextLabel")}
          steps={journeySteps}
        />
      </FadeUp>

      {/* Comparison — columns slide in from different directions */}
      <ComparisonSection heading={comparisonHeading} columns={comparisonColumns} />

      {/* Testimonials — scroll reveal handled internally */}
      <TestimonialsSection
        label={testimonialsLabel}
        heading={testimonialsHeading}
        testimonials={testimonials}
      />

      {/* Dream space — split slide-in handled internally */}
      <DreamSpaceSection {...dreamSpaceProps} />

      {/* Referral — animated internally */}
      <ReferralPartnerSection {...referralPartnerConfig} />

      {/* Awards — staggered logos */}
      <AwardsSection {...awardsConfig} />

      {/* Blog — stagger animation handled internally */}
      <BlogSection {...blogConfig} />

      <FaqSection {...faqConfig} />

      {/* Location links — SEO-focused service × city grid */}
      <LocationLinksSection columns={locationColumns} />
    </main>
  );
}
