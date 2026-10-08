import type { Metadata } from "next";
import { getBlogsPageCms } from "@/lib/cms/blogs";
import { JsonLdSchema } from "@/components/JsonLdSchema";
import { HeroBanner } from "@/components/sections/HeroBanner";
import { BlogsListingSection } from "@/components/sections/BlogsListingSection";
import { getTranslations } from "next-intl/server";

export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const cms = await getBlogsPageCms(locale);
  const seo = cms?.seo;
  return {
    ...(seo?.metaTitle && { title: seo.metaTitle }),
    ...(seo?.metaDescription && { description: seo.metaDescription }),
    alternates: { canonical: seo?.canonicalUrl ?? `${locale === "ar" ? "/ar" : ""}/blogs` },
    ...(seo?.ogImage?.url && {
      openGraph: { images: [{ url: seo.ogImage.url }] },
      twitter: { images: [seo.ogImage.url] },
    }),
  };
}

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

  const allPosts = listing
    ? [
        ...(listing.featuredArticle?.isVisible !== false
          ? [listing.featuredArticle]
          : []),
        ...listing.articles.filter((a) => a.isVisible),
      ]
    : [];

  const posts = allPosts.map((a) => ({
    id: a._id,
    slug: a.blogSlug,
    title: a.title,
    excerpt: a.excerpt,
    category: a.category,
    categoryKey: a.categoryKey,
    readTime: a.readTime || undefined,
    image: {
      src: a.image?.url || "",
      alt: (a.image?.alt as string) || a.title,
    },
    href: a.href || `/blogs/${a.blogSlug}`,
  }));

  const filterOptions = (listing?.categories ?? [])
    .filter((c) => c.isVisible)
    .map((c) => ({ value: c.key, label: c.label }));

  return (
    <main>
      {s?.hero?.isVisible && (
        <HeroBanner
          badge={s.hero.eyebrow as string}
          heading={s.hero.heading as string}
          description={s.hero.description as string}
          breadcrumbs={s.hero.breadcrumbs?.map((b) => ({
            label: b.label as string,
            href: b.href || undefined,
          })) || []}
          imageSrc={s.hero.backgroundImage.url || undefined}
        />
      )}

      {listing?.isVisible && posts.length > 0 && (
        <BlogsListingSection
          heading={listing.heading || "All Blogs"}
          readMoreLabel={tBlog("readArticleLabel")}
          loadMoreLabel={
            (listing.loadMoreButton?.label as string) || tBlog("loadMoreLabel")
          }
          noResultsLabel={tBlog("noResultsLabel")}
          clearFiltersLabel={tBlog("clearFiltersLabel")}
          enableCategoryFilter={listing.enableCategoryFilter}
          enableLoadMore={listing.enableLoadMore}
          initialDisplayCount={listing.initialDisplayCount}
          loadMoreCount={listing.loadMoreCount}
          filterOptions={filterOptions}
          posts={posts}
        />
      )}
      <JsonLdSchema globalSeo={cms?.globalSeo} pageSeo={cms?.seo} />
    </main>
  );
}
