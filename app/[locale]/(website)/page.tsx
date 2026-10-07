import type { Metadata } from "next";
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
// import { LocationLinksSection } from "@/components/sections/LocationLinksSection";
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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const cms = await getHomePageCms(locale);
  const seo = cms?.seo;
  return {
    ...(seo?.metaTitle && { title: seo.metaTitle }),
    ...(seo?.metaDescription && { description: seo.metaDescription }),
    ...(seo?.canonicalUrl && { alternates: { canonical: seo.canonicalUrl } }),
    ...(seo?.ogImage?.url && {
      openGraph: { images: [{ url: seo.ogImage.url }] },
      twitter: { images: [seo.ogImage.url] },
    }),
    ...(seo?.noIndex || seo?.noFollow
      ? { robots: { index: !seo.noIndex, follow: !seo.noFollow } }
      : {}),
  };
}

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
  console.log("CMS Sections 107:", cms?.seo);
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
  const toSpaceHref = (raw: string) => {
    const clean = raw.trim().replace(/\s+/g, "-");
    if (clean.startsWith("/spaces/")) return clean;
    const slug = clean.replace(/^\//, "");
    return `/spaces/${slug}`;
  };

  const accordionSpaces = s?.featuredSpaces
    ? s.featuredSpaces.spaces
        .filter((sp) => sp.isVisible)
        .map((sp) => ({
          id: sp._id,
          title: p(sp.title),
          href: toSpaceHref(sp.href),
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
        viewAllHref: "/blogs",
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
      {/* <LocationLinksSection columns={locationColumns} /> */}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(locale === "ar" ? FAQ_SCHEMA_AR : FAQ_SCHEMA_EN) }}
      />
    </main>
  );
}

const FAQ_SCHEMA_EN = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What makes T.ONE Studio one of the best kitchen and wardrobe companies in Dubai?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For homeowners seeking one of the best kitchen and wardrobe companies in Dubai, T.ONE Studio combines Dutch design heritage, bespoke solutions, European engineering and customer-centric design. With 1,950+ colour and finish options, every project balances precision craftsmanship, functionality and aesthetics.",
      },
    },
    {
      "@type": "Question",
      name: "What does a kitchen and fit-out company in Dubai actually do?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A kitchen and fit-out company in Dubai brings design, planning, manufacturing and installation together. T.ONE Studio supports kitchen renovations in Dubai and other emirates, alongside luxury interior fit-out for Dubai homeowners, delivering bespoke kitchen and wardrobe projects from concept through final execution seamlessly.",
      },
    },
    {
      "@type": "Question",
      name: "How much does a bespoke kitchen cost in Dubai?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The cost of a bespoke kitchen in Dubai depends on size, materials, finishes, storage requirements and level of customisation. T.ONE Studio can recommend options based on your space, budget and goals, whether you need custom kitchen cabinets or tailored solutions for any other space.",
      },
    },
    {
      "@type": "Question",
      name: "How long does a typical kitchen design and fit-out project take in Dubai?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Typical timelines for kitchen design in Dubai depend on scope, specifications and installation requirements. T.ONE Studio's homepage highlights a 4–6 week delivery window, while its process coordinates design, planning, manufacturing and installation, creating a streamlined journey from concept to completion overall.",
      },
    },
    {
      "@type": "Question",
      name: "How do I book a kitchen design consultation with T.ONE Studio?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "To book a kitchen and fit-out consultation in Dubai, contact T.ONE Studio or visit its Sheikh Zayed Road showroom. Discuss your kitchen, wardrobe or renovation needs with a designer, then explore the complimentary 15-minute design experience and next steps.",
      },
    },
  ],
};

const FAQ_SCHEMA_AR = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "ما الذي يجعل T.ONE Studio من أفضل شركات المطابخ وخزائن الملابس في دبي؟",
      acceptedAnswer: {
        "@type": "Answer",
        text: "لأصحاب المنازل الذين يبحثون عن إحدى أفضل شركات المطابخ وخزائن الملابس في دبي، تجمع T.ONE Studio بين الخبرة الهولندية في التصميم، والحلول المصممة حسب الطلب، والهندسة الأوروبية، والتصميم الذي يضع احتياجات العميل في المقدمة. ومع أكثر من 1,950 خيارًا من الألوان والتشطيبات، يوازن كل مشروع بين دقة التنفيذ والعملية والجماليات.",
      },
    },
    {
      "@type": "Question",
      name: "ماذا تقدم شركة التشطيبات والمطابخ والتجهيزات الداخلية في دبي؟",
      acceptedAnswer: {
        "@type": "Answer",
        text: "تجمع شركة التشطيبات والمطابخ في دبي بين التصميم والتخطيط والتصنيع والتركيب في مسار واحد متكامل. تدعم T.ONE Studio تجديد المطابخ في دبي وباقي دول الإمارات، إلى جانب التشطيب الداخلي الفاخر لأصحاب المنازل، وتنفذ مشاريع تفصيل المطابخ والخزائن حسب الطلب من الفكرة الأولى حتى التسليم النهائي.",
      },
    },
    {
      "@type": "Question",
      name: "كم تكلفة تفصيل مطبخ فاخر في دبي؟",
      acceptedAnswer: {
        "@type": "Answer",
        text: "تعتمد تكلفة تفصيل مطبخ فاخر في دبي على المساحة والمواد والتشطيبات، واحتياجات التخزين، ودرجة التخصيص المطلوبة. تقترح T.ONE Studio الحلول الأنسب بناءً على مساحتك وميزانيتك وأهدافك، سواء كنت تبحث عن تفصيل خزائن مطبخ حسب الطلب أو حلول لأي مساحة أخرى في منزلك.",
      },
    },
    {
      "@type": "Question",
      name: "كم يستغرق مشروع تصميم وتنفيذ مطبخ في دبي عادةً؟",
      acceptedAnswer: {
        "@type": "Answer",
        text: "تختلف مدة تصميم مطبخ في دبي باختلاف نطاق المشروع ومواصفاته ومتطلبات التركيب. توضح T.ONE Studio أن مدة التسليم تتراوح بين 4 و6 أسابيع، مع تنسيق كامل بين التصميم والتخطيط والتصنيع والتركيب لضمان سير المشروع بسلاسة من الفكرة وحتى الاكتمال.",
      },
    },
    {
      "@type": "Question",
      name: "كيف أحجز استشارة تصميم المطبخ مع T.ONE Studio؟",
      acceptedAnswer: {
        "@type": "Answer",
        text: "لحجز استشارة مطابخ وتشطيبات في دبي، يمكنك التواصل مباشرة مع T.ONE Studio أو زيارة صالة عرضها على شارع الشيخ زايد. ناقش احتياجاتك في المطبخ أو خزائن الملابس أو التجديد مع أحد المصممين، ثم تعرّف على تجربة التصميم المجانية لمدة 15 دقيقة والخطوات التالية لمشروعك.",
      },
    },
  ],
};
