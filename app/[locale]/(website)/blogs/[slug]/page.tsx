import { getBlogDetailCms } from "@/lib/cms/blog-detail";
import { getTranslations } from "next-intl/server";
import { getDreamSpaceConfig } from "@/app/config/home.config";
import { BlogDetailHeroSection } from "@/components/sections/BlogDetailHeroSection";
import { BlogDetailArticleLayout } from "@/components/sections/BlogDetailArticleLayout";
import { BlogSection } from "@/components/sections/BlogSection";
import { DreamSpaceSection } from "@/components/sections/DreamSpaceSection";

export const revalidate = 3600;

export default async function BlogsDetailsPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const [cms, tDreamSpace, tBlog] = await Promise.all([
    getBlogDetailCms(slug, locale),
    getTranslations({ locale, namespace: "DreamSpace" }),
    getTranslations({ locale, namespace: "Blog" }),
  ]);
  const s = cms?.sections;
  const dreamSpaceConfig = getDreamSpaceConfig(tDreamSpace);

  const blocks = s?.contentBlocks?.isVisible
    ? s.contentBlocks.blocks.map((block, i) => ({
        id: `section-${i}`,
        label: block.label,
        body: block.body,
        image: block.image?.url
          ? { src: block.image.url, alt: block.image.alt as string }
          : undefined,
        bodyAfter: block.bodyAfter || undefined,
      }))
    : [];

  const relatedPosts = s?.signatureProjects?.isVisible
    ? s.signatureProjects.articles
        .filter((a) => a.isVisible)
        .map((a) => ({
          slug: a._id,
          tag: (a.location as string) || tBlog("tag"),
          readTime: "",
          title: a.title as string,
          href: a.href || "#",
          image: a.image?.url
            ? { src: a.image.url, alt: a.image.alt as string }
            : undefined,
        }))
    : [];

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Insights", href: "/blogs" },
    ...(s?.hero?.eyebrow ? [{ label: s.hero.eyebrow as string }] : []),
    ...(s?.hero?.heading
      ? [
          {
            label:
              (s.hero.heading as string).length > 40
                ? (s.hero.heading as string).slice(0, 40) + "..."
                : (s.hero.heading as string),
          },
        ]
      : []),
  ];

  return (
    <main>
      {s?.hero?.isVisible && (
        <BlogDetailHeroSection
          category={s.hero.eyebrow as string}
          title={s.hero.heading as string}
          excerpt={s.hero.description as string}
          publishedAt={cms?.publishedAt}
          updatedAt={cms?.updatedAt}
          authorName={s.author?.name}
          authorRole={s.author?.role}
          authorImage={
            s.author?.image?.url
              ? { src: s.author.image.url, alt: s.author.image.alt as string }
              : undefined
          }
          heroImage={
            s.hero.backgroundImage?.url
              ? {
                  src: s.hero.backgroundImage.url,
                  alt: s.hero.backgroundImage.alt as string,
                }
              : undefined
          }
          breadcrumbs={breadcrumbs}
        />
      )}

      {blocks.length > 0 && (
        <BlogDetailArticleLayout
          blocks={blocks}
          authorQuote={s?.author?.isVisible ? s.author.quote : undefined}
          authorName={s?.author?.name}
          authorRole={s?.author?.role}
          authorExperience={s?.author?.experience}
          authorImage={
            s?.author?.image?.url
              ? { src: s.author.image.url, alt: s.author.image.alt as string }
              : undefined
          }
          sidebarImage={
            s?.hero?.backgroundImage?.url
              ? {
                  src: s.hero.backgroundImage.url,
                  alt: s.hero.backgroundImage.alt as string,
                }
              : undefined
          }
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

      {relatedPosts.length > 0 && (
        <BlogSection
          label=""
          heading={
            (s?.signatureProjects?.heading as string) ||
            tBlog("relatedHeading") ||
            "Related Articles"
          }
          posts={relatedPosts}
          viewAllLabel={tBlog("viewAllLabel")}
          viewAllHref="/blogs"
          learnMoreLabel={tBlog("learnMoreLabel")}
        />
      )}
    </main>
  );
}
