import { cache } from "react";
import { cmsGet } from "./client";
import type { CmsSpacesPage } from "./types";

export const getSpacesPageCms = cache(async (locale: string): Promise<CmsSpacesPage | null> => {
  return cmsGet<CmsSpacesPage>(
    "/spaces-page",
    { slug: "spaces", lang: locale },
    { tags: [`spaces-page-${locale}`] },
  );
});
