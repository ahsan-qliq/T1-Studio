import {
  getAwardsConfig,
  getComparisonColumns,
  getJourneySteps,
  getReferralPartnerConfig,
  getServiceItems,
  getSignatureProjects,
} from "@/app/config/home.config";
import { ClientTestimonialSection } from "@/components/sections/ClientTestimonialSection";
import { ComparisonSection } from "@/components/sections/ComparisonSection";
import { HeroBanner } from "@/components/sections/HeroBanner";
import { ProjectJourneySection } from "@/components/sections/ProjectJourneySection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { StatsBar } from "@/components/sections/StatsBar";
import { FadeUp } from "@/components/ui/animate";
import { getTranslations } from "next-intl/server";
import { AwardsSection } from "@/components/sections/AwardsSection";
import { ReferralPartnerSection } from "@/components/sections/ReferralPartnerSection";
import { SignatureProjectsSection } from "@/components/sections/SignatureProjectsSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { getFaqConfig } from "@/app/config/space.config";
export default async function WhyT1Page() {
  const [
    tHeroInspiration,
    tComparison,
    tJourney,
    tServices,
    tTestimonials,
    tAwards,
    tReferral,
    tprojects,
    tFaq,
  ] = await Promise.all([
    getTranslations("HeroInspiration"),
    getTranslations("Comparison"),
    getTranslations("ProjectJourney"),
    getTranslations("Services"),
    getTranslations("Testimonials"),
    getTranslations("Awards"),
    getTranslations("ReferralPartner"),
    getTranslations("SignatureProject"),
    getTranslations("Faq"),
  ]);
  const comparisonColumns = getComparisonColumns(tComparison);
  const journeySteps = getJourneySteps(tJourney);
  const serviceItems = getServiceItems(tServices);
  const awardsConfig = getAwardsConfig(tAwards);
  const referralPartnerConfig = getReferralPartnerConfig(tReferral);
  const signatureProjects = getSignatureProjects(tprojects);
  const faqConfig = getFaqConfig(tFaq);
  return (
    <main>
      <HeroBanner
        badge={tHeroInspiration("badge")}
        heading={tHeroInspiration("heading")}
        description={tHeroInspiration("description")}
        cta={tHeroInspiration("cta")}
      />
      <FadeUp>
        <ComparisonSection
          heading={tComparison("heading")}
          columns={comparisonColumns}
        />
      </FadeUp>
      <FadeUp>
        <ProjectJourneySection
          label={tJourney("label")}
          heading={tJourney("heading")}
          advantageLabel={tJourney("advantageLabel")}
          prevLabel={tJourney("prevLabel")}
          nextLabel={tJourney("nextLabel")}
          steps={journeySteps}
        />
      </FadeUp>
      {/* Stats — scroll reveal */}
      <FadeUp>
        <StatsBar namespace="Stats" />
      </FadeUp>

      {/* Services — stagger animation handled internally */}
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
      <FadeUp>
        <AwardsSection {...awardsConfig} />
      </FadeUp>
      <ReferralPartnerSection {...referralPartnerConfig} />
      <FadeUp>
        <AwardsSection {...awardsConfig} className="order-1 lg:order-2" />
      </FadeUp>
      <SignatureProjectsSection
        heading={tprojects("heading")}
        viewAllLabel={tprojects("viewAllLabel")}
        viewAllHref="/projects"
        projects={signatureProjects}
      />
      <FaqSection {...faqConfig} />
    </main>
  );
}
