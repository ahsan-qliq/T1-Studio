


import { getBlogsPageCms } from "@/lib/cms/blogs";

const STATIC_LASTMOD = "2024-01-01";

type SitemapEntry = { url: string; lastModified?: string | Date };

function toEntry(path: string, locale: string, lastModified: string, origin: string): SitemapEntry {
  return {
    url: new URL(`/${locale}${path}`, origin).toString(),
    lastModified,
  };
}

function urlset(entries: SitemapEntry[]) {
  const escapeXml = (value: string) =>
    value
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&apos;");

  const urls = entries
    .map((entry) => {
      const { url, lastModified } = entry;
      return `<url><loc>${escapeXml(url)}</loc>${lastModified ? `<lastmod>${escapeXml(String(lastModified))}</lastmod>` : ""}</url>`;
    })
    .join("");

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`,
    { headers: { "Content-Type": "application/xml; charset=utf-8" } },
  );
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
      return toEntry(`/blogs/${a.blogSlug}`, "ar", lastmod, new URL(request.url).origin);
    });

  const origin = new URL(request.url).origin;
  return urlset([toEntry("/blogs", "ar", pageLastmod, origin), ...entries]);
}
