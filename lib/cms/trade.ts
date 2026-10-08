import { cache } from "react";
import { cmsGet } from "./client";
import type { CmsTradePage } from "./types";

export const getTradePageCms = cache(async (locale: string): Promise<CmsTradePage | null> => {
  return cmsGet<CmsTradePage>(
    "/trade-page",
    { slug: "trade", lang: locale },
    { tags: [`trade-page-${locale}`] },
  );
});
