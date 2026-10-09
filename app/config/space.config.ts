import type {
  CmsSpaceGallerySectionT,
  CmsSpaceGallerySection,
  CmsMaterialInspirationSection,
  CmsSpaceBrandsSection,
  CmsSignatureProjectsSectionT,
  CmsFaqSection,
  CmsSpaceRelatedSpacesSection,
} from "@/lib/cms/types";

type Translator = (key: string) => string;

// ─── Space detail resolvers ───────────────────────────────────────────────────

const PROJECT_SIZES = [
  { width: 700, height: 500 },
  { width: 280, height: 180 },
  { width: 560, height: 480 },
];

export function toSpaceHref(raw: string): string {
  const clean = raw.trim().replace(/\s+/g, "-");
  if (clean === "/" || clean === "/spaces" || clean.startsWith("/spaces/")) return clean;
  return `/spaces/${clean.replace(/^\//, "")}`;
}

export const mapSpaceDetailGallery = (section: CmsSpaceGallerySectionT) => {
  const images = section.images ?? [];
  return {
    slides: images.slice(0, 3).map((img) => ({
      src: img.image.url,
      alt: img.image.alt as string,
    })),
    gridItems: images.slice(3, 5).map((img) => ({
      src: img.image.url,
      alt: img.image.alt as string,
    })),
  };
};

export const mapSpaceDetailStyles = (section: CmsSpaceGallerySection) =>
  section.items.map((sp) => ({
    id: sp._id,
    title: sp.title as string,
    href: sp.href,
    image: { src: sp.image.url, alt: sp.image.alt as string },
  }));

export const mapSpaceDetailMaterials = (section: CmsMaterialInspirationSection) =>
  section.materials.map((item) => ({
    src: item.image.url,
    alt: item.image.alt as string,
    label: item.title,
  }));

export const mapSpaceDetailBrands = (section: CmsSpaceBrandsSection) =>
  section.brands.map((brand) => ({
    src: brand.logo.url,
    alt: brand.logo.alt as string,
    width: 120,
    height: 40,
  }));

export const mapSpaceDetailRelatedProjects = (section: CmsSignatureProjectsSectionT) =>
  section.projects
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

export const mapSpaceDetailFaq = (section: CmsFaqSection) =>
  section.faqs
    .filter((faq) => faq.isVisible)
    .map((faq) => ({
      question: faq.question as string,
      answer: faq.answer as string,
    }));

export const mapSpaceDetailRelatedSpaces = (section: CmsSpaceRelatedSpacesSection) =>
  section.spaces
    .filter((sp) => sp.isVisible)
    .map((sp) => ({
      id: sp._id,
      title: sp.title as string,
      href: sp.href,
      image: { src: sp.image.url, alt: sp.image.alt as string },
    }));

// ─── Space detail ─────────────────────────────────────────────────────────────

type SpaceKey =
  | 'kitchens'
  | 'wardrobes'
  | 'livingRooms'
  | 'bedrooms'
  | 'bathrooms'
  | 'homeOffices'
  | 'outdoorLiving'
  | 'bespokeJoinery';

const SLUG_TO_KEY: Record<string, SpaceKey> = {
  'kitchens': 'kitchens',
  'wardrobes': 'wardrobes',
  'living-rooms': 'livingRooms',
  'bedrooms': 'bedrooms',
  'bathrooms': 'bathrooms',
  'home-offices': 'homeOffices',
  'outdoor-living': 'outdoorLiving',
  'bespoke-joinery': 'bespokeJoinery',
};

export const SPACE_SLUGS = Object.keys(SLUG_TO_KEY);

export const getSpaceDetailConfig = (slug: string, t: Translator) => {
  const key = SLUG_TO_KEY[slug];
  if (!key) return null;

  const k = (field: string) => t(`${key}_${field}`);

  return {
    key,
    heroHeading: k('heroHeading'),
    heroDescription: k('heroDescription'),
    heroImageAlt: k('heroImageAlt'),
    overviewLabel: k('overviewLabel'),
    overviewHeading: k('overviewHeading'),
    overviewDescription: k('overviewDescription'),
    approachHeading: k('approachHeading'),
    approachItems: [
      k('item1'),
      k('item2'),
      k('item3'),
      k('item4'),
      k('item5'),
    ],
  };
};

export const getFaqConfig = (t: Translator) => ({
  label: t("label"),
  heading: t("heading"),

  items: [
    {
      question: t("q1"),
      answer: t("a1"),
    },
    {
      question: t("q2"),
      answer: t("a2"),
    },
    {
      question: t("q3"),
      answer: t("a3"),
    },
    {
      question: t("q4"),
      answer: t("a4"),
    },
  ],
});

export const getCarouselSlides = (t: Translator) => [
  { src: "/assets/images/spaces.png", alt: t("slide1Alt") },
  { src: "/assets/images/Home.webp", alt: t("slide2Alt") },
  { src: "/assets/images/why-t1.webp", alt: t("slide3Alt") },
];