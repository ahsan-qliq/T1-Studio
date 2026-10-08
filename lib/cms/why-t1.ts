import { cache } from "react";
import { cmsGet } from "./client";
import type { CmsWhyT1Page } from "./types";

export const getWhyT1PageCms = cache(async (locale: string): Promise<CmsWhyT1Page | null> => {
  return cmsGet<CmsWhyT1Page>(
    "/why-t1-page",
    { slug: "why-t1", lang: locale },
    { tags: [`why-t1-page-${locale}`] },
  );
});
