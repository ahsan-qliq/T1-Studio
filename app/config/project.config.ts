import type { ProjectItem } from "@/components/sections/AllProjectsSection";
import type { SelectOption } from "@/components/ui/select";

type Translator = (key: string) => string;

export const getProjectFilterOptions = (
  t: Translator,
): {
  locations: SelectOption[];
  services: SelectOption[];
  styles: SelectOption[];
  propertyTypes: SelectOption[];
} => ({
  locations: [
    { value: "emirates-hills", label: t("loc_emiratesHills") },
    { value: "palm-jumeirah", label: t("loc_palmJumeirah") },
    { value: "downtown", label: t("loc_downtown") },
    { value: "dubai-hills", label: t("loc_dubaiHills") },
    { value: "jumeirah-bay", label: t("loc_jumeirahBay") },
    { value: "business-bay", label: t("loc_businessBay") },
  ],
  services: [
    { value: "kitchen", label: t("svc_kitchen") },
    { value: "wardrobe", label: t("svc_wardrobe") },
    { value: "living-room", label: t("svc_livingRoom") },
    { value: "full-home", label: t("svc_fullHome") },
    { value: "commercial", label: t("svc_commercial") },
  ],
  styles: [
    { value: "modern", label: t("style_modern") },
    { value: "contemporary", label: t("style_contemporary") },
    { value: "classic", label: t("style_classic") },
    { value: "minimalist", label: t("style_minimalist") },
  ],
  propertyTypes: [
    { value: "villa", label: t("pt_villa") },
    { value: "apartment", label: t("pt_apartment") },
    { value: "penthouse", label: t("pt_penthouse") },
    { value: "commercial", label: t("pt_commercial") },
  ],
});

export const getProjects = (t: Translator): ProjectItem[] => [
  {
    id: "emirates-hills-villa",
    title: "Emirates Hills",
    propertyType: t("pt_villa"),
    completionYear: 2026,
    location: "Emirates Hills, Dubai",
    description:
      "Yorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus.",
    image: { src: "/assets/images/growth.webp", alt: "Emirates Hills villa interior" },
    href: "/projects/emirates-hills-villa",
    locationKey: "emirates-hills",
    serviceKeys: ["kitchen", "wardrobe", "living-room"],
    styleKey: "modern",
    propertyTypeKey: "villa",
  },
  {
    id: "palm-penthouse",
    title: "Palm Jumeirah Penthouse",
    propertyType: t("pt_penthouse"),
    completionYear: 2025,
    location: "Palm Jumeirah, Dubai",
    description:
      "A spectacular penthouse overlooking the Arabian Gulf, featuring bespoke joinery, a fully fitted kitchen in Calacatta marble, custom wardrobes and a panoramic living space designed to maximise every view.",
    image: { src: "/assets/images/Banner.webp", alt: "Palm Jumeirah penthouse interior" },
    href: "/projects/palm-jumeirah-penthouse",
    locationKey: "palm-jumeirah",
    serviceKeys: ["kitchen", "wardrobe", "living-room"],
    styleKey: "contemporary",
    propertyTypeKey: "penthouse",
  },
  {
    id: "downtown-residence",
    title: "Downtown Dubai Residence",
    propertyType: t("pt_apartment"),
    completionYear: 2025,
    location: "Downtown Dubai",
    description:
      "A sleek urban apartment transformed with floor-to-ceiling bespoke cabinetry, an integrated kitchen and a custom home-office unit — all crafted to deliver maximum functionality within a refined minimalist aesthetic.",
    image: { src: "/assets/images/why-t1.webp", alt: "Downtown Dubai residence interior" },
    href: "/projects/downtown-dubai-residence",
    locationKey: "downtown",
    serviceKeys: ["kitchen", "full-home"],
    styleKey: "minimalist",
    propertyTypeKey: "apartment",
  },
  {
    id: "dubai-hills-villa",
    title: "Dubai Hills Estate",
    propertyType: t("pt_villa"),
    completionYear: 2026,
    location: "Dubai Hills, Dubai",
    description:
      "A sprawling family villa with a full-home fit-out encompassing a chef's kitchen, six bespoke wardrobes, living and dining areas and an outdoor kitchen — delivered as a single, seamlessly coordinated project.",
    image: { src: "/assets/images/growth.webp", alt: "Dubai Hills villa interior" },
    href: "/projects/dubai-hills-estate",
    locationKey: "dubai-hills",
    serviceKeys: ["kitchen", "wardrobe", "living-room", "full-home"],
    styleKey: "classic",
    propertyTypeKey: "villa",
  },
];
