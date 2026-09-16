import {
  Sun,
  Shield,
  RefreshCcw,
  Users,
  Globe,
  Lightbulb,
  User,
  Maximize2,
  LayoutGrid,
  Building2,
  Rocket,
  CheckCircle2,
  TrendingUp,
  RefreshCw,
} from "lucide-react";

import {
  SmartSpaceDiagram,
  KellerBadge,
  type JourneyStep,
} from "@/components/sections/ProjectJourneySection";
import { createElement } from "react";

import type { FeatureCard } from "@/components/sections/WhyT1Section";
import type { WhyT1GridFeature } from "@/components/sections/WhyT1GridSection";

import type { CarouselCard } from "@/components/sections/CarouselSection";
import type { SpaceCard } from "@/components/sections/FeaturedSpaces";
import type { AccordionSpace } from "@/components/sections/SpacesAccordionSection";
import type { ServiceItem } from "@/components/sections/ServicesSection";
import type { SignatureProject } from "@/components/sections/SignatureProjectsSection";
import type { ComparisonColumn } from "@/components/sections/ComparisonSection";

type Translator = (key: string) => string;

export const getWhyT1GridFeatures = (t: Translator): WhyT1GridFeature[] => [
  { iconName: 'Sun',        title: t("oneStudio"),        description: t("oneStudioDesc")        },
  { iconName: 'Shield',     title: t("europeanQuality"),  description: t("europeanQualityDesc")  },
  { iconName: 'RefreshCcw', title: t("premiumMaterials"), description: t("premiumMaterialsDesc") },
  { iconName: 'Users',      title: t("expertDesigners"),  description: t("expertDesignersDesc")  },
];

export const getFeatureCards = (t: Translator): FeatureCard[] => [
  {
    icon: Sun,
    title: t("oneStudio"),
    description: t("oneStudioDesc"),
    variant: "dark",
  },
  {
    icon: Shield,
    title: t("europeanQuality"),
    description: t("europeanQualityDesc"),
    variant: "gold",
  },
  {
    icon: RefreshCcw,
    title: t("premiumMaterials"),
    description: t("premiumMaterialsDesc"),
    variant: "gold",
  },
  {
    icon: Users,
    title: t("expertDesigners"),
    description: t("expertDesignersDesc"),
    variant: "dark",
  },
];

export const getAudienceCards = (t: Translator): CarouselCard[] => [
  {
    image: {
      src: "/assets/images/Banner.webp",
      alt: t("homeownersAlt"),
    },
    label: t("homeowners"),
    href: "/spaces/homeowners",
  },
  {
    image: {
      src: "/assets/images/Banner.webp",
      alt: t("apartmentsOwnersAlt"),
    },
    label: t("apartmentsOwners"),
    href: "/spaces/apartments",
  },
  {
    image: {
      src: "/assets/images/Banner.webp",
      alt: t("propertyDevelopersAlt"),
    },
    label: t("propertyDevelopers"),
    href: "/spaces/developers",
  },
];

// export const getSpaceCards = (t: Translator): SpaceCard[] => [
//   {
//     image: {
//       src: "/assets/images/why-t1.webp",
//       alt: t("kitchenAlt"),
//     },
//     title: t("kitchenTitle"),
//     description: t("kitchenDesc"),
//     href: "/spaces/kitchen",
//   },
//   {
//     image: {
//       src: "/assets/images/why-t1.webp",
//       alt: t("wardrobesAlt"),
//     },
//     title: t("wardrobesTitle"),
//     description: t("wardrobesDesc"),
//     href: "/spaces/wardrobes",
//   },
//   {
//     image: {
//       src: "/assets/images/why-t1.webp",
//       alt: t("livingRoomsAlt"),
//     },
//     title: t("livingRoomsTitle"),
//     description: t("livingRoomsDesc"),
//     href: "/spaces/living-rooms",
//   },

// ];
export const getSpaceCards = (t: Translator): SpaceCard[] => [
  {
    image: {
      src: "/assets/images/why-t1.webp",
      alt: t("kitchenAlt"),
    },
    title: t("kitchenTitle"),
    description: t("kitchenDesc"),
    href: "/spaces/kitchen",
  },
  {
    image: {
      src: "/assets/images/why-t1.webp",
      alt: t("wardrobesAlt"),
    },
    title: t("wardrobesTitle"),
    description: t("wardrobesDesc"),
    href: "/spaces/wardrobes",
  },
  {
    image: {
      src: "/assets/images/why-t1.webp",
      alt: t("livingRoomsAlt"),
    },
    title: t("livingRoomsTitle"),
    description: t("livingRoomsDesc"),
    href: "/spaces/living-rooms",
  },
  {
    image: {
      src: "/assets/images/why-t1.webp",
      alt: t("bedroomsAlt"),
    },
    title: t("bedroomsTitle"),
    description: t("bedroomsDesc"),
    href: "/spaces/bedrooms",
  },
  {
    image: {
      src: "/assets/images/why-t1.webp",
      alt: t("bathroomsAlt"),
    },
    title: t("bathroomsTitle"),
    description: t("bathroomsDesc"),
    href: "/spaces/bathrooms",
  },
  {
    image: {
      src: "/assets/images/why-t1.webp",
      alt: t("homeOfficeAlt"),
    },
    title: t("homeOfficeTitle"),
    description: t("homeOfficeDesc"),
    href: "/spaces/home-office",
  },
  {
    image: {
      src: "/assets/images/why-t1.webp",
      alt: t("outdoorLivingAlt"),
    },
    title: t("outdoorLivingTitle"),
    description: t("outdoorLivingDesc"),
    href: "/spaces/outdoor-living",
  },
  {
    image: {
      src: "/assets/images/why-t1.webp",
      alt: t("bespokeJoineryAlt"),
    },
    title: t("bespokeJoineryTitle"),
    description: t("bespokeJoineryDesc"),
    href: "/spaces/bespoke-joinery",
  },
];
export const getAccordionSpaces = (t: Translator): AccordionSpace[] => [
  {
    id: "kitchen",
    title: t("kitchenTitle"),
    href: "/spaces/kitchen",
    image: { src: "/assets/images/why-t1.webp", alt: t("kitchenAlt") },
  },
  {
    id: "wardrobes",
    title: t("wardrobesTitle"),
    href: "/spaces/wardrobes",
    image: { src: "/assets/images/why-t1.webp", alt: t("wardrobesAlt") },
  },
  {
    id: "living-rooms",
    title: t("livingRoomsTitle"),
    href: "/spaces/living-rooms",
    image: { src: "/assets/images/why-t1.webp", alt: t("livingRoomsAlt") },
  },
  {
    id: "bedrooms",
    title: t("bedroomsTitle"),
    href: "/spaces/bedrooms",
    image: { src: "/assets/images/why-t1.webp", alt: t("bedroomsAlt") },
  },
  {
    id: "bathrooms",
    title: t("bathroomsTitle"),
    href: "/spaces/bathrooms",
    image: { src: "/assets/images/why-t1.webp", alt: t("bathroomsAlt") },
  },
  {
    id: "home-offices",
    title: t("homeOfficeTitle"),
    href: "/spaces/home-office",
    image: { src: "/assets/images/why-t1.webp", alt: t("homeOfficeAlt") },
  },
  {
    id: "outdoor-living",
    title: t("outdoorLivingTitle"),
    href: "/spaces/outdoor-living",
    image: { src: "/assets/images/why-t1.webp", alt: t("outdoorLivingAlt") },
  },
  {
    id: "bespoke-joinery",
    title: t("bespokeJoineryTitle"),
    href: "/spaces/bespoke-joinery",
    image: { src: "/assets/images/why-t1.webp", alt: t("bespokeJoineryAlt") },
  },
];

export const getSignatureProjects = (t: Translator): SignatureProject[] => [
  {
    id: "jumeirah-gate",
    title: t("jumeirahGateTitle"),
    location: t("jumeirahGateLocation"),
    href: "/projects/jumeirah-gate-dubai",
    image: { src: "/assets/images/why-t1.webp", alt: t("jumeirahGateAlt"), width: 700, height: 500 },
  },
  {
    id: "blue-waters",
    title: t("blueWatersTitle"),
    location: t("blueWatersLocation"),
    href: "/projects/blue-waters-dubai",
    image: { src: "/assets/images/why-t1.webp", alt: t("blueWatersAlt"), width: 280, height: 180 },
  },
  {
    id: "al-yasmeen",
    title: t("alYasmeenTitle"),
    location: t("alYasmeenLocation"),
    href: "/projects/al-yasmeen-sharjah",
    image: { src: "/assets/images/why-t1.webp", alt: t("alYasmeenAlt"), width: 560, height: 480 },
  },
];

export const getServiceItems = (t: Translator): ServiceItem[] => [
  { title: t("customDesignTitle"), subtitle: t("customDesignSubtitle") },
  { title: t("renovationTitle"), subtitle: t("renovationSubtitle") },
  { title: t("luxuryDesignTitle"), subtitle: t("luxuryDesignSubtitle") },
  { title: t("installationTitle"), subtitle: t("installationSubtitle") },
];

export const getComparisonColumns = (t: Translator): ComparisonColumn[] => [
  {
    title: t("t1Title"),
    variant: "dark",
    features: [
      t("t1Feature1"),
      t("t1Feature2"),
      t("t1Feature3"),
      t("t1Feature4"),
      t("t1Feature5"),
    ],
  },
  {
    title: t("luxuryTitle"),
    variant: "light",
    features: [
      t("luxuryFeature1"),
      t("luxuryFeature2"),
      t("luxuryFeature3"),
      t("luxuryFeature4"),
      t("luxuryFeature5"),
    ],
  },
  {
    title: t("budgetTitle"),
    variant: "light",
    features: [
      t("budgetFeature1"),
      t("budgetFeature2"),
      t("budgetFeature3"),
      t("budgetFeature4"),
      t("budgetFeature5"),
    ],
  },
];

export const getJourneySteps = (t: Translator): JourneyStep[] => [
  {
    number: t("discoverNumber"),
    icon: Globe,
    title: t("discoverTitle"),
    subtitle: t("discoverSubtitle"),
    description: t("discoverDesc"),
    advantageText: t("discoverAdvantage"),
    highlightIcon: User,
    highlightText: t("discoverHighlight"),
  },
  {
    number: t("innovateNumber"),
    icon: Lightbulb,
    title: t("innovateTitle"),
    subtitle: t("innovateSubtitle"),
    description: t("innovateDesc"),
    advantageText: t("innovateAdvantage"),
    highlightIcon: Maximize2,
    highlightText: t("innovateHighlight"),
    extraContent: createElement(SmartSpaceDiagram, {
      badge: t("smartSpaceBadge"),
      items: [
        {
          icon: LayoutGrid,
          label: t("smartSpaceItem1"),
        },
        {
          icon: LayoutGrid,
          label: t("smartSpaceItem2"),
        },
        {
          icon: LayoutGrid,
          label: t("smartSpaceItem3"),
        },
      ],
    }),
  },
  {
    number: t("engineerNumber"),
    icon: Building2,
    title: t("engineerTitle"),
    subtitle: t("engineerSubtitle"),
    description: t("engineerDesc"),
    advantageText: t("engineerAdvantage"),
    highlightIcon: Shield,
    highlightText: t("engineerHighlight"),
    extraContent: createElement(KellerBadge, {
      line1: t("kellerLine1"),
      line2: t("kellerLine2"),
    }),
  },

  // Step 04
  {
    number: t("deliverNumber"),
    icon: Rocket,
    title: t("deliverTitle"),
    subtitle: t("deliverSubtitle"),
    description: t("deliverDesc"),
    advantageText: t("deliverAdvantage"),
    highlightIcon: CheckCircle2,
    highlightText: t("deliverHighlight"),
  },

  // Step 05
  {
    number: t("evolveNumber"),
    icon: TrendingUp,
    title: t("evolveTitle"),
    subtitle: t("evolveSubtitle"),
    description: t("evolveDesc"),
    advantageText: t("evolveAdvantage"),
    highlightIcon: RefreshCw,
    highlightText: t("evolveHighlight"),
  },
];

export const getDreamSpaceConfig = (t: Translator) => ({
  imageSrc: "/assets/images/Banner.webp",

  audienceTabs: [
    { id: "homeOwners", label: t("homeOwnersTab") },
    { id: "apartmentsOwners", label: t("apartmentsOwnersTab") },
    { id: "propertyDevelopers", label: t("propertyDevelopersTab") },
  ],

  propertyTypeOptions: [
    {
      value: "villa",
      label: t("propertyTypeVilla"),
    },
    {
      value: "apartment",
      label: t("propertyTypeApartment"),
    },
    {
      value: "penthouse",
      label: t("propertyTypePenthouse"),
    },
    {
      value: "commercial",
      label: t("propertyTypeCommercial"),
    },
  ],

  spaceRequiredOptions: [
    {
      value: "kitchen",
      label: t("spaceRequiredKitchen"),
    },
    {
      value: "living-room",
      label: t("spaceRequiredLivingRoom"),
    },
    {
      value: "wardrobe",
      label: t("spaceRequiredWardrobe"),
    },
    {
      value: "full-home",
      label: t("spaceRequiredFullHome"),
    },
  ],

  typeOfServiceOptions: [
    {
      value: "design-build",
      label: t("typeOfServiceDesignBuild"),
    },
    {
      value: "interior-design",
      label: t("typeOfServiceInteriorDesign"),
    },
    {
      value: "furnishing",
      label: t("typeOfServiceFurnishing"),
    },
    {
      value: "renovation",
      label: t("typeOfServiceRenovation"),
    },
  ],

  timelineOptions: [
    {
      value: "immediate",
      label: t("timelineImmediate"),
    },
    {
      value: "1-3-months",
      label: t("timeline1to3"),
    },
    {
      value: "3-6-months",
      label: t("timeline3to6"),
    },
    {
      value: "6-plus-months",
      label: t("timeline6plus"),
    },
  ],
});

export const getReferralPartnerConfig = (t: Translator) => ({
  heading: t("heading"),
  description: t("description"),

  imageAlt: t("imageAlt"),
  imageSrc: "/assets/images/growth.webp",

  ctaLabel: t("ctaLabel"),
  ctaHref: "/referral-partner",

  benefits: [
    { label: t("benefit1"), iconName: "Gift" },
    { label: t("benefit2"), iconName: "UserCheck" },
    { label: t("benefit3"), iconName: "Zap" },
    { label: t("benefit4"), iconName: "Eye" },
    { label: t("benefit5"), iconName: "Handshake" },
    { label: t("benefit6"), iconName: "UserPlus" },
  ],

  steps: [
    { label: t("step1"), iconName: "Check" },
    { label: t("step2"), iconName: "Video" },
    { label: t("step3"), iconName: "Award" },
    { label: t("step4"), iconName: "Star" },
    { label: t("step5"), iconName: "CheckCircle2" },
    { label: t("step6"), iconName: "TrendingUp" },
  ],
});

export const getTestimonialsConfig = (t: Translator) => ({
  label: t("label"),
  heading: t("heading"),

  testimonials: [
    {
      id: 1,
      name: t("t1Name"),
      quote: t("t1Quote"),
      image: "/assets/images/why-t1.webp",
    },
    {
      id: 2,
      name: t("t2Name"),
      quote: t("t2Quote"),
      image: "/assets/images/why-t1.webp",
    },
    {
      id: 3,
      name: t("t3Name"),
      quote: t("t3Quote"),
      image: "/assets/images/why-t1.webp",
    },
    {
      id: 4,
      name: t("t4Name"),
      quote: t("t4Quote"),
      image: "/assets/images/why-t1.webp",
    },
    {
      id: 5,
      name: t("t5Name"),
      quote: t("t5Quote"),
      image: "/assets/images/why-t1.webp",
    },
  ],
});

export const getAwardsConfig = (t: Translator) => ({
  label: t("label"),

  logos: [
    {
      src: "/assets/images/logos/address.png",
      alt: t("addressAlt"),
      width: 120,
      height: 40,
    },
    {
      src: "/assets/images/logos/doubletree.png",
      alt: t("doubletreeAlt"),
      width: 110,
      height: 40,
    },
    {
      src: "/assets/images/logos/hilton.png",
      alt: t("hiltonAlt"),
      width: 100,
      height: 40,
    },
    {
      src: "/assets/images/logos/jumeirah.png",
      alt: t("jumeirahAlt"),
      width: 120,
      height: 40,
    },
  ],
});

export const getBlogConfig = (t: Translator) => ({
  label: t("label"),
  heading: t("heading"),
  viewAllLabel: t("viewAllLabel"),
  viewAllHref: "/blog",
  learnMoreLabel: t("learnMoreLabel"),

  posts: [
    {
      slug: "kitchen-layout",
      tag: t("tag"),
      readTime: t("post1ReadTime"),
      title: t("post1Title"),
      href: "/blog/kitchen-layout",
      image: {
        src: "/assets/images/Banner.webp",
        alt: t("post1ImageAlt"),
      },
    },
    {
      slug: "wardrobe-organisation",
      tag: t("tag"),
      readTime: t("post2ReadTime"),
      title: t("post2Title"),
      href: "/blog/wardrobe-organisation",
      image: {
        src: "/assets/images/Banner.webp",
        alt: t("post1ImageAlt"),
      },
    },
    {
      slug: "design-trends-2025",
      tag: t("tag"),
      readTime: t("post3ReadTime"),
      title: t("post3Title"),
      href: "/blog/design-trends-2025",
      image: {
        src: "/assets/images/Banner.webp",
        alt: t("post1ImageAlt"),
      },
    },
    {
      slug: "walkin-wardrobe-dubai",
      tag: t("tag"),
      readTime: t("post4ReadTime"),
      title: t("post4Title"),
      href: "/blog/walkin-wardrobe-dubai",
      image: {
        src: "/assets/images/Banner.webp",
        alt: t("post4ImageAlt"),
      },
    },
  ],
});

export const getLocationColumns = (t: Translator) => {
  const sharedLinks = [
    { label: t("link_kitchensMarina"), href: "/spaces" },
    { label: t("link_joineryDowntown"), href: "/spaces" },
    { label: t("link_wardrobesEmirates"), href: "/spaces" },
    { label: t("link_cabinetsPalm"), href: "/spaces" },
    { label: t("link_kitchensAbuDhabi"), href: "/spaces" },
  ];

  const abuDhabiLinks = [
    { label: t("link_kitchensAbuDhabi"), href: "/spaces" },
    { label: t("link_joineryAbuDhabi"), href: "/spaces" },
    { label: t("link_wardrobesAbuDhabi"), href: "/spaces" },
    { label: t("link_cabinetsAbuDhabi"), href: "/spaces" },
    { label: t("link_kitchensMarina"), href: "/spaces" },
  ];

  return [
    { city: t("palmJumeirah"), links: sharedLinks },
    { city: t("dubaiMarina"),  links: sharedLinks },
    { city: t("downtownDubai"), links: sharedLinks },
    { city: t("abuDhabi"), links: abuDhabiLinks },
  ];
};
