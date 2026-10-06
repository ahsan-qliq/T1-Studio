



import { getProjectsPageCms } from "@/lib/cms/projects";

function toEntry(path: string, locale: string, origin: string, lastmod?: string) {
  const loc = `${origin}/${locale}${path}`;
  const escapedLoc = loc.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const lastmodTag = lastmod ? `<lastmod>${lastmod}</lastmod>` : "";
  return `<url><loc>${escapedLoc}</loc>${lastmodTag}</url>`;
}

function urlset(entries: string[]) {
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${entries.join("")}</urlset>`,
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
];

export async function GET(request: Request) {
  const cms = await getProjectsPageCms("en");
  const pageLastmod = cms?.updatedAt?.slice(0, 10);
  const origin = new URL(request.url).origin;

  const dynamicEntries = (cms?.sections.projects.projects ?? [])
    .filter((p) => p.isVisible && p.slug)
    .map((p) => toEntry(`/projects/${p.slug}`, "ar", origin, pageLastmod));

  return urlset([
    ...STATIC_ROUTES.map((r) => toEntry(r, "ar", origin)),
    ...dynamicEntries,
  ]);
}
