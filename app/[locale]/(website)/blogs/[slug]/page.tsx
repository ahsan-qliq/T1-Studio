import { HeroBanner } from "@/components/sections/HeroBanner";
import { getTranslations } from "next-intl/server";

import { getFaqConfig } from "@/app/config/space.config";
import { AllProjectsSection } from "@/components/sections/AllProjectsSection";
import {
  getProjectFilterOptions,
  getProjects,
} from "@/app/config/project.config";
import { ClientTestimonialSection } from "@/components/sections/ClientTestimonialSection";
import { ReferralPartnerSection } from "@/components/sections/ReferralPartnerSection";
import { FaqSection } from "@/components/sections/FaqSection";
import {
  getAccordionSpaces,
  getDreamSpaceConfig,
  getReferralPartnerConfig,
  getSignatureProjects,
} from "@/app/config/home.config";
import { SpacesAccordionSection } from "@/components/sections/SpacesAccordionSection";
import { DreamSpaceSection } from "@/components/sections/DreamSpaceSection";
import { SignatureProjectsSection } from "@/components/sections/SignatureProjectsSection";
import {
  BlogDetailContentSection,
  type BlogContentBlock,
} from "@/components/sections/BlogDetailContentSection";
import { BlogAuthorQuoteSection } from "@/components/sections/BlogAuthorQuoteSection";

export default async function BlogsDetailsPage() {
  const [tHero, tDreamSpace, tprojects, tBlogDetail] = await Promise.all([
    getTranslations("Hero"),
    getTranslations("DreamSpace"),
    getTranslations("SignatureProject"),
    getTranslations("BlogDetail"),
  ]);

  const dreamSpaceConfig = getDreamSpaceConfig(tDreamSpace);
  const signatureProjects = getSignatureProjects(tprojects);

  const blogContentBlocks: BlogContentBlock[] = [
    {
      label: tBlogDetail("block1Label"),
      body: tBlogDetail("block1Body"),
      image: {
        src: "/assets/images/Banner.webp",
        alt: tBlogDetail("block1ImageAlt"),
      },
      bodyAfter: tBlogDetail("block1BodyAfter"),
    },
    {
      label: tBlogDetail("block2Label"),
      body: tBlogDetail("block2Body"),
      image: {
        src: "/assets/images/Home.webp",
        alt: tBlogDetail("block2ImageAlt"),
      },
      bodyAfter: tBlogDetail("block2BodyAfter"),
    },
    {
      label: tBlogDetail("block3Label"),
      body: tBlogDetail("block3Body"),
      image: {
        src: "/assets/images/why-t1.webp",
        alt: tBlogDetail("block3ImageAlt"),
      },
      bodyAfter: tBlogDetail("block3BodyAfter"),
    },
  ];

  return (
    <main>
      <HeroBanner
        badge={tHero("badge")}
        heading={tHero("heading")}
        description={tHero("description")}
        cta={tHero("cta")}
      />
      <BlogDetailContentSection blocks={blogContentBlocks} />

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
      <SignatureProjectsSection
        heading={tprojects("heading")}
        viewAllLabel={tprojects("viewAllLabel")}
        viewAllHref="/projects"
        projects={signatureProjects}
      />
      <BlogAuthorQuoteSection
        quote={tBlogDetail("authorQuote")}
        authorName={tBlogDetail("authorName")}
        authorRole={tBlogDetail("authorRole")}
        authorExperience={tBlogDetail("authorExperience")}
        authorImage={{
          src: "/assets/images/Banner.webp",
          alt: tBlogDetail("authorImageAlt"),
        }}
      />
    </main>
  );
}
