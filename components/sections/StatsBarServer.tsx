import { getTranslations } from "next-intl/server";
import { StatsBar } from "./StatsBar";

interface StatItem {
  value: string;
  label: string;
}

interface StatsBarServerProps {
  namespace?: string;
  items?: StatItem[];
  sectionLabel?: string;
}

export async function StatsBarServer({
  namespace,
  items,
  sectionLabel,
}: StatsBarServerProps) {
  /*
   * If items are passed from CMS/API,
   * use them directly.
   *
   * Otherwise keep the existing translation-based
   * behavior for all other pages.
   */
  if (items) {
    return <StatsBar items={items} sectionLabel={sectionLabel || ""} />;
  }

  if (!namespace) {
    return null;
  }

  const t = await getTranslations(namespace);

  const translatedItems = t.raw("items") as StatItem[];
  const translatedSectionLabel = t("sectionLabel");

  return (
    <StatsBar items={translatedItems} sectionLabel={translatedSectionLabel} />
  );
}
