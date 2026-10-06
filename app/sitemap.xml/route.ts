const GROUPS = ["pages", "spaces", "projects", "inspiration", "blog"];

function sitemapIndex(entries: { loc: string }[]) {
  const body = entries
    .map(({ loc }) => `<sitemap><loc>${loc}</loc></sitemap>`)
    .join("");

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${body}</sitemapindex>`,
    { headers: { "Content-Type": "application/xml; charset=utf-8" } },
  );
}

export function GET(request: Request) {
  const BASE = new URL(request.url).origin;
  const entries = [
    ...GROUPS.map((g) => ({ loc: `${BASE}/${g}-sitemap.xml` })),
    ...GROUPS.map((g) => ({ loc: `${BASE}/ar/${g}-sitemap.xml` })),
  ];
  return sitemapIndex(entries);
}
