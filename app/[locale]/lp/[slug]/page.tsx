import type { Metadata } from "next";
import {
    getDreamSpaceConfig,
  getServiceItems,
  getSignatureProjects,
} from "@/app/config/home.config";
import { getFaqConfig } from "@/app/config/space.config";
import { AboutStorySection } from "@/components/sections/AboutStorySection";
import { ClientTestimonialSection } from "@/components/sections/ClientTestimonialSection";
import { DreamSpaceSection } from "@/components/sections/DreamSpaceSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { LpHeroBanner } from "@/components/sections/LpHeroBanner";
import { MilestoneTimelineSection } from "@/components/sections/MilestoneTimelineSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { SignatureProjectsSection } from "@/components/sections/SignatureProjectsSection";
import { StatsBarServer } from "@/components/sections/StatsBarServer";
import { FadeUp } from "@/components/ui/animate";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

const VALID_LP_SLUGS = new Set(["kitchen", "wardrobe", "fit-out", "landing"]);

const LP_META: Record<string, { title: string; description: string }> = {
  kitchen: {
    title: "Bespoke Kitchen Design in Dubai | T1 Studio",
    description: "Transform your kitchen with T1 Studio's award-winning bespoke kitchen design and installation service in Dubai.",
  },
  wardrobe: {
    title: "Custom Wardrobe Design in Dubai | T1 Studio",
    description: "Discover made-to-measure wardrobe solutions crafted by T1 Studio's expert designers in Dubai.",
  },
  "fit-out": {
    title: "Interior Fit-Out Services in Dubai | T1 Studio",
    description: "Full-service interior fit-out for residential and commercial spaces across Dubai by T1 Studio.",
  },
  landing: {
    title: "Luxury Interior Design in Dubai | T1 Studio",
    description: "T1 Studio creates exceptional living spaces across Dubai. Book a free consultation today.",
  },
};

interface Props {
  params: Promise<{ slug: string; locale: string }>;
}

export const revalidate = 3600;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const meta = LP_META[slug];
  if (!meta) return {};
  return {
    title: meta.title,
    description: meta.description,
    robots: { index: false, follow: false },
  };
}

export default async function LandingPage({ params }: Props) {
  const { slug, locale } = await params;

  if (!VALID_LP_SLUGS.has(slug)) notFound();
  const [
    tHero,
    tStory,
    tprojects,
    tTimeline,
    tServices,
    tTestimonials,
    tFaq,
    tDreamSpace,
  ] = await Promise.all([
    getTranslations({ locale, namespace: "Hero" }),
    getTranslations({ locale, namespace: "AboutStory" }),
    getTranslations({ locale, namespace: "SignatureProject" }),
    getTranslations({ locale, namespace: "MilestoneTimeline" }),
    getTranslations({ locale, namespace: "Services" }),
    getTranslations({ locale, namespace: "Testimonials" }),
    getTranslations({ locale, namespace: "Faq" }),
    getTranslations({ locale, namespace: "DreamSpace" }),
  ]);

  const signatureProjects = getSignatureProjects(tprojects);
  const milestones = tTimeline.raw("items");
  const serviceItems = getServiceItems(tServices);
  const faqConfig = getFaqConfig(tFaq);
    const dreamSpaceConfig = getDreamSpaceConfig(tDreamSpace);
  return (
    <main>
      <LpHeroBanner
        description={tHero("description")}
        heading={tHero("heading")}
        image={{ src: '/assets/images/Banner.webp', alt: 'Luxury kitchen interior' }}
        formHeading="Contact Us"
        namePlaceholder="Name"
        emailPlaceholder="Email"
        countryCode="+971"
        phonePlaceholder="Phone"
        propertyTypeLabel="Property Type"
        propertyTypeOptions={[
          { value: 'villa', label: 'Villa' },
          { value: 'apartment', label: 'Apartment' },
          { value: 'penthouse', label: 'Penthouse' },
          { value: 'townhouse', label: 'Townhouse' },
        ]}
        spacesRequiredLabel="Spaces Required"
        spacesRequiredOptions={[
          { value: 'kitchen', label: 'Kitchen' },
          { value: 'wardrobe', label: 'Wardrobe' },
          { value: 'both', label: 'Kitchen & Wardrobe' },
          { value: 'full-home', label: 'Full Home' },
        ]}
        budgetBandLabel="Budget Band"
        budgetBandOptions={[
          { value: '50k-100k', label: 'AED 50K – 100K' },
          { value: '100k-250k', label: 'AED 100K – 250K' },
          { value: '250k-500k', label: 'AED 250K – 500K' },
          { value: '500k+', label: 'AED 500K+' },
        ]}
        submitLabel="Submit"
      />
      <FadeUp>
        <StatsBarServer namespace="Stats" />
      </FadeUp>
      <AboutStorySection
        label={tStory("label")}
        heading={tStory("heading")}
        description={tStory("description")}
        image={{
          src: "/assets/images/Banner.webp",
          alt: tStory("imageAlt"),
        }}
      />
      <SignatureProjectsSection
        heading={tprojects("heading")}
        viewAllLabel={tprojects("viewAllLabel")}
        viewAllHref="/projects"
        projects={signatureProjects}
      />
      <MilestoneTimelineSection
        heading={tTimeline("heading")}
        milestones={milestones}
      />
      <ServicesSection
        label={tServices("label")}
        heading={tServices("heading")}
        services={serviceItems}
      />
      <ClientTestimonialSection
        label={tTestimonials("label")}
        heading={tTestimonials("heading")}
        variant="card"
        testimonials={[
          {
            quote: tTestimonials("t1Quote"),
            author: tTestimonials("t1Name"),
            authorRole: tTestimonials("t1Role"),
            badge: tTestimonials("t1Badge"),
            readTime: tTestimonials("t1ReadTime"),
            image: {
              src: "/assets/images/Banner.webp",
              alt: tTestimonials("t1Name"),
            },
            avatar: {
              src: "/assets/images/Banner.webp",
              alt: tTestimonials("t1Name"),
            },
          },
          {
            quote: tTestimonials("t2Quote"),
            author: tTestimonials("t2Name"),
            authorRole: tTestimonials("t2Role"),
            badge: tTestimonials("t1Badge"),
            readTime: tTestimonials("t1ReadTime"),
            image: {
              src: "/assets/images/growth.webp",
              alt: tTestimonials("t2Name"),
            },
            avatar: {
              src: "/assets/images/Banner.webp",
              alt: tTestimonials("t2Name"),
            },
          },
          {
            quote: tTestimonials("t3Quote"),
            author: tTestimonials("t3Name"),
            authorRole: tTestimonials("t3Role"),
            badge: tTestimonials("t1Badge"),
            readTime: tTestimonials("t1ReadTime"),
            image: {
              src: "/assets/images/why-t1.webp",
              alt: tTestimonials("t3Name"),
            },
            avatar: {
              src: "/assets/images/Banner.webp",
              alt: tTestimonials("t3Name"),
            },
          },
        ]}
      />
      <FaqSection {...faqConfig} />
      <DreamSpaceSection
        {...dreamSpaceConfig}
        heading={tDreamSpace("heading")}
        imageAlt={tDreamSpace("imageAlt")}
        propertyTypeLabel={tDreamSpace("propertyTypeLabel")}
        spaceRequiredLabel={tDreamSpace("spaceRequiredLabel")}
        typeOfServiceLabel={tDreamSpace("typeOfServiceLabel")}
        timelineLabel={tDreamSpace("timelineLabel")}
        firstNameLabel={tDreamSpace("firstNameLabel")}
        lastNameLabel={tDreamSpace("lastNameLabel")}
        emailLabel={tDreamSpace("emailLabel")}
        phoneLabel={tDreamSpace("phoneLabel")}
        submitLabel={tDreamSpace("submitLabel")}
        developerDropdown1Label={tDreamSpace("developerProjectScaleLabel")}
        developerDropdown2Label={tDreamSpace("developerProjectTypeLabel")}
        developerDropdown3Label={tDreamSpace("developerServiceLabel")}
        companyNameLabel={tDreamSpace("companyNameLabel")}
        messageLabel={tDreamSpace("messageLabel")}
        consentText={tDreamSpace("consentText")}
        privacyPolicyLabel={tDreamSpace("privacyPolicyLabel")}
        privacyPolicyHref={tDreamSpace("privacyPolicyHref")}
        consentRequired={tDreamSpace("consentRequired")}
      />
    </main>
  );
}
