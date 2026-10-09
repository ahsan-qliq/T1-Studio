import type {
  CmsFeaturedSpacesSectionT,
  CmsGallerySectionT,
  CmsSignatureProjectsSectionT,
} from "@/lib/cms/types";

export const PROJECT_SIZES = [
  { width: 700, height: 500 },
  { width: 280, height: 180 },
  { width: 560, height: 480 },
];

export const mapSpacesFeaturedSpaces = (section: CmsFeaturedSpacesSectionT) =>
  section.spaces
    .filter((sp) => sp.isVisible)
    .map((sp) => ({
      id: sp._id,
      title: sp.title as string,
      href: sp.href,
      image: { src: sp.image.url, alt: sp.image.alt as string },
    }));

export const mapSpacesShowcase = (section: CmsGallerySectionT) =>
  section.gallery.map((img) => ({
    src: img.image.url,
    alt: img.image.alt as string,
  }));

export const mapSpacesSignatureProjects = (section: CmsSignatureProjectsSectionT) =>
  section.projects
    .filter((pr) => pr.isVisible)
    .map((pr, i) => ({
      id: pr._id,
      title: pr.title as string,
      location: pr.location as string,
      href: pr.href,
      image: {
        src: pr.image.url,
        alt: pr.image.alt as string,
        ...(PROJECT_SIZES[i] ?? { width: 700, height: 500 }),
      },
    }));
