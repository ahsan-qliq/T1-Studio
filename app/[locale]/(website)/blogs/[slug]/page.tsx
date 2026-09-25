import { getBlogDetailCms } from "@/lib/cms/blog-detail";
import { HeroBanner } from "@/components/sections/HeroBanner";
import { DreamSpaceSection } from "@/components/sections/DreamSpaceSection";
import { SignatureProjectsSection } from "@/components/sections/SignatureProjectsSection";
import { BlogDetailContentSection } from "@/components/sections/BlogDetailContentSection";
import { BlogAuthorQuoteSection } from "@/components/sections/BlogAuthorQuoteSection";

const PROJECT_SIZES = [
  { width: 700, height: 500 },
  { width: 280, height: 180 },
  { width: 560, height: 480 },
];

export const revalidate = 3600;

export default async function BlogsDetailsPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const cms = await getBlogDetailCms(slug, locale);
  const s = cms?.sections;

  const cta = s?.consultationCTA;
  const getField = (name: string) => cta?.fields.find((f) => f.name === name);
  const mapFieldOptions = (name: string) =>
    getField(name)?.options?.map((o) => ({ value: o.value, label: o.label as string })) ?? [];

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

      {s?.contentBlocks?.isVisible && (
        <BlogDetailContentSection
          blocks={s.contentBlocks.blocks.map((block) => ({
            label: block.label,
            body: block.body,
            image: { src: block.image.url, alt: block.image.alt as string },
            bodyAfter: block.bodyAfter,
          }))}
        />
      )}

      {cta?.isVisible && (
        <DreamSpaceSection
          heading={cta.heading as string}
          imageSrc={cta.image?.url || ""}
          imageAlt={cta.image?.alt as string}
          audienceTabs={cta.tabs.map((tab) => ({
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

      {s?.signatureProjects?.isVisible && (
        <SignatureProjectsSection
          heading={s.signatureProjects.heading as string}
          viewAllLabel={s.signatureProjects.button.label as string}
          viewAllHref="/projects"
          projects={s.signatureProjects.projects
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
            }))}
        />
      )}

      {s?.author?.isVisible && (
        <BlogAuthorQuoteSection
          quote={s.author.quote}
          authorName={s.author.name}
          authorRole={s.author.role}
          authorExperience={s.author.experience}
          authorImage={{
            src: s.author.image.url,
            alt: s.author.image.alt as string,
          }}
        />
      )}
    </main>
  );
}
