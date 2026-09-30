import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { HeroBanner } from '@/components/sections/HeroBanner';
import {
  BlogDetailContent,
  type ArticleBlock,
} from '@/components/sections/BlogDetailContent';
import { BlogSection, type BlogPost } from '@/components/sections/BlogSection';
import { getBlogDetailCms } from '@/lib/cms/blog-detail';
import type { CmsBlogDetail } from '@/lib/cms/types';

interface Props {
  params: Promise<{ slug: string; locale: string }>;
}

function getText(value: { en?: string; ar?: string } | string | undefined | null, locale: string): string {
  if (!value) return '';
  if (typeof value === 'string') return value;
  if (locale === 'ar') return value.ar || value.en || '';
  return value.en || value.ar || '';
}

function mapBreadcrumbs(
  crumbs: CmsBlogDetail['sections']['hero']['breadcrumbs'],
  locale: string,
) {
  return crumbs.map((c) => ({ label: getText(c.label, locale), href: c.href }));
}

export default async function BlogsDetailsPage({ params }: Props) {
  const { slug, locale } = await params;


  const blog = await getBlogDetailCms(slug, locale);

  if (!blog) notFound();

  const tBlog = await getTranslations({ locale, namespace: 'BlogDetail' }).catch(() => null);
  const hero = blog.sections.hero;
  const articleContent = blog.sections.articleContent;
  const relatedArticles = blog.sections.relatedArticles;
  const authorInfo = blog.sections.authorInfo;

  const heroBadge = getText(hero.eyebrow, locale) || getText(blog.categoryLabel, locale) || blog.category;
  const heroHeading = getText(hero.title, locale) || getText(blog.title, locale);
  const heroDescription = getText(hero.excerpt, locale) || getText(blog.excerpt, locale);
  const heroImage = hero.backgroundImage?.url || blog.featuredImage?.url || '/assets/images/BlogBanner.jpg';
  const breadcrumbs =
    hero.breadcrumbs?.length > 0
      ? mapBreadcrumbs(hero.breadcrumbs, locale)
      : undefined;

  const blocks: ArticleBlock[] = articleContent.blocks
    .filter((b) => b.isVisible !== false)
    .map((b) => {
      if (b.type === 'heading' || b.type === 'paragraph') {
        return {
          type: 'paragraph' as const,
          id: b._id,
          heading: getText(b.heading, locale),
          body: getText(b.content, locale),
        };
      }
      if (b.type === 'list') {
        return {
          type: 'list' as const,
          id: b._id,
          heading: getText(b.heading, locale),
          items: (b.listItems ?? []).map((item) => getText(item, locale)),
        };
      }
      return {
        type: 'paragraph' as const,
        id: b._id,
        heading: getText(b.heading, locale),
        body: getText(b.content, locale),
      };
    });

  const authorBio = {
    name: getText(authorInfo.author.name, locale),
    role: getText(authorInfo.author.designation, locale),
    experience: getText(authorInfo.author.bio, locale),
    image: {
      src: authorInfo.author.image?.url || '',
      alt: getText(authorInfo.author.image?.alt, locale),
    },
  };

  const relatedPosts: BlogPost[] = relatedArticles.articles.map((a) => ({
    slug: a.slug,
    tag: a.category,
    readTime: getText(a.readTime, locale),
    title: getText(a.title, locale),
    href: `/blogs/${a.slug}`,
    image: {
      src: a.featuredImage?.url || '',
      alt: getText(a.featuredImage?.alt, locale),
    },
  }));

  const relatedHeading =
    getText(relatedArticles.heading, locale) ||
    tBlog?.('relatedHeading') ||
    'Related Articles';

  const viewAllLabel =
    getText(relatedArticles.button?.label, locale) || 'View all articles';
  const viewAllHref = relatedArticles.button?.href || '/blogs';

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
        <BlogDetailContent blocks={blocks} authorBio={authorBio} />
      )}

      {relatedArticles.isVisible && relatedPosts.length > 0 && (
        <BlogSection
          label={getText(relatedArticles.eyebrow, locale) || 'Blog'}
          heading={relatedHeading}
          posts={relatedPosts}
          viewAllLabel={viewAllLabel}
          viewAllHref={viewAllHref}
          learnMoreLabel="Read more"
        />
      )}
    </main>
  );
}
