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
import { StatsBar } from "@/components/sections/StatsBar";
import { FadeUp } from "@/components/ui/animate";
import { getTranslations } from "next-intl/server";

interface Props {
  params: Promise<{ slug: string; locale: string }>;
}

export default async function LandingPage({ params }: Props) {
  await params;
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
    getTranslations("Hero"),
    getTranslations("AboutStory"),
    getTranslations("SignatureProject"),
    getTranslations("MilestoneTimeline"),
    getTranslations("Services"),
    getTranslations("Testimonials"),
    getTranslations("Faq"),
    getTranslations("DreamSpace"),
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
        <StatsBar namespace="Stats" />
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
        heading={tDreamSpace("heading")}
        imageSrc={dreamSpaceConfig.imageSrc}
        imageAlt={tDreamSpace("imageAlt")}
        audienceTabs={dreamSpaceConfig.audienceTabs}
        propertyTypeLabel={tDreamSpace("propertyTypeLabel")}
        propertyTypeOptions={dreamSpaceConfig.propertyTypeOptions}
        spaceRequiredLabel={tDreamSpace("spaceRequiredLabel")}
        spaceRequiredOptions={dreamSpaceConfig.spaceRequiredOptions}
        typeOfServiceLabel={tDreamSpace("typeOfServiceLabel")}
        typeOfServiceOptions={dreamSpaceConfig.typeOfServiceOptions}
        timelineLabel={tDreamSpace("timelineLabel")}
        timelineOptions={dreamSpaceConfig.timelineOptions}
        firstNameLabel={tDreamSpace("firstNameLabel")}
        lastNameLabel={tDreamSpace("lastNameLabel")}
        emailLabel={tDreamSpace("emailLabel")}
        phoneLabel={tDreamSpace("phoneLabel")}
        submitLabel={tDreamSpace("submitLabel")}
      />
    </main>
  );
}
