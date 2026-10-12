import type {
  CmsWhyChooseT1Section,
  CmsStatsSection,
  CmsServicesSection,
  CmsClientTestimonialsSection,
  CmsAwardsRecognitionSectionT,
  CmsPartnershipSectionT,
  CmsSignatureProjectsSectionT,
  CmsFaqSection,
} from "@/lib/cms/types";

export const PROJECT_SIZES = [
  { width: 700, height: 500 },
  { width: 280, height: 180 },
  { width: 560, height: 480 },
];

export const mapWhyT1ComparisonColumns = (section: CmsWhyChooseT1Section) =>
  section.columns.map((col) => ({
    title: col.title as string,
    variant: (col.highlighted ? "dark" : "light") as "dark" | "light",
    features: col.items.map((item) => item.label as string),
  }));

export const mapWhyT1Stats = (section: CmsStatsSection) =>
  section.stats
    .filter((s) => s.isVisible)
    .map((s) => ({ value: s.value, label: s.label as string }));

export const mapWhyT1Benefits = (section: CmsServicesSection) =>
  section.items
    .filter((svc) => svc.isVisible)
    .map((svc) => ({
      title: svc.title as string,
      subtitle: svc.description as string,
    }));

export const mapWhyT1ClientTestimonials = (section: CmsClientTestimonialsSection) =>
  section.testimonials.map((t) => ({
    quote: t.quote,
    author: t.author,
    authorRole: t.authorRole,
    badge: t.badge,
    readTime: t.readTime,
    image: { src: t.image.url, alt: t.image.alt as string },
    avatar: { src: t.avatar.url, alt: t.avatar.alt as string },
    videoUrl: t.videoUrl,
  }));

export const mapWhyT1Brands = (section: CmsAwardsRecognitionSectionT) =>
  section.brands.map((award) => ({
    src: award.logo.url,
    alt: award.logo.alt as string,
    width: 120,
    height: 40,
  }));

export const mapWhyT1Partnership = (section: CmsPartnershipSectionT) => ({
  heading: section.heading as string,
  description: section.description as string,
  imageSrc: section.image.url,
  imageAlt: section.image.alt as string,
  ctaLabel: section.button.label as string,
  ctaHref: section.button.href || "/",
  steps: section.steps.map((step) => ({
    label: step.title as string,
    iconName: step.icon,
  })),
  benefits: [] as { label: string; iconName: string }[],
});

export const mapWhyT1DesignTips = (section: CmsSignatureProjectsSectionT) =>
  (section.articles || [])
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
    }));

export const mapWhyT1Faq = (section: CmsFaqSection) =>
  section.faqs
    .filter((f) => f.isVisible)
    .map((f) => ({
      question: f.question as string,
      answer: f.answer as string,
    }));
