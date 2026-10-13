import { cache } from "react";
import { cmsGet } from "./client";
import type { CmsAccessibilityPage } from "./types";

export const getAccessibilityCms = cache(async (locale: string): Promise<CmsAccessibilityPage | null> => {
  return cmsGet<CmsAccessibilityPage>(
    "/accessibility-page",
    { slug: "accessibility", lang: locale },
    { tags: [`accessibility-page-${locale}`] },
  );
});
