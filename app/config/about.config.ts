import type { MilestoneIconName } from "@/components/sections/MilestoneTimelineSection";
import type { CmsMilestoneItem } from "@/lib/cms/types";

const VALID_MILESTONE_ICONS = new Set(["Globe", "Lightbulb", "BarChart2", "BookMarked"]);

export const mapMilestones = (items: CmsMilestoneItem[]) =>
  items.map((m) => ({
    iconName: (VALID_MILESTONE_ICONS.has(m.iconName)
      ? m.iconName
      : "Globe") as MilestoneIconName,
    year: m.year,
    description: m.description,
  }));
