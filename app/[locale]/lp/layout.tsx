import Image from 'next/image';
import { LpFooter } from '@/components/layout/LpFooter';
import { LpNavbar } from '@/components/layout/LpNavbar';

// ─── Shared logo ──────────────────────────────────────────────────────────────

function LpLogo() {
  return (
    <div className="flex items-center gap-2" aria-label="T.one Keller">
      <span className="text-xl font-bold tracking-tight text-white">T.one</span>
      <span className="h-5 w-px bg-white/30" aria-hidden="true" />
      <span className="text-xl font-bold tracking-tight text-white">keller</span>
    </div>
  );
}

// ─── Static config ────────────────────────────────────────────────────────────

const NAVBAR_PROPS = {
  logo: <LpLogo />,
  phone: {
    number: '+971 4 2386 488',
    href: 'tel:+97142386488',
    label: 'Call T1 Studio',
  },
  whatsapp: {
    number: '+971 4 2386 488',
    href: 'https://wa.me/97142386488',
    label: 'Chat on WhatsApp',
  },
} as const;

const FOOTER_PROPS = {
  logo: <LpLogo />,
  tagline:
    'Forem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus.',
  socials: [
    { platform: 'facebook'  as const, href: '#', label: 'Follow us on Facebook' },
    { platform: 'instagram' as const, href: '#', label: 'Follow us on Instagram' },
    { platform: 'twitter'   as const, href: '#', label: 'Follow us on X (Twitter)' },
    { platform: 'linkedin'  as const, href: '#', label: 'Connect on LinkedIn' },
    { platform: 'youtube'   as const, href: '#', label: 'Watch on YouTube' },
  ],
  showroom: {
    heading: 'Showroom',
    address: 'Showroom 1, MSM 2 Building, Exit 44, Sheikh Zayed Road, Dubai',
    phone: '+971 4 2386 488',
    phoneHref: 'tel:+97142386488',
    email: 'info@tonestudios.com',
    directionsLabel: 'Get direction to showroom',
    directionsHref: 'https://maps.google.com',
  },
  openingHours: {
    heading: 'Opening Hours',
    hours: [
      { label: 'Mon – Fri 8am – 6pm' },
      { label: 'Sat 8am – 4pm' },
    ],
  },
  newsletter: {
    heading: 'Stay In Loop',
    description:
      'Be the first to know about our exclusive offers, newest collections, and latest products!',
    emailPlaceholder: 'Enter your email',
    submitLabel: 'Submit',
  },
  copyright: '© 2026 Prism. All rights reserved.',
  legalLinks: [
    { label: 'Privacy',       href: '/privacy' },
    { label: 'Terms',         href: '/terms' },
    { label: 'Cookies',       href: '/cookies' },
    { label: 'Accessibility', href: '/accessibility' },
    { label: 'Sitemap',       href: '/sitemap' },
    { label: 'Copyright',     href: '/copyright' },
  ],
} as const;

// ─── Layout ───────────────────────────────────────────────────────────────────

export default function LpLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen bg-[#0C0C0C]">
      <Image
        src="/assets/images/Home.webp"
        alt=""
        fill
        sizes="100vw"
        className="fixed inset-0 -z-10 object-cover opacity-30"
        aria-hidden="true"
      />
      <LpNavbar {...NAVBAR_PROPS} />
      {children}
      <LpFooter
        {...FOOTER_PROPS}
        socials={[...FOOTER_PROPS.socials]}
        openingHours={{ ...FOOTER_PROPS.openingHours, hours: [...FOOTER_PROPS.openingHours.hours] }}
        legalLinks={[...FOOTER_PROPS.legalLinks]}
      />
    </div>
  );
}
