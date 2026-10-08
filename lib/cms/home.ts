import { cache } from "react";
import { cmsGet } from "./client";
import type { CmsHomePage } from "./types";

export const getHomePageCms = cache(async (locale: string): Promise<CmsHomePage | null> => {
  return cmsGet<CmsHomePage>(
    "/home-page",
    { slug: "home", lang: locale },
    { tags: [`home-page-${locale}`] },
  );
});
