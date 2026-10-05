

import { getBlogsPageCms } from "@/lib/cms/blogs";

const STATIC_LASTMOD = "2024-01-01";

function toEntry(path: string, _locale: string, lastmod: string, origin: string) {
  const loc = new URL(path, origin).toString();
  return `<url><loc>${loc}</loc><lastmod>${lastmod}</lastmod></url>`;
}

export async function GET(request: Request) {
  const cms = await getBlogsPageCms("en");
  const pageLastmod = cms?.updatedAt
    ? cms.updatedAt.slice(0, 10)
    : STATIC_LASTMOD;

  const listing = cms?.sections.blogListing;
  const all = [
    ...(listing?.articles ?? []),
    ...(listing?.featuredArticle ? [listing.featuredArticle] : []),
  ];

  const seen = new Set<string>();
  const entries = all
    .filter((a) => {
      if (!a.isVisible || !a.blogSlug || seen.has(a.blogSlug)) return false;
      seen.add(a.blogSlug);
      return true;
    })
    .map((a) => {
      const lastmod = a.publishedDate
        ? a.publishedDate.slice(0, 10)
        : pageLastmod;
      return toEntry(`/blog/${a.blogSlug}`, "en", lastmod, new URL(request.url).origin);
    });

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${entries.join("")}</urlset>`,
    { headers: { "Content-Type": "application/xml; charset=utf-8" } },
  );
}
