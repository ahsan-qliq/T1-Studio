import { cache } from "react";
import { cmsGet } from "./client";
import type { CmsPolicyPage } from "./types";

export const getPrivacyPolicyCms = cache(async (locale: string): Promise<CmsPolicyPage | null> => {
  return cmsGet<CmsPolicyPage>(
    "/privacy-policy-page",
    { slug: "privacy-policy", lang: locale },
    { tags: [`privacy-policy-page-${locale}`] },
  );
});
