import { BeforeAfterSection } from "@/components/sections/BeforeAfterSection";
import { HeroBanner } from "@/components/sections/HeroBanner";
import { ImageCarouselSection } from "@/components/sections/ImageCarouselSection";
import { MaterialInspirationSection } from "@/components/sections/MaterialInspirationSection";
import { ClientTestimonialSection } from "@/components/sections/ClientTestimonialSection";
import { SpaceIntroSection } from "@/components/sections/SpaceIntroSection";
import { StatsBarServer } from "@/components/sections/StatsBarServer";
import { FadeUp } from "@/components/ui/animate";

import { getProjectDetailCms } from "@/lib/cms/project-detail-page";

import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

import type { CmsBilingualText, CmsProjectDetail } from "@/lib/cms/types";

interface Props {
  params: Promise<{
    slug: string;
    locale: string;
  }>;
}

export const revalidate = 3600;

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
  const project: CmsProjectDetail | null = await getProjectDetailCms(
    slug,
    locale,
  );

  if (!project) {
    notFound();
  }

  const sections = project.sections;

  /*
   * ---------------------------------------------------------
   * TRANSLATIONS
   * ---------------------------------------------------------
   */

  const [tBeforeAfter, tCarousel, tTestimonials] = await Promise.all([
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
  ]);

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
  const consultation = sections?.consultation;

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
        project.projectName ||
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
        project.projectName ||
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

      image: item.image?.url
        ? {
            src: item.image.url,
            alt:
              getText(item.image.alt, locale) || getText(item.author, locale),
          }
        : undefined,

      avatar: item.avatar?.url
        ? {
            src: item.avatar.url,
            alt:
              getText(item.avatar.alt, locale) || getText(item.author, locale),
          }
        : undefined,
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
          cta={getText(hero.location, locale)}
          backgroundImage={hero.backgroundImage?.url || ""}
          mobileImage={hero.mobileImage?.url || ""}
          overlayOpacity={hero.overlayOpacity}
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
          image={overview.image?.url || ""}
          imageAlt={
            getText(overview.image?.alt, locale) ||
            project.pageName ||
            project.projectName ||
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

      {isVisible(projectInfo) &&
        (getText(projectInfo.eyebrow, locale) ||
          getText(projectInfo.heading, locale) ||
          getText(projectInfo.description, locale) ||
          projectInfo.details?.length > 0) && (
          <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 lg:py-24">
            {/* Eyebrow */}

            {getText(projectInfo.eyebrow, locale) && (
              <p className="mb-3 text-sm uppercase tracking-[0.2em]">
                {getText(projectInfo.eyebrow, locale)}
              </p>
            )}

            {/* Heading */}

            {getText(projectInfo.heading, locale) && (
              <h2 className="mb-6 text-3xl font-semibold md:text-5xl">
                {getText(projectInfo.heading, locale)}
              </h2>
            )}

            {/* Description */}

            {getText(projectInfo.description, locale) && (
              <p className="mb-10 max-w-3xl text-base leading-7 text-black/70">
                {getText(projectInfo.description, locale)}
              </p>
            )}

            {/* Details */}

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

            {/* Button */}

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
        )}

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
        <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 lg:py-24">
          {/* Eyebrow */}

          {getText(relatedProjects.eyebrow, locale) && (
            <p className="mb-3 text-sm uppercase tracking-[0.2em]">
              {getText(relatedProjects.eyebrow, locale)}
            </p>
          )}

          {/* Heading */}

          {getText(relatedProjects.heading, locale) && (
            <h2 className="mb-6 text-3xl font-semibold md:text-5xl">
              {getText(relatedProjects.heading, locale)}
            </h2>
          )}

          {/* Description */}

          {getText(relatedProjects.description, locale) && (
            <p className="mb-10 max-w-3xl text-black/70">
              {getText(relatedProjects.description, locale)}
            </p>
          )}

          {/* Projects */}

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {relatedProjects.projects
              .filter((item) => item.isVisible !== false)
              .map((relatedProject, index) => {
                const title = getText(relatedProject.title, locale);

                const description = getText(relatedProject.description, locale);

                return (
                  <article
                    key={relatedProject._id || index}
                    className="overflow-hidden border border-black/10"
                  >
                    {relatedProject.image?.url && (
                      <img
                        src={relatedProject.image.url}
                        alt={
                          getText(relatedProject.image.alt, locale) ||
                          project.pageName ||
                          "Related project"
                        }
                        className="aspect-[4/3] w-full object-cover"
                      />
                    )}

                    <div className="p-5">
                      {title && (
                        <h3 className="text-xl font-semibold">{title}</h3>
                      )}

                      {description && (
                        <p className="mt-3 text-sm leading-6 text-black/60">
                          {description}
                        </p>
                      )}
                    </div>
                  </article>
                );
              })}
          </div>

          {/* Button */}

          {relatedProjects.button?.href &&
            getText(relatedProjects.button.label, locale) && (
              <a
                href={relatedProjects.button.href}
                target={
                  relatedProjects.button.openInNewTab ? "_blank" : undefined
                }
                rel={
                  relatedProjects.button.openInNewTab
                    ? "noopener noreferrer"
                    : undefined
                }
                className="mt-8 inline-flex border border-black px-6 py-3 text-sm transition hover:bg-black hover:text-white"
              >
                {getText(relatedProjects.button.label, locale)}
              </a>
            )}
        </section>
      )}

      {/* =====================================================
          CONSULTATION
      ===================================================== */}

      {isVisible(consultation) &&
        (consultation.image?.url ||
          getText(consultation.eyebrow, locale) ||
          getText(consultation.heading, locale) ||
          getText(consultation.description, locale) ||
          getText(consultation.submitButtonLabel, locale)) && (
          <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 lg:py-24">
            <div className="grid overflow-hidden bg-black md:grid-cols-2">
              {/* Image */}

              {consultation.image?.url && (
                <div className="min-h-[350px]">
                  <img
                    src={consultation.image.url}
                    alt={
                      getText(consultation.image.alt, locale) ||
                      project.pageName ||
                      project.projectName ||
                      "Project consultation"
                    }
                    className="h-full w-full object-cover"
                  />
                </div>
              )}

              {/* Content */}

              <div className="flex flex-col justify-center p-8 text-white md:p-12 lg:p-16">
                {getText(consultation.eyebrow, locale) && (
                  <p className="mb-3 text-sm uppercase tracking-[0.2em] text-white/60">
                    {getText(consultation.eyebrow, locale)}
                  </p>
                )}

                {getText(consultation.heading, locale) && (
                  <h2 className="text-3xl font-semibold md:text-4xl">
                    {getText(consultation.heading, locale)}
                  </h2>
                )}

                {getText(consultation.description, locale) && (
                  <p className="mt-5 max-w-xl leading-7 text-white/70">
                    {getText(consultation.description, locale)}
                  </p>
                )}

                {getText(consultation.submitButtonLabel, locale) && (
                  <button
                    type="button"
                    className="mt-8 w-fit border border-white px-6 py-3 text-sm transition hover:bg-white hover:text-black"
                  >
                    {getText(consultation.submitButtonLabel, locale)}
                  </button>
                )}
              </div>
            </div>
          </section>
        )}
    </main>
  );
}
