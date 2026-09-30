import { cmsGet } from "./client";
import type { CmsInspirationPage } from "./types";

export async function getInspirationPageCms(locale: string): Promise<CmsInspirationPage | null> {
  return cmsGet<CmsInspirationPage>(
    "/inspiration-page",
    { slug: "inspiration", lang: locale },
    { tags: [`inspiration-page-${locale}`] },
  );
}
