import { cache } from "react";
import { cmsGet } from "./client";
import type { CmsProjectDetail } from "./types";

export const getProjectDetailCms = cache(async (
  slug: string,
  locale: string,
): Promise<CmsProjectDetail | null> => {
  return cmsGet<CmsProjectDetail>(
    "/project-detail-page",
    { slug, lang: locale },
    { tags: [`project-detail-${slug}-${locale}`, `project-detail-${slug}`] },
  );
});
