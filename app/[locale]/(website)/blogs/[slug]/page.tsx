import { getBlogDetailCms } from "@/lib/cms/blog-detail";
import { HeroBanner } from "@/components/sections/HeroBanner";
import { DreamSpaceSection } from "@/components/sections/DreamSpaceSection";
import { SignatureProjectsSection } from "@/components/sections/SignatureProjectsSection";
import { BlogDetailContentSection } from "@/components/sections/BlogDetailContentSection";
import { BlogAuthorQuoteSection } from "@/components/sections/BlogAuthorQuoteSection";
import { getTranslations } from "next-intl/server";
import { getDreamSpaceConfig } from "@/app/config/home.config";

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
  const [cms, tDreamSpace] = await Promise.all([
    getBlogDetailCms(slug, locale),
    getTranslations({ locale, namespace: "DreamSpace" }),
  ]);
  const s = cms?.sections;
  const dreamSpaceConfig = getDreamSpaceConfig(tDreamSpace);

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
      />

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
