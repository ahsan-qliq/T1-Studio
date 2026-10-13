import { cache } from "react";
import { cmsGet } from "./client";
import type { CmsCookiePolicyPage } from "./types";

export const getCookiePolicyCms = cache(async (locale: string): Promise<CmsCookiePolicyPage | null> => {
  return cmsGet<CmsCookiePolicyPage>(
    "/cookie-policy-page",
    { slug: "cookie-policy", lang: locale },
    { tags: [`cookie-policy-page-${locale}`] },
  );
});
