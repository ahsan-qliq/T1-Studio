import { staticUrlset } from "@/lib/sitemap";

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

export function GET() {
  return staticUrlset(ROUTES, "en");
}
