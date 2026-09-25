import { cmsGet } from "./client";
import type { CmsSpaceDetail } from "./types";

export async function getSpaceDetailCms(
  slug: string,
  locale: string,
): Promise<CmsSpaceDetail | null> {
  return cmsGet<CmsSpaceDetail>(
    "/space-detail-page",
    { slug, lang: locale },
    { tags: [`space-detail-${slug}-${locale}`, `space-detail-${slug}`] },
  );
}
