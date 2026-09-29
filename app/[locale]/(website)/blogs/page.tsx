import { getBlogsPageCms } from "@/lib/cms/blogs";
import { HeroBanner } from "@/components/sections/HeroBanner";
import { AllProjectsSection } from "@/components/sections/AllProjectsSection";
import { getTranslations } from "next-intl/server";

export const revalidate = 3600;

export default async function BlogsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const [cms, tBlog] = await Promise.all([
    getBlogsPageCms(locale),
    getTranslations({ locale, namespace: "Blog" }),
  ]);
  const s = cms?.sections;
  const listing = s?.blogListing;

  // Combine featuredArticle + articles into one ordered list
  const allArticles = listing
    ? [
        ...(listing.featuredArticle?.isVisible ? [listing.featuredArticle] : []),
        ...listing.articles.filter((a) => a.isVisible),
      ]
    : [];

  const projects = allArticles.map((article) => ({
    id: article._id,
    title: article.title,
    propertyType: article.category,
    completionYear: article.publishedDate
      ? new Date(article.publishedDate).getFullYear()
      : new Date().getFullYear(),
    location: article.author,
    description: article.excerpt,
    readTime: article.readTime || undefined,
    image: article.image?.url
      ? { src: article.image.url, alt: article.image.alt as string }
      : { src: "", alt: article.title },
    href: article.href || `/blogs/${article.blogSlug}`,
    locationKey: "",
    serviceKeys: [],
    styleKey: "",
    propertyTypeKey: article.categoryKey,
  }));

  const categoryOptions = (listing?.categories ?? [])
    .filter((c) => c.isVisible)
    .map((c) => ({ value: c.key, label: c.label }));

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

      {listing?.isVisible && projects.length > 0 && (
        <AllProjectsSection
          heading={listing.heading || tBlog("heading")}
          viewCaseStudyLabel={tBlog("readArticleLabel")}
          loadMoreLabel={(listing.loadMoreButton?.label as string) || tBlog("loadMoreLabel")}
          propertyTypeMeta={tBlog("categoryMeta")}
          completionYearMeta={tBlog("publishedMeta")}
          locationMeta={tBlog("authorMeta")}
          noResultsLabel={tBlog("noResultsLabel")}
          clearFiltersLabel={tBlog("clearFiltersLabel")}
          filterLabels={{
            locations: "",
            services: "",
            style: "",
            propertyType: tBlog("categoryFilterLabel"),
          }}
          filterOptions={{
            locations: [],
            services: [],
            styles: [],
            propertyTypes: categoryOptions,
          }}
          projects={projects}
        />
      )}
    </main>
  );
}
