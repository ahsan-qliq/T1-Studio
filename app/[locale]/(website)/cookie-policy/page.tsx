import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { HeroBanner } from "@/components/sections/HeroBanner";
import {
  PrivacyPolicySection,
  type PrivacySection,
} from "@/components/sections/PrivacyPolicySection";
import { JsonLdSchema } from "@/components/JsonLdSchema";
import { getCookiePolicyCms } from "@/lib/cms/cookie-policy";

export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const [cms, t] = await Promise.all([
    getCookiePolicyCms(locale),
    getTranslations({ locale, namespace: "CookiePolicy" }),
  ]);
  const seo = cms?.seo;
  const base = locale === "ar" ? "/ar" : "";
  return {
    title: seo?.metaTitle ?? t("metaTitle"),
    description: seo?.metaDescription ?? t("metaDescription"),
    alternates: { canonical: seo?.canonicalUrl || `${base}/cookie-policy` },
    ...(seo?.ogImage?.url && {
      openGraph: { images: [{ url: seo.ogImage.url }] },
      twitter: { images: [seo.ogImage.url] },
    }),
  };
}

export default async function CookiePolicyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const [cms, t] = await Promise.all([
    getCookiePolicyCms(locale),
    getTranslations({ locale, namespace: "CookiePolicy" }),
  ]);

  const s = cms?.sections;
  const hero = s?.hero;

  const isAr = locale === "ar";
  const pageUrl = isAr
    ? "https://t1-studio.com/ar/cookie-policy/"
    : "https://t1-studio.com/cookie-policy/";
  const homeUrl = isAr ? "https://t1-studio.com/ar/" : "https://t1-studio.com/";
  const breadcrumbId = isAr
    ? "https://t1-studio.com/ar/cookie-policy/#breadcrumb"
    : "https://t1-studio.com/cookie-policy/#breadcrumb";
  const webpageId = isAr
    ? "https://t1-studio.com/ar/cookie-policy/#webpage"
    : "https://t1-studio.com/cookie-policy/#webpage";

  const pageSchema = {
    structuredData: {
      "@graph": [
        {
          "@type": "Organization",
          "@id": "https://t1-studio.com/#organization",
          name: "T1 Studio",
          url: "https://t1-studio.com/",
        },
        {
          "@type": "BreadcrumbList",
          "@id": breadcrumbId,
          itemListElement: [
            { "@type": "ListItem", position: 1, name: t("breadcrumbHome"), item: homeUrl },
            { "@type": "ListItem", position: 2, name: t("breadcrumbCurrent"), item: pageUrl },
          ],
        },
        {
          "@type": "WebPage",
          "@id": webpageId,
          url: pageUrl,
          name: t("metaTitle"),
          description: t("metaDescription"),
          inLanguage: isAr ? "ar" : "en",
          isPartOf: { "@id": "https://t1-studio.com/#website" },
          breadcrumb: { "@id": breadcrumbId },
        },
      ],
    },
  };

  const sections: PrivacySection[] = s
    ? ([
        s.aboutPolicy?.isVisible && {
          id: "about-this-policy",
          title: s.aboutPolicy.title,
          body: s.aboutPolicy.body,
        },
        s.whatAreCookies?.isVisible && {
          id: "what-cookies-are",
          title: s.whatAreCookies.title,
          body: s.whatAreCookies.body,
        },
        s.cookieTypes?.isVisible && {
          id: "cookies-we-use",
          title: s.cookieTypes.title,
          body: s.cookieTypes.body,
          subsections: s.cookieTypes.categories?.map((cat) => ({
            title: cat.title,
            body: cat.body,
          })),
          note: s.cookieTypes.note,
        },
        s.yourChoices?.isVisible && {
          id: "your-choices",
          title: s.yourChoices.title,
          body: s.yourChoices.body,
          items: s.yourChoices.choices,
          note: s.yourChoices.note,
        },
        s.yourRights?.isVisible && {
          id: "your-rights",
          title: s.yourRights.title,
          body: s.yourRights.body,
        },
        s.changes?.isVisible && {
          id: "changes-to-policy",
          title: s.changes.title,
          body: s.changes.body,
        },
        s.contact?.isVisible && {
          id: "contact-us",
          title: s.contact.title,
          body: s.contact.body,
          subsections: [
            {
              title: s.contact.contactSubTitle,
              items: s.contact.contactItems,
            },
          ],
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
        { id: "about-this-policy", title: t("section1Title"), body: t("section1Body") },
        { id: "what-cookies-are", title: t("section2Title"), body: t("section2Body") },
        {
          id: "cookies-we-use",
          title: t("section3Title"),
          body: t("section3Body"),
          subsections: [
            { title: t("cat1Title"), body: t("cat1Body") },
            { title: t("cat2Title"), body: t("cat2Body") },
            { title: t("cat3Title"), body: t("cat3Body") },
            { title: t("cat4Title"), body: t("cat4Body") },
          ],
          note: t("section3Note"),
        },
        {
          id: "your-choices",
          title: t("section4Title"),
          body: t("section4Body"),
          items: [t("choice1"), t("choice2"), t("choice3")],
          note: t("section4Note"),
        },
        { id: "your-rights", title: t("section5Title"), body: t("section5Body") },
        { id: "changes-to-policy", title: t("section6Title"), body: t("section6Body") },
        {
          id: "contact-us",
          title: t("section7Title"),
          body: t("section7Body"),
          subsections: [
            { title: t("contactSubTitle"), items: [t("contact1"), t("contact2"), t("contact3"), t("contact4")] },
          ],
        },
        {
          id: "faq",
          title: t("section8Title"),
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
      <JsonLdSchema globalSeo={cms?.globalSeo} pageSeo={cms?.seo ?? pageSchema} />
    </main>
  );
}
