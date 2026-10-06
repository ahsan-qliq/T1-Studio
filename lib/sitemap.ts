export const BASE = "https://t1-studio.com";
export const STATIC_LASTMOD = "2026-10-05";

// ─── Internal ─────────────────────────────────────────────────────────────────

function xmlResponse(content: string): Response {
  return new Response(content, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}

// ─── Sitemap index ────────────────────────────────────────────────────────────

interface SitemapEntry {
  loc: string;
  lastmod?: string;
}

export function sitemapIndex(entries: SitemapEntry[]): Response {
  const items = entries
    .map(
      ({ loc, lastmod }) =>
        `  <sitemap>\n    <loc>${loc}</loc>${lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ""}\n  </sitemap>`,
    )
    .join("\n");

  return xmlResponse(
    `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${items}\n</sitemapindex>`,
  );
}

// ─── URL set ─────────────────────────────────────────────────────────────────

export interface UrlEntry {
  loc: string;
  lastmod: string;
  en: string;
  ar: string;
}

export function urlset(entries: UrlEntry[]): Response {
  const items = entries
    .map(
      ({ loc, lastmod, en, ar }) =>
        `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <xhtml:link rel="alternate" hreflang="x-default" href="${en}"/>\n    <xhtml:link rel="alternate" hreflang="en" href="${en}"/>\n    <xhtml:link rel="alternate" hreflang="ar" href="${ar}"/>\n  </url>`,
    )
    .join("\n");

  return xmlResponse(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${items}\n</urlset>`,
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function toEntry(
  route: string,
  locale: "en" | "ar",
  lastmod = STATIC_LASTMOD,
): UrlEntry {
  const en = `${BASE}${route || "/"}`;
  const ar = route === "" ? `${BASE}/ar` : `${BASE}/ar${route}`;
  return { loc: locale === "ar" ? ar : en, lastmod, en, ar };
}

export function staticUrlset(routes: string[], locale: "en" | "ar"): Response {
  return urlset(routes.map((r) => toEntry(r, locale)));
}
