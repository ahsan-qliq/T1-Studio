import type {
  CmsFeaturedSpacesSection,
  CmsGallerySection,
  CmsMaterialInspirationSection,
  CmsInspirationCTASection,
  CmsSignatureProjectsSectionT,
  CmsJourneyGallerySection,
} from "@/lib/cms/types";

export const PROJECT_SIZES = [
  { width: 700, height: 500 },
  { width: 280, height: 180 },
  { width: 560, height: 480 },
];

export const mapInspirationRooms = (section: CmsFeaturedSpacesSection) =>
  section.rooms
    .filter((sp) => sp.isVisible)
    .map((sp) => ({
      id: sp._id,
      title: sp.title as string,
      href: sp.href,
      image: { src: sp.image.url, alt: sp.image.alt as string },
    }));

export const mapInspirationShowcase = (section: CmsGallerySection) =>
  section.items.map((img) => ({
    src: img.image.url,
    alt: img.image.alt as string,
  }));

export const mapInspirationMaterials = (section: CmsMaterialInspirationSection) =>
  section.materials.map((item) => ({
    src: item.image.url,
    alt: item.image.alt as string,
    label: item.title,
  }));

export const mapInspirationCTA = (
  section: CmsInspirationCTASection,
  secondaryCtaLabel: string,
) => ({
  heading: section.heading,
  description: section.description,
  primaryCta: {
    label: section.button.label as string,
    href: section.button.href || "/spaces",
  },
  secondaryCta: {
    label: secondaryCtaLabel,
    href: section.button.href || "/",
  },
  image: {
    src: section.backgroundImage.url,
    alt: section.backgroundImage.alt as string,
  },
});

export const mapInspirationDesignTips = (section: CmsSignatureProjectsSectionT) =>
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

export const mapInspirationJourneyGallery = (section: CmsJourneyGallerySection) => ({
  heading: section.heading,
  ctaLabel: section.button.label as string,
  ctaHref: section.button.href || "/",
  images: section.items.map((img) => ({
    src: img.image.url,
    alt: img.image.alt as string,
  })),
});
