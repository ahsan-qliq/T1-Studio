

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

function escapeXml(value: string) {
  return value.replace(/[<>&'\"]/g, (character) => {
    const entities: Record<string, string> = {
      "<": "&lt;",
      ">": "&gt;",
      "&": "&amp;",
      "'": "&apos;",
      '"': "&quot;",
    };
    return entities[character];
  });
}

export function GET(request: Request) {
  const urls = ROUTES.map((route) => {
    const path = `/ar${route}` || "/ar";
    const location = new URL(path, request.url).toString();
    return `  <url><loc>${escapeXml(location)}</loc></url>`;
  }).join("\n");

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`,
    { headers: { "Content-Type": "application/xml; charset=utf-8" } },
  );
}
