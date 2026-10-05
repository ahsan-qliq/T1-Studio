import { cmsGet } from "./client";
import type { CmsProjectsPage } from "./types";

export async function getProjectsPageCms(locale: string): Promise<CmsProjectsPage | null> {
  return cmsGet<CmsProjectsPage>(
    "/project-page",
    { slug: "projects", lang: locale },
    // { tags: [`projects-page-${locale}`] },
  );
}
