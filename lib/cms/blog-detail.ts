import { cmsGet } from "./client";
import type { CmsBlogDetail } from "./types";

export async function getBlogDetailCms(slug: string, locale: string): Promise<CmsBlogDetail | null> {
  return cmsGet<CmsBlogDetail>(
    "/blog-detail",
    { slug, lang: locale },
    { tags: [`blog-detail-${slug}-${locale}`, `blog-detail-${slug}`] },
  );
}
