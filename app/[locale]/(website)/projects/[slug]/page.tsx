import type { Metadata } from "next";
import { JsonLdSchema } from "@/components/JsonLdSchema";
import { BeforeAfterSection } from "@/components/sections/BeforeAfterSection";
import { DreamSpaceSection } from "@/components/sections/DreamSpaceSection";
import { HeroBanner } from "@/components/sections/HeroBanner";
import { ImageCarouselSection } from "@/components/sections/ImageCarouselSection";
import { MaterialInspirationSection } from "@/components/sections/MaterialInspirationSection";
import { ClientTestimonialSection } from "@/components/sections/ClientTestimonialSection";
import { SpaceIntroSection } from "@/components/sections/SpaceIntroSection";
import { StatsBarServer } from "@/components/sections/StatsBarServer";
import { SignatureProjectsSection } from "@/components/sections/SignatureProjectsSection";
import { FadeUp } from "@/components/ui/animate";
import { getDreamSpaceConfig } from "@/app/config/home.config";

import { getProjectDetailCms } from "@/lib/cms/project-detail-page";

import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

import type { CmsBilingualText, CmsProjectDetail } from "@/lib/cms/types";

function toProjectHref(raw: string) {
  const clean = raw.trim().replace(/\s+/g, "-");
  if (clean === "/" || clean === "/projects" || clean.startsWith("/projects/")) return clean;
  const slug = clean.replace(/^\//, "");
  return `/projects/${slug}`;
}

interface Props {
  params: Promise<{
    slug: string;
    locale: string;
  }>;
}

export const revalidate = 3600;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params;
  const cms = await getProjectDetailCms(slug, locale);
  const seo = cms?.seo;
  return {
    ...(seo?.metaTitle && { title: seo.metaTitle }),
    ...(seo?.metaDescription && { description: seo.metaDescription }),
    ...(seo?.canonicalUrl && { alternates: { canonical: seo.canonicalUrl } }),
    ...(seo?.ogImage?.url && {
      openGraph: { images: [{ url: seo.ogImage.url }] },
      twitter: { images: [seo.ogImage.url] },
    }),
    ...(seo?.noIndex || seo?.noFollow
      ? { robots: { index: !seo.noIndex, follow: !seo.noFollow } }
      : {}),
  };
}

/**
 * CMS can currently return plain strings:
 *
 *   "Client Brief"
 *
 * but can also return bilingual objects:
 *
 *   {
 *     en: "Client Brief",
 *     ar: "نبذة عن العميل"
 *   }
 *
 * This helper supports both.
 */
type CmsTextValue = CmsBilingualText | string | undefined | null;

function getText(value: CmsTextValue, locale: string): string {
  if (!value) {
    return "";
  }

  // Current API response format
  if (typeof value === "string") {
    return value;
  }

  // Future / bilingual CMS format
  if (locale === "ar") {
    return value.ar || value.en || "";
  }

  return value.en || value.ar || "";
}

/**
 * A missing isVisible property is treated as visible.
 */
function isVisible(
  section?: {
    isVisible?: boolean;
  } | null,
): boolean {
  return section?.isVisible !== false;
}

export default async function ProjectDetailsPage({ params }: Props) {
  const { slug, locale } = await params;

  /**
   * Fetch project from CMS:
   *
   * /project-detail-page?slug=...&lang=...
   */
  const project = await getProjectDetailCms(slug, locale);

  if (!project) {
    notFound();
  }

  const sections = project.sections;

  /*
   * ---------------------------------------------------------
   * TRANSLATIONS
   * ---------------------------------------------------------
   */

  const [tBeforeAfter, tCarousel, tTestimonials, tDreamSpace] =
    await Promise.all([
      getTranslations({
        locale,
        namespace: "BeforeAfter",
      }),

      getTranslations({
        locale,
        namespace: "SpacesCarousel",
      }),

      getTranslations({
        locale,
        namespace: "Testimonials",
      }),

      getTranslations({
        locale,
        namespace: "DreamSpace",
      }),
    ]);

  const dreamSpaceConfig = getDreamSpaceConfig(tDreamSpace);

  /*
   * ---------------------------------------------------------
   * SECTION REFERENCES
   * ---------------------------------------------------------
   */

  const hero = sections?.hero;
  const overview = sections?.overview;
  const beforeAfter = sections?.beforeAfter;
  const gallery = sections?.gallery;
  const materials = sections?.materials;
  const projectInfo = sections?.projectInfo;
  const testimonial = sections?.testimonial;
  const relatedProjects = sections?.relatedProjects;

  /*
   * ---------------------------------------------------------
   * GALLERY
   * ---------------------------------------------------------
   */

  const gallerySlides = (gallery?.images ?? [])
    .filter((item) => item?.isVisible !== false && Boolean(item?.image?.url))
    .map((item) => ({
      image: item.image.url,
      src: item.image.url,

      alt:
        getText(item.image.alt, locale) ||
        getText(item.title, locale) ||
        project.pageName ||
        getText(project.projectName, locale) ||
        "Project image",

      title: getText(item.title, locale),

      caption: getText(item.caption, locale),
    }));

  /*
   * ---------------------------------------------------------
   * MATERIALS
   * ---------------------------------------------------------
   */

  const materialItems = (materials?.materials ?? [])
    .filter((item) => item?.isVisible !== false && Boolean(item?.image?.url))
    .map((item) => ({
      src: item.image.url,

      alt:
        getText(item.image.alt, locale) ||
        getText(item.title, locale) ||
        project.pageName ||
        getText(project.projectName, locale) ||
        "Material",

      label: getText(item.title, locale),
    }));

  /*
   * ---------------------------------------------------------
   * BEFORE / AFTER
   * ---------------------------------------------------------
   *
   * API:
   *
   * beforeAfter.items[]
   *
   * We currently display the first visible item.
   */

  const beforeAfterItem =
    beforeAfter?.items?.find((item) => item?.isVisible !== false) ??
    beforeAfter?.items?.[0];

  /*
   * ---------------------------------------------------------
   * TESTIMONIALS
   * ---------------------------------------------------------
   */

  const testimonials = (testimonial?.testimonials ?? [])
    .filter(Boolean)
    .map((item) => ({
      quote: getText(item.quote, locale),

      author: getText(item.author, locale),

      authorRole: getText(item.authorRole, locale),

      badge: getText(item.badge, locale),

      readTime: getText(item.readTime, locale),

      image: {
        src: item.image?.url || "",
        alt: getText(item.image?.alt, locale) || getText(item.author, locale),
      },

      avatar: {
        src: item.avatar?.url || "",
        alt: getText(item.avatar?.alt, locale) || getText(item.author, locale),
      },
    }))
    .filter((item) => item.quote || item.author);

  /*
   * ---------------------------------------------------------
   * PAGE
   * ---------------------------------------------------------
   */

  return (
    <main>
      {/* =====================================================
          HERO
      ===================================================== */}
      {isVisible(hero) && (
        <HeroBanner
          badge={getText(hero.eyebrow, locale)}
          heading={getText(hero.heading, locale)}
          description={getText(hero.description, locale)}
          breadcrumbs={
            hero.breadcrumbs?.map((b) => ({
              label: getText(b.label, locale),
              href: b.href ? toProjectHref(b.href) : undefined,
            })) || []
          }
          imageSrc={hero.backgroundImage?.url || ""}
          // mobileImage={hero.mobileImage?.url || ""}
          // overlayOpacity={hero.overlayOpacity}
        />
      )}

      {/* =====================================================
          HERO STATS
      ===================================================== */}

      {isVisible(hero) && hero.stats?.length > 0 && (
        <FadeUp>
          <StatsBarServer
            items={hero.stats
              .filter((stat) => Boolean(stat?.value?.trim()))
              .map((stat) => ({
                value: stat.value,

                label: getText(stat.label, locale),
              }))}
            sectionLabel={
              locale === "ar" ? "إحصائيات المشروع" : "Project Statistics"
            }
          />
        </FadeUp>
      )}

      {/* =====================================================
          OVERVIEW / CLIENT BRIEF
      ===================================================== */}

      {isVisible(overview) && (
        <SpaceIntroSection
          label={getText(overview.eyebrow, locale)}
          heading={getText(overview.heading, locale)}
          description={getText(overview.description, locale)}
          challengeDescription={getText(overview.challenge, locale)}
          image={overview.image?.url || ""}
          imageAlt={
            getText(overview.image?.alt, locale) ||
            project.pageName ||
            getText(project.projectName, locale) ||
            "Project"
          }
          className={
            overview.imagePosition === "left" ? "order-1" : "order-2 lg:order-1"
          }
        />
      )}

      {/* =====================================================
          BEFORE / AFTER
      ===================================================== */}

      {isVisible(beforeAfter) &&
        beforeAfterItem &&
        beforeAfterItem.beforeImage?.url &&
        beforeAfterItem.afterImage?.url && (
          <BeforeAfterSection
            heading={
              getText(beforeAfter.heading, locale) || tBeforeAfter("heading")
            }
            beforeLabel={locale === "ar" ? "قبل" : tBeforeAfter("beforeLabel")}
            afterLabel={locale === "ar" ? "بعد" : tBeforeAfter("afterLabel")}
            handleLabel={tBeforeAfter("handleLabel")}
            beforeImage={{
              src: beforeAfterItem.beforeImage.url,

              alt:
                getText(beforeAfterItem.beforeImage.alt, locale) ||
                tBeforeAfter("beforeLabel"),
            }}
            afterImage={{
              src: beforeAfterItem.afterImage.url,

              alt:
                getText(beforeAfterItem.afterImage.alt, locale) ||
                tBeforeAfter("afterLabel"),
            }}
          />
        )}

      {/* =====================================================
          GALLERY
      ===================================================== */}

      {isVisible(gallery) && gallerySlides.length > 0 && (
        <ImageCarouselSection
          slides={gallerySlides}
          aria-label={
            getText(gallery.heading, locale) || tCarousel("ariaLabel")
          }
          prevLabel={tCarousel("prevLabel")}
          nextLabel={tCarousel("nextLabel")}
        />
      )}

      {/* =====================================================
          MATERIAL INSPIRATION
      ===================================================== */}

      {isVisible(materials) && materialItems.length > 0 && (
        <MaterialInspirationSection
          heading={getText(materials.heading, locale)}
          items={materialItems}
        />
      )}

      {/* =====================================================
          PROJECT INFO
      ===================================================== */}

      {/* {isVisible(projectInfo) &&
        (getText(projectInfo.eyebrow, locale) ||
          getText(projectInfo.heading, locale) ||
          getText(projectInfo.description, locale) ||
          projectInfo.details?.length > 0) && (
          <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 lg:py-24">

            {getText(projectInfo.eyebrow, locale) && (
              <p className="mb-3 text-sm uppercase tracking-[0.2em]">
                {getText(projectInfo.eyebrow, locale)}
              </p>
            )}

            {getText(projectInfo.heading, locale) && (
              <h2 className="mb-6 text-3xl font-semibold md:text-5xl">
                {getText(projectInfo.heading, locale)}
              </h2>
            )}

            {getText(projectInfo.description, locale) && (
              <p className="mb-10 max-w-3xl text-base leading-7 text-black/70">
                {getText(projectInfo.description, locale)}
              </p>
            )}


            {projectInfo.details?.length > 0 && (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {projectInfo.details.map((detail, index) => {
                  const label = getText(detail.label, locale);

                  const value = getText(detail.value, locale);

                  if (!label && !value) {
                    return null;
                  }

                  return (
                    <div
                      key={detail._id || index}
                      className="border border-black/10 p-5"
                    >
                      {label && (
                        <div className="mb-2 text-sm text-black/50">
                          {label}
                        </div>
                      )}

                      {value && (
                        <div className="text-lg font-medium">{value}</div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {projectInfo.button?.href &&
              getText(projectInfo.button.label, locale) && (
                <a
                  href={projectInfo.button.href}
                  target={
                    projectInfo.button.openInNewTab ? "_blank" : undefined
                  }
                  rel={
                    projectInfo.button.openInNewTab
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="mt-8 inline-flex border border-black px-6 py-3 text-sm transition hover:bg-black hover:text-white"
                >
                  {getText(projectInfo.button.label, locale)}
                </a>
              )}
          </section>
        )} */}

      {/* =====================================================
          TESTIMONIALS
      ===================================================== */}

      {isVisible(testimonial) && testimonials.length > 0 && (
        <ClientTestimonialSection
          label={getText(testimonial.eyebrow, locale) || tTestimonials("label")}
          heading={
            getText(testimonial.heading, locale) || tTestimonials("heading")
          }
          variant="card"
          testimonials={testimonials}
        />
      )}

      {/* =====================================================
          RELATED PROJECTS
      ===================================================== */}

      {isVisible(relatedProjects) && relatedProjects.projects?.length > 0 && (
        <SignatureProjectsSection
          heading={
            getText(relatedProjects.heading, locale) ||
            (locale === "ar" ? "مشاريع ذات صلة" : "Related Projects")
          }
          viewAllLabel={
            getText(relatedProjects.button?.label, locale) ||
            (locale === "ar" ? "عرض الكل" : "View all projects")
          }
          viewAllHref={relatedProjects.button?.href || "/projects"}
          projects={relatedProjects.projects
            .filter((item) => item.isVisible !== false)
            .map((item, i) => ({
              id: item._id || String(i),
              title: getText(item.title, locale),
              location:
                getText(item.location, locale) ||
                getText(item.description, locale),
              href:
                item.href ||
                (item.slug ? `/projects/${item.slug}` : "/projects"),
              image: {
                src: item.image?.url || "",
                alt:
                  getText(item.image?.alt, locale) ||
                  getText(item.title, locale),
                width: 4,
                height: 3,
              },
            }))}
        />
      )}

      {/* =====================================================
          CONSULTATION
      ===================================================== */}

      <DreamSpaceSection
        {...dreamSpaceConfig}
        heading={tDreamSpace("heading")}
        imageAlt={tDreamSpace("imageAlt")}
        propertyTypeLabel={tDreamSpace("propertyTypeLabel")}
        spaceRequiredLabel={tDreamSpace("spaceRequiredLabel")}
        typeOfServiceLabel={tDreamSpace("typeOfServiceLabel")}
        timelineLabel={tDreamSpace("timelineLabel")}
        firstNameLabel={tDreamSpace("firstNameLabel")}
        lastNameLabel={tDreamSpace("lastNameLabel")}
        emailLabel={tDreamSpace("emailLabel")}
        phoneLabel={tDreamSpace("phoneLabel")}
        submitLabel={tDreamSpace("submitLabel")}
        developerDropdown1Label={tDreamSpace("developerProjectScaleLabel")}
        developerDropdown2Label={tDreamSpace("developerProjectTypeLabel")}
        developerDropdown3Label={tDreamSpace("developerServiceLabel")}
        companyNameLabel={tDreamSpace("companyNameLabel")}
        messageLabel={tDreamSpace("messageLabel")}
        consentText={tDreamSpace("consentText")}
        privacyPolicyLabel={tDreamSpace("privacyPolicyLabel")}
        privacyPolicyHref={tDreamSpace("privacyPolicyHref")}
        consentRequired={tDreamSpace("consentRequired")}
      />
      <JsonLdSchema globalSeo={project?.globalSeo} pageSeo={project?.seo} />
    </main>
  );
}
