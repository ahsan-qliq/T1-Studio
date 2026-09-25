import { cmsGet } from "./client";
import type { CmsAboutPage } from "./types";

export async function getAboutPageCms(locale: string): Promise<CmsAboutPage | null> {
  return cmsGet<CmsAboutPage>(
    "/about-page",
    { slug: "about", lang: locale },
    { tags: [`about-page-${locale}`] },
  );
}
