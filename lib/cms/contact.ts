import { cmsGet } from "./client";
import type { CmsContactPage } from "./types";

export async function getContactPageCms(locale: string): Promise<CmsContactPage | null> {
  return cmsGet<CmsContactPage>(
    "/contact-page",
    { slug: "contact", lang: locale },
    { tags: [`contact-page-${locale}`] },
  );
}
