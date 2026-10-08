import { cache } from "react";
import { cmsGet } from "./client";
import type { CmsInspirationPage } from "./types";

export const getInspirationPageCms = cache(async (locale: string): Promise<CmsInspirationPage | null> => {
  return cmsGet<CmsInspirationPage>(
    "/inspiration-page",
    { slug: "inspiration", lang: locale },
    { tags: [`inspiration-page-${locale}`] },
  );
});
