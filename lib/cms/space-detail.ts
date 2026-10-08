import { cache } from "react";
import { cmsGet } from "./client";
import type { CmsSpaceDetail } from "./types";

export const getSpaceDetailCms = cache(async (
  slug: string,
  locale: string,
): Promise<CmsSpaceDetail | null> => {
  return cmsGet<CmsSpaceDetail>(
    "/space-detail-page",
    { slug, lang: locale },
    { tags: [`space-detail-${slug}-${locale}`, `space-detail-${slug}`] },
  );
});
