type Translator = (key: string) => string;

// ─── Space detail ─────────────────────────────────────────────────────────────

type SpaceKey =
  | 'kitchen'
  | 'wardrobes'
  | 'livingRooms'
  | 'bedrooms'
  | 'bathrooms'
  | 'homeOffice'
  | 'outdoorLiving'
  | 'bespokeJoinery';

const SLUG_TO_KEY: Record<string, SpaceKey> = {
  'kitchen': 'kitchen',
  'wardrobes': 'wardrobes',
  'living-rooms': 'livingRooms',
  'bedrooms': 'bedrooms',
  'bathrooms': 'bathrooms',
  'home-office': 'homeOffice',
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