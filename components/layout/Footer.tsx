import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { Link } from "@/app/i18n/navigation";
import { MapPin, Phone, Mail, Clock, ArrowUpRight } from "lucide-react";
import { FooterNewsletterForm } from "./FooterNewsletterForm";
import logo from "@/public/assets/images/Logo.png";

// ─── Inline social SVG icons ──────────────────────────────────────────────────

function IconFacebook() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="size-4"
      aria-hidden="true"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function IconLinkedin() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="size-4"
      aria-hidden="true"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function IconYoutube() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="size-4"
      aria-hidden="true"
    >
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
      <polygon fill="white" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
    </svg>
  );
}

function IconInstagram() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-4"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function IconTikTok() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="size-4"
      aria-hidden="true"
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z" />
    </svg>
  );
}

function IconGmb() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="size-4"
      aria-hidden="true"
    >
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
    </svg>
  );
}

// ─── Logo ─────────────────────────────────────────────────────────────────────

function FooterLogo({ label }: { label: string }) {
  return (
    <Link
      href="/"
      aria-label={label}
      className="inline-flex rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50"
    >
      <Image src={logo} alt={label} height={40} />
    </Link>
  );
}

// ─── Nav column ───────────────────────────────────────────────────────────────

function FooterNavColumn({
  heading,
  links,
}: {
  heading: string;
  links: { label: string; href: string }[];
}) {
  return (
    <nav aria-label={heading}>
      <h3 className="mb-5 text-sm font-semibold text-white">{heading}</h3>
      <ul role="list" className="flex flex-col gap-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-sm text-white/60 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50 rounded-sm"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

// ─── Main footer ──────────────────────────────────────────────────────────────

export async function Footer() {
  const t = await getTranslations("Footer");

  const spacesLinks = [
    { label: t("spacesKitchens"), href: "/spaces/kitchens" },
    { label: t("spacesWardrobes"), href: "/spaces/wardrobes" },
    { label: t("spacesLivingRooms"), href: "/spaces/living-rooms" },
    { label: t("spacesBathrooms"), href: "/spaces/bathrooms" },
  ];

  const propertyLinks = [
    { label: "Madinat Jumeirah", href: "/projects/madinat-jumeirah-living-phase-4-dubai" },
    { label: "Blue Waters", href: "/projects/blue-waters-dubai" },
    { label: "City Walk", href: "/projects/city-walk-center" },
  ];

  const companyLinks = [
    { label: "Trade", href: "/trade" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Why T1", href: "/why-t1" },
  ];

  const socialLinks = [
    {
      Icon: IconFacebook,
      label: t("socialFacebook"),
      href: "https://www.facebook.com/t1studiomena",
    },
    {
      Icon: IconInstagram,
      label: t("socialInstagram"),
      href: "https://www.instagram.com/t1studiomena",
    },
    {
      Icon: IconLinkedin,
      label: t("socialLinkedin"),
      href: "https://www.linkedin.com/company/t1studiomena",
    },
    {
      Icon: IconYoutube,
      label: t("socialYoutube"),
      href: "https://www.youtube.com/@t1studiomena",
    },
    {
      Icon: IconTikTok,
      label: t("socialTikTok"),
      href: "https://www.tiktok.com/@t1studiomena",
    },
    {
      Icon: IconGmb,
      label: t("socialGmb"),
      href: "https://maps.app.goo.gl/cSeCLPK35HYuK3gk6",
    },
  ];

  // const legalLinks = [
  //   { label: t("privacyPolicy"), href: "/privacy-policy" },
  //   { label: t("termsOfService"), href: "/terms-of-service" },
  //   { label: t("cookies"), href: "/cookies" },
  //   { label: t("sitemap"), href: "/sitemap" },
  //   { label: t("support"), href: "/support" },
  // ];

  return (
    <footer className="bg-foreground" aria-label={t("footerLabel")}>
      {/* Newsletter banner */}
      {/* <div className="border-b border-white/10">
        <div className="mx-auto flex flex-col gap-4 px-4 py-8 sm:px-8 sm:flex-row sm:items-center sm:justify-between lg:px-16">
          <div className="max-w-md">
            <h2 className="text-base font-semibold text-white">{t('newsletterHeading')}</h2>
            <p className="mt-1 text-sm text-white/55">{t('newsletterDescription')}</p>
          </div>
          <div className="w-full max-w-sm shrink-0">
            <FooterNewsletterForm
              emailPlaceholder={t('newsletterEmailPlaceholder')}
              submitLabel={t('newsletterSubmitLabel')}
              formLabel={t('newsletterFormLabel')}
            />
          </div>
        </div>
      </div> */}

      {/* Main content */}
      <div className="mx-auto px-4 py-14 sm:px-8 lg:px-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-[2fr_1fr_1fr_1fr_1fr_1.4fr]">
          {/* Brand column */}
          <div className="flex flex-col gap-6">
            <FooterLogo label={t("logoLabel")} />
            <p className="max-w-xs text-sm leading-relaxed text-white/60">
              {t("description")}
            </p>

            {/* Social icons */}
            <ul role="list" className="flex items-center gap-4">
              {socialLinks.map(({ Icon, label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    aria-label={label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex size-9 items-center justify-center rounded-full border border-white/20 text-white/60 transition-all duration-200 hover:border-gold/60 hover:text-gold motion-safe:hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50"
                  >
                    <Icon />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Nav columns */}
          <FooterNavColumn heading={t("spacesHeading")} links={spacesLinks} />
          <FooterNavColumn
            heading={t("propertyHeading")}
            links={propertyLinks}
          />
          <FooterNavColumn heading={t("companyHeading")} links={companyLinks} />

          {/* Opening Hours */}
          <div>
            <h3 className="mb-5 text-sm font-semibold text-white">
              {t("openingHoursHeading")}
            </h3>
            <ul role="list" className="flex flex-col gap-3">
              {[t("openingHours1"), t("openingHours2")].map((hour) => (
                <li
                  key={hour}
                  className="flex items-center gap-2 text-sm text-white/60"
                >
                  <Clock
                    className="size-4 shrink-0 text-gold"
                    aria-hidden="true"
                    strokeWidth={1.5}
                  />
                  <span>{hour}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Showroom */}
          <div>
            <h3 className="mb-5 text-sm font-semibold text-white">
              {t("showroomHeading")}
            </h3>
            <address className="not-italic">
              <ul role="list" className="flex flex-col gap-4">
                <li className="flex items-start gap-3 text-sm text-white/60">
                  <MapPin
                    className="mt-0.5 size-4 shrink-0 text-gold"
                    aria-hidden="true"
                    strokeWidth={1.5}
                  />
                  <span>{t("contactAddress")}</span>
                </li>
                <li>
                  <a
                    href={`tel:${t("contactPhone").replace(/\s/g, "")}`}
                    className="flex items-center gap-3 text-sm text-white/60 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50 rounded-sm"
                  >
                    <Phone
                      className="size-4 shrink-0 text-gold"
                      aria-hidden="true"
                      strokeWidth={1.5}
                    />
                    <span>{t("contactPhone")}</span>
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${t("contactEmail")}`}
                    className="flex items-center gap-3 text-sm text-white/60 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50 rounded-sm"
                  >
                    <Mail
                      className="size-4 shrink-0 text-gold"
                      aria-hidden="true"
                      strokeWidth={1.5}
                    />
                    <span>{t("contactEmail")}</span>
                  </a>
                </li>
                <li>
                  <a
                    href={t("showroomDirectionsHref")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-sm text-white/60 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50 rounded-sm"
                  >
                    <ArrowUpRight
                      className="size-4 shrink-0 text-gold"
                      aria-hidden="true"
                      strokeWidth={1.5}
                    />
                    <span>{t("showroomDirectionsLabel")}</span>
                  </a>
                </li>
              </ul>
            </address>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-5 sm:flex-row sm:px-8 lg:px-16">
          <p className="text-xs text-white/40">{t("copyright")}</p>

          {/* <nav aria-label={t("legalNavLabel")}>
            <ul
              role="list"
              className="flex flex-wrap items-center gap-x-6 gap-y-2"
            >
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-xs text-white/40 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50 rounded-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav> */}
        </div>
      </div>
    </footer>
  );
}
