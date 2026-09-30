import { cmsGet } from "./client";
import type { CmsBlogDetail } from "./types";

export async function getBlogDetailCms(slug: string, locale: string): Promise<CmsBlogDetail | null> {
  const data = await cmsGet<CmsBlogDetail | CmsBlogDetail[]>(
    "/blog-detail-page",
    { slug, lang: locale },
    { tags: [`blog-detail-${slug}-${locale}`, `blog-detail-${slug}`] },
  );

  if (!data) return null;
  return Array.isArray(data) ? data[0] ?? null : data;
}
