


function staticUrlset(routes: string[], locale: string, origin: string) {
  const urls = routes
    .map((route) => {
      const loc = new URL(route, origin).href;
      return `  <url>\n    <loc>${loc}</loc>\n    <xhtml:link rel="alternate" hreflang="${locale}" href="${loc}" />\n  </url>`;
    })
    .join("\n");

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls}\n</urlset>`,
    { headers: { "Content-Type": "application/xml; charset=utf-8" } },
  );
}

const ROUTES = [
  "",
  "/about",
  "/contact",
  "/why-t1",
  "/trade",
  "/trade/become-a-partner",
  "/trade/resources",
  "/design-studio",
  "/design-studio/3d-design",
  "/design-studio/material-library",
  "/privacy-policy",
  "/terms-and-conditions",
  "/cookie-policy",
  "/accessibility",
];

export function GET(request: Request) {
  return staticUrlset(ROUTES, "en", new URL(request.url).origin);
}
