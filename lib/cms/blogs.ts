import { cmsGet } from "./client";
import type { CmsBlogsPage } from "./types";

export async function getBlogsPageCms(locale: string): Promise<CmsBlogsPage | null> {
  return cmsGet<CmsBlogsPage>(
    "/blog-page",
    { slug: "blog", lang: locale },
    { tags: [`blogs-page-${locale}`] },
  );
}
