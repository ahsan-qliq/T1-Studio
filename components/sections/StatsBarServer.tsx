import { getTranslations } from "next-intl/server";
import { StatsBar } from "./StatsBar";

interface StatItem {
  value: string;
  label: string;
}

export async function StatsBarServer({ namespace }: { namespace: string }) {
  const t = await getTranslations(namespace);
  const items = t.raw("items") as StatItem[];
  const sectionLabel = t("sectionLabel");
  return <StatsBar items={items} sectionLabel={sectionLabel} />;
}
