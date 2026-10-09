import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { JsonLdSchema } from "@/components/JsonLdSchema";
import { HeroBanner } from "@/components/sections/HeroBanner";
import { BlogDetailContent } from "@/components/sections/BlogDetailContent";
import { BlogSection } from "@/components/sections/BlogSection";
import { getBlogDetailCms } from "@/lib/cms/blog-detail";
import {
  getText,
  toBlogHref,
  mapArticleBlocks,
  mapAuthorBio,
  mapRelatedSection,
} from "@/app/config/blogs.config";

interface Props {
  params: Promise<{ slug: string; locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params;
  const cms = await getBlogDetailCms(slug, locale);
  const seo = cms?.seo;
  return {
    ...(seo?.metaTitle && { title: seo.metaTitle }),
    ...(seo?.metaDescription && { description: seo.metaDescription }),
    alternates: { canonical: seo?.canonicalUrl ?? `${locale === "ar" ? "/ar" : ""}/blogs/${slug}` },
    ...(seo?.ogImage?.url && {
      openGraph: { images: [{ url: seo.ogImage.url }] },
      twitter: { images: [seo.ogImage.url] },
    }),
    ...(seo?.noIndex || seo?.noFollow
      ? { robots: { index: !seo.noIndex, follow: !seo.noFollow } }
      : {}),
  };
}

export default async function BlogsDetailsPage({ params }: Props) {
  const { slug, locale } = await params;

  const [blog, tBlog] = await Promise.all([
    getBlogDetailCms(slug, locale),
    getTranslations({ locale, namespace: "BlogDetail" }).catch(() => null),
  ]);

  if (!blog) notFound();

  const hero = blog.sections.hero;
  const articleContent = blog.sections.articleContent;
  const relatedArticles = blog.sections.relatedArticles;
  const authorInfo = blog.sections.authorInfo;

  const heroBadge =
    getText(hero.eyebrow, locale) || getText(blog.categoryLabel, locale) || blog.category;
  const heroHeading = getText(hero.title, locale) || getText(blog.title, locale);
  const heroDescription = getText(hero.excerpt, locale) || getText(blog.excerpt, locale);
  const heroImage =
    hero.backgroundImage?.url || blog.featuredImage?.url || "/assets/images/BlogBanner.jpg";
  const breadcrumbs =
    hero.breadcrumbs?.length > 0
      ? hero.breadcrumbs.map((c) => ({ label: getText(c.label, locale), href: toBlogHref(c.href) }))
      : undefined;

  const blocks = mapArticleBlocks(articleContent.blocks, locale);
  const authorBio = mapAuthorBio(authorInfo.author, locale);
  const related = mapRelatedSection(
    relatedArticles,
    locale,
    tBlog?.("relatedHeading") || "Related Articles",
  );

  return (
    <main>
      <HeroBanner
        badge={heroBadge}
        heading={heroHeading}
        description={heroDescription}
        imageSrc={heroImage}
        breadcrumbs={breadcrumbs}
      />

      {articleContent.isVisible && (
        <BlogDetailContent blocks={blocks} authorBio={authorBio} title={heroHeading} />
      )}

      {relatedArticles.isVisible && related.posts.length > 0 && (
        <BlogSection
          label={related.label}
          heading={related.heading}
          posts={related.posts}
          viewAllLabel={related.viewAllLabel}
          viewAllHref={related.viewAllHref}
          learnMoreLabel="Read more"
        />
      )}
      <JsonLdSchema globalSeo={blog?.globalSeo} pageSeo={blog?.seo} />
    </main>
  );
}
