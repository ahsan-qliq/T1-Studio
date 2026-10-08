import { cache } from "react";
import { cmsGet } from "./client";
import type { CmsContactPage } from "./types";

export const getContactPageCms = cache(async (locale: string): Promise<CmsContactPage | null> => {
  return cmsGet<CmsContactPage>(
    "/contact-page",
    { slug: "contact", lang: locale },
    { tags: [`contact-page-${locale}`] },
  );
});
