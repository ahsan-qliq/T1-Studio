import type { CmsServicesSection } from "@/lib/cms/types";

export const mapContactServices = (section: CmsServicesSection) =>
  section.items
    .filter((svc) => svc.isVisible)
    .map((svc) => ({
      title: svc.title as string,
      subtitle: svc.value as string,
      href: svc.href || undefined,
    }));
