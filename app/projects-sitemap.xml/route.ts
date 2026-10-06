



import { getProjectsPageCms } from "@/lib/cms/projects";

type SitemapEntry = { url: string; lastModified?: string | Date };

function urlset(entries: SitemapEntry[]) {
  const escapeXml = (value: string) =>
    value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const urls = entries
    .map(
      (entry) =>
        `<url><loc>${escapeXml(entry.url)}</loc>${entry.lastModified ? `<lastmod>${entry.lastModified instanceof Date ? entry.lastModified.toISOString() : escapeXml(entry.lastModified)}</lastmod>` : ""}</url>`,
    )
    .join("");

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`,
    { headers: { "Content-Type": "application/xml; charset=utf-8" } },
  );
}

const STATIC_ROUTES = [
  "/projects",
  "/projects/villas",
  "/projects/apartments",
  "/projects/commercial",
  "/projects/hospitality",
  "/projects/renovations",
  "/projects/signature-collection",
] as const;

export async function GET(request: Request) {
  const toEntry = (path: string, _locale: string, lastModified?: string): SitemapEntry => ({
    url: new URL(path, request.url).toString(),
    ...(lastModified ? { lastModified } : {}),
  });

  const cms = await getProjectsPageCms("en");
  const pageLastmod = cms?.updatedAt?.slice(0, 10);

  const dynamicEntries = (cms?.sections.projects.projects ?? [])
    .filter((p) => p.isVisible && p.slug)
    .map((p) => toEntry(`/projects/${p.slug!}`, "en", pageLastmod));

  return urlset([
    ...STATIC_ROUTES.map((r) => toEntry(r, "en")),
    ...dynamicEntries,
  ]);
}
