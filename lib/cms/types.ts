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
  breadcrumbs: Array<{ label: CmsBilingualText; href: string }>;
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
  stats: CmsStatItem[];
}
export interface CmsStatsSectionT {
  isVisible: boolean;
  order: number;
  statistics: CmsStatItem[];
}
// ─── Services ─────────────────────────────────────────────────────────────────

export interface CmsServiceItem {
  icon: string;
  title: CmsBilingualText;
  value: CmsBilingualText;
  description?: CmsBilingualText;
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
  items: CmsServiceItem[];
  button: CmsButton;
}

export interface CmsServicesSectionT {
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
  rooms: CmsSpaceItem[];
  button: CmsButton;
}

export interface CmsFeaturedSpacesSectionT {
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
  articles: CmsProjectItem[];
  button: CmsButton;
}

export interface CmsSignatureProjectsSectionT {
  isVisible: boolean;
  order: number;
  eyebrow: CmsBilingualText;
  heading: CmsBilingualText;
  description: CmsBilingualText;
  projects: CmsProjectItem[];
  articles?: CmsProjectItem[];
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
export interface CmsTabT {
  title: CmsBilingualText;
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
  items: CmsTabT[];
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
  services: CmsPartnerStep[];
  button: CmsButton;
}
export interface CmsPartnershipSectionT {
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
  brands?: CmsAwardItem[];
}

export interface CmsAwardsRecognitionSectionT {
  isVisible: boolean;
  order: number;
  eyebrow: CmsBilingualText;
  heading: CmsBilingualText;
  description: CmsBilingualText;
  brands: CmsAwardItem[];
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
  values?: CmsMaterialItem[];
}
export interface CmsMaterialInspirationSectionT {
  isVisible: boolean;
  order: number;
  heading: string;
  items: CmsMaterialItem[];
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
  designTips: CmsSignatureProjectsSectionT;
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
  brands: CmsAwardsRecognitionSectionT;
  partnership: CmsPartnershipSectionT;
  designTips: CmsSignatureProjectsSectionT;
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
  whoWeWorkWith: CmsMaterialInspirationSectionT;
  journey: CmsJourneySection;
  stats: CmsStatsSection;
  projects: CmsSignatureProjectsSectionT;
  benefits: CmsServicesSection;
  partnershipServices: CmsPartnershipSection;
  industryServices: CmsConsultationCTASection;
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
  category?: string;
  slug?: string;
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

export interface CmsBlogArticle {
  _id: string;
  blogSlug: string;
  title: string;
  excerpt: string;
  category: string;
  categoryKey: string;
  author: string;
  readTime: string;
  publishedDate: string | null;
  image: CmsImage;
  href: string;
  featured: boolean;
  isVisible: boolean;
}

export interface CmsBlogArticleListingSection {
  isVisible: boolean;
  order: number;
  eyebrow: string;
  heading: string;
  description: string;
  categories: Array<{ key: string; label: string; isVisible: boolean; _id: string }>;
  featuredArticle: CmsBlogArticle;
  articles: CmsBlogArticle[];
  enableCategoryFilter: boolean;
  enableLoadMore: boolean;
  initialDisplayCount: number;
  loadMoreCount: number;
  loadMoreButton: CmsButton;
}

export interface CmsBlogPagePartnershipSection {
  isVisible: boolean;
  order: number;
  eyebrow: string;
  heading: string;
  description: string;
  image: CmsImage;
  button: CmsButton;
  steps: Array<{ title: string; icon: string; _id?: string }>;
}

// ─── Full blogs page ──────────────────────────────────────────────────────────

export interface CmsBlogsPageSections {
  hero: CmsHeroSection;
  blogListing: CmsBlogArticleListingSection;
  partnership: CmsBlogPagePartnershipSection;
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
  projects: CmsBlogListingSection;
  testimonials: CmsTestimonialsSection;
  beforeAfter: CmsBeforeAfterSection;
  partnership: CmsPartnershipSectionT;
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

export interface CmsBlogDetailBreadcrumb {
  label: CmsBilingualText;
  href: string;
}

export interface CmsBlogDetailHeroSection {
  isVisible: boolean;
  order: number;
  eyebrow: CmsBilingualText;
  title: CmsBilingualText;
  excerpt: CmsBilingualText;
  backgroundImage: CmsImage;
  mobileImage: CmsImage;
  overlayOpacity: number;
  breadcrumbs: CmsBlogDetailBreadcrumb[];
}

export interface CmsBlogDetailArticleBlock {
  type: 'heading' | 'paragraph' | 'list' | 'table' | 'button' | 'image' | string;
  level?: number;
  heading?: CmsBilingualText | string;
  content?: CmsBilingualText;
  caption?: CmsBilingualText;
  images?: CmsImage[];
  listItems?: CmsBilingualText[];
  listStyle?: string;
  headers?: string[];
  rows?: string[][];
  faqItems?: Array<{ question: CmsBilingualText | string; answer: CmsBilingualText | string; _id?: string }>;
  isVisible: boolean;
  _id: string;
  button?: {
    label: CmsBilingualText;
    href: string;
    openInNewTab: boolean;
  };
}

export interface CmsBlogDetailArticleContent {
  isVisible: boolean;
  order: number;
  intro: CmsBilingualText;
  blocks: CmsBlogDetailArticleBlock[];
}

export interface CmsBlogDetailConsultationField {
  name: string;
  label: CmsBilingualText;
  placeholder: CmsBilingualText;
  type: string;
  required: boolean;
  options: Array<{ label: CmsBilingualText; value: string; _id: string }>;
  _id: string;
}

export interface CmsBlogDetailConsultationSection {
  isVisible: boolean;
  order: number;
  eyebrow: CmsBilingualText;
  heading: CmsBilingualText;
  description: CmsBilingualText;
  image: CmsImage;
  fields: CmsBlogDetailConsultationField[];
  submitButtonLabel: CmsBilingualText;
  successMessage: CmsBilingualText;
}

export interface CmsBlogDetailRelatedArticle {
  _id: string;
  title: CmsBilingualText;
  slug: string;
  excerpt: CmsBilingualText;
  category: string;
  featuredImage: CmsImage;
  readTime: CmsBilingualText;
}

export interface CmsBlogDetailRelatedArticlesSection {
  isVisible: boolean;
  order: number;
  eyebrow: CmsBilingualText;
  heading: CmsBilingualText;
  description: CmsBilingualText;
  articles: CmsBlogDetailRelatedArticle[];
  button: CmsButton;
}

export interface CmsBlogDetailAuthor {
  name: CmsBilingualText;
  designation: CmsBilingualText;
  bio: CmsBilingualText;
  image: CmsImage;
  linkedinUrl: string;
  websiteUrl: string;
}

export interface CmsBlogDetailAuthorInfoSection {
  isVisible: boolean;
  order: number;
  heading: CmsBilingualText;
  author: CmsBlogDetailAuthor;
}

export interface CmsBlogDetailSections {
  hero: CmsBlogDetailHeroSection;
  articleContent: CmsBlogDetailArticleContent;
  consultation: CmsBlogDetailConsultationSection;
  relatedArticles: CmsBlogDetailRelatedArticlesSection;
  authorInfo: CmsBlogDetailAuthorInfoSection;
}

export interface CmsBlogDetailSeo {
  keywords: { en: string[]; ar: string[] };
  metaTitle: CmsBilingualText;
  metaDescription: CmsBilingualText;
  canonicalUrl: string;
  ogImage: CmsImage;
  noIndex: boolean;
  noFollow: boolean;
}

export interface CmsBlogDetail {
  _id: string;
  title: CmsBilingualText;
  slug: string;
  excerpt: CmsBilingualText;
  category: string;
  categoryLabel: CmsBilingualText;
  author: CmsBlogDetailAuthor;
  readTime: CmsBilingualText;
  featuredImage: CmsImage;
  status: string;
  isFeatured: boolean;
  tags: { en: string[]; ar: string[] };
  sections: CmsBlogDetailSections;
  seo: CmsBlogDetailSeo;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
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
  _id:string;
  title:string;
  href:string;
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

export interface CmsGallerySectionT {
  isVisible: boolean;
  order: number;
  gallery: CmsImageGallerySection[];
}
// ─── Full spaces page ─────────────────────────────────────────────────────────

export interface CmsSpacesPageSections {
  hero: CmsHeroSection;
  intro: CmsPhilosophySection;
  featuredSpaces: CmsFeaturedSpacesSectionT;
  showcase: CmsGallerySectionT;
  whyChooseT1: CmsWhyChooseT1Section;
  signatureProjects: CmsSignatureProjectsSectionT;
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
  button: CmsButton
  autoplay: boolean;
  showNavigation: boolean;
}
export interface CmsSpaceGallerySectionT {
  isVisible: boolean;
  order: number;
  eyebrow: string;
  heading: string;
  description: string;
  images: CmsImageGallerySection[];
  button: CmsButton
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
  styles: CmsSpaceGallerySection
  gallery: CmsSpaceGallerySectionT;
  materials: CmsMaterialInspirationSection;
  brands: CmsSpaceBrandsSection;
  relatedProjects: CmsSignatureProjectsSectionT;
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
  stats: CmsStatsSectionT;
  services: CmsServicesSectionT;
  featuredSpaces: CmsFeaturedSpacesSectionT;
  signatureProjects: CmsSignatureProjectsSectionT;
  journey: CmsJourneySection;
  whyChooseT1: CmsWhyChooseT1Section;
  testimonials: CmsTestimonialsSection;
  consultationCTA: CmsConsultationCTASection;
  partnership: CmsPartnershipSectionT;
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

// ─── Project Detail Page ─────────────────────────────────────────────────────

export interface CmsProjectDetailHeroStat {
  value: string;
  label: CmsBilingualText;
  icon: string;
  _id: string;
}

export interface CmsProjectDetailHeroSection {
  isVisible: boolean;
  order: number;

  eyebrow: CmsBilingualText;
  heading: CmsBilingualText;
  description: CmsBilingualText;
  location: CmsBilingualText;

  backgroundImage: CmsImage;
  mobileImage: CmsImage;
breadcrumbs: Array<{ label: CmsBilingualText; href: string }>;
  stats: CmsProjectDetailHeroStat[];

  overlayOpacity: number;
}

// ─── Project Detail Overview ─────────────────────────────────────────────────

export interface CmsProjectDetailOverviewSection {
  isVisible: boolean;
  order: number;

  eyebrow: CmsBilingualText;
  heading: CmsBilingualText;
  description: CmsBilingualText;

  image: CmsImage;

  imagePosition: "left" | "right" | string;
}

// ─── Project Detail Before / After ───────────────────────────────────────────

export interface CmsProjectDetailBeforeAfterItem {
  title: CmsBilingualText;
  description: CmsBilingualText;

  beforeImage: CmsImage;
  afterImage: CmsImage;

  isVisible: boolean;
  _id: string;
}

export interface CmsProjectDetailBeforeAfterSection {
  isVisible: boolean;
  order: number;

  eyebrow: CmsBilingualText;
  heading: CmsBilingualText;
  description: CmsBilingualText;

  items: CmsProjectDetailBeforeAfterItem[];

  showNavigation: boolean;
  autoplay: boolean;
}

// ─── Project Detail Gallery ──────────────────────────────────────────────────

export interface CmsProjectDetailGalleryItem {
  image: CmsImage;

  title: CmsBilingualText;
  caption: CmsBilingualText;

  isVisible: boolean;
  _id: string;
}

export interface CmsProjectDetailGallerySection {
  isVisible: boolean;
  order: number;

  eyebrow: CmsBilingualText;
  heading: CmsBilingualText;
  description: CmsBilingualText;

  images: CmsProjectDetailGalleryItem[];

  autoplay: boolean;
  showNavigation: boolean;
}

// ─── Project Detail Materials ────────────────────────────────────────────────

export interface CmsProjectDetailMaterialItem {
  title: CmsBilingualText;
  subtitle: CmsBilingualText;
  description: CmsBilingualText;

  image: CmsImage;

  isVisible: boolean;
  _id: string;
}

export interface CmsProjectDetailMaterialsSection {
  isVisible: boolean;
  order: number;

  eyebrow: CmsBilingualText;
  heading: CmsBilingualText;
  description: CmsBilingualText;

  materials: CmsProjectDetailMaterialItem[];
}

// ─── Project Detail Info ─────────────────────────────────────────────────────

export interface CmsProjectInfoDetail {
  label?: CmsBilingualText;
  value?: CmsBilingualText;
  _id?: string;
}

export interface CmsProjectDetailInfoSection {
  isVisible: boolean;
  order: number;

  eyebrow: CmsBilingualText;
  heading: CmsBilingualText;
  description: CmsBilingualText;

  details: CmsProjectInfoDetail[];

  button: CmsButton;
}

// ─── Project Detail Testimonial ──────────────────────────────────────────────

export interface CmsProjectDetailTestimonialItem {
  quote?: CmsBilingualText;
  author?: CmsBilingualText;
  authorRole?: CmsBilingualText;

  badge?: CmsBilingualText;
  readTime?: CmsBilingualText;

  image?: CmsImage;
  avatar?: CmsImage;

  videoUrl?: string;

  _id?: string;
}

export interface CmsProjectDetailTestimonialSection {
  isVisible: boolean;
  order: number;

  eyebrow: CmsBilingualText;
  heading: CmsBilingualText;
  description: CmsBilingualText;

  testimonials: CmsProjectDetailTestimonialItem[];

  autoplay: boolean;
}

// ─── Project Detail Related Projects ─────────────────────────────────────────

export interface CmsProjectDetailRelatedProject {
  title?: CmsBilingualText;
  description?: CmsBilingualText;
  location?: CmsBilingualText;

  image?: CmsImage;

  href?: string;
  slug?: string;

  position?: string;

  isVisible?: boolean;
  _id?: string;
}

export interface CmsProjectDetailRelatedProjectsSection {
  isVisible: boolean;
  order: number;

  eyebrow: CmsBilingualText;
  heading: CmsBilingualText;
  description: CmsBilingualText;

  projects: CmsProjectDetailRelatedProject[];

  button: CmsButton;
}

// ─── Project Detail Consultation ─────────────────────────────────────────────

export interface CmsProjectDetailConsultationSection {
  isVisible: boolean;
  order: number;

  eyebrow: CmsBilingualText;
  heading: CmsBilingualText;
  description: CmsBilingualText;

  image: CmsImage;

  fields: CmsFormField[];

  submitButtonLabel: CmsBilingualText;
}

// ─── Project Detail Sections ─────────────────────────────────────────────────

export interface CmsProjectDetailSections {
  hero: CmsProjectDetailHeroSection;

  overview: CmsProjectDetailOverviewSection;

  beforeAfter: CmsProjectDetailBeforeAfterSection;

  gallery: CmsProjectDetailGallerySection;

  materials: CmsProjectDetailMaterialsSection;

  projectInfo: CmsProjectDetailInfoSection;

  testimonial: CmsProjectDetailTestimonialSection;

  relatedProjects: CmsProjectDetailRelatedProjectsSection;

  consultation: CmsProjectDetailConsultationSection;
}

// ─── Project Detail SEO ──────────────────────────────────────────────────────

export interface CmsProjectDetailSeo {
  keywords: CmsBilingualText;

  metaTitle: CmsBilingualText;

  metaDescription: CmsBilingualText;

  canonicalUrl: string;

  ogImage: CmsImage;

  noIndex: boolean;

  noFollow: boolean;
}

// ─── Full Project Detail Page ────────────────────────────────────────────────

export interface CmsProjectDetail {
  _id?: string;

  slug: string;

  pageName: string;

  projectName: CmsBilingualText;

  projectCategory: string;

  status: string;

  sections: CmsProjectDetailSections;

  seo: CmsProjectDetailSeo;

  publishedAt: string | null;

  createdAt?: string;

  updatedAt?: string;
}
