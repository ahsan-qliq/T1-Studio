import { cmsGet } from "./client";
import type { CmsWhyT1Page } from "./types";

export async function getWhyT1PageCms(locale: string): Promise<CmsWhyT1Page | null> {
  return cmsGet<CmsWhyT1Page>(
    "/why-t1-page",
    { slug: "why-t1", lang: locale },
    { tags: [`why-t1-page-${locale}`] },
  );
}
