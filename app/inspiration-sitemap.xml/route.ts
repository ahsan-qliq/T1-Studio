const ROUTES = [
  "/inspiration",
  "/inspiration/kitchens",
  "/inspiration/bathrooms",
  "/inspiration/bedrooms",
  "/inspiration/living-spaces",
  "/inspiration/outdoor-living",
  "/inspiration/contemporary-luxury",
  "/inspiration/modern-minimalist",
  "/inspiration/organic-modern",
  "/inspiration/european-elegance",
  "/inspiration/coastal-living",
  "/inspiration/design-guides",
  "/inspiration/lookbooks",
  "/inspiration/planning-guides",
  "/inspiration/designer-picks",
  "/inspiration/before-and-after",
  "/inspiration/blog",
  "/inspiration/resources",
];

export function GET(request: Request) {
  const base = new URL(request.url).origin;
  const urls = ROUTES.map(
    (route) => `<url><loc>${base}${route}</loc></url>`,
  ).join("");

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`,
    { headers: { "Content-Type": "application/xml; charset=utf-8" } },
  );
}
