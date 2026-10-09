import type { ArticleBlock } from "@/components/sections/BlogDetailContent";
import type { BlogPost } from "@/components/sections/BlogSection";
import type {
  CmsBlogsPageSections,
  CmsBlogDetailArticleBlock,
  CmsBlogDetailAuthor,
  CmsBlogDetailRelatedArticle,
  CmsBlogDetailRelatedArticlesSection,
} from "@/lib/cms/types";

// ─── Shared helpers ───────────────────────────────────────────────────────────

export function getText(
  value: { en?: string; ar?: string } | string | undefined | null,
  locale: string,
): string {
  if (!value) return "";
  if (typeof value === "string") return value;
  if (locale === "ar") return value.ar || value.en || "";
  return value.en || value.ar || "";
}

export function toBlogHref(raw: string | undefined | null): string | undefined {
  if (!raw) return undefined;
  const clean = raw.trim().replace(/\s+/g, "-");
  if (clean === "/" || clean === "/blogs" || clean.startsWith("/blogs/")) return clean;
  if (clean === "/blog") return "/blogs";
  if (clean.startsWith("/blog/")) return clean.replace(/^\/blog\//, "/blogs/");
  return clean;
}

// ─── Blogs list page ──────────────────────────────────────────────────────────

export const mapBlogPosts = (listing: CmsBlogsPageSections["blogListing"] | undefined) => {
  const allPosts = listing
    ? [
        ...(listing.featuredArticle?.isVisible !== false
          ? [listing.featuredArticle]
          : []),
        ...listing.articles.filter((a) => a.isVisible),
      ]
    : [];

  return allPosts.map((a) => ({
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
};

export const mapBlogFilterOptions = (listing: CmsBlogsPageSections["blogListing"] | undefined) =>
  (listing?.categories ?? [])
    .filter((c) => c.isVisible)
    .map((c) => ({ value: c.key, label: c.label }));

// ─── Blog detail page ─────────────────────────────────────────────────────────

export const mapArticleBlocks = (
  blocks: CmsBlogDetailArticleBlock[],
  locale: string,
): ArticleBlock[] => {
  const visible = blocks.filter((b) => b.isVisible !== false);
  return visible
    .filter((b, i) => {
      const next = visible[i + 1]?.type;
      if (b.type === "heading" && (next === "table" || next === "faq")) return false;
      return true;
    })
    .map((b): ArticleBlock => {
      if (b.type === "list") {
        return {
          type: "list",
          id: b._id,
          heading: getText(b.heading, locale),
          items: (b.listItems ?? []).map((item) => getText(item, locale)),
        };
      }
      if (b.type === "table") {
        return {
          type: "table",
          id: b._id,
          heading: getText(b.heading, locale),
          headers: b.headers ?? [],
          rows: b.rows ?? [],
        };
      }
      if (b.type === "faq") {
        return {
          type: "faq",
          id: b._id,
          heading: getText(b.heading, locale),
          faqs: (b.faqItems ?? []).map((item) => ({
            question: getText(item.question, locale),
            answer: getText(item.answer, locale),
          })),
        };
      }
      return {
        type: "paragraph",
        id: b._id,
        heading: getText(b.heading, locale),
        body: getText(b.content, locale),
      };
    });
};

export const mapAuthorBio = (author: CmsBlogDetailAuthor, locale: string) => ({
  name: getText(author.name, locale),
  role: getText(author.designation, locale),
  experience: getText(author.bio, locale),
  image: {
    src: author.image?.url || "",
    alt: getText(author.image?.alt, locale),
  },
  linkedinUrl: author.linkedinUrl || undefined,
  websiteUrl: author.websiteUrl || undefined,
});

export const mapRelatedPosts = (
  articles: CmsBlogDetailRelatedArticle[],
  locale: string,
): BlogPost[] =>
  articles.map((a) => ({
    slug: a.slug,
    tag: a.category,
    readTime: getText(a.readTime, locale),
    title: getText(a.title, locale),
    href: `/blogs/${a.slug}`,
    image: {
      src: a.featuredImage?.url || "",
      alt: getText(a.featuredImage?.alt, locale),
    },
  }));

export const mapRelatedSection = (
  section: CmsBlogDetailRelatedArticlesSection,
  locale: string,
  fallbackHeading: string,
) => ({
  label: getText(section.eyebrow, locale) || "Blog",
  heading: getText(section.heading, locale) || fallbackHeading,
  viewAllLabel: getText(section.button?.label, locale) || "View all articles",
  viewAllHref: section.button?.href || "/blogs",
  posts: mapRelatedPosts(section.articles, locale),
});
