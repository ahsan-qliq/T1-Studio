import { getContactPageCms } from "@/lib/cms/contact";
import { HeroBanner } from "@/components/sections/HeroBanner";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { DreamSpaceSection } from "@/components/sections/DreamSpaceSection";
import { MapSection } from "@/components/sections/MapSection";
import { FaqSection } from "@/components/sections/FaqSection";

export const revalidate = 3600;

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const cms = await getContactPageCms(locale);
  const s = cms?.sections;

  const cta = (
    s as typeof s & {
      consultationCTA?: {
        fields: Array<{
          name: string;
          label?: unknown;
          options?: Array<{ value: string; label: unknown }>;
        }>;
        contactForm?: { isVisible?: boolean };
        heading?: unknown;
        image?: { url?: string; alt?: unknown };
        tabs: Array<{ value: string; label: unknown }>;
        submitButtonLabel?: unknown;
      };
    }
  )?.consultationCTA;
  const getField = (name: string) =>
    cta?.fields.find((f: { name: string }) => f.name === name);
  const mapFieldOptions = (name: string) =>
    getField(name)?.options?.map((o: { value: string; label: unknown }) => ({
      value: o.value,
      label: o.label as string,
    })) ?? [];
  return (
    <main>
      {s?.hero?.isVisible && (
        <HeroBanner
          badge={s.hero.eyebrow as string}
          heading={s.hero.heading as string}
          description={s.hero.description as string}
          cta={s.hero.primaryButton.label as string}
          imageSrc={s.hero.backgroundImage.url || undefined}
        />
      )}

      {s?.contactInfo?.isVisible && (
        <ServicesSection
          label={s.contactInfo.eyebrow as string}
          heading={s.contactInfo.heading as string}
          services={s.contactInfo.services
            .filter((svc) => svc.isVisible)
            .map((svc) => ({
              title: svc.title as string,
              subtitle: svc.description as string,
            }))}
        />
      )}

      {cta?.contactForm?.isVisible && (
        <DreamSpaceSection
          heading={cta.heading as string}
          imageSrc={cta.image?.url || ""}
          imageAlt={cta.image?.alt as string}
          audienceTabs={cta.tabs.map((tab: { value: string; label: unknown }) => ({
            id: tab.value,
            label: tab.label as string,
          }))}
          propertyTypeLabel={getField("propertyType")?.label as string ?? ""}
          propertyTypeOptions={mapFieldOptions("propertyType")}
          spaceRequiredLabel={getField("spaceRequired")?.label as string ?? ""}
          spaceRequiredOptions={mapFieldOptions("spaceRequired")}
          typeOfServiceLabel={getField("typeOfService")?.label as string ?? ""}
          typeOfServiceOptions={mapFieldOptions("typeOfService")}
          timelineLabel={getField("timeline")?.label as string ?? ""}
          timelineOptions={mapFieldOptions("timeline")}
          firstNameLabel={getField("firstName")?.label as string ?? ""}
          lastNameLabel={getField("lastName")?.label as string ?? ""}
          emailLabel={getField("email")?.label as string ?? ""}
          phoneLabel={getField("phone")?.label as string ?? ""}
          submitLabel={cta.submitButtonLabel as string}
        />
      )}

      {s?.location?.isVisible && s.location.embedUrl && (
        <MapSection
          embedUrl={s.location.embedUrl}
          title={s.location.title}
          height={s.location.height || 480}
        />
      )}

      {s?.faq?.isVisible && (
        <FaqSection
          label={s.faq.eyebrow as string}
          heading={s.faq.heading as string}
          items={s.faq.faqs
            .filter((f) => f.isVisible)
            .map((f) => ({
              question: f.question as string,
              answer: f.answer as string,
            }))}
        />
      )}
    </main>
  );
}
