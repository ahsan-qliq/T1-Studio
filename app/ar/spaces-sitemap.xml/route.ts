



import { SPACE_SLUGS } from "@/app/config/space.config";

const staticUrlSet = (routes: string[], locale: string) => {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const localePath = locale.startsWith("/") ? locale : `/${locale}`;

  const urls = routes
    .map((route) => {
      const pathname = route.startsWith("/") ? route : `/${route}`;
      const loc = new URL(`${localePath}${pathname}`, `${siteUrl}/`).toString();
      return `  <url><loc>${loc}</loc></url>`;
    })
    .join("\n");

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`,
    {
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
      },
    },
  );
};

const ROUTES = ["/spaces", ...SPACE_SLUGS.map((s) => `/spaces/${s}`)];

export function GET() {
  return staticUrlSet(ROUTES, "ar");
}
