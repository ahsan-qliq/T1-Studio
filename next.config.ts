import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./app/i18n/request.ts');

const REDIRECTS: Array<{ source: string; destination: string }> = [
  { source: "/blog", destination: "/inspiration" },
  { source: "/smart-kitchen-in-dubai", destination: "/spaces/kitchens" },
  { source: "/getting-a-new-kitchen-in-dubai-uae", destination: "/spaces/kitchens" },
  { source: "/wardrobes-for-small-bedrooms", destination: "/spaces/wardrobes" },
  { source: "/dutch-kitchens-design-in-dubai", destination: "/spaces/kitchens" },
  { source: "/best-materials-for-kitchen-cabinets", destination: "/spaces/kitchens" },
  { source: "/luxury-kitchen-design-in-dubai", destination: "/spaces/kitchens" },
  { source: "/waterproof-kitchen-cabinets", destination: "/spaces/kitchens" },
  { source: "/dutch-kitchens-in-dubai", destination: "/spaces/kitchens" },
  { source: "/kitchen-showroom-near-jumeirah", destination: "/contact" },
  { source: "/how-many-types-of-hoods-are-there", destination: "/spaces/kitchens" },
  { source: "/what-are-the-best-sink-and-taps-brands-for-kitchen", destination: "/spaces/kitchens" },
  { source: "/marble-vs-porcelain-countertops-pros-and-cons", destination: "/spaces/kitchens" },
  { source: "/functional-kitchen-design", destination: "/spaces/kitchens" },
  { source: "/floating-shelves-for-kitchen", destination: "/spaces/kitchens" },
  { source: "/types-of-kitchen-layout", destination: "/spaces/kitchens" },
  { source: "/2023-complete-guide-to-modular-kitchens", destination: "/spaces/kitchens" },
  { source: "/black-and-white-kitchen-ideas", destination: "/spaces/kitchens" },
  { source: "/what-do-italian-kitchens-look-like", destination: "/spaces/kitchens" },
  { source: "/modern-kitchen-island", destination: "/spaces/kitchens" },
  { source: "/what-is-classical-kitchen-design", destination: "/spaces/kitchens" },
  { source: "/european-kitchen-cabinets", destination: "/spaces/kitchens" },
  { source: "/customize-closet-can-change-your-life", destination: "/spaces/wardrobes" },
  { source: "/top-bedroom-wardrobe-colours", destination: "/spaces/wardrobes" },
  { source: "/9-top-kitchen-trends-2023", destination: "/spaces/kitchens" },
  { source: "/best-efficient-walk-in-wardrobe-in-dubai-design", destination: "/spaces/wardrobes" },
  { source: "/4-things-to-know-about-european-kitchens", destination: "/spaces/kitchens" },
  { source: "/6-2023-wardrobe-colour-inspiration-for-your-bedroom", destination: "/spaces/wardrobes" },
  { source: "/modern-kitchen-cabinet-design", destination: "/spaces/kitchens" },
  { source: "/classic-kitchen-cabinet-design-dubai", destination: "/spaces/kitchens" },
  { source: "/country-kitchen-cabinet-design-dubai", destination: "/spaces/kitchens" },
  { source: "/industrial-kitchen-cabinet-design", destination: "/spaces/kitchens" },
  { source: "/modern-bedroom-lighting", destination: "/spaces/bedrooms" },
  { source: "/woodwork-in-kitchen-design", destination: "/spaces/bespoke-joinery" },
  { source: "/modern-kitchen-design", destination: "/spaces/kitchens" },
  { source: "/11-clever-storage-solutions-for-small-dubai-kitchens", destination: "/spaces/kitchens" },
  { source: "/wall-cabinets", destination: "/spaces/kitchens" },
  { source: "/modular-kitchen-shop-in-dubai", destination: "/spaces/kitchens" },
  { source: "/upgrade-to-stylish-new-kitchen-cabinets", destination: "/spaces/kitchens" },
  { source: "/fully-equipped-kitchen-for-rent-in-dubai", destination: "/spaces/kitchens" },
  { source: "/kitchen-renovation-in-dubai", destination: "/spaces/kitchens" },
  { source: "/kitchen-interior-design-in-dubai", destination: "/spaces/kitchens" },
  { source: "/buy-kitchen-cabinets", destination: "/spaces/kitchens" },
  { source: "/how-much-does-it-cost-to-remodel-a-kitchen", destination: "/spaces/kitchens" },
  { source: "/2024-kitchen-trends-in-dubai", destination: "/spaces/kitchens" },
  { source: "/10-best-kitchen-cabinet-designs-of-2023", destination: "/spaces/kitchens" },
  { source: "/perfect-kitchen-design-for-you", destination: "/spaces/kitchens" },
  { source: "/premium-kitchen-cabinets-in-dubai", destination: "/spaces/kitchens" },
  { source: "/why-premium-kitchen-cabinets-are-worth-the-investment", destination: "/spaces/kitchens" },
  { source: "/where-to-buy-kitchen-cabinets-in-dubai-top-pick-for-you", destination: "/spaces/kitchens" },
  { source: "/top-kitchen-cabinets-in-dubai-keller-kitchens", destination: "/spaces/kitchens" },
  { source: "/show-kitchen-for-rent-dubai", destination: "/spaces/kitchens" },
  { source: "/open-or-closed-kitchen-cabinets-in-dubai", destination: "/spaces/kitchens" },
  { source: "/nature-inspired-kitchen-design-in-dubai", destination: "/spaces/kitchens" },
  { source: "/minimalistic-kitchen-in-dubai", destination: "/spaces/kitchens" },
  { source: "/kitchen-renovation-checklist-in-dubai", destination: "/spaces/kitchens" },
  { source: "/kitchen-perfection-with-keller-kitchens-dubai", destination: "/spaces/kitchens" },
  { source: "/kitchen-makeover-in-dubai", destination: "/spaces/kitchens" },
  { source: "/kitchen-design-top-5-things-to-avoid", destination: "/spaces/kitchens" },
  { source: "/kitchen-cabinets-countertops-appliances-in-dubai", destination: "/spaces/kitchens" },
  { source: "/is-a-kitchen-designer-worth-it", destination: "/spaces/kitchens" },
  { source: "/how-to-choose-the-right-kitchen-in-dubai", destination: "/spaces/kitchens" },
  { source: "/how-to-buy-kitchen-cabinets-in-dubai", destination: "/spaces/kitchens" },
  { source: "/high-quality-kitchen-cabinets-3-top-things-to-know", destination: "/spaces/kitchens" },
  { source: "/five-key-elements-for-a-perfect-kitchen-design", destination: "/spaces/kitchens" },
  { source: "/enhancing-your-space-kitchen-seating-benefits", destination: "/spaces/kitchens" },
  { source: "/discovering-a-kitchen-showroom-near-me", destination: "/contact" },
  { source: "/designing-an-ideal-dubai-kitchen-top-5-key-elements", destination: "/spaces/kitchens" },
  { source: "/designing-a-functional-kitchen-layout-in-dubai", destination: "/spaces/kitchens" },
  { source: "/creating-a-family-oriented-kitchen", destination: "/spaces/kitchens" },
  { source: "/choosing-the-perfect-kitchen-countertop", destination: "/spaces/kitchens" },
  { source: "/buy-new-kitchen-cabinets-in-dubai", destination: "/spaces/kitchens" },
  { source: "/buy-kitchen-hoods-in-dubai", destination: "/spaces/kitchens" },
  { source: "/buy-handleless-kitchen-cabinets-in-dubai", destination: "/spaces/kitchens" },
  { source: "/best-kitchen-design-in-dubai-with-free-design", destination: "/spaces/kitchens" },
  { source: "/affordable-kitchen-design-and-cabinets", destination: "/spaces/kitchens" },
  { source: "/10-tips-for-transforming-your-kitchen-in-dubai", destination: "/spaces/kitchens" },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        // Public folder static assets — images, videos, fonts, icons
        // No content hash in filename so skip immutable; 30-day cache with
        // background revalidation keeps things fresh after deploys.
        source: "/assets/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=2592000, stale-while-revalidate=86400",
          },
        ],
      },
      {
        // Woff/woff2 fonts served from /public (if any)
        source: "/:path*.woff2",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/:path*.woff",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
  async redirects() {
    return REDIRECTS.map(({ source, destination }) => ({
      source,
      destination,
      permanent: true,
    }));
  },
  images: {
    minimumCacheTTL: 2592000, // 30 days — CDN/browser caches optimised images aggressively
    remotePatterns: [
      {
        protocol: "https",
        hostname: "d2ilpsdg8tcj25.cloudfront.net",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
