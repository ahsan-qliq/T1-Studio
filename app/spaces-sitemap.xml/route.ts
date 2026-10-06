





import { SPACE_SLUGS } from "@/app/config/space.config";

const ROUTES = ["/spaces", ...SPACE_SLUGS.map((s) => `/spaces/${s}`)];

function staticUrlSet(routes: string[], language: string) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const urls = routes
    .map(
      (route) =>
        `<url><loc>${new URL(route, baseUrl).toString()}</loc>< hreflang="${language}" /></url>`,
    )
    .join("");

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`,
    { headers: { "Content-Type": "application/xml; charset=utf-8" } },
  );
}

export function GET() {
  return staticUrlSet(ROUTES, "en");
}
