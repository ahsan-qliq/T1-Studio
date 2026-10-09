import type {
  CmsAwardsRecognitionSectionT,
  CmsMaterialInspirationSectionT,
  CmsStatsSection,
  CmsSignatureProjectsSectionT,
  CmsServicesSection,
  CmsConsultationCTASection,
  CmsFaqSection,
} from "@/lib/cms/types";
import type { MilestoneIconName } from "@/components/sections/MilestoneTimelineSection";

export const PROJECT_SIZES = [
  { width: 700, height: 500 },
  { width: 280, height: 180 },
  { width: 560, height: 480 },
];

const MILESTONE_ICONS: MilestoneIconName[] = [
  "Globe",
  "Lightbulb",
  "BarChart2",
  "BookMarked",
];

export const mapTradeLogos = (section: CmsAwardsRecognitionSectionT) =>
  section.logos.map((logo) => ({
    src: logo.logo.url,
    alt: logo.logo.alt as string,
    width: 120,
    height: 40,
  }));

export const mapTradeWhoWeWorkWith = (section: CmsMaterialInspirationSectionT) =>
  section.items.map((item) => ({
    src: item.image.url,
    alt: item.image.alt as string,
    label: item.label,
  }));

export const mapTradeStats = (section: CmsStatsSection) =>
  section.stats
    .filter((s) => s.isVisible)
    .map((s) => ({ value: s.value, label: s.label as string }));

export const mapTradeProjects = (section: CmsSignatureProjectsSectionT) =>
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

export const mapTradeBenefits = (section: CmsServicesSection) =>
  section.items
    .filter((svc) => svc.isVisible)
    .map((svc) => ({
      title: svc.title as string,
      subtitle: svc.description as string,
    }));

export const mapTradeIndustryServices = (section: CmsConsultationCTASection) =>
  section.items
    .filter((m) => m.isVisible)
    .map((m, i) => ({
      iconName: MILESTONE_ICONS[i % MILESTONE_ICONS.length],
      year: (m.title as string).split("—")[0].trim(),
      description: m.description as string,
    }));

export const mapTradeFaq = (section: CmsFaqSection) =>
  section.faqs
    .filter((f) => f.isVisible)
    .map((f) => ({
      question: f.question as string,
      answer: f.answer as string,
    }));

export const getResourceCenterConfig = (locale: string) => ({
  heading: locale === "ar" ? "مركز الموارد" : "Resource Center",
  prevLabel: locale === "ar" ? "السابق" : "Previous resources",
  nextLabel: locale === "ar" ? "التالي" : "Next resources",
  downloadLabel: locale === "ar" ? "تحميل" : "Download",
  items: [
    {
      id: "1",
      title: locale === "ar" ? "الملف التعريفي للشركة" : "T One Company Profile",
      fileType: "PDF",
      fileSize: "13MB",
      downloadUrl: "/assets/downloads/T One - Company Profile.pdf",
    },
    {
      id: "2",
      title: locale === "ar" ? "التأهيل المسبق 2026" : "Prequalification 2026",
      fileType: "PDF",
      fileSize: "19MB",
      downloadUrl: "/assets/downloads/Tone Universal Prequalification 2026 1.pdf",
    },
    {
      id: "3",
      title:
        locale === "ar"
          ? "كتالوج إلهام كيلر 2026"
          : "Keller Inspiration Brochure 2026",
      fileType: "PDF",
      fileSize: "8.1MB",
      downloadUrl:
        "/assets/downloads/Keller inspiration brochure 2026-EN-SPREAD-LR.pdf",
    },
    {
      id: "4",
      title: locale === "ar" ? "شهادات الأيزو" : "ISO Certificates",
      fileType: "PDF",
      fileSize: "5.6MB",
      downloadUrl: "/assets/downloads/ISO Certificates.pdf",
    },
  ],
});

export const getPartnerLeadConfig = () => ({
  heading: "Partner With Us",
  imageSrc: "/assets/images/contact.webp",
  imageAlt: "Partner with T1 Studio",
  submitLabel: "Submit",
  tradePartnerLabel: "Trade Partner",
  referralPartnerLabel: "Referral Partner",
  trade: {
    companyNameLabel: "Company Name",
    companyTypeLabel: "Company Type",
    companyTypeOptions: [
      { value: "architecture", label: "Architecture Firm" },
      { value: "interior-design", label: "Interior Design Studio" },
      { value: "construction", label: "Construction Company" },
      { value: "real-estate", label: "Real Estate Developer" },
      { value: "contractor", label: "General Contractor" },
    ],
    projectScaleLabel: "Project Scale",
    projectScaleOptions: [
      { value: "residential", label: "Residential" },
      { value: "commercial", label: "Commercial" },
      { value: "mixed-use", label: "Mixed Use" },
      { value: "hospitality", label: "Hospitality" },
    ],
    locationLabel: "Location",
    locationOptions: [
      { value: "dubai", label: "Dubai" },
      { value: "abu-dhabi", label: "Abu Dhabi" },
      { value: "sharjah", label: "Sharjah" },
      { value: "other-uae", label: "Other UAE" },
      { value: "international", label: "International" },
    ],
    firstNameLabel: "First Name",
    lastNameLabel: "Last Name",
    emailLabel: "Email Address",
    phoneLabel: "Phone Number",
  },
  referral: {
    firstNameLabel: "First Name",
    lastNameLabel: "Last Name",
    emailLabel: "Email Address",
    phoneLabel: "Phone Number",
    clientNameLabel: "Client Name",
    referralSourceLabel: "How did you hear about us?",
    referralSourceOptions: [
      { value: "existing-client", label: "Existing Client" },
      { value: "social-media", label: "Social Media" },
      { value: "word-of-mouth", label: "Word of Mouth" },
      { value: "online-search", label: "Online Search" },
      { value: "event", label: "Event or Exhibition" },
    ],
    clientTypeLabel: "Client Type",
    clientTypeOptions: [
      { value: "residential", label: "Residential" },
      { value: "commercial", label: "Commercial" },
      { value: "both", label: "Both" },
    ],
  },
});
