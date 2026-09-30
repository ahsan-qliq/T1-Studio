import { cmsGet } from "./client";
import type { CmsSpacesPage } from "./types";

export async function getSpacesPageCms(
  locale: string,
): Promise<CmsSpacesPage | null> {
  return cmsGet<CmsSpacesPage>(
    "/spaces-page",
    {
      slug: "spaces",
      lang: locale,
    },
    {
      tags: [`spaces-page-${locale}`],
    },
  );
}