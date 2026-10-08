import { cache } from "react";
import { cmsGet } from "./client";
import type { CmsBlogsPage } from "./types";

export const getBlogsPageCms = cache(async (locale: string): Promise<CmsBlogsPage | null> => {
  return cmsGet<CmsBlogsPage>(
    "/blog-page",
    { slug: "blog", lang: locale },
    { tags: [`blogs-page-${locale}`] },
  );
});
