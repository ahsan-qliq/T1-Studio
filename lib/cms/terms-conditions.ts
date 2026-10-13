import { cache } from "react";
import { cmsGet } from "./client";
import type { CmsPolicyPage } from "./types";

export const getTermsConditionsCms = cache(async (locale: string): Promise<CmsPolicyPage | null> => {
  return cmsGet<CmsPolicyPage>(
    "/terms-conditions-page",
    { slug: "terms-conditions", lang: locale },
    { tags: [`terms-conditions-page-${locale}`] },
  );
});
