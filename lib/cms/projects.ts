import { cache } from "react";
import { cmsGet } from "./client";
import type { CmsProjectsPage } from "./types";

export const getProjectsPageCms = cache(async (locale: string): Promise<CmsProjectsPage | null> => {
  return cmsGet<CmsProjectsPage>(
    "/project-page",
    { slug: "projects", lang: locale },
    { tags: [`projects-page-${locale}`] },
  );
});
