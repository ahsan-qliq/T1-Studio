import { cmsGet } from "./client";
import type { CmsGlobalSeo } from "./types";

export async function getGlobalSeo(locale: string): Promise<CmsGlobalSeo | null> {
  return cmsGet<CmsGlobalSeo>(
    "/global-seo",
    { lang: locale },
    { tags: [`global-seo-${locale}`] },
  );
}
