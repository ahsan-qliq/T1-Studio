// Shared primitives

export interface CmsBilingualText {
  en?: string;
  ar?: string;
}

export interface CmsImage {
  url: string;
  key: string;
  alt: CmsBilingualText;
}

export interface CmsButton {
  label: CmsBilingualText;
  href: string;
  openInNewTab: boolean;
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

export interface CmsHeroSection {
  isVisible: boolean;
  order: number;
  eyebrow: CmsBilingualText;
  heading: CmsBilingualText;
  description: CmsBilingualText;
  backgroundImage: CmsImage;
  mobileImage: CmsImage;
  primaryButton: CmsButton;
  secondaryButton: CmsButton;
  overlayOpacity: number;
  imageSrc: string;
}

// ─── Stats ────────────────────────────────────────────────────────────────────

export interface CmsStatItem {
  value: string;
  label: CmsBilingualText;
  isVisible: boolean;
  _id: string;
}

export interface CmsStatsSection {
  isVisible: boolean;
  order: number;
  statistics: CmsStatItem[];
}

// ─── Services ─────────────────────────────────────────────────────────────────

export interface CmsServiceItem {
  icon: string;
  title: CmsBilingualText;
  description: CmsBilingualText;
  href: string;
  isVisible: boolean;
  _id: string;
}

export interface CmsServicesSection {
  isVisible: boolean;
  order: number;
  eyebrow: CmsBilingualText;
  heading: CmsBilingualText;
  description: CmsBilingualText;
  services: CmsServiceItem[];
  button: CmsButton;
}

// ─── Featured spaces ──────────────────────────────────────────────────────────

export interface CmsSpaceItem {
  title: CmsBilingualText;
  image: CmsImage;
  href: string;
  isVisible: boolean;
  _id: string;
}

export interface CmsFeaturedSpacesSection {
  isVisible: boolean;
  order: number;
  eyebrow: CmsBilingualText;
  heading: CmsBilingualText;
  description: CmsBilingualText;
  spaces: CmsSpaceItem[];
  button: CmsButton;
}

// ─── Signature projects ───────────────────────────────────────────────────────

export interface CmsProjectItem {
  title: CmsBilingualText;
  description: CmsBilingualText;
  location: CmsBilingualText;
  image: CmsImage;
  href: string;
  position: string;
  isVisible: boolean;
  _id: string;
}

export interface CmsSignatureProjectsSection {
  isVisible: boolean;
  order: number;
  eyebrow: CmsBilingualText;
  heading: CmsBilingualText;
  description: CmsBilingualText;
  projects: CmsProjectItem[];
  button: CmsButton;
}

// ─── Journey ──────────────────────────────────────────────────────────────────

export interface CmsJourneyStep {
  icon: string;
  title: CmsBilingualText;
  subtitle: CmsBilingualText;
  description: CmsBilingualText;
  advantageTitle: CmsBilingualText;
  advantageDescription: CmsBilingualText;
  highlight: CmsBilingualText;
  isVisible: boolean;
  _id: string;
}

export interface CmsJourneySection {
  isVisible: boolean;
  order: number;
  eyebrow: CmsBilingualText;
  heading: CmsBilingualText;
  description: CmsBilingualText;
  steps: CmsJourneyStep[];
}

// ─── Why Choose T1 (Comparison) ───────────────────────────────────────────────

export interface CmsComparisonItem {
  label: CmsBilingualText;
  available: boolean;
}

export interface CmsComparisonColumn {
  title: CmsBilingualText;
  highlighted: boolean;
  items: CmsComparisonItem[];
  _id: string;
}

export interface CmsWhyChooseT1Section {
  isVisible: boolean;
  order: number;
  eyebrow: CmsBilingualText;
  heading: CmsBilingualText;
  description: CmsBilingualText;
  columns: CmsComparisonColumn[];
}

// ─── Testimonials ─────────────────────────────────────────────────────────────

export interface CmsTestimonialItem {
  clientName: string;
  designation: string;
  testimonial: string;
  image: CmsImage;
  videoUrl?: string;
  isVisible: boolean;
  _id: string;
}

export interface CmsTestimonialsSection {
  isVisible: boolean;
  order: number;
  eyebrow: CmsBilingualText;
  heading: CmsBilingualText;
  description: CmsBilingualText;
  testimonials: CmsTestimonialItem[];
}

// ─── Consultation CTA (Dream Space form) ─────────────────────────────────────

export interface CmsTab {
  label: CmsBilingualText;
  description: CmsBilingualText;
  value: string;
  _id: string;
}

export interface CmsFormField {
  type: string;
  name: string;
  label: CmsBilingualText;
  options?: Array<{ label: CmsBilingualText; value: string; _id: string }>;
  _id: string;
}

export interface CmsConsultationCTASection {
  isVisible: boolean;
  order: number;
  eyebrow: CmsBilingualText;
  heading: CmsBilingualText;
  description: CmsBilingualText;
  image: CmsImage;
  tabs: CmsTab[];
  fields: CmsFormField[];
  submitButtonLabel: CmsBilingualText;
}

// ─── Partnership (Referral) ───────────────────────────────────────────────────

export interface CmsPartnerStep {
  icon: string;
  title: CmsBilingualText;
  description: CmsBilingualText;
  _id: string;
}

export interface CmsPartnershipSection {
  isVisible: boolean;
  order: number;
  eyebrow: CmsBilingualText;
  heading: CmsBilingualText;
  description: CmsBilingualText;
  image: CmsImage;
  steps: CmsPartnerStep[];
  button: CmsButton;
}

// ─── Awards & Recognition ─────────────────────────────────────────────────────

export interface CmsAwardItem {
  name: CmsBilingualText;
  caption: CmsBilingualText;
  logo: CmsImage;
  href: string;
  openInNewTab: boolean;
  _id: string;
}

export interface CmsAwardsRecognitionSection {
  isVisible: boolean;
  order: number;
  eyebrow: CmsBilingualText;
  heading: CmsBilingualText;
  description: CmsBilingualText;
  awards: CmsAwardItem[];
}

// ─── Design Tips (Blog) ───────────────────────────────────────────────────────

export interface CmsArticleItem {
  title: string;
  description: string;
  category: string;
  readTime: string;
  image: CmsImage;
  href: string;
  isVisible: boolean;
  _id: string;
}

export interface CmsDesignTipsSection {
  isVisible: boolean;
  order: number;
  eyebrow: CmsBilingualText;
  heading: CmsBilingualText;
  description: CmsBilingualText;
  articles: CmsArticleItem[];
  button: CmsButton;
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────

export interface CmsFaqItem {
  question: CmsBilingualText;
  answer: CmsBilingualText;
  isVisible: boolean;
  _id: string;
}

export interface CmsFaqSection {
  isVisible: boolean;
  order: number;
  eyebrow: CmsBilingualText;
  heading: CmsBilingualText;
  description: CmsBilingualText;
  faqs: CmsFaqItem[];
}

// ─── Location links ───────────────────────────────────────────────────────────

export interface CmsLocationLinkItem {
  label: CmsBilingualText;
  href: string;
  openInNewTab: boolean;
  _id: string;
}

export interface CmsLocationColumn {
  title: CmsBilingualText;
  description: CmsBilingualText;
  links: CmsLocationLinkItem[];
  _id: string;
}

export interface CmsLocationLinksSection {
  isVisible: boolean;
  order: number;
  eyebrow: CmsBilingualText;
  heading: CmsBilingualText;
  description: CmsBilingualText;
  columns: CmsLocationColumn[];
}

// ─── Material inspiration ─────────────────────────────────────────────────────

export interface CmsMaterialItem {
  image: CmsImage;
  label: string;
  _id: string;
}

export interface CmsMaterialInspirationSection {
  isVisible: boolean;
  order: number;
  heading: string;
  materials: CmsMaterialItem[];
}

// ─── Inspiration CTA banner ───────────────────────────────────────────────────

export interface CmsInspirationCTASection {
  isVisible: boolean;
  order: number;
  heading: string;
  description: string;
  button: CmsButton;
  secondaryButton: CmsButton;
  backgroundImage: CmsImage;
}

// ─── Journey gallery (Instagram strip) ───────────────────────────────────────

export interface CmsJourneyGallerySection {
  isVisible: boolean;
  order: number;
  heading: string;
  button: CmsButton;
  items: CmsImageGallerySection[];
}

// ─── Full inspiration page ────────────────────────────────────────────────────

export interface CmsInspirationPageSections {
  hero: CmsHeroSection;
  rooms: CmsFeaturedSpacesSection;
  showcase: CmsGallerySection;
  materials: CmsMaterialInspirationSection;
  inspirationCTA: CmsInspirationCTASection;
  designTips: CmsSignatureProjectsSection;
  followJourney: CmsJourneyGallerySection;
}

export interface CmsInspirationPage {
  _id: string;
  slug: string;
  pageName: string;
  status: string;
  sections: CmsInspirationPageSections;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
}

// ─── Client testimonials (card variant) ──────────────────────────────────────

export interface CmsClientTestimonialItem {
  quote: string;
  author: string;
  authorRole: string;
  badge: string;
  readTime: string;
  image: CmsImage;
  avatar: CmsImage;
  videoUrl?: string;
  _id: string;
}

export interface CmsClientTestimonialsSection {
  isVisible: boolean;
  order: number;
  eyebrow: string;
  heading: string;
  testimonials: CmsClientTestimonialItem[];
}

// ─── Full why-t1 page ─────────────────────────────────────────────────────────

export interface CmsWhyT1PageSections {
  hero: CmsHeroSection;
  comparison: CmsWhyChooseT1Section;
  journey: CmsJourneySection;
  stats: CmsStatsSection;
  benefits: CmsServicesSection;
  clientTestimonials: CmsClientTestimonialsSection;
  brands: CmsAwardsRecognitionSection;
  partnership: CmsPartnershipSection;
  designTips: CmsSignatureProjectsSection;
  faq: CmsFaqSection;
}

export interface CmsWhyT1Page {
  _id: string;
  slug: string;
  pageName: string;
  status: string;
  sections: CmsWhyT1PageSections;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
}

// ─── Full trade page ──────────────────────────────────────────────────────────

export interface CmsTradePageSections {
  hero: CmsHeroSection;
  awardsRecognition: CmsAwardsRecognitionSection;
  materialInspiration: CmsMaterialInspirationSection;
  journey: CmsJourneySection;
  stats: CmsStatsSection;
  signatureProjects: CmsSignatureProjectsSection;
  services: CmsServicesSection;
  partnership: CmsPartnershipSection;
  consultationCTA: CmsConsultationCTASection;
  faq: CmsFaqSection;
}

export interface CmsTradePage {
  _id: string;
  slug: string;
  pageName: string;
  status: string;
  sections: CmsTradePageSections;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
}

// ─── Map ──────────────────────────────────────────────────────────────────────

export interface CmsMapSection {
  isVisible: boolean;
  order: number;
  embedUrl: string;
  title: string;
  height: number;
}

// ─── Full contact page ────────────────────────────────────────────────────────

export interface CmsContactPageSections {
  hero: CmsHeroSection;
  contactInfo: CmsServicesSection;
  contactForm: CmsConsultationCTASection;
  location: CmsMapSection;
  faq: CmsFaqSection;
}

export interface CmsContactPage {
  _id: string;
  slug: string;
  pageName: string;
  status: string;
  sections: CmsContactPageSections;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
}

// ─── About story ─────────────────────────────────────────────────────────────

export interface CmsAboutStorySection {
  isVisible: boolean;
  order: number;
  eyebrow: string;
  heading: string;
  description: string;
  image: CmsImage;
}

// ─── Milestone timeline ───────────────────────────────────────────────────────

export interface CmsMilestoneItem {
  iconName: string;
  year: string;
  description: string;
  _id: string;
}

export interface CmsMilestoneSection {
  isVisible: boolean;
  order: number;
  heading: string;
  milestones: CmsMilestoneItem[];
}

// ─── Team ─────────────────────────────────────────────────────────────────────

export interface CmsTeamMember {
  name: string;
  role: string;
  experience: string;
  quote: string;
  image: CmsImage;
  _id: string;
}

export interface CmsTeamSection {
  isVisible: boolean;
  order: number;
  heading: string;
  members: CmsTeamMember[];
}

// ─── Full about page ──────────────────────────────────────────────────────────

export interface CmsAboutMilestoneSection {
  isVisible: boolean;
  order: number;
  eyebrow: string;
  heading: string;
  description: string;
  items: CmsMilestoneItem[];
}

export interface CmsAboutPageSections {
  hero: CmsHeroSection;
  story: CmsAboutStorySection;
  journey: CmsAboutMilestoneSection;
  philosophy: CmsServicesSection;
  values: CmsMaterialInspirationSection;
  stats: CmsStatsSection;
  team: CmsTeamSection;
  showcase: CmsGallerySection;
  brands: CmsAwardsRecognitionSection;
  partnership: CmsPartnershipSection;
  faq: CmsFaqSection;
}

export interface CmsAboutPage {
  _id: string;
  slug: string;
  pageName: string;
  status: string;
  sections: CmsAboutPageSections;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
}

// ─── Blog listing ─────────────────────────────────────────────────────────────

export interface CmsBlogFilterOption {
  value: string;
  label: string;
  _id: string;
}

export interface CmsBlogProjectItem {
  id: string;
  title: string;
  propertyType: string;
  completionYear: number;
  location: string;
  description: string;
  image: CmsImage;
  href: string;
  locationKey: string;
  serviceKeys: string[];
  styleKey: string;
  propertyTypeKey: string;
  isVisible: boolean;
  _id: string;
}

export interface CmsBlogListingSection {
  isVisible: boolean;
  order: number;
  heading: string;
  viewCaseStudyLabel: string;
  loadMoreLabel: string;
  propertyTypeMeta: string;
  completionYearMeta: string;
  locationMeta: string;
  noResultsLabel: string;
  clearFiltersLabel: string;
  filterLabels: {
    locations: string;
    services: string;
    style: string;
    propertyType: string;
  };
  filterOptions: {
    locations: CmsBlogFilterOption[];
    services: CmsBlogFilterOption[];
    styles: CmsBlogFilterOption[];
    propertyTypes: CmsBlogFilterOption[];
  };
  projects: CmsBlogProjectItem[];
}

// ─── Full blogs page ──────────────────────────────────────────────────────────

export interface CmsBlogsPageSections {
  hero: CmsHeroSection;
  listing: CmsBlogListingSection;
  partnership: CmsPartnershipSection;
  faq: CmsFaqSection;
}

export interface CmsBlogsPage {
  _id: string;
  slug: string;
  pageName: string;
  status: string;
  sections: CmsBlogsPageSections;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
}

// ─── Before / After ───────────────────────────────────────────────────────────

export interface CmsBeforeAfterItem {
  title: string | CmsBilingualText;
  description: string | CmsBilingualText;
  beforeImage: CmsImage;
  afterImage: CmsImage;
  projectHref: string;
  isVisible: boolean;
}

export interface CmsBeforeAfterSection {
  isVisible: boolean;
  order: number;

  heading: string | CmsBilingualText;
  description?: string | CmsBilingualText;

  items: CmsBeforeAfterItem[];

  autoplay?: boolean;
  showNavigation?: boolean;
}
// ─── Full projects page ───────────────────────────────────────────────────────

export interface CmsProjectsPageSections {
  hero: CmsHeroSection;
  listing: CmsBlogListingSection;
  testimonials: CmsTestimonialsSection;
  beforeAfter: CmsBeforeAfterSection;
  partnership: CmsPartnershipSection;
  faq: CmsFaqSection;
}

export interface CmsProjectsPage {
  _id: string;
  slug: string;
  pageName: string;
  status: string;
  sections: CmsProjectsPageSections;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
}

// ─── Blog detail ─────────────────────────────────────────────────────────────

export interface CmsBlogContentBlock {
  label: string;
  body: string;
  image: CmsImage;
  bodyAfter: string;
  _id: string;
}

export interface CmsBlogAuthorSection {
  isVisible: boolean;
  order: number;
  quote: string;
  name: string;
  role: string;
  experience: string;
  image: CmsImage;
}

export interface CmsBlogDetailSections {
  hero: CmsHeroSection;
  contentBlocks: {
    isVisible: boolean;
    order: number;
    blocks: CmsBlogContentBlock[];
  };
  consultationCTA: CmsConsultationCTASection;
  signatureProjects: CmsSignatureProjectsSection;
  author: CmsBlogAuthorSection;
}

export interface CmsBlogDetail {
  _id: string;
  slug: string;
  pageName: string;
  status: string;
  sections: CmsBlogDetailSections;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
}

// ─── Philosophy ───────────────────────────────────────────────────────────────

export interface CmsPhilosophySection {
  isVisible: boolean;
  order: number;
  eyebrow: string;
  heading: string;
  description: string;
  button: CmsButton;
}

// ─── Gallery / Carousel ───────────────────────────────────────────────────────
export interface CmsImageGallerySection {
  image: {
    url: string;
    key: string;
    alt: CmsBilingualText;
  };
}

export interface CmsGallerySection {
  isVisible: boolean;
  order: number;
  items: CmsImageGallerySection[];
}

// ─── Full spaces page ─────────────────────────────────────────────────────────

export interface CmsSpacesPageSections {
  hero: CmsHeroSection;
  intro: CmsPhilosophySection;
  featuredSpaces: CmsFeaturedSpacesSection;
  gallery: CmsGallerySection;
  whyChooseT1: CmsWhyChooseT1Section;
  signatureProjects: CmsSignatureProjectsSection;
  journey: CmsJourneySection;
  partnership: CmsPartnershipSection;
  faq: CmsFaqSection;
}

export interface CmsSpacesPage {
  _id: string;
  slug: string;
  pageName: string;
  status: string;
  sections: CmsSpacesPageSections;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
}

// ─── Space detail ─────────────────────────────────────────────────────────────

export interface CmsSpaceIntroSection {
  isVisible: boolean;
  order: number;
  eyebrow: string;
  heading: string;
  description: string;
  image: CmsImage;
  button: CmsButton;
  imagePosition: string;
}

export interface CmsApproachItem {
  description: string;
  _id: string;
}

export interface CmsSpaceFeaturesSection {
  isVisible: boolean;
  order: number;
  eyebrow: string;
  heading: string;
  description: string;
  image: CmsImage;
  items: CmsApproachItem[];
}

export interface CmsSpaceGallerySection {
  isVisible: boolean;
  order: number;
  eyebrow: string;
  heading: string;
  description: string;
  items: CmsImageGallerySection[];
  autoplay: boolean;
  showNavigation: boolean;
}

export interface CmsBrandItem {
  logo: CmsImage;
  _id: string;
}

export interface CmsSpaceBrandsSection {
  isVisible: boolean;
  order: number;
  heading: string;
  brands: CmsBrandItem[];
}

export interface CmsSpaceRelatedSpacesSection {
  isVisible: boolean;
  order: number;
  heading: string;
  spaces: CmsSpaceItem[];
  button: CmsButton;
}

export interface CmsSpaceConsultationSection {
  isVisible: boolean;
  order: number;
  eyebrow: string;
  heading: string;
  description: string;
  image: CmsImage;
  button: CmsButton;
}

export interface CmsSpaceDetailSections {
  hero: CmsHeroSection;
  intro: CmsSpaceIntroSection;
  features: CmsSpaceFeaturesSection;
  styles: CmsSpaceGallerySection;
  materials: CmsMaterialInspirationSection;
  brands: CmsSpaceBrandsSection;
  relatedProjects: CmsSignatureProjectsSection;
  journey: CmsJourneySection;
  faq: CmsFaqSection;
  relatedSpaces: CmsSpaceRelatedSpacesSection;
  consultation: CmsSpaceConsultationSection;
}

export interface CmsSpaceDetail {
  _id: string;
  slug: string;
  pageName: string;
  status: string;
  sections: CmsSpaceDetailSections;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
}

// ─── Full home page ───────────────────────────────────────────────────────────

export interface CmsHomePageSections {
  hero: CmsHeroSection;
  stats: CmsStatsSection;
  services: CmsServicesSection;
  featuredSpaces: CmsFeaturedSpacesSection;
  signatureProjects: CmsSignatureProjectsSection;
  journey: CmsJourneySection;
  whyChooseT1: CmsWhyChooseT1Section;
  testimonials: CmsTestimonialsSection;
  consultationCTA: CmsConsultationCTASection;
  partnership: CmsPartnershipSection;
  awardsRecognition: CmsAwardsRecognitionSection;
  designTips: CmsDesignTipsSection;
  faq: CmsFaqSection;
  locationLinks: CmsLocationLinksSection;
}

export interface CmsHomePage {
  _id: string;
  slug: string;
  pageName: string;
  status: string;
  sections: CmsHomePageSections;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
}
