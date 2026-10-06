import { SPACE_SLUGS } from "@/app/config/space.config";

const ROUTES = ["/spaces", ...SPACE_SLUGS.map((s) => `/spaces/${s}`)];

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
