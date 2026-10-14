import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { HeroBanner } from "@/components/sections/HeroBanner";
import {
  PrivacyPolicySection,
  type PrivacySection,
} from "@/components/sections/PrivacyPolicySection";
import { JsonLdSchema } from "@/components/JsonLdSchema";
import { getAccessibilityCms } from "@/lib/cms/accessibility";

export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const [cms, t] = await Promise.all([
    getAccessibilityCms(locale),
    getTranslations({ locale, namespace: "Accessibility" }),
  ]);
  const seo = cms?.seo;
  const base = locale === "ar" ? "/ar" : "";
  return {
    title: seo?.metaTitle ?? t("metaTitle"),
    description: seo?.metaDescription ?? t("metaDescription"),
    alternates: { canonical: seo?.canonicalUrl || `${base}/accessibility` },
    ...(seo?.ogImage?.url && {
      openGraph: { images: [{ url: seo.ogImage.url }] },
      twitter: { images: [seo.ogImage.url] },
    }),
  };
}

export default async function AccessibilityPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const [cms, t] = await Promise.all([
    getAccessibilityCms(locale),
    getTranslations({ locale, namespace: "Accessibility" }),
  ]);

  const s = cms?.sections;
  const hero = s?.hero;

  const sections: PrivacySection[] = s
    ? ([
        s.commitment?.isVisible && {
          id: "commitment",
          title: s.commitment.title,
          body: s.commitment.body,
        },
        s.standards?.isVisible && {
          id: "standard",
          title: s.standards.title,
          body: s.standards.body,
          items: s.standards.standards,
          note: s.standards.note,
        },
        s.shortfalls?.isVisible && {
          id: "shortfalls",
          title: s.shortfalls.title,
          body: s.shortfalls.body,
          subsections: s.shortfalls.items?.map((item) => ({
            title: item.title,
            body: item.body,
          })),
          note: s.shortfalls.note,
        },
        s.beyondWebsite?.isVisible && {
          id: "beyond-website",
          title: s.beyondWebsite.title,
          body: s.beyondWebsite.body,
        },
        s.contact?.isVisible && {
          id: "contact",
          title: s.contact.title,
          body: s.contact.body,
          subsections: [
            {
              title: s.contact.contactSubTitle,
              items: s.contact.contactItems,
            },
          ],
          note: s.contact.note,
        },
        s.faq?.isVisible && {
          id: "faq",
          title: s.faq.title,
          subsections: s.faq.faqs?.map((faq) => ({
            title: faq.question,
            body: faq.answer,
          })),
        },
      ].filter(Boolean) as PrivacySection[])
    : [
          { id: "commitment", title: t("section1Title"), body: t("section1Body") },
          {
            id: "standard",
            title: t("section2Title"),
            body: t("section2Body"),
            items: [t("std1"), t("std2"), t("std3"), t("std4"), t("std5"), t("std6"), t("std7")],
            note: t("section2Note"),
          },
          {
            id: "shortfalls",
            title: t("section3Title"),
            body: t("section3Body"),
            subsections: [
              { title: t("short1Title"), body: t("short1Body") },
              { title: t("short2Title"), body: t("short2Body") },
              { title: t("short3Title"), body: t("short3Body") },
              { title: t("short4Title"), body: t("short4Body") },
            ],
            note: t("section3Note"),
          },
          { id: "beyond-website", title: t("section4Title"), body: t("section4Body") },
          {
            id: "contact",
            title: t("section5Title"),
            body: t("section5Body"),
            subsections: [
              {
                title: t("contactSubTitle"),
                items: [t("contact1"), t("contact2"), t("contact3"), t("contact4"), t("contact5")],
              },
            ],
            note: t("section5Note"),
          },
          {
            id: "faq",
            title: t("section6Title"),
            subsections: [
              { title: t("faq1Q"), body: t("faq1A") },
              { title: t("faq2Q"), body: t("faq2A") },
              { title: t("faq3Q"), body: t("faq3A") },
              { title: t("faq4Q"), body: t("faq4A") },
              { title: t("faq5Q"), body: t("faq5A") },
            ],
          },
      ];

  return (
    <main>
      <HeroBanner
        heading={hero?.heading ?? t("heading")}
        description={hero?.description ?? t("description")}
        imageSrc={hero?.bgImage?.url || "/assets/images/spaces.png"}
        breadcrumbs={
          hero?.breadcrumbs?.map((b) => ({
            label: b.label,
            href: b.href || undefined,
          })) ?? [
            { label: t("breadcrumbHome"), href: "/" },
            { label: t("breadcrumbCurrent") },
          ]
        }
      />
      <PrivacyPolicySection
        tocLabel={t("tocLabel")}
        lastUpdated={t("lastUpdated")}
        sections={sections}
      />
      <JsonLdSchema globalSeo={cms?.globalSeo} pageSeo={cms?.seo} />
    </main>
  );
}
